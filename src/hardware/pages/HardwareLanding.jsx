import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, ChevronRight, Download, Box,
    BookOpen, FlaskConical, Hammer,
    Star, Lock, CheckCircle2,
    Zap, Code, Cpu, Settings
} from 'lucide-react';
import { hardwareLessons } from '../data/lessons';
import hardwareHero from '../../assets/hardware-hero.png';

// --- Colors & Theme Constants (Tech-Playful) ---
const THEME = {
    primary: 'bg-blue-500',
    primaryHover: 'hover:bg-blue-600',
    secondary: 'bg-orange-500',
    secondaryHover: 'hover:bg-orange-600',
    success: 'text-emerald-500',
    bg: 'bg-slate-50',
    text: 'text-slate-800',
    textMuted: 'text-slate-500'
};

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl text-slate-800">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Cpu size={20} />
            </div>
            Hardware<span className="text-blue-500">Station</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-600">
            <a href="#missions" className="hover:text-blue-500 transition-colors">闯关地图</a>
            <a href="#3e-model" className="hover:text-blue-500 transition-colors">探索模型</a>
            <a href="#resources" className="hover:text-blue-500 transition-colors">装备库</a>
        </div>
        <button className={`px-5 py-2 ${THEME.primary} ${THEME.primaryHover} text-white font-bold rounded-full text-sm shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5`}>
            开始学习
        </button>
    </nav>
);

const Hero = ({ onStart }) => (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                <Star size={12} className="fill-current" /> 新学期招募中
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight">
                在比特魔法中<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">创造未来</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                专为小学生设计的硬件启蒙之旅。像工程师一样思考，用 Arduino 和 Mind+ 点亮你的第一个创意作品。
            </p>
            <div className="flex flex-wrap gap-4">
                <button onClick={onStart} className={`px-8 py-4 ${THEME.primary} ${THEME.primaryHover} text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/30 flex items-center gap-3 transition-all hover:-translate-y-1`}>
                    <Play size={24} className="fill-current" /> 开启闯关
                </button>
                <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 text-lg font-bold rounded-2xl hover:border-blue-500 hover:text-blue-500 transition-all flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Play size={14} className="ml-0.5 text-blue-600 fill-current" />
                    </div>
                    1分钟演示
                </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 text-sm font-bold text-slate-400">
                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-emerald-500" /> 无需代码基础</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-emerald-500" /> 配套硬件盒子</span>
            </div>
        </div>

        {/* Hero Visual - 3D Illustration */}
        <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            {/* Background Blob */}
            <div className="absolute inset-0 bg-blue-100 rounded-[3rem] opacity-50 blur-3xl transform rotate-3 scale-90" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center"
            >
                <img
                    src={hardwareHero}
                    alt="Hardware Enlightenment Robot"
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 filter saturate-110"
                />
            </motion.div>
        </div>
    </section>
);

const ThreeEModel = () => (
    <section id="3e-model" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">3E 探究模型</h2>
                <p className="text-slate-500 text-lg">我们的学习像科学家一样严谨，像游戏一样有趣</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-slate-100 -z-10" />

                {[
                    {
                        icon: BookOpen,
                        title: "Explore 探索",
                        desc: "发现生活中的问题，激发好奇心",
                        color: "text-blue-500",
                        bg: "bg-blue-100",
                        step: "01"
                    },
                    {
                        icon: FlaskConical,
                        title: "Experiment 实验",
                        desc: "动手连接电路，验证你的猜想",
                        color: "text-purple-500",
                        bg: "bg-purple-100",
                        step: "02"
                    },
                    {
                        icon: Hammer,
                        title: "Engineer 工程",
                        desc: "编写程序，创造能够工作的原型",
                        color: "text-orange-500",
                        bg: "bg-orange-100",
                        step: "03"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden group"
                    >
                        <div className={`w-24 h-24 mx-auto ${item.bg} rounded-full flex items-center justify-center mb-6 relative z-10 border-4 border-white shadow-sm`}>
                            <item.icon size={40} className={item.color} />
                        </div>
                        <div className="text-xs font-black text-slate-300 uppercase tracking-widest mb-2">Step {item.step}</div>
                        <h3 className="text-2xl font-black text-slate-800 mb-3">{item.title}</h3>
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
        <section id="missions" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            <span className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                <Settings size={24} className="animate-spin-slow" />
                            </span>
                            闯关地图
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium">完成 16 个挑战，从新手晋升为小小工程师</p>
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
                                    ? 'bg-blue-500 text-white shadow-md'
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
                                className="group bg-white rounded-3xl border-2 border-slate-100 p-6 cursor-pointer hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all relative overflow-hidden"
                            >
                                {/* Level Badge */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md">
                                        Level {mission.id.toString().padStart(2, '0')}
                                    </div>
                                    <div className="flex text-amber-400">
                                        {[1, 2, 3].map(i => (
                                            <Star key={i} size={14} className={i <= (mission.difficulty || 2) ? "fill-current" : "text-slate-200"} />
                                        ))}
                                    </div>
                                </div>

                                {/* Icon Block */}
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-100">
                                    <mission.icon size={32} className="text-blue-500" />
                                </div>

                                <h3 className="text-lg font-black text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {mission.title.split('：')[1] || mission.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 h-10 mb-4">
                                    {mission.description}
                                </p>

                                {/* Bottom Status */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {(mission.tags || []).slice(0, 1).map((tag, t) => (
                                            <span key={t} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <ChevronRight size={18} />
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
                <div className="bg-blue-50 rounded-[2.5rem] p-10 border-4 border-white shadow-2xl shadow-blue-500/10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md mb-6 rotate-3">
                        <Code size={40} className="text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">软件中心</h3>
                    <p className="text-slate-500 text-sm mb-8 px-8">编程所需的 Mind+ 软件及驱动程序，支持 Windows 与 Mac 系统。</p>

                    <div className="space-y-3 w-full max-w-xs">
                        <button className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-blue-100 transition-all group">
                            <span className="font-bold text-slate-700">下载 Mind+ (V1.7.2)</span>
                            <Download size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </button>
                        <button className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-blue-100 transition-all group">
                            <span className="font-bold text-slate-700">CH340 驱动程序</span>
                            <Download size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Hardware Card */}
                <div className="bg-orange-50 rounded-[2.5rem] p-10 border-4 border-white shadow-2xl shadow-orange-500/10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md mb-6 -rotate-3">
                        <Box size={40} className="text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">硬件清单</h3>
                    <p className="text-slate-500 text-sm mb-8 px-8">本课程配套的 Arduino 魔法盒子，包含所有只需的传感器与模块。</p>

                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left">
                        {['Uno 主板', '扩展板 V5', 'LED 模块', '声音传感器', '舵机 9g', '杜邦线 x20'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-2 rounded-lg border border-orange-100">
                                <span className="w-2 h-2 rounded-full bg-orange-400" /> {item}
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 text-orange-600 font-bold text-sm hover:underline flex items-center gap-1">
                        查看完整清单 <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center gap-2 mb-4 font-black text-xl text-white">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">
                    <Cpu size={14} />
                </div>
                HardwareStation
            </div>
            <p>做最好的少儿科创教育内容</p>
            <div className="mt-8 pt-8 border-t border-slate-800 flex justify-center gap-8">
                <a href="#" className="hover:text-white transition-colors">课程反馈</a>
                <a href="#" className="hover:text-white transition-colors">联系老师</a>
                <a href="#" className="hover:text-white transition-colors">常见问题</a>
            </div>
        </div>
    </footer>
);

export default function HardwareLanding() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900">
            <Navbar />
            <Hero onStart={() => navigate('/hardware/lesson/1')} />
            <ThreeEModel />
            <MissionMap navigate={navigate} />
            <Resources />
            <Footer />
        </div>
    );
}
