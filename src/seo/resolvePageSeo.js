import { franchiseOpportunities, franchiseSlugToId } from '../data/franchiseData';
import { getBlogBySlug } from '../components/blogData';
import { getRoleById, getRoleIdFromPathname } from '../components/careersData';
import { getLocationPath, parseLocationPathname } from '../data/opportunityLocations.js';
import { STATIC_PAGE_SEO } from './staticPages';
import { resolveEcosystemSeo } from './ecosystemSeo.js';
import { absoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE_PATH } from './config';
import { DEFAULT_META_KEYWORDS } from './keywords.js';
import { formatDescription, formatTitle, normalizeSeoEntry } from './metaUtils.js';

const PATHNAME_ALIASES = {
  '/about': '/about-us',
  '/contact': '/contact-us',
  '/meet-the-team': '/team',
  '/for-brand-owners': '/list-your-brand',
  '/brand-owners': '/list-your-brand',
  '/featured-opportunities': '/franchise-opportunities',
  '/opportunities': '/franchise-opportunities',
  '/terms': '/terms-and-conditions',
};

const SLUG_TO_FRANCHISE_ID = franchiseSlugToId;

function getBlogSlugFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if ((parts[0] !== 'blogs' && parts[0] !== 'blog') || parts.length < 2) return '';
  return parts[1];
}

function getFranchiseIdFromLocation(pathname, search) {
  const params = new URLSearchParams(search);
  const idFromQuery = params.get('id');
  if (idFromQuery) return idFromQuery;

  if (pathname.startsWith('/franchise/')) {
    const slug = pathname.replace('/franchise/', '').trim().toLowerCase();
    if (SLUG_TO_FRANCHISE_ID[slug]) return SLUG_TO_FRANCHISE_ID[slug];
  }

  if (pathname === '/franchise-details' || pathname === '/franchise') {
    return params.get('id') || '1';
  }

  return null;
}

function getFranchiseById(id) {
  return franchiseOpportunities.find((f) => String(f.id) === String(id));
}

/**
 * Resolve full SEO payload for the current logical route and browser location.
 * @param {string} logicalPathname. from getLogicalPathname()
 * @param {{ pathname?: string, search?: string }} [location]
 */
export function resolvePageSeo(logicalPathname, location = {}) {
  const pathname = location.pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const search = location.search ?? (typeof window !== 'undefined' ? window.location.search : '');

  const aliasCanonical = PATHNAME_ALIASES[pathname];
  let canonicalPath = aliasCanonical || pathname;

  let entry = STATIC_PAGE_SEO[logicalPathname]
    ? normalizeSeoEntry({ ...STATIC_PAGE_SEO[logicalPathname] })
    : null;
  let ogImage = absoluteUrl(DEFAULT_OG_IMAGE_PATH);
  let ogType = entry?.ogType || 'website';

  if (logicalPathname === '/blog-detail') {
    const slug = getBlogSlugFromPath(pathname);
    const post = getBlogBySlug(slug);
    if (post) {
      canonicalPath = `/blogs/${post.slug}`;
      const description = formatDescription(post.excerpt);
      entry = normalizeSeoEntry({
        title: formatTitle(`${post.title} | iFranchise Blog`),
        description,
        keywords: `${post.category}, franchise investment, franchise blog india, ${DEFAULT_META_KEYWORDS}`,
        canonicalPath,
        ogTitle: post.title,
        ogDescription: description,
        ogType: 'article',
        robots: 'index, follow',
      });
      ogImage = post.image?.startsWith('http') ? post.image : absoluteUrl(post.image);
    } else {
      entry = {
        ...STATIC_PAGE_SEO['/404'],
        robots: 'noindex, nofollow',
      };
      canonicalPath = pathname;
    }
  }

  if (logicalPathname === '/career-detail') {
    const roleId = getRoleIdFromPathname(pathname);
    const role = roleId ? getRoleById(roleId) : null;
    if (role?.active) {
      canonicalPath = `/careers/${role.id}`;
      const description = formatDescription(
        `${role.title} at iFranchise — ${role.mode}, ${role.location}. ${role.duration}. ${role.tagline}`,
      );
      entry = normalizeSeoEntry({
        title: formatTitle(`${role.title} | Careers at iFranchise`),
        description,
        keywords: `${role.title}, ifranchise careers, franchise jobs india, ${DEFAULT_META_KEYWORDS}`,
        canonicalPath,
        ogTitle: formatTitle(`${role.title} | iFranchise Careers`),
        ogDescription: description,
        ogType: 'website',
        robots: 'index, follow',
      });
    } else {
      entry = { ...STATIC_PAGE_SEO['/404'], robots: 'noindex, nofollow' };
      canonicalPath = pathname;
    }
  }

  if (logicalPathname === '/franchise-details') {
    const franchiseId = getFranchiseIdFromLocation(pathname, search);
    const franchise = franchiseId ? getFranchiseById(franchiseId) : null;
    if (franchise) {
      const brand = franchise.brandName;
      canonicalPath = franchise.slug ? `/franchise/${franchise.slug}` : pathname;
      const industry = franchise.industry || franchise.category || '';
      const description = formatDescription(
        franchise.metaDescription ||
          `${brand} franchise opportunity in India: investment range, business model, locations, ROI, and payback. Inquire on iFranchise.`,
      );
      entry = normalizeSeoEntry({
        title: formatTitle(franchise.metaTitle || `${brand} Franchise Opportunity India | iFranchise`),
        description,
        keywords: franchise.metaKeywords || `${brand} franchise, ${industry} franchise india, franchise investment opportunities, ${DEFAULT_META_KEYWORDS}`,
        canonicalPath,
        ogTitle: formatTitle(franchise.ogTitle || franchise.metaTitle || `${brand} Franchise | iFranchise`),
        ogDescription: formatDescription(
          franchise.ogDescription ||
            `Investment, model, and expansion details for ${brand} franchise on iFranchise.`,
        ),
        ogType: 'website',
        robots: 'index, follow',
      });
      const brandImage = franchise.logo || franchise.image;
      if (brandImage?.startsWith('http')) ogImage = brandImage;
      else if (brandImage) ogImage = absoluteUrl(brandImage);
    } else {
      entry = { ...STATIC_PAGE_SEO['/404'], robots: 'noindex, nofollow' };
      canonicalPath = pathname;
    }
  }

  if (logicalPathname === '/franchise-opportunities') {
    const locationCity = parseLocationPathname(pathname);
    if (locationCity) {
      canonicalPath = getLocationPath(locationCity);
      const cityLower = locationCity.toLowerCase();
      const description = formatDescription(
        `Browse verified franchise business opportunities in ${locationCity}, India. Compare franchise investment range, FOFO and FICO models, payback, and expansion-ready brands across food, retail, and services on iFranchise.`,
      );
      entry = normalizeSeoEntry({
        title: formatTitle(`Franchise Opportunities in ${locationCity} | iFranchise`),
        description,
        keywords: `franchise opportunities in ${cityLower}, franchise business in ${cityLower}, best franchise in ${cityLower}, franchise investment ${cityLower}, ${DEFAULT_META_KEYWORDS}`,
        canonicalPath,
        ogTitle: formatTitle(`Franchise Opportunities in ${locationCity} | iFranchise`),
        ogDescription: description,
        ogType: 'website',
        robots: 'index, follow',
      });
    }
  }

  if (!entry) {
    const ecosystemEntry = resolveEcosystemSeo(pathname, logicalPathname);
    if (ecosystemEntry) {
      entry = ecosystemEntry;
      canonicalPath = ecosystemEntry.canonicalPath || pathname;
    }
  }

  if (!entry) {
    entry = { ...STATIC_PAGE_SEO['/404'], robots: 'noindex, nofollow' };
    canonicalPath = pathname;
  }

  if (aliasCanonical && !entry.robots?.includes('noindex')) {
    entry = { ...entry, canonicalPath: entry.canonicalPath || aliasCanonical };
  }

  const canonicalUrl = absoluteUrl(canonicalPath);
  const ogTitle = entry.ogTitle || entry.title;
  const ogDescription = entry.ogDescription || entry.description;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    canonicalUrl,
    canonicalPath,
    robots: entry.robots || 'index, follow',
    og: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      url: canonicalUrl,
      image: ogImage,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
    },
    logicalPathname,
  };
}
