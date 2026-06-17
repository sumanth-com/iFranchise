/**
 * Static page SEO — titles (≤60 chars), descriptions (140–160 chars), keywords, OG.
 */

import { DEFAULT_META_KEYWORDS } from './keywords.js';

/** @typedef {'website' | 'article' | 'profile'} OgType */

/**
 * @typedef {Object} PageSeoEntry
 * @property {string} title
 * @property {string} description
 * @property {string} keywords
 * @property {string} canonicalPath
 * @property {string} [ogTitle]
 * @property {string} [ogDescription]
 * @property {OgType} [ogType]
 * @property {string} [robots]
 */

const K = DEFAULT_META_KEYWORDS;

/** @type {Record<string, PageSeoEntry>} */
export const STATIC_PAGE_SEO = {
  '/': {
    title: 'iFranchise | Franchise Consulting & Opportunities India',
    description:
      'Find verified franchise business opportunities in India. iFranchise offers franchise consulting, investor matching, and brand expansion services for food, retail, and service sectors.',
    keywords: K,
    canonicalPath: '/',
    ogTitle: 'iFranchise | Franchise Growth Platform India',
    ogDescription:
      'Franchise consulting, investment opportunities, and brand expansion support for founders and investors across India.',
    ogType: 'website',
  },
  '/about-us': {
    title: 'About iFranchise | Franchise Development Experts',
    description:
      'iFranchise is a franchise development company helping investors find the right franchise investment and helping brands scale with expansion strategy, documentation, and investor matching in India.',
    keywords: `about ifranchise, franchise development company india, franchise consulting experts, ${K}`,
    canonicalPath: '/about-us',
    ogTitle: 'About iFranchise | Franchise Experts India',
    ogDescription:
      'Franchise growth experts helping brands and investors build scalable, profitable networks across India.',
    ogType: 'website',
  },
  '/team': {
    title: 'Meet the iFranchise Team | Franchise Experts',
    description:
      'Meet the leadership and specialists behind iFranchise — franchise consultants focused on partnerships, expansion, and investor success across India.',
    keywords: `ifranchise team, franchise leadership, ${K}`,
    canonicalPath: '/team',
    ogTitle: 'Meet the iFranchise Team',
    ogDescription: 'The people driving franchise innovation and growth at iFranchise.',
    ogType: 'website',
  },
  '/services': {
    title: 'Franchise Consulting & Expansion Services | iFranchise',
    description:
      'End-to-end franchise consulting for brands and investors: expansion strategy, investor matching, lead generation, franchise documentation, and business growth advisory across India.',
    keywords: `franchise consulting services, franchise expansion services, brand expansion india, franchise development, ${K}`,
    canonicalPath: '/services',
    ogTitle: 'Franchise Consulting Services | iFranchise India',
    ogDescription:
      'Franchise discovery, expansion consulting, investor onboarding, and marketing support for brands scaling in India.',
    ogType: 'website',
  },
  '/franchise-opportunities': {
    title: 'Franchise Business Opportunities in India | iFranchise',
    description:
      'Browse verified franchise investment opportunities in food, retail, wellness, and services. Compare investment range, business model, payback, and expansion cities on iFranchise.',
    keywords: `franchise business opportunities india, franchise investment, retail franchise, startup investment india, ${K}`,
    canonicalPath: '/franchise-opportunities',
    ogTitle: 'Franchise Opportunities India | iFranchise',
    ogDescription:
      'Curated franchise listings with investment bands, FOFO/FICO models, and verified brand details.',
    ogType: 'website',
  },
  '/list-your-brand': {
    title: 'List Your Brand | Franchise Development India',
    description:
      'List your brand on iFranchise — franchise listing platform for franchise development, franchise consulting, franchise investors, franchise lead generation, and brand expansion across India.',
    keywords: `list franchise brand india, franchise development, franchise consulting, franchise expansion, franchise investors, franchise opportunities, brand expansion, franchise partner acquisition, franchise lead generation, franchise growth, franchise listing platform, franchise marketplace, franchise ecosystem, ${K}`,
    canonicalPath: '/list-your-brand',
    ogTitle: 'List Your Brand on iFranchise | Franchise Growth Platform',
    ogDescription:
      'Connect with franchise investors through India\'s franchise marketplace. Franchise development, consulting, and nationwide brand expansion support.',
    ogType: 'website',
  },
  '/blogs': {
    title: 'Franchise Insights Blog | Investment Guides India',
    description:
      'Practical franchise guides for investors and brand owners: evaluating opportunities, FOFO vs FICO models, unit economics, food franchises, and market trends in India.',
    keywords: `franchise blog india, franchise investment guide, food franchise opportunities, ${K}`,
    canonicalPath: '/blogs',
    ogTitle: 'iFranchise Blog',
    ogDescription: 'Expert franchise insights for smarter investment and expansion decisions.',
    ogType: 'website',
  },
  '/careers': {
    title: 'Careers at iFranchise | Join Our Growth Team',
    description:
      "Build India's leading franchise platform with iFranchise. Explore careers in marketing, growth, design, and operations — remote-friendly roles in Bengaluru and India.",
    keywords: `ifranchise careers, franchise jobs india, startup careers bangalore, ${K}`,
    canonicalPath: '/careers',
    ogTitle: 'Careers | iFranchise',
    ogDescription: 'Join the team connecting franchise brands with serious investors across India.',
    ogType: 'website',
  },
  '/contact-us': {
    title: 'Contact iFranchise | Franchise Consultants India',
    description:
      'Connect with franchise experts at iFranchise for investment guidance, brand listing, partnerships, and expansion support. We respond within 24 hours to inquiries across India.',
    keywords: `contact franchise consultants india, franchise consulting company, connect franchise experts, ${K}`,
    canonicalPath: '/contact-us',
    ogTitle: 'Contact iFranchise | Franchise Experts',
    ogDescription:
      'Get expert guidance on franchise investment opportunities and brand expansion across India.',
    ogType: 'website',
  },
  '/faq': {
    title: 'Franchise FAQs | Investment & Business Answers',
    description:
      'Expert answers on franchise investment in India, FOFO FOCO FICO models, profitability, legal documents, launch timelines, brand listing, and how iFranchise helps investors and founders.',
    keywords: `franchise faq india, franchise investment questions, franchise business models, ${K}`,
    canonicalPath: '/faq',
    ogTitle: 'Franchise FAQs | iFranchise India',
    ogDescription:
      'Clear, direct answers for investors, brand owners, and entrepreneurs exploring franchise business in India.',
    ogType: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | iFranchise',
    description:
      'Read how iFranchise collects, uses, stores, and protects personal information when you browse franchise opportunities, submit forms, or contact our team.',
    keywords: 'privacy policy, data protection, ifranchise',
    canonicalPath: '/privacy-policy',
    ogTitle: 'Privacy Policy | iFranchise',
    ogDescription: 'How we handle your data on the iFranchise platform.',
    ogType: 'website',
    robots: 'index, follow',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | iFranchise',
    description:
      'Terms of service for using the iFranchise website, franchise listings, forms, and advisory services. Please review before submitting inquiries or brand applications.',
    keywords: 'terms of service, terms and conditions, ifranchise',
    canonicalPath: '/terms-and-conditions',
    ogTitle: 'Terms of Service | iFranchise',
    ogDescription: 'Platform terms and conditions for users and partners.',
    ogType: 'website',
  },
  '/licenses': {
    title: 'Licenses & Intellectual Property | iFranchise',
    description:
      'Trademark, copyright, and third-party license information for the iFranchise franchise marketplace, content, and brand assets published on this website.',
    keywords: 'licenses, intellectual property, trademarks, ifranchise',
    canonicalPath: '/licenses',
    ogTitle: 'Licenses | iFranchise',
    ogDescription: 'IP and licensing information for iFranchise resources.',
    ogType: 'website',
  },
  '/404': {
    title: 'Page Not Found | iFranchise',
    description:
      "This page could not be found. Return to iFranchise home or browse franchise business opportunities, services, and investment guides across India.",
    keywords: 'page not found, ifranchise',
    canonicalPath: '/404',
    ogTitle: 'Page Not Found | iFranchise',
    ogDescription: 'The requested page does not exist.',
    robots: 'noindex, nofollow',
  },
};
