import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ClipboardList, Home, Images, Map, Wrench } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const navItems = [
    { path: '/ekart', label: '课程首页', icon: Home },
    { path: '/ekart/roadmap', label: '学习地图', icon: Map },
    { path: '/ekart/toolbox', label: '工具箱', icon: Wrench },
    { path: '/ekart/gallery', label: '作品展厅', icon: Images },
    { path: '/ekart/parent-portal', label: '学习记录', icon: ClipboardList },
];

export default function EkartLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-blue-500 selection:text-white">
            <Navigation
                darkMode
                className="bg-slate-950/80 backdrop-blur-xl"
                afterLogo={(
                    <span className="inline-flex rounded-md border border-blue-400/30 bg-blue-500/10 px-2 py-1 text-xs font-black text-blue-300">
                        E-Kart
                    </span>
                )}
            />

            <div className="pt-20">
                <nav aria-label="E-Kart 课程导航" className="sticky top-16 z-40 border-y border-slate-800 bg-slate-950/95 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path
                                || (item.path !== '/ekart' && location.pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <Icon size={17} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <main className="relative">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}
