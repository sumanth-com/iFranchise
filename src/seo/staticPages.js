/**
 * Static page SEO — titles, descriptions, keywords, and OG copy per route.
 * Canonical paths use preferred URLs (aliases redirect in navigation only).
 */

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

/** @type {Record<string, PageSeoEntry>} */
export const STATIC_PAGE_SEO = {
  '/': {
    title: "iFranchise — India's Trusted Franchise Growth Platform",
    description:
      "Discover verified franchise opportunities, connect with investors, and scale your brand across India with iFranchise's end-to-end franchise growth platform.",
    keywords:
      'franchise India, franchise opportunities, franchise investment, list your brand, franchise expansion',
    canonicalPath: '/',
    ogTitle: 'iFranchise — Franchise Growth Platform for India',
    ogDescription:
      "Build, invest, or expand with India's trusted franchise marketplace and growth partner.",
    ogType: 'website',
  },
  '/about': {
    title: 'About iFranchise — Mission, Vision & Franchise Expertise',
    description:
      'Learn how iFranchise helps investors, entrepreneurs, and brand owners navigate franchise discovery, expansion, and growth across India.',
    keywords: 'about iFranchise, franchise company India, franchise platform',
    canonicalPath: '/about',
    ogTitle: 'About iFranchise',
    ogDescription: 'Our mission is to make franchise growth accessible, data-driven, and scalable.',
    ogType: 'website',
  },
  '/team': {
    title: 'Meet the Team — iFranchise Leadership',
    description:
      'Meet the iFranchise team driving franchise innovation, partnerships, and growth across India.',
    keywords: 'iFranchise team, franchise leadership',
    canonicalPath: '/team',
    ogTitle: 'Meet the iFranchise Team',
    ogDescription: "The people behind India's franchise growth platform.",
    ogType: 'website',
  },
  '/services': {
    title: 'Franchise Services — Discovery, Expansion & Lead Generation | iFranchise',
    description:
      'Franchise discovery, expansion consulting, investor matching, market research, and lead generation services for brands and investors.',
    keywords: 'franchise services, franchise consulting, lead generation, investor matching',
    canonicalPath: '/services',
    ogTitle: 'iFranchise Services',
    ogDescription: 'End-to-end franchise growth services for brands and investors.',
    ogType: 'website',
  },
  '/franchise-opportunities': {
    title: 'Browse Franchise Opportunities in India | iFranchise',
    description:
      'Explore verified franchise opportunities across food, wellness, education, retail, and more. Compare investment, ROI, and expansion markets.',
    keywords: 'franchise opportunities India, buy franchise, franchise investment',
    canonicalPath: '/franchise-opportunities',
    ogTitle: 'Franchise Opportunities — iFranchise',
    ogDescription: 'Find your next franchise investment with curated, verified opportunities.',
    ogType: 'website',
  },
  '/list-your-brand': {
    title: 'List Your Brand — Franchise Expansion & Lead Generation | iFranchise',
    description:
      'Scale your franchise brand across India. List on iFranchise for investor matching, lead generation, and nationwide expansion support.',
    keywords: 'list franchise brand, franchise expansion India, franchise lead generation',
    canonicalPath: '/list-your-brand',
    ogTitle: 'List Your Brand on iFranchise',
    ogDescription: 'Connect with qualified franchise investors and grow your brand.',
    ogType: 'website',
  },
  '/blog': {
    title: 'Franchise & Investment Insights — iFranchise Blog',
    description:
      'Expert guides on franchise investment, product growth, market trends, and industry reports for entrepreneurs and investors.',
    keywords: 'franchise blog, investment guides, franchise news India, franchise resources',
    canonicalPath: '/blog',
    ogTitle: 'iFranchise Blog',
    ogDescription: 'Insights for franchise investors and brand owners.',
    ogType: 'website',
  },
  '/careers': {
    title: 'Careers at iFranchise — Join Our Growth Team',
    description:
      "Open roles in design, growth, marketing, and sales. Build India's leading franchise platform with iFranchise.",
    keywords: 'iFranchise careers, franchise jobs Bangalore, startup jobs India',
    canonicalPath: '/careers',
    ogTitle: 'Careers — iFranchise',
    ogDescription: "We're hiring. Explore open roles and join our team.",
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact iFranchise — Talk to Our Franchise Experts',
    description:
      'Get in touch with iFranchise for franchise investment, brand listing, partnerships, and support. We respond within 24 hours.',
    keywords: 'contact iFranchise, franchise inquiry, franchise consultation',
    canonicalPath: '/contact',
    ogTitle: 'Contact iFranchise',
    ogDescription: 'Speak with our franchise growth team today.',
    ogType: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | iFranchise',
    description: 'How iFranchise collects, uses, and protects your personal information.',
    keywords: 'privacy policy, data protection',
    canonicalPath: '/privacy-policy',
    ogTitle: 'Privacy Policy — iFranchise',
    ogDescription: 'Your privacy matters. Read our policy.',
    ogType: 'website',
    robots: 'index, follow',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | iFranchise',
    description: 'Terms of service for using the iFranchise platform and services.',
    keywords: 'terms of service, terms and conditions',
    canonicalPath: '/terms-and-conditions',
    ogTitle: 'Terms of Service — iFranchise',
    ogDescription: 'Platform terms and conditions.',
    ogType: 'website',
  },
  '/licenses': {
    title: 'Licenses & Intellectual Property | iFranchise',
    description:
      'Trademark, copyright, and third-party license information for the iFranchise marketplace.',
    keywords: 'licenses, intellectual property, trademarks, franchise resources',
    canonicalPath: '/licenses',
    ogTitle: 'Licenses — iFranchise',
    ogDescription: 'IP and licensing information.',
    ogType: 'website',
  },
  '/404': {
    title: 'Page Not Found | iFranchise',
    description:
      "The page you're looking for doesn't exist. Return to iFranchise home or browse franchise opportunities.",
    keywords: 'page not found, iFranchise',
    canonicalPath: '/404',
    ogTitle: 'Page Not Found — iFranchise',
    ogDescription: 'This page could not be found.',
    robots: 'noindex, nofollow',
  },
};
