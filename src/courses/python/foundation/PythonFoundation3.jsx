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

    const addItem = () => {
        if (!newItem.trim()) return;
        setInventory([...inventory, newItem]);
        setNewItem('');
    };

    const removeItem = (index) => {
        setInventory(inventory.filter((_, i) => i !== index));
    };

    const popItem = () => {
        setInventory(prev => prev.slice(0, -1));
    };

    const sortItems = () => {
        setInventory(prev => [...prev].sort());
    };

    const reverseItems = () => {
        setInventory(prev => [...prev].reverse());
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Intro Card */}
            <div className="bg-teal-100 p-6 rounded-2xl border border-teal-200 text-teal-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <List className="text-teal-600" />
                    列表 (List)：万能背包
                </h2>
                <p>
                    <strong>List</strong> 就像一个有顺序的超级背包。你可以给背包里的东西编号（索引），
                    也可以随时操作它——添加、删除、排序、甚至把背包切成两半！
                </p>
            </div>

            {/* Playground */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Operations Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <Edit3 size={18} /> 背包操作台
                        </h3>

                        {/* Add Item */}
                        <div className="flex gap-2 mb-6">
                            <input
                                value={newItem}
                                onChange={e => setNewItem(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addItem()}
                                placeholder="输入新物品..."
                                className="flex-1 border-2 border-slate-200 rounded-lg px-3 py-2 focus:border-teal-500 outline-none transition-colors"
                            />
                            <Button onClick={addItem} disabled={!newItem}>append()</Button>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="secondary" onClick={popItem} disabled={inventory.length === 0}>
                                backpack.pop()
                            </Button>
                            <div className="col-span-1"></div> {/* Spacer */}

                            <Button variant="secondary" onClick={sortItems} disabled={inventory.length < 2}>
                                backpack.sort()
                            </Button>
                            <Button variant="secondary" onClick={reverseItems} disabled={inventory.length < 2}>
                                backpack.reverse()
                            </Button>
                        </div>
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
                            // Check if item is in current slice range
                            // Handling negative indices for slicing logic is complex to visualize perfectly robustly in simple UI, 
                            // so we will do a simplified check: normalized indices.
                            const len = inventory.length;
                            let start = sliceStart < 0 ? len + sliceStart : sliceStart;
                            let end = sliceEnd < 0 ? len + sliceEnd : sliceEnd;
                            const isHighlighted = idx >= start && idx < end;

                            return (
                                <div
                                    key={idx}
                                    className={`relative flex items-center justify-between p-3 rounded-xl transition-all border-2
                                        ${isHighlighted
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105 z-10'
                                            : 'bg-white border-transparent text-slate-700 shadow-sm hover:border-slate-300'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center w-8">
                                            <span className={`text-xs font-mono font-bold ${isHighlighted ? 'text-indigo-200' : 'text-slate-400'}`}>
                                                {idx}
                                            </span>
                                            <span className={`text-[10px] font-mono ${isHighlighted ? 'text-indigo-300' : 'text-slate-300'}`}>
                                                {idx - len}
                                            </span>
                                        </div>
                                        <span className="font-bold text-lg">{item}</span>
                                    </div>

                                    <button
                                        onClick={() => removeItem(idx)}
                                        className={`p-2 rounded-lg transition-colors ${isHighlighted ? 'hover:bg-indigo-500 text-indigo-200' : 'hover:bg-red-50 text-slate-300 hover:text-red-500'}`}
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
    const [methodOutput, setMethodOutput] = useState(null);

    const updateDict = () => {
        if (!newKey.trim()) return;
        setProfile(prev => ({ ...prev, [newKey]: isNaN(newVal) ? newVal : Number(newVal) }));
        setNewKey("");
        setNewVal("");
        setMethodOutput(null);
    };

    const deleteKey = (key) => {
        const next = { ...profile };
        delete next[key];
        setProfile(next);
        setMethodOutput(null);
    };

    const checkExistence = () => {
        setMethodOutput(`${JSON.stringify(checkKey)} in dict -> ${checkKey in profile ? 'True' : 'False'}`);
    };

    const runMethod = (method) => {
        if (method === 'keys') {
            setMethodOutput(`dict.keys() -> [${Object.keys(profile).map(k => `'${k}'`).join(', ')}]`);
        } else if (method === 'values') {
            setMethodOutput(`dict.values() -> [${Object.values(profile).map(v => typeof v === 'string' ? `'${v}'` : v).join(', ')}]`);
        } else if (method === 'items') {
            setMethodOutput(`dict.items() -> [${Object.entries(profile).map(([k, v]) => `('${k}', ${typeof v === 'string' ? `'${v}'` : v})`).join(', ')}]`);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Key className="text-orange-600" />
                    字典 (Dictionary)：带标签的柜子
                </h2>
                <p>
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
                <div className="order-1 lg:order-2 space-y-6">
                    {/* Add / Update */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <Edit3 size={18} /> 修改字典
                        </h3>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={newKey}
                                onChange={e => setNewKey(e.target.value)}
                                placeholder="Key (e.g. 'score')"
                                className="w-1/3 border-2 border-slate-200 rounded-lg px-3 py-2 focus:border-orange-500 outline-none transition-colors font-mono text-sm"
                            />
                            <input
                                value={newVal}
                                onChange={e => setNewVal(e.target.value)}
                                placeholder="Value"
                                className="flex-1 border-2 border-slate-200 rounded-lg px-3 py-2 focus:border-orange-500 outline-none transition-colors"
                            />
                        </div>
                        <Button
                            onClick={updateDict}
                            disabled={!newKey}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            dict['{newKey || 'key'}'] = {newVal || 'value'}
                        </Button>
                    </div>

                    {/* Methods & Check */}
                    <div className="bg-slate-800 p-6 rounded-2xl text-slate-300 shadow-lg">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <RefreshCw size={18} /> 常用方法 (Methods)
                        </h3>

                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <button onClick={() => runMethod('keys')} className="bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm font-mono transition-colors">.keys()</button>
                            <button onClick={() => runMethod('values')} className="bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm font-mono transition-colors">.values()</button>
                            <button onClick={() => runMethod('items')} className="bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm font-mono transition-colors">.items()</button>
                        </div>

                        <div className="flex gap-2 mb-4 border-t border-slate-700 pt-4">
                            <input
                                value={checkKey}
                                onChange={e => setCheckKey(e.target.value)}
                                placeholder="Check Key..."
                                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm font-mono"
                            />
                            <button onClick={checkExistence} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-sm font-mono">
                                in dict?
                            </button>
                        </div>

                        {/* Console Output */}
                        <div className="bg-black rounded-lg p-3 font-mono text-sm min-h-[3em] flex items-center text-green-400 border border-slate-700">
                            {methodOutput ? (
                                <span className="animate-in fade-in slide-in-from-left-2">&gt; {methodOutput}</span>
                            ) : (
                                <span className="text-slate-600">waiting for command...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. String Ops
const StringSlide = () => {
    const [text, setText] = useState("Python is Cool");
    const [sliceStart, setSliceStart] = useState("");
    const [sliceEnd, setSliceEnd] = useState("");

    // Split & Join State
    const [splitText, setSplitText] = useState("apple,banana,orange");
    const [delimiter, setDelimiter] = useState(",");
    const [splitResult, setSplitResult] = useState(['apple', 'banana', 'orange']);

    useEffect(() => {
        setSplitResult(splitText.split(delimiter));
    }, [splitText, delimiter]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Edit3 className="text-blue-600" />
                    字符串 (String)：文字魔法
                </h2>
                <p>
                    文字不只是用来读的，还可以像拼图一样拆分、组合、变形！
                    这是处理文本数据的基本功。
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Basic Ops & Slicing */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-700 mb-4">🔮 基础变化</h3>
                        <input
                            value={text}
                            onChange={e => setText(e.target.value)}
                            className="w-full text-xl font-mono p-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none mb-4"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">.upper()</div>
                                <div className="font-bold text-slate-700">{text.toUpperCase()}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">.lower()</div>
                                <div className="font-bold text-slate-700">{text.toLowerCase()}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">len()</div>
                                <div className="font-bold text-slate-700">{text.length}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase">replace("o", "0")</div>
                                <div className="font-bold text-slate-700">{text.replace(/o/gi, '0')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Slicing */}
                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-700 mb-4">🔪 切片实验室 (Slicing)</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-mono text-lg font-bold">text[</span>
                            <input
                                placeholder="Start"
                                value={sliceStart}
                                onChange={e => setSliceStart(e.target.value)}
                                className="w-12 p-1 text-center rounded border border-indigo-200 font-mono"
                            />
                            <span className="font-mono text-lg font-bold">:</span>
                            <input
                                placeholder="End"
                                value={sliceEnd}
                                onChange={e => setSliceEnd(e.target.value)}
                                className="w-12 p-1 text-center rounded border border-indigo-200 font-mono"
                            />
                            <span className="font-mono text-lg font-bold">]</span>
                        </div>
                        <div className="bg-indigo-900 text-indigo-100 p-4 rounded-xl shadow-inner font-mono min-h-[3rem] items-center flex">
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
                </div>

                {/* Split & Join */}
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col">
                    <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <RefreshCw size={18} /> 拆分与组合 (Split & Join)
                    </h3>

                    <div className="space-y-6 flex-1">
                        {/* Split Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-emerald-600">.split(delimiter)</label>
                                <input
                                    value={delimiter}
                                    onChange={e => setDelimiter(e.target.value)}
                                    placeholder=","
                                    className="w-8 h-8 text-center rounded border border-emerald-300 font-mono"
                                    maxLength={1}
                                />
                            </div>
                            <input
                                value={splitText}
                                onChange={e => setSplitText(e.target.value)}
                                className="w-full p-3 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none font-mono text-sm"
                            />
                            <div className="mt-2 text-center text-emerald-400">⬇️</div>
                            <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-sm text-emerald-800 break-all">
                                [{splitResult.map(s => `"${s}"`).join(', ')}]
                            </div>
                        </div>

                        <div className="border-t border-emerald-200"></div>

                        {/* Join Section */}
                        <div>
                            <label className="block text-sm font-bold text-emerald-600 mb-2">delimiter.join(list)</label>
                            <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-sm text-emerald-800 break-all mb-2">
                                [{splitResult.map(s => `"${s}"`).join(', ')}]
                            </div>
                            <div className="mt-2 text-center text-emerald-400">⬇️</div>
                            <div className="bg-emerald-600 text-white p-3 rounded-lg font-mono text-sm shadow-sm break-all">
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
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                                <span className="text-lg">🐍</span>
                            </div>
                        </Link>
                        <span className="bg-teal-600 text-white p-1 rounded text-sm">Python</span>
                        F3: 数据结构
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
