/**
 * Build sitemap.xml into public/ before Vite production build.
 * Parses slugs/ids from source files (no JSX runtime required).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.ifranchise.in').replace(
  /\/$/,
  '',
);

function read(relPath) {
  return readFileSync(join(root, relPath), 'utf8');
}

function matchAll(source, pattern) {
  return [...source.matchAll(pattern)].map((m) => m[1]);
}

const blogSource = read('src/components/blogData.js');
const careersSource = read('src/components/careersData.jsx');
const franchiseSource = read('src/data/franchiseData.js');

const blogSlugs = matchAll(blogSource, /slug:\s*'([^']+)'/g);
const careerIds = matchAll(careersSource, /id:\s*'([^']+)'/g);
const franchiseIds = matchAll(franchiseSource, /id:\s*(\d+)/g).filter((id, i, arr) => arr.indexOf(id) === i);

const franchiseSlugs = [
  'burgerblast',
  'fitlife-gym',
  'ecoclean-solutions',
  'urban-coffee-co',
  'fitlife-studios',
  'bella-italia-ristorante',
  'kidszone-play-center',
  'quickclean-services',
  'techrepair-pro',
];

function push(entries, path, changefreq = 'weekly', priority = '0.7') {
  entries.push({
    loc: `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`,
    changefreq,
    priority,
  });
}

const entries = [];
push(entries, '/', 'daily', '1.0');
push(entries, '/about', 'monthly', '0.8');
push(entries, '/team', 'monthly', '0.6');
push(entries, '/services', 'weekly', '0.9');
push(entries, '/franchise-opportunities', 'daily', '0.95');
push(entries, '/list-your-brand', 'weekly', '0.9');
push(entries, '/blog', 'daily', '0.85');
push(entries, '/careers', 'weekly', '0.75');
push(entries, '/contact', 'monthly', '0.8');
push(entries, '/privacy-policy', 'yearly', '0.3');
push(entries, '/terms-and-conditions', 'yearly', '0.3');
push(entries, '/licenses', 'yearly', '0.3');

blogSlugs.forEach((slug) => push(entries, `/blog/${slug}`, 'weekly', '0.7'));
careerIds.forEach((id) => push(entries, `/careers/${id}`, 'weekly', '0.6'));
franchiseSlugs.forEach((slug) => push(entries, `/franchise/${slug}`, 'weekly', '0.8'));
franchiseIds.forEach((id) => push(entries, `/franchise-details?id=${id}`, 'weekly', '0.75'));

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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

console.log(`[seo] Wrote ${entries.length} URLs to public/sitemap.xml (${siteUrl})`);
