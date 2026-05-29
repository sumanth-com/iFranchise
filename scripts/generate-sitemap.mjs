/**
 * Build sitemap.xml into public/ before Vite production build.
 * Main marketing pages only — no blog posts, career roles, or franchise detail URLs.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.ifranchise.in').replace(
  /\/$/,
  '',
);

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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const entries = MAIN_PAGES.map(({ path, changefreq, priority }) => ({
  loc: `${siteUrl}${path}`,
  changefreq,
  priority,
}));

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

console.log(`[seo] Wrote ${entries.length} main-page URLs to public/sitemap.xml (${siteUrl})`);
