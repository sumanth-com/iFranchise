/**
 * Google Sheets client - POSTs JSON payloads to Google Apps Script Web App.
 *
 * Uses no-cors POST only (no preflight). Google Apps Script web apps do not reliably
 * answer CORS preflight from localhost/custom domains — a parallel "cors" fetch only
 * produced console errors while no-cors already delivered submissions successfully.
 */

import { GOOGLE_APPS_SCRIPT_URL } from '../constants/formEndpoints.js';
import { logger } from '../../logger.js';
import { createConfigErrorResponse } from './responseHandler.js';

/**
 * POST payload to Apps Script. Resolves when the browser has sent the request.
 * @see https://developers.google.com/apps-script/guides/web
 */
async function postToAppsScript(payload) {
  await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    success: true,
    data: {
      message: 'Form submitted successfully',
      timestamp: payload.submitted_at,
      form_type: payload.form_type,
    },
  };
}

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

/**
 * Submit a standardized payload to Google Apps Script.
 */
export async function submitToGoogleSheets(payload) {
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

  try {
    const result = await postToAppsScript(payload);
    if (import.meta.env.DEV) logger.log('[GoogleSheetsClient] Submission sent');
    return result;
  } catch (firstError) {
    logger.warn('[GoogleSheetsClient] First send failed, retrying once:', firstError?.message || firstError);
  }

  try {
    const result = await postToAppsScript(payload);
    if (import.meta.env.DEV) logger.log('[GoogleSheetsClient] Submission sent (retry)');
    return result;
  } catch (lastError) {
    logger.error('[GoogleSheetsClient] Submission failed:', lastError);
    return {
      success: false,
      error: 'Could not reach our server. Please check your connection and try again.',
      code: 'NETWORK_ERROR',
    };
  }
}
