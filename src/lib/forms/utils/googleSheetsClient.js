/**
 * Google Sheets client - POSTs JSON payloads to Google Apps Script Web App.
 */

import { GOOGLE_APPS_SCRIPT_URL } from '../constants/formEndpoints.js';
import { logger } from '../../logger.js';
import { createConfigErrorResponse, parseSubmissionResponse } from './responseHandler.js';

const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 800;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

async function fetchWithTimeout(url, options, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function postWithCors(payload, attempt = 0) {
  const response = await fetchWithTimeout(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = new Error(`HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }

  const text = await response.text();
  if (!text) {
    return { success: true, data: { message: 'Form submitted successfully' } };
  }

  try {
    return parseSubmissionResponse(JSON.parse(text));
  } catch {
    logger.warn('[GoogleSheetsClient] Non-JSON response, treating as success');
    return { success: true, data: { message: 'Form submitted successfully' } };
  }
}

async function postWithNoCors(payload) {
  await fetchWithTimeout(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
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

/**
 * Submit a standardized payload to Google Apps Script.
 * Tries CORS (readable response) with retries, then falls back to no-cors.
 */
export async function submitToGoogleSheets(payload) {
  if (import.meta.env.DEV) {
    logger.log('[GoogleSheetsClient] Submission started', payload.form_type);
  }

  if (!GOOGLE_APPS_SCRIPT_URL) {
    logger.error('[GoogleSheetsClient] VITE_GOOGLE_APPS_SCRIPT_URL not configured');
    return createConfigErrorResponse();
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

  let lastError = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const result = await postWithCors(payload, attempt);
      if (result.success) {
        if (import.meta.env.DEV) logger.log('[GoogleSheetsClient] CORS submission succeeded');
        return result;
      }
      return result;
    } catch (error) {
      lastError = error;
      const isAbort = error?.name === 'AbortError';
      logger.warn(
        `[GoogleSheetsClient] CORS attempt ${attempt + 1} failed:`,
        isAbort ? 'timeout' : error?.message || error
      );

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1));
      }
    }
  }

  try {
    if (import.meta.env.DEV) logger.log('[GoogleSheetsClient] Falling back to no-cors mode');
    return await postWithNoCors(payload);
  } catch (error) {
    logger.error('[GoogleSheetsClient] All submission attempts failed:', lastError || error);
    const isTimeout = lastError?.name === 'AbortError';
    return {
      success: false,
      error: isTimeout
        ? 'Request timed out. Please check your connection and try again.'
        : 'Network error. Please check your connection and try again.',
      code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
    };
  }
}
