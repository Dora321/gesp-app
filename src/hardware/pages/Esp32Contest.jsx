import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AlertTriangle, ArrowRight, ClipboardList, FileText, Lightbulb,
    ListChecks, PenLine, Target, Trophy,
} from 'lucide-react';

import { contestLessons, CONTEST_DELIVERABLES } from '../data/esp32Contest';

// 竞赛延伸包是选修加课，不是主线的一部分——所以单独一页，而不是塞进 35 课列表里。
// 页面按「七样参赛材料」组织，而不是按课次：学生和家长最关心的是
// 「上完这七次课，手里多了什么」。课次是达成材料的手段。

const TIER_TONES = [
    'border-emerald-200 bg-emerald-50 text-emerald-900',
    'border-blue-200 bg-blue-50 text-blue-900',
    'border-violet-200 bg-violet-50 text-violet-900',
];

function LessonDetail({ lesson }) {
    return (
        <div className="space-y-5">
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-amber-900">
                    <Target size={16} aria-hidden="true" /> ★ 保底目标
                </h3>
                <p className="mt-2 text-sm leading-7 text-amber-900">{lesson.baseline}</p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Target size={16} className="text-slate-500" aria-hidden="true" /> 这一课要做什么
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{lesson.goal}</p>
            </section>

            {lesson.concepts.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <Lightbulb size={16} className="text-slate-500" aria-hidden="true" /> 本课新词
                    </h3>
                    <dl className="mt-3 divide-y divide-slate-100">
                        {lesson.concepts.map((item) => (
                            <div key={item.term} className="py-3 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
                                <dt className="text-sm font-bold text-slate-900">{item.term}</dt>
                                <dd className="mt-1 text-sm leading-6 text-slate-600 sm:mt-0">{item.meaning}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            {lesson.drills.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <PenLine size={16} className="text-slate-500" aria-hidden="true" /> 照着范例套自己的课题
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        左边是贯穿范例「找家里最冷的房间」，右边的追问是要你自己想的。
                    </p>
                    <ol className="mt-4 space-y-3">
                        {lesson.drills.map((drill) => (
                            <li key={drill.sample} className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm font-bold leading-6 text-slate-800">{drill.sample}</p>
                                <p className="mt-1.5 text-sm leading-6 text-slate-600">→ {drill.prompt}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <ListChecks size={16} className="text-slate-500" aria-hidden="true" /> 分层任务
                </h3>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {lesson.tiers.map((tier, index) => (
                        <div key={tier.level} className={`rounded-xl border p-4 ${TIER_TONES[index] || TIER_TONES[0]}`}>
                            <div className="text-xs font-black">{tier.level}</div>
                            <p className="mt-2 text-sm leading-6">{tier.task}</p>
                        </div>
                    ))}
                </div>
            </section>

            {lesson.keyPoints.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <ClipboardList size={16} className="text-slate-500" aria-hidden="true" /> 记住这几句
                    </h3>
                    <ul className="mt-3 space-y-2">
                        {lesson.keyPoints.map((point) => (
                            <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {lesson.homework.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="text-sm font-bold text-slate-800">课后</h3>
                    <ul className="mt-3 space-y-2">
                        {lesson.homework.map((item) => (
                            <li key={item} className="text-sm leading-6 text-slate-700">{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            <details className="rounded-2xl border border-slate-200 bg-white">
                <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm font-bold text-slate-800">
                    <AlertTriangle size={16} className="text-slate-500" aria-hidden="true" />
                    教师用：课前准备与常见问题预案
                </summary>
                <div className="space-y-4 border-t border-slate-100 px-5 py-4">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">课前准备</h4>
                        <ul className="mt-2 space-y-1.5">
                            {lesson.prepare.map((item) => (
                                <li key={item} className="text-sm leading-6 text-slate-700">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">常见问题预案</h4>
                        <ul className="mt-2 space-y-1.5">
                            {lesson.troubles.map((item) => (
                                <li key={item} className="text-sm leading-6 text-slate-700">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </details>
        </div>
    );
}

export default function Esp32Contest() {
    const [activeId, setActiveId] = useState(contestLessons[0].id);
    const lesson = contestLessons.find((item) => item.id === activeId) || contestLessons[0];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-gradient-to-r from-violet-950 via-slate-900 to-violet-950 py-14 text-white">
                <div className="mx-auto max-w-6xl px-4 md:px-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                        <Trophy size={14} aria-hidden="true" /> 选修 · 竞赛延伸班
                    </div>
                    <h1 className="text-3xl font-black md:text-4xl">把作品变成参赛项目</h1>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                        {contestLessons.length} 次课，一行代码都不写。做的是另一件事：把你已经做出来的作品，
                        整理成<strong className="text-white">能拿去参赛的一套材料</strong>——
                        从「我做了个东西」到「我要回答什么问题」。
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                        建议在主线 35 课全部完成、手里已有一件能跑的作品之后再上。
                    </p>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <section
                    aria-labelledby="deliverables"
                    className="-mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h2 id="deliverables" className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        <FileText className="text-slate-500" size={20} aria-hidden="true" />
                        上完这七次课，你手里会多出七样东西
                    </h2>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {CONTEST_DELIVERABLES.map((item) => (
                            <li key={item.name} className="rounded-xl bg-slate-50 p-4">
                                <div className="text-xs font-bold text-violet-700">{item.from}</div>
                                <div className="mt-1 text-sm font-bold text-slate-900">{item.name}</div>
                                <p className="mt-1 text-xs leading-5 text-slate-600">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <nav aria-label="竞赛延伸班课次" className="mt-8 flex flex-wrap gap-2">
                    {contestLessons.map((item) => {
                        const isActive = item.id === lesson.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setActiveId(item.id)}
                                className={`min-h-11 rounded-xl px-4 py-2.5 text-sm font-bold transition ${isActive
                                    ? 'bg-slate-900 text-white shadow'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}
                            >
                                C{item.id} · {item.title}
                            </button>
                        );
                    })}
                </nav>

                <section aria-labelledby="lesson-detail" className="mt-6">
                    <div className="rounded-2xl bg-violet-50 p-6 ring-1 ring-violet-200">
                        <div className="text-xs font-bold text-violet-800">第 C{lesson.id} 讲</div>
                        <h2 id="lesson-detail" className="mt-1 text-2xl font-black text-violet-950">{lesson.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-violet-900">{lesson.hook}</p>
                    </div>

                    <div className="mt-5">
                        <LessonDetail lesson={lesson} />
                    </div>
                </section>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Link
                        to="/hardware/esp32-curriculum"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
                    >
                        回到主线 35 课 <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link
                        to="/hardware/esp32-map"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 transition hover:border-slate-400"
                    >
                        查看学习地图 <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
