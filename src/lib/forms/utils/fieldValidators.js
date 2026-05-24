/** Shared field validators for all form types. */

import { isValidPhone10, normalizePhone10 } from '../../phoneInput.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/** Exactly 10 digits (non-digit characters stripped before check). */
export function isValidPhone(value) {
  return isValidPhone10(value);
}

export function normalizePhone(value) {
  return normalizePhone10(value);
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

export const PHONE_VALIDATION_ERROR = 'Please enter a valid 10-digit phone number';

export function validatePhoneField(value) {
  if (!isValidPhone10(value)) {
    return { ok: false, error: PHONE_VALIDATION_ERROR };
  }
  return { ok: true, value: normalizePhone10(value) };
}
