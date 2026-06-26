import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Box, Calculator, MessageSquare, ArrowRight, Play, RefreshCw, CheckCircle, Tag, Bug, BookOpen, HelpCircle, Menu, X, Sparkles, Globe, Code, Palette, TrendingUp } from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell, { MasteryCheck, PredictCheck, SlideHeader, TransferCheck } from '../shell/PythonLessonShell';

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

const NavButton = ({ section, activeSection, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
            ? 'bg-indigo-50 text-indigo-700 font-medium'
            : 'text-slate-600 hover:bg-slate-50'
            }`}
    >
        <section.icon size={18} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
        {section.title}
    </button>
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
                    <strong>Python 就是这种语言！</strong> 它是世界上最受欢迎的编程语言之一，工程师、科学家、艺术家都在用它。
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
            description: 'Python 是 AI 和机器学习最常用的语言之一，很多智能助手的研究和原型都用它来写。',
            fact: 'Python 是 AI 和数据科学最常用的语言之一'
        },
        {
            id: 'web',
            title: '🌐 网站开发',
            icon: '💻',
            color: 'from-blue-500 to-cyan-500',
            examples: ['Instagram', 'YouTube', 'Spotify', 'Netflix'],
            description: '你每天使用的很多网站和应用，后端都用到了 Python！',
            fact: 'Instagram、YouTube 等大型网站都用 Python 构建后端'
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
            description: 'NASA 用 Python 分析太空数据、处理火星探测器拍回的图像！',
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

            <p className="text-sm font-semibold text-slate-500">点开任意一张卡片，看看 Python 在这个领域具体做什么 —— 这一关只需建立「Python 用途很广」的直觉，不用记住细节。</p>
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
        </div>
    );
};

// 3. Variables Slide (The Box Metaphor)
const VariableSlide = () => {
    const [boxName] = useState('score');
    const [boxValue, setBoxValue] = useState(100);
    const [isAnimating, setIsAnimating] = useState(false);

    const updateBox = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
        setBoxValue(prev => prev + 10);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Box} title="变量：超级收纳盒">
                变量就像是一个贴了标签的<strong>盒子</strong>。我们可以把任何东西（数字、文字）放进去。
                    你可以随时把盒子里的东西拿出来用，或者换成新的东西。
            </SlideHeader>

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
            <SlideHeader accent="indigo" icon={MessageSquare} title="输入与输出">
                <strong>input()</strong> 是机器人的耳朵，用来听你说什么。<br />
                    <strong>print()</strong> 是机器人的嘴巴，用来回答你。
            </SlideHeader>

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

            <div className="max-w-lg mx-auto rounded-2xl border-2 border-amber-200 bg-amber-50 p-5">
                <div className="mb-2 font-black text-amber-800">⚠️ 初学者第一大坑：input() 给你的永远是「文本」</div>
                <p className="text-sm font-semibold leading-7 text-amber-900">
                    哪怕你输入的是数字，<code>input()</code> 拿到的也是字符串。想拿来算数，必须先用 <code>int()</code> 转成数字：
                </p>
                <div className="mt-3">
                    <CodeBlock code={`age = input("你几岁了? ")   # age 是字符串，比如 "10"\nage = int(age)              # 转成数字 10\nprint(age + 1)              # 输出 11`} />
                </div>
                <p className="mt-3 text-xs font-bold text-amber-700">
                    如果忘了 int()，写 <code>age + 1</code> 会直接报错：不能把文本和数字相加。
                </p>
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
            <SlideHeader accent="indigo" icon={Calculator} title="运算游乐场">
                Python 是个超强的计算器。除了加减乘除，它还有两个特别厉害的符号：
                    <br /><code>%</code> (取余数) 和 <code>//</code> (整除)。
            </SlideHeader>

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
                    // Python 的 % 是向下取模（结果符号随除数），不同于 JS 的截断取余，故用 floor 公式
                    { op: '%', label: '取余 (Mod)', res: b !== 0 ? a - Math.floor(a / b) * b : 'Error', highlight: true },
                ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl text-center border transition-all hover:scale-105 ${item.highlight ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-200' : 'bg-white text-slate-700 shadow-sm'}`}>
                        <div className="text-xs opacity-70 mb-1">{item.label}</div>
                        <div className="text-2xl font-mono font-bold">
                            {a} <span className="opacity-50">{item.op}</span> {b} <span className="opacity-50">=</span> {item.res}
                        </div>
                    </div>
                ))}
            </div>

            <PredictCheck
                title="先预测，再算"
                prompt="在 Python 里，print(7 / 2) 会输出什么？"
                options={['3', '3.5']}
                correctIndex={1}
                explanation="Python 的 / 永远做普通除法，结果是小数：7 / 2 = 3.5。想得到整数 3，要用整除 //（7 // 2 = 3）。"
                misconception="以为 / 会自动取整。在 C++ 里 7 / 2 才等于 3，Python 不一样，别把两套规则记混。"
            />

            <TransferCheck
                prompt="换个例子：在 Python 里，print(7 // 2) 和 print(7 % 2) 各输出什么？"
                hint="// 是整除（向下取整），% 是取余数。"
                answer="7 // 2 输出 3；7 % 2 输出 1。"
                steps={[
                    '// 整除：7 除以 2 商 3（去掉小数）→ 3。',
                    '% 取余：7 = 2×3 + 1，余数 1 → 1。',
                    '对比 7 / 2 = 3.5（普通除法带小数）。',
                ]}
            />
        </div>
    )
}

// 5. Emoji Math Calculator
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
            <SlideHeader accent="indigo" icon={Tag} title="数据类型侦探">
                电脑看世界的方式和我们不一样。它把数据分成不同的<strong>类型(Type)</strong>。
                    <br />最常见的三种：<strong>整数(int)</strong>、<strong>小数(float)</strong>、<strong>字符串(str)</strong>。
            </SlideHeader>

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
            <SlideHeader accent="indigo" icon={Code} title="代码游乐场">
                这里有一些有趣的 Python 代码示例！点击运行，看看会发生什么。你也可以修改代码，创造属于你自己的魔法！
            </SlideHeader>

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
    const [, setCode] = useState('print("Hello World)'); // Error: missing quote

    const fixCode = () => {
        setCode('print("Hello World")');
        setFixed(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Bug} title="捉虫特工队">
                程序里的错误叫做 <strong>Bug (臭虫)</strong>。哪怕只少了一个引号，程序也会罢工！
                    <br />作为程序员，我们的工作就是找到并消灭它们。
            </SlideHeader>

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
const ChallengeSlide = () => {
    const navigate = useNavigate();
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
            <SlideHeader accent="indigo" icon={HelpCircle} title="小测验：萌新毕业考">
                完成下面的挑战，看看你掌握了多少知识！共 {questions.length} 题，加油！
            </SlideHeader>

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
                                <Button onClick={() => navigate('/python/f2')}>
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

const f1MasteryItems = [
    {
        label: '能把 print、input 和变量连成一个小对话。',
        evidence: '例如先问名字，再把名字放进一句欢迎语里输出。',
        retryHint: '回到“输入与输出”，先画出“输入 -> 保存 -> 输出”的箭头。',
    },
    {
        label: '能解释字符串、整数和小数为什么不能乱混着算。',
        evidence: '能说出 "3" 和 3 的区别，并知道什么时候需要 int() 或 float()。',
        retryHint: '回到“数据类型侦探”，用 type() 先查清数据身份。',
    },
    {
        label: '能用一个数字例子验证 /、// 和 % 的结果。',
        evidence: '拿 17 和 5 手算：除法、小商、余数分别是什么。',
        retryHint: '回到“运算游乐场”，不要背符号，先做一次拆数。',
    },
    {
        label: '能根据报错先查括号、引号、拼写和缩进。',
        evidence: '看到 SyntaxError 或 NameError 时，能说出第一步要检查哪里。',
        retryHint: '回到“捉虫特工队”，把错误信息里的行号和关键词圈出来。',
    },
];

const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="indigo" icon={BookOpen} title="小结与下一步">
            第一课，你已经让代码「听你的话」了。把这三件事记牢，Python 的地基就打好了。
        </SlideHeader>
        <div className="grid gap-4 md:grid-cols-3">
            {[
                ['会输出输入', 'print 把结果说给人听，input 把人的回答收进来。'],
                ['会存信息', '变量给数据起名字；字符串、整数、小数是不同的数据类型。'],
                ['会算', '加减乘除和取整、取余，让程序能处理数字。'],
            ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-2 text-sm font-black text-indigo-700">{title}</div>
                    <p className="text-sm font-semibold leading-7 text-slate-600">{desc}</p>
                </div>
            ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-800">
                <CheckCircle size={16} className="text-indigo-600" /> 学完自测
            </div>
            <ul className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                <li className="flex gap-2"><span className="text-indigo-500">✓</span> 能解释字符串为什么要加引号</li>
                <li className="flex gap-2"><span className="text-indigo-500">✓</span> 能区分变量名和它存的值</li>
                <li className="flex gap-2"><span className="text-indigo-500">✓</span> 能根据报错定位括号、引号或拼写</li>
            </ul>
        </div>
        <MasteryCheck
            title="F1 入门基础离开前检查"
            description="如果能完成一个输入输出小程序、说清数据类型、手算运算结果、按报错定位问题，就可以进入控制流程。"
            accent="indigo"
            items={f1MasteryItems}
        />
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <div className="mb-1 font-black text-indigo-800">下一课：F2 控制流程</div>
            <p className="text-sm font-semibold leading-7 text-indigo-900">
                现在程序只会从上往下走；下一课让它学会「根据条件做选择」和「按规则重复」，真正动起来。
            </p>
        </div>
    </div>
);

const sections = [
    { id: 1, title: '初识 Python', icon: Terminal, component: IntroSlide },
    { id: 2, title: 'Python 在现实世界', icon: Globe, component: RealWorldSlide },
    { id: 3, title: '变量魔法', icon: Box, component: VariableSlide },
    { id: 4, title: '与电脑对话', icon: MessageSquare, component: IOSlide },
    { id: 5, title: '运算游乐场', icon: Calculator, component: MathSlide },
    { id: 6, title: '数据侦探', icon: Tag, component: DataTypeSlide },
    { id: 7, title: '代码游乐场', icon: Code, component: CodePlaygroundSlide },
    { id: 8, title: '捉虫特工队', icon: Bug, component: BugHuntSlide },
    { id: 9, title: '萌新毕业考', icon: HelpCircle, component: ChallengeSlide },
    { id: 10, title: '小结与衔接', icon: BookOpen, component: SummarySlide },
];


export default function PythonFoundation1() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F1"
            lessonTitle="Python 入门"
            lessonSubtitle="第一次让代码听你的话"
            accent="indigo"
            hero={{
                title: '第一次，让代码听你的话',
                description: '从最简单的 print 和 input 开始，认识变量、数据类型和运算——这是后面所有 Python 内容的共同地基。',
            }}
            prerequisites={['会用键盘打英文字母和数字', '知道程序是一步一步执行的']}
            sections={sections}
            nextPath="/python/f2"
            nextLabel="下一课：F2 控制流程"
            topSupport={<PythonFoundationSupport lessonId="f1" />}
            bottomSupport={<PythonFoundationSupport lessonId="f1" placement="bottom" />}
        />
    );
}

