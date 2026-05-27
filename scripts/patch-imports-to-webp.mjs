/**
 * Rewrites static image imports in src/ to .webp when manifest entry exists.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = JSON.parse(
  await readFile(join(ROOT, 'src', 'generated', 'images-manifest.json'), 'utf8'),
);

const webpByOriginal = new Map();
for (const [orig, entry] of Object.entries(MANIFEST)) {
  if (entry.webp) {
    const origPath = orig.replace(/\\/g, '/');
    const webpPath = entry.webp.replace(/\\/g, '/');
    webpByOriginal.set(origPath, webpPath);
  }
}

async function walk(dir, out = []) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) await walk(p, out);
    else if (/\.(jsx?|tsx?)$/.test(name.name)) out.push(p);
  }
  return out;
}

function patchContent(text, filePath) {
  let changed = false;
  const next = text.replace(
    /from\s+(['"])([^'"]+\.(?:png|jpe?g|jfif|JPG|JPEG|PNG))\1/gi,
    (full, quote, importPath) => {
      const assetsIdx = importPath.indexOf('/assets/');
      if (assetsIdx === -1) return full;
      const rel = importPath.slice(assetsIdx + '/assets/'.length);
      const webp = webpByOriginal.get(rel);
      if (!webp) return full;
      const newPath = importPath.replace(/[^/]+$/, webp.split('/').pop());
      changed = true;
      return `from ${quote}${newPath}${quote}`;
    },
  );
  return { text: next, changed };
}

const srcDir = join(ROOT, 'src');
const files = await walk(srcDir);
let count = 0;

for (const file of files) {
  if (file.includes('generated')) continue;
  const raw = await readFile(file, 'utf8');
  const { text, changed } = patchContent(raw, file);
  if (changed) {
    await writeFile(file, text, 'utf8');
    count++;
    console.log('patched', file.replace(ROOT, ''));
  }
}

console.log(`Done: ${count} files`);
