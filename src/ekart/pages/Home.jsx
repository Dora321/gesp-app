import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flag, Gauge, Cpu, Wrench, Battery, Zap, ChevronRight, Activity, Database, Crosshair, Hexagon, MoveRight, Layers, Code, GraduationCap, Microscope } from 'lucide-react';

import SpeedTunnel from '../components/SpeedTunnel';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
import KineticText from '../components/KineticText';
import AnimatedCounter from '../components/AnimatedCounter';

// --- MAIN PAGE ---

const EkartHome = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden font-sans selection:bg-cyan-500/30">
            <SpeedTunnel />

            {/* Scroll Progress Line */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 z-50"
                style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">

                {/* Hero Section */}
                <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[85vh] mb-24 relative">

                    {/* Left Interface */}
                    <div className="lg:col-span-7 space-y-10 relative z-20">
                        {/* Holo Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="text-cyan-400 text-xs font-mono tracking-[0.1em] font-bold">GESP · 硬件教学实训平台</span>
                        </motion.div>

                        <div className="relative">
                            <KineticText
                                as="h1"
                                text="硬件启蒙站 打造未来工程师"
                                className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "240px" }}
                                transition={{ delay: 1, duration: 1, ease: "circOut" }}
                                className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600 mt-6 skew-x-[-20deg]"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-xl font-light border-l-2 border-cyan-500/50 pl-6 py-1 leading-relaxed"
                        >
                            <span className="text-white font-medium">以项目驱动学习，</span>融合机械、电路与编程。<br />
                            让学生在工程实践中，探索科技的无限可能。
                        </motion.p>

                        <div className="flex flex-wrap gap-6 items-center pt-4">
                            <Link to="/ekart/roadmap">
                                <MagneticButton className="group relative px-10 py-5 bg-white text-black font-black text-xl hover:bg-cyan-400 transition-colors clip-path-polygon rounded-sm">
                                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="flex items-center gap-2 relative z-10 transition-transform group-hover:translate-x-2">
                                        开始学习 <GraduationCap className="w-6 h-6" />
                                    </span>
                                </MagneticButton>
                            </Link>

                            <Link to="/ekart/gallery">
                                <MagneticButton className="px-8 py-5 text-white font-bold text-lg border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all backdrop-blur-sm group rounded-sm">
                                    <span className="group-hover:text-cyan-400 transition-colors">学员作品库</span>
                                </MagneticButton>
                            </Link>
                        </div>

                        {/* Holo Stats */}
                        <div className="flex gap-12 pt-8 border-t border-white/5">
                            <AnimatedCounter value="12" unit="周" label="课程周期" color="text-cyan-400" />
                            <AnimatedCounter value="45" unit="+" label="核心知识点" color="text-purple-400" />
                            <AnimatedCounter value="3" unit="大" label="学科领域" color="text-lg text-green-400" />
                        </div>
                    </div>

                    {/* Right Visual - 3D Tilt Card */}
                    <div className="lg:col-span-5 relative perspective-[2000px] z-10 hidden lg:block">
                        <TiltCard className="relative w-full aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-gray-900 via-black to-black border border-white/10 shadow-2xl p-2 cursor-pointer group">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl rounded-[2rem]" />

                            <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden bg-black">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 scale-105 group-hover:scale-110 transition-transform duration-700 font-mono" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

                                {/* Overlay Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                {/* Floating UI Layers */}
                                <div className="absolute top-8 left-8 transform translate-z-20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className="w-4 h-4 text-cyan-500" />
                                        <div className="text-cyan-400 font-mono text-xs tracking-widest">COURSE_PREVIEW</div>
                                    </div>
                                    <div className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Engineering<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Mastery</span></div>
                                </div>

                                <motion.div
                                    className="absolute bottom-8 right-8 left-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 transform translate-z-30"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <div className="text-gray-400 text-xs font-mono mb-1">PROJECT TARGET</div>
                                            <div className="text-xl font-bold text-white flex items-center gap-2">
                                                <Zap className="text-yellow-400 w-5 h-5" />
                                                智能电动赛车
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-gray-400 font-mono">
                                            <span>DIFFICULTY</span>
                                            <span className="text-cyan-400">ADVANCED</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "85%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </TiltCard>
                    </div>
                </div>

                {/* Curriculum - Horizontal Scroll Style */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                        <KineticText as="h2" text="课程体系" className="text-4xl lg:text-5xl font-black text-white italic" />
                        <div className="text-gray-500 font-mono text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500/50"></span>
                            CORE_MODULES
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "机械结构设计",
                                subtitle: "MECHANICAL ENG",
                                icon: Wrench,
                                desc: "学习 SolidWorks 建模，掌握底盘结构设计、应力分析与焊接工艺。",
                                color: "text-orange-500",
                                bg: "group-hover:bg-orange-500/10",
                                border: "group-hover:border-orange-500/50"
                            },
                            {
                                title: "电子电路系统",
                                subtitle: "ELECTRONICS",
                                icon: Layers,
                                desc: "深入理解锂电池组管理系统(BMS)、电机驱动原理与线束布局。",
                                color: "text-yellow-400",
                                bg: "group-hover:bg-yellow-400/10",
                                border: "group-hover:border-yellow-400/50"
                            },
                            {
                                title: "嵌入式编程",
                                subtitle: "EMBEDDED CODING",
                                icon: Code,
                                desc: "基于 ESP32 开发，实现车辆底层控制、无线遥测与姿态解算。",
                                color: "text-cyan-400",
                                bg: "group-hover:bg-cyan-400/10",
                                border: "group-hover:border-cyan-400/50"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`group relative h-80 bg-[#0a0a0a] border border-white/10 transition-all duration-500 overflow-hidden p-8 flex flex-col justify-between rounded-xl ${item.border}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${item.bg} transition-colors duration-500`} />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-lg bg-white/5 text-white ${item.color}`}>
                                            <item.icon className="w-8 h-8" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-xs font-mono text-gray-600 group-hover:text-gray-400 transition-colors">{`MODULE_0${i + 1}`}</div>
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter mb-2">{item.title}</h3>
                                    <div className="text-xs font-bold text-gray-500 font-mono tracking-widest">{item.subtitle}</div>
                                </div>

                                <div className="relative z-10 pt-6 mt-auto border-t border-white/5 group-hover:border-white/20 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[85%]">{item.desc}</p>
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronRight size={20} />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Project Logs - Data Feed */}
                <div className="relative border-t border-white/10 pt-24">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6 py-2 border border-white/10 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                        <span className="text-gray-400 font-mono text-xs tracking-widest uppercase">LAB_RESEARCH_UPDATES</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {[
                            {
                                label: "CURRICULUM",
                                title: "Python 数据分析与可视化",
                                desc: "新增课程模块：使用 Python 对车辆遥测数据进行实时分析与图表绘制。",
                                status: "NEW",
                                icon: Database
                            },
                            {
                                label: "WORKSHOP",
                                title: "冬季创客训练营",
                                desc: "为期一周的集中式开发实训，导师全程指导，完成从设计到路测的全过程。",
                                status: "OPEN",
                                icon: Microscope
                            }
                        ].map((log, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="flex gap-6 group cursor-pointer p-6 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all"
                            >
                                <div className="flex-shrink-0 pt-1">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <log.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-mono text-cyan-500/80">{log.label}</span>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${log.status === 'NEW' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'}`}>
                                            {log.status}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{log.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{log.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// Simple Badge component for the TiltCard
const Badge = ({ className }) => (
    <div className={className}>
        <Hexagon size="100%" />
    </div>
);

export default EkartHome;
