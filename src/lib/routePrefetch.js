import { ROUTES } from './routes.js';
import { franchiseSlugToId } from '../data/franchiseData';
import { parseLocationPathname } from '../data/opportunityLocations.js';

/** Mirrors App.jsx lazy() imports for idle / link-hover prefetch. */
const ROUTE_LOADERS = {
  [ROUTES.ABOUT]: () => import('../components/AboutPage'),
  '/team': () => import('../components/TeamPage'),
  '/franchise-details': () => import('../components/FranchiseDetailsPage'),
  '/franchise-opportunities': () => import('../components/FranchiseOpportunitiesPage'),
  '/privacy-policy': () => import('../components/PrivacyPolicyPage'),
  '/terms-and-conditions': () => import('../components/TermsConditionsPage'),
  '/404': () => import('../components/NotFoundPage'),
  [ROUTES.CONTACT]: () => import('../components/ContactPage'),
  [ROUTES.BLOG]: () => import('../components/BlogPage'),
  '/blog-detail': () => import('../components/BlogDetailPage'),
  '/services': () => import('../components/ServicesPage'),
  '/licenses': () => import('../components/LicensesPage'),
  '/careers': () => import('../components/CareersPage'),
  '/career-detail': () => import('../components/CareerRolePage'),
  '/list-your-brand': () => import('../components/ForBrandOwnersPage'),
};

const prefetched = new Set();

/** Resolve logical route from a pathname (aligned with navigation.js). */
export function logicalPathFromPathname(pathname) {
  if (pathname === '/about' || pathname === ROUTES.ABOUT) return ROUTES.ABOUT;
  if (pathname === '/meet-the-team') return '/team';
  if (pathname === '/franchise') return '/franchise-details';
  if (['/featured-opportunities', '/opportunities', '/franchise-opportunities'].includes(pathname)) {
    return '/franchise-opportunities';
  }
  if (pathname.startsWith(`${ROUTES.FRANCHISE_LOCATION}/`)) {
    return parseLocationPathname(pathname) ? '/franchise-opportunities' : '/404';
  }
  if (pathname === '/privacy-policy') return '/privacy-policy';
  if (pathname === '/terms-and-conditions' || pathname === '/terms') return '/terms-and-conditions';
  if (pathname === '/licenses') return '/licenses';
  if (pathname === '/contact' || pathname === ROUTES.CONTACT) return ROUTES.CONTACT;
  if (pathname === ROUTES.BLOG || pathname === '/blog') return ROUTES.BLOG;
  if (pathname === '/services') return '/services';
  if (pathname === '/careers') return '/careers';
  if (['/list-your-brand', '/for-brand-owners', '/brand-owners'].includes(pathname)) {
    return '/list-your-brand';
  }
  if (pathname.startsWith('/careers/') && pathname.split('/').filter(Boolean).length === 2) {
    return '/career-detail';
  }
  if (
    (pathname.startsWith('/blogs/') || pathname.startsWith('/blog/')) &&
    pathname.split('/').filter(Boolean).length >= 2
  ) {
    return '/blog-detail';
  }
  if (pathname.startsWith('/franchise/') && pathname.length > '/franchise/'.length) {
    const slug = pathname.replace('/franchise/', '').trim().toLowerCase();
    return franchiseSlugToId[slug] ? '/franchise-details' : '/404';
  }
  const knownPaths = [
    '/',
    ROUTES.ABOUT,
    '/team',
    '/franchise-details',
    '/franchise-opportunities',
    '/privacy-policy',
    '/terms-and-conditions',
    '/licenses',
    ROUTES.CONTACT,
    ROUTES.BLOG,
    '/services',
    '/careers',
    '/list-your-brand',
  ];
  if (!knownPaths.includes(pathname)) return '/404';
  return pathname;
}

/** Warm the Vite chunk for a logical route (no-op if already prefetched). */
export function prefetchRoute(pathnameOrHref) {
  if (typeof window === 'undefined') return;

  let pathname = pathnameOrHref;
  if (typeof pathnameOrHref === 'string' && (pathnameOrHref.startsWith('/') || pathnameOrHref.startsWith('http'))) {
    try {
      const url = new URL(pathnameOrHref, window.location.origin);
      if (url.origin !== window.location.origin) return;
      pathname = url.pathname;
    } catch {
      return;
    }
  }

  const logical = logicalPathFromPathname(pathname);
  if (!logical || prefetched.has(logical)) return;

  const loader = ROUTE_LOADERS[logical];
  if (!loader) return;

  prefetched.add(logical);
  void loader().catch(() => {
    prefetched.delete(logical);
  });
}

const COMMON_IDLE_ROUTES = [
  '/franchise-opportunities',
  '/list-your-brand',
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  '/services',
];

function scheduleIdlePrefetch() {
  const run = () => {
    const current = logicalPathFromPathname(window.location.pathname);
    COMMON_IDLE_ROUTES.filter((r) => r !== current).forEach((r) => prefetchRoute(r));
  };

  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  const timeout = mobile ? 8000 : 2500;
  const delay = mobile ? 3500 : 1200;

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout });
  } else {
    setTimeout(run, delay);
  }
}

let linkPrefetchInitialized = false;

/** Prefetch route chunks on internal link hover/focus (capture phase). */
export function initRoutePrefetch() {
  if (typeof document === 'undefined' || linkPrefetchInitialized) return;
  linkPrefetchInitialized = true;

  const onIntent = (event) => {
    const anchor = event.target?.closest?.('a[href^="/"]');
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('//')) return;
    prefetchRoute(href);
  };

  document.addEventListener('mouseover', onIntent, { passive: true, capture: true });
  document.addEventListener('focusin', onIntent, { passive: true, capture: true });

  scheduleIdlePrefetch();
}
