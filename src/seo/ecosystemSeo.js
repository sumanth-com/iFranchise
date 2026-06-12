import { DEFAULT_META_KEYWORDS } from './keywords.js';
import { formatDescription, formatTitle, normalizeSeoEntry } from './metaUtils.js';
import { getFranchiseModelByPath } from '../data/ecosystem/franchiseModelsContent.js';
import { getInvestmentPageByPath } from '../data/ecosystem/investmentPages.js';
import { parseKnowledgeHubAudiencePath, parseKnowledgeTopicPath } from '../data/ecosystem/ecosystemRoutes.js';
import { getTopicByHubAndSlug } from '../data/ecosystem/knowledgeHub.js';
import { MODEL_FAQS } from '../data/ecosystem/franchiseModelsContent.js';
import { INVESTMENT_PAGES } from '../data/ecosystem/investmentPages.js';

const K = DEFAULT_META_KEYWORDS;

/** @type {Record<string, import('./staticPages.js').PageSeoEntry>} */
export const ECOSYSTEM_PAGE_SEO = {
  '/fofo-model': {
    title: 'FOFO Franchise Model Explained | Franchise Owned & Operated',
    description:
      'Learn the FOFO (Franchise Owned, Franchise Operated) model in India — how it works, benefits, ideal investor profile, investment range, and comparison with FOCO and FICO.',
    keywords: `FOFO franchise model, franchise owned operated india, hands-on franchise investment, ${K}`,
    canonicalPath: '/fofo-model',
    ogTitle: 'FOFO Franchise Model Guide | iFranchise India',
    ogDescription: 'Complete guide to Franchise Owned, Franchise Operated — benefits, challenges, and investor fit.',
    ogType: 'website',
  },
  '/foco-model': {
    title: 'FOCO Franchise Model Guide | Company Operated India',
    description:
      'Understand FOCO (Franchise Owned, Company Operated) in India — semi-passive franchise investment, how returns work, advantages, and who should choose this model.',
    keywords: `FOCO franchise model, semi-passive franchise india, franchise owned company operated, ${K}`,
    canonicalPath: '/foco-model',
    ogTitle: 'FOCO Franchise Model | iFranchise',
    ogDescription: 'Franchise Owned, Company Operated — ideal for passive investors seeking brand-backed returns.',
    ogType: 'website',
  },
  '/fico-model': {
    title: 'FICO Franchise Model | Franchise Invested Company Operated',
    description:
      'Explore FICO (Franchise Invested, Company Operated) in India — structured franchise returns, zero operational involvement, risks, and investment considerations.',
    keywords: `FICO franchise model, franchise investment india, passive franchise returns, ${K}`,
    canonicalPath: '/fico-model',
    ogTitle: 'FICO Franchise Model Guide | iFranchise',
    ogDescription: 'Invest capital while the company operates — structured franchise investment explained.',
    ogType: 'website',
  },
  '/investment-under-25-lakhs': {
    title: 'Franchise Under ₹25 Lakhs India | Investment Opportunities',
    description:
      'Browse franchise opportunities under ₹25 lakhs in India. Compare FOFO, FOCO, and FICO brands, investment bands, payback, and verified listings on iFranchise.',
    keywords: `franchise under 25 lakhs, low investment franchise india, franchise 10 lakh, ${K}`,
    canonicalPath: '/investment-under-25-lakhs',
    ogTitle: 'Franchise Investment Under ₹25L | iFranchise',
    ogDescription: 'Verified franchise opportunities from ₹10L to ₹25L across India.',
    ogType: 'website',
  },
  '/investment-under-50-lakhs': {
    title: 'Franchise Investment ₹25L–₹50L | Opportunities India',
    description:
      'Discover franchise brands between ₹25 lakhs and ₹50 lakhs in India. Growth-ready formats, model comparison, FAQs, and curated iFranchise listings.',
    keywords: `franchise 25 to 50 lakhs, mid investment franchise india, ${K}`,
    canonicalPath: '/investment-under-50-lakhs',
    ogTitle: 'Franchise ₹25L–₹50L | iFranchise',
    ogDescription: 'Growth-ready franchise opportunities in the ₹25L to ₹50L investment band.',
    ogType: 'website',
  },
  '/investment-under-1-crore': {
    title: 'Franchise Investment ₹50L–₹1 Crore India',
    description:
      'Premium mid-scale franchise opportunities from ₹50 lakhs to ₹1 crore in India. Flagship formats, multi-unit potential, and verified brand listings.',
    keywords: `franchise under 1 crore, franchise 50 lakhs india, ${K}`,
    canonicalPath: '/investment-under-1-crore',
    ogTitle: 'Franchise ₹50L–₹1Cr | iFranchise',
    ogDescription: 'Mid-scale franchise investment opportunities up to ₹1 crore.',
    ogType: 'website',
  },
  '/premium-franchise-opportunities': {
    title: 'Premium Franchise Opportunities ₹1 Crore+ India',
    description:
      'High-investment premium franchise opportunities above ₹1 crore in India — master franchises, flagship outlets, and strategic brand partnerships.',
    keywords: `premium franchise india, franchise above 1 crore, master franchise india, ${K}`,
    canonicalPath: '/premium-franchise-opportunities',
    ogTitle: 'Premium Franchises ₹1Cr+ | iFranchise',
    ogDescription: 'Premium and master franchise opportunities for serious investors.',
    ogType: 'website',
  },
  '/high-roi-franchise-opportunities': {
    title: 'High ROI Franchise Opportunities India | iFranchise',
    description:
      'Curated high-ROI franchise brands in India. Compare returns, payback periods, and unit economics. Use our ROI calculator and connect with advisors.',
    keywords: `high roi franchise india, best franchise returns, profitable franchise india, ${K}`,
    canonicalPath: '/high-roi-franchise-opportunities',
    ogTitle: 'High ROI Franchises | iFranchise',
    ogDescription: 'Franchise brands with strong return profiles across India.',
    ogType: 'website',
  },
  '/franchise-readiness-assessment': {
    title: 'Franchise Readiness Assessment | Investor & Brand',
    description:
      'Free iFranchise Readiness Assessment for investors and brand owners in India. Score preparedness from 0–100 and get personalised franchise recommendations.',
    keywords: `franchise readiness assessment, investor readiness franchise, brand franchise ready, ${K}`,
    canonicalPath: '/franchise-readiness-assessment',
    ogTitle: 'Franchise Readiness Assessment | iFranchise',
    ogDescription: 'Separate investor and brand readiness assessments with personalised recommendations.',
    ogType: 'website',
  },
  '/resources/knowledge-hub': {
    title: 'Franchise Knowledge Hub | Intelligence Platform',
    description:
      'iFranchise Knowledge Hub — franchise intelligence for investors allocating ₹25L–₹1Cr+ and brand owners scaling across India. Due diligence, ROI, expansion, and readiness guides.',
    keywords: `franchise knowledge hub, franchise intelligence india, franchise education, ${K}`,
    canonicalPath: '/resources/knowledge-hub',
    ogTitle: 'Knowledge Hub | iFranchise',
    ogDescription: 'Franchise intelligence for investors and brand owners across India.',
    ogType: 'website',
  },
  '/resources/knowledge-hub/investor': {
    title: 'Investor Knowledge Hub | Franchise Intelligence India',
    description:
      'Decision-grade franchise guides for Indian investors — ROI, due diligence, agreements, risk assessment, high-growth categories, and multi-unit strategy.',
    keywords: `franchise investor guide india, franchise due diligence, franchise roi india, ${K}`,
    canonicalPath: '/resources/knowledge-hub/investor',
    ogTitle: 'Investor Knowledge Hub | iFranchise',
    ogDescription: 'Franchise intelligence built for investors evaluating opportunities in India.',
    ogType: 'website',
  },
  '/resources/knowledge-hub/brand': {
    title: 'Brand Owner Knowledge Hub | Franchise Expansion India',
    description:
      'Franchise expansion intelligence for Indian brand owners — readiness, operations manuals, territory planning, recruitment, unit economics, and national scaling.',
    keywords: `how to franchise your business india, franchise expansion guide, brand scaling india, ${K}`,
    canonicalPath: '/resources/knowledge-hub/brand',
    ogTitle: 'Brand Owner Knowledge Hub | iFranchise',
    ogDescription: 'Franchise expansion frameworks for founders scaling across India.',
    ogType: 'website',
  },
};

export function resolveEcosystemSeo(pathname, logicalPathname) {
  if (ECOSYSTEM_PAGE_SEO[pathname]) {
    return normalizeSeoEntry({ ...ECOSYSTEM_PAGE_SEO[pathname], canonicalPath: pathname });
  }

  const topicParsed = parseKnowledgeTopicPath(pathname);
  if (topicParsed) {
    const topic = getTopicByHubAndSlug(topicParsed.hub, topicParsed.slug);
    if (topic) {
      const hubLabel = topicParsed.hub === 'investor' ? 'Investor Guide' : 'Brand Guide';
      return normalizeSeoEntry({
        title: formatTitle(`${topic.title} | ${hubLabel} | iFranchise`),
        description: formatDescription(topic.excerpt),
        keywords: `${topic.title}, franchise guide india, ${K}`,
        canonicalPath: pathname,
        ogTitle: topic.title,
        ogDescription: formatDescription(topic.excerpt),
        ogType: 'website',
      });
    }
  }

  if (logicalPathname === '/franchise-model') {
    const model = getFranchiseModelByPath(pathname);
    if (model && ECOSYSTEM_PAGE_SEO[model.path]) {
      return normalizeSeoEntry({ ...ECOSYSTEM_PAGE_SEO[model.path], canonicalPath: pathname });
    }
  }

  if (logicalPathname === '/investment-landing') {
    const page = getInvestmentPageByPath(pathname);
    if (page && ECOSYSTEM_PAGE_SEO[page.path]) {
      return normalizeSeoEntry({ ...ECOSYSTEM_PAGE_SEO[page.path], canonicalPath: pathname });
    }
  }

  return null;
}

export function getEcosystemFaqsForPath(pathname) {
  const key = pathname.replace(/^\//, '');
  if (MODEL_FAQS[key]) return MODEL_FAQS[key];
  const inv = INVESTMENT_PAGES[pathname];
  if (inv?.faqs) return inv.faqs;
  const topic = parseKnowledgeTopicPath(pathname);
  if (topic) {
    const t = getTopicByHubAndSlug(topic.hub, topic.slug);
    if (t?.faqs?.length) return t.faqs;
    if (t) {
      return [{ question: `What is ${t.title}?`, answer: t.geoAnswer }];
    }
  }
  return [];
}

export function getEcosystemBreadcrumbs(pathname) {
  const crumbs = [{ name: 'Home', path: '/' }];
  if (pathname.includes('/resources/knowledge-hub/')) {
    const topic = parseKnowledgeTopicPath(pathname);
    const audience = parseKnowledgeHubAudiencePath(pathname);
    crumbs.push({ name: 'Knowledge Hub', path: '/resources/knowledge-hub' });
    if (audience) {
      crumbs.push({
        name: audience.hub === 'investor' ? 'Investor Hub' : 'Brand Owner Hub',
        path: pathname,
      });
    } else if (topic) {
      crumbs.push({
        name: topic.hub === 'investor' ? 'Investor Hub' : 'Brand Owner Hub',
        path: `/resources/knowledge-hub/${topic.hub}`,
      });
      const t = getTopicByHubAndSlug(topic.hub, topic.slug);
      if (t) crumbs.push({ name: t.title, path: pathname });
    }
    return crumbs;
  }
  const labels = {
    '/resources/knowledge-hub': 'Knowledge Hub',
    '/franchise-readiness-assessment': 'Readiness Assessment',
    '/fofo-model': 'FOFO Model',
    '/foco-model': 'FOCO Model',
    '/fico-model': 'FICO Model',
    '/investment-under-25-lakhs': 'Under ₹25 Lakhs',
    '/investment-under-50-lakhs': '₹25L–₹50L',
    '/investment-under-1-crore': '₹50L–₹1Cr',
    '/premium-franchise-opportunities': 'Premium Franchises',
    '/high-roi-franchise-opportunities': 'High ROI Franchises',
  };
  if (labels[pathname]) {
    crumbs.push({ name: labels[pathname], path: pathname });
  }
  return crumbs;
}
