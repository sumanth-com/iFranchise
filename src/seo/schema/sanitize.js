/**
 * Normalize JSON-LD nodes so validator.schema.org and Google parse them reliably.
 */

/** Strip per-node @context (used when merging into @graph). */
export function stripSchemaContext(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return node;
  const { '@context': _ctx, ...rest } = node;
  return rest;
}

/**
 * Deep-clean a schema node before serialization.
 * @param {unknown} node
 * @returns {unknown}
 */
export function sanitizeSchemaNode(node) {
  if (node == null) return undefined;
  if (Array.isArray(node)) {
    return node.map(sanitizeSchemaNode).filter((v) => v !== undefined);
  }
  if (typeof node !== 'object') return node;

  const out = {};
  for (const [key, value] of Object.entries(node)) {
    if (value === undefined || value === null) continue;

    if (key === '@type' && Array.isArray(value)) {
      const types = value.map((t) => String(t || '').trim()).filter(Boolean);
      out[key] = types.length > 1 ? types : types[0] || 'Thing';
      continue;
    }

    const cleaned = sanitizeSchemaNode(value);
    if (cleaned !== undefined) {
      out[key] = cleaned;
    }
  }
  return out;
}

/**
 * @param {Array<{ id: string, data: object }>} schemas
 */
export function buildSchemaGraphDocument(schemas) {
  const graph = schemas
    .map(({ data }) => sanitizeSchemaNode(stripSchemaContext(data)))
    .filter(Boolean);

  if (!graph.length) return null;

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
