/**
 * City list for franchise opportunity filters and SEO location pages (/location/:slug).
 */

/** @typedef {{ name: string, slug: string, aliases?: string[] }} FranchiseLocation */

/** @type {FranchiseLocation[]} */
export const FRANCHISE_LOCATION_CITIES = [
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Delhi NCR', slug: 'delhi-ncr', aliases: ['delhi', 'new-delhi', 'ncr'] },
  { name: 'Bengaluru', slug: 'bengaluru', aliases: ['bangalore', 'bengalore'] },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Chandigarh', slug: 'chandigarh' },
];

export const INDIAN_CITIES = FRANCHISE_LOCATION_CITIES.map((entry) => entry.name);

const SLUG_TO_CITY = new Map();
const CITY_TO_SLUG = new Map();

for (const entry of FRANCHISE_LOCATION_CITIES) {
  CITY_TO_SLUG.set(entry.name.toLowerCase(), entry.slug);
  SLUG_TO_CITY.set(entry.slug, entry.name);
  for (const alias of entry.aliases ?? []) {
    SLUG_TO_CITY.set(alias, entry.name);
  }
}

/** Canonical URL slug for a display city name (e.g. "Bengaluru" → "bengaluru"). */
export function getLocationSlug(cityName) {
  if (!cityName) return '';
  return CITY_TO_SLUG.get(String(cityName).trim().toLowerCase()) ?? '';
}

/** Resolve a URL slug (or alias) to the display city name, or null if unknown. */
export function resolveLocationSlug(slug) {
  if (!slug) return null;
  return SLUG_TO_CITY.get(String(slug).trim().toLowerCase()) ?? null;
}

/** @param {string} pathname */
export function parseLocationPathname(pathname) {
  if (!pathname?.startsWith('/location/')) return null;
  const slug = pathname.slice('/location/'.length).split('/')[0]?.trim();
  return resolveLocationSlug(slug);
}

/** Canonical public path for a city filter (e.g. "/location/bengaluru"). */
export function getLocationPath(cityName) {
  const slug = getLocationSlug(cityName);
  return slug ? `/location/${slug}` : '';
}

/** All canonical location URLs for sitemap generation. */
export function getAllLocationPaths() {
  return FRANCHISE_LOCATION_CITIES.map(({ slug }) => `/location/${slug}`);
}

/** If pathname uses an alias slug, return the canonical /location/:slug path. */
export function getCanonicalLocationPath(pathname) {
  const city = parseLocationPathname(pathname);
  if (!city) return null;
  const slug = getLocationSlug(city);
  return slug ? `/location/${slug}` : null;
}

export function isLocationPathname(pathname) {
  return Boolean(parseLocationPathname(pathname));
}
