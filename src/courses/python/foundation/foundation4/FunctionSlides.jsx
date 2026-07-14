import { useState } from 'react';
import { Box, Sparkles, BookOpen, AlertCircle, Play } from 'lucide-react';
import { PredictCheck, SlideHeader, TransferCheck } from '../../shell/PythonLessonShell';
import { Button, CodeBlock } from './Shared';

export const FunctionSlide = () => {
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

            <PredictCheck
                title="先预测：print 还是 return"
                prompt="def add(a, b): print(a + b)，然后 x = add(2, 3)，x 是多少？"
                options={['5', 'None']}
                correctIndex={1}
                explanation="add 只 print 不 return，函数默认返回 None，所以 x = None。想拿到结果给后面用，必须写 return a + b。"
                misconception="以为屏幕上 print 出来的值，就是函数交回的返回值。"
            />

            <TransferCheck
                prompt={'换个例子：def double(x): return x * 2。主程序 y = double(5)，y 是多少？若把 return 换成 print(x*2)，y 又会是什么？'}
                hint="return 把值交回给调用者；print 只是显示，函数默认返回 None。"
                answer="用 return 时 y=10；改成 print 时 y=None（值没交回）。"
                steps={[
                    'double(5) 里 return 5*2=10，把 10 交回 → y = 10。',
                    '若改成 print(x*2)：屏幕显示 10，但函数没 return，默认返回 None。',
                    '于是 y = None——print 出来的 ≠ 交回的返回值。',
                ]}
            />
        </div>
    );
};

export const ScopeSlide = () => {
    const [varLocation, setVarLocation] = useState('global'); // 'global' or 'local'

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="indigo" icon={Box} title="作用域 (Scope)：谁能看见我？">
                <strong>变量</strong>是有“地盘”的。
                    <strong>Global (全局)</strong> 就像在大街上，谁都能看见。
                    <strong>Local (局部)</strong> 就像在你的卧室里，只有屋里人（函数内部）能看见。
            </SlideHeader>

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
