/**
 * Request validation for lead notification API.
 * Callers authenticate with the server-only LEAD_NOTIFY_SECRET.
 * The website bundle must not contain that secret.
 */

import { timingSafeEqual } from 'node:crypto';

const MAX_BODY_BYTES = 150_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
const rateBuckets = new Map();
const ALLOWED_FORM_TYPES = new Set([
  'contact',
  'brand_application',
  'chatbot_brand',
  'chatbot_investor',
  'chatbot_strategy',
  'brochure_download',
  'franchise_inquiry',
  'career_application',
]);

function parseAllowedOrigins() {
  const raw = process.env.LEAD_NOTIFY_ALLOWED_ORIGINS || '';
  return raw
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

function normalizeOrigin(value) {
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
}

function consumeRateLimit(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '');
  const key = forwarded.split(',')[0].trim() || String(req.socket?.remoteAddress || 'unknown');
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT_MAX) return false;
  current.count += 1;
  return true;
}

export function getCorsHeaders(origin) {
  const allowed = parseAllowedOrigins();
  const normalized = normalizeOrigin(origin);
  const match = normalized && allowed.includes(normalized);

  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Lead-Notify-Key',
    'Access-Control-Max-Age': '86400',
  };

  if (match) {
    headers['Access-Control-Allow-Origin'] = normalized;
    headers.Vary = 'Origin';
  }

  return headers;
}

function secretsMatch(provided, expected) {
  const left = Buffer.from(String(provided));
  const right = Buffer.from(String(expected));
  if (left.length === 0 || left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function headerValue(req, name) {
  const value = req.headers?.[name];
  const first = Array.isArray(value) ? value[0] : value;
  return String(first || '').trim();
}

function readJsonBody(req) {
  let body = req.body;
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') {
    const trimmed = body.trim();
    if (!trimmed) {
      return { ok: false, status: 400, error: 'Missing request body', stage: 'missing_body' };
    }
    try {
      body = JSON.parse(trimmed);
    } catch {
      return { ok: false, status: 400, error: 'Invalid JSON body', stage: 'invalid_json' };
    }
  }
  return { ok: true, body };
}

function unwrapPayload(body) {
  let payload = body.payload != null ? body.payload : body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return null;
    }
  }
  return payload;
}

export function validateNotifyRequest(req) {
  if (req.method === 'OPTIONS') {
    return { ok: true, preflight: true, stage: 'preflight' };
  }

  if (req.method !== 'POST') {
    return { ok: false, status: 405, error: 'Method not allowed', stage: 'method_not_allowed' };
  }

  // One ceiling per source address. Apps Script uses shared Google egress,
  // so this stays high enough for real leads and still caps a leaked key.
  if (!consumeRateLimit(req)) {
    return { ok: false, status: 429, error: 'Too many requests', stage: 'rate_limited' };
  }

  const secret = String(process.env.LEAD_NOTIFY_SECRET || '').trim();
  if (!secret) {
    return {
      ok: false,
      status: 503,
      error: 'Notification service not configured',
      stage: 'missing_notify_secret',
    };
  }

  const provided = headerValue(req, 'x-lead-notify-key');
  if (!secretsMatch(provided, secret)) {
    return { ok: false, status: 401, error: 'Unauthorized', stage: 'auth_failed' };
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: 'Payload too large', stage: 'payload_too_large' };
  }

  const parsedBody = readJsonBody(req);
  if (!parsedBody.ok) return parsedBody;

  const body = parsedBody.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, status: 400, error: 'Missing request body', stage: 'missing_body' };
  }

  const payload = unwrapPayload(body);
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, status: 400, error: 'Invalid payload', stage: 'invalid_payload' };
  }

  const formType = payload.form_type;
  if (!formType || typeof formType !== 'string' || !ALLOWED_FORM_TYPES.has(formType)) {
    return { ok: false, status: 400, error: 'Invalid or missing form_type', stage: 'invalid_form_type' };
  }

  if (!payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) {
    return { ok: false, status: 400, error: 'Invalid or missing data', stage: 'invalid_data' };
  }

  let payloadBytes;
  try {
    payloadBytes = Buffer.byteLength(JSON.stringify(payload), 'utf8');
  } catch {
    return { ok: false, status: 400, error: 'Invalid payload', stage: 'invalid_payload' };
  }
  if (payloadBytes > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: 'Payload too large', stage: 'payload_too_large' };
  }

  return { ok: true, payload, stage: 'validated' };
}
