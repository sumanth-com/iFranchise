/** Generate small UI image variants (navbar, logos). */
import { createRequire } from 'node:module';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const require = createRequire(import.meta.url);

function resolveSharp() {
  for (const base of [
    join(ROOT, 'node_modules'),
    join(process.env.TEMP || '/tmp', 'ifr-sharp-tools', 'node_modules'),
  ]) {
    try {
      return require(join(base, 'sharp'));
    } catch {
      /* next */
    }
  }
  throw new Error('sharp not found');
}

const UI_FILES = ['BrandNav.webp', 'BrandLogo.webp'];
const WIDTHS = [96, 192, 384];

const sharp = resolveSharp();

for (const file of UI_FILES) {
  const input = join(ASSETS, file);
  const base = basename(file, '.webp');
  for (const w of WIDTHS) {
    const out = join(ASSETS, `${base}-${w}w.webp`);
    await sharp(input)
      .resize(w, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 88, effort: 4 })
      .toFile(out);
    console.log('✓', `${base}-${w}w.webp`);
  }
}
