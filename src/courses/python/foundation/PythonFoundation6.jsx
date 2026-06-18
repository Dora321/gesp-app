import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Dices, Shuffle, HelpCircle, Trophy, BookOpen,
    Zap, Star, Menu, X, ArrowRight, MousePointer2,
    Wand2, Sparkles, PackageOpen, AlertTriangle, Check, Layers,
    Sliders, Key, BarChart2, Calculator, Coins, ChevronUp, ChevronDown
} from 'lucide-react';
import LessonQualityBar from '../../../components/LessonQualityBar';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';

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
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="text-blue-600" />
                    开启工具箱：Import
                </h2>
                <p>
                    Python 就像一个魔法师，他的法术都存在 <strong>模块 (Module)</strong> 工具箱里。
                    <br />
                    想用谁，就先 <strong>召唤 (import)</strong> 谁：
                </p>
            </div>

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
            <div className="bg-emerald-100 p-6 rounded-2xl border border-emerald-200 text-emerald-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Shuffle className="text-emerald-600" />
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
                    <div className="bg-white/50 px-4 py-2 rounded-lg border border-emerald-300 animate-pulse">
                        <span className="font-bold text-emerald-700">⚠️ 重点：包含 a 和 b</span>
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
            <div className="bg-cyan-100 p-6 rounded-2xl border border-cyan-200 text-cyan-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Dices className="text-cyan-600" />
                    范围探索器
                </h2>
                <p>
                    调整滑块来改变随机数的范围。观察结果如何受到 <code>a</code> 和 <code>b</code> 的影响。
                </p>
            </div>

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
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MousePointer2 className="text-purple-600" />
                    随机召唤：choice
                </h2>
                <p>
                    <code>random.choice(sequence)</code>
                    <br />
                    从一个列表（或其他序列）中随机选出一个元素。
                </p>
            </div>

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
            <div className="bg-pink-100 p-6 rounded-2xl border border-pink-200 text-pink-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-pink-600" />
                    魔术师的秘密：洗牌与抽样
                </h2>
                <p>
                    <code>random.shuffle(list)</code>：打乱列表顺序（原地修改）<br />
                    <code>random.sample(list, k)</code>：随机抽取 k 个元素（不重复）
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

const RPSSlide = () => {
    const [warmedUp, setWarmedUp] = useState(false);
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    const rpsBlocks = [
        "import random",
        "options = ['石头', '剪刀', '布']",
        "computer = random.choice(options)",
        "player = input('你出什么？')"
    ];

    const choices = [
        { id: 'rock', name: '石头', icon: '✊' },
        { id: 'paper', name: '布', icon: '✋' },
        { id: 'scissors', name: '剪刀', icon: '✌️' }
    ];

    const play = (choiceId) => {
        setUserChoice(choiceId);
        setComputerChoice(null);
        setResult(null);

        setTimeout(() => {
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            setComputerChoice(randomChoice.id);

            if (choiceId === randomChoice.id) {
                setResult('draw');
            } else if (
                (choiceId === 'rock' && randomChoice.id === 'scissors') ||
                (choiceId === 'paper' && randomChoice.id === 'rock') ||
                (choiceId === 'scissors' && randomChoice.id === 'paper')
            ) {
                setResult('win');
            } else {
                setResult('lose');
            }
        }, 500);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-orange-600" />
                    实战：石头剪刀布
                </h2>
                <p>
                    想制作一个完整的随机游戏，我们需要几步“召唤咒语”。先来热热身！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    {!warmedUp ? (
                        <ParsonsProblem
                            blocks={rpsBlocks}
                            onCorrect={() => setWarmedUp(true)}
                        />
                    ) : (
                        <div className="space-y-4 animate-in fade-in zoom-in">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                                <Check size={20} /> 咒语已激活！
                            </div>
                            <CodeBlock code={rpsBlocks.join('\n') + '\n\n# ... 接下来是判断胜负逻辑'} />
                            <p className="text-sm text-slate-500 italic">“逻辑完整，施法成功！”</p>
                        </div>
                    )}
                </div>

                <div className={`bg-white p-6 rounded-2xl shadow-lg border-2 transition-all ${warmedUp ? 'border-orange-200 opacity-100' : 'border-slate-100 opacity-50 pointer-events-none'}`}>
                    <h3 className="font-bold text-lg mb-4">{warmedUp ? "开始决斗！" : "解锁后可开始决斗"}</h3>
                    <div className="flex justify-center gap-4 mb-8">
                        {choices.map(c => (
                            <button
                                key={c.id}
                                onClick={() => play(c.id)}
                                className={`text-4xl p-4 rounded-xl border-2 transition-all hover:scale-110 active:scale-95 ${userChoice === c.id ? 'bg-orange-100 border-orange-400 shadow-md' : 'border-slate-100 hover:border-orange-200'}`}
                            >
                                {c.icon}
                            </button>
                        ))}
                    </div>

                    {computerChoice && (
                        <div className="space-y-4 animate-in zoom-in duration-300">
                            <div className="flex items-center justify-center gap-4 text-xl">
                                <span>你: {choices.find(c => c.id === userChoice).icon}</span>
                                <Zap className="text-orange-400 rotate-12" size={24} />
                                <span>电脑: {choices.find(c => c.id === computerChoice).icon}</span>
                            </div>
                            <div className={`text-2xl font-black ${result === 'win' ? 'text-green-500' :
                                result === 'lose' ? 'text-red-500' : 'text-slate-500'
                                }`}>
                                {result === 'win' && '🎉 你赢了！'}
                                {result === 'lose' && '😢 电脑赢了'}
                                {result === 'draw' && '🤝 平局'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GuessNumberSlide = () => {
    const [target, setTarget] = useState(null);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [tries, setTries] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const startGame = () => {
        setTarget(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setMessage('我已经想好了一个 1 到 100 之间的数字。');
        setTries(0);
        setGameOver(false);
    };

    const handleGuess = () => {
        const num = parseInt(guess);
        if (isNaN(num)) return;

        setTries(t => t + 1);
        if (num === target) {
            setMessage(`🎉 恭喜！你猜对了！答案就是 ${target}。你用了 ${tries + 1} 次。`);
            setGameOver(true);
        } else if (num < target) {
            setMessage('📉 太小了！再大一点。');
        } else {
            setMessage('📈 太大了！再小一点。');
        }
        setGuess('');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-yellow-100 p-6 rounded-2xl border border-yellow-200 text-yellow-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="text-yellow-600" />
                    大挑战：猜数字
                </h2>
                <p>
                    经典的编程游戏。程序随机生成一个 1-100 的数字，你来猜。
                    程序会提示你“大了”还是“小了”。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
                    {!target ? (
                        <div className="py-12">
                            <Button onClick={startGame} className="w-full text-lg py-4">
                                开始新游戏
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full space-y-4">
                            <div className="text-sm font-bold text-slate-500">第 {tries + 1} 次尝试</div>
                            <div className="min-h-[3rem] text-lg font-medium text-slate-700">{message}</div>

                            {!gameOver && (
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={guess}
                                        onChange={(e) => setGuess(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                                        placeholder="1-100"
                                        className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-2 text-center text-xl font-bold focus:border-indigo-500 outline-none"
                                        autoFocus
                                    />
                                    <Button onClick={handleGuess}>猜!</Button>
                                </div>
                            )}

                            {gameOver && (
                                <Button onClick={startGame} variant="success" className="w-full">
                                    再玩一次
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <div className="overflow-y-auto max-h-[400px]">
                    <CodeBlock code={`import random

secret = random.randint(1, 100)
guess = 0

while guess != secret:
    guess = int(input("猜个数字 (1-100): "))
    
    if guess < secret:
        print("太小了")
    elif guess > secret:
        print("太大了")
    else:
        print("🎉 猜对了！")`} />
                </div>
            </div>
        </div>
    );
};

const DebugSlide = () => {
    const [fixed, setFixed] = useState(false);
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-100 p-6 rounded-2xl border border-red-200 text-red-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" />
                    魔法反噬：缩进错误
                </h2>
                <p>
                    Python 的代码非常“整洁”，所有的代码必须对齐。如果缩进错了，魔法就会失效！
                </p>
            </div>

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
            <div className="bg-teal-100 p-6 rounded-2xl border border-teal-200 text-teal-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calculator className="text-teal-600" />
                    小数魔法：random() 与 uniform()
                </h2>
                <p>
                    除了整数，Python 还能生成小数（浮点数）！
                    <br />
                    <code>random.random()</code>：生成 0 到 1 之间的小数
                    <br />
                    <code>random.uniform(a, b)</code>：生成 a 到 b 之间的小数
                </p>
            </div>

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

const PasswordGeneratorSlide = () => {
    const [length, setLength] = useState(12);
    const [password, setPassword] = useState('');
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    const generatePassword = () => {
        let chars = letters;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(result);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-violet-100 p-6 rounded-2xl border border-violet-200 text-violet-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Key className="text-violet-600" />
                    实战项目：密码生成器
                </h2>
                <p>
                    用 <code>random.choice()</code> 从字符池中随机挑选，组合成安全密码！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">密码长度: {length}</label>
                        <input
                            type="range"
                            min="6" max="24"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-violet-600"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="accent-violet-600 w-4 h-4" />
                            <span className="text-sm font-medium">包含数字</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="accent-violet-600 w-4 h-4" />
                            <span className="text-sm font-medium">包含符号</span>
                        </label>
                    </div>

                    <CodeBlock code={`import random\nimport string\n\nchars = string.ascii_letters\n${includeNumbers ? 'chars += string.digits\n' : ''}${includeSymbols ? 'chars += "!@#$%^&*"\n' : ''}\npassword = ""\nfor i in range(${length}):\n    password += random.choice(chars)\n\nprint(password)`} />

                    <Button onClick={generatePassword} className="w-full bg-violet-600 hover:bg-violet-700">
                        生成密码
                    </Button>
                </div>

                <div className="flex flex-col items-center justify-center bg-slate-900 p-8 rounded-2xl text-center">
                    <div className="text-sm font-bold text-slate-400 mb-4">生成的密码</div>
                    <div className="bg-slate-800 p-4 rounded-xl w-full mb-4 overflow-x-auto">
                        <code className="text-xl font-mono text-emerald-400 break-all">
                            {password || '点击生成...'}
                        </code>
                    </div>
                    {password && (
                        <Button onClick={copyToClipboard} variant={copied ? 'success' : 'secondary'} className="w-full">
                            {copied ? '✓ 已复制' : '复制密码'}
                        </Button>
                    )}
                    <div className="mt-4 text-xs text-slate-500">
                        强度：{length >= 16 && includeNumbers && includeSymbols ? '💪 强' : length >= 10 ? '👍 中' : '⚠️ 弱'}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CoinFlipStatsSlide = () => {
    const [flips, setFlips] = useState([]);
    const [isFlipping, setIsFlipping] = useState(false);
    const [batchSize, setBatchSize] = useState(10);

    const flipCoins = () => {
        setIsFlipping(true);
        const newFlips = [];
        for (let i = 0; i < batchSize; i++) {
            newFlips.push(Math.random() < 0.5 ? 'H' : 'T');
        }
        setTimeout(() => {
            setFlips(prev => [...prev, ...newFlips]);
            setIsFlipping(false);
        }, 300);
    };

    const reset = () => setFlips([]);

    const heads = flips.filter(f => f === 'H').length;
    const tails = flips.length - heads;
    const headPercent = flips.length > 0 ? (heads / flips.length * 100).toFixed(1) : 0;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-100 p-6 rounded-2xl border border-amber-200 text-amber-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Coins className="text-amber-600" />
                    概率实验：抛硬币统计
                </h2>
                <p>
                    抛硬币无数次，正面和反面的比例会趋近于 <strong>50%</strong>。这就是<strong>大数定律</strong>！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">每次抛: {batchSize} 个</label>
                        <input
                            type="range"
                            min="1" max="100"
                            value={batchSize}
                            onChange={(e) => setBatchSize(parseInt(e.target.value))}
                            className="w-full accent-amber-600"
                        />
                    </div>

                    <CodeBlock code={`import random\n\nheads = 0\nfor i in range(${batchSize}):\n    if random.random() < 0.5:\n        heads += 1\n\nprint(f"正面: {heads}, 反面: {${batchSize} - heads}")`} />

                    <div className="flex gap-2">
                        <Button onClick={flipCoins} disabled={isFlipping} className="flex-1 bg-amber-600 hover:bg-amber-700">
                            {isFlipping ? '抛...' : '🪙 抛硬币'}
                        </Button>
                        <Button onClick={reset} variant="secondary">重置</Button>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-amber-600">{flips.length}</div>
                            <div className="text-xs text-slate-500">总次数</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-emerald-600">{heads}</div>
                            <div className="text-xs text-slate-500">正面 🪙</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-rose-600">{tails}</div>
                            <div className="text-xs text-slate-500">反面 🔴</div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    {flips.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-12 text-right text-sm font-bold text-emerald-600">正面</div>
                                <div className="flex-1 h-6 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${headPercent}%` }}></div>
                                </div>
                                <div className="w-12 text-sm font-bold text-emerald-600">{headPercent}%</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-12 text-right text-sm font-bold text-rose-600">反面</div>
                                <div className="flex-1 h-6 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${100 - headPercent}%` }}></div>
                                </div>
                                <div className="w-12 text-sm font-bold text-rose-600">{(100 - headPercent).toFixed(1)}%</div>
                            </div>
                        </div>
                    )}

                    {flips.length === 0 && (
                        <div className="text-center text-slate-400 py-8">
                            点击"抛硬币"开始实验
                        </div>
                    )}

                    {flips.length > 100 && Math.abs(parseFloat(headPercent) - 50) < 3 && (
                        <div className="text-center text-emerald-600 font-bold animate-pulse">
                            ✨ 大数定律生效中！趋近 50%
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MonkeySortSlide = () => {
    const [deck, setDeck] = useState([1, 2, 3, 4, 5]);
    const [shuffled, setShuffled] = useState([...deck].sort(() => Math.random() - 0.5));
    const [attempts, setAttempts] = useState(0);
    const [sorting, setSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    // Auto sorter
    useEffect(() => {
        if (!sorting) return;

        const interval = setInterval(() => {
            setShuffled(prev => {
                const next = [...prev].sort(() => Math.random() - 0.5);
                // Check sorted
                const sorted = next.every((val, i) => val === deck[i]);
                if (sorted) {
                    setIsSorted(true);
                    setSorting(false);
                }
                return next;
            });
            setAttempts(a => a + 1);
        }, 50);

        return () => clearInterval(interval);
    }, [sorting, deck]);

    const handleSort = () => {
        if (isSorted) {
            // Reset
            setShuffled([...deck].sort(() => Math.random() - 0.5));
            setAttempts(0);
            setIsSorted(false);
            setSorting(false);
        } else {
            setSorting(!sorting);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-fuchsia-100 p-6 rounded-2xl border border-fuchsia-200 text-fuchsia-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Shuffle className="text-fuchsia-600" />
                    趣味挑战：猴子排序 (Bogo Sort)
                </h2>
                <p>
                    如果给一只无限寿命的猴子一个打字机，它最终能敲出《莎士比亚全集》。<br />
                    同理，如果我们<strong>随机打乱</strong>一组数字足够多次，它们最终也会<strong>恰好排好序</strong>！
                    这就是著名的（极其低效的）<strong>猴子排序</strong>。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <CodeBlock code={`import random

def is_sorted(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i+1]:
            return False
    return True

nums = [1, 2, 3, 4, 5]
random.shuffle(nums)
count = 0

while not is_sorted(nums):
    random.shuffle(nums)
    count += 1
    print(f"第 {count} 次尝试: {nums}")

print("终于排好序了！🎉")`} />
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm text-amber-800 flex items-start gap-2">
                        <Zap size={18} className="text-amber-500 flex-shrink-0" />
                        <p><strong>警告：</strong> 只要数字稍微多一点（比如10个），你可能要等到宇宙毁灭才能排好序！</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center">
                    <div className="text-sm font-bold text-slate-400 mb-6">目标顺序: 1, 2, 3, 4, 5</div>

                    <div className="flex gap-2 mb-8">
                        {shuffled.map((num, i) => (
                            <div
                                key={i}
                                className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-200
                                ${isSorted
                                        ? 'bg-emerald-500 text-white scale-110 shadow-lg'
                                        : num === deck[i]
                                            ? 'bg-fuchsia-100 text-fuchsia-600 border border-fuchsia-200'
                                            : 'bg-slate-100 text-slate-400'}`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-6">
                        <div className="text-3xl font-black text-slate-700 font-mono">
                            {attempts}
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest">尝试次数</div>
                    </div>

                    <Button
                        onClick={handleSort}
                        variant={isSorted ? 'success' : sorting ? 'danger' : 'primary'}
                        className="w-full py-4 text-lg"
                    >
                        {isSorted ? "太棒了！重置" : sorting ? "停止尝试" : "开始猴子排序 🐵"}
                    </Button>

                    {isSorted && (
                        <div className="mt-4 text-emerald-600 font-bold animate-bounce">
                            🎉 运气爆棚！排序完成！
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

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
    { id: 8, title: '拼图', icon: Layers, component: RPSSlide },
    { id: 9, title: '猜数', icon: HelpCircle, component: GuessNumberSlide },
    { id: 10, title: '密码', icon: Key, component: PasswordGeneratorSlide },
    { id: 11, title: '统计', icon: Coins, component: CoinFlipStatsSlide },
    { id: 12, title: '纠错', icon: AlertTriangle, component: DebugSlide },
    { id: 13, title: '猴子', icon: Shuffle, component: MonkeySortSlide },
    { id: 14, title: '总结', icon: Trophy, component: SummarySlide },
];

const lessonQuality = {
    goals: ['理解 random 模块如何制造不确定性', '会使用 randint、choice、shuffle 和 random', '能把随机结果用于游戏规则和统计模拟'],
    deliverables: ['完成一个猜数字或石头剪刀布小游戏', '做一次抛硬币统计实验', '写出一个随机密码生成器雏形'],
    checks: ['能说明随机范围是否包含边界', '能判断列表被 choice 和 shuffle 后的变化', '能发现随机逻辑中的分支遗漏'],
};

export default function PythonFoundation6() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Error</div>);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                    <span className="text-lg">F6: 随机世界</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600"
                    aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 hidden md:block">
                    <h1 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        </Link>
                        <span className="bg-emerald-600 text-white p-1 rounded text-sm">Python</span>
                        F6: 随机世界
                    </h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${activeSection === section.id
                                ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-emerald-600' : 'text-slate-400'} />
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        </header>
                        <PythonFoundationSupport lessonId="f6" />
                        <LessonQualityBar
                            goals={lessonQuality.goals}
                            deliverables={lessonQuality.deliverables}
                            checks={lessonQuality.checks}
                            accent="teal"
                        />
                        <ActiveComponent />
                        <PythonFoundationSupport lessonId="f6" placement="bottom" />
                    </div>
                </div>

                {/* Footer Nav */}
                <div className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all
                            ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ArrowRight className="rotate-180" size={18} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/f7');
                            }
                        }}
                        className="px-6 py-2 rounded-lg flex items-center gap-2 font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all hover:-translate-y-0.5"
                    >
                        {activeSection === sections.length ? '进入 F7' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
