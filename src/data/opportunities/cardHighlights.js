/**
 * Card highlight pills for franchise listing cards.
 * SEO labels are brand-specific search phrases (Odette first priority).
 */

/** @type {Record<string, string>} */
export const CARD_SEO_LABEL_BY_SLUG = {
  odette: "Women's Fashion Franchise",
  'kasturi-creations': 'Ethnic Wear Franchise',
  'original-burger-co': 'Burger Franchise India',
  bigguys: 'Chicken Franchise',
  'biggies-burger': 'QSR Burger Franchise',
  franco: "Men's Fashion Franchise",
  'brand-avenue': 'Multi-Brand Fashion',
  'lassi-n-cafe': 'Cafe Franchise India',
  'fusion-pizza-big-burger': 'Dual Brand F&B',
  '10-downing-street': 'Pub Franchise India',
  'freshco-goli-soda': 'Beverage Franchise',
};

/**
 * @param {string} slug
 * @param {string} [industry]
 */
export function getCardSeoLabel(slug, industry = '') {
  if (CARD_SEO_LABEL_BY_SLUG[slug]) return CARD_SEO_LABEL_BY_SLUG[slug];
  if (industry) return `${industry} Franchise`;
  return 'Franchise Opportunity';
}

/**
 * Compact payback label for card pills — a key decision metric for investors.
 * @param {string} paybackLabel
 * @returns {string}
 */
export function formatPaybackPill(paybackLabel = '') {
  const text = String(paybackLabel || '').trim();
  if (!text || /^on request$/i.test(text)) return 'Payback On Request';

  const yearRange = text.match(/(\d+)\s*[-–to]+\s*(\d+)\s*years?/i);
  if (yearRange) return `${yearRange[1]}–${yearRange[2]} yr Payback`;

  const singleYear = text.match(/(\d+(?:\.\d+)?)\s*years?/i);
  if (singleYear) return `${singleYear[1]} yr Payback`;

  const monthRange = text.match(/(\d+)\s*[-–to]+\s*(\d+)\s*months?/i);
  if (monthRange) return `${monthRange[1]}–${monthRange[2]} mo Payback`;

  const singleMonth = text.match(/(\d+)\s*months?/i);
  if (singleMonth) return `${singleMonth[1]} mo Payback`;

  return `${text} Payback`;
}
