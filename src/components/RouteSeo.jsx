import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = '魔丸聚集地';
const SITE_ORIGIN = 'https://Dora321.github.io/gesp-app';
const DEFAULT_DESCRIPTION = 'GESP C++/Python 历年真题题库、互动课程讲解、ESP32 硬件项目与内置 AI 编程助教。';

const routeMeta = (pathname) => {
  if (pathname === '/') return { title: 'GESP 编程备考与编程课堂', description: DEFAULT_DESCRIPTION };
  if (pathname === '/question-bank') return { title: 'GESP C++ 真题题库', description: '按等级和年份练习 GESP C++ 真题，支持考试模式、逐题解析和错题复盘。' };
  if (pathname === '/museum') return { title: '计算机博物馆', description: '通过互动展品认识计算机发展史、硬件组成和编程世界。' };

  let match = pathname.match(/^\/question-bank\/topics\/(\d+)$/);
  if (match) return { title: `GESP C++ ${match[1]}级考点练习`, description: `按知识点练习 GESP C++ ${match[1]}级题目，集中巩固薄弱环节。` };

  match = pathname.match(/^\/question-bank\/(\d+)\/((\d{4})-(\d{2})-l\d+)$/);
  if (match) return { title: `${match[3]}年${Number(match[4])}月 GESP C++ ${match[1]}级真题`, description: `在线练习 ${match[3]}年${Number(match[4])}月 GESP C++ ${match[1]}级真题，查看答案与详细解析。` };

  match = pathname.match(/^\/lesson\/(\d+)\/(\d+)$/);
  if (match) return { title: `GESP C++ ${match[1]}级第${match[2]}课`, description: `GESP C++ ${match[1]}级互动课程第${match[2]}课。` };

  match = pathname.match(/^\/level(\d+)$/);
  if (match) return { title: `GESP C++ ${match[1]}级知识体系`, description: `系统学习 GESP C++ ${match[1]}级知识点、代码模板和实战方法。` };

  if (pathname.startsWith('/python/')) return { title: 'Python 互动编程课程', description: '面向青少年的 Python 基础、进阶与项目式互动课程。' };
  if (pathname === '/hardware/esp32-ai') return { title: 'ESP32 × MicroPython × AI 课程', description: '和 AI 协作学习 ESP32、MicroPython、传感器与智能硬件项目。' };
  if (pathname.startsWith('/hardware')) return { title: 'ESP32 智能硬件实验室', description: '使用 ESP32 和 MicroPython 完成循序渐进的智能硬件项目。' };
  if (pathname.startsWith('/ekart')) return { title: 'E-Kart 智能车实验室', description: '智能车学习路线、工具箱、作品展示与家长学习报告。' };

  return { title: 'GESP 编程备考与编程课堂', description: DEFAULT_DESCRIPTION };
};

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
    const meta = routeMeta(pathname);
    const title = `${meta.title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
}
