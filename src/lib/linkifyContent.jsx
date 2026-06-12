import { navigateTo } from './navigation';

/**
 * Longest phrases first so partial tokens are not split incorrectly.
 * Plain-string answers in data files stay SEO-safe; linkify at render time only.
 */
const INTERNAL_LINK_RULES = [
  { pattern: /\bfranchise readiness assessment\b/gi, path: '/franchise-readiness-assessment' },
  { pattern: /\bverified franchise listings\b/gi, path: '/franchise-opportunities' },
  { pattern: /\bfranchise opportunities\b/gi, path: '/franchise-opportunities' },
  { pattern: /\blist on iFranchise\b/gi, path: '/list-your-brand' },
  { pattern: /\blist your brand\b/gi, path: '/list-your-brand' },
  { pattern: /\bknowledge hub\b/gi, path: '/resources/knowledge-hub' },
  { pattern: /\bfranchise consulting\b/gi, path: '/services' },
  { pattern: /\bFOFO\b/g, path: '/fofo-model' },
  { pattern: /\bFOCO\b/g, path: '/foco-model' },
  { pattern: /\bFICO\b/g, path: '/fico-model' },
];

let linkKey = 0;

function applyRule(parts, pattern, path) {
  const next = [];

  for (const part of parts) {
    if (typeof part !== 'string') {
      next.push(part);
      continue;
    }

    const re = new RegExp(pattern.source, pattern.flags);
    let lastIndex = 0;
    let match = re.exec(part);

    while (match) {
      if (match.index > lastIndex) {
        next.push(part.slice(lastIndex, match.index));
      }

      const label = match[0];
      next.push(
        <button
          key={`ifr-link-${linkKey++}`}
          type="button"
          className="internal-content-link"
          onClick={(e) => {
            e.stopPropagation();
            navigateTo(path);
          }}
        >
          {label}
        </button>,
      );

      lastIndex = match.index + label.length;
      match = re.exec(part);
    }

    if (lastIndex < part.length) {
      next.push(part.slice(lastIndex));
    }
  }

  return next;
}

/** @param {string} text */
export function linkifyContent(text) {
  if (!text || typeof text !== 'string') return text;

  let parts = [text];
  for (const { pattern, path } of INTERNAL_LINK_RULES) {
    parts = applyRule(parts, pattern, path);
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}
