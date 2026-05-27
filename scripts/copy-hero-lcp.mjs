import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'hero');

await mkdir(OUT, { recursive: true });
await copyFile(join(ROOT, 'src/assets/HomeHero-640w.webp'), join(OUT, 'lcp-dark.webp'));
await copyFile(join(ROOT, 'src/assets/HomeHero2-640w.webp'), join(OUT, 'lcp-light.webp'));
console.log('Copied mobile LCP hero images to public/hero/');
