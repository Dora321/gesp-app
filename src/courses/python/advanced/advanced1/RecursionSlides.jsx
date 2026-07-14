import { useState } from 'react';
import { Repeat, AlertOctagon, Play, Code, Rocket, Sparkles, TrendingUp, Footprints } from 'lucide-react';

export const IntroSlide = () => (
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

export const StorySlide = () => {
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

export const MatryoshkaSlide = () => {
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

export const CodeSlide = () => {
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

export const RocketSlide = () => {
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

export const StairsSlide = () => {
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
