import { useState } from 'react';
import { Package, RefreshCw, AlertCircle, Play, Trophy, CheckCircle, XCircle, Calculator, Dices, Clock } from 'lucide-react';
import { MasteryCheck, SlideHeader } from '../../shell/PythonLessonShell';
import { Button, CodeBlock } from './Shared';

export const QuizSlide = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = [
        {
            q: "函数里面的 return 有什么用？",
            options: [
                "没啥用，就是看着帅",
                "把结果扔出来，让外面能拿到",
                "在屏幕上打印结果",
                "结束整个程序"
            ],
            ans: 1
        },
        {
            q: "我在函数里定义了 weapon = 'Sword'，外面能直接用吗？",
            options: [
                "可以，大家都能用",
                "不行，它被关在函数的小黑屋(Local Scope)里了",
                "看运气，有时候行",
                "只要大喊一声就能用"
            ],
            ans: 1
        },
        {
            q: "想用 Python 的 random 模块，第一步要做什么？",
            options: [
                "直接写 random.randint()",
                "先 pip install random",
                "写 import random",
                "不需要做任何事"
            ],
            ans: 2
        },
        {
            q: "def func(a=10): print(a)  如果我直接调用 func() 会输出什么？",
            options: [
                "报错，因为沒给参数",
                "输出 10 (默认值)",
                "输出 None",
                "输出 0"
            ],
            ans: 1
        },
        {
            q: "Lambda 函数有什么特点？",
            options: [
                "它最长可以写 100 行",
                "它必须有名字",
                "它是匿名的，适合写短小的逻辑",
                "它可以用来煮咖啡"
            ],
            ans: 2
        }
    ];

    const handleAnswer = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);

        const correct = index === questions[currentQ].ans;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);

        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setCurrentQ(q => q + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    if (showResult) {
        return (
            <div className="text-center space-y-6 animate-in zoom-in duration-500 py-10">
                <div className="inline-block p-6 rounded-full bg-yellow-100 mb-4 animate-bounce">
                    <Trophy size={64} className="text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">挑战完成！</h2>
                <div className="text-xl text-slate-600">
                    你的得分：<span className="text-indigo-600 font-bold text-3xl">{score} / {questions.length}</span>
                </div>
                <p className="text-slate-500">
                    {score === questions.length ? "太强了！全对！🎉" : "再接再厉！💪"}
                </p>
                <Button onClick={resetQuiz} className="mx-auto">
                    <RefreshCw size={18} /> 再来一次
                </Button>
            </div>
        );
    }

    const q = questions[currentQ];

    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
                <div className="text-xs font-bold text-indigo-500 tracking-widest mb-2">CHALLENGE {currentQ + 1}/{questions.length}</div>
                <h2 className="text-2xl font-bold text-slate-800">{q.q}</h2>
            </div>

            <div className="space-y-3">
                {q.options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={selectedOption !== null}
                        className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 flex justify-between items-center group
                            ${selectedOption === i
                                ? (isCorrect ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700')
                                : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600'}
                        `}
                    >
                        <span>{opt}</span>
                        {selectedOption === i && (
                            isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const LIBRARY_LABS = {
        math: {
            icon: <Calculator className="text-blue-400" size={24} />,
            color: 'bg-blue-500',
            desc: '数学工具箱',
            tools: [
                { name: 'math.pi', val: '3.14159...', type: 'const' },
                { name: 'math.ceil(4.2)', val: '5', type: 'func' },
                { name: 'math.sqrt(16)', val: '4.0', type: 'func' }
            ]
        },
        random: {
            icon: <Dices className="text-orange-400" size={24} />,
            color: 'bg-orange-500',
            desc: '随机制造机',
            tools: [
                { name: 'random.randint(1,6)', val: () => Math.floor(Math.random() * 6) + 1, type: 'func' },
                { name: 'random.choice(["A","B"])', val: () => Math.random() > 0.5 ? 'A' : 'B', type: 'func' },
                { name: 'random.random()', val: () => Math.random().toFixed(2), type: 'func' }
            ]
        },
        time: {
            icon: <Clock className="text-green-400" size={24} />,
            color: 'bg-green-500',
            desc: '时间控制器',
            tools: [
                { name: 'time.time()', val: () => Math.floor(Date.now() / 1000), type: 'func' },
                { name: 'time.sleep(1)', val: 'Waiting...', action: 'wait', type: 'func' }
            ]
        }
};

export const LibrarySlide = () => {
    const [output, setOutput] = useState(null);
    const [activeLib, setActiveLib] = useState('math');
    const labs = LIBRARY_LABS;

    const runTool = (tool) => {
        if (tool.action === 'wait') {
            setOutput('Sleeping...');
            setTimeout(() => setOutput('Done! (1s later)'), 1000);
        } else {
            const val = typeof tool.val === 'function' ? tool.val() : tool.val;
            setOutput(val);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-2xl text-white shadow-lg border border-slate-700">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Package className="text-emerald-400" />
                    Batteries Included: 常用外部库
                </h2>
                <p className="opacity-90 text-slate-300">
                    Python 号称 "自带电池"，意味着它预装了大量强大的库，无需下载即可直接使用(`import`)。
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(labs).map(([key, lib]) => (
                    <button
                        key={key}
                        onClick={() => { setActiveLib(key); setOutput(null); }}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                            ${activeLib === key
                                ? `${lib.color}/10 border-${lib.color.split('-')[1]}-500 shadow-md scale-105`
                                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                    >
                        {lib.icon}
                        <span className="font-bold capitalize">{key}</span>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        import {activeLib}
                    </div>
                    <div className="flex-1 h-px bg-slate-100"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        {labs[activeLib].tools.map((tool, i) => (
                            <button
                                key={i}
                                onClick={() => runTool(tool)}
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors group border border-slate-100"
                            >
                                <code className="font-mono text-sm font-bold">{tool.name}</code>
                                <Play size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>

                    <div className="bg-slate-900 rounded-xl p-4 flex flex-col justify-center items-center min-h-[120px] relative overflow-hidden">
                        <div className="absolute top-2 left-3 text-xs text-slate-500 font-mono">Console Output</div>
                        {output !== null ? (
                            <div className="text-xl font-mono text-emerald-400 animate-in zoom-in duration-200">
                                {activeLib === 'math' && '>> '}
                                {output}
                            </div>
                        ) : (
                            <div className="text-slate-600 text-sm italic">Running...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TryExceptSlide = () => {
    const [input, setInput] = useState('5');
    const trimmed = input.trim();
    let branch;
    let line;
    let ok;
    if (!/^-?\d+$/.test(trimmed)) {
        branch = 'except ValueError';
        line = `读到 "${trimmed}"，int() 转换失败`;
        ok = false;
    } else if (Number(trimmed) === 0) {
        branch = 'except ZeroDivisionError';
        line = '10 / 0 —— 不能除以 0';
        ok = false;
    } else {
        branch = 'try 正常结束';
        line = `10 / ${trimmed} = ${(10 / Number(trimmed)).toFixed(2)}`;
        ok = true;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={AlertCircle} title="异常处理：try / except">
                程序运行时难免出错——用户乱输、除以 0、文件不存在。把可能出错的代码放进 <code>try</code>，出错时跳到 <code>except</code> 接住，程序就<strong>不会崩溃</strong>。后面的爬虫、文件操作都靠它兜底。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <label className="block text-sm font-bold text-slate-600">模拟用户输入：</label>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-3 font-mono font-bold outline-none focus:border-indigo-400"
                    />
                    <div className="flex gap-2">
                        {['5', '0', 'abc'].map((v) => (
                            <button
                                key={v}
                                onClick={() => setInput(v)}
                                className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200"
                            >
                                试 &quot;{v}&quot;
                            </button>
                        ))}
                    </div>
                    <CodeBlock code={`try:\n    n = int(user_input)\n    print(10 / n)\nexcept ValueError:\n    print("不是数字！")\nexcept ZeroDivisionError:\n    print("不能除以 0！")`} />
                </div>

                <div className="flex flex-col justify-center">
                    <div className={`rounded-2xl border-2 p-6 ${ok ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                        <div className={`text-xs font-black uppercase tracking-wider ${ok ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {ok ? '✅ 走 try 分支' : '🛡️ 被 except 接住'}
                        </div>
                        <div className="mt-2 font-mono text-lg font-black text-slate-800">{branch}</div>
                        <div className="mt-2 text-sm font-semibold text-slate-600">{line}</div>
                        <div className="mt-3 text-xs font-bold text-slate-400">不管输入什么，程序都不会崩溃——这就是 try/except 的意义。</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const f4MasteryItems = [
    {
        label: '能把一段重复代码改成函数。',
        evidence: '能说出函数名、参数和 return 分别负责什么。',
        retryHint: '回到函数定义，把“变化的部分”先圈出来当参数。',
    },
    {
        label: '能区分 print 是展示，return 是交回结果。',
        evidence: '能解释为什么一个函数想继续参与计算，通常要 return。',
        retryHint: '回到“进阶函数”，用一个加法函数分别试 print 和 return。',
    },
    {
        label: '能判断变量在函数里面还是外面有效。',
        evidence: '看到局部变量和全局变量时，能说出谁能访问谁。',
        retryHint: '回到“作用域”，用“房间内/房间外”的方式画边界。',
    },
    {
        label: '能给可能失败的代码加 try / except。',
        evidence: '例如把 int(input()) 包起来，并给用户一个能继续修改的提示。',
        retryHint: '回到“异常处理”，先找最可能爆掉的那一行。',
    },
];

export const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="indigo" icon={CheckCircle} title="小结与下一步">
            这一课，你学会了把重复的代码「打包」起来复用。函数是写大程序的关键一步。
        </SlideHeader>
        <div className="grid gap-4 md:grid-cols-3">
            {[
                ['定义函数', '用 def 把一段逻辑打包；参数是输入，return 是输出。'],
                ['借用模块', 'import 现成的库，站在巨人肩膀上，不重复造轮子。'],
                ['兜底出错', 'try / except 接住可能的报错，让程序不崩溃。'],
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
                <li className="flex gap-2"><span className="text-indigo-500">✓</span> 能区分 print 和 return</li>
                <li className="flex gap-2"><span className="text-indigo-500">✓</span> 能说明形参和实参的关系</li>
                <li className="flex gap-2"><span className="text-indigo-500">✓</span> 能判断哪些变量只在函数内有效</li>
            </ul>
        </div>
        <MasteryCheck
            title="F4 函数与异常离开前检查"
            description="如果能封装重复代码、说清 print/return、判断作用域、给错误兜底，就可以进入 turtle 项目。"
            accent="indigo"
            items={f4MasteryItems}
        />
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <div className="mb-1 font-black text-indigo-800">下一课：F5 绘图魔法</div>
            <p className="text-sm font-semibold leading-7 text-indigo-900">
                函数让代码可以复用；下一课用 turtle 把循环和函数变成看得见的图形作品。
            </p>
        </div>
    </div>
);
