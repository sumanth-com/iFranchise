/**
 * Request validation for lead notification API.
 */

const MAX_BODY_BYTES = 150_000;

function parseAllowedOrigins() {
  // Optional allowlist for CORS. Authentication is enforced by LEAD_NOTIFY_SECRET,
  // so if this list is empty we fall back to allowing the request origin.
  const raw = process.env.LEAD_NOTIFY_ALLOWED_ORIGINS || '';
  return raw
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

export function getCorsHeaders(origin) {
  const allowed = parseAllowedOrigins();
  const normalized = origin ? origin.replace(/\/$/, '') : '';
  const match =
    allowed.length === 0 ||
    (normalized && allowed.some((a) => a === normalized || normalized.startsWith(a)));

  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Lead-Notify-Key',
    'Access-Control-Max-Age': '86400',
  };

  if (match && normalized) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else if (allowed.length === 1) {
    headers['Access-Control-Allow-Origin'] = allowed[0];
  }

  return headers;
}

export function validateNotifyRequest(req) {
  if (req.method === 'OPTIONS') {
    return { ok: true, preflight: true };
  }

  if (req.method !== 'POST') {
    return { ok: false, status: 405, error: 'Method not allowed' };
  }

  const secret = process.env.LEAD_NOTIFY_SECRET;
  if (!secret) {
    return { ok: false, status: 503, error: 'Notification service not configured' };
  }

  const provided =
    req.headers['x-lead-notify-key'] ||
    req.headers['X-Lead-Notify-Key'] ||
    '';
  if (provided !== secret) {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: 'Payload too large' };
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return { ok: false, status: 400, error: 'Invalid JSON body' };
    }
  }

  if (!body || typeof body !== 'object') {
    return { ok: false, status: 400, error: 'Missing request body' };
  }

  const payload = body.payload || body;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, status: 400, error: 'Invalid payload' };
  }

  const formType = payload.form_type;
  if (!formType || typeof formType !== 'string' || formType.length > 80) {
    return { ok: false, status: 400, error: 'Invalid or missing form_type' };
  }

  if (!payload.data || typeof payload.data !== 'object') {
    return { ok: false, status: 400, error: 'Invalid or missing data' };
  }

  return { ok: true, payload };
}
