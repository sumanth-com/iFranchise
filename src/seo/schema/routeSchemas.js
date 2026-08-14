import { parseLocationPathname } from '../../data/opportunityLocations.js';
import { getFranchiseDetailById } from '../../data/franchiseData.js';
import { getOpenRoles } from '../../components/careersData.jsx';
import {
  CAREERS_FAQS,
  CONTACT_FAQS,
  FAQ_PAGE_ALL_FAQS,
  HOME_PAGE_FAQS,
  LIST_YOUR_BRAND_FAQS,
  SERVICES_FAQS,
} from '../../data/faqContent.js';
import {
  buildAboutPageSchema,
  buildBlogPostingSchema,
  buildBlogSchema,
  buildBreadcrumbSchema,
  buildCareersCollectionSchemas,
  buildContactPageSchema,
  buildFaqPageSchema,
  buildFranchiseBrandSchemas,
  buildFranchiseOpportunitiesListSchemas,
  buildJobPostingSchema,
  buildOrganizationSchema,
  buildServiceSchemaFromItem,
  buildServicesPageSchemas,
  buildWebPageSchema,
  buildWebSiteSchema,
} from './builders.js';
import { pushSchema } from './helpers.js';
import {
  getEcosystemBreadcrumbs,
  getEcosystemFaqsForPath,
} from '../ecosystemSeo.js';
import {
  getEcosystemLogicalRoute,
  isEcosystemPath,
} from '../../data/ecosystem/ecosystemRoutes.js';
const BREADCRUMB_MAP = {
  '/': [{ name: 'Home', path: '/' }],
  '/about-us': [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about-us' }],
  '/team': [{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }],
  '/services': [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }],
  '/franchise-opportunities': [
    { name: 'Home', path: '/' },
    { name: 'Franchise Opportunities', path: '/franchise-opportunities' },
  ],
  '/list-your-brand': [{ name: 'Home', path: '/' }, { name: 'List Your Brand', path: '/list-your-brand' }],
  '/blogs': [{ name: 'Home', path: '/' }, { name: 'Blogs', path: '/blogs' }],
  '/careers': [{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }],
  '/contact-us': [{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact-us' }],
  '/faq': [{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }],
  '/privacy-policy': [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }],
  '/data-rights-request': [
    { name: 'Home', path: '/' },
    { name: 'Data Rights Request', path: '/data-rights-request' },
  ],
  '/terms-and-conditions': [
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
  ],
  '/licenses': [{ name: 'Home', path: '/' }, { name: 'Licenses', path: '/licenses' }],
};

function addBreadcrumbs(schemas, seo, items) {
  const crumbs = items || BREADCRUMB_MAP[seo.logicalPathname];
  if (crumbs?.length) {
    pushSchema(schemas, 'breadcrumbs', buildBreadcrumbSchema(crumbs));
  }
}

/**
 * Build all JSON-LD blocks for a resolved SEO state.
 * @param {ReturnType<import('../resolvePageSeo.js').resolvePageSeo>} seo
 * @param {object} context
 */
export function buildSchemasForRoute(seo, context = {}) {
  const schemas = [];
  const { canonicalUrl, logicalPathname } = seo;

  pushSchema(schemas, 'organization', buildOrganizationSchema());
  pushSchema(schemas, 'website', buildWebSiteSchema());

  if (logicalPathname === '/') {
    addBreadcrumbs(schemas, seo);
    const homeFaq = buildFaqPageSchema(HOME_PAGE_FAQS);
    if (homeFaq) pushSchema(schemas, 'faq', homeFaq);
    return schemas;
  }

  if (logicalPathname === '/about-us') {
    pushSchema(schemas, 'about', buildAboutPageSchema(canonicalUrl));
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/team') {
    pushSchema(
      schemas,
      'webpage',
      buildWebPageSchema({
        canonicalUrl,
        name: 'Meet the Team | iFranchise',
        description: 'Meet the iFranchise team driving franchise innovation, partnerships, and growth across India.',
      }),
    );
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/services') {
    buildServicesPageSchemas(canonicalUrl).forEach((service, index) => {
      pushSchema(schemas, `service-${index}`, service);
    });
    const servicesFaq = buildFaqPageSchema(SERVICES_FAQS);
    if (servicesFaq) pushSchema(schemas, 'faq-services', servicesFaq);
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/franchise-opportunities') {
    const locationCity = parseLocationPathname(seo.canonicalPath || '');
    const { collection, itemList } = buildFranchiseOpportunitiesListSchemas(canonicalUrl, locationCity);
    pushSchema(schemas, 'collection', collection);
    pushSchema(schemas, 'itemlist', itemList);
    if (locationCity) {
      addBreadcrumbs(schemas, seo, [
        { name: 'Home', path: '/' },
        { name: 'Franchise Opportunities', path: '/franchise-opportunities' },
        { name: locationCity, path: seo.canonicalPath },
      ]);
    } else {
      addBreadcrumbs(schemas, seo);
    }
    return schemas;
  }

  // Every brand in rawBrands.js → auto slug, sitemap, and schemas (no per-brand config).
  if (logicalPathname === '/franchise-details' && context.franchiseDetail && context.franchise) {
    buildFranchiseBrandSchemas(context.franchise, context.franchiseDetail, canonicalUrl).forEach(
      (block, index) => {
        pushSchema(schemas, `franchise-${index}`, block);
      },
    );
    addBreadcrumbs(schemas, seo, [
      { name: 'Home', path: '/' },
      { name: 'Franchise Opportunities', path: '/franchise-opportunities' },
      {
        name: context.franchise.brandName || context.franchiseDetail.name,
        path: seo.canonicalPath,
      },
    ]);
    return schemas;
  }

  if (logicalPathname === '/list-your-brand') {
        pushSchema(
      schemas,
      'service',
      buildServiceSchemaFromItem(
        {
          id: 'list-your-brand',
          title: 'List Your Brand on iFranchise',
          desc: 'Franchise listing platform for franchise development, franchise consulting, franchise investors, franchise lead generation, and brand expansion across India.',
          points: [],
        },
        canonicalUrl,
      ),
    );
    pushSchema(
      schemas,
      'contact',
      buildContactPageSchema(canonicalUrl),
    );
    const faq = buildFaqPageSchema(LIST_YOUR_BRAND_FAQS);
    if (faq) pushSchema(schemas, 'faq', faq);
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/contact-us') {
    pushSchema(schemas, 'contact', buildContactPageSchema(canonicalUrl));
    const faq = buildFaqPageSchema(CONTACT_FAQS);
    if (faq) pushSchema(schemas, 'faq', faq);
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/faq') {
    const faq = buildFaqPageSchema(FAQ_PAGE_ALL_FAQS);
    if (faq) pushSchema(schemas, 'faq', faq);
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/blogs') {
    pushSchema(schemas, 'blog', buildBlogSchema(canonicalUrl));
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/blog-detail' && context.blogPost) {
    pushSchema(schemas, 'blogposting', buildBlogPostingSchema(context.blogPost, canonicalUrl));
    addBreadcrumbs(schemas, seo, [
      { name: 'Home', path: '/' },
      { name: 'Blogs', path: '/blogs' },
      { name: context.blogPost.title, path: seo.canonicalPath },
    ]);
    return schemas;
  }

  if (logicalPathname === '/careers') {
    const { collection, itemList } = buildCareersCollectionSchemas(canonicalUrl, getOpenRoles());
    pushSchema(schemas, 'collection', collection);
    pushSchema(schemas, 'itemlist', itemList);
    const faq = buildFaqPageSchema(CAREERS_FAQS);
    if (faq) pushSchema(schemas, 'faq', faq);
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  if (logicalPathname === '/career-detail' && context.careerRole) {
    pushSchema(schemas, 'job', buildJobPostingSchema(context.careerRole, canonicalUrl));
    addBreadcrumbs(schemas, seo, [
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      { name: context.careerRole.title, path: seo.canonicalPath },
    ]);
    return schemas;
  }

  if (
    logicalPathname === '/privacy-policy' ||
    logicalPathname === '/data-rights-request' ||
    logicalPathname === '/terms-and-conditions' ||
    logicalPathname === '/licenses'
  ) {
    pushSchema(
      schemas,
      'webpage',
      buildWebPageSchema({
        canonicalUrl,
        name: seo.title,
        description: seo.description,
      }),
    );
    addBreadcrumbs(schemas, seo);
    return schemas;
  }

  const pathname = seo.canonicalPath || '';
  if (isEcosystemPath(pathname) || getEcosystemLogicalRoute(pathname)) {
    pushSchema(
      schemas,
      'webpage',
      buildWebPageSchema({
        canonicalUrl,
        name: seo.title,
        description: seo.description,
      }),
    );
    const faqs = getEcosystemFaqsForPath(pathname);
    if (faqs.length) {
      const faqSchema = buildFaqPageSchema(faqs);
      if (faqSchema) pushSchema(schemas, 'faq-ecosystem', faqSchema);
    }
    const crumbs = getEcosystemBreadcrumbs(pathname);
    if (crumbs.length > 1) {
      addBreadcrumbs(schemas, seo, crumbs);
    } else {
      addBreadcrumbs(schemas, seo);
    }
    return schemas;
  }

  addBreadcrumbs(schemas, seo);
  return schemas;
}
