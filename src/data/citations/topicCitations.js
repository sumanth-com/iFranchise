import { pickSources } from './sources.js';

/** @type {Record<string, Record<string, string[]>>} */
const TOPIC_CITATION_KEYS = {
  investor: {
    'how-to-choose-the-right-franchise': ['IBEF_RETAIL', 'FRANCHISE_INDIA_INSIGHTS', 'INVEST_INDIA_RETAIL'],
    'franchise-roi-guide': ['IBEF_RETAIL', 'RBI_ANNUAL', 'FRANCHISE_INDIA_INSIGHTS'],
    'due-diligence-checklist': ['MCA_HOME', 'DPIIT_HOME', 'FRANCHISE_INDIA_INSIGHTS'],
    'franchise-agreement-basics': ['MCA_HOME', 'GST_PORTAL', 'DPIIT_HOME'],
    'franchise-investment-risks': ['IBEF_RETAIL', 'RBI_ANNUAL', 'WORLD_BANK_INDIA'],
    'multi-unit-franchise-strategy': ['IBEF_RETAIL', 'FRANCHISE_INDIA_INSIGHTS', 'INVEST_INDIA_RETAIL'],
    'emerging-franchise-categories': ['IBEF_FOOD', 'IBEF_RETAIL', 'INVEST_INDIA_RETAIL'],
    'common-investor-mistakes': ['FRANCHISE_INDIA_INSIGHTS', 'IBEF_RETAIL', 'RBI_ANNUAL'],
  },
  brand: {
    'how-to-franchise-your-business': ['DPIIT_HOME', 'MCA_HOME', 'IBEF_MSME'],
    'franchise-expansion-strategy': ['IBEF_RETAIL', 'INVEST_INDIA_RETAIL', 'WORLD_BANK_INDIA'],
    'operations-manual-guide': ['IBEF_MSME', 'DPIIT_HOME', 'FRANCHISE_INDIA_INSIGHTS'],
    'territory-planning': ['IBEF_RETAIL', 'INVEST_INDIA_RETAIL', 'FRANCHISE_INDIA_INSIGHTS'],
    'franchise-recruitment': ['FRANCHISE_INDIA_INSIGHTS', 'INVEST_INDIA_RETAIL', 'IBEF_RETAIL'],
    'unit-economics': ['IBEF_RETAIL', 'RBI_ANNUAL', 'MCA_HOME'],
    'scaling-through-franchising': ['IBEF_MSME', 'INVEST_INDIA_RETAIL', 'DPIIT_HOME'],
    'franchise-sales-process': ['FRANCHISE_INDIA_INSIGHTS', 'IBEF_RETAIL', 'INVEST_INDIA_RETAIL'],
  },
};

/**
 * @param {'investor' | 'brand'} hub
 * @param {string} slug
 */
export function getTopicCitations(hub, slug) {
  const keys = TOPIC_CITATION_KEYS[hub]?.[slug];
  return keys ? pickSources(keys) : [];
}
