import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Dices, Shuffle, HelpCircle, Trophy, BookOpen,
    Zap, Star, Menu, X, ArrowRight, MousePointer2
} from 'lucide-react';

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

const CodeBlock = ({ code }) => (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto">
        <pre>{code}</pre>
    </div>
);

// --- Slides ---

const IntroSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Dices className="text-indigo-600" />
                随机的世界
            </h2>
            <p className="text-lg leading-relaxed">
                生活中充满了<strong>随机 (Random)</strong>：
                <br />
                🎲 掷骰子的点数
                <br />
                🪙 抛硬币的正反面
                <br />
                🃏 抽奖的幸运儿
                <br />
                在编程中，我们可以用代码来模拟这些“运气”！
            </p>
        </div>
        <div className="flex justify-center">
            <div className="text-9xl animate-bounce">🎲</div>
        </div>
    </div>
);

const ImportSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-blue-600" />
                引入随机模块
            </h2>
            <p>
                Python 自带了一个强大的工具箱，叫做 <strong>模块 (Module)</strong>。
                <br />
                要使用随机功能，我们需要先告诉 Python：
            </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
            <CodeBlock code={`import random\n\n# 现在可以使用 random 里面的功能了！`} />
            <div className="mt-6 text-slate-600">
                <p>就像是打开了工具箱，拿出 <code>random</code> 这个工具。</p>
            </div>
        </div>
    </div>
);

const RandIntSlide = () => {
    const [result, setResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);

    const rollDice = () => {
        setIsRolling(true);
        let count = 0;
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * 6) + 1);
            count++;
            if (count > 10) {
                clearInterval(interval);
                setIsRolling(false);
            }
        }, 100);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-100 p-6 rounded-2xl border border-emerald-200 text-emerald-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Shuffle className="text-emerald-600" />
                    随机整数：randint
                </h2>
                <p>
                    <code>random.randint(a, b)</code>
                    <br />
                    生成一个 <strong>a 到 b 之间</strong>（包含 a 和 b）的随机整数。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <CodeBlock code={`import random\n\n# 生成 1 到 6 之间的随机数\ndice = random.randint(1, 6)\nprint(dice)`} />
                    <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                        <p>试一试：模拟掷骰子！</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <div className={`text-6xl font-bold mb-6 text-indigo-600 ${isRolling ? 'animate-spin' : ''}`}>
                        {result === null ? "?" : result}
                    </div>
                    <Button onClick={rollDice} disabled={isRolling} className="w-full">
                        {isRolling ? "掷骰子中..." : "运行代码 (掷骰子)"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const ChoiceSlide = () => {
    const [choice, setChoice] = useState(null);
    const options = ['苹果 🍎', '香蕉 🍌', '橘子 🍊', '葡萄 🍇'];

    const pickOne = () => {
        const randomElement = options[Math.floor(Math.random() * options.length)];
        setChoice(randomElement);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MousePointer2 className="text-purple-600" />
                    随机选择：choice
                </h2>
                <p>
                    <code>random.choice(sequence)</code>
                    <br />
                    从一个列表（或其他序列）中随机选出一个元素。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <CodeBlock code={`import random\n\nfruits = ["苹果", "香蕉", "橘子", "葡萄"]\n\n# 随机选一个\nlucky_fruit = random.choice(fruits)\nprint(lucky_fruit)`} />
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex gap-2 mb-6 text-2xl">
                        {options.map((opt, i) => (
                            <span key={i} className={choice === opt ? "scale-125 transition-transform" : "opacity-50"}>
                                {opt.split(' ')[1]}
                            </span>
                        ))}
                    </div>
                    <div className="text-xl font-bold mb-6 text-purple-600 min-h-[2rem]">
                        {choice ? `选中了：${choice}` : "点击按钮开始选择"}
                    </div>
                    <Button onClick={pickOne} variant="primary" className="w-full bg-purple-600 hover:bg-purple-700">
                        随机选水果
                    </Button>
                </div>
            </div>
        </div>
    );
};

const RPSSlide = () => {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    const choices = [
        { id: 'rock', name: '石头', icon: '✊' },
        { id: 'paper', name: '布', icon: '✋' },
        { id: 'scissors', name: '剪刀', icon: '✌️' }
    ];

    const play = (choiceId) => {
        setUserChoice(choiceId);

        // Simple artificial delay for effect
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
                    结合 <code>input()</code> 和 <code>random.choice()</code> 来做一个游戏吧！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <CodeBlock code={`import random\n\noptions = ["石头", "剪刀", "布"]\ncomputer = random.choice(options)\nplayer = input("出什么？")\n\nif player == computer:\n    print("平局")\nelif ...: # 判断胜负\n    print("你赢了")`} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                    <h3 className="font-bold text-lg mb-4">请出拳！</h3>
                    <div className="flex justify-center gap-4 mb-8">
                        {choices.map(c => (
                            <button
                                key={c.id}
                                onClick={() => play(c.id)}
                                className={`text-4xl p-4 rounded-xl border-2 transition-all hover:scale-110 active:scale-95 ${userChoice === c.id ? 'bg-orange-100 border-orange-400' : 'border-slate-100 hover:border-orange-200'}`}
                            >
                                {c.icon}
                            </button>
                        ))}
                    </div>

                    {computerChoice && (
                        <div className="space-y-4 animate-in zoom-in duration-300">
                            <div className="flex items-center justify-center gap-4 text-xl">
                                <span>你: {choices.find(c => c.id === userChoice).icon}</span>
                                <span className="text-slate-400">vs</span>
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

const SummarySlide = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-3xl text-white shadow-xl text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300 animate-bounce" />
                <h2 className="text-3xl font-bold mb-2">随机大师！</h2>
                <p className="text-indigo-100 text-lg">
                    你已经学会了如何让 Python 充满“不确定性”。
                    <br />
                    这是制作游戏和模拟现实世界的关键！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-700">
                        <BookOpen size={20} className="text-indigo-500" />
                        核心知识点
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">import random</code>
                            <span>引入随机模块</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">random.randint(a, b)</code>
                            <span>生成 [a, b] 范围内的整数</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">random.choice(seq)</code>
                            <span>从列表中随机选一个</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                    <Star className="w-12 h-12 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-emerald-900 mb-2">课程完成！</h3>
                    <div className="flex gap-4">
                        <Link to="/">
                            <Button variant="secondary">返回主页</Button>
                        </Link>
                        <Link to="/python/a1">
                            <Button variant="success">下一阶段：进阶挑战</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Course Component ---

const sections = [
    { id: 1, title: '随机', icon: Dices, component: IntroSlide },
    { id: 2, title: '模块', icon: BookOpen, component: ImportSlide },
    { id: 3, title: '骰子', icon: Shuffle, component: RandIntSlide },
    { id: 4, title: '选择', icon: MousePointer2, component: ChoiceSlide },
    { id: 5, title: '游戏', icon: Zap, component: RPSSlide },
    { id: 6, title: '挑战', icon: HelpCircle, component: GuessNumberSlide },
    { id: 7, title: '总结', icon: Trophy, component: SummarySlide },
];

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
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
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
                        <ActiveComponent />
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
                                navigate('/python/a1');
                            }
                        }}
                        className="px-6 py-2 rounded-lg flex items-center gap-2 font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all hover:-translate-y-0.5"
                    >
                        {activeSection === sections.length ? '完成课程' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
