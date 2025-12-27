import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const [inventory, setInventory] = useState(['剑', '药水', '地图']);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (!newItem.trim()) return;
        setInventory([...inventory, newItem]);
        setNewItem('');
    };

    const removeItem = (index) => {
        setInventory(inventory.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-teal-100 p-6 rounded-2xl border border-teal-200 text-teal-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <List className="text-teal-600" />
                    列表 (List)：万能背包
                </h2>
                <p>
                    <strong>List</strong> 就像一个有顺序的背包。你可以给背包里的东西编号（索引），
                    也可以随时往里面塞新东西，或者扔掉旧东西。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Code View */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">代码操作</h3>
                    <CodeBlock code={`
# 当前背包
backpack = ${JSON.stringify(inventory).replace(/"/g, "'")}

# 添加物品
backpack.append("${newItem || '...'}")

# 删除物品
del backpack[index]
                    `} />

                    <div className="flex gap-2">
                        <input
                            value={newItem}
                            onChange={e => setNewItem(e.target.value)}
                            placeholder="输入新物品名称"
                            className="flex-1 border rounded-lg px-3 py-2"
                        />
                        <Button onClick={addItem} disabled={!newItem}>添加</Button>
                    </div>
                </div>

                {/* Visual View */}
                <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-4">背包预览 (Index 0 ~ {Math.max(0, inventory.length - 1)})</h3>
                    <div className="space-y-2">
                        {inventory.length === 0 && <div className="text-slate-400 text-center py-4">背包空空如也...</div>}
                        {inventory.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm group hover:shadow-md transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-mono font-bold">
                                        [{idx}]
                                    </span>
                                    <span className="font-medium text-slate-700">{item}</span>
                                </div>
                                <button
                                    onClick={() => removeItem(idx)}
                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
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
    const [editKey, setEditKey] = useState(null);
    const [editVal, setEditVal] = useState('');

    const handleEdit = (key) => {
        setEditKey(key);
        setEditVal(profile[key]);
    }

    const saveEdit = () => {
        if (editKey) {
            setProfile(p => ({ ...p, [editKey]: isNaN(editVal) ? editVal : Number(editVal) }));
            setEditKey(null);
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Key className="text-orange-600" />
                    字典 (Dictionary)：带标签的柜子
                </h2>
                <p>
                    <strong>List</strong> 用数字查东西，<strong>Dictionary</strong> 用名字（Key）查东西。
                    就像查字典一样，通过“单词”找到“解释”。
                </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 items-start">
                {/* Visual Cards */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {Object.entries(profile).map(([key, val]) => (
                        <div key={key} className="bg-white rounded-xl p-4 shadow-lg border-b-4 border-orange-500 relative group overflow-hidden">
                            <div className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">{key}</div>

                            {editKey === key ? (
                                <div className="flex gap-2">
                                    <input
                                        autoFocus
                                        value={editVal}
                                        onChange={e => setEditVal(e.target.value)}
                                        onBlur={saveEdit}
                                        onKeyDown={e => e.key === 'Enter' && saveEdit()}
                                        className="w-full border-b-2 border-orange-400 outline-none text-slate-800 font-bold"
                                    />
                                </div>
                            ) : (
                                <div className="text-xl font-bold text-slate-800 flex justify-between items-center">
                                    {val}
                                    <button onClick={() => handleEdit(key)} className="text-slate-300 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all">
                                        <Edit3 size={16} />
                                    </button>
                                </div>
                            )}

                            <div className="absolute top-0 right-0 p-1 bg-slate-100 rounded-bl-lg">
                                <Key size={12} className="text-slate-400" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Code Preview */}
                <div className="w-full md:w-80">
                    <div className="text-white font-bold mb-2 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <CodeBlock code={`
player = {
  "name": "${profile.name}",
  "level": ${profile.level},
  "job": "${profile.job}"
}

# 获取信息
print(player["name"])
# -> ${profile.name}
                     `} />
                </div>
            </div>
        </div>
    );
};

// 3. String Ops
const StringSlide = () => {
    const [text, setText] = useState("Python is Cool");

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">原始字符串</label>
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="w-full text-2xl font-mono p-4 border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: '大写 (.upper())', val: text.toUpperCase() },
                        { label: '小写 (.lower())', val: text.toLowerCase() },
                        { label: '长度 (len())', val: text.length },
                        { label: '反转 ([::-1])', val: text.split('').reverse().join('') },
                        { label: '替换 (replace "o"->"0")', val: text.replace(/o/gi, '0') },
                        { label: '切片 ([0:6])', val: text.slice(0, 6) }
                    ].map((op, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center shadow-sm">
                            <div className="font-mono text-sm text-slate-500">{op.label}</div>
                            <div className="font-bold text-slate-800 text-lg">{op.val}</div>
                        </div>
                    ))}
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
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center overflow-hidden border border-teal-200">
                                <span className="text-lg">🏠</span>
                            </div>
                        </Link>
                        F3: 数据结构
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
                                    ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                    `}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-teal-600' : 'text-slate-400'} />
                            {section.title}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-teal-100 text-xs font-bold uppercase tracking-wider">NEXT</span>
                            <RefreshCw size={16} className="text-teal-200" />
                        </div>
                        <div className="font-bold text-sm">F4: 函数与模块化</div>
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
                        <div className="h-1 w-20 bg-teal-500 rounded-full"></div>
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
                            继续学习 <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
