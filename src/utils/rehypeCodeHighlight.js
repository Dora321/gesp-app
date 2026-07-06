import { toText } from 'hast-util-to-text';
import { createLowlight } from 'lowlight';
import { visit } from 'unist-util-visit';
import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';

const lowlight = createLowlight({ bash, cpp, javascript, json, plaintext, python });
lowlight.registerAlias({
  bash: ['sh', 'shell'],
  cpp: ['c', 'c++', 'cc', 'h', 'hpp'],
  javascript: ['js', 'jsx'],
  plaintext: ['text', 'txt'],
  python: ['py'],
});

const getLanguage = node => {
  const classNames = Array.isArray(node.properties?.className) ? node.properties.className : [];
  if (classNames.some(name => name === 'no-highlight' || name === 'nohighlight')) return false;
  const className = classNames.find(name => /^(?:lang|language)-/.test(String(name)));
  return className ? String(className).replace(/^(?:lang|language)-/, '') : undefined;
};

export default function rehypeCodeHighlight({ detect = true } = {}) {
  return tree => {
    visit(tree, 'element', (node, _index, parent) => {
      if (node.tagName !== 'code' || parent?.tagName !== 'pre') return;

      const language = getLanguage(node);
      if (language === false || (!language && !detect)) return;

      let result;
      try {
        result = language
          ? lowlight.highlight(language, toText(node, { whitespace: 'pre' }))
          : lowlight.highlightAuto(toText(node, { whitespace: 'pre' }));
      } catch {
        return;
      }

      node.properties.className = Array.isArray(node.properties.className) ? node.properties.className : [];
      if (!node.properties.className.includes('hljs')) node.properties.className.unshift('hljs');
      if (!language && result.data?.language) node.properties.className.push(`language-${result.data.language}`);
      node.children = result.children;
    });
  };
}
