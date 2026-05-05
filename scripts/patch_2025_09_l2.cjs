const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2025-09-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 3, tags: ['计算机常识'], 
    q: "人工智能现在非常火，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切是指（ ）。",
    opts: ["大电脑模型", "大规模智能", "智能的单位", "大语言模型"],
    expl: '**答案：D**\n\n**解析：**\n当前人工智能热潮中的“大模型”主要指的是大语言模型（Large Language Model, LLM），如 ChatGPT、DeepSeek 等。' },
  { id: 2, ans: 2, tags: ['网络协议'], 
    q: "在 TCP 协议中，完成连接建立需要通过（ ）握手。",
    opts: ["一次", "二次", "三次", "四次"],
    expl: '**答案：C**\n\n**解析：**\nTCP（传输控制协议）通过“三次握手”建立可靠连接，通过“四次挥手”断开连接。' },
  { id: 3, ans: 2, tags: ['变量命名'], 
    q: "下面 C++ 代码用于输入姓名，然后输出姓名，正确的说法是（ ）。\n" + TBT + "cpp\nstring XingMing;\ncin >> XingMing;\ncout << XingMing;\n" + TBT,
    opts: ["XingMing 是拼音，不能作为变量名", "可以将 XingMing 改为 Xing Ming", "可以将 XingMing 改为 xingming", "可以将 XingMing 改为 Xing-Ming"],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **A**：❌ 错误。拼音是合法的标识符组成部分。\n- **B/D**：❌ 错误。变量名中严禁包含空格或连字符 `-`。\n- **C**：✅ 正确。C++ 变量名区分大小写，`xingming` 是合法的替换名。' },
  { id: 4, ans: 3, tags: ['数位处理'], 
    q: "下面 C++ 代码用于获得正整数 N 的第 M 位数，横线处应填入的代码是（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < (M - 1); i++) div *= 10;\ncout << (______________);\n" + TBT,
    opts: ["N % div / 10", "N / div / 10", "N % div % 10", "N / div % 10"],
    expl: '**答案：D**\n\n**解析：**\n1. 循环后 `div` 为 $10^{M-1}$。\n2. `N / div`：将目标位移至个位（例如 N=123, M=2, div=10 -> 123/10 = 12）。\n3. `% 10`：提取当前的个位（12 % 10 = 2）。' },
  { id: 5, ans: 3, tags: ['运算符优先级'], 
    q: "下面 C++ 代码执行，其输出是（ ）。\n" + TBT + "cpp\nint a = 0, b = 0, c;\na, b = 3, 4;\nc = (a == b);\ncout << a << ' ' << b << ' ' << c;\n" + TBT,
    opts: ["3 4 0", "3 3 3", "4 4 4", "以上都不对"],
    expl: '**答案：D**\n\n**解析：**\n在 C++ 中，逗号 `,` 的优先级最低。`a, b = 3, 4;` 被解析为三个独立表达式：`(a)`, `(b = 3)`, `(4)`。\n- 结果：`a` 仍为 0，`b` 变为 3。\n- `c = (0 == 3)` 结果为 0。\n- 输出应为 `0 3 0`，不属于选项 A/B/C。' },
  { id: 6, ans: 0, tags: ['算术运算'], 
    q: "生成编号 XX-Y（XX 从 00 到 11，Y 从 0 到 9）。第 N 个编号的代码应填（ ）。",
    opts: ["12 10", "10 10", "11 9", "9 9"],
    expl: '**答案：A**\n\n**解析：**\n- `Y` 的周期是 10，用 `N % 10` 获取。\n- `XX` 的周期对应 `N / 10` 后的值，再对 12 取模。' },
  { id: 7, ans: 3, tags: ['嵌套循环'], 
    q: "下面代码执行后其输出是（ ）。\n" + TBT + "cpp\nint cnt = 0;\nfor (int i = -10; i < 10; i++)\n    for (int j = 0; j < i; j++)\n        cnt += 1;\ncout << cnt;\n" + TBT,
    opts: ["145", "125", "55", "45"],
    expl: '**答案：D**\n\n**解析：**\n只有当 `i > 0` 时，内层循环 `j < i` 才会执行：\n- `i=1`: 执行 1 次\n- `i=2`: 执行 2 次\n- ...\n- `i=9`: 执行 9 次\n总次数：$1 + 2 + ... + 9 = 45$。' },
  { id: 8, ans: 1, tags: ['循环追踪'], 
    q: "下面代码执行后其输出是（ ）。\n" + TBT + "cpp\nint i, j;\nfor (i = 1; i < 12; i++) {\n    if (i % 2 == 0) continue;\n    for (j = 0; j < i; j++)\n        if (i * j % 2) break;\n}\nif (i >= 12) cout << (i * j);\n" + TBT,
    opts: ["110", "12", "不确定", "无输出"],
    expl: '**答案：B**\n\n**解析：**\n- 外层循环结束时 `i = 12`。\n- 最后一次进入循环体是 `i = 11`。\n- 内层 `j` 从 0 开始：`11*0%2=0` (不满足 break)，`11*1%2=1` (真，执行 break)。此时 `j=1`。\n- 最终输出 `12 * 1 = 12`。' },
  { id: 9, ans: 3, tags: ['算法常识'], 
    q: "阅读代码（辗转相除法），说法正确的是（ ）。",
    opts: ["b 不能为 0", "a 必须小于 b", "a 和 b 必须为正整数", "如果 a 输入为 0，则输出值为 abs(b)"],
    expl: '**答案：D**\n\n**解析：**\n这是求最大公约数（GCD）的经典算法。如果 `a=0`，第一轮循环：`remainder = 0 % b = 0`, `a = b`, `b = 0`。跳出循环，此时 `a` 的值就是初始的 `b`。' },
  { id: 10, ans: 0, tags: ['循环控制'], 
    q: "下面 C++ 代码执行后输出是（ ）。\n" + TBT + "cpp\nint num = 0;\nwhile (num <= 5) {\n    num += 1;\n    if (num == 3) continue;\n    printf(\"%d#\", num);\n}\n" + TBT,
    opts: ["1#2#4#5#6#", "1#2#4#5#6", "1#2#3#4#5#6#", "1#2#3#4#5#6"],
    expl: '**答案：A**\n\n**解析：**\n- `num` 取值：1, 2, 3(跳过), 4, 5, 6。\n- 每次输出带 `#`。\n- 注意最后一次 `num=5` 满足条件，进入后加 1 变为 6 并输出。' },
  { id: 11, ans: 3, tags: ['程序设计'], 
    q: "记录最大数和最小数（输入 -999 结束）的代码，说法错误的是（ ）。",
    opts: ["首位输入 -999 则输出 -999 -999", "不输入 -999 能正常工作", "能求最高最低分", "移动输入语句位置不影响结果"],
    expl: '**答案：D**\n\n**解析：**\n- **D**：❌ 错误。在 `while` 循环中，输入语句的位置直接决定了循环终止标志（-999）是否会被错误地纳入统计范围。' },
  { id: 12, ans: 2, tags: ['程序分析'], 
    q: "输出“与 5 有关数”的代码，说法正确的是（ ）。",
    opts: ["删除 continue 不影响", "删除 j = i 不影响", "将 break 改为 j = 0 不影响", "将 j > 0 改为 j >= 0 不影响"],
    expl: '**答案：C**\n\n**解析：**\n- **C**：✅ 正确。在 `while (j > 0)` 循环中，将 `j` 显式设为 0 会立即使循环条件不满足，效果等同于 `break`。' },
  { id: 13, ans: 0, tags: ['图形输出'], 
    q: "输出数字三角形图形，横线处应填入（ ）。",
    opts: ["N-i+1 和 i+1", "N-i 和 i", "N 和 i", "N-i 和 i+1"],
    expl: '**答案：A**\n\n**解析：**\n空格控制通常与总高度和当前行号呈补数关系（如 `N-i`），而内容个数通常随行号递增（如 `i+1`）。' },
  { id: 14, ans: 0, tags: ['字符运算'], 
    q: "下面 C++ 代码执行，其输出是（ ）。\n" + TBT + "cpp\nint a = 'a' + 'b'; \nint b = 'a' - 'b'; \na = a - b;\ncout << a << ' ' << b;\n" + TBT,
    opts: ["196 -1", "27 9", "98 97", "不确定"],
    expl: '**答案：A**\n\n**解析：**\n- ASCII: \'a\'=97, \'b\'=98。\n- `a = 97 + 98 = 195`。\n- `b = 97 - 98 = -1`。\n- `a = 195 - (-1) = 196`。\n输出：`196 -1`。' },
  { id: 15, ans: 3, tags: ['程序分析'], 
    q: "有关环链重量计算的代码实现，正确说法是（ ）。",
    opts: ["修改 L1/L2", "修改 L3/L4", "修改 L3/L5", "均不对"],
    expl: '**答案：D**\n\n**解析：**\n根据题意及代码逻辑，原有实现通常已经正确，或者选项中的修改方式并非必要修复。' }
];

const judgeQuestions = [
  { id: 16, ans: 1, text: '错误', logic: '现代 IDE 完全支持调试中动态修改和重新编译。', kaodian: '开发环境' },
  { id: 17, ans: 0, text: '正确', logic: '整数除法截断。', kaodian: '算术运算' },
  { id: 18, ans: 0, text: '正确', logic: 'a < 10 (真) 且 20 (非零视为真)，结果为真。', kaodian: '布尔逻辑' },
  { id: 19, ans: 0, text: '正确', logic: '1 < 15 成立。', kaodian: '比较运算' },
  { id: 20, ans: 0, text: '正确', logic: '浮点数赋给 int 会直接舍弃小数。', kaodian: '数据类型' },
  { id: 21, ans: 1, text: '错误', logic: 'N % 10 提取低位，拼接顺序决定输出。', kaodian: '程序分析' },
  { id: 22, ans: 0, text: '正确', logic: '循环结束后 i 为 3，输出 3#。', kaodian: '循环追踪' },
  { id: 23, ans: 0, text: '正确', logic: '利用加减法可以实现无第三变量的交换逻辑。', kaodian: '算法基础' },
  { id: 24, ans: 0, text: '正确', logic: '通常指内层循环后的换行语句位置。', kaodian: '图形打印' },
  { id: 25, ans: 1, text: '错误', logic: "'5' 的 ASCII 是 53，53 + 4 = 57。", kaodian: '数据类型' }
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
console.log('Successfully patched 2025-09-l2.js');
