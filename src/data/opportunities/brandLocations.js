/**
 * Structured expansion locations by brand slug (detail page Locations tab).
 * @typedef {{ name: string, count: number, cities?: string[] }} BrandLocationItem
 * @typedef {{ model: string, items: BrandLocationItem[] }} BrandLocationGroup
 */

/** @type {Record<string, BrandLocationGroup[]>} */
export const BRAND_LOCATION_GROUPS = {
  'original-burger-co': [
    {
      model: 'FOFO',
      items: [
        {
          name: 'Gujarat',
          count: 8,
          cities: ['Surat', 'Ahmedabad', 'Vadodara'],
        },
        {
          name: 'Kerala',
          count: 8,
          cities: ['Kochi', 'Kozhikode', 'Thiruvananthapuram', 'Thrissur'],
        },
        {
          name: 'Rajasthan',
          count: 6,
          cities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
        },
        {
          name: 'Coimbatore & Ooty',
          count: 3,
          cities: ['Coimbatore', 'Ooty'],
        },
        {
          name: 'Indore & Bhopal',
          count: 3,
          cities: ['Indore', 'Bhopal'],
        },
        {
          name: 'North East',
          count: 6,
          cities: ['Guwahati', 'Shillong', 'Siliguri', 'Gangtok', 'Imphal'],
        },
        { name: 'Goa', count: 6 },
        {
          name: 'Punjab',
          count: 4,
          cities: ['Amritsar', 'Chandigarh', 'Jalandhar', 'Ludhiana'],
        },
      ],
    },
    {
      model: 'FICO',
      items: [
        { name: 'Bengaluru', count: 15 },
        { name: 'Chennai', count: 15 },
        { name: 'Hyderabad', count: 12 },
        { name: 'Kolkata', count: 10 },
        { name: 'Mumbai', count: 10 },
        { name: 'Pune', count: 10 },
        { name: 'Delhi NCR', count: 15 },
      ],
    },
  ],
};

/**
 * @param {string} slug
 * @returns {BrandLocationGroup[] | null}
 */
export function getBrandLocationGroups(slug) {
  if (!slug) return null;
  return BRAND_LOCATION_GROUPS[slug.toLowerCase()] ?? null;
}

/**
 * @param {BrandLocationGroup[]} groups
 * @returns {string[]}
 */
export function flattenLocationLabels(groups) {
  const labels = [];
  groups.forEach((group) => {
    group.items.forEach((item) => {
      if (item.cities?.length) {
        item.cities.forEach((city) => labels.push(city));
      } else {
        labels.push(item.name);
      }
    });
  });
  return labels;
}

/**
 * @param {BrandLocationGroup[]} groups
 * @returns {string[]}
 */
export function flattenLocationTags(groups) {
  return groups.flatMap((group) =>
    group.items.map((item) => {
      const placeWord = item.count === 1 ? 'place' : 'places';
      return item.cities?.length
        ? `${item.name} (${item.count} ${placeWord})`
        : `${item.name} (${item.count} ${placeWord})`;
    })
  );
}

/**
 * @param {BrandLocationGroup[]} groups
 */
export function getLocationGroupsSummary(groups) {
  const parts = groups.map((group) => {
    const total = group.items.reduce((sum, item) => sum + item.count, 0);
    return `${group.model} (${total} places)`;
  });
  return parts.join(' · ');
}
