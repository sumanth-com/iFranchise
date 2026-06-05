/** Shared phone field utilities — country selector + local number + E.164 output. */

export const DEFAULT_PHONE_COUNTRY = 'IN';

/** @typedef {{ code: string, name: string, dial: string, flag: string, minLength: number, maxLength: number, pattern?: RegExp }} PhoneCountry */

/** @typedef {{ countryCode: string, local: string }} PhoneValue */

/** @type {PhoneCountry[]} */
export const PHONE_COUNTRIES = [
  { code: 'IN', name: 'India', dial: '91', flag: '🇮🇳', minLength: 10, maxLength: 10, pattern: /^[6-9]\d{9}$/ },
  { code: 'AE', name: 'UAE', dial: '971', flag: '🇦🇪', minLength: 9, maxLength: 9 },
  { code: 'US', name: 'United States', dial: '1', flag: '🇺🇸', minLength: 10, maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', dial: '44', flag: '🇬🇧', minLength: 10, maxLength: 10 },
  { code: 'SG', name: 'Singapore', dial: '65', flag: '🇸🇬', minLength: 8, maxLength: 8 },
  { code: 'AU', name: 'Australia', dial: '61', flag: '🇦🇺', minLength: 9, maxLength: 9 },
  { code: 'SA', name: 'Saudi Arabia', dial: '966', flag: '🇸🇦', minLength: 9, maxLength: 9 },
  { code: 'CA', name: 'Canada', dial: '1', flag: '🇨🇦', minLength: 10, maxLength: 10 },
  { code: 'MY', name: 'Malaysia', dial: '60', flag: '🇲🇾', minLength: 9, maxLength: 10 },
  { code: 'QA', name: 'Qatar', dial: '974', flag: '🇶🇦', minLength: 8, maxLength: 8 },
  { code: 'KW', name: 'Kuwait', dial: '965', flag: '🇰🇼', minLength: 8, maxLength: 8 },
  { code: 'OM', name: 'Oman', dial: '968', flag: '🇴🇲', minLength: 8, maxLength: 8 },
  { code: 'BH', name: 'Bahrain', dial: '973', flag: '🇧🇭', minLength: 8, maxLength: 8 },
  { code: 'LK', name: 'Sri Lanka', dial: '94', flag: '🇱🇰', minLength: 9, maxLength: 9 },
  { code: 'NP', name: 'Nepal', dial: '977', flag: '🇳🇵', minLength: 10, maxLength: 10 },
  { code: 'BD', name: 'Bangladesh', dial: '880', flag: '🇧🇩', minLength: 10, maxLength: 10 },
  { code: 'PK', name: 'Pakistan', dial: '92', flag: '🇵🇰', minLength: 10, maxLength: 10 },
  { code: 'DE', name: 'Germany', dial: '49', flag: '🇩🇪', minLength: 10, maxLength: 11 },
  { code: 'FR', name: 'France', dial: '33', flag: '🇫🇷', minLength: 9, maxLength: 9 },
];

const COUNTRY_BY_CODE = Object.fromEntries(PHONE_COUNTRIES.map((c) => [c.code, c]));

/** Longest dial codes first for reliable international paste detection. */
const COUNTRIES_BY_DIAL_LENGTH = [...PHONE_COUNTRIES].sort(
  (a, b) => b.dial.length - a.dial.length || a.name.localeCompare(b.name),
);

/** @returns {PhoneValue} */
export function createEmptyPhoneValue(countryCode = DEFAULT_PHONE_COUNTRY) {
  return { countryCode, local: '' };
}

export const EMPTY_PHONE_VALUE = createEmptyPhoneValue();

/** @param {unknown} value */
export function isPhoneValue(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.countryCode === 'string' &&
    typeof value.local === 'string'
  );
}

/**
 * Normalize legacy string or partial object into PhoneValue.
 * @param {unknown} value
 * @returns {PhoneValue}
 */
export function coercePhoneValue(value) {
  if (isPhoneValue(value)) {
    return {
      countryCode: value.countryCode || DEFAULT_PHONE_COUNTRY,
      local: String(value.local ?? '').replace(/\D/g, ''),
    };
  }

  const raw = String(value ?? '').trim();
  if (!raw) return createEmptyPhoneValue();

  const parsed = parseInternationalInput(raw);
  if (parsed) return parsed;

  return {
    countryCode: DEFAULT_PHONE_COUNTRY,
    local: parseLocalPhoneInput(raw, DEFAULT_PHONE_COUNTRY),
  };
}

/** @param {string} [countryCode] */
export function getPhoneCountry(countryCode = DEFAULT_PHONE_COUNTRY) {
  return COUNTRY_BY_CODE[countryCode] || COUNTRY_BY_CODE[DEFAULT_PHONE_COUNTRY];
}

/** @param {string} [countryCode] */
export function getPhonePlaceholder(countryCode = DEFAULT_PHONE_COUNTRY) {
  const country = getPhoneCountry(countryCode);
  if (country.minLength === country.maxLength) {
    return `${country.maxLength}-digit mobile number`;
  }
  return `${country.minLength}–${country.maxLength} digit mobile number`;
}

/** @param {string} [countryCode] */
export function getPhoneValidationError(countryCode = DEFAULT_PHONE_COUNTRY) {
  const country = getPhoneCountry(countryCode);
  if (country.minLength === country.maxLength) {
    return `Please enter a valid ${country.maxLength}-digit mobile number`;
  }
  return `Please enter a valid mobile number (${country.minLength}–${country.maxLength} digits)`;
}

/**
 * Detect country + local number from pasted/typed international input.
 * @param {string} raw
 * @returns {PhoneValue | null}
 */
export function parseInternationalInput(raw) {
  let digits = String(raw ?? '').replace(/\D/g, '');
  if (!digits) return null;

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  for (const country of COUNTRIES_BY_DIAL_LENGTH) {
    if (!digits.startsWith(country.dial)) continue;
    const local = digits.slice(country.dial.length);
    if (!local.length) continue;
    if (local.length < country.minLength || local.length > country.maxLength) continue;
    if (country.pattern && !country.pattern.test(local)) continue;
    return { countryCode: country.code, local };
  }

  return null;
}

/**
 * Parse pasted/typed/autofill value into local digits (no country dial code).
 * @param {string} raw
 * @param {string} [countryCode]
 */
export function parseLocalPhoneInput(raw, countryCode = DEFAULT_PHONE_COUNTRY) {
  const country = getPhoneCountry(countryCode);
  const international = parseInternationalInput(raw);
  if (international) {
    return international.local.slice(0, country.maxLength);
  }

  let digits = String(raw ?? '').replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith(country.dial)) {
    const withoutDial = digits.slice(country.dial.length);
    if (
      withoutDial.length >= country.minLength &&
      withoutDial.length <= country.maxLength + 1
    ) {
      digits = withoutDial;
    } else if (digits.length > country.maxLength) {
      digits = withoutDial;
    }
  }

  if (countryCode === 'IN' && digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return digits.slice(0, country.maxLength);
}

/** @param {string} value @param {string} [countryCode] */
export function digitsOnlyLocalPhone(value, countryCode = DEFAULT_PHONE_COUNTRY) {
  return parseLocalPhoneInput(value, countryCode);
}

/** Backward-compatible India helper */
export function digitsOnlyPhone(value) {
  return parseLocalPhoneInput(value, DEFAULT_PHONE_COUNTRY);
}

/** @param {string} value @param {string} [countryCode] */
export function isValidLocalPhone(value, countryCode = DEFAULT_PHONE_COUNTRY) {
  const country = getPhoneCountry(countryCode);
  const digits = parseLocalPhoneInput(value, countryCode);
  if (digits.length < country.minLength || digits.length > country.maxLength) {
    return false;
  }
  if (country.pattern && !country.pattern.test(digits)) {
    return false;
  }
  return true;
}

/** @param {unknown} value */
export function isValidPhoneValue(value) {
  const phone = coercePhoneValue(value);
  return isValidLocalPhone(phone.local, phone.countryCode);
}

export function isValidPhone10(value) {
  return isValidLocalPhone(value, DEFAULT_PHONE_COUNTRY);
}

/** Normalized local digits for a country (no dial code). */
export function normalizeLocalPhone(value, countryCode = DEFAULT_PHONE_COUNTRY) {
  return parseLocalPhoneInput(value, countryCode);
}

export function normalizePhone10(value) {
  return parseLocalPhoneInput(value, DEFAULT_PHONE_COUNTRY);
}

/**
 * Build E.164 and metadata for submission.
 * @param {string} countryCode
 * @param {string} local
 */
export function buildPhoneSubmission(countryCode, local) {
  const country = getPhoneCountry(countryCode);
  const localDigits = parseLocalPhoneInput(local, countryCode);
  const dialCode = `+${country.dial}`;
  return {
    phone: `${dialCode}${localDigits}`,
    phoneCountry: country.name,
    phoneCountryCode: country.code,
    phoneDialCode: dialCode,
    phoneLocal: localDigits,
  };
}

/** Display for review/summary UI. */
export function formatPhoneDisplay(phone, countryCode = DEFAULT_PHONE_COUNTRY) {
  const value = coercePhoneValue(
    isPhoneValue(phone) ? phone : { countryCode, local: phone },
  );
  const country = getPhoneCountry(value.countryCode);
  const digits = parseLocalPhoneInput(value.local, value.countryCode);
  if (!digits) return 'N/A';
  if (digits.length >= country.minLength) {
    return `+${country.dial} ${digits}`;
  }
  return digits;
}

/** @deprecated Use createEmptyPhoneValue — kept for imports */
export const PHONE_MAX_LENGTH = 10;
export const PHONE_PLACEHOLDER = getPhonePlaceholder(DEFAULT_PHONE_COUNTRY);
export const PHONE_INPUT_PATTERN = '[0-9]{10}';
export const PHONE_INPUT_TITLE = 'Enter a 10-digit mobile number';

/** @param {string} [countryCode] @param {object} [overrides] */
export function phoneInputProps(countryCode = DEFAULT_PHONE_COUNTRY, overrides = {}) {
  const country = getPhoneCountry(countryCode);
  return {
    type: 'tel',
    inputMode: 'numeric',
    autoComplete: 'tel-national',
    maxLength: country.maxLength,
    title: getPhonePlaceholder(countryCode),
    placeholder: getPhonePlaceholder(countryCode),
    ...overrides,
  };
}
