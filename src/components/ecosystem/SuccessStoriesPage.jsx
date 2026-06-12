import { ABOUT_PAGE_TESTIMONIALS } from '../../data/testimonials';
import EcosystemHero from './EcosystemHero';
import GeoAnswerBlock from './GeoAnswerBlock';
import { PageCtaSection } from './EducationalSections';
import { getCardBaseStyle } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

export default function SuccessStoriesPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <EcosystemHero
          eyebrow="Success Stories"
          title="Franchise Growth Stories Across India"
          subtitle="How investors and brand owners partner with iFranchise to find the right franchise fit, expand with confidence, and build scalable networks."
        />

        <GeoAnswerBlock
          answer="iFranchise success stories showcase how franchise investors and brand owners across India use our platform for opportunity matching, expansion advisory, and structured franchise growth."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {ABOUT_PAGE_TESTIMONIALS.map((story) => (
            <blockquote
              key={story.name}
              className="rounded-2xl p-6"
              style={getCardBaseStyle(isLight)}
            >
              <p className="text-sm leading-relaxed text-slate-200">&ldquo;{story.quote}&rdquo;</p>
              <footer className="mt-4 flex items-center gap-3">
                {story.avatar ? (
                  <img
                    src={story.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                ) : null}
                <div>
                  <cite className="not-italic text-sm font-bold text-white">{story.name}</cite>
                  {story.company ? (
                    <p className="text-xs text-slate-400">{story.company}</p>
                  ) : null}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <PageCtaSection
          heading="Write your franchise success story"
          description="Whether investing or expanding, iFranchise connects you with the right partners and guidance to grow across India."
        />
      </div>
    </main>
  );
}
