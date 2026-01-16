
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Monitor, Upload, Download, BookOpen, FlaskConical, Hammer,
    ChevronRight, Lock, Play, Cpu, Zap, Box, Activity, Layers, PenTool
} from 'lucide-react';
import { hardwareLessons } from '../data/lessons';

export default function HardwareLanding() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('realtime'); // 'realtime' or 'upload'

    // Filter lessons based on active tab
    const displayedLessons = hardwareLessons.filter(l => l.mode === activeTab);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-hidden relative">

            {/* Background Circuit Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_top,black,transparent_80%)]" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" />
            </div>

            {/* Header / Nav Placeholder */}
            <div className="h-16 relative z-50"></div>

            {/* Hero Section */}
            <section className="relative z-10 pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8">
                            <span className="w-2 h-2 bg-emerald-500 rounded-sm animate-ping" />
                            <span>系统就绪 :: 第一阶段</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter text-white">
                            硬件 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                启蒙工作站
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed border-l-4 border-emerald-500/50 pl-6">
                            专为小学低年级设计。通过 Arduino Uno 与 Mind+ 的结合，在趣味故事中开启你的第一次<span className="text-white font-bold">比特魔法</span>实验。
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/hardware/lesson/1')}
                                className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-sm clip-path-polygon transition-all hover:translate-x-1"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                <span className="flex items-center gap-2 relative z-10">
                                    <Play size={20} fill="currentColor" /> 开始探索
                                </span>
                            </button>
                            <button className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-slate-300 font-bold rounded-sm hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2">
                                <Monitor size={20} /> 观看演示
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Visual - Cyberpunk Board */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[500px] flex items-center justify-center"
                    >
                        {/* Floating Layers */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700/50 flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden group">
                            {/* Animated Grid Background inside card */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                            {/* Central Chip */}
                            <div className="relative z-20 bg-slate-900 p-8 rounded-lg border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_80px_rgba(16,185,129,0.4)] transition-shadow duration-500">
                                <Cpu size={80} className="text-emerald-400" />
                                <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-black text-[10px] font-black px-2 py-1 rounded-sm">UNO_R3</div>
                            </div>

                            {/* Connecting Lines */}
                            <div className="absolute z-10 w-full h-full pointer-events-none">
                                {[0, 90, 180, 270].map((deg, i) => (
                                    <div key={i} className="absolute left-1/2 top-1/2 w-[200px] h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent origin-left" style={{ transform: `rotate(${deg}deg) translateY(-1px)` }}>
                                        <div className="absolute top-0 left-0 w-10 h-full bg-emerald-400 blur-[2px] animate-slide-right" style={{ animationDelay: `${i * 0.5}s` }} />
                                    </div>
                                ))}
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 right-10 p-3 bg-slate-800/80 border border-slate-600 rounded-lg flex items-center gap-3 backdrop-blur-sm z-30"
                            >
                                <Activity className="text-blue-400" size={20} />
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase">Input Signal</div>
                                    <div className="text-sm font-bold text-white">模拟_A0</div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 left-10 p-3 bg-slate-800/80 border border-slate-600 rounded-lg flex items-center gap-3 backdrop-blur-sm z-30"
                            >
                                <Zap className="text-yellow-400" size={20} />
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase">Output Voltage</div>
                                    <div className="text-sm font-bold text-white">5.0V 稳定输出</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3E Model Section - Pipeline Visual */}
            <section className="py-24 bg-slate-900/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight"><span className="text-emerald-500">3E</span> 探究模型</h2>
                        <p className="text-slate-400">遵循科学认知规律，像工程师一样思考</p>
                    </div>

                    <div className="relative grid md:grid-cols-3 gap-8">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-700/50 -translate-y-1/2 z-0" />

                        {[
                            {
                                id: '01',
                                icon: BookOpen,
                                title: "EXPLORE",
                                subtitle: "探索",
                                desc: "发现问题，激发好奇心",
                                color: "text-blue-400",
                                bg: "bg-blue-500/10",
                                border: "border-blue-500/30"
                            },
                            {
                                id: '02',
                                icon: FlaskConical,
                                title: "EXPERIMENT",
                                subtitle: "实验",
                                desc: "动手实践，验证猜想",
                                color: "text-purple-400",
                                bg: "bg-purple-500/10",
                                border: "border-purple-500/30"
                            },
                            {
                                id: '03',
                                icon: Hammer,
                                title: "ENGINEER",
                                subtitle: "工程",
                                desc: "解决问题，创造作品",
                                color: "text-orange-400",
                                bg: "bg-orange-500/10",
                                border: "border-orange-500/30"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className={`
                                    relative z-10 bg-[#0f172a] border ${item.border} p-8 rounded-xl
                                    hover:-translate-y-2 transition-transform duration-300 group
                                `}
                            >
                                <div className={`w-14 h-14 ${item.bg} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={item.color} size={28} />
                                </div>
                                <div className="absolute top-4 right-4 text-3xl font-black text-slate-800 select-none group-hover:text-slate-700 transition-colors">{item.id}</div>
                                <h3 className="text-xl font-bold text-white mb-1 tracking-wider">{item.subtitle}</h3>
                                <div className={`text-sm font-bold mb-3 ${item.color}`}>{item.title}</div>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Outline */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">任务清单</h2>
                            <p className="text-slate-400 text-sm">16个精心设计的挑战，从入门到精通</p>
                        </div>

                        {/* Tabs */}
                        <div className="bg-slate-800/50 p-1 rounded-lg inline-flex border border-slate-700/50 backdrop-blur-sm">
                            {[
                                { id: 'realtime', label: '实时模式 (1-8)' },
                                { id: 'upload', label: '上传模式 (9-16)' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayedLessons.map((lesson, idx) => {
                            const IconComponent = lesson.icon;
                            // const isReady = true;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={lesson.id}
                                    onClick={() => navigate(`/hardware/lesson/${lesson.id}`)}
                                    className="group relative bg-slate-800/20 border border-slate-700/50 hover:border-emerald-500/50 rounded-xl p-6 cursor-pointer transition-all hover:bg-slate-800/40"
                                >
                                    {/* Connection Line decoration */}
                                    <div className="absolute top-0 left-6 w-[1px] h-4 bg-slate-700 group-hover:bg-emerald-500/50 transition-colors" />

                                    <div className="flex justify-between items-start mb-6 mt-2">
                                        <div className="text-slate-500 font-mono text-xs">
                                            任务_{lesson.id.toString().padStart(2, '0')}
                                        </div>
                                        <div className={`p-2 rounded-lg bg-slate-800 group-hover:bg-emerald-500/20 transition-colors`}>
                                            <IconComponent size={18} className="text-slate-300 group-hover:text-emerald-400" />
                                        </div>
                                    </div>

                                    <h3 className="text-white font-bold text-lg mb-3 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                        {lesson.title.split('：')[1] || lesson.title}
                                    </h3>

                                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6 min-h-[32px]">
                                        {lesson.description}
                                    </p>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
                                        {(lesson.tags || [lesson.hardware]).slice(0, 2).map((tag, i) => (
                                            <span key={i} className="text-[10px] uppercase font-bold text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer / CTA - Blueprint Style */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 border-t border-b border-emerald-500/30 py-16 bg-[#0f172a]/80 backdrop-blur-sm">
                    <h2 className="text-3xl font-black text-white mb-6">准备好装备了吗？</h2>
                    <p className="text-slate-300 mb-10 max-w-xl mx-auto">
                        下载全套任务简报与核心软件，开始你的创造之旅。
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-sm border-2 border-transparent hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-2">
                            <Download size={18} />
                            下载任务简报 (PDF)
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-slate-600 text-white font-bold rounded-sm hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all flex items-center gap-2">
                            <Box size={18} />
                            获取 Mind+
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
