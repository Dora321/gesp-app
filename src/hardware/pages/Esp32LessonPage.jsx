import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    AlertTriangle, ArrowLeft, ArrowRight, BookOpen, Check, ClipboardList,
    Copy, GraduationCap, Lightbulb, ListChecks, Package, Target,
} from 'lucide-react';

import { esp32Lessons, getEsp32Lesson, getEsp32Stage } from '../data/esp32Curriculum';
import { getLessonStatus, recordLessonMastered, recordLessonVisit } from '../../utils/lessonProgress';
import { LEARNING_DATA_EVENT } from '../../utils/learningData';

// 一课一页，页内切换「自学」与「上课」两种模式——两边读的是同一份课件数据，
// 只是取用不同的部分：
//   自学：今天做什么 → 新概念 → 起步代码 → 操作要点 → 动手任务 → 完成检查单
//   上课：★保底目标 → 课前准备 → 常见问题预案
// 分成两套页面会让老师备课时来回切，也会让同一份内容维护两遍。
//
// 检查单接进站内既有的课程进度体系：全部勾选即记为「已过关」，
// 与 C++ 课的 MasteryCheck 是同一套 localStorage 数据，首页「继续学习」能读到。

const MODES = [
    { id: 'study', label: '自学模式', icon: BookOpen, hint: '一个人跟着做' },
    { id: 'teach', label: '上课模式', icon: GraduationCap, hint: '老师带着上' },
];

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            // 剪贴板不可用时静默失败：代码本来就显示在页面上，可以手动选中复制
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-100 transition hover:bg-slate-600"
        >
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? '已复制' : '复制代码'}
        </button>
    );
}

function Block({ icon: Icon, title, tone = 'slate', children }) {
    const tones = {
        slate: 'border-slate-200 bg-white',
        amber: 'border-amber-200 bg-amber-50',
        emerald: 'border-emerald-200 bg-emerald-50',
        rose: 'border-rose-200 bg-rose-50',
    };
    return (
        <section className={`rounded-2xl border p-5 ${tones[tone]}`}>
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800">
                <Icon size={18} className="shrink-0 text-slate-500" aria-hidden="true" />
                {title}
            </h2>
            {children}
        </section>
    );
}

const Bullets = ({ items }) => (
    <ul className="space-y-2">
        {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

export default function Esp32LessonPage() {
    const { num } = useParams();
    const lesson = getEsp32Lesson(num);
    const stage = lesson ? getEsp32Stage(lesson.stageId) : null;
    const path = `/hardware/esp32/${num}`;

    const [mode, setMode] = useState('study');
    const [checked, setChecked] = useState(() => new Set());
    const [status, setStatus] = useState('unseen');

    useEffect(() => {
        if (!lesson) return;
        recordLessonVisit(path);
        setChecked(new Set());
        setStatus(getLessonStatus(path));
    }, [lesson, path]);

    useEffect(() => {
        const refresh = () => setStatus(getLessonStatus(path));
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        return () => window.removeEventListener(LEARNING_DATA_EVENT, refresh);
    }, [path]);

    const allDone = Boolean(lesson) && lesson.checklist.length > 0 && checked.size === lesson.checklist.length;

    useEffect(() => {
        if (allDone) recordLessonMastered(path);
    }, [allDone, path]);

    const neighbours = useMemo(() => {
        const index = esp32Lessons.findIndex((item) => item.num === Number(num));
        return {
            previous: index > 0 ? esp32Lessons[index - 1] : null,
            next: index >= 0 && index < esp32Lessons.length - 1 ? esp32Lessons[index + 1] : null,
        };
    }, [num]);

    if (!lesson) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-slate-800">没有找到这一课</h1>
                <Link to="/hardware/esp32-curriculum" className="mt-4 inline-block font-bold text-cyan-700">
                    返回课程体系
                </Link>
            </div>
        );
    }

    const toggle = (item) => setChecked((current) => {
        const next = new Set(current);
        if (next.has(item)) next.delete(item); else next.add(item);
        return next;
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-slate-900 py-10 text-white">
                <div className="mx-auto max-w-4xl px-4 md:px-8">
                    <Link
                        to="/hardware/esp32-curriculum"
                        className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white"
                    >
                        <ArrowLeft size={16} aria-hidden="true" /> 课程体系
                    </Link>
                    <div className="text-xs font-bold text-slate-400">
                        {stage?.title} · {lesson.lessonType || '课时'}
                        {status === 'mastered' && <span className="ml-2 text-emerald-400">· 已过关</span>}
                    </div>
                    <h1 className="mt-1 text-3xl font-black">第 {lesson.num} 课 · {lesson.title}</h1>
                    {lesson.hook && <p className="mt-2 text-sm leading-6 text-slate-300">{lesson.hook}</p>}

                    <div className="mt-6 inline-flex rounded-xl bg-white/10 p-1" role="tablist" aria-label="阅读模式">
                        {MODES.map((item) => {
                            const Icon = item.icon;
                            const active = mode === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setMode(item.id)}
                                    className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${active ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'}`}
                                >
                                    <Icon size={16} aria-hidden="true" />
                                    {item.label}
                                    <span className={`hidden text-xs font-semibold sm:inline ${active ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {item.hint}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-4xl space-y-5 px-4 pt-8 md:px-8">
                {mode === 'study' ? (
                    <>
                        <Block icon={Target} title="① 今天要做什么" tone="emerald">
                            <p className="text-sm leading-7 text-slate-800">{lesson.goal}</p>
                        </Block>

                        {lesson.concepts.length > 0 && (
                            <Block icon={Lightbulb} title="② 本课新概念">
                                <Bullets items={lesson.concepts} />
                            </Block>
                        )}

                        {lesson.starterCode && (
                            <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <h2 className="text-base font-bold text-white">起步代码</h2>
                                    <CopyButton text={lesson.starterCode} />
                                </div>
                                <p className="mb-3 text-xs leading-5 text-slate-400">
                                    先把这几行跑通，看到预期结果再往下做——不要从空白文件开始写。
                                </p>
                                <pre className="overflow-x-auto text-sm leading-6 text-slate-100">
                                    <code>{lesson.starterCode}</code>
                                </pre>
                            </section>
                        )}

                        {lesson.tips.length > 0 && (
                            <Block icon={ClipboardList} title="③ 操作要点与容易踩的坑" tone="amber">
                                <Bullets items={lesson.tips} />
                            </Block>
                        )}

                        {lesson.tasks.length > 0 && (
                            <Block icon={Package} title="④ 动手任务">
                                <Bullets items={lesson.tasks} />
                            </Block>
                        )}

                        {lesson.checklist.length > 0 && (
                            <Block icon={ListChecks} title="⑤ 完成检查单" tone={allDone ? 'emerald' : 'slate'}>
                                <p className="mb-3 text-xs leading-5 text-slate-600">
                                    全部勾上就记为「已过关」，进度只保存在这台设备的浏览器里。
                                </p>
                                <ul className="space-y-2">
                                    {lesson.checklist.map((item) => (
                                        <li key={item}>
                                            <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-white/60">
                                                <input
                                                    type="checkbox"
                                                    checked={checked.has(item)}
                                                    onChange={() => toggle(item)}
                                                    className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                                                />
                                                <span className="text-sm leading-6 text-slate-800">{item}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {allDone && (
                                    <p className="mt-3 rounded-lg bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-900">
                                        这一课完成了，可以进入下一课。
                                    </p>
                                )}
                            </Block>
                        )}

                        {lesson.findings.length > 0 && (
                            <Block icon={Lightbulb} title="⑥ 今日三大发现">
                                <Bullets items={lesson.findings} />
                            </Block>
                        )}

                        {lesson.homework.length > 0 && (
                            <Block icon={BookOpen} title="⑦ 课后任务">
                                <Bullets items={lesson.homework} />
                            </Block>
                        )}
                    </>
                ) : (
                    <>
                        {lesson.baseline && (
                            <Block icon={Target} title="★ 保底目标（本课成败的判断线）" tone="emerald">
                                <p className="text-sm leading-7 text-slate-800">{lesson.baseline}</p>
                                <p className="mt-2 text-xs leading-5 text-slate-600">
                                    只要达成保底目标，这节课就是成功的；其余内容属于弹性部分。
                                </p>
                            </Block>
                        )}

                        {lesson.prepare.length > 0 && (
                            <Block icon={Package} title="课前准备">
                                <Bullets items={lesson.prepare} />
                            </Block>
                        )}

                        {lesson.troubles.length > 0 && (
                            <Block icon={AlertTriangle} title="常见问题预案" tone="rose">
                                <Bullets items={lesson.troubles} />
                            </Block>
                        )}

                        <Block icon={ListChecks} title="课堂检查点">
                            <p className="mb-3 text-xs leading-5 text-slate-600">
                                巡视时按这几条逐组确认，学生端的自学模式看到的是同一份清单。
                            </p>
                            <Bullets items={lesson.checklist} />
                        </Block>
                    </>
                )}

                <nav className="flex items-center justify-between gap-3 pt-4" aria-label="课时导航">
                    {neighbours.previous ? (
                        <Link
                            to={`/hardware/esp32/${neighbours.previous.num}`}
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-slate-400"
                        >
                            <ArrowLeft size={15} aria-hidden="true" />
                            第 {neighbours.previous.num} 课
                        </Link>
                    ) : <span />}
                    {neighbours.next && (
                        <Link
                            to={`/hardware/esp32/${neighbours.next.num}`}
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700"
                        >
                            第 {neighbours.next.num} 课 · {neighbours.next.title}
                            <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                    )}
                </nav>
            </main>
        </div>
    );
}
