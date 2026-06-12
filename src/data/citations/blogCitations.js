import { pickSources } from './sources.js';

/** @type {Record<string, string[]>} */
const BLOG_CITATION_KEYS = {
  'how-to-evaluate-franchise-opportunity-india': [
    'IBEF_RETAIL',
    'INVEST_INDIA_RETAIL',
    'DPIIT_HOME',
    'FRANCHISE_INDIA_INSIGHTS',
  ],
  'fofo-vs-fico-franchise-model-guide': [
    'FRANCHISE_INDIA_INSIGHTS',
    'IBEF_RETAIL',
    'INVEST_INDIA_RETAIL',
  ],
  'franchise-unit-economics-checklist': [
    'IBEF_RETAIL',
    'RBI_ANNUAL',
    'MCA_HOME',
  ],
  'franchise-demand-india-2026': [
    'IBEF_RETAIL',
    'IBEF_FOOD',
    'WORLD_BANK_INDIA',
    'INVEST_INDIA_RETAIL',
  ],
};

/** @param {string} slug */
export function getBlogCitations(slug) {
  const keys = BLOG_CITATION_KEYS[slug];
  return keys ? pickSources(keys) : [];
}
