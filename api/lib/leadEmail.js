/**
 * Build and send lead notification emails (Resend API).
 */

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

export function buildLeadEmail(payload) {
  const lead = extractLeadFields(payload);
  const subject = `[New Lead] ${lead.formTypeLabel} - ${lead.name}`;

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
 * @returns {Promise<{ ok: boolean, error?: string, id?: string }>}
 */
export async function sendLeadEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) {
    return {
      ok: false,
      error: 'Email service not configured (RESEND_API_KEY, LEAD_NOTIFICATION_TO, LEAD_NOTIFICATION_FROM).',
    };
  }

  const { subject, html, text } = buildLeadEmail(payload);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
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

  if (!response.ok) {
    return {
      ok: false,
      error: body?.message || `Resend API error (${response.status})`,
    };
  }

  return { ok: true, id: body?.id };
}
