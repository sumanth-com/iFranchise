import { getOpportunityInrBounds } from './franchiseNavbarFilters.js';

/** Filter franchise opportunities by INR investment range (overlap logic). */
export function filterOpportunitiesByInrRange(opportunities, { minInr, maxInr }) {
  const rangeMax = Number.isFinite(maxInr) ? maxInr : Number.MAX_SAFE_INTEGER;
  return opportunities.filter((opp) => {
    const { minInr: oppMin, maxInr: oppMax } = getOpportunityInrBounds(opp);
    return oppMin <= rangeMax && oppMax >= minInr;
  });
}

/** Filter for high-ROI brands (roiValue threshold or badge). */
export function filterHighRoiOpportunities(opportunities, minRoi = 25) {
  return opportunities.filter((opp) => {
    const roi = opp.roiValue ?? parseInt(String(opp.roi).replace(/\D/g, ''), 10);
    const badge = String(opp.badge || '').toUpperCase();
    return (Number.isFinite(roi) && roi >= minRoi) || badge.includes('HIGH ROI') || badge.includes('TRENDING');
  });
}

export function filterPremiumOpportunities(opportunities, minInr) {
  return opportunities.filter((opp) => {
    const { minInr: oppMin } = getOpportunityInrBounds(opp);
    return oppMin >= minInr;
  });
}
