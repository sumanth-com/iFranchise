/**
 * Build and send lead notification emails (Resend API).
 */

import { createHash } from 'node:crypto';
import { extractLeadFields } from './extractLeadFields.js';

/** Public mark generated from src/assets/iF-Logo.png (email clients need an absolute HTTPS URL). */
const BRAND_LOGO_URL = 'https://www.ifranchise.in/android-chrome-512x512.png';
const BRAND_BLUE = '#3B1FE2';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value, isLast = false) {
  if (!value) return '';
  const border = isLast ? 'none' : '1px solid #EEF0F4';
  return `<tr>
  <td style="padding:14px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.01em;color:#6B7280;vertical-align:top;width:38%;border-bottom:${border};">
    ${escapeHtml(label)}
  </td>
  <td style="padding:14px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:1.5;color:#111827;vertical-align:top;word-break:break-word;border-bottom:${border};">
    ${escapeHtml(value)}
  </td>
</tr>`;
}

function buildDetailRows(entries) {
  const present = entries.filter(([, value]) => Boolean(value));
  return present
    .map(([label, value], index) => row(label, value, index === present.length - 1))
    .join('');
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

  const detailRows = buildDetailRows([
    ['Form Type', lead.formTypeLabel],
    ['Submission Time', lead.submittedAt],
    ['Name', lead.name],
    ['Phone Number', lead.phone],
    ['Email Address', lead.email],
    ['Company Name', lead.company],
    ['Message / Inquiry', lead.message],
    ['Source Page', lead.sourcePage],
    ['Page URL', lead.pageUrl],
    ['Referrer', lead.referrer],
    ...Object.entries(lead.additionalFields),
  ]);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New website lead</title>
  <!--[if mso]>
  <style type="text/css">
    table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F4F5F7;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    New website lead from ${escapeHtml(lead.name)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#F4F5F7;width:100%;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;max-width:600px;margin:0 auto;">
          <tr>
            <td align="center" style="padding:0 0 20px;">
              <img src="${BRAND_LOGO_URL}" width="56" height="56" alt="iFranchise" style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;width:56px;height:56px;border-radius:12px;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 0 20px;">
              <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;font-weight:700;letter-spacing:-0.02em;color:${BRAND_BLUE};text-align:center;">
                New website lead
              </h1>
              <div style="width:48px;height:3px;background-color:${BRAND_BLUE};border-radius:2px;margin:12px auto 0;"></div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(17,24,39,0.04);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
                ${detailRows}
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 8px 0;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#9CA3AF;text-align:center;">
                Sent automatically by iFranchise form notifications.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
