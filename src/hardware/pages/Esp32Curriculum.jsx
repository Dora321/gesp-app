import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Sparkles, Terminal, Wrench } from 'lucide-react';

import { esp32Lessons, esp32Stages, esp32PracticalLessons } from '../data/esp32Curriculum';

// 课程主线是 AI 角色的五段演进，不是 MicroPython 语法表。页面按阶段组织，
// 让家长和学生一眼看出「学完这一段，孩子和 AI 的关系变成了什么」。

const STAGE_TONES = {
    emerald: { chip: 'bg-emerald-50 text-emerald-800 ring-emerald-200', dot: 'bg-emerald-500', bar: 'bg-emerald-500' },
    blue: { chip: 'bg-blue-50 text-blue-800 ring-blue-200', dot: 'bg-blue-500', bar: 'bg-blue-500' },
    violet: { chip: 'bg-violet-50 text-violet-800 ring-violet-200', dot: 'bg-violet-500', bar: 'bg-violet-500' },
    amber: { chip: 'bg-amber-50 text-amber-900 ring-amber-200', dot: 'bg-amber-500', bar: 'bg-amber-500' },
    rose: { chip: 'bg-rose-50 text-rose-800 ring-rose-200', dot: 'bg-rose-500', bar: 'bg-rose-500' },
};

function LessonCard({ lesson, tone }) {
    const [showCode, setShowCode] = useState(false);

    return (
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start gap-3">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800">
                        <Link to={`/hardware/esp32/${lesson.num}`} className="hover:text-cyan-700 hover:underline">
                            第 {lesson.num} 课 · {lesson.title}
                        </Link>
                    </h4>
                    {lesson.hook && (
                        <p className="mt-1 text-sm leading-6 text-slate-500">{lesson.hook}</p>
                    )}
                    <p className="mt-2 text-sm leading-6 text-slate-700">{lesson.goal}</p>

                    <Link
                        to={`/hardware/esp32/${lesson.num}`}
                        className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-cyan-700 hover:underline"
                    >
                        进入这一课 <ArrowRight size={13} aria-hidden="true" />
                    </Link>

                    {lesson.starterCode && (
                        <>
                            <button
                                type="button"
                                onClick={() => setShowCode((open) => !open)}
                                aria-expanded={showCode}
                                className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                            >
                                <Terminal size={14} aria-hidden="true" />
                                {showCode ? '收起起步代码' : '查看起步代码'}
                            </button>
                            {showCode && (
                                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-6 text-slate-100">
                                    <code>{lesson.starterCode}</code>
                                </pre>
                            )}
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function Esp32Curriculum() {
    const [activeStage, setActiveStage] = useState(esp32Stages[0].id);
    const stage = useMemo(
        () => esp32Stages.find((item) => item.id === activeStage) || esp32Stages[0],
        [activeStage],
    );
    const lessons = useMemo(
        () => esp32Lessons.filter((lesson) => lesson.stageId === stage.id),
        [stage],
    );
    const tone = STAGE_TONES[stage.color] || STAGE_TONES.blue;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-14 text-white">
                <div className="mx-auto max-w-6xl px-4 md:px-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                        <Cpu size={14} aria-hidden="true" /> AI 硬件课程
                    </div>
                    <h1 className="text-3xl font-black md:text-4xl">ESP32 × AI 科创课程</h1>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                        面向小学高年级的 {esp32Lessons.length} 课时体系。主线不是 MicroPython 语法，
                        而是<strong className="text-white">学生与 AI 关系的演进</strong>——
                        从只敢读 AI 写的代码，到把 AI 装进自己的作品里。
                    </p>
                    <dl className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-3">
                        <div>
                            <dt className="text-xs font-bold text-slate-400">课时</dt>
                            <dd className="text-2xl font-black">{esp32Lessons.length} 课</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-slate-400">阶段</dt>
                            <dd className="text-2xl font-black">{esp32Stages.length} 个</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-slate-400">带可跑代码</dt>
                            <dd className="text-2xl font-black">{esp32PracticalLessons.length} 课</dd>
                        </div>
                    </dl>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <section aria-labelledby="stage-path" className="-mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 id="stage-path" className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        <Layers className="text-slate-500" size={20} aria-hidden="true" /> AI 角色的五段演进
                    </h2>
                    <ol className="mt-5 grid gap-3 md:grid-cols-5">
                        {esp32Stages.map((item) => {
                            const itemTone = STAGE_TONES[item.color] || STAGE_TONES.blue;
                            const isActive = item.id === stage.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveStage(item.id)}
                                        aria-pressed={isActive}
                                        className={`h-full w-full rounded-xl border p-4 text-left transition ${isActive
                                            ? 'border-slate-800 bg-slate-900 text-white shadow'
                                            : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                    >
                                        <div className={`mb-2 h-1 w-10 rounded-full ${itemTone.bar}`} aria-hidden="true" />
                                        <div className={`text-xs font-bold ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                                            阶段 {item.id} · {item.lessonRange}
                                        </div>
                                        <div className="mt-1 font-black">{item.title}</div>
                                        <div className={`mt-1 text-xs leading-5 ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {item.aiRole}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                <section aria-labelledby="stage-detail" className="mt-8">
                    <div className={`rounded-2xl p-6 ring-1 ${tone.chip}`}>
                        <div className="text-xs font-bold">阶段 {stage.id} · {stage.lessonRange} · 共 {stage.lessonCount} 课</div>
                        <h2 id="stage-detail" className="mt-1 text-2xl font-black">{stage.title}</h2>
                        <p className="mt-2 text-sm leading-6">{stage.description}</p>
                        <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm font-bold">
                            <Sparkles size={15} aria-hidden="true" />
                            驱动问题：{stage.drivingQuestion}
                        </p>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {lessons.map((lesson) => (
                            <LessonCard key={lesson.num} lesson={lesson} tone={tone} />
                        ))}
                    </div>
                </section>

                <section aria-labelledby="hardware-note" className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 id="hardware-note" className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        <Wrench className="text-slate-500" size={20} aria-hidden="true" /> 上课需要准备什么
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {[
                            ['硬件', '每组 1 块 ESP32；按课次增加按钮、OLED、DHT11、蜂鸣器、灯带'],
                            ['开发环境', 'PyCharm Community + MicroPython Tools 插件，只碰 main.py、连接、上传三处'],
                            ['AI 工具', 'DeepSeek 网页版；站内的 AI 助教也可直接用于课堂提问练习'],
                        ].map(([term, detail]) => (
                            <div key={term} className="rounded-xl bg-slate-50 p-4">
                                <div className="text-sm font-bold text-slate-800">{term}</div>
                                <p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs leading-6 text-slate-500">
                        每课均配教案、学生讲义与课堂 PPT 三件套；实操课的起步代码在本页可直接展开查看，
                        学生在能跑通的基础上迭代，而不是从空白文件开始。
                    </p>
                    <Link
                        to="/hardware/esp32-ai"
                        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
                    >
                        查看前 16 课的教学法详解 <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </section>
            </div>
        </div>
    );
}
