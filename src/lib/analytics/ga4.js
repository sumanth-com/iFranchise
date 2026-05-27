const GA4_DEBUG = false;

let initialized = false;
let configSent = false;
let lastTrackedPageKey = null;

function getMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID;
}

function getPageInfo() {
  const { pathname, search, hash } = window.location;
  const pageKey = `${pathname}${search}`; // exclude hash; avoid noisy events on /# anchors
  const pageLocation = `${pathname}${search}${hash}`;
  return {
    pageKey,
    pagePath: `${pathname}${search}`,
    pageLocation: `${window.location.origin}${pageLocation}`,
    pageTitle: document.title || 'iFranchise',
    pageUrl: window.location.href,
  };
}

function ensureGtag() {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer + gtag function early (queues calls until gtag.js is ready).
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
}

function injectGtagScript(measurementId) {
  const scriptId = `ga4-gtag-js-${measurementId}`;
  if (document.getElementById(scriptId)) return;

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;

  // Add to <head> without blocking rendering.
  document.head.appendChild(script);
}

/**
 * GA4 singleton init. Safe to call multiple times.
 */
export function initGA4() {
  const measurementId = getMeasurementId();
  if (!measurementId) return false;

  if (initialized) return true;
  initialized = true;

  if (typeof window === 'undefined') return false;
  ensureGtag();

  injectGtagScript(measurementId);

  if (!configSent) {
    // Avoid auto page_view; we manually fire page_view on SPA navigation.
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
    configSent = true;
  }

  if (GA4_DEBUG) {
    // eslint-disable-next-line no-console
    console.log('[ga4] initialized', { measurementId });
  }

  return true;
}

export function trackPageView({ logicalRoute } = {}) {
  const measurementId = getMeasurementId();
  if (!measurementId) return;
  if (typeof window === 'undefined') return;

  initGA4();
  ensureGtag();

  const { pageKey, pagePath, pageLocation, pageTitle } = getPageInfo();
  if (lastTrackedPageKey === pageKey) return; // dedupe on React StrictMode + rapid rerenders
  lastTrackedPageKey = pageKey;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: pageTitle,
    // Custom dimension-like param to help segment logical routes.
    route_name: logicalRoute || undefined,
  });

  if (GA4_DEBUG) {
    // eslint-disable-next-line no-console
    console.log('[ga4] page_view', { pageKey, logicalRoute });
  }
}

export function trackEvent(eventName, params = {}) {
  const measurementId = getMeasurementId();
  if (!measurementId) return;
  if (typeof window === 'undefined') return;

  initGA4();
  ensureGtag();

  window.gtag('event', eventName, params);
}

