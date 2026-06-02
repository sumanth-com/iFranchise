#!/usr/bin/env node
/**
 * Smoke-test POST /api/notify-lead (run with `vercel dev` or against production URL).
 *
 * Usage:
 *   LEAD_NOTIFY_SECRET=xxx RESEND_API_KEY=xxx LEAD_NOTIFICATION_TO=... LEAD_NOTIFICATION_FROM=... \
 *     node scripts/verify-lead-notify.mjs
 *
 *   NOTIFY_BASE_URL=https://www.ifranchise.in node scripts/verify-lead-notify.mjs
 */

const base = (process.env.NOTIFY_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const secret = process.env.LEAD_NOTIFY_SECRET || process.env.VITE_LEAD_NOTIFY_SECRET;

if (!secret) {
  console.error('Set LEAD_NOTIFY_SECRET (or VITE_LEAD_NOTIFY_SECRET) to run this script.');
  process.exit(1);
}

const payload = {
  form_type: 'contact',
  sheet_tab: 'Contact_Leads',
  submitted_at: new Date().toISOString(),
  source_page: 'verify_script',
  data: {
    name: 'Verify Test Lead',
    email: 'verify@example.com',
    phone: '9999999999',
    company: 'Test Co',
    message: 'Automated verify-lead-notify script',
  },
  metadata: {
    source_page: 'verify_script',
    page_url: `${base}/contact-us`,
    path: '/contact-us',
  },
};

const url = `${base}/api/notify-lead`;

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Lead-Notify-Key': secret,
  },
  body: JSON.stringify({ payload }),
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text };
}

console.log('POST', url);
console.log('Status:', res.status);
console.log('Response:', json);

if (!res.ok) {
  process.exit(1);
}

console.log('OK — check LEAD_NOTIFICATION_TO inbox for the test email.');
