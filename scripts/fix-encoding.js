/**
 * Replace special Unicode / mojibake with ASCII-safe text across src.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(__dirname, '..', 'src');
const exts = new Set(['.jsx', '.js', '.css']);

const replacements = [
  ['\uFFFD', ' - '],
  ['\u00B7', ' - '],
  ['\u2014', ' - '],
  ['\u2013', '-'],
  ['\u20B9', 'Rs.'],
  ['\u2022', '-'],
  // Do not replace \u2192 or curly quotes globally — breaks JSX and 'week\'s' strings.
  ['\u00A0', ' '],
  // Common UTF-8 misread as Latin-1
  ['â‚¹', 'Rs.'],
  ['â€"', ' - '],
  ['â€"', ' - '],
  ['â€"', ' - '],
  ['â€¢', '-'],
  ['Â·', ' - '],
  ['Â°', ' deg'],
  ['Ã¢â‚¬â€œ', '-'],
  ['Ã¢â‚¬â€', ' - '],
  ['Ã¢â‚¬â„¢', "'"],
  ['Ã¢â‚¬Å"', '"'],
  ['Ã¢â‚¬', ' - '],
  ['â"€', '-'],
  ['─', '-'],
];

function normalizeSpacing(text) {
  return text
    .replace(/  -  /g, ' - ')
    .replace(/ -  /g, ' - ')
    .replace(/  - /g, ' - ');
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (exts.has(path.extname(name))) files.push(p);
  }
  return files;
}

let fileCount = 0;
let totalReplacements = 0;

for (const file of walk(srcRoot)) {
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      const parts = content.split(from);
      totalReplacements += parts.length - 1;
      content = parts.join(to);
    }
  }
  content = normalizeSpacing(content);
  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    fileCount++;
    console.log('Fixed:', path.relative(srcRoot, file));
  }
}

console.log(`Done. ${fileCount} files updated, ~${totalReplacements} replacements.`);
