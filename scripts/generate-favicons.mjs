/**
 * Sync public/favicon.ico from src/assets/favicon.ico and generate PNG/PWA sizes
 * from BrandNav-192w.webp (matches navbar logo for Google Search).
 */
import { copyFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

function resolveSharp() {
  for (const base of [
    join(root, 'node_modules'),
    join(process.env.TEMP || '/tmp', 'ifr-sharp-tools', 'node_modules'),
  ]) {
    try {
      return require(join(base, 'sharp'));
    } catch {
      /* try next */
    }
  }
  throw new Error('sharp not found — run npm install');
}

const sourceIco = join(root, 'src', 'assets', 'favicon.ico');
const sourceLogo = join(root, 'src', 'assets', 'BrandNav-192w.webp');
const outDir = join(root, 'public');

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'favicon.png', size: 512 },
];

if (!existsSync(sourceIco)) {
  console.warn('[favicon] src/assets/favicon.ico missing — skip');
  process.exit(0);
}

copyFileSync(sourceIco, join(outDir, 'favicon.ico'));

if (!existsSync(sourceLogo)) {
  console.warn('[favicon] BrandNav-192w.webp missing — only favicon.ico copied');
  process.exit(0);
}

const sharp = resolveSharp();

await Promise.all(
  SIZES.map(({ name, size }) =>
    sharp(sourceLogo)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(outDir, name)),
  ),
);

console.log(`[favicon] Synced favicon.ico + ${SIZES.length} PNG sizes from BrandNav logo`);
