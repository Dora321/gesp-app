import test from 'node:test';
import assert from 'node:assert/strict';
import { detectLanguage, tokenize, tokenizeLines } from '../../src/utils/syntaxHighlight.js';

const findToken = (tokens, text) => tokens.find((token) => token.text === text);
const joinTokens = (tokens) => tokens.map((token) => token.text).join('');

test('tokenize C++: keywords, types, strings, numbers, comments and builtins', () => {
  const code = `#include <iostream>
// print a greeting

int main() {
    std::string name = "GESP";
    int n = 42;
    for (int i = 0; i < n; i++) {
        if (i % 2 == 0) std::cout << name << endl;
    }
    return 0;
}`;

  const tokens = tokenize(code, 'cpp');

  assert.equal(findToken(tokens, '#include').type, 'keyword');
  assert.equal(findToken(tokens, '<iostream>').type, 'string');
  assert.equal(findToken(tokens, '// print a greeting').type, 'comment');
  assert.equal(findToken(tokens, 'int').type, 'type');
  assert.equal(findToken(tokens, 'main').type, 'function');
  assert.equal(findToken(tokens, 'std').type, 'builtin');
  assert.equal(findToken(tokens, 'cout').type, 'builtin');
  assert.equal(findToken(tokens, '"GESP"').type, 'string');
  assert.equal(findToken(tokens, '42').type, 'number');
  assert.equal(findToken(tokens, 'for').type, 'keyword');
  assert.equal(findToken(tokens, 'if').type, 'keyword');
  assert.equal(findToken(tokens, 'return').type, 'keyword');
  assert.ok(tokens.some((token) => token.type === 'operator'));
  assert.ok(tokens.some((token) => token.type === 'punct'));
});

test('tokenize Python: def/if/#comment, builtins, strings and numbers', () => {
  const code = `# greet
def greet(name):
    if name:
        print("Hello", name)
    else:
        return None

for i in range(3):
    print(i)
`;

  const tokens = tokenize(code, 'python');

  assert.equal(findToken(tokens, '# greet').type, 'comment');
  assert.equal(findToken(tokens, 'def').type, 'keyword');
  assert.equal(findToken(tokens, 'if').type, 'keyword');
  assert.equal(findToken(tokens, 'else').type, 'keyword');
  assert.equal(findToken(tokens, 'for').type, 'keyword');
  assert.equal(findToken(tokens, 'in').type, 'keyword');
  assert.equal(findToken(tokens, 'return').type, 'keyword');
  assert.equal(findToken(tokens, 'None').type, 'keyword');
  assert.equal(findToken(tokens, 'greet').type, 'function');
  assert.equal(findToken(tokens, 'print').type, 'builtin');
  assert.equal(findToken(tokens, 'range').type, 'builtin');
  assert.equal(findToken(tokens, '"Hello"').type, 'string');
  assert.equal(findToken(tokens, '3').type, 'number');
});

test('Python triple-quoted docstrings are comments, assigned multiline strings are strings', () => {
  const code = 'def f():\n    """Docstring."""\n    return 1\n\nx = """a\nb"""\n';
  const tokens = tokenize(code, 'python');

  assert.equal(findToken(tokens, '"""Docstring."""').type, 'comment');
  assert.equal(findToken(tokens, '"""a\nb"""').type, 'string');
});

test('round-trip: joining tokens reproduces the input exactly', () => {
  const cpp = '/* multi\nline comment */\n#include <bits/stdc++.h>\nint x = 1; // tail\n\n';
  const python = 'def f(x):\n    # note\n    return "a\\"b" if x else 0\n\n';
  const plain = 'int x = 1; // not highlighted\n';

  assert.equal(joinTokens(tokenize(cpp, 'cpp')), cpp);
  assert.equal(joinTokens(tokenize(python, 'python')), python);
  assert.equal(joinTokens(tokenize(plain, 'text')), plain);
  assert.equal(joinTokens(tokenize('', 'cpp')), '');
});

test('tokenizeLines keeps every line and trailing blank line', () => {
  const code = 'int a = 1;\n\nint b = 2;\n';
  const lines = tokenizeLines(code, 'cpp');

  assert.equal(lines.length, 4);
  assert.equal(lines.map((line) => line.map((token) => token.text).join('')).join('\n'), code);
});

test('detectLanguage maps fences, aliases and plain-text fences', () => {
  assert.equal(detectLanguage('language-cpp'), 'cpp');
  assert.equal(detectLanguage('language-c++'), 'cpp');
  assert.equal(detectLanguage('cpp'), 'cpp');
  assert.equal(detectLanguage('C'), 'cpp');
  assert.equal(detectLanguage('language-python'), 'python');
  assert.equal(detectLanguage('lang-py'), 'python');
  assert.equal(detectLanguage('py3'), 'python');
  assert.equal(detectLanguage('language-text'), 'plain');
  assert.equal(detectLanguage('plain'), 'plain');
  assert.equal(detectLanguage('output'), 'plain');
  assert.equal(detectLanguage('language-rust'), 'cpp');
  assert.equal(detectLanguage('language-rust', 'python'), 'python');
  assert.equal(detectLanguage('', 'python'), 'python');
  assert.equal(detectLanguage(undefined), 'cpp');
});

test('plain/text languages return one plain token and never colour keywords', () => {
  const code = 'int x = 1; // not code\n';
  const tokens = tokenize(code, 'plain');

  assert.deepEqual(tokens, [{ type: 'plain', text: code }]);
  assert.equal(tokens.some((token) => token.type === 'keyword'), false);
});
