import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Save, FileText, FolderOpen, PenTool, Edit3, Trash2,
    RefreshCw, Play, ArrowRight, CheckCircle, AlertTriangle,
    Book, Coffee, Database, HardDrive, Menu, X, Plus, Terminal
} from 'lucide-react';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell from '../shell/PythonLessonShell';

// --- Shared Helper Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = ({ code, highlightLine = -1 }) => (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto relative">
        <div className="absolute top-2 right-4 text-slate-500 text-xs uppercase tracking-widest">Python</div>
        <pre className="relative z-10">
            {code.split('\n').map((line, i) => (
                <div key={`line-${i}`} className={`${highlightLine === i ? 'bg-indigo-500/30 -mx-4 px-4 border-l-4 border-indigo-400' : ''}`}>
                    {line || ' '}
                </div>
            ))}
        </pre>
    </div>
);

// --- 1. Intro Slide: RAM vs Disk ---
const IntroSlide = () => {
    const [notes, setNotes] = useState(['📝 笔记1', '📝 笔记2']);
    const [isPowerOn, setIsPowerOn] = useState(true);

    const togglePower = () => {
        setIsPowerOn(!isPowerOn);
        if (isPowerOn) {
            // Power off: RAM clears
            setNotes([]);
        } else {
            // Power on: RAM starts empty
            setNotes([]);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <HardDrive className="absolute top-[-20px] right-[-20px] text-white/10 w-40 h-40 rotate-12" />
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                    <Database className="text-yellow-300" />
                    为什么需要文件？
                </h2>
                <p className="text-lg leading-relaxed opacity-90">
                    变量存储在 <strong>内存 (RAM)</strong> 中，一旦程序结束或电脑关机，数据就会<span className="text-red-300 font-bold">瞬间消失</span>。
                    <br />
                    文件存储在 <strong>硬盘 (Disk)</strong> 中，它们是<span className="text-green-300 font-bold">永久</span>的，即使断电也不会丢失。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* RAM Simulation */}
                <div className={`p-6 rounded-2xl border-4 transition-all duration-500 relative ${isPowerOn ? 'bg-white border-green-400 shadow-lg' : 'bg-slate-900 border-slate-700'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className={`font-bold text-xl ${isPowerOn ? 'text-slate-800' : 'text-slate-500'}`}>
                            🧠 内存 (RAM)
                        </h3>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${isPowerOn ? 'bg-green-100 text-green-700' : 'bg-red-900 text-red-500'}`}>
                            {isPowerOn ? '⚡ POWER ON' : '⚫ POWER OFF'}
                        </div>
                    </div>

                    <div className="h-40 flex flex-wrap content-start gap-2 p-4 bg-slate-50 rounded-xl inner-shadow">
                        {isPowerOn ? (
                            notes.length > 0 ? notes.map((n, i) => (
                                <span key={i} className="animate-in zoom-in bg-yellow-200 text-yellow-800 px-3 py-1 rounded shadow transform rotate-1">{n}</span>
                            )) : <div className="text-slate-400 w-full text-center mt-10">空空如也</div>
                        ) : (
                            <div className="text-slate-600 w-full text-center mt-10">❌ 断电数据丢失</div>
                        )}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <Button
                            onClick={() => setNotes([...notes, `📝 笔记${notes.length + 1}`])}
                            disabled={!isPowerOn}
                            className="flex-1"
                        >
                            <Plus size={16} /> 添加数据
                        </Button>
                        <Button
                            onClick={togglePower}
                            variant={isPowerOn ? 'danger' : 'success'}
                            className="flex-1"
                        >
                            {isPowerOn ? '🔴 拔掉电源' : '🟢 接通电源'}
                        </Button>
                    </div>
                </div>

                {/* Disk Simulation */}
                <div className="bg-slate-100 p-6 rounded-2xl border-4 border-slate-300 shadow-inner flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                            <HardDrive className="text-indigo-600" /> 硬盘 (Disk)
                        </h3>
                        <div className="space-y-2">
                            <div className="bg-white p-3 rounded border border-slate-200 flex items-center gap-3">
                                <FileText className="text-blue-500" />
                                <div>
                                    <div className="font-bold text-sm">save_game.dat</div>
                                    <div className="text-xs text-slate-400">2048-01-01</div>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded border border-slate-200 flex items-center gap-3">
                                <FileText className="text-blue-500" />
                                <div>
                                    <div className="font-bold text-sm">diary.txt</div>
                                    <div className="text-xs text-slate-400">永久保存</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm font-bold text-center mt-4">
                        🛡️ 数据在这里很安全！
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. Reading files ---
const ReadSlide = () => {
    const [fileContent] = useState("Hello Python!\nThis is a text file.\nReading is fun!");
    const [readMode, setReadMode] = useState('read'); // read, readline, readlines
    const [output, setOutput] = useState(null);
    const [, setCursor] = useState(0);

    const handleRun = async () => {
        setOutput(null);
        setCursor(0);

        await new Promise(r => setTimeout(r, 500));

        if (readMode === 'read') {
            setOutput(fileContent);
        } else if (readMode === 'readlines') {
            setOutput(JSON.stringify(fileContent.split('\n')));
        } else {
            // readline simulation needs complex state, simplified here
            setOutput("Hello Python! (First Line)");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Book className="text-blue-600" />
                    读取文件 (Reading)
                </h2>
                <p>
                    使用 <code>open(filename, 'r')</code> 打开书本，然后用不同的方式阅读。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Virtual File */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 relative group">
                    <div className="absolute -top-3 left-6 bg-slate-100 text-slate-500 px-2 text-xs font-bold uppercase border border-slate-200 rounded">
                        data.txt
                    </div>
                    <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                        {fileContent}
                    </div>
                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
                </div>

                {/* Code & Output */}
                <div className="space-y-4">
                    <div className="flex gap-2 mb-2">
                        <button onClick={() => setReadMode('read')} className={`px-3 py-1 rounded text-sm ${readMode === 'read' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>.read()</button>
                        <button onClick={() => setReadMode('readlines')} className={`px-3 py-1 rounded text-sm ${readMode === 'readlines' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>.readlines()</button>
                    </div>

                    <CodeBlock
                        code={`f = open("data.txt", "r")\ncontent = f.${readMode}()\nprint(content)\nf.close()`}
                        highlightLine={1}
                    />

                    <Button onClick={handleRun} className="w-full">
                        <Play size={16} /> 运行代码
                    </Button>

                    {output && (
                        <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-sm animate-in zoom-in duration-300">
                            <div className="mb-2 text-slate-500 text-xs">Output:</div>
                            {output}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 3. Write vs Append ---
const WriteSlide = () => {
    const [fileContent, setFileContent] = useState("Old Data...");
    const [mode, setMode] = useState('w'); // w or a
    const [input, setInput] = useState("New Data!");

    const handleWrite = () => {
        if (mode === 'w') {
            setFileContent(input);
        } else {
            setFileContent(prev => prev + input);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Edit3 className="text-orange-600" />
                    写入模式: 'w' vs 'a'
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${mode === 'w' ? 'bg-red-100 border-red-400' : 'bg-white border-slate-200'}`} onClick={() => setMode('w')}>
                        <div className="font-bold text-lg mb-1">'w' (Write)</div>
                        <div className="text-sm">⚠️ 覆盖模式：旧内容会被清空！</div>
                    </div>
                    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${mode === 'a' ? 'bg-green-100 border-green-400' : 'bg-white border-slate-200'}`} onClick={() => setMode('a')}>
                        <div className="font-bold text-lg mb-1">'a' (Append)</div>
                        <div className="text-sm">➕ 追加模式：写在最后面。</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual File */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 min-h-[200px] flex items-center justify-center relative">
                    <div className="absolute top-0 left-0 bg-slate-500 text-white px-3 py-1 text-xs rounded-br-lg font-mono">
                        disk_fail.txt
                    </div>
                    <div className="text-3xl font-mono text-slate-700 animate-in fade-in key={fileContent}">
                        {fileContent}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-xl">
                        <label className="text-xs font-bold text-slate-500 uppercase">写入内容</label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full mt-1 p-2 border rounded font-mono"
                        />
                    </div>

                    <CodeBlock
                        code={`# 打开模式: ${mode}\nf = open("disk_file.txt", "${mode}")\nf.write("${input}")\nf.close()`}
                    />

                    <Button onClick={handleWrite} variant={mode === 'w' ? 'danger' : 'success'} className="w-full">
                        {mode === 'w' ? '🔥 写入 (覆盖)' : '➕ 写入 (追加)'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- 4. Context Manager ---
const WithSlide = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Simulate manual open/close vs with
    const runManual = async () => {
        setIsOpen(true);
        await new Promise(r => setTimeout(r, 1000));
        // Oops forgot to close!
        // setIsOpen(false); 
    };

    const runWith = async () => {
        setIsOpen(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsOpen(false); // Auto close
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-emerald-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="text-emerald-600" />
                    安全的 `with` 语句
                </h2>
                <p>
                    忘记 `f.close()` 会导致文件损坏或内存泄漏。使用 `with`，Python 会自动帮你关门！
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-500">❌ 危险写法 (手动开关)</h3>
                    <CodeBlock code={`f = open("data.txt")\n# 如果这里报错...\nf.close() # 这行可能永远不执行！`} />
                    <Button onClick={runManual} variant="secondary" className="w-full">运行手动模式</Button>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-emerald-600">✅ 推荐写法 (With)</h3>
                    <CodeBlock code={`with open("data.txt") as f:\n    # 离开缩进时...\n    # 自动关闭！`} />
                    <Button onClick={runWith} variant="primary" className="w-full">运行 With 模式</Button>
                </div>
            </div>

            <div className={`p-6 rounded-xl border-4 text-center transition-all ${isOpen ? 'bg-green-100 border-green-500' : 'bg-slate-100 border-slate-300'}`}>
                <div className="text-lg font-bold mb-2">文件状态: {isOpen ? '🔓 OPEN (打开)' : '🔒 CLOSED (关闭)'}</div>
                {isOpen && <div className="text-red-500 text-sm animate-pulse">注意：如果不关闭，资源会被一直占用！</div>}
            </div>
        </div>
    );
};

// --- 5. Summary & Challenge ---
const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Terminal className="text-green-400" />
                文件操作秘籍
            </h2>
            <div className="grid gap-4 font-mono text-sm">
                <div className="flex gap-4 border-b border-slate-700 pb-2">
                    <span className="text-purple-400 w-24">open(f, 'r')</span>
                    <span className="text-slate-300">只读模式 (Read Only)。默认模式。</span>
                </div>
                <div className="flex gap-4 border-b border-slate-700 pb-2">
                    <span className="text-purple-400 w-24">open(f, 'w')</span>
                    <span className="text-slate-300">覆盖写入 (Write)。<span className="text-red-400">小心！会清空旧文件。</span></span>
                </div>
                <div className="flex gap-4 border-b border-slate-700 pb-2">
                    <span className="text-purple-400 w-24">open(f, 'a')</span>
                    <span className="text-slate-300">追加模式 (Append)。在末尾添加。</span>
                </div>
                <div className="flex gap-4 pt-2">
                    <span className="text-green-400 w-24">with open...</span>
                    <span className="text-slate-300">上下文管理器。自动关闭文件，最安全！</span>
                </div>
            </div>
        </div>
    </div>
);


const sections = [
    { id: 1, title: '持久化魔法', icon: HardDrive, component: IntroSlide },
    { id: 2, title: '读取文件', icon: Book, component: ReadSlide },
    { id: 3, title: '写入与追加', icon: Edit3, component: WriteSlide },
    { id: 4, title: '安全管家', icon: CheckCircle, component: WithSlide },
    { id: 5, title: '秘籍总结', icon: Terminal, component: SummarySlide },
];

export default function PythonFileOps() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON 项目"
            lessonCode="A6"
            lessonTitle="文件操作"
            lessonSubtitle="把程序结果保存下来"
            accent="indigo"
            hero={{
                title: '让程序的成果存得下、读得回',
                description: '用 with open 安全地读写文本文件，把前面项目产出的结果保存成文件——这是做工具的最后一块拼图。',
            }}
            sections={sections}
            previousPath="/python/morse"
            nextPath="/python/a2"
            nextLabel="下一个：A7 2048 游戏"
            topSupport={<PythonProjectSupport projectId="file-ops" />}
            bottomSupport={<PythonProjectSupport projectId="file-ops" placement="bottom" />}
        />
    );
}

