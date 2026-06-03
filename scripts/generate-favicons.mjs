/**
 * Generate favicons from src/assets/BrandNav.webp for Google Search visibility.
 * - Solid #0a0618 background, trimmed & centered logo, larger fill at small sizes
 * - favicon.ico (16+32+48), PNG sizes, Apple/Android PWA icons
 * - Updates index.html, manifest.webmanifest, manifest.json
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { FAVICON_BG, ICON_VERSION } from './favicon-version.mjs';
import { encodeIco, loadTrimmedLogo, renderFaviconSquare } from './favicon-renderer.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const outDir = join(root, 'public');
const vQuery = `?v=${ICON_VERSION}`;

const SOURCE_CANDIDATES = [
  join(root, 'src', 'assets', 'BrandNav.webp'),
  join(root, 'src', 'assets', 'BrandNav-384w.webp'),
  join(root, 'src', 'assets', 'BrandNav-192w.webp'),
];

const OUTPUTS = [
  { name: 'favicon-16x16.png', size: 16, fill: 0.9, sharpen: true },
  { name: 'favicon-32x32.png', size: 32, fill: 0.9, sharpen: true },
  { name: 'favicon-48x48.png', size: 48, fill: 0.88, sharpen: true },
  { name: 'apple-touch-icon.png', size: 180, fill: 0.86, sharpen: false },
  { name: 'android-chrome-192x192.png', size: 192, fill: 0.86, sharpen: false },
  { name: 'android-chrome-512x512.png', size: 512, fill: 0.86, sharpen: false },
  { name: 'favicon.png', size: 512, fill: 0.86, sharpen: false },
];

function resolveSharp() {
  const bases = [
    join(root, 'node_modules'),
    join(process.env.TEMP || '/tmp', 'ifr-sharp-tools', 'node_modules'),
  ];
  for (const base of bases) {
    try {
      return require(join(base, 'sharp'));
    } catch {
      /* try next */
    }
  }

  const toolRoot = join(process.env.TEMP || '/tmp', 'ifr-sharp-tools');
  mkdirSync(toolRoot, { recursive: true });
  if (!existsSync(join(toolRoot, 'package.json'))) {
    spawnSync('npm', ['init', '-y'], { cwd: toolRoot, stdio: 'ignore' });
  }
  const install = spawnSync(
    'npm',
    ['install', 'sharp@0.34.5', '--no-save', '--no-audit', '--no-fund'],
    { cwd: toolRoot, stdio: 'inherit' },
  );
  if (install.status !== 0) {
    throw new Error('[favicon] sharp not found — run npm install in project root');
  }
  return require(join(toolRoot, 'node_modules', 'sharp'));
}

const sourcePath = SOURCE_CANDIDATES.find((p) => existsSync(p));
if (!sourcePath) {
  console.error('[favicon] BrandNav source missing in src/assets');
  process.exit(1);
}

const sharp = resolveSharp();
const logoSharp = await loadTrimmedLogo(sharp, sourcePath);

const buffers = new Map();
for (const { name, size, fill, sharpen } of OUTPUTS) {
  const buf = await renderFaviconSquare(sharp, logoSharp, size, {
    fill,
    sharpen,
    bg: FAVICON_BG,
  });
  writeFileSync(join(outDir, name), buf);
  buffers.set(name, buf);
}

const ico = encodeIco([
  buffers.get('favicon-16x16.png'),
  buffers.get('favicon-32x32.png'),
  buffers.get('favicon-48x48.png'),
]);
writeFileSync(join(outDir, 'favicon.ico'), ico);

const manifest = {
  name: 'iFranchise',
  short_name: 'iFranchise',
  description: "India's Trusted Franchise Growth Platform",
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#0a0618',
  theme_color: '#0a0618',
  lang: 'en-IN',
  icons: [
    {
      src: `/favicon-48x48.png${vQuery}`,
      sizes: '48x48',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/favicon-32x32.png${vQuery}`,
      sizes: '32x32',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/android-chrome-192x192.png${vQuery}`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/android-chrome-512x512.png${vQuery}`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/android-chrome-512x512.png${vQuery}`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: `/apple-touch-icon.png${vQuery}`,
      sizes: '180x180',
      type: 'image/png',
      purpose: 'any',
    },
  ],
};

const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`;
writeFileSync(join(outDir, 'manifest.webmanifest'), manifestJson);
writeFileSync(join(outDir, 'manifest.json'), manifestJson);

patchIndexHtml();

console.log(
  `[favicon] Generated from ${sourcePath.replace(/.*[\\/]assets[\\/]/, 'assets/')} → public/ (${OUTPUTS.length} PNG + .ico, v=${ICON_VERSION})`,
);

function patchIndexHtml() {
  const indexPath = join(root, 'index.html');
  let html = readFileSync(indexPath, 'utf8');
  const v = ICON_VERSION;
  const site = 'https://www.ifranchise.in';

  const faviconBlock = `    <!-- Favicons: BrandNav → scripts/generate-favicons.mjs (Google prefers ≥48×48) -->
    <link rel="icon" type="image/png" href="/favicon-48x48.png?v=${v}" sizes="48x48" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico?v=${v}" sizes="any" />
    <link rel="icon" type="image/png" href="/favicon-32x32.png?v=${v}" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png?v=${v}" sizes="16x16" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=${v}" />
    <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png?v=${v}" />
    <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png?v=${v}" />
    <link rel="manifest" href="/manifest.webmanifest?v=${v}" />
    <link rel="manifest" href="/manifest.json?v=${v}" />`;

  html = html.replace(
    /    <!-- Favicons: BrandNav[\s\S]*?(?:<link rel="manifest" href="\/manifest\.json\?v=[^"]+" \/>\s*)?<link rel="manifest" href="\/manifest\.webmanifest\?v=[^"]+" \/>/,
    faviconBlock,
  );

  html = html.replace(
    /content="https:\/\/www\.ifranchise\.in\/apple-touch-icon\.png\?v=[^"]+"/g,
    `content="${site}/apple-touch-icon.png?v=${v}"`,
  );
  html = html.replace(
    /"url": "https:\/\/www\.ifranchise\.in\/android-chrome-512x512\.png\?v=[^"]+"/,
    `"url": "${site}/android-chrome-512x512.png?v=${v}"`,
  );

  writeFileSync(indexPath, html);
}
