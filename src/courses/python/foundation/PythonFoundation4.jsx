import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Code, Package, Zap, ArrowRight, RefreshCw, Sparkles, BookOpen, AlertCircle, Menu, X, Play, Trophy, CheckCircle, XCircle, Star, Calculator, Dices, Clock } from 'lucide-react';
import LessonQualityBar from '../../../components/LessonQualityBar';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';

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

// 1. functions - The Magic Workshop
const FunctionSlide = () => {
    const [ingredient, setIngredient] = useState('🌟');
    const [action, setAction] = useState('print');
    const [workshopOutput, setWorkshopOutput] = useState(null);
    const [inventory, setInventory] = useState([]);

    const runMagic = () => {
        setWorkshopOutput(null);
        setTimeout(() => {
            if (action === 'print') {
                setWorkshopOutput({ type: 'hologram', content: `You see a ${ingredient} potion image!` });
            } else {
                const potion = ingredient === '🌟' ? '🧪 Star Potion' : '🧪 Slime Potion';
                setWorkshopOutput({ type: 'item', content: potion });
                setInventory(prev => [...prev, potion]);
            }
        }, 600);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Concept Banner */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="text-yellow-300" />
                    Function Workshop: 魔法工坊
                </h2>
                <p className="opacity-90">
                    <strong>Function</strong> 就像一个魔法机器。你把原料（Arguments）放进去，它在内部加工，
                    然后选择是给你看一眼（Print）还是直接给你成品（Return）。
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Interface */}
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                        <span>INPUT (Arguments)</span>
                        <span>PROCESS (Function Body)</span>
                        <span>OUTPUT (Return/Print)</span>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        {/* Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-center">原料</label>
                            <button
                                onClick={() => setIngredient(prev => prev === '🌟' ? '🟢' : '🌟')}
                                className="w-12 h-12 text-2xl bg-white border-2 border-indigo-200 rounded-lg shadow-sm hover:scale-110 transition-transform"
                            >
                                {ingredient}
                            </button>
                        </div>

                        {/* Machine */}
                        <div className="flex-1 bg-slate-800 rounded-xl p-3 relative overflow-hidden text-center">
                            <div className="absolute inset-0 bg-slate-700/50 animate-pulse"></div>
                            <div className="relative z-10 text-white font-mono text-xs mb-2">make_potion({ingredient})</div>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setAction('print')}
                                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${action === 'print' ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'}`}
                                >
                                    print()
                                </button>
                                <button
                                    onClick={() => setAction('return')}
                                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${action === 'return' ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300'}`}
                                >
                                    return
                                </button>
                            </div>
                        </div>

                        {/* Trigger */}
                        <Button onClick={runMagic} variant="primary" className="h-12 w-12 !px-0 rounded-full">
                            <Play size={20} fill="currentColor" />
                        </Button>
                    </div>

                    {/* Result Display */}
                    <div className="min-h-[100px] bg-slate-100 rounded-xl p-4 border-2 border-dashed border-slate-300 flex items-center justify-center">
                        {workshopOutput ? (
                            <div className="text-center animate-in zoom-in duration-300">
                                {workshopOutput.type === 'hologram' ? (
                                    <>
                                        <div className="text-4xl opacity-50 filter blur-[1px] mb-2">{inventory.includes('Potion') ? '🧪' : '🔮'}</div>
                                        <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">👀 Console Output Only</div>
                                        <div className="text-xs text-slate-500 mt-1">{workshopOutput.content}</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-2 filter drop-shadow-lg">🧪</div>
                                        <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">🎁 Returned Item</div>
                                        <div className="text-xs text-slate-500 mt-1">Added to Inventory!</div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-slate-400 text-sm">点击运行按钮开始实验...</div>
                        )}
                    </div>

                    {/* Inventory */}
                    <div className="border-t pt-4">
                        <div className="text-xs font-bold text-slate-500 mb-2">MY INVENTORY (背包)</div>
                        <div className="flex gap-2 min-h-[40px] bg-slate-50 p-2 rounded-lg border border-slate-200 overflow-x-auto">
                            {inventory.length === 0 && <span className="text-slate-300 text-xs italic p-1">Empty... 'return' gives you items!</span>}
                            {inventory.map((item, i) => (
                                <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded shadow-sm text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Code Explanation */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <BookOpen size={20} /> Only 'return' gives value back!
                    </h3>
                    <CodeBlock code={`
def make_potion(ingredient):
    # Mixing process...
    
    if action == "print":
        print("Look! A potion!") 
        # Variable 'result' will be None!
        
    elif action == "return":
        return "Potion Item" 
        # Variable 'result' gets the potion!

# Calling the function
result = make_potion("${ingredient}")
                    `} />
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-3">
                        <AlertCircle className="flex-shrink-0 text-yellow-500" />
                        <div>
                            <strong>关键区别：</strong>
                            <ul className="list-disc ml-4 mt-1 space-y-1">
                                <li><code>print</code> 只是在屏幕上显示结果，程序拿不到这个结果。</li>
                                <li><code>return</code> 把结果扔回来，你可以用变量存起来继续用。</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Scope - Connect the dots / Circles
// 2. Scope - The House vs Street
const ScopeSlide = () => {
    const [varLocation, setVarLocation] = useState('global'); // 'global' or 'local'

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Box className="text-purple-600" />
                    作用域 (Scope)：谁能看见我？
                </h2>
                <p>
                    <strong>变量</strong>是有“地盘”的。
                    <strong>Global (全局)</strong> 就像在大街上，谁都能看见。
                    <strong>Local (局部)</strong> 就像在你的卧室里，只有屋里人（函数内部）能看见。
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Simulation */}
                <div className="space-y-4">
                    <div className="flex gap-4 justify-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="text-sm font-bold text-slate-500 self-center">把宝箱放在哪？</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setVarLocation('global')}
                                className={`px-4 py-2 rounded-lg font-bold transition-all border-2 ${varLocation === 'global' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-slate-200 text-slate-400'}`}
                            >
                                🌳 大街 (Global)
                            </button>
                            <button
                                onClick={() => setVarLocation('local')}
                                className={`px-4 py-2 rounded-lg font-bold transition-all border-2 ${varLocation === 'local' ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-slate-200 text-slate-400'}`}
                            >
                                🏠 卧室 (Local)
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[300px] border-4 border-slate-300 rounded-3xl overflow-hidden bg-sky-50">
                        {/* Street Label */}
                        <div className="absolute top-4 left-4 text-green-700 font-bold flex items-center gap-2">
                            <span className="text-2xl">🌳</span> GLOBAL SCOPE (大街)
                        </div>

                        {/* Global Variable Visual */}
                        {varLocation === 'global' && (
                            <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-10 group">
                                <div className="text-4xl">💎</div>
                                <div className="bg-white/90 px-2 py-1 rounded text-xs font-bold border border-green-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    Global Variable
                                </div>
                            </div>
                        )}

                        {/* House (Local Scope) */}
                        <div className="absolute bottom-0 w-full h-[180px] bg-white border-t-4 border-purple-300 rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                            <div className="absolute -top-5 left-8 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold border-4 border-white shadow-sm">
                                my_function() 🏠
                            </div>

                            <div className="flex items-center justify-between h-full pt-4">
                                <div className="w-1/2 text-center border-r border-slate-100 pr-4">
                                    <div className="text-xs font-bold text-slate-400 mb-2">Can I see the diamond?</div>
                                    <div className={`text-xl font-bold ${varLocation === 'global' || varLocation === 'local' ? 'text-green-500' : 'text-slate-300'}`}>
                                        ✅ YES
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        {varLocation === 'global' ? "(Looking out the window)" : "(It's right here!)"}
                                    </div>
                                </div>

                                {/* Local Variable Visual */}
                                <div className="w-1/2 flex flex-col items-center justify-center relative">
                                    {varLocation === 'local' ? (
                                        <div className="animate-bounce">
                                            <div className="text-4xl">💎</div>
                                            <div className="text-xs font-bold text-purple-600 mt-1">Local Variable</div>
                                        </div>
                                    ) : (
                                        <div className="text-slate-200 text-4xl grayscale opacity-50">👻</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Reflection */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">Code Reality</h3>
                    <CodeBlock code={`
# 1. Setup
${varLocation === 'global' ? 'gem = "Diamond"  # 🟢 Global Variable' : '# (No global gem)'}

def my_room():
    ${varLocation === 'local' ? 'gem = "Diamond"  # 🟣 Local Variable' : '# (Looking for gem...)'}
    print(gem)  # ✅ Access inside function

# 2. Execution
my_room()     # Function runs
print(gem)    # ${varLocation === 'global' ? '✅ OK (Everyone sees it)' : '❌ ERROR (Can not see inside room)'}
                     `} />

                    <div className={`p-4 rounded-xl border flex gap-3 items-start transition-colors
                        ${varLocation === 'global' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}
                     `}>
                        {varLocation === 'global' ? (
                            <>
                                <div className="text-2xl">😎</div>
                                <div className="text-sm">
                                    <strong>Safe!</strong> 定义在 Global 的变量，函数里面和外面都能用。
                                </div>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                                <div className="text-sm">
                                    <strong>Crash!</strong> 最后的 <code>print(gem)</code> 会报错！
                                    <br />因为 <code>gem</code> 被锁在 <code>my_room</code> 里了，外面的人看不见。
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Modules - The Hero's Toolkit
const ModuleSlide = () => {
    const [activeTool, setActiveTool] = useState(null);
    const [toolOutput, setToolOutput] = useState(null);

    const tools = [
        { id: 'random', name: 'random', icon: '🎲', desc: 'Chaos Engine', color: 'bg-orange-500' },
        { id: 'time', name: 'time', icon: '⏰', desc: 'Chrono Dial', color: 'bg-blue-500' },
        { id: 'math', name: 'math', icon: '📐', desc: 'Geo Analyzer', color: 'bg-purple-500' },
    ];

    const useTool = (toolId) => {
        setActiveTool(toolId);
        setToolOutput(null); // Reset

        if (toolId === 'random') {
            const loot = ['🗡️ Iron Sword', '🛡️ Wooden Shield', '💰 Gold Coin', '💊 Health Potion'];
            const item = loot[Math.floor(Math.random() * loot.length)];
            setToolOutput({ cmd: 'random.choice(loot_box)', val: item });
        } else if (toolId === 'time') {
            const time = new Date().toLocaleTimeString();
            setToolOutput({ cmd: 'time.ctime()', val: time });
        } else if (toolId === 'math') {
            setToolOutput({ cmd: 'math.pi', val: Math.PI.toFixed(5) });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Package className="text-blue-600" />
                    模块 (Module)：英雄工具箱
                </h2>
                <p>
                    Python 自带了很多强力工具包（Modules）。
                    你不需要自己造轮子，只要 <strong>import</strong> 拿来就能用！
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Toolkit */}
                <div className="bg-slate-800 p-6 rounded-2xl border-2 border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"></div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-white font-bold flex items-center gap-2">
                            <Package size={20} className="text-blue-400" />
                            MY TOOLKIT
                        </div>
                        <div className="px-2 py-0.5 bg-slate-700 rounded text-slate-400 text-xs font-mono">Python 3.12</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {tools.map(tool => (
                            <button
                                key={tool.id}
                                onClick={() => useTool(tool.id)}
                                className={`aspect-square rounded-xl p-2 flex flex-col items-center justify-center gap-2 transition-all border-2
                                    ${activeTool === tool.id
                                        ? 'bg-slate-700 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                                        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'}
                                `}
                            >
                                <div className="text-3xl">{tool.icon}</div>
                                <div className="text-xs font-bold text-slate-300">{tool.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interactive Demo Area */}
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 flex flex-col justify-center min-h-[300px]">
                    {!activeTool ? (
                        <div className="text-center text-slate-400">
                            <div className="text-6xl mb-4 grayscale opacity-20">🛠️</div>
                            <p>Select a tool from the toolkit to test it!</p>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center animate-in zoom-in duration-300">
                            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-4xl shadow-lg
                                ${tools.find(t => t.id === activeTool).color} text-white`}>
                                {tools.find(t => t.id === activeTool).icon}
                            </div>

                            <div>
                                <div className="font-mono bg-slate-100 inline-block px-3 py-1 rounded text-slate-600 text-sm mb-2">
                                    import {activeTool}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {tools.find(t => t.id === activeTool).desc}
                                </h3>
                            </div>

                            <div className="bg-slate-900 rounded-xl p-4 text-left font-mono text-sm shadow-inner relative overflow-hidden group">
                                <div className="flex gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-slate-400">
                                    <span className="text-purple-400">{'>>>'}</span> {toolOutput?.cmd}
                                </div>
                                <div className="text-green-400 font-bold mt-1 text-lg">
                                    {toolOutput?.val}
                                </div>

                                <button
                                    onClick={() => useTool(activeTool)}
                                    className="absolute top-3 right-3 p-1.5 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 hover:text-white transition-colors"
                                    title="Rerun"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// 4. Advanced Functions - Default Parameters
const AdvancedFunctionSlide = () => {
    const [filling, setFilling] = useState('');
    const [result, setResult] = useState('');

    const makeSandwich = () => {
        const actualFilling = filling || 'Cheese';
        setResult(`🥪 Making a ${actualFilling} sandwich!`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-orange-600" />
                    进阶函数：默认参数 (Default Args)
                </h2>
                <p>
                    有时候我们不想每次都输入参数。如果没有给参数，函数可以使用一个<strong>默认值</strong>。
                    就像去餐厅，如果你不说吃什么，厨师就给你做“招牌菜”。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">The Sandwich Robot 🤖</h3>
                    <CodeBlock code={`
def make_sandwich(filling = "Cheese"):
    print(f"Here is your {filling} sandwich!")

# 1. No Argument (Uses Default)
make_sandwich() 
# Output: Cheese sandwich

# 2. With Argument (Overwrites Default)
make_sandwich("Ham") 
# Output: Ham sandwich
                     `} />
                </div>

                <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col items-center gap-6">
                    <div className="w-full">
                        <label className="text-xs font-bold text-slate-500 block mb-2">CUSTOM FILLING (Optional)</label>
                        <input
                            type="text"
                            placeholder="Leave empty for default..."
                            value={filling}
                            onChange={(e) => setFilling(e.target.value)}
                            className="w-full border-2 border-slate-300 rounded-lg p-3 text-lg focus:border-orange-500 outline-none transition-colors"
                        />
                        <div className="text-xs text-slate-400 mt-1 pl-1">
                            {filling ? 'Using your custom filling' : 'Using default: "Cheese"'}
                        </div>
                    </div>

                    <Button onClick={makeSandwich} className="w-full bg-orange-500 text-white hover:bg-orange-600">
                        🤖 Order Sandwich
                    </Button>

                    <div className="h-24 flex items-center justify-center w-full bg-orange-50 rounded-xl border-2 border-dashed border-orange-200">
                        {result ? (
                            <div className="text-xl font-bold text-orange-800 animate-bounce">
                                {result}
                            </div>
                        ) : (
                            <span className="text-orange-300">Waiting for order...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Lambda - The Magic Scrolls
const LambdaSlide = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-pink-100 p-6 rounded-2xl border border-pink-200 text-pink-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-pink-600" />
                    Lambda 函数：瞬发魔法卷轴
                </h2>
                <p>
                    <strong>Lambda</strong> 是“匿名函数”。它不需要名字，写完即用，用完即走。
                    就像是一次性的魔法卷轴，适合写那些特别短小的逻辑。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Regular Function */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-300"></div>
                    <div className="pl-4">
                        <h3 className="font-bold text-slate-600 mb-2 flex items-center gap-2">
                            <BookOpen size={18} /> 普通函数 (Def)
                        </h3>
                        <div className="text-sm text-slate-500 mb-4 h-10">
                            厚重的魔法书，有名字，可以反复查阅。
                        </div>
                        <CodeBlock code={`
def add(a, b):
    return a + b

print(add(3, 5))
                        `} />
                    </div>
                </div>

                {/* Lambda Function */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-pink-400 to-purple-500"></div>
                    <div className="pl-4">
                        <h3 className="font-bold text-pink-700 mb-2 flex items-center gap-2">
                            <Zap size={18} /> Lambda (Scroll)
                        </h3>
                        <div className="text-sm text-pink-600 mb-4 h-10">
                            轻便的魔法卷轴，一行代码搞定。
                        </div>
                        <CodeBlock code={`
add = lambda a, b: a + b

print(add(3, 5))
                        `} />
                    </div>
                    <div className="absolute top-4 right-4 animate-pulse opacity-50">⚡</div>
                </div>
            </div>

            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-sm leading-relaxed">
                <span className="text-pink-400"># 什么时候用 Lambda？</span><br />
                <span className="text-slate-500"># 比如给列表排序的时候，作为一个临时的“规则”</span><br /><br />
                points = [(1, 2), (3, 1), (5, 0)]<br />
                points.sort(key=<span className="text-yellow-400">lambda x: x[1]</span>) <span className="text-slate-500"># 按第二个数字排序</span><br />
                print(points) <span className="text-slate-500"># Output: [(5, 0), (3, 1), (1, 2)]</span>
            </div>
        </div>
    );
};

// 4. Activity - Challenge
const QuizSlide = () => {
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



// 3.5 Library Interface - The Tool Shed
const LibrarySlide = () => {
    const [output, setOutput] = useState(null);
    const [activeLib, setActiveLib] = useState('math');

    const labs = {
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

const sections = [
    { id: 1, title: '函数 Function', icon: BookOpen, component: FunctionSlide },
    { id: 2, title: '作用域 Scope', icon: Box, component: ScopeSlide },
    { id: 3, title: '模块 Module', icon: Package, component: ModuleSlide },
    { id: 4, title: '常用库 Library', icon: Box, component: LibrarySlide },
    { id: 5, title: '进阶 Advanced', icon: Zap, component: AdvancedFunctionSlide },
    { id: 6, title: 'Lambda 魔法', icon: Sparkles, component: LambdaSlide },
    { id: 7, title: '挑战 Challenge', icon: Star, component: QuizSlide },
];

const lessonQuality = {
    goals: ['理解函数把重复代码封装成可复用工具', '会定义参数和返回值清晰的函数', '能用 import 调用模块中的能力'],
    deliverables: ['完成一个可复用的计算函数', '把重复代码改造成函数调用', '整理一张常用模块速查表'],
    checks: ['能解释形参、实参和返回值的区别', '能判断函数是否需要 return', '能定位函数名拼写、缩进和参数数量错误'],
};

export default function PythonFoundation4() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 hidden md:block">
                    <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        </Link>
                        <span className="bg-indigo-600 text-white p-1 rounded text-sm">Python</span>
                        F4: 函数与模块
                    </h1>
                    <p className="text-xs text-slate-500 mt-2">Python 基础体系</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group 1: 核心概念 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🧩 核心概念</div>
                        <div className="space-y-1">
                            {sections.slice(0, 3).map(section => (
                                <NavButton
                                    key={section.id}
                                    section={section}
                                    activeSection={activeSection}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Group 2: 高级进阶 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">⚡ 高级进阶</div>
                        <div className="space-y-1">
                            {sections.slice(3, 5).map(section => (
                                <NavButton
                                    key={section.id}
                                    section={section}
                                    activeSection={activeSection}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Group 3: 挑战 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🏆 毕业挑战</div>
                        <div className="space-y-1">
                            {sections.slice(5, 6).map(section => (
                                <NavButton
                                    key={section.id}
                                    section={section}
                                    activeSection={activeSection}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:hidden flex-shrink-0 z-20">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                        aria-label="打开课程目录"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-slate-700">Section {activeSection}</span>
                </header>

                <main ref={scrollRef} className="flex-1 overflow-y-auto p-8 relative">
                    <div className="max-w-4xl mx-auto pb-10">
                        <header className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        </header>

                        <PythonFoundationSupport lessonId="f4" />

                        <LessonQualityBar
                            goals={lessonQuality.goals}
                            deliverables={lessonQuality.deliverables}
                            checks={lessonQuality.checks}
                            accent="indigo"
                        />

                        <ActiveComponent />
                        <PythonFoundationSupport lessonId="f4" placement="bottom" />
                    </div>
                </main>

                {/* Sticky Footer */}
                <div className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all
                            ${activeSection === 1
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                        <ArrowRight className="rotate-180" size={20} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/f5');
                            }
                        }}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg text-white hover:translate-x-1
                             bg-indigo-600 hover:bg-indigo-700`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
