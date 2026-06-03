/**
 * Copy brand logos/gallery from src/assets → public/brands/{slug}/ with SEO-friendly filenames.
 * Example: /brands/odette/odette-franchise-logo.webp
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND_ASSET_MANIFEST,
  resolveBrandPublicPaths,
} from '../src/data/opportunities/brandAssetManifest.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const OUT_ROOT = join(ROOT, 'public', 'brands');

let copied = 0;

for (const entry of BRAND_ASSET_MANIFEST) {
  const outDir = join(OUT_ROOT, entry.slug);
  await mkdir(outDir, { recursive: true });

  const paths = resolveBrandPublicPaths(entry);
  const logoFile = paths.logo.split('/').pop();
  await copyFile(join(ASSETS, entry.logoSrc), join(outDir, logoFile));
  copied += 1;

  for (let i = 0; i < entry.gallerySrc.length; i += 1) {
    const destFile = paths.gallery[i].split('/').pop();
    await copyFile(join(ASSETS, entry.gallerySrc[i]), join(outDir, destFile));
    copied += 1;
  }
}

console.log(
  `[brands] Copied ${copied} images to public/brands/ (${BRAND_ASSET_MANIFEST.length} franchises, SEO filenames)`,
);
