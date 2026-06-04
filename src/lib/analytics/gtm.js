/**
 * Google Tag Manager — single source of truth for analytics (container GTM-P6Z67GFD).
 * GA4 property G-SSHRXE8TFM must be configured inside GTM, not via direct gtag in app code.
 */

export const GTM_CONTAINER_ID =
  import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-P6Z67GFD';

/** Configure this ID on your GA4 Configuration tag in GTM (not in application code). */
export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-SSHRXE8TFM';

let lastPageKey = null;
let scheduled = false;

export function isGtmInstalled() {
  if (typeof window === 'undefined') return false;
  if (window.__IFR_GTM_CONTAINER__ === GTM_CONTAINER_ID) return true;
  if (typeof document === 'undefined') return false;
  return !!document.querySelector(
    `script[src*="googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}"]`,
  );
}

export function ensureDataLayer() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

export function pushToDataLayer(payload) {
  ensureDataLayer();
  window.dataLayer.push(payload);
}

/**
 * SPA page view — one push per pathname+search (GTM Custom Event trigger: page_view).
 * @param {{ logicalRoute?: string }} [options]
 */
export function trackPageView({ logicalRoute } = {}) {
  if (typeof window === 'undefined') return;
  ensureDataLayer();

  const pagePath = `${window.location.pathname}${window.location.search}`;
  if (lastPageKey === pagePath) return;
  lastPageKey = pagePath;

  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title || 'iFranchise',
    route_name: logicalRoute || undefined,
    measurement_id: GA4_MEASUREMENT_ID,
  });
}

/**
 * Custom events for GTM triggers (no direct gtag).
 * @param {string} eventName
 * @param {Record<string, unknown>} [params]
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !eventName) return;
  pushToDataLayer({ event: eventName, ...params });
}

/** Idempotent bootstrap — dataLayer only when GTM snippet is present. */
export function scheduleAnalytics() {
  if (scheduled || typeof window === 'undefined') return;
  scheduled = true;
  ensureDataLayer();
}
