/**
 * Batch-optimizes src/assets images: WebP (+ AVIF for heroes), responsive widths, manifest.
 * Run: npm run images:optimize
 * Requires sharp (devDependency) or SHARP_MODULE_PATH to a folder with node_modules/sharp.
 */
import { createRequire } from 'node:module';
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { join, relative, dirname, basename, extname, parse as pathParse } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS_DIR = join(ROOT, 'src', 'assets');
const MANIFEST_PATH = join(ROOT, 'src', 'generated', 'images-manifest.json');

const SKIP_EXT = new Set(['.pdf', '.mp4', '.webm', '.svg', '.ico', '.webp', '.avif', '.gif']);
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.jfif', '.JPG', '.JPEG', '.PNG']);

/** Widths for responsive variants (largest first for srcset). */
const RESPONSIVE_WIDTHS = [1920, 1280, 1024, 768, 640, 480];
const HERO_FILES = new Set(['HomeHero.png', 'HomeHero2.png']);
/** Responsive widths are generated for hero LCP only (wired in heroAssets.js). */

function resolveSharp() {
  const require = createRequire(import.meta.url);
  const candidates = [
    process.env.SHARP_MODULE_PATH,
    join(ROOT, 'node_modules'),
    join(process.env.TEMP || '/tmp', 'ifr-sharp-tools', 'node_modules'),
  ].filter(Boolean);

  for (const base of candidates) {
    try {
      const mod = join(base, 'sharp');
      return require(mod);
    } catch {
      /* try next */
    }
  }
  throw new Error(
    'sharp not found. Run: npm install -D sharp  OR set SHARP_MODULE_PATH to node_modules parent',
  );
}

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

function pickWidths(metaWidth, _fileBytes, fileName) {
  if (!HERO_FILES.has(fileName)) return [];
  return RESPONSIVE_WIDTHS.filter((w) => w <= Math.max(metaWidth, 1920));
}

async function optimizeFile(sharp, filePath, manifest) {
  const ext = extname(filePath);
  if (SKIP_EXT.has(ext.toLowerCase()) && !IMAGE_EXT.has(ext)) return;
  if (!IMAGE_EXT.has(ext) && !['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
    if (!IMAGE_EXT.has(ext)) return;
  }

  const rel = relative(ASSETS_DIR, filePath).replace(/\\/g, '/');
  const { name: baseName } = pathParse(filePath);
  const fileName = basename(filePath);
  const outDir = dirname(filePath);

  let input;
  try {
    input = sharp(filePath, { failOn: 'none' });
    const meta = await input.metadata();
    if (!meta.width) return;

    const fileStat = await stat(filePath);
    const widths = pickWidths(meta.width, fileStat.size, fileName);

    const entry = {
      original: rel,
      width: meta.width,
      height: meta.height,
      webp: null,
      avif: null,
      variants: {},
    };

    const maxW = Math.min(meta.width, HERO_FILES.has(fileName) ? 1920 : 1600);
    const mainWebpPath = join(outDir, `${baseName}.webp`);

    await sharp(filePath)
      .resize(maxW, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 86, effort: 4, smartSubsample: true })
      .toFile(mainWebpPath);

    entry.webp = relative(ASSETS_DIR, mainWebpPath).replace(/\\/g, '/');

    if (HERO_FILES.has(fileName)) {
      const avifPath = join(outDir, `${baseName}.avif`);
      await sharp(filePath)
        .resize(maxW, null, { withoutEnlargement: true, fit: 'inside' })
        .avif({ quality: 62, effort: 4 })
        .toFile(avifPath);
      entry.avif = relative(ASSETS_DIR, avifPath).replace(/\\/g, '/');
    }

    for (const w of widths) {
      const targetW = Math.min(w, meta.width);
      const variantPath = join(outDir, `${baseName}-${targetW}w.webp`);
      await sharp(filePath)
        .resize(targetW, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 84, effort: 4, smartSubsample: true })
        .toFile(variantPath);
      entry.variants[targetW] = relative(ASSETS_DIR, variantPath).replace(/\\/g, '/');
    }

    manifest[rel] = entry;
    const newSize = (await stat(mainWebpPath)).size;
    console.log(
      `✓ ${rel} → ${entry.webp} (${Math.round(fileStat.size / 1024)}KB → ${Math.round(newSize / 1024)}KB)`,
    );
  } catch (err) {
    console.warn(`⚠ skip ${rel}: ${err.message}`);
  }
}

async function main() {
  const sharp = resolveSharp();
  await mkdir(join(ROOT, 'src', 'generated'), { recursive: true });

  const allFiles = await walk(ASSETS_DIR);
  const manifest = {};

  console.log(`Optimizing images in ${ASSETS_DIR}…\n`);

  for (const file of allFiles.sort()) {
    await optimizeFile(sharp, file, manifest);
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\nManifest: ${relative(ROOT, MANIFEST_PATH)} (${Object.keys(manifest).length} images)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
