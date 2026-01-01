import React, { useState, useEffect, useRef } from 'react';
import { Globe, Search, Database, Code, Shield, Download, ArrowRight, Play, RefreshCw, Smartphone, Key, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// --- Shared Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        secondary: "bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.4)]",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = ({ code }) => (
    <div className="bg-black/50 text-cyan-50 p-4 rounded-xl font-mono text-sm shadow-inner border border-cyan-900/50 overflow-x-auto backdrop-blur-sm">
        <pre>{code}</pre>
    </div>
);

// --- Sections ---

// 1. HTTP Request Simulator
const RequestSlide = () => {
    const [url, setUrl] = useState('https://news.fake/tech');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [response, setResponse] = useState(null);

    const sendRequest = () => {
        setStatus('loading');
        setResponse(null);
        setTimeout(() => {
            if (Math.random() > 0.8) {
                setStatus('error');
                setResponse({ code: 404, status: 'Not Found' });
            } else {
                setStatus('success');
                setResponse({
                    code: 200,
                    status: 'OK',
                    headers: { 'Content-Type': 'text/html', 'Server': 'FakeServer/1.0' },
                    body: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>今日科技头条</h1>\n  <ul class="news">\n    <li>AI 机器人学会了画画</li>\n    <li>SpaceX 发射成功</li>\n  </ul>\n</body>\n</html>'
                });
            }
        }, 1200);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <Globe size={20} /> 发送 HTTP 请求 (requests.get)
                </h3>
                <p className="text-slate-300 mb-6">
                    互联网就像一个巨大的图书馆。通过 URL 地址，我们可以向服务器“借阅”网页内容。
                </p>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-4 shadow-xl">
                    <div className="flex gap-2">
                        <div className="bg-slate-800 px-3 py-2 rounded text-slate-400 font-mono font-bold select-none border border-slate-700">GET</div>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded px-4 text-slate-200 font-mono focus:border-cyan-500 outline-none transition-colors"
                        />
                        <Button onClick={sendRequest} disabled={status === 'loading'} className="min-w-[100px]">
                            {status === 'loading' ? <RefreshCw className="animate-spin" /> : '发送请求'}
                        </Button>
                    </div>

                    {/* Timeline / Visualizer */}
                    <div className="h-20 flex items-center justify-between px-8 relative">
                        {/* Connection Line */}
                        <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-700 -z-10"></div>

                        {/* Client Node */}
                        <div className="bg-slate-700 p-2 rounded-lg border border-slate-600 flex flex-col items-center gap-1 z-10 w-24">
                            <Smartphone size={20} className="text-slate-400" />
                            <span className="text-xs text-slate-400">Client</span>
                        </div>

                        {/* Moving Packet */}
                        {status === 'loading' && (
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-ping" style={{ transform: 'translate(-50%, -50%)' }}></div>
                        )}

                        {/* Server Node */}
                        <div className="bg-slate-700 p-2 rounded-lg border border-slate-600 flex flex-col items-center gap-1 z-10 w-24">
                            <Database size={20} className={status === 'success' ? 'text-green-400' : 'text-slate-400'} />
                            <span className="text-xs text-slate-400">Server</span>
                        </div>
                    </div>

                    {/* Response Area */}
                    {response && (
                        <div className={`rounded-xl border p-4 font-mono text-sm overflow-hidden animate-in fade-in slide-in-from-top-2
                            ${status === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-100' : 'bg-red-900/20 border-red-500/30 text-red-100'}
                        `}>
                            <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                                <span className="font-bold">Status: {response.code} {response.status}</span>
                                <span className="text-xs opacity-70">Time: 1.2s</span>
                            </div>
                            <pre className="max-h-40 overflow-y-auto custom-scrollbar">
                                {response.body || 'Request Failed'}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 2. HTML Parser Slide
const ParserSlide = () => {
    const htmlCode = `
<div id="content">
  <h1>Top Movies</h1>
  <ul class="list">
    <li><span class="title">The Matrix</span> <span class="year">(1999)</span></li>
    <li><span class="title">Inception</span> <span class="year">(2010)</span></li>
    <li><span class="title">Interstellar</span> <span class="year">(2014)</span></li>
  </ul>
</div>
    `.trim();

    const [soupStep, setSoupStep] = useState(0);
    const steps = [
        { desc: '加载 HTML', highlight: '' },
        { desc: 'find("ul", class_="list")', highlight: 'ul' },
        { desc: 'find_all("li")', highlight: 'li' },
        { desc: '提取文字 .text', highlight: 'text' }
    ];

    const nextStep = () => {
        setSoupStep(prev => (prev + 1) % steps.length);
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                    <Search size={20} /> 解析数据 (BeautifulSoup)
                </h3>
                <p className="text-slate-300 mb-6">
                    网页就像一碗杂乱的“汤”（Soup）。我们需要用勺子把想要的“肉丸”（数据）捞出来。
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <CodeBlock code={htmlCode} />
                        <div className="flex gap-2 justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700">
                            <span className="text-sm font-bold text-slate-400">Step {soupStep + 1}: {steps[soupStep].desc}</span>
                            <Button onClick={nextStep} variant="secondary" className="px-3 py-1 text-xs">
                                Next Step <ArrowRight size={14} />
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 text-slate-800 shadow-xl relative overflow-hidden">
                        <div className="border-b-2 border-slate-100 mb-4 pb-2 font-bold text-lg">网页预览</div>
                        <ul className={`list-disc pl-5 space-y-2 transition-all duration-300 ${soupStep >= 1 ? 'bg-orange-100/50 p-2 rounded' : ''}`}>
                            {['The Matrix', 'Inception', 'Interstellar'].map((movie, i) => (
                                <li key={i} className={`transition-all duration-300 ${soupStep >= 2 ? 'scale-105 font-bold text-orange-600' : ''}`}>
                                    {soupStep === 3 ? (
                                        <div className="bg-green-100 border border-green-300 px-2 py-1 rounded text-green-800 shadow-sm inline-block">
                                            "{movie}"
                                        </div>
                                    ) : (
                                        movie
                                    )}
                                    <span className="text-slate-400 font-normal text-sm ml-2">(Year)</span>
                                </li>
                            ))}
                        </ul>

                        {soupStep === 3 && (
                            <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center animate-in fade-in">
                                <div className="bg-slate-800 p-6 rounded-xl border border-green-500 shadow-2xl text-center">
                                    <div className="text-green-400 font-bold mb-2">🎉 提取成功!</div>
                                    <div className="bg-black p-3 rounded text-left font-mono text-sm text-green-300">
                                        ['The Matrix', 'Inception', 'Interstellar']
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


const sections = [
    { id: 1, title: '发送请求 (Requests)', icon: Globe, component: RequestSlide },
    { id: 2, title: '解析数据 (BeautifulSoup)', icon: Search, component: ParserSlide },
];

export default function PythonCrawler() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-900 font-sans text-slate-200 selection:bg-cyan-500/30">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700">
                                <span className="text-lg">🕸️</span>
                            </div>
                        </Link>
                        A4: 网络爬虫
                    </h1>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Python 进阶项目</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium border
                        ${activeSection === section.id
                                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                                    : 'border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                    `}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-cyan-400' : 'text-slate-600'} />
                            {section.title}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800 bg-black/20">
                    <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 rounded-xl p-4 text-slate-300 shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-cyan-500/50 text-xs font-bold uppercase tracking-wider">DONE</span>
                            <Key size={16} className="text-cyan-500/50" />
                        </div>
                        <div className="font-bold text-sm text-cyan-100">全部课程已解锁 🔓</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
                    {/* Background Decor */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))] -z-10"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto">
                        <header className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <span className="p-2 bg-cyan-500/10 rounded-lg">
                                    {React.createElement(sections.find(s => s.id === activeSection)?.icon, { size: 32, className: 'text-cyan-400' })}
                                </span>
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4"></div>
                        </header>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
                            <ActiveComponent />
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
                            ${activeSection === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <ChevronDown className="rotate-90" size={18} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/binary-search');
                            }
                        }}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:-translate-y-0.5`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
