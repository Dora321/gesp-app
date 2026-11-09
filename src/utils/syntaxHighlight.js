// Dependency-free tokenizer for the two languages used across the question bank
// and the lessons: C++ and Python. It intentionally stays small — the app only
// needs enough colour to make a code block read like an IDE, not a full parser.
//
// Public shape:
//   detectLanguage(value, fallback) -> 'cpp' | 'python' | 'plain'
//   tokenize(code, language)        -> [{ type, text }]  (join === input)
//   tokenizeLines(code, language)   -> [[{ type, text }]] (join lines === input)
//
// Token types map 1:1 to the `.tok-*` classes in src/index.css.

const LANGUAGE_ALIASES = new Map([
  ['cpp', 'cpp'],
  ['c++', 'cpp'],
  ['c', 'cpp'],
  ['cc', 'cpp'],
  ['cxx', 'cpp'],
  ['h', 'cpp'],
  ['hh', 'cpp'],
  ['hpp', 'cpp'],
  ['hxx', 'cpp'],
  ['python', 'python'],
  ['py', 'python'],
  ['py3', 'python'],
  ['python3', 'python'],
  ['python2', 'python'],
  ['py2', 'python'],
  ['plain', 'plain'],
  ['plaintext', 'plain'],
  ['text', 'plain'],
  ['txt', 'plain'],
  ['output', 'plain'],
  ['out', 'plain'],
  ['stdout', 'plain'],
  ['stderr', 'plain'],
  ['console', 'plain'],
  ['terminal', 'plain'],
  ['none', 'plain'],
]);

const normalizeLanguage = (value) => {
  if (typeof value !== 'string') return '';
  let raw = value.trim().toLowerCase();
  if (!raw) return '';

  // react-markdown passes `language-cpp`; AI chat passes just `cpp`.
  const tagged = raw.match(/(?:^|\s)(?:language|lang)-([^\s]+)/);
  if (tagged) {
    raw = tagged[1];
  } else if (raw.includes(' ')) {
    raw = raw.split(/\s+/)[0];
  }

  raw = raw.replace(/^(?:language|lang)-/, '');
  return LANGUAGE_ALIASES.get(raw) || (raw === '' ? '' : null);
};

/**
 * Map a fence info string / className to a supported language.
 * Unknown languages fall back (cpp by default) so a missing fence language
 * still gets useful colour in a C++ paper.
 */
export const detectLanguage = (value, fallback = 'cpp') => {
  const detected = normalizeLanguage(value);
  if (detected) return detected;
  return normalizeLanguage(fallback) || 'cpp';
};

const CPP_KEYWORDS = new Set([
  'alignas', 'alignof', 'asm', 'break', 'case', 'catch', 'class', 'const',
  'consteval', 'constexpr', 'constinit', 'const_cast', 'continue', 'decltype',
  'default', 'delete', 'do', 'dynamic_cast', 'else', 'enum', 'explicit',
  'export', 'extern', 'for', 'friend', 'goto', 'if', 'inline', 'mutable',
  'namespace', 'new', 'noexcept', 'operator', 'private', 'protected', 'public',
  'register', 'reinterpret_cast', 'return', 'sizeof', 'static', 'static_assert',
  'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local',
  'throw', 'try', 'typedef', 'typeid', 'typename', 'union', 'using', 'virtual',
  'volatile', 'while',
  'true', 'false', 'nullptr', 'NULL',
]);

const CPP_TYPES = new Set([
  'auto', 'bool', 'char', 'char8_t', 'char16_t', 'char32_t', 'double', 'float',
  'int', 'long', 'short', 'signed', 'unsigned', 'void', 'wchar_t',
  'size_t', 'ssize_t', 'ptrdiff_t', 'int8_t', 'int16_t', 'int32_t', 'int64_t',
  'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t',
  'string', 'wstring', 'vector', 'array', 'deque', 'list', 'map', 'multimap',
  'set', 'multiset', 'unordered_map', 'unordered_set', 'pair', 'tuple',
  'queue', 'priority_queue', 'stack', 'bitset',
]);

const CPP_BUILTINS = new Set([
  'std', 'cin', 'cout', 'cerr', 'clog', 'endl', 'flush', 'fixed',
  'setprecision', 'setw', 'setfill', 'hex', 'dec', 'oct',
  'printf', 'scanf', 'puts', 'gets', 'getline', 'getchar', 'putchar',
  'malloc', 'calloc', 'realloc', 'free', 'memset', 'memcpy', 'strlen',
  'strcmp', 'strcpy', 'strcat', 'sort', 'stable_sort', 'reverse', 'swap',
  'max', 'min', 'abs', 'sqrt', 'pow', 'floor', 'ceil', 'round', 'log', 'log2',
  'log10', 'sin', 'cos', 'tan', 'fabs', 'toupper', 'tolower', 'isdigit',
  'isalpha', 'to_string', 'stoi', 'stol', 'stoll', 'stof', 'stod',
  'begin', 'end', 'push_back', 'pop_back', 'size', 'empty', 'find', 'insert',
  'erase', 'clear', 'substr', 'length', 'front', 'back',
]);

const PYTHON_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'case', 'class',
  'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for',
  'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'match',
  'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while',
  'with', 'yield',
  'True', 'False', 'None',
]);

const PYTHON_TYPES = new Set([
  'int', 'float', 'str', 'bool', 'list', 'dict', 'set', 'frozenset', 'tuple',
  'bytes', 'bytearray', 'complex', 'object', 'memoryview', 'Exception',
  'BaseException', 'ValueError', 'TypeError', 'IndexError', 'KeyError',
  'ZeroDivisionError', 'RuntimeError', 'StopIteration', 'FileNotFoundError',
  'AttributeError', 'NameError', 'ImportError', 'NotImplementedError',
]);

const PYTHON_BUILTINS = new Set([
  'print', 'input', 'len', 'range', 'open', 'enumerate', 'zip', 'sum', 'min',
  'max', 'abs', 'round', 'sorted', 'reversed', 'isinstance', 'issubclass',
  'hasattr', 'getattr', 'setattr', 'delattr', 'type', 'id', 'map', 'filter',
  'any', 'all', 'ord', 'chr', 'bin', 'hex', 'oct', 'divmod', 'eval', 'exec',
  'format', 'repr', 'hash', 'iter', 'next', 'super', 'vars', 'dir',
  'self', 'cls',
]);

const CPP_PUNCTUATION = new Set(['{', '}', '(', ')', '[', ']', ';', ',', '#']);
const PYTHON_PUNCTUATION = new Set(['{', '}', '(', ')', '[', ']', ';', ',']);

// Longest first so `<<=` wins over `<<`.
const CPP_OPERATORS = [
  '<<=', '>>=', '->*', '<=>', '...', '::', '->', '++', '--', '<<', '>>',
  '<=', '>=', '==', '!=', '&&', '||', '+=', '-=', '*=', '/=', '%=', '&=',
  '|=', '^=', '.*',
  '+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':',
  '.',
];

const PYTHON_OPERATORS = [
  '**=', '//=', '<<=', '>>=', '...', '**', '//', '<<', '>>', '<=', '>=',
  '==', '!=', ':=', '->', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=',
  '@=',
  '+', '-', '*', '/', '%', '@', '<', '>', '=', '!', '&', '|', '^', '~', ':',
  '.', '?',
];

const CPP_NUMBER = /^(?:0[xX][0-9a-fA-F](?:'?[0-9a-fA-F])*[uUlL]*|0[bB][01](?:'?[01])*[uUlL]*|(?:\d(?:'?\d)*)?\.\d(?:[eE][+-]?\d+)?[fFlL]?|\d(?:'?\d)*(?:\.(?!\.)\d*)?(?:[eE][+-]?\d+)?[fFuUlL]*)/;
const PYTHON_NUMBER = /^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d(?:_?\d)*)?\.\d(?:_?\d)*(?:[eE][+-]?\d+)?[jJ]?|\d(?:_?\d)*(?:\.(?!\.)\d*)?(?:[eE][+-]?\d+)?[jJ]?)/;

const isIdentifierStart = (char) => /[A-Za-z_]/.test(char || '');
const isIdentifierPart = (char) => /[A-Za-z0-9_]/.test(char || '');
const isDigit = (char) => /[0-9]/.test(char || '');
const isWhitespace = (char) => /\s/.test(char || '');

const createTokenList = () => {
  const tokens = [];
  const push = (type, text) => {
    if (!text) return;
    const previous = tokens[tokens.length - 1];
    if (previous && previous.type === type && type === 'plain') {
      previous.text += text;
    } else {
      tokens.push({ type, text });
    }
  };
  return { tokens, push };
};

const updateLineState = (text, lineOnlyWhitespace) => {
  const lastNewline = text.lastIndexOf('\n');
  if (lastNewline !== -1) {
    return /^[ \t\r]*$/.test(text.slice(lastNewline + 1));
  }
  if (!/^[ \t\r]*$/.test(text)) return false;
  return lineOnlyWhitespace;
};

const readQuoted = (code, start, quote) => {
  let index = start + 1;
  while (index < code.length) {
    const char = code[index];
    if (char === '\\') {
      index += 2;
      continue;
    }
    if (char === quote) return index + 1;
    if (char === '\n') return index;
    index += 1;
  }
  return index;
};

const isFollowedByParen = (code, start) => {
  let index = start;
  while (index < code.length && (code[index] === ' ' || code[index] === '\t')) {
    index += 1;
  }
  return code[index] === '(';
};

const matchOperator = (code, start, operators) => {
  for (const operator of operators) {
    if (code.startsWith(operator, start)) return operator;
  }
  return '';
};

const classifyCppIdentifier = (identifier, code, end, previous) => {
  if (CPP_KEYWORDS.has(identifier)) return 'keyword';
  if (CPP_TYPES.has(identifier)) return 'type';
  if (CPP_BUILTINS.has(identifier)) return 'builtin';
  if (previous?.type === 'keyword' && ['class', 'struct', 'union', 'enum', 'typename'].includes(previous.text)) {
    return 'type';
  }
  if (isFollowedByParen(code, end)) return 'function';
  return 'plain';
};

const classifyPythonIdentifier = (identifier, code, end, previous) => {
  if (PYTHON_KEYWORDS.has(identifier)) return 'keyword';
  if (PYTHON_TYPES.has(identifier)) return 'type';
  if (PYTHON_BUILTINS.has(identifier)) return 'builtin';
  if (previous?.type === 'keyword' && previous.text === 'class') return 'type';
  if (previous?.type === 'operator' && previous.text === '@') return 'builtin';
  if (previous?.type === 'keyword' && previous.text === 'def') return 'function';
  if (isFollowedByParen(code, end)) return 'function';
  return 'plain';
};

const scanCpp = (code) => {
  const { tokens, push } = createTokenList();
  let index = 0;
  let lineOnlyWhitespace = true;
  let includeLine = false;
  let previous = null;

  const remember = (type, text) => {
    if (/\S/.test(text)) previous = { type, text };
  };

  while (index < code.length) {
    const char = code[index];

    if (isWhitespace(char)) {
      let end = index + 1;
      while (end < code.length && isWhitespace(code[end])) end += 1;
      const text = code.slice(index, end);
      push('plain', text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      if (text.includes('\n')) includeLine = false;
      index = end;
      continue;
    }

    if (char === '/' && code[index + 1] === '/') {
      let end = index + 2;
      while (end < code.length && code[end] !== '\n') end += 1;
      const text = code.slice(index, end);
      push('comment', text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      remember('comment', text);
      index = end;
      continue;
    }

    if (char === '/' && code[index + 1] === '*') {
      let end = index + 2;
      while (end < code.length && !(code[end] === '*' && code[end + 1] === '/')) end += 1;
      end = end < code.length ? end + 2 : code.length;
      const text = code.slice(index, end);
      push('comment', text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      remember('comment', text);
      index = end;
      continue;
    }

    // Preprocessor directive: `#include`, `#define`, ... (leading spaces allowed).
    if (char === '#' && lineOnlyWhitespace) {
      let nameStart = index + 1;
      while (nameStart < code.length && (code[nameStart] === ' ' || code[nameStart] === '\t')) nameStart += 1;
      let end = nameStart;
      while (end < code.length && isIdentifierPart(code[end])) end += 1;
      if (end > nameStart) {
        const text = code.slice(index, end);
        push('keyword', text);
        lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
        remember('keyword', text);
        includeLine = /#\s*(?:include|import|include_next)\b/.test(text);
        index = end;
        continue;
      }
    }

    if (includeLine) {
      if (char === '<') {
        let end = index + 1;
        while (end < code.length && code[end] !== '>' && code[end] !== '\n') end += 1;
        if (code[end] === '>') end += 1;
        const text = code.slice(index, end);
        push('string', text);
        lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
        remember('string', text);
        includeLine = false;
        index = end;
        continue;
      }
      includeLine = false;
    }

    if (char === '"' || char === "'") {
      const end = readQuoted(code, index, char);
      const text = code.slice(index, end);
      push('string', text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      remember('string', text);
      index = end;
      continue;
    }

    if (isDigit(char) || (char === '.' && isDigit(code[index + 1]))) {
      const match = code.slice(index).match(CPP_NUMBER);
      if (match) {
        const text = match[0];
        push('number', text);
        lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
        remember('number', text);
        index += text.length;
        continue;
      }
    }

    if (isIdentifierStart(char)) {
      let end = index + 1;
      while (end < code.length && isIdentifierPart(code[end])) end += 1;
      const identifier = code.slice(index, end);
      const type = classifyCppIdentifier(identifier, code, end, previous);
      push(type, identifier);
      lineOnlyWhitespace = updateLineState(identifier, lineOnlyWhitespace);
      previous = { type, text: identifier };
      index = end;
      continue;
    }

    const operator = matchOperator(code, index, CPP_OPERATORS);
    if (operator) {
      push('operator', operator);
      lineOnlyWhitespace = updateLineState(operator, lineOnlyWhitespace);
      remember('operator', operator);
      index += operator.length;
      continue;
    }

    if (CPP_PUNCTUATION.has(char)) {
      push('punct', char);
      lineOnlyWhitespace = updateLineState(char, lineOnlyWhitespace);
      remember('punct', char);
      index += 1;
      continue;
    }

    push('plain', char);
    lineOnlyWhitespace = updateLineState(char, lineOnlyWhitespace);
    remember('plain', char);
    index += 1;
  }

  return tokens;
};

const matchPythonStringStart = (code, start) => {
  const prefix = code.slice(start).match(/^([rRbBuUfF]{0,3})(?=(?:"""|'''|"|'))/);
  if (!prefix) return null;
  return { prefixLength: prefix[1].length, quoteIndex: start + prefix[1].length };
};

const readPythonString = (code, start, delimiter) => {
  let index = start + delimiter.length;
  while (index < code.length) {
    const char = code[index];
    if (char === '\\') {
      index += 2;
      continue;
    }
    if (code.startsWith(delimiter, index)) return index + delimiter.length;
    if (delimiter.length === 1 && char === '\n') return index;
    index += 1;
  }
  return index;
};

const scanPython = (code) => {
  const { tokens, push } = createTokenList();
  let index = 0;
  let lineOnlyWhitespace = true;
  let previous = null;

  const remember = (type, text) => {
    if (/\S/.test(text)) previous = { type, text };
  };

  while (index < code.length) {
    const char = code[index];

    if (isWhitespace(char)) {
      let end = index + 1;
      while (end < code.length && isWhitespace(code[end])) end += 1;
      const text = code.slice(index, end);
      push('plain', text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      index = end;
      continue;
    }

    if (char === '#') {
      let end = index + 1;
      while (end < code.length && code[end] !== '\n') end += 1;
      const text = code.slice(index, end);
      push('comment', text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      remember('comment', text);
      index = end;
      continue;
    }

    const stringStart = matchPythonStringStart(code, index);
    if (stringStart) {
      let delimiter = code[stringStart.quoteIndex];
      if (code.startsWith('"""', stringStart.quoteIndex)) delimiter = '"""';
      else if (code.startsWith("'''", stringStart.quoteIndex)) delimiter = "'''";

      const end = readPythonString(code, stringStart.quoteIndex, delimiter);
      const text = code.slice(index, end);
      // A standalone triple-quoted block is a docstring in practice. Colour it
      // like a comment (grey/italic) while keeping assigned multiline strings
      // in the normal string colour.
      const isDocstring = delimiter.length === 3 && lineOnlyWhitespace;
      const type = isDocstring ? 'comment' : 'string';
      push(type, text);
      lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
      remember(type, text);
      index = end;
      continue;
    }

    if (isDigit(char) || (char === '.' && isDigit(code[index + 1]))) {
      const match = code.slice(index).match(PYTHON_NUMBER);
      if (match) {
        const text = match[0];
        push('number', text);
        lineOnlyWhitespace = updateLineState(text, lineOnlyWhitespace);
        remember('number', text);
        index += text.length;
        continue;
      }
    }

    if (isIdentifierStart(char)) {
      let end = index + 1;
      while (end < code.length && isIdentifierPart(code[end])) end += 1;
      const identifier = code.slice(index, end);
      const type = classifyPythonIdentifier(identifier, code, end, previous);
      push(type, identifier);
      lineOnlyWhitespace = updateLineState(identifier, lineOnlyWhitespace);
      previous = { type, text: identifier };
      index = end;
      continue;
    }

    const operator = matchOperator(code, index, PYTHON_OPERATORS);
    if (operator) {
      push('operator', operator);
      lineOnlyWhitespace = updateLineState(operator, lineOnlyWhitespace);
      remember('operator', operator);
      index += operator.length;
      continue;
    }

    if (PYTHON_PUNCTUATION.has(char)) {
      push('punct', char);
      lineOnlyWhitespace = updateLineState(char, lineOnlyWhitespace);
      remember('punct', char);
      index += 1;
      continue;
    }

    push('plain', char);
    lineOnlyWhitespace = updateLineState(char, lineOnlyWhitespace);
    remember('plain', char);
    index += 1;
  }

  return tokens;
};

/**
 * Tokenize source into `{ type, text }` tokens. Joining all token texts always
 * reproduces the input exactly (including whitespace and trailing newlines).
 */
export const tokenize = (code, language = 'cpp') => {
  const source = typeof code === 'string' ? code : String(code ?? '');
  const resolved = detectLanguage(language, 'cpp');
  if (!source || resolved === 'plain') {
    return [{ type: 'plain', text: source }];
  }
  return resolved === 'python' ? scanPython(source) : scanCpp(source);
};

/**
 * Split tokens into display lines. Joining each line with '\n' reproduces the
 * input, so callers can render one <div> per line without losing text.
 */
export const tokenizeLines = (code, language = 'cpp') => {
  const tokens = tokenize(code, language);
  const lines = [[]];

  for (const token of tokens) {
    const parts = token.text.split('\n');
    for (let partIndex = 0; partIndex < parts.length; partIndex += 1) {
      if (partIndex > 0) lines.push([]);
      const text = parts[partIndex];
      if (text) lines[lines.length - 1].push({ type: token.type, text });
    }
  }

  return lines;
};

export default tokenize;
