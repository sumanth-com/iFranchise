#!/usr/bin/env node
/**
 * Emit sample @graph JSON-LD per route for validator.schema.org (paste test).
 * Usage: node scripts/validate-schema-samples.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.schema-samples');

process.env.VITE_SITE_URL = 'https://www.ifranchise.in';

const { buildSchemasForRoute } = await import('../src/seo/structuredData.js');
const { buildSchemaGraphDocument } = await import('../src/seo/schema/sanitize.js');
const { resolvePageSeo } = await import('../src/seo/resolvePageSeo.js');
const { getFranchiseBySlug } = await import('../src/data/franchiseData.js');
const { getBlogBySlug } = await import('../src/components/blogData.js');

const samples = [
  { name: 'home', seo: resolvePageSeo('/', { pathname: '/', search: '' }), context: {} },
  {
    name: 'franchise-kasturi',
    seo: resolvePageSeo('/franchise-details', {
      pathname: '/franchise/kasturi-creations',
      search: '',
    }),
    context: (() => {
      const b = getFranchiseBySlug('kasturi-creations');
      return b ? { franchise: b.listing, franchiseDetail: b.detail } : {};
    })(),
  },
  {
    name: 'blog',
    seo: resolvePageSeo('/blog-detail', {
      pathname: '/blogs/how-to-evaluate-franchise-opportunity-india',
      search: '',
    }),
    context: { blogPost: getBlogBySlug('how-to-evaluate-franchise-opportunity-india') },
  },
];

mkdirSync(outDir, { recursive: true });

for (const { name, seo, context } of samples) {
  const schemas = buildSchemasForRoute(seo, context);
  const doc = buildSchemaGraphDocument(schemas);
  const json = JSON.stringify(doc, null, 2);
  JSON.parse(json);
  const path = join(outDir, `${name}.json`);
  writeFileSync(path, json, 'utf8');
  console.log(`OK ${name} → ${path} (${schemas.length} nodes)`);
}

console.log('\nPaste any file into https://validator.schema.org/ (Code snippet tab).');
