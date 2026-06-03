/**
 * Descriptive image alt text helpers (accurate, non-stuffed).
 */

export const IMAGE_ALT = {
  siteLogo: 'iFranchise India franchise consulting company logo',
  siteLogoShort: 'iFranchise logo',
  heroFranchise: 'Franchise business opportunities and growth platform in India',
  investorBanner: 'Investors exploring franchise business opportunities in India',
  brandExpansion: 'Franchise brand expansion and growth services',
  restaurantFranchise: 'Restaurant franchise opportunity in India',
  contactConsultants: 'Contact iFranchise franchise consultants',
  careersTeam: 'Join iFranchise careers team',
  blogInsights: 'Franchise investment insights and guides for India',
  aboutJourney: 'iFranchise franchise development and expansion journey',
  notFound: 'Page not found on iFranchise website',
};

/**
 * @param {string} brandName
 * @param {string} [industry]
 */
export function franchiseBrandAlt(brandName, industry = '') {
  const brand = String(brandName || 'Franchise').trim();
  const sector = industry ? ` ${industry}` : '';
  return `${brand}${sector} franchise opportunity in India`;
}

/**
 * @param {string} brandName
 * @param {number} index
 */
export function franchiseGalleryAlt(brandName, index) {
  return `${franchiseBrandAlt(brandName)} — gallery image ${index}`;
}
