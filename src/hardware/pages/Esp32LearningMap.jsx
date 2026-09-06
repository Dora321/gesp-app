import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Map as MapIcon, Printer, Trophy } from 'lucide-react';

import { esp32Lessons, esp32LessonsByStage, esp32Stages } from '../data/esp32Curriculum';
import { contestLessons, CONTEST_DELIVERABLES } from '../data/esp32Contest';
import {
    LESSON_STATUS_META, getLessonStatus, readLessonProgress,
} from '../../utils/lessonProgress';
import { LEARNING_DATA_EVENT } from '../../utils/learningData';

// 学习地图原来是一份 PDF 海报（每阶段一张，共 6 张）。做成网页后多了两件
// PDF 给不了的东西：一是每格标出学习者自己的状态（未学/学习中/已过关），
// 二是每格可以点进去。所以这页不是 PDF 的复刻，是它的替代。
//
// 仍然保留可打印：教室墙上要贴的话，浏览器直接打印这一页即可（print 样式已调）。

const STAGE_TONES = {
    emerald: { ring: 'ring-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-900', bar: 'bg-emerald-500' },
    blue: { ring: 'ring-blue-200', bg: 'bg-blue-50', text: 'text-blue-900', bar: 'bg-blue-500' },
    violet: { ring: 'ring-violet-200', bg: 'bg-violet-50', text: 'text-violet-900', bar: 'bg-violet-500' },
    amber: { ring: 'ring-amber-200', bg: 'bg-amber-50', text: 'text-amber-900', bar: 'bg-amber-500' },
    rose: { ring: 'ring-rose-200', bg: 'bg-rose-50', text: 'text-rose-900', bar: 'bg-rose-500' },
};

function useLessonStatuses() {
    const [progress, setProgress] = useState(() => readLessonProgress());

    useEffect(() => {
        const refresh = () => setProgress(readLessonProgress());
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener(LEARNING_DATA_EVENT, refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    return useMemo(() => {
        const map = {};
        esp32Lessons.forEach((lesson) => {
            map[lesson.num] = getLessonStatus(`/hardware/esp32/${lesson.num}`, progress);
        });
        return map;
    }, [progress]);
}

function LessonCell({ lesson, status }) {
    const meta = LESSON_STATUS_META[status] || LESSON_STATUS_META.unseen;

    return (
        <Link
            to={`/hardware/esp32/${lesson.num}`}
            className="group flex min-h-11 items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-3 transition hover:border-slate-400 hover:shadow-sm"
        >
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.dot}`} aria-hidden="true" />
            <span className="min-w-0">
                {/* 状态的颜色信号由左侧圆点承担：12px 的字用 meta.text（未学是
                    slate-400）在白底上只有 2.6 的对比度，过不了 AA。 */}
                <span className="block text-xs font-bold text-slate-600">
                    L{lesson.num} · {meta.label}
                </span>
                <span className="mt-0.5 block text-sm font-bold leading-5 text-slate-800 group-hover:text-cyan-700">
                    {lesson.title}
                </span>
            </span>
        </Link>
    );
}

export default function Esp32LearningMap() {
    const statuses = useLessonStatuses();

    const masteredCount = useMemo(
        () => Object.values(statuses).filter((s) => s === 'mastered' || s === 'review').length,
        [statuses],
    );
    const percent = Math.round((masteredCount / esp32Lessons.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <style>{`
                @media print {
                    .map-no-print { display: none !important; }
                    .map-stage { break-inside: avoid; page-break-inside: avoid; }
                }
            `}</style>

            <header className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 py-14 text-white">
                <div className="mx-auto max-w-6xl px-4 md:px-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                        <MapIcon size={14} aria-hidden="true" /> 学习地图
                    </div>
                    <h1 className="text-3xl font-black md:text-4xl">ESP32 × AI 科创课程 · 全程地图</h1>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                        {esp32Stages.length} 个阶段 {esp32Lessons.length} 课，外加 {contestLessons.length} 讲竞赛延伸。
                        每一格标着<strong className="text-white">你自己的状态</strong>，点开就能上课。
                    </p>

                    <div className="mt-6 max-w-md">
                        <div className="flex items-baseline justify-between text-sm font-bold">
                            <span className="text-slate-300">已过关</span>
                            <span className="text-2xl font-black">{masteredCount} / {esp32Lessons.length}</span>
                        </div>
                        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15">
                            <div
                                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-400">
                            进度按每课的「完成检查单」计，只保存在这台设备的浏览器里。
                        </p>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="map-no-print -mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {Object.entries(LESSON_STATUS_META).map(([key, meta]) => (
                            <li key={key} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                                {meta.label}
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                        <Printer size={16} aria-hidden="true" /> 打印贴墙上
                    </button>
                </div>

                {esp32Stages.map((stage) => {
                    const tone = STAGE_TONES[stage.color] || STAGE_TONES.blue;
                    const lessons = esp32LessonsByStage(stage.id);
                    const done = lessons.filter(
                        (l) => statuses[l.num] === 'mastered' || statuses[l.num] === 'review',
                    ).length;

                    return (
                        <section
                            key={stage.id}
                            aria-labelledby={`stage-${stage.id}`}
                            className="map-stage mt-8"
                        >
                            <div className={`rounded-2xl p-5 ring-1 ${tone.bg} ${tone.ring} ${tone.text}`}>
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <div>
                                        <div className="text-xs font-bold">
                                            阶段 {stage.id} · {stage.lessonRange} · {stage.aiRole}
                                        </div>
                                        <h2 id={`stage-${stage.id}`} className="mt-1 text-xl font-black md:text-2xl">
                                            {stage.title}
                                        </h2>
                                    </div>
                                    <div className="text-sm font-bold">
                                        {done} / {stage.lessonCount} 已过关
                                    </div>
                                </div>
                                <p className="mt-2 text-sm leading-6">{stage.description}</p>
                                <p className="mt-3 text-sm font-bold">驱动问题：{stage.drivingQuestion}</p>
                                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/60">
                                    <div
                                        className={`h-full rounded-full ${tone.bar} transition-all duration-500`}
                                        style={{ width: `${(done / stage.lessonCount) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <ol className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                                {lessons.map((lesson) => (
                                    <li key={lesson.num}>
                                        <LessonCell lesson={lesson} status={statuses[lesson.num]} />
                                    </li>
                                ))}
                            </ol>
                        </section>
                    );
                })}

                <section aria-labelledby="contest-stage" className="map-stage mt-10">
                    <div className="rounded-2xl bg-violet-50 p-5 ring-1 ring-violet-200 text-violet-900">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold">
                                    <Trophy size={13} aria-hidden="true" /> 选修 · 主线之后
                                </div>
                                <h2 id="contest-stage" className="mt-1 text-xl font-black md:text-2xl">
                                    竞赛延伸班 · {contestLessons.length} 讲
                                </h2>
                            </div>
                            <Link
                                to="/hardware/esp32-contest"
                                className="map-no-print inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-800"
                            >
                                进入竞赛班
                            </Link>
                        </div>
                        <p className="mt-2 text-sm leading-6">
                            一行代码都不写，把做好的作品整理成参赛材料。
                        </p>
                    </div>

                    <ol className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                        {contestLessons.map((lesson) => (
                            <li key={lesson.id}>
                                <Link
                                    to="/hardware/esp32-contest"
                                    className="group flex min-h-11 flex-col rounded-lg border border-slate-200 bg-white p-3 transition hover:border-violet-400 hover:shadow-sm"
                                >
                                    <span className="text-xs font-bold text-violet-700">C{lesson.id}</span>
                                    <span className="mt-0.5 text-sm font-bold leading-5 text-slate-800 group-hover:text-violet-800">
                                        {lesson.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Award size={16} className="text-slate-500" aria-hidden="true" /> 终点：七样参赛材料
                        </h3>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {CONTEST_DELIVERABLES.map((item) => (
                                <li
                                    key={item.name}
                                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
