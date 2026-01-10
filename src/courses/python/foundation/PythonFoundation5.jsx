import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MousePointer2, Move, Square, Palette, Sparkles, ChevronRight, Home, PenTool, Trophy, BookOpen, Zap, Star, Target, Award, Menu, X, CheckCircle, RefreshCw, ArrowRight, Repeat, Terminal, Network } from 'lucide-react';
import TurtleCanvas from '../../../components/TurtleCanvas';

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
        <div className="bg-emerald-100 p-6 rounded-2xl border border-emerald-200 text-emerald-900">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MousePointer2 className="text-emerald-600" />
                初识小海龟
            </h2>
            <p className="text-lg leading-relaxed">
                欢迎来到 <strong>小海龟</strong> 画图的世界！ <br />
                想象一只小海龟听从你的每一个指令，它可以画出复杂的图案、形状和艺术作品！
            </p>
        </div>
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
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Move className="text-blue-600" />
                    第一步：移动
                </h2>
                <p>
                    点击按钮来移动小海龟！
                    <br />
                    <code>forward(100)</code>: 向前移动 100 步
                    <br />
                    <code>right(90)</code>: 向右旋转 90 度
                </p>
            </div>

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
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Repeat className="text-orange-600" />
                    循环魔法
                </h2>
                <p>
                    聪明的程序员都会偷懒！与其一遍遍写重复的代码，不如使用 <code>for</code> 循环。
                    <br />
                    <code>for i in range(4):</code> 的意思是“重复 4 次”。
                </p>
            </div>

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
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Square className="text-purple-600" />
                    绘制图形
                </h2>
                <p>
                    使用循环来绘制图形！公式很简单：<br />
                    <strong>旋转角度 = 360 ÷ 边数</strong>
                </p>
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
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Palette className="text-orange-600" />
                    缤纷色彩
                </h2>
                <p>
                    改变画笔颜色 (`pencolor`) 和填充颜色 (`fillcolor`)。
                    别忘了 `begin_fill()` 和 `end_fill()`。
                </p>
            </div>

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
            <div className="bg-pink-100 p-6 rounded-2xl border border-pink-200 text-pink-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-pink-600" />
                    生成艺术
                </h2>
                <p>
                    循环 + 变量 = 复杂的图案！选择一个图案来绘制。
                </p>
            </div>

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
    const [isDown, setIsDown] = useState(true);
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
            <div className="bg-cyan-100 p-6 rounded-2xl border border-cyan-200 text-cyan-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <PenTool className="text-cyan-600" />
                    画笔控制
                </h2>
                <p>
                    掌控你的画笔！ <br />
                    <code>penup()</code>: 抬笔（移动时不留下痕迹）<br />
                    <code>pendown()</code>: 落笔（开始绘制）<br />
                    <code>pensize(width)</code>: 改变线条粗细
                </p>
            </div>

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
            cmds: Array(8).fill(0).flatMap((_, i) => ['circle 50', 'rt 45'])
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

const FractalTreeSlide = () => {
    const [depth, setDepth] = useState(4);
    const [length, setLength] = useState(60);

    const getTreeCmds = () => {
        const cmds = ['speed 0', 'pensize 2', 'color forestgreen', 'lt 90', 'pu', 'bk 100', 'pd'];

        // Simple recursive tree simulation for Turtle commands
        const buildTree = (d, len) => {
            if (d === 0) return;
            cmds.push(`fd ${len}`);
            cmds.push('lt 30');
            buildTree(d - 1, len * 0.7);
            cmds.push('rt 60'); // 30 (back to center) + 30 (right)
            buildTree(d - 1, len * 0.7);
            cmds.push('lt 30'); // Back to center
            cmds.push(`bk ${len}`);
        };

        buildTree(depth, length);
        return cmds;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-100 p-6 rounded-2xl border border-emerald-200 text-emerald-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Network className="text-emerald-600" />
                    递归与分形树
                </h2>
                <p>
                    <strong>递归 (Recursion)</strong> 就是函数自己调用自己。
                    <br />
                    看！这棵树的每一根树枝，都是一棵更小的树。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-500 mb-2">生长深度: {depth}</label>
                        <input
                            type="range"
                            min="1" max="7"
                            value={depth}
                            onChange={(e) => setDepth(parseInt(e.target.value))}
                            className="w-full accent-emerald-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-500 mb-2">树枝长度: {length}</label>
                        <input
                            type="range"
                            min="40" max="100"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-emerald-600"
                        />
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="font-bold text-slate-700 mb-2 text-sm">伪代码:</h3>
                        <div className="font-mono text-xs text-slate-600 space-y-1">
                            <div>def tree(len):</div>
                            <div className="pl-4">if len &lt; 5: return</div>
                            <div className="pl-4">forward(len)</div>
                            <div className="pl-4">left(30); tree(len * 0.7)</div>
                            <div className="pl-4">right(60); tree(len * 0.7)</div>
                            <div className="pl-4">left(30); backward(len)</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                    <TurtleCanvas key={`${depth}-${length}`} commands={getTreeCmds()} isRunning={true} />
                </div>
            </div>
        </div>
    );
};

const MonteCarloSlide = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [insidePoints, setInsidePoints] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [batchSize, setBatchSize] = useState(10);
    const [commands, setCommands] = useState(['speed 0', 'pensize 3']);

    const [history, setHistory] = useState([]); // Store Pi estimates over time

    // Using a ref to stop the loop when component unmounts or stopped
    const stopRef = React.useRef(false);

    // Sparkline SVG Component
    const Sparkline = ({ data }) => {
        if (data.length < 2) return <div className="h-12 flex items-center justify-center text-xs text-slate-400">数据生成中...</div>;

        const width = 100;
        const height = 40;
        const maxVal = Math.max(3.5, ...data);
        const minVal = Math.min(2.8, ...data);
        const range = maxVal - minVal || 1;

        const points = data.map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - minVal) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        // Target line for Pi (3.14159)
        const piY = height - ((Math.PI - minVal) / range) * height;

        return (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12 overflow-visible">
                {/* Reference PI Line */}
                <line x1="0" y1={piY} x2={width} y2={piY} stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                {/* Data Line */}
                <polyline points={points} fill="none" stroke="#6366f1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
        );
    };

    // Effect to handle unmount stopping
    React.useEffect(() => {
        return () => { stopRef.current = true; };
    }, []);

    const runSimulation = async () => {
        if (isRunning) {
            stopRef.current = true;
            setIsRunning(false);
            return;
        }

        setIsRunning(true);
        stopRef.current = false;

        let total = totalPoints;
        let inside = insidePoints;
        const newCmds = [...commands];

        // Draw bounding box and circle if starting fresh
        if (total === 0) {
            // Draw grid and axis first
            newCmds.push('speed 0');
            newCmds.push('pensize 1');
            newCmds.push('color #e2e8f0'); // Light slate for grid
            // Grid lines every 50 units, spanning -200 to 200
            for (let i = -200; i <= 200; i += 50) {
                newCmds.push(`pu`); newCmds.push(`goto ${i} -200`); newCmds.push(`pd`); newCmds.push(`goto ${i} 200`);
                newCmds.push(`pu`); newCmds.push(`goto -200 ${i}`); newCmds.push(`pd`); newCmds.push(`goto 200 ${i}`);
            }

            // Draw Box
            newCmds.push('pensize 2');
            newCmds.push('color black');
            newCmds.push('pu');
            newCmds.push('goto -200 -200');
            newCmds.push('pd');
            for (let i = 0; i < 4; i++) { newCmds.push('fd 400'); newCmds.push('lt 90'); }

            // Note: Circle outline removed for cleaner visualization
            // The red/blue dots naturally show the circular boundary

            setCommands(newCmds); // Initial setup
            // Tiny pause to let render catch up
            await new Promise(r => setTimeout(r, 50));
        }

        while (!stopRef.current) {
            const batchCmds = [];
            let batchInside = 0;

            for (let i = 0; i < batchSize; i++) {
                // Random x, y between -200 and 200 (logical -1 to 1 scaled by 200)
                const x = Math.random() * 400 - 200;
                const y = Math.random() * 400 - 200;
                const dist = Math.sqrt(x * x + y * y);

                const isInside = dist <= 200;
                if (isInside) batchInside++;

                const color = isInside ? '#ef4444' : '#3b82f6'; // red-500 : blue-500
                // Use goto for position and dot for point
                batchCmds.push(`pu`);
                batchCmds.push(`goto ${x} ${y}`);
                batchCmds.push(`dot 3 ${color}`);
            }

            total += batchSize;
            inside += batchInside;
            const currentPi = 4 * inside / total;

            setTotalPoints(total);
            setInsidePoints(inside);
            setHistory(prev => {
                const updated = [...prev, currentPi];
                // Keep last 40 points for performance/clarity
                return updated.length > 40 ? updated.slice(updated.length - 40) : updated;
            });
            setCommands(prev => [...prev, ...batchCmds]);

            // Allow UI update and check for stop
            await new Promise(r => setTimeout(r, 100));
            if (total > 5000) {
                stopRef.current = true;
                break; // Safety limit for this demo
            }
        }

        setIsRunning(false);
    };

    const reset = () => {
        stopRef.current = true;
        setIsRunning(false);
        setTotalPoints(0);
        setInsidePoints(0);
        setCommands(['speed 0', 'pensize 2']);
        setHistory([]);
    };

    const piEstimate = totalPoints > 0 ? (4 * insidePoints / totalPoints).toFixed(5) : '...';

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="text-indigo-600" />
                    蒙特卡洛法求 π (Monte Carlo Pi)
                </h2>
                <p>
                    <strong>蒙特卡洛方法</strong> 是一种通过随机采样来解决问题的方法。
                    <br />
                    我们在一个正方形里画一个圆。随机扔豆子，落在圆里的豆子越多，π 的估算值就越准确！
                    <br />
                    公式：π ≈ 4 × (圆内点数 / 总点数)
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">总点数</div>
                            <div className="text-2xl font-mono font-bold text-slate-700">{totalPoints}</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-200 text-center shadow-sm">
                            <div className="text-xs text-red-500 font-bold uppercase tracking-wide">圆内点数</div>
                            <div className="text-2xl font-mono font-bold text-red-600">{insidePoints}</div>
                        </div>
                    </div>

                    {/* Pi Estimate - Hero Card */}
                    <div className={`mb-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-center shadow-xl ${isRunning ? 'animate-pulse' : ''}`}>
                        <div className="text-sm font-bold opacity-80 mb-1">π 估算值</div>
                        <div className="text-5xl font-mono font-extrabold tracking-wider drop-shadow-lg">{piEstimate}</div>
                        <div className="text-xs opacity-70 mt-2">真实值: {Math.PI.toFixed(5)}</div>
                        {totalPoints > 0 && (
                            <div className="mt-3 text-sm font-bold">
                                误差: <span className={`${Math.abs(parseFloat(piEstimate) - Math.PI) < 0.1 ? 'text-green-300' : 'text-yellow-300'}`}>
                                    {((Math.abs(parseFloat(piEstimate) - Math.PI) / Math.PI) * 100).toFixed(2)}%
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Convergence Sparkline */}
                    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-2">收敛趋势</div>
                        <Sparkline data={history} />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>← 早期</span>
                            <span className="text-emerald-500 font-bold">— π目标线</span>
                            <span>最新 →</span>
                        </div>
                    </div>

                    {/* Speed Control */}
                    <div className="mb-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-3">
                                <span>🚀 投点速度</span>
                                <span className="text-indigo-600">{batchSize} 点/批</span>
                            </div>
                            <input
                                type="range" min="1" max="50" value={batchSize}
                                onChange={(e) => setBatchSize(parseInt(e.target.value))}
                                className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button onClick={runSimulation} variant={isRunning ? "danger" : "success"} className="flex-1 shadow-lg transform hover:-translate-y-0.5 transition-all">
                            {isRunning ? (
                                <><X size={18} /> 停止模拟</>
                            ) : (
                                <><Zap size={18} /> 开始模拟</>
                            )}
                        </Button>
                        <Button onClick={reset} variant="secondary" className="shadow-md hover:shadow-lg transition-shadow">
                            <RefreshCw size={20} />
                        </Button>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4 border-2 border-slate-100 shadow-inner min-h-[400px]">
                        <TurtleCanvas key={stopRef.current} commands={commands} isRunning={true} width={400} height={400} />
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-xs font-mono">
                        <div className="text-slate-500 mb-2 font-bold uppercase">Python Code Logic</div>
                        <div className="space-y-1">
                            <div><span className="text-purple-400">import</span> random, math</div>
                            <div>scale = <span className="text-orange-400">200</span></div>
                            <div>inside = <span className="text-orange-400">0</span></div>
                            <div><span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(total):</div>
                            <div className="pl-4">x = random.uniform(<span className="text-orange-400">-1</span>, <span className="text-orange-400">1</span>)</div>
                            <div className="pl-4">y = random.uniform(<span className="text-orange-400">-1</span>, <span className="text-orange-400">1</span>)</div>
                            <div className="pl-4">dist = math.sqrt(x**2 + y**2)</div>
                            <div className="pl-4"><span className="text-gray-500"># 屏幕坐标</span></div>
                            <div className="pl-4">screen_x = x * scale</div>
                            <div className="pl-4">screen_y = y * scale</div>
                            <div className="pl-4"><span className="text-purple-400">if</span> dist &lt;= <span className="text-orange-400">1</span>:</div>
                            <div className="pl-8">inside += <span className="text-orange-400">1</span></div>
                            <div><span className="text-blue-400">print</span>(<span className="text-orange-400">4</span> * inside / total)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
    { id: 10, title: '分形树', icon: Network, component: FractalTreeSlide },
    { id: 11, title: '带派', icon: Target, component: MonteCarloSlide },
    { id: 12, title: '总结', icon: Star, component: SummarySlide },
];

export default function PythonFoundation5() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                    <span className="text-lg">F5: 绘图魔法</span>
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
                        F5: 绘图魔法
                    </h1>
                    <p className="text-xs text-slate-500 mt-2">Python 海龟绘图</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group 1: 入门 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🚀 海龟入门</div>
                        <div className="space-y-1">
                            {sections.slice(0, 3).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <section.icon size={18} className={activeSection === section.id ? 'text-emerald-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 2: 绘图技法 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🎨 绘图技法</div>
                        <div className="space-y-1">
                            {sections.slice(3, 7).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <section.icon size={18} className={activeSection === section.id ? 'text-emerald-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 3: 实验室 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🧪 实验项目</div>
                        <div className="space-y-1">
                            {sections.slice(7, 11).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <section.icon size={18} className={activeSection === section.id ? 'text-emerald-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 4: 总结 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🏆 总结</div>
                        <div className="space-y-1">
                            {sections.slice(11, 12).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <section.icon size={18} className={activeSection === section.id ? 'text-emerald-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        </header>

                        <ActiveComponent />
                    </div>
                </div>

                <div className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
                            ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
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
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
