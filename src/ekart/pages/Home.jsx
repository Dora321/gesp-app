
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-white">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
                    {/* Placeholder for Video Background */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-600 text-lg">[VIDEO PLACEHOLDER: Kids driving karts loop]</span>
                    </div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                            <span className="block text-white">10天，从零打造</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                你的第一台电动卡丁车
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-300 mb-8 max-w-2xl">
                            结合机械工程、电子动力与智能编程的硬核PBL营队。像真正的工程师一样思考，像职业赛车手一样驰骋。
                        </p>
                        <div className="flex gap-4">
                            <Link to="/ekart/roadmap" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] flex items-center gap-2">
                                🚀 开始学习地图
                            </Link>
                            <Link to="/ekart/gallery" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-gray-700 hover:border-gray-600">
                                🎥 观看往期精彩
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            全方位的工程挑战
                        </h2>
                        <p className="mt-4 text-gray-400">不仅仅是组装，更是对 STEAM 领域的深度探索</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-colors group"
                            >
                                <div className="w-14 h-14 bg-gray-700/50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                <div className="mt-4 text-xs font-mono text-cyan-400">{feature.days}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-cyan-900/20"></div>
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">准备好迎接挑战了吗？</h2>
                    <p className="text-gray-300 mb-12 text-lg">
                        每一个伟大的赛车手，都是从了解车辆的每一颗螺丝开始的。加入 E-Kart Lab，开启你的工程之旅。
                    </p>
                    <button className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg">
                        立即报名 (Contact Us)
                    </button>
                </div>
            </section>
        </div>
    );
};

const features = [
    {
        icon: '🔩',
        title: '机械工程',
        desc: '亲手组装阿克曼转向结构与底盘系统，理解扭矩、摩擦力与几何结构的奥秘。',
        days: 'Day 1-3'
    },
    {
        icon: '⚡',
        title: '电子动力',
        desc: '掌握锂电池能源管理与无刷轮毂电机原理，完成整车动力系统的电路搭建。',
        days: 'Day 4-5'
    },
    {
        icon: '💻',
        title: '智能编程',
        desc: '使用 Arduino 编写控制程序，集成 WS2812 灯带特效与超声波倒车雷达。',
        days: 'Day 6-9'
    },
    {
        icon: '🏁',
        title: '极速竞技',
        desc: '在真实赛道上检验你的作品，进行性能调优与最终的路演竞技。',
        days: 'Day 10'
    }
];

export default Home;
