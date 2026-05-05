const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2024-09-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 0, tags: ['计算机历史'], 
    q: "山东大学于 1972 年研制成功 DJL-1 计算机，设计存贮周期为 2μs，相当于现代计算机的（ ）。",
    opts: ["内存", "磁盘", "CPU", "显示器"],
    expl: '**答案：A**\n\n**解析：**\n在计算机硬件术语中，“存贮周期”通常指内存（RAM）完成一次读或写操作所需的时间。DJL-1 的磁心存储器具有随机存取特性，功能对标现代计算机的内存。' },
  { id: 2, ans: 2, tags: ['计算机常识'], 
    q: "IPv4 版本的因特网总共有（ ）个 A 类地址网络。",
    opts: ["65000", "200 万", "126", "128"],
    expl: '**答案：C**\n\n**解析：**\nIPv4 A 类地址的网络号部分占 8 位，首位固定为 0。除去全 0（保留）和 127（环回地址）外，合法的网络号范围是 1 到 126，共 126 个。' },
  { id: 3, ans: 0, tags: ['变量命名'], 
    q: "在 C++ 中，下列不可做变量的是（ ）。",
    opts: ["ccf-gesp", "ccf_gesp", "ccfGesp", "_ccfGesp"],
    expl: '**答案：A**\n\n**解析：**\nC++ 标识符只能由字母、数字和下划线组成，且不能以数字开头。`ccf-gesp` 中包含了连字符 `-`，这是非法的。' },
  { id: 4, ans: 2, tags: ['循环结构'], 
    q: "在 C++ 中，与 for (int i = 1; i < 10; i++) 效果相同的是（ ）。",
    opts: ["for (int i = 0; i < 10; i++)", "for (int i = 0; i < 11; i++)", "for (int i = 1; i < 10; ++i)", "for (int i = 0; i < 11; ++i)"],
    expl: '**答案：C**\n\n**解析：**\n在 `for` 循环的更新部分，`i++` 和 `++i` 对循环体执行及循环次数的影响是完全等价的。' },
  { id: 5, ans: 2, tags: ['算术运算'], 
    q: "在 C++ 中，`cout << (5 / 2 + 5 % 3)` 的输出是（ ）。",
    opts: ["1", "2", "4", "5"],
    expl: '**答案：C**\n\n**解析：**\n- `5 / 2` 为整数除法，结果为 2。\n- `5 % 3` 为取模运算，结果为 2。\n- `2 + 2 = 4`。' },
  { id: 6, ans: 3, tags: ['输入输出'], 
    q: "假定变量 a 和 b 可能是整型、字符型或浮点型，输入 -2 和 3.14 后，输出不可能是（ ）。",
    opts: ["1", "1.14", "47", "将触发异常"],
    expl: '**答案：D**\n\n**解析：**\nC++ 的 `cin` 在处理非法输入（如向 `int` 输入浮点数）时会设置错误标志并停止读取，但不会“触发异常”（除非显式设置）。选项 A/B/C 分别对应不同的数据类型组合（如 char+double, double+double 等）。' },
  { id: 7, ans: 0, tags: ['算术运算'], 
    q: "在 C++ 代码中假设 N 为正整数，则下面代码能获得个位数的是（ ）。",
    opts: ["N % 10", "N / 10", "N && 10", "以上选项均不正确"],
    expl: '**答案：A**\n\n**解析：**\n对 10 取模（`% 10`）可以获得十进制数的个位数字。' },
  { id: 8, ans: 0, tags: ['程序分析'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint N = 5, i = 0;\nwhile (N > 0) {\n    if (N % 3 == 0) {\n        cout << i << \"#\";\n        break;\n    }\n    N--;\n}\n" + TBT,
    opts: ["0#", "1#", "0#0#1", "没有输出"],
    expl: '**答案：A**\n\n**解析：**\n题目中 `i` 始终未变（初始为 0）。N 递减，当 N 变为 3 时满足 `N % 3 == 0`，输出 `i#` 即 `0#` 并通过 `break` 结束。' },
  { id: 9, ans: 2, tags: ['逻辑运算'], 
    q: "执行下面 C++ 代码并输入 1 和 0，有关说法正确的是（ ）。\n" + TBT + "cpp\nint a, b;\ncin >> a >> b;\nif (a && b) cout << \"1\";\nelse if (!(a || b)) cout << \"2\";\nelse if (a || b) cout << \"3\";\nelse cout << \"4\";\n" + TBT,
    opts: ["1", "2", "3", "4"],
    expl: '**答案：C**\n\n**解析：**\n输入 `a=1, b=0`。\n- `a && b` 为假。\n- `!(a || b)` 为假。\n- `a || b` (1 || 0) 为真。执行输出 `3`。' },
  { id: 10, ans: 1, tags: ['循环分析'], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint loopCount = 0;\nfor (int i = 1; i < 5; i += 2)\n    loopCount += 1;\ncout << (loopCount);\n" + TBT,
    opts: ["1", "2", "3", "5"],
    expl: '**答案：B**\n\n**解析：**\n`i` 的取值序列为 1, 3。当 `i=5` 时不满足条件 `i < 5`。循环执行 2 次，输出 2。' },
  { id: 11, ans: 2, tags: ['嵌套循环'], 
    q: "下图是 C++ 程序执行后的输出（右对角线对齐图案）。横线处应填入代码是（ ）。\n" + TBT + "cpp\nfor (int i = 1; i < 6; i++) {\n    for (int j = ________; j++) \n        cout << j;\n    cout << endl;\n}\n" + TBT,
    opts: ["j = i; j < i", "j = 1; j < i", "j = i; j < i * 2", "j = i + 1; j < i + i"],
    expl: '**答案：C**\n\n**解析：**\n观察输出（假设为类似 1, 23, 345 结构）：第 `i` 行从 `i` 开始。若要实现项数随行号递增，`j < i * 2` 会使每行打印 `i` 到 `2i-1`，即打印 `i` 个数。' },
  { id: 12, ans: 0, tags: ['数位处理'], 
    q: "下面 C++ 代码执行后输出逆序数。横线处应填入（ ）。\n" + TBT + "cpp\nint N, rst = 0;\ncin >> N;\nwhile (N) {\n    ________________;\n    ________________;\n}\ncout << rst;\n" + TBT,
    opts: ["rst = rst * 10 + N % 10; N = N / 10;", "rst += N % 10; N = N / 10;", "rst = rst * 10 + N / 10; N = N % 10;", "rst += N / 10; N = N % 10;"],
    expl: '**答案：A**\n\n**解析：**\n标准逆序数生成逻辑：\n1. `rst = rst * 10 + N % 10`：将 N 的末位挪到 rst 的末位。\n2. `N /= 10`：去掉 N 的末位。' },
  { id: 13, ans: 0, tags: ['循环控制'], 
    q: "下面 C++ 代码用于输入学生成绩计算平均成绩。说法错误的是（ ）。\n" + TBT + "cpp\nfloat Sum = 0;\nint cnt = 0, score;\nwhile (1) {\n    cin >> score;\n    if (score < 0) break;\n    Sum += score;\n    cnt++;\n}\ncout << Sum / cnt;\n" + TBT,
    opts: ["代码 while (1) 写法错误", "如果输入负数，将结束输入并输出", "变量 int score 初始值不确定不影响逻辑", "若 cnt 为 0 可能除零错误"],
    expl: '**答案：A**\n\n**解析：**\n`while (1)` 是 C++ 中实现死循环的标准合法写法。' },
  { id: 14, ans: 1, tags: ['质数判定'], 
    q: "以下 C++ 代码判断正整数 N 是否为质数。横线上填写（ ）。\n" + TBT + "cpp\nint N;\ncin >> N;\nbool Flag = (N >= 2);\nfor (int i = 2; i * i <= N; i++) {\n    if (________________) {\n        Flag = false;\n        break;\n    }\n}\n" + TBT,
    opts: ["num % i", "N % i == 0", "N / i", "N / i == 0"],
    expl: '**答案：B**\n\n**解析：**\n质数判定逻辑：若 N 能被 2 到 $\\sqrt{N}$ 间的任何整数整除（`N % i == 0`），则非质数。' },
  { id: 15, ans: 0, tags: ['数制转换'], 
    q: "假设输入正整数 N，以下 C++ 代码用于实现十进制转二进制。横线处应填写（ ）。\n" + TBT + "cpp\nint N;\ncin >> N;\nstring s = \"\";\nwhile (N > 0) {\n    ________________;\n    N /= 2;\n}\ncout << s;\n" + TBT,
    opts: ["s = to_string(N % 2) + s", "s = s + to_string(N % 2)", "s = to_string(N / 2) + s", "s = s + to_string(N / 2)"],
    expl: '**答案：A**\n\n**解析：**\n十进制转二进制（除2取余法）得到的余数序列是逆序的，故新的余数位应拼在字符串 `s` 的前面（`+ s`）。' }
];

const judgeQuestions = [
  { id: 16, ans: 0, text: '正确', logic: 'C++ 支持封装、继承、多态，且属于高级语言。', kaodian: '语言特性' },
  { id: 17, ans: 1, text: '错误', logic: '逗号运算符返回最右侧的值，即 5。', kaodian: '运算符' },
  { id: 18, ans: 0, text: '正确', logic: '12 % 10 = 2，2 % 10 = 2。', kaodian: '算术运算' },
  { id: 19, ans: 1, text: '错误', logic: 'rand() 产生伪随机序列，不保证递增。', kaodian: '随机数' },
  { id: 20, ans: 1, text: '错误', logic: "字符 '1' 的 ASCII 码是 49。", kaodian: '数据类型' },
  { id: 21, ans: 0, text: '正确', logic: '循环正常终止时 i=10。', kaodian: '循环追踪' },
  { id: 22, ans: 0, text: '正确', logic: '这是经典的三变量数值交换逻辑。', kaodian: '变量交换' },
  { id: 23, ans: 1, text: '错误', logic: '循环次数和逻辑没有实质改变。', kaodian: '循环结构' },
  { id: 24, ans: 0, text: '正确', logic: '这是经典的斐波那契数列叠代算法。', kaodian: '算法基础' },
  { id: 25, ans: 1, text: '错误', logic: 'continue 同样可用于 while 和 do-while。', kaodian: '控制流' }
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
console.log('Successfully patched 2024-09-l2.js');
