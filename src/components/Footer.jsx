import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Github, Code2, MessageCircle } from 'lucide-react';

export default function Footer() {
    const navigate = useNavigate();

    const courseLinks = [
        { name: 'Python 趣味启蒙', path: '/python/f1' },
        { name: 'C++ GESP 考级', path: '/level1' },
        { name: '人工智能初探', path: '/python/ai' },
        { name: '算法竞赛之路', path: '/level5' },
    ];

    const resourceLinks = [
        { name: '在线编译器', path: '/ekart' },
        { name: '历年真题库', path: '/question-bank' },
        { name: '学习路线图', scrollTo: 'maps-section' },
        { name: '计算博物馆', path: '/museum' },
    ];

    const handleLinkClick = (item) => {
        if (item.scrollTo) {
            navigate('/');
            setTimeout(() => {
                document.getElementById(item.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <footer className="relative bg-slate-900 text-slate-300 pt-24 pb-12 overflow-hidden">
            {/* Dark Tech Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-900"></div>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4">

                {/* The Playground Section */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 mb-20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <div className="inline-flex items-center justify-center p-3 bg-slate-700/50 rounded-xl mb-6 shadow-xl">
                        <Terminal className="text-emerald-400 w-8 h-8" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans">
                        准备好写下第一行代码了吗？
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                        不需要安装任何复杂的软件，就在浏览器里，开启你的"创世"之旅。
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/python/f1')}
                            className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95"
                        >
                            <Code2 size={20} />
                            在线运行 "Hello World"
                        </button>
                        <button
                            onClick={() => navigate('/hardware')}
                            className="flex items-center gap-2 px-8 py-4 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold transition-all hover:scale-105 active:scale-95"
                        >
                            <MessageCircle size={20} />
                            硬件启蒙工坊
                        </button>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid md:grid-cols-4 gap-12 border-t border-slate-800 pt-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-8 h-8 rounded-lg bg-white overflow-hidden flex items-center justify-center shadow-lg shadow-blue-600/10">
                                <img
                                    src={`${import.meta.env.BASE_URL}logo.jpg`}
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold text-white">魔丸聚集地</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-6">
                            致力于为青少年提供最硬核、最有趣的计算机科学教育。从 GESP 考级到 AI 算法，让每一个孩子都能理解代码的力量。
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/Dora321/gesp-app" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">探索课程</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            {courseLinks.map((link) => (
                                <li key={link.name}>
                                    <button onClick={() => handleLinkClick(link)} className="hover:text-blue-400 transition-colors text-left">
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">资源中心</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <button onClick={() => handleLinkClick(link)} className="hover:text-blue-400 transition-colors text-left">
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} Mowill Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
