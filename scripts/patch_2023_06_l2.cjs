const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2023-06-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '\\`\\`\\`';

function q(text) {
  return BT + text.replace(/`/g, '\\`').replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 3, tags: ['基础语法'], 
    q: "高级语言编写的程序需要经过以下（ ）操作，才可以生成在计算机上运行的可执行代码。",
    opts: ['编辑', '保存', '调试', '编译'],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **A 编辑**：❌ 指编写和修改源代码。\n- **B 保存**：❌ 指将代码存储到硬盘。\n- **C 调试**：❌ 指查找和修复程序中的错误。\n- **D 编译**：✅ 编译器将高级语言代码转换为计算机能直接执行的机器指令（目标代码）。' },
  { id: 2, ans: 3, tags: ['循环', '条件判断'], 
    q: "能够实现“当条件不成立时反复执行语句块、条件成立时结束循环”功能的伪代码是（ ）。",
    opts: ['if 条件判断 then 语句块', 'if 条件判断 then 什么也不做 else 语句块', 'while 条件判断 do 语句块', 'while not 条件判断 do 语句块'],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **C**：❌ `while` 循环通常在条件“成立”时执行。\n- **D**：✅ `while not 条件` 表示条件不成立时进入循环，一旦条件成立，`not 条件` 变为假，循环结束。' },
  { id: 3, ans: 1, tags: ['变量与标识符', '程序分析'], 
    q: "下列关于 C++ 语言的叙述，正确的是（ ）。",
    opts: ['char 类型变量不能赋值给 int 类型变量', '两个 int 类型变量相乘，结果仍为 int 类型', '两个 int 相乘溢出时程序会报错崩溃', 'double 相除且除数为 0.0 时程序会报错崩溃'],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **A**：❌ `char` 可以隐式转换为 `int`。\n- **B**：✅ 两个相同类型的整数运算，结果类型保持不变（`int`）。\n- **C**：❌ 溢出通常导致结果错误，但不会报错崩溃。\n- **D**：❌ 浮点数除以 0.0 得到 `inf`，不会崩溃。' },
  { id: 4, ans: 2, tags: ['基础语法'], 
    q: "下列关于 C++ 语句规则的叙述，不正确的是（ ）。",
    opts: ['if 的判断条件必须放在小括号中', 'for 语句中间循环条件可省略，表示恒为真', '循环体有多条语句时用缩进即可消除二义性', '运算符有优先级，不仅有先乘除后加减'],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C**：✅ C++ 多条语句必须使用花括号 `{}` 括起来，缩进不具语法意义。' },
  { id: 5, ans: 2, tags: ['变量与标识符'], 
    q: "以下哪个是 C++ 语言关键字（ ）。",
    opts: ['main', 'max', 'double', 'sqrt'],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C double**：✅ 预定义关键字。' },
  { id: 6, ans: 3, tags: ['运算符'], 
    q: "以下哪个不是 C++ 语言运算符（ ）。",
    opts: ['>=', '/=', '||', '<>'],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **D <>**：✅ C++ 中使用 `!=` 表示不等于。' },
  { id: 7, ans: 3, tags: ['变量与标识符', '运算符'], 
    q: "若 a 为 int、b 为 char，下列哪个语句不符合 C++ 语法（ ）。",
    opts: ["a = a+1.0;", "a = (int)(b-'0');", "b = (char)(a+'0');", "(int)b = a;"],
    expl: "**答案：D**\n\n**选项逐项分析：**\n- **D**：✅ 强制类型转换结果是右值，不能被赋值。" },
  { id: 8, ans: 0, tags: ['运算符', '程序分析'], 
    q: "用 int 变量 a、b 表示平行四边形边长，int 变量 h 表示 a 边对应高，以下哪个表达式不能用于计算 b 边对应高（ ）。",
    opts: ['a / b * (0.0+h)', '(0.0+a * h) / b', 'a * h / (b+0.0)', '(a+0.0) * h / b'],
    expl: '**答案：A**\n\n**解析：**\n`a / b` 整数除法会丢失精度。' },
  { id: 9, ans: 1, tags: ['循环', '程序分析'], 
    q: "以下哪个循环语句会无限次执行（ ）。",
    opts: ["for (int a = 0; a; a++) ;", "for (bool b = false; b <= true; b++) ;", "for (char c = 'A'; c < 'z'; c++) ;", "for (double d = 0.0; d < 10.0; d += 0.001) ;"],
    expl: '**答案：B**\n\n**解析：**\n`bool` 自增始终为 `true`，导致循环不退出。' },
  { id: 10, ans: 3, tags: ['输入输出', '运算符'], 
    q: "若 char 变量 a 的值为 'C'（ASCII 67），执行 cout << (a+2); 输出（ ）。",
    opts: ['E', 'C+2', 'C2', '69'],
    expl: "**答案：D**\n\n**解析：**\n结果提升为 `int`，输出 69。" },
  { id: 11, ans: 0, tags: ['条件判断', '运算符'], 
    q: "若 a、b 均为 int，能正确判断“a 等于 1 且 b 等于 1”的表达式是（ ）。",
    opts: ['(a == b) && (b == 1)', '(a && b)', '(a == b == 1)', '(a * b == 1)'],
    expl: '**答案：A**\n\n**解析：**\n使用 `&&` 显式判断两个条件。' },
  { id: 12, ans: 0, tags: ['条件判断', '运算符'], 
    q: "若 a 为 char，哪个表达式可正确判断“a 是数字字符”（ ）。",
    opts: ["'0' <= a && a <= '9'", "'1' <= a && a <= '0'", "'0' <= a <= '9'", "'1' <= a <= '0'"],
    expl: "**答案：A**\n\n**解析：**\n判断区间需用 `&&` 连接。" },
  { id: 13, ans: 3, tags: ['程序分析', '运算符'], 
    q: "使得最终输出字符是 9 的代码是（ ）。\n" + TBT + "cpp\nchar a = '3', b = '6';\ncout << ________;\n" + TBT,
    opts: ["(a+b)", "(a+b-'0')", "(char)(a+b)", "(char)(a+b-'0')"],
    expl: "**答案：D**\n\n**解析：**\n`'3' + '6' - '0'` 结果为 57，转为 `char` 即为 '9'。" },
  { id: 14, ans: 1, tags: ['循环', '程序分析'], 
    q: "可以使输出为 42 的代码是（ ）。\n" + TBT + "cpp\nint sum = 0;\nfor (int i = 1; i <= 20; i++)\n if (________)\n sum += i;\ncout << sum << endl;\n" + TBT,
    opts: ['i % 3 == 0', '20 % i == 0', 'i <= 8', 'i >= 18'],
    expl: '**答案：B**\n\n**解析：**\n累加 20 的所有正约数之和为 42。' },
  { id: 15, ans: 2, tags: ['程序分析'], 
    q: "执行以下 C++ 语言程序后，输出结果是（ ）。\n" + TBT + "cpp\nfor (char x = 'A'; x <= 'D'; x++)\n if ((x != 'A') + (x == 'C') + (x == 'D') + (x != 'D') == 3)\n cout << x;\n" + TBT,
    opts: ['A', 'B', 'C', 'D'],
    expl: "**答案：C**\n\n**解析：**\n代入验证符合逻辑。" }
];

const judgeQuestions = [
  { id: 16, ans: 1, text: '错误', logic: '约 13.2KB，超过 12.8KB (1/5)。', kaodian: '内存计算' },
  { id: 17, ans: 1, text: '错误', logic: '顶级域名是 cn。', kaodian: '域名' },
  { id: 18, ans: 0, text: '正确', logic: '数学函数声明在 <cmath> 中。', kaodian: '头文件' },
  { id: 19, ans: 1, text: '错误', logic: '下划线不是运算符。', kaodian: '运算符' },
  { id: 20, ans: 1, text: '错误', logic: '结果仍为 double 类型。', kaodian: '数据类型' },
  { id: 21, ans: 0, text: '正确', logic: '多语句块需花括号。', kaodian: '语法' },
  { id: 22, ans: 0, text: '正确', logic: '条件恒真会导致无限循环。', kaodian: '循环' },
  { id: 23, ans: 1, text: '错误', logic: '+= 也是运算符。', kaodian: '运算符' },
  { id: 24, ans: 0, text: '正确', logic: "'F' + 1 = 'G'。", kaodian: '字符运算' },
  { id: 25, ans: 1, text: '错误', logic: 'sqrt 返回 double 类型。', kaodian: '数据类型' }
];

let questionsStr = '[\n';
singleQuestions.forEach(it => {
  questionsStr += '        {\n';
  questionsStr += '            id: ' + it.id + ',\n';
  questionsStr += "            type: 'single',\n";
  questionsStr += '            question: ' + q(it.q) + ',\n';
  questionsStr += '            options: ' + JSON.stringify(it.opts) + ',\n';
  questionsStr += '            answer: ' + it.ans + ',\n';
  questionsStr += '            score: 2,\n';
  questionsStr += '            explanation: ' + q(it.expl + '\n\n**考点：** ' + it.tags[0]) + ',\n';
  questionsStr += '            tags: ' + JSON.stringify(it.tags) + '\n';
  questionsStr += '        },\n';
});

judgeQuestions.forEach(it => {
  questionsStr += '        {\n';
  questionsStr += '            id: ' + it.id + ',\n';
  questionsStr += "            type: 'judge',\n";
  // Safe match for question string enclosed in backticks
  const qMatch = content.match(new RegExp('id: ' + it.id + ',[\\s\\S]*?question:\\s*(`[\\s\\S]*?`)'));
  const oldQ = qMatch ? qMatch[1] : '`未知判断题`';
  questionsStr += '            question: ' + oldQ + ',\n';
  questionsStr += '            options: ["正确", "错误"],\n';
  questionsStr += '            answer: ' + it.ans + ',\n';
  questionsStr += '            score: 2,\n';
  questionsStr += '            explanation: ' + q('**答案：' + it.text + '**\n\n' + '**判定依据：**\n' + it.logic + '\n\n**考点：** ' + it.kaodian) + ',\n';
  questionsStr += '            tags: ["判断题"]\n';
  questionsStr += '        }' + (it.id === 25 ? '' : ',') + '\n';
});
questionsStr += '    ]';

// Replace the entire questions array, ensuring we match the whole block correctly
const questionsRe = /questions: \[\s*\{[\s\S]*?\}\s*\]\s*,\s*\n\s*programmingQuestions:/;
content = content.replace(questionsRe, 'questions: ' + questionsStr + ',\n    programmingQuestions:');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched 2023-06-l2.js');
