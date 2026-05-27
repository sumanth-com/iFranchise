/**
 * Local brochure PDFs under src/assets — keyed by brand slug (stable when listings change).
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
export const BROCHURE_PDF_BY_SLUG = {
  odette: odettePdf,
  'original-burger-co': originalBurgerPdf,
  franco: francoPdf,
  'biggies-burger': biggiesPdf,
  bigguys: bigguysPdf,
  'brand-avenue': brandAvenuePdf,
  'lassi-n-cafe': lassiPdf,
  'fusion-pizza-big-burger': fusionPdf,
  '10-downing-street': tenDowningPdf,
};

export function getBrochureUrlByFranchiseSlug(slug) {
  if (!slug) return '';
  return BROCHURE_PDF_BY_SLUG[String(slug).toLowerCase().trim()] || '';
}

/** @deprecated Prefer getBrochureUrlByFranchiseSlug */
export function getBrochureUrlByFranchiseId(id, slug) {
  return getBrochureUrlByFranchiseSlug(slug) || '';
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
