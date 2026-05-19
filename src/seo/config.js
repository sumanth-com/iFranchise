/**
 * Global SEO configuration — single source for site URL, branding, and defaults.
 */

export const SITE_NAME = 'iFranchise';

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://www.ifranchise.in'
).replace(/\/$/, '');

export const SITE_TAGLINE = "India's Trusted Franchise Growth Platform";

export const DEFAULT_OG_IMAGE_PATH = '/images/slideshow/slide1.jpg';

export const TWITTER_HANDLE = '@ifranchise';

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'iFranchise',
  url: SITE_URL,
  logo: `${SITE_URL}/images/slideshow/slide1.jpg`,
  description:
    "India's trusted franchise growth platform connecting brands, investors, and expansion leaders.",
  email: 'hello@ifranchise.in',
  sameAs: [],
};

export const THEME_COLORS = {
  dark: '#0a0618',
  light: '#f8f9fc',
};

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function truncateMeta(text, max = 160) {
  if (!text) return '';
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}
