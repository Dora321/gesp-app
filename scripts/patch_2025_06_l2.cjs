const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2025-06-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 2, tags: ['计算机基础'], 
    q: "2025年4月19日在北京举行了人形机器人半程马拉松赛。跑动着的机器人利用传感器反馈数据调整姿态，这类传感器类似于计算机的（ ）。",
    opts: ["处理器", "存储器", "输入设备", "输出设备"],
    expl: '**答案：C**\n\n**解析：**\n传感器负责采集外部物理信息并将其转换为机器可处理的信号。在计算机体系结构中，负责将外部信息输入系统的设备统称为输入设备。' },
  { id: 2, ans: 0, tags: ['计算机基础'], 
    q: "小明购置的计算机内存不够用了，想购置一个容量更大的内存条，这时他需要的内存条是（ ）。",
    opts: ["RAM", "ROM", "CACHE", "EPROM"],
    expl: '**答案：A**\n\n**解析：**\n- **RAM (Random Access Memory)**：随机存取存储器，即通常所说的“内存”。\n- **ROM**：只读存储器。\n- **Cache**：高速缓冲存储器。\n- **EPROM**：可擦除可编程只读存储器。' },
  { id: 3, ans: 2, tags: ['算术运算'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint a = 3;\nfloat b = 3.5;\ncout << (a *= b);\n" + TBT,
    opts: ["3", "3.5", "10", "11"],
    expl: '**答案：C**\n\n**解析：**\n`a *= b` 即 `a = a * b`。`3 * 3.5 = 10.5`。由于 `a` 是 `int` 类型，赋值时会进行截断（丢弃小数部分），故 `a` 变为 10。' },
  { id: 4, ans: 0, tags: ['数位处理'], 
    q: "获得正整数 N 的第 3 位数（百位），如 1234 则输出 2。横线处应填入（ ）。",
    opts: ["N % 1000 / 100", "N / 1000 % 100", "N / 1000 / 100", "N % 100 / 100"],
    expl: '**答案：A**\n\n**解析：**\n- `N % 1000`：保留后三位（如 1234 -> 234）。\n- `/ 100`：整除 100 得到百位数（如 234 -> 2）。' },
  { id: 5, ans: 3, tags: ['程序分析'], 
    q: "下面 C++ 代码执行，其输出是（ ）。\n" + TBT + "cpp\nint a = 6, b = 28;\na = b;\nb = a;\ncout << a << \" \" << b;\n" + TBT,
    opts: ["6 28", "6 6", "28 6", "28 28"],
    expl: '**答案：D**\n\n**解析：**\n1. `a = b`: `a` 变为 28。\n2. `b = a`: 此时 `a` 已经是 28 了，故 `b` 也变为 28。\n这不是交换操作，而是两次赋值。' },
  { id: 6, ans: 3, tags: ['算术运算'], 
    q: "今天星期六，其后第 N 天星期几？下缘代码横线处填入（ ）。",
    opts: ["(N + 6) / 7", "(N + 6) // 7", "N % 7", "(N + 6) % 7"],
    expl: '**答案：D**\n\n**解析：**\n计算未来日期通常使用取模运算。`(初始星期 + 偏移天数) % 7`。由于星期六通常对应 6，故为 `(N + 6) % 7`。' },
  { id: 7, ans: 2, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nint cnt = 0;\nfor (int i = 1; i < 10; i++) {\n    if (i % 3 == 0) cnt++;\n}\ncout << cnt;\n" + TBT,
    opts: ["45", "28", "3", "0"],
    expl: '**答案：C**\n\n**解析：**\n`i` 在 1 到 9 之间取值。满足 `i % 3 == 0` 的数有 3, 6, 9，共 3 个。' },
  { id: 8, ans: 2, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n" + TBT + "cpp\nint s = 0;\nfor (int i = 1; i < 5; i++) s += i * 2;\ncout << s;\n" + TBT,
    opts: ["110", "22", "20", "3"],
    expl: '**答案：C**\n\n**解析：**\n`i` 取 1, 2, 3, 4。\n`s = 1*2 + 2*2 + 3*2 + 4*2 = 2 + 4 + 6 + 8 = 20`。' },
  { id: 9, ans: 1, tags: ['循环追踪'], 
    q: "下面 C++ 代码执行后输出是（ ）。\n" + TBT + "cpp\nint i = 0;\nfor (i = 0; i < 100; i++);\ncout << i;\n" + TBT,
    opts: ["101", "100", "99", "98"],
    expl: '**答案：B**\n\n**解析：**\n`for` 循环后面紧跟分号 `;`，表示循环体为空。循环会一直执行到 `i` 不满足 `i < 100` 为止，此时 `i` 为 100。' },
  { id: 10, ans: 0, tags: ['程序逻辑'], 
    q: "下面 C++ 代码执行后输出是（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < 2; i++) cout << \"A#\";\n" + TBT,
    opts: ["A#A#", "A#0#A#0", "A#A#1", "A#0#A#0#1"],
    expl: '**答案：A**\n\n**解析：**\n简单的循环执行 2 次，每次输出 `A#`。' },
  { id: 11, ans: 3, tags: ['嵌套循环'], 
    q: "下面 C++ 代码用于输出图形，横线处填入（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < i + 1; j++) printf(\"%d-%d#\", i, j);\n    printf(\"END\\n\");\n}\n" + TBT,
    opts: ["图形选项A", "图形选项B", "图形选项C", "0-0#END\n1-0#1-1#END\n2-0#2-1#2-2#END"],
    expl: '**答案：D**\n\n**解析：**\n- `i=0`: `j=0` -> `0-0#END`。\n- `i=1`: `j=0,1` -> `1-0#1-1#END`。\n- `i=2`: `j=0,1,2` -> `2-0#2-1#2-2#END`。' },
  { id: 12, ans: 3, tags: ['逻辑运算'], 
    q: "输出不能被 3 整除且除以 5 余数为 2 的数。下列选项不能实现的是（ ）。",
    opts: ["(i % 3 != 0) && (i % 5 == 2)", "(i % 3) && (i % 5 == 2)", "(i % 3) && !(i % 5 != 2)", "!(i % 3) && (i % 5 == 2)"],
    expl: '**答案：D**\n\n**解析：**\n`!(i % 3)` 含义是 `i` 能被 3 整除。这与题目要求的“不能被 3 整除”相反。' },
  { id: 13, ans: 3, tags: ['数位处理'], 
    q: "判断一个正整数是几位数。横线处应填入代码先后是（ ）。\n" + TBT + "cpp\nwhile (________) {\n    cnt++;\n    ________;\n}\n" + TBT,
    opts: ["N > 1; N = N / 10", "N > 1; N /= 10", "N == 0; N /= 10", "N > 0; N /= 10"],
    expl: '**答案：D**\n\n**解析：**\n典型的位拆解逻辑：只要 `N > 0` 就说明还有数位没统计，然后 `N /= 10` 移除末位。' },
  { id: 14, ans: 3, tags: ['自守数'], 
    q: "判断自守数（平方的尾数等于自身）。说法错误的是（ ）。",
    opts: ["如果 Flag 不变则说明是自守数", "if (N1 % 10 != M1 % 10) 判断个位", "N1 /= 10 移除末位", "将 N1 > 0 改为 N > 0 效果相同"],
    expl: '**答案：D**\n\n**解析：**\n- **D**：❌ 错误。如果在循环中使用 `N > 0` 且在体内修改了 `N`，会导致 `N` 变为 0。若后续逻辑还需要用到原始的 `N`，则这种修改是有害的。通常建议使用备份变量 `N1`。' },
  { id: 15, ans: 0, tags: ['程序设计'], 
    q: "输出图形的相关说法，错误的是（ ）。",
    opts: ["将 now_number = 0 移到 L1/L2 间效果不变", "now_number += 1 与 now_number = 1 + now_number 等价", "now_number == 10 与 now_number > 9 在此时等价", "cout << endl 与 cout << \"\\n\" 在此等价"],
    expl: '**答案：A**\n\n**解析：**\n- **A**：❌ 错误。如果将计数器初始化移到内层循环前，则每行都会从 0 开始重新计数，导致图形输出逻辑改变。' }
];

const judgeQuestions = [
  { id: 16, ans: 0, text: '正确', logic: '智能手表由于具备处理和联网能力，在考试中通常被禁。', kaodian: '计算机常识' },
  { id: 17, ans: 0, text: '正确', logic: '整数除法会截断小数。N < 10 时结果为 0。', kaodian: '算术运算' },
  { id: 18, ans: 0, text: '正确', logic: '相等判断不改变变量值且符合交换律。', kaodian: '运算符' },
  { id: 19, ans: 0, text: '正确', logic: '如果一个数的最大值等于其最小值，说明它和另一个数必定相等。', kaodian: '数学函数' },
  { id: 20, ans: 1, text: '错误', logic: '浮点数可以隐式转换为字符（按 ASCII 码）。', kaodian: '数据类型' },
  { id: 21, ans: 0, text: '正确', logic: '逻辑计算 10<=59 为真(1)，1<=12 为真。', kaodian: '逻辑运算' },
  { id: 22, ans: 0, text: '正确', logic: 'continue 立即终止当前迭代并开始下一次判断。', kaodian: '控制流' },
  { id: 23, ans: 0, text: '正确', logic: '1+2+3+4+5 = 15。', kaodian: '嵌套循环' },
  { id: 24, ans: 0, text: '正确', logic: '两者循环次数相同，逻辑等价。', kaodian: '循环结构' },
  { id: 25, ans: 0, text: '正确', logic: '标准 for 循环按步长输出。', kaodian: '循环输出' }
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
console.log('Successfully patched 2025-06-l2.js');
