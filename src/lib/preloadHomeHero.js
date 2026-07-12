import {
  HOME_HERO_DARK,
  HOME_HERO_LIGHT,
  HERO_MOBILE_MQ,
  homeHeroUrlForViewport,
} from './heroAssets.js';
import { resolveTheme, THEMES } from './theme';

const PRELOAD_DARK_ID = 'preload-home-hero-dark';
const PRELOAD_LIGHT_ID = 'preload-home-hero-light';

function isMobileViewport() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(HERO_MOBILE_MQ).matches;
}

function injectPreload(id, href) {
  const existing = document.getElementById(id);
  if (existing?.getAttribute('href') === href) return;

  existing?.remove();

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  link.type = 'image/png';
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

/** Preload only the active-theme hero (LCP). Alternate theme warms on idle. */
export function preloadHomeHero() {
  if (typeof document === 'undefined') return;

  const theme = resolveTheme();
  const isLight = theme === THEMES.LIGHT;
  const mobile = isMobileViewport();
  const primary = homeHeroUrlForViewport(isLight, mobile);
  const secondary = homeHeroUrlForViewport(!isLight, mobile);

  injectPreload(isLight ? PRELOAD_LIGHT_ID : PRELOAD_DARK_ID, primary);

  const warmSecondary = () => {
    injectPreload(isLight ? PRELOAD_DARK_ID : PRELOAD_LIGHT_ID, secondary);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(warmSecondary, { timeout: 2500 });
  } else {
    setTimeout(warmSecondary, 400);
  }
}

/** Warm hero asset for a theme (toggle). */
export function preloadHomeHeroForTheme(theme) {
  if (typeof document === 'undefined') return;
  const href = homeHeroUrlForViewport(theme === THEMES.LIGHT, isMobileViewport());
  const img = new Image();
  img.decoding = 'async';
  img.src = href;
}

export { HOME_HERO_DARK, HOME_HERO_LIGHT, homeHeroUrlForViewport };
export {
  HERO_DARK_DESKTOP as homeHeroBgDark,
  HERO_LIGHT_DESKTOP as homeHeroBgLight,
} from './heroAssets.js';
