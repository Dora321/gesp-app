import React from 'react';

// 样式（.mwl / .mwl-mark）与首屏 boot 加载层共用，内联在 index.html 的 <head> 里。
export default function LoadingScreen({ message = '正在为您加载', variant = 'light' }) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`mw-loading mwl${isDark ? ' mwl--night' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mwl__in">
        <div className="mwl-mark" aria-hidden="true">
          <i className="motion-reduce:animate-none" />
          <i className="motion-reduce:animate-none" />
          <i className="motion-reduce:animate-none" />
          <i className="motion-reduce:animate-none" />
        </div>
        <p className="mwl__msg">{message}</p>
        <p className="mwl__sub">内容马上就绪</p>
      </div>
    </div>
  );
}
