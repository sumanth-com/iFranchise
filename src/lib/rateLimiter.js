/**
 * rateLimiter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Client-side rate limiting using sessionStorage.
 * This is a first line of defence to prevent accidental double-submits and
 * basic abuse from the same browser tab.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Check whether a form submission is allowed.
 * Tracks submission timestamps per form key in sessionStorage.
 *
 * @param {string} formKey   - Unique identifier for the form (e.g. 'contact', 'brand_application')
 * @param {number} limitMs   - Minimum milliseconds between submissions (default: 30 seconds)
 * @param {number} maxPerSession - Max submissions per browser session (default: 10)
 * @returns {{ allowed: boolean, waitMs: number, reason: string | null }}
 */
export function checkRateLimit(formKey, limitMs = 30_000, maxPerSession = 10) {
  const storageKey = `rl_${formKey}`;

  let record;
  try {
    record = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
  } catch {
    record = null;
  }

  const now = Date.now();

  if (!record) {
    return { allowed: true, waitMs: 0, reason: null };
  }

  // Check per-session cap
  if (record.count >= maxPerSession) {
    return {
      allowed: false,
      waitMs: 0,
      reason: `Maximum submissions reached for this session. Please contact us directly.`,
    };
  }

  // Check cooldown
  const elapsed = now - record.lastAt;
  if (elapsed < limitMs) {
    const waitMs = limitMs - elapsed;
    const waitSec = Math.ceil(waitMs / 1000);
    return {
      allowed: false,
      waitMs,
      reason: `Please wait ${waitSec} second${waitSec !== 1 ? 's' : ''} before submitting again.`,
    };
  }

  return { allowed: true, waitMs: 0, reason: null };
}

/**
 * Record a successful submission for rate limiting purposes.
 *
 * @param {string} formKey
 */
export function recordSubmission(formKey) {
  const storageKey = `rl_${formKey}`;
  let record;
  try {
    record = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
  } catch {
    record = null;
  }

  const updated = {
    count: (record?.count ?? 0) + 1,
    lastAt: Date.now(),
  };

  try {
    sessionStorage.setItem(storageKey, JSON.stringify(updated));
  } catch {
    // sessionStorage unavailable — fail silently
  }
}

/**
 * Rate limit keys — centralised constants so form keys never drift.
 */
export const RATE_LIMIT_KEYS = {
  CONTACT:           'contact',
  FRANCHISE_INQUIRY: 'franchise_inquiry',
  BRAND_APPLICATION: 'brand_application',
  JOB_APPLICATION:   'job_application',
  CHATBOT_BRAND:     'chatbot_brand',
  CHATBOT_INVESTOR:  'chatbot_investor',
};
