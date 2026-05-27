/** Load non-critical global CSS after first paint (mobile). */
export function deferNonCriticalStyles() {
  if (typeof window === 'undefined') return;

  const load = () => {
    import('../styles/footer-social-3d.css');
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 3500 });
  } else {
    setTimeout(load, 600);
  }
}
