import { ORGANIZATION, SITE_NAME, SITE_URL, absoluteUrl } from './config';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    description: ORGANIZATION.description,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    address: ORGANIZATION.address,
    sameAs: ORGANIZATION.sameAs,
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: ORGANIZATION.description,
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/franchise-opportunities?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * @param {{ name: string, path: string }[]} items
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * @param {import('../components/blogData').blogPosts[number]} post
 */
export function buildArticleSchema(post, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author?.name || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };
}

export function buildServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Franchise Growth Services',
    provider: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: [
      'Franchise discovery',
      'Franchise expansion consulting',
      'Investor matching',
      'Lead generation',
      'Market research',
    ],
    url: absoluteUrl('/services'),
    description:
      'Franchise discovery, expansion consulting, investor matching, market research, and lead generation for brands and investors.',
  };
}

const BREADCRUMB_MAP = {
  '/about-us': [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about-us' }],
  '/team': [{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }],
  '/services': [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }],
  '/franchise-opportunities': [
    { name: 'Home', path: '/' },
    { name: 'Franchise Opportunities', path: '/franchise-opportunities' },
  ],
  '/list-your-brand': [{ name: 'Home', path: '/' }, { name: 'List Your Brand', path: '/list-your-brand' }],
  '/blog': [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }],
  '/careers': [{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }],
  '/contact-us': [{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact-us' }],
  '/privacy-policy': [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }],
  '/terms-and-conditions': [
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
  ],
  '/licenses': [{ name: 'Home', path: '/' }, { name: 'Licenses', path: '/licenses' }],
};

/**
 * Build all JSON-LD blocks for a resolved SEO state.
 */
export function buildSchemasForRoute(seo, context = {}) {
  const schemas = [
    { id: 'organization', data: buildOrganizationSchema() },
    { id: 'website', data: buildWebSiteSchema() },
  ];

  const crumbs = BREADCRUMB_MAP[seo.logicalPathname];
  if (crumbs) {
    schemas.push({ id: 'breadcrumbs', data: buildBreadcrumbSchema(crumbs) });
  }

  if (seo.logicalPathname === '/blog-detail' && context.blogPost) {
    schemas.push({
      id: 'article',
      data: buildArticleSchema(context.blogPost, seo.canonicalUrl),
    });
    schemas.push({
      id: 'breadcrumbs',
      data: buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: context.blogPost.title, path: seo.canonicalPath },
      ]),
    });
  }

  if (seo.logicalPathname === '/franchise-details' && context.franchiseBrand) {
    schemas.push({
      id: 'breadcrumbs',
      data: buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Franchise Opportunities', path: '/franchise-opportunities' },
        { name: context.franchiseBrand, path: seo.canonicalPath },
      ]),
    });
  }

  if (seo.logicalPathname === '/services') {
    schemas.push({ id: 'service', data: buildServiceSchema() });
  }

  return schemas;
}
