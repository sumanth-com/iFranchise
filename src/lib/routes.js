/**
 * Canonical public URL paths (shown in the browser address bar).
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about-us',
  TEAM: '/team',
  CONTACT: '/contact-us',
  SERVICES: '/services',
  FRANCHISE_OPPORTUNITIES: '/franchise-opportunities',
  LIST_YOUR_BRAND: '/list-your-brand',
  BLOG: '/blog',
  CAREERS: '/careers',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-and-conditions',
  LICENSES: '/licenses',
};

/** Old paths → canonical paths (301-style in-app + Vercel redirects). */
export const LEGACY_PATH_REDIRECTS = {
  '/about': ROUTES.ABOUT,
  '/contact': ROUTES.CONTACT,
};
