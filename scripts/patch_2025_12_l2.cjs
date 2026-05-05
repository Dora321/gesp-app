const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2025-12-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 1, tags: ['计算机基础'], 
    q: "飞行控制系统中执行“判断与决策”的核心部件最可能是（ ）。",
    opts: ["辐射传感器", "处理器", "内存单元", "输出设备"],
    expl: '**答案：B**\n\n**解析：**\n- **处理器 (CPU)**：是计算机的核心控制部件，负责执行指令、进行算术和逻辑运算，以及整体的控制与决策。' },
  { id: 2, ans: 1, tags: ['网络基础'], 
    q: "教学楼内局域范围使用的网络类型通常是（ ）。",
    opts: ["PAN", "LAN", "MAN", "WAN"],
    expl: '**答案：B**\n\n**解析：**\n- **LAN (Local Area Network)**：局域网，覆盖范围通常在几公里以内（如一栋楼、一个校园）。' },
  { id: 3, ans: 0, tags: ['变量命名'], 
    q: "关于 C++ 变量命名说法正确的是（ ）。",
    opts: ["for 不能作变量名，因为它是关键字", "_tnt 不能作变量名", "_tnt_ 不能作变量名", "printf 是关键字，所以不建议作变量名"],
    expl: '**答案：A**\n\n**解析：**\n- **A**：✅ 正确。`for` 是 C++ 的保留关键字，严禁作为变量名。\n- **B/C**：❌ 错误。标识符可以以下划线 `_` 开头。\n- **D**：❌ 错误。`printf` 是标准库函数名而非关键字（虽然不推荐重名，但不是绝对禁止）。' },
  { id: 4, ans: 1, tags: ['数位逻辑'], 
    q: "小数 0.123123123... 的第 N 位数字可由下列哪一表达式得到（ ）。",
    opts: ["N % 3", "(N - 1) % 3", "N / 3", "(N - 1) / 3"],
    expl: '**答案：B**\n\n**解析：**\n序列为 1, 2, 3，周期为 3。\n- $N=1, 4, 7...$ 时输出 1。表达式 $(N-1) \\% 3$ 的结果分别为 $0, 0, 0...$。\n- 通过偏移和取模，可以将自然数序列映射到周期性的索引（0, 1, 2）上。' },
  { id: 5, ans: 1, tags: ['输入输出'], 
    q: "printf(\"%g\", 3 + 3.1415926535) 输出 6.14159 的最可能原因是（ ）。",
    opts: ["精度误差", "%g 默认控制显示位数", "无限循环小数", "CPU 运算错误"],
    expl: '**答案：B**\n\n**解析：**\n在 C 语言的 `printf` 中，`%g` 格式说明符会自动选择 `%f` 或 `%e` 中较短的一种形式，并且**默认只保留 6 位有效数字**。' },
  { id: 6, ans: 3, tags: ['程序分析'], 
    q: "工号校验题中，两处横线应分别填写（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < 4; i++) {\n    cin >> N; \n    rst += ______; \n}\ncout << ______;\n" + TBT,
    opts: ["N % 3; rst / 10", "N % 3; rst % 10", "N / 3; rst / 10", "N / 3; rst % 10"],
    expl: '**答案：D**\n\n**解析：**\n此类题目通常考察基本的算术逻辑。根据常见的校验和（Checksum）算法：\n1. `rst += N / 3`：对每一位进行处理并累加。\n2. `rst % 10`：取累加结果的个位作为最终校验位。' },
  { id: 7, ans: 0, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nfor (int i = -2; i < 2; i++) \n    if (i % 2) printf(\"%d#\", i);\n" + TBT,
    opts: ["-1#1#", "-1#0#1#", "-2#-1#1#", "-2#-1#1#2#"],
    expl: '**答案：A**\n\n**解析：**\n- `i` 取值：-2, -1, 0, 1。\n- `i % 2` 结果：\n  - `-2 % 2 = 0` (假)\n  - `-1 % 2 = -1` (非零，真)\n  - `0 % 2 = 0` (假)\n  - `1 % 2 = 1` (非零，真)\n- 输出：`-1#1#`。' },
  { id: 8, ans: 3, tags: ['嵌套循环'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint cnt = 0; \nfor (int i = 1; i < 10; i += 2) \n    for (int j = 0; j < i; j++) \n        cnt += 1; \ncout << cnt;\n" + TBT,
    opts: ["100", "55", "45", "25"],
    expl: '**答案：D**\n\n**解析：**\n外层 `i` 取值：1, 3, 5, 7, 9。\n总累加次数：$1 + 3 + 5 + 7 + 9 = 25$。\n（注：这是等差数列求和，结果恰好是 $5^2$）。' },
  { id: 9, ans: 2, tags: ['循环控制'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nfor (int i = 1; i <= 12; i++) {\n    if (i % 2 == 0) continue;\n    int j;\n    for (j = 0; j < i; j++) \n        if (i * j % 2 == 0) cout << i * j << \" \";\n    if (j >= i) break;\n}\n" + TBT,
    opts: ["0 0", "11", "0", "0 11"],
    expl: '**答案：C**\n\n**解析：**\n- `i=1`: \n  - `j=0`: `1 * 0 % 2 == 0` 为真，输出 `0 `。\n  - 内层循环结束时 `j=1`。\n  - `if (j >= i)` (1 >= 1) 成立，执行 `break` 跳出外层循环。\n- 结果：仅输出 `0 `。' },
  { id: 10, ans: 1, tags: ['循环等价'], 
    q: "与题干给定 C++（输出 0 到 9）效果“不一致”的代码是（ ）。",
    opts: ["代码 A", "int i = 0; while (i < 10){ i += 1; cout << i; }", "代码 C", "代码 D"],
    expl: '**答案：B**\n\n**解析：**\n- **B**：❌ 不一致。该代码先执行 `i += 1` 再输出，输出范围是 1 到 10。\n- 其他选项均保持了先输出再递增或在边界处正确退出的逻辑。' },
  { id: 11, ans: 1, tags: ['程序分析'], 
    q: "下面 C++ 代码执行后输出是（ ）。\n" + TBT + "cpp\nint num = 0; \nwhile (num <= 5) {\n    num += 1;\n    if (num % 3) continue;\n    printf(\"%d#\", num);\n    if (num > 5) printf(\"%d\", num);\n}\n" + TBT,
    opts: ["3#6#", "3#6#6", "1#2#3#4#5#6#", "1#2#3#4#5#6#6"],
    expl: '**答案：B**\n\n**解析：**\n- `num` 递增到 3：`3 % 3 == 0`，输出 `3#`。\n- `num` 递增到 6：`6 % 3 == 0`，输出 `6#`；同时满足 `num > 5`，追加输出 `6`。\n- 结果：`3#6#6`。' },
  { id: 12, ans: 1, tags: ['组合计数'], 
    q: "下面 C++ 代码执行结果是（ ）。\n" + TBT + "cpp\nint cnt = 0; \nfor (int i = 0; i < 5; i++) \n    for (int j = i; j < 4; j++) \n        cnt += 1; \ncout << cnt;\n" + TBT,
    opts: ["9", "10", "14", "20"],
    expl: '**答案：B**\n\n**解析：**\n- `i=0`: `j=0,1,2,3` (4次)\n- `i=1`: `j=1,2,3` (3次)\n- `i=2`: `j=2,3` (2次)\n- `i=3`: `j=3` (1次)\n- `i=4`: `j=4 < 4` (0次)\n总计：$4 + 3 + 2 + 1 = 10$。' },
  { id: 13, ans: 1, tags: ['变量副作用'], 
    q: "关于“完整漂亮数”判定代码的说法，正确的是（ ）。",
    opts: ["代码本身正确", "应先保存原 N，再在 L1 使用判定", "else 可加 Flag 置 0", "输入 0 3 必输出正确"],
    expl: '**答案：B**\n\n**解析：**\n- **B**：✅ 正确。在 `while (N > 0)` 循环中，`N` 的值会不断减小直至为 0。如果后续逻辑（L1）需要用到原始输入的 `N` 值，必须事先进行备份。' },
  { id: 14, ans: 1, tags: ['图形输出'], 
    q: "输入 5 时，给定代码输出的字符图形是（ ）。\n" + TBT + "cpp\nfor (i = 0; i < n; i++) {\n    for (j = 0; j < n - i - 1; j++) cout << \" \";\n    for (k = 0; k < 2 * i + 1; k++) cout << \"*\";\n    cout << endl;\n}\n" + TBT,
    opts: ["倒等腰三角形", "正等腰金字塔形", "左对齐直角", "右对齐直角"],
    expl: '**答案：B**\n\n**解析：**\n- 空格数：4, 3, 2, 1, 0 (递减)\n- 星号数：1, 3, 5, 7, 9 (递增且居中)\n这正是金字塔（等腰三角形）的典型构造逻辑。' },
  { id: 15, ans: 2, tags: ['程序设计'], 
    q: "“十佳歌手”评分程序（去掉最高分和最低分）相关说法正确的是（ ）。",
    opts: ["必须排序", "初始化应移到外层", "L1 与 L2 可改写为 if", "不能改写形式"],
    expl: '**答案：C**\n\n**解析：**\n- **C**：✅ 正确。`max(a, b)` 和 `min(a, b)` 本质上是条件分支的缩写，完全可以用 `if` 语句或三目运算符 `?:` 实现，逻辑完全等价。' }
];

const judgeQuestions = [
  { id: 16, ans: 1, text: '错误', logic: '操作系统负责管理资源，将源码翻译成目标程序是编译器的工作。', kaodian: '计算机系统' },
  { id: 17, ans: 0, text: '正确', logic: '5 < 10 为 true(1)，1 && 20 为真。', kaodian: '逻辑运算' },
  { id: 18, ans: 1, text: '错误', logic: '右侧 (1/3) 为整数除法，结果为 0，会导致除以 0 错误。', kaodian: '整数除法' },
  { id: 19, ans: 0, text: '正确', logic: '只要 N 非零就除以 10，最终必定收敛到 0。', kaodian: '循环追踪' },
  { id: 20, ans: 0, text: '正确', logic: 'b = (4 == 5) 为 false(0)。', kaodian: '赋值与判断' },
  { id: 21, ans: 1, text: '错误', logic: "'Z'-'A' (25) < 'z'-'A' (57) 为真，输出应为 1。", kaodian: '字符处理' },
  { id: 22, ans: 0, text: '正确', logic: '这是一种利用取模性质判断数值数量级的逻辑方案。', kaodian: '算法逻辑' },
  { id: 23, ans: 1, text: '错误', logic: 'Flag -= Flag 会使 Flag 恒等于 0，失去翻转功能。', kaodian: '逻辑控制' },
  { id: 24, ans: 0, text: '正确', logic: '10+9+...+1 = 55。', kaodian: '嵌套循环' },
  { id: 25, ans: 1, text: '错误', logic: '没有换行符，乘法表的所有项会挤在同一行。', kaodian: '图形输出' }
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
console.log('Successfully patched 2025-12-l2.js');
