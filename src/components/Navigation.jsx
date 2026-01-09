import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Award,
    Terminal,
    Map,
    Zap,
    Compass,
    Menu,
    X,
    ChevronRight,
    Search
} from 'lucide-react';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: '首页', path: '/', icon: <Home size={18} /> },
        { name: 'C++ 考级', path: '/level1', icon: <Award size={18} /> },
        { name: 'Python 课程', path: '/python/f1', icon: <Terminal size={18} /> },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const handleScrollToMap = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById('maps-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('maps-section')?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
                    ? 'bg-slate-900/80 backdrop-blur-xl border-slate-700/50 shadow-lg shadow-black/20 h-16'
                    : 'bg-transparent border-transparent h-24'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-full">

                        {/* Logo Area */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => navigate('/')}
                        >
                            <div className={`
                                relative flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg shadow-blue-500/20 transition-all duration-500
                                ${isScrolled ? 'w-8 h-8' : 'w-10 h-10 group-hover:scale-110'}
                            `}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src={`${import.meta.env.BASE_URL}logo.jpg`}
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className={`
                                font-bold tracking-tight text-white transition-all duration-300
                                ${isScrolled ? 'text-lg' : 'text-2xl'}
                            `}>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200 group-hover:from-blue-400 group-hover:to-indigo-400">
                                    魔丸聚集地
                                </span>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            <div className="flex items-center bg-slate-800/50 backdrop-blur-md p-1 rounded-full border border-white/5 mx-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={`
                                            px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group overflow-hidden
                                            ${isActive(item.path)
                                                ? 'text-white bg-white/10 shadow-sm'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'}
                                        `}
                                    >
                                        <span className={`transition-transform duration-300 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {item.icon}
                                        </span>
                                        {item.name}

                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleScrollToMap}
                                className="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 flex items-center gap-2 text-sm"
                            >
                                <Map size={16} className="text-emerald-400" />
                                闯关地图
                            </button>

                            <button
                                onClick={() => navigate('/museum')}
                                className="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 flex items-center gap-2 text-sm group"
                            >
                                <Zap size={16} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
                                奇闻馆
                            </button>

                            <div className="h-6 w-px bg-slate-700/50 mx-2"></div>

                            <button
                                onClick={() => navigate('/navigation')}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 hover:from-indigo-500/30 hover:to-blue-500/30 border border-indigo-500/30 text-indigo-300 hover:text-white transition-all duration-300 shadow-lg shadow-indigo-500/10 group text-sm"
                            >
                                <Compass size={16} className="group-hover:rotate-45 transition-transform duration-500" />
                                <span>全站导航</span>
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors relative z-50 rounded-lg hover:bg-white/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8
                    ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible pointer-events-none'}
                `}
            >
                <div className="w-full px-8 max-w-sm space-y-4">
                    {navItems.map((item, idx) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`
                                w-full py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center px-6 gap-4 group
                                ${isActive(item.path) ? 'bg-blue-600/20 border-blue-500/30 ring-1 ring-blue-500/30' : ''}
                            `}
                            style={{ transitionDelay: `${idx * 50}ms`, transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)' }}
                        >
                            <div className={`
                                p-2 rounded-full transition-colors
                                ${isActive(item.path) ? 'bg-blue-500' : 'bg-slate-800 text-slate-400 group-hover:text-white'}
                            `}>
                                {React.cloneElement(item.icon, { size: 20 })}
                            </div>
                            <span className={`text-lg font-bold ${isActive(item.path) ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                {item.name}
                            </span>
                            <ChevronRight className="ml-auto text-slate-600 group-hover:text-white/50" size={20} />
                        </button>
                    ))}

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                        <button
                            onClick={handleScrollToMap}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                        >
                            <Map size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold text-slate-400 group-hover:text-emerald-400">闯关地图</span>
                        </button>

                        <button
                            onClick={() => {
                                navigate('/museum');
                                setIsMobileMenuOpen(false);
                            }}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all group"
                        >
                            <Zap size={24} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold text-slate-400 group-hover:text-yellow-400">奇闻馆</span>
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            navigate('/navigation');
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 text-sm font-bold mt-2 active:scale-95 transition-transform"
                    >
                        <Compass size={18} />
                        全站导航
                    </button>
                </div>
            </div>
        </>
    );
}
