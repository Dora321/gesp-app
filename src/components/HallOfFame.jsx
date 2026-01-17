import React from 'react';
import { Trophy, Bug, Rocket, Crown, Star } from 'lucide-react';

export default function HallOfFame() {
    const stats = [
        {
            id: 1,
            label: 'GESP 8级大神',
            value: '12',
            icon: <Crown size={32} className="text-yellow-500" />,
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        },
        {
            id: 2,
            label: 'Bug Hunter',
            value: '1,024+',
            icon: <Bug size={32} className="text-red-500" />,
            bg: 'bg-red-500/10',
            border: 'border-red-500/20'
        },
        {
            id: 3,
            label: '上线作品',
            value: '350+',
            icon: <Rocket size={32} className="text-blue-500" />,
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            id: 4,
            label: '五星好评',
            value: '99%',
            icon: <Star size={32} className="text-emerald-500" />,
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20'
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="mb-16">
                    <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                        不仅仅是学习，更是成就
                    </h2>
                    <p className="text-xl text-slate-500">
                        加入精英社区，见证代码的力量。
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat) => (
                        <div key={stat.id} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg hover:-translate-y-1 transition-transform duration-300">
                            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${stat.bg} ${stat.border} border`}>
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-extrabold text-brand-slate mb-1 font-mono">
                                {stat.value}
                            </div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Marquee / Recent / Quote */}
                <div className="bg-slate-50 rounded-2xl p-8 max-w-3xl mx-auto border border-slate-100 relative">
                    <span className="text-6xl text-brand-blue/20 absolute top-4 left-4 font-serif">"</span>
                    <p className="text-lg text-slate-600 italic relative z-10 mb-4 font-medium">
                        “我从来没想过代码可以这么好玩。我用 Python 写了一个自动提醒喝水的机器人，全家人都在用！”
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xs">
                            Z
                        </div>
                        <div className="text-sm text-slate-500 font-bold">
                            张同学 · 五年级 · GESP 4级通过
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
