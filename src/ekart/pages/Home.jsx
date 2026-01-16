
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, color } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flag, Gauge, Cpu, Wrench, Battery, Zap, ChevronRight, Activity, Database, Crosshair, Hexagon, MoveRight } from 'lucide-react';

// --- VISUAL COMPONENTS ---

const SpeedTunnel = () => {
    // A simplified visual representation of a speed tunnel using radial lines
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />

            {/* Moving Stars/Streaks */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-[2px] h-[100px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent origin-top"
                    initial={{ opacity: 0, scaleY: 0, rotate: i * 18, y: -50 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scaleY: [0, 3, 0],
                        translateY: [0, 800]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                    style={{ rotate: i * 18 }}
                />
            ))}

            {/* Grid Floor */}
            <div className="absolute bottom-0 w-full h-[50vh] bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.1)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black)]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100%] [transform:perspective(500px)_rotateX(60deg)_translateY(100px)] origin-bottom" />
            </div>
        </div>
    );
};

const MagneticButton = ({ children, className, onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3); // Magnetic pull strength
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const KineticText = ({ text, className }) => {
    return (
        <div className={`overflow-hidden flex flex-wrap gap-x-4 ${className}`}>
            {text.split(" ").map((word, i) => (
                <div key={i} className="overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

const AnimatedCounter = ({ value, label, unit, color }) => {
    return (
        <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors duration-500 rounded-full" />
            <div className="relative border-l border-white/20 pl-4 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm">
                <div className={`text-5xl font-black font-mono text-white tracking-tighter tabular-nums drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]`}>
                    {value}<span className={`text-xl ml-1 ${color}`}>{unit}</span>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1 font-bold">{label}</div>
            </div>
        </div>
    )
}

// --- MAIN PAGE ---

const EkartHome = () => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

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
                <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh] mb-24 relative">

                    {/* Left Interface */}
                    <div className="lg:col-span-7 space-y-12 relative z-20">
                        {/* Holo Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-black/40 border border-cyan-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full absolute" />
                            <span className="text-cyan-400 text-xs font-mono tracking-widest font-bold">SYSTEM_V3.0_ONLINE</span>
                        </motion.div>

                        <div className="relative">
                            <KineticText
                                text="打造你的 梦想赛车"
                                className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mix-blend-overlay"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "200px" }}
                                transition={{ delay: 1, duration: 1 }}
                                className="h-2 bg-cyan-500 mt-4 skew-x-[-20deg]"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl text-gray-400 max-w-xl font-light border-l-4 border-cyan-500/50 pl-6 py-2"
                        >
                            工程学与速度的激情碰撞。 <br />
                            <span className="text-white font-medium">从零开始打造极致电动卡丁车。</span>
                        </motion.p>

                        <div className="flex flex-wrap gap-6 items-center">
                            <Link to="/ekart/roadmap">
                                <MagneticButton className="group relative px-10 py-5 bg-white text-black font-black text-xl hover:bg-cyan-400 transition-colors clip-path-polygon">
                                    <span className="flex items-center gap-2 relative z-10 transition-transform group-hover:translate-x-1">
                                        启动引擎 <MoveRight className="w-6 h-6" />
                                    </span>
                                </MagneticButton>
                            </Link>

                            <Link to="/ekart/gallery">
                                <MagneticButton className="px-8 py-5 text-white font-bold text-lg border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all backdrop-blur-sm">
                                    参观车库
                                </MagneticButton>
                            </Link>
                        </div>

                        {/* Holo Stats */}
                        <div className="flex gap-12 pt-8">
                            <AnimatedCounter value="48" unit="V" label="系统电压" color="text-cyan-400" />
                            <AnimatedCounter value="55" unit="KM/H" label="最高时速" color="text-purple-400" />
                        </div>
                    </div>

                    {/* Right Visual - 3D Tilt Card */}
                    <div className="lg:col-span-5 relative perspective-[2000px] z-10">
                        <TiltCard className="relative w-full aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-gray-900 via-black to-black border border-white/10 shadow-2xl p-2 cursor-pointer group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl rounded-[2rem]" />

                            <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden bg-black">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596422749774-644788c75ff3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80 scale-105 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                {/* Floating UI Layers */}
                                <div className="absolute top-8 left-8 transform translate-z-20">
                                    <div className="text-cyan-400 font-mono text-xs mb-1">PROTOTYPE_01</div>
                                    <div className="text-4xl font-black text-white uppercase italic tracking-tighter">Hyper<br />Sport</div>
                                </div>

                                <motion.div
                                    className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 transform translate-z-30"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Battery className="text-green-400 w-4 h-4" />
                                        <span className="text-white font-bold font-mono">98%</span>
                                    </div>
                                    <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "98%" }}
                                            className="h-full bg-green-500"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </TiltCard>
                    </div>
                </div>

                {/* Features - Horizontal Scroll Style */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                        <KineticText text="核心模块" className="text-4xl font-black text-white italic" />
                        <div className="text-gray-500 font-mono text-sm">/ SELECT_PATH</div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "机械工程",
                                subtitle: "MECHANICAL",
                                icon: Wrench,
                                desc: "底盘设计与焊接工艺",
                                color: "text-orange-500"
                            },
                            {
                                title: "动力系统",
                                subtitle: "POWERTRAIN",
                                icon: Zap,
                                desc: "锂电池组与电机控制",
                                color: "text-yellow-400"
                            },
                            {
                                title: "智能控制",
                                subtitle: "INTELLIGENCE",
                                icon: Cpu,
                                desc: "ESP32 编程与无线遥测",
                                color: "text-cyan-400"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative h-80 bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-colors overflow-hidden p-8 flex flex-col justify-between"
                            >
                                <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br from-${item.color.split('-')[1]}-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div>
                                    <item.icon className={`w-12 h-12 ${item.color} mb-6`} strokeWidth={1.5} />
                                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{item.title}</h3>
                                    <div className="text-lg text-gray-400 font-medium">{item.subtitle}</div>
                                </div>

                                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                                    <p className="text-sm text-gray-500 font-mono max-w-[70%]">{item.desc}</p>
                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Project Logs - Data Feed */}
                <div className="relative border-t border-white/10 pt-24">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6 text-gray-500 font-mono text-sm tracking-widest uppercase">
                        Lab_Activity_Log
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                label: "UPDATE_12",
                                title: "总装开始",
                                desc: "底盘喷漆完成，准备进行电机安装调试。",
                                status: "active"
                            },
                            {
                                label: "RESEARCH",
                                title: "新电池技术",
                                desc: "探索使用21700电芯以获得更高的能量密度。",
                                status: "pending"
                            }
                        ].map((log, i) => (
                            <div key={i} className="flex gap-6 group cursor-pointer">
                                <div className="w-32 pt-2 border-t-2 border-transparent group-hover:border-cyan-500 transition-colors">
                                    <div className="text-xs font-mono text-cyan-500 mb-1">{log.label}</div>
                                    <div className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded w-fit ${log.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {log.status}
                                    </div>
                                </div>
                                <div className="flex-1 pt-2 border-t border-white/10 group-hover:border-white/30 transition-colors">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{log.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{log.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EkartHome;
