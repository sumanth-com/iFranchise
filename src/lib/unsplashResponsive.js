/**
 * Responsive Unsplash URLs — mobile gets smaller w= to avoid 1200px downloads.
 */

const BASE = 'https://images.unsplash.com';

/**
 * @param {string} url - full unsplash URL or photo-{id} fragment
 * @param {number} w
 * @param {number} [q=80]
 */
export function unsplashWidth(url, w, q = 80) {
  if (!url || typeof url !== 'string') return url;
  try {
    const u = new URL(url.includes('http') ? url : `${BASE}/photo-${url}`);
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    u.searchParams.set('w', String(w));
    u.searchParams.set('q', String(q));
    return u.toString();
  } catch {
    return url.replace(/w=\d+/, `w=${w}`);
  }
}

/** Standard widths for card / hero remote images */
export const UNSPLASH_WIDTHS = [400, 640, 800, 1200];

/**
 * @param {string} url
 * @param {number[]} [widths]
 * @returns {{ src: string, srcSet: string, sizes: string }}
 */
export function unsplashSrcSet(
  url,
  widths = UNSPLASH_WIDTHS,
  sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px',
) {
  if (!url || !url.includes('unsplash.com')) {
    return { src: url, srcSet: undefined, sizes };
  }
  const entries = widths.map((w) => [w, unsplashWidth(url, w)]);
  const srcSet = entries.map(([w, href]) => `${href} ${w}w`).join(', ');
  const src = entries[Math.min(1, entries.length - 1)][1];
  return { src, srcSet, sizes };
}

/**
 * Build from photo id (sectionImages helper style).
 */
export function unsplashPhoto(photoId, w = 800, q = 85) {
  return `${BASE}/photo-${photoId}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export function unsplashPhotoSrcSet(photoId, widths = UNSPLASH_WIDTHS, sizes) {
  return unsplashSrcSet(unsplashPhoto(photoId, widths[widths.length - 1] || 1200), widths, sizes);
}
