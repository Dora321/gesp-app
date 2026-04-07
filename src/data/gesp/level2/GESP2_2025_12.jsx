import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, CheckCircle, XCircle, Code, Play, RefreshCw, ChevronRight, ChevronLeft, Map, Activity, Award, AlertCircle, List, CheckSquare } from 'lucide-react';

// --- 数据源：完整收录 2025年12月 GESP C++ 二级真题 ---

const questions = [
    // === 单选题 (1-15) ===
    {
        id: 1,
        type: 'choice',
        question: "1. 近日，空客 A320 系列飞机需更换一种易受太阳辐射影响的部件。强烈的太阳辐射可能会损坏飞行控制系统所需的关键数据，导致判断失误。执行判断的部件最可能是：",
        options: ["A. 辐射传感器", "B. 处理器", "C. 内存单元", "D. 输出设备"],
        answer: 1, // B
        explanation: "处理器（CPU）是计算机的'大脑'，负责执行指令和逻辑判断。题目中提到'执行判断'和'关键数据'处理，这是处理器的核心功能。虽然内存也存储数据，决行判断动作的是处理器。"
    },
    {
        id: 2,
        type: 'choice',
        question: "2. 小明所在的教学楼内的网络属于哪种类型？",
        options: ["A. PAN (个人局域网)", "B. LAN (局域网)", "C. MAN (城域网)", "D. WAN (广域网)"],
        answer: 1, // B
        explanation: "LAN (Local Area Network) 指局域网，通常覆盖一个房间、一栋楼或校园。教学楼内的网络显然属于局域网. PAN 是蓝牙等个人范围，MAN 是城市范围，WAN 是跨地域网络。"
    },
    {
        id: 3,
        type: 'choice',
        question: "3. 下面有关 C++ 变量的说法，正确的是：",
        options: [
            "A. 不可以用 for 作为变量名，因为 for 是关键字",
            "B. _tnt 不可以是变量名，因为首字符必须是字母",
            "C. _tnt_ 不可以是变量名，容易混淆",
            "D. 可以用 printf 作为变量名，但不是好习惯"
        ],
        answer: 0, // A
        explanation: "A 正确：C++ 关键字（如 for, if, int）绝对不能作为变量名。B 错误：变量名可以以字母或下划线开头。C 错误：_tnt_ 是合法的变量名。D 错误：虽然某些环境下 printf 可做变量名，但它是标准库函数名，且 A 选项是关于关键字的绝对真理，故选 A。"
    },
    {
        id: 4,
        type: 'choice',
        question: "4. 小数 0.123123... 循环，求第 N 位的值。代码逻辑：若余数为0输1，余1输2... 横线处应填：",
        code: `cin >> N;\nremainder = ______;\nif (remainder == 0) cout << 1;\nelse if (remainder == 1) cout << 2;\nelse cout << 3;`,
        options: ["A. N % 3", "B. (N-1) % 3", "C. N / 3", "D. (N-1) / 3"],
        answer: 1, // B
        explanation: "我们需要建立 N 与输出的映射：N=1 -> 1, N=2 -> 2, N=3 -> 3。如果用 (N-1)%3：\nN=1: 0%3=0 (输出1)\nN=2: 1%3=1 (输出2)\nN=3: 2%3=2 (输出3)\n符合代码逻辑。"
    },
    {
        id: 5,
        type: 'choice',
        question: "5. 执行 printf(\"%g\\n\", (3 + 3.1415926535)); 输出 6.14159。其原因最可能是：",
        options: [
            "A. 整数转浮点数时产生舍入误差",
            "B. printf 默认小数点位数限制",
            "C. 无限循环小数无法精确表示",
            "D. CPU 运算错误"
        ],
        answer: 1, // B
        explanation: "printf 的 %g 格式说明符默认通常显示 6 位有效数字。6.14159 正好是 6 位有效数字。这并非计算误差，而是输出格式的默认行为。"
    },
    {
        id: 6,
        type: 'choice',
        question: "6. 工号编码规则：前4位依次整除以3，累加之和除以10的余数为第5位。填空 L1 和 L2。",
        code: `for (int i=0; i<4; i++) {\n  cin >> N;\n  rst += ______; // L1\n}\ncout << ______; // L2`,
        options: ["A. N%3, rst/10", "B. N%3, rst%10", "C. N/3, rst/10", "D. N/3, rst%10"],
        answer: 3, // D
        explanation: "L1: 题目要求'整除以3'，即 N/3 (整数除法)。L2: '除以10的余数'，即 rst % 10。所以选 D。"
    },
    {
        id: 7,
        type: 'choice',
        question: "7. 下面的 C++ 代码执行后的输出是：",
        code: `for (int i=-2; i<2; i++)\n  if (i % 2)\n    printf("%d#", i);`,
        options: ["A. -1#1#", "B. -1#0#1#", "C. -2#-1#1#", "D. -2#-1#1#2#"],
        answer: 0, // A
        explanation: "循环遍历 -2, -1, 0, 1。\n-2 % 2 == 0 (False)\n-1 % 2 != 0 (True) -> 输出 -1#\n0 % 2 == 0 (False)\n1 % 2 != 0 (True) -> 输出 1#\n故输出 -1#1#。"
    },
    {
        id: 8,
        type: 'choice',
        question: "8. 下面的 C++ 代码执行后其输出是：",
        code: `int cnt=0;\nfor (int i=1; i<10; i+=2)\n  for (int j=0; j<i; j++)\n    cnt += 1;\ncout << cnt;`,
        options: ["A. 100", "B. 55", "C. 45", "D. 25"],
        answer: 3, // D
        explanation: "外层循环 i 取值: 1, 3, 5, 7, 9。\n内层循环次数等于 i。\n总次数 cnt = 1 + 3 + 5 + 7 + 9 = 25。"
    },
    {
        id: 9,
        type: 'choice',
        question: "9. 下面 C++ 代码执行后其输出是：",
        code: `for (int i=1; i<=12; i++) {\n  if (i%2==0) continue;\n  int j;\n  for (j=0; j<i; j++)\n    if (i*j % 2 == 0) cout << i*j << " ";\n  if (j >= i) break;\n}\nif (i >= 12) cout << i*j;`,
        options: ["A. 0 0", "B. 1 1", "C. 0", "D. 0 1 1"],
        answer: 2, // C
        explanation: "当 i=1 时：\n  j=0, 1*0%2==0 -> 输出 '0 '。\n  j 自增变为 1，内层循环结束。\n  检查 if (j>=i) 即 1>=1，成立，break 跳出外层循环。\n此时 i=1，不满足最后的 i>=12，不输出额外内容。\n最终输出 '0 '。"
    },
    {
        id: 10,
        type: 'choice',
        question: "10. 与下面 C++ for 循环输出效果【不一致】的代码是：",
        code: `for (int i=0; i<10; i++) cout << i; // 输出 0123456789`,
        options: [
            "A. while loop: cout 在 i+=1 之前",
            "B. while loop: i+=1 在 cout 之前",
            "C. while(true) + if break (后置判断)",
            "D. while(true) + if break (前置判断)"
        ],
        answer: 1, // B
        explanation: "原代码输出 0 到 9。\n选项 B 的代码结构是：\nint i=0;\nwhile(i<10) {\n  i+=1;\n  cout << i;\n}\n这会输出 1 到 10。与原代码不一致。"
    },
    {
        id: 11,
        type: 'choice',
        question: "11. 下面 C++ 代码执行后输出是：",
        code: `int num=0;\nwhile (num <= 5) {\n  num += 1;\n  if (num % 3) continue;\n  printf("%d#", num);\n  if (num > 5) printf("%d", num);\n}`,
        options: ["A. 3#6#", "B. 3#6#6", "C. 1#2#3#4#5#6#", "D. 1#2#3#4#5#6#6"],
        answer: 1, // B
        explanation: "if (num % 3) continue; 表示如果 num 不是 3 的倍数就跳过。\nnum=1,2 (跳过)\nnum=3 (是倍数) -> 输出 '3#'\nnum=4,5 (跳过)\nnum=6 (是倍数) -> 输出 '6#'。此时 num>5，再输出 '6'。\n总输出：3#6#6。"
    },
    {
        id: 12,
        type: 'choice',
        question: "12. 下面 C++ 代码执行后，其输出是：",
        code: `int cnt=0;\nfor (int i=0; i<5; i++)\n  for (int j=i; j<4; j++)\n    cnt += 1;\ncout << cnt;`,
        options: ["A. 9", "B. 10", "C. 14", "D. 20"],
        answer: 1, // B
        explanation: "i=0, j=0..3 (4次)\ni=1, j=1..3 (3次)\ni=2, j=2..3 (2次)\ni=3, j=3..3 (1次)\ni=4, j=4..3 (0次)\nTotal = 4+3+2+1 = 10。"
    },
    {
        id: 13,
        type: 'choice',
        question: "13. 关于“漂亮数”代码（判断 N 是否能被 M 整除/含 M/各位和被 M 整除），相关说法正确的是：",
        code: `... while (N != 0) { ... N /= 10; } ...\nif ((N % M == 0) && ... )`,
        options: [
            "A. 代码能完成目标",
            "B. while 循环中 N 变成了 0，需要在循环前保存 N",
            "C. while 循环中 if 可以加 else",
            "D. 输入 0 和 3 肯定输出 0 是完整漂亮数"
        ],
        answer: 1, // B
        explanation: "while 循环用于拆解 N 的每一位，循环结束时 N 会变为 0。后面的判断 `if (N % M == 0)` 实际上是在判断 `0 % M == 0`，丢失了原始 N 的值。必须在循环前用变量备份 N。"
    },
    {
        id: 14,
        type: 'choice',
        question: "14. 阅读代码：输入 5，输出什么图形？",
        code: `for (int i=0; i<n; i++) {\n  for(int j=0; j < n-i-1; j++) cout << " ";\n  for(int k=0; k < 2*i+1; k++) cout << "*";\n  cout << endl;\n}`,
        options: ["A. 倒三角形", "B. 正金字塔", "C. 直角三角形", "D. 矩形"],
        answer: 1, // B
        explanation: "第 i 行有 n-i-1 个空格，以及 2*i+1 个星号。\n空格逐渐减少，星号逐渐增加（1, 3, 5...），且居中对齐，这是正金字塔形状。"
    },
    {
        id: 15,
        type: 'choice',
        question: "15. 歌手打分程序（去掉最高分最低分）。如果单个评委可给满分10分，相关说法正确的是：",
        code: `... max_score = max(max_score, now_score); ...`,
        options: [
            "A. 逻辑错误，因为没有排序",
            "B. 初始化代码应移到外层循环外",
            "C. L1和L2的代码可以分别改为简单的 if 语句",
            "D. total_score 计算不可更改"
        ],
        answer: 2, // C
        explanation: "A 错：不需要排序也能找到最大最小值。B 错：每位选手都需要重置 max/min. C 对：`max(a,b)` 函数完全可以用 `if (now > max) max = now;` 替代。D 错：写法当然可以改。"
    },

    // === 判断题 (1-10) ===
    {
        id: 101,
        type: 'tf',
        question: "1. 鸿蒙是华为公司开发的一款操作系统，它能够将正确的源程序翻译成目标程序，并运行。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "前半句正确，鸿蒙是操作系统。但后半句描述的是“编译器”或“解释器”的功能。操作系统负责资源管理，不直接负责翻译源代码。"
    },
    {
        id: 102,
        type: 'tf',
        question: "2. C++ 表达式 5 < 10 && 20 对应的逻辑值为 true。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "5 < 10 为 true. 20 作为整数在逻辑运算中非零即为 true. true && true 结果为 true."
    },
    {
        id: 103,
        type: 'tf',
        question: "3. C++ 表达式 10 / 0.333333 == 10 / (1/3) 的值为 true。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "左边是浮点除法，结果约 30.00003. 右边 `1/3` 是整数除法，结果为 0. `10/0` 会导致运行时错误（除以零）。即使右边是浮点数 `1.0/3.0`，由于浮点数精度问题，直接用 == 比较通常也是 false."
    },
    {
        id: 104,
        type: 'tf',
        question: "4. 代码 while(N) N /= 10; 无论输入负整数、0 或正整数，其输出都将是 0。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "正整数 and 负整数不断除以 10 最终都会变成 0，导致循环结束。输入 0 则循环不执行。最终打印 N 都是 0。"
    },
    {
        id: 105,
        type: 'tf',
        question: "5. 代码 int a=4; int b=a==5; cout << a << b; 执行后输出 40。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "a 赋值 4. `b = (a==5)` 即 `b = (4==5)`，故 b 为 0. 输出 a(4) 然后 b(0)，即 40."
    },
    {
        id: 106,
        type: 'tf',
        question: "6. C++ 代码中对表达式 ('Z'-'A') < ('z'-'A') 的结果输出为 0。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "'Z'-'A' = 25，'z'-'A' = 57，因此 25 < 57 为真，表达式输出 1，所以题干说法错误。"
    },
    {
        id: 107,
        type: 'tf',
        question: "7. 提供的代码利用 N%N10 == N 来判断 N 的位数（如 123 是 3 位数）。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "代码通过不断将 N10 乘以 10（10, 100, 1000...）并取模。当 N % 1000 == N 时（例如 123 % 1000 = 123），说明 N 小于 1000，即为 3 位数。逻辑正确。"
    },
    {
        id: 108,
        type: 'tf',
        question: "8. 计算交叉加减 (1-2+3-4...)。将代码中的 Flag = -Flag 改为 Flag - Flag 效果相同。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "`Flag = -Flag` 用于翻转符号。而 `Flag - Flag` 只是一个表达式（结果为 0），并不改变 Flag 变量的值，会导致逻辑错误。"
    },
    {
        id: 109,
        type: 'tf',
        question: "9. 双重循环代码 (i=0..9, j=i..9) 执行后将输出 55。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "这是一个经典的等差数列求和。i=0 加 10 次，i=1 加 9 次... 总和 = 10+9+...+1 = 55。"
    },
    {
        id: 110,
        type: 'tf',
        question: "10. 代码中 printf(\"\\n\") 没有任何可读内容，删除不影响输出效果。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "printf(\"\\n\") 输出换行符。原代码是一个九九乘法表式的矩阵输出，删除换行符后，所有数字会挤在同一行，严重影响输出格式。"
    }
];

// --- 编程题模拟逻辑 ---

// 编程题 1：环保能量球
const calculateEnergy = (n, x) => {
    let log = [];
    let total = 0;
    for (let i = 1; i <= n; i++) {
        let stepReward = 1; // 基础分
        let extra = 0;
        if (i % x === 0) {
            extra = 1; // 额外奖励
        }
        total += stepReward + extra;
        log.push({ km: i, base: 1, extra: extra, currentTotal: total });
    }
    return { total, log };
};

// 编程题 2：黄金格
const calculateGoldenGrid = (H, W, x) => {
    let grid = [];
    let count = 0;
    for (let r = 1; r <= H; r++) {
        let row = [];
        for (let c = 1; c <= W; c++) {
            const left = Math.sqrt(r * r + c * c);
            const right = x + r - c;
            const isGolden = left <= right;
            if (isGolden) count++;
            row.push({ r, c, val: left.toFixed(2), limit: right, isGolden });
        }
        grid.push(row);
    }
    return { count, grid };
};

// --- 组件 ---

const QuizCard = ({ data, index, total, onNext, onPrev }) => {
    const [selected, setSelected] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        setSelected(null);
        setShowExplanation(false);
    }, [data]);

    const handleSelect = (idx) => {
        if (showExplanation) return;
        setSelected(idx);
        setShowExplanation(true);
    };

    const isCorrect = selected === data.answer;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${data.type === 'choice' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    {data.type === 'choice' ? '单选题' : '判断题'} {index + 1}/{total}
                </span>
                <div className="flex gap-2">
                    <button onClick={onPrev} disabled={index === 0} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={onNext} disabled={index === total - 1} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-4 leading-relaxed">{data.question}</h3>

            {data.code && (
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto border-l-4 border-blue-500">
                    <pre>{data.code}</pre>
                </div>
            )}

            <div className="space-y-3">
                {data.options.map((opt, idx) => {
                    let baseClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between group";
                    let stateClass = "border-gray-200 hover:border-blue-300 hover:bg-blue-50";

                    if (showExplanation) {
                        if (idx === data.answer) stateClass = "border-green-500 bg-green-50 text-green-700";
                        else if (idx === selected && idx !== data.answer) stateClass = "border-red-500 bg-red-50 text-red-700";
                        else stateClass = "border-gray-100 opacity-60";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`${baseClass} ${stateClass}`}
                            disabled={showExplanation}
                        >
                            <span className="flex items-center gap-3 font-medium">
                                {data.type === 'choice' && (
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${showExplanation && idx === data.answer ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                )}
                                {opt}
                            </span>
                            {showExplanation && idx === data.answer && <CheckCircle className="text-green-500" size={20} />}
                            {showExplanation && idx === selected && idx !== data.answer && <XCircle className="text-red-500" size={20} />}
                        </button>
                    );
                })}
            </div>

            {showExplanation && (
                <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-100' : 'bg-blue-50 border border-blue-100'}`}>
                    <div className="flex items-center gap-2 font-bold mb-2">
                        <BookOpen size={18} className={isCorrect ? 'text-green-600' : 'text-blue-600'} />
                        <span className={isCorrect ? 'text-green-800' : 'text-blue-800'}>解析</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {data.explanation}
                    </p>
                </div>
            )}
        </div>
    );
};

// --- 编程题 1 可视化 ---
const EnergyBallLab = () => {
    const [n, setN] = useState(10);
    const [x, setX] = useState(3);
    const { total, log } = useMemo(() => calculateEnergy(n, x), [n, x]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Activity className="text-green-500" />
                    编程题 1：环保能量球
                </h3>
                <p className="text-gray-500 text-sm mt-1">规则：每走 1 公里得 1 分，每走 X 公里额外奖 1 分。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-blue-900 mb-2">总路程 N (公里)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range" min="1" max="20" value={n}
                                onChange={(e) => setN(parseInt(e.target.value))}
                                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="font-mono font-bold text-blue-600 w-8">{n}</span>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-purple-900 mb-2">奖励间隔 X (公里)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range" min="1" max="10" value={x}
                                onChange={(e) => setX(parseInt(e.target.value))}
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="font-mono font-bold text-purple-600 w-8">{x}</span>
                        </div>
                    </div>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                        <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                            <span>C++ 核心逻辑</span>
                            <Code size={16} />
                        </div>
                        <code>
                            {`int ans = 0;\nfor(int i=1; i<=n; i++) {\n  ans++;          // 基础分\n  if(i % x == 0)  // 第 ${x} km\n    ans++;        // 奖励分\n}`}
                        </code>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-700">能量累积过程</h4>
                        <span className="text-2xl font-bold text-green-600">{total} <span className="text-sm font-normal text-gray-400">能量</span></span>
                    </div>
                    <div className="space-y-2 h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {log.map((step) => (
                            <div key={step.km} className={`flex items-center justify-between p-2 rounded ${step.extra > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">{step.km}</span>
                                    <span className="text-sm text-gray-600">公里</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">+1 基础</span>
                                    {step.extra > 0 && <span className="text-xs font-bold text-yellow-600 flex items-center gap-1"><Award size={12} /> +1 奖励</span>}
                                    <ChevronRight size={14} className="text-gray-300" />
                                    <span className="font-bold text-gray-800">{step.currentTotal}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 编程题 2 可视化 ---
const GoldenGridLab = () => {
    const [H, setH] = useState(4);
    const [W, setW] = useState(4);
    const [xVal, setXVal] = useState(2);
    const { count, grid } = useMemo(() => calculateGoldenGrid(H, W, xVal), [H, W, xVal]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Map className="text-amber-500" />
                    编程题 2：黄金格
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                    条件：<span className="font-mono bg-gray-100 px-1 rounded">sqrt(r² + c²) ≤ x + r - c</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">地图尺寸 (H x W)</label>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <span className="text-xs text-gray-400">行 H: {H}</span>
                                <input type="range" min="1" max="8" value={H} onChange={(e) => setH(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-gray-400">列 W: {W}</span>
                                <input type="range" min="1" max="8" value={W} onChange={(e) => setW(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">参数 X</label>
                        <div className="flex items-center gap-4 bg-amber-50 p-3 rounded-lg border border-amber-100">
                            <input type="range" min="0" max="10" value={xVal} onChange={(e) => setXVal(Number(e.target.value))} className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer" />
                            <span className="font-mono font-bold text-amber-600 text-xl">{xVal}</span>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-center">
                            <div className="text-sm text-blue-600 mb-1">黄金格总数</div>
                            <div className="text-4xl font-black text-blue-700">{count}</div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 overflow-x-auto">
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${W}, minmax(60px, 1fr))` }}>
                        {grid.map((row, rIndex) =>
                            row.map((cell, cIndex) => (
                                <div
                                    key={`${rIndex}-${cIndex}`}
                                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 text-xs transition-all duration-300 relative border-2 ${cell.isGolden
                                        ? 'bg-amber-400 border-amber-500 text-amber-900 shadow-md transform scale-105 z-10'
                                        : 'bg-gray-100 border-gray-200 text-gray-400'
                                        }`}
                                >
                                    <span className="absolute top-1 left-1 opacity-50 scale-75">({cell.r},{cell.c})</span>
                                    {cell.isGolden && <Award size={16} className="mb-1 opacity-80" />}
                                    <div className="font-mono scale-90 mt-3 flex flex-col items-center">
                                        <span className="border-b border-black/10">√{cell.r * cell.r + cell.c * cell.c}</span>
                                        <span>{cell.val}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function GESP2_2025_12() {
    const [activeTab, setActiveTab] = useState('quiz');
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // 统计单选和判断题的数量
    const choiceCount = questions.filter(q => q.type === 'choice').length;
    const tfCount = questions.filter(q => q.type === 'tf').length;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
            {/* Header */}
            <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Code size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">GESP C++ 二级真题解析</h1>
                            <p className="text-xs text-slate-400">2025年12月卷 • 互动课件</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-1 bg-slate-800 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('quiz')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'quiz'
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                        >
                            <CheckSquare size={16} />
                            真题闯关
                        </button>
                        <button
                            onClick={() => setActiveTab('lab1')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'lab1'
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                        >
                            <Activity size={16} />
                            能量球
                        </button>
                        <button
                            onClick={() => setActiveTab('lab2')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'lab2'
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                        >
                            <Map size={16} />
                            黄金格
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav */}
            <div className="md:hidden bg-white border-b p-2 flex justify-around">
                {['quiz', 'lab1', 'lab2'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-xs font-bold rounded-full ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                            }`}
                    >
                        {tab === 'quiz' ? '题目' : tab === 'lab1' ? '能量球' : '黄金格'}
                    </button>
                ))}
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto p-4 md:p-8">
                {activeTab === 'quiz' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <List className="text-blue-500" />
                                全卷练习
                                <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                    {choiceCount} 单选 + {tfCount} 判断
                                </span>
                            </h2>
                            <button
                                onClick={() => setCurrentQuestion(0)}
                                className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
                            >
                                <RefreshCw size={14} /> 重置进度
                            </button>
                        </div>

                        <QuizCard
                            data={questions[currentQuestion]}
                            index={currentQuestion}
                            total={questions.length}
                            onNext={() => setCurrentQuestion(c => Math.min(c + 1, questions.length - 1))}
                            onPrev={() => setCurrentQuestion(c => Math.max(c - 1, 0))}
                        />

                        {/* Quick Navigation Dots */}
                        <div className="flex flex-wrap gap-1 justify-center mt-6">
                            {questions.map((q, idx) => (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQuestion(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentQuestion === idx ? 'bg-blue-600 w-4' : 'bg-gray-300 hover:bg-blue-300'}`}
                                    title={`第 ${idx + 1} 题`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'lab1' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <EnergyBallLab />
                        <div className="mt-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <AlertCircle size={18} className="text-orange-500" />
                                易错点解析
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                这道题容易犯的错误是直接用除法计算总分，而忽略了循环模拟的细节。
                                如果你使用 <code className="bg-gray-100 px-1 rounded">total = n + n/x</code> 这种数学公式法，在绝大多数情况下是正确的（也是最高效的）。
                                <br /><br />
                                但初学者容易写成：在每一步循环中既加了基础分，又在满足条件时加了奖励分，要注意 <code className="bg-gray-100 px-1 rounded">i % x == 0</code> 的判断条件是否包含 0（题目通常从 1 公里开始算）。
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'lab2' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <GoldenGridLab />
                        <div className="mt-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <AlertCircle size={18} className="text-orange-500" />
                                解题技巧
                            </h4>
                            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                                <li>
                                    <strong>不等式变形：</strong> 题目条件是 <code className="bg-gray-100 px-1 rounded">sqrt(r^2 + c^2) &le; x + r - c</code>。
                                    在代码中，我们需要引入 <code className="bg-gray-100 px-1 rounded">&lt;cmath&gt;</code> 库来使用 <code className="bg-gray-100 px-1 rounded">sqrt</code> 函数。
                                </li>
                                <li>
                                    <strong>数据类型：</strong> 虽然本题 <code className="bg-gray-100 px-1 rounded">x, r, c</code> 都是整数，但开根号的结果是浮点数。
                                    在 C++ 中比较浮点数和整数是安全的，但要注意精度问题（本题数据范围较小，直接比较即可）。
                                </li>
                                <li>
                                    <strong>时间复杂度：</strong> 双重循环遍历 H 行 W 列，复杂度为 O(H*W)。题目中 H, W ≤ 1000，总计算量约 10^6 次，远小于 1秒的时间限制（通常允许 10^8 次），所以暴力枚举是完全可行的。
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
