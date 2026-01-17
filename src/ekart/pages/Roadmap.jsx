
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Lock, ArrowRight, Zap, Target, Flag } from 'lucide-react';

const RoadmapNode = ({ level, title, desc, status, delay }) => {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="relative pl-12 pb-12 last:pb-0 group"
        >
            {/* Circuit Line */}
            <div className={`absolute left-[19px] top-10 bottom-0 w-[2px] ${isCompleted ? 'bg-cyan-500' : 'bg-gray-800'} group-last:hidden`}>
                <div className={`absolute inset-0 bg-cyan-400 blur-[2px] opacity-0 ${isCompleted && 'group-hover:opacity-100'} transition-opacity`} />
            </div>

            {/* Node Point */}
            <div className={`absolute left-0 top-0 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500
                ${isCompleted ? 'bg-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' :
                    isActive ? 'bg-cyan-900/20 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' :
                        'bg-black border-gray-800 opacity-50'}`}
            >
                {isCompleted ? <CheckCircle className="w-5 h-5 text-cyan-500" /> :
                    isActive ? <Zap className="w-5 h-5 text-cyan-400 animate-pulse" /> :
                        <Lock className="w-4 h-4 text-gray-600" />}
            </div>

            {/* Content Card */}
            <div className={`relative p-6 rounded-2xl border transition-all duration-300 group-hover:translate-x-2
                ${isActive ? 'bg-cyan-950/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' :
                    isLocked ? 'bg-gray-900/50 border-white/5 opacity-60 grayscale' :
                        'bg-gray-900 border-white/10'}`}
            >
                {/* Connector Trace */}
                <div className={`absolute top-5 left-[-26px] w-[26px] h-[2px] ${isActive || isCompleted ? 'bg-cyan-500' : 'bg-gray-800'}`} />

                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>
                        LEVEL_0{level}
                    </span>
                    {isActive && <span className="text-[10px] font-mono text-green-400 animate-pulse">&gt;&gt;&gt; CURRENT_MISSION</span>}
                </div>

                <h3 className={`text-2xl font-black italic uppercase mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>

                {/* Tech Skills Tags */}
                <div className="flex flex-wrap gap-2">
                    {['CAD建模', '电路焊接', 'Python编程'].map((tag, i) => ( // Example tags, in reality would be dynamic
                        <span key={i} className="text-[10px] uppercase font-mono border border-white/10 px-2 py-1 rounded text-gray-500">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const EkartRoadmap = () => {
    const levels = [
        {
            level: 1,
            title: "MECHANICAL",
            titleCn: "机械基础",
            desc: "学习工具使用、材料科学及卡丁车底盘结构组装。完成第一个无动力滑行底盘。",
            status: "completed"
        },
        {
            level: 2,
            title: "POWERTRAIN",
            titleCn: "电力驱动",
            desc: "掌握直流电机原理、电池组装及电机控制器接线。实现卡丁车的电力驱动。",
            status: "completed"
        },
        {
            level: 3,
            title: "CONTROL",
            titleCn: "电子控制",
            desc: "引入 ESP32 控制器，编写 PWM 调速程序，制作电子油门与仪表盘。",
            status: "active"
        },
        {
            level: 4,
            title: "TELEMETRY",
            titleCn: "遥测数据",
            desc: "加装传感器（速度、电压、温度），通过 Wi-Fi 将数据实时传输至 Web 端。",
            status: "locked"
        },
        {
            level: 5,
            title: "AUTOPILOT",
            titleCn: "辅助驾驶",
            desc: "探索计算机视觉，实现简单的车道保持辅助或自动避障功能。",
            status: "locked"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">
            {/* Background Circuit Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                            工程进阶路线
                        </h1>
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                        <p className="text-cyan-400 font-mono mt-4 tracking-widest text-sm">S.E.M.P 计划 // ENGINEERING PATH</p>
                    </motion.div>
                </div>

                <div className="max-w-2xl mx-auto">
                    {levels.map((lvl, index) => (
                        <RoadmapNode
                            key={index}
                            level={lvl.level}
                            title={`${lvl.titleCn} ${lvl.title}`}
                            desc={lvl.desc}
                            status={lvl.status}
                            delay={index * 0.1}
                        />
                    ))}

                    {/* Final Flag */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pl-12 relative"
                    >
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center bg-gray-900 text-gray-600">
                            <Flag className="w-4 h-4" />
                        </div>
                        <div className="p-4 border border-white/5 rounded-xl bg-white/5">
                            <div className="text-gray-400 font-mono text-center text-sm">所有任务目标已达成 // MISSION COMPLETE</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EkartRoadmap;
