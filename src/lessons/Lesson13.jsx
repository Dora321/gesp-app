import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Calculator,
    Calendar,
    Search,
    CheckCircle2,
    XCircle,
    ArrowRight,
    HelpCircle,
    Play,
    RotateCcw,
    Divide,
    Percent,
    Crown,
    Clock,
    Lightbulb,
    Terminal,
    BookOpen,
    Zap,
    Gamepad2,
    AlertTriangle,
    Hash,
    Menu,
    X
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const icons = {
        "calc": <Calculator size={size} color={color} className={className} />,
        "calendar": <Calendar size={size} color={color} className={className} />,
        "search": <Search size={size} color={color} className={className} />,
        "check": <CheckCircle2 size={size} color={color} className={className} />,
        "x": <XCircle size={size} color={color} className={className} />,
        "arrow": <ArrowRight size={size} color={color} className={className} />,
        "help": <HelpCircle size={size} color={color} className={className} />,
        "play": <Play size={size} color={color} className={className} />,
        "reset": <RotateCcw size={size} color={color} className={className} />,
        "divide": <Divide size={size} color={color} className={className} />,
        "percent": <Percent size={size} color={color} className={className} />,
        "crown": <Crown size={size} color={color} className={className} />,
        "clock": <Clock size={size} color={color} className={className} />,
        "bulb": <Lightbulb size={size} color={color} className={className} />,
        "terminal": <Terminal size={size} color={color} className={className} />,
        "book": <BookOpen size={size} color={color} className={className} />,
        "stop": <RotateCcw size={size} color={color} className={className} />,
        "zap": <Zap size={size} color={color} className={className} />,
        "game": <Gamepad2 size={size} color={color} className={className} />,
        "alert": <AlertTriangle size={size} color={color} className={className} />,
        "hash": <Hash size={size} color={color} className={className} />
    };
    return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
    { id: 1, title: "课程导入：体育老师的哨子", icon: "clock" },
    { id: 2, title: "法宝一：倍数显形镜 (%)", icon: "search" },
    { id: 3, title: "法宝二：时间魔法书 (闰年)", icon: "calendar" },
    { id: 4, title: "逻辑竞技场：&& vs ||", icon: "zap" },
    { id: 5, title: "避坑指南：数学计算雷区", icon: "alert" },
    { id: 6, title: "真题实战 1：日历机器人", icon: "terminal" },
    { id: 7, title: "真题实战 2：寻找美丽数字", icon: "crown" },
    { id: 8, title: "挑战：逢七过大闯关", icon: "game" },
    { id: 9, title: "总结与作业", icon: "check" }
];

// --- 互动组件 1：排队分组模拟器 ---
const GroupDivider = () => {
    const [total, setTotal] = useState(30);
    const [groupSize, setGroupSize] = useState(7);

    const groups = Math.floor(total / groupSize);
    const remainder = total % groupSize;

    return (
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4 shadow-sm">
            <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
                <Divide className="text-blue-500" /> 体育课：报数分队
            </h3>

            <div className="flex gap-6 mb-6 items-center">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-600">全班人数:</label>
                    <input
                        type="number" value={total} onChange={(e) => setTotal(parseInt(e.target.value) || 0)}
                        className="border-2 border-blue-300 rounded px-2 py-1 w-20 text-center font-bold"
                    />
                </div>
                <div className="text-2xl text-gray-400">÷</div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-600">每组人数:</label>
                    <input
                        type="number" value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                        className="border-2 border-blue-300 rounded px-2 py-1 w-20 text-center font-bold"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 min-h-[60px]">
                {Array.from({ length: total }).map((_, i) => {
                    const groupIndex = Math.floor(i / groupSize);
                    const isRemainder = i >= groups * groupSize;
                    const colors = ["bg-red-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400", "bg-indigo-400"];

                    return (
                        <div
                            key={i}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold transition-all
                ${isRemainder ? "bg-gray-400 animate-pulse" : colors[groupIndex % colors.length]}
              `}
                        >
                            {i + 1}
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase">除法 / (能分几组)</div>
                    <div className="text-2xl font-bold text-blue-600">{groups} 组</div>
                    <code className="text-xs bg-gray-100 p-1 rounded mt-1 block">int n = {total} / {groupSize};</code>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4 border-gray-500 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase">取模 % (剩下几人)</div>
                    <div className="text-2xl font-bold text-gray-600">{remainder} 人</div>
                    <code className="text-xs bg-gray-100 p-1 rounded mt-1 block">int r = {total} % {groupSize};</code>
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 2：挑食的国王 (倍数判断) ---
const KingsCandy = () => {
    const [candy, setCandy] = useState(15);

    const isMultipleOf5 = candy % 5 === 0;
    const isMultipleOf10 = candy % 10 === 0;
    const willEat = isMultipleOf5 && !isMultipleOf10;

    return (
        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 my-4">
            <h3 className="font-bold text-lg text-yellow-800 mb-4 flex items-center gap-2">
                <Crown className="text-yellow-600" /> 挑食的国王
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                规则：只吃“是 5 的倍数”但“不是 10 的倍数”的糖果。
            </p>

            <div className="flex items-center gap-4 mb-6">
                <span className="font-bold text-gray-700">糖果编号:</span>
                <input
                    type="range" min="1" max="50" value={candy} onChange={(e) => setCandy(parseInt(e.target.value))}
                    className="accent-yellow-600 flex-1"
                />
                <span className="font-mono text-2xl font-bold text-yellow-700 bg-white px-3 py-1 rounded border border-yellow-300">{candy}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span>是 5 的倍数? (x % 5 == 0)</span>
                        {isMultipleOf5 ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
                    </div>
                    <div className="flex justify-between items-center">
                        <span>不是 10 的倍数? (x % 10 != 0)</span>
                        {!isMultipleOf10 ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
                    </div>
                </div>

                <div className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${willEat ? 'bg-green-100 border-green-400 scale-105' : 'bg-gray-100 border-gray-300'}`}>
                    <div className="text-4xl mb-2">{willEat ? "😋" : "😒"}</div>
                    <div className={`font-bold ${willEat ? "text-green-700" : "text-gray-500"}`}>
                        {willEat ? "国王吃掉！" : "国王拒绝！"}
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <code className="bg-gray-900 text-green-400 p-2 rounded text-sm">
                    if (candy % 5 == 0 && candy % 10 != 0)
                </code>
            </div>
        </div>
    );
};

// --- 互动组件 3：闰年判定机 ---
const LeapYearChecker = () => {
    const [year, setYear] = useState(2024);

    const isDiv4 = year % 4 === 0;
    const isDiv100 = year % 100 === 0;
    const isDiv400 = year % 400 === 0;

    const isLeap = (isDiv4 && !isDiv100) || isDiv400;

    return (
        <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 my-4">
            <h3 className="font-bold text-lg text-indigo-700 mb-4 flex items-center gap-2">
                <Calendar className="text-indigo-600" /> 时间魔法书：闰年判定
            </h3>

            <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-indigo-100">
                    <button onClick={() => setYear(y => y - 1)} className="p-2 hover:bg-gray-100 rounded">-</button>
                    <input
                        type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value) || 0)}
                        className="w-24 text-center font-bold text-xl outline-none"
                    />
                    <button onClick={() => setYear(y => y + 1)} className="p-2 hover:bg-gray-100 rounded">+</button>
                </div>
            </div>

            <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-lg border ${isDiv4 ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                    <span className="flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 px-2 rounded text-xs font-bold">1</span>
                        能被 4 整除?
                    </span>
                    <span className="font-mono text-sm">{year} % 4 = {year % 4}</span>
                    {isDiv4 ? <CheckCircle2 className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg border ${isDiv100 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <span className="flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 px-2 rounded text-xs font-bold">2</span>
                        能被 100 整除? (百年不闰)
                    </span>
                    <span className="font-mono text-sm">{year} % 100 = {year % 100}</span>
                    {isDiv100 ? <CheckCircle2 className="text-red-500" size={20} /> : <XCircle className="text-green-500" size={20} />}
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg border ${isDiv400 ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                    <span className="flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 px-2 rounded text-xs font-bold">3</span>
                        能被 400 整除? (四百再闰)
                    </span>
                    <span className="font-mono text-sm">{year} % 400 = {year % 400}</span>
                    {isDiv400 ? <CheckCircle2 className="text-green-500" size={20} /> : <XCircle className="text-gray-300" size={20} />}
                </div>
            </div>

            <div className={`mt-6 text-center p-4 rounded-xl font-bold text-xl transition-all ${isLeap ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                {isLeap ? `🎉 ${year} 是闰年 (366天)` : `📅 ${year} 是平年 (365天)`}
            </div>
        </div>
    );
};

// --- 互动组件 4：美丽数字筛选器 ---
const BeautifulNumbers = () => {
    const [n] = useState(5);
    const [k, setK] = useState(3);
    const [l, setL] = useState(2);
    const [numbers, setNumbers] = useState([6, 9, 10, 15, 12]);

    const handleNumChange = (idx, val) => {
        const newNums = [...numbers];
        newNums[idx] = parseInt(val) || 0;
        setNumbers(newNums);
    };

    const checkBeautiful = (num) => {
        return (num % k === 0) && (num % l !== 0);
    };

    const beautifulCount = numbers.filter(checkBeautiful).length;

    return (
        <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 my-4">
            <h3 className="font-bold text-lg text-purple-700 mb-4 flex items-center gap-2">
                <Crown className="text-purple-600" /> 真题实战：寻找美丽数字
            </h3>

            <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">倍数 k:</span>
                    <input type="number" value={k} onChange={e => setK(parseInt(e.target.value))} className="w-12 border rounded text-center" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">非倍数 l:</span>
                    <input type="number" value={l} onChange={e => setL(parseInt(e.target.value))} className="w-12 border rounded text-center" />
                </div>
                <div className="text-sm text-purple-600 italic ml-auto self-center">
                    条件：是 {k} 的倍数 <span className="font-bold">且</span> 不是 {l} 的倍数
                </div>
            </div>

            <div className="space-y-2">
                {numbers.map((num, idx) => {
                    const isK = num % k === 0;
                    const isNotL = num % l !== 0;
                    const isBeautiful = isK && isNotL;

                    return (
                        <div key={idx} className="flex items-center gap-4 bg-white p-2 rounded border border-purple-100">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm">
                                {idx + 1}
                            </div>
                            <input
                                type="number"
                                value={num}
                                onChange={(e) => handleNumChange(idx, e.target.value)}
                                className="w-20 border-b-2 border-purple-300 text-center font-mono text-lg focus:outline-none"
                            />
                            <div className="flex-1 flex gap-2 text-xs">
                                <span className={`px-2 py-1 rounded ${isK ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {isK ? `是${k}倍数` : `非${k}倍数`}
                                </span>
                                <span className={`px-2 py-1 rounded ${isNotL ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {isNotL ? `不是${l}倍数` : `是${l}倍数`}
                                </span>
                            </div>
                            <div className="w-24 text-right">
                                {isBeautiful
                                    ? <span className="text-green-600 font-bold flex items-center gap-1 justify-end"><CheckCircle2 size={16} /> 美丽</span>
                                    : <span className="text-gray-400 flex items-center gap-1 justify-end"><XCircle size={16} /> 普通</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 text-center bg-purple-600 text-white p-3 rounded-xl font-bold">
                统计结果：共有 {beautifulCount} 个美丽数字
            </div>
        </div>
    );
};

// --- 互动组件 5：逻辑竞技场 (&& vs ||) ---
const LogicArena = () => {
    const [logicType, setLogicType] = useState("and"); // and, or
    const [hoverNum, setHoverNum] = useState(null);

    // 生成1-30的数字
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

    const checkCondition = (num, type) => {
        const cond1 = num % 3 === 0;
        const cond2 = num % 5 === 0;
        if (type === "and") return cond1 && cond2;
        if (type === "or") return cond1 || cond2;
        return false;
    };

    return (
        <div className="bg-white p-6 rounded-xl border-2 border-slate-100 my-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="text-yellow-500" /> 逻辑竞技场：&& (并且) vs || (或者)
            </h3>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setLogicType("and")}
                    className={`flex-1 py-3 rounded-lg font-bold border-2 transition ${logicType === 'and' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                >
                    && 并且 (严格)
                    <div className="text-xs font-normal mt-1">既要是3的倍数，又要是5的倍数</div>
                </button>
                <button
                    onClick={() => setLogicType("or")}
                    className={`flex-1 py-3 rounded-lg font-bold border-2 transition ${logicType === 'or' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                >
                    || 或者 (宽松)
                    <div className="text-xs font-normal mt-1">要是3的倍数，或者是5的倍数</div>
                </button>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-4">
                {numbers.map(num => {
                    const isMatch = checkCondition(num, logicType);
                    const cond1 = num % 3 === 0;
                    const cond2 = num % 5 === 0;

                    let bgClass = "bg-gray-100 text-gray-400";
                    if (isMatch) bgClass = "bg-indigo-500 text-white shadow-md transform scale-105";

                    // 悬停效果
                    const isHovering = hoverNum === num;

                    return (
                        <div
                            key={num}
                            onMouseEnter={() => setHoverNum(num)}
                            onMouseLeave={() => setHoverNum(null)}
                            className={`aspect-square rounded flex items-center justify-center font-bold relative group cursor-pointer transition-all ${bgClass}`}
                        >
                            {num}
                            {/* Tooltip */}
                            {isHovering && (
                                <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs p-2 rounded w-32 z-10 text-center pointer-events-none">
                                    <div>{num} % 3 = {num % 3} {cond1 ? "✅" : "❌"}</div>
                                    <div>{num} % 5 = {num % 5} {cond2 ? "✅" : "❌"}</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={`p-4 rounded-lg text-sm flex items-center gap-3 ${logicType === 'and' ? 'bg-blue-50 text-blue-800' : 'bg-purple-50 text-purple-800'}`}>
                <Lightbulb size={20} className="shrink-0" />
                {logicType === 'and'
                    ? "发现了吗？用 && 时，只有公倍数 (15, 30) 才会亮起来，条件非常苛刻！"
                    : "发现了吗？用 || 时，只要满足其中一个条件就会亮，亮起来的数字变多了！"
                }
            </div>
        </div>
    );
};

// --- 互动组件 6：避坑指南 (数学雷区) ---
const MathPitfalls = () => {
    const [step, setStep] = useState(0);
    const pitfalls = [
        {
            title: "陷阱 1：整数除法 (Integer Division)",
            code: "int a = 5;\nint b = 2;\ncout << a / b;",
            result: "2",
            wrong: "2.5",
            desc: "在C++整数世界里，5除以2等于2余1。小数部分会被直接扔掉（切尾），而不是四舍五入！"
        },
        {
            title: "陷阱 2：求余符号 (Modulo Sign)",
            code: "int a = -5;\nint b = 2;\ncout << a % b;",
            result: "-1",
            wrong: "1",
            desc: "求余结果的符号通常和被除数（前面的数）一致。 (-5) % 2 结果是 -1。"
        },
        {
            title: "陷阱 3：闰年条件的逻辑优先级",
            code: "if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0)",
            result: "正确",
            wrong: "错误写法",
            desc: "&& (并且) 就像乘法，优先级比 || (或者) 高。如果不加括号，机器也会先算 &&，刚好符合闰年逻辑，但为了保险最好加上括号！"
        }
    ];

    const current = pitfalls[step];

    return (
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-6">
            <h3 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-600" /> 避坑指南：数学计算雷区
            </h3>

            <div className="flex gap-2 mb-4">
                {pitfalls.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setStep(i)}
                        className={`w-8 h-8 rounded-full font-bold transition ${step === i ? 'bg-orange-500 text-white' : 'bg-orange-200 text-orange-800 hover:bg-orange-300'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <div className="bg-white p-5 rounded-lg border border-orange-100 shadow-sm transition-all duration-300">
                <h4 className="font-bold text-gray-800 mb-2">{current.title}</h4>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 relative">
                    <pre>{current.code}</pre>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <span className="text-red-400 text-xs line-through opacity-60">想的是: {current.wrong}</span>
                        <span className="text-white font-bold bg-green-600 px-2 py-1 rounded text-xs">实际输出: {current.result}</span>
                    </div>
                </div>
                <div className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <div className="mt-1 text-orange-500"><Lightbulb size={16} fill="currentColor" /></div>
                    {current.desc}
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 7：逢七过大闯关 ---
const KnockSevenGame = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing, end
    const [score, setScore] = useState(0);
    const [currentNum, setCurrentNum] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [feedback, setFeedback] = useState(null); // correct, wrong, miss

    // 游戏循环
    useEffect(() => {
        let timer;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameState('end');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState('playing');
        nextNumber();
    };

    const nextNumber = () => {
        // 生成 7-99 的随机数，增加出现7相关数字的概率
        let num;
        if (Math.random() > 0.6) {
            // 生成必定相关的数
            const candidates = [];
            for (let i = 7; i < 100; i++) {
                if (i % 7 === 0 || i.toString().includes('7')) candidates.push(i);
            }
            num = candidates[Math.floor(Math.random() * candidates.length)];
        } else {
            num = Math.floor(Math.random() * 93) + 7;
        }
        setCurrentNum(num);
        setFeedback(null);
    };

    const handleAction = (action) => {
        // action: 'knock' (敲桌子), 'pass' (过)
        const isSeven = currentNum % 7 === 0 || currentNum.toString().includes('7');
        let isCorrect = false;

        if (action === 'knock' && isSeven) isCorrect = true;
        if (action === 'pass' && !isSeven) isCorrect = true;

        if (isCorrect) {
            setScore(s => s + 10);
            setFeedback('correct');
            setTimeout(nextNumber, 500);
        } else {
            setScore(s => Math.max(0, s - 5));
            setFeedback('wrong');
            // 错误停留一下让用户看清
            setTimeout(nextNumber, 800);
        }
    };

    if (gameState === 'menu') {
        return (
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-xl text-white text-center shadow-lg my-6">
                <Gamepad2 size={48} className="mx-auto mb-4 text-yellow-300" />
                <h2 className="text-3xl font-bold mb-2">挑战：逢七过</h2>
                <p className="text-indigo-100 mb-6">30秒内，如果数字包含7或者是7的倍数，请点击"敲桌子"，否则点"过"！</p>
                <button
                    onClick={startGame}
                    className="bg-yellow-400 text-indigo-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg transform hover:scale-105"
                >
                    开始挑战
                </button>
            </div>
        );
    }

    if (gameState === 'end') {
        return (
            <div className="bg-white p-8 rounded-xl text-center border-2 border-indigo-100 my-6">
                <Crown size={48} className="mx-auto mb-4 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">时间到！</h2>
                <div className="text-4xl font-bold text-indigo-600 mb-6">{score} 分</div>
                <button
                    onClick={startGame}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    再玩一次
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border-2 border-indigo-100 my-6 text-center relative overflow-hidden">
            {/* 倒计时条 */}
            <div className="absolute top-0 left-0 h-1 bg-yellow-400 transition-all duration-1000" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>

            <div className="flex justify-between items-center mb-8 text-sm font-bold text-gray-500">
                <span>倒计时: {timeLeft}s</span>
                <span>得分: {score}</span>
            </div>

            <div className="mb-8 relative">
                <div className={`text-6xl font-mono font-bold transition-transform duration-300 ${feedback === 'correct' ? 'text-green-500 scale-110' : feedback === 'wrong' ? 'text-red-500 shake' : 'text-gray-800'}`}>
                    {currentNum}
                </div>
                {feedback === 'correct' && <div className="absolute top-0 right-1/4 text-green-500"><CheckCircle2 size={32} /></div>}
                {feedback === 'wrong' && <div className="absolute top-0 right-1/4 text-red-500"><XCircle size={32} /></div>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => handleAction('knock')}
                    className="bg-red-100 text-red-600 py-4 rounded-xl font-bold text-xl hover:bg-red-200 transition flex flex-col items-center gap-2 border-b-4 border-red-200 active:border-b-0 active:translate-y-1"
                >
                    <Zap size={24} /> 敲桌子!
                </button>
                <button
                    onClick={() => handleAction('pass')}
                    className="bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-xl hover:bg-gray-200 transition flex flex-col items-center gap-2 border-b-4 border-gray-200 active:border-b-0 active:translate-y-1"
                >
                    <ArrowRight size={24} /> 过
                </button>
            </div>

            <div className="mt-4 text-xs text-gray-400">
                诀窍: 7, 14, 17, 21, 27, 28, 35...
            </div>
        </div>
    );
};
export default function App() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const nextSection = () => {
        if (activeSection < sections.length) setActiveSection(activeSection + 1);
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="slide-enter text-center">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-12 rounded-2xl shadow-xl mb-8">
                            <div className="flex justify-center gap-4 mb-6">
                                <Search size={60} className="text-yellow-300 animate-bounce" />
                                <Clock size={60} className="text-green-300 animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2 text-blue-100">GESP C++ 一级 第13课</h2>
                            <h1 className="text-5xl font-bold mb-6 drop-shadow-md">数学应用</h1>
                            <div className="inline-block bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/30">
                                <span className="font-bold tracking-wide text-lg">🕵️‍♂️ 副标题：数字侦探与时间魔法</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <ArrowRight className="text-blue-600" /> 教学目标
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-600 p-2 rounded"><Divide size={18} /></span>
                                    掌握用 <code>%</code> (取模) 和 <code>/</code> (除法) 解决倍数和约数问题。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-indigo-100 text-indigo-600 p-2 rounded"><Calendar size={18} /></span>
                                    掌握“闰年判断”的逻辑（综合运用逻辑运算符）。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-purple-100 text-purple-600 p-2 rounded"><Terminal size={18} /></span>
                                    通过真题实战，学会将数学文字题翻译成 C++ 代码。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Search className="text-blue-600" size={32} /> 法宝一：倍数显形镜
                        </h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <p className="text-lg text-gray-600 mb-4">
                                在 C++ 的世界里，解决数学问题的核心往往是判断 <strong className="text-blue-600">“能不能整除”</strong> 以及 <strong className="text-orange-600">“有没有剩余”</strong>。
                            </p>
                            <GroupDivider />
                        </div>
                        <KingsCandy />
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Calendar className="text-indigo-600" size={32} /> 法宝二：时间魔法书
                        </h2>
                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 text-indigo-900">
                            <p className="font-bold mb-2">📅 闰年判断口诀：</p>
                            <p>四年一闰，百年不闰，四百年再闰。</p>
                        </div>
                        <LeapYearChecker />
                        <div className="bg-gray-800 text-gray-200 p-4 rounded-xl font-mono text-sm mt-6">
                            <div className="text-gray-500 mb-1">// 核心代码</div>
                            <div><span className="text-purple-400">if</span> ( (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ) &#123;</div>
                            <div className="pl-4">cout &lt;&lt; <span className="text-green-400">"是闰年"</span>;</div>
                            <div>&#125; <span className="text-purple-400">else</span> &#123;</div>
                            <div className="pl-4">cout &lt;&lt; <span className="text-green-400">"是平年"</span>;</div>
                            <div>&#125;</div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Zap className="text-yellow-500" size={32} /> 逻辑竞技场：&& vs ||
                        </h2>
                        <LogicArena />
                        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 text-sm text-indigo-900 mt-4">
                            <strong>💡 规律总结：</strong>
                            <ul className="list-disc ml-5 mt-2 space-y-1">
                                <li><strong>&& (并且)</strong>：像是一个严格的教官，要求两个条件都必须做到，所以能通过的数字很少。</li>
                                <li><strong>|| (或者)</strong>：像是一个和蔼的老师，支持两个条件，只要满足其中一个就行，所以能通过的数字很多。</li>
                            </ul>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-orange-500" size={32} /> 避坑指南：数学计算雷区
                        </h2>
                        <MathPitfalls />
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Terminal className="text-green-600" size={32} /> 真题实战 1：日历机器人
                        </h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2023年3月 GESP 一级 编程题第1题</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-4 text-green-700">🕵️ 线索分析</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="bg-green-100 text-green-800 px-2 rounded font-bold text-xs mt-1">口诀</span>
                                        <div>一三五七八十腊(12)，三十一天永不差。</div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-2 rounded font-bold text-xs mt-1">小月</span>
                                        <div>四六九冬(11)，三十天。</div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-red-100 text-red-800 px-2 rounded font-bold text-xs mt-1">捣蛋鬼</span>
                                        <div>二月！看年份心情，闰年29天，平年28天。</div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-slate-900 text-gray-300 p-5 rounded-xl font-mono text-xs leading-relaxed overflow-auto">
                                <div className="text-gray-500 mb-2">// 伪代码逻辑</div>
                                <div>cin &gt;&gt; y &gt;&gt; m;</div>
                                <div className="text-yellow-500 font-bold mt-2">if (m == 2) &#123;</div>
                                <div className="pl-4 text-green-400">// 判断 y 是否闰年</div>
                                <div className="pl-4">if (闰年) cout &lt;&lt; 29;</div>
                                <div className="pl-4">else cout &lt;&lt; 28;</div>
                                <div>&#125;</div>
                                <div className="text-blue-400 mt-2">else if (m == 4 || m == 6 || ...) &#123;</div>
                                <div className="pl-4">cout &lt;&lt; 30;</div>
                                <div>&#125;</div>
                                <div className="text-purple-400 mt-2">else &#123;</div>
                                <div className="pl-4">cout &lt;&lt; 31;</div>
                                <div>&#125;</div>
                            </div>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Crown className="text-purple-600" size={32} /> 真题实战 2：寻找美丽数字
                        </h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2024年9月 GESP 一级 编程题第2题</div>

                        <BeautifulNumbers />

                        <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500 shadow-sm mt-4">
                            <h4 className="font-bold text-purple-800 mb-2">解题思路：</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>1. <strong>审题：</strong> 必须同时满足 “是k的倍数” 且 “不是l的倍数”。</li>
                                <li>2. <strong>翻译：</strong> <code>x % k == 0 && x % l != 0</code>。</li>
                                <li>3. <strong>循环：</strong> 用 <code>for</code> 循环遍历输入的 n 个数字，逐一检查。</li>
                                <li>4. <strong>计数：</strong> 满足条件时 <code>count++</code>。</li>
                            </ul>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Gamepad2 className="text-purple-500" size={32} /> 挑战：逢七过大闯关
                        </h2>
                        <KnockSevenGame />
                    </div>
                );
            case 9:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                                    <CheckCircle2 size={20} /> 知识点回顾
                                </h3>
                                <ul className="space-y-3 text-gray-700 font-medium">
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">1</span>
                                        <span><strong>取模 (%)</strong> 是判断倍数的神器：<code>a % b == 0</code>。</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">2</span>
                                        <span><strong>逻辑连接：</strong> <code>&&</code> (都满足)，<code>||</code> (满足其一)。</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">3</span>
                                        <span><strong>闰年公式：</strong> 四年一闰，百年不闰，四百年再闰。</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <BookOpen size={24} /> 课后思考
                                </h3>
                                <p className="text-indigo-100 mb-4">
                                    如果我想找出 1 到 100 之间，所有 <strong>个位是 7</strong> 或者 <strong>能被 7 整除</strong> 的数字（敲七游戏），代码该怎么写？
                                </p>
                                <div className="bg-white/10 p-3 rounded-lg text-sm border border-white/20">
                                    <p>提示：</p>
                                    <ul className="list-disc list-inside mt-1 opacity-90">
                                        <li>个位是 7 &rarr; <code>n % 10 == 7</code></li>
                                        <li>被 7 整除 &rarr; <code>n % 7 == 0</code></li>
                                        <li>中间用什么符号连接？</li>
                                    </ul>
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
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto transition-transform duration-300 shadow-lg md:shadow-none
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-white">
                    <h1 className="text-lg font-bold flex items-center gap-2 text-blue-700">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                        <span className="bg-blue-600 text-white p-1 rounded">C++</span>
                        <span>一级趣味课堂</span>
                    </h1>
                    <p className="text-xs text-blue-400 mt-2 font-medium pl-1">第 13 课：数学与逻辑 🧮</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 font-medium
                ${activeSection === section.id
                                    ? 'bg-blue-100 text-blue-800 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            <i className={`p-1 rounded ${activeSection === section.id ? 'bg-white/50' : 'bg-gray-100'}`}>
                                <Icon name={section.icon} size={16} />
                            </i>
                            {section.title}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
                    逻辑一号老师 © 2025
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative pt-16 md:pt-0">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

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
                        {renderContent()}
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
                        disabled={activeSection === sections.length}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm
              ${activeSection === sections.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'}`}
                    >
                        下一步 <ArrowRight size={18} color="white" />
                    </button>
                </footer>
            </div>
        </div>
    );
}