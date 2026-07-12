/**
 * Home hero backgrounds — mobile vs desktop × dark vs light.
 * Vite imports from src/assets so edits to Herodark/Herolight PNGs apply immediately.
 * Public copies in /hero/ are kept for the index.html LCP shell (see scripts/copy-hero-lcp.mjs).
 */
import heroDarkM from '../assets/HerodarkM.png';
import heroLightM from '../assets/HerolightM.png';
import heroDarkD from '../assets/HerodarkD.png';
import heroLightD from '../assets/HerolightD.png';

export const HERO_MOBILE_MQ = '(max-width: 767px)';
export const HERO_DESKTOP_MQ = '(min-width: 768px)';

/** Mobile portrait heroes */
export const HERO_DARK_MOBILE = heroDarkM;
export const HERO_LIGHT_MOBILE = heroLightM;

/** Desktop landscape heroes */
export const HERO_DARK_DESKTOP = heroDarkD;
export const HERO_LIGHT_DESKTOP = heroLightD;

/** Public LCP URLs for index.html / preload (must match copy-hero-lcp.mjs output). */
export const LCP_HERO_DARK_MOBILE = '/hero/lcp-dark-m.png';
export const LCP_HERO_LIGHT_MOBILE = '/hero/lcp-light-m.png';
export const LCP_HERO_DARK_DESKTOP = '/hero/lcp-dark-d.png';
export const LCP_HERO_LIGHT_DESKTOP = '/hero/lcp-light-d.png';

/** @deprecated Prefer HERO_*_MOBILE / HERO_*_DESKTOP */
export const LCP_HERO_DARK = LCP_HERO_DARK_DESKTOP;
/** @deprecated Prefer HERO_*_MOBILE / HERO_*_DESKTOP */
export const LCP_HERO_LIGHT = LCP_HERO_LIGHT_DESKTOP;

export const HOME_HERO_DARK = {
  mobile: HERO_DARK_MOBILE,
  desktop: HERO_DARK_DESKTOP,
};

export const HOME_HERO_LIGHT = {
  mobile: HERO_LIGHT_MOBILE,
  desktop: HERO_LIGHT_DESKTOP,
};

/** Default preload targets (desktop); callers should pick by viewport when possible. */
export const homeHeroBgDark = HERO_DARK_DESKTOP;
export const homeHeroBgLight = HERO_LIGHT_DESKTOP;

export function homeHeroUrlsForTheme(isLight) {
  return isLight ? HOME_HERO_LIGHT : HOME_HERO_DARK;
}

export function homeHeroUrlForViewport(isLight, isMobile) {
  const urls = homeHeroUrlsForTheme(isLight);
  return isMobile ? urls.mobile : urls.desktop;
}
