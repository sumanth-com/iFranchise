export { SOURCES, pickSources } from './sources.js';
export { getBlogCitations } from './blogCitations.js';
export { getTopicCitations } from './topicCitations.js';

/** @typedef {import('./sources.js').Citation} Citation */

/**
 * @param {import('./sources.js').Citation[]} citations
 * @returns {object[] | undefined}
 */
export function citationsToSchema(citations) {
  if (!citations?.length) return undefined;
  return citations.map((c) => ({
    '@type': 'WebPage',
    name: c.title,
    url: c.url,
    publisher: {
      '@type': 'Organization',
      name: c.publisher,
    },
  }));
}
