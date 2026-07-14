import { useState } from 'react';
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
export const Icon = ({ name, size = 24, className = "" }) => {
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
export const DataScaleVisualizer = () => {
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

// --- 组件：断电模拟器 (Page 2) ---
export const PowerOutageSim = () => {
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
export const MemorySpeedRace = () => {
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
export const StorageTriad = () => {
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
export const NetworkVisual = () => {
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

export const DNSVisual = () => {
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
export const IPDeliverySim = () => {
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
export const Quiz = ({ question, options, correctIndex, explanation }) => {
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
