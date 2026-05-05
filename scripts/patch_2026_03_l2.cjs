const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'gesp', 'level2', '2026-03-l2.js');
let content = fs.readFileSync(filePath, 'utf8');

const BT = '`';
const TBT = '\\`\\`\\`';

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
  { id: 1, ans: 1, tags: ['计算机基础'], 
    q: "2026 年春节联欢晚会上一个武术表演节目《武 BOT》。节目中多个人形机器人会表演空翻，它们落地可能会有微微踉跄，但都会迅速调整姿态站稳，并适当移动来和前后左右的其他机器人保持原来队列。如果将机器人视作一个计算机系统，那么在该计算机系统中下面哪一项不能作为输入设备（ ）。",
    opts: ['检测重心的重力传感器', '预装的 AI 算法程序', '接收动作指令的遥控器', '拍摄其他机器人的摄像头'],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **A 重力传感器**：❌ 属于输入设备。\n- **B AI 算法程序**：✅ 属于软件系统，不是物理输入设备。\n- **C 遥控器**：❌ 属于输入设备。\n- **D 摄像头**：❌ 属于输入设备。\n\n**考点：** 计算机系统组成' },
  { id: 2, ans: 3, tags: ['流程图', '程序结构'], 
    q: "下面代码用来找出输入的 `N` 个正整数中最大的一个。如果将代码段用流程图来表示，则 `L1` 标记的代码行应该使用的图形是（ ）。\n```cpp\nint N, max = 0, val;\ncin >> N;\nwhile (N) {\n cin >> val;\n if (val > max) // L1\n max = val;\n N--;\n}\ncout << max;\n```",
    opts: ['圆形框', '椭圆形框', '平行四边形框', '菱形框'],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **D 菱形框**：✅ 用于表示条件判断。\n\n**考点：** 流程图规范' },
  { id: 3, ans: 3, tags: ['变量与标识符'], 
    q: "下面 C++ 代码可以执行，有关说法正确的是（ ）。\n```cpp\ndouble PI = 3.1415926;\ncout << (PI);\n```",
    opts: ['为了方便初学者，`cout << (PI)` 和 `cout << (pi)` 效果相同，即变量的大小写不敏感', '把 `cout << (PI)` 修改为 `cout << (Pi)` 能正常执行', '不能用 `PI` 做变量名，因为要保存圆周率这个常量', '将程序中全部 `PI` 都改写为 `Pai`，将能正常执行，不会报错'],
    expl: '**答案：D**\n\n**选项逐项分析：**\n- **D**：✅ 只要定义和使用处保持一致即可。\n\n**考点：** 标识符命名规则' },
  { id: 4, ans: 2, tags: ['逻辑运算'], 
    q: "下面选择项中，与 C++ 表达式 `!(x > 5 && y <= 10)` 等价的是（ ）。",
    opts: ['`x <= 5 && y > 10`', '`x > 5 || y <= 10`', '`x <= 5 || y > 10`', '`!x > 5 && !y <= 10`'],
    expl: '**答案：C**\n\n**选项逐项分析：**\n- **C**：✅ 德摩根律：`!(A && B) == !A || !B`。\n\n**考点：** 德摩根律' },
  { id: 5, ans: 1, tags: ['浮点数'], 
    q: "某同学执行 C++ 代码 `cout << ((0.1 + 0.2) == 0.3)` 时输出 `0`，下面最可能的原因是（ ）。",
    opts: ['C++ 的 `+` 运算符在处理小数时存在 bug', '`0.1`、`0.2` 和 `0.3` 在计算机中无法用二进制浮点数精确表示，导致 `0.1 + 0.2` 的结果与 `0.3` 存在微小误差', '`==` 运算符不能用于比较浮点数，只能用于整数', '因为 `0.1 + 0.2` 的数学结果不等于 `0.3`'],
    expl: '**答案：B**\n\n**选项逐项分析：**\n- **B**：✅ 二进制浮点数无法精确表示某些十进制小数。\n\n**考点：** 浮点数精度' },
  { id: 6, ans: 0, tags: ['循环', '程序分析'], 
    q: "下面的 C++ 代码段执行后其输出是（ ）。\n```cpp\nint tnt = 0;\nfor (int i = 0; i < 5; i++) {\n for (int j = 0; j < i; j++)\n tnt += 1;\n cout << tnt << \"#\";\n}\ncout << tnt;\n```",
    opts: ['`0#1#3#6#10#10`', '`1#2#3#4#5#6#7#8#9#10#10`', '`10#10`', '`10`'],
    expl: '**答案：A**\n\n**解析：**\n累加 0, 1, 2, 3, 4，结果为 10。\n\n**考点：** 嵌套循环' },
  { id: 7, ans: 0, tags: ['逻辑运算', '程序分析'], 
    q: "下面的 C++ 代码执行之后的输出是（ ）。\n```cpp\nfor (int i = -2; i < 2; i++)\n if (not i % 3)\n cout << i << \"#\";\n```",
    opts: ['`0#`', '`-2#-1#1#`', '`-1#0#`', '`-2#0#1#`'],
    expl: '**答案：A**\n\n**解析：**\n仅当 i=0 时满足整除 3 的条件。\n\n**考点：** 取模运算' },
  { id: 8, ans: 2, tags: ['循环', '程序分析'], 
    q: "下面的 C++ 代码执行后其输出是（ ）。\n```cpp\nint cnt = 0, i, j;\nfor (i = 1; i < 5; i++) {\n for (j = 0; j < i; j++)\n cout << j << \"#\";\n break;\n}\nif (i >= 5)\n cout << (i * j);\n```",
    opts: ['`0#0#1#0#1#2#0#1#2#3#12`', '`0#0#1#0#1#2#0#1#2#3#`', '`0#`', '`1#`'],
    expl: '**答案：C**\n\n**解析：**\n遇到 break 直接跳出外层循环。\n\n**考点：** break 语句' },
  { id: 9, ans: 2, tags: ['循环', '程序分析'], 
    q: "下面 C++ 代码执行后其输出是（ ）。\n```cpp\nint count = 0;\nfor (int i = 1; i < 4; i++)\n for (int j = 1; j < 5; j++) {\n if (j == 3)\n continue;\n if (i == 2)\n break;\n count += 1;\n }\ncout << (count);\n```",
    opts: ['2', '4', '6', '8'],
    expl: '**答案：C**\n\n**解析：**\ni=1 时计3次，i=2 时跳出，i=3 时计3次。\n\n**考点：** continue/break' },
  { id: 10, ans: 0, tags: ['循环', '等价变换'], 
    q: "下面 4 个选项中，与下面 C++ 代码段具有相同效果的是（ ）。\n```cpp\ni = 0;\nwhile (i < 5) {\n cout << i;\n i += 1;\n}\n```",
    opts: ["for (i = 0; i < 5; i++)\n    cout << i;", "for (i = 1; i < 5; i++)\n    cout << i;", "for (i = 0; i < 6; i++)\n    cout << i;", "for (i = 1; i < 6; i++)\n    cout << i;"],
    expl: '**答案：A**\n\n**解析：**\n输出 01234。\n\n**考点：** 循环等价' },
  { id: 11, ans: 1, tags: ['循环', '程序分析'], 
    q: "下面 C++ 代码执行后输出是（ ）。\n```cpp\nint n = 10;\nwhile (n > 0) {\n n -= 1;\n if (n % 3 == 0)\n continue;\n if (n == 5)\n break;\n}\ncout << n;\n```",
    opts: ['0', '5', '6', '7'],
    expl: '**答案：B**\n\n**解析：**\n在 n=5 时 break。\n\n**考点：** 循环追踪' },
  { id: 12, ans: 2, tags: ['循环', '程序分析'], 
    q: "下面 C++ 代码段执行后，其输出是（ ）。\n```cpp\nint i, j, cnt;\ncnt = 0;\nfor (i = 0; i < 5; i++) {\n i = -i;\n for (j = i; j < -i; j++)\n cnt += 1;\n i = -i;\n}\ncout << cnt;\n```",
    opts: ['5', '15', '20', '30'],
    expl: '**答案：C**\n\n**解析：**\n累加 0+2+4+6+8 = 20。\n\n**考点：** 嵌套循环' },
  { id: 13, ans: 1, tags: ['循环', '运算符'], 
    q: "某学校图书馆的借阅卡号由 6 位整数组成。前 5 位是顺序编号，第 6 位是校验码：将前 5 位数字相加后除以 10 的余数，就是第 6 位。下面的 C++ 代码段用于判断卡号是否正确，横线处应填入的代码是（ ）。\n```cpp\ncout << \"请输入卡号：\";\ncin >> N;\norder_num = N / 10;\ncheck_num = N % 10;\ntnt = 0;\nfor (i = 0; i < 5; i++) {\n ________________;\n order_num /= 10;\n}\nif (__________________)\n cout << \"符合校验规则\";\nelse\n cout << \"不符合校验规则\";\n```",
    opts: ["`tnt += order_num / 10`\\n`tnt / 10 == check_num`", "`tnt += order_num % 10`\\n`tnt % 10 == check_num`", "`tnt = order_num / 10 + tnt`\\n`tnt % 10 == check_num`", "`tnt = order_num % 10`\\n`tnt / 10 == check_num`"],
    expl: '**答案：B**\n\n**解析：**\n数位分离取模累加。\n\n**考点：** 模运算' },
  { id: 14, ans: 0, tags: ['循环', '图形'], 
    q: "下面的 C++ 代码段正常执行后其输出的数字图形是（ ）。\n```cpp\nfor (i = 1; i < 5; i++) {\n for (j = 1; j < i + 1; j++)\n cout << j;\n cout << endl;\n}\n```",
    opts: ['1\n12\n123\n1234', '1\n22\n333\n4444', '1\n21\n321\n4321', '4\n34\n234\n1234'],
    expl: '**答案：A**\n\n**解析：**\n输出直角三角形。\n\n**考点：** 图形输出' },
  { id: 15, ans: 0, tags: ['循环', '程序分析'], 
    q: "某学校举办“校园演讲比赛”，每位选手由 8 位评委打分（0~10 的整数），若至少有 5 位评委给出大于等于 6 分，则成绩有效，最终得分为所有 8 位评委的总分。以下核心程序段依次输入 8 个分数，并计算最终得分。横线处应填入（ ）。\n```cpp\ntotal_score = 0;\nhigh_count = 0;\nfor (i = 0; i < 8; i++) {\n cout << \"请输入评委分数: \";\n cin >> score;\n ____________________;\n if (score >= 6)\n ________________;\n}\nif (high_count >= 5)\n cout << total_score;\nelse\n cout << 0;\n```",
    opts: ["`total_score += score`\\n`high_count += 1`", "`total_score += score`\\n`high_count += score`", "`high_count += 1`\\n`total_score += score`", "`total_score *= score`\\n`high_count *= 1`"],
    expl: '**答案：A**\n\n**解析：**\n累加与计数逻辑。\n\n**考点：** 累加器' }
];

const judgeQuestions = [
  { id: 16, ans: 0, text: '正确', logic: '智能设备需要操作系统支持。', kaodian: '操作系统基础' },
  { id: 17, ans: 1, text: '错误', logic: 'ASCII 运算结果为 0。', kaodian: '字符运算' },
  { id: 18, ans: 1, text: '错误', logic: '布尔值可隐式转换。', kaodian: '类型转换' },
  { id: 19, ans: 0, text: '正确', logic: '输出 0, 3, 6, 9。', kaodian: '取模判断' },
  { id: 20, ans: 0, text: '正确', logic: '非 0 且未修改导致死循环。', kaodian: '循环终止' },
  { id: 21, ans: 0, text: '正确', logic: '其后无代码，continue 无效。', kaodian: 'continue 作用' },
  { id: 22, ans: 0, text: '正确', logic: '判定逻辑等效。', kaodian: '逻辑判断' },
  { id: 23, ans: 1, text: '错误', logic: 'i 最终会变为 10，有输出。', kaodian: '循环分析' },
  { id: 24, ans: 1, text: '错误', logic: '输出序列不符。', kaodian: '程序分析' },
  { id: 25, ans: 0, text: '正确', logic: '%3d 可使对齐。', kaodian: '格式化输出' }
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
console.log('Successfully patched 2026-03-l2.js');
