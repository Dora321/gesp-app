import { useState, useMemo } from 'react';
import { Repeat, AlertTriangle, List, Code } from 'lucide-react';
import PyCodeTracer from '../../../../components/PyCodeTracer';
import { PredictCheck, SlideHeader, TransferCheck } from '../../shell/PythonLessonShell';
import { Button, CodeBlock } from './Shared';

export const LoopSlide = () => {
    const [steps, setSteps] = useState(0);
    const [targetSteps, setTargetSteps] = useState(5);
    const [isThinking, setIsThinking] = useState(false);

    // Simulate loop execution
    const runLoop = async () => {
        if (isThinking) return;
        setIsThinking(true);
        setSteps(0);

        for (let i = 0; i < targetSteps; i++) {
            await new Promise(r => setTimeout(r, 600));
            setSteps(prev => prev + 1);
        }
        setIsThinking(false);
    };

    const traceSteps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–' } }];
        const printed = [];
        for (let i = 0; i < 5; i++) {
            printed.push(`第 ${i + 1} 步`);
            result.push({
                active: [0, 1],
                vars: { i },
                action: i === 0 ? '开始循环' : '下一轮',
                row: [`第 ${i + 1} 次`, i, `第 ${i + 1} 步`],
                output: printed.join('   '),
            });
        }
        result.push({
            active: [0],
            vars: { i: 4 },
            action: '结束',
            exit: 'range(5) 把 0、1、2、3、4 取完了，循环自动停止',
            output: printed.join('   '),
        });
        return result;
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={Repeat} title="循环：不知疲倦的机器">
                <strong>for 循环</strong> 像一个计数器，让程序重复执行特定的次数。输入想让机器人走的步数，看看它会走多远！<span className="text-sm opacity-70">（假设一步 0.5 米）</span>
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">控制面板</h3>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <label className="text-sm font-bold text-slate-500 block mb-2">输入步数 (1-10):</label>
                        <input
                            type="number"
                            min="1" max="10"
                            value={targetSteps}
                            onChange={(e) => setTargetSteps(Math.min(10, Math.max(1, Number(e.target.value))))}
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        />
                        <CodeBlock code={`
# 让机器人走 ${targetSteps} 步
for i in range(${targetSteps}):
    robot.walk()
    print(f"走了 {i+1} 步")
    # 总距离 = 步数 * 0.5
                     `} />
                    </div>

                    <Button
                        onClick={runLoop}
                        disabled={isThinking}
                        className="w-full"
                    >
                        {isThinking ? '机器人正在执行...' : '开始运行循环 ▶️'}
                    </Button>
                </div>

                <div className="bg-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[200px]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-1 gap-2 p-2 opacity-20">
                        {[...Array(6)].map((_, i) => <div key={i} className="border border-slate-400 rounded"></div>)}
                    </div>

                    {/* Robot */}
                    <div
                        className="text-6xl transition-all duration-500 z-10 filter drop-shadow-xl"
                        style={{ transform: `translateX(${(Math.min(steps, 6) - 3) * 40}px)` }}
                    >
                        🤖
                    </div>

                    <div className="mt-8 font-bold text-indigo-600 bg-white/80 px-4 py-2 rounded-xl backdrop-blur-sm text-center">
                        <div>已走步数: {steps} / {targetSteps}</div>
                        <div className="text-xs text-indigo-400 mt-1">
                            总距离: {steps} x 0.5 = {(steps * 0.5).toFixed(1)} 米
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-1 flex items-center gap-2">
                    <Code size={18} className="text-indigo-600" /> 看清楚循环变量 <code>i</code> 到底取了哪些值
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    很多同学以为 <code>range(5)</code> 是 1 到 5。点「下一步」看真相：<code>i</code> 从 <strong>0</strong> 开始，到 <strong>4</strong> 结束，正好 5 次。
                </p>
                <PyCodeTracer
                    title="for 循环追踪器"
                    code={`for i in range(5):
    print("第", i + 1, "步")`}
                    varOrder={['i']}
                    columns={['第几次', 'i 的值', 'print 输出']}
                    steps={traceSteps}
                    hint="range(5) 给出 0,1,2,3,4——所以要打印「第 i+1 步」才是 1~5。"
                />
            </div>

            <PredictCheck
                title="先预测：range 的终点"
                prompt="for i in range(1, 5): 循环体执行几次？最后一次 i 是几？"
                options={['5 次，最后 i = 5', '4 次，最后 i = 4']}
                correctIndex={1}
                explanation="range(1, 5) 取 1、2、3、4，不包含终点 5。所以执行 4 次，最后一次 i = 4。记住：range 的终点是「够不到」的。"
                misconception="以为 range(1, 5) 会取到 5。终点永远取不到，这正是循环少跑或多跑一次的常见原因。"
            />

            <TransferCheck
                prompt="换个例子：for i in range(2, 8): 这个循环执行几次？第一次和最后一次的 i 各是多少？把所有 i 列出来。"
                hint="range(a, b) 从 a 开始，到 b 之前停（取不到 b）；次数 = b - a。"
                answer="执行 6 次；第一次 i=2，最后一次 i=7；i 依次是 2, 3, 4, 5, 6, 7。"
                steps={[
                    'range(2, 8) 从 2 开始，取不到终点 8，所以最大只到 7。',
                    'i 依次是 2, 3, 4, 5, 6, 7，一共 8 - 2 = 6 个。',
                    '第一次 i = 2，最后一次 i = 7（不是 8）。',
                ]}
            />
        </div>
    );
};

export const ListOpsSlide = () => {
    const [items, setItems] = useState(['🍎', '🍌', '🍇', '🍊', '🍓']);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [operation, setOperation] = useState('iterate');

    const runAnimation = async () => {
        setIsAnimating(true);
        setCurrentIndex(-1);

        if (operation === 'iterate') {
            for (let i = 0; i < items.length; i++) {
                await new Promise(r => setTimeout(r, 700));
                setCurrentIndex(i);
            }
        } else if (operation === 'filter') {
            for (let i = 0; i < items.length; i++) {
                await new Promise(r => setTimeout(r, 700));
                setCurrentIndex(i);
            }
            await new Promise(r => setTimeout(r, 500));
            setItems(prev => prev.filter((_, i) => i % 2 === 0));
        }

        setIsAnimating(false);
        setCurrentIndex(-1);
    };

    const reset = () => {
        setItems(['🍎', '🍌', '🍇', '🍊', '🍓']);
        setCurrentIndex(-1);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-violet-100 p-6 rounded-2xl border border-violet-200 text-violet-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <List className="text-violet-600" />
                    列表操作：批量处理
                </h2>
                <p>
                    <strong>for 循环 + 列表</strong>是黄金搭档！我们可以遍历列表中的每个元素，
                    或者根据条件筛选、修改它们。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-4">
                    <h3 className="font-bold text-slate-700">选择操作</h3>

                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { value: 'iterate', label: '遍历所有', desc: 'for item in list:' },
                            { value: 'filter', label: '筛选偶数位', desc: 'filter(list, condition)' }
                        ].map(op => (
                            <button
                                key={op.value}
                                onClick={() => setOperation(op.value)}
                                disabled={isAnimating}
                                className={`p-4 rounded-xl text-left transition-all ${operation === op.value
                                    ? 'bg-violet-600 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="font-bold">{op.label}</div>
                                <div className="text-xs opacity-75 font-mono">{op.desc}</div>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={runAnimation} disabled={isAnimating} variant="primary" className="flex-1">
                            {isAnimating ? '运行中...' : '开始运行 ▶️'}
                        </Button>
                        <Button onClick={reset} variant="secondary">重置</Button>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl text-green-400 font-mono text-sm whitespace-pre">
                        <div className="text-slate-400 mb-2"># Python 代码</div>
                        {operation === 'iterate' && 'for fruit in fruits:\n  print(fruit)'}
                        {operation === 'filter' && 'fruits = [f for i, f in\n  enumerate(fruits) if i % 2 == 0]'}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-2xl border-2 border-violet-200">
                    <h3 className="text-sm font-bold text-violet-600 mb-6 text-center">列表可视化</h3>

                    <div className="flex flex-wrap gap-3 justify-center min-h-[200px] items-start">
                        {items.map((item, idx) => (
                            <div
                                key={`${item}-${idx}`}
                                className={`
                                    w-20 h-20 rounded-xl flex flex-col items-center justify-center text-3xl
                                    transition-all duration-300
                                    ${currentIndex === idx
                                        ? 'bg-violet-600 text-white scale-125 shadow-2xl rotate-6'
                                        : 'bg-white shadow-md hover:scale-105'
                                    }
                                `}
                            >
                                <div>{item}</div>
                                <div className={`text-xs font-bold mt-1 ${currentIndex === idx ? 'text-white' : 'text-slate-500'}`}>[{idx}]</div>
                            </div>
                        ))}
                    </div>

                    {currentIndex >= 0 && (
                        <div className="mt-6 bg-white p-4 rounded-lg text-center animate-in fade-in">
                            <div className="text-sm text-violet-600 font-bold">当前处理:</div>
                            <div className="text-2xl">索引 {currentIndex}: {items[currentIndex]}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ChallengeSlide = () => {
    const [fuel, setFuel] = useState(10);
    const [status, setStatus] = useState('ready'); // ready, running, success, fail

    const startMission = async () => {
        setStatus('running');
        let currentFuel = 10;

        // Emulate while loop
        while (currentFuel > 0) {
            await new Promise(r => setTimeout(r, 400));
            currentFuel -= 1;
            setFuel(currentFuel);

            // Random event: found battery (condition to break or continue)
            if (currentFuel === 5) {
                // Just a simulated visual break for demo?
                // Let's make it simple: "While fuel > 0: fly()"
            }
        }
        setStatus('success');
    };

    const reset = () => {
        setFuel(10);
        setStatus('ready');
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={AlertTriangle} title="While 循环与中断">
                <strong>while</strong> 只要条件满足就会一直执行。小心别写出<strong>死循环</strong>（永远停不下来）！必要时用 <strong>break</strong> 紧急刹车。
            </SlideHeader>

            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="flex justify-between items-start z-10 relative">
                    <div className="space-y-4 max-w-sm">
                        <div className="font-mono text-green-400 text-sm">
                            fuel = 10<br />
                            while fuel &gt; 0:<br />
                            &nbsp;&nbsp;rocket.fly()<br />
                            &nbsp;&nbsp;fuel = fuel - 1<br />
                            print("Land safely")
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={startMission} disabled={status === 'running'} variant="success">
                                {status === 'running' ? '飞行中...' : '发射火箭 🚀'}
                            </Button>
                            <Button onClick={reset} variant="secondary">重置</Button>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-sm text-slate-400 mb-1">剩余燃料</div>
                        <div className={`text-4xl font-bold font-mono ${fuel < 3 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                            {fuel * 10}%
                        </div>
                    </div>
                </div>

                {/* Rocket Animation */}
                <div className={`
                    absolute bottom-0 right-20 text-8xl transition-transform duration-500
                    ${status === 'running' ? 'translate-y-[-200px] rotate-45' : 'translate-y-0'}
                    ${status === 'ready' ? '' : 'shake'}
                `}>
                    🚀
                </div>

                {/* Stars Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 text-yellow-100">✨</div>
                    <div className="absolute top-40 right-40 text-yellow-100 text-xs">✨</div>
                    <div className="absolute bottom-20 left-1/2 text-yellow-100 text-lg">✨</div>
                </div>
            </div>
        </div>
    );
}
