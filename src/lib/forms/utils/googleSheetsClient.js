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
  await fetchWithRetry(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    signal,
    timeout: 12_000,
    retries: 1,
  });
  return successPayload(payload);
}

/**
 * Submit a standardized payload to Google Apps Script.
 * @param {object} payload
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function submitToGoogleSheets(payload, options = {}) {
  const { signal } = options;

  if (import.meta.env.DEV) {
    logger.log('[GoogleSheetsClient] Submission started', payload.form_type);
  }

  if (!GOOGLE_APPS_SCRIPT_URL) {
    logger.error('[GoogleSheetsClient] VITE_GOOGLE_APPS_SCRIPT_URL not configured');
    return createConfigErrorResponse(
      'Form service is not configured yet. Please email us directly or try again later.',
    );
  }

  if (!isValidScriptUrl(GOOGLE_APPS_SCRIPT_URL)) {
    logger.error('[GoogleSheetsClient] Invalid Apps Script URL format');
    return createConfigErrorResponse('Invalid form endpoint configuration.');
  }

  if (!payload?.form_type || !payload?.sheet_tab || !payload?.data) {
    logger.error('[GoogleSheetsClient] Missing required payload fields');
    return {
      success: false,
      error: 'Invalid submission data. Please try again.',
      code: 'INVALID_PAYLOAD',
    };
  }

  if (signal?.aborted) {
    return { success: false, error: 'Submission cancelled.', code: 'ABORTED' };
  }

  try {
    const result = await postToAppsScript(payload, signal);
    if (import.meta.env.DEV) logger.log('[GoogleSheetsClient] Submission sent');
    return result;
  } catch (err) {
    logger.error('[GoogleSheetsClient] Submission failed:', err?.message || err);
    return mapRequestError(err);
  }
}
