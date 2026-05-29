import { FiSearch, FiSliders, FiFileText, FiMessageCircle } from 'react-icons/fi';
import CtaButton from '../ui/CtaButton';
import SectionPill from '../ui/SectionPill';
import { navigateTo } from '@/lib/navigation';
import { FRANCHISE_OPPORTUNITIES_SHELL } from '../../lib/franchiseOpportunitiesShell.js';
import { sectionSubtitleClass, sectionTitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

const STEPS = [
  {
    num: '01',
    title: 'Explore listings',
    desc: 'Browse verified franchises with clear investment, industry, and location data.',
    icon: FiSearch,
  },
  {
    num: '02',
    title: 'Compare & shortlist',
    desc: 'Filter by INR range, FOFO / FOCO model, and ROI to find brands that fit you.',
    icon: FiSliders,
  },
  {
    num: '03',
    title: 'Review in depth',
    desc: 'Open each opportunity for business model, support, territory, and growth outlook.',
    icon: FiFileText,
  },
  {
    num: '04',
    title: 'Connect & move forward',
    desc: 'Talk to iFranchise advisors, then connect with the brand when you are ready.',
    icon: FiMessageCircle,
  },
];

export default function FranchiseOpportunitiesWayWeWork() {
  const { isLight } = useTheme();

  return (
    <section
      className={`fo-way-work border-t py-12 sm:py-14 lg:py-16 ${
        isLight ? 'fo-way-work--light' : 'fo-way-work--dark'
      }`}
      aria-labelledby="fo-way-work-title"
    >
      <div className={FRANCHISE_OPPORTUNITIES_SHELL}>
        <div className="fo-way-work__header mx-auto mb-8 flex w-full max-w-5xl flex-col items-center text-center">
          <SectionPill className="mb-4">Way we work</SectionPill>
          <h2
            id="fo-way-work-title"
            className={`fo-way-work__title ${sectionTitleClass(isLight, {
              tight: true,
              extra: 'mb-2 whitespace-nowrap text-lg sm:text-xl lg:text-2xl',
            })}`}
          >
            Search to franchise decision, made simple
          </h2>
          <p
            className={`fo-way-work__subtitle ${sectionSubtitleClass(isLight, 'whitespace-nowrap text-sm sm:text-base')}`}
          >
            Four clear steps with iFranchise, no clutter.
          </p>
        </div>

        <ol className="fo-way-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.num} className="fo-way-card list-none">
                <span className="fo-way-card__num">{step.num}</span>
                <div className="fo-way-card__icon" aria-hidden>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="fo-way-card__title">{step.title}</h3>
                <p className="fo-way-card__desc">{step.desc}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex justify-center">
          <CtaButton type="button" size="lg" onClick={() => navigateTo('/contact-us')}>
            Talk to an advisor
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
