import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, Lightbulb } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { scienceCourses } from '../../data/innovationCourseCatalog';

export default function HardwareLanding({ courseId = 'advanced' }) {
    const course = scienceCourses[courseId];
    const advanced = courseId === 'advanced';
    const Icon = advanced ? Cpu : Lightbulb;
    const other = scienceCourses[advanced ? 'foundation' : 'advanced'];
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navigation />
            <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
                <header className="rounded-3xl bg-slate-950 p-6 text-white sm:p-10">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-200"><Icon size={20} />动手实践 · 科创课程</span>
                    <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">{course.title}</h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">{course.description}</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        <span className="rounded-full bg-white/10 px-4 py-2">已上线 {course.lessons.length} 课</span>
                        <span className="rounded-full bg-white/10 px-4 py-2">网页演示课件</span>
                        <span className="rounded-full bg-white/10 px-4 py-2">支持翻页、备注与全屏</span>
                    </div>
                    <Link to={course.lessons[0].path} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-300 px-5 py-3 font-bold text-slate-950 hover:bg-teal-200">
                        从第 1 课开始<ArrowRight size={18} />
                    </Link>
                </header>
                <section className="mt-10" aria-labelledby="science-lessons-title">
                    <h2 id="science-lessons-title" className="flex items-center gap-2 text-2xl font-black"><BookOpen size={24} />课程目录</h2>
                    <p className="mb-6 mt-3 text-sm leading-7 text-slate-600">{course.updateNote}</p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-course-lessons>
                        {course.lessons.map((lesson) => (
                            <Link key={lesson.id} to={lesson.path} className="group flex min-h-32 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-400 hover:shadow-md">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-lg font-black text-teal-800">{String(lesson.id).padStart(2, '0')}</span>
                                <span className="flex-1"><span className="block text-xs font-bold text-slate-500">第 {lesson.id} 课</span><span className="mt-1 block text-lg font-bold">{lesson.title}</span><span className="mt-2 block text-sm text-teal-800">打开网页课件 →</span></span>
                            </Link>
                        ))}
                    </div>
                </section>
                <aside className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                    <div><h2 className="font-bold">另一条科创学习线</h2><p className="mt-2 text-sm text-slate-600">{other.title} · 已上线 {other.lessons.length} 课</p></div>
                    <Link to={other.path} className="inline-flex min-h-11 items-center gap-2 font-bold text-teal-800">查看课程<ArrowRight size={18} /></Link>
                </aside>
            </main>
            <Footer />
        </div>
    );
}
