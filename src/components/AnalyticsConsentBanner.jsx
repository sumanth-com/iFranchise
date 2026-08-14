import { useEffect, useState } from 'react';
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  OPEN_PRIVACY_CHOICES_EVENT,
  setAnalyticsConsent,
} from '@/lib/analytics/analyticsConsent';
import { disableAnalytics, enableAnalytics } from '@/lib/analytics/gtm';
import { trackPageView } from '@/lib/analytics/ga4';

export default function AnalyticsConsentBanner() {
  const [status, setStatus] = useState(() => getAnalyticsConsent());
  const [isOpen, setIsOpen] = useState(() => getAnalyticsConsent() === 'unknown');

  useEffect(() => {
    const open = () => setIsOpen(true);
    const sync = (event) => setStatus(event.detail?.status || getAnalyticsConsent());
    window.addEventListener(OPEN_PRIVACY_CHOICES_EVENT, open);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, sync);
    return () => {
      window.removeEventListener(OPEN_PRIVACY_CHOICES_EVENT, open);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, sync);
    };
  }, []);

  const choose = (nextStatus) => {
    const wasGranted = status === 'granted';
    setAnalyticsConsent(nextStatus);
    setStatus(nextStatus);
    setIsOpen(false);

    if (nextStatus === 'granted') {
      enableAnalytics();
      trackPageView();
    } else {
      disableAnalytics();
      // A reload fully unloads GTM and any container-managed tag listeners that
      // were installed earlier in this page session.
      if (wasGranted) window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-x-2 bottom-2 z-[12000] isolate mx-auto max-h-[calc(100dvh-1rem)] max-w-3xl overflow-y-auto rounded-2xl border border-violet-400/40 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:inset-x-3 sm:bottom-5 sm:p-5"
      style={{ backgroundColor: '#020617' }}
      role="dialog"
      aria-modal="false"
      aria-labelledby="analytics-consent-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 max-w-xl">
          <p id="analytics-consent-title" className="text-sm font-bold">
            Analytics privacy choices
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            <strong>REQUIRES LEGAL REVIEW:</strong> Essential browser storage keeps preferences and core
            site features working. With your optional permission, Google Tag Manager and Google Analytics
            measure page and form performance. Analytics is off unless you accept.{' '}
            <a className="font-semibold underline" href="/privacy-policy">
              Read the Privacy Notice
            </a>
            .
          </p>
          {status !== 'unknown' ? (
            <p className="mt-1.5 text-[11px] text-white/60">
              Current analytics choice: {status === 'granted' ? 'accepted' : 'rejected'}.
            </p>
          ) : null}
        </div>
        <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="min-h-10 rounded-lg border border-white/30 bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="min-h-10 rounded-lg bg-violet-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-violet-500"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
