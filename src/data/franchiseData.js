// ═══════════════════════════════════════════════════════════════════════════════
// CENTRALIZED FRANCHISE OPPORTUNITIES DATA
// ═══════════════════════════════════════════════════════════════════════════════
// Single source of truth: src/data/opportunities/ (built from Opp Page.xlsx).
// Updates to rawBrands.js propagate to listings, detail pages, dashboards, and SEO.
// ═══════════════════════════════════════════════════════════════════════════════

export {
  franchiseOpportunities,
  franchiseDetailsById,
  franchiseSlugToId,
  getFranchiseDetailById,
  getFranchiseListingById,
  getFranchiseBySlug,
  getSimilarFranchiseDetails,
  RAW_BRANDS,
} from './opportunities/index.js';

export {
  getFeaturedFranchiseCards,
  getFeaturedOpportunities,
  getInvestorDashboardOpportunities,
  toInvestorDashboardOpportunity,
  getPartnerBrandNames,
  getPartnerBrandLogos,
  getBrandCaseStudies,
  toFeaturedFranchiseCard,
} from './opportunities/presenters.js';

import { franchiseOpportunities } from './opportunities/index.js';

// ═══════════════════════════════════════════════════════════════════════════════
// DYNAMIC CALCULATION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

export const getActiveOpportunities = () =>
  franchiseOpportunities.filter((opp) => opp.status === 'active');

export const getTotalCities = () => {
  const allCities = new Set();
  franchiseOpportunities.forEach((opp) => {
    if (opp.cities?.length) opp.cities.forEach((city) => allCities.add(city));
  });
  return allCities.size;
};

export const getUniqueCities = () => {
  const allCities = new Set();
  franchiseOpportunities.forEach((opp) => {
    if (opp.cities?.length) opp.cities.forEach((city) => allCities.add(city));
  });
  return Array.from(allCities).sort();
};

export const getTotalMarkets = () => new Set(franchiseOpportunities.map((opp) => opp.industry)).size;

export const getTotalRevenuePotential = () =>
  franchiseOpportunities.reduce((sum, opp) => sum + (opp.maxInvestment || 0), 0);

export const formatRevenue = (amount) => {
  const millions = amount / 1_000_000;
  return `$${millions.toFixed(1)}M`;
};

export const getAverageROI = () => {
  const rois = franchiseOpportunities
    .map((opp) => opp.roiValue ?? parseInt(String(opp.roi).replace(/\D/g, ''), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (!rois.length) return 0;
  return Math.round(rois.reduce((sum, roi) => sum + roi, 0) / rois.length);
};

export const getMinimumInvestment = () =>
  Math.min(...franchiseOpportunities.map((opp) => opp.minInvestment));

export const formatInvestment = (amount) => {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
};

export const getOpportunitiesByIndustry = () => {
  const byIndustry = {};
  franchiseOpportunities.forEach((opp) => {
    if (!byIndustry[opp.industry]) byIndustry[opp.industry] = [];
    byIndustry[opp.industry].push(opp);
  });
  return byIndustry;
};

export const getIndustryCount = (industry) =>
  franchiseOpportunities.filter((opp) => opp.industry === industry).length;

export const getTopOpportunitiesByROI = (limit = 3) =>
  [...franchiseOpportunities]
    .sort((a, b) => (b.roiValue ?? 0) - (a.roiValue ?? 0))
    .slice(0, limit);

export const getNewestOpportunities = (limit = 3) =>
  [...franchiseOpportunities]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, limit);

export const getTrendingOpportunities = (limit = 3) =>
  franchiseOpportunities
    .filter((opp) => opp.badge === 'HIGH ROI' || opp.badge === 'TRENDING' || opp.badge === 'HOT MARKET')
    .slice(0, limit);

export const getCityDistribution = () => {
  const cityCount = {};
  franchiseOpportunities.forEach((opp) => {
    opp.cities?.forEach((city) => {
      cityCount[city] = (cityCount[city] || 0) + 1;
    });
  });
  return cityCount;
};

export const getTopCities = (limit = 5) => {
  const cityCount = getCityDistribution();
  return Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([city, count]) => ({ city, count }));
};

export const calculateGrowthMetrics = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const recentOpportunities = franchiseOpportunities.filter(
    (opp) => new Date(opp.addedDate) >= threeMonthsAgo
  );
  const listingGrowth = Math.round(
    (recentOpportunities.length / Math.max(franchiseOpportunities.length, 1)) * 100
  );
  const avgRoi = getAverageROI();
  // When no new listings in the window, show market expansion proxy from portfolio ROI (floor 18%)
  const growthRate =
    listingGrowth > 0
      ? Math.max(listingGrowth, 8)
      : Math.min(32, Math.max(18, Math.round(avgRoi * 0.72)));

  return {
    recentCount: recentOpportunities.length,
    totalCount: franchiseOpportunities.length,
    growthRate,
  };
};

export const getMarketTrends = () => {
  const industries = getOpportunitiesByIndustry();
  return Object.entries(industries)
    .map(([industry, opps]) => ({
      industry,
      count: opps.length,
      avgROI: Math.round(
        opps.reduce((sum, opp) => sum + (opp.roiValue ?? 0), 0) / Math.max(opps.length, 1)
      ),
    }))
    .sort((a, b) => b.count - a.count);
};
