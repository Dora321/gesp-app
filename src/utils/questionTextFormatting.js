export const stripLeadingNumber = (questionText) => {
  if (typeof questionText !== 'string') return questionText || '';
  return questionText.replace(/^\s*\d+[.。、]\s*/, '');
};

export const normalizeEscapedLineBreaks = (value) => {
  if (typeof value !== 'string') return value || '';

  let result = '';
  let inlineCode = false;
  let fencedCode = false;
  let quote = null;

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];

    if (char === '`') {
      const runStart = i;
      while (value[i + 1] === '`') i += 1;
      const ticks = value.slice(runStart, i + 1);
      if (ticks.length >= 3) {
        fencedCode = !fencedCode;
        inlineCode = false;
        quote = null;
      } else if (!fencedCode) {
        inlineCode = !inlineCode;
      }
      result += ticks;
      continue;
    }

    if (fencedCode && !inlineCode && (char === '"' || char === "'")) {
      const escaped = value[i - 1] === '\\';
      if (!escaped) quote = quote === char ? null : (quote || char);
    }

    if (char === '\\' && value[i + 1] === 'n' && !inlineCode) {
      if (!(fencedCode && quote)) {
        result += '\n';
        i += 1;
        continue;
      }
    }

    result += char;
  }

  return result;
};

export const formatOptionDisplay = (optionText) => {
  if (typeof optionText !== 'string') return optionText || '';
  const normalized = normalizeEscapedLineBreaks(optionText);
  let depth = 0;
  let formatted = '';

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    if (char === '(' || char === '[' || char === '{') depth += 1;
    if ((char === ')' || char === ']' || char === '}') && depth > 0) depth -= 1;
    formatted += char;

    if (char === ';' && depth === 0 && /\s+\S/.test(normalized.slice(i + 1))) {
      formatted += '  \n';
      while (/\s/.test(normalized[i + 1] || '')) i += 1;
    }
  }

  return formatted.replace(/\n/g, '  \n');
};
