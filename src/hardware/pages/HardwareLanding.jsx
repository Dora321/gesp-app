import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, ChevronRight, Download, Box,
    BookOpen, FlaskConical, Hammer,
    Star, CheckCircle2,
    Code, Cpu, Settings, ArrowRight, Sparkles
} from 'lucide-react';
import { hardwareLessons } from '../data/lessons';
import hardwareHero from '../../assets/hardware-hero.png';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

// Use same hero background as homepage for consistency
const BackgroundDecorations = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[80px] animate-pulse delay-1000"></div>
    </div>
);

const Hero = ({ onStart }) => (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-200 shadow-sm"
            >
                <Sparkles size={14} className="fill-current" />
                <span className="tracking-wide">Hardware Workshop</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] relative z-20"
            >
                在比特魔法中<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
                    创造未来
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium"
            >
                专为小学生设计的硬件启蒙之旅。像工程师一样思考，用 Arduino 和 Mind+ 点亮你的第一个创意作品。
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
            >
                <button
                    onClick={onStart}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-xl shadow-blue-500/30 flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-blue-500/40"
                >
                    <Play size={20} className="fill-current" />
                    开启闯关
                </button>
                <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 text-lg font-bold rounded-full hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Play size={12} className="ml-0.5 text-blue-600 fill-current group-hover:text-white transition-colors" />
                    </div>
                    1分钟演示
                </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 pt-4 text-sm font-bold text-slate-400"
            >
                <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> 无需代码基础</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> 配套硬件盒子</span>
            </motion.div>
        </div>

        {/* Hero Visual */}
        <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-30 blur-3xl transform rotate-3 scale-75 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center"
            >
                <img
                    src={hardwareHero}
                    alt="Hardware Enlightenment Robot"
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
            </motion.div>

            {/* Floating Elements decoration */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-brand-blue">
                    <Cpu size={20} />
                </div>
                <div>
                    <div className="text-xs font-bold text-slate-400">STATUS</div>
                    <div className="text-sm font-bold text-slate-800">Connected</div>
                </div>
            </motion.div>
        </div>
    </section>
);

const ThreeEModel = () => (
    <section id="3e-model" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <span className="text-brand-blue font-bold tracking-wider text-sm uppercase mb-3 block">Methodology</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">3E 探究模型</h2>
                <p className="text-slate-500 text-xl max-w-2xl mx-auto">我们的学习像科学家一样严谨，像游戏一样有趣</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-100 via-purple-100 to-orange-100 -z-10" />

                {[
                    {
                        icon: BookOpen,
                        title: "Explore 探索",
                        desc: "发现生活中的问题，激发好奇心",
                        color: "text-brand-blue",
                        bg: "bg-blue-50",
                        border: "border-blue-100",
                        step: "01"
                    },
                    {
                        icon: FlaskConical,
                        title: "Experiment 实验",
                        desc: "动手连接电路，验证你的猜想",
                        color: "text-purple-500",
                        bg: "bg-purple-50",
                        border: "border-purple-100",
                        step: "02"
                    },
                    {
                        icon: Hammer,
                        title: "Engineer 工程",
                        desc: "编写程序，创造能够工作的原型",
                        color: "text-brand-orange",
                        bg: "bg-orange-50",
                        border: "border-orange-100",
                        step: "03"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className={`bg-white p-10 rounded-[2rem] border ${item.border} shadow-xl shadow-slate-200/50 text-center relative overflow-hidden group hover:shadow-2xl hover:shadow-${item.color.split('-')[1]}-500/10 transition-all duration-300`}
                    >
                        <div className={`w-32 h-32 mx-auto ${item.bg} rounded-full flex items-center justify-center mb-8 relative z-10 border-[6px] border-white shadow-lg mx-auto transition-transform group-hover:scale-110 duration-500`}>
                            <item.icon size={48} className={item.color} />
                            <div className="absolute -bottom-2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full border-4 border-white">
                                STEP {item.step}
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const MissionMap = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState('realtime');
    const missions = hardwareLessons.filter(l => l.mode === activeTab);

    return (
        <section id="missions" className="py-24 bg-slate-50 relative">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F97316 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 rotate-3">
                                <Settings size={28} className="animate-spin-slow" />
                            </span>
                            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Challenge Map</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
                            硬件闯关地图
                        </h2>
                    </div>

                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex">
                        {[
                            { id: 'realtime', label: '阶段一：魔法入门' },
                            { id: 'upload', label: '阶段二：创造大师' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-orange-600 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode='wait'>
                        {missions.map((mission, idx) => (
                            <motion.div
                                key={mission.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => navigate(`/hardware/lesson/${mission.id}`)}
                                className="group bg-white rounded-3xl border-2 border-slate-100 p-6 cursor-pointer hover:border-brand-blue/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all relative overflow-hidden"
                            >
                                {/* Level Badge */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors">
                                        Level {mission.id.toString().padStart(2, '0')}
                                    </div>
                                    <div className="flex text-amber-400 bg-amber-50 px-2 py-1 rounded-lg">
                                        {[1, 2, 3].map(i => (
                                            <Star key={i} size={12} className={i <= (mission.difficulty || 2) ? "fill-current" : "text-amber-200"} />
                                        ))}
                                    </div>
                                </div>

                                {/* Icon Block */}
                                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                                    <mission.icon size={36} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                                </div>

                                <h3 className="text-lg font-black text-slate-800 mb-3 line-clamp-1 group-hover:text-brand-blue transition-colors">
                                    {mission.title.split('：')[1] || mission.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 h-10 mb-6">
                                    {mission.description}
                                </p>

                                {/* Bottom Status */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {(mission.tags || []).slice(0, 1).map((tag, t) => (
                                            <span key={t} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:translate-x-1">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const Resources = () => (
    <section id="resources" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-slate-900 mb-4">装备与补给站</h2>
                <p className="text-slate-500">工欲善其事，必先利其器</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Software Card */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-[2.5rem] p-10 border border-blue-100 shadow-2xl shadow-blue-500/5 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-500">
                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/10 mb-8 rotate-3 group-hover:rotate-6 transition-transform">
                        <Code size={48} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">软件中心</h3>
                    <p className="text-slate-500 text-sm mb-10 px-8 leading-relaxed">编程所需的 Mind+ 软件及驱动程序，支持 Windows 与 Mac 系统。</p>

                    <div className="space-y-4 w-full max-w-sm">
                        <button className="w-full flex items-center justify-between px-8 py-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 border border-blue-100 transition-all group/btn">
                            <span className="font-bold text-slate-700">下载 Mind+ (V1.7.2)</span>
                            <Download size={22} className="text-slate-300 group-hover/btn:text-blue-600 transition-colors" />
                        </button>
                        <button className="w-full flex items-center justify-between px-8 py-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 border border-blue-100 transition-all group/btn">
                            <span className="font-bold text-slate-700">CH340 驱动程序</span>
                            <Download size={22} className="text-slate-300 group-hover/btn:text-blue-600 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Hardware Card */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-[2.5rem] p-10 border border-orange-100 shadow-2xl shadow-orange-500/5 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-500">
                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/10 mb-8 -rotate-3 group-hover:-rotate-6 transition-transform">
                        <Box size={48} className="text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">硬件清单</h3>
                    <p className="text-slate-500 text-sm mb-10 px-8 leading-relaxed">本课程配套的 Arduino 魔法盒子，包含所有只需的传感器与模块。</p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-left">
                        {['Uno 主板', '扩展板 V5', 'LED 模块', '声音传感器', '舵机 9g', '杜邦线 x20'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600 bg-white px-4 py-3 rounded-xl border border-orange-100 shadow-sm">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-600" /> {item}
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 text-orange-600 font-bold text-sm hover:underline flex items-center gap-2 group/link">
                        查看完整清单 <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    </section>
);

export default function HardwareLanding() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-brand-orange selection:text-white overflow-hidden">
            <Navigation
                darkMode={false}
                className="bg-white/70 backdrop-blur-md border-b border-slate-200/50"
                afterLogo={
                    <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Cpu size={18} />
                        </div>
                        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hidden sm:inline">
                            Hardware Station
                        </span>
                    </div>
                }
            />
            <BackgroundDecorations />

            <main>
                <Hero onStart={() => navigate('/hardware/lesson/1')} />
                <ThreeEModel />
                <MissionMap navigate={navigate} />
                <Resources />
            </main>

            <Footer />
        </div>
    );
}
