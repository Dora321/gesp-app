import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Box, Calculator, MessageSquare, ArrowRight, Play, RefreshCw, CheckCircle, Tag, Bug, BookOpen, HelpCircle, Menu, X } from 'lucide-react';

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
// 5. Data Types Detective
const DataTypeSlide = () => {
    const [mystery, setMystery] = useState({ val: "123", type: "str" });

    const samples = [
        { val: "123", type: "str", hint: "被引号包围的都是字符串" },
        { val: 123, type: "int", hint: "没有小数点在这个整数" },
        { val: 3.14, type: "float", hint: "带小数点的数字" },
        { val: '"Hello"', type: "str", hint: "文字当然是字符串" },
    ];

    const checkType = (guess) => {
        if (guess === mystery.type) {
            alert("答对了！🎉 " + mystery.hint);
            setMystery(samples[Math.floor(Math.random() * samples.length)]);
        } else {
            alert("再想想... 🤔");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-pink-100 p-6 rounded-2xl border border-pink-200 text-pink-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Tag className="text-pink-600" />
                    数据类型侦探
                </h2>
                <p>
                    电脑看世界的方式和我们不一样。它把数据分成不同的<strong>类型(Type)</strong>。
                    <br />最常见的三种：<strong>整数(int)</strong>、<strong>小数(float)</strong>、<strong>字符串(str)</strong>。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center">
                    <div className="text-sm text-slate-400 font-bold uppercase mb-4">Mystery Box</div>
                    <div className="text-5xl font-mono font-bold text-indigo-600 bg-indigo-50 px-8 py-4 rounded-xl border-2 border-indigo-100 mb-6">
                        {typeof mystery.val === 'string' && !mystery.val.startsWith('"') ? `"${mystery.val}"` : mystery.val}
                    </div>
                    <p className="text-slate-500 text-center">它是哪种类型？</p>
                </div>

                <div className="grid gap-4">
                    <Button onClick={() => checkType('int')} className="h-16 text-lg bg-blue-500 hover:bg-blue-600">
                        🔢 整数 (int)
                    </Button>
                    <Button onClick={() => checkType('float')} className="h-16 text-lg bg-green-500 hover:bg-green-600">
                        🌊 小数 (float)
                    </Button>
                    <Button onClick={() => checkType('str')} className="h-16 text-lg bg-purple-500 hover:bg-purple-600">
                        🔤 字符串 (str)
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 6. Bug Hunter
const BugHuntSlide = () => {
    const [fixed, setFixed] = useState(false);
    const [code, setCode] = useState('print("Hello World)'); // Error: missing quote

    const fixCode = () => {
        setCode('print("Hello World")');
        setFixed(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-red-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Bug className="text-red-600" />
                    捉虫特工队
                </h2>
                <p>
                    程序里的错误叫做 <strong>Bug (臭虫)</strong>。哪怕只少了一个引号，程序也会罢工！
                    <br />作为程序员，我们的工作就是找到并消灭它们。
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-500 ml-2">broken_code.py</span>
                </div>

                <div className="font-mono text-lg mb-4">
                    <div className="text-slate-500">1</div>
                    <div className="flex items-center">
                        <span className="text-purple-400">print</span>
                        <span className="text-slate-100">(</span>
                        <span className="text-green-300">"Hello World</span>
                        <span className={fixed ? "text-green-300 transition-all" : "text-red-500 bg-red-500/20 px-1 rounded animate-pulse"}>
                            {fixed ? '"' : '?'}
                        </span>
                        <span className="text-slate-100">)</span>
                    </div>
                </div>

                {!fixed ? (
                    <div className="bg-red-900/50 border border-red-500/50 p-4 rounded text-red-200 font-mono text-sm mb-4">
                        SyntaxError: EOL while scanning string literal
                    </div>
                ) : (
                    <div className="bg-green-900/50 border border-green-500/50 p-4 rounded text-green-200 font-mono text-sm mb-4">
                        &gt; Hello World
                        <br />
                        Process finished with exit code 0
                    </div>
                )}

                <Button onClick={fixCode} disabled={fixed} variant={fixed ? "success" : "primary"}>
                    {fixed ? "Bug 已修复！🎉" : "🛠️ 修复 Bug"}
                </Button>
            </div>
        </div>
    );
};

// 7. Story Maker (Mad Libs)
const StorySlide = () => {
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [food, setFood] = useState("");
    const [age, setAge] = useState("");
    const [showStory, setShowStory] = useState(false);

    // Casting age to number for math
    const nextAge = Number(age) + 10;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-cyan-100 p-6 rounded-2xl border border-cyan-200 text-cyan-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="text-cyan-600" />
                    故事生成器
                </h2>
                <p>
                    让我们把<strong>变量</strong>(名字)、<strong>数字</strong>(年龄)和<strong>输出</strong>结合在一起！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
                    <h3 className="font-bold text-slate-700">1. 输入信息</h3>
                    <input
                        placeholder="名字 (如: 小明)"
                        value={name} onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <input
                        placeholder="今年几岁? (数字)"
                        type="number"
                        value={age} onChange={e => setAge(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <input
                        placeholder="地点 (如: 火星)"
                        value={place} onChange={e => setPlace(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <input
                        placeholder="食物 (如: 薯片)"
                        value={food} onChange={e => setFood(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <Button onClick={() => setShowStory(true)} disabled={!name || !place || !food || !age} className="w-full">
                        生成故事！
                    </Button>
                </div>

                <div className={`bg-amber-100 p-8 rounded-xl shadow-lg transform transition-all duration-500 rotate-1
                    ${showStory ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 blur-sm'}
                `}>
                    <h3 className="font-bold text-amber-800 mb-4 text-xl">📜 你的专属故事</h3>
                    <p className="text-lg leading-loose text-amber-900 font-serif">
                        10年后，
                        <span className="bg-white px-2 py-1 rounded mx-1 font-bold text-indigo-600 shadow-sm">{name || "___"}</span>
                        已经
                        <span className="bg-white px-2 py-1 rounded mx-1 font-bold text-red-600 shadow-sm">{age ? nextAge : "___"}</span>
                        岁了。
                        <br />
                        通过努力，他/她成功登陆了
                        <span className="bg-white px-2 py-1 rounded mx-1 font-bold text-purple-600 shadow-sm">{place || "___"}</span>
                        。
                        <br />
                        大家一起开心地吃着
                        <span className="bg-white px-2 py-1 rounded mx-1 font-bold text-orange-600 shadow-sm">{food || "___"}</span>
                        庆祝！
                        <br />
                        <span className="text-sm opacity-60 mt-2 block">(看！程序帮你算出了10年后的年龄：{age} + 10 = {nextAge})</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

// 8. Challenge
const ChallengeSlide = () => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const questions = [
        { id: 'q1', text: 'print("Hello") 的作用是？', options: ['打印纸张', '在屏幕显示文字', '保存文件'], correct: '在屏幕显示文字' },
        { id: 'q2', text: '10 + 20 * 2 的结果是？(注意优先级)', options: ['60', '50', '30'], correct: '50' },
        { id: 'q3', text: 'name = "Python"，print(name) 输出？', options: ['name', 'Python', '"Python"'], correct: 'Python' },
    ];

    const checkAnswers = () => {
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-yellow-100 p-6 rounded-2xl border border-yellow-200 text-yellow-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="text-yellow-600" />
                    小测验：萌新毕业考
                </h2>
                <p>
                    完成下面的挑战，看看你掌握了多少知识！
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                {questions.map((q, idx) => (
                    <div key={q.id} className="pb-4 border-b border-slate-100 last:border-0">
                        <p className="font-bold text-slate-700 mb-3">{idx + 1}. {q.text}</p>
                        <div className="flex flex-wrap gap-2">
                            {q.options.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                    className={`px-4 py-2 rounded-lg text-sm border transition-all
                                        ${answers[q.id] === opt
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}
                                    `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {score === null ? (
                    <Button onClick={checkAnswers} className="w-full">提交答案</Button>
                ) : (
                    <div className="text-center animate-in zoom-in">
                        <div className="text-4xl mb-2">{score === questions.length ? '🎉' : '💪'}</div>
                        <h3 className="text-xl font-bold text-slate-800">
                            你答对了 {score} / {questions.length} 题
                        </h3>
                        {score === questions.length ? (
                            <p className="text-green-500 mt-2">太棒了！你已经准备好进入下一章了！</p>
                        ) : (
                            <Button onClick={() => setScore(null)} variant="secondary" className="mt-4">再试一次</Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


const sections = [
    { id: 1, title: '初识 Python', icon: Terminal, component: IntroSlide },
    { id: 2, title: '变量魔法', icon: Box, component: VariableSlide },
    { id: 3, title: '与电脑对话', icon: MessageSquare, component: IOSlide },
    { id: 4, title: '运算游乐场', icon: Calculator, component: MathSlide },
    { id: 5, title: '数据侦探', icon: Tag, component: DataTypeSlide },
    { id: 6, title: '捉虫特工队', icon: Bug, component: BugHuntSlide },
    { id: 7, title: '故事生成器', icon: BookOpen, component: StorySlide },
    { id: 8, title: '萌新毕业考', icon: HelpCircle, component: ChallengeSlide },
];

export default function PythonFoundation1() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                    <span className="text-lg">F1: 语法启蒙</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-0 z-30 bg-white md:static md:w-64 border-r border-slate-200 flex flex-col flex-shrink-0 transition-transform duration-300 md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
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
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-slate-400">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
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
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                            {sections.find(s => s.id === activeSection)?.title}
                        </h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                    </header>

                    <ActiveComponent />

                    <div className="mt-8 md:mt-12 flex justify-between border-t border-slate-200 pt-6 md:pt-8 pb-8">
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
