/**
 * Google Tag Manager — container GTM-P6Z67GFD
 * Snippet lives in index.html; this module handles SPA page views and dataLayer pushes.
 */

export const GTM_CONTAINER_ID =
  import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-P6Z67GFD';

let lastGtmPageKey = null;

/** True when the official GTM bootstrap snippet from index.html is present. */
export function isGtmInstalled() {
  if (typeof window === 'undefined') return false;
  if (window.__IFR_GTM_CONTAINER__ === GTM_CONTAINER_ID) return true;
  if (typeof document === 'undefined') return false;
  return !!document.querySelector(
    `script[src*="googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}"]`,
  );
}

/** Initialize dataLayer (idempotent; matches GTM snippet). */
export function ensureDataLayer() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push a custom event or object to GTM dataLayer.
 * @param {Record<string, unknown>} payload
 */
export function pushToDataLayer(payload) {
  ensureDataLayer();
  window.dataLayer.push(payload);
}

/**
 * SPA virtual page view for GTM triggers (History Change / custom event).
 * Deduped per pathname+search.
 * @param {{ logicalRoute?: string }} [options]
 */
export function trackGtmPageView({ logicalRoute } = {}) {
  if (typeof window === 'undefined') return;
  ensureDataLayer();

  const pagePath = `${window.location.pathname}${window.location.search}`;
  const pageKey = pagePath;
  if (lastGtmPageKey === pageKey) return;
  lastGtmPageKey = pageKey;

  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title || 'iFranchise',
    route_name: logicalRoute || undefined,
  });
}

/** Wait until GTM container object exists (for GA4 bridge after GTM load). */
export function whenGtmReady(callback) {
  if (typeof window === 'undefined') return;
  if (window.google_tag_manager?.[GTM_CONTAINER_ID]) {
    callback();
    return;
  }
  const done = () => {
    if (window.google_tag_manager?.[GTM_CONTAINER_ID]) callback();
  };
  window.addEventListener('load', done, { once: true });
  setTimeout(done, 2500);
}
