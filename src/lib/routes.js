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
  /** Prefix for city-filtered listing pages, e.g. /location/bengaluru */
  FRANCHISE_LOCATION: '/location',
  LIST_YOUR_BRAND: '/list-your-brand',
  BLOG: '/blogs',
  CAREERS: '/careers',
  FAQ: '/faq',
  KNOWLEDGE_HUB: '/resources/knowledge-hub',
  READINESS_ASSESSMENT: '/franchise-readiness-assessment',
  ROI_CALCULATOR: '/franchise-roi-calculator',
  PRIVACY: '/privacy-policy',
  DATA_RIGHTS: '/data-rights-request',
  TERMS: '/terms-and-conditions',
  LICENSES: '/licenses',
};

/** Old paths → canonical paths (301-style in-app + Vercel redirects). */
export const LEGACY_PATH_REDIRECTS = {
  '/about': ROUTES.ABOUT,
  '/contact': ROUTES.CONTACT,
  '/blog': ROUTES.BLOG,
  '/meet-the-team': ROUTES.TEAM,
  '/featured-opportunities': ROUTES.FRANCHISE_OPPORTUNITIES,
  '/opportunities': ROUTES.FRANCHISE_OPPORTUNITIES,
  '/for-brand-owners': ROUTES.LIST_YOUR_BRAND,
  '/brand-owners': ROUTES.LIST_YOUR_BRAND,
  '/terms': ROUTES.TERMS,
};
