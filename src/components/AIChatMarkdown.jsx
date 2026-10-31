/* eslint-disable react-refresh/only-export-components -- react-markdown component map shared with widget */
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const getMarkdownText = (value) => {
    if (value === null || value === undefined || typeof value === 'boolean') return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (Array.isArray(value)) return value.map(getMarkdownText).join('');
    if (React.isValidElement(value)) return getMarkdownText(value.props.children);
    return '';
};

const writeClipboardText = async (text) => {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!copied) throw new Error('Copy command was rejected');
};

const ChatCode = ({ className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const content = getMarkdownText(children).replace(/\n$/, '');
    const isBlockCode = Boolean(match) || content.includes('\n');

    const copyCode = async () => {
        try {
            await writeClipboardText(content);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch (error) {
            console.error('Failed to copy code', error);
        }
    };

    return isBlockCode ? (
        <div className="my-2 max-w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
            <div className="bg-slate-800 text-slate-200 text-[11px] px-3 py-1 flex justify-between items-center">
                <span>{match ? match[1] : 'code'}</span>
                <button
                    type="button"
                    onClick={copyCode}
                    className="flex h-11 w-11 items-center justify-center rounded text-slate-300 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    title={copied ? '已复制' : '复制代码'}
                    aria-label={copied ? '代码已复制' : '复制代码'}
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="max-w-full overflow-x-auto p-3 text-xs leading-relaxed text-white">
                <code className={`${className || ''} font-mono`} {...props}>
                    {children}
                </code>
            </pre>
        </div>
    ) : (
        <code className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[0.92em] font-semibold text-indigo-700 break-words" {...props}>
            {content}
        </code>
    );
};

const chatMarkdownComponents = {
    code: ChatCode,
    p: ({ children }) => <p className="mb-2 leading-6 last:mb-0 break-words">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1.5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1.5">{children}</ol>,
    li: ({ children }) => <li className="pl-1 leading-6 break-words">{children}</li>,
    h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-1">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 pl-3 italic text-slate-500 my-2">{children}</blockquote>,
    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-words">{children}</a>,
    table: ({ children }) => (
        <div className="my-2 max-w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[560px] w-full border-collapse text-xs">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
    th: ({ children }) => <th className="border-b border-r border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 align-top last:border-r-0">{children}</th>,
    td: ({ children }) => <td className="border-b border-r border-slate-200 px-3 py-2 align-top text-slate-700 last:border-r-0 [&_pre]:my-1">{children}</td>,
    tr: ({ children }) => <tr className="last:[&_td]:border-b-0">{children}</tr>
};

export { chatMarkdownComponents };
