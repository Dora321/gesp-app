import React, { useState, useEffect, useRef } from 'react';
import {
    Layers, Repeat, AlertOctagon, Play, RotateCcw,
    Trophy, Code, ArrowRight, ChevronDown, Box,
    Rocket, Mic, HelpCircle, StopCircle, Sparkles,
    TrendingUp, Footprints, Menu, X, Lock, Unlock,
    Search, Binary, Key
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PythonProjectSupport from '../../../components/PythonProjectSupport';

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
        "stairs": <TrendingUp size={size} className={className} />,
        "lock": <Lock size={size} className={className} />,
        "coin": <Box size={size} className={className} />, // Using Box as generic if Coins not avail, but let's try to match style
        "search": <Search size={size} className={className} />
    };
    return icons[name] || null;
};

// --- Slide 组件 ---

// 0. 课程简介
const IntroSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h1 className="text-4xl font-black text-slate-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            编程的三种“超能力”
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            写代码不只是打字，更是解决问题的艺术。在这一章，我们将解锁三种最核心的算法思维，哪怕是未来的 AI 专家，也离不开它们！
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="font-bold text-lg text-slate-800">枚举 (Enumeration)</h3>
                <p className="text-sm text-slate-500 mt-2">大力出奇迹！只要试的够快，没有解不开的锁。</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">🦊</div>
                <h3 className="font-bold text-lg text-slate-800">贪心 (Greedy)</h3>
                <p className="text-sm text-slate-500 mt-2">活在当下！每次都选眼前看起来最好的。</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">🪆</div>
                <h3 className="font-bold text-lg text-slate-800">递归 (Recursion)</h3>
                <p className="text-sm text-slate-500 mt-2">无限套娃！把大问题把变成小问题。</p>
            </div>
        </div>
        <div className="mt-12 animate-bounce text-slate-400 text-sm">点击“下一步”开始修炼 👇</div>
    </div>
);

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

// 6. Enumeration Sub-slides

// 6.1 概念: 寻找宝藏
const EnumConceptSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h3 className="text-3xl font-bold text-slate-800 mb-6">什么是枚举？</h3>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl">
            枚举 (Enumeration) 就是<span className="text-indigo-600 font-bold mx-1">逐个尝试</span>所有可能的答案，直到找到正确的那个。
            虽然看起来很“笨”，但对于计算机来说，这往往是最简单有效的方法！
        </p>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-3xl animate-in zoom-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    {i === 7 ? '💎' : '📦'}
                </div>
            ))}
        </div>
        <div className="bg-indigo-50 px-6 py-3 rounded-full text-indigo-700 font-bold animate-bounce">
            一个个通过，绝对不会漏掉宝藏！
        </div>
    </div>
);

// 6.2 暴力破解 (Original EnumerationSlide)
const EnumCrackerSlide = () => {
    const [password, setPassword] = useState([7, 3, 9]); // 目标密码
    const [currentTry, setCurrentTry] = useState([0, 0, 0]);
    const [isCracking, setIsCracking] = useState(false);
    const [found, setFound] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const startCracking = async () => {
        if (isCracking) return;
        setIsCracking(true);
        setFound(false);
        setAttempts(0);

        for (let i = 0; i <= 999; i++) {
            const d1 = Math.floor(i / 100);
            const d2 = Math.floor((i % 100) / 10);
            const d3 = i % 10;
            const current = [d1, d2, d3];

            setCurrentTry(current);
            setAttempts(i + 1);

            if (d1 === password[0] && d2 === password[1] && d3 === password[2]) {
                setFound(true);
                setIsCracking(false);
                return;
            }

            if (i % 3 === 0) await new Promise(r => setTimeout(r, 10)); // UI Throttle
        }
        setIsCracking(false);
    };

    const reset = () => {
        setIsCracking(false);
        setFound(false);
        setCurrentTry([0, 0, 0]);
        setAttempts(0);
        const newPass = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        setPassword(newPass);
    };

    return (
        <div className="flex flex-col h-full items-center gap-6">
            <div className="text-center max-w-2xl">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <Lock className="text-red-500" /> 暴力破解 (枚举算法)
                </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-4xl flex-1">
                {/* 密码锁展示 */}
                <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative border-4 border-slate-600">
                    <div className="text-slate-400 mb-4 font-mono text-sm">SECURE VAULT v1.0</div>
                    <div className="flex gap-4 mb-8 bg-black/30 p-4 rounded-xl">
                        {currentTry.map((num, i) => (
                            <div key={i} className="w-16 h-20 bg-gradient-to-b from-slate-100 to-slate-300 rounded-lg flex items-center justify-center text-4xl font-mono font-bold text-slate-800 shadow-inner border border-slate-400 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20"></div>
                                {num}
                            </div>
                        ))}
                    </div>
                    {found && (
                        <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold animate-bounce flex items-center gap-2">
                            <Unlock size={20} /> 破解成功!
                        </div>
                    )}
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 right-4 text-xs font-mono text-green-400">
                        Attempts: {attempts}
                    </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow border border-slate-200 font-mono text-sm">
                        <div className="text-slate-400"># 暴力枚举脚本</div>
                        <div><span className="text-purple-600">for</span> i <span className="text-purple-600">in</span> range(<span className="text-orange-500">1000</span>):</div>
                        <div className="pl-4">keyword = try_unlock(i)</div>
                        <div className="pl-4"><span className="text-purple-600">if</span> keyword == <span className="text-green-600">True</span>:</div>
                        <div className="pl-8"><span className="text-blue-600">print</span>("Open!")</div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button onClick={startCracking} disabled={isCracking || found} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                            {!isCracking ? <><Play size={20} /> 开始破解</> : '破解进行中...'}
                        </button>
                        <button onClick={reset} disabled={isCracking} className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                            <RotateCcw size={18} /> 重置
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 6.3 鸡兔同笼 (Chickens and Rabbits)
const EnumChickenSlide = () => {
    const [heads] = useState(35);
    const [feet] = useState(94);
    const [solution, setSolution] = useState(null); // {chickens, rabbits}
    const [currentCheck, setCurrentCheck] = useState(null); // {c, r}
    const [isSolving, setIsSolving] = useState(false);

    const solve = async () => {
        if (isSolving) return;
        setIsSolving(true);
        setSolution(null);
        setCurrentCheck(null);

        // 枚举循环：假设鸡有 i 只
        // 那么兔就有 heads - i 只
        // 检查脚的总数是否匹配
        for (let c = 0; c <= heads; c++) {
            let r = heads - c;
            setCurrentCheck({ c, r });

            if (c * 2 + r * 4 === feet) {
                setSolution({ c, r });
                setIsSolving(false);
                return;
            }
            // Visualization Delay
            await new Promise(res => setTimeout(res, 50));
        }
        setIsSolving(false);
    };

    return (
        <div className="flex flex-col h-full items-center gap-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800">鸡兔同笼问题</h3>
                <p className="text-slate-600">如果有 {heads} 个头，{feet} 只脚，其实不用列方程，计算机可以<span className="font-bold text-indigo-600">一个个试</span>出来！</p>
            </div>

            <div className="flex-1 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                {/* Visual Area */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200 relative min-h-[300px] flex flex-col items-center justify-center">
                    {currentCheck ? (
                        <div className="text-center animate-in zoom-in duration-100">
                            <div className="text-6xl mb-4 font-black text-slate-800 flex justify-center gap-8">
                                <div className="flex flex-col items-center">
                                    <span>🐔</span>
                                    <span className="text-xl mt-2">{currentCheck.c} 只</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>🐇</span>
                                    <span className="text-xl mt-2">{currentCheck.r} 只</span>
                                </div>
                            </div>
                            <div className="bg-white px-6 py-2 rounded-full shadow-sm inline-block">
                                <span className="font-bold text-slate-500">脚的数量: </span>
                                <span className={`font-mono font-bold text-xl ${solution ? 'text-green-600' : 'text-orange-500'}`}>
                                    {currentCheck.c * 2 + currentCheck.r * 4}
                                </span>
                                <span className="text-slate-400 mx-2">/</span>
                                <span className="text-slate-400">{feet}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-400 text-center">
                            <div className="text-6xl mb-4 opacity-50">🐔🐇❓</div>
                            点击“开始计算”找出答案
                        </div>
                    )}

                    {solution && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[1px] rounded-2xl">
                            <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-green-500 animate-bounce">
                                <h4 className="text-2xl font-bold text-green-700 mb-2">找到啦！🎉</h4>
                                <div className="text-lg">鸡: <strong>{solution.c}</strong>, 兔: <strong>{solution.r}</strong></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Control Area */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow border border-slate-200 font-mono text-sm">
                        <div><span className="text-purple-600">for</span> chicken <span className="text-purple-600">in</span> range(<span className="text-orange-500">{heads + 1}</span>):</div>
                        <div className="pl-4">rabbit = {heads} - chicken</div>
                        <div className="pl-4"><span className="text-purple-600">if</span> (chicken*2 + rabbit*4) == <span className="text-blue-600">{feet}</span>:</div>
                        <div className="pl-8"><span className="text-green-600">print</span>("Found it!")</div>
                    </div>

                    <button
                        onClick={solve}
                        disabled={isSolving}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSolving ? '正在一个个试...' : <><Play size={18} /> 开始枚举计算</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

// 6.4 枚举综合页 (Enum Tabbed Slide)
const EnumerationSlide = () => {
    const [activeTab, setActiveTab] = useState('concept');
    const tabs = [
        { id: 'concept', label: '🔍 什么是枚举', icon: 'search' },
        { id: 'cracker', label: '🔓 暴力破解', icon: 'lock' },
        { id: 'chicken', label: '🐇 鸡兔同笼', icon: 'help' }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-red-100 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <div key={activeTab} className="h-full animate-in fade-in zoom-in duration-300">
                    {activeTab === 'concept' && <EnumConceptSlide />}
                    {activeTab === 'cracker' && <EnumCrackerSlide />}
                    {activeTab === 'chicken' && <EnumChickenSlide />}
                </div>
            </div>
        </div>
    );
};

// 7. Greedy Sub-slides

// 7.1 概念: 贪吃的小老鼠
const GreedyConceptSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h3 className="text-3xl font-bold text-slate-800 mb-6">什么是贪心？</h3>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl">
            贪心算法 (Greedy) 就像一只<span className="text-orange-500 font-bold mx-1">贪吃的小老鼠</span>，
            每次只看眼前，哪块蛋糕最大就拿哪块，从来不考虑以后。
        </p>

        <div className="flex items-end justify-center gap-2 h-40 mb-12">
            {[20, 40, 60, 100, 30].map((h, i) => (
                <div key={i} className={`w-12 bg-yellow-200 rounded-t-lg relative border-2 border-yellow-400 transition-all hover:bg-yellow-300 ${h === 100 ? 'animate-bounce shadow-xl bg-yellow-400' : 'opacity-70'}`} style={{ height: `${h}%` }}>
                    {h === 100 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl">🐭</div>
                    )}
                </div>
            ))}
        </div>
        <div className="bg-orange-50 px-6 py-3 rounded-full text-orange-700 font-bold">
            "我就要最大的！现在就要！"
        </div>
    </div>
);

// 7.2 找零钱 (Original GreedySlide)
const GreedyCoinsSlide = () => {
    const [amount, setAmount] = useState(46);
    const [coins, setCoins] = useState([]);
    const availableCoins = [25, 10, 5, 1];

    const currentTotal = coins.reduce((a, b) => a + b, 0);
    const remaining = amount - currentTotal;
    const isComplete = remaining === 0;

    const addCoin = (value) => {
        if (remaining >= value) {
            setCoins([...coins, value]);
        }
    };

    const autoGreedy = async () => {
        setCoins([]);
        let rem = amount;
        let newCoins = [];
        const delay = (ms) => new Promise(r => setTimeout(r, ms));

        while (rem > 0) {
            for (let coin of availableCoins) {
                if (rem >= coin) {
                    newCoins.push(coin);
                    setCoins([...newCoins]);
                    rem -= coin;
                    await delay(500);
                    break;
                }
            }
        }
    };

    const reset = () => {
        setCoins([]);
        setAmount(Math.floor(Math.random() * 50) + 20);
    };

    return (
        <div className="flex flex-col h-full items-center gap-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <Box className="text-yellow-500" /> 贪心算法: 找零钱
                </h3>
            </div>

            <div className="flex-1 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
                {/* 交互区 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <div className="text-sm text-slate-500">目标金额</div>
                            <div className="text-4xl font-black text-slate-800">{amount}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-slate-500">还需要凑</div>
                            <div className={`text-4xl font-black ${remaining === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {remaining}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex gap-4 justify-center">
                            {availableCoins.map(coin => (
                                <button
                                    key={coin}
                                    onClick={() => addCoin(coin)}
                                    disabled={remaining < coin}
                                    className={`
                                        w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md border-4 transition-all
                                        ${remaining >= coin ? 'bg-yellow-100 border-yellow-400 text-yellow-700 hover:scale-110 active:scale-95' : 'bg-slate-100 border-slate-200 text-slate-300 opacity-50'}
                                    `}
                                >
                                    {coin}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-300 min-h-[120px] flex flex-wrap gap-2 justify-center content-start">
                        {coins.map((c, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-yellow-400 text-yellow-900 border-2 border-yellow-600 flex items-center justify-center font-bold text-sm shadow-sm animate-in zoom-in">
                                {c}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 说明与自动演示 */}
                <div className="space-y-6">
                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                        <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                            <Sparkles size={18} /> 贪心策略
                        </h4>
                        <p className="text-sm text-indigo-900">
                            只要能拿大面值的，绝不拿小的。这种策略在找零钱问题中通常是最优的。
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={autoGreedy}
                            disabled={coins.length > 0 && !isComplete}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Rocket size={18} /> 自动演示
                        </button>
                        <button onClick={reset} className="px-6 py-3 bg-white border border-slate-300 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                            <RotateCcw size={18} />
                        </button>
                    </div>

                    {isComplete && (
                        <div className="bg-green-100 text-green-800 p-4 rounded-xl border border-green-200 flex items-center gap-3 animate-in slide-in-from-bottom">
                            <Trophy className="text-green-600" size={24} />
                            <div>
                                <div className="font-bold">完成！</div>
                                <div className="text-sm">共用了 {coins.length} 枚硬币。</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 7.3 贪心的陷阱 (The Trap)
const GreedyTrapSlide = () => {
    const [path, setPath] = useState(null); // 'greedy' or 'smart'

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">贪心总是对的吗？</h3>
            <p className="text-slate-600 mb-8">有时候，只顾眼前的利益，反而会错过更长远的目标。</p>

            <div className="relative w-full max-w-2xl h-64 bg-slate-100 rounded-2xl border-4 border-slate-300 p-4 flex items-center justify-between">

                {/* Start */}
                <div className="w-16 h-16 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold z-10 shadow-lg">Start</div>

                {/* Path A (Greedy) */}
                <div
                    onClick={() => setPath('greedy')}
                    className={`absolute top-1/4 left-1/4 w-1/2 h-2 rounded-full cursor-pointer transition-all ${path === 'greedy' ? 'bg-red-500 h-4' : 'bg-slate-300 hover:bg-red-200'}`}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 rounded border border-slate-200 text-xs text-slate-500">
                        消耗 1
                    </div>
                </div>

                {/* Path B (Smart) */}
                <div
                    onClick={() => setPath('smart')}
                    className={`absolute bottom-1/4 left-1/4 w-1/2 h-2 rounded-full cursor-pointer transition-all ${path === 'smart' ? 'bg-green-500 h-4' : 'bg-slate-300 hover:bg-green-200'}`}
                >
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 rounded border border-slate-200 text-xs text-slate-500">
                        消耗 10
                    </div>
                </div>

                {/* Midpoints */}
                <div className="absolute inset-y-0 left-3/4 flex flex-col justify-around py-8">
                    <div className="w-12 h-12 bg-red-100 rounded-full border-2 border-red-500 flex items-center justify-center text-xs font-bold text-red-700">Trap</div>
                    <div className="w-12 h-12 bg-green-100 rounded-full border-2 border-green-500 flex items-center justify-center text-xs font-bold text-green-700">Safe</div>
                </div>

                {/* Goal */}
                <div className="w-16 h-16 bg-yellow-400 rounded-full text-white flex items-center justify-center font-bold z-10 shadow-lg border-4 border-yellow-600">Goal</div>
            </div>

            {/* Explanations */}
            <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-2xl">
                <div className={`p-4 rounded-xl border-2 transition-all ${path === 'greedy' ? 'border-red-500 bg-red-50 opacity-100' : 'border-dashed border-slate-200 opacity-50'}`}>
                    <h4 className="font-bold text-red-700 mb-2">贪心选择</h4>
                    <p className="text-sm text-slate-600">
                        开头真的很便宜 (消耗1)，但是后面遇到了巨大的坑 (消耗100)！<br />
                        <strong>总消耗: 101</strong>
                    </p>
                </div>
                <div className={`p-4 rounded-xl border-2 transition-all ${path === 'smart' ? 'border-green-500 bg-green-50 opacity-100' : 'border-dashed border-slate-200 opacity-50'}`}>
                    <h4 className="font-bold text-green-700 mb-2">智慧选择</h4>
                    <p className="text-sm text-slate-600">
                        开头虽然有点贵 (消耗10)，但后面一路顺风 (消耗10)。<br />
                        <strong>总消耗: 20</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

// 7.4 贪心综合页 (Greedy Tabbed Slide)
const GreedySlide = () => {
    const [activeTab, setActiveTab] = useState('concept');
    const tabs = [
        { id: 'concept', label: '🍰 什么是贪心', icon: 'search' },
        { id: 'coins', label: '💰 找零钱', icon: 'coin' },
        { id: 'trap', label: '⚠️ 贪心的陷阱', icon: 'alert' }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-yellow-100 text-yellow-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <div key={activeTab} className="h-full animate-in fade-in zoom-in duration-300">
                    {activeTab === 'concept' && <GreedyConceptSlide />}
                    {activeTab === 'coins' && <GreedyCoinsSlide />}
                    {activeTab === 'trap' && <GreedyTrapSlide />}
                </div>
            </div>
        </div>
    );
};

// 7.5. 递归综合页 (Recursion Tabbed Slide)
const RecursionSlide = () => {
    const [activeTab, setActiveTab] = useState('story');

    const tabs = [
        { id: 'story', label: '📜 听故事', icon: 'repeat' },
        { id: 'concept', label: '🪆 套娃', icon: 'layers' },
        { id: 'code', label: '⚠️ 死循环', icon: 'alert' },
        { id: 'rocket', label: '🚀 倒计时', icon: 'rocket' },
        { id: 'stairs', label: '🪜 爬楼梯', icon: 'stairs' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'story': return <StorySlide />;
            case 'concept': return <MatryoshkaSlide />;
            case 'code': return <CodeSlide />;
            case 'rocket': return <RocketSlide />;
            case 'stairs': return <StairsSlide />;
            default: return <StorySlide />;
        }
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
                                ${activeTab === tab.id
                                    ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                            `}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
                <div key={activeTab} className="h-full animate-in fade-in zoom-in duration-300">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// 8. 课间小测验 (Original QuizSlide)
const QuizSlide = () => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const questions = [
        {
            id: 1,
            question: "如果不知道密码，把 000 到 999 所有的组合都试一遍，这种方法叫什么？",
            options: [
                "A. 贪心算法 (Greedy)",
                "B. 枚举算法 / 暴力破解 (Enumeration)",
                "C. 递归算法 (Recursion)"
            ],
            correct: 1,
            explanation: "正确！枚举就是如果不确定答案，就列举出所有可能的候选者，逐一验证。"
        },
        {
            id: 2,
            question: "玩“凑硬币”游戏时，为了硬币数量最少，每次都尽量拿面值最大的，这是什么思维？",
            options: [
                "A. 贪心思维 (Greedy)",
                "B. 犹豫不决",
                "C. 回溯思维"
            ],
            correct: 0,
            explanation: "宾果！贪心算法的核心就是：只顾眼前的最佳选择（局部最优）。"
        },
        {
            id: 3,
            question: "关于“递归”的描述，哪一项是错误的？",
            options: [
                "A. 递归函数必须要有“出口”",
                "B. 递归就是函数自己调用自己",
                "C. 递归永远比循环快"
            ],
            correct: 2,
            explanation: "注意坑！递归虽然代码简洁，但因为要不断压栈，往往比循环更慢，甚至会导致栈溢出。"
        },
        {
            id: 4,
            question: "在编程中，遇到问题应该优先使用哪种思维？",
            options: [
                "A. 必须用递归，因为它高级",
                "B. 先分析问题特点，适合什么用什么",
                "C. 永远用暴力枚举"
            ],
            correct: 1,
            explanation: "没有最好的算法，只有最合适的算法！枚举适合小数据，贪心适合特定策略，递归适合分治结构。"
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
    { id: 1, title: '课程简介: 算法思维', icon: 'search', component: IntroSlide },
    { id: 2, title: '枚举: 暴力破解', icon: 'lock', component: EnumerationSlide },
    { id: 3, title: '贪心: 最佳策略', icon: 'coin', component: GreedySlide },
    { id: 4, title: '递归: 分治之美', icon: 'layers', component: RecursionSlide },
    { id: 5, title: '结业测验', icon: 'trophy', component: QuizSlide },
];

export default function PythonAdvanced1() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1); // 1-based index
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            {/* 侧边栏 */}
            {/* Mobile Menu Button - Fixed Top */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-indigo-100 p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <Link to="/" className="block">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                    </Link>
                    <h1 className="text-lg font-bold flex items-center gap-2 text-indigo-700">
                        <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs">Python</span>
                        <span>趣味魔法</span>
                    </h1>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
                    aria-expanded={isMobileMenuOpen}
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

            {/* 侧边栏 */}
            <div className={`
                fixed md:relative top-0 left-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col shadow-lg z-50 transition-transform duration-300 ease-in-out md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-5 border-b border-slate-100 hidden md:block">
                    <h1 className="text-lg font-bold flex items-center gap-2 text-indigo-700">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        </Link>
                        <span className="bg-indigo-600 text-white p-1 rounded text-sm">Python</span>
                        A1: 算法思维
                    </h1>
                    <p className="text-xs text-slate-500 mt-2">核心算法思维入门</p>
                </div>
                {/* Mobile Header in Sidebar */}
                <div className="p-4 border-b border-slate-100 md:hidden flex justify-between items-center bg-indigo-50">
                    <span className="font-bold text-indigo-700">课程目录</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="关闭课程目录"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group 1: 算法入门 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🚀 算法入门</div>
                        <div className="space-y-1">
                            {sections.slice(0, 1).map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`p-1.5 rounded-lg ${activeSection === section.id ? 'bg-white text-indigo-500' : 'bg-slate-100 text-slate-400'}`}>
                                        <Icon name={section.icon} size={16} />
                                    </div>
                                    <span className="truncate">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 2: 核心算法 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🧩 核心算法</div>
                        <div className="space-y-1">
                            {sections.slice(1, 4).map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`p-1.5 rounded-lg ${activeSection === section.id ? 'bg-white text-indigo-500' : 'bg-slate-100 text-slate-400'}`}>
                                        <Icon name={section.icon} size={16} />
                                    </div>
                                    <span className="truncate">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 3: 挑战 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🏆 毕业挑战</div>
                        <div className="space-y-1">
                            {sections.slice(4, 5).map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`p-1.5 rounded-lg ${activeSection === section.id ? 'bg-white text-indigo-500' : 'bg-slate-100 text-slate-400'}`}>
                                        <Icon name={section.icon} size={16} />
                                    </div>
                                    <span className="truncate">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 pt-16 md:pt-0">
                {/* Header - now just a label or removed if we want to clean it up. Keeping it simple */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    <div className="max-w-5xl mx-auto h-full flex flex-col">
                        <PythonProjectSupport projectId="a1" />
                        <header className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Icon name={sections.find(s => s.id === activeSection)?.icon} size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 truncate">
                                    {sections.find(s => s.id === activeSection)?.title}
                                </h2>
                            </div>
                            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        </header>

                        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                            <ActiveComponent />
                        </div>
                        <PythonProjectSupport projectId="a1" placement="bottom" />
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
                            ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                    >
                        <ChevronDown className="rotate-90" size={18} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/a2');
                            }
                        }}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
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
