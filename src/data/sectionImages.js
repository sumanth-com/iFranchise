/** Curated Unsplash photos for marketing sections (Who We Serve, Industries). */
const u = (photoId, w = 1200) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=85`;

export const IMAGE_FALLBACK = u('1560472354-b33ff0c44a43', 800);

export const WHO_WE_SERVE_IMAGES = {
  investors: u('1556761175-b413da4baf72'),
  brands: u('1600880292203-757bb62b4baf'),
};

export const INDUSTRY_UNSPLASH = {
  'Retail & Jewelry': u('1441986300917-64674bd600d8'),
  'Food & Beverage': u('1517248135467-4c7edcad34c4'),
  'Healthcare & Wellness': u('1571019613454-1cb2f99b2d8b'),
  'Education & Training': u('1522202176988-66273c2fd55f'),
  'Logistics & Infrastructure': u('1586528116311-ad8dd3c8310d'),
  'Beauty & Lifestyle': u('1560066988-a4f3a1b1b4b8'),
};

export const HOME_INDUSTRIES = [
  {
    label: 'Retail & Jewelry',
    accent: '#f59e0b',
    desc: 'Growing consumer demand and scalable business models.',
    img: INDUSTRY_UNSPLASH['Retail & Jewelry'],
  },
  {
    label: 'Food & Beverage',
    accent: '#f97316',
    desc: 'Proven concepts with strong customer loyalty and repeat business.',
    img: INDUSTRY_UNSPLASH['Food & Beverage'],
  },
  {
    label: 'Healthcare & Wellness',
    accent: '#10b981',
    desc: 'Rising health consciousness driving sustainable growth.',
    img: INDUSTRY_UNSPLASH['Healthcare & Wellness'],
  },
  {
    label: 'Education & Training',
    accent: '#3b82f6',
    desc: 'Lifelong learning trends creating consistent demand.',
    img: INDUSTRY_UNSPLASH['Education & Training'],
  },
  {
    label: 'Logistics & Infrastructure',
    accent: '#94a3b8',
    desc: 'E-commerce boom fueling supply chain opportunities.',
    img: INDUSTRY_UNSPLASH['Logistics & Infrastructure'],
  },
  {
    label: 'Beauty & Lifestyle',
    accent: '#ec4899',
    desc: 'Premium services with high customer retention rates.',
    img: INDUSTRY_UNSPLASH['Beauty & Lifestyle'],
  },
];

export const SERVICES_INDUSTRIES = [
  {
    label: 'Retail & Jewelry',
    accent: '#f59e0b',
    desc: 'Scale your retail brand with proven franchise models',
    img: INDUSTRY_UNSPLASH['Retail & Jewelry'],
  },
  {
    label: 'Food & Beverage',
    accent: '#f97316',
    desc: 'Expand your F&B concept across multiple locations',
    img: INDUSTRY_UNSPLASH['Food & Beverage'],
  },
  {
    label: 'Healthcare & Wellness',
    accent: '#10b981',
    desc: 'Grow your wellness business with franchise support',
    img: INDUSTRY_UNSPLASH['Healthcare & Wellness'],
  },
  {
    label: 'Education & Training',
    accent: '#3b82f6',
    desc: 'Build an education empire through franchising',
    img: INDUSTRY_UNSPLASH['Education & Training'],
  },
  {
    label: 'Beauty & Lifestyle',
    accent: '#ec4899',
    desc: 'Transform beauty concepts into franchise networks',
    img: INDUSTRY_UNSPLASH['Beauty & Lifestyle'],
  },
  {
    label: 'Logistics & Infrastructure',
    accent: '#94a3b8',
    desc: 'Scale logistics operations with franchise models',
    img: INDUSTRY_UNSPLASH['Logistics & Infrastructure'],
  },
];

export const BRAND_OWNERS_INDUSTRIES = SERVICES_INDUSTRIES;
