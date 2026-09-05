import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRouteSeo, lessonRouteMeta, SITE_ORIGIN, withSiteMeta } from '../src/seo/routeMeta.js';
import { cppLessonIndex, getCppLesson } from '../src/data/cppLessonIndex.js';

// 课名索引在构建期没有体积代价，静态 shell 直接用精修标题，
// 让爬虫看到 96 个各不相同的页面而不是一套模板。
const seoFor = (pathname) => {
  const lessonMatch = pathname.match(/^\/lesson\/(\d+)\/(\d+)$/);
  if (lessonMatch) {
    const [, level, lessonId] = lessonMatch;
    const refined = lessonRouteMeta(level, lessonId, getCppLesson(level, lessonId));
    if (refined) return withSiteMeta(refined, pathname);
  }
  return getRouteSeo(pathname);
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const indexPath = path.join(distDir, 'index.html');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

const escapeHtml = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const setMeta = (html, attribute, key, value) => {
  const escaped = escapeHtml(value);
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, 'i');
  const replacement = `<meta ${attribute}="${key}" content="${escaped}" />`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `  ${replacement}\n</head>`);
};

// 之前每个 shell 的 <body> 可见文本长度都是 0——只有 meta，没有任何内容。
// Google 会执行 JS 所以还能收，但目标用户主要来自百度和微信内置浏览器，两者
// 基本不渲染 JS，等于整站内容对它们不存在。这里给每个路由塞一段真实首屏文本：
// React 挂载时会用 root 的内容替换掉它，用户看不到，爬虫看得到。
const renderNoscriptContent = (pathname, seo) => {
  const lines = [`<h1>${escapeHtml(seo.title)}</h1>`, `<p>${escapeHtml(seo.description)}</p>`];

  const lessonMatch = pathname.match(/^\/lesson\/(\d+)\/(\d+)$/);
  if (lessonMatch) {
    const lesson = getCppLesson(lessonMatch[1], lessonMatch[2]);
    if (lesson) {
      lines.push(`<p>本课属于 GESP C++ ${lessonMatch[1]} 级互动课程，共 16 课。</p>`);
      lines.push('<ul>');
      for (const sibling of cppLessonIndex.filter(item => item.level === lesson.level)) {
        lines.push(`<li><a href="${SITE_ORIGIN}${sibling.path}">${escapeHtml(sibling.fullTitle)}</a></li>`);
      }
      lines.push('</ul>');
    }
  }

  lines.push(`<p><a href="${SITE_ORIGIN}/">返回首页</a> · <a href="${SITE_ORIGIN}/question-bank">GESP 真题题库</a></p>`);
  return lines.join('\n      ');
};

const renderRoute = (template, pathname) => {
  const seo = seoFor(pathname);
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.fullTitle)}</title>`);
  html = setMeta(html, 'name', 'description', seo.description);
  html = setMeta(html, 'property', 'og:title', seo.fullTitle);
  html = setMeta(html, 'property', 'og:description', seo.description);
  html = setMeta(html, 'property', 'og:url', seo.canonicalUrl);
  html = setMeta(html, 'name', 'twitter:title', seo.fullTitle);
  html = setMeta(html, 'name', 'twitter:description', seo.description);
  const canonical = `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`;
  html = /<link\s+rel="canonical"[^>]*>/i.test(html)
    ? html.replace(/<link\s+rel="canonical"[^>]*>/i, canonical)
    : html.replace('</head>', `  ${canonical}\n</head>`);

  // React 一挂载就会清掉 #root 的内容，所以这段文本只对不执行 JS 的爬虫可见。
  const fallback = `<div id="root"><div data-prerendered-summary>\n      ${renderNoscriptContent(pathname, seo)}\n    </div></div>`;
  html = html.replace('<div id="root"></div>', fallback);
  return html;
};

if (!fs.existsSync(indexPath)) throw new Error('dist/index.html does not exist. Run Vite build first.');

const template = fs.readFileSync(indexPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
// 内容全部来自访客本机的学习记录，对爬虫没有任何可索引的东西，所以不进 sitemap。
// 但仍要生成静态 shell：否则 GitHub Pages 会回落到 404.html——页面能打开（那本来
// 就是 index.html 的副本），HTTP 状态却是 404，分享和收藏都会被当成失效链接。
const PRERENDER_ONLY_ROUTES = ['/question-bank/review'];

const routes = urls.map(url => {
  const pathname = new URL(url).pathname;
  const route = pathname.startsWith(new URL(SITE_ORIGIN).pathname)
    ? pathname.slice(new URL(SITE_ORIGIN).pathname.length)
    : pathname;
  return route || '/';
});

const allRoutes = [...new Set([...routes, ...PRERENDER_ONLY_ROUTES])];

for (const route of allRoutes) {
  const outputPath = route === '/'
    ? indexPath
    : path.join(distDir, ...route.split('/').filter(Boolean), 'index.html');
  let html = renderRoute(template, route);
  if (PRERENDER_ONLY_ROUTES.includes(route)) {
    html = html.replace('</head>', '  <meta name="robots" content="noindex" />\n</head>');
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, 'utf8');
}

console.log(`Generated static metadata shells for ${allRoutes.length} routes.`);
