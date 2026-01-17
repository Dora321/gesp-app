import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Shield, GitBranch, Star, Clock, ChevronRight, Play } from 'lucide-react';

export default function FeaturedProjects() {
    const navigate = useNavigate();

    const projects = [
        {
            id: 'snake',
            category: 'GAME DEV',
            title: '贪吃蛇大作战',
            desc: '不仅仅是游戏，更是 AI 入门。编写自动寻路算法，让你的蛇自己抓猎物。',
            difficulty: 2,
            time: '2h',
            icon: <Gamepad2 size={24} className="text-white" />,
            color: 'from-orange-400 to-red-500',
            bg: 'bg-orange-500/10',
            path: '/python/a2'
        },
        {
            id: 'morse',
            category: 'HACKER',
            title: '007 摩斯密码',
            desc: '编写加密与解密器，用字典映射发送秘密情报。像特工一样思考。',
            difficulty: 1,
            time: '45min',
            icon: <Shield size={24} className="text-white" />,
            color: 'from-blue-400 to-indigo-500',
            bg: 'bg-blue-500/10',
            path: '/python/encryption'
        },
        {
            id: 'maze',
            category: 'ALGORITHM',
            title: '迷宫自动寻路',
            desc: '广度优先搜索 (BFS) 可视化。看着算法像水流一样漫在迷宫中寻找出口。',
            difficulty: 4,
            time: '5h',
            icon: <GitBranch size={24} className="text-white" />,
            color: 'from-emerald-400 to-teal-500',
            bg: 'bg-emerald-500/10',
            path: '/level6'
        }
    ];

    return (
        <section id="projects-section" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-12 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                            学完能做什么？
                        </h2>
                        <p className="text-xl text-slate-500 max-w-xl">
                            别只学语法。在实战项目中，用代码解决真实问题，创造属于你的作品。
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/level1')}
                        className="flex items-center gap-2 font-bold text-brand-blue hover:text-blue-600 transition-colors group"
                    >
                        查看所有项目 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => navigate(project.path)}
                            className="group relative bg-white rounded-2xl border border-slate-200 hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                        >
                            {/* Color Bar Top */}
                            <div className={`h-2 w-full bg-gradient-to-r ${project.color}`}></div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${project.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                        {project.icon}
                                    </div>
                                    <span className="text-xs font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-brand-slate mb-3 group-hover:text-brand-blue transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed flex-1">
                                    {project.desc}
                                </p>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                                    <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < project.difficulty ? "currentColor" : "none"}
                                                    className={i < project.difficulty ? "text-yellow-400" : "text-slate-200"}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {project.time}
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
                                        <Play size={14} className="ml-0.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
