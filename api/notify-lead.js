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
    console.error('[lead-notify]', validation.stage || 'rejected');
    return res.status(validation.status || 400).json({
      ok: false,
      error: validation.error,
      stage: validation.stage || 'rejected',
    });
  }

  if (validation.preflight) {
    return res.status(204).end();
  }

  try {
    const result = await sendLeadEmail(validation.payload);

    if (!result.ok) {
      console.error(
        '[lead-notify]',
        result.stage || 'send_failed',
        result.providerStatus || '',
        result.providerCode || '',
      );
      return res.status(502).json({
        ok: false,
        error: 'Failed to send notification email',
        stage: result.stage || 'send_failed',
        provider_status: result.providerStatus,
        provider_code: result.providerCode || undefined,
      });
    }

    console.info('[lead-notify] accepted_by_resend');
    return res.status(200).json({ ok: true, stage: 'accepted_by_resend', id: result.id });
  } catch {
    console.error('[lead-notify] unexpected_error');
    return res.status(500).json({ ok: false, error: 'Internal server error', stage: 'unexpected_error' });
  }
}
