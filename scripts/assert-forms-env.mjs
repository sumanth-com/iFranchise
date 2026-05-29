/**
 * Fail production builds when the Google Apps Script URL is missing.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const env = loadEnv('production', ROOT, '');
const fromEnv = (env.VITE_GOOGLE_APPS_SCRIPT_URL || '').trim();

let fromFile = '';
const endpointPath = resolve(ROOT, 'public/forms-endpoint.json');
if (existsSync(endpointPath)) {
  try {
    fromFile = JSON.parse(readFileSync(endpointPath, 'utf8')).url?.trim() || '';
  } catch {
    fromFile = '';
  }
}

const url = fromEnv || fromFile;

if (!url) {
  console.error(
    '\n[forms] BUILD ERROR: VITE_GOOGLE_APPS_SCRIPT_URL is not set.\n' +
      '  Vercel: Project → Settings → Environment Variables → add for Production + Preview → Redeploy.\n' +
      '  Local: copy .env.example to .env and set your Apps Script /exec URL.\n',
  );
  process.exit(1);
}

if (!url.includes('script.google.com/macros/s/')) {
  console.error('[forms] BUILD ERROR: VITE_GOOGLE_APPS_SCRIPT_URL is not a valid Apps Script web app URL.');
  process.exit(1);
}

console.log('[forms] Apps Script endpoint configured for build.');
