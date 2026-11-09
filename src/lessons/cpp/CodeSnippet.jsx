// 可复用的 C++ 代码片段组件：统一的深色主题 + 词法高亮。
// 用法：<CodeSnippet code={`int a = 1;\ncout << a;`} />
// 需要在同一深色块内追加内容（如交互按钮、批注）时，传 children。
//
// 词法分析器已抽到 src/utils/syntaxHighlight.js，与题库 Markdown 代码块共用
// 一套 .tok-* 配色。

import { tokenizeLines } from '../../utils/syntaxHighlight';

export default function CodeSnippet({ code, className = '', children }) {
  const source = String(code).replace(/\n+$/, '');
  const lines = tokenizeLines(source, 'cpp');

  return (
    <div
      className={`syntax-highlight overflow-x-auto rounded-lg bg-gray-800 p-4 font-mono text-sm leading-relaxed text-slate-100 ${className}`}
    >
      {lines.map((tokens, i) => (
        <div key={i} className="whitespace-pre">
          {tokens.length === 0
            ? ' '
            : tokens.map((token, j) => (
                <span key={j} className={`tok-${token.type}`}>
                  {token.text}
                </span>
              ))}
        </div>
      ))}
      {children}
    </div>
  );
}
