/**
 * Sync favicon assets into public/ before dev/build.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nodeScript = join(root, 'scripts', 'generate-favicons.mjs');
const psScript = join(root, 'scripts', 'generate-favicons.ps1');

function runNode() {
  return spawnSync(process.execPath, [nodeScript], { stdio: 'inherit', cwd: root });
}

function runPs() {
  return spawnSync(
    'powershell',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psScript],
    { stdio: 'inherit', cwd: root },
  );
}

const nodeResult = runNode();
if (nodeResult.status === 0) process.exit(0);

if (process.platform === 'win32' && existsSync(psScript)) {
  const psResult = runPs();
  process.exit(psResult.status ?? 1);
}

process.exit(nodeResult.status ?? 1);
