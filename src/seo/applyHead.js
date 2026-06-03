import { TWITTER_HANDLE } from './config.js';

const MANAGED = 'data-seo-managed';

/**
 * Apply or update document <head> tags for the active route.
 * @param {import('./resolvePageSeo').resolvePageSeo extends (...args: any) => infer R ? R : never} seo
 * @param {{ themeColor?: string }} [options]
 */
export function applyPageHead(seo, options = {}) {
  if (typeof document === 'undefined' || !seo) return;

  document.title = seo.title;

  setMeta('name', 'description', seo.description);
  setMeta('name', 'keywords', seo.keywords);
  setMeta('name', 'robots', seo.robots);

  if (options.themeColor) {
    setMeta('name', 'theme-color', options.themeColor);
  }

  setLink('canonical', seo.canonicalUrl);

  setMeta('property', 'og:title', seo.og.title);
  setMeta('property', 'og:description', seo.og.description);
  setMeta('property', 'og:type', seo.og.type);
  setMeta('property', 'og:url', seo.og.url);
  setMeta('property', 'og:image', seo.og.image);
  setMeta('property', 'og:site_name', seo.og.siteName);
  setMeta('property', 'og:locale', 'en_IN');

  setMeta('name', 'twitter:card', seo.twitter.card);
  if (TWITTER_HANDLE) {
    setMeta('name', 'twitter:site', TWITTER_HANDLE);
  }
  setMeta('name', 'twitter:title', seo.twitter.title);
  setMeta('name', 'twitter:description', seo.twitter.description);
  setMeta('name', 'twitter:image', seo.twitter.image);
}

/**
 * Inject JSON-LD script blocks (replaces prior managed scripts).
 * @param {Array<{ id: string, data: object }>} schemas
 */
export function applyStructuredData(schemas = []) {
  if (typeof document === 'undefined') return;

  document.querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`).forEach((node) => node.remove());

  schemas.forEach(({ id, data }) => {
    if (!data) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `seo-jsonld-${id}`;
    script.setAttribute(MANAGED, 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}

function setMeta(attr, key, content) {
  if (content == null || content === '') return;
  // Update an existing tag if present (whether managed or not) to avoid duplicates.
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(MANAGED, 'true');
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  // Update an existing tag if present (whether managed or not) to avoid duplicates.
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute(MANAGED, 'true');
  el.setAttribute('href', href);
}
