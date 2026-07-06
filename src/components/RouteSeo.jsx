import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '../seo/routeMeta';

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

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteSeo(pathname);

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
  }, [pathname]);

  return null;
}
