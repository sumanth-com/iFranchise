/**
 * Local brochure PDFs under src/assets — keyed by franchise listing id (rawBrands order).
 */
import odettePdf from '../../assets/ODETTE/ODETTE.pdf';
import originalBurgerPdf from '../../assets/Original Burger co/Original Burger Co. Brand Presentation.pdf';
import francoPdf from '../../assets/Franco/Franco.pdf';
import biggiesPdf from '../../assets/BIGGIES BURGER/Biggies Brand Presentation.pdf';
import bigguysPdf from '../../assets/BIGGUYS/BIGGUYS Brand.pdf';
import brandAvenuePdf from '../../assets/Brand AVENUE/avenue.pdf';
import lassiPdf from '../../assets/Lassi N Cafe/Lassi n Cafe.pdf';
import fusionPdf from '../../assets/Fusion pizza and Big burger/TFP & BBC franchise.pdf';
import tenDowningPdf from '../../assets/10 Downing Street/10 Downing Street.pdf';

/** @type {Record<string, string>} */
export const BROCHURE_PDF_BY_FRANCHISE_ID = {
  '1': odettePdf,
  '2': originalBurgerPdf,
  '3': francoPdf,
  '4': biggiesPdf,
  '5': bigguysPdf,
  '6': brandAvenuePdf,
  '7': lassiPdf,
  '8': fusionPdf,
  // '9' kasturi — no PDF in assets yet
  '10': tenDowningPdf,
};

export function getBrochureUrlByFranchiseId(id) {
  return BROCHURE_PDF_BY_FRANCHISE_ID[String(id)] || '';
}

export function getBrochureFilename(brandName) {
  const safe = String(brandName || 'franchise')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `${safe || 'franchise'}-brochure.pdf`;
}

export function triggerBrochureDownload(brochureUrl, brandName) {
  if (!brochureUrl) return;
  const link = document.createElement('a');
  link.href = brochureUrl;
  link.download = getBrochureFilename(brandName);
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
