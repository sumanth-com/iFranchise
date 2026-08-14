/**
 * Google Tag Manager — single source of truth for analytics (container GTM-P6Z67GFD).
 * GA4 property G-SSHRXE8TFM must be configured inside GTM, not via direct gtag in app code.
 */
import { hasAnalyticsConsent } from './analyticsConsent.js';

export const GTM_CONTAINER_ID =
  import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-P6Z67GFD';

/** Configure this ID on your GA4 Configuration tag in GTM (not in application code). */
export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-SSHRXE8TFM';

let lastPageKey = null;
let scheduled = false;

export function loadGtm() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (!hasAnalyticsConsent()) return false;
  if (isGtmInstalled()) return true;

  window.__IFR_GTM_CONTAINER__ = GTM_CONTAINER_ID;
  window.__IFR_GTM_LOADED__ = true;
  ensureDataLayer();
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
  script.dataset.ifrAnalytics = 'gtm';
  document.head.appendChild(script);
  return true;
}

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
  if (!hasAnalyticsConsent()) return false;
  ensureDataLayer();
  window.dataLayer.push(payload);
  return true;
}

/**
 * SPA page view — one push per pathname+search (GTM Custom Event trigger: page_view).
 * @param {{ logicalRoute?: string }} [options]
 */
export function trackPageView({ logicalRoute } = {}) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
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
  if (typeof window === 'undefined' || !eventName || !hasAnalyticsConsent()) return;
  pushToDataLayer({ event: eventName, ...params });
}

/** Idempotent bootstrap — analytics remains off until explicit consent. */
export function scheduleAnalytics() {
  if (scheduled || typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  scheduled = true;
  loadGtm();
}

export function disableAnalytics() {
  if (typeof window === 'undefined') return;
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
  lastPageKey = null;

  if (typeof document !== 'undefined') {
    const cookieNames = document.cookie
      .split(';')
      .map((part) => part.split('=')[0].trim())
      .filter((name) => /^(_ga|_gid|_gat|_gcl_au)/.test(name));
    const hostname = window.location.hostname;
    const domainParts = hostname.split('.');
    const registrableDomain =
      domainParts.length > 1 ? `.${domainParts.slice(-2).join('.')}` : hostname;
    cookieNames.forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${registrableDomain}; SameSite=Lax`;
    });
  }
}

export function enableAnalytics() {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
  scheduled = false;
  scheduleAnalytics();
}
