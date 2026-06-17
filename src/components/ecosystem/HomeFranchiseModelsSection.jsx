import SectionPill from '../ui/SectionPill';
import { navigateTo } from '../../lib/navigation';
import { FRANCHISE_MODELS } from '../../data/ecosystem/franchiseModelsContent';
import { sectionTitleClass, sectionSubtitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import FranchiseModelCardHeader from './FranchiseModelCardHeader';

const MODEL_ORDER = ['fofo-model', 'foco-model', 'fico-model'];

function cardTitleWithoutCode(fullTitle, code) {
  return fullTitle.replace(new RegExp(`\\s*\\(${code}\\)\\s*$`, 'i'), '').trim();
}

function MetaIcon({ accent, children }) {
  return (
    <svg
      className="mr-2.5 h-4 w-4 shrink-0"
      style={{ color: accent }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export default function HomeFranchiseModelsSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="section-reveal relative w-full overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-14 sm:px-6 lg:px-8">
        <div className="reveal-child mb-10 text-center">
          <SectionPill className="mb-4">Franchise Models</SectionPill>
          <h2 className={sectionTitleClass(isLight, { tight: true })}>Understand Franchise Models</h2>
          <p className={`mx-auto ${sectionSubtitleClass(isLight, 'max-w-2xl')}`}>
            Choose the franchise structure that best matches your investment goals and operational preferences.
          </p>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODEL_ORDER.map((key, i) => {
            const model = FRANCHISE_MODELS[key];
            const accent = model.accentColor;
            const comparison = model.comparison.find((row) => row.model === model.code);
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
                    <h3 className="fo-card-title mb-4 line-clamp-2 text-lg font-bold leading-snug">
                      {cardTitleWithoutCode(model.fullTitle, model.code)}
                    </h3>

                    <div className="fo-card-meta mb-4 flex-1 space-y-3">
                      <div className="fo-card-meta__row flex items-center text-sm">
                        <MetaIcon accent={accent}>
                          <path d="M8 11V7a4 4 0 118 0v4" />
                          <rect x="6" y="11" width="12" height="10" rx="2" />
                          <circle cx="12" cy="16" r="1.25" fill="currentColor" stroke="none" />
                        </MetaIcon>
                        <span className="fo-card-meta__label shrink-0">Ownership:</span>
                        <span className="fo-card-meta__value ml-2 font-semibold">{comparison?.ownership}</span>
                      </div>
                      <div className="fo-card-meta__row flex items-center text-sm">
                        <MetaIcon accent={accent}>
                          <path d="M4 10l2-6h12l2 6" />
                          <path d="M4 10h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
                          <path d="M10 20v-4h4v4" />
                        </MetaIcon>
                        <span className="fo-card-meta__label">Operations:</span>
                        <span className="fo-card-meta__value ml-2 font-semibold">{comparison?.operations}</span>
                      </div>
                      <div className="fo-card-meta__row flex items-center text-sm">
                        <MetaIcon accent={accent}>
                          <path d="M6 17V9M10 17V6M14 17v-4M18 17V4" />
                        </MetaIcon>
                        <span className="fo-card-meta__label shrink-0">Involvement:</span>
                        <span className="fo-card-meta__value ml-2 font-semibold">{comparison?.involvement}</span>
                      </div>
                    </div>

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
