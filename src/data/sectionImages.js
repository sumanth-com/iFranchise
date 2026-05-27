/**
 * Industry & section imagery — local assets (src/assets/*.jpeg).
 * Single source of truth for home industries, services, brand owners, and franchise fallbacks.
 */
import foodBeverageImg from '../assets/Food & Beverage.webp';
import healthcareWellnessImg from '../assets/Healthcare & Wellness.webp';
import educationTrainingImg from '../assets/Education & Training.webp';
import retailJewelryImg from '../assets/Retail & Jewelry.webp';
import logisticsInfrastructureImg from '../assets/Logistics & Infrastructure.webp';
import beautyLifestyleImg from '../assets/Beauty & Lifestyle.webp';

const u = (photoId, w = 1200) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=85`;

/** Generic remote fallback when no local asset applies */
export const IMAGE_FALLBACK = foodBeverageImg;

/** Industry card labels (home / services / brand owners sections) */
export const INDUSTRY_CARD_IMAGES = {
  'Retail & Jewelry': retailJewelryImg,
  'Food & Beverage': foodBeverageImg,
  'Healthcare & Wellness': healthcareWellnessImg,
  'Education & Training': educationTrainingImg,
  'Logistics & Infrastructure': logisticsInfrastructureImg,
  'Beauty & Lifestyle': beautyLifestyleImg,
};

/** Normalized franchise listing categories (opportunityUtils.normalizeCategory) */
export const FRANCHISE_CATEGORY_IMAGES = {
  'Food & Beverage': foodBeverageImg,
  Retail: retailJewelryImg,
  'Health & Wellness': healthcareWellnessImg,
  Entertainment: foodBeverageImg,
  Education: educationTrainingImg,
  Technology: logisticsInfrastructureImg,
  'Home Services': logisticsInfrastructureImg,
};

/** ImageCarousel category keys */
export const CAROUSEL_CATEGORY_IMAGES = {
  food: foodBeverageImg,
  fitness: healthcareWellnessImg,
  retail: retailJewelryImg,
  entertainment: foodBeverageImg,
  education: educationTrainingImg,
  service: logisticsInfrastructureImg,
  kids: educationTrainingImg,
  default: foodBeverageImg,
};

/**
 * @param {string} industry - franchise industry from normalizeCategory
 * @returns {string}
 */
export function getFranchiseCategoryImage(industry = 'Food & Beverage') {
  return FRANCHISE_CATEGORY_IMAGES[industry] || FRANCHISE_CATEGORY_IMAGES['Food & Beverage'];
}

/**
 * @param {string} category - ImageCarousel category prop
 * @returns {string}
 */
export function getCarouselCategoryImage(category = 'food') {
  return CAROUSEL_CATEGORY_IMAGES[category] || CAROUSEL_CATEGORY_IMAGES.default;
}

/**
 * Gallery fallbacks for brands without local photos (detail carousel).
 * @param {string} industry
 * @returns {string[]}
 */
export function getIndustryGalleryFallback(industry = 'Food & Beverage') {
  const img = getFranchiseCategoryImage(industry);
  return [img, img, img];
}

export const WHO_WE_SERVE_IMAGES = {
  investors: u('1556761175-b413da4baf72'),
  brands: u('1600880292203-757bb62b4baf'),
};

const industryCard = (label, accent, desc) => ({
  label,
  accent,
  desc,
  img: INDUSTRY_CARD_IMAGES[label] || foodBeverageImg,
});

export const HOME_INDUSTRIES = [
  industryCard('Retail & Jewelry', '#f59e0b', 'Growing consumer demand and scalable business models.'),
  industryCard('Food & Beverage', '#f97316', 'Proven concepts with strong customer loyalty and repeat business.'),
  industryCard('Healthcare & Wellness', '#10b981', 'Rising health consciousness driving sustainable growth.'),
  industryCard('Education & Training', '#3b82f6', 'Lifelong learning trends creating consistent demand.'),
  industryCard('Logistics & Infrastructure', '#94a3b8', 'E-commerce boom fueling supply chain opportunities.'),
  industryCard('Beauty & Lifestyle', '#ec4899', 'Premium services with high customer retention rates.'),
];

export const SERVICES_INDUSTRIES = [
  industryCard('Retail & Jewelry', '#f59e0b', 'Scale your retail brand with proven franchise models'),
  industryCard('Food & Beverage', '#f97316', 'Expand your F&B concept across multiple locations'),
  industryCard('Healthcare & Wellness', '#10b981', 'Grow your wellness business with franchise support'),
  industryCard('Education & Training', '#3b82f6', 'Build an education empire through franchising'),
  industryCard('Beauty & Lifestyle', '#ec4899', 'Transform beauty concepts into franchise networks'),
  industryCard('Logistics & Infrastructure', '#94a3b8', 'Scale logistics operations with franchise models'),
];

export const BRAND_OWNERS_INDUSTRIES = SERVICES_INDUSTRIES;
