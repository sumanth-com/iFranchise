/** Honeypot spam prevention — bots often fill hidden fields. */

export const HONEYPOT_FIELD = '_hp';

export function checkHoneypot(formData = {}) {
  const value = formData[HONEYPOT_FIELD];
  if (value != null && String(value).trim() !== '') {
    return { ok: false, reason: 'spam' };
  }
  return { ok: true };
}

export function stripHoneypot(formData = {}) {
  const { [HONEYPOT_FIELD]: _removed, ...rest } = formData;
  return rest;
}
