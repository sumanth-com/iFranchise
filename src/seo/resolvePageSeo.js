import { franchiseOpportunities, franchiseSlugToId } from '../data/franchiseData';
import { getBlogBySlug } from '../components/blogData';
import { ROLES } from '../components/careersData';
import { STATIC_PAGE_SEO } from './staticPages';
import { absoluteUrl, truncateMeta, SITE_NAME, DEFAULT_OG_IMAGE_PATH } from './config';

const PATHNAME_ALIASES = {
  '/about-us': '/about',
  '/meet-the-team': '/team',
  '/contact-us': '/contact',
  '/for-brand-owners': '/list-your-brand',
  '/brand-owners': '/list-your-brand',
  '/featured-opportunities': '/franchise-opportunities',
  '/opportunities': '/franchise-opportunities',
  '/terms': '/terms-and-conditions',
};

const SLUG_TO_FRANCHISE_ID = franchiseSlugToId;

function getBlogSlugFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] !== 'blog' || parts.length < 2) return '';
  return parts[1];
}

function getCareerRoleIdFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] !== 'careers' || parts.length < 2) return '';
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
 * @param {string} logicalPathname — from getLogicalPathname()
 * @param {{ pathname?: string, search?: string }} [location]
 */
export function resolvePageSeo(logicalPathname, location = {}) {
  const pathname = location.pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const search = location.search ?? (typeof window !== 'undefined' ? window.location.search : '');

  const aliasCanonical = PATHNAME_ALIASES[pathname];
  let canonicalPath = aliasCanonical || pathname;

  let entry = STATIC_PAGE_SEO[logicalPathname] ? { ...STATIC_PAGE_SEO[logicalPathname] } : null;
  let ogImage = absoluteUrl(DEFAULT_OG_IMAGE_PATH);
  let ogType = entry?.ogType || 'website';

  if (logicalPathname === '/blog-detail') {
    const slug = getBlogSlugFromPath(pathname);
    const post = getBlogBySlug(slug);
    if (post) {
      canonicalPath = `/blog/${post.slug}`;
      const description = truncateMeta(post.excerpt);
      entry = {
        title: `${post.title} | iFranchise Blog`,
        description,
        keywords: `${post.category}, franchise, investment, franchise blog India`,
        canonicalPath,
        ogTitle: post.title,
        ogDescription: description,
        ogType: 'article',
        robots: 'index, follow',
      };
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
    const roleId = getCareerRoleIdFromPath(pathname);
    const role = ROLES.find((r) => r.id === roleId);
    if (role) {
      canonicalPath = `/careers/${role.id}`;
      entry = {
        title: `${role.title} — Careers | iFranchise`,
        description: truncateMeta(
          `Apply for ${role.title} at iFranchise. ${role.location} · ${role.type} · ${role.salary}.`,
        ),
        keywords: `${role.title} job, iFranchise hiring, ${role.dept} jobs`,
        canonicalPath,
        ogTitle: `${role.title} — iFranchise Careers`,
        ogDescription: truncateMeta(`Join iFranchise as ${role.title}. View responsibilities and apply.`),
        ogType: 'website',
        robots: 'index, follow',
      };
    } else {
      entry = { ...STATIC_PAGE_SEO['/404'], robots: 'noindex, nofollow' };
    }
  }

  if (logicalPathname === '/franchise-details') {
    const franchiseId = getFranchiseIdFromLocation(pathname, search);
    const franchise = franchiseId ? getFranchiseById(franchiseId) : null;
    if (franchise) {
      const brand = franchise.brandName;
      const slugPart = pathname.startsWith('/franchise/')
        ? pathname.replace('/franchise/', '').trim().toLowerCase()
        : '';
      const hasKnownSlug = slugPart && SLUG_TO_FRANCHISE_ID[slugPart];
      canonicalPath = hasKnownSlug ? `/franchise/${slugPart}` : `/franchise-details?id=${franchise.id}`;
      const description = truncateMeta(
        franchise.metaDescription ||
          `${brand} franchise opportunity: investment range, business model, locations, and ROI. Apply or inquire on iFranchise.`,
      );
      entry = {
        title: `${brand} Franchise — Investment, ROI & Details | iFranchise`,
        description,
        keywords: `${brand} franchise, franchise investment, ${franchise.industry || franchise.category} franchise India`,
        canonicalPath,
        ogTitle: `${brand} — Franchise Opportunity`,
        ogDescription: truncateMeta(`Investment, model, and expansion details for ${brand} on iFranchise.`),
        ogType: 'website',
        robots: 'index, follow',
      };
      if (franchise.image?.startsWith('http')) ogImage = franchise.image;
    } else {
      entry = { ...STATIC_PAGE_SEO['/404'], robots: 'noindex, nofollow' };
      canonicalPath = pathname;
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
