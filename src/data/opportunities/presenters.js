import { franchiseOpportunities, getFranchiseDetailById } from './index.js';

const BADGE_COLORS = {
  'HIGH ROI': 'orange',
  'HOT MARKET': 'green',
  POPULAR: 'green',
  TRENDING: 'green',
  GROWING: 'blue',
  NEW: 'blue',
  FEATURED: 'green',
};

function badgeColor(badge = '') {
  return BADGE_COLORS[badge] || 'green';
}

function expansionTag(locations = '') {
  const loc = locations.toLowerCase();
  if (loc.includes('pan india')) return 'PAN INDIA';
  if (loc.includes('tier 1')) return 'TIER 1 & 2';
  if (loc.includes('metro')) return 'METRO';
  return locations.length > 22 ? `${locations.slice(0, 20).toUpperCase()}…` : locations.toUpperCase();
}

function parseOutletCount(outletsLabel = '') {
  const match = String(outletsLabel).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function growthPointsFromOutlets(count) {
  if (!count) return [4, 6, 8, 10, 12, 14, 16, 18];
  const steps = 8;
  return Array.from({ length: steps }, (_, i) =>
    Math.max(1, Math.round((count * (i + 1)) / steps))
  );
}

/**
 * Hero homepage featured franchise card shape.
 */
export function toFeaturedFranchiseCard(opp) {
  const detail = getFranchiseDetailById(opp.id);
  return {
    id: opp.id,
    slug: opp.slug,
    title: opp.brandName,
    description: opp.summary || opp.tagline || '',
    logo: opp.logo || '',
    image: opp.image || opp.logo,
    cardFit: opp.cardFit || 'cover',
    cardBackground: opp.cardBackground,
    cardAccent: opp.cardAccent,
    badge: { text: opp.badge, color: badgeColor(opp.badge) },
    tags: {
      investment: opp.investment,
      model: opp.model,
      expansion: expansionTag(opp.locations),
    },
    metrics: {
      roi: opp.roi,
      payback: detail?.keyInfo?.payback || 'On request',
    },
    details: {
      industry: opp.industry,
      segment: opp.category,
      investment: opp.investment,
      space: detail?.keyInfo?.space || 'As per format',
    },
  };
}

function rankFeaturedOpportunities() {
  return [...franchiseOpportunities].sort((a, b) => {
    const score = (o) =>
      (o.badge === 'POPULAR' ? 3 : 0) +
      (o.badge === 'HIGH ROI' ? 2 : 0) +
      (o.badge === 'HOT MARKET' ? 2 : 0) +
      (o.roiValue ?? 0) / 100;
    return score(b) - score(a);
  });
}

/** Curated featured brands — home row + opportunities page default order. */
export const FEATURED_BRAND_SLUGS = ['odette', 'original-burger-co', '10-downing-street'];

/** @deprecated Use FEATURED_BRAND_SLUGS */
const HOME_PAGE_FEATURED_SLUGS = FEATURED_BRAND_SLUGS;

/** Pin featured brands to the top (preserves order within pinned + rest). */
export function pinFeaturedOpportunitiesFirst(list) {
  if (!list?.length) return list;
  const bySlug = new Map(list.map((o) => [o.slug, o]));
  const pinned = FEATURED_BRAND_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const pinnedSlugs = new Set(pinned.map((o) => o.slug));
  const rest = list.filter((o) => !pinnedSlugs.has(o.slug));
  return [...pinned, ...rest];
}

/** Raw opportunity rows for homepage featured section. */
export function getFeaturedOpportunities(limit = 3) {
  const bySlug = (slug) => franchiseOpportunities.find((o) => o.slug === slug);
  const curated = FEATURED_BRAND_SLUGS.map(bySlug).filter(Boolean);
  if (curated.length) return curated.slice(0, limit);
  return rankFeaturedOpportunities().slice(0, limit);
}

export function getFeaturedFranchiseCards(limit = 3) {
  return getFeaturedOpportunities(limit).map(toFeaturedFranchiseCard);
}

/**
 * Services page investor dashboard mini-cards.
 */
export function toInvestorDashboardOpportunity(opp) {
  const industryGradients = {
    'Food & Beverage': 'from-emerald-500 to-teal-600',
    Retail: 'from-pink-500 to-rose-600',
    Entertainment: 'from-violet-500 to-purple-600',
    'Health & Wellness': 'from-blue-500 to-cyan-600',
    Technology: 'from-indigo-500 to-violet-600',
    Education: 'from-amber-500 to-orange-600',
    'Home Services': 'from-slate-500 to-slate-700',
  };

  return {
    id: opp.id,
    slug: opp.slug,
    name: opp.brandName,
    category: opp.industry,
    industry: opp.category,
    roi: opp.roiValue != null ? `+${opp.roiValue}% ROI` : opp.roi,
    investment: `From ${opp.investment.split(' to ')[0].trim()}`,
    color: industryGradients[opp.industry] || 'from-violet-500 to-purple-600',
    logo: opp.logo || '',
    image: opp.image || opp.logo || '',
    cardBackground: opp.cardBackground,
    cardAccent: opp.cardAccent,
    cardFit: opp.cardFit || 'cover',
    link: `/franchise/${opp.slug}`,
  };
}

export function getInvestorDashboardOpportunities() {
  return franchiseOpportunities.map(toInvestorDashboardOpportunity);
}

export function getPartnerBrandNames(limit = 8) {
  return franchiseOpportunities.slice(0, limit).map((o) => o.brandName);
}

/** Logo assets for trust marquee on brand-owner pages */
export function getPartnerBrandLogos(limit = 8) {
  return franchiseOpportunities
    .filter((o) => o.logo)
    .slice(0, limit)
    .map((o) => ({
      id: String(o.id),
      name: o.brandName,
      label: o.brandName,
      src: o.logo,
    }));
}

/**
 * Brand owners page case study cards. factual fields from listings only.
 */
export function toBrandCaseStudy(opp) {
  const detail = getFranchiseDetailById(opp.id);
  const units = parseOutletCount(detail?.keyInfo?.outlets || opp.expansionNote);
  const cityList =
    opp.cities?.filter((c) => c !== 'Pan India').slice(0, 8) ||
    (opp.locations !== 'Pan India' ? [opp.locations] : ['Mumbai', 'Delhi NCR', 'Bengaluru']);

  return {
    id: opp.id,
    brand: opp.brandName,
    category: opp.industry,
    tagline: opp.tagline || opp.summary?.slice(0, 72) || '',
    logo: opp.logo || '',
    image: opp.image || opp.logo,
    color: 'violet',
    before: {
      cities: 1,
      investors: 'N/A',
      revenue: 'Pre-scale',
      units: units ? Math.max(1, Math.round(units * 0.15)) : 1,
      problems: [
        'Franchise program not investor-ready',
        'Limited structured disclosure',
        'Expansion planning not centralized',
      ],
    },
    after: {
      cities: cityList.length,
      investors: 'Qualified leads',
      revenue: detail?.operationsReturns?.roi || opp.investment,
      units: units || '15+',
      wins: [
        `${opp.model} franchise structure`,
        opp.locations,
        detail?.financialHighlights?.franchiseFee
          ? `Franchise fee: ${detail.financialHighlights.franchiseFee}`
          : 'Investor-ready listing live',
      ],
    },
    timeline: detail?.keyInfo?.payback || '24 months',
    roiGrowth: opp.roiValue != null ? `${opp.roiValue}%` : 'Verified',
    cityData: cityList,
    revenuePoints: growthPointsFromOutlets(units),
  };
}

export function getBrandCaseStudies(limit = 3) {
  const byScale = [...franchiseOpportunities].sort(
    (a, b) => parseOutletCount(getFranchiseDetailById(b.id)?.keyInfo?.outlets) - parseOutletCount(getFranchiseDetailById(a.id)?.keyInfo?.outlets)
  );
  return byScale.slice(0, limit).map(toBrandCaseStudy);
}
