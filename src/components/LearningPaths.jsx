import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileQuestion, GraduationCap, Hammer, ListChecks, PlayCircle } from 'lucide-react';
import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';
import { paperStats } from '../data/gesp/_stats';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';

const cppStart = getCppLevelCatalogItem(1);
const cppEnd = getCppLevelCatalogItem(8);
const firstPythonLesson = pythonFoundationLessons[0];
const lastPythonLesson = pythonFoundationLessons[pythonFoundationLessons.length - 1];
const firstPythonProject = pythonProjects[0];
const lastPythonProject = pythonProjects[pythonProjects.length - 1];

const paths = [
    {
        id: 'gesp',
        title: 'GESP 备考路径',
        audience: '适合目标明确、需要考级训练的学生',
        route: '/question-bank',
        cta: '开始刷真题',
        icon: FileQuestion,
        steps: [
            `${cppStart.title} 到 ${cppEnd.title}`,
            `${paperStats.firstYear}-${paperStats.latestYear} 年真题分卷练习`,
            `${paperStats.reviewPaperCount} 卷待精修标注，错题复盘`,
        ],
        color: 'blue'
    },
    {
        id: 'python',
        title: 'Python 入门路径',
        audience: '适合零基础、想先建立编程兴趣的学生',
        route: firstPythonLesson.path,
        cta: '进入 Python F1',
        icon: GraduationCap,
        steps: [
            `${firstPythonLesson.title} 起步`,
            `${lastPythonLesson.title} 完成基础闭环`,
            '进入项目线，把语法变成作品',
        ],
        color: 'emerald'
    },
    {
        id: 'project',
        title: 'Python 项目实践路径',
        audience: '适合已经会基础语法、想做作品的学生',
        route: firstPythonProject.path,
        cta: '进入 A1 项目课',
        icon: Hammer,
        steps: [
            `${firstPythonProject.title} 建立策略`,
            '游戏、AI、爬虫与算法项目串联',
            `${lastPythonProject.title} 收尾作品`,
        ],
        color: 'orange'
    }
];

const colorMap = {
    blue: {
        icon: 'bg-blue-600 text-white',
        border: 'hover:border-blue-200',
        text: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    emerald: {
        icon: 'bg-emerald-600 text-white',
        border: 'hover:border-emerald-200',
        text: 'text-emerald-600',
        bg: 'bg-emerald-50'
    },
    orange: {
        icon: 'bg-orange-500 text-white',
        border: 'hover:border-orange-200',
        text: 'text-orange-600',
        bg: 'bg-orange-50'
    }
};

export default function LearningPaths() {
    const navigate = useNavigate();

    return (
        <section id="learning-paths" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 max-w-3xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <ListChecks size={14} />
                        学习路径
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        先选目标，再进入课程
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-slate-600">
                        根据当前目标选择入口：准备 GESP、从 Python 入门，或者进入项目课把语法变成作品。
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {paths.map((path) => {
                        const Icon = path.icon;
                        const colors = colorMap[path.color];

                        return (
                            <button
                                key={path.id}
                                onClick={() => navigate(path.route)}
                                className={`group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${colors.border}`}
                            >
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                                        <Icon size={24} />
                                    </div>
                                    <PlayCircle className="text-slate-300 transition group-hover:text-slate-500" size={22} />
                                </div>

                                <h3 className="text-2xl font-black text-slate-950">{path.title}</h3>
                                <p className="mt-2 text-sm font-semibold text-slate-500">{path.audience}</p>

                                <div className={`mt-6 rounded-lg ${colors.bg} p-4`}>
                                    <div className="mb-3 text-xs font-black uppercase tracking-wider text-slate-500">路径顺序</div>
                                    <ol className="space-y-2">
                                        {path.steps.map((step, index) => (
                                            <li key={step} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ${colors.text}`}>
                                                    {index + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                <span className={`mt-6 inline-flex items-center gap-2 text-sm font-black ${colors.text}`}>
                                    {path.cta}
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
