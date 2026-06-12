import { SOCIAL_LINKS } from '../../constants/socialLinks.js';
import { OUR_SERVICES_ITEMS } from '../../data/ourServices.js';
import { franchiseOpportunities } from '../../data/franchiseData.js';
import { blogPosts } from '../../components/blogData.js';
import { citationsToSchema, getBlogCitations } from '../../data/citations/index.js';
import { ORGANIZATION, SITE_NAME, SITE_URL, absoluteUrl } from '../config';
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  defaultJobValidThrough,
  mapEmploymentType,
  organizationReference,
  toAbsoluteImageUrl,
} from './helpers.js';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildOrganizationSchema() {
  const sameAs = SOCIAL_LINKS.map((link) => link.href).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: {
      '@type': 'ImageObject',
      url: ORGANIZATION.logo,
    },
    image: ORGANIZATION.logo,
    description: ORGANIZATION.description,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    address: ORGANIZATION.address,
    areaServed: { '@type': 'Country', name: 'India' },
    knowsAbout: [
      'Franchise consulting',
      'Franchise investment',
      'Franchise business opportunities',
      'Brand expansion',
      'FOFO FOCO FICO franchise models',
      'Retail franchise',
      'Food and beverage franchise',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.telephone,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs,
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: ORGANIZATION.description,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/franchise-opportunities?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  };
}

export function buildAboutPageSchema(canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: 'About iFranchise',
    description:
      'Learn how iFranchise helps investors, entrepreneurs, and brand owners navigate franchise discovery, expansion, and growth across India.',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function buildContactPageSchema(canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: 'Contact iFranchise',
    description:
      'Get in touch with iFranchise for franchise investment, brand listing, partnerships, and support.',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
}

export function buildWebPageSchema({ canonicalUrl, name, description, type = 'WebPage' }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
  };
}

/**
 * @param {import('../../data/ourServices.js').OUR_SERVICES_ITEMS[number]} item
 */
export function buildServiceSchemaFromItem(item, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.title,
    description: item.desc,
    url: item.anchorId ? `${canonicalUrl}#${item.anchorId}` : canonicalUrl,
    provider: organizationReference(),
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: item.title,
  };
}

export function buildServicesPageSchemas(canonicalUrl) {
  return OUR_SERVICES_ITEMS.map((item) => buildServiceSchemaFromItem(item, canonicalUrl));
}

export function buildCollectionPageSchema({ canonicalUrl, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function buildItemListSchema({ canonicalUrl, name, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: canonicalUrl,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFranchiseOpportunitiesListSchemas(canonicalUrl, locationCity = null) {
  const items = franchiseOpportunities.map((opp) => ({
    name: opp.brandName,
    url: absoluteUrl(opp.slug ? `/franchise/${opp.slug}` : '/franchise-opportunities'),
    image: toAbsoluteImageUrl(opp.image),
  }));

  const cityLabel = locationCity ? String(locationCity).trim() : '';
  const collectionName = cityLabel
    ? `Franchise Opportunities in ${cityLabel}, India`
    : 'Franchise Opportunities in India';
  const collectionDescription = cityLabel
    ? `Browse verified franchise business opportunities in ${cityLabel}. Compare investment, models, payback, and expansion-ready brands on iFranchise.`
    : 'Explore verified franchise opportunities across food, wellness, education, retail, and more on iFranchise.';

  return {
    collection: buildCollectionPageSchema({
      canonicalUrl,
      name: collectionName,
      description: collectionDescription,
    }),
    itemList: buildItemListSchema({
      canonicalUrl,
      name: cityLabel ? `Franchise Opportunities in ${cityLabel}` : 'Franchise Opportunities',
      items,
    }),
  };
}

/**
 * @param {object} franchise - listing record from franchiseOpportunities
 * @param {object} detail - detail record from getFranchiseDetailById
 */
export function buildFranchiseBrandSchemas(franchise, detail, canonicalUrl) {
  const schemas = [];
  const brandName = franchise?.brandName || detail?.name || 'Franchise';
  const industry = franchise?.industry || franchise?.category || detail?.industry || '';
  const description =
    franchise?.metaDescription ||
    detail?.overview ||
    `${brandName} franchise opportunity in India on iFranchise.`;

  const image = toAbsoluteImageUrl(
    franchise?.image || detail?.banner || detail?.logo || detail?.image,
  );

  const investmentLabel =
    franchise?.investmentDisplay ||
    detail?.keyInfo?.investment ||
    detail?.financialHighlights?.investmentRange ||
    '';

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${canonicalUrl}#brand`,
    name: brandName,
    description,
    url: canonicalUrl,
    image,
    ...(industry ? { knowsAbout: industry } : {}),
    parentOrganization: { '@id': ORG_ID },
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${brandName} Franchise Opportunity | iFranchise`,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': `${canonicalUrl}#brand` },
    publisher: { '@id': ORG_ID },
  });

  const offerDescription = investmentLabel
    ? `${description} Indicative investment: ${investmentLabel}.`
    : description;

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `${brandName} Franchise Opportunity`,
    description: offerDescription,
    url: canonicalUrl,
    category: industry || 'Franchise',
    seller: { '@id': `${canonicalUrl}#brand` },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  });

  const faqSchema = buildFaqPageSchema(detail?.faqs);
  if (faqSchema) schemas.push(faqSchema);

  return schemas;
}

export function buildBlogSchema(canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonicalUrl}#blog`,
    url: canonicalUrl,
    name: 'iFranchise Blog',
    description:
      'Practical franchise guides for investors and brand owners: evaluating opportunities, FOFO vs FICO, unit economics, and market trends in India.',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * @param {import('../../components/blogData').blogPosts[number]} post
 */
export function buildBlogPostingSchema(post, canonicalUrl) {
  const imageUrl = toAbsoluteImageUrl(post.image || post.thumbnail);
  const authorName = post.author?.name || SITE_NAME;
  const schemaCitations = citationsToSchema(getBlogCitations(post.slug));

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(post.author?.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
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
    url: canonicalUrl,
    articleSection: post.category,
    ...(schemaCitations ? { citation: schemaCitations } : {}),
  };
}

/** Article type for blog posts (paired with BlogPosting). */
export function buildArticleSchema(post, canonicalUrl) {
  const posting = buildBlogPostingSchema(post, canonicalUrl);
  return {
    ...posting,
    '@type': 'Article',
  };
}

/**
 * @param {import('../../components/careersData.jsx').ROLES[number]} role
 */
export function buildJobPostingSchema(role, canonicalUrl) {
  const descriptionParts = [
    role.tagline,
    role.about,
    Array.isArray(role.responsibilities) ? role.responsibilities.join(' ') : '',
    Array.isArray(role.requirements) ? role.requirements.join(' ') : '',
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: descriptionParts.join('\n\n').trim() || role.tagline,
    identifier: {
      '@type': 'PropertyValue',
      name: 'iFranchise',
      value: role.id,
    },
    datePosted: role.datePosted || new Date().toISOString().split('T')[0],
    validThrough: role.validThrough || defaultJobValidThrough(),
    employmentType: mapEmploymentType(role.type),
    hiringOrganization: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION.logo,
      },
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
    ...(String(role.mode).toLowerCase().includes('remote')
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: {
            '@type': 'Country',
            name: 'India',
          },
        }
      : {}),
    url: canonicalUrl,
    directApply: true,
  };
}

export function buildCareersCollectionSchemas(canonicalUrl, roles) {
  const activeRoles = roles.filter((r) => r.active);
  return {
    collection: buildCollectionPageSchema({
      canonicalUrl,
      name: 'Careers at iFranchise',
      description:
        "Join India's leading franchise growth platform. Explore open roles in marketing, growth, design, and operations.",
    }),
    itemList: buildItemListSchema({
      canonicalUrl,
      name: 'Open roles at iFranchise',
      items: activeRoles.map((role) => ({
        name: role.title,
        url: absoluteUrl(`/careers/${role.id}`),
      })),
    }),
  };
}

export { buildBreadcrumbSchema, buildFaqPageSchema };
