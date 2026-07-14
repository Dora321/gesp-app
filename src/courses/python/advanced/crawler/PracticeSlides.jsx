import { useState } from 'react';
import { Search, Code, Shield, Download, Play, RefreshCw, Cpu, Bug, CheckCircle, Film, Terminal, User } from 'lucide-react';
import { Button, CodeBlock } from './Shared';

export const PracticeSlide = () => {
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

export const DoubanProjectSlide = () => {
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
