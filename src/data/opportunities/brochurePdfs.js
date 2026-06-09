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

/** e.g. /brochures/kasturi-creations.pdf → kasturi-creations.pdf */
export function getBrochureFilename(brochureUrl, slug = '') {
  const fromUrl = String(brochureUrl || '')
    .split('/')
    .pop()
    ?.split('?')[0]
    ?.trim();
  if (fromUrl && /\.pdf$/i.test(fromUrl)) return fromUrl;

  const safeSlug = String(slug || '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (safeSlug) return `${safeSlug}.pdf`;

  return 'franchise-brochure.pdf';
}

async function blobLooksLikePdf(blob) {
  if (!blob?.size) return false;
  if (blob.type && /pdf/i.test(blob.type)) return true;
  const header = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
  return String.fromCharCode(...header) === '%PDF';
}

function resolveBrochureUrl(brochureUrl) {
  if (!brochureUrl) return '';
  if (/^https?:\/\//i.test(brochureUrl)) return brochureUrl;
  return new URL(brochureUrl, window.location.origin).href;
}

function saveBlobAsFile(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

/** Fetch PDF as blob so the saved file uses the brand slug (not index.html.pdf). */
export async function triggerBrochureDownload(brochureUrl, slug = '') {
  if (!brochureUrl) return { ok: false, error: 'missing_url' };

  const filename = getBrochureFilename(brochureUrl, slug);
  const absoluteUrl = resolveBrochureUrl(brochureUrl);

  try {
    const res = await fetch(absoluteUrl, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const blob = await res.blob();
    if (!(await blobLooksLikePdf(blob))) {
      throw new Error('not_pdf');
    }

    saveBlobAsFile(blob, filename);
    return { ok: true, filename };
  } catch {
    window.open(absoluteUrl, '_blank', 'noopener,noreferrer');
    return { ok: false, error: 'fallback_open', filename };
  }
}
