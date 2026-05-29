/**
 * Google Sheets client - POSTs JSON payloads to Google Apps Script Web App.
 *
 * Uses no-cors POST (no preflight). Response body is opaque; success is inferred
 * when the browser completes the send without network error.
 */

import { GOOGLE_APPS_SCRIPT_URL } from '../constants/formEndpoints.js';
import { logger } from '../../logger.js';
import { createConfigErrorResponse } from './responseHandler.js';
import { fetchWithRetry, mapRequestError } from './requestClient.js';
import { prepareOutboundPayload } from './sanitizePayload.js';

function isValidScriptUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname.includes('script.google.com') &&
      parsed.pathname.includes('/macros/s/')
    );
  } catch {
    return false;
  }
}

function successPayload(payload) {
  return {
    success: true,
    data: {
      message: 'Form submitted successfully',
      timestamp: payload.submitted_at,
      form_type: payload.form_type,
    },
  };
}

/**
 * POST payload to Apps Script. Resolves when the browser has sent the request.
 */
async function postToAppsScript(payload, signal) {
  let jsonBody;
  try {
    jsonBody = JSON.stringify(payload);
  } catch {
    throw new Error('SERIALIZE_ERROR');
  }

  // Form-encoded field is the most reliable transport for Google Apps Script web apps.
  const formBody = new URLSearchParams({ payload: jsonBody }).toString();

  await fetchWithRetry(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: formBody,
    signal,
    timeout: 12_000,
    retries: 1,
  });

  return successPayload(payload);
}

/**
 * Submit a standardized payload to Google Apps Script.
 * Never throws. always returns { success, error?, code? }.
 * @param {object} payload
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function submitToGoogleSheets(payload, options = {}) {
  try {
    const { signal } = options;

    if (import.meta.env.DEV) {
      logger.log('[GoogleSheetsClient] Submission started', payload?.form_type);
    }

    if (!GOOGLE_APPS_SCRIPT_URL) {
      logger.error('[GoogleSheetsClient] Form endpoint not configured');
      return createConfigErrorResponse(
        'Form service is not configured yet. Please email us directly or try again later.',
      );
    }

    if (!isValidScriptUrl(GOOGLE_APPS_SCRIPT_URL)) {
      logger.error('[GoogleSheetsClient] Invalid endpoint configuration');
      return createConfigErrorResponse('Invalid form endpoint configuration.');
    }

    const prepared = prepareOutboundPayload(payload);
    if (!prepared.ok) {
      return {
        success: false,
        error: prepared.error,
        code: prepared.code,
      };
    }

    if (signal?.aborted) {
      return { success: false, error: 'Submission cancelled.', code: 'ABORTED' };
    }

    const result = await postToAppsScript(prepared.payload, signal);
    if (import.meta.env.DEV) logger.log('[GoogleSheetsClient] Submission sent');
    return result;
  } catch (err) {
    if (err?.message === 'SERIALIZE_ERROR') {
      return {
        success: false,
        error: 'Invalid submission data. Please try again.',
        code: 'SERIALIZE_ERROR',
      };
    }
    logger.error('[GoogleSheetsClient] Submission failed');
    return mapRequestError(err);
  }
}
