/**
 * Brochure PDFs live in public/brochures/ (copied at build via scripts/copy-brochures.mjs).
 * Static paths keep ~30MB of PDFs out of the JS module graph on first load.
 */

/** @type {Record<string, string>} */
export const BROCHURE_PDF_BY_SLUG = {
  odette: '/brochures/odette.pdf',
  'original-burger-co': '/brochures/original-burger-co.pdf',
  franco: '/brochures/franco.pdf',
  'biggies-burger': '/brochures/biggies-burger.pdf',
  bigguys: '/brochures/bigguys.pdf',
  'brand-avenue': '/brochures/brand-avenue.pdf',
  'lassi-n-cafe': '/brochures/lassi-n-cafe.pdf',
  'fusion-pizza-big-burger': '/brochures/fusion-pizza-big-burger.pdf',
  '10-downing-street': '/brochures/10-downing-street.pdf',
  'kasturi-creations': '/brochures/kasturi-creations.pdf',
  'freshco-goli-soda': '/brochures/freshco-goli-soda.pdf',
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
