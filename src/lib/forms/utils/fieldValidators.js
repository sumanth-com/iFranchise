/** Shared field validators for all form types. */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[0-9\s\-\(\)]{7,20}$/;

export function isValidEmail(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

export function isValidPhone(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length >= 7 && trimmed.length <= 20 && PHONE_REGEX.test(trimmed);
}

export function isNonEmptyString(value, minLength = 1) {
  return typeof value === 'string' && value.trim().length >= minLength;
}

export function validateRequiredString(value, fieldLabel, { min = 2, max = 5000 } = {}) {
  if (!value || !String(value).trim()) {
    return { ok: false, error: `${fieldLabel} is required` };
  }
  const trimmed = String(value).trim();
  if (trimmed.length < min) {
    return { ok: false, error: `${fieldLabel} must be at least ${min} characters` };
  }
  if (trimmed.length > max) {
    return { ok: false, error: `${fieldLabel} is too long` };
  }
  return { ok: true, value: trimmed };
}
