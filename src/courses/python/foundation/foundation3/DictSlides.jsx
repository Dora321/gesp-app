import { useState } from 'react';
import { Key, Search, RefreshCw, Plus, Trash2 } from 'lucide-react';
import PyCodeTracer from '../../../../components/PyCodeTracer';
import { Button } from './Shared';

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

export const DictAccessTraceCard = () => (
    <PyCodeTracer
        title="字典访问追踪器：键不存在时，dict[key] 会报错"
        code={dictAccessCode}
        varOrder={['key', 'value', 'result']}
        columns={['表达式', '键', '结果', '说明']}
        steps={dictAccessSteps}
        hint="字典不是按第几个找，而是按 key 找；先问“有没有这个标签”，再打开柜子。"
    />
);

export const DictSlide = () => {
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
                        <p className="text-xs text-red-300 mt-2">* pop() 使用查找框中的键 | 点击卡片也可删除</p>
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
