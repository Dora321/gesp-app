import { useState, useEffect } from 'react';
import { Search, RefreshCw, Edit3, CheckCircle } from 'lucide-react';
import PyCodeTracer from '../../../../components/PyCodeTracer';
import { PredictCheck } from '../../shell/PythonLessonShell';
import { Button } from './Shared';

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

export const StringTraceCard = () => (
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

export const StringFocusGuide = ({ focusMode, onChange }) => {
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

export const StringSlide = () => {
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
