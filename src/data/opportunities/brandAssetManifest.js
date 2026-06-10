/**
 * Brand image sources (src/assets) → public URL slugs under /brands/{slug}/.
 * Run `node scripts/copy-brand-images.mjs` after changing assets (also runs on build/dev).
 */

/** @param {string} slug @param {string} filename */
export function brandPublicImage(slug, filename) {
  return `/brands/${slug}/${filename}`;
}

/** @param {string} slug @param {string} role e.g. logo, gallery-1 */
function fileName(slug, role, ext) {
  return `${slug}-${role}.${ext}`;
}

function extFromPath(assetPath) {
  const m = assetPath.match(/\.([a-z0-9]+)$/i);
  return (m?.[1] || 'webp').toLowerCase();
}

/** Public URL extension — raster sources are served as WebP after copy-brand-images.mjs. */
function publicExtFromPath(assetPath) {
  const ext = extFromPath(assetPath);
  return ['png', 'jpg', 'jpeg', 'jfif'].includes(ext) ? 'webp' : ext;
}

/**
 * @typedef {{ slug: string, logoSrc: string, gallerySrc: string[], cardBackground?: string, cardAccent?: string, cardFit?: 'fill' | 'contain', card?: string }} BrandAssetEntry
 */

/** @type {BrandAssetEntry[]} */
export const BRAND_ASSET_MANIFEST = [
  {
    slug: 'odette',
    logoSrc: 'ODETTE/Logo.webp',
    gallerySrc: ['ODETTE/1.webp', 'ODETTE/2.webp', 'ODETTE/3.webp', 'ODETTE/4.webp', 'ODETTE/5.webp', 'ODETTE/6.webp'],
    cardBackground: '#f8f6f3',
    cardAccent: '#c4b5a0',
    cardFit: 'fill',
  },
  {
    slug: 'original-burger-co',
    logoSrc: 'Original Burger co/Logo.webp',
    gallerySrc: [
      'Original Burger co/1.webp',
      'Original Burger co/2.webp',
      'Original Burger co/3.webp',
      'Original Burger co/4.webp',
      'Original Burger co/5.webp',
    ],
    cardBackground: '#1d4ed8',
    cardAccent: '#3b82f6',
    cardFit: 'fill',
  },
  {
    slug: 'franco',
    logoSrc: 'Franco/Logo.webp',
    gallerySrc: ['Franco/1.webp', 'Franco/2.webp', 'Franco/3.webp', 'Franco/4.webp'],
    cardBackground: '#ffffff',
    cardAccent: '#e2e8f0',
    cardFit: 'fill',
  },
  {
    slug: 'biggies-burger',
    logoSrc: 'BIGGIES BURGER/Logo.webp',
    gallerySrc: ['BIGGIES BURGER/1.webp', 'BIGGIES BURGER/2.webp', 'BIGGIES BURGER/3.webp', 'BIGGIES BURGER/4.webp'],
    cardBackground: '#000000',
    cardAccent: '#facc15',
    cardFit: 'fill',
  },
  {
    slug: 'bigguys',
    logoSrc: 'BIGGUYS/Logo.webp',
    gallerySrc: ['BIGGUYS/1.webp', 'BIGGUYS/2.webp', 'BIGGUYS/3.webp', 'BIGGUYS/4.webp'],
    cardBackground: '#e31837',
    cardAccent: '#ff4d6d',
    cardFit: 'fill',
  },
  {
    slug: 'brand-avenue',
    logoSrc: 'Brand AVENUE/Logo.webp',
    gallerySrc: [
      'Brand AVENUE/1.webp',
      'Brand AVENUE/2.webp',
      'Brand AVENUE/3.webp',
      'Brand AVENUE/4.webp',
      'Brand AVENUE/5.webp',
      'Brand AVENUE/6.webp',
    ],
    cardBackground: '#0b1638',
    cardAccent: '#f97316',
    cardFit: 'fill',
  },
  {
    slug: 'lassi-n-cafe',
    logoSrc: 'Lassi N Cafe/Logo.webp',
    gallerySrc: ['Lassi N Cafe/1.webp', 'Lassi N Cafe/2.webp', 'Lassi N Cafe/3.webp'],
    cardBackground: '#c41e2e',
    cardAccent: '#ef4444',
    cardFit: 'fill',
  },
  {
    slug: 'fusion-pizza-big-burger',
    logoSrc: 'Fusion pizza and Big burger/Logo.webp',
    gallerySrc: [
      'Fusion pizza and Big burger/1.webp',
      'Fusion pizza and Big burger/2.webp',
      'Fusion pizza and Big burger/3.webp',
      'Fusion pizza and Big burger/4.webp',
      'Fusion pizza and Big burger/5.webp',
    ],
    cardBackground: '#1a0a24',
    cardAccent: '#a855f7',
    cardFit: 'fill',
  },
  {
    slug: 'kasturi-creations',
    logoSrc: 'kasturi/Logo.webp',
    gallerySrc: [
      'kasturi/1.webp',
      'kasturi/2.webp',
      'kasturi/3.webp',
      'kasturi/4.webp',
      'kasturi/5.webp',
      'kasturi/6.webp',
      'kasturi/7.webp',
      'kasturi/8.webp',
    ],
    cardBackground: '#1c1208',
    cardAccent: '#d97706',
    cardFit: 'fill',
  },
  {
    slug: '10-downing-street',
    logoSrc: '10 Downing Street/Logo.webp',
    gallerySrc: [
      '10 Downing Street/1.webp',
      '10 Downing Street/2.webp',
      '10 Downing Street/3.webp',
      '10 Downing Street/4.webp',
      '10 Downing Street/5.webp',
      '10 Downing Street/6.webp',
      '10 Downing Street/7.webp',
      '10 Downing Street/8.webp',
      '10 Downing Street/9.webp',
    ],
    card: '10 Downing Street/Logo.webp',
    cardBackground: '#14532d',
    cardAccent: '#ca8a04',
    cardFit: 'fill',
  },
  {
    slug: 'freshco-goli-soda',
    logoSrc: 'Freshco/Logo.webp',
    gallerySrc: [
      'Freshco/2.webp',
      'Freshco/3.webp',
      'Freshco/4.webp',
      'Freshco/5.webp',
      'Freshco/6.webp',
    ],
    cardBackground: '#ffffff',
    cardAccent: '#2563eb',
    cardFit: 'fill',
  },
];

/**
 * Resolved public paths for a manifest entry (after copy-brand-images.mjs).
 * @param {BrandAssetEntry} entry
 */
export function resolveBrandPublicPaths(entry) {
  const { slug } = entry;
  const logoExt = publicExtFromPath(entry.logoSrc);
  const logo = brandPublicImage(slug, fileName(slug, 'franchise-logo', logoExt));
  const gallery = entry.gallerySrc.map((src, index) => {
    const ext = publicExtFromPath(src);
    return brandPublicImage(slug, fileName(slug, `franchise-gallery-${index + 1}`, ext));
  });
  const cardSrc = entry.card || entry.logoSrc;
  const card =
    cardSrc === entry.logoSrc
      ? logo
      : brandPublicImage(slug, fileName(slug, 'franchise-card', publicExtFromPath(cardSrc)));

  return { logo, card, gallery };
}
