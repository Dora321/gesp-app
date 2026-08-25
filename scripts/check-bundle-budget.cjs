const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const manifestPath = path.join(distDir, '.vite', 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  throw new Error('Missing dist/.vite/manifest.json. Run npm run build first.');
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const failures = [];

const metricCache = new Map();
const getMetrics = relativePath => {
  if (metricCache.has(relativePath)) return metricCache.get(relativePath);
  const filePath = path.join(distDir, relativePath);
  const content = fs.readFileSync(filePath);
  const metrics = { raw: content.byteLength, gzip: zlib.gzipSync(content, { level: 9 }).byteLength };
  metricCache.set(relativePath, metrics);
  return metrics;
};

const collectStaticAssets = (manifestKey, collected = new Set(), visited = new Set()) => {
  if (!manifestKey || visited.has(manifestKey)) return collected;
  visited.add(manifestKey);
  const chunk = manifest[manifestKey];
  if (!chunk) throw new Error(`Manifest entry not found: ${manifestKey}`);
  if (chunk.file) collected.add(chunk.file);
  for (const css of chunk.css || []) collected.add(css);
  for (const importedKey of chunk.imports || []) collectStaticAssets(importedKey, collected, visited);
  return collected;
};

const difference = (set, excluded) => new Set([...set].filter(item => !excluded.has(item)));
const totalMetrics = assets => [...assets].reduce((total, asset) => {
  const metrics = getMetrics(asset);
  total.raw += metrics.raw;
  total.gzip += metrics.gzip;
  return total;
}, { raw: 0, gzip: 0 });
const kb = bytes => `${(bytes / 1024).toFixed(1)}KB`;

const assertBudget = (label, assets, limits) => {
  const metrics = totalMetrics(assets);
  console.log(`${label}: ${kb(metrics.raw)} raw / ${kb(metrics.gzip)} gzip`);
  if (metrics.raw > limits.raw) failures.push(`${label} raw ${kb(metrics.raw)} > ${kb(limits.raw)}`);
  if (metrics.gzip > limits.gzip) failures.push(`${label} gzip ${kb(metrics.gzip)} > ${kb(limits.gzip)}`);
};

const findKey = (predicate, label) => {
  const entry = Object.entries(manifest).find(([key, value]) => predicate(value, key));
  if (!entry) throw new Error(`Required bundle entry is missing from the Vite manifest: ${label}`);
  return entry[0];
};

const entryKey = findKey(value => value.isEntry, 'entry');
const mathKey = findKey(value => value.src === 'src/components/MathMarkdownContent.jsx', 'MathMarkdownContent');
const museumKey = findKey(value => value.src === 'src/pages/ComputingMuseum.jsx', 'ComputingMuseum');
const luoguKey = findKey(value => value.src === 'src/data/gesp/luoguCodingByLevel.js', 'luoguCodingByLevel');

const entryAssets = collectStaticAssets(entryKey);
const mathAssets = collectStaticAssets(mathKey);
const manifestJsAssets = new Set(
  Object.values(manifest)
    .map(value => value.file)
    .filter(file => file && file.endsWith('.js'))
);

assertBudget('Initial app graph', entryAssets, { raw: 550 * 1024, gzip: 116 * 1024 });

// The markdown/katex families must stay off the first-paint path and must not
// grow unbounded. Measuring the shipped bytes directly (rather than the size of
// one specific shared chunk) keeps this budget meaningful even when Rollup
// regroups chunks — the earlier version asserted on a `MarkdownRenderer` shared
// chunk that silently stopped existing when imports shifted.
const MARKDOWN_RUNTIME_SIGNATURES = ['react-markdown', 'micromark', 'remark-gfm', 'remarkGfm'];
const containsMarkdownRuntime = relativePath => {
  const text = fs.readFileSync(path.join(distDir, relativePath), 'utf8');
  return MARKDOWN_RUNTIME_SIGNATURES.some(signature => text.includes(signature));
};

const firstPaintMarkdown = [...entryAssets].filter(asset => asset.endsWith('.js') && containsMarkdownRuntime(asset));
if (firstPaintMarkdown.length > 0) {
  failures.push(`Markdown runtime leaked onto the first-paint path: ${firstPaintMarkdown.join(', ')}`);
}

const markdownAssets = new Set(
  [...manifestJsAssets]
    .filter(containsMarkdownRuntime)
);
assertBudget('Markdown runtime (all lazy chunks)', markdownAssets, { raw: 470 * 1024, gzip: 140 * 1024 });
assertBudget('On-demand math incremental graph', difference(mathAssets, entryAssets), { raw: 480 * 1024, gzip: 140 * 1024 });
assertBudget('Museum route chunk', new Set([manifest[museumKey].file]), { raw: 135 * 1024, gzip: 36 * 1024 });
assertBudget('Luogu question data chunk', new Set([manifest[luoguKey].file]), { raw: 190 * 1024, gzip: 52 * 1024 });

const globalCss = [...entryAssets].find(asset => asset.endsWith('.css'));
if (!globalCss) throw new Error('The initial app graph has no CSS asset.');
assertBudget('Global CSS', new Set([globalCss]), { raw: 290 * 1024, gzip: 35 * 1024 });

const mathFile = manifest[mathKey].file;
for (const relativePath of manifestJsAssets) {
  const limit = relativePath === mathFile ? 285 * 1024 : 235 * 1024;
  const { raw } = getMetrics(relativePath);
  if (raw > limit) failures.push(`${relativePath} raw ${kb(raw)} > ${kb(limit)}`);
}

if (failures.length > 0) {
  throw new Error(`Bundle budgets exceeded:\n- ${failures.join('\n- ')}`);
}

console.log('Bundle budgets passed.');
