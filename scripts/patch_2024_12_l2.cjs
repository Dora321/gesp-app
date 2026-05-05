const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2024-12-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 2, tags: ['计算机常识'], 
    q: "2024年10月8日，诺贝尔物理学奖“意外地”颁给了两位计算机科学家（Hopfield、Hinton），两人的主要研究方向是（ ）。",
    opts: ["天体物理", "流体力学", "人工智能", "量子理论"],
    expl: '**答案：C**\n\n**解析：**\n约翰·霍普菲尔德（John Hopfield）和杰弗里·辛顿（Geoffrey Hinton）因在“利用人工神经网络进行机器学习的基础性发现和发明”方面的贡献，获得了 2024 年诺贝尔物理学奖。这标志着人工智能领域的重要突破得到了物理学界的认可。' },
  { id: 2, ans: 0, tags: ['计算机基础'], 
    q: "计算机系统中存储的基本单位用 B 表示，它代表的是（ ）。",
    opts: ["Byte", "Block", "Bulk", "Bit"],
    expl: '**答案：A**\n\n**解析：**\n- **B (Byte)**：字节，是计算机信息技术用于计量存储容量的一种计量单位。\n- **b (bit)**：比特（位），是计算机内部数据储存的最小单位。\n1 Byte = 8 bits。' },
  { id: 3, ans: 3, tags: ['算术运算'], 
    q: "C++ 语句 `cout << (3 + 3 % 3 * 2 - 1)` 执行后输出的值是（ ）。",
    opts: ["-1", "4", "56", "2"],
    expl: '**答案：D**\n\n**解析：**\n遵循运算符优先级（先乘除模，后加减）：\n1. `3 % 3 = 0`。\n2. `0 * 2 = 0`。\n3. `3 + 0 - 1 = 2`。' },
  { id: 4, ans: 0, tags: ['程序分析'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < 10; i++) printf(\"%d\", i);\n" + TBT,
    opts: ["0123456789", "0,1,2,3,4,5,6,7,8,9", "0 1 2 3 4 5 6 7 8 9", "12345678910"],
    expl: '**答案：A**\n\n**解析：**\n`printf(\"%d\", i)` 仅按十进制输出整数 `i`。循环从 0 到 9 执行，输出项之间没有任何空格或分隔符。' },
  { id: 5, ans: 3, tags: ['变量初始化'], 
    q: "下面 C++ 代码的相关说法中，正确的是（ ）。\n" + TBT + "cpp\nint tnt;\nfor (int i = 0; i < 10; i++) tnt += i;\ncout << tnt;\n" + TBT,
    opts: ["求 1-10 的和（含10）", "求 1-10 的和（不含10）", "求 0-10 的和（不含10）", "将输出不确定的值"],
    expl: '**答案：D**\n\n**解析：**\n局部变量 `tnt` 在定义时未初始化。在 C++ 中，未初始化的局部变量的值是未定义的（通常是内存中的残留数据）。因此执行 `tnt += i` 后结果是不确定的。' },
  { id: 6, ans: 1, tags: ['循环控制'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nint i = 1;\nfor (; i < 10; i++) {\n    if (i % 2) continue;\n    else break;\n}\ncout << i;\n" + TBT,
    opts: ["1", "2", "10", "11"],
    expl: '**答案：B**\n\n**解析：**\n1. `i=1`: `1 % 2` 为 1 (真)，执行 `continue`，进入下一次循环。\n2. `i=2`: `2 % 2` 为 0 (假)，执行 `else break`，跳出循环。\n最后输出 `i` 的值 2。' },
  { id: 7, ans: 0, tags: ['程序分析'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nint i = 0;\nfor (; i < 10; i++) {\n    if (i % 3) continue;\n    cout << \"0#\";\n}\ncout << \"1#\";\n" + TBT,
    opts: ["0#0#0#0#1#", "0#1#", "0#0#1#", "0#0#0#0#"],
    expl: '**答案：A**\n\n**解析：**\n`i % 3` 为真（非零）时跳过。即只有 `i` 为 3 的倍数时执行 `cout << \"0#\"`：\n- `i=0, 3, 6, 9` 时输出 `0#`（共 4 次）。\n- 循环结束后，执行末尾的 `cout << \"1#\"`。\n合并结果：`0#0#0#0#1#`。' },
  { id: 8, ans: 2, tags: ['逻辑运算'], 
    q: "代码输出 0 到 99 能被 7 整除但不能被 3 整除的数，横线处“不能”填入的代码是（ ）。",
    opts: ["i % 7 == 0 && i % 3 != 0", "!(i % 7) && i % 3 != 0", "i % 7 && i % 3", "i % 7 == 0 && !(i % 3 == 0)"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **A/B/D**：均为正确的逻辑表达（其中 `!0` 为真）。\n- **C i % 7 && i % 3**：含义是 `i` 不能被 7 整除且不能被 3 整除，与题目要求完全相反。' },
  { id: 9, ans: 3, tags: ['程序分析'], 
    q: "代码求正整数各位数字之和，横线处“不应”填入的是（ ）。\n" + TBT + "cpp\nwhile (N != 0) {\n    ________\n    N /= 10;\n}\n" + TBT,
    opts: ["tnt = tnt + N % 10", "tnt += N % 10", "tnt = N % 10 + tnt", "tnt = N % 10"],
    expl: '**答案：D**\n\n**解析：**\n求和需要进行累加操作。D 选项 `tnt = N % 10` 会导致每次循环都覆盖之前的结果，无法求和。' },
  { id: 10, ans: 0, tags: ['嵌套循环'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < 5; i++) \n    for (int j = 0; j < i; j++) \n        printf(\"%d\", j);\n" + TBT,
    opts: ["0010120123", "1234", "0123", "00101201234"],
    expl: '**答案：A**\n\n**解析：**\n- `i=0`: 内层不执行。\n- `i=1`: `j=0`，输出 `0`。\n- `i=2`: `j=0,1`，输出 `01`。\n- `i=3`: `j=0,1,2`，输出 `012`。\n- `i=4`: `j=0,1,2,3`，输出 `0123`。\n拼接结果：`0010120123`。' },
  { id: 11, ans: 0, tags: ['程序设计'], 
    q: "关于输出九九乘法表代码的说法，错误的是（ ）。",
    opts: ["将 L1 换行移到 L2 位置效果相同", "将 printf(\"\\n\") 改为 cout << endl 功能相同", "%-2d 表示左对齐占 2 位", "Hang < 10 可改为 Hang <= 9"],
    expl: '**答案：A**\n\n**选项逐项分析：**\n- **A**：✅ 错误。L1 在内层循环之后（每行结束换行），L2 在内层循环之内（每个算式后换行）。位置不同会导致格式完全混乱。' },
  { id: 12, ans: 3, tags: ['算法逻辑'], 
    q: "计算 1! + 2! + ... + 10! 的正确方案是（ ）。",
    opts: ["i 从 1 到 9 累加", "nowNum 初始化为 0", "nowNum 从 0 开始乘积", "tnt=0, nowNum=1, i 从 1 到 10 循环"],
    expl: '**答案：D**\n\n**解析：**\n计算阶乘和需要：\n1. 初始化累加变量 `tnt = 0`。\n2. 初始化阶乘变量 `nowNum = 1`（不能为 0，否则乘积始终为 0）。\n3. 循环 1 到 10，每次 `nowNum *= i` 算出当前阶乘并累加到 `tnt`。' },
  { id: 13, ans: 1, tags: ['程序分析'], 
    q: "求 1 到 M 之间的所有孪生素数（差值为 2 的质数），for 循环上界应填写（ ）。\n" + TBT + "cpp\nfor (int i = 2; i <= ________; i++) {\n    if (isPrime(i) && isPrime(i + 2)) cout << i << \" \" << i + 2 << endl;\n}\n" + TBT,
    opts: ["M", "M - 2", "M + 2", "M / 2"],
    expl: '**答案：B**\n\n**解析：**\n由于判断条件中涉及 `isPrime(i + 2)`，为了保证不超出 `M` 的范围，`i + 2` 必须小于等于 `M`，即 `i <= M - 2`。' },
  { id: 14, ans: 1, tags: ['图形输出'], 
    q: "输出高度为 5 的金字塔图形，星号数为 1, 3, 5, 7, 9。横线应填（ ）。",
    opts: ["height - i, i * 2 - 1", "height - i - 1, i * 2 + 1", "height - i, i * 2 + 1", "height - i - 1, i * 2 - 1"],
    expl: '**答案：B**\n\n**解析：**\n当 `height=5` 且 `i` 从 0 开始：\n- 第一行（i=0）：空格应为 4（`height-0-1`），星号应为 1（`0*2+1`）。\n- 符合规律的表达式是 `height - i - 1` 和 `i * 2 + 1`。' },
  { id: 15, ans: 2, tags: ['数学函数'], 
    q: "以下哪个 C++ 表达式的结果不是 30？",
    opts: ["max(10, max(20, 30))", "min(30, (10 + 20))", "sqrt(10 + 20 + 30)", "(10 + 20 + 30) / 2"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **A**：`max(20, 30)` 为 30，`max(10, 30)` 为 30。\n- **B**：`min(30, 30)` 为 30。\n- **C**：`sqrt(60)` 约等于 7.746，不是 30。\n- **D**：`60 / 2` 为 30。' }
];

const judgeQuestions = [
  { id: 16, ans: 0, text: '正确', logic: '这是 Windows 文件资源管理器的标准操作。', kaodian: '操作系统' },
  { id: 17, ans: 0, text: '正确', logic: 'N/10*10 会抹掉个位数字，N 减去该值即得个位。', kaodian: '算术运算' },
  { id: 18, ans: 0, text: '正确', logic: '10 <= N 结果为 0 或 1，均小于等于 12，故表达式恒为真。', kaodian: '逻辑运算' },
  { id: 19, ans: 0, text: '正确', logic: 'sqrt(N) 返回 double，赋给 int 变量会截断小数部分，保留整数。', kaodian: '数据类型转换' },
  { id: 20, ans: 1, text: '错误', logic: '%% 输出一个 %，输出应为 %a*%b=6。', kaodian: '转义字符' },
  { id: 21, ans: 1, text: '错误', logic: '关键字（如 for, int）不能用作变量名。', kaodian: '变量命名' },
  { id: 22, ans: 1, text: '错误', logic: 'i=0 到 9 都会执行 continue，只有 i=10 时会跳出并输出 10。', kaodian: '循环追踪' },
  { id: 23, ans: 0, text: '正确', logic: '8+6+4 = 18。', kaodian: '程序逻辑' },
  { id: 24, ans: 0, text: '正确', logic: '奇数除以 2 的余数为 1（真），能被 if 捕捉到。', kaodian: '条件判断' },
  { id: 25, ans: 0, text: '正确', logic: '所有的 for 循环都可以通过重构（初始化、条件、迭代分离）转为等价的 while 循环。', kaodian: '循环结构' }
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
  const qMatch = content.match(new RegExp('id: ' + it.id + ',[\\s\\S]*?question:\\s*(`(?:[^`\\\\\\\\]|\\\\\\\\.)*`)'));
  const oldQ = qMatch ? qMatch[1] : '`判断题`';
  questionsStr += '            question: ' + oldQ + ',\n';
  questionsStr += '            options: ["正确", "错误"],\n';
  questionsStr += '            answer: ' + it.ans + ',\n';
  questionsStr += '            score: 2,\n';
  questionsStr += '            explanation: ' + q('**答案：' + it.text + '**\n\n' + '**判定依据：**\n' + it.logic + '\n\n**考点：** ' + it.kaodian) + ',\n';
  questionsStr += '            tags: ["判断题"]\n';
  questionsStr += '        }' + (it.id === 25 ? '' : ',') + '\n';
});
questionsStr += '    ]';

const questionsRe = /questions: \[\s*\{[\s\S]*?\}\s*\]\s*,\s*\n\s*programmingQuestions:/;
content = content.replace(questionsRe, 'questions: ' + questionsStr + ',\n    programmingQuestions:');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched 2024-12-l2.js');
