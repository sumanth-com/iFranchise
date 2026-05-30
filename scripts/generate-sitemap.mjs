/**
 * Build sitemap.xml into public/ before Vite production build.
 * Includes main marketing pages and all franchise detail URLs.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RAW_BRANDS } from '../src/data/opportunities/rawBrands.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.ifranchise.in').replace(
  /\/$/,
  '',
);

/** Temporarily hidden from listings (must match src/data/opportunities/index.js). */
const HIDDEN_BRAND_SLUGS = new Set(['kasturi-creations']);

function slugifyBrand(name = '') {
  return name
    .toLowerCase()
    .replace(/\(2\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function cleanText(value) {
  if (value == null || value === false) return '';
  return String(value)
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Canonical main routes only (primary nav + legal). */
const MAIN_PAGES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/team', changefreq: 'monthly', priority: '0.6' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/franchise-opportunities', changefreq: 'daily', priority: '0.95' },
  { path: '/list-your-brand', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.85' },
  { path: '/careers', changefreq: 'weekly', priority: '0.75' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
  { path: '/licenses', changefreq: 'yearly', priority: '0.3' },
];

const FRANCHISE_PAGES = RAW_BRANDS.map((raw) => {
  const name = cleanText(raw.franchiseName).replace(/\(2\)/i, '').trim();
  const slug = slugifyBrand(name);
  return { slug, path: `/franchise/${slug}` };
}).filter(({ slug }) => slug && !HIDDEN_BRAND_SLUGS.has(slug));

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const entries = [
  ...MAIN_PAGES.map(({ path, changefreq, priority }) => ({
    loc: `${siteUrl}${path}`,
    changefreq,
    priority,
  })),
  ...FRANCHISE_PAGES.map(({ path }) => ({
    loc: `${siteUrl}${path}`,
    changefreq: 'weekly',
    priority: '0.85',
  })),
];

const urls = entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outFile = join(root, 'public', 'sitemap.xml');
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, xml, 'utf8');

console.log(
  `[seo] Wrote ${entries.length} URLs (${MAIN_PAGES.length} main + ${FRANCHISE_PAGES.length} franchise) to public/sitemap.xml (${siteUrl})`,
);
