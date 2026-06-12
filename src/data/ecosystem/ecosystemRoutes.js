/** Central registry for franchise education ecosystem routes. */

export const FRANCHISE_MODEL_PATHS = ['/fofo-model', '/foco-model', '/fico-model'];

export const INVESTMENT_PAGE_PATHS = [
  '/investment-under-25-lakhs',
  '/investment-under-50-lakhs',
  '/investment-under-1-crore',
  '/premium-franchise-opportunities',
  '/high-roi-franchise-opportunities',
];

export const ECOSYSTEM_TOOL_PATHS = ['/franchise-readiness-assessment'];

/** Legacy paths — redirect to Knowledge Hub audiences. */
export const LEGACY_RESOURCE_REDIRECTS = {
  '/investor-guides': '/resources/knowledge-hub/investor',
  '/brand-growth-guides': '/resources/knowledge-hub/brand',
  '/success-stories': '/resources/knowledge-hub',
  '/franchise-roi-calculator': '/resources/knowledge-hub/investor/franchise-roi-guide',
};

export const KNOWLEDGE_HUB_PATH = '/resources/knowledge-hub';
export const KNOWLEDGE_HUB_INVESTOR_PATH = `${KNOWLEDGE_HUB_PATH}/investor`;
export const KNOWLEDGE_HUB_BRAND_PATH = `${KNOWLEDGE_HUB_PATH}/brand`;

const KNOWLEDGE_TOPIC_PREFIX = `${KNOWLEDGE_HUB_PATH}/`;

export function parseKnowledgeHubAudiencePath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length !== 3) return null;
  if (parts[0] !== 'resources' || parts[1] !== 'knowledge-hub') return null;
  if (!['investor', 'brand'].includes(parts[2])) return null;
  return { hub: parts[2] };
}

export function isKnowledgeTopicPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  return (
    parts.length >= 4 &&
    parts[0] === 'resources' &&
    parts[1] === 'knowledge-hub' &&
    ['investor', 'brand'].includes(parts[2]) &&
    Boolean(parts[3])
  );
}

export function parseKnowledgeTopicPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 4) return null;
  if (parts[0] !== 'resources' || parts[1] !== 'knowledge-hub') return null;
  const hub = parts[2];
  const slug = parts[3];
  if (!hub || !slug || !['investor', 'brand'].includes(hub)) return null;
  return { hub, slug };
}

export function getLegacyResourceRedirect(pathname) {
  return LEGACY_RESOURCE_REDIRECTS[pathname] || null;
}

export function getAllEcosystemPaths() {
  return [
    ...FRANCHISE_MODEL_PATHS,
    ...INVESTMENT_PAGE_PATHS,
    ...ECOSYSTEM_TOOL_PATHS,
    KNOWLEDGE_HUB_PATH,
    KNOWLEDGE_HUB_INVESTOR_PATH,
    KNOWLEDGE_HUB_BRAND_PATH,
    ...Object.keys(LEGACY_RESOURCE_REDIRECTS),
  ];
}

export function isEcosystemPath(pathname) {
  return (
    getAllEcosystemPaths().includes(pathname) ||
    isKnowledgeTopicPath(pathname) ||
    parseKnowledgeHubAudiencePath(pathname) !== null
  );
}

export function getEcosystemLogicalRoute(pathname) {
  const legacy = getLegacyResourceRedirect(pathname);
  if (legacy) return '/legacy-resource-redirect';

  if (FRANCHISE_MODEL_PATHS.includes(pathname)) return '/franchise-model';
  if (INVESTMENT_PAGE_PATHS.includes(pathname)) return '/investment-landing';
  if (pathname === '/franchise-readiness-assessment') return '/franchise-readiness-assessment';
  if (pathname === KNOWLEDGE_HUB_PATH) return '/knowledge-hub';
  if (parseKnowledgeHubAudiencePath(pathname)) return '/knowledge-hub-audience';
  if (isKnowledgeTopicPath(pathname)) return '/knowledge-topic';
  return null;
}

export function getLegacyRedirectTarget(pathname) {
  return LEGACY_RESOURCE_REDIRECTS[pathname] || null;
}
