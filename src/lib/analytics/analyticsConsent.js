export const ANALYTICS_CONSENT_STORAGE_KEY = 'ifranchise-analytics-consent-v1';
export const ANALYTICS_CONSENT_EVENT = 'ifranchise:analytics-consent-change';
export const OPEN_PRIVACY_CHOICES_EVENT = 'ifranchise:open-privacy-choices';

const VALID_STATUSES = new Set(['granted', 'denied']);

export function getAnalyticsConsent() {
  if (typeof window === 'undefined') return 'unknown';

  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (!stored) return 'unknown';
    const record = JSON.parse(stored);
    return VALID_STATUSES.has(record?.status) ? record.status : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === 'granted';
}

export function setAnalyticsConsent(status) {
  if (!VALID_STATUSES.has(status) || typeof window === 'undefined') return;

  const record = {
    purpose: 'website_analytics',
    status,
    timestamp: new Date().toISOString(),
    notice_version: 'dpdp-technical-draft-2026-08-13',
    source: 'analytics_preferences',
  };

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // The in-memory event still lets this page respect the user's choice.
  }

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, {
      detail: record,
    }),
  );
}

export function openPrivacyChoices() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_PRIVACY_CHOICES_EVENT));
}
