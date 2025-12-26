import React, { useState, useEffect } from 'react';
import {
    Ban,
    FastForward,
    Play,
    RotateCcw,
    Flag,
    AlertTriangle,
    Terminal,
    BookOpen,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Footprints,
    CloudRain,
    Banana,
    Trophy,
    Utensils,
    Search,
    StopCircle,
    Layers,
    Zap,
    Target
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const icons = {
        "ban": <Ban size={size} color={color} className={className} />,
        "skip": <FastForward size={size} color={color} className={className} />,
        "play": <Play size={size} color={color} className={className} />,
        "reset": <RotateCcw size={size} color={color} className={className} />,
        "flag": <Flag size={size} color={color} className={className} />,
        "alert": <AlertTriangle size={size} color={color} className={className} />,
        "terminal": <Terminal size={size} color={color} className={className} />,
        "book": <BookOpen size={size} color={color} className={className} />,
        "check": <CheckCircle2 size={size} color={color} className={className} />,
        "x": <XCircle size={size} color={color} className={className} />,
        "arrow": <ArrowRight size={size} color={color} className={className} />,
        "run": <Footprints size={size} color={color} className={className} />,
        "rain": <CloudRain size={size} color={color} className={className} />,
        "banana": <Banana size={size} color={color} className={className} />,
        "trophy": <Trophy size={size} color={color} className={className} />,
        "eat": <Utensils size={size} color={color} className={className} />,
        "search": <Search size={size} color={color} className={className} />,
        "stop": <StopCircle size={size} color={color} className={className} />,
        "layers": <Layers size={size} color={color} className={className} />,
        "zap": <Zap size={size} color={color} className={className} />,
        "target": <Target size={size} color={color} className={className} />
    };
    return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
    { id: 1, title: "课程导入：酷跑大赛", icon: "flag" },
    { id: 2, title: "核心概念：急刹车 vs 捣蛋鬼", icon: "book" },
    { id: 3, title: "演示：寻找金苹果 (break)", icon: "ban" },
    { id: 4, title: "演示：跳过坏豆子 (continue)", icon: "skip" },
    { id: 5, title: "对比PK台：同一场景不同结果", icon: "trophy" },
    { id: 6, title: "避坑指南：常见误区", icon: "alert" },
    { id: 7, title: "真题实战 1：无限循环急刹车", icon: "stop" },
    { id: 8, title: "真题实战 2：混合双打", icon: "zap" },
    { id: 9, title: "高级知识：嵌套循环中的break", icon: "layers" },
    { id: 10, title: "总结与作业", icon: "check" }
];

// --- 互动组件 1：酷跑大赛模拟器 ---
const RunRaceSimulator = () => {
    const [lap, setLap] = useState(0);
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("normal"); // normal, break, continue

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setLap(prev => {
                    const nextLap = prev + 1;

                    // 逻辑判断
                    if (mode === "break" && nextLap === 3) {
                        setLogs(l => [...l, `🏃 第 ${nextLap} 圈：🌧️ 突然下大雨！触发 break！`]);
                        setLogs(l => [...l, `🛑 比赛直接结束！剩下的圈数不跑了。`]);
                        setIsRunning(false);
                        return nextLap;
                    }

                    if (mode === "continue" && nextLap === 3) {
                        setLogs(l => [...l, `🏃 第 ${nextLap} 圈：🍌 踩到香蕉皮！触发 continue！`]);
                        setLogs(l => [...l, `⚠️ 本圈成绩作废，直接去下一圈！`]);
                        return nextLap; // 继续跑，但这一圈没盖章（在日志体现）
                    }

                    if (nextLap > 10) {
                        setIsRunning(false);
                        setLogs(l => [...l, `🏁 跑完 10 圈，任务完成！`]);
                        return prev;
                    }

                    setLogs(l => [...l, `🏃 第 ${nextLap} 圈：✅ 盖章成功`]);
                    return nextLap;
                });
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isRunning, mode]);

    const startRun = (selectedMode) => {
        setMode(selectedMode);
        setLap(0);
        setLogs([]);
        setIsRunning(true);
    };

    return (
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4 shadow-sm">
            <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
                <Footprints className="text-blue-500" /> C++ 酷跑大赛 (目标：10圈)
            </h3>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => startRun("break")}
                    disabled={isRunning}
                    className="flex-1 py-3 bg-red-100 border-2 border-red-300 rounded-xl hover:bg-red-200 disabled:opacity-50 transition flex flex-col items-center gap-2"
                >
                    <CloudRain className="text-red-500" size={32} />
                    <span className="font-bold text-red-700">场景一：急刹车 (break)</span>
                    <span className="text-xs text-red-600">第3圈下雨，全员解散</span>
                </button>

                <button
                    onClick={() => startRun("continue")}
                    disabled={isRunning}
                    className="flex-1 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-xl hover:bg-yellow-200 disabled:opacity-50 transition flex flex-col items-center gap-2"
                >
                    <Banana className="text-yellow-600" size={32} />
                    <span className="font-bold text-yellow-800">场景二：捣蛋鬼 (continue)</span>
                    <span className="text-xs text-yellow-700">第3圈踩香蕉，这圈不算</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700">当前圈数:</span>
                    <span className="text-3xl font-mono font-bold text-blue-600">{lap} / 10</span>
                </div>
                <div className="h-40 overflow-y-auto bg-gray-900 text-green-400 p-3 rounded font-mono text-sm border border-gray-700 shadow-inner">
                    {logs.length === 0 ? <span className="opacity-50 text-gray-500">等待起跑...</span> : logs.map((log, i) => (
                        <div key={i} className="mb-1 border-b border-gray-800 pb-1">{log}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 2：金苹果游戏 (break) ---
const GoldAppleGame = () => {
    const [currentBox, setCurrentBox] = useState(0);
    const [found, setFound] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && !found) {
            const timer = setTimeout(() => {
                if (currentBox < 5) {
                    setCurrentBox(c => c + 1);
                }
                if (currentBox === 4) { // Index 4 is the 5th box
                    setFound(true);
                    setIsRunning(false);
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isRunning, currentBox, found]);

    const reset = () => {
        setCurrentBox(0);
        setFound(false);
        setIsRunning(true);
    };

    return (
        <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 my-4">
            <h3 className="font-bold text-lg text-red-700 mb-4 flex items-center gap-2">
                <Search className="text-red-600" /> 破坏王 break：寻找金苹果
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                规则：盒子里有100个苹果，第5个是金苹果。只要找到金苹果，立马收工回家 (break)！
            </p>

            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl transition-all duration-300
            ${i < currentBox ? 'bg-gray-200 border-gray-300 opacity-50' : 'bg-white border-red-200'}
            ${i + 1 === currentBox && !found ? 'scale-110 border-blue-500 shadow-lg' : ''}
            ${i + 1 === 5 && found ? 'bg-yellow-100 border-yellow-500 scale-125 shadow-xl' : ''}
          `}>
                        {i + 1 === 5 && found ? '🍎' : (i < currentBox ? '🍏' : '📦')}
                    </div>
                ))}
                <div className="flex items-center text-gray-400">...还有92个</div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-red-100 text-center">
                <div className="font-mono text-sm mb-2 text-gray-500">
                    正在检查第 <span className="text-red-600 font-bold text-lg">{currentBox}</span> 个盒子
                </div>
                {found ? (
                    <div className="text-green-600 font-bold animate-bounce">
                        🎉 找到金苹果了！执行 break，后面的95个不找了！
                    </div>
                ) : (
                    <div className="h-6"></div>
                )}
            </div>

            <button onClick={reset} className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">
                🚀 开始寻找
            </button>
        </div>
    );
};

// --- 互动组件 3：挑豆子游戏 (continue) ---
const BadBeanGame = () => {
    const [currentBean, setCurrentBean] = useState(0);
    const [eaten, setEaten] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && currentBean < 5) {
            const timer = setTimeout(() => {
                const beanNum = currentBean + 1;
                if (beanNum === 3) {
                    // Bad bean logic
                } else {
                    setEaten(e => [...e, beanNum]);
                }
                setCurrentBean(c => c + 1);

                if (beanNum === 5) setIsRunning(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isRunning, currentBean]);

    const reset = () => {
        setCurrentBean(0);
        setEaten([]);
        setIsRunning(true);
    };

    return (
        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 my-4">
            <h3 className="font-bold text-lg text-green-700 mb-4 flex items-center gap-2">
                <Utensils className="text-green-600" /> 跳跳糖 continue：挑坏豆子
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                规则：吃掉碗里的5颗豆子。第3颗是坏的，跳过它 (continue)，继续吃后面的。
            </p>

            <div className="flex justify-center gap-4 mb-6">
                {Array.from({ length: 5 }).map((_, i) => {
                    const num = i + 1;
                    const isBad = num === 3;
                    const isProcessing = currentBean === i;
                    const isPast = currentBean > i;
                    const isEaten = eaten.includes(num);

                    return (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xl transition-all duration-300
                ${isProcessing ? 'scale-125 shadow-lg border-blue-500' : 'border-gray-200'}
                ${isBad ? 'bg-gray-700 text-white' : 'bg-green-100 text-green-800'}
                ${isEaten ? 'opacity-20 scale-75' : ''}
              `}>
                                {isBad ? '🤢' : '🫘'}
                            </div>
                            <div className="text-xs mt-2 font-bold text-gray-500">
                                {isProcessing ? (isBad ? "跳过!" : "吃掉") : (isPast ? (isEaten ? "已吃" : "扔掉") : num)}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-gray-800 text-white p-3 rounded-lg font-mono text-xs mb-4">
                <div>for (int i=1; i&lt;=5; i++) &#123;</div>
                <div className={`pl-4 ${currentBean === 2 ? 'bg-yellow-900/50 text-yellow-300 font-bold' : ''}`}>
                    if (i == 3) continue; <span className="text-gray-400">// {currentBean === 2 ? "触发！直接跳到 i++" : ""}</span>
                </div>
                <div className={`pl-4 ${currentBean === 2 ? 'opacity-30 line-through' : 'text-green-400'}`}>
                    cout &lt;&lt; "吃掉" &lt;&lt; i;
                </div>
                <div>&#125;</div>
            </div>

            <button onClick={reset} className="w-full py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition">
                🍽️ 开始吃豆子
            </button>
        </div>
    );
};

// --- 互动组件：对比PK台 ---
const ComparisonArena = () => {
    const [counts, setCounts] = useState([]);
    const [mode, setMode] = useState("normal"); // normal, break, continue
    const [currentStep, setCurrentStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setCurrentStep(prev => {
                    const next = prev + 1;
                    if (next > 10) {
                        setIsRunning(false);
                        return prev;
                    }

                    // 核心逻辑演示
                    if (mode === "break" && next === 5) {
                        setIsRunning(false); // 终止循环
                        return next;
                    }

                    if (mode === "continue" && next === 5) {
                        // 跳过5，但继续运行
                        return next;
                    }

                    return next;
                });
            }, 600);
        }
        return () => clearInterval(interval);
    }, [isRunning, mode]);

    const run = (m) => {
        setMode(m);
        setCurrentStep(0);
        setIsRunning(true);
    };

    return (
        <div className="bg-white p-6 rounded-xl border-2 border-slate-100 my-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" /> 对比 PK 台：数数比赛 (1-10)
            </h3>

            <div className="flex gap-4 mb-6">
                <button onClick={() => run("normal")} disabled={isRunning} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-bold transition">
                    正常模式
                </button>
                <button onClick={() => run("break")} disabled={isRunning} className="flex-1 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-bold transition">
                    遇到5 break
                </button>
                <button onClick={() => run("continue")} disabled={isRunning} className="flex-1 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 font-bold transition">
                    遇到5 continue
                </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {Array.from({ length: 10 }).map((_, i) => {
                    const num = i + 1;
                    const isCurrent = currentStep === num;
                    const isSkipped = mode === "continue" && num === 5;
                    const isBreakPoint = mode === "break" && num === 5;
                    const isAfterBreak = mode === "break" && num > 5 && currentStep >= 5;

                    let statusColor = "bg-gray-100 text-gray-400"; // 未到达

                    if (num < currentStep || (num === currentStep && !isRunning)) {
                        statusColor = "bg-green-100 text-green-700"; // 已完成
                    }
                    if (isCurrent && isRunning) {
                        statusColor = "bg-blue-500 text-white scale-110 shadow-lg"; // 进行中
                    }
                    if (isSkipped && (num <= currentStep)) {
                        statusColor = "bg-yellow-100 text-yellow-600 border-2 border-yellow-400"; // 跳过
                    }
                    if (isBreakPoint && (num <= currentStep)) {
                        statusColor = "bg-red-500 text-white animate-pulse"; // Break点
                    }
                    if (isAfterBreak) {
                        statusColor = "bg-gray-200 text-gray-300 opacity-50"; // Break后的无效区
                    }

                    return (
                        <div key={num} className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 ${statusColor}`}>
                            {num}
                        </div>
                    );
                })}
            </div>

            <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm h-24 overflow-y-auto">
                <div className="text-gray-500">// 控制台输出</div>
                {Array.from({ length: currentStep }).map((_, i) => {
                    const num = i + 1;
                    if (mode === "break" && num > 4) return null;
                    if (mode === "continue" && num === 5) return null;
                    return <span key={i} className="mr-3">{num}</span>;
                })}
                {mode === "break" && currentStep >= 5 && <span className="text-red-400 block mt-1">Process terminated (break)</span>}
            </div>
        </div>
    );
};

// --- 互动组件：避坑指南 ---
const PitfallGuide = () => {
    const [activeTab, setActiveTab] = useState(0);
    const pitfalls = [
        {
            title: "误区1: break 能跳出多层循环？",
            code: `for(int i=0; i<5; i++) {
  for(int j=0; j<5; j++) {
    if(j==2) break; // 只能跳出内层 j 循环！
  }
  // i 循环还会继续跑！
}`,
            tip: "break 像个短视的逃兵，只能逃离最近的一层包围圈 (当前大括号)。"
        },
        {
            title: "误区2: while continue 的死循环",
            code: `int i = 0;
while (i < 5) {
  if (i == 3) continue; // 危险！
  i++; // 这行永远不会执行
}
// 结果：i一直等于3，程序卡死`,
            tip: "在 while 中用 continue，一定要确保计数器在 continue 之前已经变化了，否则就是无限鬼打墙！"
        },
        {
            title: "误区3: switch 里的 break",
            code: `switch(n) {
  case 1: cout << "1"; 
  case 2: cout << "2"; // 忘了break，会发生穿透
}`,
            tip: "switch 里的 case 就像滑梯，没有 break 挡板，就会一直滑到底 (Case穿透)！"
        }
    ];

    return (
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-6">
            <h3 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-600" /> 避坑指南：新手最容易犯的错
            </h3>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {pitfalls.map((p, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition
                            ${activeTab === i ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-orange-100'}`}
                    >
                        {p.title.split(":")[0]}
                    </button>
                ))}
            </div>

            <div className="bg-white p-5 rounded-lg border border-orange-100 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">{pitfalls[activeTab].title}</h4>
                <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm mb-4 relative overflow-hidden">
                    <pre>{pitfalls[activeTab].code}</pre>
                </div>
                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg text-red-700 text-sm">
                    <Zap className="shrink-0 mt-0.5" size={16} />
                    {pitfalls[activeTab].tip}
                </div>
            </div>
        </div>
    );
};

// --- 互动组件：嵌套循环可视化 ---
const NestedLoopVisualizer = () => {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [breakType, setBreakType] = useState("none"); // none, inner, outer

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => {
            setCol(prevCol => {
                let nextCol = prevCol + 1;

                // 模拟 break 逻辑
                if (breakType === "inner" && nextCol === 3) {
                    // 内层 break，直接结束当前行，进入下一行
                    setRow(r => r + 1);
                    return 1;
                }

                if (nextCol > 5) {
                    setRow(r => r + 1);
                    return 1;
                }
                return nextCol;
            });
        }, 500);

        return () => clearInterval(timer);
    }, [isRunning, breakType]);

    // 监控行数变化，处理结束或外层循环
    useEffect(() => {
        if (row > 3) {
            setIsRunning(false);
            setRow(1);
            setCol(0);
        }
    }, [row]);

    const start = (type) => {
        setBreakType(type);
        setRow(1);
        setCol(0);
        setIsRunning(true);
    };

    return (
        <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 my-6">
            <h3 className="font-bold text-lg text-indigo-800 mb-4 flex items-center gap-2">
                <Layers className="text-indigo-600" /> 高级：嵌套循环中的 Break
            </h3>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 space-y-2">
                    <button onClick={() => start("none")} disabled={isRunning} className="w-full py-2 bg-white border border-indigo-200 rounded text-sm hover:bg-indigo-50">正常运行 (5x3)</button>
                    <button onClick={() => start("inner")} disabled={isRunning} className="w-full py-2 bg-red-100 text-red-700 rounded text-sm font-bold border border-red-200 hover:bg-red-200">
                        Break 内层 (当列=3)
                    </button>
                    <div className="text-xs text-center text-gray-500 mt-2">
                        {breakType === 'inner' ? '每行跑到第3个就跳过该行剩下的' : '全速运行完整矩阵'}
                    </div>
                </div>

                <div className="flex-1 bg-white p-4 rounded-lg border border-indigo-100 grid grid-cols-5 gap-2">
                    {Array.from({ length: 3 }).flatMap((_, r) =>
                        Array.from({ length: 5 }).map((_, c) => {
                            const rNum = r + 1;
                            const cNum = c + 1;
                            const isCurrent = row === rNum && col === cNum;
                            const isProcessed = row > rNum || (row === rNum && col > cNum);
                            const isSkipped = breakType === "inner" && cNum >= 3; // 演示效果简化

                            let bg = "bg-gray-100";
                            if (isCurrent) bg = "bg-indigo-500 ring-2 ring-indigo-300";
                            else if (breakType === "inner" && cNum > 3) bg = "bg-gray-200 opacity-30"; // 被break掉的部分
                            else if (isProcessed) bg = "bg-green-200";

                            return (
                                <div key={`${r}-${c}`} className={`aspect-square rounded flex items-center justify-center text-xs font-mono transition-all duration-300 ${bg} ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                                    {rNum},{cNum}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

const InfiniteBreakTracer = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { n: 10, cnt: 0, desc: "初始状态" },
        { n: 10, cnt: 0, desc: "Check: N==0? (否). cnt+=1, N-=2" },
        { n: 8, cnt: 1, desc: "循环结束。N=8, cnt=1" },
        { n: 8, cnt: 1, desc: "Check: N==0? (否). cnt+=1, N-=2" },
        { n: 6, cnt: 2, desc: "循环结束。N=6, cnt=2" },
        { n: 6, cnt: 2, desc: "Check: N==0? (否). cnt+=1, N-=2" },
        { n: 4, cnt: 3, desc: "循环结束。N=4, cnt=3" },
        { n: 4, cnt: 3, desc: "Check: N==0? (否). cnt+=1, N-=2" },
        { n: 2, cnt: 4, desc: "循环结束。N=2, cnt=4" },
        { n: 2, cnt: 4, desc: "Check: N==0? (否). cnt+=1, N-=2" },
        { n: 0, cnt: 5, desc: "循环结束。N=0, cnt=5" },
        { n: 0, cnt: 5, desc: "Check: N==0? (是!). 触发 break!" },
        { n: 0, cnt: 5, desc: "跳出循环。输出 cnt = 5" },
    ];

    const current = steps[step];

    return (
        <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 my-4">
            <h3 className="font-bold text-lg text-indigo-700 mb-4 flex items-center gap-2">
                <StopCircle className="text-indigo-600" /> 真题追踪：无限循环中的急刹车
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 font-mono text-sm">
                <div className="text-gray-500 mb-2">Code:</div>
                <div>while (1) &#123;</div>
                <div className={`pl-4 ${current.desc.includes("break") ? 'bg-red-100 font-bold text-red-600' : ''}`}>if (N == 0) break;</div>
                <div className="pl-4">cnt += 1;</div>
                <div className="pl-4">N -= 2;</div>
                <div>&#125;</div>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex-1 bg-white p-3 rounded border border-indigo-100 text-center">
                    <div className="text-xs text-gray-500">变量 N</div>
                    <div className="text-2xl font-bold text-blue-600">{current.n}</div>
                </div>
                <div className="flex-1 bg-white p-3 rounded border border-indigo-100 text-center">
                    <div className="text-xs text-gray-500">计数器 cnt</div>
                    <div className="text-2xl font-bold text-green-600">{current.cnt}</div>
                </div>
            </div>

            <div className="bg-black text-yellow-400 p-3 rounded mb-4 font-mono text-sm h-12 flex items-center">
                &gt; {current.desc}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    上一步
                </button>
                <button
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={step === steps.length - 1}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                    {step === steps.length - 1 ? "演示结束" : "下一步"}
                </button>
            </div>
        </div>
    );
};

// --- 互动组件 5：真题2 逻辑表格 ---
const LogicTable = () => {
    const rows = [
        { i: 5, even: false, action: "tnt+1", tnt: 1, break: false },
        { i: 10, even: true, action: "continue", tnt: 1, break: false },
        { i: 15, even: false, action: "tnt+1", tnt: 2, break: false },
        { i: 20, even: true, action: "continue", tnt: 2, break: false },
        { i: 25, even: false, action: "tnt+1", tnt: 3, break: false },
        { i: "...", even: "", action: "...", tnt: "...", break: false },
        { i: 45, even: false, action: "tnt+1", tnt: 5, break: false },
        { i: 50, even: true, action: "continue", tnt: 5, break: false },
        { i: 55, even: false, action: "tnt+1", tnt: 6, break: ">=50! Break!" },
    ];

    return (
        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 my-4 overflow-hidden">
            <h3 className="font-bold text-lg text-yellow-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-yellow-600" /> 真题追踪：continue 和 break 混合双打
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                代码规则：从5开始，每次+5。偶数 continue (跳过)，tnt计数。当 i&gt;=50 时 break。
            </p>

            <div className="overflow-x-auto">
                <table className="w-full text-sm bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-yellow-100 text-yellow-900">
                            <th className="p-2 border">i (步长5)</th>
                            <th className="p-2 border">偶数? (continue)</th>
                            <th className="p-2 border">动作</th>
                            <th className="p-2 border">tnt (计数)</th>
                            <th className="p-2 border">i&gt;=50? (break)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx} className={`text-center ${row.break ? 'bg-red-50 font-bold border-t-2 border-red-200' : (idx % 2 === 0 ? 'bg-gray-50' : 'bg-white')}`}>
                                <td className="p-2 border font-mono">{row.i}</td>
                                <td className="p-2 border text-gray-500">{row.even === true ? "是 (跳过)" : row.even === false ? "否" : "..."}</td>
                                <td className="p-2 border text-blue-600">{row.action}</td>
                                <td className="p-2 border font-mono font-bold">{row.tnt}</td>
                                <td className={`p-2 border ${row.break ? 'text-red-600' : 'text-gray-400'}`}>{row.break ? row.break : "否"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-center bg-yellow-200 text-yellow-900 p-2 rounded font-bold">
                最终结果 tnt = 6
            </div>
        </div>
    );
};

// --- 主应用 ---
export default function App() {
    const [activeSection, setActiveSection] = useState(1);

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
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-2xl shadow-xl mb-8 flex flex-col items-center border border-blue-400/30">
                            <div className="flex gap-4 mb-6">
                                <Ban size={64} className="text-red-300 animate-pulse" />
                                <FastForward size={64} className="text-yellow-300 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2 text-blue-100 tracking-wider">GESP C++ 一级 第11课</h2>
                            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-md">循环控制</h1>
                            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
                                <span className="font-bold tracking-wide">🚧 副标题：捣蛋鬼与急刹车</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <ArrowRight className="text-blue-600" /> 教学目标
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="bg-red-100 text-red-600 p-1 rounded"><Ban size={18} /></span>
                                    理解 <code>break</code> (立刻停止) 和 <code>continue</code> (跳过这一次) 的区别。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-600 p-1 rounded"><Terminal size={18} /></span>
                                    能模拟代码执行流程，算出带有循环控制语句的最终结果。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-yellow-100 text-yellow-600 p-1 rounded"><AlertTriangle size={18} /></span>
                                    结合之前的 <code>if</code> 判断，解决 GESP 真题中的逻辑陷阱。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <BookOpen className="text-purple-500" size={32} /> 核心概念：急刹车 vs 捣蛋鬼
                        </h2>

                        <RunRaceSimulator />

                        {/* 新增：对比表格 */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
                            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                <Zap className="text-yellow-500" /> 一张表看懂区别
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            <th className="p-3 text-left rounded-l-lg">特性</th>
                                            <th className="p-3 text-left">break (破坏王)</th>
                                            <th className="p-3 text-left rounded-r-lg">continue (跳跳糖)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="p-3 font-bold text-gray-600">作用</td>
                                            <td className="p-3 text-red-600 flex items-center gap-2"><Ban size={16} /> 彻底终止循环</td>
                                            <td className="p-3 text-yellow-600 flex items-center gap-2"><FastForward size={16} /> 跳过本次，继续下次</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-gray-600">去哪了</td>
                                            <td className="p-3 text-gray-700">跳出大括号，执行循环后面的代码</td>
                                            <td className="p-3 text-gray-700">跳到循环开头 (或 i++ )，开始下一圈</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-gray-600">生活类比</td>
                                            <td className="p-3 text-gray-700">下课铃响了，全班放学</td>
                                            <td className="p-3 text-gray-700">这道题不会做，跳过做下一道</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 hover:-translate-y-1 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-red-100 p-3 rounded-full text-red-600"><Ban size={32} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">break</h3>
                                        <span className="text-xs text-red-500 font-bold uppercase">破坏王</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong className="text-red-600">彻底不干了！</strong><br />
                                    遇到它，直接跳出整个循环，剩下的圈数全部作废，直接下课。
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 hover:-translate-y-1 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><FastForward size={32} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">continue</h3>
                                        <span className="text-xs text-yellow-600 font-bold uppercase">跳跳糖</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong className="text-yellow-600">这局不算！</strong><br />
                                    遇到它，只跳过这一轮剩下的动作，赶紧去跑下一圈。
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Ban className="text-red-500" size={32} /> 演示：破坏王 break
                        </h2>
                        <GoldAppleGame />
                        <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                            <div className="text-gray-500">// 代码示例</div>
                            <div>for (int i = 1; i &lt;= 100; i++) &#123;</div>
                            <div className="pl-4">if (i == 5) &#123;</div>
                            <div className="pl-8 text-green-400">cout &lt;&lt; "找到金苹果！";</div>
                            <div className="pl-8 text-red-400 font-bold">break; <span className="text-gray-500">// 直接跳出大括号，下班！</span></div>
                            <div className="pl-4">&#125;</div>
                            <div className="pl-4">cout &lt;&lt; "检查第" &lt;&lt; i &lt;&lt; "个...";</div>
                            <div>&#125;</div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FastForward className="text-yellow-500" size={32} /> 演示：跳跳糖 continue
                        </h2>
                        <BadBeanGame />
                        <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                            <div className="text-gray-500">// 代码示例</div>
                            <div>for (int i = 1; i &lt;= 5; i++) &#123;</div>
                            <div className="pl-4">if (i == 3) &#123;</div>
                            <div className="pl-8 text-green-400">cout &lt;&lt; "坏豆子，扔掉！";</div>
                            <div className="pl-8 text-yellow-400 font-bold">continue; <span className="text-gray-500">// 下面的"吃掉"不执行了，直接i++</span></div>
                            <div className="pl-4">&#125;</div>
                            <div className="pl-4">cout &lt;&lt; "吃掉第" &lt;&lt; i &lt;&lt; "颗";</div>
                            <div>&#125;</div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Trophy className="text-yellow-500" size={32} /> 对比PK台：同一场景不同结果
                        </h2>
                        <ComparisonArena />
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm text-blue-900 mt-4">
                            <strong>👀 观察重点：</strong> 当数字数到 5 的时候，break 直接让比赛结束了（后面的数字都没了），而 continue 只是跳过了 5，后面的 6,7,8,9,10 还在！
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-orange-500" size={32} /> 避坑指南：常见误区
                        </h2>
                        <PitfallGuide />
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛑 真题实战 1：无限循环急刹车</h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-3 py-1 rounded inline-block font-mono">2023年12月 GESP 一级真题 第7题</div>
                        <InfiniteBreakTracer />
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-green-600" /> 解题思路：人脑模拟机器人</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                1. 识别陷阱：<code>while(1)</code> 是死循环，除非遇到 <code>break</code>。<br />
                                2. 寻找规律：N 从 10 开始，每次减 2 (10, 8, 6, 4, 2, 0)。cnt 负责数数。<br />
                                3. 关键时刻：当 N 变成 0 时，<code>if(N==0) break</code> 生效，循环终止。<br />
                                4. 清点：一共减了 5 次，所以 cnt 是 5。
                            </p>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">⚠️ 真题实战 2：混合双打</h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-3 py-1 rounded inline-block font-mono">2024年12月 GESP 一级真题 第10题</div>
                        <LogicTable />
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4 text-sm text-blue-900">
                            <strong>💡 发现规律：</strong><br />
                            <code>if (i % 2 == 0) continue;</code> 这句话帮我们过滤掉了所有的偶数。<br />
                            只有奇数 (5, 15, 25, 35, 45, 55...) 才能走到 <code>tnt += 1</code>。<br />
                            当走到 55 时，虽然它是奇数，但满足了 <code>i &gt;= 50</code>，触发 <code>break</code>，游戏结束。
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Layers className="text-indigo-500" size={32} /> 高级知识：嵌套循环中的 break
                        </h2>
                        <NestedLoopVisualizer />
                        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 mt-4 text-sm text-indigo-900">
                            <strong>🗝️ 关键点：</strong> break 只能跳出<strong>它所在的那一层</strong>大括号。如果你在内层循环写 break，外层循环还会继续跑！想要一次跳出所有循环，需要使用标志变量（flag）。
                        </div>
                    </div>
                );
            case 10:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <BookOpen size={100} />
                                </div>
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                                    <CheckCircle2 size={20} /> 核心考点
                                </h3>
                                <ul className="space-y-4 text-gray-700 font-medium">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-red-100 text-red-600 p-1 rounded mt-1"><Ban size={16} /></span>
                                        <div>
                                            <strong>break (红灯)：</strong><br />
                                            遇到它，整个循环彻底停止，就像下课铃响了。
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-yellow-100 text-yellow-600 p-1 rounded mt-1"><FastForward size={16} /></span>
                                        <div>
                                            <strong>continue (跳过)：</strong><br />
                                            遇到它，只跳过本轮剩下的动作，直接开始下一轮。
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <Terminal size={24} /> 课后作业
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                        <p className="font-bold text-sm mb-1">1. 修改代码</p>
                                        <p className="text-xs opacity-90">
                                            把今天第二题的代码输入电脑。如果把 <code>i += 5</code> 改成 <code>i++</code>，tnt 会变成多少？
                                        </p>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                        <p className="font-bold text-sm mb-1">2. 思考题</p>
                                        <p className="text-xs opacity-90">
                                            如果我想打印 1 到 10 之间的数字，但是不喜欢 4 和 7，该怎么用 <code>continue</code> 把它们“吃掉”？
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
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-lg z-20">
                <div className="p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2">
                        <Icon name="run" size={24} />
                        GESP C++ 一级
                    </h1>
                    <p className="text-xs text-gray-500 mt-2 bg-blue-50 inline-block px-2 py-1 rounded">第11课：循环控制</p>
                </div>
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3
                ${activeSection === section.id
                                    ? 'bg-blue-100 text-blue-800 font-bold shadow-sm ring-1 ring-blue-200'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                            <span className={`${activeSection === section.id ? 'opacity-100' : 'opacity-60'}`}>
                                <Icon name={section.icon} size={18} />
                            </span>
                            <span className="truncate">{section.title.split('：')[0]}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
                    逻辑一号老师 © 2025
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>

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