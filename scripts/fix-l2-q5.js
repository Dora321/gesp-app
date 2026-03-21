import fs from 'fs';
const f = 'src/data/gesp/level2/2025-09-l2.js';
let c = fs.readFileSync(f, 'utf8');

// The original line was:
// ... question: '下面 C++ 代码执行，其输出是（ ）。\na, b = 3, 4;\nc = a == b;\n```cpp\ncout << a << \' \' << b << \' \' << c;', ...

// We want to replace it to wrap the whole code block in backticks.
c = c.replace(
  "a, b = 3, 4;\\nc = a == b;\\n```cpp\\ncout",
  "```cpp\\na, b = 3, 4;\\nc = a == b;\\ncout"
);

c = c.replace(
  "<< c;', options:",
  "<< c;\\n```', options:"
);

fs.writeFileSync(f, c);
console.log("Fixed code block format in " + f);
