/**
 * Copy site UI images from src/assets → public/images/ (readable URLs, no Vite hashes).
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_IMAGE_MANIFEST } from '../src/data/siteImageManifest.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const OUT = join(ROOT, 'public', 'images');

let copied = 0;

for (const { dest, src } of SITE_IMAGE_MANIFEST) {
  const outPath = join(OUT, dest);
  await mkdir(dirname(outPath), { recursive: true });
  await copyFile(join(ASSETS, src), outPath);
  copied += 1;
}

console.log(`[images] Copied ${copied} files to public/images/ (SEO-friendly URLs)`);
