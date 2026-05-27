const GA4_DEBUG = false;

let initialized = false;
let configSent = false;
let lastTrackedPageKey = null;

function getMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID;
}

function getPageInfo() {
  const { pathname, search, hash } = window.location;
  const pageKey = `${pathname}${search}`;
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
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

function isGtagLoadedFromHtml() {
  return (
    typeof window !== 'undefined' &&
    (window.__IFR_GA_READY__ === true ||
      !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]'))
  );
}

/**
 * GA4 singleton init. Uses index.html tag when present; no duplicate script/config.
 */
export function initGA4() {
  const measurementId = getMeasurementId();
  if (!measurementId) return false;
  if (typeof window === 'undefined') return false;

  ensureGtag();

  if (!isGtagLoadedFromHtml()) {
    const scriptId = `ga4-gtag-js-${measurementId}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
  }

  if (!configSent && !window.__IFR_GA_READY__) {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
    configSent = true;
  } else if (window.__IFR_GA_READY__) {
    configSent = true;
  }

  if (!initialized) {
    initialized = true;
    if (GA4_DEBUG) {
      // eslint-disable-next-line no-console
      console.log('[ga4] initialized', { measurementId, fromHtml: isGtagLoadedFromHtml() });
    }
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
  if (lastTrackedPageKey === pageKey) return;
  lastTrackedPageKey = pageKey;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: pageTitle,
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
