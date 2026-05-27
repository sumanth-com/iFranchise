/**
 * Production HTML tweaks for mobile LCP:
 * - All CSS non-render-blocking (critical CSS is inline in index.html)
 * - Strip modulepreload / prefetch chains that compete with hero image
 */
export function viteMobileLcp() {
  return {
    name: 'vite-mobile-lcp',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      let out = html.replace(
        /<link rel="stylesheet"( crossorigin)? href="(\/assets\/[^"]+\.css)">/g,
        (_, cross, href) =>
          `<link rel="preload" href="${href}" as="style"${cross || ''} onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet"${cross || ''} href="${href}"></noscript>`,
      );

      out = out.replace(/\s*<link rel="modulepreload"[^>]*>\n?/g, '');

      return out;
    },
  };
}
