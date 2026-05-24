import { sectionTitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

export default function FranchiseOpportunitiesHeader() {
  const { isLight } = useTheme();

  return (
    <header className="fo-page-header mx-auto mb-8 max-w-3xl border-b border-violet-500/20 pb-8 text-center lg:mb-10">
      <h1 className={`fo-page-header__title ${sectionTitleClass(isLight, { extra: 'mb-5' })}`}>
        Find the right franchise for you
      </h1>
      <p
        className={`fo-page-header__subtitle mx-auto max-w-3xl text-base leading-relaxed sm:text-lg ${
          isLight ? 'text-slate-600' : 'text-white'
        }`}
      >
        Compare verified brands by investment in INR, business model, and location — then open any listing
        for full details.
      </p>
    </header>
  );
}
