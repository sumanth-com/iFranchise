import homeHeroBg from '../assets/HomeHero.png';

const PRELOAD_ID = 'preload-home-hero';

/** Start fetching the home hero image as early as possible (LCP). */
export function preloadHomeHero() {
  if (typeof document === 'undefined') return;

  if (document.getElementById(PRELOAD_ID)) return;

  const link = document.createElement('link');
  link.id = PRELOAD_ID;
  link.rel = 'preload';
  link.as = 'image';
  link.href = homeHeroBg;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

export { homeHeroBg };
