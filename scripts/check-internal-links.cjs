const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');

const routeRules = [
  /^\/$/,
  /^\/museum$/,
  /^\/question-bank$/,
  /^\/question-bank\/[^/]+\/[^/]+$/,
  /^\/lesson\/[1-6]\/([1-9]|1[0-6])$/,
  /^\/ekart(\/(roadmap|toolbox|gallery|parent-portal))?$/,
  /^\/hardware(\/esp32-ai|\/lesson\/([1-9]|1[0-6]))?$/,
  /^\/level[1-8]$/,
  /^\/python\/(f[1-7]|a[1-2]|file-ops|ai|crawler|binary-search|encryption|sorting|morse)$/,
  /^\/gesp\/2025-12-l2$/,
];

const checkedExtensions = new Set(['.js', '.jsx']);
const contextPattern = /navigate\s*\(|window\.location\.href\s*=|\b(path|route|linkPath|examPath|ctaPath)\s*:|\b(to|href)\s*=/;
const quotedPathPattern = /(['"`])(\/(?!\/)[^'"`\s<>{}]*)\1/g;
const ignoredFiles = new Set([
  path.join(srcRoot, 'components', 'LegacyLessonRedirect.jsx'),
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (checkedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function isKnownRoute(route) {
  return routeRules.some((rule) => rule.test(route));
}

function shouldSkip(route) {
  return (
    route.includes(':') ||
    route.includes('*') ||
    route.includes('${') ||
    /\.(avif|gif|jpg|jpeg|json|md|mp3|mp4|pdf|png|svg|webp)$/i.test(route)
  );
}

const failures = [];

for (const file of walk(srcRoot)) {
  if (ignoredFiles.has(file)) continue;

  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!contextPattern.test(line)) return;

    quotedPathPattern.lastIndex = 0;
    let match;
    while ((match = quotedPathPattern.exec(line)) !== null) {
      const route = match[2];
      if (shouldSkip(route)) continue;
      if (!isKnownRoute(route)) {
        failures.push({
          file: path.relative(repoRoot, file),
          line: index + 1,
          route,
        });
      }
    }
  });
}

if (failures.length > 0) {
  console.error('Found internal links that do not match the app route table:\n');
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} -> ${failure.route}`);
  }
  process.exit(1);
}

console.log('Internal route links look valid.');
