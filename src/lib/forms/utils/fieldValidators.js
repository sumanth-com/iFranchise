/** Shared field validators for all form types. */

import {
  buildPhoneSubmission,
  coercePhoneValue,
  getPhoneValidationError,
  isValidPhoneValue,
  isValidPhone10,
  normalizePhone10,
} from '../../phoneInput.js';
import { applyPhoneSubmission } from './phoneSubmission.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/** @deprecated Use isValidPhoneValue */
export function isValidPhone(value) {
  return isValidPhone10(value);
}

/** @deprecated Use validatePhoneField */
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

export const PHONE_VALIDATION_ERROR = 'Please enter a valid phone number';

/**
 * Validate international phone value and return E.164 + metadata.
 * @param {unknown} value - PhoneValue object or legacy string
 */
export function validatePhoneField(value) {
  const phone = coercePhoneValue(value);
  if (!phone.local) {
    return { ok: false, error: PHONE_VALIDATION_ERROR };
  }
  if (!isValidPhoneValue(phone)) {
    return { ok: false, error: getPhoneValidationError(phone.countryCode) };
  }
  const submission = buildPhoneSubmission(phone.countryCode, phone.local);
  return { ok: true, value: submission.phone, ...submission };
}

/**
 * Validate a named phone field on form data and attach metadata.
 * @param {object} data
 * @param {object} errors
 * @param {string} fieldName
 */
export function validatePhoneFieldOnData(data, errors, fieldName) {
  const result = validatePhoneField(data[fieldName]);
  if (!result.ok) {
    errors[fieldName] = result.error;
    return;
  }
  applyPhoneSubmission(data, result, fieldName);
}
