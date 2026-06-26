import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MousePointer2, Move, Square, Palette, Sparkles, ChevronRight, Home, PenTool, Trophy, BookOpen, Zap, Star, Target, Award, Menu, X, CheckCircle, RefreshCw, ArrowRight, Repeat, Terminal, Network } from 'lucide-react';
import TurtleCanvas from '../../../components/TurtleCanvas';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell, { MasteryCheck, PredictCheck, SlideHeader, TransferCheck } from '../shell/PythonLessonShell';

// --- Shared Helper Components ---
const Button = ({ onClick, children, className, variant = 'primary' }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md",
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

// --- Slides ---

const IntroSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="teal" icon={MousePointer2} title="初识小海龟">
                欢迎来到 <strong>小海龟</strong> 画图的世界！ <br />
                想象一只小海龟听从你的每一个指令，它可以画出复杂的图案、形状和艺术作品！
            </SlideHeader>
        <div className="flex justify-center">
            <TurtleCanvas
                commands={[
                    'speed 10', 'pensize 2', 'color teal',
                    ...Array(36).fill(0).flatMap(() => ['circle 50', 'rt 10'])
                ]}
                isRunning={true}
            />
        </div>
    </div>
);

const MoveSlide = () => {
    const [commands, setCommands] = useState([]);

    const addCmd = (cmd) => setCommands(prev => [...prev, cmd]);
    const reset = () => setCommands([]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Move} title="第一步：移动">
                点击按钮来移动小海龟！
                    <br />
                    <code>forward(100)</code>: 向前移动 100 步
                    <br />
                    <code>right(90)</code>: 向右旋转 90 度
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Button onClick={() => addCmd('fd 50')}>前进</Button>
                        <Button onClick={() => addCmd('bk 50')}>后退</Button>
                        <Button onClick={() => addCmd('lt 90')}>左转</Button>
                        <Button onClick={() => addCmd('rt 90')}>右转</Button>
                    </div>
                    <Button onClick={reset} variant="secondary" className="w-full">重置</Button>
                    <div className="mt-4">
                        <div className="text-sm font-bold text-slate-500 mb-2">指令列表:</div>
                        <div className="h-32 overflow-y-auto bg-slate-50 p-2 rounded border font-mono text-xs">
                            {commands.map((c, i) => <div key={i}>{i + 1}. {c}</div>)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas commands={commands} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const LoopSlide = () => {
    const [count, setCount] = useState(4);

    const getCommands = () => {
        const cmds = ['speed 5', 'pensize 2', 'color orange'];
        for (let i = 0; i < count; i++) {
            cmds.push('fd 80');
            cmds.push('rt ' + (360 / count));
        }
        return cmds;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Repeat} title="循环魔法">
                聪明的程序员都会偷懒！与其一遍遍写重复的代码，不如使用 <code>for</code> 循环。
                    <br />
                    <code>for i in range(4):</code> 的意思是“重复 4 次”。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <label className="block font-bold text-slate-700 mb-2">重复次数: {count}</label>
                    <input
                        type="range"
                        min="3" max="12"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full mb-4 accent-orange-500"
                    />
                    <CodeBlock code={`for i in range(${count}):\n    t.forward(80)\n    t.right(360 / ${count})`} />
                    <div className="mt-4 text-sm text-slate-500">
                        这会绘制一个正 {count} 边形！
                    </div>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas key={count} commands={getCommands()} isRunning={true} />
                </div>
            </div>

            <PredictCheck
                prompt="画正六边形时，每次 forward 之后应该 right 多少度？"
                options={['120°（六边形的内角）', '60°（外角 = 360 / 6）']}
                correctIndex={1}
                explanation="小海龟每个角转的是「外角」，走一圈正好转满 360°。正 n 边形外角 = 360 / n，所以正六边形要转 60°，不是内角 120°。"
                misconception="把内角当成转向角度，画出来的图形不闭合、转过头。"
            />

            <TransferCheck
                prompt="换个例子：用小海龟画正三角形，每次 forward 之后应该 right 转多少度？画正八边形又是多少度？"
                hint="小海龟转的是外角，外角 = 360 / 边数。"
                answer="正三角形转 120°（360/3）；正八边形转 45°（360/8）。"
                steps={[
                    '小海龟每个角转的是「外角」，走一圈共转满 360°。',
                    '正三角形：360 / 3 = 120°。',
                    '正八边形：360 / 8 = 45°。',
                ]}
            />
        </div>
    );
};

const ShapeSlide = () => {
    const [shape, setShape] = useState('square');

    const shapes = {
        square: {
            name: '正方形',
            sides: 4,
            angle: 90,
            code: `for i in range(4):\n    t.forward(80)\n    t.right(90)`
        },
        triangle: {
            name: '三角形',
            sides: 3,
            angle: 120,
            code: `for i in range(3):\n    t.forward(100)\n    t.right(120)`
        },
        hexagon: {
            name: '六边形',
            sides: 6,
            angle: 60,
            code: `for i in range(6):\n    t.forward(60)\n    t.right(60)`
        },
        star: {
            name: '五角星',
            sides: 5,
            angle: 144,
            code: `for i in range(5):\n    t.forward(100)\n    t.right(144)`
        }
    };

    const getCommands = () => {
        const s = shapes[shape];
        const cmds = ['color purple'];
        const sideLen = shape === 'hexagon' ? 60 : (shape === 'square' ? 80 : 100);
        for (let i = 0; i < s.sides; i++) {
            cmds.push(`fd ${sideLen}`);
            cmds.push(`rt ${s.angle}`);
        }
        return cmds;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Square} title="绘制图形">
                使用循环来绘制图形！公式很简单：<br />
                    <strong>旋转角度 = 360 ÷ 边数</strong>
            </SlideHeader>

            <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm font-semibold leading-7 text-teal-900">
                <strong>为什么是 360 ÷ 边数？</strong> 小海龟沿着图形走一圈回到起点时，朝向也转回了出发时的样子——也就是<strong>总共转了 360°</strong>。正多边形有几条边就转几次，所以每次转 <strong>360 ÷ 边数</strong>：三角形每次转 120°、正方形 90°、六边形 60°。
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        {Object.keys(shapes).map(s => (
                            <button
                                key={s}
                                onClick={() => setShape(s)}
                                className={`p-3 rounded-xl text-sm font-bold transition-all border-2 ${shape === s
                                    ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105'
                                    : 'bg-white text-purple-700 border-purple-100 hover:border-purple-300'
                                    }`}
                            >
                                {shapes[s].name}
                            </button>
                        ))}
                    </div>
                    <div className="bg-slate-100 p-4 rounded-xl">
                        <div className="text-sm font-bold text-slate-500 mb-2">公式</div>
                        <p className="text-slate-700">
                            边数: <strong>{shapes[shape].sides}</strong><br />
                            转角: 360 ÷ {shapes[shape].sides} = <strong>{shapes[shape].angle}°</strong>
                        </p>
                    </div>
                    <CodeBlock code={shapes[shape].code} />
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas commands={getCommands()} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const ColorSlide = () => {
    const [color, setColor] = useState('red');
    const [fill, setFill] = useState('yellow');

    const commands = [
        `color ${color}`,
        `fillcolor ${fill}`,
        'begin_fill',
        'circle 80',
        'end_fill'
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Palette} title="缤纷色彩">
                改变画笔颜色 (`pencolor`) 和填充颜色 (`fillcolor`)。
                    别忘了 `begin_fill()` 和 `end_fill()`。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">画笔颜色</label>
                        <div className="flex gap-2">
                            {['red', 'blue', 'green', 'purple', 'black'].map(c => (
                                <button key={c} onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">填充颜色</label>
                        <div className="flex gap-2">
                            {['yellow', 'pink', 'cyan', 'lime', 'white'].map(c => (
                                <button key={c} onClick={() => setFill(c)}
                                    className={`w-8 h-8 rounded-full border-2 ${fill === c ? 'border-slate-900 scale-110' : 'border-slate-200'}`}
                                    style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>
                    <CodeBlock code={`t.color("${color}")\nt.fillcolor("${fill}")\nt.begin_fill()\nt.circle(80)\nt.end_fill()`} />
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas commands={commands} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const ArtSlide = () => {
    const [pattern, setPattern] = useState('spiral');
    const [run, setRun] = useState(false);

    const patterns = {
        spiral: {
            name: '方形螺旋',
            code: `for i in range(50):\n    t.forward(i * 4)\n    t.right(90)`,
            getCmds: () => {
                const cmds = ['speed 10', 'color blue'];
                for (let i = 0; i < 50; i++) { cmds.push(`fd ${i * 4}`); cmds.push('rt 90'); }
                return cmds;
            }
        },
        starburst: {
            name: '光芒四射',
            code: `for i in range(36):\n    t.forward(100)\n    t.backward(100)\n    t.right(10)`,
            getCmds: () => {
                const cmds = ['speed 10', 'color orange', 'pensize 2'];
                for (let i = 0; i < 36; i++) { cmds.push('fd 100'); cmds.push('bk 100'); cmds.push('rt 10'); }
                return cmds;
            }
        },
        kaleidoscope: {
            name: '万花筒',
            code: `for i in range(6):\n    t.circle(60)\n    t.right(60)`,
            getCmds: () => {
                const cmds = ['speed 10', 'color purple', 'pensize 2'];
                for (let i = 0; i < 6; i++) { cmds.push('circle 60'); cmds.push('rt 60'); }
                return cmds;
            }
        }
    };

    const currentP = patterns[pattern];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Sparkles} title="生成艺术">
                循环 + 变量 = 复杂的图案！选择一个图案来绘制。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                        {Object.keys(patterns).map(p => (
                            <button
                                key={p}
                                onClick={() => { setPattern(p); setRun(false); }}
                                className={`p-3 text-left rounded-lg text-sm font-bold transition-all border-2 ${pattern === p
                                    ? 'bg-pink-500 text-white border-pink-600 shadow-md'
                                    : 'bg-white text-pink-600 border-pink-100 hover:border-pink-300'
                                    }`}
                            >
                                {patterns[p].name}
                            </button>
                        ))}
                    </div>
                    <CodeBlock code={currentP.code} />
                    <Button onClick={() => setRun(prev => !prev)} variant="primary" className="w-full">
                        {run ? '重新开始' : '开始绘制'}
                    </Button>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4 min-h-[350px]">
                    {run ? (
                        <TurtleCanvas key={`${pattern}-${Date.now()}`} commands={currentP.getCmds()} isRunning={true} />
                    ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                            <Sparkles size={48} className="mb-2 opacity-20" />
                            <div>点击“开始绘制”</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PenControlSlide = () => {
    const [size, setSize] = useState(2);

    const commands = [
        `pensize ${size}`,
        'pencolor blue',
        'fd 50',
        'penup',
        'fd 30',
        'pendown',
        'fd 50',
        'penup',
        'fd 30',
        'pendown',
        'fd 50'
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={PenTool} title="画笔控制">
                掌控你的画笔！ <br />
                    <code>penup()</code>: 抬笔（移动时不留下痕迹）<br />
                    <code>pendown()</code>: 落笔（开始绘制）<br />
                    <code>pensize(width)</code>: 改变线条粗细
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-500 mb-2">画笔粗细: {size}</label>
                            <input
                                type="range"
                                min="1" max="10"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className="w-full accent-cyan-600"
                            />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h3 className="font-bold text-slate-700 mb-2 text-sm">代码预览:</h3>
                            <code className="text-xs font-mono text-slate-600 block whitespace-pre">
                                {`t.pensize(${size})
t.forward(50)
t.penup()   # 抬笔
t.forward(30)
t.pendown() # 落笔
t.forward(50)`}
                            </code>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas commands={commands} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const ChallengeSlide = () => {
    const [level, setLevel] = useState(1);
    const [showHint, setShowHint] = useState(false);

    const challenges = {
        1: {
            title: '第一关：小房子 (The House)',
            desc: '画一个带三角形屋顶的正方形。',
            hint: `for i in range(4): # 正方形\n    t.fd(100); t.rt(90)\nt.lt(60) # 屋顶角度\nt.fd(100); t.rt(120)\nt.fd(100)`,
            cmds: ['fd 100', 'rt 90', 'fd 100', 'rt 90', 'fd 100', 'rt 90', 'fd 100', 'rt 90', 'lt 60', 'fd 100', 'rt 120', 'fd 100']
        },
        2: {
            title: '第二关：花朵 (The Flower)',
            desc: '画 8 个圆，每个旋转 45 度。',
            hint: `for i in range(8):\n    t.circle(50)\n    t.rt(45)`,
            cmds: Array(8).fill(0).flatMap(() => ['circle 50', 'rt 45'])
        },
        3: {
            title: '第三关：奥运五环 (Olympic Rings)',
            desc: '画 5 个不同颜色的相交圆。',
            hint: `# Blue\nt.color("blue"); t.circle(50)\n# Yellow\nt.pu(); t.goto(60, -50); t.pd()\nt.color("yellow"); t.circle(50)\n# ...continue for others`,
            cmds: [
                'pensize 3', 'color blue', 'circle 45',
                'pu', 'rt 90', 'fd 50', 'lt 90', 'fd 60', 'pd', 'color black', 'circle 45',
                'pu', 'rt 90', 'fd 50', 'lt 90', 'fd 60', 'pd', 'color red', 'circle 45',
                'pu', 'bk 150', 'pd',
                'pu', 'rt 90', 'fd 50', 'lt 90', 'pd', 'color yellow', 'circle 45',
                'pu', 'rt 90', 'fd 50', 'lt 90', 'fd 60', 'pd', 'color green', 'circle 45'
            ] // Simplified logic for demo
        }
    };

    const currentCh = challenges[level];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-yellow-100 p-6 rounded-2xl border border-yellow-200 text-yellow-900">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="text-yellow-600" />
                        挑战关卡
                    </h2>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(l => (
                            <button
                                key={l}
                                onClick={() => { setLevel(l); setShowHint(false); }}
                                className={`w-8 h-8 rounded-full font-bold border-2 ${level === l ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-white text-yellow-600 border-yellow-200'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
                <h3 className="text-xl font-bold">{currentCh.title}</h3>
                <p>{currentCh.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="p-6 bg-slate-900 rounded-2xl text-slate-300 min-h-[200px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        {!showHint ? (
                            <Button onClick={() => setShowHint(true)} variant="secondary">
                                <Zap size={16} /> 显示提示代码
                            </Button>
                        ) : (
                            <div className="w-full text-left font-mono text-sm overflow-auto max-h-[300px]">
                                <pre className="text-green-400">{currentCh.hint}</pre>
                                <button
                                    onClick={() => setShowHint(false)}
                                    className="absolute top-2 right-2 text-xs text-slate-500 hover:text-slate-300"
                                >
                                    隐藏
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas commands={currentCh.cmds} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const PlaygroundSlide = () => {
    const [inputCode, setInputCode] = useState('pensize 2\ncolor blue\nfd 100\nrt 90\nfd 100\nrt 90\nfd 100\nrt 90\nfd 100');
    const [cmds, setCmds] = useState([]);

    const runCode = () => {
        const lines = inputCode.split('\n');
        const parsed = lines.map(l => l.trim()).filter(l => l && !l.startsWith('#'));
        setCmds(parsed);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Terminal className="text-green-400" />
                    自由创作
                </h2>
                <p className="text-slate-300">
                    在这里输入你的指令。
                    <br />
                    支持指令: <code>fd</code>, <code>rt</code>, <code>circle</code>, <code>color</code>, 等等。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1 bg-slate-900 text-green-400 font-mono p-4 rounded-xl border border-slate-700 min-h-[300px]"
                        spellCheck={false}
                        placeholder="在此输入指令..."
                    />
                    <Button onClick={runCode} variant="success">运行代码</Button>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4 border-2 border-slate-200">
                    <TurtleCanvas key={Date.now()} commands={cmds} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const f5MasteryItems = [
    {
        label: '能用 forward 和 right 解释海龟每一步的位置和方向。',
        evidence: '拿正方形举例，能说出每次前进多少、转多少度。',
        retryHint: '回到“移动”和“形状”，先用纸画箭头，再运行代码。',
    },
    {
        label: '能把重复画边的代码改成 for 循环。',
        evidence: '能把 4 条边或 6 条边写成“重复次数 + 每次动作”。',
        retryHint: '回到“循环魔法”，把一条边的动作圈出来再重复。',
    },
    {
        label: '能控制画笔状态，不让不该连线的地方连上。',
        evidence: '能说明什么时候用 penup()，什么时候用 pendown()。',
        retryHint: '回到“画笔控制”，先区分“移动位置”和“留下线条”。',
    },
    {
        label: '能改颜色、填充或角度，做出一个自己的图形变体。',
        evidence: '不是照抄示例，而是能把边数、颜色或旋转角度换掉再解释效果。',
        retryHint: '回到“生成艺术”，一次只改一个变量，观察图形怎么变。',
    },
];

const SummarySlide = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-3xl text-white shadow-xl text-center">
                <Star className="w-16 h-16 mx-auto mb-4 text-yellow-300 animate-pulse" />
                <h2 className="text-3xl font-bold mb-2">做得太棒了！</h2>
                <p className="text-indigo-100 text-lg">你是 Python 编程的未来之星！灵活运用你的海龟神力吧。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-700">
                        <BookOpen size={20} className="text-indigo-500" />
                        速查表
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="font-mono text-indigo-600">forward(d) / fd(d)</span>
                            <span>向前移动 d 步</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="font-mono text-indigo-600">right(a) / rt(a)</span>
                            <span>向右旋转 a 度</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="font-mono text-indigo-600">penup() / pendown()</span>
                            <span>抬笔 / 落笔</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="font-mono text-indigo-600">color("name")</span>
                            <span>改变画笔颜色</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="font-mono text-indigo-600">begin_fill() / end_fill()</span>
                            <span>填充形状</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                    <Award className="w-12 h-12 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-emerald-900 mb-2">课程完成！</h3>
                    <p className="text-emerald-700 text-sm mb-4">你已经掌握了海龟绘图的基础。</p>
                    <Link to="/">
                        <Button variant="success">返回主页</Button>
                    </Link>
                </div>
            </div>

            <MasteryCheck
                title="F5 turtle 绘图离开前检查"
                description="如果能解释海龟方向、用循环画图、控制画笔状态、做出图形变体，就可以进入随机世界。"
                accent="teal"
                items={f5MasteryItems}
            />
        </div>
    );
};

// --- Main Course Component ---

const sections = [
    { id: 1, title: '介绍', icon: MousePointer2, component: IntroSlide },
    { id: 2, title: '移动', icon: Move, component: MoveSlide },
    { id: 3, title: '循环', icon: Repeat, component: LoopSlide },
    { id: 4, title: '形状', icon: Square, component: ShapeSlide },
    { id: 5, title: '颜色', icon: Palette, component: ColorSlide },
    { id: 6, title: '画笔', icon: PenTool, component: PenControlSlide },
    { id: 7, title: '艺术', icon: Sparkles, component: ArtSlide },
    { id: 8, title: '挑战', icon: Trophy, component: ChallengeSlide },
    { id: 9, title: '自由', icon: Terminal, component: PlaygroundSlide },
    { id: 10, title: '总结', icon: Star, component: SummarySlide },
];

export default function PythonFoundation5() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F5"
            lessonTitle="绘图魔法"
            lessonSubtitle="用 turtle 把代码画出来"
            accent="teal"
            hero={{
                title: '用 turtle 把循环和角度画成作品',
                description: '把循环、角度和坐标变成看得见的图形，在动手画画中建立对“状态变化”的直觉。',
            }}
            prerequisites={['会调用函数并传参数', '会用 for 循环重复', '会用 import 引入模块']}
            sections={sections}
            previousPath="/python/f4"
            nextPath="/python/f6"
            nextLabel="下一课：F6 随机世界"
            topSupport={<PythonFoundationSupport lessonId="f5" />}
            bottomSupport={<PythonFoundationSupport lessonId="f5" placement="bottom" />}
        />
    );
}

