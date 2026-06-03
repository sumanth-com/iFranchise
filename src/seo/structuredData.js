/**
 * Structured data (JSON-LD) — re-exports from schema modules.
 * @see src/seo/schema/routeSchemas.js
 */

export { buildSchemasForRoute } from './schema/routeSchemas.js';
export {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildBlogPostingSchema,
} from './schema/builders.js';
