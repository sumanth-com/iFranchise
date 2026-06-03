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
      'Discover verified franchise business opportunities in India. iFranchise connects investors and brands with franchise consulting, expansion services, and growth advisory.',
    keywords: K,
    canonicalPath: '/',
    ogTitle: 'iFranchise | Franchise Growth Platform India',
    ogDescription:
      'Franchise consulting, investment opportunities, and brand expansion support for founders and investors across India.',
    ogType: 'website',
  },
  '/about-us': {
    title: 'About iFranchise | Franchise Development Company',
    description:
      'Learn how iFranchise supports franchise advisory services, expansion strategy, and investor matching for food, retail, and service brands scaling across India.',
    keywords: `about ifranchise, franchise development company, ${K}`,
    canonicalPath: '/about-us',
    ogTitle: 'About iFranchise',
    ogDescription: 'Franchise growth experts helping brands and investors build scalable networks in India.',
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
    title: 'Franchise Expansion & Advisory Services | iFranchise',
    description:
      'Franchise consulting, investor matching, lead generation, documentation, and brand expansion services. End-to-end franchise growth support for brands and investors in India.',
    keywords: `franchise expansion services, franchise advisory services, franchise consultants, ${K}`,
    canonicalPath: '/services',
    ogTitle: 'Franchise Services | iFranchise',
    ogDescription: 'Discovery, expansion consulting, investor onboarding, and franchise marketing support.',
    ogType: 'website',
  },
  '/franchise-opportunities': {
    title: 'Franchise Business Opportunities in India | iFranchise',
    description:
      'Browse verified franchise investment opportunities across food, retail, wellness, and services. Compare investment, ROI, payback, and expansion markets on iFranchise.',
    keywords: `franchise business opportunities india, franchise investment opportunities, best franchise opportunities, ${K}`,
    canonicalPath: '/franchise-opportunities',
    ogTitle: 'Franchise Opportunities India | iFranchise',
    ogDescription: 'Curated franchise listings with investment bands, models, and brand details.',
    ogType: 'website',
  },
  '/list-your-brand': {
    title: 'List Your Brand | Franchise Growth & Investors',
    description:
      'Scale your franchise across India. List on iFranchise for investor matching, franchise marketing, lead generation, and structured expansion support for growing brands.',
    keywords: `list franchise brand, franchise marketing, investor franchise network, ${K}`,
    canonicalPath: '/list-your-brand',
    ogTitle: 'List Your Brand on iFranchise',
    ogDescription: 'Reach qualified franchise investors and accelerate nationwide expansion.',
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
      'Speak with iFranchise franchise consultants about investment, brand listing, partnerships, and support. We respond within 24 hours for inquiries across India.',
    keywords: `contact franchise consultants, franchise consulting company india, ${K}`,
    canonicalPath: '/contact-us',
    ogTitle: 'Contact iFranchise',
    ogDescription: 'Get expert guidance on franchise opportunities and brand expansion.',
    ogType: 'website',
  },
  '/faq': {
    title: 'Franchise FAQs | Investment & Expansion Answers',
    description:
      'Answers on franchise investment, FOFO and FICO models, profitability, legal documents, launch timelines, brand listing, and careers at iFranchise — for investors and founders.',
    keywords: `franchise faq, franchise investment faq, franchise expansion faq, ${K}`,
    canonicalPath: '/faq',
    ogTitle: 'Franchise FAQs | iFranchise',
    ogDescription: 'Clear answers for investors, brand owners, and future team members.',
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
