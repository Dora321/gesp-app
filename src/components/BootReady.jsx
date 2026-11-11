import { useEffect } from 'react';

// React 首屏提交后给 <html> 加 mw-ready，收起 index.html 里的 boot 加载层（#mw-boot）。
export default function BootReady() {
  useEffect(() => {
    document.documentElement.classList.add('mw-ready');
  }, []);
  return null;
}
