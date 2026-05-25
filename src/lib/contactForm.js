/** Contact form helpers. re-export phone utilities + email readiness */

import { digitsOnlyPhone, isValidPhone10 } from './phoneInput.js';

export { digitsOnlyPhone };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContactPhone10(value) {
  return isValidPhone10(value);
}

export function isValidContactEmail(value) {
  const trimmed = String(value ?? '').trim();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/** Required * fields filled. enables Send button */
export function isContactFormReady(form) {
  return (
    String(form?.fullName ?? '').trim().length >= 2 &&
    isValidContactPhone10(form?.contactNumber) &&
    isValidContactEmail(form?.email) &&
    String(form?.message ?? '').trim().length >= 1
  );
}
