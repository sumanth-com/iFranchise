import { franchiseOpportunities } from '../data/franchiseData';
import { INR_PER_USD } from '../data/opportunities/opportunityUtils.js';

const LAKH = 100_000;
const CRORE = 10_000_000;

/** Page filter dropdown — INR tiers aligned with opportunity card amounts. */
export const PAGE_INVESTMENT_FILTER_OPTIONS = [
  { label: 'Under ₹25 Lakhs', minInr: 0, maxInr: 25 * LAKH },
  { label: '₹25 Lakhs – ₹50 Lakhs', minInr: 25 * LAKH, maxInr: 50 * LAKH },
  { label: '₹50 Lakhs – ₹1 Crore', minInr: 50 * LAKH, maxInr: CRORE },
  { label: '₹1 Crore – ₹2 Crores', minInr: CRORE, maxInr: 2 * CRORE },
  { label: 'Over ₹2 Crores', minInr: 2 * CRORE, maxInr: Number.POSITIVE_INFINITY },
];

export const PAGE_INVESTMENT_LABELS = PAGE_INVESTMENT_FILTER_OPTIONS.map((o) => o.label);

/** @param {string} selectedLabel */
export function parsePageInvestmentRange(selectedLabel) {
  const match = PAGE_INVESTMENT_FILTER_OPTIONS.find((o) => o.label === selectedLabel);
  if (!match) return null;
  return { minInr: match.minInr, maxInr: match.maxInr };
}

/** @param {{ minInr: number, maxInr: number }} range */
export function getOpportunityInrBounds(opp) {
  const minInr = opp.minInr ?? (opp.minInvestment != null ? opp.minInvestment * INR_PER_USD : 0);
  const maxInr =
    opp.maxInr ?? (opp.maxInvestment != null ? opp.maxInvestment * INR_PER_USD : minInr);
  return { minInr, maxInr };
}

/** @param {{ minInr: number, maxInr: number }} range */
export function investmentInrRangeMatchesOpportunity(range, opp) {
  const { minInr: oppMin, maxInr: oppMax } = getOpportunityInrBounds(opp);
  const rangeMax = Number.isFinite(range.maxInr) ? range.maxInr : Number.MAX_SAFE_INTEGER;
  return oppMin <= rangeMax && oppMax >= range.minInr;
}

/** Multi-select investment buckets (navbar) — same INR tiers as the page filter. */
export const NAVBAR_INVESTMENT_BUCKETS = [
  { key: 'under25L', label: 'Under ₹25 Lakhs', minInr: 0, maxInr: 25 * LAKH },
  { key: '25-50L', label: '₹25L – ₹50L', minInr: 25 * LAKH, maxInr: 50 * LAKH },
  { key: '50L-1Cr', label: '₹50L – ₹1 Cr', minInr: 50 * LAKH, maxInr: CRORE },
  { key: '1-2Cr', label: '₹1 Cr – ₹2 Cr', minInr: CRORE, maxInr: 2 * CRORE },
  { key: 'over2Cr', label: 'Over ₹2 Cr', minInr: 2 * CRORE, maxInr: Number.POSITIVE_INFINITY },
];

export const NAVBAR_FRANCHISE_MODELS = ['FOFO', 'FOCO', 'COFO', 'COCO', 'FIFO', 'FICO'];

/**
 * @param {{ minInr: number, maxInr: number }} bucket
 * @param {{ minInr?: number|null, maxInr?: number|null, minInvestment?: number, maxInvestment?: number }} opp
 */
export function investmentBucketMatchesOpportunity(bucket, opp) {
  return investmentInrRangeMatchesOpportunity(bucket, opp);
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

  if (franchiseModels.length) {
    const oppModels = opp.models?.length ? opp.models : [opp.model];
    if (!franchiseModels.some((m) => oppModels.includes(m))) return false;
  }

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
