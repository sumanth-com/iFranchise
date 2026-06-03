import { ORGANIZATION, SITE_URL, absoluteUrl } from '../config';

/**
 * @param {Array<{ id: string, data: object }>} schemas
 * @param {string} id
 * @param {object} data
 */
export function pushSchema(schemas, id, data) {
  if (!data) return;
  const index = schemas.findIndex((s) => s.id === id);
  const entry = { id, data };
  if (index >= 0) schemas[index] = entry;
  else schemas.push(entry);
}

/**
 * @param {{ name: string, path: string }[]} items
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * @param {{ question?: string, answer?: string, q?: string, a?: string }[]} faqs
 */
export function buildFaqPageSchema(faqs) {
  const mainEntity = (faqs || [])
    .map((item) => {
      const question = item.question || item.q;
      const answer = item.answer || item.a;
      if (!question || !answer) return null;
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      };
    })
    .filter(Boolean);

  if (!mainEntity.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export function toAbsoluteImageUrl(src) {
  if (!src) return ORGANIZATION.logo;
  if (typeof src !== 'string') return ORGANIZATION.logo;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return absoluteUrl(src.startsWith('/') ? src : `/${src}`);
}

export function organizationReference() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
  };
}

export function mapEmploymentType(roleType = '') {
  const normalized = String(roleType).toLowerCase();
  if (normalized.includes('intern')) return 'INTERN';
  if (normalized.includes('part')) return 'PART_TIME';
  if (normalized.includes('contract')) return 'CONTRACTOR';
  return 'FULL_TIME';
}

export function defaultJobValidThrough(monthsAhead = 6) {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAhead);
  return date.toISOString().split('T')[0];
}
