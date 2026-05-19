import { franchiseOpportunities } from '../data/franchiseData';

/** Multi-select investment buckets; overlap uses min/max on each opportunity. */
export const NAVBAR_INVESTMENT_BUCKETS = [
  { key: 'under50', label: 'Under $50K', min: 0, max: 49_999 },
  { key: '50-100', label: '$50K - $100K', min: 50_000, max: 100_000 },
  { key: '100-200', label: '$100K - $200K', min: 100_000, max: 200_000 },
  { key: '200-350', label: '$200K - $350K', min: 200_001, max: 350_000 },
  { key: 'over350', label: 'Over $350K', min: 350_001, max: Number.POSITIVE_INFINITY },
];

export const NAVBAR_FRANCHISE_MODELS = ['FOFO', 'FOCO', 'COFO', 'COCO', 'FIFO', 'FICO'];

/**
 * @param {{ min: number, max: number }} bucket
 * @param {{ minInvestment: number, maxInvestment: number }} opp
 */
export function investmentBucketMatchesOpportunity(bucket, opp) {
  const bMax = Number.isFinite(bucket.max) ? bucket.max : Number.MAX_SAFE_INTEGER;
  return opp.minInvestment <= bMax && opp.maxInvestment >= bucket.min;
}

/**
 * Navbar filter snapshot (arrays = multi-select, empty = no constraint).
 * @typedef {Object} NavbarFranchiseFilterState
 * @property {string[]} brands
 * @property {string[]} investmentBucketKeys
 * @property {string[]} locations
 * @property {string[]} franchiseModels
 */

/** @param {Record<string, unknown>} opp */
export function matchesNavbarFilters(opp, nav) {
  if (!nav) return true;
  const {
    brands = [],
    investmentBucketKeys = [],
    locations = [],
    franchiseModels = [],
  } = nav;

  if (brands.length && !brands.includes(opp.brandName)) return false;

  if (franchiseModels.length && !franchiseModels.includes(opp.model)) return false;

  if (locations.length) {
    const hay = `${opp.locations}\n${(opp.cities || []).join(' ')}`.toLowerCase();
    if (!locations.some((loc) => hay.includes(loc.toLowerCase()))) return false;
  }

  if (investmentBucketKeys.length) {
    const buckets = NAVBAR_INVESTMENT_BUCKETS.filter((b) =>
      investmentBucketKeys.includes(b.key)
    );
    const anyOverlap = buckets.some((b) => investmentBucketMatchesOpportunity(b, opp));
    if (!anyOverlap) return false;
  }

  return true;
}

/** Derive checkbox option lists from the canonical opportunities array. */
export function buildNavbarFranchiseFilterOptions(opportunities = franchiseOpportunities) {
  const brands = [...new Set(opportunities.map((o) => o.brandName))].sort((a, b) =>
    a.localeCompare(b)
  );
  const locations = [...new Set(opportunities.map((o) => o.locations))].sort((a, b) =>
    a.localeCompare(b)
  );
  return {
    brands,
    locations,
    investmentBuckets: NAVBAR_INVESTMENT_BUCKETS,
    franchiseModels: NAVBAR_FRANCHISE_MODELS,
  };
}
