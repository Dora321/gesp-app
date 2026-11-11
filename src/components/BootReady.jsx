import { useEffect } from 'react';

// React 首屏提交后给 <html> 加 mw-ready，收起 index.html 里的 boot 加载层（#mw-boot），
// 随后把该节点从 DOM 移除，避免隐藏的品牌文案被文本选择器误命中。
export default function BootReady() {
  useEffect(() => {
    document.documentElement.classList.add('mw-ready');
    document.getElementById('mw-boot')?.remove();
  }, []);
  return null;
}
