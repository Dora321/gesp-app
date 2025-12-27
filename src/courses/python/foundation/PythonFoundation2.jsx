import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Repeat, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, Play, RefreshCw, XCircle } from 'lucide-react';

// --- Shared Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-md",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
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

// --- Sections ---

// 1. Boolean Logic Slide (True/False Gates)
const BooleanSlide = () => {
    const [switches, setSwitches] = useState({ a: false, b: false });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="text-blue-600" />
                    布尔逻辑：非黑即白
                </h2>
                <p className="text-lg mb-4">
                    计算机的世界只有两种状态：<strong>True (真)</strong> 和 <strong>False (假)</strong>。
                    这就像电灯的开关，要么开，要么关。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <h3 className="font-bold text-slate-700 mb-4">操作面板</h3>
                    <div className="flex gap-8 justify-center mb-6">
                        {['a', 'b'].map(key => (
                            <div key={key} className="flex flex-col items-center gap-2">
                                <span className="font-mono font-bold text-slate-400 uppercase">{key}</span>
                                <button
                                    onClick={() => setSwitches(p => ({ ...p, [key]: !p[key] }))}
                                    className={`
                                        w-16 h-24 rounded-full border-4 transition-colors relative
                                        ${switches[key] ? 'bg-green-500 border-green-600' : 'bg-slate-200 border-slate-300'}
                                    `}
                                >
                                    <div className={`
                                        absolute w-12 h-12 bg-white rounded-full shadow-md left-1 transition-all duration-300
                                        ${switches[key] ? 'top-1' : 'top-10'}
                                    `}></div>
                                </button>
                                <span className={`font-bold font-mono ${switches[key] ? 'text-green-600' : 'text-slate-400'}`}>
                                    {switches[key] ? 'True' : 'False'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg text-white font-mono space-y-4">
                    <h3 className="text-slate-400 text-sm uppercase mb-2">逻辑运算结果</h3>

                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span>A <span className="text-orange-400">and</span> B</span>
                        <span className={switches.a && switches.b ? 'text-green-400' : 'text-red-400'}>
                            {String(switches.a && switches.b)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span>A <span className="text-orange-400">or</span> B</span>
                        <span className={switches.a || switches.b ? 'text-green-400' : 'text-red-400'}>
                            {String(switches.a || switches.b)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span><span className="text-orange-400">not</span> A</span>
                        <span className={!switches.a ? 'text-green-400' : 'text-red-400'}>
                            {String(!switches.a)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Conditionals Slide (Traffic Light)
const ConditionSlide = () => {
    const [light, setLight] = useState('red'); // red, yellow, green

    const getAction = () => {
        if (light === 'red') return 'Stop! 🛑';
        if (light === 'yellow') return 'Wait... ⚠️';
        if (light === 'green') return 'Go! 🚀';
        return '';
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <GitBranch className="text-orange-600" />
                    条件判断：智慧抉择
                </h2>
                <p>
                    <strong>if (如果)</strong>, <strong>elif (否则如果)</strong>, <strong>else (否则)</strong> 是程序的“大脑”。
                    它们让程序根据不同的情况做出不同的反应。
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-10">
                {/* Traffic Light */}
                <div className="bg-slate-800 p-6 rounded-3xl shadow-2xl border-4 border-slate-700 flex flex-col gap-4">
                    {['red', 'yellow', 'green'].map(color => (
                        <div
                            key={color}
                            onClick={() => setLight(color)}
                            className={`
                                w-20 h-20 rounded-full cursor-pointer transition-all duration-300 shadow-inner
                                ${light === color ? `bg-${color}-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-110 z-10` : 'bg-slate-700 opacity-30'}
                                ${light === color && color === 'red' ? 'shadow-red-500/50' : ''}
                                ${light === color && color === 'yellow' ? 'shadow-yellow-500/50' : ''}
                                ${light === color && color === 'green' ? 'shadow-green-500/50' : ''}
                            `}
                        />
                    ))}
                </div>

                {/* Code Logic */}
                <div className="flex-1 max-w-md space-y-4">
                    <div className="relative">
                        <CodeBlock code={`
if light == 'red':
    print("Stop! 🛑")
elif light == 'yellow':
    print("Wait... ⚠️")
else:
    print("Go! 🚀")
                        `} />
                        {/* Highlight overlay */}
                        <div className={`absolute left-0 w-full h-6 bg-yellow-500/20 pointer-events-none transition-all duration-300
                            ${light === 'red' ? 'top-[20px]' : light === 'yellow' ? 'top-[60px]' : 'top-[100px]'}
                         `}></div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center">
                        <span className="font-bold text-slate-500">执行结果:</span>
                        <span className="text-2xl font-bold text-slate-800 animate-pulse">{getAction()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Loop Strategy (Robot)
const LoopSlide = () => {
    const [steps, setSteps] = useState(0);
    const [isThinking, setIsThinking] = useState(false);

    // Simulate loop execution
    const runLoop = async (count) => {
        if (isThinking) return;
        setIsThinking(true);
        setSteps(0);

        for (let i = 0; i < count; i++) {
            await new Promise(r => setTimeout(r, 600));
            setSteps(prev => prev + 1);
        }
        setIsThinking(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Repeat className="text-indigo-600" />
                    循环：不知疲倦的机器
                </h2>
                <p>
                    <strong>for 循环</strong> 像是一个计数器，让程序重复执行特定的次数。
                    不用写 100 遍代码，只需要告诉程序“重复 100 次”。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">控制台</h3>
                    <CodeBlock code={`
# 让机器人走5步
for i in range(5):
    robot.walk()
    print(f"走了 {i+1} 步")
                     `} />
                    <Button
                        onClick={() => runLoop(5)}
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
                        style={{ transform: `translateX(${(steps - 2.5) * 60}px)` }}
                    >
                        🤖
                    </div>

                    <div className="mt-8 font-bold text-indigo-600 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm">
                        已走步数: {steps} / 5
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. While/Break Challenge
const ChallengeSlide = () => {
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
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" />
                    While 循环与中断
                </h2>
                <p>
                    <strong>while</strong> 只要条件满足就会一直执行。小心不要写出<strong>死循环</strong>（永远停不下来）！
                    我们可以用 <strong>break</strong> 紧急刹车。
                </p>
            </div>

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

const sections = [
    { id: 1, title: '布尔逻辑', icon: CheckCircle, component: BooleanSlide },
    { id: 2, title: '条件判断', icon: GitBranch, component: ConditionSlide },
    { id: 3, title: 'For 循环', icon: Repeat, component: LoopSlide },
    { id: 4, title: 'While & Break', icon: AlertTriangle, component: ChallengeSlide },
];

export default function PythonFoundation2() {
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200">
                                <span className="text-lg">🏠</span>
                            </div>
                        </Link>
                        F2: 流程控制
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Python 基础体系</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium
                        ${activeSection === section.id
                                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                    `}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-blue-600' : 'text-slate-400'} />
                            {section.title}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-blue-100 text-xs font-bold uppercase tracking-wider">NEXT</span>
                            <RefreshCw size={16} className="text-blue-200" />
                        </div>
                        <div className="font-bold text-sm">F3: 数据结构探秘</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            {sections.find(s => s.id === activeSection)?.title}
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                    </header>

                    <ActiveComponent />

                    <div className="mt-12 flex justify-between border-t border-slate-200 pt-8">
                        <Button
                            variant="secondary"
                            onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                            className={activeSection === 1 ? 'opacity-0 pointer-events-none' : ''}
                        >
                            上一章
                        </Button>
                        <Button
                            onClick={() => setActiveSection(prev => Math.min(sections.length, prev + 1))}
                            className={activeSection === sections.length ? 'opacity-0 pointer-events-none' : ''}
                        >
                            继续学习 <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
