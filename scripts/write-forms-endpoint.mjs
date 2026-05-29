/**
 * Writes public/forms-endpoint.json for production (Vercel) when Vite env
 * is inlined at build time and as a runtime fallback. Run before dev and build.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = loadEnv(mode, ROOT, '');
const url = (env.VITE_GOOGLE_APPS_SCRIPT_URL || '').trim();

writeFileSync(
  resolve(ROOT, 'public/forms-endpoint.json'),
  `${JSON.stringify({ url, updatedAt: new Date().toISOString() }, null, 2)}\n`,
  'utf8',
);

if (url) {
  console.log('[forms] Wrote public/forms-endpoint.json');
} else {
  console.warn(
    '[forms] WARNING: VITE_GOOGLE_APPS_SCRIPT_URL is empty — live form submissions will fail until this is set in .env or Vercel build env.',
  );
}
