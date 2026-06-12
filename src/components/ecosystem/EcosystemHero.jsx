import SectionPill from '../ui/SectionPill';
import { sectionTitleClass, sectionSubtitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

export default function EcosystemHero({ eyebrow, title, subtitle, badge, badgeColor }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <header className="mx-auto mb-12 max-w-4xl text-center lg:mb-14">
      {eyebrow ? <SectionPill className="mb-4">{eyebrow}</SectionPill> : null}
      {badge ? (
        <span
          className={`mb-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${badgeColor || 'bg-violet-100 text-violet-700 border-violet-200'}`}
        >
          {badge}
        </span>
      ) : null}
      <h1 className={sectionTitleClass(isLight, { tight: true })}>{title}</h1>
      {subtitle ? <p className={`mt-4 ${sectionSubtitleClass(isLight, 'max-w-2xl')}`}>{subtitle}</p> : null}
    </header>
  );
}
