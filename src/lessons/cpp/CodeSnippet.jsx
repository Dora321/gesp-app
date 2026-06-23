// 可复用的 C++ 代码片段组件：统一的深色主题 + 词法高亮。
// 用法：<CodeSnippet code={`int a = 1;\ncout << a;`} />
// 需要在同一深色块内追加内容（如交互按钮、批注）时，传 children。

const KEYWORDS = new Set([
  'int', 'long', 'short', 'char', 'bool', 'float', 'double', 'void',
  'unsigned', 'signed', 'const', 'static', 'auto', 'enum', 'struct',
  'class', 'public', 'private', 'protected', 'template', 'typename',
  'namespace', 'using', 'this', 'new', 'delete', 'sizeof', 'nullptr',
  'NULL', 'true', 'false',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
  'break', 'continue', 'return', 'goto',
]);

// 流对象与常见库标识符（不一定后跟括号，单独着色）。
const BUILTINS = new Set([
  'cin', 'cout', 'cerr', 'clog', 'endl', 'std', 'string', 'vector',
  'fixed', 'setprecision', 'setw',
]);

const COLOR = {
  comment: 'text-slate-500',
  string: 'text-emerald-300',
  number: 'text-amber-300',
  keyword: 'text-sky-400',
  builtin: 'text-violet-300',
  func: 'text-violet-300',
  operator: 'text-pink-400',
  punct: 'text-slate-400',
  plain: '',
};

const TOKEN =
  /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*[fFuUlL]*\b)|([A-Za-z_]\w*)|(<<|>>|\+\+|--|->|<=|>=|==|!=|&&|\|\||::|[-+*/%=<>!&|^~?:.])|([{}()[\];,])|(\s+)/g;

function tokenizeLine(line) {
  // 预处理指令整行单独处理（#include <...> 的尖括号内容按字符串着色）。
  const pre = line.match(/^(\s*)(#\s*[a-z]+)(.*)$/);
  if (pre) {
    const [, ws, directive, rest] = pre;
    const tokens = [];
    if (ws) tokens.push({ text: ws, cls: COLOR.plain });
    tokens.push({ text: directive, cls: COLOR.keyword });
    const incl = rest.match(/^(\s*)(<[^>]+>)(.*)$/);
    if (incl) {
      if (incl[1]) tokens.push({ text: incl[1], cls: COLOR.plain });
      tokens.push({ text: incl[2], cls: COLOR.string });
      if (incl[3]) tokens.push({ text: incl[3], cls: COLOR.plain });
    } else if (rest) {
      tokens.push({ text: rest, cls: COLOR.plain });
    }
    return tokens;
  }

  const tokens = [];
  TOKEN.lastIndex = 0;
  let m;
  while ((m = TOKEN.exec(line)) !== null) {
    const [, comment, str, num, ident, op, punct, ws] = m;
    if (comment !== undefined) tokens.push({ text: comment, cls: COLOR.comment });
    else if (str !== undefined) tokens.push({ text: str, cls: COLOR.string });
    else if (num !== undefined) tokens.push({ text: num, cls: COLOR.number });
    else if (ident !== undefined) {
      let cls = COLOR.plain;
      if (KEYWORDS.has(ident)) cls = COLOR.keyword;
      else if (BUILTINS.has(ident)) cls = COLOR.builtin;
      else if (/^\s*\(/.test(line.slice(TOKEN.lastIndex))) cls = COLOR.func;
      tokens.push({ text: ident, cls });
    } else if (op !== undefined) tokens.push({ text: op, cls: COLOR.operator });
    else if (punct !== undefined) tokens.push({ text: punct, cls: COLOR.punct });
    else tokens.push({ text: ws, cls: COLOR.plain });
  }
  return tokens;
}

export default function CodeSnippet({ code, className = '', children }) {
  const lines = String(code).replace(/\n+$/, '').split('\n');

  return (
    <div
      className={`overflow-x-auto rounded-lg bg-gray-800 p-4 font-mono text-sm leading-relaxed text-slate-100 ${className}`}
    >
      {lines.map((line, i) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={i} className="whitespace-pre">
            {tokens.length === 0
              ? ' '
              : tokens.map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
          </div>
        );
      })}
      {children}
    </div>
  );
}
