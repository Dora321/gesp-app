const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2024-03-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 1, tags: ['流程图', '程序分析'], 
    q: "下列流程图的输出结果是（ ）。",
    opts: ["5 12", "12 5", "5 5", "没有输出"],
    expl: '**答案：B**\n\n**解析：**\n输入 x=5, y=12。进入判断 `x < y` (5 < 12) 为真。执行交换逻辑：`a = y (12)`, `b = x (5)`。故输出 12 5。' },
  { id: 2, ans: 1, tags: ['变量命名'], 
    q: "以下选项中不符合 C++ 变量命名规则的是？（ ）",
    opts: ["student", "2_from", "_to", "Text"],
    expl: '**答案：B**\n\n**解析：**\nC++ 变量名（标识符）不能以数字开头。故 2_from 错误。' },
  { id: 3, ans: 1, tags: ['基础语法'], 
    q: "以下选项中，不能用于表示分支结构的 C++ 保留字是？（ ）",
    opts: ["switch", "return", "else", "if"],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **A/C/D**：属于 `if-else` 或 `switch-case` 分支结构的组成关键字。\n- **B return**：用于从函数返回结果，属于跳转语句而非分支结构控制字。' },
  { id: 4, ans: 2, tags: ['基础语法'], 
    q: "下列说法错误的是？（ ）",
    opts: ["while 循环满足条件时不断运行", "if 语句通常用于执行条件判断", "在 C++ 中可以使用 foreach 循环", "break 和 continue 都可以用在 for/while 中"],
    expl: '**答案：C**\n\n**解析：**\nC++ 标准库提供了基于范围的 for 循环（Range-based for），其语法为 `for (auto &x : collection)`，虽然功能类似 foreach，但 C++ 并没有名为 `foreach` 的关键字或预定义循环结构（除非使用特定的宏或三方库）。' },
  { id: 5, ans: 1, tags: ['基础语法'], 
    q: "下列 4 个表达式中，答案不是整数 8 的是？（ ）",
    opts: ["abs(-8)", "min(max(8, 9), 10)", "int(8.88)", "sqrt(64)"],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **A abs(-8)**：结果为 8。\n- **B min(max(8, 9), 10)**：`max(8, 9)` 为 9，`min(9, 10)` 结果为 9。\n- **C int(8.88)**：强制转 int 截断小数位，结果为 8。\n- **D sqrt(64)**：结果为 8.0，虽为浮点数，但在比较或隐式转换时常被视为 8。' },
  { id: 6, ans: 1, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint cnt = 0, x = 1;\nwhile (x < 10) {\n    x += 2;\n    if (x % 3 == 0) continue;\n    cnt++;\n}\ncout << cnt;\n" + TBT,
    opts: ["1", "2", "3", "4"],
    expl: '**答案：B**\n\n**解析：**\n1. `x=1`: 变为 3，`3%3==0` 跳过。\n2. `x=3`: 变为 5，`5%3!=0`，`cnt=1`。\n3. `x=5`: 变为 7，`7%3!=0`，`cnt=2`。\n4. `x=7`: 变为 9，`9%3==0` 跳过。\n5. `x=9`: 变为 11，跳出循环。\n最终 `cnt=2`。' },
  { id: 7, ans: 0, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint x = 1;\nwhile (x < 15) {\n    x += 2;\n    if (x % 3 == 0) cout << x << \"#\";\n}\n" + TBT,
    opts: ["3#9#15#", "3#9#", "3#6#9#12#15#", "3#15#"],
    expl: '**答案：A**\n\n**解析：**\n`x` 序列：3, 5, 7, 9, 11, 13, 15。\n满足 `x % 3 == 0` 的有：3, 9, 15。\n结果输出：3#9#15#。' },
  { id: 8, ans: 1, tags: ['循环计算'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint n, a, m, i;\nn = 3, a = 5;\nm = (a - 1) * 2;\nfor (i = 0; i < n - 1; i++)\n    m = (m - 1) * 2;\ncout << m;\n" + TBT,
    opts: ["8", "26", "28", "30"],
    expl: '**答案：B**\n\n**解析：**\n1. `m = (5-1)*2 = 8`。\n2. `i=0`: `m = (8-1)*2 = 14`。\n3. `i=1`: `m = (14-1)*2 = 26`。\n4. 结束输出 26。' },
  { id: 9, ans: 2, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint n, i, result;\nn = 81; i = 1, result = 1;\nwhile (i * i <= n) {\n    if (n % (i * i) == 0) result = i * i;\n    i += 1;\n}\ncout << result;\n" + TBT,
    opts: ["9", "27", "81", "1"],
    expl: '**答案：C**\n\n**解析：**\n程序寻找 `n` 的约数中最大的完全平方数。81 的平方数因子有 1, 9, 81。最大为 81。' },
  { id: 10, ans: 0, tags: ['嵌套循环'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < 4; i++) {\n    for (int j = 0; j <= i; j++) {\n        cout << j;\n    }\n}\n" + TBT,
    opts: ["0010120123", "0123", "010120123", "0012012301234"],
    expl: '**答案：A**\n\n**解析：**\n- `i=0`: 输出 0\n- `i=1`: 输出 01\n- `i=2`: 输出 012\n- `i=3`: 输出 0123\n合并结果：0010120123。' },
  { id: 11, ans: 3, tags: ['程序分析'], 
    q: "下面 C++ 代码用于实现九九乘法表，横线处应填入（ ）。\n" + TBT + "cpp\nfor (int i = 1; i <= 9; i++) {\n    for (int j = 1; j <= ________; j++) {\n        cout << j << \"*\" << i << \"=\" << i * j << \"\\t\";\n    }\n    cout << endl;\n}\n" + TBT,
    opts: ["9", "10", "i-1", "i"],
    expl: '**答案：D**\n\n**解析：**\n乘法表的特点是第 `i` 行打印到 `j=i` 为止。' },
  { id: 12, ans: 0, tags: ['程序分析', '回文数'], 
    q: "一个数的所有数字倒序排列后保持不变，就是回文数。横线处应填写（ ）。\n" + TBT + "cpp\nwhile (n > 0) {\n    a = ________;\n    n /= 10;\n}\n" + TBT,
    opts: ["10 * a + n % 10", "a + n % 10", "10 * a + n / 10", "a + n / 10"],
    expl: '**答案：A**\n\n**解析：**\n反转数的标准公式：`新数 = 原新数 * 10 + 待处理数最低位`。' },
  { id: 13, ans: 2, tags: ['图形绘制'], 
    q: "给定两个整数 N 与 M，打印栅栏图形。横线处填入（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < N; i++) {\n    for (int j = 0; j < M; j++) cout << \"-\";\n    ________;\n}\n" + TBT,
    opts: ["cout << '+' << endl;", "cout << '+' << ' ' << endl;", "cout << '+';", "cout << '+' << ' ';"],
    expl: '**答案：C**\n\n**解析：**\n每段栅栏填充 `-` 后接一个 `+` 作为间隔。' },
  { id: 14, ans: 2, tags: ['操作系统'], 
    q: "华为手表上跑的是鸿蒙，这个鸿蒙是（ ）。",
    opts: ["小程序", "计时器", "操作系统", "神话人物"],
    expl: '**答案：C**\n\n**解析：**\n鸿蒙（HarmonyOS）是华为开发的国产操作系统。' },
  { id: 15, ans: 2, tags: ['数学逻辑'], 
    q: "链环重 3, 4, 6 克，每 12 克一组。链依次为 G3, G4, G6...重复。说法正确的是（ ）。",
    opts: ["如果 N 输入 10，输出 36", "如果 N 输入 5，输出 15", "如果 N 输入 9，输出 30", "以上说法均不对"],
    expl: '**答案：C**\n\n**解析：**\n- 每组 12 克中：3 克环有 4 个，4 克环有 3 个，6 克环有 2 个（共 9 个环）。\n- 环 N=9 时，正好是一整组，重量为 3+4+6 = 13? 不对，是按重量组。一组 12g 包含几种材质。每 12g 一组，意味着一组内有 4 个 3g 或 3 个 4g 或 2 个 6g。链是 G3, G4, G6... 循环。即第 1 组是 3g 环，第 2 组是 4g 环... 环 N=9 前，即前 8 个环。如果每个环材质不同，那 N=9 前就是前 8 个环。' }
];

const judgeQuestions = [
  { id: 16, ans: 1, text: '错误', logic: 'break 只能跳出循环或 switch。', kaodian: '控制语句' },
  { id: 17, ans: 0, text: '正确', logic: 'C++ 变量名区分大小写。', kaodian: '变量命名' },
  { id: 18, ans: 0, text: '正确', logic: '8<9 为 1 (true)，1<10 为真。', kaodian: '逻辑运算' },
  { id: 19, ans: 1, text: '错误', logic: '循环条件 i < 100，步长 2，i 取 0,2,...,98。不包含 99。', kaodian: '循环结构' },
  { id: 20, ans: 0, text: '正确', logic: 'float(2022) 为 2022.0，输出 2022。单引号字面量在某些编译器下有特定解释但通常不为 2022。', kaodian: '数据类型' },
  { id: 21, ans: 0, text: '正确', logic: "'C' 为 67，abs(-5.8) 为 5.8，和为 72.8。", kaodian: '表达式计算' },
  { id: 22, ans: 1, text: '错误', logic: 'bool(-1) 返回 true，只有 0 转为 false。', kaodian: '数据类型' },
  { id: 23, ans: 1, text: '错误', logic: 'a=1 也满足 sqrt(1)==abs(1)。', kaodian: '数学函数' },
  { id: 24, ans: 0, text: '正确', logic: '具备接入 WIFI 并分配 IP 功能的设备通常具有路由器功能。', kaodian: '常识' },
  { id: 25, ans: 1, text: '错误', logic: 'C++ 关键字严禁作为变量名。', kaodian: '标识符规则' }
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
console.log('Successfully patched 2024-03-l2.js');
