/** Remove HTML LCP placeholder once React hero is ready (home only). */
export function removeStaticHero() {
  document.getElementById('ifr-static-hero')?.remove();
}
