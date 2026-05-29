/** Mirrors App.jsx lazy() imports for idle / link-hover prefetch. */
const ROUTE_LOADERS = {
  '/about': () => import('../components/AboutPage'),
  '/team': () => import('../components/TeamPage'),
  '/franchise-details': () => import('../components/FranchiseDetailsPage'),
  '/franchise-opportunities': () => import('../components/FranchiseOpportunitiesPage'),
  '/privacy-policy': () => import('../components/PrivacyPolicyPage'),
  '/terms-and-conditions': () => import('../components/TermsConditionsPage'),
  '/404': () => import('../components/NotFoundPage'),
  '/contact': () => import('../components/ContactPage'),
  '/blog': () => import('../components/BlogPage'),
  '/blog-detail': () => import('../components/BlogDetailPage'),
  '/services': () => import('../components/ServicesPage'),
  '/licenses': () => import('../components/LicensesPage'),
  '/careers': () => import('../components/CareersPage'),
  '/list-your-brand': () => import('../components/ForBrandOwnersPage'),
};

const prefetched = new Set();

/** Resolve logical route from a pathname (aligned with navigation.js). */
export function logicalPathFromPathname(pathname) {
  if (pathname === '/about-us') return '/about';
  if (pathname === '/meet-the-team') return '/team';
  if (pathname === '/franchise') return '/franchise-details';
  if (['/featured-opportunities', '/opportunities', '/franchise-opportunities'].includes(pathname)) {
    return '/franchise-opportunities';
  }
  if (pathname === '/privacy-policy') return '/privacy-policy';
  if (pathname === '/terms-and-conditions' || pathname === '/terms') return '/terms-and-conditions';
  if (pathname === '/licenses') return '/licenses';
  if (pathname === '/contact-us') return '/contact';
  if (pathname === '/blog') return '/blog';
  if (pathname === '/services') return '/services';
  if (pathname === '/careers') return '/careers';
  if (['/list-your-brand', '/for-brand-owners', '/brand-owners'].includes(pathname)) {
    return '/list-your-brand';
  }
  if (pathname.startsWith('/careers/') && pathname.split('/').filter(Boolean).length === 2) {
    return '/careers';
  }
  if (pathname.startsWith('/blog/') && pathname.split('/').filter(Boolean).length >= 2) {
    return '/blog-detail';
  }
  if (pathname.startsWith('/franchise/') && pathname.length > 12) return '/franchise-details';
  const knownPaths = [
    '/',
    '/about',
    '/team',
    '/franchise-details',
    '/franchise-opportunities',
    '/privacy-policy',
    '/terms-and-conditions',
    '/licenses',
    '/contact',
    '/blog',
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
  '/about',
  '/contact',
  '/services',
];

function scheduleIdlePrefetch() {
  const run = () => {
    const current = logicalPathFromPathname(window.location.pathname);
    COMMON_IDLE_ROUTES.filter((r) => r !== current).forEach((r) => prefetchRoute(r));
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 1200);
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
