/**
 * Home hero LCP + responsive srcset — public URLs (no Vite content hashes).
 */
import { buildResponsiveSrc } from './responsiveImage';
import { siteImageUrl } from '../data/siteImageManifest.js';

/** Public LCP URLs (copy-hero-lcp.mjs) — same file as index.html static hero + preload. */
export const LCP_HERO_DARK = '/hero/lcp-dark.webp';
export const LCP_HERO_LIGHT = '/hero/lcp-light.webp';

const darkSrcSet = {
  480: siteImageUrl('hero/home-hero-480w.webp'),
  768: siteImageUrl('hero/home-hero-768w.webp'),
  1024: siteImageUrl('hero/home-hero-1024w.webp'),
  1280: siteImageUrl('hero/home-hero-1280w.webp'),
  1536: siteImageUrl('hero/home-hero-1536w.webp'),
};

const lightSrcSet = {
  480: siteImageUrl('hero/home-hero-light-480w.webp'),
  768: siteImageUrl('hero/home-hero-light-768w.webp'),
  1024: siteImageUrl('hero/home-hero-light-1024w.webp'),
  1280: siteImageUrl('hero/home-hero-light-1280w.webp'),
  1536: siteImageUrl('hero/home-hero-light-1536w.webp'),
};

export const HOME_HERO_DARK = {
  webp: LCP_HERO_DARK,
  avif: undefined,
  ...buildResponsiveSrc(darkSrcSet, LCP_HERO_DARK),
  srcSetMap: darkSrcSet,
};

export const HOME_HERO_LIGHT = {
  webp: LCP_HERO_LIGHT,
  avif: undefined,
  ...buildResponsiveSrc(lightSrcSet, LCP_HERO_LIGHT),
  srcSetMap: lightSrcSet,
};

export const homeHeroBgDark = LCP_HERO_DARK;
export const homeHeroBgLight = LCP_HERO_LIGHT;
