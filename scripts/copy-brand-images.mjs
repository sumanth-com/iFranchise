/**
 * Copy brand logos/gallery from src/assets → public/brands/{slug}/ with SEO-friendly filenames.
 * PNG/JPG sources are converted to WebP on copy.
 * Example: /brands/odette/odette-franchise-logo.webp
 */
import { createRequire } from 'node:module';
import { copyFile, mkdir, readdir, stat, unlink } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import {
  BRAND_ASSET_MANIFEST,
  resolveBrandPublicPaths,
} from '../src/data/opportunities/brandAssetManifest.js';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const OUT_ROOT = join(ROOT, 'public', 'brands');

function resolveSharp() {
  const candidates = [
    process.env.SHARP_MODULE_PATH,
    join(ROOT, 'node_modules'),
    join(process.env.TEMP || '/tmp', 'ifr-sharp-tools', 'node_modules'),
  ].filter(Boolean);

  for (const base of candidates) {
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

function sourceExt(assetPath) {
  const m = assetPath.match(/\.([a-z0-9]+)$/i);
  return (m?.[1] || '').toLowerCase();
}

function shouldConvertToWebp(assetPath) {
  return ['png', 'jpg', 'jpeg', 'jfif'].includes(sourceExt(assetPath));
}

/** Prefer an existing WebP sibling when manifest still points at PNG/JPG. */
function resolveAssetSource(assetPath) {
  const primary = join(ASSETS, assetPath);
  if (existsSync(primary)) return primary;

  const webpSibling = assetPath.replace(/\.(png|jpe?g|jfif)$/i, '.webp');
  if (webpSibling !== assetPath) {
    const alt = join(ASSETS, webpSibling);
    if (existsSync(alt)) return alt;
  }

  return primary;
}

async function writeBrandImage(sharp, assetPath, destPath) {
  const srcPath = resolveAssetSource(assetPath);
  if (!existsSync(srcPath)) {
    throw new Error(`Missing brand asset: ${assetPath} (expected at ${srcPath})`);
  }

  const destIsWebp = destPath.toLowerCase().endsWith('.webp');
  const srcIsRaster = shouldConvertToWebp(assetPath) || shouldConvertToWebp(srcPath);

  if (destIsWebp && srcIsRaster && sharp) {
    await sharp(srcPath)
      .resize(1600, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 86, effort: 4, smartSubsample: true })
      .toFile(destPath);
    return;
  }

  await copyFile(srcPath, destPath);
}

async function assertValidOutput(filePath) {
  const info = await stat(filePath);
  if (!info.isFile() || info.size < 512) {
    throw new Error(`Invalid brand image output (missing or too small): ${filePath}`);
  }
}

async function cleanupStaleBrandOutputs(outDir, keepFiles) {
  const keep = new Set(keepFiles);
  const entries = await readdir(outDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && !keep.has(entry.name))
      .filter((entry) => /\.(png|jpe?g|jfif|webp|avif)$/i.test(entry.name))
      .map((entry) => unlink(join(outDir, entry.name))),
  );
}

let copied = 0;
const sharp = resolveSharp();

for (const entry of BRAND_ASSET_MANIFEST) {
  const outDir = join(OUT_ROOT, entry.slug);
  await mkdir(outDir, { recursive: true });

  const paths = resolveBrandPublicPaths(entry);
  const written = [];

  const logoFile = paths.logo.split('/').pop();
  const logoDest = join(outDir, logoFile);
  await writeBrandImage(sharp, entry.logoSrc, logoDest);
  await assertValidOutput(logoDest);
  written.push(logoFile);
  copied += 1;

  for (let i = 0; i < entry.gallerySrc.length; i += 1) {
    const destFile = paths.gallery[i].split('/').pop();
    const destPath = join(outDir, destFile);
    await writeBrandImage(sharp, entry.gallerySrc[i], destPath);
    await assertValidOutput(destPath);
    written.push(destFile);
    copied += 1;
  }

  for (let groupIndex = 0; groupIndex < (entry.galleryGroups || []).length; groupIndex += 1) {
    const group = entry.galleryGroups[groupIndex];
    const outputGroup = paths.galleryGroups[groupIndex];
    for (let imageIndex = 0; imageIndex < group.gallerySrc.length; imageIndex += 1) {
      const destFile = outputGroup.images[imageIndex].split('/').pop();
      const destPath = join(outDir, destFile);
      await writeBrandImage(sharp, group.gallerySrc[imageIndex], destPath);
      await assertValidOutput(destPath);
      written.push(destFile);
      copied += 1;
    }
  }

  await cleanupStaleBrandOutputs(outDir, written);
}

console.log(
  `[brands] Copied ${copied} images to public/brands/ (${BRAND_ASSET_MANIFEST.length} franchises, SEO filenames${sharp ? ', WebP conversion enabled' : ''})`,
);
