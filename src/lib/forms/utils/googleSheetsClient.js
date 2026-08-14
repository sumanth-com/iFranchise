/**
 * Google Sheets client - POSTs JSON payloads to Google Apps Script Web App.
 */

import { createConfigErrorResponse, parseSubmissionResponse } from './responseHandler.js';
import { fetchWithRetry, mapRequestError } from './requestClient.js';
import { prepareOutboundPayload } from './sanitizePayload.js';
import {
  resolveFormEndpointUrl,
  isValidFormEndpointUrl,
  maskFormEndpointUrl,
} from './resolveFormEndpoint.js';
import { logFormInfo, logFormError, logFormWarn } from './formLogger.js';

function successPayload(payload, extra = {}) {
  return {
    success: true,
    data: {
      message: 'Form submitted successfully',
      timestamp: payload.submitted_at,
      form_type: payload.form_type,
      ...extra,
    },
  };
}

/**
 * POST payload to Apps Script. Uses CORS to read the real server response.
 */
async function postToAppsScript(scriptUrl, payload, signal) {
  let jsonBody;
  try {
    jsonBody = JSON.stringify(payload);
  } catch {
    throw new Error('SERIALIZE_ERROR');
  }

  const formBody = new URLSearchParams({ payload: jsonBody }).toString();
  const started = typeof performance !== 'undefined' ? performance.now() : 0;

  const response = await fetchWithRetry(scriptUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: formBody,
    signal,
    // Apps Script cold starts can exceed 30 seconds in production. Do not retry
    // this non-idempotent POST because the first request may already have
    // appended the row even when its response is delayed.
    timeout: 90_000,
    retries: 0,
  });

  const durationMs = typeof performance !== 'undefined' ? Math.round(performance.now() - started) : undefined;
  const text = await response.text();

  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    logFormWarn('response_not_json', {
      formType: payload.form_type,
      status: response.status,
      transport: 'cors',
      durationMs,
    });
  }

  if (!response.ok) {
    logFormError('submission_http_error', {
      formType: payload.form_type,
      status: response.status,
      code: 'HTTP_ERROR',
      transport: 'cors',
      durationMs,
    });
    const fromBody = parseSubmissionResponse(parsed);
    return {
      success: false,
      error: fromBody.error || `Server error (${response.status}). Please try again.`,
      code: fromBody.code || 'HTTP_ERROR',
    };
  }

  const result = parseSubmissionResponse(parsed);
  if (!result.success) {
    logFormError('submission_rejected', {
      formType: payload.form_type,
      status: response.status,
      code: result.code || 'SERVER_ERROR',
      transport: 'cors',
      durationMs,
    });
    return result;
  }

  logFormInfo('submission_success', {
    formType: payload.form_type,
    status: response.status,
    transport: 'cors',
    durationMs,
  });

  return successPayload(payload, { transport: 'cors' });
}

/**
 * Submit a standardized payload to Google Apps Script.
 * Never throws. always returns { success, error?, code? }.
 * @param {object} payload
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function submitToGoogleSheets(payload, options = {}) {
  const formType = payload?.form_type;
  const started = typeof performance !== 'undefined' ? performance.now() : 0;

  try {
    const { signal } = options;

    logFormInfo('submission_started', { formType });

    const scriptUrl = await resolveFormEndpointUrl();

    if (!scriptUrl) {
      logFormError('endpoint_missing', {
        formType,
        code: 'CONFIG_ERROR',
        endpointReady: false,
        debug: import.meta.env.DEV
          ? 'VITE_GOOGLE_APPS_SCRIPT_URL empty and /forms-endpoint.json has no url'
          : undefined,
      });
      return createConfigErrorResponse(
        'Form service is not configured on the live site. Please email us directly or try again later.',
      );
    }

    if (!isValidFormEndpointUrl(scriptUrl)) {
      logFormError('endpoint_invalid', {
        formType,
        code: 'CONFIG_ERROR',
        endpointReady: false,
        debug: import.meta.env.DEV ? maskFormEndpointUrl(scriptUrl) : undefined,
      });
      return createConfigErrorResponse('Invalid form endpoint configuration.');
    }

    const prepared = prepareOutboundPayload(payload);
    if (!prepared.ok) {
      logFormError('payload_invalid', { formType, code: prepared.code });
      return {
        success: false,
        error: prepared.error,
        code: prepared.code,
      };
    }

    if (signal?.aborted) {
      return { success: false, error: 'Submission cancelled.', code: 'ABORTED' };
    }

    if (import.meta.env.DEV) {
      logFormInfo('submission_posting', {
        formType,
        endpointReady: true,
        debug: maskFormEndpointUrl(scriptUrl),
      });
    }

    const result = await postToAppsScript(scriptUrl, prepared.payload, signal);
    return result;
  } catch (err) {
    const durationMs =
      typeof performance !== 'undefined' ? Math.round(performance.now() - started) : undefined;

    if (err?.message === 'SERIALIZE_ERROR') {
      logFormError('serialize_error', { formType, code: 'SERIALIZE_ERROR', durationMs });
      return {
        success: false,
        error: 'Invalid submission data. Please try again.',
        code: 'SERIALIZE_ERROR',
      };
    }

    const mapped = mapRequestError(err);
    logFormError('submission_failed', {
      formType,
      code: mapped.code,
      durationMs,
      debug: import.meta.env.DEV ? err?.message : undefined,
    });
    return mapped;
  }
}
