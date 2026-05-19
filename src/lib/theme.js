export const THEME_STORAGE_KEY = 'ifranchise-theme-preference';
export const THEME_SOURCE_KEY = 'ifranchise-theme-source';

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const THEME_SOURCE = {
  MANUAL: 'manual',
  SYSTEM: 'system',
};

const VALID_THEMES = new Set([THEMES.DARK, THEMES.LIGHT]);

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function getSystemTheme() {
  if (typeof window === 'undefined') return THEMES.DARK;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

export function getStoredTheme() {
  const stored = safeGetItem(THEME_STORAGE_KEY);
  if (stored === THEMES.DARK || stored === THEMES.LIGHT) return stored;
  return null;
}

export function getThemeSource() {
  const source = safeGetItem(THEME_SOURCE_KEY);
  if (source === THEME_SOURCE.MANUAL || source === THEME_SOURCE.SYSTEM) return source;
  return null;
}

export function hasManualThemePreference() {
  if (getThemeSource() === THEME_SOURCE.MANUAL) return true;
  /* Legacy: theme saved before source flag - treat as manual */
  return getStoredTheme() !== null && getThemeSource() === null;
}

/** Migrate legacy installs that only stored theme value */
export function migrateLegacyThemeStorage() {
  const stored = getStoredTheme();
  if (!stored) return;
  if (getThemeSource() === null) {
    safeSetItem(THEME_SOURCE_KEY, THEME_SOURCE.MANUAL);
  }
}

export function readDomTheme() {
  if (typeof document === 'undefined') return null;
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === THEMES.DARK || attr === THEMES.LIGHT) return attr;
  return null;
}

/**
 * Priority: manual saved preference -> system preference -> dark fallback
 */
export function resolveTheme() {
  if (hasManualThemePreference()) {
    const stored = getStoredTheme();
    if (stored) return stored;
  }
  return getSystemTheme();
}

export function getInitialThemeState() {
  migrateLegacyThemeStorage();
  const manual = hasManualThemePreference();
  const theme = manual ? (getStoredTheme() ?? readDomTheme() ?? getSystemTheme()) : (readDomTheme() ?? getSystemTheme());
  const resolved = VALID_THEMES.has(theme) ? theme : THEMES.DARK;
  return { theme: resolved, hasManualPreference: manual };
}

export function applyTheme(theme, { transition = false } = {}) {
  if (typeof document === 'undefined') return THEMES.DARK;
  const root = document.documentElement;
  const resolved = theme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK;

  if (transition) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 520);
  }

  root.setAttribute('data-theme', resolved);
  root.classList.toggle('dark', resolved === THEMES.DARK);
  root.style.colorScheme = resolved;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', resolved === THEMES.DARK ? '#0a0618' : '#f8f9fc');
  }

  return resolved;
}

export function persistManualTheme(theme) {
  const resolved = theme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK;
  safeSetItem(THEME_STORAGE_KEY, resolved);
  safeSetItem(THEME_SOURCE_KEY, THEME_SOURCE.MANUAL);
  return resolved;
}

export function clearManualThemePreference() {
  safeRemoveItem(THEME_STORAGE_KEY);
  safeRemoveItem(THEME_SOURCE_KEY);
}

/** @deprecated Use clearManualThemePreference */
export function clearStoredTheme() {
  clearManualThemePreference();
}

/** @deprecated Use persistManualTheme */
export function persistTheme(theme) {
  persistManualTheme(theme);
}

/** Blocking bootstrap - keep in sync with getInitialThemeState / resolveTheme */
export const THEME_INIT_SCRIPT = `(function(){try{var k='ifranchise-theme-preference',sk='ifranchise-theme-source',s=localStorage.getItem(k),src=localStorage.getItem(sk),t;if(src==='manual'&&(s==='dark'||s==='light'))t=s;else if(!src&&(s==='dark'||s==='light')){t=s;try{localStorage.setItem(sk,'manual')}catch(e){}}else t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var r=document.documentElement;r.setAttribute('data-theme',t);r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'#0a0618':'#f8f9fc');}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`;
