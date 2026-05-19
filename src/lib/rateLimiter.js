/**
 * Legacy rate-limit helpers — disabled.
 * Submissions go straight to Google Sheets with no per-session cap.
 */

/** @deprecated No-op: all submissions allowed */
export function checkRateLimit() {
  return { allowed: true, waitMs: 0, reason: null };
}

/** @deprecated No-op */
export function recordSubmission() {
  /* unlimited */
}

/**
 * Rate limit keys - centralised constants so form keys never drift.
 */
export const RATE_LIMIT_KEYS = {
  CONTACT:           'contact',
  BRAND_APPLICATION: 'brand_application',
  JOB_APPLICATION:   'job_application',
  CHATBOT_BRAND:     'chatbot_brand',
  CHATBOT_INVESTOR:  'chatbot_investor',
  CHATBOT_STRATEGY:  'chatbot_strategy',
};
