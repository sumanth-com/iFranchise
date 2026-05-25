/** Shared phone field UX. Indian mobile numbers: exactly 10 digits */

export const PHONE_MAX_LENGTH = 10;
export const PHONE_PLACEHOLDER = '10-digit mobile number';
export const PHONE_INPUT_PATTERN = '[0-9]{10}';
export const PHONE_INPUT_TITLE = 'Enter a 10-digit mobile number';

/** Strip non-digits and cap at 10 characters */
export function digitsOnlyPhone(value) {
  return String(value ?? '').replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
}

export function isValidPhone10(value) {
  return /^\d{10}$/.test(digitsOnlyPhone(value));
}

/** Normalized 10-digit string for storage/API */
export function normalizePhone10(value) {
  return digitsOnlyPhone(value);
}

/** Show the number the user entered (e.g. on review/summary before submit). */
export function formatPhoneDisplay(phone) {
  const digits = digitsOnlyPhone(phone);
  if (!digits) return 'N/A';
  return digits.length === 10 ? `+91 ${digits}` : digits;
}

/** Common props for <input type="tel" /> */
export function phoneInputProps(overrides = {}) {
  return {
    type: 'tel',
    inputMode: 'numeric',
    autoComplete: 'tel-national',
    maxLength: PHONE_MAX_LENGTH,
    pattern: PHONE_INPUT_PATTERN,
    title: PHONE_INPUT_TITLE,
    placeholder: PHONE_PLACEHOLDER,
    ...overrides,
  };
}
