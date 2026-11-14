import React from 'react';

// 小号积木（约 20px，无贴纸底），用在面板、行内等次要加载态；样式内联在 index.html。
export default function LoadingBlocks({ className = '' }) {
  return (
    <span className={`mwl-mark mwl-mark--bare shrink-0 ${className}`.trim()} aria-hidden="true">
      <i className="motion-reduce:animate-none" />
      <i className="motion-reduce:animate-none" />
      <i className="motion-reduce:animate-none" />
      <i className="motion-reduce:animate-none" />
    </span>
  );
}
