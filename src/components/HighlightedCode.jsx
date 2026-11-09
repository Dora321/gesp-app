import { useMemo } from 'react';
import { detectLanguage, tokenize } from '../utils/syntaxHighlight';

/**
 * Render source code as a <code> element with one span per token.
 * The light DOM is text-only, so copy/paste and React Markdown children both
 * keep working exactly as before.
 */
export default function HighlightedCode({ code, language = 'cpp', className = '', ...props }) {
  const source = typeof code === 'string' ? code : String(code ?? '');
  const resolvedLanguage = detectLanguage(language, 'cpp');
  const tokens = useMemo(
    () => tokenize(source, resolvedLanguage),
    [source, resolvedLanguage],
  );
  const languageClass = resolvedLanguage === 'plain' ? 'language-text' : `language-${resolvedLanguage}`;

  return (
    <code
      className={['syntax-highlight', languageClass, className].filter(Boolean).join(' ')}
      {...props}
    >
      {tokens.map((token, index) => (
        <span key={index} className={`tok-${token.type}`}>{token.text}</span>
      ))}
    </code>
  );
}
