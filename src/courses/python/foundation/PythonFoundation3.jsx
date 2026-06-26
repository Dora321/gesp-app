import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, List, Box, Key, Search, ArrowRight, RefreshCw, Plus, Trash2, Edit3, Menu, X, Grid3x3, BookOpen, CheckCircle } from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PyCodeTracer from '../../../components/PyCodeTracer';
import PythonLessonShell, { MasteryCheck, PredictCheck, SlideHeader, TransferCheck } from '../shell/PythonLessonShell';

// --- Shared Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-teal-600 border-2 border-teal-100 hover:border-teal-200 hover:bg-teal-50",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-md",
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

const listIndexCode = `items = ["剑", "药水", "地图"]
first = items[0]
last = items[-1]
count = len(items)
# items[3] 会 IndexError`;

const listIndexSteps = [
    {
        active: [0],
        vars: { index: '-', value: '-', count: '-' },
        action: '读取第 1 个',
    },
    {
        active: [1],
        vars: { index: 0, value: '剑', count: '-' },
        row: ['items[0]', '0', '剑', '正向索引从 0 开始，第 1 个元素'],
        action: '读取最后一个',
    },
    {
        active: [2],
        vars: { index: -1, value: '地图', count: '-' },
        row: ['items[-1]', '-1', '地图', '负数索引从右往左数，-1 是最后一个'],
        action: '计算长度',
    },
    {
        active: [3],
        vars: { index: 'len', value: '-', count: 3 },
        row: ['len(items)', '-', 3, '长度是 3，合法正向下标只有 0、1、2'],
        action: '检查越界',
    },
    {
        active: [4],
        vars: { index: 3, value: '越界', count: 3 },
        exit: '准备访问 items[3] 会触发 IndexError：长度为 3 的列表，最后一个合法正向下标是 2。',
        action: '显示结果',
    },
    {
        active: [1, 2, 3],
        vars: { index: '0/-1', value: '剑 / 地图', count: 3 },
        output: 'first = 剑, last = 地图, len = 3',
    },
];

const ListIndexTraceCard = () => (
    <PyCodeTracer
        title="列表下标追踪器：从 0 开始，越界会报错"
        code={listIndexCode}
        varOrder={['index', 'value', 'count']}
        columns={['表达式', '下标', '结果', '说明']}
        steps={listIndexSteps}
        hint="先确认合法范围，再访问列表；下标不是第几个学生，而是从 0 开始的位置编号。"
    />
);

const listFocusModes = [
    {
        id: 'read',
        label: '1 先读下标',
        title: '先确认访问的是谁',
        task: '用 index(x)、count(x)、x in list 验证一个元素是否存在，再说出它的位置。',
        check: '能解释 items[0]、items[-1] 和 items[3] 的不同结果。',
    },
    {
        id: 'modify',
        label: '2 再改背包',
        title: '一次只改一个地方',
        task: '先 append 一个新物品，再 pop 或 remove 一个物品，观察背包状态如何变化。',
        check: '能说清 append、insert、pop、remove 分别改变了列表的哪里。',
    },
    {
        id: 'loop',
        label: '3 最后遍历',
        title: '把列表从头到尾处理一遍',
        task: '用 for item 和 enumerate 各走一遍列表，再调整切片范围看高亮变化。',
        check: '能区分“元素值 item”和“位置 index”，并知道切片左闭右开。',
    },
];

const ListFocusGuide = ({ focusMode, onChange }) => {
    const current = listFocusModes.find((mode) => mode.id === focusMode) || listFocusModes[0];

    return (
        <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm" aria-label="列表学习阶段">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-black uppercase tracking-wider text-teal-700">练习顺序</div>
                    <h3 className="mt-1 text-xl font-black text-slate-900">别一次打开所有工具，按三步走</h3>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-500">
                    每次只盯一个概念，做完再切到下一组。
                </p>
            </div>

            <div className="grid gap-2 md:grid-cols-3">
                {listFocusModes.map((mode) => {
                    const active = focusMode === mode.id;
                    return (
                        <button
                            key={mode.id}
                            type="button"
                            onClick={() => onChange(mode.id)}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-black transition ${
                                active
                                    ? 'border-teal-500 bg-teal-600 text-white shadow-md'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-200 hover:bg-teal-50'
                            }`}
                            aria-pressed={active}
                        >
                            {mode.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-black text-teal-900">
                    <CheckCircle size={16} />
                    {current.title}
                </div>
                <p className="text-sm font-bold leading-relaxed text-slate-700">{current.task}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">过关信号：{current.check}</p>
            </div>
        </section>
    );
};

const dictAccessCode = `profile = {"name": "Hero", "level": 1}
name = profile["name"]
job = profile.get("job", "未设置")
profile["job"]`;

const dictAccessSteps = [
    {
        active: [0],
        vars: { key: '-', value: '-', result: '-' },
        action: '读取 name',
    },
    {
        active: [1],
        vars: { key: 'name', value: 'Hero', result: '成功' },
        row: ['profile["name"]', 'name', 'Hero', '键存在，直接访问成功'],
        action: '用 get 读取 job',
    },
    {
        active: [2],
        vars: { key: 'job', value: '未设置', result: '默认值' },
        row: ['profile.get("job", "未设置")', 'job', '未设置', '键不存在，但 get 返回默认值'],
        action: '直接访问 job',
    },
    {
        active: [3],
        vars: { key: 'job', value: 'KeyError', result: '报错' },
        exit: 'profile["job"] 会触发 KeyError：字典里没有这个键，直接访问不会自动给默认值。',
        action: '显示结论',
    },
    {
        active: [1, 2, 3],
        vars: { key: 'name/job', value: 'Hero / 未设置', result: '先判断' },
        output: '先用 key in dict 或 get(default) 兜底，再决定是否直接访问 dict[key]。',
    },
];

const DictAccessTraceCard = () => (
    <PyCodeTracer
        title="字典访问追踪器：键不存在时，dict[key] 会报错"
        code={dictAccessCode}
        varOrder={['key', 'value', 'result']}
        columns={['表达式', '键', '结果', '说明']}
        steps={dictAccessSteps}
        hint="字典不是按第几个找，而是按 key 找；先问“有没有这个标签”，再打开柜子。"
    />
);

// 1. Lists - The Backpack
const ListSlide = () => {
    const [inventory, setInventory] = useState(['剑', '药水', '地图', '火把', '钥匙']);
    const [newItem, setNewItem] = useState('');
    const [sliceStart, setSliceStart] = useState(0);
    const [sliceEnd, setSliceEnd] = useState(3);
    const [insertIndex, setInsertIndex] = useState(0);
    const [insertItem, setInsertItem] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [consoleOutput, setConsoleOutput] = useState(null);

    // 遍历相关状态
    const [iterateIndex, setIterateIndex] = useState(-1);
    const [iterateMode, setIterateMode] = useState('for'); // 'for' or 'enumerate'
    const [isIterating, setIsIterating] = useState(false);
    const [focusMode, setFocusMode] = useState('read');

    // CREATE: append() - 在末尾添加
    const addItem = () => {
        if (!newItem.trim()) return;
        setInventory([...inventory, newItem]);
        setNewItem('');
        setConsoleOutput(`append('${newItem}') → 已添加到末尾`);
    };

    // CREATE: insert(index, item) - 在指定位置插入
    const insertItemAt = () => {
        if (!insertItem.trim()) return;
        const newList = [...inventory];
        newList.splice(insertIndex, 0, insertItem);
        setInventory(newList);
        setConsoleOutput(`insert(${insertIndex}, '${insertItem}') → 已插入到索引 ${insertIndex}`);
        setInsertItem('');
    };

    // DELETE: 按索引删除
    const removeItem = (index) => {
        const removed = inventory[index];
        setInventory(inventory.filter((_, i) => i !== index));
        setConsoleOutput(`del list[${index}] → 已删除 '${removed}'`);
    };

    // DELETE: pop() - 移除并返回最后一个元素
    const popItem = () => {
        if (inventory.length === 0) return;
        const popped = inventory[inventory.length - 1];
        setInventory(prev => prev.slice(0, -1));
        setConsoleOutput(`pop() → 返回 '${popped}'`);
    };

    // DELETE: remove(value) - 删除第一个匹配的值
    const removeByValue = () => {
        if (!searchItem.trim()) return;
        const idx = inventory.indexOf(searchItem);
        if (idx !== -1) {
            setInventory(inventory.filter((_, i) => i !== idx));
            setConsoleOutput(`remove('${searchItem}') → 已删除索引 ${idx} 处的元素`);
        } else {
            setConsoleOutput(`remove('${searchItem}') → ValueError: 元素不存在`);
        }
    };

    // READ: index(value) - 查找元素索引
    const findIndex = () => {
        if (!searchItem.trim()) return;
        const idx = inventory.indexOf(searchItem);
        if (idx !== -1) {
            setConsoleOutput(`index('${searchItem}') → ${idx}`);
        } else {
            setConsoleOutput(`index('${searchItem}') → ValueError: 元素不存在`);
        }
    };

    // READ: count(value) - 计算元素出现次数
    const countItem = () => {
        if (!searchItem.trim()) return;
        const count = inventory.filter(item => item === searchItem).length;
        setConsoleOutput(`count('${searchItem}') → ${count}`);
    };

    // READ: in 运算符 - 检查元素是否存在
    const checkIn = () => {
        if (!searchItem.trim()) return;
        const exists = inventory.includes(searchItem);
        setConsoleOutput(`'${searchItem}' in list → ${exists ? 'True' : 'False'}`);
    };

    // UPDATE: sort()
    const sortItems = () => {
        setInventory(prev => [...prev].sort());
        setConsoleOutput(`sort() → 已按字母排序`);
    };

    // UPDATE: reverse()
    const reverseItems = () => {
        setInventory(prev => [...prev].reverse());
        setConsoleOutput(`reverse() → 已反转列表`);
    };

    // DELETE: clear() - 清空列表
    const clearList = () => {
        setInventory([]);
        setConsoleOutput(`clear() → 列表已清空`);
    };

    // ITERATE: 遍历功能
    const startIteration = () => {
        setIterateIndex(0);
        setIsIterating(true);
        if (inventory.length > 0) {
            if (iterateMode === 'for') {
                setConsoleOutput(`for item in list:\n  第 0 个元素: '${inventory[0]}'`);
            } else {
                setConsoleOutput(`for index, item in enumerate(list):\n  (0, '${inventory[0]}')`);
            }
        }
    };

    const nextIteration = () => {
        if (iterateIndex < inventory.length - 1) {
            const nextIdx = iterateIndex + 1;
            setIterateIndex(nextIdx);
            if (iterateMode === 'for') {
                setConsoleOutput(`for item in list:\n  第 ${nextIdx} 个元素: '${inventory[nextIdx]}'`);
            } else {
                setConsoleOutput(`for index, item in enumerate(list):\n  (${nextIdx}, '${inventory[nextIdx]}')`);
            }
        } else {
            setIsIterating(false);
            setConsoleOutput(`遍历完成！共 ${inventory.length} 个元素`);
        }
    };

    const resetIteration = () => {
        setIterateIndex(-1);
        setIsIterating(false);
        setConsoleOutput(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Intro Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-200 shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="p-2 bg-teal-600 rounded-xl">
                        <List className="text-white" size={24} />
                    </div>
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        列表 (List)：万能背包
                    </span>
                </h2>
                <p className="text-teal-900">
                    <strong>List</strong> 就像一个有顺序的超级背包。你可以给背包里的东西编号（索引），
                    也可以随时操作它——添加、删除、排序、甚至把背包切成两半！
                </p>
            </div>

            <ListIndexTraceCard />
            <ListFocusGuide
                focusMode={focusMode}
                onChange={(mode) => {
                    setFocusMode(mode);
                    if (mode !== 'loop') resetIteration();
                }}
            />

            {/* Playground */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Operations Panel */}
                <div className="space-y-6">
                    {/* CREATE 增 */}
                    {focusMode === 'modify' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                                <Plus size={20} className="text-green-600" /> 增 (Create)
                            </h3>

                            {/* append() */}
                            <div className="flex gap-2 mb-4">
                                <input
                                    value={newItem}
                                    onChange={e => setNewItem(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addItem()}
                                    placeholder="新物品..."
                                    className="flex-1 border-2 border-green-200 rounded-lg px-3 py-2 focus:border-green-500 outline-none transition-colors"
                                />
                                <Button onClick={addItem} disabled={!newItem} className="bg-green-600 hover:bg-green-700">append()</Button>
                            </div>

                            {/* insert() */}
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={insertIndex}
                                    onChange={e => setInsertIndex(Number(e.target.value))}
                                    className="w-16 border-2 border-green-200 rounded-lg px-2 py-2 text-center focus:border-green-500 outline-none"
                                    min={0}
                                    max={inventory.length}
                                />
                                <input
                                    value={insertItem}
                                    onChange={e => setInsertItem(e.target.value)}
                                    placeholder="插入物品..."
                                    className="flex-1 border-2 border-green-200 rounded-lg px-3 py-2 focus:border-green-500 outline-none"
                                />
                                <Button onClick={insertItemAt} disabled={!insertItem} variant="secondary" className="border-green-300 text-green-700 hover:bg-green-100">
                                    insert(i, x)
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* READ 查 */}
                    {focusMode === 'read' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                            <h3 className="font-bold text-blue-700 mb-4 flex items-center gap-2">
                                <Search size={20} className="text-blue-600" /> 查 (Read)
                            </h3>
                            <div className="flex gap-2 mb-3">
                                <input
                                    value={searchItem}
                                    onChange={e => setSearchItem(e.target.value)}
                                    placeholder="查找物品..."
                                    className="flex-1 border-2 border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="secondary" onClick={findIndex} disabled={!searchItem} className="border-blue-200 text-blue-700 hover:bg-blue-100 text-xs">
                                    index(x)
                                </Button>
                                <Button variant="secondary" onClick={countItem} disabled={!searchItem} className="border-blue-200 text-blue-700 hover:bg-blue-100 text-xs">
                                    count(x)
                                </Button>
                                <Button variant="secondary" onClick={checkIn} disabled={!searchItem} className="border-blue-200 text-blue-700 hover:bg-blue-100 text-xs">
                                    x in list
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* UPDATE 改 */}
                    {focusMode === 'modify' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                            <h3 className="font-bold text-amber-700 mb-4 flex items-center gap-2">
                                <RefreshCw size={20} className="text-amber-600" /> 改 (Update)
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="secondary" onClick={sortItems} disabled={inventory.length < 2} className="border-amber-200 text-amber-700 hover:bg-amber-100">
                                    sort()
                                </Button>
                                <Button variant="secondary" onClick={reverseItems} disabled={inventory.length < 2} className="border-amber-200 text-amber-700 hover:bg-amber-100">
                                    reverse()
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* DELETE 删 */}
                    {focusMode === 'modify' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
                            <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                                <Trash2 size={20} className="text-red-600" /> 删 (Delete)
                            </h3>
                            <input
                                value={searchItem}
                                onChange={e => setSearchItem(e.target.value)}
                                placeholder="remove(x) 要删除的物品..."
                                className="mb-3 w-full border-2 border-red-200 rounded-lg px-3 py-2 focus:border-red-500 outline-none"
                            />
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="danger" onClick={popItem} disabled={inventory.length === 0} className="text-xs">
                                    pop()
                                </Button>
                                <Button variant="secondary" onClick={removeByValue} disabled={!searchItem} className="border-red-200 text-red-700 hover:bg-red-100 text-xs">
                                    remove(x)
                                </Button>
                                <Button variant="danger" onClick={clearList} disabled={inventory.length === 0} className="text-xs">
                                    clear()
                                </Button>
                            </div>
                            <p className="text-xs text-red-400 mt-2">remove(x) 删除第一个匹配的值；按右侧垃圾桶是按下标删除。</p>
                        </div>
                    )}

                    {/* ITERATE 遍历 */}
                    {focusMode === 'loop' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-violet-500"></div>
                            <h3 className="font-bold text-purple-700 mb-4 flex items-center gap-2">
                                <ArrowRight size={20} className="text-purple-600" /> 遍历 (Iterate)
                            </h3>

                            {/* Mode Selection */}
                            <div className="flex gap-2 mb-3">
                                <button
                                    onClick={() => { setIterateMode('for'); resetIteration(); }}
                                    className={`flex-1 py-2 rounded text-xs font-mono transition-colors ${iterateMode === 'for'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                        }`}
                                >
                                    for item in list
                                </button>
                                <button
                                    onClick={() => { setIterateMode('enumerate'); resetIteration(); }}
                                    className={`flex-1 py-2 rounded text-xs font-mono transition-colors ${iterateMode === 'enumerate'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                        }`}
                                >
                                    enumerate(list)
                                </button>
                            </div>

                            {/* Controls */}
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    onClick={startIteration}
                                    disabled={inventory.length === 0 || isIterating}
                                    variant="secondary"
                                    className="border-purple-200 text-purple-700 hover:bg-purple-100 text-xs"
                                >
                                    开始
                                </Button>
                                <Button
                                    onClick={nextIteration}
                                    disabled={!isIterating}
                                    variant="secondary"
                                    className="border-purple-200 text-purple-700 hover:bg-purple-100 text-xs"
                                >
                                    下一个
                                </Button>
                                <Button
                                    onClick={resetIteration}
                                    disabled={iterateIndex === -1}
                                    variant="secondary"
                                    className="border-purple-200 text-purple-700 hover:bg-purple-100 text-xs"
                                >
                                    重置
                                </Button>
                            </div>
                            <p className="text-xs text-purple-500 mt-2">点击“开始”逐步遍历列表。</p>
                        </div>
                    )}

                    {/* Console Output */}
                    <div className="bg-slate-800 p-4 rounded-xl text-green-400 font-mono text-sm min-h-[3em] flex items-center border border-slate-700">
                        {consoleOutput ? (
                            <span className="animate-in fade-in slide-in-from-left-2">&gt; {consoleOutput}</span>
                        ) : (
                            <span className="text-slate-500">&gt; 执行操作查看结果...</span>
                        )}
                    </div>

                    {/* Slicing Controls */}
                    {focusMode === 'loop' && (
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-700 mb-4 flex items-center gap-2">
                                <Search size={18} /> 切片 (Slicing) 预览
                            </h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-indigo-400 uppercase">Start</label>
                                    <input
                                        type="number"
                                        value={sliceStart}
                                        onChange={e => setSliceStart(Number(e.target.value))}
                                        className="w-16 p-2 rounded border border-indigo-200 font-mono text-center"
                                    />
                                </div>
                                <span className="text-2xl text-indigo-300">:</span>
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-indigo-400 uppercase">End</label>
                                    <input
                                        type="number"
                                        value={sliceEnd}
                                        onChange={e => setSliceEnd(Number(e.target.value))}
                                        className="w-16 p-2 rounded border border-indigo-200 font-mono text-center"
                                    />
                                </div>
                            </div>
                            <div className="font-mono text-sm bg-indigo-900 text-indigo-100 p-3 rounded-lg">
                                backpack[{sliceStart}:{sliceEnd}]
                                <span className="text-indigo-400"> // 结果见右侧高亮</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Visual View */}
                <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 flex flex-col">
                    <h3 className="font-bold text-slate-700 mb-4 flex justify-between items-end">
                        <span>背包状态</span>
                        <span className="text-xs font-normal text-slate-400">Tips: 正数索引从0开始，负数从-1开始</span>
                    </h3>

                    <div className="space-y-2 flex-1 overflow-auto max-h-[500px] pr-2">
                        {inventory.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-xl p-8">
                                <Trash2 size={48} className="mb-2 opacity-50" />
                                <p>背包空空如也...</p>
                            </div>
                        )}
                        {inventory.map((item, idx) => {
                            // Check if item is currently being iterated
                            const isIteratingThis = focusMode === 'loop' && idx === iterateIndex;

                            // Check if item is in current slice range
                            const len = inventory.length;
                            let start = sliceStart < 0 ? len + sliceStart : sliceStart;
                            let end = sliceEnd < 0 ? len + sliceEnd : sliceEnd;
                            const isSliced = focusMode === 'loop' && idx >= start && idx < end;

                            // Priority: iterating > sliced > normal
                            let colorClass = 'bg-white border-transparent text-slate-700 shadow-sm hover:border-slate-300';
                            if (isIteratingThis) {
                                colorClass = 'bg-purple-600 border-purple-600 text-white shadow-lg scale-105 z-10 ring-2 ring-purple-300';
                            } else if (isSliced) {
                                colorClass = 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105 z-10';
                            }

                            return (
                                <div
                                    key={idx}
                                    className={`relative flex items-center justify-between p-3 rounded-xl transition-all border-2 ${colorClass}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center w-8">
                                            <span className={`text-xs font-mono font-bold ${isIteratingThis ? 'text-purple-200' : isSliced ? 'text-indigo-200' : 'text-slate-400'
                                                }`}>
                                                {idx}
                                            </span>
                                            <span className={`text-[10px] font-mono ${isIteratingThis ? 'text-purple-300' : isSliced ? 'text-indigo-300' : 'text-slate-300'
                                                }`}>
                                                {idx - len}
                                            </span>
                                        </div>
                                        <span className="font-bold text-lg">{item}</span>
                                    </div>

                                    <button
                                        onClick={() => removeItem(idx)}
                                        className={`p-2 rounded-lg transition-colors ${isIteratingThis
                                            ? 'hover:bg-purple-500 text-purple-200'
                                            : isSliced
                                                ? 'hover:bg-indigo-500 text-indigo-200'
                                                : 'hover:bg-red-50 text-slate-300 hover:text-red-500'
                                            }`}
                                        title="del item"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <PredictCheck
                title="先预测：下标越界"
                prompt="nums = [10, 20, 30]，访问 nums[3] 会怎样？"
                options={['返回 30', '报错 IndexError']}
                correctIndex={1}
                explanation="列表有 3 个元素，下标只能是 0、1、2。nums[3] 越界，Python 直接报 IndexError。最后一个是 nums[2]，也可以写 nums[-1]。"
                misconception="把元素个数（3）当成最后一个合法下标。"
            />

            <TransferCheck
                prompt={'换个例子：scores = [88, 92, 75, 60]。要取「第一个」和「最后一个」分数，分别写下标；再用一行求出总人数。访问 scores[4] 会怎样？'}
                hint="下标从 0 开始，最后一个可以用 -1 或 len(列表)-1；元素个数用 len()。"
                answer={'第一个 scores[0]=88，最后一个 scores[-1]（或 scores[3]）=60；总人数 len(scores)=4；scores[4] 报 IndexError。'}
                steps={[
                    '第一个永远是 scores[0]=88。',
                    '最后一个用 scores[-1] 最稳，等于 scores[4-1]=scores[3]=60。',
                    '元素个数用 len(scores)=4。',
                    '合法下标只有 0~3，scores[4] 越界 → IndexError。',
                ]}
            />
        </div>
    );
};

// 2. Dictionaries - The Locker
const DictSlide = () => {
    const [profile, setProfile] = useState({
        name: "Hero",
        level: 1,
        job: "Warrior"
    });
    const [newKey, setNewKey] = useState("");
    const [newVal, setNewVal] = useState("");
    const [checkKey, setCheckKey] = useState("");
    const [defaultVal, setDefaultVal] = useState("");
    const [methodOutput, setMethodOutput] = useState(null);


    // CREATE/UPDATE: dict[key] = value
    const updateDict = () => {
        if (!newKey.trim()) return;
        const isNew = !(newKey in profile);
        setProfile(prev => ({ ...prev, [newKey]: isNaN(newVal) || newVal === '' ? newVal : Number(newVal) }));
        setMethodOutput(`dict['${newKey}'] = ${isNaN(newVal) || newVal === '' ? `'${newVal}'` : newVal} → ${isNew ? '新增键值对' : '更新已有键'}`);
        setNewKey("");
        setNewVal("");
    };

    // CREATE: setdefault(key, default)
    const setDefault = () => {
        if (!checkKey.trim()) return;
        if (checkKey in profile) {
            setMethodOutput(`setdefault('${checkKey}', '${defaultVal}') → 键已存在，返回 ${typeof profile[checkKey] === 'string' ? `'${profile[checkKey]}'` : profile[checkKey]}`);
        } else {
            setProfile(prev => ({ ...prev, [checkKey]: defaultVal }));
            setMethodOutput(`setdefault('${checkKey}', '${defaultVal}') → 键不存在，设置默认值并返回 '${defaultVal}'`);
        }
    };

    // READ: get(key, default)
    const getWithDefault = () => {
        if (!checkKey.trim()) return;
        const val = profile[checkKey];
        if (val !== undefined) {
            setMethodOutput(`get('${checkKey}') → ${typeof val === 'string' ? `'${val}'` : val}`);
        } else {
            setMethodOutput(`get('${checkKey}', '${defaultVal || 'None'}') → 键不存在，返回默认值 '${defaultVal || 'None'}'`);
        }
    };

    // READ: 直接访问 dict[key]
    const accessKey = () => {
        if (!checkKey.trim()) return;
        const val = profile[checkKey];
        if (val !== undefined) {
            setMethodOutput(`dict['${checkKey}'] → ${typeof val === 'string' ? `'${val}'` : val}`);
        } else {
            setMethodOutput(`dict['${checkKey}'] → KeyError: 键不存在！`);
        }
    };

    // READ: in 运算符
    const checkExistence = () => {
        if (!checkKey.trim()) return;
        setMethodOutput(`'${checkKey}' in dict → ${checkKey in profile ? 'True' : 'False'}`);
    };

    // DELETE: del dict[key]
    const deleteKey = (key) => {
        const val = profile[key];
        const next = { ...profile };
        delete next[key];
        setProfile(next);
        setMethodOutput(`del dict['${key}'] → 已删除 ('${key}': ${typeof val === 'string' ? `'${val}'` : val})`);
    };

    // DELETE: pop(key)
    const popKey = () => {
        if (!checkKey.trim()) return;
        if (checkKey in profile) {
            const val = profile[checkKey];
            const next = { ...profile };
            delete next[checkKey];
            setProfile(next);
            setMethodOutput(`pop('${checkKey}') → 删除并返回 ${typeof val === 'string' ? `'${val}'` : val}`);
        } else {
            setMethodOutput(`pop('${checkKey}') → KeyError: 键不存在`);
        }
    };

    // DELETE: clear()
    const clearDict = () => {
        setProfile({});
        setMethodOutput(`clear() → 字典已清空`);
    };

    // READ: keys(), values(), items()
    const runMethod = (method) => {
        if (method === 'keys') {
            setMethodOutput(`dict.keys() → [${Object.keys(profile).map(k => `'${k}'`).join(', ')}]`);
        } else if (method === 'values') {
            setMethodOutput(`dict.values() → [${Object.values(profile).map(v => typeof v === 'string' ? `'${v}'` : v).join(', ')}]`);
        } else if (method === 'items') {
            setMethodOutput(`dict.items() → [${Object.entries(profile).map(([k, v]) => `('${k}', ${typeof v === 'string' ? `'${v}'` : v})`).join(', ')}]`);
        }
    };


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="p-2 bg-orange-600 rounded-xl">
                        <Key className="text-white" size={24} />
                    </div>
                    <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        字典 (Dictionary)：带标签的柜子
                    </span>
                </h2>
                <p className="text-orange-900">
                    <strong>Dictionary</strong> 就像一排储物柜，每个柜子都有一个唯一的标签（Key）。
                    你不需要知道柜子是第几个，只要喊出标签名，就能找到里面的东西（Value）。
                </p>
            </div>

            <DictAccessTraceCard />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Cards */}
                <div className="order-2 lg:order-1 bg-slate-100 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-4 flex justify-between items-center">
                        <span>当前字典内容</span>
                        <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600 font-mono">
                            len(dict): {Object.keys(profile).length}
                        </span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        {Object.entries(profile).map(([key, val]) => (
                            <div key={key} className="bg-white rounded-xl p-4 shadow-lg border-b-4 border-orange-500 relative group overflow-hidden transition-all hover:-translate-y-1">
                                <div className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider flex justify-between">
                                    {key}
                                    <button
                                        onClick={() => deleteKey(key)}
                                        className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="text-xl font-bold text-slate-800 break-words">
                                    {val}
                                </div>
                                <div className="absolute top-0 right-0 p-1 bg-slate-50 rounded-bl-lg">
                                    <Key size={12} className="text-slate-300" />
                                </div>
                            </div>
                        ))}
                        {Object.keys(profile).length === 0 && (
                            <div className="col-span-2 py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                字典为空 (Empty Dict)
                            </div>
                        )}
                    </div>
                </div>

                {/* Operations */}
                <div className="order-1 lg:order-2 space-y-4">
                    {/* CREATE/UPDATE 增/改 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                        <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2 text-sm">
                            <Plus size={18} className="text-green-600" /> 增/改 (Create/Update)
                        </h3>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={newKey}
                                onChange={e => setNewKey(e.target.value)}
                                placeholder="Key"
                                className="w-1/3 border-2 border-green-200 rounded-lg px-3 py-2 focus:border-green-500 outline-none font-mono text-sm"
                            />
                            <input
                                value={newVal}
                                onChange={e => setNewVal(e.target.value)}
                                placeholder="Value"
                                className="flex-1 border-2 border-green-200 rounded-lg px-3 py-2 focus:border-green-500 outline-none"
                            />
                        </div>
                        <Button
                            onClick={updateDict}
                            disabled={!newKey}
                            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                        >
                            dict['{newKey || 'key'}'] = {newVal || 'value'}
                        </Button>
                    </div>

                    {/* READ 查 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                        <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2 text-sm">
                            <Search size={18} className="text-blue-600" /> 查 (Read)
                        </h3>
                        <div className="flex gap-2 mb-3">
                            <input
                                value={checkKey}
                                onChange={e => setCheckKey(e.target.value)}
                                placeholder="Key..."
                                className="flex-1 border-2 border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 outline-none font-mono text-sm"
                            />
                            <input
                                value={defaultVal}
                                onChange={e => setDefaultVal(e.target.value)}
                                placeholder="默认值"
                                className="w-24 border-2 border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            <button onClick={accessKey} disabled={!checkKey} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">dict[key]</button>
                            <button onClick={getWithDefault} disabled={!checkKey} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">get(key)</button>
                            <button onClick={checkExistence} disabled={!checkKey} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">key in dict</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => runMethod('keys')} className="bg-blue-600 hover:bg-blue-500 py-2 rounded text-xs font-mono text-white transition-colors">.keys()</button>
                            <button onClick={() => runMethod('values')} className="bg-blue-600 hover:bg-blue-500 py-2 rounded text-xs font-mono text-white transition-colors">.values()</button>
                            <button onClick={() => runMethod('items')} className="bg-blue-600 hover:bg-blue-500 py-2 rounded text-xs font-mono text-white transition-colors">.items()</button>
                        </div>
                    </div>

                    {/* UPDATE (setdefault) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                        <h3 className="font-bold text-amber-700 mb-3 flex items-center gap-2 text-sm">
                            <RefreshCw size={18} className="text-amber-600" /> 设置默认值
                        </h3>
                        <Button
                            onClick={setDefault}
                            disabled={!checkKey}
                            variant="secondary"
                            className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 text-sm"
                        >
                            setdefault('{checkKey || 'key'}', '{defaultVal || 'default'}')
                        </Button>
                        <p className="text-xs text-amber-500 mt-2">* 使用上方查找框中的键和默认值</p>
                    </div>

                    {/* DELETE 删 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 p-5 rounded-2xl border border-red-200 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
                        <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2 text-sm">
                            <Trash2 size={18} className="text-red-600" /> 删 (Delete)
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                onClick={popKey}
                                disabled={!checkKey}
                                variant="danger"
                                className="text-xs"
                            >
                                pop('{checkKey || 'key'}')
                            </Button>
                            <Button
                                onClick={clearDict}
                                disabled={Object.keys(profile).length === 0}
                                variant="danger"
                                className="text-xs"
                            >
                                clear()
                            </Button>
                        </div>
                        <p className="text-xs text-red-400 mt-2">* pop() 使用查找框中的键 | 点击卡片也可删除</p>
                    </div>

                    {/* Console Output */}
                    <div className="bg-slate-800 p-4 rounded-xl text-green-400 font-mono text-sm min-h-[3em] flex items-center border border-slate-700">
                        {methodOutput ? (
                            <span className="animate-in fade-in slide-in-from-left-2">&gt; {methodOutput}</span>
                        ) : (
                            <span className="text-slate-500">&gt; 执行操作查看结果...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const stringTraceCode = `text = "Python"
part = text[1:4]
lower = text.lower()
changed = text.replace("P", "M")
# text 仍然是 "Python"`;

const stringTraceSteps = [
    {
        active: [0],
        vars: { start: '-', end: '-', result: '-' },
        action: '截取 1:4',
    },
    {
        active: [1],
        vars: { start: 1, end: 4, result: 'yth' },
        row: ['text[1:4]', '取 1、2、3', 'yth', '左边包含，右边不包含'],
        action: '转成小写',
    },
    {
        active: [2],
        vars: { start: '-', end: '-', result: 'python' },
        row: ['text.lower()', '全部字符', 'python', '生成一个新字符串'],
        action: '替换字符',
    },
    {
        active: [3],
        vars: { start: '-', end: '-', result: 'Mython' },
        row: ['text.replace("P", "M")', 'P -> M', 'Mython', '仍然是生成新字符串'],
        action: '检查原文本',
    },
    {
        active: [4],
        vars: { start: '-', end: '-', result: 'Python' },
        exit: '字符串不可变：lower() 和 replace() 不会原地修改 text，除非写成 text = text.replace(...)。',
        action: '显示结论',
    },
    {
        active: [1, 2, 3, 4],
        vars: { start: 1, end: 4, result: '新值要重新赋值' },
        output: '切片是左闭右开；字符串方法通常返回新字符串。',
    },
];

const StringTraceCard = () => (
    <PyCodeTracer
        title="字符串追踪器：切片左闭右开，变形会产生新字符串"
        code={stringTraceCode}
        varOrder={['start', 'end', 'result']}
        columns={['表达式', '范围', '结果', '说明']}
        steps={stringTraceSteps}
        hint="字符串像一排固定字符，可以读、切、生成新结果；想保存新结果，要重新赋值。"
    />
);

const stringFocusModes = [
    {
        id: 'slice',
        label: '1 先切片',
        title: '先看位置范围',
        task: '调 start/end，看 text[start:end] 取哪些字符。',
        check: '能说清右边界 end 不会被包含。',
    },
    {
        id: 'search',
        label: '2 再查找',
        title: '再判断有没有',
        task: '用 find、count、startswith、endswith 验证一段文字。',
        check: '能解释 find 找不到时为什么返回 -1。',
    },
    {
        id: 'transform',
        label: '3 再变形',
        title: '变形不是原地修改',
        task: '试 strip 和 replace，观察当前文本什么时候真的变化。',
        check: '能说清字符串方法通常返回新字符串。',
    },
    {
        id: 'split',
        label: '4 最后拆合',
        title: '把一段文字变成列表',
        task: '用 split 拆开，再用 join 合回去。',
        check: '能区分字符串和字符串列表。',
    },
];

const StringFocusGuide = ({ focusMode, onChange }) => {
    const current = stringFocusModes.find((mode) => mode.id === focusMode) || stringFocusModes[0];

    return (
        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm" aria-label="字符串学习阶段">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-black uppercase tracking-wider text-blue-700">练习顺序</div>
                    <h3 className="mt-1 text-xl font-black text-slate-900">字符串按“位置、查找、变形、拆合”走</h3>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-500">
                    每次只打开一组工具，先理解规则，再做操作。
                </p>
            </div>

            <div className="grid gap-2 md:grid-cols-4">
                {stringFocusModes.map((mode) => {
                    const active = focusMode === mode.id;
                    return (
                        <button
                            key={mode.id}
                            type="button"
                            onClick={() => onChange(mode.id)}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-black transition ${
                                active
                                    ? 'border-blue-500 bg-blue-600 text-white shadow-md'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50'
                            }`}
                            aria-pressed={active}
                        >
                            {mode.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-black text-blue-900">
                    <CheckCircle size={16} />
                    {current.title}
                </div>
                <p className="text-sm font-bold leading-relaxed text-slate-700">{current.task}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">过关信号：{current.check}</p>
            </div>

            <PredictCheck
                title="先预测：访问不存在的键"
                prompt={'d = {"a": 1}，访问 d["b"] 会怎样？'}
                options={['返回 None', '报错 KeyError']}
                correctIndex={1}
                explanation={'字典里没有 "b" 这个键，d["b"] 直接报 KeyError。想安全取用就写 d.get("b")，键不存在时返回 None。'}
                misconception="以为访问字典里不存在的键会自动返回 None。"
            />
        </section>
    );
};

// 3. String Ops
const StringSlide = () => {
    const [text, setText] = useState("  Python is Cool  ");
    const [sliceStart, setSliceStart] = useState("");
    const [sliceEnd, setSliceEnd] = useState("");
    const [searchStr, setSearchStr] = useState("");
    const [replaceFrom, setReplaceFrom] = useState("o");
    const [replaceTo, setReplaceTo] = useState("0");
    const [consoleOutput, setConsoleOutput] = useState(null);
    const [focusMode, setFocusMode] = useState('slice');

    // Split & Join State
    const [splitText, setSplitText] = useState("apple,banana,orange");
    const [delimiter, setDelimiter] = useState(",");
    const [splitResult, setSplitResult] = useState(['apple', 'banana', 'orange']);

    useEffect(() => {
        setSplitResult(splitText.split(delimiter));
    }, [splitText, delimiter]);

    // READ: find() - 查找子串位置
    const findSubstring = () => {
        if (!searchStr) return;
        const idx = text.indexOf(searchStr);
        setConsoleOutput(`find('${searchStr}') → ${idx >= 0 ? idx : -1}`);
    };

    // READ: count() - 计数子串出现次数
    const countSubstring = () => {
        if (!searchStr) return;
        const matches = text.match(new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
        const count = matches ? matches.length : 0;
        setConsoleOutput(`count('${searchStr}') → ${count}`);
    };

    // READ: startswith() - 检查开头
    const checkStartsWith = () => {
        if (!searchStr) return;
        const result = text.startsWith(searchStr);
        setConsoleOutput(`startswith('${searchStr}') → ${result ? 'True' : 'False'}`);
    };

    // READ: endswith() - 检查结尾
    const checkEndsWith = () => {
        if (!searchStr) return;
        const result = text.endsWith(searchStr);
        setConsoleOutput(`endswith('${searchStr}') → ${result ? 'True' : 'False'}`);
    };

    // UPDATE: strip() - 去除首尾空格
    const stripText = () => {
        const stripped = text.trim();
        setText(stripped);
        setConsoleOutput(`strip() → "${stripped}"`);
    };

    // UPDATE: replace() - 替换
    const replaceText = () => {
        if (!replaceFrom) return;
        const replaced = text.replace(new RegExp(replaceFrom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceTo);
        setText(replaced);
        setConsoleOutput(`replace('${replaceFrom}', '${replaceTo}') → "${replaced}"`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-xl">
                        <Edit3 className="text-white" size={24} />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        字符串 (String)：文字魔法
                    </span>
                </h2>
                <p className="text-blue-900">
                    文字不只是用来读的，还可以像拼图一样拆分、组合、变形！
                    这是处理文本数据的基本功。
                </p>
            </div>

            <StringTraceCard />
            <StringFocusGuide focusMode={focusMode} onChange={setFocusMode} />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Input & Display */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-700 mb-4">📝 当前文本</h3>
                        <input
                            value={text}
                            onChange={e => setText(e.target.value)}
                            className="w-full text-xl font-mono p-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none mb-4"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">len()</div>
                                <div className="font-bold text-slate-700">{text.length}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">.upper()</div>
                                <div className="font-bold text-slate-700 truncate" title={text.toUpperCase()}>{text.toUpperCase()}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">.lower()</div>
                                <div className="font-bold text-slate-700 truncate" title={text.toLowerCase()}>{text.toLowerCase()}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">.strip()</div>
                                <div className="font-bold text-slate-700 truncate" title={text.trim()}>{text.trim()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Slicing */}
                    {focusMode === 'slice' && (
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-700 mb-4">切片 (Slicing)</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="font-mono text-lg font-bold">text[</span>
                                <input
                                    placeholder="0"
                                    value={sliceStart}
                                    onChange={e => setSliceStart(e.target.value)}
                                    className="w-12 p-1 text-center rounded border border-indigo-200 font-mono"
                                />
                                <span className="font-mono text-lg font-bold">:</span>
                                <input
                                    placeholder="5"
                                    value={sliceEnd}
                                    onChange={e => setSliceEnd(e.target.value)}
                                    className="w-12 p-1 text-center rounded border border-indigo-200 font-mono"
                                />
                                <span className="font-mono text-lg font-bold">]</span>
                            </div>
                            <div className="bg-indigo-900 text-indigo-100 p-4 rounded-xl shadow-inner font-mono text-sm min-h-[3rem] items-center flex">
                                {(() => {
                                    try {
                                        const s = sliceStart === "" ? undefined : Number(sliceStart);
                                        const e = sliceEnd === "" ? undefined : Number(sliceEnd);
                                        if ((s !== undefined && isNaN(s)) || (e !== undefined && isNaN(e))) return "Invalid Index";
                                        return `"${text.slice(s, e)}"`;
                                    } catch { return "Error"; }
                                })()}
                            </div>
                        </div>
                    )}

                    {/* Console Output */}
                    <div className="bg-slate-800 p-4 rounded-xl text-green-400 font-mono text-sm min-h-[3em] flex items-center border border-slate-700">
                        {consoleOutput ? (
                            <span className="animate-in fade-in slide-in-from-left-2">&gt; {consoleOutput}</span>
                        ) : (
                            <span className="text-slate-500">&gt; 执行操作查看结果...</span>
                        )}
                    </div>
                </div>

                {/* Right Column - Operations */}
                <div className="space-y-4">
                    {/* READ 查询 */}
                    {focusMode === 'search' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                            <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2 text-sm">
                                <Search size={18} className="text-blue-600" /> 查 (Read)
                            </h3>
                            <input
                                value={searchStr}
                                onChange={e => setSearchStr(e.target.value)}
                                placeholder="搜索子串..."
                                className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 mb-3 focus:border-blue-500 outline-none text-sm"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={findSubstring} disabled={!searchStr} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">
                                    find()
                                </button>
                                <button onClick={countSubstring} disabled={!searchStr} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">
                                    count()
                                </button>
                                <button onClick={checkStartsWith} disabled={!searchStr} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">
                                    startswith()
                                </button>
                                <button onClick={checkEndsWith} disabled={!searchStr} className="bg-blue-100 hover:bg-blue-200 disabled:opacity-50 py-2 rounded text-xs font-mono text-blue-700 transition-colors">
                                    endswith()
                                </button>
                            </div>
                        </div>
                    )}

                    {/* UPDATE 修改 */}
                    {focusMode === 'transform' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                            <h3 className="font-bold text-amber-700 mb-3 flex items-center gap-2 text-sm">
                                <RefreshCw size={18} className="text-amber-600" /> 改 (Update)
                            </h3>

                            {/* Replace */}
                            <div className="mb-3">
                                <label className="text-xs text-amber-600 font-bold mb-1 block">replace(old, new)</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        value={replaceFrom}
                                        onChange={e => setReplaceFrom(e.target.value)}
                                        placeholder="查找"
                                        className="flex-1 border-2 border-amber-200 rounded-lg px-3 py-2 focus:border-amber-500 outline-none text-sm"
                                    />
                                    <input
                                        value={replaceTo}
                                        onChange={e => setReplaceTo(e.target.value)}
                                        placeholder="替换为"
                                        className="flex-1 border-2 border-amber-200 rounded-lg px-3 py-2 focus:border-amber-500 outline-none text-sm"
                                    />
                                </div>
                                <Button onClick={replaceText} disabled={!replaceFrom} variant="secondary" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 text-xs">
                                    执行替换
                                </Button>
                            </div>

                            {/* Strip */}
                            <div className="border-t border-amber-200 pt-3">
                                <Button onClick={stripText} variant="secondary" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 text-xs">
                                    strip() - 去除首尾空格
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Split & Join */}
                    {focusMode === 'split' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                            <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2 text-sm">
                                <RefreshCw size={18} className="text-emerald-700" /> 拆分与组合
                            </h3>

                            {/* Split Section */}
                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold text-emerald-600">.split(delimiter)</label>
                                    <input
                                        value={delimiter}
                                        onChange={e => setDelimiter(e.target.value)}
                                        placeholder=","
                                        className="w-8 h-8 text-center rounded border border-emerald-300 font-mono text-sm"
                                        maxLength={1}
                                    />
                                </div>
                                <input
                                    value={splitText}
                                    onChange={e => setSplitText(e.target.value)}
                                    className="w-full p-2 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none font-mono text-sm mb-2"
                                />
                                <div className="bg-white p-2 rounded-lg border border-emerald-200 font-mono text-xs text-emerald-800 break-all">
                                    [{splitResult.map(s => `"${s}"`).join(', ')}]
                                </div>
                            </div>

                            {/* Join Section */}
                            <div className="border-t border-emerald-200 pt-3">
                                <label className="block text-xs font-bold text-emerald-600 mb-2">delimiter.join(list)</label>
                                <div className="bg-emerald-600 text-white p-2 rounded-lg font-mono text-xs shadow-sm break-all">
                                    "{splitResult.join(delimiter)}"
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


const grid2dDemo = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const grid2dTraceCode = `grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
row = grid[1]
value = grid[1][2]`;

const grid2dTraceSteps = [
    {
        active: [0, 1, 2, 3, 4],
        vars: { row: '-', col: '-', value: '-' },
        action: '选第 1 行',
    },
    {
        active: [5],
        vars: { row: 1, col: '-', value: '[4, 5, 6]' },
        row: ['grid[1]', '第 1 行', '-', '[4, 5, 6]', '行号从 0 开始，所以第 1 行是第二行'],
        action: '选第 2 列',
    },
    {
        active: [6],
        vars: { row: 1, col: 2, value: 6 },
        row: ['grid[1][2]', '第 1 行', '第 2 列', 6, '先拿到这一行，再从这一行里取第 2 列'],
        action: '检查边界',
    },
    {
        active: [6],
        vars: { row: 1, col: 2, value: 6 },
        exit: '二维列表访问顺序固定：grid[行][列]。3x3 表格的合法行列号都是 0、1、2。',
        action: '显示结论',
    },
    {
        active: [5, 6],
        vars: { row: '0..2', col: '0..2', value: '先行后列' },
        output: 'grid[1][2] = 6；读作第 1 行、第 2 列，不是第 1 列、第 2 行。',
    },
];

const Grid2DTraceCard = () => (
    <PyCodeTracer
        title="二维列表追踪器：先选行，再选列"
        code={grid2dTraceCode}
        varOrder={['row', 'col', 'value']}
        columns={['表达式', '行', '列', '结果', '说明']}
        steps={grid2dTraceSteps}
        hint="把二维列表想成表格：外层列表选行，内层列表选列；行列都从 0 开始。"
    />
);

const Grid2DSlide = () => {
    const [pos, setPos] = useState({ r: 1, c: 2 });
    const value = grid2dDemo[pos.r][pos.c];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Grid3x3} title="二维列表：表格与棋盘">
                把列表放进列表，就得到<strong>二维列表</strong>——像一张表格或一个棋盘（2048、井字棋都用它）。用 <code>grid[行][列]</code> 取值：先选第几行，再选第几列；行、列都从 <strong>0</strong> 开始数。
            </SlideHeader>

            <Grid2DTraceCard />

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="mb-4 text-sm font-bold text-slate-500">点一个格子，看它的 [行][列] 坐标 →</p>
                    <div className="inline-grid grid-cols-3 gap-2">
                        {grid2dDemo.map((rowArr, r) =>
                            rowArr.map((v, c) => {
                                const active = pos.r === r && pos.c === c;
                                return (
                                    <button
                                        key={`${r}-${c}`}
                                        onClick={() => setPos({ r, c })}
                                        className={`flex h-16 w-16 items-center justify-center rounded-xl font-mono text-xl font-black transition-all ${active ? 'scale-105 bg-teal-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        {v}
                                    </button>
                                );
                            })
                        )}
                    </div>
                    <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-4 font-mono font-black text-teal-900">
                        grid[<span className="text-teal-600">{pos.r}</span>][<span className="text-teal-600">{pos.c}</span>] = <span className="text-2xl">{value}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <CodeBlock code={`grid = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n]\nprint(grid[${pos.r}][${pos.c}])  # 输出 ${value}`} />
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">
                        <p className="mb-2 font-bold text-slate-700">遍历整个棋盘 = 两层循环：</p>
                        <CodeBlock code={`for r in range(3):\n    for c in range(3):\n        print(grid[r][c])`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const f3MasteryItems = [
    {
        label: '能判断什么时候用 list、dict、string 或二维 list。',
        evidence: '能说出：一组有顺序的数据用 list；按标签查信息用 dict；文字处理用 string；棋盘/表格用二维 list。',
        retryHint: '回看小结三张卡，再给“学生名单、学生档案、聊天文本、九宫格”各选一次容器。',
    },
    {
        label: '能解释下标、key 和切片的不同访问规则。',
        evidence: '能说明 list/string 用位置，dict 用 key；grid[行][列] 先选行；text[1:4] 不包含 4。',
        retryHint: '分别重做列表、字典、字符串和二维列表的追踪器。',
    },
    {
        label: '能处理越界或找不到键，不让程序直接崩掉。',
        evidence: '能说出 items[3] 会 IndexError，profile["job"] 会 KeyError，可以先判断或用 get(default)。',
        retryHint: '回看列表下标追踪器和字典访问追踪器，把错误名说出来。',
    },
    {
        label: '能把一个小任务拆成“读数据、改数据、遍历处理”。',
        evidence: '例如名单管理：先查名字是否存在，再 append/remove，最后 for 遍历输出。',
        retryHint: '回到列表练习顺序，按“先读下标、再改背包、最后遍历”做一遍。',
    },
];

const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="teal" icon={BookOpen} title="小结与下一步">
            这一课，你学会了用三种「容器」装真实数据。选对容器，一半的题就解决了。
        </SlideHeader>
        <div className="grid gap-4 md:grid-cols-3">
            {[
                ['列表 List', '有序、可改，按下标取值；二维列表就是列表里装列表，像棋盘。'],
                ['字典 Dict', '用「键」直接查「值」，适合描述一条信息的多个字段。'],
                ['字符串 String', '字符的序列，可遍历、可切片、可拼接。'],
            ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-2 text-sm font-black text-teal-700">{title}</div>
                    <p className="text-sm font-semibold leading-7 text-slate-600">{desc}</p>
                </div>
            ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-800">
                <CheckCircle size={16} className="text-teal-600" /> 学完自测
            </div>
            <ul className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能说明列表下标从 0 开始</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能用 grid[行][列] 读取二维列表</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能选 list 还是 dict 解决任务</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能处理找不到键或下标越界</li>
            </ul>
        </div>
        <MasteryCheck
            title="F3 数据结构离开前检查"
            description="如果能选容器、说清访问规则、处理错误、迁移到小任务，就可以进入函数课。"
            accent="teal"
            items={f3MasteryItems}
        />
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
            <div className="mb-1 font-black text-teal-800">下一课：F4 函数与模块</div>
            <p className="text-sm font-semibold leading-7 text-teal-900">
                数据结构能装住信息；下一课把「处理这些数据的步骤」打包成函数，让代码可复用、可组合。
            </p>
        </div>
    </div>
);

const sections = [
    { id: 1, title: '列表 List', icon: List, component: ListSlide },
    { id: 2, title: '二维列表 Grid', icon: Grid3x3, component: Grid2DSlide },
    { id: 3, title: '字典 Dict', icon: Key, component: DictSlide },
    { id: 4, title: '字符串 String', icon: Edit3, component: StringSlide },
    { id: 5, title: '小结与衔接', icon: BookOpen, component: SummarySlide },
];

export default function PythonFoundation3() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F3"
            lessonTitle="列表与字典"
            lessonSubtitle="用数据结构装住真实信息"
            accent="teal"
            hero={{
                title: '用列表和字典装住真实世界的数据',
                description: '学会用 list、dict、string 组织一组数据并完成增删查改——这是函数和项目处理信息的原料。',
            }}
            prerequisites={['会用变量和 for 循环', '会写 if 条件判断', '理解下标从 0 开始']}
            sections={sections}
            previousPath="/python/f2"
            nextPath="/python/f4"
            nextLabel="下一课：F4 函数与模块"
            topSupport={<PythonFoundationSupport lessonId="f3" />}
            bottomSupport={<PythonFoundationSupport lessonId="f3" placement="bottom" />}
        />
    );
}
