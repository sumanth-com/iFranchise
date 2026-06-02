/**
 * Fire-and-forget lead email notifications after successful Google Sheets submission.
 * Never blocks or alters the submission result.
 */

import { logFormInfo, logFormWarn } from './formLogger.js';

function isNotifyEnabled() {
  const flag = import.meta.env.VITE_LEAD_NOTIFY_ENABLED;
  return flag === 'true' || flag === '1';
}

function resolveNotifyUrl() {
  const configured = import.meta.env.VITE_LEAD_NOTIFY_URL;
  if (configured && String(configured).trim()) {
    return String(configured).trim();
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/notify-lead`;
  }
  return '/api/notify-lead';
}

/**
 * Queue a lead notification. Failures are logged only; never thrown.
 * @param {object} payload - Sanitized outbound payload (same as sent to Google Sheets)
 */
export function notifyLeadSubmission(payload) {
  if (!isNotifyEnabled()) return;
  if (!payload?.form_type || !payload?.data) return;

  const secret = import.meta.env.VITE_LEAD_NOTIFY_SECRET;
  if (!secret) {
    if (import.meta.env.DEV) {
      logFormWarn('lead_notify_skipped', {
        formType: payload.form_type,
        code: 'NOTIFY_CONFIG',
        debug: 'VITE_LEAD_NOTIFY_SECRET not set',
      });
    }
    return;
  }

  const url = resolveNotifyUrl();
  const body = JSON.stringify({ payload });

  const send = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lead-Notify-Key': secret,
      },
      body,
      keepalive: true,
      credentials: 'same-origin',
    })
      .then((res) => {
        if (!res.ok) {
          logFormWarn('lead_notify_failed', {
            formType: payload.form_type,
            status: res.status,
            code: 'NOTIFY_HTTP_ERROR',
          });
          return;
        }
        logFormInfo('lead_notify_sent', { formType: payload.form_type });
      })
      .catch((err) => {
        logFormWarn('lead_notify_failed', {
          formType: payload.form_type,
          code: 'NOTIFY_NETWORK_ERROR',
          debug: import.meta.env.DEV ? err?.message : undefined,
        });
      });
  };

  if (typeof queueMicrotask === 'function') {
    queueMicrotask(send);
  } else {
    setTimeout(send, 0);
  }
}
