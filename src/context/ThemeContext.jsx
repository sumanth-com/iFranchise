import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  THEMES,
  applyTheme,
  getInitialThemeState,
  getStoredTheme,
  getSystemTheme,
  hasManualThemePreference,
  migrateLegacyThemeStorage,
  persistManualTheme,
  THEME_SOURCE,
} from '../lib/theme';

const ThemeContext = createContext(null);

function readPersistedManualTheme() {
  migrateLegacyThemeStorage();
  if (!hasManualThemePreference()) return null;
  return getStoredTheme();
}

export function ThemeProvider({ children }) {
  const initial = useMemo(() => getInitialThemeState(), []);
  const [theme, setTheme] = useState(initial.theme);
  const [hasManualPreference, setHasManualPreference] = useState(initial.hasManualPreference);

  /** Synchronous guard — system listener checks this before React state commits */
  const manualLockRef = useRef(initial.hasManualPreference);
  const themeRef = useRef(initial.theme);

  const syncFromPersistence = useCallback(() => {
    migrateLegacyThemeStorage();
    const manual = hasManualThemePreference();
    manualLockRef.current = manual;
    setHasManualPreference(manual);

    const nextTheme = manual ? (readPersistedManualTheme() ?? themeRef.current) : getSystemTheme();
    themeRef.current = nextTheme;
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  useLayoutEffect(() => {
    migrateLegacyThemeStorage();
    applyTheme(themeRef.current);
  }, []);

  useLayoutEffect(() => {
    themeRef.current = theme;
    applyTheme(theme);
  }, [theme]);

  /* Live system sync — only when user has not manually chosen a theme */
  useEffect(() => {
    if (manualLockRef.current || hasManualPreference) return undefined;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const onSystemChange = (event) => {
      if (manualLockRef.current) return;
      const next = event.matches ? THEMES.DARK : THEMES.LIGHT;
      if (next === themeRef.current) return;
      themeRef.current = next;
      setTheme(next);
      applyTheme(next);
    };

    const systemTheme = getSystemTheme();
    if (systemTheme !== themeRef.current) {
      themeRef.current = systemTheme;
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }

    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, [hasManualPreference]);

  /* Cross-tab + bfcache restore */
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== 'ifranchise-theme-preference' && event.key !== 'ifranchise-theme-source') return;
      syncFromPersistence();
    };

    const onPageShow = () => syncFromPersistence();

    window.addEventListener('storage', onStorage);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [syncFromPersistence]);

  const setThemeMode = useCallback((nextTheme, { manual = true } = {}) => {
    const resolved = nextTheme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK;

    if (manual) {
      manualLockRef.current = true;
      persistManualTheme(resolved);
      setHasManualPreference(true);
    }

    themeRef.current = resolved;
    applyTheme(resolved, { transition: manual });
    setTheme(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = themeRef.current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setThemeMode(next, { manual: true });
  }, [setThemeMode]);

  const resetToSystemTheme = useCallback(() => {
    manualLockRef.current = false;
    try {
      localStorage.removeItem('ifranchise-theme-preference');
      localStorage.removeItem('ifranchise-theme-source');
    } catch {
      /* ignore */
    }
    setHasManualPreference(false);
    const systemTheme = getSystemTheme();
    themeRef.current = systemTheme;
    applyTheme(systemTheme, { transition: true });
    setTheme(systemTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEMES.DARK,
      isLight: theme === THEMES.LIGHT,
      toggleTheme,
      setTheme: setThemeMode,
      resetToSystemTheme,
      hasManualPreference,
      themeSource: hasManualPreference ? THEME_SOURCE.MANUAL : THEME_SOURCE.SYSTEM,
    }),
    [theme, toggleTheme, setThemeMode, resetToSystemTheme, hasManualPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

export function useThemeOptional() {
  return useContext(ThemeContext);
}
