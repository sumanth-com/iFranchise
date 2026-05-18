/**
 * Prevents identical submissions within a short window (same browser session).
 */

const STORAGE_PREFIX = 'form_dup_';
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

function fingerprint(formType, data = {}) {
  const parts = [
    formType,
    data.email,
    data.contactEmail,
    data.contactPhone,
    data.phone,
    data.contactNumber,
    data.fullName,
    data.name,
    data.contactName,
    data.brandName,
    data.message,
    data.roleTitle,
  ]
    .filter(Boolean)
    .map((v) => String(v).trim().toLowerCase())
    .join('|');

  return parts || `${formType}:empty`;
}

export function checkDuplicateSubmission(formType, validatedData) {
  if (typeof sessionStorage === 'undefined') {
    return { ok: true };
  }

  const key = STORAGE_PREFIX + fingerprint(formType, validatedData);
  const now = Date.now();

  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { at } = JSON.parse(raw);
      if (now - at < DUPLICATE_WINDOW_MS) {
        return {
          ok: false,
          error: 'You already submitted this form recently. Please wait a few minutes or contact us directly.',
          code: 'DUPLICATE',
        };
      }
    }
  } catch {
    return { ok: true };
  }

  return { ok: true, storageKey: key };
}

export function recordDuplicateSubmission(storageKey) {
  if (!storageKey || typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(storageKey, JSON.stringify({ at: Date.now() }));
  } catch {
    // ignore
  }
}
