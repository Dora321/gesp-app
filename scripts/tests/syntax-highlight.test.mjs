import test from 'node:test';
import assert from 'node:assert/strict';
import { detectLanguage, tokenize, tokenizeLines } from '../../src/utils/syntaxHighlight.js';

const findToken = (tokens, text) => tokens.find((token) => token.text === text);
const joinTokens = (tokens) => tokens.map((token) => token.text).join('');
const joinLines = (code, language) => tokenizeLines(code, language)
  .map((line) => line.map((token) => token.text).join(''))
  .join('\n');

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

test('C++11/STL vocabulary from GESP L4-L8 is classified', () => {
  const keywords = ['override', 'final'];
  const types = [
    'ifstream', 'ofstream', 'fstream', 'stringstream', 'istringstream',
    'ostringstream', 'forward_list', 'iterator', 'const_iterator',
    'unordered_map', 'unordered_set', 'priority_queue', 'pair', 'tuple',
  ];
  const builtins = [
    'freopen', 'fclose', 'fopen', 'fprintf', 'fscanf', 'sscanf', 'sprintf',
    'stdin', 'stdout', 'stderr', 'make_pair', 'make_tuple', 'emplace',
    'emplace_back', 'push', 'pop', 'top', 'peek', 'lower_bound',
    'upper_bound', 'binary_search', 'nth_element', 'next_permutation',
    'prev_permutation', 'unique', 'fill', 'iota', 'accumulate', 'count',
    'max_element', 'min_element', 'gcd', 'lcm', '__gcd', 'hypot', 'atan2',
    'exp', 'isdigit', 'isalpha', 'isalnum', 'islower', 'isupper', 'isspace',
    'ios', 'sync_with_stdio', 'tie', 'INT_MAX', 'INT_MIN', 'LLONG_MAX',
    'LLONG_MIN', 'EOF', 'npos',
  ];

  const code = [...keywords, ...types, ...builtins].join(' ');
  const tokens = tokenize(code, 'cpp');

  for (const name of keywords) {
    assert.equal(findToken(tokens, name)?.type, 'keyword', name);
  }
  for (const name of types) {
    assert.equal(findToken(tokens, name)?.type, 'type', name);
  }
  for (const name of builtins) {
    assert.equal(findToken(tokens, name)?.type, 'builtin', name);
  }
  assert.equal(joinTokens(tokens), code);
});

test('C++11 contest snippet tokenizes and round-trips exactly', () => {
  const code = `#include <bits/stdc++.h>
#include <fstream>
using namespace std;

struct Runner final : public Base {
    void run() override {}
};

int main() {
    freopen("in.txt", "r", stdin);
    ifstream fin("in.txt");
    forward_list<int> fl;
    priority_queue<int> pq;
    unordered_map<string, int> mp;
    vector<int> v = {5, 3, 1, 4, 2};
    vector<int>::iterator it = lower_bound(v.begin(), v.end(), 3);
    nth_element(v.begin(), v.begin() + 2, v.end());
    next_permutation(v.begin(), v.end());
    mp.emplace("a", 1);
    mp.insert(make_pair("b", 2));
    pq.push(1);
    pq.pop();
    int g = gcd(12, 18);
    int x = INT_MAX;
    cout << *it << g << x << endl;
    return 0;
}
`;

  const tokens = tokenize(code, 'cpp');

  assert.equal(findToken(tokens, '#include').type, 'keyword');
  assert.equal(findToken(tokens, '<bits/stdc++.h>').type, 'string');
  assert.equal(findToken(tokens, 'override').type, 'keyword');
  assert.equal(findToken(tokens, 'final').type, 'keyword');
  assert.equal(findToken(tokens, 'freopen').type, 'builtin');
  assert.equal(findToken(tokens, 'priority_queue').type, 'type');
  assert.equal(findToken(tokens, 'unordered_map').type, 'type');
  assert.equal(findToken(tokens, 'forward_list').type, 'type');
  assert.equal(findToken(tokens, 'iterator').type, 'type');
  assert.equal(findToken(tokens, 'lower_bound').type, 'builtin');
  assert.equal(findToken(tokens, 'nth_element').type, 'builtin');
  assert.equal(findToken(tokens, 'next_permutation').type, 'builtin');
  assert.equal(findToken(tokens, 'emplace').type, 'builtin');
  assert.equal(findToken(tokens, 'make_pair').type, 'builtin');
  assert.equal(findToken(tokens, 'gcd').type, 'builtin');
  assert.equal(findToken(tokens, 'INT_MAX').type, 'builtin');

  assert.equal(joinTokens(tokens), code);
  assert.equal(joinLines(code, 'cpp'), code);
});

test('C++ strings with escaped quotes, comments and includes round-trip losslessly', () => {
  const code = '#include <bits/stdc++.h>\n'
    + '// a "quoted" comment\n'
    + 'int main() {\n'
    + '    std::string s = "say \\"hi\\"\\n";\n'
    + "    char c = '\\'';\n"
    + '    /* block\n'
    + '       comment */\n'
    + '    return 0;\n'
    + '}\n';

  const tokens = tokenize(code, 'cpp');

  assert.equal(findToken(tokens, '#include').type, 'keyword');
  assert.equal(findToken(tokens, '<bits/stdc++.h>').type, 'string');
  assert.equal(findToken(tokens, '// a "quoted" comment').type, 'comment');
  assert.equal(findToken(tokens, '/* block\n       comment */').type, 'comment');
  assert.equal(findToken(tokens, '"say \\"hi\\"\\n"').type, 'string');
  assert.equal(findToken(tokens, "'\\''").type, 'string');
  assert.equal(joinTokens(tokens), code);
  assert.equal(joinLines(code, 'cpp'), code);
});

test('Python common teaching builtins are classified as builtins', () => {
  const builtins = [
    'enumerate', 'zip', 'sorted', 'reversed', 'isinstance', 'chr', 'ord',
    'hex', 'bin', 'oct', 'round', 'divmod', 'pow', 'any', 'all', 'open',
    'input', 'print', 'range', 'len', 'sum', 'min', 'max', 'abs', 'map',
    'filter',
  ];

  const code = `${builtins.join(' ')}\n`;
  const tokens = tokenize(code, 'python');

  for (const name of builtins) {
    assert.equal(findToken(tokens, name)?.type, 'builtin', name);
  }
  assert.equal(joinTokens(tokens), code);
});

test('Python builtins, comments, strings and docstrings round-trip losslessly', () => {
  const code = '# helpers\n'
    + 'values = [3, 1, 2]\n'
    + 'for index, value in enumerate(sorted(values, reverse=True)):\n'
    + '    print(pow(value, 2), divmod(value, 2), chr(65), ord("A"))\n'
    + 'text = "say \\"hi\\""\n'
    + 'total = sum(values)\n'
    + '"""module doc\nstring"""\n';

  const tokens = tokenize(code, 'python');

  assert.equal(findToken(tokens, '# helpers').type, 'comment');
  assert.equal(findToken(tokens, 'enumerate').type, 'builtin');
  assert.equal(findToken(tokens, 'sorted').type, 'builtin');
  assert.equal(findToken(tokens, 'print').type, 'builtin');
  assert.equal(findToken(tokens, 'pow').type, 'builtin');
  assert.equal(findToken(tokens, 'divmod').type, 'builtin');
  assert.equal(findToken(tokens, 'chr').type, 'builtin');
  assert.equal(findToken(tokens, 'ord').type, 'builtin');
  assert.equal(findToken(tokens, 'sum').type, 'builtin');
  assert.equal(findToken(tokens, '"say \\"hi\\""').type, 'string');
  assert.equal(findToken(tokens, '"""module doc\nstring"""').type, 'comment');
  assert.equal(joinTokens(tokens), code);
  assert.equal(joinLines(code, 'python'), code);
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
