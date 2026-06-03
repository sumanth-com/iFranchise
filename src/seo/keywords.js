/**
 * Site-wide SEO keyword sets — use naturally in metadata and content only.
 */

export const PRIMARY_KEYWORDS = [
  'franchise consulting company india',
  'franchise business opportunities india',
  'franchise consultants',
  'franchise expansion services',
  'franchise development company',
  'franchise investment opportunities',
  'franchise advisory services',
  'franchise growth consulting',
  'franchise business consultant',
  'franchise opportunities',
];

export const SECONDARY_KEYWORDS = [
  'best franchise opportunities',
  'low investment franchise',
  'food franchise opportunities',
  'retail franchise opportunities',
  'franchise marketing',
  'investor franchise network',
  'franchise support services',
  'franchise business growth',
];

/** Comma-separated default for meta keywords tag */
export const DEFAULT_META_KEYWORDS = [...PRIMARY_KEYWORDS.slice(0, 6), ...SECONDARY_KEYWORDS.slice(0, 4)].join(
  ', ',
);
