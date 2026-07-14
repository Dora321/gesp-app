import { useState } from 'react';
import { Globe, Search, Database, Code, Shield, ArrowRight, Play, RefreshCw, Smartphone, Key, FileText, Layers, Bug, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button, CodeBlock } from './Shared';

export const IntroSlide = () => {
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

export const RequestSlide = () => {
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

export const ParserSlide = () => {
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

export const RobotsSlide = () => {
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

export const StatusSlide = () => {
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

export const HeadersSlide = () => {
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

export const PaginationSlide = () => {
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

export const StorageSlide = () => {
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
