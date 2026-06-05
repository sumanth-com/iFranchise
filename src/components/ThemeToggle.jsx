import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useTheme } from '../context/ThemeContext';

function SunIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.55 1.55M18.25 18.25l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.55-1.55M18.25 5.75l1.55-1.55"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 14.2A8.2 8.2 0 1110.8 2.5a7.2 7.2 0 109.7 11.7z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" opacity="0.9" />
      <circle cx="19" cy="11" r="0.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function ThemeToggle({ className = '', compact = false }) {
  const { isDark, toggleTheme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const isLight = !isDark;

  const motionClass = reduceMotion ? 'theme-toggle--no-motion' : '';

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle theme-toggle--orbit-compact group ${isLight ? 'theme-toggle--active-day' : 'theme-toggle--active-night'} ${motionClass} ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        <span className="theme-toggle__ring" aria-hidden />
        <span className={`theme-toggle__orbit-knob theme-toggle__orbit-knob--compact ${isLight ? 'is-day' : 'is-night'}`}>
          <span className="theme-toggle__orbit-knob-inner">
            {isDark ? <MoonIcon className="h-[15px] w-[15px]" /> : <SunIcon className="h-[15px] w-[15px]" />}
          </span>
        </span>
        <span className="sr-only">
          {isDark ? 'Dark mode on. Switch to light.' : 'Light mode on. Switch to dark.'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle--orbit-pill group ${isLight ? 'theme-toggle--active-day' : 'theme-toggle--active-night'} ${motionClass} ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-toggle__orbit-sky ${isLight ? 'is-day' : 'is-night'}`} aria-hidden>
        <span className="theme-toggle__orbit-stars" />
        <span className="theme-toggle__orbit-glow theme-toggle__orbit-glow--sun" />
        <span className="theme-toggle__orbit-glow theme-toggle__orbit-glow--moon" />
      </span>

      <span className="theme-toggle__orbit-track-icons" aria-hidden>
        <span className={`theme-toggle__orbit-ghost ${isDark ? 'is-dim' : ''}`}>
          <MoonIcon className="h-3.5 w-3.5" />
        </span>
        <span className={`theme-toggle__orbit-ghost ${isLight ? 'is-dim' : ''}`}>
          <SunIcon className="h-3.5 w-3.5" />
        </span>
      </span>

      <span className={`theme-toggle__orbit-knob ${isLight ? 'is-day' : 'is-night'}`}>
        <span className="theme-toggle__orbit-knob-inner">
          {isDark ? <MoonIcon className="h-[15px] w-[15px]" /> : <SunIcon className="h-[15px] w-[15px]" />}
        </span>
        <span className="theme-toggle__orbit-knob-shine" aria-hidden />
      </span>

      <span className="sr-only">
        {isDark ? 'Dark mode on. Switch to light.' : 'Light mode on. Switch to dark.'}
      </span>
    </button>
  );
}
