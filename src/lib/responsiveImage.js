/**
 * Build src/srcset strings from Vite-resolved asset URLs (post-optimize manifest keys).
 */

/**
 * @param {Record<number, string>} widthToUrl - e.g. { 640: url640, 1920: url1920 }
 * @param {string} fallback - default src
 * @returns {{ src: string, srcSet: string, sizes: string }}
 */
export function buildResponsiveSrc(widthToUrl, fallback, sizes = '100vw') {
  const entries = Object.entries(widthToUrl)
    .map(([w, url]) => [Number(w), url])
    .filter(([, url]) => url)
    .sort((a, b) => a[0] - b[0]);

  if (!entries.length) {
    return { src: fallback, srcSet: undefined, sizes };
  }

  const srcSet = entries.map(([w, url]) => `${url} ${w}w`).join(', ');
  const largest = entries[entries.length - 1][1];
  return {
    src: fallback || largest,
    srcSet,
    sizes,
  };
}

/**
 * Hero LCP: mobile-first sizes — full viewport width, cap at 1920px.
 */
export const HERO_SIZES =
  '(max-width: 767px) 640px, (max-width: 1024px) 100vw, (max-width: 1536px) 100vw, 1920px';
