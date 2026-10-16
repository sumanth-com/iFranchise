/**
 * Build and send lead notification emails (Resend API).
 */

import { createHash } from 'node:crypto';
import { extractLeadFields } from './extractLeadFields.js';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;vertical-align:top;width:160px;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111827;">${escapeHtml(value)}</td></tr>`;
}

function resolveNotificationRecipient(formType) {
  if (formType === 'career_application') {
    return process.env.LEAD_NOTIFICATION_TO_CAREERS || 'hr@ifranchise.in';
  }
  return process.env.LEAD_NOTIFICATION_TO;
}

export function buildLeadEmail(payload) {
  const lead = extractLeadFields(payload);
  const roleTitle = payload?.data?.role_title?.trim() || '';
  const subject =
    lead.formType === 'career_application'
      ? `[Career Application] ${roleTitle || lead.formTypeLabel} - ${lead.name}`
      : `[New Lead] ${lead.formTypeLabel} - ${lead.name}`;

  const additionalRows = Object.entries(lead.additionalFields)
    .map(([label, value]) => row(label, value))
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#111827;max-width:640px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 16px;color:#1e40af;">New website lead</h2>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    ${row('Form Type', lead.formTypeLabel)}
    ${row('Submission Time', lead.submittedAt)}
    ${row('Name', lead.name)}
    ${row('Phone Number', lead.phone)}
    ${row('Email Address', lead.email)}
    ${row('Company Name', lead.company)}
    ${row('Message / Inquiry', lead.message)}
    ${row('Source Page', lead.sourcePage)}
    ${row('Page URL', lead.pageUrl)}
    ${row('Referrer', lead.referrer)}
    ${additionalRows}
  </table>
  <p style="margin-top:24px;font-size:12px;color:#6b7280;">Sent automatically by iFranchise form notifications.</p>
</body>
</html>`;

  const additionalPlain = Object.entries(lead.additionalFields)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

  const text = [
    'New website lead',
    '',
    `Form Type: ${lead.formTypeLabel}`,
    `Submission Time: ${lead.submittedAt}`,
    `Name: ${lead.name}`,
    `Phone Number: ${lead.phone || '(not provided)'}`,
    `Email Address: ${lead.email || '(not provided)'}`,
    `Company Name: ${lead.company || '(not provided)'}`,
    `Message / Inquiry: ${lead.message || '(not provided)'}`,
    `Source Page: ${lead.sourcePage}`,
    lead.pageUrl ? `Page URL: ${lead.pageUrl}` : '',
    lead.referrer ? `Referrer: ${lead.referrer}` : '',
    additionalPlain,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text, lead };
}

/**
 * Ask Resend to accept one message.
 * `accepted_by_resend` means Resend took the send. It does not mean the inbox has it.
 * @returns {Promise<{ ok: boolean, stage: string, id?: string, providerStatus?: number, providerCode?: string }>}
 */
export async function sendLeadEmail(payload) {
  const apiKey = String(process.env.RESEND_API_KEY || '').trim();
  const formType = payload?.form_type || '';
  const to = String(resolveNotificationRecipient(formType) || '').trim();
  const from = String(process.env.LEAD_NOTIFICATION_FROM || '').trim();

  if (!apiKey || !to || !from) {
    return { ok: false, stage: 'missing_email_config' };
  }

  const { subject, html, text } = buildLeadEmail(payload);
  const idempotencyKey = createHash('sha256')
    .update(
      JSON.stringify({
        formType,
        submittedAt: payload?.submitted_at || '',
        sourcePage: payload?.source_page || '',
        email: payload?.data?.email || payload?.data?.contactEmail || '',
        phone: payload?.data?.phone || payload?.data?.contact_phone || payload?.data?.contactPhone || '',
      }),
    )
    .digest('hex');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  const body = await response.json().catch(() => ({}));

  const providerCode =
    typeof body?.name === 'string' && /^[a-z0-9_]+$/i.test(body.name) ? body.name : '';

  if (!response.ok) {
    return {
      ok: false,
      stage: 'resend_rejected',
      providerStatus: response.status,
      providerCode,
    };
  }

  return { ok: true, stage: 'accepted_by_resend', id: body?.id };
}
