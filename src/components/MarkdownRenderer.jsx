import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

/**
 * Shared Markdown Renderer component for consistent display of code blocks, 
 * math formulas, and GFM across the application.
 * 
 * @param {Object} props
 * @param {string} props.content - The markdown content to render.
 * @param {string} [props.className] - Optional extra CSS classes.
 * @param {boolean} [props.inline] - If true, renders as an inline-like block (useful for options).
 */
const MarkdownRenderer = ({ content, className = "", inline = false }) => {
    return (
        <div className={`markdown-body ${inline ? 'inline-markdown' : ''} ${className}`}>
            <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]} 
                rehypePlugins={[rehypeKatex, [rehypeHighlight, { detect: true }]]}
                components={inline ? {
                    p: ({children}) => <span className="inline-p">{children}</span>,
                    div: ({children}) => <span className="inline-div">{children}</span>
                } : {}}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
