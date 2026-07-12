import SectionPill from '../ui/SectionPill';
import { navigateTo } from '../../lib/navigation';
import { FRANCHISE_MODELS } from '../../data/ecosystem/franchiseModelsContent';
import { sectionTitleClass, sectionSubtitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import FranchiseModelCardHeader from './FranchiseModelCardHeader';

const MODEL_ORDER = ['fofo-model', 'foco-model', 'fico-model'];

export default function HomeFranchiseModelsSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="section-reveal relative w-full overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-14 sm:px-6 lg:px-8">
        <div className="reveal-child mb-10 text-center">
          <SectionPill className="mb-4">Franchise Models</SectionPill>
          <h2 className={sectionTitleClass(isLight, { tight: true })}>Compare Franchise Business Models</h2>
          <p className={`mx-auto ${sectionSubtitleClass(isLight, 'max-w-2xl')}`}>
            Understand how each franchise model works before making your investment decision.
          </p>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODEL_ORDER.map((key, i) => {
            const model = FRANCHISE_MODELS[key];
            const accent = model.accentColor;
            const homeCard = model.homeCard;
            const handleLearnMore = () => navigateTo(model.path);

            return (
              <div
                key={key}
                className="flex h-full flex-col"
                style={{ animation: `cardReveal 0.4s ease ${i * 0.08 + 0.1}s both` }}
              >
                <article
                  onClick={handleLearnMore}
                  className="fo-opportunity-card card-premium-dark group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl"
                  style={{
                    '--fo-card-bg': accent,
                    '--fo-card-accent': accent,
                  }}
                >
                  <FranchiseModelCardHeader
                    modelKey={key}
                    code={model.code}
                    accentColor={accent}
                  />

                  <div className="fo-opportunity-card__body flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="fo-card-title mb-3 text-lg font-bold leading-snug">
                      {homeCard.nameLine}
                    </h3>
                    <p className={`mb-5 flex-1 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                      {homeCard.shortExplanation}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore();
                      }}
                      className="btn-purple-solid mt-auto w-full rounded-lg border-none py-2 px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Learn More
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
