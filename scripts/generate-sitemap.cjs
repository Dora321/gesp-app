const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const generatedPath = path.join(root, 'src', 'data', 'gesp', '_generated.js');
const outputPath = path.join(root, 'public', 'sitemap.xml');
const origin = 'https://Dora321.github.io/gesp-app';

const coreRoutes = [
  '/', '/museum', '/question-bank',
  ...Array.from({ length: 8 }, (_, index) => `/level${index + 1}`),
  ...Array.from({ length: 8 }, (_, index) => `/question-bank/topics/${index + 1}`),
  '/hardware', '/hardware/esp32-ai', '/hardware/esp32-curriculum',
  ...Array.from({ length: 35 }, (_, index) => `/hardware/esp32/${index + 1}`),
  '/ekart', '/ekart/roadmap', '/ekart/toolbox', '/ekart/gallery', '/ekart/parent-portal',
  ...Array.from({ length: 7 }, (_, index) => `/python/f${index + 1}`),
  '/python/bridge', '/python/a1', '/python/a2', '/python/file-ops', '/python/ai',
  '/python/crawler', '/python/binary-search', '/python/encryption', '/python/sorting', '/python/morse',
];

const generated = fs.readFileSync(generatedPath, 'utf8');
const paperEntries = [...generated.matchAll(/^\s*'([^']+-l(\d+))':\s*\{/gm)]
  .map(([, paperId, level]) => `/question-bank/${level}/${paperId}`);

async function main() {
  // 96 节 C++ 互动课此前完全不在 sitemap 里——站点最有原创价值的内容对爬虫
  // 不可见，反而 93 张题面雷同的卷子全部收录。
  const { cppLessonPaths } = await import('../src/data/cppLessonIndex.js');
  const routes = [...new Set([...coreRoutes, ...cppLessonPaths, ...paperEntries])];

  const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const body = routes.map(route => [
    '  <url>',
    `    <loc>${escapeXml(`${origin}${route === '/' ? '/' : route}`)}</loc>`,
    `    <changefreq>${route.startsWith('/question-bank/') ? 'monthly' : 'weekly'}</changefreq>`,
    `    <priority>${route === '/' ? '1.0' : route === '/question-bank' ? '0.9' : route.startsWith('/lesson/') ? '0.8' : '0.7'}</priority>`,
    '  </url>',
  ].join('\n')).join('\n');

  fs.writeFileSync(outputPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  console.log(`Generated ${outputPath} with ${routes.length} URLs.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
