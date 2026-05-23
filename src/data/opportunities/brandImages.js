/**
 * Brand imagery from src/assets/{BrandName}/ — Logo.* per brand + folder photos for galleries.
 */

// — ODETTE
import odetteLogo from '../../assets/ODETTE/Logo.png';

// — Original Burger co
import originalBurgerLogo from '../../assets/Original Burger co/Logo.png';
import originalBurger1 from '../../assets/Original Burger co/1.JPG';
import originalBurger2 from '../../assets/Original Burger co/2.JPG';
import originalBurger3 from '../../assets/Original Burger co/3.JPG';
import originalBurger4 from '../../assets/Original Burger co/4.JPG';
import originalBurger5 from '../../assets/Original Burger co/5.JPG';

// — Franco
import francoLogo from '../../assets/Franco/Logo.png';

// — BIGGIES BURGER
import biggiesLogo from '../../assets/BIGGIES BURGER/Logo.png';
import biggies1 from '../../assets/BIGGIES BURGER/1.png';
import biggies2 from '../../assets/BIGGIES BURGER/2.png';

// — BIGGUYS
import bigguysLogo from '../../assets/BIGGUYS/Logo.jfif';

// — Brand AVENUE
import brandAvenueLogo from '../../assets/Brand AVENUE/Logo.jfif';

// — Lassi N Cafe
import lassiLogo from '../../assets/Lassi N Cafe/Logo.png';

// — Fusion pizza and Big burger
import fusionLogo from '../../assets/Fusion pizza and Big burger/Logo.png';
import fusion1 from '../../assets/Fusion pizza and Big burger/1.png';
import fusion2 from '../../assets/Fusion pizza and Big burger/2.jpg';

// — kasturi
import kasturiLogo from '../../assets/kasturi/Logo.png';

// — 10 Downing Street
import downingLogo from '../../assets/10 Downing Street/Logo.jpg';
import downing1 from '../../assets/10 Downing Street/1.jpeg';
import downing2 from '../../assets/10 Downing Street/2.jpeg';
import downing3 from '../../assets/10 Downing Street/3.jpeg';
import downing4 from '../../assets/10 Downing Street/4.jpeg';
import downing5 from '../../assets/10 Downing Street/5.jpeg';
import downing6 from '../../assets/10 Downing Street/6.jpeg';
import downing7 from '../../assets/10 Downing Street/7.jpeg';
import downing8 from '../../assets/10 Downing Street/8.jpeg';
import downing9 from '../../assets/10 Downing Street/9.jpeg';

const IMG = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Logo-only brands — contain fit so the full logo stays visible.
 * @param {string} logo
 * @param {string} cardBackground — match the logo file backdrop
 * @param {string} [cardAccent]
 * @param {'fill' | 'contain'} [cardFit]
 */
function packLogoCard(logo, cardBackground, cardAccent = cardBackground, cardFit = 'contain') {
  const slideshow = [logo];
  return {
    logo,
    card: logo,
    banner: logo,
    gallery: slideshow,
    slideshow,
    cardFit,
    cardBackground,
    cardAccent,
  };
}

/**
 * @param {string} logo
 * @param {string[]} photos
 * @param {{ card?: string, cardFit?: 'fill' | 'contain', cardBackground?: string, cardAccent?: string }} [opts]
 */
function packBrandAssets(logo, photos = [], opts = {}) {
  /** Detail-page carousel: real brand photos from assets (not the listing card logo). */
  const slideshow = photos.length > 0 ? [...photos] : [logo];
  const banner = slideshow[0];
  const cardBackground = opts.cardBackground ?? '#12082a';
  return {
    logo,
    card: opts.card ?? logo,
    banner,
    gallery: slideshow,
    slideshow,
    cardFit: opts.cardFit ?? 'contain',
    cardBackground,
    cardAccent: opts.cardAccent ?? cardBackground,
  };
}

/** @type {Record<string, { logo: string, card: string, banner: string, gallery: string[], cardFit?: string, cardBackground?: string }>} */
export const BRAND_IMAGES_BY_SLUG = {
  odette: packLogoCard(odetteLogo, '#f8f6f3', '#c4b5a0'),
  'original-burger-co': packBrandAssets(
    originalBurgerLogo,
    [originalBurger1, originalBurger2, originalBurger3, originalBurger4, originalBurger5],
    { cardBackground: '#1d4ed8', cardAccent: '#3b82f6', cardFit: 'fill' }
  ),
  franco: packLogoCard(francoLogo, '#ffffff', '#e2e8f0'),
  'biggies-burger': packBrandAssets(biggiesLogo, [biggies1, biggies2], {
    cardBackground: '#000000',
    cardAccent: '#facc15',
    cardFit: 'fill',
  }),
  bigguys: packLogoCard(bigguysLogo, '#e31837', '#ff4d6d'),
  'brand-avenue': packLogoCard(brandAvenueLogo, '#0b1638', '#f97316'),
  'lassi-n-cafe': packLogoCard(lassiLogo, '#c41e2e', '#ef4444', 'contain'),
  kasturi: packLogoCard(kasturiLogo, '#1c1208', '#d97706'),
  'fusion-pizza-big-burger': packBrandAssets(fusionLogo, [fusion1, fusion2], {
    cardBackground: '#1a0a24',
    cardAccent: '#a855f7',
    cardFit: 'contain',
  }),
  '10-downing-street': packBrandAssets(
    downingLogo,
    [downing1, downing2, downing3, downing4, downing5, downing6, downing7, downing8, downing9],
    { cardBackground: '#0a0a0a', cardAccent: '#d4af37', cardFit: 'contain' }
  ),
};

const INDUSTRY_FALLBACK_GALLERY = {
  Retail: [
    IMG('1441986300917-64644bd600e8'),
    IMG('1483985988357-763728e52755'),
    IMG('1555529669-e69e7aa0ba9a'),
    IMG('1521334884684-d80222895322'),
  ],
  'Food & Beverage': [
    IMG('1517248135467-4c7edcad34c4'),
    IMG('1565299624946-b28f40a0ae38'),
    IMG('1552566626-52f8b828add9'),
    IMG('1521017432531-fbd92d768814'),
  ],
  Entertainment: [
    IMG('1514933651103-005eec06c04b'),
    IMG('1572116469695-9758479bcbcc'),
    IMG('1470337458533-7ad329df6b54'),
    IMG('1511632765486-a01980e01a18'),
  ],
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
    };
  }

  const fallbackGallery = INDUSTRY_FALLBACK_GALLERY[industry] || INDUSTRY_FALLBACK_GALLERY['Food & Beverage'];
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
  };
}

/** ImageCarousel `category` prop for fallback styling. */
export function getCarouselCategory(industry = 'Food & Beverage') {
  if (industry === 'Retail') return 'retail';
  if (industry === 'Health & Wellness') return 'fitness';
  if (industry === 'Education') return 'education';
  if (industry === 'Home Services') return 'service';
  if (industry === 'Technology') return 'default';
  if (industry === 'Entertainment') return 'food';
  return 'food';
}
