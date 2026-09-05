import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo, lessonRouteMeta, withSiteMeta } from '../seo/routeMeta';

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [name, content] = selector.match(/meta\[([^=]+)="([^"]+)"\]/).slice(1);
    element.setAttribute(name, content);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

const applySeo = (meta) => {
  document.title = meta.fullTitle;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', meta.fullTitle);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', meta.canonicalUrl);
  setMeta('meta[name="twitter:title"]', 'content', meta.fullTitle);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', meta.canonicalUrl);
};

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    applySeo(getRouteSeo(pathname));

    // 课名索引（96 条）只对课程页有意义，动态加载而不是压进首屏包。
    // 静态 shell 在构建期就写好了精确标题，所以爬虫拿到的一直是精修版本；
    // 这里补的是浏览器内前进/后退切换课程时的标签页标题。
    const lessonMatch = pathname.match(/^\/lesson\/(\d+)\/(\d+)$/);
    if (lessonMatch) {
      import('../data/cppLessonIndex.js').then(({ getCppLesson }) => {
        if (cancelled) return;
        const [, level, lessonId] = lessonMatch;
        const refined = lessonRouteMeta(level, lessonId, getCppLesson(level, lessonId));
        if (refined) applySeo(withSiteMeta(refined, pathname));
      }).catch(() => { /* 标题精修失败不该影响页面 */ });
    }

    return () => { cancelled = true; };
  }, [pathname]);

  return null;
}
