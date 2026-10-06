/**
 * One-off helper: fetch / copy blog clothing brand images into src/assets/blog-clothing/
 * Run: node scripts/fetch-clothing-blog-images.mjs
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'assets', 'blog-clothing');
const PUBLIC = join(ROOT, 'public');

await mkdir(OUT, { recursive: true });

/** Copy Odette franchise gallery (licensed on-site asset). */
const odetteSrc = join(PUBLIC, 'brands', 'odette', 'odette-franchise-gallery-1.webp');
if (existsSync(odetteSrc)) {
  await copyFile(odetteSrc, join(OUT, 'odette.webp'));
  console.log('[blog-clothing] odette.webp ← on-site Odette gallery');
}

const py = spawnSync(
  process.platform === 'win32' ? 'python' : 'python3',
  [join(ROOT, 'scripts', 'fetch-clothing-blog-images.py')],
  { stdio: 'inherit', cwd: ROOT },
);

if (py.status !== 0) {
  process.exit(py.status ?? 1);
}
