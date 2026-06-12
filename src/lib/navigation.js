/**
 * SPA navigation + scroll restoration for the History API router.
 * Programmatic navigation dispatches `ifr:navigate`; browser back/forward uses `popstate`.
 */

import { prefetchRoute } from './routePrefetch';
import { canonicalizeFranchiseUrl } from './franchisePaths.js';
import { franchiseSlugToId } from '../data/franchiseData';
import {
  getCanonicalLocationPath,
  parseLocationPathname,
} from '../data/opportunityLocations.js';
import { LEGACY_PATH_REDIRECTS, ROUTES } from './routes.js';
import { getAllEcosystemPaths, getEcosystemLogicalRoute, isKnowledgeTopicPath } from '../data/ecosystem/ecosystemRoutes.js';

export const NAVIGATE_EVENT = 'ifr:navigate';

const SCROLL_PREFIX = 'ifr:scroll:';
const CAREERS_OPEN_ROLES_HASH = '#open-roles';

function isCareerRolePath(pathname) {
  return pathname.startsWith('/careers/') && pathname.split('/').filter(Boolean).length === 2;
}

export function scrollStorageKey(pathname = window.location.pathname, search = window.location.search) {
  return `${SCROLL_PREFIX}${pathname}${search}`;
}

/** Logical route key used by App.jsx (pathname aliases, detail routes). */
/** Replace legacy URLs in the address bar with canonical paths (e.g. /contact → /contact-us). */
export function canonicalizePublicUrl() {
  if (typeof window === 'undefined') return;
  const { pathname, search, hash } = window.location;

  const target = LEGACY_PATH_REDIRECTS[pathname];
  if (target) {
    history.replaceState(history.state, '', `${target}${search}${hash}`);
    return;
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.slice('/blog/'.length);
    if (slug) {
      history.replaceState(history.state, '', `${ROUTES.BLOG}/${slug}${search}${hash}`);
      return;
    }
  }

  const canonicalLocation = getCanonicalLocationPath(pathname);
  if (canonicalLocation && pathname !== canonicalLocation) {
    history.replaceState(history.state, '', `${canonicalLocation}${search}${hash}`);
  }
}

export function getLogicalPathname() {
  const pathname = window.location.pathname;
  if (pathname === '/about' || pathname === ROUTES.ABOUT) return ROUTES.ABOUT;
  if (pathname === '/contact' || pathname === ROUTES.CONTACT) return ROUTES.CONTACT;
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
  if (pathname === ROUTES.BLOG || pathname === '/blog') return ROUTES.BLOG;
  if (pathname === '/services') return '/services';
  if (pathname === '/careers') return '/careers';
  if (pathname === '/faq') return '/faq';
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

  const ecosystemLogical = getEcosystemLogicalRoute(pathname);
  if (ecosystemLogical) return ecosystemLogical;

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
    '/faq',
    ...getAllEcosystemPaths(),
  ];
  if (!knownPaths.includes(pathname) && !isKnowledgeTopicPath(pathname)) return '/404';
  return pathname;
}

export function parseNavigationTarget(path) {
  const url = new URL(path, window.location.origin);
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    href: `${url.pathname}${url.search}${url.hash}`,
  };
}

export function isSameLocation(target) {
  const current =
    window.location.pathname + window.location.search + window.location.hash;
  return current === target.href;
}

/** Persist scroll on the active history entry before leaving the page. */
export function persistCurrentScrollInHistory() {
  const scrollY = window.scrollY;
  const state = { ...(history.state || {}), scrollY };
  history.replaceState(state, '', window.location.href);
  sessionStorage.setItem(scrollStorageKey(), String(scrollY));
}

export function readStoredScroll(pathname = window.location.pathname, search = window.location.search) {
  if (history.state != null && typeof history.state.scrollY === 'number') {
    return history.state.scrollY;
  }
  const saved = sessionStorage.getItem(scrollStorageKey(pathname, search));
  if (saved == null || saved === '') return null;
  const parsed = parseInt(saved, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function applyScroll(y, { behavior = 'instant' } = {}) {
  const top = Math.max(0, y);
  window.scrollTo({ top, behavior });
  if (window.__lenis) {
    window.__lenis.scrollTo(top, { immediate: behavior === 'instant' });
  }
}

/**
 * Restore scroll after route paint (lazy chunks, layout). Retries until position sticks.
 */
export function restoreScrollWithRetry(targetY, { behavior = 'instant', maxAttempts = 10 } = {}) {
  const top = Math.max(0, targetY ?? 0);
  let attempts = 0;

  const tryRestore = () => {
    applyScroll(top, { behavior });
    const delta = Math.abs(window.scrollY - top);
    if (delta <= 3 || attempts >= maxAttempts) return;
    attempts += 1;
    requestAnimationFrame(tryRestore);
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(tryRestore);
  });
}

export function scrollToHashSection({ maxAttempts = 16 } = {}) {
  const hash = window.location.hash;
  if (!hash) return false;

  let attempts = 0;

  const tryScroll = () => {
    const target = document.querySelector(hash);
    if (!target) {
      if (attempts < maxAttempts) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
      return;
    }

    const navbar = document.querySelector('header');
    const navbarOffset = navbar ? navbar.offsetHeight : 80;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset - 12;
    const top = Math.max(targetTop, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(top, { duration: 1.2 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  tryScroll();
  return true;
}

/**
 * Navigate to a path (supports hash, e.g. `/#faq`). Does not reload the page.
 */
export function navigateTo(path, { replace = false } = {}) {
  const target = parseNavigationTarget(path);

  if (isSameLocation(target)) {
    if (target.hash) scrollToHashSection();
    window.dispatchEvent(
      new CustomEvent(NAVIGATE_EVENT, { detail: { sameLocation: true, hash: target.hash } }),
    );
    return;
  }

  persistCurrentScrollInHistory();

  const currentPath = window.location.pathname;
  const leavingCareersForRole =
    currentPath === '/careers' && isCareerRolePath(target.pathname);
  const returningFromRoleToCareers =
    isCareerRolePath(currentPath) && target.pathname === '/careers';

  if (leavingCareersForRole) {
    const scrollY = history.state?.scrollY ?? window.scrollY;
    history.replaceState(
      { ...(history.state || {}), scrollY, ifrNav: true },
      '',
      `/careers${CAREERS_OPEN_ROLES_HASH}`,
    );
    sessionStorage.setItem(scrollStorageKey('/careers', ''), String(scrollY));
  }

  if (returningFromRoleToCareers && !target.hash) {
    target.hash = CAREERS_OPEN_ROLES_HASH;
    target.href = `/careers${CAREERS_OPEN_ROLES_HASH}${target.search}`;
  }

  prefetchRoute(target.pathname);

  const nextState = { scrollY: 0, ifrNav: true };
  if (replace) {
    history.replaceState(nextState, '', target.href);
  } else {
    history.pushState(nextState, '', target.href);
  }

  window.dispatchEvent(
    new CustomEvent(NAVIGATE_EVENT, {
      detail: { isPopstate: false, hash: target.hash, path: getLogicalPathname() },
    }),
  );
}

/** @deprecated Use navigateTo. kept for gradual migration of inline pushState callers. */
export function dispatchRouteChange() {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: { isPopstate: false } }));
}

export function initScrollRestoration() {
  canonicalizePublicUrl();
  canonicalizeFranchiseUrl();
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!history.state) {
    history.replaceState({ scrollY: window.scrollY }, '', window.location.href);
  }
}
