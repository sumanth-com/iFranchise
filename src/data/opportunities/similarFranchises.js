import { franchiseDetailsById, getFranchiseDetailById } from './index.js';

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

  const candidates = Object.entries(franchiseDetailsById)
    .map(([id, detail]) => ({ id: String(id), ...detail }))
    .filter((item) => item.id !== String(currentId));

  return candidates
    .map((item) => ({ item, score: scoreSimilarity(current, item) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.name.localeCompare(b.item.name);
    })
    .slice(0, limit)
    .map(({ item }) => item);
}
