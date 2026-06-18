import { getFranchiseModelByPath, MODEL_FAQS } from '../../data/ecosystem/franchiseModelsContent';
import EcosystemHero from './EcosystemHero';
import GeoAnswerBlock from './GeoAnswerBlock';
import {
  BulletList,
  ComparisonTable,
  ContentSection,
  FaqSection,
  InternalLinksSection,
} from './EducationalSections';

export default function FranchiseModelPage() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const model = getFranchiseModelByPath(pathname);
  if (!model) return null;

  const faqs = MODEL_FAQS[pathname.replace(/^\//, '')] || [];
  const relatedLinks = (model.relatedPaths || []).map((path) => ({
    path,
    label: path.includes('fofo') ? 'FOFO Guide' : path.includes('foco') ? 'FOCO Guide' : path.includes('fico') ? 'FICO Guide' : 'Explore Opportunities',
  }));

  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <EcosystemHero
          eyebrow={model.heroEyebrow}
          badge={model.code}
          badgeColor={model.badgeColor}
          title={model.fullTitle}
          subtitle={model.subtitle}
        />

        <GeoAnswerBlock answer={model.geoAnswer} skipLinks={[model.code]} />

        <div className="space-y-10">
          <ContentSection title="Model explanation">
            <p className="text-sm leading-relaxed text-slate-300/90">{model.explanation}</p>
          </ContentSection>

          <ContentSection title="How it works">
            <BulletList items={model.howItWorks} />
          </ContentSection>

          <div className="grid gap-8 md:grid-cols-2">
            <ContentSection title="Advantages">
              <BulletList items={model.advantages} />
            </ContentSection>
            <ContentSection title="Challenges">
              <BulletList items={model.challenges} />
            </ContentSection>
          </div>

          <ContentSection title="Ideal investor profile">
            <p className="text-sm leading-relaxed text-slate-300/90">{model.idealInvestor}</p>
          </ContentSection>

          <ContentSection title="Investment considerations">
            <BulletList items={model.investmentConsiderations} />
          </ContentSection>

          <ContentSection title="Model comparison">
            <ComparisonTable
              columns={['Model', 'Ownership', 'Operations', 'Involvement', 'Control']}
              rows={model.comparison.map((r) => ({
                model: r.model,
                ownership: r.ownership,
                operations: r.operations,
                involvement: r.involvement,
                control: r.control,
              }))}
            />
          </ContentSection>
        </div>

        <div className="mt-14">
          <FaqSection faqs={faqs} skipLinks={[model.code]} />
        </div>

        <InternalLinksSection links={relatedLinks} />
      </div>
    </main>
  );
}
