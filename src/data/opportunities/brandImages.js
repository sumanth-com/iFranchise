/**
 * Brand imagery — SEO-friendly URLs under /brands/{slug}/ (see brandAssetManifest.js).
 * Assets are copied from src/assets at build/dev via scripts/copy-brand-images.mjs.
 */

import { getIndustryGalleryFallback } from '../sectionImages.js';
import { BRAND_ASSET_MANIFEST, resolveBrandPublicPaths } from './brandAssetManifest.js';

/** Local site paths and bundled Vite paths (not remote Unsplash). */
export function isBundledGallerySrc(src) {
  return (
    typeof src === 'string' &&
    src.length > 0 &&
    !/^https?:\/\//i.test(src) &&
    (src.startsWith('/') || src.startsWith('.'))
  );
}

function industryGallery(industry = 'Food & Beverage') {
  return getIndustryGalleryFallback(industry);
}

/**
 * @param {string} logo
 * @param {string[]} photos
 * @param {{ card?: string, cardFit?: 'fill' | 'contain', cardBackground?: string, cardAccent?: string }} [opts]
 */
function packBrandAssets(logo, photos = [], opts = {}) {
  const slideshow = photos.filter(Boolean);
  const banner = slideshow[0] || logo;
  const cardBackground = opts.cardBackground ?? '#12082a';
  return {
    logo,
    card: opts.card ?? logo,
    banner,
    gallery: [...slideshow],
    slideshow: [...slideshow],
    cardFit: opts.cardFit ?? 'fill',
    cardBackground,
    cardAccent: opts.cardAccent ?? cardBackground,
    hasLocalGallery: slideshow.length > 0,
  };
}

/** @type {Record<string, ReturnType<typeof packBrandAssets>>} */
const BRAND_IMAGES_BY_SLUG = Object.fromEntries(
  BRAND_ASSET_MANIFEST.map((entry) => {
    const paths = resolveBrandPublicPaths(entry);
    return [
      entry.slug,
      packBrandAssets(paths.logo, paths.gallery, {
        card: paths.card,
        cardBackground: entry.cardBackground,
        cardAccent: entry.cardAccent,
        cardFit: entry.cardFit,
      }),
    ];
  }),
);

// Alias slug used in some routes
BRAND_IMAGES_BY_SLUG.kasturi = BRAND_IMAGES_BY_SLUG['kasturi-creations'];

/**
 * @param {string} slug
 * @param {string} [industry]
 */
export function getBrandImages(slug, industry = 'Food & Beverage') {
  const keyed = BRAND_IMAGES_BY_SLUG[slug];
  if (keyed) {
    return {
      logo: keyed.logo,
      card: keyed.card,
      banner: keyed.banner,
      gallery: [...keyed.gallery],
      slideshow: [...(keyed.slideshow || keyed.gallery)],
      cardFit: keyed.cardFit || 'fill',
      cardBackground: keyed.cardBackground,
      cardAccent: keyed.cardAccent || keyed.cardBackground,
      hasLocalGallery: Boolean(keyed.hasLocalGallery),
    };
  }

  const fallbackGallery = industryGallery(industry);
  const banner = fallbackGallery[0];
  return {
    logo: '',
    card: banner.replace('w=1600', 'w=800'),
    banner,
    gallery: [...fallbackGallery],
    slideshow: [...fallbackGallery],
    cardFit: 'cover',
    cardBackground: undefined,
    cardAccent: undefined,
    hasLocalGallery: false,
  };
}

/**
 * Detail-page hero gallery: brand assets under /brands/{slug}/ only (no Unsplash).
 */
export function resolveDetailGalleryImages(franchise) {
  if (!franchise) return [];

  const logo = franchise.logo;
  const raw = franchise.slideshow?.length ? franchise.slideshow : franchise.gallery ?? [];
  let list = Array.isArray(raw) ? raw.filter(Boolean) : [];

  list = list.filter((src) => src && src !== logo);

  const bundled = list.filter(isBundledGallerySrc);
  const photos =
    bundled.length > 0
      ? [...new Set(bundled)]
      : list.filter((src) => !isBundledGallerySrc(src)).length > 0
        ? [...new Set(list.filter((src) => !isBundledGallerySrc(src)))]
        : [];

  return photos;
}

/** ImageCarousel `category` prop for fallback styling. */
export function getCarouselCategory(industry = 'Food & Beverage') {
  if (industry === 'Retail') return 'retail';
  if (industry === 'Health & Wellness') return 'fitness';
  if (industry === 'Education') return 'education';
  if (industry === 'Home Services') return 'service';
  if (industry === 'Technology') return 'default';
  if (industry === 'Entertainment') return 'entertainment';
  return 'food';
}
