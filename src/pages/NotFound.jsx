import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileQuestion, Home, SearchX } from 'lucide-react';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300">
          <SearchX size={16} className="text-orange-300" />
          页面没有找到
        </div>

        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-normal mb-6">
          这个入口暂时不存在
        </h1>

        <p className="text-lg text-slate-300 leading-8 mb-3">
          你访问的路径没有匹配到当前网站的课程、题库或工具页面。
        </p>
        <p className="text-sm text-slate-500 font-mono break-all mb-10">
          {pathname}
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-200"
          >
            <Home size={18} />
            返回首页
          </Link>
          <Link
            to="/question-bank"
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 py-3 font-bold text-slate-100 transition hover:border-blue-400 hover:text-blue-200"
          >
            <FileQuestion size={18} />
            去题库
          </Link>
          <Link
            to="/python/f1"
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 py-3 font-bold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            <BookOpen size={18} />
            Python F1
          </Link>
        </div>

        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
          <ArrowLeft size={16} />
          回到魔丸聚集地
        </Link>
      </div>
    </main>
  );
}
