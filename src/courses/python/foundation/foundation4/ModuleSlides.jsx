import { useState } from 'react';
import { Package, Zap, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { SlideHeader } from '../../shell/PythonLessonShell';
import { Button, CodeBlock } from './Shared';

const LOOT_BOX = ['🗡️ Iron Sword', '🛡️ Wooden Shield', '💰 Gold Coin', '💊 Health Potion'];

const rollLoot = () => LOOT_BOX[Math.floor(Math.random() * LOOT_BOX.length)];

export const ModuleSlide = () => {
    const [activeTool, setActiveTool] = useState(null);
    const [toolOutput, setToolOutput] = useState(null);

    const tools = [
        { id: 'random', name: 'random', icon: '🎲', desc: 'Chaos Engine', color: 'bg-orange-500' },
        { id: 'time', name: 'time', icon: '⏰', desc: 'Chrono Dial', color: 'bg-blue-500' },
        { id: 'math', name: 'math', icon: '📐', desc: 'Geo Analyzer', color: 'bg-purple-500' },
    ];

    const runTool = (toolId) => {
        setActiveTool(toolId);
        setToolOutput(null); // Reset

        if (toolId === 'random') {
            setToolOutput({ cmd: 'random.choice(loot_box)', val: rollLoot() });
        } else if (toolId === 'time') {
            const time = new Date().toLocaleTimeString();
            setToolOutput({ cmd: 'time.ctime()', val: time });
        } else if (toolId === 'math') {
            setToolOutput({ cmd: 'math.pi', val: Math.PI.toFixed(5) });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Package} title="模块 (Module)：英雄工具箱">
                Python 自带了很多强力工具包（Modules）。
                    你不需要自己造轮子，只要 <strong>import</strong> 拿来就能用！
            </SlideHeader>

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
                                onClick={() => runTool(tool.id)}
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
                                    onClick={() => runTool(activeTool)}
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

export const AdvancedFunctionSlide = () => {
    const [filling, setFilling] = useState('');
    const [result, setResult] = useState('');

    const makeSandwich = () => {
        const actualFilling = filling || 'Cheese';
        setResult(`🥪 Making a ${actualFilling} sandwich!`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Zap} title="进阶函数：默认参数 (Default Args)">
                有时候我们不想每次都输入参数。如果没有给参数，函数可以使用一个<strong>默认值</strong>。
                    就像去餐厅，如果你不说吃什么，厨师就给你做“招牌菜”。
            </SlideHeader>

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

export const LambdaSlide = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Sparkles} title="Lambda 函数：瞬发魔法卷轴">
                <strong>Lambda</strong> 是“匿名函数”。它不需要名字，写完即用，用完即走。
                    就像是一次性的魔法卷轴，适合写那些特别短小的逻辑。
            </SlideHeader>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-900">
                💡 <strong>这一节是「进阶 · 选做」</strong>：Lambda 只是一种简写技巧，不是必须掌握的。第一次学函数，先把上面的 <code>def</code> 用熟就够了；等以后写排序、回调时再回来看也不迟。
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
