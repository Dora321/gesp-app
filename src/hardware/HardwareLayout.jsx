import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function HardwareLayout() {
    const location = useLocation();

    const isLanding = location.pathname === '/hardware';

    if (isLanding) return <Outlet />;

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
            <Navigation
                darkMode
                className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl"
                afterLogo={(
                    <Link
                        to="/hardware"
                        aria-label="硬件实验课首页"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2 text-xs font-black text-emerald-300 transition hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                        <Cpu size={15} aria-hidden="true" />
                        <span className="hidden sm:inline">硬件实验课</span>
                    </Link>
                )}
            />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
