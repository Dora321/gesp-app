import React, { useState, useEffect, useRef } from 'react';
import {
    Layers, Repeat, AlertOctagon, Play, RotateCcw,
    Trophy, Code, ArrowRight, ChevronDown, Box,
    Rocket, Mic, HelpCircle, StopCircle, Sparkles,
    TrendingUp, Footprints
} from 'lucide-react';

// --- 辅助组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        "layers": <Layers size={size} className={className} />,
        "repeat": <Repeat size={size} className={className} />,
        "alert": <AlertOctagon size={size} className={className} />,
        "play": <Play size={size} className={className} />,
        "trophy": <Trophy size={size} className={className} />,
        "code": <Code size={size} className={className} />,
        "rocket": <Rocket size={size} className={className} />,
        "mic": <Mic size={size} className={className} />,
        "help": <HelpCircle size={size} className={className} />,
        "stairs": <TrendingUp size={size} className={className} />
    };
    return icons[name] || null;
};

// --- Slide 组件 ---

// 1. 故事导入：从前有座山
const StorySlide = () => {
    const [depth, setDepth] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">听不完的故事</h2>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl w-full relative overflow-hidden">
                <div className="text-lg leading-loose text-slate-700 space-y-4">
                    <p>从前有座山，山里有座庙。</p>
                    <p>庙里有个老和尚，在给小和尚讲故事。</p>
                    <p>讲的什么呢？</p>
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 text-orange-800 font-bold animate-pulse">
                        {depth === 0 ? '"从前有座山..."' :
                            depth === 1 ? '"庙里有个老和尚..."' :
                                depth === 2 ? '"在给小和尚讲故事..."' :
                                    '"哎呀，没完没了啦！😫"'}
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => setDepth((d) => (d + 1) % 4)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg flex items-center gap-2 mx-auto"
                    >
                        <Repeat size={18} /> 继续讲！
                    </button>
                </div>

                {/* 视觉背景装饰 */}
                <div className="absolute -top-10 -right-10 opacity-10">
                    <Repeat size={200} />
                </div>
            </div>

            <div className="mt-8 text-slate-500 max-w-md">
                <p className="flex items-center justify-center gap-2">
                    <Sparkles className="text-yellow-500" size={16} />
                    <strong>发现了吗？</strong> 故事里包含着故事自己，这就是<strong className="text-indigo-600 text-lg mx-1">递归</strong>！
                </p>
            </div>
        </div>
    );
};

// 2. 概念理解：俄罗斯套娃
const MatryoshkaSlide = () => {
    const [openedCount, setOpenedCount] = useState(0);
    const totalDolls = 5;

    const handleOpen = () => {
        if (openedCount < totalDolls) {
            setOpenedCount(prev => prev + 1);
        }
    };

    const reset = () => setOpenedCount(0);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">递归就像俄罗斯套娃</h3>
            <p className="text-slate-500 mb-8">每一层都包含一个更小的自己，直到最小的那个出现。</p>

            <div className="relative h-64 w-full flex items-center justify-center">
                {/* 生成娃娃 */}
                {Array.from({ length: totalDolls }).map((_, index) => {
                    const size = 240 - index * 40; // 娃娃大小递减
                    const isVisible = index >= openedCount; // 是否显示
                    const isSmallest = index === totalDolls - 1;

                    if (!isVisible && !isSmallest) return null; // 已打开的且不是最小的不渲染（或者可以做成打开的状态）

                    // 如果已经打开到这一层，显示打开状态（这里简化为消失显示下一层）
                    // 我们只渲染当前应该显示的那个娃娃
                    if (index !== openedCount) return null;

                    return (
                        <div
                            key={index}
                            onClick={handleOpen}
                            className={`
                absolute transition-all duration-500 cursor-pointer flex flex-col items-center justify-center
                hover:scale-105
              `}
                            style={{
                                width: size,
                                height: size * 1.4,
                                zIndex: totalDolls - index
                            }}
                        >
                            <div className={`
                w-full h-full rounded-[45%] border-4 shadow-xl flex items-center justify-center text-white font-bold text-2xl relative overflow-hidden
                ${index % 2 === 0 ? 'bg-red-500 border-red-700' : 'bg-blue-500 border-blue-700'}
              `}>
                                {/* 娃娃脸部 */}
                                <div className="absolute top-[15%] w-[60%] h-[30%] bg-white/90 rounded-full"></div>
                                {/* 装饰花纹 */}
                                <div className="absolute bottom-[20%] text-4xl opacity-50">🌸</div>

                                {isSmallest ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 text-yellow-900 text-center p-2 text-sm">
                                        最小了！<br />没有了！<br />(出口)
                                    </div>
                                ) : (
                                    <span className="mt-20">点我</span>
                                )}
                            </div>
                        </div>
                    );
                })}

                {openedCount === totalDolls && (
                    <div className="absolute animate-bounce-short">
                        <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-xl text-yellow-800 font-bold shadow-lg">
                            🎉 找到了最核心的宝藏！<br />
                            <span className="text-xs font-normal">这就是递归的“终止条件” (Base Case)</span>
                        </div>
                        <button onClick={reset} className="mt-4 px-4 py-2 bg-slate-200 rounded-full text-slate-600 text-sm hover:bg-slate-300 mx-auto block">
                            重玩一次
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 max-w-lg w-full">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm">
                    <strong className="text-blue-700 block mb-1">递 (Recurse)</strong>
                    一层层打开，大娃娃调用小娃娃。
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-sm">
                    <strong className="text-green-700 block mb-1">归 (Return)</strong>
                    到底了之后，再一层层把盖子盖回去。
                </div>
            </div>
        </div>
    );
};

// 3. 代码初体验与死循环
const CodeSlide = () => {
    const [crashed, setCrashed] = useState(false);

    const runCode = () => {
        setCrashed(true);
        setTimeout(() => setCrashed(false), 2000); // 2秒后恢复
    };

    return (
        <div className={`flex flex-col items-center justify-center h-full transition-all duration-100 ${crashed ? 'animate-shake bg-red-50' : ''}`}>
            <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8 items-center">

                {/* 代码区 */}
                <div className="bg-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex gap-1.5 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="font-mono text-sm md:text-base leading-relaxed text-slate-300">
                        <p><span className="text-purple-400">def</span> <span className="text-yellow-400">sleep</span>():</p>
                        <p className="pl-4 text-gray-500"># 这是一个想睡觉的函数</p>
                        <p className="pl-4">print(<span className="text-green-300">"Zzz..."</span>)</p>
                        <p className="pl-4 bg-red-500/20 text-red-200 rounded px-1">sleep() <span className="text-gray-400 animate-pulse">&lt;-- 自己调用自己！</span></p>
                    </div>

                    <button
                        onClick={runCode}
                        disabled={crashed}
                        className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {crashed ? '系统崩溃中...' : <><Play size={16} /> 运行代码</>}
                    </button>
                </div>

                {/* 结果演示区 */}
                <div className="text-center">
                    {!crashed ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-800">这是最简单的递归代码</h3>
                            <p className="text-slate-600">函数 <code className="bg-slate-100 px-1 rounded font-mono text-yellow-600 font-bold">sleep</code> 里面又喊了 <code className="bg-slate-100 px-1 rounded font-mono text-yellow-600 font-bold">sleep</code>。</p>
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
                                <AlertOctagon className="inline-block mr-1 mb-1" size={16} />
                                <strong>猜猜看：</strong> 如果点击运行，什么时候会停下来？
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in zoom-in duration-300">
                            <div className="text-6xl">😵💫</div>
                            <h3 className="text-2xl font-extrabold text-red-600">电脑累晕了！(Stack Overflow)</h3>
                            <p className="text-red-800 font-medium">因为它永远停不下来！就像那个永远讲不完的故事。</p>
                            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-500 border border-slate-200">
                                RecursionError: maximum recursion depth exceeded
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. 正确的递归：倒计时火箭
const RocketSlide = () => {
    const [count, setCount] = useState(null); // null means not started
    const [stack, setStack] = useState([]);
    const [isLaunching, setIsLaunching] = useState(false);
    const [logs, setLogs] = useState([]);

    // 模拟递归的异步过程
    const startCountdown = async (n) => {
        if (isLaunching) return;
        setIsLaunching(true);
        setCount(n);
        setStack([]);
        setLogs([]);

        await recursiveStep(n);

        setIsLaunching(false);
    };

    const recursiveStep = async (n) => {
        // 1. 压栈 (Call)
        setStack(prev => [...prev, n]);
        addLog(`➡️ 调用 count(${n})`);
        setCount(n);

        await new Promise(r => setTimeout(r, 800)); // 慢动作

        if (n === 0) {
            // Base Case
            addLog(`✨ n=0! 到达出口！点火！`);
        } else {
            // Recursive Step
            await recursiveStep(n - 1);
        }

        // 2. 出栈 (Return)
        setStack(prev => prev.slice(0, -1));
        if (n > 0) addLog(`⬅️ count(${n}) 任务结束，返回`);

        await new Promise(r => setTimeout(r, 400));
    };

    const addLog = (msg) => {
        setLogs(prev => [...prev.slice(-4), msg]); // 只保留最近5条
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <Rocket className="text-red-500" /> 递归倒计时
                </h3>
                <p className="text-slate-500 text-sm">必须要有一个<span className="text-red-500 font-bold bg-red-50 px-1 rounded">出口 (n=0)</span>，不然火箭发不出去！</p>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-6 min-h-0">
                {/* 左侧：可视化区 */}
                <div className="bg-slate-900 rounded-xl p-6 relative flex flex-col items-center justify-center border-2 border-slate-700">
                    {/* Stack Visualization */}
                    <div className="flex flex-col-reverse gap-2 w-full max-w-[120px] mb-4 h-64 justify-start overflow-hidden">
                        {stack.map((n, i) => (
                            <div key={i} className="bg-blue-600 text-white p-2 rounded text-center border-2 border-blue-400 shadow-lg animate-in slide-in-from-top duration-300">
                                count({n})
                            </div>
                        ))}
                        {stack.length > 0 && <div className="text-slate-500 text-xs text-center pb-1">任务堆栈</div>}
                    </div>

                    {/* Rocket Display */}
                    <div className="absolute top-4 right-4 text-center">
                        {count === 0 ? (
                            <div className="text-6xl animate-bounce">🚀</div>
                        ) : (
                            <div className="text-4xl font-mono text-yellow-400 font-bold border-4 border-yellow-600 rounded-lg p-2 bg-black">
                                {count === null ? 'READY' : count}
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded text-green-400 font-mono text-xs h-24 overflow-hidden">
                        {logs.map((log, i) => <div key={i}>{log}</div>)}
                    </div>
                </div>

                {/* 右侧：代码与控制 */}
                <div className="flex flex-col justify-center gap-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 font-mono text-sm">
                        <div><span className="text-purple-600">def</span> <span className="text-blue-600">countdown</span>(n):</div>
                        <div className="pl-4">print(n)</div>
                        <div className="pl-4 group relative">
                            <span className="text-purple-600">if</span> n == <span className="text-orange-500">0</span>: <span className="text-slate-400">// 出口</span>
                            <div className="pl-4"><span className="text-green-600">print</span>("发射!")</div>
                            {count === 0 && <div className="absolute left-0 top-0 w-full h-full bg-yellow-200/30 animate-pulse rounded"></div>}
                        </div>
                        <div className="pl-4 group relative">
                            <span className="text-purple-600">else</span>:
                            <div className="pl-4">
                                <span className="text-blue-600">countdown</span>(n - 1) <span className="text-slate-400">// 只有这行在变！</span>
                            </div>
                            {count !== null && count > 0 && <div className="absolute left-0 top-0 w-full h-full bg-blue-200/30 animate-pulse rounded"></div>}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        {[3, 5, 10].map(n => (
                            <button
                                key={n}
                                disabled={isLaunching}
                                onClick={() => startCountdown(n)}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-bold disabled:opacity-50 transition-colors"
                            >
                                从 {n} 开始
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. 新增：爬楼梯（斐波那契）
const StairsSlide = () => {
    const [stairs, setStairs] = useState(4); // 默认 4 层
    const [highlight, setHighlight] = useState(null); // 'n-1' or 'n-2'

    // 计算斐波那契（走法）
    const getWays = (n) => {
        if (n <= 1) return 1;
        let a = 1, b = 1; // f(0)=1 (start), f(1)=1
        for (let i = 2; i <= n; i++) {
            let temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    };

    const ways = getWays(stairs);
    const waysMinus1 = getWays(stairs - 1);
    const waysMinus2 = getWays(stairs - 2);

    return (
        <div className="flex flex-col h-full gap-6 items-center">
            <div className="text-center max-w-2xl">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <TrendingUp className="text-green-600" /> 魔法楼梯 (斐波那契)
                </h3>
                <p className="text-slate-600 mt-2">
                    小兔子想跳到第 <strong>{stairs}</strong> 层。每次只能跳 <span className="font-bold bg-blue-100 text-blue-700 px-1 rounded">1步</span> 或 <span className="font-bold bg-purple-100 text-purple-700 px-1 rounded">2步</span>。
                </p>
            </div>

            <div className="flex-1 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                {/* 左侧：楼梯演示 */}
                <div className="relative bg-sky-50 rounded-xl p-8 h-80 flex flex-col justify-end items-center border border-sky-100 shadow-inner overflow-hidden">
                    {/* 楼梯绘制 */}
                    <div className="relative w-full h-full flex items-end justify-center">
                        {Array.from({ length: stairs + 1 }).map((_, i) => {
                            // 0 is ground
                            const isTarget = i === stairs;
                            const isPrev1 = i === stairs - 1;
                            const isPrev2 = i === stairs - 2;

                            let styleClass = "bg-white border-2 border-slate-300";
                            if (isTarget) styleClass = "bg-yellow-200 border-yellow-400 shadow-lg z-10";
                            if (highlight === 'n-1' && isPrev1) styleClass = "bg-blue-200 border-blue-400 shadow-md";
                            if (highlight === 'n-2' && isPrev2) styleClass = "bg-purple-200 border-purple-400 shadow-md";

                            return (
                                <div
                                    key={i}
                                    className={`absolute bottom-0 w-20 transition-all duration-300 flex items-center justify-center font-bold text-slate-500 rounded-t-lg ${styleClass}`}
                                    style={{
                                        height: `${(i) * 15 + 10}%`,
                                        left: `calc(50% + ${(i - stairs / 2) * 40}px)`,
                                        zIndex: i
                                    }}
                                >
                                    {i === 0 ? '地面' : `${i}层`}

                                    {isTarget && <div className="absolute -top-12 text-4xl animate-bounce">🐰</div>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="absolute top-4 left-4 bg-white/80 p-2 rounded backdrop-blur-sm text-xs text-slate-500">
                        想去第 {stairs} 层，<br />要么从 {stairs - 1} 层跳上来，<br />要么从 {stairs - 2} 层跳上来！
                    </div>
                </div>

                {/* 右侧：公式推导 */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center">
                        <h4 className="text-4xl font-bold text-slate-800 mb-2">{ways} <span className="text-base font-normal text-slate-500">种走法</span></h4>
                        <div className="text-sm text-slate-400 font-mono">ways({stairs})</div>
                    </div>

                    <div className="flex gap-4 items-center justify-center">
                        <div
                            className="flex-1 bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border border-blue-200 cursor-pointer transition-colors text-center group"
                            onMouseEnter={() => setHighlight('n-1')}
                            onMouseLeave={() => setHighlight(null)}
                        >
                            <div className="text-xs text-blue-500 font-bold mb-1">从 n-1 层 (1步)</div>
                            <div className="text-xl font-bold text-blue-800">{waysMinus1} 种</div>
                            <div className="text-xs text-slate-400 mt-1 font-mono">ways({stairs - 1})</div>
                            <Footprints className="mx-auto mt-2 text-blue-300 group-hover:text-blue-500" size={16} />
                        </div>

                        <div className="text-slate-400 font-bold text-xl">+</div>

                        <div
                            className="flex-1 bg-purple-50 hover:bg-purple-100 p-4 rounded-xl border border-purple-200 cursor-pointer transition-colors text-center group"
                            onMouseEnter={() => setHighlight('n-2')}
                            onMouseLeave={() => setHighlight(null)}
                        >
                            <div className="text-xs text-purple-500 font-bold mb-1">从 n-2 层 (2步)</div>
                            <div className="text-xl font-bold text-purple-800">{waysMinus2} 种</div>
                            <div className="text-xs text-slate-400 mt-1 font-mono">ways({stairs - 2})</div>
                            <div className="flex justify-center mt-2 gap-1 text-purple-300 group-hover:text-purple-500">
                                <Footprints size={16} />
                                <Footprints size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm shadow-md">
                        <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-2">
                            <Code size={14} /> Python 代码
                        </div>
                        <div><span className="text-purple-400">def</span> <span className="text-yellow-400">climb</span>(n):</div>
                        <div className="pl-4 text-slate-500"># 走到头了</div>
                        <div className="pl-4"><span className="text-purple-400">if</span> n &lt;= 2: <span className="text-purple-400">return</span> n</div>
                        <div className="pl-4 text-slate-500"># 递归公式 f(n) = f(n-1) + f(n-2)</div>
                        <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-blue-300">climb</span>(n-1) + <span className="text-blue-300">climb</span>(n-2)</div>
                    </div>

                    <div className="flex items-center gap-2 justify-center">
                        <span className="text-sm font-bold text-slate-600">层数：</span>
                        {[3, 4, 5, 6].map(n => (
                            <button
                                key={n}
                                onClick={() => setStairs(n)}
                                className={`w-8 h-8 rounded-full font-bold text-sm transition-all ${stairs === n ? 'bg-green-600 text-white scale-110 shadow' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 6. 课间小测验
const QuizSlide = () => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const questions = [
        {
            id: 1,
            question: "如果写递归函数忘记写“出口条件”（Base Case），会发生什么？",
            options: [
                "A. 电脑会关机睡觉",
                "B. 程序会一直运行，直到报错（死循环）",
                "C. 电脑会爆炸 💥"
            ],
            correct: 1,
            explanation: "答对啦！无限调用会耗尽内存，导致 Stack Overflow（栈溢出）。"
        },
        {
            id: 2,
            question: "在这个课程的“跳楼梯”问题中，跳到第 4 层一共有多少种跳法？",
            options: [
                "A. 3 种",
                "B. 5 种",
                "C. 8 种"
            ],
            correct: 1,
            explanation: "bingo！还记得公式吗？f(4) = f(3) + f(2) = 3 + 2 = 5。"
        },
        {
            id: 3,
            question: "下面哪个成语最能体现“递归”的思想？",
            options: [
                "A. 愚公移山 (子又生孙，孙又生子)",
                "B. 刻舟求剑",
                "C. 掩耳盗铃"
            ],
            correct: 0,
            explanation: "没错！愚公移山中“子子孙孙无穷匮也”就是一种递归的延续。"
        },
        {
            id: 4,
            question: "在编程中，递归函数必须包含的两个部分是？",
            options: [
                "A. 循环和判断",
                "B. 变量和常量",
                "C. 终止条件(出口) 和 自身调用"
            ],
            correct: 2,
            explanation: "非常关键！没有出口就是死循环，没有自身调用就不是递归。"
        }
    ];

    const handleOptionClick = (index) => {
        if (showExplanation) return; // Prevent changing answer after selection
        setSelectedOption(index);
        setShowExplanation(true);
        if (index === questions[currentQIndex].correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQIndex(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setScore(0);
        setFinished(false);
    };

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-100 p-10 w-full animate-in zoom-in duration-300">
                    <Trophy className="mx-auto text-yellow-400 mb-4" size={64} />
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">挑战完成！</h3>
                    <p className="text-slate-500 mb-8">你的得分是</p>

                    <div className="text-6xl font-black text-indigo-600 mb-8">
                        {score} <span className="text-2xl text-slate-400 font-normal">/ {questions.length}</span>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetQuiz}
                            className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                        >
                            <RotateCcw size={18} /> 再来一次
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correct;

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 overflow-hidden w-full transition-all duration-300">
                <div className="bg-indigo-600 px-6 py-4 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-300" size={24} />
                        <span className="font-bold text-lg">递归侦探挑战</span>
                    </div>
                    <div className="bg-indigo-700/50 px-3 py-1 rounded-full text-sm font-mono">
                        {currentQIndex + 1} / {questions.length}
                    </div>
                </div>

                <div className="p-8">
                    <p className="text-xl text-slate-800 font-bold mb-8 leading-relaxed">
                        {currentQ.question}
                    </p>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => {
                            let stateStyle = "border-slate-100 hover:border-indigo-300 hover:bg-indigo-50";

                            if (showExplanation) {
                                if (index === currentQ.correct) {
                                    stateStyle = "bg-green-100 border-green-400 text-green-800"; // Correct answer always highlighted
                                } else if (index === selectedOption) {
                                    stateStyle = "bg-red-50 border-red-200 text-red-800"; // Wrong selection
                                } else {
                                    stateStyle = "opacity-50 border-slate-100"; // Other options faded
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={showExplanation}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium ${stateStyle}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {showExplanation && (
                        <div className="mt-8 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
                                <div className="flex items-start gap-3">
                                    {isCorrect ? <CheckCircle className="shrink-0 mt-0.5" /> : <StopCircle className="shrink-0 mt-0.5" />}
                                    <div>
                                        <div className="font-bold text-lg mb-1">{isCorrect ? '回答正确！' : '再接再厉！'}</div>
                                        <p>{currentQ.explanation}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                                {currentQIndex < questions.length - 1 ? '下一题' : '查看结果'} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Layout Component ---

const sections = [
    { id: 1, title: '听不完的故事', icon: 'repeat', component: StorySlide },
    { id: 2, title: '套娃玩具', icon: 'layers', component: MatryoshkaSlide },
    { id: 3, title: '晕倒的电脑', icon: 'alert', component: CodeSlide },
    { id: 4, title: '火箭发射实战', icon: 'rocket', component: RocketSlide },
    { id: 5, title: '魔法楼梯挑战', icon: 'stairs', component: StairsSlide }, // 新增章节
    { id: 6, title: '小侦探测验', icon: 'trophy', component: QuizSlide },
];

const Lesson3 = () => {
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            {/* 侧边栏 */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-20 flex-shrink-0">
                <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-indigo-50 to-white">
                    <h1 className="text-lg font-bold flex items-center gap-2 text-indigo-700">
                        <span className="bg-indigo-600 text-white p-1 rounded">Python</span>
                        <span>趣味魔法</span>
                    </h1>
                    <p className="text-xs text-indigo-400 mt-2 font-medium pl-1">第 3 课：无限套娃 🪆</p>
                </div>

                <div className="flex-1 overflow-y-auto w-full py-2 custom-scrollbar">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-5 py-3 transition-all duration-200 flex items-center gap-3 border-l-4 group relative
                ${activeSection === section.id
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold shadow-sm'
                                    : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300'
                                }`}
                        >
                            <div className={`
                p-1.5 rounded-lg transition-colors flex-shrink-0
                ${activeSection === section.id ? 'bg-white text-indigo-500 shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'}
              `}>
                                <Icon name={section.icon} size={16} />
                            </div>
                            <span className="truncate text-sm font-medium">{section.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 shadow-sm h-16 flex items-center justify-between px-6 z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <Icon name={sections.find(s => s.id === activeSection)?.icon} size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 truncate">
                            {sections.find(s => s.id === activeSection)?.title}
                        </h2>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveSection(Math.max(1, activeSection - 1))}
                            disabled={activeSection === 1}
                            className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-1"
                        >
                            <ChevronDown className="rotate-90" size={16} /> 上一步
                        </button>
                        <button
                            onClick={() => setActiveSection(Math.min(sections.length, activeSection + 1))}
                            disabled={activeSection === sections.length}
                            className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 font-medium flex items-center gap-1"
                        >
                            下一步 <ArrowRight size={16} />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    <div className="max-w-5xl mx-auto h-full flex flex-col">
                        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                            <ActiveComponent />
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
        </div>
    );
};

// 简单的 CheckCircle Icon 组件，用于 QuizSlide
const CheckCircle = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default Lesson3;