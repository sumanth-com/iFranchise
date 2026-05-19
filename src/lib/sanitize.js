/**
 * Frontend input sanitization - strips markup/control chars before validation/submit.
 */

const HTML_TAG = /<[^>]*>/g;
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export function sanitizeText(value, maxLength = 5000) {
  if (value == null) return '';
  return String(value).replace(HTML_TAG, '').replace(CONTROL_CHARS, '').trim().slice(0, maxLength);
}

export function sanitizeEmail(value) {
  return sanitizeText(value, 254).toLowerCase();
}

export function sanitizePhone(value) {
  return sanitizeText(value, 20).replace(/[^\d+\s\-()]/g, '');
}

export function sanitizeObjectStrings(obj, maxLength = 5000) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = { ...obj };
  for (const key of Object.keys(out)) {
    if (typeof out[key] === 'string') {
      out[key] = sanitizeText(out[key], maxLength);
    }
  }
  return out;
}
