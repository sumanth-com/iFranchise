/**
 * Brand imagery from src/assets/{BrandName}/. Logo for listing cards; numbered photos for detail galleries.
 */

// ODETTE
import odetteLogo from '../../assets/ODETTE/Logo.png';
import odette1 from '../../assets/ODETTE/1.jfif';
import odette2 from '../../assets/ODETTE/2.jfif';
import odette3 from '../../assets/ODETTE/3.jfif';
import odette4 from '../../assets/ODETTE/4.png';
import odette5 from '../../assets/ODETTE/5.png';
import odette6 from '../../assets/ODETTE/6.png';
import odette7 from '../../assets/ODETTE/7.png';

// Original Burger co
import originalBurgerLogo from '../../assets/Original Burger co/Logo.png';
import originalBurger1 from '../../assets/Original Burger co/1.JPG';
import originalBurger2 from '../../assets/Original Burger co/2.JPG';
import originalBurger3 from '../../assets/Original Burger co/3.JPG';
import originalBurger4 from '../../assets/Original Burger co/4.JPG';
import originalBurger5 from '../../assets/Original Burger co/5.JPG';

// Franco
import francoLogo from '../../assets/Franco/Logo.png';
import franco1 from '../../assets/Franco/1.png';
import franco2 from '../../assets/Franco/2.png';
import franco3 from '../../assets/Franco/3.png';
import franco4 from '../../assets/Franco/4.png';
import franco5 from '../../assets/Franco/5.png';

// BIGGIES BURGER
import biggiesLogo from '../../assets/BIGGIES BURGER/Logo.png';
import biggies1 from '../../assets/BIGGIES BURGER/1.jpg';
import biggies2 from '../../assets/BIGGIES BURGER/2.jpg';
import biggies3 from '../../assets/BIGGIES BURGER/3.jpg';
import biggies4 from '../../assets/BIGGIES BURGER/4.jpg';

// BIGGUYS
import bigguysLogo from '../../assets/BIGGUYS/Logo.png';
import bigguys1 from '../../assets/BIGGUYS/1.jpg';
import bigguys2 from '../../assets/BIGGUYS/2.jpg';
import bigguys3 from '../../assets/BIGGUYS/3.jpeg';
import bigguys4 from '../../assets/BIGGUYS/4.JPG';

// Brand AVENUE
import brandAvenueLogo from '../../assets/Brand AVENUE/Logo.jfif';
import brandAvenue1 from '../../assets/Brand AVENUE/1.png';
import brandAvenue2 from '../../assets/Brand AVENUE/2.png';
import brandAvenue3 from '../../assets/Brand AVENUE/3.png';
import brandAvenue4 from '../../assets/Brand AVENUE/4.png';
import brandAvenue5 from '../../assets/Brand AVENUE/5.png';
import brandAvenue6 from '../../assets/Brand AVENUE/6.png';

// Lassi N Cafe
import lassiLogo from '../../assets/Lassi N Cafe/Logo.png';
import lassi1 from '../../assets/Lassi N Cafe/1.jpg';
import lassi2 from '../../assets/Lassi N Cafe/2.png';
import lassi3 from '../../assets/Lassi N Cafe/3.png';

// Fusion pizza and Big burger
import fusionLogo from '../../assets/Fusion pizza and Big burger/Logo.png';
import fusion1 from '../../assets/Fusion pizza and Big burger/1.jfif';
import fusion2 from '../../assets/Fusion pizza and Big burger/2.jfif';
import fusion3 from '../../assets/Fusion pizza and Big burger/3.jfif';
import fusion4 from '../../assets/Fusion pizza and Big burger/4.jfif';
import fusion5 from '../../assets/Fusion pizza and Big burger/5.jfif';

// Kasturi Creations
import kasturiLogo from '../../assets/kasturi/Logo.png';

// 10 Downing Street
import downingLogo from '../../assets/10 Downing Street/Logo.png';
import downing1 from '../../assets/10 Downing Street/1.jpeg';
import downing2 from '../../assets/10 Downing Street/2.jpeg';
import downing3 from '../../assets/10 Downing Street/3.jpeg';
import downing4 from '../../assets/10 Downing Street/4.jpeg';
import downing5 from '../../assets/10 Downing Street/5.jpeg';
import downing6 from '../../assets/10 Downing Street/6.jpeg';
import downing7 from '../../assets/10 Downing Street/7.jpeg';
import downing8 from '../../assets/10 Downing Street/8.jpeg';
import downing9 from '../../assets/10 Downing Street/9.jpeg';

import { getIndustryGalleryFallback } from '../sectionImages.js';

/** Bundled Vite asset URLs (not remote fallbacks). */
export function isBundledGallerySrc(src) {
  return typeof src === 'string' && src.length > 0 && !/^https?:\/\//i.test(src);
}

function industryGallery(industry = 'Food & Beverage') {
  return getIndustryGalleryFallback(industry);
}

/**
 * Listing card uses logo; detail carousel uses brand photos (or industry fallback if logo-only).
 */
function packLogoCard(logo, cardBackground, cardAccent = cardBackground, cardFit = 'fill', industry = 'Food & Beverage') {
  const gallery = industryGallery(industry);
  return {
    logo,
    card: logo,
    banner: gallery[0],
    gallery,
    slideshow: gallery,
    cardFit,
    cardBackground,
    cardAccent,
    hasLocalGallery: false,
  };
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
export const BRAND_IMAGES_BY_SLUG = {
  odette: packBrandAssets(odetteLogo, [odette1, odette2, odette3, odette4, odette5, odette6, odette7], {
    cardBackground: '#f8f6f3',
    cardAccent: '#c4b5a0',
    cardFit: 'fill',
  }),
  'original-burger-co': packBrandAssets(
    originalBurgerLogo,
    [originalBurger1, originalBurger2, originalBurger3, originalBurger4, originalBurger5],
    { cardBackground: '#1d4ed8', cardAccent: '#3b82f6', cardFit: 'fill' }
  ),
  franco: packBrandAssets(francoLogo, [franco1, franco2, franco3, franco4, franco5], {
    cardBackground: '#ffffff',
    cardAccent: '#e2e8f0',
    cardFit: 'fill',
  }),
  'biggies-burger': packBrandAssets(biggiesLogo, [biggies1, biggies2, biggies3, biggies4], {
    cardBackground: '#000000',
    cardAccent: '#facc15',
    cardFit: 'fill',
  }),
  bigguys: packBrandAssets(bigguysLogo, [bigguys1, bigguys2, bigguys3, bigguys4], {
    cardBackground: '#e31837',
    cardAccent: '#ff4d6d',
    cardFit: 'fill',
  }),
  'brand-avenue': packBrandAssets(
    brandAvenueLogo,
    [brandAvenue1, brandAvenue2, brandAvenue3, brandAvenue4, brandAvenue5, brandAvenue6],
    { cardBackground: '#0b1638', cardAccent: '#f97316', cardFit: 'fill' }
  ),
  'lassi-n-cafe': packBrandAssets(lassiLogo, [lassi1, lassi2, lassi3], {
    cardBackground: '#c41e2e',
    cardAccent: '#ef4444',
    cardFit: 'fill',
  }),
  'kasturi-creations': packLogoCard(kasturiLogo, '#1c1208', '#d97706', 'fill', 'Food & Beverage'),
  kasturi: packLogoCard(kasturiLogo, '#1c1208', '#d97706', 'fill', 'Food & Beverage'),
  'fusion-pizza-big-burger': packBrandAssets(fusionLogo, [fusion1, fusion2, fusion3, fusion4, fusion5], {
    cardBackground: '#1a0a24',
    cardAccent: '#a855f7',
    cardFit: 'fill',
  }),
  '10-downing-street': packBrandAssets(
    downingLogo,
    [downing1, downing2, downing3, downing4, downing5, downing6, downing7, downing8, downing9],
    {
      card: downingLogo,
      cardBackground: '#14532d',
      cardAccent: '#ca8a04',
      cardFit: 'fill',
    }
  ),
};

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
 * Detail-page hero gallery: real bundled photos only (never listing logo or mixed Unsplash).
 * @param {{ logo?: string, slideshow?: string[], gallery?: string[], banner?: string, industry?: string, hasLocalGallery?: boolean }} franchise
 */
export function resolveDetailGalleryImages(franchise) {
  if (!franchise) return [];

  const industry = franchise.industry || 'Food & Beverage';
  const raw = franchise.slideshow?.length ? franchise.slideshow : franchise.gallery ?? [];
  let list = Array.isArray(raw) ? raw.filter(Boolean) : [];

  const logo = franchise.logo;
  list = list.filter((src) => src && src !== logo);

  const bundled = list.filter(isBundledGallerySrc);
  if (bundled.length > 0) {
    return [...new Set(bundled)];
  }

  const remote = list.filter((src) => !isBundledGallerySrc(src));
  if (remote.length > 0) {
    return [...new Set(remote)];
  }

  return industryGallery(industry);
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
