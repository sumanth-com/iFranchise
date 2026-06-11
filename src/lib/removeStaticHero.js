/** Hide HTML LCP placeholder once React hero image has painted (home only). */
export function removeStaticHero() {
  const el = document.getElementById('ifr-static-hero');
  if (!el) return;
  el.classList.add('ifr-static-hero--hidden');
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => el.remove());
  });
}
