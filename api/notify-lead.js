/**
 * Vercel serverless: instant lead email notifications after successful form storage.
 * POST /api/notify-lead
 */

import { sendLeadEmail } from './lib/leadEmail.js';
import { getCorsHeaders, validateNotifyRequest } from './lib/validateNotifyRequest.js';

export default async function handler(req, res) {
  const origin = req.headers.origin || req.headers.referer || '';
  const cors = getCorsHeaders(origin);

  Object.entries(cors).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const validation = validateNotifyRequest(req);
  if (!validation.ok) {
    return res.status(validation.status || 400).json({
      ok: false,
      error: validation.error,
    });
  }

  if (validation.preflight) {
    return res.status(204).end();
  }

  try {
    const result = await sendLeadEmail(validation.payload);

    if (!result.ok) {
      console.error('[lead-notify] send_failed', result.error);
      return res.status(502).json({ ok: false, error: 'Failed to send notification email' });
    }

    return res.status(200).json({ ok: true, id: result.id });
  } catch (err) {
    console.error('[lead-notify] unexpected_error', err?.message || err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}
