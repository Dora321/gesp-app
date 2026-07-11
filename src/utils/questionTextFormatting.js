export const stripLeadingNumber = (questionText) => {
  if (typeof questionText !== 'string') return questionText || '';
  return questionText.replace(/^\s*\d+[.。、]\s*/, '');
};

export const buildQuestionContent = (question) => {
  if (!question) return '';
  const text = question.question || question.description || question.summary || question.title || '';
  const code = typeof question.code === 'string' ? question.code.trim() : '';
  if (!code || text.includes(code)) return text;
  return `${text}\n\n\`\`\`${question.codeLanguage || 'cpp'}\n${code}\n\`\`\``;
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

const shouldPromoteInlineCode = (codeText) => {
  const value = codeText.trim();
  if (value.length < 36) return false;
  if (value.includes('\n')) return false;
  return /;/.test(value) && /[{}]|\b(for|while|if|else|cout|cin|printf|scanf|return)\b/.test(value);
};

const isStandaloneInlineCode = (source, offset) => {
  const before = source.slice(0, offset);
  const lineStart = before.lastIndexOf('\n') + 1;
  const linePrefix = before.slice(lineStart);

  return /^\s*$/.test(linePrefix) || /[:：]\s*$/.test(linePrefix);
};

const prettyPrintInlineCode = (codeText) => {
  const value = codeText.trim();
  let formatted = '';
  let indent = 0;
  let parenDepth = 0;

  const appendLine = (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    formatted += `${'    '.repeat(Math.max(indent, 0))}${trimmed}\n`;
  };

  let current = '';
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];

    if (char === '(') parenDepth += 1;
    if (char === ')' && parenDepth > 0) parenDepth -= 1;

    if (char === '{') {
      current += char;
      appendLine(current);
      current = '';
      indent += 1;
      while (/\s/.test(value[i + 1] || '')) i += 1;
      continue;
    }

    if (char === '}') {
      appendLine(current);
      current = '';
      indent = Math.max(0, indent - 1);
      appendLine(char);
      while (/\s/.test(value[i + 1] || '')) i += 1;
      continue;
    }

    current += char;

    if (char === ';' && parenDepth === 0) {
      appendLine(current);
      current = '';
      while (/\s/.test(value[i + 1] || '')) i += 1;
    }
  }

  appendLine(current);
  return formatted.trimEnd();
};

export const promoteLongInlineCodeBlocks = (value) => {
  if (typeof value !== 'string') return value || '';

  return value
    .split(/(```[\s\S]*?```)/g)
    .map((block) => {
      if (block.startsWith('```')) return block;

      return block.replace(/`([^`\n]+)`/g, (match, codeText, offset, source) => {
        if (!shouldPromoteInlineCode(codeText)) return match;
        if (!isStandaloneInlineCode(source, offset)) return match;
        return `\n\n\`\`\`cpp\n${prettyPrintInlineCode(codeText)}\n\`\`\`\n\n`;
      });
    })
    .join('');
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
