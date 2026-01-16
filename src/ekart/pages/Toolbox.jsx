
import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileCode, Sliders, Box, PenTool, Cpu, FileText, ExternalLink, Activity } from 'lucide-react';

const ToolCard = ({ title, type, size, icon: Icon, color, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4 }}
            className="group relative bg-[#0a0b10] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-colors h-64 flex flex-col p-6 cursor-pointer"
        >
            {/* Hover Glitch Effect Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="flex justify-between items-start mb-auto relative z-10">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase border border-white/10 px-2 py-1 rounded">
                    {type}
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{title}</h3>
                <div className="flex justify-between items-end mt-4">
                    <span className="text-xs font-mono text-gray-500">{size}</span>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-black transition-all">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tech Decoration Lines */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-cyan-500 transition-all opacity-50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/50" />
        </motion.div>
    );
};

const EkartToolbox = () => {
    const resources = [
        { title: "底盘设计图纸 v2.0", type: "CAD_FILE", size: "24.5 MB", icon: Box, color: "from-blue-500 to-cyan-500" },
        { title: "ESP32 固件源码", type: "CODE_REPO", size: "1.2 MB", icon: FileCode, color: "from-green-500 to-emerald-500" },
        { title: "电机控制接线图", type: "SCHEMATIC", size: "4.8 MB", icon: Sliders, color: "from-yellow-500 to-orange-500" },
        { title: "3D 打印部件包", type: "STL_PACK", size: "156 MB", icon: PenTool, color: "from-purple-500 to-pink-500" },
        { title: "遥测仪表盘软件", type: "SOFTWARE", size: "installer", icon: Activity, color: "from-cyan-500 to-blue-500" },
        { title: "数据手册: Li-ion 21700", type: "PDF_DOC", size: "850 KB", icon: FileText, color: "from-gray-500 to-white" }
    ];

    // Re-importing missing icon if necessary, assuming FileText as replacement for now or just generic doc

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
                            数字军械库 <span className="text-cyan-500">.</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-sm max-w-md">
                            // 核心开发资源库。仅限授权人员访问。
                        </p>
                        <p className="text-gray-500 mt-1">DIGITAL ARMORY // 资源下载</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded bg-black">
                            <Cpu className="w-3 h-3" /> SERVERS: ONLINE
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((res, i) => (
                        <ToolCard
                            key={i}
                            {...res}
                            delay={i * 0.1}
                        />
                    ))}
                </div>

                {/* External Tools Section */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <ExternalLink className="text-cyan-500" /> 外部协作工具
                    </h2>
                    <div className="bg-[#0a0b10] border border-white/10 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between group hover:border-cyan-500/30 transition-colors">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">OnShape 云端 CAD</h3>
                            <p className="text-gray-400 text-sm max-w-lg">基于云端的 3D CAD 设计平台。使用团队许可证即可在浏览器中直接查看和编辑底盘模型。</p>
                        </div>
                        <button className="px-6 py-3 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded font-mono text-sm hover:bg-cyan-500 hover:text-black transition-all">
                            启动应用 &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EkartToolbox;
