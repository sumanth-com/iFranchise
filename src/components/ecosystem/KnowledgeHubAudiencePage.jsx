import { parseKnowledgeHubAudiencePath } from '../../data/ecosystem/ecosystemRoutes';
import { INVESTOR_TOPICS, BRAND_TOPICS } from '../../data/ecosystem/knowledgeHub';
import { getHubConfig } from '../../data/ecosystem/hubAudienceConfig';
import PremiumHubLayout from './PremiumHubLayout';

export default function KnowledgeHubAudiencePage() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const parsed = parseKnowledgeHubAudiencePath(pathname);
  if (!parsed) return null;

  const config = getHubConfig(parsed.hub);
  const topics = parsed.hub === 'brand' ? BRAND_TOPICS : INVESTOR_TOPICS;

  return <PremiumHubLayout hub={parsed.hub} config={config} topics={topics} />;
}
