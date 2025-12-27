import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Code, Package, Zap, ArrowRight, RefreshCw, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

// --- Shared Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50",
        success: "bg-purple-500 text-white hover:bg-purple-600 shadow-md",
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

// 1. Functions - The Spell Book
const FunctionSlide = () => {
    const [spellName, setSpellName] = useState('fireball');
    const [spellPower, setSpellPower] = useState(10);
    const [castResult, setCastResult] = useState('');

    const castSpell = () => {
        setCastResult(`Casting ${spellName} with power ${spellPower}!`);
        setTimeout(() => setCastResult('Boom! 🔥 Explosion created!'), 800);
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="text-indigo-600" />
                    函数 (Function)：魔法咒语
                </h2>
                <p>
                    <strong>Function</strong> 就像是一条自己发明的“魔法咒语”。
                    把一堆复杂的代码打包成一个新命令（比如 <code>cast_fireball()</code>），
                    下次只要念咒语就能直接发招，不用再重新写一遍代码。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">定义咒语 (Define)</h3>
                    <CodeBlock code={`
def cast_spell(name, power):
    print(f"Casting {name}...")
    damage = power * 2
    return damage
                     `} />

                    <div className="bg-slate-100 p-4 rounded-xl border space-y-4">
                        <div className="flex gap-2 items-center">
                            <label className="text-xs font-bold w-12 text-right">NAME</label>
                            <input value={spellName} onChange={e => setSpellName(e.target.value)} className="border rounded px-2 py-1 flex-1" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="text-xs font-bold w-12 text-right">POWER</label>
                            <input type="number" value={spellPower} onChange={e => setSpellPower(e.target.value)} className="border rounded px-2 py-1 w-20" />
                        </div>
                        <Button onClick={castSpell} variant="success" className="w-full">
                            <Zap size={16} /> 念咒语 (Call Function)
                        </Button>
                    </div>
                </div>

                <div className="bg-slate-900 h-64 rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-slate-700 shadow-2xl">
                    {castResult ? (
                        <div className="text-center animate-in zoom-in duration-300">
                            <div className="text-6xl mb-4 animate-bounce">🧙‍♂️</div>
                            <div className="text-white font-bold text-xl">{castResult}</div>
                        </div>
                    ) : (
                        <div className="text-slate-600 text-sm">等待施法...</div>
                    )}

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                </div>
            </div>
        </div>
    );
};

// 2. Scope - Connect the dots / Circles
const ScopeSlide = () => {
    // Conceptual visual: Local vs Global
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Box className="text-purple-600" />
                    作用域 (Scope)：秘密花园
                </h2>
                <p>
                    <strong>变量</strong>是有地盘的。
                    <strong>全局变量 (Global)</strong> 像公共广场，大家都能去。
                    <strong>局部变量 (Local)</strong> 像你的私人房间，只有在函数内部才能看到。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
                <div className="border-4 border-dashed border-slate-300 rounded-3xl p-8 relative min-h-[300px]">
                    <div className="absolute -top-4 left-6 bg-slate-100 px-3 py-1 font-bold text-slate-500 text-sm">程序 (Global Scope)</div>

                    <div className="flex items-center gap-2 mb-8 animate-bounce">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">G</div>
                        <span className="bg-white px-2 py-1 rounded border text-sm">Global Var</span>
                    </div>

                    {/* Function Box */}
                    <div className="border-4 border-purple-400 bg-purple-50 rounded-2xl p-6 relative mt-10">
                        <div className="absolute -top-3 left-6 bg-purple-100 text-purple-800 px-3 py-1 font-bold text-xs rounded-full border border-purple-200">my_function()</div>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">L</div>
                            <span className="bg-white px-2 py-1 rounded border text-sm">Local Var</span>
                        </div>

                        <p className="text-xs text-slate-500 mt-2">
                            👀 我能看见外面的 <span className="text-green-600 font-bold">Global Var</span>，<br />
                            但外面看不见我的 <span className="text-purple-600 font-bold">Local Var</span>。
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">代码示例</h3>
                    <CodeBlock code={`
hero = "Garen"  # Global

def secret_room():
    weapon = "Sword"  # Local
    print(hero)    # ✅ OK
    print(weapon)  # ✅ OK

secret_room()
print(hero)      # ✅ OK
print(weapon)    # ❌ Error!
                      `} />
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex gap-3 items-start">
                        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                        <div className="text-sm text-red-800">
                            <strong>NameError:</strong> name 'weapon' is not defined. <br />
                            (因为 weapon 被锁在 secret_room 里了)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Modules - The Toolkit
const ModuleSlide = () => {
    const [lib, setLib] = useState('random');
    const [output, setOutput] = useState('');

    const runModule = () => {
        if (lib === 'random') {
            setOutput(`🎲 result: ${Math.floor(Math.random() * 100)}`);
        } else if (lib === 'time') {
            const now = new Date();
            setOutput(`⏰ time: ${now.toLocaleTimeString()}`);
        } else if (lib === 'math') {
            setOutput(`π pi: ${Math.PI.toFixed(5)}...`);
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Package className="text-blue-600" />
                    模块 (Module)：超强工具箱
                </h2>
                <p>
                    Python 有很多现成的工具箱（Modules），只要 <strong>import</strong> 拿来就能用。
                    比如 <code>random</code> 帮你扔骰子，<code>time</code> 帮你计时，<code>math</code> 帮你算数学。
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex gap-4 justify-center flex-wrap mb-8">
                    {['random', 'time', 'math'].map(l => (
                        <button
                            key={l}
                            onClick={() => { setLib(l); setOutput(''); }}
                            className={`px-6 py-3 rounded-xl border-2 font-bold flex items-center gap-2 transition-all
                                ${lib === l
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md transform scale-105'
                                    : 'border-slate-200 text-slate-500 hover:border-slate-300'}
                            `}
                        >
                            <Package size={18} /> import {l}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-center">
                    <div className="text-slate-400 font-mono text-sm mb-4">
                        {lib === 'random' && 'random.randint(0, 100)'}
                        {lib === 'time' && 'time.ctime()'}
                        {lib === 'math' && 'math.pi'}
                    </div>
                    <Button onClick={runModule} className="mx-auto mb-6">
                        <Play size={16} /> Run Code
                    </Button>
                    <div className="h-12 flex items-center justify-center font-mono text-xl text-green-400 font-bold border-t border-slate-700">
                        {output || '...'}
                    </div>
                </div>
            </div>
        </div>
    );
}

const sections = [
    { id: 1, title: '函数 Function', icon: BookOpen, component: FunctionSlide },
    { id: 2, title: '作用域 Scope', icon: Box, component: ScopeSlide },
    { id: 3, title: '模块 Module', icon: Package, component: ModuleSlide },
];

export default function PythonFoundation4() {
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center overflow-hidden border border-indigo-200">
                                <span className="text-lg">🏠</span>
                            </div>
                        </Link>
                        F4: 函数模块
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
                            <Sparkles size={16} className="text-indigo-200" />
                        </div>
                        <div className="font-bold text-sm">进阶篇：算法与项目</div>
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
                            完成基础篇 🎉
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
