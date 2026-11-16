import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizePathname, SITE_ORIGIN } from '../src/seo/routeMeta.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cases = [
  {
    file: 'dist/hardware/arduino/index.html',
    title: 'Arduino UNO 零基础课程 · 16 节网页课',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/arduino/',
  },
  {
    file: 'dist/hardware/arduino/16/index.html',
    title: 'Arduino UNO · 第 16 课 · 智能垃圾桶 · 下',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/arduino/16/',
  },
  {
    file: 'dist/hardware/esp32/16.5/index.html',
    title: '高阶科创 · 第 16.5 课 · 联网预备包',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/esp32/16.5/',
  },
  {
    file: 'dist/hardware/esp32/23/index.html',
    title: '高阶科创 · 第 23 课 · 智能家居模块上',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/esp32/23/',
  },
  {
    file: 'dist/innovation-foundation/index.html',
    title: '初阶科创 · 15 节探究课',
    canonical: 'https://Dora321.github.io/gesp-app/innovation-foundation/',
  },
  {
    file: 'dist/innovation-foundation/15/index.html',
    title: '初阶科创 · 第 15 课 · 小型发电站下',
    canonical: 'https://Dora321.github.io/gesp-app/innovation-foundation/15/',
  },
  {
    file: 'dist/hardware/esp32/10/index.html',
    title: '高阶科创 · 第 10 课 · 需求文档大挑战',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/esp32/10/',
  },
  {
    file: 'dist/question-bank/2/2026-03-l2/index.html',
    title: '2026年3月 GESP C++ 2级真题',
    canonical: 'https://Dora321.github.io/gesp-app/question-bank/2/2026-03-l2/',
  },
  {
    file: 'dist/hardware/esp32-curriculum/index.html',
    title: 'ESP32 MicroPython 高阶科创',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/esp32-curriculum/',
  },
];

const readFile = relativePath => {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) throw new Error(`Missing prerendered route: ${relativePath}`);
  return fs.readFileSync(filePath, 'utf8');
};

const titleOf = html => (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
const canonicalOf = html => (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || [])[1];

for (const item of cases) {
  const aliasFile = item.file.replace(/\/index\.html$/, '.html');
  if (aliasFile === item.file) throw new Error(`Cannot derive the slashless shell for ${item.file}`);

  const indexHtml = readFile(item.file);
  const aliasHtml = readFile(aliasFile);
  const indexTitle = titleOf(indexHtml);
  const aliasTitle = titleOf(aliasHtml);
  const indexCanonical = canonicalOf(indexHtml);
  const aliasCanonical = canonicalOf(aliasHtml);

  if (!indexTitle?.includes(item.title)) throw new Error(`${item.file} does not contain its route title.`);
  if (!aliasTitle?.includes(item.title)) throw new Error(`${aliasFile} does not contain its route title.`);
  if (indexCanonical !== item.canonical) throw new Error(`${item.file} has an incorrect canonical URL.`);
  if (aliasCanonical !== item.canonical) throw new Error(`${aliasFile} has an incorrect canonical URL.`);
  if (indexTitle !== aliasTitle) throw new Error(`${aliasFile} title differs from ${item.file}.`);
  if (indexCanonical !== aliasCanonical) throw new Error(`${aliasFile} canonical differs from ${item.file}.`);
}

for (const file of ['dist/manifest.webmanifest', 'dist/sw.js', 'dist/icon-192.png', 'dist/icon-512.png']) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing PWA asset: ${file}`);
}

// 只有本机学习记录、不进 sitemap 的路由也要有两份 shell，并且两份都 noindex。
for (const file of ['dist/question-bank/review/index.html', 'dist/question-bank/review.html']) {
  const html = readFile(file);
  if (!html.includes('<meta name="robots" content="noindex" />')) throw new Error(`${file} is missing its noindex meta.`);
}

// canonical 必须是 GitHub Pages 直接 200 的带斜杠地址（不带斜杠会 301）。
const sitemap = readFile('dist/sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const slashless = sitemapUrls.filter(url => !url.endsWith('/'));
if (slashless.length) throw new Error(`Sitemap URLs must end with "/" (GitHub Pages 301s the slashless form): ${slashless.slice(0, 3).join(', ')}`);

const basePath = new URL(SITE_ORIGIN).pathname.replace(/\/$/, '');
const routes = [...new Set(sitemapUrls.map(url => {
  const pathname = new URL(url).pathname;
  return normalizePathname(pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname);
}))];
let shellPairs = 0;
for (const route of routes) {
  if (route === '/') continue;
  const relative = route.replace(/^\//, '');
  const indexFile = `dist/${relative}/index.html`;
  const aliasFile = `dist/${relative}.html`;
  const indexHtml = readFile(indexFile);
  const aliasHtml = readFile(aliasFile);
  const indexTitle = titleOf(indexHtml);
  const aliasTitle = titleOf(aliasHtml);
  const indexCanonical = canonicalOf(indexHtml);
  const aliasCanonical = canonicalOf(aliasHtml);
  if (!indexTitle || indexTitle !== aliasTitle) throw new Error(`${aliasFile} title differs from ${indexFile}.`);
  if (!indexCanonical || indexCanonical !== aliasCanonical) throw new Error(`${aliasFile} canonical differs from ${indexFile}.`);
  shellPairs += 1;
}

console.log(`Static route metadata and PWA assets are present (${shellPairs} sitemap route shell pairs).`);
