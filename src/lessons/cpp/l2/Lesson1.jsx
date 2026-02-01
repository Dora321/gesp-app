import React, { useState, useEffect } from 'react';
import {
    Cpu,
    Save,
    Zap,
    Globe,
    Home,
    MapPin,
    HelpCircle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Menu,
    X,
    BookOpen,
    HardDrive,
    Trash2,
    Server,
    Wifi,
    Monitor,
    Lightbulb,
    FastForward,
    TrainFront,
    Timer,
    FileText,
    Library,
    Building2,
    Layers
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, className = "" }) => {
    const icons = {
        cpu: <Cpu size={size} className={className} />,
        save: <Save size={size} className={className} />,
        zap: <Zap size={size} className={className} />,
        globe: <Globe size={size} className={className} />,
        home: <Home size={size} className={className} />,
        map: <MapPin size={size} className={className} />,
        help: <HelpCircle size={size} className={className} />,
        book: <BookOpen size={size} className={className} />,
        disk: <HardDrive size={size} className={className} />,
        server: <Server size={size} className={className} />,
        wifi: <Wifi size={size} className={className} />,
        monitor: <Monitor size={size} className={className} />,
        bulb: <Lightbulb size={size} className={className} />
    };
    return icons[name] || <HelpCircle size={size} className={className} />;
};

// --- 组件：容量直观阶梯 (New & Improved) ---
const DataScaleVisualizer = () => {
    const scales = [
        { unit: 'B', name: '字节 (Byte)', metaphor: '1个字母', desc: '就像你在键盘上敲下的一个“A”', icon: <Monitor size={20} />, color: 'bg-slate-400' },
        { unit: 'KB', name: '千字节', metaphor: '1页文字', desc: '大约是一篇简短的作文或日记', icon: <FileText size={20} />, color: 'bg-blue-400' },
        { unit: 'MB', name: '兆字节', metaphor: '1本厚书', desc: '大约是一部长篇小说（如《西游记》）', icon: <BookOpen size={20} />, color: 'bg-indigo-400' },
        { unit: 'GB', name: '吉字节', metaphor: '1个书架', desc: '大约能装下 1000 多本厚厚的书', icon: <Library size={20} />, color: 'bg-purple-500' },
        { unit: 'TB', name: '太字节', metaphor: '整个图书馆', desc: '大约是由于一整座城市图书馆的藏书量', icon: <Building2 size={20} />, color: 'bg-fuchsia-600' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl my-8">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Layers className="text-indigo-600" /> 数据容量的“魔法阶梯”
            </h3>

            <div className="flex flex-col gap-4">
                {scales.map((s, idx) => (
                    <div key={s.unit} className="flex items-center gap-4 group">
                        {/* 阶梯部分 */}
                        <div className="flex flex-col items-center w-12 shrink-0">
                            <div className={`w-10 h-10 rounded-xl ${s.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                {s.icon}
                            </div>
                            {idx < scales.length - 1 && (
                                <div className="w-1 h-8 bg-gradient-to-b from-gray-200 to-transparent my-1 flex items-center justify-center relative">
                                    <span className="absolute left-4 whitespace-nowrap text-[10px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        × 1024 倍
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 内容部分 */}
                        <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-transparent group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-all">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-black text-xl text-gray-800">{s.unit}</span>
                                <span className="text-sm font-bold text-gray-500">{s.name}</span>
                                <span className="ml-auto bg-white px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-400 border border-gray-100 shadow-sm">
                                    {s.metaphor}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
                <div className="p-2 bg-yellow-400 text-white rounded-lg shadow-sm">
                    <Lightbulb size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-yellow-800 text-sm">进位提醒</h4>
                    <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
                        在计算进位时，每一级都是前一级的 <b>1024 倍</b>（$2^{10}$）。<br />
                        所以：1TB = 1024GB = 1,048,576MB ... 数字大得惊人吧！
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- 章节配置 ---
const sections = [
    { id: 1, title: "封面：健忘的电脑与快递员", icon: "cpu", category: "导语" },
    { id: 2, title: "情景导入：只有七秒记忆的鱼？", icon: "zap", category: "存储原理" },
    { id: 3, title: "知识讲解：存储器三兄弟", icon: "save", category: "存储原理" },
    { id: 4, title: "知识讲解：计算机的社交网络", icon: "globe", category: "网络基础" },
    { id: 5, title: "知识讲解：域名系统 DNS", icon: "server", category: "网络基础" },
    { id: 6, title: "知识讲解：门牌号 IP", icon: "map", category: "网络基础" },
    { id: 7, title: "真题挑战 1：内存扩容", icon: "help", category: "实战演练" },
    { id: 8, title: "真题挑战 2：磁心存储", icon: "help", category: "实战演练" },
    { id: 9, title: "真题挑战 3：易错判断", icon: "help", category: "实战演练" },
    { id: 10, title: "总结回顾：口诀记忆", icon: "book", category: "总结" },
    { id: 11, title: "课后作业：小小观察员", icon: "disk", category: "总结" },
];

// --- 组件：断电模拟器 (Page 2) ---
const PowerOutageSim = () => {
    const [powerOn, setPowerOn] = useState(true);
    const [blackboardText, setBlackboardText] = useState("今日作业：1+1=2");
    const bookContent = "课本内容：C++ 是一门伟大的语言";

    const togglePower = () => {
        setPowerOn(!powerOn);
        if (powerOn) {
            setBlackboardText(""); // 断电，黑板（RAM）清空
        } else {
            setBlackboardText("今日作业：1+1=2"); // 通电，重新写入（模拟开机）
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border-4 border-slate-600 my-4 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Zap className={powerOn ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} />
                    实验室电源状态：{powerOn ? "通电中 (ON)" : "已断电 (OFF)"}
                </h3>
                <button
                    onClick={togglePower}
                    className={`px-4 py-2 rounded-full font-bold transition-all shadow-lg transform active:scale-95
            ${powerOn ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                >
                    {powerOn ? "🔌 拔掉电源" : "⚡ 接通电源"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* RAM 模拟 */}
                <div className="flex flex-col items-center group">
                    <div className={`w-full h-40 bg-green-900 border-8 border-yellow-700 rounded-lg p-4 flex items-center justify-center text-center transition-opacity duration-1000 ${powerOn ? 'opacity-100' : 'opacity-20 screen-flicker'}`}>
                        <span className="font-handwriting text-2xl text-white font-bold transform -rotate-2">
                            {blackboardText || <span className="text-sm text-gray-400">(数据已丢失...)</span>}
                        </span>
                    </div>
                    <p className="mt-3 text-white font-bold text-lg">黑板 (RAM)</p>
                    <p className="text-gray-400 text-sm">断电 = 擦黑板</p>
                </div>

                {/* ROM 模拟 */}
                <div className="flex flex-col items-center">
                    <div className="w-full h-40 bg-blue-100 border-l-8 border-blue-800 rounded-r-lg p-4 flex items-center justify-center text-center shadow-md relative">
                        <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300"></div>
                        <p className="font-serif text-slate-800 font-bold text-xl">{bookContent}</p>
                        {!powerOn && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold rounded-r-lg">虽然黑了，但我还在</div>}
                    </div>
                    <p className="mt-3 text-white font-bold text-lg">课本 (ROM)</p>
                    <p className="text-gray-400 text-sm">断电 = 内容还在</p>
                </div>
            </div>
        </div>
    );
};

// --- 组件：存储速度竞技场 (New Component) ---
const MemorySpeedRace = () => {
    const [status, setStatus] = useState('idle'); // idle, racing, finished

    const raceTracks = [
        { id: 'cache', name: 'Cache', label: '手边 (L1)', cycles: '1-3', speed: 0.1, color: 'bg-amber-500', metaphor: '闪电侠⚡' },
        { id: 'ram', name: 'RAM', label: '隔壁房 (内存)', cycles: '100-300', speed: 1.5, color: 'bg-emerald-500', metaphor: '汽车🚗' },
        { id: 'disk', name: '硬盘', label: '大城市外 (外存)', cycles: '1,000,000+', speed: 8, color: 'bg-blue-600', metaphor: '蜗牛🐌' }
    ];

    const startRace = () => {
        setStatus('racing');
        // 模拟比赛结束
        setTimeout(() => setStatus('finished'), 8500);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 my-6 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <FastForward className="text-yellow-400" /> 存储速度“马拉松”
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">模拟 CPU 从不同存储器取数据的真实时间差</p>
                </div>
                <button
                    onClick={startRace}
                    disabled={status === 'racing'}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                    {status === 'racing' ? '数据传输中...' : '🚀 开始读取'}
                </button>
            </div>

            <div className="space-y-6 relative">
                {/* 终点站: CPU */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-indigo-900/50 to-transparent flex flex-col items-center justify-around py-2 z-20">
                    <div className="bg-indigo-500 p-2 rounded-lg text-white shadow-xl animate-pulse">
                        <Cpu size={24} />
                        <span className="text-[10px] font-bold block text-center">CPU</span>
                    </div>
                </div>

                {raceTracks.map((track) => (
                    <div key={track.id} className="ml-24 relative h-16 bg-slate-800/50 rounded-r-xl border-y border-r border-slate-700 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-between px-4 z-10 pointer-events-none">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-300">{track.name}</span>
                                <span className="text-[10px] text-slate-500">耗时: {track.cycles} 周期</span>
                            </div>
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{track.label}</span>
                        </div>

                        {/* 轨道 */}
                        <div className="absolute inset-y-[45%] left-0 right-10 h-1 bg-slate-700/50 rounded-full"></div>

                        {/* 数据包 (运动员) */}
                        <div
                            style={{
                                transition: status === 'racing' ? `left ${track.speed}s cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
                                left: status === 'idle' ? '90%' : (status === 'racing' ? '0%' : '0%'),
                                opacity: status === 'idle' && track.id === 'disk' ? 0.3 : 1
                            }}
                            className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${track.color} border-2 border-white shadow-lg flex items-center justify-center text-lg z-30`}
                        >
                            {status === 'racing' ? "📦" : track.metaphor.slice(-2)}
                        </div>

                        {/* 通道 */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
                    </div>
                ))}
            </div>

            {status === 'finished' && (
                <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <p className="text-indigo-300 text-sm leading-relaxed">
                        <span className="font-bold text-white">结果揭晓：</span>
                        在 CPU 眼里，<span className="text-amber-400 font-bold">Cache</span> 就像手边的零食，伸手即得；
                        <span className="text-emerald-400 font-bold">RAM</span> 像是在客厅取水，需要跑几步；
                        而<span className="text-blue-400 font-bold">硬盘</span>则远在郊外，需要耗费巨大的时间等待！
                    </p>
                </div>
            )}
        </div>
    );
};
const StorageTriad = () => {
    const [activeCard, setActiveCard] = useState(null);

    const cards = [
        {
            id: 'rom',
            name: "ROM (只读存储器)",
            role: "大哥 (非挥发性) - 蜗牛🐌",
            analogy: "刻在石头上的家规 / 印刷好的书",
            features: ["出厂印好", "平时只读不改", "速度最慢但量大", "断电内容不丢失 (Non-volatile)"],
            color: "bg-blue-600",
            icon: "book"
        },
        {
            id: 'ram',
            name: "RAM (随机存储器)",
            role: "二哥 (挥发性) - 汽车🚗",
            analogy: "课桌 / 黑板",
            features: ["当前干活的地方", "速度较快", "容量适中", "断电数据立刻消失 (Volatile)"],
            color: "bg-emerald-600",
            icon: "save"
        },
        {
            id: 'cache',
            name: "Cache (高速缓存) - 闪电侠⚡",
            role: "三弟 (极速)",
            analogy: "手心的小抄",
            features: ["速度极快", "容量极小", "离大脑 (CPU) 最近"],
            color: "bg-amber-500",
            icon: "zap"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {cards.map((card) => (
                <div
                    key={card.id}
                    onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                    className={`cursor-pointer rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden shadow-lg border-2 border-transparent hover:border-white/50
            ${activeCard === card.id ? 'flex-[2] ring-4 ring-offset-2 ring-blue-300' : 'flex-1'}
            ${card.color} text-white`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Icon name={card.icon} size={28} className="text-white/90" />
                        <h3 className="font-bold text-lg">{card.name}</h3>
                    </div>

                    <div className="text-white/80 font-bold mb-2 text-sm uppercase tracking-wider">{card.role}</div>

                    <div className={`space-y-3 overflow-hidden transition-all duration-500 ${activeCard === card.id ? 'max-h-60 opacity-100' : 'max-h-20 opacity-80'}`}>
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                            <span className="font-bold text-xs uppercase text-white/70 block mb-1">类比</span>
                            {card.analogy}
                        </div>
                        {activeCard === card.id && (
                            <ul className="list-disc pl-5 text-sm space-y-1 bg-black/10 p-2 rounded-lg">
                                {card.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        )}
                        {activeCard !== card.id && (
                            <p className="text-xs text-center mt-4 animate-pulse">点击展开详情 👇</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- 组件：网络对比 (Page 4) ---
const NetworkVisual = () => {
    const [mode, setMode] = useState('lan'); // 'lan' or 'wan'

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 my-4">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setMode('lan')}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${mode === 'lan' ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    <Home size={20} /> 局域网 (LAN)
                </button>
                <button
                    onClick={() => setMode('wan')}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${mode === 'wan' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    <Globe size={20} /> 广域网 (WAN)
                </button>
            </div>

            <div className="relative h-64 bg-slate-50 rounded-xl overflow-hidden border-2 border-slate-200 flex items-center justify-center">
                {mode === 'lan' ? (
                    <div className="flex items-center gap-8 animate-in fade-in zoom-in duration-500">
                        <div className="text-center">
                            <Monitor size={48} className="text-indigo-500 mx-auto" />
                            <span className="text-sm font-bold text-gray-600">我的电脑</span>
                        </div>
                        <div className="h-1 w-20 bg-indigo-300 rounded-full animate-pulse"></div>
                        <div className="text-center">
                            <Wifi size={48} className="text-indigo-500 mx-auto" />
                            <span className="text-sm font-bold text-gray-600">路由器</span>
                        </div>
                        <div className="h-1 w-20 bg-indigo-300 rounded-full animate-pulse"></div>
                        <div className="text-center">
                            <Monitor size={48} className="text-indigo-500 mx-auto" />
                            <span className="text-sm font-bold text-gray-600">爸爸的电脑</span>
                        </div>
                        <div className="absolute bottom-4 text-indigo-800 font-bold bg-indigo-100 px-3 py-1 rounded-full">
                            范围：家、机房 (Local)
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-12 animate-in fade-in zoom-in duration-500">
                        <div className="text-center relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">中国</div>
                            <Monitor size={40} className="text-blue-500 mx-auto" />
                        </div>

                        <div className="relative w-40 h-20 border-t-2 border-dashed border-blue-400 rounded-full flex items-center justify-center">
                            <Globe size={64} className="text-blue-200 absolute opacity-50" />
                            <div className="w-3 h-3 bg-blue-600 rounded-full absolute -top-1.5 animate-ping-slow" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                            <span className="text-xs font-bold text-blue-500 bg-white px-1 z-10">Internet</span>
                        </div>

                        <div className="text-center relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">美国</div>
                            <Server size={40} className="text-blue-500 mx-auto" />
                        </div>
                        <div className="absolute bottom-4 text-blue-800 font-bold bg-blue-100 px-3 py-1 rounded-full">
                            范围：跨国、跨城市 (Wide)
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border-l-4 border-yellow-400">
                <strong>💡 类比记忆：</strong>
                {mode === 'lan' ? " 就像你在教室里喊一声，只有班里的同学能听到。" : " 就像你给国外的笔友寄信，需要经过很多邮局（路由器）转发。"}
            </div>
        </div>
    );
};

const DNSVisual = () => {
    const [step, setStep] = useState(0); // 0: idle, 1: asking, 2: resolved

    const steps = [
        { t: "输入网址：www.baidu.com", desc: "人类容易记住名字，但电脑只认数字（IP）。" },
        { t: "查询 DNS 服务器", desc: "DNS 就像网上的“电话本”，存着网址和 IP 的对应关系。" },
        { t: "返回 IP：110.242.68.66", desc: "有了 IP，快递员（数据包）就可以出发了！" }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 my-4 overflow-hidden">
            <div className="flex items-center justify-around mb-12 relative">
                {/* Lines */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
                {step >= 1 && <div className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 -z-10 transition-all duration-1000" style={{ width: step === 1 ? '50%' : '100%' }}></div>}

                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 0 ? 'scale-110' : 'opacity-50'}`}>
                    <div className="p-3 bg-indigo-600 text-white rounded-full shadow-lg"><Monitor size={24} /></div>
                    <span className="text-xs font-bold text-gray-600">我的电脑</span>
                </div>

                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 1 ? 'scale-110' : 'opacity-50'}`}>
                    <div className="p-3 bg-blue-500 text-white rounded-full shadow-lg"><Server size={24} /></div>
                    <span className="text-xs font-bold text-gray-600">DNS 服务器</span>
                </div>

                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 2 ? 'scale-110' : 'opacity-50'}`}>
                    <div className="p-3 bg-green-500 text-white rounded-full shadow-lg"><Globe size={24} /></div>
                    <span className="text-xs font-bold text-gray-600">目标网站</span>
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg min-h-[100px] border-l-4 border-indigo-500">
                <h4 className="font-bold text-indigo-800 mb-1">{steps[step].t}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{steps[step].desc}</p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={() => setStep(0)}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600"
                >
                    重置
                </button>
                <button
                    onClick={() => setStep(Math.min(2, step + 1))}
                    disabled={step === 2}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm shadow-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    下一步
                </button>
            </div>
        </div>
    );
};

// --- 组件：IP 地址投递演示 (Page 5) ---
const IPDeliverySim = () => {
    const [hasIP, setHasIP] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, sending, success, fail

    const sendPacket = () => {
        setStatus("sending");
        setTimeout(() => {
            setStatus(hasIP ? "success" : "fail");
        }, 1500);
    };

    return (
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl border border-slate-300 my-4">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <MapPin className="text-red-500" /> IP 投递实验
            </h3>

            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <Server />
                    </div>
                    <div className="text-xs text-gray-500">发送方<br />Server</div>
                </div>

                {/* 传输路径 */}
                <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full relative">
                    {status === "sending" && (
                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full animate-slide-right transition-all duration-1000" style={{ left: '0%', animation: 'slideRight 1.5s linear forwards' }}></div>
                    )}
                    <style>{`
             @keyframes slideRight {
               0% { left: 0%; }
               100% { left: 90%; }
             }
           `}</style>
                </div>

                <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white transition-colors duration-300 relative
             ${hasIP ? 'bg-green-500' : 'bg-gray-400'}`}>
                        <Monitor />
                        {hasIP && <div className="absolute -bottom-6 bg-green-100 text-green-800 text-[10px] px-1 rounded font-mono">192.168.1.5</div>}
                    </div>
                    <div className="text-xs text-gray-500 mt-6">接收方<br />PC</div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <input
                        type="checkbox"
                        checked={hasIP}
                        onChange={(e) => { setHasIP(e.target.checked); setStatus("idle"); }}
                        className="w-5 h-5 accent-green-600"
                    />
                    <span className="font-bold text-gray-700">给电脑配置 IP 地址</span>
                </label>

                <button
                    onClick={sendPacket}
                    disabled={status === "sending"}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "sending" ? "发送中..." : "🚀 发送数据包"}
                </button>
            </div>

            {status === "success" && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
                    <CheckCircle2 size={20} />
                    <span>成功！既然有 IP 地址（门牌号），快递员就能准确找到你。</span>
                </div>
            )}

            {status === "fail" && (
                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
                    <XCircle size={20} />
                    <span>失败！没有 IP 地址（没门牌号），数据包迷路了，被丢弃。</span>
                </div>
            )}
        </div>
    );
};

// --- 题目组件 ---
const Quiz = ({ question, options, correctIndex, explanation, type = "single" }) => {
    const [selected, setSelected] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleSelect = (index) => {
        if (selected !== null) return; // 锁定选择
        setSelected(index);
        setShowExplanation(true);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 my-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">真题实战</span>
            </div>
            <p className="font-bold text-lg mb-4 text-gray-800 leading-relaxed">{question}</p>
            <div className="grid grid-cols-1 gap-3">
                {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`p-4 text-left rounded-lg border-2 transition-all flex justify-between items-center group
              ${selected === null ? 'border-gray-100 hover:border-indigo-300 hover:bg-indigo-50' : ''}
              ${selected === idx && idx === correctIndex ? 'border-green-500 bg-green-50' : ''}
              ${selected === idx && idx !== correctIndex ? 'border-red-500 bg-red-50' : ''}
              ${selected !== null && idx === correctIndex ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : ''}
            `}
                    >
                        <div className="flex items-center">
                            <span className={`font-bold mr-3 w-8 h-8 rounded-full flex items-center justify-center text-sm ${selected === idx ? 'bg-white shadow-sm' : 'bg-gray-200 group-hover:bg-indigo-200'}`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-gray-700 font-medium">{opt}</span>
                        </div>
                        {selected === idx && idx === correctIndex && <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={18} /> 正确</span>}
                        {selected === idx && idx !== correctIndex && <span className="text-red-600 font-bold flex items-center gap-1"><XCircle size={18} /> 错误</span>}
                    </button>
                ))}
            </div>
            {showExplanation && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <Lightbulb size={16} className="text-yellow-500" /> 解析：
                    </h4>
                    <div className="text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-300">{explanation}</div>
                </div>
            )}
        </div>
    );
};

// --- 主应用 ---
export default function AdvLesson1() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visitedSections, setVisitedSections] = useState(new Set([1]));

    const totalSections = sections.length;

    // 记录已访问章节
    useEffect(() => {
        setVisitedSections(prev => new Set([...prev, activeSection]));
    }, [activeSection]);

    // 键盘导航
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSection();
            if (e.key === 'ArrowLeft') prevSection();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSection]);

    const nextSection = () => {
        if (activeSection < totalSections) setActiveSection(activeSection + 1);
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 rounded-3xl shadow-2xl text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 p-24 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-4 border border-white/20">
                                GESP C++ 二级 | 第 1 课
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                                计算机的记忆与网络
                            </h1>
                            <h2 className="text-xl md:text-2xl text-indigo-100 font-medium mb-8">
                                —— 健忘的电脑与快递员 🚚
                            </h2>

                            <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex-1">
                                    <div className="bg-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Save size={24} />
                                    </div>
                                    <h3 className="font-bold">存储器</h3>
                                    <p className="text-xs text-indigo-200 mt-1">RAM vs ROM vs Cache</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex-1">
                                    <div className="bg-purple-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Globe size={24} />
                                    </div>
                                    <h3 className="font-bold">网络</h3>
                                    <p className="text-xs text-indigo-200 mt-1">LAN vs WAN & IP</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">🎯 本课目标</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    理解 RAM、ROM 和 Cache 的区别（谁是健忘鬼？）
                                </li>
                                <li className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    区分局域网 (LAN) 和广域网 (WAN)。
                                </li>
                                <li className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    认识 IP 地址的作用（网络世界的门牌号）。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-yellow-400 p-2 rounded-lg text-white"><Zap size={28} /></span>
                            情景导入：只有七秒记忆的鱼？
                        </h2>
                        <div className="prose max-w-none text-gray-600 mb-6">
                            <p>
                                如果把电脑比作一个学生，它其实有两个大脑：
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                                <li className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <strong className="text-green-700 block mb-1">黑板 (RAM)</strong>
                                    写得快，擦得也快。一旦下课（断电），老师就会把黑板擦干净。
                                </li>
                                <li className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <strong className="text-blue-700 block mb-1">课本 (ROM)</strong>
                                    印刷好的，无论你怎么折腾，甚至把书合上（断电），里面的字都不会跑。
                                </li>
                            </ul>
                        </div>

                        <PowerOutageSim />

                        <p className="text-center text-gray-500 italic mt-4">
                            👇 点击上方红色/绿色按钮，看看会发生什么？
                        </p>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-blue-500 p-2 rounded-lg text-white"><Save size={28} /></span>
                            知识讲解 1：存储器三兄弟
                        </h2>
                        <p className="text-gray-600 mb-4">
                            计算机里有三个性格迥异的兄弟，它们负责帮 CPU（大脑）存东西。点击下方的卡片认识它们：
                        </p>

                        <StorageTriad />

                        <MemorySpeedRace />

                        <DataScaleVisualizer />
                    </div>
                );
            case 4:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500 p-2 rounded-lg text-white"><Globe size={28} /></span>
                            知识讲解 2：计算机的社交网络
                        </h2>

                        <NetworkVisual />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-indigo-700 text-lg mb-2">局域网 (LAN)</h3>
                                <p className="text-sm text-gray-600">Local Area Network</p>
                                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                                    <li>范围小：家里、学校机房、公司办公区。</li>
                                    <li>速度快：通常比宽带还快。</li>
                                    <li>自己管理：不用给电信局交钱（除了买路由器）。</li>
                                </ul>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-blue-700 text-lg mb-2">广域网 (WAN)</h3>
                                <p className="text-sm text-gray-600">Wide Area Network</p>
                                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                                    <li>范围大：跨越城市、国家。</li>
                                    <li>最著名的 WAN：Internet (因特网)。</li>
                                    <li>结构复杂：由无数个局域网连接而成。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-blue-400 p-2 rounded-lg text-white"><Server size={28} /></span>
                            知识讲解 3：域名系统 DNS
                        </h2>
                        <p className="text-gray-600 mb-4">
                            如果你要去好朋友家玩，但只知道他叫“张三”（网址），不知道他住在哪个房间号（IP），这时你就需要问“保安大叔”（DNS）。
                        </p>

                        <DNSVisual />

                        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mt-6">
                            <h4 className="font-bold text-indigo-800 mb-1">💡 知识点：</h4>
                            <p className="text-indigo-700 text-sm">
                                <strong>域名</strong>（www.baidu.com）是给人类看的，<strong>IP 地址</strong>（110.242.68.66）是给电脑看的。DNS 的作用就是将域名解析为 IP 地址。
                            </p>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-red-500 p-2 rounded-lg text-white"><MapPin size={28} /></span>
                            知识讲解 4：门牌号 IP
                        </h2>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold mr-2 uppercase">IPv4</span>
                                    <p className="mt-2 font-mono font-bold text-lg text-gray-800">192.168.1.1</p>
                                    <p className="mt-1 text-xs text-gray-400">目前最常用，4 个数字组成。</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2 uppercase">IPv6</span>
                                    <p className="mt-2 font-mono font-bold text-lg text-gray-800 truncate">2001:0db8:85a3...</p>
                                    <p className="mt-1 text-xs text-gray-400">下一代 IP，号称可以给地球上每颗沙子分配一个地址。</p>
                                </div>
                            </div>
                        </div>

                        <IPDeliverySim />
                    </div>
                );
            case 7:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">GESP 真题挑战 1</h2>
                        <Quiz
                            question="(2025年6月 GESP 二级) 小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时 he 需要的内存条是（ ）。"
                            options={["RAM", "ROM", "CACHE", "EPROM"]}
                            correctIndex={0}
                            explanation={
                                <>
                                    <p className="mb-2"><strong>关键词分析：</strong>"内存不够用了"。</p>
                                    <p>我们常说的"加内存条"，加的就是 <strong>RAM (随机存储器)</strong>。它就像给电脑换了一个更大的桌子，可以同时处理更多的任务。</p>
                                    <p className="mt-2 text-xs text-gray-500">
                                        * ROM 一般是固化的。<br />
                                        * Cache 集成在 CPU 里，通常不能单独买来插。<br />
                                        * EPROM 是老式可擦写 ROM。
                                    </p>
                                </>
                            }
                        />
                    </div>
                );
            case 8:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">GESP 真题挑战 2</h2>
                        <Quiz
                            question="(2024年9月 GESP 一级/二级) DJL-1 计算机的磁心存储元件相当于现代计算机的（ ）。"
                            options={["内存", "磁盘", "CPU", "显示器"]}
                            correctIndex={0}
                            explanation={
                                <>
                                    <p><strong>背景知识：</strong>老式计算机（如几十年前）使用"磁心存储器"来作为主存储器。</p>
                                    <p>磁心存储器的作用是存放正在运行的数据，这与现代计算机的 <strong>内存 (RAM)</strong> 作用是一致的。</p>
                                    <p className="mt-2 font-bold text-indigo-600">记住：看到"磁心存储" → 联想"内存"。</p>
                                </>
                            }
                        />
                    </div>
                );
            case 9:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">GESP 真题挑战 3 (易错题)</h2>
                        <Quiz
                            question="【判断题】局域网（LAN）中的计算机不需要 IP 地址，只有广域网（WAN）才需要。"
                            options={["正确 (True)", "错误 (False)"]}
                            correctIndex={1}
                            explanation={
                                <>
                                    <p className="font-bold text-red-600">这是个大坑！❌</p>
                                    <p>任何连入网络（无论是局域网还是广域网）的设备，都需要一个唯一的标识符才能通信，这个标识符就是 IP 地址。</p>
                                    <p>比如你在家里（局域网）用手机投屏到电视，手机和电视都必须有 IP 地址才能找到对方。</p>
                                </>
                            }
                        />
                    </div>
                );
            case 10:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-pink-500 p-2 rounded-lg text-white"><BookOpen size={28} /></span>
                            总结回顾：超级记忆口诀
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:scale-105 transition-transform">
                                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                                    💾 存储器篇
                                </h3>
                                <ul className="space-y-4 text-lg font-medium text-green-900">
                                    <li className="flex items-center gap-3">
                                        <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                                        <span><strong>RAM</strong> 是桌，断电就没货。</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                                        <span><strong>ROM</strong> 是书，断电也不输。</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                                        <span><strong>Cache</strong> 是手心，CPU 最亲。</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:scale-105 transition-transform">
                                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    🌐 网络篇
                                </h3>
                                <div className="flex flex-col items-center justify-center h-full pb-8">
                                    <p className="text-2xl font-bold text-blue-900 text-center leading-loose">
                                        <span className="text-3xl">LAN</span> 小 <span className="text-3xl">WAN</span> 大<br />
                                        <span className="text-4xl text-red-500 mx-2">IP</span> 走天下
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 11:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-orange-500 p-2 rounded-lg text-white"><HardDrive size={28} /></span>
                            课后作业
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border-l-8 border-orange-500 shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">1. 小小观察员 🕵️‍♂️</h3>
                                <p className="text-gray-600 mb-4">回家查看自家电脑或爸爸妈妈电脑的配置：</p>
                                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                                    <p>👉 内存 (RAM) 是多少 GB？ (例如 16GB)</p>
                                    <p className="mt-2">👉 硬盘 (ROM/外存) 是多少 GB？ (例如 512GB)</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border-l-8 border-purple-500 shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">2. 预习下节课 🔮</h3>
                                <p className="text-gray-600">
                                    下节课我们将揭秘<strong>“字符的密码”</strong>。
                                    请提前查一查：字母 <code className="bg-purple-100 text-purple-800 px-1 rounded">'A'</code> 在电脑里对应的数字是多少？
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setActiveSection(1)}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition hover:-translate-y-1"
                            >
                                🎉 课程结束，回到首页
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Error</div>;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
                <span className="font-bold text-indigo-700">GESP C++ L2-01</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-gray-100 rounded-lg">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-6 border-b border-gray-100 bg-indigo-50/50">
                    <h1 className="text-xl font-extrabold text-indigo-800 flex items-center gap-2">
                        <Cpu className="text-indigo-600" /> C++ 趣味课堂
                    </h1>
                    <p className="text-xs text-indigo-500 mt-1 font-bold">等级：GESP 二级</p>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {sections.map((section, idx) => {
                        const isCategoryStart = idx === 0 || sections[idx - 1].category !== section.category;
                        return (
                            <React.Fragment key={section.id}>
                                {isCategoryStart && (
                                    <div className="px-3 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        {section.category}
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 group
                    ${activeSection === section.id
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-bold'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex-shrink-0">
                                        {visitedSections.has(section.id) && activeSection !== section.id ? (
                                            <CheckCircle2 size={18} className="text-green-500" />
                                        ) : (
                                            <Icon name={section.icon} size={18} className={activeSection === section.id ? "text-indigo-200" : "text-gray-400 group-hover:text-indigo-400"} />
                                        )}
                                    </div>
                                    <span className="truncate text-sm">{section.title.split('：')[0]}</span>
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full pt-16 md:pt-0 relative">
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200 w-full">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${(activeSection / totalSections) * 100}%` }}
                    ></div>
                </div>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-10">
                    <div className="max-w-4xl mx-auto min-h-[500px]">
                        {renderContent()}
                    </div>
                </main>

                {/* Navigation Footer */}
                <footer className="bg-white border-t border-gray-200 p-4 md:px-10 h-20 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition
              ${activeSection === 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'}`}
                    >
                        <ArrowRight className="rotate-180" size={20} /> 上一步
                    </button>

                    <div className="text-gray-400 font-mono text-sm hidden md:block">
                        {activeSection} / {totalSections}
                    </div>

                    <button
                        onClick={nextSection}
                        disabled={activeSection === totalSections}
                        className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition
              ${activeSection === totalSections
                                ? 'bg-gray-300 text-white cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'}`}
                    >
                        {activeSection === totalSections ? "完成" : "下一步"} <ArrowRight size={20} />
                    </button>
                </footer>
            </div>
        </div>
    );
}