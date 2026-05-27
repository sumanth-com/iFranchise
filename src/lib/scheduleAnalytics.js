/**
 * GA4 — load after first interaction or long idle (never blocks LCP).
 */
const MEASUREMENT_ID = 'G-SSHRXE8TFM';

let scheduled = false;
let loaded = false;

function loadGtag() {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  s.onload = () => {
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
    window.__IFR_GA_READY__ = true;
    window.dispatchEvent(new Event('ifr-ga-ready'));
  };
  document.head.appendChild(s);
}

export function scheduleAnalytics() {
  if (scheduled || typeof window === 'undefined') return;
  scheduled = true;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  window.__IFR_GA_READY__ = false;

  const trigger = () => {
    window.removeEventListener('pointerdown', trigger, true);
    window.removeEventListener('keydown', trigger, true);
    window.removeEventListener('scroll', trigger, true);
    loadGtag();
  };

  window.addEventListener('pointerdown', trigger, { once: true, capture: true, passive: true });
  window.addEventListener('keydown', trigger, { once: true, capture: true });
  window.addEventListener('scroll', trigger, { once: true, passive: true });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadGtag(), { timeout: 8000 });
  } else {
    setTimeout(loadGtag, 5000);
  }
}
