import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Menu,
    X,
    ChevronRight,
    BookOpen,
    FileQuestion,
    Gamepad2,
    Rocket,
    Cpu,
    Wrench
} from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';

export default function Navigation({ darkMode = false, afterLogo = null, mobileActions = null, className = '' }) {
    const navigate = useNavigate();
    const location = useLocation();
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isMobileMenuOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: '课程体系', path: '/', scrollTo: 'lesson-catalog', icon: <BookOpen size={18} /> },
        { name: '真题题库', path: '/question-bank', icon: <FileQuestion size={18} /> },
        { name: '项目课', path: '/', scrollTo: 'projects-section', icon: <Gamepad2 size={18} /> },
        { name: '学习工具', path: '/', scrollTo: 'tools-section', icon: <Wrench size={18} /> },
        { name: '探索内容', path: '/', scrollTo: 'explore-section', icon: <Cpu size={18} /> },
    ];

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    const handleNavClick = (item) => {
        if (item.scrollTo && location.pathname === '/') {
            scrollToSection(item.scrollTo);
        } else if (item.scrollTo) {
            navigate('/');
            setTimeout(() => {
                scrollToSection(item.scrollTo);
            }, 100);
        } else {
            navigate(item.path);
        }
    };

    const isActive = (item) => {
        if (item.scrollTo) return false;
        if (item.path === '/') return location.pathname === '/';
        return location.pathname.startsWith(item.path);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-b border-blue-600/10 shadow-sm h-16'
                    : `bg-transparent border-transparent h-20 ${className}`
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-full">

                        {/* Logo Area */}
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="group flex min-h-11 min-w-0 items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                aria-label="返回网站首页"
                            >
                                <span className={`
                                    relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg shadow-blue-600/20 transition-all duration-500
                                    ${isScrolled ? 'h-8 w-8' : 'h-10 w-10 group-hover:scale-110'}
                                `}>
                                    <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
                                    <img
                                        src={`${import.meta.env.BASE_URL}logo.jpg`}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </span>

                                <span className={`
                                    truncate font-sans font-bold tracking-tight transition-all duration-300
                                    ${isScrolled ? 'text-lg' : 'text-2xl'}
                                    ${isScrolled ? 'text-slate-900' : (darkMode ? 'text-white' : 'text-slate-900')}
                                    group-hover:text-blue-600
                                `}>
                                    魔丸聚集地
                                </span>
                            </button>
                            {afterLogo && <div className="shrink-0">{afterLogo}</div>}
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={`${item.path}-${item.scrollTo || item.name}`}
                                    onClick={() => handleNavClick(item)}
                                    aria-current={isActive(item) ? 'page' : undefined}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 relative group
                                        ${isActive(item)
                                            ? (darkMode && !isScrolled ? 'text-blue-400' : 'text-blue-600')
                                            : (darkMode && !isScrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100')}
                                    `}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => navigate('/question-bank')}
                                className="group relative px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative flex items-center gap-2">
                                    开始练习 <Rocket size={16} className="group-hover:rotate-45 transition-transform" />
                                </span>
                            </button>
                        </div>

                        {mobileActions && (
                            <div className="ml-auto flex items-center gap-1 md:hidden">
                                {mobileActions}
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className={`relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors md:hidden ${darkMode && !isScrolled
                                ? 'text-white hover:bg-white/10'
                                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                                }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8
                    ${prefersReducedMotion ? 'transition-none' : 'transition-all duration-500'}
                    ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible pointer-events-none'}
                `}
            >
                <div className="w-full px-8 max-w-sm space-y-4">
                    {navItems.map((item, idx) => (
                        <button
                            key={`${item.path}-${item.scrollTo || item.name}`}
                            onClick={() => {
                                handleNavClick(item);
                                setIsMobileMenuOpen(false);
                            }}
                            aria-label={item.name}
                            aria-current={isActive(item) ? 'page' : undefined}
                            className={`
                                w-full py-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-blue/30 hover:shadow-lg flex items-center px-6 gap-4 group
                                ${prefersReducedMotion ? 'transition-none' : 'transition-all duration-300'}
                                ${isActive(item) ? 'bg-blue-50 border-brand-blue/30 ring-1 ring-brand-blue/20' : ''}
                            `}
                            style={{
                                transitionDelay: prefersReducedMotion ? '0ms' : `${idx * 50}ms`,
                                transform: prefersReducedMotion || isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            <div className={`
                                p-2 rounded-full transition-colors
                                ${isActive(item) ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-brand-blue group-hover:text-white'}
                            `}>
                                {React.cloneElement(item.icon, { size: 20 })}
                            </div>
                            <span className={`text-lg font-bold ${isActive(item) ? 'text-brand-blue' : 'text-slate-600 group-hover:text-brand-slate'}`}>
                                {item.name}
                            </span>
                            <ChevronRight className="ml-auto text-slate-400 group-hover:text-brand-blue" size={20} />
                        </button>
                    ))}

                    <button
                        onClick={() => {
                            navigate('/question-bank');
                            setIsMobileMenuOpen(false);
                        }}
                        aria-label="开始练习"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-xl shadow-brand-blue/30 flex items-center justify-center gap-2 text-lg font-bold mt-6 active:scale-95 transition-transform"
                    >
                        <Rocket size={20} />
                        开始练习
                    </button>
                </div>
            </div>
        </>
    );
}
