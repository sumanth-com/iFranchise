import SectionPill from '../ui/SectionPill';
import { navigateTo } from '../../lib/navigation';
import { HOME_INVESTMENT_CARDS } from '../../data/ecosystem/investmentPages';
import { getCardBaseStyle, cardHoverHandlers, sectionTitleClass, sectionSubtitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

function getCardPurple(isLight) {
  return isLight ? '#7c3aed' : '#c4b5fd';
}

export default function HomeBrowseInvestmentSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="section-reveal relative w-full overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-14 sm:px-6 lg:px-8">
        <div className="reveal-child mb-10 text-center">
          <SectionPill className="mb-4">Explore By Investment</SectionPill>
          <h2 className={sectionTitleClass(isLight, { tight: true })}>
            Find a Franchise That Matches Your Budget
          </h2>
          <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
            Explore franchise opportunities based on the amount you&apos;re planning to invest.
          </p>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_INVESTMENT_CARDS.map((card, i) => {
            const accent = getCardPurple(isLight);
            const handleView = () => navigateTo(card.path);

            return (
              <article
                key={card.path}
                onClick={handleView}
                className="group flex h-full cursor-pointer flex-col rounded-xl p-4 text-left sm:p-5"
                style={getCardBaseStyle(isLight, { animation: `fadeUp 0.4s ease ${0.1 + i * 0.06}s both` })}
                {...cardHoverHandlers(isLight, -4)}
              >
                <span
                  className="text-xl font-extrabold tracking-tight sm:text-2xl"
                  style={{ color: accent }}
                >
                  {card.label}
                </span>

                <p className={`mt-2 line-clamp-3 flex-1 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300/90'}`}>
                  {card.description}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView();
                  }}
                  className="btn-purple-solid mt-4 w-full rounded-lg border-none py-2 px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  View Opportunities
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
