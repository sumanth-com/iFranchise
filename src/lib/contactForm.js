/** Contact form helpers — client-side readiness + 10-digit phone */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function digitsOnlyPhone(value) {
  return String(value ?? '').replace(/\D/g, '').slice(0, 10);
}

export function isValidContactPhone10(value) {
  return /^\d{10}$/.test(digitsOnlyPhone(value));
}

export function isValidContactEmail(value) {
  const trimmed = String(value ?? '').trim();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/** Required * fields filled — enables Send button */
export function isContactFormReady(form) {
  return (
    String(form?.fullName ?? '').trim().length >= 2 &&
    isValidContactPhone10(form?.contactNumber) &&
    isValidContactEmail(form?.email) &&
    String(form?.message ?? '').trim().length >= 1
  );
}
