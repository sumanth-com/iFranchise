import { franchiseDetailsById, getFranchiseDetailById } from './index.js';

/** Always shown 2nd in "Explore Similar Opportunities" (after the top match). */
const PRIORITY_SIMILAR_SLUG = 'original-burger-co';
const PRIORITY_SIMILAR_INDEX = 1;

function normalizeIndustry(industry = '') {
  const t = String(industry).toLowerCase();
  if (t.includes('food') || t.includes('beverage') || t.includes('f&b') || t.includes('qsr')) {
    return 'food';
  }
  if (t.includes('retail') || t.includes('apparel') || t.includes('fashion')) return 'retail';
  if (t.includes('health') || t.includes('wellness')) return 'wellness';
  if (t.includes('education')) return 'education';
  if (t.includes('technology')) return 'technology';
  if (t.includes('entertainment')) return 'entertainment';
  if (t.includes('home')) return 'home';
  return t.trim() || 'other';
}

function primaryModel(franchise) {
  return franchise?.franchiseModels?.[0]?.name?.toUpperCase?.() || '';
}

function scoreSimilarity(current, candidate) {
  let score = 0;

  if (normalizeIndustry(candidate.industry) === normalizeIndustry(current.industry)) {
    score += 12;
  }

  const currentModel = primaryModel(current);
  const candidateModel = primaryModel(candidate);
  if (currentModel && candidateModel) {
    if (currentModel === candidateModel) score += 6;
    else if (currentModel.includes('FO') && candidateModel.includes('FO')) score += 2;
  }

  if (candidate.badge?.toLowerCase?.().includes('premium')) score += 1;

  return score;
}

/**
 * Similar listings for franchise detail page (excludes current; sorted by relevance).
 * @param {string|number} currentId
 * @param {number} [limit=3]
 */
export function getSimilarFranchiseDetails(currentId, limit = 3) {
  const current = getFranchiseDetailById(currentId);
  if (!current) return [];

  const currentIdStr = String(currentId);
  const viewingPriorityBrand = current.slug === PRIORITY_SIMILAR_SLUG;

  const candidates = Object.entries(franchiseDetailsById)
    .map(([id, detail]) => ({ id: String(id), ...detail }))
    .filter((item) => item.id !== currentIdStr);

  const ranked = candidates
    .map((item) => ({ item, score: scoreSimilarity(current, item) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.name.localeCompare(b.item.name);
    })
    .map(({ item }) => item);

  if (viewingPriorityBrand) {
    return ranked.slice(0, limit);
  }

  const priorityBrand = ranked.find((item) => item.slug === PRIORITY_SIMILAR_SLUG);
  if (!priorityBrand) {
    return ranked.slice(0, limit);
  }

  const rest = ranked.filter((item) => item.slug !== PRIORITY_SIMILAR_SLUG);
  const result = [];

  for (let i = 0; i < limit; i += 1) {
    if (i === PRIORITY_SIMILAR_INDEX) {
      result.push(priorityBrand);
    } else {
      const next = rest.shift();
      if (next) result.push(next);
    }
  }

  return result;
}
