import React, { useState, useEffect } from 'react';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import {
    Clock,
    Users,
    Layers,
    Play,
    RotateCcw,
    Star,
    AlertTriangle,
    Terminal,
    BookOpen,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Grid,
    Hash,
    HelpCircle,
    Pause,
    Menu,
    X
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import { CodeTracer, MasteryCheck } from '../CppLessonShell';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const icons = {
        "clock": <Clock size={size} color={color} className={className} />,
        "users": <Users size={size} color={color} className={className} />,
        "layers": <Layers size={size} color={color} className={className} />,
        "play": <Play size={size} color={color} className={className} />,
        "reset": <RotateCcw size={size} color={color} className={className} />,
        "star": <Star size={size} color={color} className={className} />,
        "alert": <AlertTriangle size={size} color={color} className={className} />,
        "terminal": <Terminal size={size} color={color} className={className} />,
        "book": <BookOpen size={size} color={color} className={className} />,
        "check": <CheckCircle2 size={size} color={color} className={className} />,
        "x": <XCircle size={size} color={color} className={className} />,
        "arrow": <ArrowRight size={size} color={color} className={className} />,
        "grid": <Grid size={size} color={color} className={className} />,
        "hash": <Hash size={size} color={color} className={className} />,
        "help": <HelpCircle size={size} color={color} className={className} />,
        "pause": <Pause size={size} color={color} className={className} />
    };
    return icons[name] || null;
};

const lesson12MasteryItems = [
    {
        label: '能说清外层循环和内层循环各负责什么。',
        evidence: '能把 i 解释成行或轮次，把 j 解释成这一行里的次数。',
        retryHint: '回到“排队报数”，用第几排、第几人解释 i 和 j。',
    },
    {
        label: '能手推内层每次都会重新开始。',
        evidence: '知道外层 i 变化一次，内层 j 会重新初始化为 1 并跑完整轮。',
        retryHint: '回到“嵌套循环追踪器”，盯住 j 会重新初始化为 1 的步骤。',
    },
    {
        label: '能计算双层循环总执行次数。',
        evidence: '能算出 3 行 4 列会输出 12 次，并能迁移到 m 行 n 列。',
        retryHint: '回到“累死人的计数”，先算外层次数再乘内层次数。',
    },
    {
        label: '能把图形题拆成行数、列数和换行。',
        evidence: '能说明金字塔或乘法表中外层控制行，内层控制每行打印多少个。',
        retryHint: '回到“图形题攻略”，先画每行数量表再写循环。',
    },
];

// --- 章节数据 ---
const sections = [
    { id: 1, title: "课程导入：忙碌的时钟", icon: "clock", category: "嵌套奥义" },
    { id: 2, title: "情景：排队报数", icon: "users", category: "嵌套奥义" },
    { id: 3, title: "语法：包心肉丸结构", icon: "layers", category: "嵌套奥义" },
    { id: 4, title: "流程：慢动作回放", icon: "play", category: "嵌套奥义" },
    { id: 5, title: "实战：累死人的计数", icon: "hash", category: "图形实战" },
    { id: 6, title: "实战：打印金字塔", icon: "star", category: "图形实战" },
    { id: 7, title: "技巧：图形题攻略", icon: "grid", category: "图形实战" },
    { id: 8, title: "避坑指南", icon: "alert", category: "避坑与总结" },
    { id: 9, title: "总结与作业", icon: "check", category: "避坑与总结" },
    { id: 10, title: "离开前检查", icon: "check", category: "避坑与总结" }
];

// --- 互动组件 1：排队报数模拟器 ---
const QueueDrill = () => {
    const [activeRow, setActiveRow] = useState(0);
    const [activeCol, setActiveCol] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setActiveCol(prevCol => {
                    if (prevCol < 4) return prevCol + 1;
                    // Col finished, move to next row
                    setActiveRow(prevRow => {
                        if (prevRow < 3) return prevRow + 1;
                        setIsRunning(false); // End
                        return 1;
                    });
                    return 1; // Reset col
                });
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const start = () => {
        setActiveRow(1);
        setActiveCol(0); // Start before 1st col
        setIsRunning(true);
    };

    return (
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4 shadow-sm">
            <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
                <Users className="text-blue-600" /> 体育课排队报数 (3排 x 4人)
            </h3>

            <div className="flex flex-col gap-4 mb-6">
                {[1, 2, 3].map(row => (
                    <div key={row} className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${activeRow === row ? 'bg-blue-200 border border-blue-400' : 'bg-white border border-gray-100'}`}>
                        <div className="w-20 font-bold text-gray-600 text-sm">第 {row} 排</div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map(col => (
                                <div key={col} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                  ${activeRow === row && activeCol === col
                                        ? 'bg-blue-600 text-white scale-125 shadow-lg'
                                        : (activeRow === row && activeCol > col ? 'bg-blue-300 text-blue-900' : 'bg-gray-200 text-gray-400')}
                `}>
                                    {col}
                                </div>
                            ))}
                        </div>
                        {activeRow === row && activeCol > 0 && activeCol <= 4 && (
                            <div className="ml-4 text-blue-600 font-mono text-sm animate-pulse">
                                "报数 {activeCol}!"
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                <div className="font-mono text-sm">
                    <div><span className="text-purple-600">for</span> (int i=1; i&lt;=3; i++) &#123; <span className="text-gray-400">// 外层(排)</span></div>
                    <div className="pl-4"><span className="text-purple-600">for</span> (int j=1; j&lt;=4; j++) &#123; <span className="text-gray-400">// 内层(人)</span></div>
                    <div className="pl-8">cout &lt;&lt; "报数" &lt;&lt; j;</div>
                    <div className="pl-4">&#125;</div>
                    <div>&#125;</div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">当前状态</div>
                    <div className="font-bold text-xl text-blue-800">i = {activeRow}, j = {activeCol === 0 ? '-' : activeCol}</div>
                </div>
            </div>

            <button onClick={start} disabled={isRunning} className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition flex justify-center items-center gap-2">
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                {isRunning ? "演练中..." : "开始报数"}
            </button>
        </div>
    );
};

const nestedLoopCode = `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 4; j++) {
        cout << i << "-" << j << " ";
    }
    cout << endl;
}`;

const nestedLoopRows = [1, 2, 3].map((i) => ({
    i,
    values: [1, 2, 3, 4].map((j) => `${i}-${j}`),
}));

const nestedLoopTraceSteps = [
    {
        active: [0],
        vars: { i: '未开始', j: '-', '本行': '空' },
        action: '进入 i = 1',
    },
    ...nestedLoopRows.flatMap(({ i, values }) => {
        const rowSteps = [
            {
                active: [0],
                vars: { i, j: '未开始', '本行': '空' },
                row: [`第 ${i} 行`, `i = ${i}`, 'j 将从 1 开始', '外层先定住一行', '空'],
                action: `进入第 ${i} 行内层`,
            },
            ...values.flatMap((value, index) => {
                const j = index + 1;
                const printed = values.slice(0, j).join(' ');

                return [
                    {
                        active: [1],
                        vars: { i, j, '本行': printed || '空' },
                        row: [`判断 j=${j}`, `i = ${i}`, `${j} <= 4`, '真，进入内层', printed || '空'],
                        action: `打印 ${value}`,
                    },
                    {
                        active: [2],
                        vars: { i, j, '本行': printed },
                        row: [`打印第 ${j} 项`, `i = ${i}`, `j = ${j}`, `cout << "${value} "`, printed],
                        action: j === 4 ? '检查内层退出' : `继续 j = ${j + 1}`,
                    },
                ];
            }),
            {
                active: [1],
                vars: { i, j: 5, '本行': values.join(' ') },
                exit: `内层再次判断 5 <= 4 为假；第 ${i} 行结束。下一行开始时，j 会重新初始化为 1。`,
                action: `第 ${i} 行换行`,
            },
            {
                active: [4],
                vars: { i, j: '-', '本行': values.join(' ') },
                row: ['换行', `i = ${i}`, '-', 'cout << endl', i === 3 ? '全部行已完成' : '准备下一行'],
                action: i === 3 ? '检查外层退出' : `进入 i = ${i + 1}`,
            },
        ];

        return rowSteps;
    }),
    {
        active: [0],
        vars: { i: 4, j: '-', '本行': '已完成' },
        exit: '再次判断 4 <= 3 为假，外层循环结束。总共打印 3 行，每行 4 项。',
        action: '查看最终输出',
    },
    {
        active: [4],
        vars: { i: 4, j: '-', '本行': '已完成' },
        action: '显示最终结果',
        output: '输出顺序：1-1 1-2 1-3 1-4 / 2-1 2-2 2-3 2-4 / 3-1 3-2 3-3 3-4',
    },
];

// --- 互动组件 2：嵌套循环追踪器 ---
const NestedLoopStepper = () => {
    return (
        <CodeTracer
            title="嵌套循环追踪器：外层定一行，内层跑全套"
            code={nestedLoopCode}
            varOrder={['i', 'j', '本行']}
            columns={['阶段', 'i', 'j/判断', '动作', '本行输出']}
            steps={nestedLoopTraceSteps}
            hint="先不要背口诀，逐步看 j 为什么每一行都会重新从 1 开始。"
        />
    );
};

// --- 互动组件 3：计数器实战 ---
const CounterLogic = () => {
    return (
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-4">
            <h3 className="font-bold text-lg text-orange-700 mb-4 flex items-center gap-2">
                <Hash className="text-orange-600" /> 实战演练：累死人的计数
            </h3>
            <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2024年9月 GESP 一级真题</div>

            <div className="bg-white p-4 rounded-lg shadow-sm font-mono text-sm mb-4 border border-orange-100">
                <div><span className="text-purple-600">for</span> (int i = 1; i &lt; 5; i++)</div>
                <div className="pl-4"><span className="text-purple-600">for</span> (int j = 0; j &lt; i; j++)</div>
                <div className="pl-8 text-orange-600 font-bold">loopCount += 1;</div>
            </div>

            <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-4 text-sm">
                        <div className="w-16 font-bold text-gray-700">当 i = {i}:</div>
                        <div className="flex-1 bg-gray-200 h-6 rounded overflow-hidden flex">
                            {Array.from({ length: i }).map((_, idx) => (
                                <div key={idx} className="flex-1 bg-orange-400 border-r border-orange-300 last:border-r-0 flex items-center justify-center text-white text-xs">
                                    j={idx}
                                </div>
                            ))}
                        </div>
                        <div className="w-16 text-right font-mono text-orange-700">
                            +{i} 次
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-orange-200 flex justify-between items-center">
                <span className="font-bold text-gray-600">总次数 loopCount =</span>
                <span className="text-3xl font-bold text-orange-600">1 + 2 + 3 + 4 = 10</span>
            </div>
        </div>
    );
};

// --- 互动组件 4：金字塔生成器 ---
const PyramidGenerator = () => {
    const [rows, setRows] = useState(5);

    return (
        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 my-4">
            <h3 className="font-bold text-lg text-yellow-800 mb-4 flex items-center gap-2">
                <Star className="text-yellow-600" /> 实战演练：打印金字塔
            </h3>

            <div className="flex items-center gap-4 mb-6">
                <label className="font-bold text-gray-700">层数 (0-9):</label>
                <input
                    type="range" min="3" max="9"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    className="accent-yellow-500"
                />
                <span className="font-mono bg-white px-2 py-1 rounded border">{rows}</span>
            </div>

            <div className="bg-slate-900 text-yellow-400 p-6 rounded-xl font-mono text-center overflow-x-auto min-h-[200px] flex flex-col justify-center shadow-inner relative">
                <div className="absolute top-2 left-2 text-gray-500 text-xs text-left">
                    公式验证: j &lt; 2*i + 1<br />
                    (i从0开始)
                </div>
                {Array.from({ length: rows }).map((_, i) => {
                    const starCount = 2 * i + 1;
                    return (
                        <div key={i} className="leading-none whitespace-pre">
                            <span className="text-gray-700 select-none mr-2 text-xs font-sans opacity-50">i={i} ({starCount}星)</span>
                            {Array(starCount).fill("*").join("")}
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 bg-white p-3 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                <p className="font-bold mb-1">🔍 找规律：</p>
                <ul className="list-disc list-inside">
                    <li>第 0 层: 1 个星 = 2 * 0 + 1</li>
                    <li>第 1 层: 3 个星 = 2 * 1 + 1</li>
                    <li>第 2 层: 5 个星 = 2 * 2 + 1</li>
                    <li>第 i 层: <span className="bg-yellow-200 px-1 rounded font-bold">2 * i + 1</span> 个星</li>
                </ul>
            </div>
        </div>
    );
};

// --- 主应用 ---
function App() {
    const [activeSection, setActiveSection] = useState(1);

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="slide-enter text-center">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10 rounded-2xl shadow-xl mb-8 flex flex-col items-center border border-indigo-400/30">
                            <div className="relative mb-6">
                                <Clock size={80} className="text-yellow-300 drop-shadow-lg animate-[spin_10s_linear_infinite]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-900 font-bold text-xs">12:00</div>
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2 text-indigo-100 tracking-wider">GESP C++ 一级 第12课</h2>
                            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-md">多重循环</h1>
                            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
                                <span className="font-bold tracking-wide text-yellow-100">🕰️ 副标题：忙碌的时钟与排队操</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <ArrowRight className="text-indigo-600" /> 教学目标
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="bg-indigo-100 text-indigo-600 p-1 rounded"><Layers size={18} /></span>
                                    理解“圈套圈”的嵌套结构。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-purple-100 text-purple-600 p-1 rounded"><Play size={18} /></span>
                                    掌握多重循环的执行顺序（外层一步，内层跑全套）。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-yellow-100 text-yellow-600 p-1 rounded"><Star size={18} /></span>
                                    学会利用循环变量 (i, j) 打印简单的图形。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Clock className="text-indigo-500" size={32} /> 情景导入：忙碌的时钟
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500">
                                <h3 className="font-bold text-lg mb-3 text-indigo-800">观察时钟规律</h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="bg-indigo-100 text-indigo-700 font-bold px-2 rounded">大哥</span>
                                        <div>
                                            <strong>时针 (外层)：</strong><br />
                                            从 1 点走到 2 点，只走了 <span className="text-indigo-600 font-bold">1 大格</span>。
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-purple-100 text-purple-700 font-bold px-2 rounded">小弟</span>
                                        <div>
                                            <strong>分针 (内层)：</strong><br />
                                            为了配合大哥走这一步，必须辛苦地跑完 <span className="text-purple-600 font-bold">1 整圈 (60小格)</span>。
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">🔄</div>
                                    <p className="font-bold text-slate-700">外层动一下<br />内层跑全程</p>
                                </div>
                            </div>
                        </div>

                        <QueueDrill />
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Layers className="text-green-500" size={32} /> 代码结构：包心肉丸
                        </h2>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden">
                            {/* Outer Loop Visualization */}
                            <div className="absolute inset-0 bg-green-50 z-0 m-2 rounded-lg border-2 border-green-200"></div>

                            <div className="relative z-10 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                    <span className="font-bold text-green-700">外层循环 (肉丸皮)</span>
                                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">控制行数 i</span>
                                </div>

                                <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-sm ml-6 mb-4 shadow-lg">
                                    <div>for (int i = 1; i &lt;= 3; i++) &#123;</div>

                                    {/* Inner Loop */}
                                    <div className="my-2 bg-yellow-900/30 p-2 rounded border border-yellow-600/50">
                                        <div className="text-yellow-300 mb-1 flex justify-between">
                                            <span>// 内层循环 (肉丸馅)</span>
                                            <span className="text-xs opacity-70">控制列数 j</span>
                                        </div>
                                        <div className="pl-4">for (int j = 1; j &lt;= 4; j++) &#123;</div>
                                        <div className="pl-8 text-green-300">cout &lt;&lt; "报数" &lt;&lt; j &lt;&lt; " ";</div>
                                        <div className="pl-4">&#125;</div>
                                    </div>

                                    <div className="pl-4 text-purple-300">cout &lt;&lt; endl; <span className="text-gray-500">// 换行属于外层</span></div>
                                    <div>&#125;</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500 text-green-800 text-sm">
                            <strong>核心逻辑：</strong><br />
                            当外层 <code>i</code> 是 1 时，内层 <code>j</code> 跑完 1~4。<br />
                            当外层 <code>i</code> 变成 2 时，内层 <code>j</code> <span className="font-bold text-red-500 bg-white px-1 rounded">重置</span>，再从头跑 1~4。
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Play className="text-blue-500" size={32} /> 执行流程：慢动作回放
                        </h2>
                        <NestedLoopStepper />
                        <div className="text-center text-gray-500 text-sm mt-2">
                            总次数 = 外层次数 × 内层次数 = 3 × 4 = 12 次
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🧮 实战演练 1：累死人的计数</h2>
                        <CounterLogic />
                        <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500 shadow-sm mt-4">
                            <h4 className="font-bold text-purple-800 mb-2">解题思路 (画表格法)：</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>1. 确定外层范围：i 从 1 到 4 (因为 &lt; 5)。</li>
                                <li>2. 确定内层范围：j 从 0 到 i-1 (因为 &lt; i)。</li>
                                <li>3. 列出每次 i 对应的 j 的次数。</li>
                                <li>4. 累加总和。</li>
                            </ul>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">⛰️ 实战演练 2：打印金字塔</h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2024年6月 GESP 一级真题 第14题</div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 font-mono text-sm">
                            <div className="text-gray-500">// 打印 5 行星星</div>
                            <div>for (int i = 0; i &lt; 5; i++) &#123;</div>
                            <div className="pl-4 text-gray-400">// 打印空格 ... (省略)</div>
                            <div className="pl-4 text-gray-400">// 打印星星</div>
                            <div className="pl-4">for (int k = 0; k &lt; <span className="bg-yellow-200 border-b-2 border-black font-bold px-2">________</span>; k++)</div>
                            <div className="pl-8">cout &lt;&lt; "*";</div>
                            <div className="pl-4">cout &lt;&lt; endl;</div>
                            <div>&#125;</div>
                        </div>
                        <PyramidGenerator />
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Grid className="text-indigo-500" size={32} /> 做题技巧：图形题攻略
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                                <div className="text-3xl mb-2 font-bold text-blue-100">01</div>
                                <h3 className="font-bold text-gray-800 mb-2">标出行号 (i)</h3>
                                <p className="text-sm text-gray-600">
                                    先在草稿纸上把行号写出来，通常从 0 或 1 开始标记。
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
                                <div className="text-3xl mb-2 font-bold text-purple-100">02</div>
                                <h3 className="font-bold text-gray-800 mb-2">数星星 (j)</h3>
                                <p className="text-sm text-gray-600">
                                    数一数每一行有几个星星（或空格），写在行号旁边。
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
                                <div className="text-3xl mb-2 font-bold text-green-100">03</div>
                                <h3 className="font-bold text-gray-800 mb-2">找数学关系</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>恒定不变? &rarr; <code>j &lt; 5</code></li>
                                    <li>随行增加? &rarr; <code>j &lt;= i</code></li>
                                    <li>奇数增长? &rarr; <code>j &lt; 2*i + 1</code></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-red-500" size={32} /> 避坑指南
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 flex gap-4">
                                <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center text-red-600 font-bold shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-red-800">变量名冲突</h4>
                                    <p className="text-sm text-red-700 mt-1">外层用了 <code>i</code>，内层就不能再定义 <code>i</code>。通常搭配是 <code>i, j, k</code>。</p>
                                </div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500 flex gap-4">
                                <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-orange-800">花括号迷路</h4>
                                    <p className="text-sm text-orange-700 mt-1">多重循环的大括号层级要看清。<code>cout &lt;&lt; endl;</code> 通常属于外层循环，不要写到内层里去了（否则每打一个星就换行）。</p>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 flex gap-4">
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-blue-800">初始值重置</h4>
                                    <p className="text-sm text-blue-700 mt-1">内层循环每次开始时，变量都会重新初始化（如 <code>int j=0</code>）。它不是接着上次的跑，而是从头跑。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <BookOpen size={100} />
                                </div>
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                                    <CheckCircle2 size={20} /> 记忆口诀
                                </h3>
                                <ul className="space-y-4 text-gray-700 font-medium">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                        双重循环看仔细，
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                        外层控制行更替。
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                        内层控制列数据，
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                        变量命名要异议。
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <Terminal size={24} /> 课后作业：九九乘法表
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                        <p className="font-bold text-sm mb-1">1. 编程挑战</p>
                                        <p className="text-xs opacity-90">
                                            使用双层 for 循环输出“九九乘法表”。<br />
                                            格式：<code>1*1=1</code> ...
                                        </p>
                                        <p className="text-xs opacity-70 mt-1 font-mono">提示：内层条件是 j &lt;= i。</p>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                        <p className="font-bold text-sm mb-1">2. 思考题</p>
                                        <p className="text-xs opacity-90">
                                            如果要把乘法表倒过来打印（9*9在第一行），该怎么改代码？
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button onClick={() => setActiveSection(1)} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-bold shadow-sm flex items-center gap-2 mx-auto">
                                <RotateCcw size={18} /> 重新开始学习
                            </button>
                        </div>
                    </div>
                );
            case 10:
                return (
                    <div className="slide-enter py-6">
                        <MasteryCheck
                            title="C++ L1-12 嵌套循环离开前检查"
                            description="如果能分清内外层、手推 j 重置、计算执行次数、拆图形题，就可以进入数组前的循环综合。"
                            items={lesson12MasteryItems}
                        />
                    </div>
                );
            default:
                return <div>Content Not Found</div>;
        }
    };

    return (
        <LegacyCppLessonShell
            lessonNumber={12}
            lessonTitle="多层循环"
            accent="bluePurple"
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            nextLessonPath="/lesson/1/13"
            renderIcon={(name, size) => <Icon name={name} size={size} />}
            topSupport={<CppL1LessonSupport lessonId={12} />}
            bottomSupport={<CppL1LessonSupport lessonId={12} placement="bottom" />}
        >
            {renderContent()}
        </LegacyCppLessonShell>
    );
}

export default App;
