import {
  franchiseSlugToId,
  getFranchiseListingById,
} from '../data/franchiseData';

/** Canonical public path for a franchise detail page. */
export function getFranchiseDetailPath(opportunityOrId) {
  if (typeof opportunityOrId === 'object' && opportunityOrId != null) {
    if (opportunityOrId.slug) return `/franchise/${opportunityOrId.slug}`;
    if (opportunityOrId.id != null) return getFranchiseDetailPath(opportunityOrId.id);
  }

  const listing = getFranchiseListingById(opportunityOrId);
  if (listing?.slug) return `/franchise/${listing.slug}`;
  return `/franchise-details?id=${opportunityOrId}`;
}

export function resolveFranchiseIdFromLocation(pathname = '', search = '') {
  const params = new URLSearchParams(search);
  const idFromQuery = params.get('id');
  if (idFromQuery) return idFromQuery;

  if (pathname.startsWith('/franchise/')) {
    const slug = pathname.replace('/franchise/', '').trim().toLowerCase();
    if (franchiseSlugToId[slug]) return franchiseSlugToId[slug];
  }

  return '1';
}

/** Replace legacy `/franchise-details?id=` URLs with slug-based paths in the address bar. */
export function canonicalizeFranchiseUrl() {
  if (typeof window === 'undefined') return false;

  const { pathname, search, hash } = window.location;
  if (pathname !== '/franchise-details' && pathname !== '/franchise') return false;

  const params = new URLSearchParams(search);
  const id = params.get('id') || '1';
  const listing = getFranchiseListingById(id);
  if (!listing?.slug) return false;

  history.replaceState(history.state, '', `${getFranchiseDetailPath(listing)}${hash}`);
  return true;
}
