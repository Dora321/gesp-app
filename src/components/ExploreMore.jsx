import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Cpu, Landmark, Wrench } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';

const items = [
    {
        title: '学习工具',
        desc: 'AI 助教、课堂积分和调试演示，辅助学生在练习中及时看到反馈。',
        action: '查看工具演示',
        target: 'tools-section',
        icon: Wrench
    },
    {
        title: '计算博物馆',
        desc: '适合作为计算机文化与课堂彩蛋，负责拓展兴趣。',
        action: '进入博物馆',
        route: '/museum',
        icon: Landmark
    },
    {
        title: '硬件工坊',
        desc: '从 ESP32、Arduino 到工程小实验，把代码接到真实设备上。',
        action: '查看硬件课',
        route: '/hardware',
        icon: Cpu
    },
    {
        title: 'E-Kart Lab',
        desc: '围绕小车项目组织任务、素材和成果展示，适合做阶段作品。',
        action: '进入项目站',
        route: '/ekart',
        icon: Bot
    }
];

export default function ExploreMore() {
    const navigate = useNavigate();
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleClick = (item) => {
        if (item.route) {
            navigate(item.route);
            return;
        }
        document.getElementById(item.target)?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    return (
        <section className="bg-slate-950 py-20 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-black uppercase tracking-wider text-blue-300">探索内容</p>
                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">工具与拓展</h2>
                    </div>
                    <p className="max-w-2xl text-slate-400">
                        课堂辅助、计算机文化、硬件实践和项目展示集中在这里，适合课后继续探索。
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.title}
                                onClick={() => handleClick(item)}
                                className="group flex min-h-[15rem] flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.06]"
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-blue-200">
                                    <Icon size={22} />
                                </div>
                                <h3 className="text-xl font-black">{item.title}</h3>
                                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{item.desc}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-300">
                                    {item.action}
                                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
