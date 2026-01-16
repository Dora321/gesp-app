
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Trophy, Gauge, Users, Star, ArrowRight } from 'lucide-react';

const GalleryItem = ({ title, titleCn, team, year, image, stats, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex-shrink-0 w-[400px] md:w-[600px] snap-center aspect-[16/9] bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] shadow-2xl"
        >
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Year Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 font-mono text-xs text-white">
                    RACING_SEASON_{year}
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        <Users className="w-4 h-4" /> TEAM {team}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-1">{title}</h2>
                    <h3 className="text-xl text-gray-300 font-bold mb-4">{titleCn}</h3>

                    {/* Stats Grid - Hidden initially, reveals on hover */}
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <div className="text-[10px] text-gray-500 uppercase font-mono">{stat.label}</div>
                                <div className="text-lg font-bold text-white font-mono">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const EkartGallery = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    const showcases = [
        {
            title: "THUNDERBOLT X",
            titleCn: "雷霆 X",
            team: "ALPHA_SQUAD",
            year: "2025",
            image: "https://images.unsplash.com/photo-1559981421-3e0c0d7faed9?q=80&w=1000&auto=format&fit=crop",
            stats: [
                { label: "最高时速", value: "62 KM/H" },
                { label: "0-60 加速", value: "3.2 S" },
                { label: "点击功率", value: "3000W" }
            ]
        },
        {
            title: "PHANTOM AERO",
            titleCn: "幻影气动",
            team: "DESIGN_LAB_2",
            year: "2024",
            image: "https://images.unsplash.com/photo-1532986475308-3ab5b207j2d1?q=80&w=1000&auto=format&fit=crop", // Intentionally using placeholders or random kart images url logic for safety/demo
            stats: [
                { label: "风阻系数", value: "0.28 Cd" },
                { label: "电池规格", value: "72V 40Ah" },
                { label: "整车重量", value: "85 KG" }
            ]
        },
        {
            title: "CYBER DRIFTER",
            titleCn: "赛博漂移者",
            team: "NEON_RIDERS",
            year: "2025",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
            stats: [
                { label: "轮胎类型", value: "热融胎" },
                { label: "漂移角度", value: "45 DEG" },
                { label: "电机扭矩", value: "120 NM" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden" ref={scrollRef}>
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black pointer-events-none" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="max-w-[1920px] mx-auto px-4 sm:px-8 relative z-10 overflow-hidden">
                <div className="flex justify-between items-end mb-16 px-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="text-yellow-400 w-6 h-6" />
                            <span className="text-sm font-mono tracking-widest text-yellow-500 uppercase">E-KART HALL OF FAME</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
                            车队展厅
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-gray-500 font-mono text-sm">
                        <span className="animate-pulse">滑动探索更多</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Horizontal Scroll Area */}
                <div className="flex overflow-x-auto pb-12 gap-8 snap-x snap-mandatory hide-scrollbar px-4">
                    {showcases.map((item, i) => (
                        <GalleryItem key={i} {...item} index={i} />
                    ))}
                    {/* Placeholder for 'See More' */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex-shrink-0 w-[200px] flex items-center justify-center snap-center"
                    >
                        <div className="text-center group cursor-pointer">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                            <div className="font-mono text-sm text-gray-400 group-hover:text-white">查看归档</div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Decor */}
                <div className="mt-12 border-t border-white/5 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
                    {[
                        { icon: Camera, label: "精彩瞬间", value: "2,450+" },
                        { icon: Gauge, label: "实战视频", value: "180+" },
                        { icon: Star, label: "获得奖项", value: "15" },
                        { icon: Users, label: "车队成员", value: "320" },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <stat.icon className="w-5 h-5 text-gray-500" />
                            <div>
                                <div className="text-lg font-bold font-mono text-white">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EkartGallery;
