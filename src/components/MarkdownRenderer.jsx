import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

/**
 * Copy button overlay for code blocks.
 */
const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* fallback – select & copy */
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        }
    }, [text]);

    return (
        <button
            onClick={handleCopy}
            className="code-copy-btn"
            title="复制代码"
            aria-label="复制代码"
        >
            {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            )}
            <span className="code-copy-label">{copied ? '已复制' : '复制'}</span>
        </button>
    );
};

/**
 * Extract plain text from React children tree (handles nested spans from highlight.js).
 */
const extractText = (node) => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
};

/**
 * Custom pre block with copy button.
 */
const PreWithCopy = ({ children, ...props }) => {
    const codeText = extractText(children).replace(/\n$/, '');
    return (
        <div className="code-block-wrapper">
            <CopyButton text={codeText} />
            <pre {...props}>{children}</pre>
        </div>
    );
};

const normalizeMathDelimiters = (value) => {
    if (typeof value !== 'string') return '';

    return value
        .split(/(```[\s\S]*?```)/g)
        .map((block) => {
            if (block.startsWith('```')) return block;

            return block
                .split(/(`+[^`]*`+)/g)
                .map((part) => {
                    if (part.startsWith('`')) return part;
                    return part
                        .replace(/\\\[((?:.|\n)*?)\\\]/g, (_, expr) => `$$${expr}$$`)
                        .replace(/\\\(((?:.|\n)*?)\\\)/g, (_, expr) => `$${expr}$`);
                })
                .join('');
        })
        .join('');
};

/**
 * Shared Markdown Renderer component for consistent display of code blocks, 
 * math formulas, and GFM across the application.
 */
const MarkdownRenderer = ({ content, className = "", inline = false }) => {
    const components = inline
        ? {
            p: ({children}) => <span className="inline-p">{children}</span>,
            div: ({children}) => <span className="inline-div">{children}</span>
          }
        : {
            pre: PreWithCopy,
          };
    const Root = inline ? 'span' : 'div';
    const normalizedContent = normalizeMathDelimiters(content);

    return (
        <Root className={`markdown-body ${inline ? 'inline-markdown' : ''} ${className}`}>
            <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]} 
                rehypePlugins={[rehypeKatex, [rehypeHighlight, { detect: true }]]}
                components={components}
            >
                {normalizedContent}
            </ReactMarkdown>
        </Root>
    );
};

export default MarkdownRenderer;
