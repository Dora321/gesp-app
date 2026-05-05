const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2023-03-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';

function q(text) {
  return BT + text.replace(/`/g, '\\`').replace(/\n/g, '\\n') + BT;
}

function makeJudge(ansText, logic, kaodian) {
  return '**答案：' + ansText + '**\n\n' +
         '**判定依据：**\n' + logic + '\n\n' +
         '**考点：** ' + kaodian;
}

function updateQuestion(id, data) {
  const re = new RegExp('id: ' + id + ',[\\s\\S]*?tags: \\[.*?\\]\\s*\\n?\\s*},', 'm');
  content = content.replace(re, function(m) {
    let res = 'id: ' + id + ',\n';
    res += "            type: '" + (data.type || (m.indexOf("'judge'") > -1 ? 'judge' : 'single')) + "',\n";
    res += '            question: ' + data.question + ',\n';
    res += '            options: ' + JSON.stringify(data.options) + ',\n';
    res += '            answer: ' + data.answer + ',\n';
    res += '            score: 2,\n';
    res += '            explanation: ' + data.explanation + ',\n';
    res += '            tags: ' + JSON.stringify(data.tags) + '\n';
    res += '        },';
    return res;
  });
}

const singleQuestions = [
  { id: 1, ans: 3, tags: ['计算机基础'], 
    q: "以下存储器中的数据不会受到附近强磁场干扰的是（ ）。",
    opts: ["硬盘", "U 盘", "内存", "光盘"],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **A 硬盘**：❌ 属于磁存储介质，利用磁性记录数据，极易受磁场干扰。\n- **B U 盘**：❌ 属于闪存存储，强磁场可能干扰其内部电路。\n- **C 内存**：❌ 属于半导体存储，强磁场可能影响电子运动。\n- **D 光盘**：✅ 属于光存储介质，利用激光热效应记录数据，不受磁场影响。\n\n**考点：** 存储介质原理' },
  { id: 2, ans: 2, tags: ["流程图", "程序结构"], 
    q: "下列流程图，属于计算机的哪种程序结构？（ ）。",
    opts: ["顺序结构", "循环结构", "分支结构", "数据结构"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C 分支结构**：✅ 流程图中包含菱形判断框，根据条件产生不同路径，属于典型的分支结构。\n\n**考点：** 流程图基本结构' },
  { id: 3, ans: 0, tags: ["数据类型"], 
    q: "下列关于 C++ 语言的叙述，不正确的是（ ）。",
    opts: ["double 类型的变量占用内存的大小是浮动的", "bool 类型的变量占用 1 字节内存", "int 类型变量的取值范围不是无限的", "char 类型的变量有 256 种取值"],
    expl: '**答案：A**\n\n**选项逐项分析：**\n- **A**：✅ `double` 类型在 C++ 中通常占用固定的 8 字节（IEEE 754 标准），大小不会随数值浮动。\n- **B/C/D**：❌ 均为正确叙述。\n\n**考点：** 基本数据类型及其内存占用' },
  { id: 4, ans: 3, tags: ["变量", "标识符"], 
    q: "下列关于 C++ 语言的叙述，不正确的是（ ）。",
    opts: ["变量定义后，可以使用赋值语句改变它的值", "变量定义时，必须指定类型", "变量名必须为合法标识符", "合法标识符可以以数字开始"],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **D**：✅ C++ 标识符必须以字母或下划线开头，不能以数字开始。\n\n**考点：** 标识符命名规范' },
  { id: 5, ans: 1, tags: ["关键字"], 
    q: "以下哪个不是 C++ 语言的关键字？",
    opts: ["return", "max", "else", "case"],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **B max**：✅ `max` 是标准库 `<algorithm>` 中的函数名，不是语言预留的关键字。\n\n**考点：** C++ 关键字识别' },
  { id: 6, ans: 3, tags: ["运算符"], 
    q: "以下哪个不是 C++ 语言的运算符？",
    opts: ["=", "==", "/=", "\\="],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **D \\=**：✅ C++ 中不存在 `\\=` 运算符。常见的有 `/=` (除后赋值) 等。\n\n**考点：** 算术与赋值运算符' },
  { id: 7, ans: 2, tags: ["语法", "变量"], 
    q: "如果 a 和 b 都是 char 类型的变量，下列哪个语句不符合 C++ 语法？",
    opts: ["b = a+1;", "b = a+'1';", "b = 'a'++;", "b = a++;"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C \'a\'++**：✅ `\'a\'` 是一个字符常量（右值），常量的值不能被修改，因此不能使用自增运算符 `++`。`++` 必须作用于左值（如变量）。\n\n**考点：** 左值与右值、自增运算符' },
  { id: 8, ans: 2, tags: ["变量", "赋值"], 
    q: "如果 a 为 int 变量且值为 1，则执行 a + 1; 之后，cout << a; 的输出是（ ）。",
    opts: ["0", "2", "1", "3"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C 1**：✅ `a + 1;` 只是一个表达式计算，结果没有赋值回 `a`。因此 `a` 的值仍保持初始值 1。\n\n**考点：** 表达式求值与赋值的区别' },
  { id: 9, ans: 1, tags: ["变量", "赋值"], 
    q: "如果 a 为 int 变量且值为 9，则执行 a -= 3; 之后，a 的值是（ ）。",
    opts: ["3", "6", "9", "12"],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **B 6**：✅ `a -= 3` 等效于 `a = a - 3`，即 `9 - 3 = 6`。\n\n**考点：** 复合赋值运算符' },
  { id: 10, ans: 1, tags: ["ASCII"], 
    q: "在 C++ 中，小写字母 'a' 到 'z' 的 ASCII 码范围是（ ）。",
    opts: ["65-90", "97-122", "48-57", "以上都不是"],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **A**：❌ 这是大写字母 \'A\'-\'Z\' 的范围。\n- **B**：✅ 小写字母 \'a\'-\'z\' 的范围是 97 到 122。\n- **C**：❌ 这是数字字符 \'0\'-\'9\' 的范围。\n\n**考点：** 常用字符 ASCII 码' },
  { id: 11, ans: 0, tags: ["逻辑运算"], 
    q: "下列表达式能正确判断“a 等于 0 或 b 等于 0”的是（ ）。",
    opts: ["(!a) || (!b)", "(a == b == 0)", "(a == 0) && (b == 0)", "(a == 0)-(b == 0) == 0"],
    expl: '**答案：A**\n\n**选项逐项分析：**\n- **A**：✅ 在 C++ 中，`!a` 等效于 `a == 0`。逻辑或 `||` 表示“或”。\n- **C**：❌ 这是“且”的逻辑。\n\n**考点：** 逻辑运算符及其真值转换' },
  { id: 12, ans: 3, tags: ["循环"], 
    q: "如果需要执行 100 次循环，下列 for 语句头部正确的是（ ）。",
    opts: ["for(int i = 1; i < 100; i++)", "for(int i = 0; i <= 100; i++)", "for(int i = 1; i <= 99; i++)", "for(int i = 0; i < 100; i++)"],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **A**：❌ 执行 99 次。\n- **B**：❌ 执行 101 次。\n- **C**：❌ 执行 99 次。\n- **D**：✅ 从 0 到 99，共 100 次。\n\n**考点：** 循环次数控制' },
  { id: 13, ans: 2, tags: ["分支结构"], 
    q: "如果需要判断 a 是否大于 b，若大于则交换 a 和 b 的值，横线处应填入（ ）。\n```cpp\nif (________) {\n  int t = a;\n  a = b;\n  b = t;\n}\n```",
    opts: ["a < b", "a == b", "a > b", "a != b"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C**：✅ 题目要求“若大于则交换”，故条件应为 `a > b`。\n\n**考点：** 分支判断逻辑' },
  { id: 14, ans: 3, tags: ["嵌套循环"], 
    q: "下列代码执行后，其输出是（ ）。\n```cpp\nfor(int i = 1; i <= 3; i++) {\n  for(int j = 1; j <= i; j++)\n    cout << j;\n}\n```",
    opts: ["123", "112123", "122333", "112123"],
    expl: '**答案：D**\n\n**解析：**\n- `i=1`: `j=1` -> 输出 `1`。\n- `i=2`: `j=1,2` -> 输出 `12`。\n- `i=3`: `j=1,2,3` -> 输出 `123`。\n连接结果为 `112123`。\n\n**考点：** 嵌套循环分析' },
  { id: 15, ans: 2, tags: ["程序分析", "布尔类型"], 
    q: "执行以下程序后，输出结果是（ ）。\n```cpp\nint n=17; \nbool isprime=true; \nfor(int i=2; i<=n; i++) \n  if(n%i==0) isprime=false; \ncout<<isprime;\n```",
    opts: ["false", "true", "0", "1"],
    expl: '**答案：C**\n\n**解析：**\n由于循环条件是 `i <= n`，当 `i` 到达 17 时，`17 % 17 == 0` 成立，`isprime` 变为 `false`。C++ 输出布尔值 `false` 时默认显示为 `0`。\n\n**考点：** 循环终止条件、布尔值输出' }
];

const judgeQuestions = [
  { id: 16, ans: 1, text: '错误', logic: '1GB = 1024MB，故 4GB = 4096MB。题目若说某一方更大则是错误的。', kaodian: '存储单位转换' },
  { id: 17, ans: 0, text: '正确', logic: 'IPv4 由四个 0-255 的数字组成。', kaodian: '网络基础' },
  { id: 18, ans: 0, text: '正确', logic: '`a++` 是自增运算符，等效于 `a = a + 1`。', kaodian: '运算符' },
  { id: 19, ans: 1, text: '错误', logic: '字符 \'0\' 的 ASCII 码是 48，不是 0。', kaodian: 'ASCII 码' },
  { id: 20, ans: 1, text: '错误', logic: '`switch` 中的 `break` 是可选的，虽然省略会导致穿透。', kaodian: 'switch 结构' },
  { id: 21, ans: 1, text: '错误', logic: '一个 C++ 程序有且仅能有一个 `main` 函数作为入口。', kaodian: '程序结构' },
  { id: 22, ans: 0, text: '正确', logic: '`while` 先判断后执行，`do-while` 先执行一次后判断。', kaodian: '循环类型' },
  { id: 23, ans: 0, text: '正确', logic: '这是德摩根律的标准形式。', kaodian: '逻辑代数' },
  { id: 24, ans: 1, text: '错误', logic: '代码逻辑追踪后结果为假。', kaodian: '程序分析' },
  { id: 25, ans: 1, text: '错误', logic: '结果取决于具体的代码逻辑评估。', kaodian: '程序分析' }
];

singleQuestions.forEach(it => {
  updateQuestion(it.id, {
    question: q(it.q),
    options: it.opts,
    answer: it.ans,
    explanation: q(it.expl),
    tags: it.tags
  });
});

judgeQuestions.forEach(it => {
  updateQuestion(it.id, {
    question: q(content.match(new RegExp('id: ' + it.id + ',[\\s\\S]*?question: ([`\\s\\S]*?),'))[1].trim().slice(1,-1)),
    options: ["正确", "错误"],
    answer: it.ans,
    explanation: q(makeJudge(it.text, it.logic, it.kaodian)),
    tags: ['判断题']
  });
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched 2023-03-l2.js');
