import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Shield, GitBranch, Star, Clock, ChevronRight, Play } from 'lucide-react';
import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';
import { getPythonProjectSupport } from '../data/pythonProjectFlow';

function getPythonProjectCard(projectId, overrides) {
    const support = getPythonProjectSupport(projectId);

    return {
        ...overrides,
        title: support.current.title,
        desc: `${support.brief.outcome}，产出：${support.brief.artifact}。`,
        time: support.brief.duration,
        path: support.current.path
    };
}

const cppLevel7 = getCppLevelCatalogItem(7);

const projects = [
    getPythonProjectCard('a2', {
        id: 'game2048',
        category: 'GAME DEV',
        difficulty: 2,
        icon: <Gamepad2 size={24} className="text-white" />,
        color: 'from-orange-400 to-red-500',
        bg: 'bg-orange-500/10',
    }),
    getPythonProjectCard('morse', {
        id: 'morse',
        category: 'SIGNAL CODE',
        difficulty: 1,
        icon: <Shield size={24} className="text-white" />,
        color: 'from-blue-400 to-indigo-500',
        bg: 'bg-blue-500/10',
    }),
    {
        id: 'bfs-maze',
        category: 'ALGORITHM',
        title: '图搜索与迷宫寻路',
        desc: `${cppLevel7.title}专题，用 BFS 理解无权最短路和迷宫分层扩散。`,
        difficulty: 4,
        time: '4-5课时',
        icon: <GitBranch size={24} className="text-white" />,
        color: 'from-emerald-400 to-teal-500',
        bg: 'bg-emerald-500/10',
        path: cppLevel7.path
    }
];

export default function FeaturedProjects() {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-12 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                            项目与算法专题
                        </h2>
                        <p className="text-xl text-slate-500 max-w-xl">
                            Python 项目负责把语法做成作品，C++ 算法专题负责把解题模型练扎实。
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/python/a1')}
                        className="flex items-center gap-2 font-bold text-brand-blue hover:text-blue-600 transition-colors group"
                    >
                        进入 Python 项目线 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
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
