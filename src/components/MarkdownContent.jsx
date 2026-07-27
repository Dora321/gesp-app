import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }

        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    }, [text]);

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="code-copy-btn"
            title="复制代码"
            aria-label="复制代码"
        >
            {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            )}
            <span className="code-copy-label">{copied ? '已复制' : '复制'}</span>
        </button>
    );
};

const extractText = (node) => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
};

const PreWithCopy = ({ children, ...props }) => {
    const codeText = extractText(children).replace(/\n$/, '');
    return (
        <div className="code-block-wrapper">
            <CopyButton text={codeText} />
            <pre {...props}>{children}</pre>
        </div>
    );
};

// 题图等资源放在 public/ 下，markdown 里写成 `/question-assets/...`。
// 生产环境部署在 /gesp-app/ 子路径下，根绝对路径需补上 Vite 的 base。
const withBaseUrl = (src) => {
    if (typeof src !== 'string' || !src.startsWith('/') || src.startsWith('//')) return src;
    return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${src}`;
};

const MarkdownImage = ({ src, alt, ...props }) => (
    <img {...props} src={withBaseUrl(src)} alt={alt || ''} loading="lazy" />
);

const MarkdownContent = ({ content, inline = false, remarkPlugins = [], rehypePlugins = [] }) => {
    const components = inline
        ? {
            p: ({ children }) => <span className="inline-p">{children}</span>,
            div: ({ children }) => <span className="inline-div">{children}</span>,
            img: MarkdownImage,
          }
        : { pre: PreWithCopy, img: MarkdownImage };

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, ...remarkPlugins]}
            rehypePlugins={rehypePlugins}
            components={components}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownContent;
