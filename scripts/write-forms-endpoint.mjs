/**
 * Writes public/forms-endpoint.json for production (Vercel) when Vite env
 * is inlined at build time and as a runtime fallback. Run before dev and build.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = loadEnv(mode, ROOT, '');
const endpointPath = resolve(ROOT, 'public/forms-endpoint.json');
const envUrl = (env.VITE_GOOGLE_APPS_SCRIPT_URL || '').trim();

let existingUrl = '';
if (existsSync(endpointPath)) {
  try {
    existingUrl = JSON.parse(readFileSync(endpointPath, 'utf8')).url?.trim() || '';
  } catch {
    existingUrl = '';
  }
}

// Preview deployments may not expose production environment variables. Keep the
// committed runtime fallback instead of replacing it with an empty URL.
const url = envUrl || existingUrl;

writeFileSync(
  endpointPath,
  `${JSON.stringify({ url, updatedAt: new Date().toISOString() }, null, 2)}\n`,
  'utf8',
);

if (url) {
  console.log(
    envUrl
      ? '[forms] Wrote public/forms-endpoint.json from environment'
      : '[forms] Preserved public/forms-endpoint.json runtime fallback',
  );
} else {
  console.warn(
    '[forms] WARNING: VITE_GOOGLE_APPS_SCRIPT_URL is empty — live form submissions will fail until this is set in .env or Vercel build env.',
  );
}
