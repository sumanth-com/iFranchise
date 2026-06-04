/**
 * Analytics bootstrap — GTM from index.html when present; otherwise deferred GA4 gtag (fallback).
 */
import { GTM_CONTAINER_ID, ensureDataLayer, isGtmInstalled } from './analytics/gtm.js';

const MEASUREMENT_ID = 'G-SSHRXE8TFM';

let scheduled = false;
let loaded = false;

function ensureGtagStub() {
  ensureDataLayer();
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

function markGaReady() {
  if (loaded) return;
  loaded = true;
  window.__IFR_GA_READY__ = true;
  window.dispatchEvent(new Event('ifr-ga-ready'));
}

function loadGtagDirect() {
  if (loaded || typeof document === 'undefined') return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    markGaReady();
    return;
  }

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  s.onload = () => {
    ensureGtagStub();
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
    markGaReady();
  };
  document.head.appendChild(s);
}

function scheduleGtmBridge() {
  ensureGtagStub();
  window.__IFR_GA_READY__ = false;

  const tryReady = () => {
    if (window.google_tag_manager?.[GTM_CONTAINER_ID]) {
      markGaReady();
      return true;
    }
    return false;
  };

  if (tryReady()) return;

  window.addEventListener('load', () => tryReady() || markGaReady(), { once: true });
  setTimeout(() => {
    if (!loaded) markGaReady();
  }, 3000);
}

export function scheduleAnalytics() {
  if (scheduled || typeof window === 'undefined') return;
  scheduled = true;

  ensureGtagStub();
  window.__IFR_GA_READY__ = false;

  if (isGtmInstalled()) {
    scheduleGtmBridge();
    return;
  }

  const trigger = () => {
    window.removeEventListener('pointerdown', trigger, true);
    window.removeEventListener('keydown', trigger, true);
    window.removeEventListener('scroll', trigger, true);
    loadGtagDirect();
  };

  window.addEventListener('pointerdown', trigger, { once: true, capture: true, passive: true });
  window.addEventListener('keydown', trigger, { once: true, capture: true });
  window.addEventListener('scroll', trigger, { once: true, passive: true });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadGtagDirect(), { timeout: 8000 });
  } else {
    setTimeout(loadGtagDirect, 5000);
  }
}
