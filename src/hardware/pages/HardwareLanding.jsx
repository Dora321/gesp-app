import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CircuitBoard, Cpu, Lightbulb, Trophy } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { scienceCourses } from '../../data/innovationCourseCatalog';

const advancedStages = [
    { title: '第一阶段 · 读懂 AI', range: '第 1–5 课', start: 1, end: 5 },
    { title: '第二阶段 · 指挥 AI', range: '第 6–10 课', start: 6, end: 10 },
    { title: '第三阶段 · 超越 AI', range: '第 11–16 课', start: 11, end: 16 },
    { title: '第四阶段 · 驾驭 AI', range: '第 16.5–27 课 · 物联网', start: 16.5, end: 27 },
    { title: '第五阶段 · 融合 AI', range: '第 28–35 课', start: 28, end: 35 },
];

const courseIcons = {
    advanced: Cpu,
    arduino: CircuitBoard,
    contest: Trophy,
    foundation: Lightbulb,
};

export default function HardwareLanding({ courseId = 'advanced' }) {
    const course = scienceCourses[courseId];
    const advanced = courseId === 'advanced';
    const Icon = courseIcons[courseId] || Lightbulb;
    const lessonGroups = advanced
        ? advancedStages.map((stage) => ({ ...stage, lessons: course.lessons.filter((lesson) => lesson.id >= stage.start && lesson.id <= stage.end) }))
        : [{ title: null, lessons: course.lessons }];
    // 四条课程线互相导流：主线、Arduino UNO、竞赛延伸包、初阶科创。
    const related = Object.values(scienceCourses).filter((item) => item.path !== course.path);
    return (
        <div className="min-h-screen bg-[#f6f3ec] text-stone-950">
            <Navigation />
            <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
                <header className="rounded-3xl bg-stone-950 p-6 text-[#f6f3ec] sm:p-10">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-200"><Icon size={20} />动手实践 · 科创课程</span>
                    <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">{course.title}</h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300">{course.description}</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        <span className="rounded-full bg-white/10 px-4 py-2">已上线 {course.lessons.length} 课</span>
                        <span className="rounded-full bg-white/10 px-4 py-2">网页演示课件</span>
                        <span className="rounded-full bg-white/10 px-4 py-2">支持翻页、备注与全屏</span>
                    </div>
                    <Link to={course.lessons[0].path} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-bold text-stone-950 hover:bg-amber-100">
                        从第 1 课开始<ArrowRight size={18} />
                    </Link>
                </header>
                <section className="mt-10" aria-labelledby="science-lessons-title" data-course-lessons>
                    <h2 id="science-lessons-title" className="flex items-center gap-2 text-2xl font-black"><BookOpen size={24} />课程目录</h2>
                    <p className="mb-6 mt-3 text-sm leading-7 text-stone-600">{course.updateNote}</p>
                    {lessonGroups.map((group) => (
                        <div key={group.title || courseId} className="mb-9">
                            {group.title && <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-stone-300 pb-3"><h3 className="text-lg font-bold">{group.title}</h3><span className="text-sm text-stone-600">{group.range}</span></div>}
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {group.lessons.map((lesson) => (
                                    <Link key={lesson.id} to={lesson.path} className="group flex min-h-32 items-center gap-4 rounded-2xl border border-stone-300 bg-[#fffdf8] p-5 transition hover:border-amber-700 hover:shadow-md">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-base font-black text-stone-800">{String(lesson.id).padStart(2, '0')}</span>
                                        <span className="flex-1"><span className="block text-xs font-bold text-stone-500">{lesson.label || `第 ${lesson.id} 课`}</span><span className="mt-1 block text-lg font-bold">{lesson.title}</span><span className="mt-2 block text-sm text-amber-800">打开网页课件 →</span></span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
                {advanced && <aside className="rounded-2xl border border-stone-300 bg-[#fffdf8] p-6"><h2 className="flex items-center gap-2 text-lg font-bold"><Trophy size={20} />竞赛延伸包</h2><p className="mt-2 text-sm text-stone-600">选修 · 与主线并行。{scienceCourses.contest.lessons.length} 节网页课，从选题到赛前冲刺。</p><Link to={scienceCourses.contest.path} className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-amber-800">查看竞赛课程<ArrowRight size={18} /></Link></aside>}
                <aside className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-300 bg-[#fffdf8] p-6">
                    <div><h2 className="font-bold">继续探索</h2><p className="mt-2 text-sm text-stone-600">{related.map((item) => `${item.title} · ${item.lessons.length} 课`).join('　／　')}</p></div>
                    <div className="flex flex-wrap gap-4">{related.map((item) => <Link key={item.path} to={item.path} className="inline-flex min-h-11 items-center gap-2 font-bold text-amber-800">{item.shortTitle}<ArrowRight size={18} /></Link>)}</div>
                </aside>
            </main>
            <Footer />
        </div>
    );
}
