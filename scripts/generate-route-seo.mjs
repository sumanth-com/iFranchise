/**
 * Build-time SEO map for crawler-first meta tags (before React hydrates).
 * Writes public/route-seo-boot.js — consumed by index.html inline boot script.
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_PAGE_SEO } from '../src/seo/staticPages.js';
import { formatDescription, formatTitle, normalizeSeoEntry } from '../src/seo/metaUtils.js';
import { DEFAULT_META_KEYWORDS } from '../src/seo/keywords.js';

const SITE_URL = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.ifranchise.in').replace(
  /\/$/,
  '',
);
const DEFAULT_OG_IMAGE_PATH = '/apple-touch-icon.png?v=20260603-1';

function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
import { franchiseOpportunities } from '../src/data/opportunities/index.js';
import { getAllLocationPaths, parseLocationPathname } from '../src/data/opportunityLocations.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outFile = join(root, 'public', 'route-seo-boot.js');

function toSeoEntry({ title, description, keywords, canonicalPath, ogTitle, ogDescription, ogImage }) {
  const entry = normalizeSeoEntry({
    title: formatTitle(title),
    description: formatDescription(description),
    keywords,
    canonicalPath,
    ogTitle: ogTitle ? formatTitle(ogTitle) : undefined,
    ogDescription: ogDescription ? formatDescription(ogDescription) : undefined,
  });

  const canonical = absoluteUrl(canonicalPath);
  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    canonical,
    ogTitle: entry.ogTitle || entry.title,
    ogDescription: entry.ogDescription || entry.description,
    ogImage: ogImage || absoluteUrl(DEFAULT_OG_IMAGE_PATH),
  };
}

function staticRoute(pathname) {
  const page = STATIC_PAGE_SEO[pathname];
  if (!page) return null;
  return toSeoEntry({
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath || pathname,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
  });
}

function franchiseRoute(pathname) {
  const slug = pathname.replace('/franchise/', '').trim().toLowerCase();
  const franchise = franchiseOpportunities.find((f) => f.slug === slug);
  if (!franchise) return null;

  const brand = franchise.brandName;
  const industry = franchise.industry || franchise.category || '';
  const brandImage = franchise.logo || franchise.image;
  const ogImage = brandImage?.startsWith('http') ? brandImage : brandImage ? absoluteUrl(brandImage) : undefined;

  return toSeoEntry({
    title: franchise.metaTitle || `${brand} Franchise Opportunity India | iFranchise`,
    description:
      franchise.metaDescription ||
      `${brand} franchise opportunity in India: investment range, business model, locations, ROI, and payback. Inquire on iFranchise.`,
    keywords:
      franchise.metaKeywords ||
      `${brand} franchise, ${industry} franchise india, franchise investment opportunities, ${DEFAULT_META_KEYWORDS}`,
    canonicalPath: `/franchise/${franchise.slug}`,
    ogTitle: franchise.ogTitle || franchise.metaTitle || `${brand} Franchise | iFranchise`,
    ogDescription:
      franchise.ogDescription ||
      `Investment, model, and expansion details for ${brand} franchise on iFranchise.`,
    ogImage,
  });
}

function locationRoute(pathname) {
  const city = parseLocationPathname(pathname);
  if (!city) return null;
  const cityLower = city.toLowerCase();
  const description = `Browse verified franchise business opportunities in ${city}, India. Compare franchise investment range, FOFO and FICO models, payback, and expansion-ready brands across food, retail, and services on iFranchise.`;

  return toSeoEntry({
    title: `Franchise Opportunities in ${city} | iFranchise`,
    description,
    keywords: `franchise opportunities in ${cityLower}, franchise business in ${cityLower}, best franchise in ${cityLower}, franchise investment ${cityLower}, ${DEFAULT_META_KEYWORDS}`,
    canonicalPath: pathname,
    ogTitle: `Franchise Opportunities in ${city} | iFranchise`,
    ogDescription: description,
  });
}

function parseBlogPosts() {
  const source = readFileSync(join(root, 'src/components/blogData.js'), 'utf8');
  const posts = [];

  for (const match of source.matchAll(
    /slug:\s*'([^']+)',\s*\n\s*title:\s*'([^']+)',\s*\n\s*category:\s*'([^']+)'[\s\S]*?excerpt:\s*\n\s*'([^']+)'/g,
  )) {
    posts.push({
      slug: match[1],
      title: match[2],
      category: match[3],
      excerpt: match[4],
    });
  }

  return posts;
}

function blogRoute(pathname) {
  const slug = pathname.split('/').filter(Boolean)[1];
  const post = parseBlogPosts().find((p) => p.slug === slug);
  if (!post) return null;

  return toSeoEntry({
    title: `${post.title} | iFranchise Blog`,
    description: post.excerpt,
    keywords: `${post.category}, franchise investment, franchise blog india, ${DEFAULT_META_KEYWORDS}`,
    canonicalPath: `/blogs/${post.slug}`,
    ogTitle: post.title,
    ogDescription: post.excerpt,
  });
}

function parseCareerRoles() {
  const source = readFileSync(join(root, 'src/components/careersData.jsx'), 'utf8');
  const roles = [];

  for (const match of source.matchAll(
    /id:\s*'([^']+)',\s*\n\s*active:\s*true,[\s\S]*?title:\s*'([^']+)',[\s\S]*?mode:\s*'([^']+)',[\s\S]*?location:\s*'([^']+)',[\s\S]*?duration:\s*'([^']+)',[\s\S]*?tagline:\s*\n\s*'([^']+)'/g,
  )) {
    roles.push({
      id: match[1],
      title: match[2],
      mode: match[3],
      location: match[4],
      duration: match[5],
      tagline: match[6],
    });
  }

  return roles;
}

function careerRoute(pathname) {
  const roleId = pathname.split('/').filter(Boolean)[1];
  const roles = parseCareerRoles();
  const role = roles.find((r) => r.id === roleId);
  if (!role) return null;

  const description = `${role.title} at iFranchise — ${role.mode}, ${role.location}. ${role.duration}. ${role.tagline}`;

  return toSeoEntry({
    title: `${role.title} | Careers at iFranchise`,
    description,
    keywords: `${role.title}, ifranchise careers, franchise jobs india, ${DEFAULT_META_KEYWORDS}`,
    canonicalPath: `/careers/${role.id}`,
    ogTitle: `${role.title} | iFranchise Careers`,
    ogDescription: description,
  });
}

/** @returns {string[]} */
function collectPaths() {
  const paths = new Set(Object.keys(STATIC_PAGE_SEO).filter((p) => p !== '/404'));

  for (const franchise of franchiseOpportunities) {
    if (franchise.slug) paths.add(`/franchise/${franchise.slug}`);
  }

  for (const locationPath of getAllLocationPaths()) {
    paths.add(locationPath);
  }

  for (const post of parseBlogPosts()) {
    paths.add(`/blogs/${post.slug}`);
  }

  for (const role of parseCareerRoles()) {
    paths.add(`/careers/${role.id}`);
  }

  return [...paths].sort();
}

function buildSeoMap() {
  /** @type {Record<string, object>} */
  const map = {};

  for (const pathname of collectPaths()) {
    let entry = null;

    if (pathname.startsWith('/franchise/')) entry = franchiseRoute(pathname);
    else if (pathname.startsWith('/location/')) entry = locationRoute(pathname);
    else if (pathname.startsWith('/blogs/')) entry = blogRoute(pathname);
    else if (pathname.startsWith('/careers/')) entry = careerRoute(pathname);
    else entry = staticRoute(pathname);

    if (entry?.description) map[pathname] = entry;
  }

  return map;
}

const seoMap = buildSeoMap();
const franchiseCount = Object.keys(seoMap).filter((p) => p.startsWith('/franchise/')).length;
const franchiseDescriptions = Object.entries(seoMap)
  .filter(([p]) => p.startsWith('/franchise/'))
  .map(([, v]) => v.description);
const uniqueFranchiseDescriptions = new Set(franchiseDescriptions);

if (uniqueFranchiseDescriptions.size !== franchiseDescriptions.length) {
  console.warn('[seo] Warning: some franchise meta descriptions are duplicated');
}

const bootScript = `/* Auto-generated by scripts/generate-route-seo.mjs — do not edit */
(function () {
  var seo = ${JSON.stringify(seoMap)};
  var path = (location.pathname || '/').replace(/\\/$/, '') || '/';
  var entry = seo[path];
  if (!entry) return;

  function setMeta(attr, key, val) {
    if (!val) return;
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  }

  function setLink(rel, href) {
    if (!href) return;
    var el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  document.title = entry.title;
  setMeta('name', 'description', entry.description);
  setMeta('name', 'keywords', entry.keywords);
  setLink('canonical', entry.canonical);
  setMeta('property', 'og:title', entry.ogTitle || entry.title);
  setMeta('property', 'og:description', entry.ogDescription || entry.description);
  setMeta('property', 'og:url', entry.canonical);
  if (entry.ogImage) setMeta('property', 'og:image', entry.ogImage);
  setMeta('name', 'twitter:title', entry.ogTitle || entry.title);
  setMeta('name', 'twitter:description', entry.ogDescription || entry.description);
  if (entry.ogImage) setMeta('name', 'twitter:image', entry.ogImage);
})();
`;

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, bootScript, 'utf8');

console.log(
  `[seo] Wrote route-seo-boot.js — ${Object.keys(seoMap).length} routes (${franchiseCount} brands, each with unique meta description)`,
);
