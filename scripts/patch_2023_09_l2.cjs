const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2023-09-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '```'; 

function q(text) {
  return BT + text.replace(/`/g, '\\' + BT).replace(/\n/g, '\\n') + BT;
}

const singleQuestions = [
  { id: 1, ans: 3, tags: ['历史知识'], 
    q: "我国第一台大型通用电子计算机使用的逻辑部件是（ ）。",
    opts: ["集成电路", "大规模集成电路", "晶体管", "电子管"],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **A 集成电路**：❌ 第三代计算机使用的逻辑部件。\n- **B 大规模集成电路**：❌ 第四代计算机使用的逻辑部件。\n- **C 晶体管**：❌ 第二代计算机使用的逻辑部件。\n- **D 电子管**：✅ 第一代计算机使用的逻辑部件。' },
  { id: 2, ans: 1, tags: ["流程图", "程序分析"], 
    q: "如果输入的 x 和 y 分别是 5 和 12，则下面流程图运行完毕后，输出的 a 和 b 分别是（ ）？",
    opts: ["5 12", "12 5", "5 5", "12 12"],
    expl: '**答案：B**\n\n**解析：**\n输入 x=5, y=12。进入 No 路径，a=y=12, b=x=5。' },
  { id: 3, ans: 2, tags: ["程序结构"], 
    q: "如果要找出整数 a、b 中较大一个，通常要用下面哪种程序结构？（ ）。",
    opts: ["顺序结构", "循环结构", "分支结构", "跳转结构"],
    expl: '**答案：C**\n\n**解析：**\n使用分支结构（if-else）进行条件判断。' },
  { id: 4, ans: 1, tags: ["基础语法"], 
    q: "以下不是 C++ 关键字的是（ ）。",
    opts: ["continue", "cout", "break", "goto"],
    expl: '**答案：B**\n\n**解析：**\n`cout` 是标准输出流对象，不是关键字。' },
  { id: 5, ans: 3, tags: ["基础语法"], 
    q: "C++ 表达式 int(-123.123 / 10) 的值是（ ）。",
    opts: ["-124", "-123", "-13", "-12"],
    expl: '**答案：D**\n\n**解析：**\n结果为 -12.3123，转为 int 截断得 -12。' },
  { id: 6, ans: 0, tags: ["循环", "程序分析"], 
    q: "下面 C++ 代码用于输出 N 的所有因子。横线处应填入（ ）。\n" + TBT + "cpp\nfor (int i = 1; i < N + 1; i++) {\n    if (N % i == 0)\n        cout << i << \" \";\n}\n" + TBT,
    opts: ["N 的所有因子，包含 1 和 N", "N 的所有因子，不包含 1 和 N", "N 的所有质因子", "N 是否为质数"],
    expl: '**答案：A**\n\n**解析：**\n该代码会输出从 1 到 N 的所有能整除 N 的数。' },
  { id: 7, ans: 3, tags: ["嵌套循环"], 
    q: "如下图所示，输出 N 行 N 列的矩阵，对角线为 1，横线处应填入（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < N; i++) {\n    for (int j = 0; j < N; j++) {\n        if (________)\n            cout << 1 << \" \";\n        else\n            cout << 0 << \" \";\n    }\n    cout << endl;\n}\n" + TBT,
    opts: ["i = j", "j != j", "i >= j", "i == j"],
    expl: '**答案：D**\n\n**解析：**\n对角线位置满足行下标等于列下标。' },
  { id: 8, ans: 0, tags: ["循环控制"], 
    q: "下面 C++ 代码用于判断 N 是否为质数，请在横线处填入合适代码（ ）。\n" + TBT + "cpp\nbool isPrime = true;\nfor (int i = 2; i * i <= N; i++) {\n    if (N % i == 0) {\n        isPrime = false;\n        ________;\n    }\n}\n" + TBT,
    opts: ["break", "continue", "exit", "return"],
    expl: '**答案：A**\n\n**解析：**\n一旦找到因子，即可停止后续循环。' },
  { id: 9, ans: 3, tags: ["程序分析"], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint N = 9;\nfor (int i = 2; i < N; i++)\n    if (N % i)\n        cout << \"1#\";\ncout << \"0\" << endl;\n" + TBT,
    opts: ["1#0", "1#", "1#1#1#1#1#1", "1#1#1#1#1#1#0"],
    expl: '**答案：D**\n\n**解析：**\n9 对 2,4,5,6,7,8 取模均为真，输出 6 个 1# 加上末尾的 0。' },
  { id: 10, ans: 0, tags: ["循环嵌套"], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint cnt = 0;\nfor (int i = 1; i < 8; i++)\n    for (int j = 1; j <= i; j += 2)\n        cnt++;\ncout << cnt;\n" + TBT,
    opts: ["16", "28", "35", "36"],
    expl: '**答案：A**\n\n**解析：**\n统计各行执行次数：1,1,2,2,3,3,4，总和为 16。' },
  { id: 11, ans: 1, tags: ["循环分析"], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint cnt = 0;\nfor (int i = 1; i <= 12; i += 3) {\n    if (i % 2 != 0) {\n        for (int j = 1; j < i; j += 2) {\n            cnt++;\n        }\n    }\n}\ncout << cnt;\n" + TBT,
    opts: ["1", "3", "15", "没有输出"],
    expl: '**答案：B**\n\n**解析：**\ni 为 1, 4, 7, 10。只有 i=7 时内层循环执行 3 次。' },
  { id: 12, ans: 1, tags: ["程序分析"], 
    q: "下面 C++ 代码执行后的输出是（ ）。\n" + TBT + "cpp\nint x = 1;\nwhile (x < 15) {\n    x += 2;\n    if (x % 3 == 0 || x == 11) {\n        if (x / 10) cout << x;\n        else cout << x << \",\";\n    }\n}\n" + TBT,
    opts: ["3,9,15", "3,9,11", "3,6,9,12", "1,5,7,11,13,15"],
    expl: '**答案：B**\n\n**解析：**\nx 取 3, 9, 11 时输出。15 时循环已结束。' },
  { id: 13, ans: 3, tags: ["字符输出"], 
    q: "下面图形每一行从字母 A 开始，以 ABC 方式重复。行数为输入的整数。横线处填入（ ）。\n" + TBT + "cpp\nfor (int i = 1; i < N + 1; i++) {\n    for (int j = 0; j < i; j++)\n        cout << ________;\n    cout << endl;\n}\n" + TBT,
    opts: ["'A'+j / 3", "(char)('A'+j / 3)", "'A'+j % 3", "(char)('A'+j % 3)"],
    expl: '**答案：D**\n\n**解析：**\n使用 j % 3 进行循环偏移，强制转 char 输出。' },
  { id: 14, ans: 0, tags: ["图形绘制"], 
    q: "输入行数 lineCount，输出金字塔图形。横线处填入（ ）。\n" + TBT + "cpp\nfor (int i = 0; i < lineCount; i++) {\n    for (int j = 0; j < ________; j++)\n        cout << ' ';\n    for (int j = 1; j < i + 1; j++) cout << j << \" \";\n    for (int j = i + 1; j > 0; j--) cout << j << \" \";\n    cout << endl;\n}\n" + TBT,
    opts: ["(lineCount-i-1) * 2", "(lineCount-i) * 2", "lineCount-i-1", "lineCount-i"],
    expl: '**答案：A**\n\n**解析：**\n空格数量由 `(lineCount - i - 1) * 2` 确定。' },
  { id: 15, ans: 0, tags: ["程序逻辑"], 
    q: "下面 C++ 代码用于判断 M 是否为 N 的相关数。有关说法错误的是（ ）。\n" + TBT + "cpp\nbool flag = false;\nif (M % N == 0) flag = true;\nelse {\n    int temp = M;\n    while (temp > 0) {\n        if (temp % 10 == N) { flag = true; break; }\n        temp /= 10;\n    }\n}\n" + TBT,
    opts: ["该段代码存在逻辑漏洞", "如果 M 是 N 的倍数，flag 为 true", "如果 M 的某位数字是 N，flag 为 true", "M % N == 0 是整除条件"],
    expl: '**答案：A**\n\n**解析：**\n代码逻辑正确，A 选项说法错误。' }
];

const judgeQuestions = [
  { id: 16, ans: 1, text: '错误', logic: '101.101(2) = 5.625。', kaodian: '数制转换' },
  { id: 17, ans: 0, text: '正确', logic: '太湖之光是中国著名超级计算机。', kaodian: '科普常识' },
  { id: 18, ans: 1, text: '错误', logic: '7.8 默认是 double 类型。', kaodian: '数据类型' },
  { id: 19, ans: 1, text: '错误', logic: '逻辑或结果为布尔值。', kaodian: '逻辑运算' },
  { id: 20, ans: 0, text: '正确', logic: 'n 依次为 1, 2, 5, 14。', kaodian: '程序追踪' },
  { id: 21, ans: 1, text: '错误', logic: '链式比较在 C++ 中不等价于区间判断。', kaodian: '比较运算符' },
  { id: 22, ans: 0, text: '正确', logic: '两种循环可以互相等价转换。', kaodian: '循环结构' },
  { id: 23, ans: 1, text: '错误', logic: '最终 cnt=5，5%2=1。', kaodian: '程序控制' },
  { id: 24, ans: 1, text: '错误', logic: '结果应为 18。', kaodian: '循环计算' },
  { id: 25, ans: 0, text: '正确', logic: '程序实现数字位反向组合。', kaodian: '数位处理' }
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
  // Advanced regex to handle escaped backticks inside the question string
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
console.log('Successfully patched 2023-09-l2.js');
