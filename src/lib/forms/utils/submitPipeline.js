/**
 * Centralized form submission pipeline:
 * honeypot -> rate limit -> validate -> transform -> Google Sheets
 */

import { FORM_TYPES } from '../constants/formTypes.js';
import { RATE_LIMITS, MAX_SUBMISSIONS_PER_SESSION } from '../constants/formEndpoints.js';
import { checkHoneypot, stripHoneypot } from './honeypot.js';
import { createValidationErrorResponse } from './responseHandler.js';
import { submitToGoogleSheets } from './googleSheetsClient.js';
import { checkDuplicateSubmission, recordDuplicateSubmission } from './duplicateGuard.js';
import { checkRateLimit, recordSubmission, RATE_LIMIT_KEYS } from '../../rateLimiter.js';

const FORM_TYPE_TO_RATE_KEY = {
  [FORM_TYPES.CONTACT]: RATE_LIMIT_KEYS.CONTACT,
  [FORM_TYPES.BRAND_APPLICATION]: RATE_LIMIT_KEYS.BRAND_APPLICATION,
  [FORM_TYPES.JOB_APPLICATION]: RATE_LIMIT_KEYS.JOB_APPLICATION,
  [FORM_TYPES.CHATBOT_BRAND]: RATE_LIMIT_KEYS.CHATBOT_BRAND,
  [FORM_TYPES.CHATBOT_INVESTOR]: RATE_LIMIT_KEYS.CHATBOT_INVESTOR,
  [FORM_TYPES.CHATBOT_STRATEGY]: RATE_LIMIT_KEYS.CHATBOT_STRATEGY,
};

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

/**
 * @param {object} options
 * @param {string} options.formType - FORM_TYPES value
 * @param {object} options.rawData - Raw form fields (may include honeypot)
 * @param {string} options.sourcePage - Source page identifier
 * @param {(data: object) => { success: boolean, errors?: object, data?: object }} options.validate
 * @param {(data: object, sourcePage: string) => object} options.transform
 */
export async function runFormSubmission({ formType, rawData, sourcePage, validate, transform }) {
  const honeypotResult = checkHoneypot(rawData);
  if (!honeypotResult.ok) {
    return { success: false, error: 'Submission rejected.', code: 'SPAM' };
  }

  const rateKey = FORM_TYPE_TO_RATE_KEY[formType] || formType;
  const rateLimitMs = RATE_LIMITS[formType] ?? 30_000;
  const maxPerSession = MAX_SUBMISSIONS_PER_SESSION[formType] ?? 10;
  const rateLimitCheck = checkRateLimit(rateKey, rateLimitMs, maxPerSession);

  if (!rateLimitCheck.allowed) {
    return {
      success: false,
      error: rateLimitCheck.reason || 'Please wait before submitting again.',
      code: 'RATE_LIMIT',
      waitMs: rateLimitCheck.waitMs,
    };
  }

  const cleaned = stripHoneypot(rawData);
  const validation = validate(cleaned);

  if (!validation.success) {
    return createValidationErrorResponse(validation.errors);
  }

  const duplicateCheck = checkDuplicateSubmission(formType, validation.data);
  if (!duplicateCheck.ok) {
    return {
      success: false,
      error: duplicateCheck.error,
      code: duplicateCheck.code,
    };
  }

  const payload = attachMetadata(transform(validation.data, sourcePage), sourcePage);
  const result = await submitToGoogleSheets(payload);

  if (result.success) {
    recordSubmission(rateKey);
    if (duplicateCheck.storageKey) {
      recordDuplicateSubmission(duplicateCheck.storageKey);
    }
  }

  return result;
}
