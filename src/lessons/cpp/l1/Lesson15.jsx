import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Filter,
    Calculator,
    ShoppingBasket,
    CheckCircle2,
    XCircle,
    ArrowRight,
    HelpCircle,
    Play,
    RotateCcw,
    Terminal,
    BookOpen,
    Glasses,
    Footprints,
    Trash2,
    ListFilter,

    Binary,
    Radar,
    AlertTriangle,
    Search,
    Menu,
    X
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import { MasteryCheck } from '../CppLessonShell';
import CodeSnippet from '../CodeSnippet';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const icons = {
        "filter": <Filter size={size} color={color} className={className} />,
        "calc": <Calculator size={size} color={color} className={className} />,
        "basket": <ShoppingBasket size={size} color={color} className={className} />,
        "check": <CheckCircle2 size={size} color={color} className={className} />,
        "x": <XCircle size={size} color={color} className={className} />,
        "arrow": <ArrowRight size={size} color={color} className={className} />,
        "help": <HelpCircle size={size} color={color} className={className} />,
        "play": <Play size={size} color={color} className={className} />,
        "reset": <RotateCcw size={size} color={color} className={className} />,
        "terminal": <Terminal size={size} color={color} className={className} />,
        "book": <BookOpen size={size} color={color} className={className} />,
        "glasses": <Glasses size={size} color={color} className={className} />,
        "shoes": <Footprints size={size} color={color} className={className} />,
        "trash": <Trash2 size={size} color={color} className={className} />,
        "list": <ListFilter size={size} color={color} className={className} />,

        "binary": <Binary size={size} color={color} className={className} />,
        "radar": <Radar size={size} color={color} className={className} />,
        "alert": <AlertTriangle size={size} color={color} className={className} />,
        "search": <Search size={size} color={color} className={className} />
    };
    return icons[name] || null;
};

const lesson15MasteryItems = [
    {
        label: '能先初始化计数器。',
        evidence: '知道 cnt、sum、ans 这类统计变量进入循环前通常要设为 0。',
        retryHint: '回到“计数器的秘密”，先清空篮子再开始装。',
    },
    {
        label: '能写出“遍历每个候选”的循环。',
        evidence: '能根据题目范围写出 for (int i = 1; i <= n; i++) 这类扫描结构。',
        retryHint: '回到“代码流水线”，先确定从谁扫到谁。',
    },
    {
        label: '能把筛选条件放进 if。',
        evidence: '能用 i % 2 == 0、N % i == 0 等条件判断是否计数。',
        retryHint: '回到“因数扫描仪”，把符合条件的 i 圈出来。',
    },
    {
        label: '能手推计数变量最终值。',
        evidence: '能逐轮记录 i、条件真假、cnt 是否加一，并得到最终答案。',
        retryHint: '回到两道真题，把每轮写成表格。',
    },
];

// --- 章节数据 ---
const sections = [
    { id: 1, title: "课程导入：体育老师的点名册", icon: "list", category: "计数与筛选" },
    { id: 2, title: "核心概念：计数器的秘密", icon: "basket", category: "计数与筛选" },
    { id: 3, title: "逻辑结构：代码流水线", icon: "filter", category: "计数与筛选" },
    { id: 4, title: "模拟实验室：因数扫描仪", icon: "radar", category: "计数与筛选" },
    { id: 5, title: "避坑指南：统计误区", icon: "alert", category: "实战与总结" },
    { id: 6, title: "真题实战 1：奇偶大比拼", icon: "binary", category: "实战与总结" },
    { id: 7, title: "真题实战 2：小杨报数", icon: "terminal", category: "实战与总结" },
    { id: 8, title: "代码实验室", icon: "calc", category: "实战与总结" },
    { id: 9, title: "总结与作业", icon: "check", category: "实战与总结" },
    { id: 10, title: "离开前检查", icon: "check", category: "实战与总结" }
];

// --- 互动组件 1：体育课点名模拟器 ---
const ClassroomSimulator = () => {
    // 模拟学生数据：id, hasGlasses, hasWhiteShoes
    const students = [
        { id: 1, hasGlasses: true, hasWhiteShoes: false, emoji: "🤓" },
        { id: 2, hasGlasses: false, hasWhiteShoes: true, emoji: "👟" },
        { id: 3, hasGlasses: false, hasWhiteShoes: false, emoji: "👦" },
        { id: 4, hasGlasses: true, hasWhiteShoes: true, emoji: "🤓👟" },
        { id: 5, hasGlasses: false, hasWhiteShoes: true, emoji: "👟" },
    ];

    const [mode, setMode] = useState("none"); // none, filter, count
    const [highlightIds, setHighlightIds] = useState([]);
    const [countResult, setCountResult] = useState(0);

    const handleFilterGlasses = () => {
        setMode("filter");
        const ids = students.filter(s => s.hasGlasses).map(s => s.id);
        setHighlightIds(ids);
        setCountResult(ids.length);
    };

    const handleCountShoes = () => {
        setMode("count");
        const ids = students.filter(s => s.hasWhiteShoes).map(s => s.id);
        setHighlightIds(ids);
        setCountResult(ids.length);
    };

    return (
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4 shadow-sm">
            <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
                <ListFilter className="text-blue-600" /> 体育课场景模拟
            </h3>

            <div className="flex justify-center gap-4 mb-6">
                {students.map(s => (
                    <div
                        key={s.id}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-4 transition-all duration-500
              ${highlightIds.includes(s.id)
                                ? (mode === 'filter' ? 'border-purple-500 bg-purple-100 scale-110 shadow-lg' : 'border-green-500 bg-green-100 scale-110 shadow-lg')
                                : 'border-gray-200 bg-white opacity-70'}
            `}
                    >
                        {s.emoji}
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleFilterGlasses}
                    className="flex-1 py-3 bg-purple-100 text-purple-800 rounded-lg font-bold hover:bg-purple-200 border border-purple-300 flex items-center justify-center gap-2 transition"
                >
                    <Glasses size={20} /> 筛选：戴眼镜出列！
                </button>
                <button
                    onClick={handleCountShoes}
                    className="flex-1 py-3 bg-green-100 text-green-800 rounded-lg font-bold hover:bg-green-200 border border-green-300 flex items-center justify-center gap-2 transition"
                >
                    <Footprints size={20} /> 统计：穿白鞋有几个？
                </button>
            </div>

            {mode !== "none" && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 text-center animate-pulse">
                    <span className="text-gray-500 font-mono text-sm">{mode === 'filter' ? '筛选结果 (Filter)' : '计数器 (Count)'}: </span>
                    <span className="text-2xl font-bold text-blue-600">{countResult}</span>
                    <span className="text-sm text-gray-500"> 人</span>
                </div>
            )}
        </div>
    );
};

// --- 互动组件 2：计数器初始化演示 ---
const CounterDemo = () => {
    const [count, setCount] = useState(null); // null represents "garbage value"
    const [isInitialized, setIsInitialized] = useState(false);

    const initialize = () => {
        setCount(0);
        setIsInitialized(true);
    };

    const increment = () => {
        if (isInitialized) {
            setCount(prev => prev + 1);
        } else {
            // Simulate garbage value behavior visually
            setCount(Math.floor(Math.random() * 9000) + 1000);
        }
    };

    const reset = () => {
        setCount(null);
        setIsInitialized(false);
    };

    return (
        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 my-4">
            <h3 className="font-bold text-lg text-yellow-800 mb-4 flex items-center gap-2">
                <ShoppingBasket className="text-yellow-600" /> 计数器的秘密：空篮子原理
            </h3>

            <div className="flex flex-col items-center gap-4">
                <div className={`relative w-32 h-32 border-4 rounded-full flex items-center justify-center bg-white shadow-inner transition-colors duration-300
          ${isInitialized ? 'border-green-500' : 'border-red-400 border-dashed'}
        `}>
                    {count === null ? (
                        <div className="text-red-300 text-6xl font-bold">?</div>
                    ) : (
                        <div className={`text-5xl font-mono font-bold ${isInitialized ? 'text-green-600' : 'text-red-500'}`}>
                            {count}
                        </div>
                    )}

                    <div className="absolute -bottom-8 text-sm font-bold text-gray-500">
                        变量 cnt
                    </div>
                </div>

                <div className="bg-white p-3 rounded text-sm text-gray-600 w-full text-center">
                    {isInitialized
                        ? "✅ 已清空篮子 (int cnt = 0;)，可以开始计数了！"
                        : "⚠️ 篮子未清空 (int cnt;)，里面可能有垃圾值！"}
                </div>

                <div className="flex gap-3 w-full">
                    <button
                        onClick={initialize}
                        className="flex-1 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 shadow-sm"
                    >
                        1. 初始化 = 0
                    </button>
                    <button
                        onClick={increment}
                        className="flex-1 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 shadow-sm"
                    >
                        2. 放入一个 (+1)
                    </button>
                    <button
                        onClick={reset}
                        className="px-3 py-2 bg-gray-200 text-gray-600 rounded font-bold hover:bg-gray-300"
                    >
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 3：奇偶分拣机 ---
const OddEvenSorter = () => {
    const [numbers, setNumbers] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [oddCount, setOddCount] = useState(0);
    const [evenCount, setEvenCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && currentIdx < numbers.length) {
            interval = setInterval(() => {
                const num = numbers[currentIdx];
                if (num % 2 !== 0) {
                    setOddCount(c => c + 1);
                } else {
                    setEvenCount(c => c + 1);
                }

                if (currentIdx < numbers.length - 1) {
                    setCurrentIdx(c => c + 1);
                } else {
                    setIsRunning(false);
                }
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentIdx, numbers]);

    const startSort = () => {
        const nums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 1);
        setNumbers(nums);
        setOddCount(0);
        setEvenCount(0);
        setCurrentIdx(0);
        setIsRunning(true);
    };

    return (
        <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 my-4">
            <h3 className="font-bold text-lg text-indigo-700 mb-4 flex items-center gap-2">
                <Binary className="text-indigo-600" /> 真题实战：奇偶统计
            </h3>
            <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2024年12月 GESP 一级 编程题第2题</div>

            <div className="flex justify-center gap-2 mb-6 h-12 items-center">
                {numbers.length === 0 ? (
                    <span className="text-gray-400 text-sm">点击开始生成数据...</span>
                ) : (
                    numbers.map((num, idx) => (
                        <div
                            key={idx}
                            className={`w-10 h-10 flex items-center justify-center rounded font-bold border-2 transition-all duration-300
                ${idx === currentIdx && isRunning ? 'scale-125 bg-yellow-100 border-yellow-500 z-10' : 'bg-white border-indigo-100 text-gray-600'}
                ${idx < currentIdx || (idx === currentIdx && !isRunning) ? (num % 2 !== 0 ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-blue-100 border-blue-300 text-blue-700') : ''}
              `}
                        >
                            {num}
                        </div>
                    ))
                )}
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border-l-4 border-purple-500 shadow-sm relative overflow-hidden">
                    <div className="text-purple-800 font-bold mb-1">奇数篮子 (a)</div>
                    <div className="text-purple-600 text-xs mb-2">if (x % 2 != 0)</div>
                    <div className="text-4xl font-mono font-bold text-purple-600 text-right">{oddCount}</div>
                    <div className="absolute -right-4 -bottom-4 text-purple-100 text-6xl font-black select-none">ODD</div>
                </div>

                <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm relative overflow-hidden">
                    <div className="text-blue-800 font-bold mb-1">偶数篮子 (b)</div>
                    <div className="text-blue-600 text-xs mb-2">else</div>
                    <div className="text-4xl font-mono font-bold text-blue-600 text-right">{evenCount}</div>
                    <div className="absolute -right-4 -bottom-4 text-blue-100 text-6xl font-black select-none">EVEN</div>
                </div>
            </div>

            <button
                onClick={startSort}
                disabled={isRunning}
                className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
                {isRunning ? "正在分拣..." : "🚀 生成数据并统计"}
            </button>
        </div>
    );
};

// --- 互动组件 4：倍数跳过演示 ---
const NumberSkipper = () => {
    const [m, setM] = useState(3);
    const [n, setN] = useState(10);
    const [output, setOutput] = useState([]);

    useEffect(() => {
        const res = [];
        for (let i = 1; i <= n; i++) {
            if (i % m === 0) {
                res.push({ val: i, action: 'skip' });
            } else {
                res.push({ val: i, action: 'print' });
            }
        }
        setOutput(res);
    }, [m, n]);

    return (
        <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 my-4">
            <h3 className="font-bold text-lg text-red-700 mb-4 flex items-center gap-2">
                <XCircle className="text-red-600" /> 真题实战：小杨报数 (跳过倍数)
            </h3>
            <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2023年12月 GESP 一级 编程题第2题</div>

            <div className="flex gap-6 mb-6">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-600 mb-1">总数 N:</label>
                    <input
                        type="number" value={n} onChange={(e) => setN(Math.min(20, Math.max(5, parseInt(e.target.value))))}
                        className="border-2 border-red-200 rounded px-2 py-1 w-16 text-center font-bold"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-600 mb-1">倍数 M:</label>
                    <input
                        type="number" value={m} onChange={(e) => setM(Math.max(2, parseInt(e.target.value)))}
                        className="border-2 border-red-200 rounded px-2 py-1 w-16 text-center font-bold text-red-600"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {output.map((item, idx) => (
                    <div key={idx} className="relative group">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold border-2 transition-all
                ${item.action === 'skip'
                                    ? 'bg-red-100 border-red-400 text-red-400 opacity-50 decoration-red-600'
                                    : 'bg-white border-green-400 text-green-700 shadow-sm'}
              `}
                        >
                            {item.action === 'skip' ? <span className="line-through">{item.val}</span> : item.val}
                        </div>
                        {item.action === 'skip' && (
                            <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                ✕
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 bg-gray-800 text-gray-300 p-3 rounded font-mono text-sm">
                <span className="text-purple-400">if</span> (i % {m} == 0) <span className="text-yellow-400">continue</span>; <span className="text-gray-500">// 跳过倍数</span><br />
                cout &lt;&lt; i &lt;&lt; " ";
            </div>
        </div>
    );
};

// --- 互动组件 5：因数扫描仪 (FactorFinder) ---
const FactorFinder = () => {
    const [n, setN] = useState(6);
    const [currentI, setCurrentI] = useState(0);
    const [factors, setFactors] = useState([]);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        let timer;
        if (scanning && currentI <= n) {
            timer = setTimeout(() => {
                if (currentI > 0 && n % currentI === 0) {
                    setFactors(prev => [...prev, currentI]);
                }

                if (currentI < n) {
                    setCurrentI(c => c + 1);
                } else {
                    setScanning(false);
                }
            }, 800);
        }
        return () => clearTimeout(timer);
    }, [scanning, currentI, n]);

    const startScan = () => {
        setFactors([]);
        setCurrentI(1);
        setScanning(true);
    };

    return (
        <div className="bg-teal-50 p-6 rounded-xl border-2 border-teal-200 my-6 shadow-sm">
            <h3 className="font-bold text-lg text-teal-800 mb-4 flex items-center gap-2">
                <Radar className="text-teal-600" /> 模拟实验室：因数扫描仪
            </h3>

            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <label className="font-bold text-teal-700">输入数字 N:</label>
                    <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                        disabled={scanning}
                        className="w-20 text-center font-bold text-xl border-2 border-teal-300 rounded p-1 focus:outline-none focus:border-teal-500"
                    />
                    <button
                        onClick={startScan}
                        disabled={scanning}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50 transition flex items-center gap-2"
                    >
                        {scanning ? "正在扫描..." : <><Search size={18} /> 开始扫描</>}
                    </button>
                </div>

                {/* 扫描可视化区域 */}
                <div className="bg-white p-4 rounded-xl border border-teal-100 w-full">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {Array.from({ length: n }, (_, i) => i + 1).map(num => {
                            const isCurrent = num === currentI && scanning;
                            const isFactor = factors.includes(num);

                            return (
                                <div
                                    key={num}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300
                                        ${isCurrent ? 'bg-yellow-300 scale-125 border-2 border-yellow-500 z-10' : ''}
                                        ${isFactor ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-400'}
                                        ${!isCurrent && !isFactor ? 'opacity-60' : ''}
                                    `}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 代码解释区域 */}
                <div className="bg-slate-800 text-white p-4 rounded-lg font-mono text-sm w-full max-w-md">
                    <div className="text-gray-400 mb-2">// 扫描过程</div>
                    <div><span className="text-purple-400">for</span> (int i=1; i&lt;={n}; i++) &#123;</div>
                    <div className="pl-4">
                        <span className="text-gray-500">// i 现在是 {currentI === 0 ? '...' : currentI}</span>
                    </div>
                    <div className="pl-4">
                        <span className="text-purple-400">if</span> ({n} % i == 0) &#123;
                        {currentI > 0 && n % currentI === 0 && <span className="text-green-400 font-bold ml-2">✔ 是因数!</span>}
                        {currentI > 0 && n % currentI !== 0 && <span className="text-red-400 font-bold ml-2">✘ 不是</span>}
                    </div>
                    <div className="pl-8">cnt++;</div>
                    <div className="pl-4">&#125;</div>
                    <div>&#125;</div>
                    <div className="mt-2 text-yellow-400 font-bold border-t border-gray-600 pt-2">
                        找到因数个数 (cnt): {factors.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 6：避坑指南 (PitfallGuide) ---
const PitfallGuide = () => {
    const [activeTab, setActiveTab] = useState(0);

    const pitfalls = [
        {
            title: "1. 忘记初始化",
            bad: "int cnt;\nfor(...) {\n  if(...) cnt++;\n}",
            good: "int cnt = 0; // 必须清零！\nfor(...) {\n  if(...) cnt++;\n}",
            desc: "计数器就像个空篮子。如果一开始不把篮子倒空（赋值为0），里面原来的垃圾值会让结果完全错误！"
        },
        {
            title: "2. 判断符号写错",
            bad: "if (i % 2 = 1) { // 这是赋值！\n  ...\n}",
            good: "if (i % 2 == 1) { // 这是判断\n  ...\n}",
            desc: "最经典的错误：把 '==' (相等判断) 写成 '=' (赋值)。在 C++ 里，if(x=1) 永远是真的！"
        },
        {
            title: "3. 范围与除0",
            bad: "for (int i=0; i<=n; i++) {\n  if (n % i == 0) ... // 0不能做除数！\n}",
            good: "for (int i=1; i<=n; i++) { // 从1开始\n  if (n % i == 0) ...\n}",
            desc: "找因数或者取模时，千万注意除数（分母）不能是 0。循环通常要从 1 开始，而不是 0。"
        }
    ];

    const current = pitfalls[activeTab];

    return (
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-6">
            <h3 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-600" /> 避坑指南：统计误区
            </h3>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {pitfalls.map((p, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap transition ${activeTab === i ? 'bg-orange-500 text-white' : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
                            }`}
                    >
                        {p.title}
                    </button>
                ))}
            </div>

            <div className="bg-white p-5 rounded-lg border border-orange-100 shadow-sm transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 p-3 rounded border border-red-100">
                        <div className="text-red-600 font-bold text-xs mb-1">❌ 错误写法</div>
                        <CodeSnippet code={current.bad} />
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-100">
                        <div className="text-green-600 font-bold text-xs mb-1">✅ 正确写法</div>
                        <CodeSnippet code={current.good} />
                    </div>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 bg-orange-50 p-3 rounded">
                    <div className="mt-1 min-w-[16px]"><BookOpen size={16} className="text-orange-500" /></div>
                    <p>{current.desc}</p>
                </div>
            </div>
        </div>
    );
};

// --- 主应用 ---
export default function App() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const nextSection = () => {
        if (activeSection < sections.length) {
            setActiveSection(activeSection + 1);
        } else {
            navigate('/lesson/1/16');
        }
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="slide-enter text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-2xl shadow-xl mb-8">
                            <div className="flex justify-center gap-4 mb-6">
                                <ListFilter size={60} className="text-yellow-300 animate-pulse" />
                                <Calculator size={60} className="text-green-300 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2 text-blue-100">GESP C++ 一级 第15课</h2>
                            <h1 className="text-5xl font-bold mb-6 drop-shadow-md">筛选与统计</h1>
                            <div className="inline-block bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/30">
                                <span className="font-bold tracking-wide text-lg">🔍 副标题：挑西瓜与数豆子</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <ArrowRight className="text-blue-600" /> 教学目标
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-600 p-2 rounded"><ShoppingBasket size={18} /></span>
                                    掌握计数器的初始化与使用（空篮子原理）。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-indigo-100 text-indigo-600 p-2 rounded"><Filter size={18} /></span>
                                    学会结合 <code>for</code> 循环与 <code>if</code> 判断进行筛选。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-purple-100 text-purple-600 p-2 rounded"><Terminal size={18} /></span>
                                    解决 GESP 真题中的统计类编程题。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <ShoppingBasket className="text-yellow-600" size={32} /> 核心概念：计数器的秘密
                        </h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <p className="text-lg text-gray-600 mb-4">
                                要数清楚有多少个豆子，最重要的一步是什么？
                                <br />
                                <strong className="text-red-600">先把篮子倒空！</strong> 如果篮子里原来就有垃圾，数出来的数就不对啦。
                            </p>
                            <CounterDemo />
                        </div>

                        <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-sm">
                            <div className="text-gray-500 mb-2">// 标准代码模版</div>
                            <div><span className="text-purple-400">int</span> cnt = 0; <span className="text-green-400">// 1. 准备空篮子</span></div>
                            <div><span className="text-purple-400">if</span> ( 条件 ) &#123;</div>
                            <div className="pl-4">cnt = cnt + 1; <span className="text-green-400">// 2. 扔进去一个</span></div>
                            <div>&#125;</div>
                            <div>cout &lt;&lt; cnt; <span className="text-green-400">// 3. 汇报结果</span></div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <ListFilter className="text-blue-600" size={32} /> 逻辑结构：代码流水线
                        </h2>
                        <ClassroomSimulator />
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                                <div className="text-2xl mb-2">🔄</div>
                                <div className="font-bold text-gray-700">for 循环</div>
                                <div className="text-sm text-gray-500">挨个拿起来看</div>
                            </div>
                            <div className="text-gray-300 flex items-center justify-center"><ArrowRight /></div>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                                <div className="text-2xl mb-2">🔍</div>
                                <div className="font-bold text-gray-700">if 判断</div>
                                <div className="text-sm text-gray-500">符合条件吗？</div>
                            </div>
                            <div className="text-gray-300 flex items-center justify-center"><ArrowRight /></div>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                                <div className="text-2xl mb-2">🧺</div>
                                <div className="font-bold text-gray-700">cnt++</div>
                                <div className="text-sm text-gray-500">扔进篮子</div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Radar className="text-teal-600" size={32} /> 模拟实验室：因数扫描仪
                        </h2>
                        <FactorFinder />
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mt-4 text-sm">
                            <strong>🤔 原理分析：</strong>
                            <p>找因数就像“过安检”。我们让 1 到 N 所有的数字依次排队，如果是 N 的因数（能整除），安检灯就亮绿灯（计数器+1），否则直接通过。</p>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-orange-600" size={32} /> 避坑指南：统计误区
                        </h2>
                        <PitfallGuide />
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Binary className="text-indigo-600" size={32} /> 真题实战 1：奇偶大比拼
                        </h2>
                        <OddEvenSorter />
                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-6">
                            <h4 className="font-bold text-indigo-800 mb-2">💡 解题思路</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                1. 准备两个篮子：<code>int a = 0;</code> (奇数) 和 <code>int b = 0;</code> (偶数)。<br />
                                2. 怎么分奇偶？看余数：<code>x % 2</code>。<br />
                                3. 如果余数是 1 (或不等于0) &rarr; 奇数篮子 +1。<br />
                                4. 否则 (else) &rarr; 偶数篮子 +1。
                            </p>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Terminal className="text-red-600" size={32} /> 真题实战 2：小杨报数
                        </h2>
                        <NumberSkipper />
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
                            <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">写法对比：正向筛选 vs 反向剔除</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-green-800 font-bold text-sm mb-2">写法 A：只放行好人</div>
                                    <code className="text-xs text-green-700">
                                        if (i % m != 0) &#123;<br />
                                        &nbsp;&nbsp;cout &lt;&lt; i &lt;&lt; " ";<br />
                                        &#125;
                                    </code>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <div className="text-red-800 font-bold text-sm mb-2">写法 B：坏人踢出去 (continue)</div>
                                    <code className="text-xs text-red-700">
                                        if (i % m == 0) &#123;<br />
                                        &nbsp;&nbsp;continue; <span className="opacity-50">// 闭嘴</span><br />
                                        &#125;<br />
                                        cout &lt;&lt; i &lt;&lt; " ";
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Calculator className="text-teal-600" size={32} /> 代码实验室
                        </h2>
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-teal-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                                    <Terminal size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Hands-on Practice</h3>
                                    <p className="text-gray-500">请打开 Dev-C++ 完成以下任务：</p>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer group">
                                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">1</span>
                                    <span className="font-medium text-gray-700 group-hover:text-teal-700">练习 1：上机完成“奇偶统计”代码。</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer group">
                                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                                    <span className="font-medium text-gray-700 group-hover:text-teal-700">练习 2：上机完成“小杨报数”代码。</span>
                                </li>
                            </ul>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <h4 className="font-bold text-red-500 mb-2 flex items-center gap-2"><XCircle size={16} /> 注意细节：</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    <li>变量要先定义后使用 (<code>int n;</code>)。</li>
                                    <li>计数器别忘了归零 (<code>int cnt = 0;</code>)。</li>
                                    <li>输出格式要注意空格和换行。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                                    <CheckCircle2 size={20} /> 今日口诀
                                </h3>
                                <div className="bg-indigo-50 p-4 rounded-lg text-indigo-900 font-medium leading-loose italic">
                                    “统计要想做对，<br />
                                    篮子先要清退（初始化0）。<br />
                                    循环挨个排队，<br />
                                    符合条件入柜（++）。”
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <BookOpen size={24} /> 课后挑战
                                </h3>
                                <div className="space-y-2">
                                    <p className="font-bold text-lg">题目：统计因数个数</p>
                                    <p className="text-teal-100 text-sm">
                                        描述：输入一个数 N，统计它一共有多少个因数？<br />
                                        （例如 6 有 1, 2, 3, 6 共 4 个）
                                    </p>
                                    <div className="bg-white/20 p-2 rounded text-xs mt-2 border border-white/30">
                                        提示：循环从 1 到 N，判断 <code>N % i == 0</code>。
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
                            title="C++ L1-15 计数与筛选离开前检查"
                            description="如果能初始化计数器、遍历候选、筛选条件、手推 cnt 变化，就可以进入一级总复习。"
                            items={lesson15MasteryItems}
                        />
                    </div>
                );
            default:
                return <div>Content Not Found</div>;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-gray-900">
            <style>{`
        .slide-enter { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

            {/* 侧边栏 */}
            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-40 transition-transform duration-300
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-blue-50/50 to-white/50 backdrop-blur-sm">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-slate-800 leading-tight">C++ 趣味课堂</h1>
                            <p className="text-xs text-blue-500 font-medium">第 15 课：综合训练 (一)</p>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto w-full py-4 custom-scrollbar">
                    {sections.map((section, index) => {
                        const showCategory = index === 0 || sections[index - 1].category !== section.category;
                        return (
                            <React.Fragment key={section.id}>
                                {showCategory && (
                                    <div className="px-6 pb-2 pt-4 first:pt-0">
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.category}</h3>
                                    </div>
                                )}
                                <div className="px-3">
                                    <button
                                        onClick={() => {
                                            setActiveSection(section.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 group relative mb-1
                                        ${activeSection === section.id
                                                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <div className={`
                                        p-1.5 rounded-md transition-colors flex-shrink-0
                                        ${activeSection === section.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-500'}
                                        `}>
                                            <Icon name={section.icon} size={18} />
                                        </div>
                                        <span className="truncate text-sm">{section.title}</span>
                                    </button>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative pt-16 md:pt-0">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

                {/* Mobile Menu Button - Fixed Top */}
                <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
                    <h1 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
                        <span>一级趣味课堂</span>
                    </h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h2 className="text-lg font-bold text-gray-800 truncate flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">Section {activeSection}</span>
                        {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    <div className="flex gap-2 text-sm text-gray-500">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                style={{ width: `${(activeSection / sections.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 z-0">
                    <div className="max-w-4xl mx-auto pb-12">
                        {activeSection === 1 && <CppL1LessonSupport lessonId={15} />}
                        {renderContent()}
                        {activeSection === sections.length && <CppL1LessonSupport lessonId={15} placement="bottom" />}
                    </div>
                </main>

                <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 z-20">
                    <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
              ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                    >
                        <ArrowRight className="rotate-180" size={18} /> 上一步
                    </button>

                    <button
                        onClick={nextSection}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm
              ${activeSection === sections.length ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'}`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一步'} <ArrowRight size={18} color="white" />
                    </button>
                </footer>
            </div>
        </div>
    );
}
