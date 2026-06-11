/**
 * Production HTML tweaks for mobile LCP:
 * - All CSS non-render-blocking (critical CSS is inline in index.html)
 * - Strip modulepreload / prefetch chains that compete with hero image
 * - Dedupe manifest links
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

      out = out.replace(/<link rel="manifest" href="\/manifest\.json[^"]*"[^>]*>\n?/g, '');

      const manifestCount = (out.match(/rel="manifest"/g) || []).length;
      if (manifestCount > 1) {
        let kept = false;
        out = out.replace(/<link rel="manifest"[^>]*>\n?/g, (tag) => {
          if (kept) return '';
          kept = true;
          return tag;
        });
      }

      if (!out.includes('route-seo-boot.js" defer')) {
        out = out.replace(
          /<script src="\/route-seo-boot\.js"><\/script>/,
          '<script src="/route-seo-boot.js" defer></script>',
        );
      }

      return out;
    },
  };
}
