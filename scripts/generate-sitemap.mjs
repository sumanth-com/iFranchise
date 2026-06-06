/**
 * Build sitemap.xml into public/ before Vite production build.
 * Includes main marketing pages and all franchise detail URLs.
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RAW_BRANDS } from '../src/data/opportunities/rawBrands.js';
import { getAllLocationPaths } from '../src/data/opportunityLocations.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.ifranchise.in').replace(
  /\/$/,
  '',
);

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
  { path: '/blogs', changefreq: 'weekly', priority: '0.85' },
  { path: '/careers', changefreq: 'weekly', priority: '0.75' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
  { path: '/licenses', changefreq: 'yearly', priority: '0.3' },
];

const FRANCHISE_PAGES = RAW_BRANDS.map((raw) => {
  const name = cleanText(raw.franchiseName).replace(/\(2\)/i, '').trim();
  const slug = slugifyBrand(name);
  return { slug, path: `/franchise/${slug}` };
}).filter(({ slug }) => slug);

const LOCATION_PAGES = getAllLocationPaths().map((path) => ({ path }));

const blogDataSource = readFileSync(join(root, 'src/components/blogData.js'), 'utf8');
const BLOG_PAGES = [...blogDataSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => ({
  path: `/blogs/${match[1]}`,
}));

const careersSource = readFileSync(join(root, 'src/components/careersData.jsx'), 'utf8');
const CAREER_PAGES = [...careersSource.matchAll(/id:\s*'([^']+)',\s*\n\s*active:\s*true/g)].map((match) => ({
  path: `/careers/${match[1]}`,
}));

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
  ...LOCATION_PAGES.map(({ path }) => ({
    loc: `${siteUrl}${path}`,
    changefreq: 'weekly',
    priority: '0.9',
  })),
  ...BLOG_PAGES.map(({ path }) => ({
    loc: `${siteUrl}${path}`,
    changefreq: 'monthly',
    priority: '0.75',
  })),
  ...CAREER_PAGES.map(({ path }) => ({
    loc: `${siteUrl}${path}`,
    changefreq: 'weekly',
    priority: '0.7',
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
  `[seo] Wrote ${entries.length} URLs (${MAIN_PAGES.length} main + ${FRANCHISE_PAGES.length} franchise + ${LOCATION_PAGES.length} location + ${BLOG_PAGES.length} blog + ${CAREER_PAGES.length} careers) to public/sitemap.xml (${siteUrl})`,
);
