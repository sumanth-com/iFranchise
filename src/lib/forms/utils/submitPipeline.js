/**
 * Centralized form submission pipeline:
 * honeypot -> validate -> transform -> guarded network send
 */

import { checkHoneypot, stripHoneypot } from './honeypot.js';
import { createValidationErrorResponse } from './responseHandler.js';
import { submitToGoogleSheets } from './googleSheetsClient.js';
import { runGuardedSubmission } from './submissionGuard.js';
import { prepareOutboundPayload } from './sanitizePayload.js';
import { logFormInfo, logFormError } from './formLogger.js';
import { notifyLeadSubmission } from './leadNotification.js';
import { trackFormConversion } from '../../analytics/conversionEvents.js';
import {
  createProcessingConsentRecord,
  hasProcessingConsent,
  requiresProcessingConsent,
} from '../privacyConsent.js';

function buildMetadata(sourcePage) {
  if (typeof window === 'undefined') {
    return { source_page: sourcePage };
  }
  return {
    source_page: sourcePage,
    page_url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || '',
  };
}

function attachMetadata(payload, sourcePage) {
  return {
    ...payload,
    metadata: buildMetadata(sourcePage),
  };
}

function attachConsent(payload, formType, sourcePage) {
  if (!requiresProcessingConsent(formType)) return payload;
  return {
    ...payload,
    consent: createProcessingConsentRecord(formType, sourcePage),
  };
}

/**
 * @param {object} options
 * @param {string} options.formType - FORM_TYPES value
 * @param {object} options.rawData - Raw form fields (may include honeypot)
 * @param {string} options.sourcePage - Source page identifier
 * @param {(data: object) => { success: boolean, errors?: object, data?: object }} options.validate
 * @param {(data: object, sourcePage: string) => object} options.transform
 * @param {AbortSignal} [options.signal]
 * @param {string} [options.guardKey] - Concurrent duplicate guard key (double-click only)
 */
export async function runFormSubmission({
  formType,
  rawData,
  sourcePage,
  validate,
  transform,
  signal,
  guardKey,
}) {
  const pipeline = async () => {
    logFormInfo('pipeline_start', { formType, sourcePage });

    if (signal?.aborted) {
      return { success: false, error: 'Submission cancelled.', code: 'ABORTED' };
    }

    const honeypotResult = checkHoneypot(rawData);
    if (!honeypotResult.ok) {
      logFormError('pipeline_spam', { formType, sourcePage, code: 'SPAM' });
      return { success: false, error: 'Submission rejected.', code: 'SPAM' };
    }

    const cleaned = stripHoneypot(rawData);
    const validation = validate(cleaned);
    const validationErrors = { ...(validation.errors || {}) };
    if (requiresProcessingConsent(formType) && !hasProcessingConsent(rawData)) {
      validationErrors.privacyConsent =
        'Please confirm the specific use of your submitted details.';
    }

    if (!validation.success || Object.keys(validationErrors).length > 0) {
      logFormInfo('pipeline_validation_failed', { formType, sourcePage, code: 'VALIDATION_ERROR' });
      return createValidationErrorResponse(validationErrors);
    }

    if (signal?.aborted) {
      return { success: false, error: 'Submission cancelled.', code: 'ABORTED' };
    }

    const transformed = transform(validation.data, sourcePage);
    const rawPayload = attachConsent(
      attachMetadata(transformed, sourcePage),
      formType,
      sourcePage,
    );
    const prepared = prepareOutboundPayload(rawPayload);
    if (!prepared.ok) {
      logFormError('pipeline_payload_invalid', { formType, sourcePage, code: prepared.code });
      return {
        success: false,
        error: prepared.error,
        code: prepared.code,
      };
    }

    const result = await submitToGoogleSheets(prepared.payload, { signal });

    if (result.success) {
      logFormInfo('pipeline_success', { formType, sourcePage });
      notifyLeadSubmission(prepared.payload);
      trackFormConversion(formType, sourcePage);
    } else {
      logFormError('pipeline_failure', { formType, sourcePage, code: result.code });
    }

    return result;
  };

  const key = guardKey || `${formType}:${sourcePage}`;
  return runGuardedSubmission(key, pipeline);
}
