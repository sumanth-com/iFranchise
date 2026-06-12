/** Premium Knowledge Hub audience landing page configuration. */

export const INVESTOR_HUB = {
  centerLabel: 'Investor Intelligence Center',
  title: 'Make franchise investment decisions with institutional-grade clarity',
  subtitle:
    'Structured intelligence for investors allocating ₹25L–₹1Cr+ — models, ROI frameworks, due diligence, and risk assessment across India.',
  geoAnswer:
    'The iFranchise Investor Intelligence Center helps Indian investors evaluate FOFO, FOCO, and FICO models, capital requirements, industry growth, franchise risk, and expected returns before investing.',
  stats: [
    { value: '₹2.5L Cr+', label: 'Indian franchise market scale' },
    { value: '35%', label: 'Avg. F&B franchise YoY growth' },
    { value: '18–32%', label: 'Typical ROI band (category-dependent)' },
    { value: '14–24 mo', label: 'Common payback range' },
  ],
  quickNav: [
    { id: 'models', label: 'Investment Models', icon: 'layers' },
    { id: 'roi', label: 'ROI Analysis', icon: 'chart' },
    { id: 'diligence', label: 'Due Diligence', icon: 'check' },
    { id: 'legal', label: 'Legal Framework', icon: 'scale' },
    { id: 'trends', label: 'Industry Trends', icon: 'trend' },
    { id: 'risk', label: 'Risk Assessment', icon: 'shield' },
  ],
  featured: [
    { title: 'FOFO Model Guide', excerpt: 'Own and operate with full control.', path: '/fofo-model', tag: 'models', badge: 'Model' },
    { title: 'FOCO Model Guide', excerpt: 'Own while the company operates.', path: '/foco-model', tag: 'models', badge: 'Model' },
    { title: 'FICO Model Guide', excerpt: 'Capital-only structured returns.', path: '/fico-model', tag: 'models', badge: 'Model' },
    { title: 'Multi-Unit Franchising', excerpt: 'Scale from one unit to a portfolio.', path: '/resources/knowledge-hub/investor/multi-unit-franchise-strategy', tag: 'roi', badge: 'Strategy' },
    { title: 'Franchise Due Diligence', excerpt: 'Checklist before you sign.', path: '/resources/knowledge-hub/investor/due-diligence-checklist', tag: 'diligence', badge: 'Framework' },
    { title: 'Franchise ROI Framework', excerpt: 'Model returns realistically.', path: '/resources/knowledge-hub/investor/franchise-roi-guide', tag: 'roi', badge: 'Analysis' },
  ],
  navTopicMap: {
    models: ['how-to-choose-the-right-franchise'],
    roi: ['franchise-roi-guide', 'multi-unit-franchise-strategy'],
    diligence: ['due-diligence-checklist', 'how-to-choose-the-right-franchise'],
    legal: ['franchise-agreement-basics'],
    trends: ['emerging-franchise-categories'],
    risk: ['franchise-investment-risks', 'common-investor-mistakes'],
  },
  investmentFilters: [
    { id: 'all', label: 'All bands' },
    { id: 'under-25', label: 'Under ₹25L', path: '/investment-under-25-lakhs' },
    { id: '25-50', label: '₹25L–₹50L', path: '/investment-under-50-lakhs' },
    { id: '50-100', label: '₹50L–₹1Cr', path: '/investment-under-1-crore' },
    { id: 'premium', label: '₹1Cr+', path: '/premium-franchise-opportunities' },
  ],
  industryFilters: [
    { id: 'all', label: 'All sectors' },
    { id: 'fnb', label: 'Food & Beverage' },
    { id: 'retail', label: 'Retail' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'education', label: 'Education' },
  ],
  topicIndustryTags: {
    'how-to-choose-the-right-franchise': ['fnb', 'retail', 'wellness'],
    'franchise-roi-guide': ['fnb', 'retail'],
    'due-diligence-checklist': ['fnb', 'retail', 'wellness', 'education'],
    'franchise-agreement-basics': ['fnb', 'retail'],
    'emerging-franchise-categories': ['fnb', 'wellness', 'education'],
    'multi-unit-franchise-strategy': ['fnb', 'retail'],
    'common-investor-mistakes': ['fnb', 'retail'],
    'franchise-investment-risks': ['fnb', 'retail', 'wellness'],
  },
  trustInsights: [
    { title: 'F&B leads franchise inquiry volume', body: 'QSR and specialty formats dominate investor searches across tier 1 and tier 2 cities.' },
    { title: 'FOCO adoption is rising', body: 'Semi-passive investors increasingly prefer company-operated models for scalability.' },
    { title: 'Due diligence reduces failure risk', body: 'Investors who validate unit economics with franchisees report stronger outcomes.' },
  ],
  expertNote: 'iFranchise advisors recommend matching model structure to involvement capacity before comparing brands.',
  primaryCta: { label: 'Explore Franchise Opportunities', path: '/franchise-opportunities' },
  secondaryCta: { label: 'Schedule Investment Consultation', path: '/contact-us' },
  assessmentPath: '/franchise-readiness-assessment?audience=investor',
};

export const BRAND_HUB = {
  centerLabel: 'Franchise Expansion Center',
  title: 'Build a franchise engine that scales without losing brand quality',
  subtitle:
    'Expansion intelligence for founders — readiness, operations systems, recruitment, territory strategy, and national rollout across India.',
  geoAnswer:
    'The iFranchise Franchise Expansion Center guides Indian brand owners on franchise readiness, SOP development, franchisee recruitment, unit economics, and scaling nationally.',
  stats: [
    { value: '3–5×', label: 'Faster geographic reach vs owned stores' },
    { value: '40%', label: 'Lower capex per outlet (franchise model)' },
    { value: '6–12 mo', label: 'Typical franchise sales cycle' },
    { value: '15–25%', label: 'Royalty revenue band (category avg.)' },
  ],
  quickNav: [
    { id: 'readiness', label: 'Readiness', icon: 'target' },
    { id: 'operations', label: 'Operations', icon: 'cog' },
    { id: 'recruitment', label: 'Recruitment', icon: 'users' },
    { id: 'expansion', label: 'Expansion Strategy', icon: 'map' },
    { id: 'economics', label: 'Unit Economics', icon: 'calculator' },
    { id: 'territory', label: 'Territory Planning', icon: 'pin' },
  ],
  featured: [
    { title: 'Franchise Readiness Blueprint', excerpt: 'Is your business franchise-ready?', path: '/resources/knowledge-hub/brand/how-to-franchise-your-business', tag: 'readiness', badge: 'Blueprint' },
    { title: 'Operations Manual Guide', excerpt: 'Standardise execution at scale.', path: '/resources/knowledge-hub/brand/operations-manual-guide', tag: 'operations', badge: 'Systems' },
    { title: 'Territory Expansion Strategy', excerpt: 'Design territories that protect ROI.', path: '/resources/knowledge-hub/brand/territory-planning', tag: 'territory', badge: 'Strategy' },
    { title: 'Franchise Recruitment Framework', excerpt: 'Attract qualified franchise partners.', path: '/resources/knowledge-hub/brand/franchise-recruitment', tag: 'recruitment', badge: 'Framework' },
    { title: 'Franchise Sales Funnel', excerpt: 'Convert leads to signed franchisees.', path: '/resources/knowledge-hub/brand/franchise-sales-process', tag: 'recruitment', badge: 'Sales' },
    { title: 'Scaling Across India', excerpt: 'National rollout playbook.', path: '/resources/knowledge-hub/brand/scaling-through-franchising', tag: 'expansion', badge: 'Scale' },
  ],
  navTopicMap: {
    readiness: ['how-to-franchise-your-business'],
    operations: ['operations-manual-guide'],
    recruitment: ['franchise-recruitment', 'franchise-sales-process'],
    expansion: ['franchise-expansion-strategy', 'scaling-through-franchising'],
    economics: ['unit-economics'],
    territory: ['territory-planning'],
  },
  growthStages: [
    { id: 'all', label: 'All stages' },
    { id: 'concept', label: 'Concept stage' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'scaling', label: 'Scaling' },
    { id: 'national', label: 'National rollout' },
  ],
  topicStageTags: {
    'how-to-franchise-your-business': ['concept', 'preparing'],
    'franchise-expansion-strategy': ['preparing', 'scaling', 'national'],
    'operations-manual-guide': ['preparing', 'scaling'],
    'territory-planning': ['scaling', 'national'],
    'franchise-recruitment': ['scaling', 'national'],
    'unit-economics': ['preparing', 'scaling'],
    'scaling-through-franchising': ['scaling', 'national'],
    'franchise-sales-process': ['scaling', 'national'],
  },
  roadmap: [
    { stage: 'Foundation', items: ['Prove unit economics', 'Document core SOPs', 'Validate brand consistency'] },
    { stage: 'Structure', items: ['Legal franchise framework', 'Territory design', 'Unit economics model'] },
    { stage: 'Scale', items: ['Recruitment funnel', 'Field support team', 'Phased city rollout'] },
  ],
  trustInsights: [
    { title: 'Documentation is the #1 scaling bottleneck', body: 'Brands that franchise before SOP maturity face higher franchisee churn.' },
    { title: 'Recruitment quality beats lead volume', body: 'Structured qualification improves unit success rates significantly.' },
    { title: 'Phased rollout preserves brand equity', body: 'National brands win on systems repeatability, not outlet count alone.' },
  ],
  expertNote: 'Franchising works when unit economics are proven and replicable — not when growth pressure outpaces systems.',
  primaryCta: { label: 'Book Franchise Strategy Call', path: '/list-your-brand' },
  secondaryCta: { label: 'Get Expansion Consultation', path: '/contact-us' },
  assessmentPath: '/franchise-readiness-assessment?audience=brand',
};

export function getHubConfig(hub) {
  return hub === 'brand' ? BRAND_HUB : INVESTOR_HUB;
}
