import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Dices, Shuffle, HelpCircle, Trophy, BookOpen,
    Zap, Star, Menu, X, ArrowRight, MousePointer2,
    Wand2, Sparkles, PackageOpen, AlertTriangle, Check, Layers,
    Sliders, Key, BarChart2, Calculator, Coins, ChevronUp, ChevronDown
} from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell, { MasteryCheck, PredictCheck, SlideHeader } from '../shell/PythonLessonShell';

// --- Shared Helper Components (Reused style) ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = ({ code, highlightLine = -1 }) => (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto relative">
        <div className="absolute top-2 right-4 text-slate-500 text-xs uppercase tracking-widest">Python</div>
        <pre className="relative z-10">
            {code.split('\n').map((line, i) => (
                <div key={`line-${i}`} className={`${highlightLine === i ? 'bg-indigo-500/30 -mx-4 px-4 border-l-4 border-indigo-400' : ''}`}>
                    {line}
                </div>
            ))}
        </pre>
    </div>
);

const MagicToolbox = ({ isOpen }) => (
    <div className="flex flex-col items-center justify-center p-8">
        <div className={`transition-all duration-700 transform ${isOpen ? 'scale-110' : 'scale-100'}`}>
            {isOpen ? (
                <div className="relative">
                    <PackageOpen size={100} className="text-indigo-500 animate-bounce" />
                    <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" />
                    <Sparkles className="absolute -bottom-2 -left-4 text-indigo-400 animate-pulse delay-75" />
                </div>
            ) : (
                <div className="opacity-80">
                    <PackageOpen size={100} className="text-slate-300" />
                </div>
            )}
        </div>
        <p className={`mt-4 font-bold text-center transition-opacity duration-500 ${isOpen ? 'text-indigo-600 opacity-100' : 'text-slate-400 opacity-50'}`}>
            {isOpen ? "工具箱已打开！咒语准备就绪..." : "工具箱紧锁，尝试 import 它？"}
        </p>
    </div>
);

// --- Slides ---

const IntroSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <Wand2 className="absolute top-[-20px] right-[-20px] text-white/10 w-40 h-40 rotate-12" />
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-yellow-300" />
                魔法师的幸运咒语
            </h2>
            <p className="text-lg leading-relaxed opacity-90">
                初级魔法师，欢迎来到<strong>随机世界</strong>！
                <br /><br />
                在写程序时，有时我们需要一点“运气”：
                <br />
                🎲 掷骰子决定前进几步？
                <br />
                🪙 抛硬币决定谁先开始？
                <br />
                🪄 随机召唤一只幸运神兽？
                <br /><br />
                Python 拥有强大的“随机咒语”，能帮我们模拟这些概率事件。
            </p>
        </div>
        <div className="flex justify-center gap-8 py-4">
            <span className="text-7xl animate-bounce">🎲</span>
            <span className="text-7xl animate-bounce delay-100">🪙</span>
            <span className="text-7xl animate-bounce delay-200">✨</span>
        </div>
    </div>
);

const ImportSlide = () => {
    const [summoned, setSummoned] = useState(false);
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={BookOpen} title="开启工具箱：Import">
                Python 就像一个魔法师，他的法术都存在 <strong>模块 (Module)</strong> 工具箱里。
                    <br />
                    想用谁，就先 <strong>召唤 (import)</strong> 谁：
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <CodeBlock
                        code={`import random\n\n# 现在可以使用 random 里的幸运咒语了！`}
                        highlightLine={summoned ? 0 : -1}
                    />
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm text-amber-800 flex items-start gap-2">
                        <Zap size={18} className="text-amber-500 flex-shrink-0" />
                        <p><strong>小知识：</strong><code>import</code> 必须写在代码的最顶端。它就像是在施法前先打开魔法口袋。</p>
                    </div>
                    <Button
                        onClick={() => setSummoned(!summoned)}
                        className="w-full"
                        variant={summoned ? 'success' : 'primary'}
                    >
                        {summoned ? "已成功召唤！" : "点击运行召唤咒语"}
                    </Button>
                </div>
                <MagicToolbox isOpen={summoned} />
            </div>
        </div>
    );
};

const RandIntSlide = () => {
    const [result, setResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [step, setStep] = useState(0);

    const rollDice = () => {
        setIsRolling(true);
        setStep(1);
        let count = 0;
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * 6) + 1);
            count++;
            if (count > 10) {
                clearInterval(interval);
                setIsRolling(false);
                setStep(2);
            }
        }, 100);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Shuffle className="text-indigo-600" />
                    召唤数字：randint
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-lg">
                            <code>random.randint(a, b)</code>
                        </p>
                        <p className="mt-2 text-sm opacity-80">
                            生成一个 <strong>a 到 b 之间</strong> 的随机整数。
                        </p>
                    </div>
                    <div className="bg-white/50 px-4 py-2 rounded-lg border border-amber-300 animate-pulse">
                        <span className="font-bold text-amber-700">⚠️ 重点：包含 a 和 b</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <CodeBlock
                        code={`import random\n\n# 生成 1 到 6 之间的随机数\ndice = random.randint(1, 6)\nprint(dice)`}
                        highlightLine={step === 1 ? 3 : step === 2 ? 4 : -1}
                    />
                    <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 italic">
                        <p>🧙‍♂️ "randint 就像是定做一个特殊的骰子，你可以决定它的起点和终点。"</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden">
                    {isRolling && <div className="absolute inset-0 bg-indigo-500/5 animate-pulse"></div>}
                    <div className={`text-8xl font-black mb-6 transition-all duration-300 ${isRolling ? 'scale-110 rotate-12 text-indigo-400 opacity-50' : 'scale-100 rotate-0 text-indigo-600'}`}>
                        {result === null ? "?" : result}
                    </div>
                    <Button onClick={rollDice} disabled={isRolling} className="w-full py-4 text-lg">
                        {isRolling ? "正在施法..." : "运行代码 (掷骰子)"}
                    </Button>
                </div>
            </div>

            <PredictCheck
                prompt="random.randint(1, 6) 能不能取到 6 这个数？"
                options={['不能，只会取 1 到 5', '能，randint 两端都包含']}
                correctIndex={1}
                explanation="randint(a, b) 两端都包含，能取到 1、2、3、4、5、6 共 6 个值——正好是一个骰子。这一点和 range(1, 6)（只到 5）不同，别记混。"
                misconception="把 randint 当成 range，以为取不到右端点 b。"
            />
        </div>
    );
};

const RangeVisualizerSlide = () => {
    const [minVal, setMinVal] = useState(1);
    const [maxVal, setMaxVal] = useState(10);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const generate = () => {
        const num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        setResult(num);
        setHistory(prev => [...prev.slice(-9), num]);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Dices} title="范围探索器">
                调整滑块来改变随机数的范围。观察结果如何受到 <code>a</code> 和 <code>b</code> 的影响。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">最小值 (a): {minVal}</label>
                        <input
                            type="range"
                            min="0" max="50"
                            value={minVal}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                setMinVal(v);
                                if (v > maxVal) setMaxVal(v);
                            }}
                            className="w-full accent-cyan-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">最大值 (b): {maxVal}</label>
                        <input
                            type="range"
                            min="0" max="100"
                            value={maxVal}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                setMaxVal(v);
                                if (v < minVal) setMinVal(v);
                            }}
                            className="w-full accent-cyan-600"
                        />
                    </div>
                    <CodeBlock code={`import random\n\n# 生成 ${minVal} 到 ${maxVal} 之间的随机数\nresult = random.randint(${minVal}, ${maxVal})\nprint(result)`} />
                    <Button onClick={generate} className="w-full">生成随机数</Button>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center">
                    {/* Number Line */}
                    <div className="w-full mb-8">
                        <div className="relative h-12 bg-gradient-to-r from-cyan-200 to-cyan-400 rounded-full overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-bold text-cyan-800">
                                <span>{minVal}</span>
                                <span>{maxVal}</span>
                            </div>
                            {result !== null && (
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-cyan-600 animate-bounce"
                                    style={{ left: `calc(${((result - minVal) / (maxVal - minVal || 1)) * 100}% - 1rem)` }}
                                >
                                    {result}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-6xl font-black text-cyan-600 mb-4">
                        {result ?? "?"}
                    </div>
                    <div className="text-sm text-slate-500">
                        历史：{history.length > 0 ? history.join(', ') : '无'}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChoiceSlide = () => {
    const [choice, setChoice] = useState(null);
    const [isPick, setIsPick] = useState(false);
    const options = [
        { name: '喷火龙', icon: '🐉' },
        { name: '独角兽', icon: '🦄' },
        { name: '凤凰', icon: '🔥' },
        { name: '史莱姆', icon: '💧' }
    ];

    const pickOne = () => {
        setIsPick(true);
        setChoice(null);
        setTimeout(() => {
            const randomElement = options[Math.floor(Math.random() * options.length)];
            setChoice(randomElement);
            setIsPick(false);
        }, 600);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={MousePointer2} title="随机召唤：choice">
                <code>random.choice(sequence)</code>
                    <br />
                    从一个列表（或其他序列）中随机选出一个元素。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8 font-sans">
                <div className="space-y-4">
                    <CodeBlock
                        code={`import random\n\nbeasts = ["火龙", "独角兽", "凤凰", "史莱姆"]\n\n# 随机召唤一个\nlucky = random.choice(beasts)\nprint(lucky)`}
                        highlightLine={isPick ? 5 : choice ? 6 : -1}
                    />
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex gap-4 mb-8">
                        {options.map((opt, i) => (
                            <div key={i} className={`text-4xl p-2 rounded-xl transition-all duration-500 ${choice?.name === opt.name ? 'bg-purple-100 scale-125 shadow-lg' : 'opacity-30'}`}>
                                {opt.icon}
                            </div>
                        ))}
                    </div>
                    <div className="h-16 flex items-center justify-center text-xl font-bold mb-6 text-purple-600">
                        {isPick ? (
                            <div className="flex gap-1">
                                <span className="animate-bounce">🔮</span>
                                <span className="animate-bounce delay-75">🔮</span>
                                <span className="animate-bounce delay-150">🔮</span>
                            </div>
                        ) : choice ? (
                            <div className="animate-in zoom-in">召唤成功：{choice.name}！</div>
                        ) : "准备仪式..."}
                    </div>
                    <Button onClick={pickOne} variant="primary" disabled={isPick} className="w-full bg-purple-600 hover:bg-purple-700">
                        召唤幸运神兽
                    </Button>
                </div>
            </div>
        </div>
    );
};

const ShuffleSampleSlide = () => {
    const initialDeck = ['🂡', '🂢', '🂣', '🂤', '🂥'];
    const [deck, setDeck] = useState([...initialDeck]);
    const [sample, setSample] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleDeck = () => {
        setIsShuffling(true);
        setSample([]);
        setTimeout(() => {
            const shuffled = [...deck].sort(() => Math.random() - 0.5);
            setDeck(shuffled);
            setIsShuffling(false);
        }, 500);
    };

    const drawSample = () => {
        const count = Math.min(3, deck.length);
        const indices = [];
        while (indices.length < count) {
            const idx = Math.floor(Math.random() * deck.length);
            if (!indices.includes(idx)) indices.push(idx);
        }
        setSample(indices.map(i => deck[i]));
    };

    const resetDeck = () => {
        setDeck([...initialDeck]);
        setSample([]);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Sparkles} title="魔术师的秘密：洗牌与抽样">
                <code>random.shuffle(list)</code>：打乱列表顺序（原地修改）<br />
                    <code>random.sample(list, k)</code>：随机抽取 k 个元素（不重复）
            </SlideHeader>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm leading-7 text-indigo-900">
                <div className="mb-2 font-black">三个“随机选择”别搞混</div>
                <div className="mb-2 grid gap-1 font-mono text-xs sm:grid-cols-3">
                    <span><strong>choice(list)</strong> 取 1 个（可重复）</span>
                    <span><strong>sample(list, k)</strong> 取 k 个（不重复）</span>
                    <span><strong>shuffle(list)</strong> 原地打乱整列</span>
                </div>
                <p>
                    最大的坑：<code>shuffle</code> 是<strong>原地修改</strong>，它<strong>返回 None</strong>——写成 <code>cards = random.shuffle(cards)</code> 会让 cards 变成 None！直接 <code>random.shuffle(cards)</code> 就好。<code>sample</code> 正相反：它<strong>不改原列表</strong>，而是返回一个新列表。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <CodeBlock code={`import random\n\ncards = ['🂡', '🂢', '🂣', '🂤', '🂥']\n\n# 洗牌\nrandom.shuffle(cards)\nprint(cards)\n\n# 抽取 3 张\nhand = random.sample(cards, 3)\nprint(hand)`} />
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm text-amber-800 flex items-start gap-2">
                        <Zap size={18} className="text-amber-500 flex-shrink-0" />
                        <p><strong>注意：</strong><code>shuffle()</code> 会直接改变原列表，<code>sample()</code> 则返回新列表。</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="text-sm font-bold text-slate-500 mb-2">牌堆</div>
                        <div className={`flex justify-center gap-2 text-5xl transition-all ${isShuffling ? 'blur-sm scale-95' : ''}`}>
                            {deck.map((card, i) => (
                                <span key={`deck-${i}`} className="transition-all duration-300">{card}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 mb-6">
                        <Button onClick={shuffleDeck} disabled={isShuffling} className="flex-1 bg-pink-600 hover:bg-pink-700">
                            {isShuffling ? "洗牌中..." : "🔀 洗牌"}
                        </Button>
                        <Button onClick={drawSample} variant="secondary" className="flex-1">
                            🎴 抽 3 张
                        </Button>
                        <Button onClick={resetDeck} variant="secondary">
                            ↩️
                        </Button>
                    </div>
                    {sample.length > 0 && (
                        <div className="text-center animate-in zoom-in">
                            <div className="text-sm font-bold text-slate-500 mb-2">抽到的牌</div>
                            <div className="flex justify-center gap-3 text-5xl">
                                {sample.map((card, i) => (
                                    <span key={`sample-${i}`} className="animate-bounce">{card}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ParsonsProblem = ({ blocks, onCorrect }) => {

    const [currentOrder, setCurrentOrder] = useState(blocks.map((b, i) => i).sort(() => Math.random() - 0.5));
    const [isCorrect, setIsCorrect] = useState(false);

    const moveUp = (index) => {
        if (index === 0) return;
        const newOrder = [...currentOrder];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        setCurrentOrder(newOrder);
    };

    const moveDown = (index) => {
        if (index === currentOrder.length - 1) return;
        const newOrder = [...currentOrder];
        [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
        setCurrentOrder(newOrder);
    };

    const checkOrder = () => {
        const isMatch = currentOrder.every((val, i) => val === i);
        if (isMatch) {
            setIsCorrect(true);
            onCorrect();
        } else {
            alert("❌ 咒语顺序错啦，再排列一下？");
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm font-bold text-indigo-600 flex items-center gap-2">
                <Layers size={16} /> 咒语排序：请将代码快调整到正确顺序
            </p>
            <div className="space-y-2">
                {currentOrder.map((blockIdx, i) => (
                    <div
                        key={blockIdx}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-100 shadow-sm'}`}
                    >
                        <code className="text-sm font-mono">{blocks[blockIdx]}</code>
                        {!isCorrect && (
                            <div className="flex gap-1">
                                <button onClick={() => moveUp(i)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronUp size={16} /></button>
                                <button onClick={() => moveDown(i)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronDown size={16} /></button>
                            </div>
                        )}
                        {isCorrect && <Check className="text-emerald-500" size={18} />}
                    </div>
                ))}
            </div>
            {!isCorrect && (
                <Button onClick={checkOrder} className="w-full">验证咒语</Button>
            )}
        </div>
    );
};

const DebugSlide = () => {
    const [fixed, setFixed] = useState(false);
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={AlertTriangle} title="魔法反噬：缩进错误">
                Python 的代码非常“整洁”，所有的代码必须对齐。如果缩进错了，魔法就会失效！
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 font-sans">
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm relative border-2 border-red-400">
                        <pre>
                            {`import random\n\nfor i in range(3):\n`}
                            <span className={`${fixed ? 'pl-4' : 'pl-0'} transition-all text-yellow-400 font-bold bg-yellow-400/10 inline-block`}>
                                {`print(random.randint(1, 10))`}
                            </span>
                        </pre>
                        {!fixed && <div className="absolute top-2 right-4 text-red-400 text-xs animate-pulse">IndentationError!</div>}
                    </div>
                    <Button
                        onClick={() => setFixed(!fixed)}
                        variant={fixed ? 'success' : 'danger'}
                        className="w-full"
                    >
                        {fixed ? "修复成功！" : "点击修复缩进"}
                    </Button>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <h3 className="font-bold mb-4 text-slate-800">为什么会报错？</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex gap-2">
                            <Zap size={16} className="text-amber-500 shrink-0" />
                            <span>Python 使用 <strong>缩进</strong> 来表示代码属于哪个块。</span>
                        </li>
                        <li className="flex gap-2">
                            <Zap size={16} className="text-amber-500 shrink-0" />
                            <span>在 <code>for</code>、<code>if</code>、<code>while</code> 后面通常需要向右缩进 4 个空格。</span>
                        </li>
                        <li className="flex gap-2">
                            <Zap size={16} className="text-amber-500 shrink-0" />
                            <span>如果不缩进，Python 就不知道这一行是循环里的，还是循环外的。</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- New Slides ---

const RandomFloatSlide = () => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1);
    const [result, setResult] = useState(null);
    const [mode, setMode] = useState('random'); // 'random' or 'uniform'

    const generate = () => {
        if (mode === 'random') {
            setResult(Math.random());
        } else {
            setResult(Math.random() * (max - min) + min);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Calculator} title="小数魔法：random() 与 uniform()">
                除了整数，Python 还能生成小数（浮点数）！
                    <br />
                    <code>random.random()</code>：生成 0 到 1 之间的小数
                    <br />
                    <code>random.uniform(a, b)</code>：生成 a 到 b 之间的小数
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setMode('random')}
                            className={`flex-1 py-2 rounded-lg font-bold transition-all ${mode === 'random' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                            random()
                        </button>
                        <button
                            onClick={() => setMode('uniform')}
                            className={`flex-1 py-2 rounded-lg font-bold transition-all ${mode === 'uniform' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                            uniform(a, b)
                        </button>
                    </div>

                    {mode === 'uniform' && (
                        <div className="space-y-4 animate-in fade-in">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1">最小值 (a): {min}</label>
                                <input type="range" min="-10" max="10" value={min} onChange={(e) => setMin(parseFloat(e.target.value))} className="w-full accent-teal-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1">最大值 (b): {max}</label>
                                <input type="range" min="-10" max="100" value={max} onChange={(e) => setMax(parseFloat(e.target.value))} className="w-full accent-teal-600" />
                            </div>
                        </div>
                    )}

                    <CodeBlock code={mode === 'random'
                        ? `import random\n\n# 生成 0 到 1 之间的小数\nnum = random.random()\nprint(num)  # 例如: 0.7291...`
                        : `import random\n\n# 生成 ${min} 到 ${max} 之间的小数\nnum = random.uniform(${min}, ${max})\nprint(num)`
                    } />

                    <Button onClick={generate} className="w-full bg-teal-600 hover:bg-teal-700">
                        施展小数咒语
                    </Button>
                </div>

                <div className="flex flex-col items-center justify-center bg-slate-50 p-8 rounded-2xl">
                    <div className="text-sm font-bold text-slate-400 mb-4">生成结果</div>
                    <div className="text-4xl font-mono font-black text-teal-600 mb-4">
                        {result !== null ? result.toFixed(6) : "?.??????"}
                    </div>
                    <div className="text-sm text-slate-500">
                        {mode === 'random' ? '范围：[0, 1)' : `范围：[${min}, ${max})`}
                    </div>
                </div>
            </div>
        </div>
    );
};

const f6MasteryItems = [
    {
        label: '能先 import random，再选择合适的随机工具。',
        evidence: '能说出 randint 生成整数，choice 从序列里选一个，shuffle 打乱列表。',
        retryHint: '回到“召唤”，先把 import 和工具名写在同一张小抄上。',
    },
    {
        label: '能解释 randint(a, b) 的边界包含 a 和 b。',
        evidence: '例如 random.randint(1, 6) 可能得到 1，也可能得到 6。',
        retryHint: '回到“骰子”，把起点和终点都写进可能结果列表。',
    },
    {
        label: '能区分 choice、shuffle 和 sample 的返回结果。',
        evidence: '能说明 shuffle 原地改列表并返回 None，sample 返回新列表。',
        retryHint: '回到“洗牌”，运行前先预测原列表和新变量会变成什么。',
    },
    {
        label: '能用随机规则做一个小玩法或测试数据。',
        evidence: '例如随机点名、随机骰子、随机抽奖，并能说出随机范围。',
        retryHint: '回到“纠错”，先把输入、随机规则、输出结果分成三步。',
    },
];

const SummarySlide = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-3xl text-white shadow-xl text-center relative overflow-hidden">
                <Sparkles className="absolute top-4 left-4 text-white/20 w-20 h-20" />
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300 animate-bounce" />
                <h2 className="text-3xl font-bold mb-2">晋级：随机魔法师！</h2>
                <p className="text-indigo-100 text-lg">
                    你已经学会了如何让 Python 充满“不确定性”。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-50 border-t-indigo-500 border-t-4">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700">
                        <BookOpen size={20} />
                        魔法小抄 (Cheat Sheet)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <code className="text-indigo-600 font-bold font-mono">import random</code>
                            <p className="text-xs text-slate-500 mt-1">施法前的必备：引入随机模块袋</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <code className="text-indigo-600 font-bold font-mono">random.randint(a, b)</code>
                            <p className="text-xs text-slate-500 mt-1">[a, b] 闭区间随机整数（包含 a 和 b）</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <code className="text-indigo-600 font-bold font-mono">random.choice(列表)</code>
                            <p className="text-xs text-slate-500 mt-1">从列表中施展“点名术”随机选一个</p>
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                    <Wand2 className="w-12 h-12 text-emerald-600 mb-3 animate-pulse" />
                    <h3 className="font-bold text-emerald-900 mb-2">练习完成！</h3>
                    <p className="text-sm text-emerald-700 mb-6 font-sans">你已经准备好迎接更高级的挑战了。</p>
                    <div className="flex gap-4">
                        <Link to="/">
                            <Button variant="secondary" className="bg-white">返回地图</Button>
                        </Link>
                        <Link to="/python/a1">
                            <Button variant="success">开启：进阶挑战</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <MasteryCheck
                title="F6 随机世界离开前检查"
                description="如果能选对随机工具、说清边界、避开 shuffle 返回 None 的坑、做出小玩法，就可以进入集合。"
                accent="indigo"
                items={f6MasteryItems}
            />
        </div>
    );
};

// --- Main Course Component ---

const sections = [
    { id: 1, title: '魔法', icon: Wand2, component: IntroSlide },
    { id: 2, title: '召唤', icon: PackageOpen, component: ImportSlide },
    { id: 3, title: '骰子', icon: Dices, component: RandIntSlide },
    { id: 4, title: '范围', icon: Sliders, component: RangeVisualizerSlide },
    { id: 5, title: '选择', icon: MousePointer2, component: ChoiceSlide },
    { id: 6, title: '洗牌', icon: Shuffle, component: ShuffleSampleSlide },
    { id: 7, title: '小数', icon: Calculator, component: RandomFloatSlide },
    { id: 8, title: '纠错', icon: AlertTriangle, component: DebugSlide },
    { id: 9, title: '总结', icon: Trophy, component: SummarySlide },
];

export default function PythonFoundation6() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F6"
            lessonTitle="随机世界"
            lessonSubtitle="让程序拥有不确定性"
            accent="indigo"
            hero={{
                title: '让程序学会“掷骰子”',
                description: '认识 random 模块，用 randint、choice、shuffle 做出有随机规则的小游戏和测试数据。',
            }}
            prerequisites={['会用 import 引入模块', '会用循环和条件', '会用列表保存一组数据']}
            sections={sections}
            previousPath="/python/f5"
            nextPath="/python/f7"
            nextLabel="下一课：F7 集合宝藏"
            topSupport={<PythonFoundationSupport lessonId="f6" />}
            bottomSupport={<PythonFoundationSupport lessonId="f6" placement="bottom" />}
        />
    );
}
