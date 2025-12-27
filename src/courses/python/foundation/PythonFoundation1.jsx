import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Box, Calculator, MessageSquare, ArrowRight, Play, RefreshCw, CheckCircle, Tag, Bug, BookOpen, HelpCircle, Menu, X, Sparkles, Globe, Code, Palette, TrendingUp } from 'lucide-react';

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

// 2. Python in Real World
const RealWorldSlide = () => {
    const [selectedApp, setSelectedApp] = useState(null);

    const applications = [
        {
            id: 'ai',
            title: '🤖 人工智能',
            icon: '🧠',
            color: 'from-purple-500 to-pink-500',
            examples: ['ChatGPT 聊天机器人', '人脸识别', '语音助手', '图像生成'],
            description: 'Python 是 AI 和机器学习的首选语言！像 ChatGPT 这样的智能助手就是用 Python 开发的。',
            fact: '全球 80% 的 AI 项目使用 Python'
        },
        {
            id: 'web',
            title: '🌐 网站开发',
            icon: '💻',
            color: 'from-blue-500 to-cyan-500',
            examples: ['Instagram', 'YouTube', 'Spotify', 'Netflix'],
            description: '你每天使用的很多网站和应用都是用 Python 构建的！',
            fact: 'Instagram 每天处理超过 10 亿张照片'
        },
        {
            id: 'games',
            title: '🎮 游戏开发',
            icon: '🕹️',
            color: 'from-green-500 to-emerald-500',
            examples: ['Minecraft 模组', 'EVE Online', '独立游戏', '游戏工具'],
            description: 'Python 可以用来开发游戏和创建游戏模组，让游戏更有趣！',
            fact: 'Minecraft 的很多模组都是用 Python 编写的'
        },
        {
            id: 'science',
            title: '🔬 科学研究',
            icon: '🚀',
            color: 'from-orange-500 to-red-500',
            examples: ['NASA 太空探索', '天气预报', '基因研究', '数据分析'],
            description: 'NASA 使用 Python 来分析太空数据和控制火星探测器！',
            fact: 'NASA 的火星探测器使用 Python 处理图像'
        },
        {
            id: 'automation',
            title: '🤖 自动化',
            icon: '⚡',
            color: 'from-yellow-500 to-amber-500',
            examples: ['智能家居', '机器人控制', '自动化测试', '办公自动化'],
            description: 'Python 可以帮你自动完成重复的任务，节省时间！',
            fact: 'Python 可以控制机器人和智能设备'
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="text-indigo-600" />
                    Python 在现实世界中
                </h2>
                <p className="text-lg leading-relaxed">
                    Python 不仅仅是一门编程语言，它正在<strong>改变世界</strong>！
                    从你每天使用的应用到探索宇宙的太空船，Python 无处不在。
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map(app => (
                    <div
                        key={app.id}
                        onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)}
                        className={`
                            relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105
                            bg-gradient-to-br ${app.color} text-white shadow-lg hover:shadow-2xl
                            ${selectedApp === app.id ? 'ring-4 ring-white scale-105' : ''}
                        `}
                    >
                        <div className="text-4xl mb-3">{app.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{app.title}</h3>
                        <div className={`transition-all duration-300 ${selectedApp === app.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <p className="text-sm mb-3 text-white/90">{app.description}</p>
                            <div className="space-y-1 mb-3">
                                {app.examples.map((ex, idx) => (
                                    <div key={idx} className="text-xs bg-white/20 rounded px-2 py-1 backdrop-blur-sm">
                                        ✓ {ex}
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs bg-white/30 rounded-lg p-2 backdrop-blur-sm">
                                💡 {app.fact}
                            </div>
                        </div>
                        {selectedApp !== app.id && (
                            <div className="text-xs mt-2 opacity-75">点击了解更多 →</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white text-center shadow-xl">
                <Sparkles className="inline-block mb-2" size={32} />
                <h3 className="text-xl font-bold mb-2">你的 Python 之旅从这里开始！</h3>
                <p className="text-indigo-100">学会 Python，你也能创造改变世界的应用！</p>
            </div>
        </div>
    );
};

// 3. Variables Slide (The Box Metaphor)
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

// 5. Emoji Math Calculator
const EmojiMathSlide = () => {
    const [num1, setNum1] = useState(5);
    const [num2, setNum2] = useState(3);
    const [operation, setOperation] = useState('+');

    const emojis = ['🍎', '🌟', '🎈', '🍕', '🎁'];
    const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
    const [emoji] = useState(getRandomEmoji());

    const calculate = () => {
        switch (operation) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '//': return num2 !== 0 ? Math.floor(num1 / num2) : 0;
            default: return 0;
        }
    };

    const getIntResult = () => {
        const res = calculate();
        return typeof res === 'string' ? parseFloat(res) : res;
    };

    const result = calculate();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-2xl border border-pink-200 text-pink-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-pink-600" />
                    Emoji 数学魔法
                </h2>
                <p>用可爱的 Emoji 来学数学！看看 Python 如何把抽象的数字变成有趣的视觉表达。</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">第一个数字</label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={num1}
                                onChange={(e) => setNum1(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-2xl font-bold text-indigo-600 mt-2">{num1}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">运算符</label>
                            <div className="grid grid-cols-4 gap-2">
                                {['+', '-', '*', '//'].map(op => (
                                    <button
                                        key={op}
                                        onClick={() => setOperation(op)}
                                        className={`p-3 rounded-lg text-xl font-bold transition-all ${operation === op
                                            ? 'bg-indigo-600 text-white shadow-lg scale-110'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {op}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">第二个数字</label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={num2}
                                onChange={(e) => setNum2(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-2xl font-bold text-indigo-600 mt-2">{num2}</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                        <h3 className="text-sm font-bold text-purple-600 mb-4 text-center">视觉化表示</h3>

                        {/* Number 1 */}
                        <div className="mb-4">
                            <div className="text-xs text-slate-500 mb-1">数字 {num1}:</div>
                            <div className="flex flex-wrap gap-1">
                                {Array(num1).fill(0).map((_, i) => (
                                    <span key={i} className="text-2xl animate-in zoom-in" style={{ animationDelay: `${i * 50}ms` }}>
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-center text-3xl font-bold text-purple-600 my-3">{operation}</div>

                        {/* Number 2 */}
                        <div className="mb-4">
                            <div className="text-xs text-slate-500 mb-1">数字 {num2}:</div>
                            <div className="flex flex-wrap gap-1">
                                {Array(num2).fill(0).map((_, i) => (
                                    <span key={i} className="text-2xl animate-in zoom-in" style={{ animationDelay: `${i * 50}ms` }}>
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-t-2 border-purple-300 my-4"></div>

                        {/* Result */}
                        <div>
                            <div className="text-xs text-slate-500 mb-1">结果 = {result}:</div>
                            <div className="flex flex-wrap gap-1">
                                {Array(Math.max(0, Math.floor(getIntResult()))).fill(0).map((_, i) => (
                                    <span key={i} className="text-2xl animate-in zoom-in" style={{ animationDelay: `${i * 50}ms` }}>
                                        {emoji}
                                    </span>
                                ))}
                                {result === 0 && <span className="text-slate-400 text-sm">无</span>}
                                {result < 0 && <span className="text-red-500 text-sm">负数无法用 emoji 表示</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <div className="text-center">
                        <div className="text-sm text-slate-600 mb-2">Python 代码:</div>
                        <CodeBlock code={`result = ${num1} ${operation} ${num2}\nprint(result)  # 输出: ${result}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// 6. Data Types Detective
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

// 7. Code Playground
const CodePlaygroundSlide = () => {
    const [selectedExample, setSelectedExample] = useState(0);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const examples = [
        {
            title: '🎨 彩虹打印',
            code: `# 打印彩色文字
colors = ["红", "橙", "黄", "绿", "蓝", "靛", "紫"]
for color in colors:
    print("🌈", color)`,
            output: `🌈 红
🌈 橙
🌈 黄
🌈 绿
🌈 蓝
🌈 靛
🌈 紫`
        },
        {
            title: '🎲 幸运数字',
            code: `# 生成你的幸运数字
name = "小明"
lucky = len(name) * 7 + 3
print(f"{name}的幸运数字是: {lucky}")`,
            output: `小明的幸运数字是: 17`
        },
        {
            title: '⭐ 星星金字塔',
            code: `# 打印星星金字塔
for i in range(1, 6):
    stars = "⭐" * i
    print(stars)`,
            output: `⭐
⭐⭐
⭐⭐⭐
⭐⭐⭐⭐
⭐⭐⭐⭐⭐`
        },
        {
            title: '🧮 倒计时',
            code: `# 火箭发射倒计时
for i in range(5, 0, -1):
    print(f"{i}...")
print("🚀 发射!")`,
            output: `5...
4...
3...
2...
1...
🚀 发射!`
        },
        {
            title: '💬 智能问候',
            code: `# 根据时间问候
hour = 14
if hour < 12:
    print("早上好! ☀️")
elif hour < 18:
    print("下午好! 🌤️")
else:
    print("晚上好! 🌙")`,
            output: `下午好! 🌤️`
        }
    ];

    React.useEffect(() => {
        setCode(examples[selectedExample].code);
        setOutput('');
    }, [selectedExample]);

    const runCode = () => {
        setIsRunning(true);
        setOutput('');
        setTimeout(() => {
            setOutput(examples[selectedExample].output);
            setIsRunning(false);
        }, 800);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-2xl border border-cyan-200 text-cyan-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Code className="text-cyan-600" />
                    代码游乐场
                </h2>
                <p>
                    这里有一些有趣的 Python 代码示例！点击运行，看看会发生什么。
                    你也可以修改代码，创造属于你自己的魔法！
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-3">
                {examples.map((ex, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedExample(idx)}
                        className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 ${selectedExample === idx
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
                            }`}
                    >
                        <div className="font-bold text-sm">{ex.title}</div>
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Code Editor */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-slate-400 ml-2">playground.py</span>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-64 bg-slate-900 text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none"
                        spellCheck={false}
                    />
                    <div className="bg-slate-800 px-4 py-3 border-t border-slate-700">
                        <Button
                            onClick={runCode}
                            className="w-full"
                            disabled={isRunning}
                        >
                            {isRunning ? (
                                <>
                                    <RefreshCw className="animate-spin" size={18} />
                                    运行中...
                                </>
                            ) : (
                                <>
                                    <Play size={18} />
                                    运行代码
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Output Console */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                        <span className="text-xs text-green-400 font-mono">输出控制台</span>
                    </div>
                    <div className="h-64 p-4 font-mono text-sm text-green-400 overflow-y-auto whitespace-pre-wrap">
                        {output || (
                            <div className="text-slate-500 italic">
                                点击"运行代码"查看输出...
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-800 px-4 py-2 border-t border-slate-700 text-xs text-slate-500">
                        {output && '✓ 程序执行成功'}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 8. Bug Hunter
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

// 9. ASCII Art Generator
const ASCIIArtSlide = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('heart');
    const [customText, setCustomText] = useState('PYTHON');
    const [showCustom, setShowCustom] = useState(false);

    const templates = {
        heart: {
            name: '❤️ 爱心',
            art: `  ♥♥♥   ♥♥♥
 ♥♥♥♥♥ ♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥
 ♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥
   ♥♥♥♥♥
    ♥♥♥
     ♥`
        },
        star: {
            name: '⭐ 星星',
            art: `    ★
   ★★★
  ★★★★★
 ★★★★★★★
★★★★★★★★★
 ★★★★★★★
  ★★★★★
   ★★★
    ★`
        },
        smiley: {
            name: '😊 笑脸',
            art: `  ●●●●●●●●
 ●          ●
●  ◉      ◉  ●
●            ●
●   ◡    ◡   ●
●     ◡◡     ●
 ●          ●
  ●●●●●●●●`
        },
        python: {
            name: '🐍 Python Logo',
            art: `   ████████
  ██      ██
 ██  ●●  ██
 ██      ██
  ████████
    ██  ██
   ██    ██
  ██      ██
 ██        ██
 ██████████`
        },
        rocket: {
            name: '🚀 火箭',
            art: `    /\\
   /  \\
  |    |
  | 🚀 |
  |    |
  |    |
 /|    |\\
/ |    | \\
  |    |
 /|    |\\
/ |____| \\`
        }
    };

    const generateBigText = (text) => {
        const letters = {
            'P': ['███', '█ █', '███', '█  ', '█  '],
            'Y': ['█ █', '█ █', ' █ ', ' █ ', ' █ '],
            'T': ['███', ' █ ', ' █ ', ' █ ', ' █ '],
            'H': ['█ █', '█ █', '███', '█ █', '█ █'],
            'O': ['███', '█ █', '█ █', '█ █', '███'],
            'N': ['█  █', '██ █', '█ ██', '█  █', '█  █'],
            ' ': ['   ', '   ', '   ', '   ', '   ']
        };

        const lines = ['', '', '', '', ''];
        for (let char of text.toUpperCase()) {
            const letter = letters[char] || letters[' '];
            for (let i = 0; i < 5; i++) {
                lines[i] += letter[i] + ' ';
            }
        }
        return lines.join('\n');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 p-6 rounded-2xl border border-violet-200 text-violet-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Palette className="text-violet-600" />
                    ASCII 艺术生成器
                </h2>
                <p>
                    ASCII Art 是用键盘字符创作的艺术！在 Python 中，我们可以用 <code>print()</code> 创造各种图案。
                    这是程序员的浪漫！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Template Selection */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">选择模板</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(templates).map(([key, template]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedTemplate(key);
                                    setShowCustom(false);
                                }}
                                className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 ${selectedTemplate === key && !showCustom
                                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:border-violet-300'
                                    }`}
                            >
                                <div className="font-bold text-sm">{template.name}</div>
                            </button>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-bold text-slate-700 mb-3">自定义文字</h3>
                        <input
                            type="text"
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value.slice(0, 10))}
                            placeholder="输入文字 (最多10字符)"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none mb-2"
                            maxLength={10}
                        />
                        <Button
                            onClick={() => setShowCustom(true)}
                            variant="secondary"
                            className="w-full"
                        >
                            生成大字
                        </Button>
                    </div>
                </div>

                {/* Art Display */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-slate-400 ml-2">ascii_art.py</span>
                    </div>
                    <div className="p-6 font-mono text-sm text-green-400 whitespace-pre overflow-x-auto min-h-[300px] flex items-center justify-center">
                        {showCustom ? generateBigText(customText) : templates[selectedTemplate].art}
                    </div>
                    <div className="bg-slate-800 px-4 py-2 border-t border-slate-700">
                        <div className="text-xs text-slate-500">
                            💡 提示: 在 Python 中使用 print() 可以输出这些图案
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-700 mb-3">Python 代码示例:</h3>
                <CodeBlock code={`# 打印 ASCII 艺术
art = """
${showCustom ? generateBigText(customText) : templates[selectedTemplate].art}
"""
print(art)`} />
            </div>

            <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 rounded-xl text-white text-center">
                <Sparkles className="inline-block mb-2" size={24} />
                <p className="font-bold">用代码创造艺术，这就是编程的魅力！</p>
            </div>
        </div>
    );
};

// 10. Story Maker (Mad Libs)
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



// 12. Coding Practice (NEW - Hands-on Programming)
const CodingPracticeSlide = () => {
    const exercises = [
        {
            id: 1,
            title: '打印问候语',
            description: '编写代码打印 "你好，Python！"',
            starterCode: '# 在这里写你的代码\n',
            solution: 'print("你好，Python!")',
            testCases: [
                { input: '', expected: '你好，Python!', description: '输出问候语' }
            ],
            hint: '使用 print() 函数，括号内用引号包裹文字'
        },
        {
            id: 2,
            title: '变量赋值',
            description: '创建一个名字叫 name 的变量，值为你的名字，然后打印它',
            starterCode: '# 创建变量并打印\n',
            solution: 'name = "小明"\nprint(name)',
            testCases: [
                { input: '', expected: /^.+$/, description: '打印任意非空字符串' }
            ],
            hint: '使用 = 赋值，例如：name = "你的名字"'
        },
        {
            id: 3,
            title: '简单计算',
            description: '计算 10 + 20 并打印结果',
            starterCode: '# 计算并打印\n',
            solution: 'print(10 + 20)',
            testCases: [
                { input: '', expected: '30', description: '输出 30' }
            ],
            hint: 'print() 里面可以直接写算式'
        },
        {
            id: 4,
            title: '条件判断',
            description: '如果变量 age 大于等于 18，打印 "成年"，否则打印 "未成年"',
            starterCode: 'age = 20\n# 写条件判断\n',
            solution: 'age = 20\nif age >= 18:\n    print("成年")\nelse:\n    print("未成年")',
            testCases: [
                { input: '', expected: '成年', description: 'age=20 应输出 "成年"' }
            ],
            hint: '使用 if-else 结构，注意缩进（4个空格）'
        }
    ];

    const [currentExercise, setCurrentExercise] = useState(0);
    const [code, setCode] = useState(exercises[0].starterCode);
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, success, error
    const [showHint, setShowHint] = useState(false);

    const exercise = exercises[currentExercise];

    const runCode = () => {
        setStatus('running');
        setOutput('');

        setTimeout(() => {
            try {
                // Mini-Python Interpreter (Simulated) for Foundation 1
                const lines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
                let outputBuffer = [];
                let variables = {};
                let i = 0;
                let steps = 0;
                let loopLimit = 500;

                const evaluate = (expr, scope) => {
                    expr = expr.trim();
                    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
                        return expr.slice(1, -1);
                    }
                    if (scope.hasOwnProperty(expr)) return scope[expr];
                    if (!isNaN(expr)) return Number(expr);

                    Object.keys(scope).forEach(key => {
                        const regex = new RegExp(`\\b${key}\\b`, 'g');
                        if (typeof scope[key] === 'string') {
                            expr = expr.replace(regex, `"${scope[key]}"`);
                        } else {
                            expr = expr.replace(regex, scope[key]);
                        }
                    });
                    // Handle logical operators
                    expr = expr.replace(/\band\b/g, '&&').replace(/\bor\b/g, '||').replace(/\bnot\b/g, '!');
                    expr = expr.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false');

                    try {
                        // eslint-disable-next-line no-eval
                        return eval(expr);
                    } catch (e) {
                        return expr;
                    }
                };

                while (i < lines.length && steps < loopLimit) {
                    steps++;
                    let line = lines[i].trim();

                    if (line.includes('=') && !line.includes('if') && !line.includes('==')) {
                        const parts = line.split('=');
                        const name = parts[0].trim();
                        const valFunc = parts.slice(1).join('=').trim();
                        variables[name] = evaluate(valFunc, variables);
                        i++;
                        continue;
                    }

                    if (line.startsWith('print')) {
                        const match = line.match(/print\s*\((.*?)\)/);
                        if (match) {
                            const content = match[1].trim();
                            if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
                                outputBuffer.push(content.slice(1, -1));
                            } else {
                                outputBuffer.push(evaluate(content, variables));
                            }
                        }
                        i++;
                        continue;
                    }

                    if (line.startsWith('if ')) {
                        const condition = line.substring(3, line.indexOf(':'));
                        const res = evaluate(condition, variables);
                        const isTrue = res === true || res === 'True';

                        if (isTrue) {
                            i++;
                        } else {
                            i++;
                            while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t'))) {
                                i++;
                            }
                            if (i < lines.length && lines[i].startsWith('else:')) {
                                i++;
                            } else {
                                while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t'))) {
                                    i++;
                                }
                            }
                        }
                        continue;
                    }

                    if (line.startsWith('else:')) {
                        i++;
                        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t'))) {
                            i++;
                        }
                        continue;
                    }

                    i++;
                }

                const result = outputBuffer.join('\n');
                setOutput(result);

                const testCase = exercise.testCases[0];
                let passed = false;
                if (testCase.expected instanceof RegExp) {
                    passed = testCase.expected.test(result);
                } else {
                    // Normalize newlines and trim for robust comparison
                    const normalizedResult = result.replace(/\r\n/g, '\n').trim();
                    const normalizedExpected = testCase.expected.replace(/\r\n/g, '\n').trim();
                    passed = normalizedResult === normalizedExpected;
                }

                setStatus(passed ? 'success' : 'error');

            } catch (error) {
                console.error(error);
                setOutput('执行出错');
                setStatus('error');
            }
        }, 500);
    };

    const nextExercise = () => {
        if (currentExercise < exercises.length - 1) {
            const next = currentExercise + 1;
            setCurrentExercise(next);
            setCode(''); // Clean slate
            setOutput('');
            setStatus('idle');
            setShowHint(false);
        }
    };

    const resetCode = () => {
        setCode(''); // Reset to empty
        setOutput('');
        setStatus('idle');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 text-green-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Code className="text-green-600" />
                    动手编程 - 实战练习
                </h2>
                <p className="text-lg">
                    💻 现在轮到你写代码了！完成下面的编程练习，巩固学到的知识。
                </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-slate-600">
                        练习进度: {currentExercise + 1} / {exercises.length}
                    </div>
                    <div className="flex gap-2">
                        {exercises.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 rounded-full ${idx === currentExercise ? 'bg-green-600' :
                                    idx < currentExercise ? 'bg-green-300' : 'bg-slate-200'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                {status === 'success' && currentExercise < exercises.length - 1 && (
                    <Button onClick={nextExercise} variant="success">
                        下一题 →
                    </Button>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Exercise Description */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800 mb-2">
                            📝 {exercise.title}
                        </h3>
                        <p className="text-slate-600 mb-4">{exercise.description}</p>

                        <div className="bg-blue-50 p-3 rounded-lg text-sm">
                            <div className="font-bold text-blue-700 mb-1">✓ 测试要求:</div>
                            <div className="text-blue-600">{exercise.testCases[0].description}</div>
                        </div>

                        {showHint && (
                            <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg animate-in fade-in">
                                <div className="font-bold text-yellow-700 text-sm">💡 提示:</div>
                                <div className="text-yellow-600 text-sm">{exercise.hint}</div>
                            </div>
                        )}

                        <button
                            onClick={() => setShowHint(!showHint)}
                            className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {showHint ? '隐藏' : '显示'}提示
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2">
                        <Button onClick={runCode} disabled={status === 'running'} variant="primary" className="flex-1">
                            {status === 'running' ? '运行中...' : '▶ 运行代码'}
                        </Button>
                        <Button onClick={resetCode} variant="secondary">
                            🔄 重置
                        </Button>
                    </div>
                </div>

                {/* Code Editor */}
                <div className="space-y-4">
                    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                            <span className="text-xs text-green-400 font-mono">editor.py</span>
                            <span className="text-xs text-slate-400">Python</span>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
                            placeholder="在这里写代码..."
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                            <span className="text-xs text-green-400 font-mono">输出</span>
                        </div>
                        <div className="h-32 p-4 font-mono text-sm overflow-y-auto">
                            {status === 'idle' && (
                                <div className="text-slate-500 italic">点击"运行代码"查看输出...</div>
                            )}
                            {status === 'running' && (
                                <div className="text-yellow-400">执行中...</div>
                            )}
                            {output && (
                                <div className={status === 'success' ? 'text-green-400' : 'text-red-400'}>
                                    {output}
                                </div>
                            )}
                            {status === 'success' && (
                                <div className="text-green-400 mt-2">
                                    ✓ 测试通过！做得很好！
                                </div>
                            )}
                            {status === 'error' && output && (
                                <div className="text-orange-400 mt-2">
                                    ✗ 输出不符合预期，再试试看
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {currentExercise === exercises.length - 1 && status === 'success' && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 text-center animate-in zoom-in">
                    <div className="text-6xl mb-3">🎉</div>
                    <h3 className="text-2xl font-bold text-yellow-800 mb-2">恭喜完成所有练习！</h3>
                    <p className="text-yellow-700">你已经掌握了基础编程技能，继续保持！</p>
                </div>
            )}
        </div>
    );
};

// 13. Challenge
const ChallengeSlide = () => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showHints, setShowHints] = useState({});

    const questions = [
        {
            id: 'q1',
            text: 'print("Hello") 的作用是？',
            options: ['打印纸张', '在屏幕显示文字', '保存文件'],
            correct: '在屏幕显示文字',
            hint: '想想 print 在英语中的意思',
            difficulty: 'easy'
        },
        {
            id: 'q2',
            text: '10 + 20 * 2 的结果是？(注意优先级)',
            options: ['60', '50', '30'],
            correct: '50',
            hint: '乘法优先于加法',
            difficulty: 'medium'
        },
        {
            id: 'q3',
            text: 'name = "Python"，print(name) 输出？',
            options: ['name', 'Python', '"Python"'],
            correct: 'Python',
            hint: '变量存储的是值，不是变量名',
            difficulty: 'easy'
        },
        {
            id: 'q4',
            text: '以下哪个是正确的变量名？',
            options: ['2name', 'my_name', 'my-name'],
            correct: 'my_name',
            hint: '变量名不能以数字开头，不能包含横线',
            difficulty: 'medium'
        },
        {
            id: 'q5',
            text: '7 % 3 的结果是？',
            options: ['2', '1', '0'],
            correct: '1',
            hint: '% 是取余数运算符',
            difficulty: 'hard'
        },
        {
            id: 'q6',
            text: 'type("123") 返回什么类型？',
            options: ['int', 'str', 'float'],
            correct: 'str',
            hint: '引号包围的都是字符串',
            difficulty: 'medium'
        }
    ];

    const checkAnswers = () => {
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    const getAchievement = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) return { emoji: '🏆', title: '完美大师', color: 'text-yellow-500' };
        if (percentage >= 80) return { emoji: '🌟', title: '优秀学员', color: 'text-blue-500' };
        if (percentage >= 60) return { emoji: '👍', title: '继续加油', color: 'text-green-500' };
        return { emoji: '💪', title: '再接再厉', color: 'text-orange-500' };
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '简单';
            case 'medium': return '中等';
            case 'hard': return '困难';
            default: return '';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-yellow-100 p-6 rounded-2xl border border-yellow-200 text-yellow-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="text-yellow-600" />
                    小测验：萌新毕业考
                </h2>
                <p>
                    完成下面的挑战，看看你掌握了多少知识！共 {questions.length} 题，加油！
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                {questions.map((q, idx) => (
                    <div key={q.id} className="pb-6 border-b border-slate-100 last:border-0">
                        <div className="flex items-start justify-between mb-3">
                            <p className="font-bold text-slate-700 flex-1">
                                {idx + 1}. {q.text}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(q.difficulty)}`}>
                                {getDifficultyLabel(q.difficulty)}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {q.options.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                    className={`px-4 py-2 rounded-lg text-sm border transition-all
                                        ${answers[q.id] === opt
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {showHints[q.id] && (
                            <div className="mt-2 text-sm text-indigo-600 bg-indigo-50 p-2 rounded">
                                💡 提示: {q.hint}
                            </div>
                        )}
                        {!showHints[q.id] && (
                            <button
                                onClick={() => setShowHints(prev => ({ ...prev, [q.id]: true }))}
                                className="text-xs text-slate-400 hover:text-indigo-600 mt-2"
                            >
                                需要提示？点击这里
                            </button>
                        )}
                    </div>
                ))}

                {score === null ? (
                    <Button
                        onClick={checkAnswers}
                        className="w-full"
                        disabled={Object.keys(answers).length < questions.length}
                    >
                        {Object.keys(answers).length < questions.length
                            ? `已完成 ${Object.keys(answers).length}/${questions.length} 题`
                            : '提交答案'}
                    </Button>
                ) : (
                    <div className="text-center animate-in zoom-in space-y-4">
                        <div className="text-6xl mb-2">{getAchievement().emoji}</div>
                        <h3 className={`text-2xl font-bold ${getAchievement().color}`}>
                            {getAchievement().title}
                        </h3>
                        <div className="text-xl font-bold text-slate-800">
                            你答对了 {score} / {questions.length} 题
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-1000 rounded-full"
                                style={{ width: `${(score / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-slate-600">
                            {score === questions.length
                                ? '🎉 太棒了！你已经准备好进入下一章了！'
                                : score >= questions.length * 0.8
                                    ? '👏 很不错！继续保持！'
                                    : '💪 继续努力，你可以做得更好！'}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button onClick={() => { setScore(null); setAnswers({}); setShowHints({}); }} variant="secondary">
                                重新测试
                            </Button>
                            {score === questions.length && (
                                <Button onClick={() => window.location.href = '/python/foundation/2'}>
                                    进入下一课 →
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


const sections = [
    { id: 1, title: '初识 Python', icon: Terminal, component: IntroSlide },
    { id: 2, title: 'Python 在现实世界', icon: Globe, component: RealWorldSlide },
    { id: 3, title: '变量魔法', icon: Box, component: VariableSlide },
    { id: 4, title: '与电脑对话', icon: MessageSquare, component: IOSlide },
    { id: 5, title: '运算游乐场', icon: Calculator, component: MathSlide },
    { id: 6, title: 'Emoji 数学魔法', icon: Sparkles, component: EmojiMathSlide },
    { id: 7, title: '数据侦探', icon: Tag, component: DataTypeSlide },
    { id: 8, title: '代码游乐场', icon: Code, component: CodePlaygroundSlide },
    { id: 9, title: '捉虫特工队', icon: Bug, component: BugHuntSlide },
    { id: 10, title: 'ASCII 艺术', icon: Palette, component: ASCIIArtSlide },
    { id: 11, title: '故事生成器', icon: BookOpen, component: StorySlide },
    { id: 12, title: '动手编程', icon: Code, component: CodingPracticeSlide },
    { id: 13, title: '萌新毕业考', icon: HelpCircle, component: ChallengeSlide },
];


export default function PythonFoundation1() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [completedSections, setCompletedSections] = useState(() => {
        const saved = localStorage.getItem('pythonF1Progress');
        return saved ? JSON.parse(saved) : [];
    });

    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    const markSectionComplete = (sectionId) => {
        if (!completedSections.includes(sectionId)) {
            const updated = [...completedSections, sectionId];
            setCompletedSections(updated);
            localStorage.setItem('pythonF1Progress', JSON.stringify(updated));
        }
    };

    const progressPercentage = Math.round((completedSections.length / sections.length) * 100);

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
                    {/* Progress Bar */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-indigo-600">学习进度</span>
                            <span className="text-xs font-bold text-indigo-600">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                            {completedSections.length} / {sections.length} 章节完成
                        </div>
                    </div>

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
                            <span className="flex-1">{section.title}</span>
                            {completedSections.includes(section.id) && (
                                <CheckCircle size={16} className="text-green-500" />
                            )}
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
                            onClick={() => {
                                setActiveSection(prev => Math.max(1, prev - 1));
                                window.scrollTo(0, 0);
                            }}
                            className={activeSection === 1 ? 'opacity-0 pointer-events-none' : ''}
                        >
                            上一章
                        </Button>

                        {!completedSections.includes(activeSection) && (
                            <Button
                                variant="success"
                                onClick={() => markSectionComplete(activeSection)}
                                className="mx-4"
                            >
                                <CheckCircle size={18} />
                                标记完成
                            </Button>
                        )}

                        <Button
                            onClick={() => {
                                if (!completedSections.includes(activeSection)) {
                                    markSectionComplete(activeSection);
                                }
                                setActiveSection(prev => Math.min(sections.length, prev + 1));
                                window.scrollTo(0, 0);
                            }}
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
