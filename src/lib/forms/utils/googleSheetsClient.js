/**
 * Core Google Sheets submission client (Google Apps Script Web App).
 */

import { GOOGLE_APPS_SCRIPT_URL } from '../constants/formEndpoints.js';
import { logger } from '../../logger.js';

export async function submitToGoogleSheets(payload) {
  logger.log('[GoogleSheetsClient] Submission started');

  if (!GOOGLE_APPS_SCRIPT_URL) {
    logger.error('[GoogleSheetsClient] VITE_GOOGLE_APPS_SCRIPT_URL not configured');
    return {
      success: false,
      error: 'Server configuration error. Please contact support.',
    };
  }

  if (!payload.form_type || !payload.sheet_tab || !payload.data) {
    logger.error('[GoogleSheetsClient] Missing required payload fields');
    return {
      success: false,
      error: 'Invalid submission data. Please try again.',
    };
  }

  try {
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
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
  } catch (error) {
    logger.error('[GoogleSheetsClient] Network error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

export async function submitToGoogleSheetsWithCORS(payload) {
  logger.log('[GoogleSheetsClient (CORS)] Submission started');

  if (!GOOGLE_APPS_SCRIPT_URL) {
    return {
      success: false,
      error: 'Server configuration error. Please contact support.',
    };
  }

  if (!payload.form_type || !payload.sheet_tab || !payload.data) {
    return {
      success: false,
      error: 'Invalid submission data. Please try again.',
    };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      logger.error('[GoogleSheetsClient (CORS)] Server error:', response.status);
      return {
        success: false,
        error: 'Server error. Please try again later.',
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    logger.error('[GoogleSheetsClient (CORS)] Network error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
