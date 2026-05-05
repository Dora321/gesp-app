import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, CheckCircle, XCircle, Code, Play, RefreshCw, ChevronRight, ChevronLeft, Map, Activity, Award, AlertCircle, List, CheckSquare } from 'lucide-react';

// --- 数据源：完整收录 2025年12月 GESP C++ 二级真题 ---

const questions = [
    // === 单选题 (1-15) ===
    {
        id: 1,
        type: 'choice',
        question: "1. 飞行控制系统中执行“判断与决策”的核心部件最可能是：",
        options: ["A. 辐射传感器", "B. 处理器", "C. 内存单元", "D. 输出设备"],
        answer: 1, // B
        explanation: "【答案：B (处理器)】\n\n计算机硬件系统中，处理器（CPU）负责解释指令、处理数据和执行逻辑控制，是系统的“大脑”。在飞行控制系统中，复杂的航迹计算、障碍物规避和最终决策指令均由处理器完成。传感器（A）负责采集信号，内存（C）负责存储数据，输出设备（D）负责执行动作。"
    },
    {
        id: 2,
        type: 'choice',
        question: "2. 教学楼内局域范围使用的网络类型通常是：",
        options: ["A. PAN (个人局域网)", "B. LAN (局域网)", "C. MAN (城域网)", "D. WAN (广域网)"],
        answer: 1, // B
        explanation: "【答案：B (LAN)】\n\n- **LAN (Local Area Network)**：局域网。通常覆盖地理范围较小的区域，如办公楼、实验室或校园内部。\n- PAN：个人局域网（如蓝牙）。\n- MAN：城域网（覆盖城市范围）。\n- WAN：广域网（跨地域大范围，如互联网）。"
    },
    {
        id: 3,
        type: 'choice',
        question: "3. 下面有关 C++ 变量命名的说法，正确的是：",
        options: [
            "A. for 不能作为变量名，因为它是关键字",
            "B. _tnt 不能作为变量名，因为首字符必须是字母",
            "C. _tnt_ 不能作为变量名，容易混淆",
            "D. printf 是关键字，所以绝对不能作为变量名"
        ],
        answer: 0, // A
        explanation: "【答案：A】\n\n- **A**：✅ 正确。`for` 是 C++ 保留关键字，严禁作为标识符。\n- **B/C**：❌ 错误。C++ 标识符可以以下划线 `_` 开头或结尾。\n- **D**：❌ 错误。`printf` 是标准库函数名，并非语言关键字，虽然建议避免重名以防冲突，但并不属于“绝对不能”。"
    },
    {
        id: 4,
        type: 'choice',
        question: "4. 小数 0.123123... 循环，求第 N 位数字。代码逻辑：若余数为 0 输 1，余 1 输 2... 横线处应填：",
        code: `cin >> N;\nremainder = ______;\nif (remainder == 0) cout << 1;\nelse if (remainder == 1) cout << 2;\nelse cout << 3;`,
        options: ["A. N % 3", "B. (N-1) % 3", "C. N / 3", "D. (N-1) / 3"],
        answer: 1, // B
        explanation: "【答案：B】\n\n我们需要将 $N=1, 2, 3...$ 映射到输出 1, 2, 3：\n- 当 $N=1$（第1位）时，输出 1。计算 `(1-1)%3 = 0`，符合 `if(remainder == 0)`。\n- 当 $N=2$（第2位）时，输出 2。计算 `(2-1)%3 = 1`，符合 `else if`。\n- 当 $N=3$（第3位）时，输出 3。计算 `(3-1)%3 = 2`。\n选项 A 会导致 N=3 时 remainder=0，输出 1，逻辑错误。"
    },
    {
        id: 5,
        type: 'choice',
        question: "5. 执行 printf(\"%g\", (3 + 3.1415926535)) 输出 6.14159 的原因最可能是：",
        options: [
            "A. 整数转浮点数时产生精度误差",
            "B. printf 的 %g 默认控制显示 6 位有效数字",
            "C. 3.1415926535 是无限循环小数",
            "D. CPU 运算错误"
        ],
        answer: 1, // B
        explanation: "【答案：B】\n\n在 C 标准库函数 `printf` 中，格式说明符 `%g` 会自动选择最简练的格式输出，且**默认规则是只保留 6 位有效数字**。计算结果 $6.141592...$ 被截断显示为前 6 位 $6.14159$。"
    },
    {
        id: 6,
        type: 'choice',
        question: "6. 工号编码规则：前4位依次整除以3，累加之和除以10的余数为第5位。填空 L1 和 L2：",
        code: `for (int i=0; i<4; i++) {\n  cin >> N;\n  rst += ______; // L1\n}\ncout << ______; // L2`,
        options: ["A. N % 3, rst / 10", "B. N % 3, rst % 10", "C. N / 3, rst / 10", "D. N / 3, rst % 10"],
        answer: 3, // D
        explanation: "【答案：D】\n\n1. “整除以 3”：在 C++ 中使用 `/` 运算符对整数操作。填 `N / 3`。\n2. “除以 10 的余数”：即取模运算。填 `rst % 10`。"
    },
    {
        id: 7,
        type: 'choice',
        question: "7. 下面的 C++ 代码段执行后的输出是：",
        code: `for (int i=-2; i<2; i++)\n  if (i % 2)\n    printf("%d#", i);`,
        options: ["A. -1#1#", "B. -1#0#1#", "C. -2#-1#1#", "D. -2#-1#1#2#"],
        answer: 0, // A
        explanation: "【答案：A】\n\n1. `i` 的取值序列：-2, -1, 0, 1。\n2. 判定 `i % 2`（在 C++ 中非零即真）：\n   - `-2 % 2 = 0` (假)\n   - `-1 % 2 = -1` (非零，**真**) -> 输出 `-1#`\n   - `0 % 2 = 0` (假)\n   - `1 % 2 = 1` (**真**) -> 输出 `1#`。"
    },
    {
        id: 8,
        type: 'choice',
        question: "8. 下面的 C++ 代码执行后其输出是：",
        code: `int cnt=0;\nfor (int i=1; i<10; i+=2)\n  for (int j=0; j<i; j++)\n    cnt += 1;\ncout << cnt;`,
        options: ["A. 100", "B. 55", "C. 45", "D. 25"],
        answer: 3, // D
        explanation: "【答案：D】\n\n外层循环 `i` 取值：1, 3, 5, 7, 9。\n每一层对应的内层循环执行次数恰好等于 `i`。\n总次数 = $1 + 3 + 5 + 7 + 9 = 25$。"
    },
    {
        id: 9,
        type: 'choice',
        question: "9. 下面 C++ 代码执行后其输出是：",
        code: `for (int i=1; i<=12; i++) {\n  if (i%2==0) continue;\n  int j;\n  for (j=0; j<i; j++)\n    if (i*j % 2 == 0) cout << i*j << \" \";\n  if (j >= i) break;\n}\nif (i >= 12) cout << i*j;`,
        options: ["A. 0 0", "B. 11", "C. 0", "D. 0 11"],
        answer: 2, // C
        explanation: "【答案：C】\n\n1. `i = 1`: 进入内层，`j = 0`。`1*0 % 2 == 0` 成立，输出 `0 `。\n2. 然后 `j` 增加到 1，循环结束。执行 `if (j >= i)` 即 `1 >= 1`，成立，执行 `break` 跳出外层。\n3. 整个程序只输出过一个 0。"
    },
    {
        id: 10,
        type: 'choice',
        question: "10. 与下面 for 循环输出效果【不一致】的代码是：",
        code: `for (int i=0; i<10; i++) cout << i; // 输出 0123456789`,
        options: [
            "A. i=0; while(i<10) { cout<<i; i+=1; }",
            "B. i=0; while(i<10) { i+=1; cout<<i; }",
            "C. i=0; while(true) { if(i>=10) break; cout<<i; i+=1; }",
            "D. i=0; while(true) { cout<<i; i+=1; if(i>=10) break; }"
        ],
        answer: 1, // B
        explanation: "【答案：B】\n\n- **B**：该选项在输出前先执行了 `i+=1`。当 $i=0$ 时会先变成 1，随后输出的是 123...10。这与原代码输出 0...9 的效果不同。"
    },
    {
        id: 11,
        type: 'choice',
        question: "11. 下面 C++ 代码执行后的输出是：",
        code: `int num=0;\nwhile (num <= 5) {\n  num += 1;\n  if (num % 3) continue;\n  printf(\"%d#\", num);\n  if (num > 5) printf(\"%d\", num);\n}`,
        options: ["A. 3#6#", "B. 3#6#6", "C. 1#2#3#4#5#6#", "D. 1#2#3#4#5#6#6"],
        answer: 1, // B
        explanation: "【答案：B】\n\n- `num = 3`: `3%3==0` (不跳过)，输出 `3#`。\n- `num = 6`: `6%3==0` (不跳过)，输出 `6#`。由于满足 `num > 5`，接着输出 `6`。\n总输出：`3#6#6`。"
    },
    {
        id: 12,
        type: 'choice',
        question: "12. 下面 C++ 代码段执行后，其输出是：",
        code: `int cnt=0;\nfor (int i=0; i<5; i++)\n  for (int j=i; j<4; j++)\n    cnt += 1;\ncout << cnt;`,
        options: ["A. 9", "B. 10", "C. 14", "D. 20"],
        answer: 1, // B
        explanation: "【答案：B】\n\n追踪 `cnt` 增加次数：\n- `i=0`: `j=0,1,2,3` (4次)\n- `i=1`: `j=1,2,3` (3次)\n- `i=2`: `j=2,3` (2次)\n- `i=3`: `j=3` (1次)\n- `i=4`: `j=4`, 不执行。\n总计：$4+3+2+1 = 10$。"
    },
    {
        id: 13,
        type: 'choice',
        question: "13. 关于“漂亮数”判定（指 N 被破坏性修改）的代码，说法正确的是：",
        options: [
            "A. 代码逻辑完美，无懈可击",
            "B. while 循环后 N 变为了 0，后续判断应使用 N 的备份",
            "C. while 循环中应增加 else 逻辑",
            "D. 输入 N=0 时会导致死循环"
        ],
        answer: 1, // B
        explanation: "【答案：B】\n\n在数位分离程序 `while(N > 0) { ... N /= 10; }` 中，变量 `N` 会被不断除以 10 最终变为 0。如果后续逻辑（如判断原始数值是否满足条件）需要用到 `N` 的原值，则必须提前创建备份。"
    },
    {
        id: 14,
        type: 'choice',
        question: "14. 阅读代码：输入 N=5，输出的字符图形是：",
        code: `for (int i=0; i<n; i++) {\n  for(int j=0; j < n-i-1; j++) cout << \" \";\n  for(int k=0; k < 2*i+1; k++) cout << \"*\";\n  cout << endl;\n}`,
        options: ["A. 倒三角形", "B. 正金字塔", "C. 直角三角形", "D. 矩形"],
        answer: 1, // B
        explanation: "【答案：B】\n\n每一层空格递减，星号按 $1, 3, 5...$ 的奇数规律递增且居中对称，这构成了标准的正金字塔形。"
    },
    {
        id: 15,
        type: 'choice',
        question: "15. 歌手评分程序中关于 max/min 更新的说法，正确的是：",
        options: [
            "A. 必须预先排序，否则结果错误",
            "B. 初始化代码应放在外层循环之外",
            "C. L1 和 L2 可改写为简单的 if 语句",
            "D. total_score 计算逻辑不可更改"
        ],
        answer: 2, // C
        explanation: "【答案：C】\n\n代码中常用的 `max(a,b)` 逻辑完全等价于 `if (now > max) max = now;`。使用 `if` 语句是更基础且完全正确的实现方式。"
    },

    // === 判断题 (1-10) ===
    {
        id: 101,
        type: 'tf',
        question: "1. 操作系统（如鸿蒙 HarmonyOS）能够将用户编写的源程序翻译成二进制目标程序并运行。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "【答案：错误】\n\n“翻译”源代码是**编译器**的功能。操作系统负责资源管理、进程调度等服务，并不直接执行编译工作。"
    },
    {
        id: 102,
        type: 'tf',
        question: "2. C++ 表达式 5 < 10 && 20 对应的逻辑计算值为 true。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "【答案：正确】\n\n1. `5 < 10` 为真。\n2. `20` 作为一个非零整数，在逻辑运算中视为真。\n3. `true && true` 结果为真。"
    },
    {
        id: 103,
        type: 'tf',
        question: "3. C++ 表达式 10 / 0.333333 == 10 / (1 / 3) 的结果为 true。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "【答案：错误】\n\n右侧 `1 / 3` 是整数除法，结果为 0。`10 / 0` 会导致运行时错误（除以零）。"
    },
    {
        id: 104,
        type: 'tf',
        question: "4. 执行 while(N) N /= 10; 无论输入何种整数，其输出结果都恒为 0。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "【答案：正确】\n\n任何非零整数不断整除以 10 最终都会变成 0 从而导致循环终止。输入 0 则不进入循环，结果依然是 0。"
    },
    {
        id: 105,
        type: 'tf',
        question: "5. 执行 int a=4, b=(a==5); cout << a << b; 执行后输出为 40。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "【答案：正确】\n\n`a==5` 为假（0），故 `b` 为 0。输出 `a` 的值 4 和 `b` 的值 0，结果为 40。"
    },
    {
        id: 106,
        type: 'tf',
        question: "6. C++ 代码中对表达式 ('Z'-'A') < ('z'-'A') 的计算结果输出为 0。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "【答案：错误】\n\n小写字母的 ASCII 码值排在大写字母之后。`'z'` 远大于 `'Z'`，因此表达式结果应为 1（真）。"
    },
    {
        id: 107,
        type: 'tf',
        question: "7. 提供代码利用 N % N10 == N 来准确判断正整数 N 的位数。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "【答案：正确】\n\n通过不断扩大取模基数（10, 100, 1000...）判断数值所处的量级范围，是经典的位数判定方法。"
    },
    {
        id: 108,
        type: 'tf',
        question: "8. 在交叉加减程序中，将翻转语句 Flag = -Flag 修改为 Flag -= Flag 效果相同。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "【答案：错误】\n\n`Flag -= Flag` 等价于 `Flag = 0`，会使变量失去状态。而 `-Flag` 实现的是 1 与 -1 的正负交替。"
    },
    {
        id: 109,
        type: 'tf',
        question: "9. 双重循环代码 (i=0..9, j=i..9) 执行后将输出累加值 55。",
        options: ["√ 正确", "× 错误"],
        answer: 0, // True
        explanation: "【答案：正确】\n\n累加次数为 $10 + 9 + 8 + ... + 1 = 55$。这是标准的等差数列求和。"
    },
    {
        id: 110,
        type: 'tf',
        question: "10. 在输出九九乘法表矩阵时，删除换行符 printf(\"\\n\") 不会影响排版效果。",
        options: ["√ 正确", "× 错误"],
        answer: 1, // False
        explanation: "【答案：错误】\n\n没有换行符，所有输出项都会堆积在同一行，导致无法区分矩阵的行结构。"
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
