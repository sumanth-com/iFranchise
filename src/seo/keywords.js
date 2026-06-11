/**
 * Site-wide SEO keyword sets — use naturally in metadata and content only.
 */

export const PRIMARY_KEYWORDS = [
  'franchise opportunities india',
  'franchise consulting company india',
  'franchise business opportunities',
  'franchise investment opportunities',
  'franchise consultants india',
  'franchise expansion services',
  'franchise development company',
  'franchise advisory services',
  'brand expansion india',
  'franchise business consultant',
];

export const SECONDARY_KEYWORDS = [
  'retail franchise india',
  'food franchise opportunities',
  'startup investment india',
  'investor opportunities india',
  'business expansion services',
  'franchise growth consulting',
  'low investment franchise',
  'franchise marketing',
  'franchise support services',
  'best franchise opportunities india',
];

/** Comma-separated default for meta keywords tag */
export const DEFAULT_META_KEYWORDS = [...PRIMARY_KEYWORDS.slice(0, 6), ...SECONDARY_KEYWORDS.slice(0, 4)].join(
  ', ',
);
