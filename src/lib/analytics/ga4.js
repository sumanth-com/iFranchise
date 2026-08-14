/**
 * Analytics facade — GTM-only in production. Direct gtag fallback only if GTM snippet is absent (local dev).
 */
import {
  GA4_MEASUREMENT_ID,
  ensureDataLayer,
  isGtmInstalled,
  pushToDataLayer,
  scheduleAnalytics as scheduleGtmAnalytics,
  trackEvent as trackGtmEvent,
  trackPageView as pushGtmPageView,
} from './gtm.js';
import { hasAnalyticsConsent } from './analyticsConsent.js';

export { GA4_MEASUREMENT_ID };

let fallbackReady = false;
let fallbackScheduled = false;
let lastFallbackPageKey = null;

function ensureGtagStub() {
  ensureDataLayer();
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

function loadFallbackGtag() {
  if (fallbackReady || typeof document === 'undefined' || !hasAnalyticsConsent()) return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    fallbackReady = true;
    return;
  }

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  s.onload = () => {
    ensureGtagStub();
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false });
    fallbackReady = true;
  };
  document.head.appendChild(s);
}

function scheduleFallbackGtag() {
  if (fallbackScheduled || typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  fallbackScheduled = true;
  ensureGtagStub();

  const trigger = () => {
    window.removeEventListener('pointerdown', trigger, true);
    window.removeEventListener('keydown', trigger, true);
    window.removeEventListener('scroll', trigger, true);
    loadFallbackGtag();
  };

  window.addEventListener('pointerdown', trigger, { once: true, capture: true, passive: true });
  window.addEventListener('keydown', trigger, { once: true, capture: true });
  window.addEventListener('scroll', trigger, { once: true, passive: true });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadFallbackGtag(), { timeout: 8000 });
  } else {
    setTimeout(loadFallbackGtag, 5000);
  }
}

function sendFallbackPageView(logicalRoute) {
  const pagePath = `${window.location.pathname}${window.location.search}`;
  if (lastFallbackPageKey === pagePath) return;
  lastFallbackPageKey = pagePath;

  const send = () => {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title || 'iFranchise',
      route_name: logicalRoute || undefined,
    });
  };

  if (fallbackReady) {
    send();
  } else {
    const onReady = () => {
      if (fallbackReady) send();
    };
    const interval = setInterval(() => {
      if (fallbackReady) {
        clearInterval(interval);
        onReady();
      }
    }, 100);
    setTimeout(() => clearInterval(interval), 10000);
  }
}

/** SPA page view — GTM dataLayer only when GTM is installed. */
export function trackPageView({ logicalRoute } = {}) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  scheduleGtmAnalytics();

  if (isGtmInstalled()) {
    pushGtmPageView({ logicalRoute });
    return;
  }

  scheduleFallbackGtag();
  sendFallbackPageView(logicalRoute);
}

/** Custom events — dataLayer (GTM) or gtag fallback. */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !eventName || !hasAnalyticsConsent()) return;

  scheduleGtmAnalytics();

  if (isGtmInstalled()) {
    trackGtmEvent(eventName, params);
    return;
  }

  scheduleFallbackGtag();
  ensureGtagStub();
  pushToDataLayer({ event: eventName, ...params });
  if (fallbackReady) {
    window.gtag('event', eventName, params);
  }
}

export function scheduleAnalytics() {
  if (!hasAnalyticsConsent()) return;
  scheduleGtmAnalytics();

  import('./conversionClickTracking.js').then(({ initConversionClickTracking }) => {
    initConversionClickTracking();
  });
}
