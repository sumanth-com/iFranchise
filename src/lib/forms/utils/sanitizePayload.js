/**
 * Outbound form payload sanitization. strips control chars, limits size, prevents crashes.
 */

const MAX_STRING = 8_000;
const MAX_SHORT = 500;
const MAX_PAYLOAD_JSON = 120_000;

const SCRIPT_TAG_RE = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

export function sanitizeString(value, max = MAX_SHORT) {
  if (value == null) return '';
  return String(value)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(SCRIPT_TAG_RE, '')
    .trim()
    .slice(0, max);
}

function sanitizeValue(value, depth = 0) {
  if (depth > 6) return null;
  if (value == null) return value;
  if (typeof value === 'string') return sanitizeString(value, MAX_STRING);
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) {
    return value.slice(0, 50).map((item) => sanitizeValue(item, depth + 1));
  }
  if (typeof value === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(value).slice(0, 80)) {
      const safeKey = sanitizeString(key, 120);
      if (!safeKey) continue;
      out[safeKey] = sanitizeValue(val, depth + 1);
    }
    return out;
  }
  return null;
}

/**
 * Sanitize full Apps Script payload before network send.
 * @returns {{ ok: true, payload: object } | { ok: false, error: string, code: string }}
 */
export function prepareOutboundPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'Invalid submission data.', code: 'INVALID_PAYLOAD' };
  }

  const formType = sanitizeString(payload.form_type, 80);
  const sheetTab = sanitizeString(payload.sheet_tab, 80);

  if (!formType || !sheetTab) {
    return { ok: false, error: 'Invalid submission data.', code: 'INVALID_PAYLOAD' };
  }

  const data = payload.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { ok: false, error: 'Invalid submission data.', code: 'INVALID_PAYLOAD' };
  }

  const sanitized = {
    form_type: formType,
    sheet_tab: sheetTab,
    submitted_at:
      typeof payload.submitted_at === 'string'
        ? sanitizeString(payload.submitted_at, 40)
        : new Date().toISOString(),
    source_page: sanitizeString(payload.source_page, 120),
    data: sanitizeValue(data),
    metadata: payload.metadata ? sanitizeValue(payload.metadata) : undefined,
  };

  let json;
  try {
    json = JSON.stringify(sanitized);
  } catch {
    return { ok: false, error: 'Invalid submission data.', code: 'SERIALIZE_ERROR' };
  }

  if (!json || json.length < 10) {
    return { ok: false, error: 'Invalid submission data.', code: 'EMPTY_PAYLOAD' };
  }

  if (json.length > MAX_PAYLOAD_JSON) {
    return { ok: false, error: 'Submission is too large. Please shorten your message.', code: 'PAYLOAD_TOO_LARGE' };
  }

  return { ok: true, payload: sanitized };
}
