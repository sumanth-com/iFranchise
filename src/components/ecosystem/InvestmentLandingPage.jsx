import { lazy, Suspense } from 'react';
import { franchiseOpportunities } from '../../data/franchiseData';
import { getInvestmentPageByPath } from '../../data/ecosystem/investmentPages';
import {
  filterHighRoiOpportunities,
  filterOpportunitiesByInrRange,
  filterPremiumOpportunities,
} from '../../lib/investmentFilters';
import EcosystemHero from './EcosystemHero';
import GeoAnswerBlock from './GeoAnswerBlock';
import {
  BulletList,
  ComparisonTable,
  ContentSection,
  FaqSection,
} from './EducationalSections';

const OpportunityCard = lazy(() => import('../OpportunityCard'));

function filterBrands(config) {
  const active = franchiseOpportunities.filter((o) => o.status !== 'inactive');
  if (config.filterType === 'range') {
    return filterOpportunitiesByInrRange(active, { minInr: config.minInr, maxInr: config.maxInr });
  }
  if (config.filterType === 'premium') {
    return filterPremiumOpportunities(active, config.minInr);
  }
  if (config.filterType === 'highRoi') {
    return filterHighRoiOpportunities(active, config.minRoi);
  }
  return active;
}

export default function InvestmentLandingPage() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const config = getInvestmentPageByPath(pathname);
  if (!config) return null;

  const brands = filterBrands(config).slice(0, 6);

  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <EcosystemHero title={config.title} subtitle={config.subtitle} eyebrow="Investment Guide" />

        <GeoAnswerBlock answer={config.geoAnswer} />

        <ContentSection title="Why this investment band">
          <BulletList items={config.highlights} />
        </ContentSection>

        {config.educationalSections?.map((section) => (
          <div key={section.heading} className="mt-8">
            <ContentSection title={section.heading}>
              <p className="text-sm leading-relaxed text-slate-300/90">{section.body}</p>
            </ContentSection>
          </div>
        ))}

        <section className="mt-12">
          <h2 className="mb-6 text-center text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Matching franchise opportunities
          </h2>
          {brands.length ? (
            <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-violet-500/10" />}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {brands.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            </Suspense>
          ) : (
            <p className="text-center text-sm text-slate-400">
              New listings in this band are added regularly. Contact our team for personalised matches.
            </p>
          )}
        </section>

        <div className="mt-12">
          <ContentSection title="Model comparison at this level">
            <ComparisonTable
              columns={['Model', 'Best for', 'Investment', 'Involvement']}
              rows={config.comparison.map((r) => ({
                model: r.model,
                'best for': r.bestFor,
                investment: r.investment,
                involvement: r.involvement,
              }))}
            />
          </ContentSection>
        </div>

        <div className="mt-14">
          <FaqSection faqs={config.faqs} />
        </div>

      </div>
    </main>
  );
}
