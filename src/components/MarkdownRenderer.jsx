import React, { lazy, Suspense } from 'react';
import MarkdownContent from './MarkdownContent';
import { normalizeEscapedLineBreaks, promoteLongInlineCodeBlocks } from '../utils/questionTextFormatting';

const MathMarkdownContent = lazy(() => import('./MathMarkdownContent'));

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

const containsMath = (value) => /(^|[^\\])\${1,2}(?!\s)[\s\S]*?\${1,2}/m.test(value);

const MarkdownRenderer = ({ content, className = '', inline = false, language, defaultLanguage = 'cpp' }) => {
    const lineBreakNormalized = normalizeEscapedLineBreaks(content);
    const codeBlockNormalized = inline ? lineBreakNormalized : promoteLongInlineCodeBlocks(lineBreakNormalized);
    const normalizedContent = normalizeMathDelimiters(codeBlockNormalized);
    const fallbackLanguage = language || defaultLanguage;
    const Root = inline ? 'span' : 'div';
    const plainContent = <MarkdownContent content={normalizedContent} inline={inline} defaultLanguage={fallbackLanguage} />;

    return (
        <Root className={`markdown-body ${inline ? 'inline-markdown' : ''} ${className}`}>
            {containsMath(normalizedContent) ? (
                <Suspense fallback={plainContent}>
                    <MathMarkdownContent content={normalizedContent} inline={inline} defaultLanguage={fallbackLanguage} />
                </Suspense>
            ) : plainContent}
        </Root>
    );
};

export default MarkdownRenderer;
