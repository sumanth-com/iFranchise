/**
 * Shared FAQ copy for visible on-page FAQs (schema + FAQ page).
 */

/** GEO-friendly: what iFranchise is (for AI retrieval + home schema) */
export const IFRANCHISE_OVERVIEW_FAQS = [
  {
    question: 'What is iFranchise?',
    answer:
      'iFranchise is an India-based franchise consulting and marketplace platform. We help investors discover verified franchise business opportunities and help brands expand through investor matching, franchise development, and growth advisory.',
  },
  {
    question: 'How does iFranchise help franchise investors?',
    answer:
      'Investors can browse verified franchise listings, compare investment range, business model (FOFO, FOCO, FICO), payback, and expansion cities, then enquire directly for franchise consulting support and brand introductions.',
  },
  {
    question: 'How does iFranchise help brand owners?',
    answer:
      'Brands can list on iFranchise to reach qualified investors, generate franchise leads, prepare franchise documentation, and plan multi-city expansion across India with structured onboarding support.',
  },
];

export const SERVICES_FAQS = [
  {
    question: 'What franchise consulting services does iFranchise offer?',
    answer:
      'iFranchise offers franchise opportunity discovery, expansion strategy, investor matching, lead generation, franchise documentation, territory planning, and ongoing growth advisory for brands and investors in India.',
  },
  {
    question: 'Does iFranchise work with first-time franchise investors?',
    answer:
      'Yes. Many partners are first-time operators. iFranchise helps compare models, understand unit economics, and connect with brands that provide structured onboarding, SOPs, and operational support.',
  },
  {
    question: 'Can iFranchise help my brand become franchise-ready?',
    answer:
      'Yes. We support franchise model design, legal documentation, investor materials, lead generation, and post-launch advisory so brands can scale beyond their first few units.',
  },
  {
    question: 'Which industries does iFranchise cover?',
    answer:
      'Food and beverage, retail, fashion, wellness, education, hospitality, and service franchises — with opportunities ranging from low-investment QSR formats to premium retail and hospitality concepts.',
  },
];

export const HOME_FAQS = [
  {
    number: '01',
    question: 'How much does it cost to start a franchise?',
    answer:
      'Franchise investment varies by industry. Low-cost franchises (₹2–10 lakhs), mid-range (₹10–50 lakhs), premium (₹50 lakhs+). FOCO models often require 30–40% less capital than FOFO models.',
  },
  {
    number: '02',
    question: "What's the difference between FOCO, FOFO & COCO?",
    answer:
      'FOCO: You invest, company operates. FOFO: You own and operate. COCO: Company owned and operated. Each offers different risk-reward profiles and involvement levels.',
  },
  {
    number: '03',
    question: 'Is franchise business profitable in India?',
    answer:
      'Successful franchises typically achieve 15–25% net margins after stabilization. F&B shows ~18–30% gross margins, retail 25–40%, services 35–50% depending on brand strength and execution.',
  },
  {
    number: '04',
    question: 'What legal documents are required?',
    answer:
      'Core documents include FDD, Franchise Agreement, Trademark License, Operations Manual, and Territory Rights, along with GST registration, FSSAI license (for F&B), and local permits.',
  },
  {
    number: '05',
    question: 'How long does it take to launch a franchise?',
    answer:
      'Most brands go from agreement to launch in 3–6 months, including due diligence, documentation, site selection, fit-out, training, and soft launch preparation.',
  },
];

export const CONTACT_FAQS = [
  {
    question: 'What is the typical investment range?',
    answer:
      'Most opportunities on our platform start around ₹20L and can go beyond ₹2.5Cr depending on brand category, ticket size, and market depth.',
  },
  {
    question: 'How long does it take to break even?',
    answer:
      'Break-even timelines vary by sector, but many franchise models we work with target 12–24 months with disciplined execution and working capital planning.',
  },
  {
    question: 'Do I need prior business experience?',
    answer:
      'Not necessarily. Many successful partners are first-time operators who rely on structured onboarding, SOPs, and advisory support from the brand and iFranchise.',
  },
  {
    question: 'What support does iFranchise provide?',
    answer:
      'We support brand matching, diligence, financial understanding, launch planning, and ongoing growth guidance after onboarding.',
  },
  {
    question: 'Can I operate multiple franchise units?',
    answer:
      'Yes. Multi-unit expansion is available for many brands after performance milestones and market readiness checks are met.',
  },
];

export const CAREERS_FAQS = [
  {
    question: 'What kind of people do well at iFranchise?',
    answer:
      'Self-driven builders who care about outcomes. If you like ownership, clear communication, and work that connects brands with serious investors, you will fit our culture.',
  },
  {
    question: 'Is remote or hybrid work available?',
    answer:
      'Yes, for many future roles. We focus on quality of work and clear collaboration, not where your desk sits.',
  },
  {
    question: 'When will roles open, and how do I hear about them?',
    answer:
      'We are preparing our next hiring wave across strategy, product, growth, and operations. Follow us on LinkedIn for announcements, or email hr@ifranchise.in if you want to introduce yourself early.',
  },
  {
    question: 'Can I reach out before a role is posted?',
    answer:
      'Yes. Send a short note and your background to hr@ifranchise.in. We review thoughtful introductions as we plan upcoming hires.',
  },
  {
    question: 'What does growth look like here?',
    answer:
      'We are a growing company, so responsibilities evolve quickly. We promote from within where it makes sense and invest in people who want to build with us long term.',
  },
];

export const LIST_YOUR_BRAND_FAQS = [
  {
    question: 'What types of brands can list on iFranchise?',
    answer:
      'Brands with a proven model and at least one operational unit – across F&B, wellness, education, retail, tech, and more.',
  },
  {
    question: 'How long does it take to become franchise-ready?',
    answer:
      'Most brands are franchise-ready within ~30 days including model design, legal documents, SOPs, and investor materials.',
  },
  {
    question: 'How does investor matching work?',
    answer:
      'We match your opportunity to 1,800+ pre-screened investors filtered by sector, ticket size, geography, and intent.',
  },
  {
    question: 'What franchise models do you support?',
    answer:
      'We support FOFO, FOCO, and FICO models and help you choose based on operations complexity, capital requirements, and investor profile.',
  },
  {
    question: 'Is there support after launch?',
    answer:
      'Yes – 90-day post-launch support plus ongoing advisory for multi-city expansion and performance tracking.',
  },
];

/** All FAQs visible on /faq */
export const FAQ_PAGE_ALL_FAQS = [
  ...IFRANCHISE_OVERVIEW_FAQS,
  ...HOME_FAQS,
  ...SERVICES_FAQS,
  ...CONTACT_FAQS,
  ...LIST_YOUR_BRAND_FAQS,
  ...CAREERS_FAQS,
];
