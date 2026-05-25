import SectionPill from '../ui/SectionPill';
import { IFRANCHISE_ACRONYM } from '../../data/ifranchiseAcronym';
import { sectionTitleClass } from '../../lib/cardThemeStyles';
import '../../styles/ifranchise-acronym.css';

export default function IfranchiseAcronymSection() {
  return (
    <section
      id="about-ifranchise"
      className="ifranchise-acronym relative w-full overflow-hidden bg-transparent py-12 scroll-mt-24 lg:py-16"
      aria-labelledby="ifranchise-acronym-heading"
    >
      <div className="ifranchise-acronym__inner relative z-10">
        <header className="ifranchise-acronym__header">
          <SectionPill>What iFranchise Means</SectionPill>
          <h2 id="ifranchise-acronym-heading" className={`ifranchise-acronym__title mt-4 ${sectionTitleClass(false)}`}>
            Built on <span className="ifranchise-acronym__title-accent">IFRANCHISE</span>
          </h2>
          <p className="ifranchise-acronym__lead mt-3 text-white/80">
            Every letter reflects how we connect brands, investors, and growth — with clarity, scale, and purpose.
          </p>
        </header>

        <div className="ifranchise-acronym__track" role="list">
          {IFRANCHISE_ACRONYM.map((item, index) => {
            const isStaggerLow = index % 2 === 1;
            const tone = index % 2 === 0 ? 'deep' : 'bright';

            return (
              <div
                key={`${item.letter}-${index}`}
                role="listitem"
                className={`ifranchise-acronym__item ${
                  isStaggerLow ? 'ifranchise-acronym__item--stagger-low' : 'ifranchise-acronym__item--stagger-high'
                }`}
              >
                <div className="ifranchise-acronym__box-wrap">
                  <div className={`ifranchise-acronym__box ifranchise-acronym__box--${tone}`} aria-hidden>
                    <span className="ifranchise-acronym__letter">{item.letter}</span>
                    <span className="ifranchise-acronym__pointer" />
                  </div>
                </div>

                {isStaggerLow && (
                  <div className="ifranchise-acronym__connector" aria-hidden>
                    <span className="ifranchise-acronym__line" />
                    <span className="ifranchise-acronym__dot" />
                  </div>
                )}

                <p className="ifranchise-acronym__label text-white/80">
                  <span className="sr-only">{item.letter} — </span>
                  {item.phrase}
                </p>
              </div>
            );
          })}
        </div>

        <p className="ifranchise-acronym__scroll-hint text-white/50" aria-hidden>
          Swipe to explore all letters
        </p>
      </div>
    </section>
  );
}
