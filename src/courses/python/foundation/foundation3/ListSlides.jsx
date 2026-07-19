import { useState } from 'react';
import { List, Search, ArrowRight, RefreshCw, Plus, Trash2, CheckCircle } from 'lucide-react';
import PyCodeTracer from '../../../../components/PyCodeTracer';
import { PredictCheck, TransferCheck } from '../../shell/PythonLessonShell';
import { Button } from './Shared';

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

export const ListIndexTraceCard = () => (
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

export const ListFocusGuide = ({ focusMode, onChange }) => {
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

export const ListSlide = () => {
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
                            <p className="text-xs text-red-300 mt-2">remove(x) 删除第一个匹配的值；按右侧垃圾桶是按下标删除。</p>
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
