/** Rebuild images-manifest.json from current src/assets (WebP inventory). */
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const OUT = join(ROOT, 'src', 'generated', 'images-manifest.json');

async function walk(dir, files = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, files);
    else files.push(p);
  }
  return files;
}

const manifest = {};
for (const f of await walk(ASSETS)) {
  if (!f.endsWith('.webp') && !f.endsWith('.avif')) continue;
  const rel = relative(ASSETS, f).replace(/\\/g, '/');
  const base = rel.replace(/-\d+w\.(webp|avif)$/, '').replace(/\.(webp|avif)$/, '');
  if (!manifest[base]) manifest[base] = { webp: null, avif: null, variants: {} };
  const m = manifest[base];
  const wMatch = rel.match(/-(\d+)w\.webp$/);
  if (wMatch) m.variants[wMatch[1]] = rel;
  else if (rel.endsWith('.avif')) m.avif = rel;
  else m.webp = rel;
}

await mkdir(join(ROOT, 'src', 'generated'), { recursive: true });
await writeFile(OUT, JSON.stringify(manifest, null, 2));
console.log('Wrote', OUT, `(${Object.keys(manifest).length} entries)`);
