import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Cpu, Home, BookOpen, ArrowLeft } from 'lucide-react';

export default function HardwareLayout() {
    const location = useLocation();

    const isLanding = location.pathname === '/hardware';

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            {/* Header - Only show on non-landing pages */}
            {!isLanding && (
                <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-emerald-900/30">
                    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                aria-label="返回首页"
                                className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:min-w-0"
                            >
                                <ArrowLeft size={20} />
                                <span className="hidden sm:inline">返回首页</span>
                            </Link>
                            <div className="h-6 w-px bg-slate-700"></div>
                            <Link
                                to="/hardware"
                                aria-label="硬件课程首页"
                                className="group flex min-h-11 items-center gap-2 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                            >
                                <div className="p-1.5 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                                    <Cpu className="text-emerald-400" size={20} />
                                </div>
                                <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                                    硬件启蒙站
                                </span>
                            </Link>
                        </div>

                        <nav className="flex items-center gap-2">
                            <Link
                                to="/hardware"
                                aria-label="课程首页"
                                className={`flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${isLanding
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <Home size={18} />
                                <span className="hidden sm:inline">课程首页</span>
                            </Link>
                        </nav>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <div className={isLanding ? '' : 'pt-16'}>
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-8 mt-20">
                <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
                    <p>硬件启蒙站 · 每课一器件，轻松入门电子世界</p>
                </div>
            </footer>
        </div>
    );
}
