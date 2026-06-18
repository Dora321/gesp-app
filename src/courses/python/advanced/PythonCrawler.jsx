import React, { useState, useEffect, useRef } from 'react';
import { Globe, Search, Database, Code, Shield, Download, ArrowRight, Play, PlayCircle, RefreshCw, Smartphone, Key, ChevronDown, FileText, Layers, Cpu, Bug, CheckCircle, XCircle, AlertTriangle, AlertCircle, Info, Film, Terminal, User, Lock, Unlock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PythonProjectSupport from '../../../components/PythonProjectSupport';

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

// 1. Introduction Slide
const IntroSlide = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

                <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                    <Bug size={28} /> 什么是网络爬虫？
                </h3>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            网络爬虫（Web Crawler），也叫网络蜘蛛（Spider），是一种按照一定规则，自动抓取万维网信息的程序。
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                                <div className="mt-1 bg-cyan-500/20 p-2 rounded text-cyan-400 flex-shrink-0"><Globe size={18} /></div>
                                <div>
                                    <strong className="block text-cyan-100 mb-1">像蜘蛛一样</strong>
                                    <span className="text-sm opacity-80">顺着链接（网线）在巨大的互联网网络上爬行，访问一个又一个节点。</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                                <div className="mt-1 bg-purple-500/20 p-2 rounded text-purple-400 flex-shrink-0"><Database size={18} /></div>
                                <div>
                                    <strong className="block text-purple-100 mb-1">搬运工</strong>
                                    <span className="text-sm opacity-80">把网页上的数据（文字、图片、视频）批量搬运回本地数据库，供我们分析使用。</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                                <div className="mt-1 bg-yellow-500/20 p-2 rounded text-yellow-400 flex-shrink-0"><Search size={18} /></div>
                                <div>
                                    <strong className="block text-yellow-100 mb-1">搜索引擎的基础</strong>
                                    <span className="text-sm opacity-80">Google 和百度每天运行着数亿只爬虫，把全世界的网页都“爬”下来建立索引。</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="relative h-80 bg-slate-900/80 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden p-8 shadow-2xl">
                        {/* Network Web Visual */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Central Hub */}
                            <div className="absolute w-24 h-24 bg-cyan-900/30 rounded-full blur-xl animate-pulse"></div>

                            {/* Spider Node */}
                            <div className="flex flex-col items-center z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                                <Bug size={64} className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]" />
                                <div className="mt-4 px-3 py-1 bg-cyan-900/80 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-300">
                                    SPIDER_BOT_v1.0
                                </div>
                            </div>

                            {/* Connected Nodes */}
                            {[0, 72, 144, 216, 288].map((deg, i) => (
                                <div key={i} className="absolute w-full h-full animate-[spin_10s_linear_infinite]" style={{ animationDelay: `-${i * 2}s` }}>
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2 h-32 bg-gradient-to-b from-cyan-500/20 to-transparent origin-bottom" style={{ transform: `rotate(${deg}deg)` }}></div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center text-xs text-slate-500 shadow-lg"
                                        style={{ transform: `rotate(${deg}deg) translateY(20px)` }}>
                                        <Code size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. HTTP Request Simulator (Requests)
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

// 3. Robots Protocol Slide
const RobotsSlide = () => {
    const [path, setPath] = useState('/private/data');
    const [result, setResult] = useState(null);

    const robotsTxt = "User-agent: *\n" +
        "Disallow: /private/\n" +
        "Disallow: /admin/\n" +
        "Allow: /public/\n";

    const checkRobots = () => {
        const isAllowed = !path.startsWith('/private/') && !path.startsWith('/admin/');
        setResult({
            allowed: isAllowed,
            message: isAllowed ? 'Access Allowed' : 'Access Denied by robots.txt'
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <Shield size={20} /> 爬虫协议 (Robots.txt)
                </h3>
                <p className="text-slate-300 mb-6">
                    在抓取网站之前，有礼貌的爬虫会先检查 `robots.txt`，看看主人允许进入哪些房间。
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="text-sm text-slate-400 font-bold">https://example.com/robots.txt</div>
                        <CodeBlock code={robotsTxt} />
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">尝试访问的路径:</label>
                            <div className="flex gap-2">
                                <input
                                    value={path}
                                    onChange={(e) => setPath(e.target.value)}
                                    className="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-slate-200 outline-none focus:border-yellow-500"
                                    placeholder="/path/to/check"
                                />
                                <Button onClick={checkRobots} variant="primary" className="bg-yellow-500 hover:bg-yellow-400 text-black shadow-none">
                                    检查
                                </Button>
                            </div>
                        </div>

                        {result && (
                            <div className={`p-4 rounded-lg border flex items-center gap-3 ${result.allowed
                                ? 'bg-green-900/30 border-green-500/50 text-green-400'
                                : 'bg-red-900/30 border-red-500/50 text-red-400'
                                }`}>
                                {result.allowed ? <ArrowRight className="bg-green-500 text-black rounded-full p-0.5" size={16} /> : <Shield size={16} />}
                                <span className="font-bold">{result.message}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. HTTP Status Codes Slide
const StatusSlide = () => {
    const [selectedCode, setSelectedCode] = useState(null);
    const [response, setResponse] = useState(null);

    const codes = [
        { code: 200, status: 'OK', color: 'green', desc: '请求成功', detail: '服务器成功处理了请求。这是我们最想看到的结果。' },
        { code: 403, status: 'Forbidden', color: 'orange', desc: '禁止访问', detail: '服务器理解请求，但是拒绝执行。通常是因为反爬虫机制（如缺少 User-Agent）。' },
        { code: 404, status: 'Not Found', color: 'yellow', desc: '未找到', detail: '服务器找不到请求的网页。检查 URL 是否写对，或者页面是否已删除。' },
        { code: 500, status: 'Server Error', color: 'red', desc: '服务器错误', detail: '服务器内部出错了。这通常不是爬虫的问题，是网站挂了。' },
    ];

    const testCode = (item) => {
        setSelectedCode(item);
        setResponse(null);
        setTimeout(() => {
            setResponse(item);
        }, 300);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <Info size={20} /> HTTP 状态码 (Status Codes)
                </h3>
                <p className="text-slate-300 mb-6">
                    服务器通过状态码告诉我们请求的结果。就像红绿灯一样，指导爬虫的下一步行动。
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="grid grid-cols-2 gap-4 h-min">
                        {codes.map(item => (
                            <button
                                key={item.code}
                                onClick={() => testCode(item)}
                                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200
                                    ${selectedCode?.code === item.code
                                        ? `bg-${item.color}-500/20 border-${item.color}-500 shadow-[0_0_15px_rgba(var(--${item.color}-500),0.3)] transform scale-105`
                                        : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200'}
                                `}
                            >
                                <div className={`text-2xl font-black ${selectedCode?.code === item.code ? `text-${item.color}-400` : ''}`}>{item.code}</div>
                                <div className="text-xs font-bold">{item.status}</div>
                            </button>
                        ))}
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex items-center justify-center min-h-[250px] relative overflow-hidden">
                        {response ? (
                            <div className="text-center space-y-4 animate-in zoom-in duration-300 relative z-10 p-4">
                                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center border-4 border-${response.color}-500 shadow-xl bg-slate-800`}>
                                    {response.code === 200 && <CheckCircle size={40} className={`text-${response.color}-500`} />}
                                    {response.code === 403 && <Shield size={40} className={`text-${response.color}-500`} />}
                                    {response.code === 404 && <Search size={40} className={`text-${response.color}-500`} />}
                                    {response.code === 500 && <AlertCircle size={40} className={`text-${response.color}-500`} />}
                                </div>
                                <div>
                                    <div className={`text-3xl font-bold text-${response.color}-400 mb-2`}>
                                        {response.code} {response.desc}
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                        {response.detail}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-slate-600">
                                <div className="text-6xl mb-4 opacity-20">?</div>
                                <div>点击左侧按钮查看状态码含义</div>
                            </div>
                        )}

                        {/* Background Effect */}
                        {response && (
                            <div className={`absolute inset-0 bg-${response.color}-500/5 pointer-events-none transition-colors duration-500`}></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Headers & User-Agent Slide
const HeadersSlide = () => {
    const [userAgent, setUserAgent] = useState('python-requests/2.28.1');
    const [status, setStatus] = useState(null); // 'idle', 'blocked', 'success'

    const tryAccess = () => {
        if (userAgent.includes('python')) {
            setStatus('blocked');
        } else {
            setStatus('success');
        }
    };

    const switchToBrowser = () => {
        setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...');
        setStatus('idle');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    <Key size={20} /> 伪装头部 (User-Agent)
                </h3>
                <p className="text-slate-300 mb-6">
                    有些网站拒绝机器访问。我们需要把爬虫“伪装”成普通的浏览器。
                </p>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Current User-Agent:</label>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-xs text-slate-300 break-all border border-slate-800 flex justify-between items-center gap-4">
                            {userAgent}
                            {userAgent.includes('python') && (
                                <button
                                    onClick={switchToBrowser}
                                    className="px-2 py-1 bg-slate-700 text-cyan-400 rounded text-xs hover:bg-slate-600 whitespace-nowrap transition-colors"
                                >
                                    切换为浏览器
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-8 bg-slate-800/50 rounded-xl relative overflow-hidden">
                        {status === 'blocked' && (
                            <div className="text-center animate-in zoom-in-50 duration-300">
                                <div className="text-6xl mb-2">🚫</div>
                                <div className="text-red-400 font-bold text-lg">403 Forbidden</div>
                                <div className="text-slate-500 text-sm">检测到爬虫脚本，拒绝访问</div>
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="text-center animate-in zoom-in-50 duration-300">
                                <div className="text-6xl mb-2">✅</div>
                                <div className="text-green-400 font-bold text-lg">200 OK</div>
                                <div className="text-slate-500 text-sm">欢迎访问，尊贵的浏览器用户</div>
                            </div>
                        )}
                        {!status && (
                            <div className="text-center text-slate-600">
                                <div className="text-4xl mb-2">🔒</div>
                                <div>点击下方按钮尝试访问</div>
                            </div>
                        )}
                    </div>

                    <Button onClick={tryAccess} className={`w-full ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-500 hover:bg-pink-600'}`}>
                        {status === 'success' ? '访问成功' : '发起访问'}
                    </Button>
                </div>
            </div>
        </div>
    );
};


// 5. Pagination Slide
const PaginationSlide = () => {
    const [page, setPage] = useState(1);
    const [crawledData, setCrawledData] = useState([]);
    const [isCrawling, setIsCrawling] = useState(false);

    // Simulate data for 3 pages
    const pageData = {
        1: [{ id: 101, title: 'Python Basics' }, { id: 102, title: 'Advanced Loops' }],
        2: [{ id: 103, title: 'Data Structures' }, { id: 104, title: 'OOP Design' }],
        3: [{ id: 105, title: 'Web Scraping' }, { id: 106, title: 'Async IO' }],
    };

    const crawlAll = async () => {
        setIsCrawling(true);
        setCrawledData([]);

        for (let p = 1; p <= 3; p++) {
            setPage(p);
            // Simulate network delay
            await new Promise(r => setTimeout(r, 800));
            setCrawledData(prev => [...prev, ...pageData[p]]);
        }

        setIsCrawling(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-violet-400 mb-4 flex items-center gap-2">
                    <Layers size={20} /> 分页处理 (Pagination)
                </h3>
                <p className="text-slate-300 mb-6">
                    真正的数据通常分布在多页及其它页面。我们需要分析 URL 规律 (例如 `page=1, page=2`)，用循环来遍历抓取。
                </p>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-6">
                    <div className="flex items-center justify-between bg-black/40 p-4 rounded-lg border border-slate-800">
                        <div className="font-mono text-cyan-300 text-sm">
                            url = f"https://kjs.cn/course?page=<span className="text-yellow-400 font-bold">{page}</span>"
                        </div>
                        <Button onClick={crawlAll} disabled={isCrawling} variant="primary" className="bg-violet-600 text-white hover:bg-violet-500 shadow-none">
                            {isCrawling ? <RefreshCw className="animate-spin" /> : <span className="flex items-center gap-2"><Play size={16} /> 自动翻页抓取</span>}
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-400 mb-1">
                            <span>Crawling Progress</span>
                            <span>Page {page} / 3</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
                                style={{ width: `${(page / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {[1, 2, 3].map(p => (
                            <div key={p} className={`p-4 rounded-xl border transition-all duration-300 ${p < page || (p === page && !isCrawling && crawledData.length > 0)
                                ? 'bg-green-900/20 border-green-500/30 opacity-100'
                                : p === page && isCrawling
                                    ? 'bg-violet-900/20 border-violet-500/50 animate-pulse'
                                    : 'bg-slate-800/50 border-slate-700 opacity-50'
                                }`}>
                                <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Page {p}</div>
                                {pageData[p].map(item => (
                                    <div key={item.id} className="flex items-center gap-2 text-sm text-slate-300 mb-1">
                                        <FileText size={14} className="text-slate-500" />
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {crawledData.length > 0 && (
                        <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700 text-center">
                            <span className="text-sm text-slate-400">Total Items Collected: </span>
                            <span className="text-xl font-bold text-white ml-2">{crawledData.length}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 6. Data Storage Slide
const StorageSlide = () => {
    const [format, setFormat] = useState('csv'); // csv, json

    const sampleData = [
        { title: 'The Matrix', year: 1999, rating: 8.7 },
        { title: 'Inception', year: 2010, rating: 8.8 },
        { title: 'Interstellar', year: 2014, rating: 8.6 },
    ];

    const getCode = () => {
        if (format === 'csv') {
            return `import csv

with open('movies.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Title', 'Year', 'Rating'])
    for movie in movies:
        writer.writerow([movie['title'], movie['year'], movie['rating']])`;
        } else {
            return `import json

with open('movies.json', 'w') as f:
    json.dump(movies, f, indent=4)`;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Database size={20} /> 数据存储 (Storage)
                </h3>
                <p className="text-slate-300 mb-6">
                    爬取的数据通常需要保存保存下来。常用的格式有 CSV (表格) 和 JSON (结构化数据)。
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex gap-2 mb-2">
                            <button
                                onClick={() => setFormat('csv')}
                                className={`flex-1 py-2 rounded-lg font-bold text-sm border transition-all ${format === 'csv' ? 'bg-green-500 text-black border-green-500' : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                                    }`}
                            >
                                Save as CSV
                            </button>
                            <button
                                onClick={() => setFormat('json')}
                                className={`flex-1 py-2 rounded-lg font-bold text-sm border transition-all ${format === 'json' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                                    }`}
                            >
                                Save as JSON
                            </button>
                        </div>
                        <CodeBlock code={getCode()} />
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-2 right-2 px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400 border border-slate-700">
                            movies.{format}
                        </div>

                        <div className="mt-8 font-mono text-sm text-slate-300 overflow-x-auto">
                            {format === 'csv' ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-600 text-emerald-400">
                                            <th className="py-1">Title</th>
                                            <th className="py-1">Year</th>
                                            <th className="py-1">Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.map((row, i) => (
                                            <tr key={i} className="border-b border-slate-800/50">
                                                <td className="py-1">{row.title}</td>
                                                <td className="py-1">{row.year}</td>
                                                <td className="py-1">{row.rating}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <pre className="text-yellow-100">
                                    {`[
  {
    "title": "The Matrix",
    "year": 1999,
    "rating": 8.7
  },
  {
    "title": "Inception",
    "year": 2010,
    "rating": 8.8
  },
  ...
]`}
                                </pre>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <CheckCircle size={14} className="text-emerald-500" /> File Saved Successfully
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 7. Practice Challenge
const PracticeSlide = () => {
    const [steps, setSteps] = useState([
        { id: 1, type: 'import', code: 'import requests', correct: true, selected: false },
        { id: 2, type: 'req', code: 'requests.get(url)', correct: true, selected: false },
        { id: 3, type: 'soup', code: 'BeautifulSoup(res.text)', correct: true, selected: false },
        { id: 4, type: 'find', code: 'soup.find_all("h1")', correct: true, selected: false },
    ]);
    const [isComplete, setIsComplete] = useState(false);

    const toggleStep = (id) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
    };

    const checkSolution = () => {
        if (steps.every(s => s.selected)) {
            setIsComplete(true);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Cpu size={20} /> 实战挑战 (Challenge)
                </h3>
                <p className="text-slate-300 mb-6">
                    任务：组装一个完整的爬虫，抓取网页标题。请按正确顺序点亮代码块。
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                onClick={() => toggleStep(step.id)}
                                className={`p-4 rounded-xl border border-slate-700 cursor-pointer transition-all duration-200 flex items-center gap-4
                                    ${step.selected
                                        ? 'bg-cyan-900/30 border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:border-slate-600'}
                                `}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step.selected ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-500'}`}>
                                    {index + 1}
                                </div>
                                <code className="font-mono text-sm">{step.code}</code>
                                {step.selected && <CheckCircle size={18} className="ml-auto text-cyan-400" />}
                            </div>
                        ))}
                    </div>

                    <div className="bg-black/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        {isComplete ? (
                            <div className="space-y-4 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                    <CheckCircle size={40} className="text-white" />
                                </div>
                                <h4 className="text-2xl font-bold text-white">挑战成功!</h4>
                                <p className="text-green-400">你已经掌握了爬虫的基本流程。</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700">
                                    <Bug size={32} className="text-slate-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-500">等待运行...</h4>
                                <Button onClick={checkSolution} variant="primary" className="w-full">
                                    运行爬虫
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 8. Project: Douban Top 250
const DoubanProjectSlide = () => {
    const [stage, setStage] = useState(1); // 1: Recon, 2: Camouflage, 3: Crawl

    // Stage 1: Recon State
    const [hoveredItem, setHoveredItem] = useState(null);

    // Stage 2: Camouflage State
    const [useHeaders, setUseHeaders] = useState(false);
    const [camouStatus, setCamouStatus] = useState('idle'); // idle, loading, success, fail

    // Stage 3: Crawl State
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    // --- Helpers ---
    const runCamouTest = () => {
        setCamouStatus('loading');
        setTimeout(() => {
            if (useHeaders) {
                setCamouStatus('success');
            } else {
                setCamouStatus('fail');
            }
        }, 1200);
    };

    const runCrawler = async () => {
        setIsRunning(true);
        setLogs([]);

        const addLog = (msg) => setLogs(prev => [...prev, msg]);

        addLog("🕷️ 小蜘蛛正在出发...");
        await new Promise(r => setTimeout(r, 800));

        addLog("✅ 成功进入豆瓣！开始解析数据...");
        await new Promise(r => setTimeout(r, 800));

        addLog("📦 这一页一共找到了 3 部电影。\n");
        addLog("------------------------------");

        const movies = [
            { title: "肖申克的救赎", score: "9.7", quote: "希望让人自由。" },
            { title: "霸王别姬", score: "9.6", quote: "风华绝代。" },
            { title: "阿甘正传", score: "9.5", quote: "生活就像一盒巧克力。" }
        ];

        for (const m of movies) {
            await new Promise(r => setTimeout(r, 600));
            addLog(`🎬 电影：${m.title}`);
            addLog(`⭐ 评分：${m.score}`);
            addLog(`💬 简评：${m.quote}`);
            addLog("------------------------------");
        }

        addLog("\n✨ 抓取完成！");
        setIsRunning(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                        <Film size={20} /> 实战案例：豆瓣电影 Top 250
                    </h3>
                    <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                        {[1, 2, 3, 4].map(s => (
                            <button
                                key={s}
                                onClick={() => setStage(s)}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${stage === s ? 'bg-green-500 text-black' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {s === 4 ? "完整代码" : `Step ${s}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stage 1: Reconnaissance */}
                {stage === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl text-orange-200 text-sm mb-4">
                            <strong className="block mb-1 text-orange-400 flex items-center gap-2"><Search size={16} /> 侦察任务</strong>
                            也就是 F12 开发者工具。我们需要找到装着电影数据的那个<span>"快递包裹"</span> (<code className="bg-black/30 px-1 rounded">class="item"</code>)。
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Mock Browser View */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl border border-slate-600">
                                <div className="bg-slate-100 px-3 py-2 border-b flex items-center gap-2">
                                    <div className="flex gap-1"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                                    <div className="bg-white px-2 py-0.5 rounded text-xs text-slate-500 flex-1 text-center border">movie.douban.com</div>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="text-xl font-bold text-slate-800 border-b pb-2">豆瓣电影 Top 250</div>
                                    <div className="space-y-3">
                                        {[
                                            { title: "肖申克的救赎", score: 9.7 },
                                            { title: "霸王别姬", score: 9.6 }
                                        ].map((m, i) => (
                                            <div
                                                key={i}
                                                onMouseEnter={() => setHoveredItem(i)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                className={`flex gap-3 p-2 rounded transition-all cursor-crosshair border-2 ${hoveredItem === i ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-transparent hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="w-16 h-24 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">Cover</div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-blue-600 flex gap-2">
                                                        {m.title}
                                                        {hoveredItem === i && <span className="bg-red-500 text-white text-[10px] px-1 rounded ml-auto animate-pulse">Selected</span>}
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-1">1994 / 美国 / 犯罪</div>
                                                    <div className="mt-2 text-orange-400 font-bold text-sm">★ {m.score}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Code Inspector View */}
                            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700 flex flex-col">
                                <div className="text-slate-500 mb-2 border-b border-slate-800 pb-2 text-xs">Elements Console</div>
                                <div className="space-y-1 overflow-y-auto flex-1 text-slate-400">
                                    <div className="pl-4 text-purple-400">&lt;div id="content"&gt;</div>
                                    <div className="pl-8 text-purple-400">&lt;h1&gt;<span className="text-white">豆瓣电影 Top 250</span>&lt;/h1&gt;</div>
                                    <div className="pl-8 text-purple-400">&lt;ol class="grid_view"&gt;</div>

                                    {[0, 1].map(i => (
                                        <div key={i} className={`pl-12 transition-all duration-200 ${hoveredItem === i ? 'bg-blue-900/40 text-blue-200 -mx-4 pl-16 py-1 border-l-2 border-blue-500' : ''}`}>
                                            <span className="text-purple-400">&lt;div class="<span className="text-yellow-400 font-bold">item</span>"&gt;</span>
                                            {hoveredItem === i && (
                                                <div className="pl-4 text-xs text-slate-500 my-1 animate-in fade-in">
                                                    &lt;!-- 这里装着 {i === 0 ? "肖申克的救赎" : "霸王别姬"} 的所有信息 --&gt;
                                                </div>
                                            )}
                                            <div className="pl-4">...</div>
                                            <span className="text-purple-400">&lt;/div&gt;</span>
                                        </div>
                                    ))}

                                    <div className="pl-8 text-purple-400">&lt;/ol&gt;</div>
                                    <div className="pl-4 text-purple-400">&lt;/div&gt;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage 2: Camouflage */}
                {stage === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl text-purple-200 text-sm mb-4">
                            <strong className="block mb-1 text-purple-400 flex items-center gap-2"><Shield size={16} /> 伪装术 (User-Agent)</strong>
                            直接访问会被服务器认出是 Python 脚本。我们要给爬虫戴上“浏览器面具”。
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <div
                                    onClick={() => setUseHeaders(!useHeaders)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${useHeaders ? 'bg-green-900/20 border-green-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${useHeaders ? 'bg-green-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                                            {useHeaders ? <User size={20} /> : <Bug size={20} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{useHeaders ? "伪装：浏览器 (Browser)" : "默认：Python 脚本"}</div>
                                            <div className="text-xs text-slate-400 font-mono mt-1">
                                                {useHeaders ? "User-Agent: Mozilla/5.0..." : "User-Agent: python-requests/2.28"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${useHeaders ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>
                                        {useHeaders && <CheckCircle size={14} className="text-black" />}
                                    </div>
                                </div>

                                <Button
                                    onClick={runCamouTest}
                                    disabled={camouStatus === 'loading'}
                                    className="w-full"
                                    variant={camouStatus === 'fail' ? 'primary' : 'primary'} // Keep simplified
                                >
                                    {camouStatus === 'loading' ? <RefreshCw className="animate-spin" /> : '发送请求 (requests.get)'}
                                </Button>
                            </div>

                            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                                {camouStatus === 'idle' && (
                                    <div className="text-slate-600 text-center">
                                        <Download size={48} className="mx-auto mb-2 opacity-20" />
                                        等待请求...
                                    </div>
                                )}

                                {camouStatus === 'fail' && (
                                    <div className="text-center animate-in zoom-in duration-300">
                                        <div className="text-5xl mb-2">🚫</div>
                                        <div className="text-red-400 font-bold text-lg">418 I'm a teapot</div>
                                        <div className="text-slate-500 text-sm mt-1">服务器拒绝了你的访问</div>
                                        <div className="text-red-900/50 text-xs mt-2 border border-red-900/30 px-2 py-1 rounded">Error: Anti-Crawler mechanism triggered</div>
                                    </div>
                                )}

                                {camouStatus === 'success' && (
                                    <div className="text-center animate-in zoom-in duration-300">
                                        <div className="text-5xl mb-2">✅</div>
                                        <div className="text-green-400 font-bold text-lg">200 OK</div>
                                        <div className="text-slate-500 text-sm mt-1">成功获取网页数据</div>
                                        <div className="flex gap-2 justify-center mt-3">
                                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">&lt;html&gt;...</span>
                                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">25 items</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage 3: Coding & Execution */}
                {stage === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-blue-200 text-sm mb-4">
                            <strong className="block mb-1 text-blue-400 flex items-center gap-2"><Code size={16} /> 编写代码 (Coding)</strong>
                            将“请求”、“熬汤”、“找包裹”、“拆包裹”组合起来，就是完整的爬虫。
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 h-[400px]">
                            <div className="relative group h-full">
                                <div className="absolute top-2 right-2 z-10">
                                    <Button
                                        onClick={runCrawler}
                                        disabled={isRunning}
                                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 h-8"
                                    >
                                        {isRunning ? <RefreshCw className="animate-spin w-4 h-4" /> : <Play className="w-4 h-4 mr-1" />}
                                        点运行看效果
                                    </Button>
                                </div>
                                <div className="h-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                                    <CodeBlock code={`import requests
from bs4 import BeautifulSoup

def scrape_douban():
    # 1. 伪装
    headers = { "User-Agent": "Mozilla/5.0..." }
    
    # 2. 请求
    resp = requests.get(url, headers=headers)
    
    # 3. 熬汤 & 找包裹
    soup = BeautifulSoup(resp.text, "html.parser")
    movie_list = soup.find_all("div", class_="item")
    
    # 4. 拆包裹
    for movie in movie_list:
        title = movie.find("span", class_="title").text
        score = movie.find("span", class_="rating_num").text
        print(f"🎬 {title} ⭐ {score}")`} />
                                </div>
                            </div>

                            <div className="bg-black rounded-xl border border-slate-700 p-4 font-mono text-xs overflow-y-auto custom-scrollbar h-full flex flex-col shadow-inner">
                                <div className="text-slate-500 border-b border-white/10 pb-2 mb-2 flex items-center gap-2">
                                    <Terminal size={14} /> Output Console
                                </div>
                                <div className="space-y-1 flex-1">
                                    {logs.length === 0 && !isRunning && <span className="text-slate-600 italic">Click "点运行看效果" to start...</span>}
                                    {logs.map((log, i) => (
                                        <div key={i} className={`animate-in fade-in slide-in-from-left-2 ${log.includes('❌') ? 'text-red-400' : 'text-slate-300'}`}>
                                            {log}
                                        </div>
                                    ))}
                                    {isRunning && <div className="w-2 h-4 bg-slate-500 animate-pulse inline-block align-middle ml-1"></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage 4: Full Code */}
                {stage === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-200 text-sm mb-4">
                            <strong className="block mb-1 text-emerald-400 flex items-center gap-2"><CheckCircle size={16} /> 完整 Python 脚本</strong>
                            您可以直接点击右上角“复制”，粘贴到你的本地编辑器（如 PyCharm 或 VS Code）中直接运行。
                        </div>

                        <div className="bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden">
                            <div className="bg-black/40 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                                <span className="text-xs font-mono text-slate-500">douban_spider.py</span>
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                </div>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                <CodeBlock code={`# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
import time

def get_douban_top250():
    # 豆瓣电影 Top 250 地址
    base_url = "https://movie.douban.com/top250"
    
    # 伪装浏览器头部，否则会被豆瓣屏蔽 (返回 418)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    }

    try:
        print("正在抓取豆瓣电影数据，请稍候...")
        # 发起 HTTP GET 请求
        response = requests.get(base_url, headers=headers)
        
        # 检查是否成功 (200 表示成功)
        if response.status_code == 200:
            # 使用 BeautifulSoup 解析 HTML 源码
            soup = BeautifulSoup(response.text, "html.parser")
            
            # 找到所有电影条目的包裹层
            items = soup.find_all("div", class_="item")
            
            print(f"--- 抓取成功，本页共找到 {len(items)} 部电影 ---")
            print("-" * 50)
            
            for item in items:
                # 提取标题 (第一个 span.title)
                title = item.find("span", class_="title").text
                # 提取评分
                rating = item.find("span", class_="rating_num").text
                # 提取简评 (有些电影没有简评，需要做判断)
                quote_node = item.find("span", class_="inq")
                quote = quote_node.text if quote_node else "暂无简评"
                
                print(f"🎬 电影：{title}")
                print(f"⭐ 评分：{rating}")
                print(f"💬 简评：{quote}")
                print("-" * 50)
                
                # 适当暂停，做一个有礼貌的爬虫
                time.sleep(0.1)
        else:
            print(f"❌ 抓取失败！状态码：{response.status_code}")
            if response.status_code == 418:
                print("警报：你被豆瓣认出是爬虫了！请检查 Headers 伪装。")

    except Exception as e:
        print(f"❌ 发生异常错误: {e}")

if __name__ == "__main__":
    get_douban_top250()`} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 9. Project: Bing Wallpaper
const BingWallpaperProjectSlide = () => {
    const [activeTab, setActiveTab] = useState('api'); // api, code

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                        <Download size={20} /> 项目二：必应 (Bing) 壁纸下载器
                    </h3>
                    <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setActiveTab('api')}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'api' ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            1. API 揭秘
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            2. 编写代码
                        </button>
                    </div>
                </div>

                {activeTab === 'api' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-blue-200 text-sm">
                            <strong className="block mb-2 text-blue-400">🔍 必应隐藏 API</strong>
                            <p className="mb-2">必应搜索每天的背景图都非常精美。他们有一个公开的接口供我们获取：</p>
                            <code className="block bg-black/50 p-2 rounded text-cyan-300 font-mono text-xs break-all">
                                https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
                            </code>
                            <ul className="mt-3 space-y-2 text-slate-400 list-disc list-inside">
                                <li><code className="text-orange-300">format=js</code>: 返回 JSON 格式数据</li>
                                <li><code className="text-orange-300">idx=0</code>: 0表示今天，1表示昨天，以此类推</li>
                                <li><code className="text-orange-300">n=1</code>: 返回图片的数量</li>
                            </ul>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                            <div className="text-xs text-slate-500 mb-2 font-mono">API Response Preview (JSON)</div>
                            <pre className="text-xs font-mono text-green-400 overflow-x-auto">
                                {`{
  "images": [
    {
      "startdate": "20231024",
      "fullstartdate": "202310241600",
      "enddate": "20231025",
      "url": "/th?id=OHR.RedSquirrel_ZH-CN8668738367_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      "urlbase": "/th?id=OHR.RedSquirrel_ZH-CN8668738367",
      "copyright": "红松鼠 (© MST/Getty Images)",
      ...
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <p className="text-slate-300 text-sm">
                            我们需要做三件事：1. 请求API获取JSON；2. 解析出图片URL；3. 下载图片二进制数据并保存。
                        </p>
                        <CodeBlock code={`import requests
import os

def download_bing_wallpaper():
    # 1. 连接必应图库 API
    api_url = "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
    print("正在连接必应图库...")
    
    try:
        # 获取 JSON 数据
        data = requests.get(api_url).json()
        
        # 2. 提取信息
        image_data = data['images'][0]
        img_base = image_data['url']
        copyright_info = image_data['copyright']
        
        # 拼接高清大图地址
        full_img_url = "https://cn.bing.com" + img_base
        print(f"今日壁纸: {copyright_info}")
        
        # 3. 下载并保存
        print("正在下载...")
        img_content = requests.get(full_img_url).content
        
        filename = "bing_today.jpg"
        with open(filename, 'wb') as f:
            f.write(img_content)
            
        print(f"✅ 下载成功！已保存为 {filename}")
        
        # 【注意】二进制文件保存需要用 'wb' 模式 (Write Binary)

    except Exception as e:
        print(f"出错啦: {e}")

download_bing_wallpaper()`} />

                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl text-yellow-200 text-sm">
                            <strong className="block mb-1 text-yellow-400">💡 思考题</strong>
                            接口里的 <code className="bg-black/20 px-1 rounded">idx=0</code> 代表今天。能不能写个 <code className="bg-black/20 px-1 rounded">for</code> 循环，把 <code className="bg-black/20 px-1 rounded">idx</code> 从 0 变到 6，自动把过去一周的壁纸全抓下来？
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 10. Project: Bilibili Hot Crawler
const BilibiliProjectSlide = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2 mb-6">
                    <PlayCircle size={20} /> 项目三：B站热门视频爬虫
                </h3>

                <div className="space-y-6">
                    <div className="bg-pink-500/10 border border-pink-500/30 p-4 rounded-xl text-pink-200 text-sm">
                        <strong className="block mb-2 text-pink-400">📺 目标分析</strong>
                        <p className="mb-2">我们发现 B 站视频链接非常有规律：</p>
                        <code className="block bg-black/50 p-2 rounded text-cyan-300 font-mono text-xs break-all mb-2">
                            https://www.bilibili.com/video/<span className="text-yellow-400">BVxxxxxxxx</span>
                        </code>
                        <p>只要拿到视频的 <strong>BV号</strong>，就能拼接出播放地址！</p>
                    </div>

                    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-slate-700">
                            <span className="text-xs font-mono text-slate-500">bilibili_crawler.py</span>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>
                        <CodeBlock code={`import requests
import csv
import time

def scrape_bilibili_hot_with_urls():
    # B站热门接口
    url = "https://api.bilibili.com/x/web-interface/popular"
    
    params = {
        'ps': 20,  # 每页20条
        'pn': 1    # 第1页
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 ... (记得换成你的UA)',
        'Referer': 'https://www.bilibili.com/v/popular/all'
    }

    print("正在连接 Bilibili 热门视频接口...\\n")
    
    try:
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code == 200:
            json_data = response.json()
            
            if json_data['code'] == 0:
                video_list = json_data['data']['list']
                results = []
                
                for i, video in enumerate(video_list, 1):
                    # 1. 获取基础信息
                    title = video['title']
                    owner = video['owner']['name']
                    bvid = video['bvid']  # 关键的 BV 号
                    
                    # 2. 【关键步骤】拼接视频网址
                    video_url = f"https://www.bilibili.com/video/{bvid}"
                    
                    # 3. 打印到屏幕 (可以在终端直接点击)
                    print(f"{i}. {title}")
                    print(f"   👤 UP主: {owner}")
                    print(f"   🔗 网址: {video_url}") 
                    print("-" * 50)
                    
                    results.append({
                        '排名': i,
                        '标题': title,
                        'UP主': owner,
                        '播放量': video['stat']['view'],
                        '网址': video_url  # 保存到 CSV 里
                    })
                
                return results
            else:
                print("B站返回错误:", json_data['message'])
        else:
            print("网络请求失败")
            
    except Exception as e:
        print(f"发生错误: {e}")
    
    return []

def save_to_csv(data, filename='bilibili_hot_urls.csv'):
    if not data:
        return
    with open(filename, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"\\n✅ 数据已保存至 {filename}")

if __name__ == '__main__':
    data = scrape_bilibili_hot_with_urls()
    save_to_csv(data)`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const sections = [
    { id: 1, title: '课程介绍 (Intro)', icon: Bug, component: IntroSlide },
    { id: 2, title: '爬虫协议 (Robots.txt)', icon: Shield, component: RobotsSlide },
    { id: 3, title: '发送请求 (Requests)', icon: Globe, component: RequestSlide },
    { id: 4, title: 'HTTP 状态码 (Status)', icon: Info, component: StatusSlide },
    { id: 5, title: '伪装头部 (Headers)', icon: Key, component: HeadersSlide },
    { id: 6, title: '解析数据 (BeautifulSoup)', icon: Search, component: ParserSlide },
    { id: 7, title: '实战: 豆瓣 Top 250', icon: Film, component: DoubanProjectSlide },
    { id: 8, title: '分页处理 (Pagination)', icon: Layers, component: PaginationSlide },
    { id: 9, title: '数据存储 (Storage)', icon: Database, component: StorageSlide },
    { id: 10, title: '项目二: 必应壁纸', icon: Download, component: BingWallpaperProjectSlide },
    { id: 11, title: '项目三: B站热门', icon: PlayCircle, component: BilibiliProjectSlide },
    { id: 12, title: '实战挑战 (Challenge)', icon: Cpu, component: PracticeSlide },
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
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
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
                        <PythonProjectSupport projectId="crawler" theme="dark" />
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
                        <PythonProjectSupport projectId="crawler" placement="bottom" theme="dark" />
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
