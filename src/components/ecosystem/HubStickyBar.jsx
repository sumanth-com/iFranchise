import { navigateTo } from '../../lib/navigation';
import { useTheme } from '../../context/ThemeContext';

/** Shared max-width tokens — keep hub pages visually consistent. */
export const HUB_BAR_MAX = 'max-w-6xl';
export const HUB_CONTAINER = 'relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8';
/** Gate & focused flows — slightly narrower, balanced two-column layout */
export const HUB_CONTAINER_FOCUS = 'relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8';
export const HUB_PROSE = 'max-w-3xl';

/**
 * @param {{ crumbs: Array<{ label: string, path?: string }> }} props
 */
export default function HubStickyBar({ crumbs }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`sticky top-16 z-40 border-b backdrop-blur-md ${
        isLight
          ? 'border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5'
          : 'border-white/[0.08] bg-[#0a0618]/90'
      }`}
    >
      <div className="flex w-full items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 xl:px-6">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <span key={`${crumb.label}-${idx}`} className="flex min-w-0 items-center gap-2 sm:gap-3">
              {idx > 0 ? (
                <span className={`hidden h-4 w-px sm:block ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} aria-hidden />
              ) : null}
              {crumb.path && !isLast ? (
                <button
                  type="button"
                  onClick={() => navigateTo(crumb.path)}
                  className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors ${
                    isLight ? 'text-black hover:text-black/80' : 'text-slate-400 hover:text-violet-300'
                  }`}
                >
                  {idx === 0 ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  ) : null}
                  {crumb.label}
                </button>
              ) : (
                <span
                  className={`truncate text-sm font-medium ${
                    isLast
                      ? isLight
                        ? 'text-black'
                        : 'text-slate-200'
                      : isLight
                        ? 'text-black'
                        : 'text-slate-400'
                  }`}
                >
                  {crumb.label}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
