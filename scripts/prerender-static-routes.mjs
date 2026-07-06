import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRouteSeo, SITE_ORIGIN } from '../src/seo/routeMeta.js';

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

const renderRoute = (template, pathname) => {
  const seo = getRouteSeo(pathname);
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
  return html;
};

if (!fs.existsSync(indexPath)) throw new Error('dist/index.html does not exist. Run Vite build first.');

const template = fs.readFileSync(indexPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const routes = urls.map(url => {
  const pathname = new URL(url).pathname;
  const route = pathname.startsWith(new URL(SITE_ORIGIN).pathname)
    ? pathname.slice(new URL(SITE_ORIGIN).pathname.length)
    : pathname;
  return route || '/';
});

for (const route of routes) {
  const outputPath = route === '/'
    ? indexPath
    : path.join(distDir, ...route.split('/').filter(Boolean), 'index.html');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderRoute(template, route), 'utf8');
}

console.log(`Generated static metadata shells for ${routes.length} routes.`);
