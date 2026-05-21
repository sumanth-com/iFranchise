/**
 * Build sitemap.xml into public/ before Vite production build.
 * Includes main marketing pages + public blog, career, and franchise detail URLs.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { franchiseOpportunities } from '../src/data/franchiseData.js';
import { blogPosts } from '../src/components/blogData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.ifranchise.in').replace(
  /\/$/,
  '',
);

/** Canonical routes (primary nav + legal). */
const MAIN_PAGES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/team', changefreq: 'monthly', priority: '0.6' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/franchise-opportunities', changefreq: 'daily', priority: '0.95' },
  { path: '/list-your-brand', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.85' },
  { path: '/careers', changefreq: 'weekly', priority: '0.75' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
  { path: '/licenses', changefreq: 'yearly', priority: '0.3' },
];

/** Matches src/seo/resolvePageSeo.js + FranchiseDetailsPage slug routing. */
const SLUG_TO_FRANCHISE_ID = {
  burgerblast: '1',
  'fitlife-gym': '2',
  'ecoclean-solutions': '3',
  'urban-coffee-co': '1',
  'fitlife-studios': '2',
  'bella-italia-ristorante': '3',
  'kidszone-play-center': '24',
  'quickclean-services': '5',
  'techrepair-pro': '6',
};

function franchiseDetailPath(id) {
  const slug = Object.keys(SLUG_TO_FRANCHISE_ID).find(
    (key) => String(SLUG_TO_FRANCHISE_ID[key]) === String(id),
  );
  return slug ? `/franchise/${slug}` : `/franchise-details?id=${id}`;
}

function extractCareerRoleIds() {
  const file = join(root, 'src/components/careersData.jsx');
  const text = readFileSync(file, 'utf8');
  const rolesBlock = text.split('export const ROLES = [')[1]?.split('];')[0] ?? '';
  return [...rolesBlock.matchAll(/\n\s+id: '([^']+)',/g)].map((match) => match[1]);
}

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
  ...blogPosts.map((post) => ({
    loc: `${siteUrl}/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  ...extractCareerRoleIds().map((roleId) => ({
    loc: `${siteUrl}/careers/${roleId}`,
    changefreq: 'weekly',
    priority: '0.65',
  })),
  ...franchiseOpportunities.map((opp) => ({
    loc: `${siteUrl}${franchiseDetailPath(opp.id)}`,
    changefreq: 'weekly',
    priority: '0.8',
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
  `[seo] Wrote ${entries.length} URLs to public/sitemap.xml (${siteUrl}) — ${MAIN_PAGES.length} main, ${blogPosts.length} blog, ${extractCareerRoleIds().length} careers, ${franchiseOpportunities.length} franchises`,
);
