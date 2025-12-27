import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Box, Calculator, MessageSquare, ArrowRight, Play, RefreshCw, CheckCircle } from 'lucide-react';

// --- Shared Components (will move to separate files later if needed) ---
const Button = ({ onClick, children, className, variant = 'primary' }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-md",
    };
    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
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

// 1. Python Intro Slide
const IntroSlide = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Terminal className="text-indigo-600" />
                    什么是 Python?
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                    想象一下，如果你能用一种“魔法语言”直接告诉电脑帮你写作业、画画、甚至控制机器人，那该多酷？
                    <br />
                    <strong>Python 就是这种魔法语言！</strong> 它是世界上最受人们喜爱（包括科学家和骇客）的编程语言之一。
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h3 className="font-bold text-indigo-600 mb-2">简单易学</h3>
                        <p className="text-sm text-slate-600">写代码就像写英语句子一样简单直观。</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h3 className="font-bold text-indigo-600 mb-2">无所不能</h3>
                        <p className="text-sm text-slate-600">从做网站、开发游戏到人工智能，它样样精通。</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl text-center">
                <h3 className="text-slate-300 mb-4 text-sm uppercase tracking-wider">你的第一行代码</h3>
                <CodeBlock code={`print("Hello, World!")`} />
                <p className="text-slate-400 mt-4 text-sm">
                    点击“运行”按钮，看看电脑会说什么？
                </p>
                <div className="mt-4 inline-block bg-black text-green-400 font-mono px-4 py-2 rounded border border-slate-700">
                    &gt; Hello, World!
                </div>
            </div>
        </div>
    );
};

// 2. Variables Slide (The Box Metaphor)
const VariableSlide = () => {
    const [boxName, setBoxName] = useState('score');
    const [boxValue, setBoxValue] = useState(100);
    const [isAnimating, setIsAnimating] = useState(false);

    const updateBox = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
        setBoxValue(prev => prev + 10);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Box className="text-purple-600" />
                    变量：超级收纳盒
                </h2>
                <p className="text-lg mb-4">
                    变量就像是一个贴了标签的<strong>盒子</strong>。我们可以把任何东西（数字、文字）放进去。
                    你可以随时把盒子里的东西拿出来用，或者换成新的东西。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <h3 className="font-bold text-slate-700 mb-4">代码示例</h3>
                    <div className="space-y-2">
                        <CodeBlock code={`${boxName} = ${boxValue}`} />
                        <Button onClick={updateBox} className="w-full mt-4" variant="secondary">
                            {boxName} = {boxName} + 10
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center relative h-48">
                    <div className="text-sm font-bold text-slate-400 mb-2">内存空间</div>
                    <div className={`
                relative w-32 h-32 bg-purple-500 rounded-xl shadow-2xl flex items-center justify-center
                transition-transform duration-300
                ${isAnimating ? 'scale-110 rotate-3' : ''}
             `}>
                        <div className="absolute -top-4 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full shadow-md text-sm border-2 border-white">
                            {boxName}
                        </div>
                        <span className="text-4xl font-bold text-white font-mono">{boxValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. I/O Slide (Chat with Computer)
const IOSlide = () => {
    const [inputVal, setInputVal] = useState('');
    const [chatLog, setChatLog] = useState([
        { sender: 'computer', text: '你好！我是 Python 机器人。你叫什么名字？' }
    ]);

    const handleSend = () => {
        if (!inputVal.trim()) return;
        const newLog = [...chatLog, { sender: 'user', text: inputVal }];
        setChatLog(newLog);
        setInputVal('');

        setTimeout(() => {
            setChatLog(prev => [...prev, {
                sender: 'computer',
                text: `很高兴认识你，${inputVal}！这行字是我用 print() 拼出来的哦。`
            }]);
        }, 800);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="text-blue-600" />
                    输入与输出
                </h2>
                <p>
                    <strong>input()</strong> 是机器人的耳朵，用来听你说什么。<br />
                    <strong>print()</strong> 是机器人的嘴巴，用来回答你。
                </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-lg mx-auto shadow-inner">
                <div className="h-64 overflow-y-auto mb-4 space-y-3 p-2">
                    {chatLog.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                            max-w-[80%] px-4 py-2 rounded-2xl text-sm
                            ${msg.sender === 'user'
                                    ? 'bg-indigo-500 text-white rounded-br-none'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}
                        `}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="输入你的名字..."
                    />
                    <Button onClick={handleSend} className="px-6">发送</Button>
                </div>
            </div>
        </div>
    );
};

// 4. Math Playground
const MathSlide = () => {
    const [a, setA] = useState(10);
    const [b, setB] = useState(3);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-green-100 p-6 rounded-2xl border border-green-200 text-green-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calculator className="text-green-600" />
                    运算游乐场
                </h2>
                <p>Python 是个超强的计算器。除了加减乘除，它还有两个特别厉害的符号：
                    <br /><code>%</code> (取余数) 和 <code>//</code> (整除)。</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Controls */}
                <div className="col-span-2 md:col-span-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-8 justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <label className="font-bold text-slate-500 uppercase text-xs">A</label>
                        <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-20 text-center font-mono text-xl border rounded p-1" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <label className="font-bold text-slate-500 uppercase text-xs">B</label>
                        <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-20 text-center font-mono text-xl border rounded p-1" />
                    </div>
                </div>

                {/* Operations */}
                {[
                    { op: '+', label: '加法 (Add)', res: a + b },
                    { op: '-', label: '减法 (Sub)', res: a - b },
                    { op: '*', label: '乘法 (Mul)', res: a * b },
                    { op: '/', label: '除法 (Div)', res: b !== 0 ? (a / b).toFixed(2) : 'Error' },
                    { op: '//', label: '整除 (Floor)', res: b !== 0 ? Math.floor(a / b) : 'Error', highlight: true },
                    { op: '%', label: '取余 (Mod)', res: b !== 0 ? a % b : 'Error', highlight: true },
                ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl text-center border transition-all hover:scale-105 ${item.highlight ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-200' : 'bg-white text-slate-700 shadow-sm'}`}>
                        <div className="text-xs opacity-70 mb-1">{item.label}</div>
                        <div className="text-2xl font-mono font-bold">
                            {a} <span className="opacity-50">{item.op}</span> {b} <span className="opacity-50">=</span> {item.res}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


const sections = [
    { id: 1, title: '初识 Python', icon: Terminal, component: IntroSlide },
    { id: 2, title: '变量魔法', icon: Box, component: VariableSlide },
    { id: 3, title: '与电脑对话', icon: MessageSquare, component: IOSlide },
    { id: 4, title: '运算游乐场', icon: Calculator, component: MathSlide },
];

export default function PythonFoundation1() {
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center overflow-hidden border border-indigo-200">
                                <span className="text-lg">🏠</span>
                            </div>
                        </Link>
                        F1: 语法启蒙
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
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                    `}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                            {section.title}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">NEXT</span>
                            <RefreshCw size={16} className="text-indigo-200" />
                        </div>
                        <div className="font-bold text-sm">F2: 流程控制大师</div>
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
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
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
