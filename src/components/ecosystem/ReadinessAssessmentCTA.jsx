import { navigateTo } from '../../lib/navigation';
import CtaButton from '../ui/CtaButton';
import { getCardBaseStyle } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

/** Compact CTA block for homepage, list-your-brand, and resources pages. */
export default function ReadinessAssessmentCTA({ compact = false }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => navigateTo('/franchise-readiness-assessment')}
        className="text-sm font-semibold text-violet-300 underline-offset-2 hover:text-violet-200 hover:underline"
      >
        Take the Franchise Readiness Assessment →
      </button>
    );
  }

  return (
    <aside
      className="rounded-2xl p-6 sm:flex sm:items-center sm:justify-between sm:gap-6"
      style={getCardBaseStyle(isLight)}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-violet-300">Free assessment</p>
        <h3 className="mt-1 text-lg font-extrabold text-white">Are you franchise ready?</h3>
        <p className="mt-2 text-sm text-slate-300/90">
          Score your preparedness and get personalised recommendations in under 3 minutes.
        </p>
      </div>
      <CtaButton type="button" className="mt-4 shrink-0 sm:mt-0" onClick={() => navigateTo('/franchise-readiness-assessment')}>
        Start Assessment
      </CtaButton>
    </aside>
  );
}
