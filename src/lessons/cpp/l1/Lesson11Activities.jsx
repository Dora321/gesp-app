import { useEffect, useState } from 'react';
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
import CodeSnippet from '../CodeSnippet';

// --- 图标映射组件 ---
export const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
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

// --- 互动组件 1：酷跑大赛模拟器 ---
export const RunRaceSimulator = () => {
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
export const GoldAppleGame = () => {
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
export const BadBeanGame = () => {
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
export const ComparisonArena = () => {
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
export const PitfallGuide = () => {
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
                <CodeSnippet className="mb-4" code={pitfalls[activeTab].code} />
                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg text-red-700 text-sm">
                    <Zap className="shrink-0 mt-0.5" size={16} />
                    {pitfalls[activeTab].tip}
                </div>
            </div>
        </div>
    );
};

// --- 互动组件：嵌套循环可视化 ---
export const NestedLoopVisualizer = () => {
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

export const InfiniteBreakTracer = () => {
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
export const LogicTable = () => {
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
