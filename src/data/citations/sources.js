/**
 * Verified public sources for franchise research content (India).
 * Update URLs if a publisher changes paths; keep titles accurate for citations.
 *
 * @typedef {{ title: string, publisher: string, url: string }} Citation
 */

/** @type {Record<string, Citation>} */
export const SOURCES = {
  IBEF_RETAIL: {
    title: 'Retail Industry in India',
    publisher: 'India Brand Equity Foundation (IBEF)',
    url: 'https://www.ibef.org/industry/retail-india',
  },
  IBEF_FOOD: {
    title: 'Food Processing Industry in India',
    publisher: 'India Brand Equity Foundation (IBEF)',
    url: 'https://www.ibef.org/industry/food-processing-india',
  },
  INVEST_INDIA_RETAIL: {
    title: 'Retail Sector — Investment Opportunities',
    publisher: 'Invest India',
    url: 'https://www.investindia.gov.in/sector/retail',
  },
  DPIIT_HOME: {
    title: 'Department for Promotion of Industry and Internal Trade',
    publisher: 'Government of India (DPIIT)',
    url: 'https://dpiit.gov.in/',
  },
  MCA_HOME: {
    title: 'Ministry of Corporate Affairs — Company Law & Compliance',
    publisher: 'Government of India (MCA)',
    url: 'https://www.mca.gov.in/',
  },
  RBI_ANNUAL: {
    title: 'Reserve Bank of India — Publications & Reports',
    publisher: 'Reserve Bank of India',
    url: 'https://www.rbi.org.in/Scripts/Publications.aspx',
  },
  GST_PORTAL: {
    title: 'Goods and Services Tax — Official Portal',
    publisher: 'Government of India (GSTN)',
    url: 'https://www.gst.gov.in/',
  },
  FRANCHISE_INDIA_INSIGHTS: {
    title: 'Franchise Industry Insights',
    publisher: 'Franchise India',
    url: 'https://www.franchiseindia.com/insights/',
  },
  IBEF_MSME: {
    title: 'MSME Sector in India',
    publisher: 'India Brand Equity Foundation (IBEF)',
    url: 'https://www.ibef.org/industry/msme',
  },
  WORLD_BANK_INDIA: {
    title: 'India — Economic Overview',
    publisher: 'The World Bank',
    url: 'https://www.worldbank.org/en/country/india/overview',
  },
};

/** @param {string[]} keys @returns {Citation[]} */
export function pickSources(keys) {
  return keys.map((key) => SOURCES[key]).filter(Boolean);
}
