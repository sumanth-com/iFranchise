import { getEcosystemLogicalRoute } from '../../data/ecosystem/ecosystemRoutes';
import FranchiseModelPage from './FranchiseModelPage';
import InvestmentLandingPage from './InvestmentLandingPage';
import KnowledgeHubPage from './KnowledgeHubPage';
import KnowledgeHubAudiencePage from './KnowledgeHubAudiencePage';
import KnowledgeTopicPage from './KnowledgeTopicPage';
import LegacyResourceRedirect from './LegacyResourceRedirect';
import FranchiseReadinessAssessment from './FranchiseReadinessAssessment';

export default function EcosystemRouter() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const logical = getEcosystemLogicalRoute(pathname);

  switch (logical) {
    case '/franchise-model':
      return <FranchiseModelPage />;
    case '/investment-landing':
      return <InvestmentLandingPage />;
    case '/knowledge-hub':
      return <KnowledgeHubPage />;
    case '/knowledge-hub-audience':
      return <KnowledgeHubAudiencePage />;
    case '/knowledge-topic':
      return <KnowledgeTopicPage />;
    case '/legacy-resource-redirect':
      return <LegacyResourceRedirect />;
    case '/franchise-readiness-assessment':
      return <FranchiseReadinessAssessment />;
    default:
      return null;
  }
}
