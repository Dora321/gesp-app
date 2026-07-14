import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function LessonMobileHeader({ label, labelClass = 'bg-blue-600 text-white', open, onToggle }) {
    return (
        <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:hidden">
            <div className="flex min-w-0 items-center gap-2">
                <Link to="/" aria-label="返回魔丸聚集地首页" className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    <span className="h-9 w-9 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                        <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" className="h-full w-full object-cover" />
                    </span>
                    <span className="hidden whitespace-nowrap text-base font-black text-slate-950 min-[360px]:inline">魔丸聚集地</span>
                </Link>
                <span className={`min-w-0 truncate rounded-md px-2 py-1 text-xs font-black ${labelClass}`}>{label}</span>
            </div>
            <button
                type="button"
                onClick={onToggle}
                aria-label={open ? '关闭课程目录' : '打开课程目录'}
                aria-expanded={open}
                className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>
        </header>
    );
}
