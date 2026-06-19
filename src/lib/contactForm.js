/** Contact form helpers. re-export phone utilities + email readiness */

import { createEmptyPhoneValue, isValidPhoneValue } from './phoneInput.js';

export { createEmptyPhoneValue, isValidPhoneValue };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContactPhone10(value) {
  return isValidPhoneValue(value);
}

export function isValidContactEmail(value) {
  const trimmed = String(value ?? '').trim();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/** Required * fields filled. enables Send button */
export function isContactFormReady(form) {
  return (
    String(form?.fullName ?? '').trim().length >= 2 &&
    isValidPhoneValue(form?.contactNumber) &&
    isValidContactEmail(form?.email) &&
    String(form?.state ?? '').trim().length >= 1 &&
    String(form?.city ?? '').trim().length >= 2 &&
    String(form?.message ?? '').trim().length >= 1
  );
}
