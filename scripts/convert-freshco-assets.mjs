/**
 * One-time / on-demand: convert Freshco PNG assets in src/assets/Freshco → WebP.
 * Run: node scripts/convert-freshco-assets.mjs
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const dir = join(root, 'src', 'assets', 'Freshco');

const CONVERSIONS = [
  ['Logo.png', 'Logo.webp'],
  ['1 (5).png', '6.webp'],
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
    spawnSync('npm', ['init', '-y'], { cwd: toolRoot, stdio: 'ignore', shell: true });
  }
  const install = spawnSync(
    'npm',
    ['install', 'sharp@0.34.5', '--no-save', '--no-audit', '--no-fund'],
    { cwd: toolRoot, stdio: 'pipe', shell: true },
  );
  if (install.status !== 0) return null;
  try {
    return require(join(toolRoot, 'node_modules', 'sharp'));
  } catch {
    return null;
  }
}

const sharp = resolveSharp();
if (!sharp) {
  console.error('[freshco] sharp not available — cannot convert assets');
  process.exit(1);
}

for (const [src, dest] of CONVERSIONS) {
  const input = join(dir, src);
  const output = join(dir, dest);
  if (!existsSync(input)) {
    console.warn(`[freshco] skip missing source: ${src}`);
    continue;
  }
  await sharp(input)
    .resize(1600, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 86, effort: 4, smartSubsample: true })
    .toFile(output);
  const { size } = await stat(output);
  console.log(`[freshco] ${src} → ${dest} (${Math.round(size / 1024)}KB)`);
}

console.log('[freshco] WebP assets ready in src/assets/Freshco/');
