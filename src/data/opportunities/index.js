import { RAW_BRANDS } from './rawBrands.js';
import { buildOpportunityRecord } from './buildOpportunity.js';

const built = RAW_BRANDS.map((raw, index) => buildOpportunityRecord(raw, index + 1));

/** @type {import('../franchiseData.js').franchiseOpportunities} */
export const franchiseOpportunities = built.map((b) => b.listing);

/** @type {Record<string, import('./buildOpportunity.js').buildOpportunityRecord extends (...args: any) => { detail: infer D } ? D : never>} */
export const franchiseDetailsById = Object.fromEntries(
  built.map((b) => [String(b.listing.id), b.detail])
);

export const franchiseSlugToId = Object.fromEntries(
  built.map((b) => [b.listing.slug, String(b.listing.id)])
);

export function getFranchiseDetailById(id) {
  if (id == null || id === '') return null;
  const key = String(id);
  return franchiseDetailsById[key] || franchiseDetailsById['1'] || null;
}

export function getFranchiseListingById(id) {
  return franchiseOpportunities.find((f) => String(f.id) === String(id)) || null;
}

export function getFranchiseBySlug(slug) {
  const normalized = slug?.toLowerCase?.().trim();
  const id = franchiseSlugToId[normalized];
  if (!id) return null;
  return {
    listing: getFranchiseListingById(id),
    detail: getFranchiseDetailById(id),
  };
}

export { RAW_BRANDS };
export { getSimilarFranchiseDetails } from './similarFranchises.js';
