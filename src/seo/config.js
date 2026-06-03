/**
 * Global SEO configuration. single source for site URL, branding, and defaults.
 */

import {
  SITE_CONTACT_ADDRESS,
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONE_TEL,
} from '../data/siteContact.js';
import { SOCIAL_LINKS } from '../constants/socialLinks.js';

export const SITE_NAME = 'iFranchise';

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://www.ifranchise.in'
).replace(/\/$/, '');

export const SITE_TAGLINE = "India's Trusted Franchise Growth Platform";

// Bump this whenever icon assets are regenerated to avoid stale browser caches.
export const ICON_VERSION = '20260530-1';

export const DEFAULT_OG_IMAGE_PATH = `/apple-touch-icon.png?v=${ICON_VERSION}`;

export const TWITTER_HANDLE = '@ifranchise';

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'iFranchise',
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png?v=${ICON_VERSION}`,
  description:
    "India's trusted franchise growth platform connecting brands, investors, and expansion leaders.",
  email: SITE_CONTACT_EMAIL,
  telephone: SITE_CONTACT_PHONE_TEL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONTACT_ADDRESS,
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: SOCIAL_LINKS.map((link) => link.href).filter(Boolean),
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
