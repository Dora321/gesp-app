import React from 'react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import MarkdownContent from './MarkdownContent';

const MathMarkdownContent = ({ content, inline = false }) => (
    <MarkdownContent
        content={content}
        inline={inline}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
    />
);

export default MathMarkdownContent;
