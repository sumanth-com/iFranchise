import homeHeroBgDark from '../assets/HomeHero.png';
import homeHeroBgLight from '../assets/HomeHero2.png';
import { resolveTheme, THEMES } from './theme';

const PRELOAD_DARK_ID = 'preload-home-hero-dark';
const PRELOAD_LIGHT_ID = 'preload-home-hero-light';

function injectPreload(id, href) {
  const existing = document.getElementById(id);
  if (existing?.getAttribute('href') === href) return;

  existing?.remove();

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

/** Preload both hero images on home - active theme first, then the other. */
export function preloadHomeHero() {
  if (typeof document === 'undefined') return;

  const theme = resolveTheme();
  const primary = theme === THEMES.LIGHT ? homeHeroBgLight : homeHeroBgDark;
  const secondary = theme === THEMES.LIGHT ? homeHeroBgDark : homeHeroBgLight;

  injectPreload(
    theme === THEMES.LIGHT ? PRELOAD_LIGHT_ID : PRELOAD_DARK_ID,
    primary,
  );

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      injectPreload(
        theme === THEMES.LIGHT ? PRELOAD_DARK_ID : PRELOAD_LIGHT_ID,
        secondary,
      );
    });
  } else {
    setTimeout(() => {
      injectPreload(
        theme === THEMES.LIGHT ? PRELOAD_DARK_ID : PRELOAD_LIGHT_ID,
        secondary,
      );
    }, 120);
  }
}

/** Warm hero asset for a theme (toggle / idle). */
export function preloadHomeHeroForTheme(theme) {
  if (typeof document === 'undefined') return;
  const href = theme === THEMES.LIGHT ? homeHeroBgLight : homeHeroBgDark;
  const img = new Image();
  img.decoding = 'async';
  img.src = href;
}

export { homeHeroBgDark, homeHeroBgLight };

/** @deprecated Use homeHeroBgDark */
export const homeHeroBg = homeHeroBgDark;
