/** Fade out HTML LCP placeholder once React hero image has painted (home only). */
export function removeStaticHero() {
  const el = document.getElementById('ifr-static-hero');
  if (!el) return;
  el.classList.add('ifr-static-hero--hidden');
  const remove = () => el.remove();
  el.addEventListener('transitionend', remove, { once: true });
  window.setTimeout(remove, 400);
}
