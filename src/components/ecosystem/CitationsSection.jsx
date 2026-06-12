import { useTheme } from '../../context/ThemeContext';

/**
 * @param {{ citations: import('../../data/citations').Citation[], className?: string, title?: string }} props
 */
export default function CitationsSection({
  citations,
  className = '',
  title = 'Sources & references',
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!citations?.length) return null;

  const headingClass = isLight ? '!text-black' : 'text-white';
  const bodyClass = isLight ? '!text-black' : 'text-slate-300/90';
  const metaClass = isLight ? '!text-black' : 'text-slate-400';
  const linkClass = isLight
    ? 'font-medium !text-violet-700 underline decoration-violet-300 underline-offset-2 hover:!text-violet-900'
    : 'font-medium text-violet-300 underline decoration-violet-500/40 underline-offset-2 hover:text-violet-200';

  return (
    <section
      className={`scroll-mt-28 ${className}`}
      aria-labelledby="content-citations-heading"
    >
      <div className="mb-5 border-l-2 border-violet-500 pl-5">
        <h2 id="content-citations-heading" className={`text-lg font-semibold tracking-tight sm:text-xl ${headingClass}`}>
          {title}
        </h2>
        <p className={`mt-2 text-sm leading-relaxed ${metaClass}`}>
          External references used to inform this guide. Links open in a new tab.
        </p>
      </div>
      <ol className="space-y-4">
        {citations.map((citation, index) => (
          <li
            key={`${citation.url}-${index}`}
            className={`rounded-xl border p-4 sm:p-5 ${isLight ? 'border-slate-200 bg-white' : 'border-violet-500/20 bg-white/[0.02]'}`}
          >
            <span className={`text-xs font-semibold tabular-nums ${metaClass}`}>{index + 1}.</span>
            <p className={`mt-1 text-sm font-semibold leading-snug sm:text-base ${bodyClass}`}>
              <a href={citation.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {citation.title}
              </a>
            </p>
            <p className={`mt-1 text-xs sm:text-sm ${metaClass}`}>{citation.publisher}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
