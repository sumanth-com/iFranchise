import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'hero');
const ASSETS = join(ROOT, 'src', 'assets');

await mkdir(OUT, { recursive: true });

const copies = [
  ['HerodarkM.png', 'lcp-dark-m.png'],
  ['HerolightM.png', 'lcp-light-m.png'],
  ['HerodarkD.png', 'lcp-dark-d.png'],
  ['HerolightD.png', 'lcp-light-d.png'],
];

for (const [src, dest] of copies) {
  await copyFile(join(ASSETS, src), join(OUT, dest));
}

console.log('Copied mobile + desktop LCP hero images to public/hero/');
