/**
 * Removes unused assets, dev scratch files, and dead code helpers.
 * Keeps: imported .webp, hero responsive/avif, brochure PDFs.
 */
import { readFile, readdir, unlink, rm } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const SRC = join(ROOT, 'src');

const HERO_KEEP_RE = /^HomeHero2?(-\d+w)?\.(webp|avif)$/;

async function walk(dir, files = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, files);
    else files.push(p);
  }
  return files;
}

async function walkCode(dir, files = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'generated') await walkCode(p, files);
    else if (/\.(jsx?|tsx?)$/.test(e.name)) files.push(p);
  }
  return files;
}

let corpus = '';
for (const f of await walkCode(SRC)) {
  corpus += await readFile(f, 'utf8');
}

function isKeptAsset(filePath) {
  const name = basename(filePath);
  if (name.endsWith('.pdf')) return true;
  if (HERO_KEEP_RE.test(name)) return true;

  if (/\.(png|jpe?g|jfif|JPG|JPEG|PNG)$/i.test(name)) return false;
  if (/\.(mp4|webm)$/i.test(name)) return false;

  if (/-\d+w\.(webp|avif)$/i.test(name)) return false;

  if (!/\.(webp|avif)$/i.test(name)) return false;

  return corpus.includes(name);
}

const toDelete = [];
for (const f of await walk(ASSETS)) {
  if (!isKeptAsset(f)) toDelete.push(f);
}

for (const f of toDelete) {
  await unlink(f);
}

const deadFiles = [
  join(ROOT, 'fix-motion.js'),
  join(ROOT, 'test-modal.html'),
  join(ROOT, 'patch-dual-sections.txt'),
  join(SRC, 'hooks', 'useDeferredMount.js'),
  join(SRC, 'hooks', 'useHeroParallax.js'),
  join(ROOT, 'scripts', 'find-unused-assets.mjs'),
];

for (const f of deadFiles) {
  try {
    await unlink(f);
    console.log('removed', f.replace(ROOT, ''));
  } catch {
    /* missing ok */
  }
}

console.log(`\nRemoved ${toDelete.length} unused asset files.`);
