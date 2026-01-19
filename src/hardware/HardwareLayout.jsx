import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Home, BookOpen, ArrowLeft } from 'lucide-react';

export default function HardwareLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const isLanding = location.pathname === '/hardware';

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            {/* Header - Only show on non-landing pages */}
            {!isLanding && (
                <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-emerald-900/30">
                    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <span className="hidden sm:inline">返回首页</span>
                            </button>
                            <div className="h-6 w-px bg-slate-700"></div>
                            <div
                                onClick={() => navigate('/hardware')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <div className="p-1.5 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                                    <Cpu className="text-emerald-400" size={20} />
                                </div>
                                <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                                    硬件启蒙站
                                </span>
                            </div>
                        </div>

                        <nav className="flex items-center gap-2">
                            <button
                                onClick={() => navigate('/hardware')}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${isLanding
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <Home size={18} />
                                <span className="hidden sm:inline">课程首页</span>
                            </button>
                        </nav>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="pt-16">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-8 mt-20">
                <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
                    <p>硬件启蒙站 · 每课一器件，轻松入门电子世界</p>
                </div>
            </footer>
        </div>
    );
}
