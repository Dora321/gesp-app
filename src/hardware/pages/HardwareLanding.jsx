import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Monitor, Upload, Download, BookOpen, FlaskConical, Hammer,
    ChevronRight, Lock, Play, Cpu, Zap, Box
} from 'lucide-react';
import { hardwareLessons } from '../data/lessons';

export default function HardwareLanding() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('realtime'); // 'realtime' or 'upload'

    // Filter lessons based on active tab
    const displayedLessons = hardwareLessons.filter(l => l.mode === activeTab);

    return (
        <div className="min-h-screen bg-[#0B0C15] text-white font-sans selection:bg-emerald-500/30">
            {/* Header / Nav Placeholder (Assuming global nav exists, but adding top spacing) */}
            <div className="h-16"></div>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            硬核路上的第一步
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                            比特魔法<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                初阶科创课程设计
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
                            专为小学低年级（1-3年级）设计，采用 3E 探究模型。通过 Arduino Uno 与 Mind+ 的结合，让孩子们在趣味故事中掌握电子与编程的基础。
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/hardware/lesson/1')}
                                className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                            >
                                开始探索
                            </button>
                            <button className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                                观看演示
                            </button>
                        </div>
                    </div>

                    {/* Hero Image (Right Side) */}
                    <div className="relative z-10 lg:h-[500px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full"></div>
                        {/* Placeholder for 3D Illustration */}
                        <div className="relative w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-sm flex items-center justify-center p-8">
                            {/* Abstract Circuit Visualization */}
                            <div className="grid grid-cols-4 gap-4 opacity-50">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`w-16 h-16 rounded-lg ${i % 2 === 0 ? 'bg-emerald-500/20' : 'bg-cyan-500/20'} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu size={120} className="text-white/80 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 bg-[#1A1D2D] border border-slate-700 p-3 rounded-lg flex items-center gap-3 shadow-xl">
                                <div className="w-10 h-10 bg-emerald-500 rounded-md flex items-center justify-center">
                                    <span className="font-bold text-black text-xs">Uno</span>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">Arduino Uno</div>
                                    <div className="text-white font-bold text-sm">核心控制器</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3E Model Section */}
            <section className="py-24 bg-[#0E1019]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">3E 探究模型</h2>
                        <p className="text-slate-400">课程设计遵循科学认知规律，让学习自然发生</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Explore */}
                        <div className="bg-[#151829] border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors group">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                                <BookOpen className="text-blue-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Explore 探索</h3>
                            <p className="text-slate-400 text-sm">发现问题，激发好奇心</p>
                        </div>

                        {/* Experiment */}
                        <div className="bg-[#151829] border border-slate-800 p-8 rounded-2xl hover:border-purple-500/30 transition-colors group">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <FlaskConical className="text-purple-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Experiment 实验</h3>
                            <p className="text-slate-400 text-sm">动手实践，验证猜想</p>
                        </div>

                        {/* Engineer */}
                        <div className="bg-[#151829] border border-slate-800 p-8 rounded-2xl hover:border-orange-500/30 transition-colors group">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                                <Hammer className="text-orange-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Engineer 工程</h3>
                            <p className="text-slate-400 text-sm">解决问题，创造作品</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Outline */}
            <section className="py-24 bg-[#0B0C15]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">课程大纲</h2>
                            <p className="text-slate-400 text-sm">16个精心设计的课时，从基础必修到综合扩展</p>
                        </div>

                        {/* Tabs */}
                        <div className="bg-[#151829] p-1 rounded-lg inline-flex">
                            <button
                                onClick={() => setActiveTab('realtime')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'realtime'
                                    ? 'bg-slate-700 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                实时模式 (1-8)
                            </button>
                            <button
                                onClick={() => setActiveTab('upload')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'upload'
                                    ? 'bg-slate-700 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                上传模式 (9-16)
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayedLessons.map((lesson) => {
                            const IconComponent = lesson.icon;
                            const isReady = true; // All lessons now have content

                            return (
                                <div
                                    key={lesson.id}
                                    onClick={() => navigate(`/hardware/lesson/${lesson.id}`)}
                                    className={`
                                        group relative bg-[#12141F] border border-slate-800 rounded-2xl p-6 transition-all duration-300
                                        hover:border-slate-600 hover:bg-[#1A1D2D] cursor-pointer
                                    `}
                                >
                                    {/* Top Bar */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-xl bg-slate-800/50 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors`}>
                                            <IconComponent size={20} />
                                        </div>
                                        <div className={`
                                            px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase
                                            ${lesson.mode === 'realtime' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}
                                        `}>
                                            {lesson.mode === 'realtime' ? '实时模式' : '上传模式'}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="mb-8">
                                        <div className="text-slate-500 text-xs font-mono mb-2">
                                            #{lesson.id.toString().padStart(2, '0')}
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                                            {lesson.title.split('：')[1] || lesson.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 min-h-[32px]">
                                            {lesson.description}
                                        </p>
                                    </div>

                                    {/* Footer Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {(lesson.tags || [lesson.hardware]).slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400 border border-slate-700/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Locked State Overlay */}
                                    {!isReady && (
                                        <div className="absolute inset-0 bg-[#0B0C15]/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                                            <div className="bg-black/80 px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2 text-xs text-slate-400">
                                                <Lock size={12} /> 即将上线
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer / CTA */}
            <section className="py-24 bg-[#0B0C15] border-t border-slate-900">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold text-white mb-8">准备好开始了吗？</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                        下载我们的学习资源包，开启你的比特魔法之旅。所有课件 PDF 和配套软件均可免费获取。
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-[#1A1D2D] border border-slate-700 text-white rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Download size={16} />
                            下载课件资源 (PDF)
                        </button>
                        <button className="px-6 py-3 bg-[#1A1D2D] border border-slate-700 text-white rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Download size={16} />
                            下载 Mind+ 软件
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
