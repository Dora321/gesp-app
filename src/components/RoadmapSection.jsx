import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, Map, Swords, Crown, ChevronRight, Star } from 'lucide-react';

export default function RoadmapSection() {
    const navigate = useNavigate();
    const [activeStage, setActiveStage] = useState('adventurer');

    const stages = [
        {
            id: 'novice',
            title: '新手村',
            level: 'Level 1-2',
            desc: '我完全不懂代码，但我会玩电脑。',
            tasks: ['Hello World', '变量盒子', '条件判断'],
            courses: ['Python A1', 'C++ L1'],
            path: '/level1',
            icon: <Flag size={24} />,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500',
            border: 'border-emerald-200'
        },
        {
            id: 'adventurer',
            title: '冒险者',
            level: 'Level 3-5',
            desc: '我能修改游戏参数，开始制作小工具。',
            tasks: ['循环魔法', '列表宝箱', '函数咒语'],
            courses: ['Python A2-A4', 'C++ L2-L4'],
            path: '/level3',
            icon: <Map size={24} />,
            color: 'text-blue-500',
            bg: 'bg-blue-500',
            border: 'border-blue-200'
        },
        {
            id: 'challenger',
            title: '挑战者',
            level: 'Level 6-8',
            desc: '我追求代码效率，想要参加比赛。',
            tasks: ['算法迷宫', '数据结构', '真题试炼'],
            courses: ['C++ L5-L8', 'GESP 考级'],
            path: '/level6',
            icon: <Swords size={24} />,
            color: 'text-purple-500',
            bg: 'bg-purple-500',
            border: 'border-purple-200'
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="maps-section">
            {/* Background Map Decoration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 Q 25 50 50 50 T 100 0" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-blue-600" />
                </svg>
            </div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                        你的成长地图
                    </h2>
                    <p className="text-xl text-slate-500">
                        从零基础到算法大师，每一步都清晰可见。
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-slate-200 -z-10"></div>

                    {stages.map((stage, index) => (
                        <div
                            key={stage.id}
                            onMouseEnter={() => setActiveStage(stage.id)}
                            onClick={() => navigate(stage.path)}
                            className={`
                                relative p-8 rounded-2xl bg-white border transition-all duration-300 cursor-pointer
                                ${activeStage === stage.id
                                    ? `shadow-xl scale-105 ${stage.border.replace('border-', 'border-')}`
                                    : 'border-slate-100 shadow-sm opacity-80 hover:opacity-100'}
                            `}
                        >
                            {/* Icon Node */}
                            <div className={`
                                mx-auto w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg mb-6 transition-transform
                                ${activeStage === stage.id ? `${stage.bg} scale-110` : 'bg-slate-300'}
                            `}>
                                {index + 1}
                            </div>

                            <div className="text-center mb-6">
                                <h3 className={`text-2xl font-bold mb-2 ${activeStage === stage.id ? 'text-brand-slate' : 'text-slate-400'}`}>
                                    {stage.title}
                                </h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                    {stage.level}
                                </p>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    "{stage.desc}"
                                </p>
                            </div>

                            {/* Details (Visible when active) */}
                            <div className={`
                                space-y-4 transition-all duration-500 overflow-hidden
                                ${activeStage === stage.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <h4 className="font-bold text-xs text-slate-400 uppercase mb-3">解锁技能</h4>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {stage.tasks.map(task => (
                                            <span key={task} className="px-2 py-1 rounded text-xs font-bold bg-white border border-slate-200 text-slate-600">
                                                {task}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <span className={`text-sm font-bold ${stage.color} flex items-center justify-center gap-1`}>
                                        点击进入课程 <ChevronRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
