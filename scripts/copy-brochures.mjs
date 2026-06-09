import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const OUT = join(ROOT, 'public', 'brochures');

/** slug → source path under src/assets */
const BROCHURES = [
  ['odette.pdf', 'ODETTE/ODETTE.pdf'],
  ['original-burger-co.pdf', 'Original Burger co/Original Burger Co. Brand Presentation.pdf'],
  ['franco.pdf', 'Franco/Franco.pdf'],
  ['biggies-burger.pdf', 'BIGGIES BURGER/Biggies Brand Presentation.pdf'],
  ['bigguys.pdf', 'BIGGUYS/BIGGUYS Brand.pdf'],
  ['brand-avenue.pdf', 'Brand AVENUE/avenue.pdf'],
  ['lassi-n-cafe.pdf', 'Lassi N Cafe/Lassi n Cafe.pdf'],
  ['fusion-pizza-big-burger.pdf', 'Fusion pizza and Big burger/TFP & BBC franchise.pdf'],
  ['10-downing-street.pdf', '10 Downing Street/10 Downing Street.pdf'],
  ['kasturi-creations.pdf', 'kasturi/kasturi pdf.pdf'],
  ['freshco-goli-soda.pdf', 'Freshco/Freshco Brochure.pdf'],
];

await mkdir(OUT, { recursive: true });
await Promise.all(
  BROCHURES.map(([dest, src]) =>
    copyFile(join(ASSETS, src), join(OUT, dest)),
  ),
);
console.log(`Copied ${BROCHURES.length} brochure PDFs to public/brochures/`);
