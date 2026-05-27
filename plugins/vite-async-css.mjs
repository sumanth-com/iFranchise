/**
 * Loads non-entry CSS asynchronously to reduce render-blocking (mobile LCP).
 * Entry index CSS stays blocking; route/chunk CSS uses preload → stylesheet.
 */
export function viteAsyncCss() {
  return {
    name: 'vite-async-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"( crossorigin)? href="(\/assets\/(?!index-)[^"]+\.css)">/g,
        (_, cross, href) =>
          `<link rel="preload" href="${href}" as="style"${cross || ''} onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet"${cross || ''} href="${href}"></noscript>`,
      );
    },
  };
}
