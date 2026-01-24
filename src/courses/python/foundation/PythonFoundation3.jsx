import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, List, Box, Key, Search, ArrowRight, RefreshCw, Plus, Trash2, Edit3 } from 'lucide-react';

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

            {/* Playground */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Operations Panel */}
                <div className="space-y-6">
                    {/* CREATE 增 */}
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

                    {/* READ 查 */}
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

                    {/* UPDATE 改 */}
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

                    {/* DELETE 删 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
                        <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                            <Trash2 size={20} className="text-red-600" /> 删 (Delete)
                        </h3>
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
                        <p className="text-xs text-red-400 mt-2">* remove() 使用上方查找框中的值</p>
                    </div>

                    {/* ITERATE 遍历 */}
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
                        <p className="text-xs text-purple-500 mt-2">* 点击"开始"逐步遍历列表</p>
                    </div>

                    {/* Console Output */}
                    <div className="bg-slate-800 p-4 rounded-xl text-green-400 font-mono text-sm min-h-[3em] flex items-center border border-slate-700">
                        {consoleOutput ? (
                            <span className="animate-in fade-in slide-in-from-left-2">&gt; {consoleOutput}</span>
                        ) : (
                            <span className="text-slate-500">&gt; 执行操作查看结果...</span>
                        )}
                    </div>

                    {/* Slicing Controls */}
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
                            const isIteratingThis = idx === iterateIndex;

                            // Check if item is in current slice range
                            const len = inventory.length;
                            let start = sliceStart < 0 ? len + sliceStart : sliceStart;
                            let end = sliceEnd < 0 ? len + sliceEnd : sliceEnd;
                            const isSliced = idx >= start && idx < end;

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

    // 遍历相关状态
    const [iterateKeys, setIterateKeys] = useState([]);
    const [iterateIndex, setIterateIndex] = useState(-1);
    const [iterateMode, setIterateMode] = useState('keys'); // 'keys', 'values', 'items'
    const [isIterating, setIsIterating] = useState(false);

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

    // ITERATE: 遍历功能
    const startDictIteration = () => {
        const keys = Object.keys(profile);
        if (keys.length === 0) return;
        setIterateKeys(keys);
        setIterateIndex(0);
        setIsIterating(true);

        const firstKey = keys[0];
        const firstVal = profile[firstKey];
        if (iterateMode === 'keys') {
            setMethodOutput(`for key in dict:\n  key: '${firstKey}'`);
        } else if (iterateMode === 'values') {
            setMethodOutput(`for value in dict.values():\n  value: ${typeof firstVal === 'string' ? `'${firstVal}'` : firstVal}`);
        } else {
            setMethodOutput(`for key, value in dict.items():\n  ('${firstKey}', ${typeof firstVal === 'string' ? `'${firstVal}'` : firstVal})`);
        }
    };

    const nextDictIteration = () => {
        if (iterateIndex < iterateKeys.length - 1) {
            const nextIdx = iterateIndex + 1;
            setIterateIndex(nextIdx);
            const key = iterateKeys[nextIdx];
            const val = profile[key];

            if (iterateMode === 'keys') {
                setMethodOutput(`for key in dict:\n  key: '${key}'`);
            } else if (iterateMode === 'values') {
                setMethodOutput(`for value in dict.values():\n  value: ${typeof val === 'string' ? `'${val}'` : val}`);
            } else {
                setMethodOutput(`for key, value in dict.items():\n  ('${key}', ${typeof val === 'string' ? `'${val}'` : val})`);
            }
        } else {
            setIsIterating(false);
            setMethodOutput(`遍历完成！共 ${iterateKeys.length} 个键值对`);
        }
    };

    const resetDictIteration = () => {
        setIterateIndex(-1);
        setIterateKeys([]);
        setIsIterating(false);
        setMethodOutput(null);
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

// 3. String Ops
const StringSlide = () => {
    const [text, setText] = useState("  Python is Cool  ");
    const [sliceStart, setSliceStart] = useState("");
    const [sliceEnd, setSliceEnd] = useState("");
    const [searchStr, setSearchStr] = useState("");
    const [replaceFrom, setReplaceFrom] = useState("o");
    const [replaceTo, setReplaceTo] = useState("0");
    const [consoleOutput, setConsoleOutput] = useState(null);

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
                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-700 mb-4">🔪 切片 (Slicing)</h3>
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
                                } catch (err) { return "Error"; }
                            })()}
                        </div>
                    </div>

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

                    {/* UPDATE 修改 */}
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

                    {/* Split & Join */}
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
                </div>
            </div>
        </div>
    );
}


const sections = [
    { id: 1, title: '列表 List', icon: List, component: ListSlide },
    { id: 2, title: '字典 Dict', icon: Key, component: DictSlide },
    { id: 3, title: '字符串 String', icon: Edit3, component: StringSlide },
];

export default function PythonFoundation3() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-bold text-teal-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        </Link>
                        <span className="bg-teal-600 text-white p-1 rounded text-sm">Python</span>
                        F3: 列表与字典
                    </h1>
                    <p className="text-xs text-slate-500 mt-2">Python 基础体系</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group: 数据容器 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">📦 数据容器</div>
                        <div className="space-y-1">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-teal-50 text-teal-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <section.icon size={18} className={activeSection === section.id ? 'text-teal-600' : 'text-slate-400'} />
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
                            <div className="h-1 w-20 bg-teal-500 rounded-full"></div>
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
                                navigate('/python/f4');
                            }
                        }}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
