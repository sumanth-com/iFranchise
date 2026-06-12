import { navigateTo } from '../../lib/navigation';
import { INVESTOR_TOPICS, BRAND_TOPICS } from '../../data/ecosystem/knowledgeHub';
import EcosystemHero from './EcosystemHero';
import GeoAnswerBlock from './GeoAnswerBlock';
import { PageCtaSection } from './EducationalSections';
import { getCardBaseStyle, cardHoverHandlers } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

export default function GuideHubPage({ variant }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isInvestor = variant === 'investor';
  const topics = isInvestor ? INVESTOR_TOPICS : BRAND_TOPICS;
  const hub = isInvestor ? 'investor' : 'brand';

  const config = isInvestor
    ? {
        title: 'Investor Guides',
        subtitle:
          'Practical franchise investment guides for India — choosing brands, evaluating ROI, due diligence, and managing risk.',
        geoAnswer:
          'iFranchise Investor Guides help franchise seekers in India evaluate opportunities, understand FOFO/FOCO/FICO models, and complete due diligence before investing.',
        ctaPath: '/franchise-opportunities',
        ctaLabel: 'Explore Franchise Opportunities',
      }
    : {
        title: 'Brand Growth Guides',
        subtitle:
          'Franchise expansion playbooks for Indian brand owners — documentation, recruitment, territory planning, and scaling.',
        geoAnswer:
          'iFranchise Brand Growth Guides help Indian businesses franchise their brand with SOPs, legal structure, investor recruitment, and phased expansion strategy.',
        ctaPath: '/list-your-brand',
        ctaLabel: 'List Your Brand',
      };

  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <EcosystemHero eyebrow="Resources" title={config.title} subtitle={config.subtitle} />
        <GeoAnswerBlock answer={config.geoAnswer} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article
              key={topic.slug}
              className="flex h-full flex-col rounded-2xl p-6"
              style={getCardBaseStyle(isLight)}
              {...cardHoverHandlers(isLight)}
            >
              <h3 className="text-base font-extrabold text-white">{topic.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-300/90">{topic.excerpt}</p>
              <button
                type="button"
                onClick={() => navigateTo(`/resources/knowledge-hub/${hub}/${topic.slug}`)}
                className="mt-4 text-sm font-semibold text-violet-300 hover:text-violet-200"
              >
                Read guide →
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigateTo('/resources/knowledge-hub')}
            className="text-sm font-semibold text-violet-300 underline underline-offset-2 hover:text-violet-200"
          >
            View full Knowledge Hub
          </button>
        </div>

        <PageCtaSection primaryLabel={config.ctaLabel} primaryPath={config.ctaPath} />
      </div>
    </main>
  );
}
