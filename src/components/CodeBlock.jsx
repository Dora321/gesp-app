import React from 'react';
import { Code } from 'lucide-react';

// 这两个展示块此前在 8 个文件里各写了一份（CourseLevel4-8 五份逐字相同，
// Python 课三份只差一个空格）。改一次代码块的对比度、内边距或滚动行为要动
// 八个地方，实际结果就是它们各自漂移。
//
// 保留两种外观而不是强行统一：课程总览页用的是「带标题栏的深色块」，Python
// 课用的是「右上角语言角标 + 逐行高亮」，两者服务不同的教学场景。合并成一种
// 会改变现有页面的观感，那是另一个决定，不该混在去重里做。

/** 课程总览页的深色代码块，可选标题栏。 */
export function CodeBlock({ code, title }) {
    return (
        <div className="bg-slate-900 rounded-lg overflow-hidden my-4 text-sm font-mono text-slate-50">
            {title && (
                <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex items-center gap-2">
                    <Code size={14} />
                    {title}
                </div>
            )}
            <pre className="p-4 overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
}

/**
 * Python 课的代码块：右上角语言角标，并可高亮某一行用于「跟着执行」讲解。
 * highlightLine 为 0 起的行号，-1 表示不高亮。
 */
export function HighlightableCodeBlock({ code, highlightLine = -1, language = 'Python' }) {
    return (
        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto relative">
            <div className="absolute top-2 right-4 text-slate-500 text-xs uppercase tracking-widest">{language}</div>
            <pre className="relative z-10">
                {String(code).split('\n').map((line, index) => (
                    <div
                        key={`line-${index}`}
                        className={highlightLine === index ? 'bg-indigo-500/30 -mx-4 px-4 border-l-4 border-indigo-400' : ''}
                    >
                        {/* 空行也要占一行高度，否则高亮行会跟着上移 */}
                        {line || ' '}
                    </div>
                ))}
            </pre>
        </div>
    );
}

/** Python 课里不需要角标、也不逐行高亮的版本，外壳与上面一致。 */
export function PlainCodeBlock({ code }) {
    return (
        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto">
            <pre>{code}</pre>
        </div>
    );
}

export default CodeBlock;
