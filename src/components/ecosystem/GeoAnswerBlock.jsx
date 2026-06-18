import { useTheme } from '../../context/ThemeContext';
import { linkifyContent } from '../../lib/linkifyContent';

/** AI-search-friendly direct answer block for GEO optimization. */
export default function GeoAnswerBlock({ answer, label = 'Quick answer', variant = 'default', skipLinks = [] }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!answer) return null;

  if (variant === 'subtle') {
    return (
      <aside className="sr-only" aria-label={label}>
        <p>{answer}</p>
      </aside>
    );
  }

  return (
    <aside
      className={`mb-8 w-full rounded-2xl border p-5 sm:p-6 ${
        isLight ? 'border-slate-200 bg-slate-50' : 'border-violet-400/25 bg-violet-500/10'
      }`}
      aria-label={label}
    >
      <p
        className={`mb-2 text-[11px] font-bold uppercase tracking-[0.14em] ${
          isLight ? 'text-black' : 'text-violet-300'
        }`}
      >
        {label}
      </p>
      <p className={`text-sm leading-relaxed sm:text-base ${isLight ? 'text-black' : 'text-white'}`}>
        {linkifyContent(answer, { skip: skipLinks })}
      </p>
    </aside>
  );
}
