import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { scienceCourses, innovationLessonUrl } from '../data/innovationCourseCatalog';
import { recordLessonVisit } from '../utils/lessonProgress';

export default function InnovationLesson({ courseId = 'advanced', redirectLegacy = false }) {
    const { id, num } = useParams();
    const course = scienceCourses[courseId];
    const innovationLessons = course.lessons;
    const [loadedPath, setLoadedPath] = useState(null);
    const frameRef = useRef(null);
    const stageRef = useRef(null);
    const [scale, setScale] = useState(0.1);
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;
        const resize = () => setScale(Math.min(stage.clientWidth / 1280, stage.clientHeight / 720));
        const observer = new ResizeObserver(resize);
        observer.observe(stage);
        resize();
        return () => observer.disconnect();
    }, [courseId, id, num, redirectLegacy]);
    const controlDeck = (key) => {
        if (key === 'f') {
            if (document.fullscreenElement) document.exitFullscreen?.();
            else stageRef.current?.requestFullscreen?.();
            return;
        }
        const frame = frameRef.current?.contentWindow;
        if (frame) frame.document.dispatchEvent(new frame.KeyboardEvent('keydown', { key, bubbles: true }));
    };
    const index = innovationLessons.findIndex((lesson) => String(lesson.id) === (num || id));
    const lesson = innovationLessons[index];
    useEffect(() => {
        if (lesson && !redirectLegacy) recordLessonVisit(lesson.path);
    }, [lesson, redirectLegacy]);

    if (!lesson) return <Navigate to={course.path} replace />;
    if (redirectLegacy) return <Navigate to={lesson.path} replace />;

    const previous = innovationLessons[index - 1];
    const next = innovationLessons[index + 1];
    const url = innovationLessonUrl(lesson, courseId);
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-white">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <Link to={course.path} className="inline-flex items-center gap-2 text-sm text-teal-200">
                    <ArrowLeft size={16} />课程体系
                </Link>
                <h1 className="text-sm font-bold sm:text-base">{course.shortTitle} · 第 {lesson.id} 课 · {lesson.title}</h1>
                <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-teal-200">
                    独立打开课件<ExternalLink size={16} />
                </a>
            </header>
            <div className="flex flex-wrap justify-center gap-2 bg-slate-900 px-3 py-2" role="toolbar" aria-label="演示控制">
                {[['ArrowLeft', '上一页'], ['ArrowRight', '下一页'], ['o', '总览'], ['n', '讲解备注'], ['f', '全屏']].map(([key, label]) => (
                    <button key={key} type="button" disabled={loadedPath !== lesson.path} onClick={() => controlDeck(key)} className="min-h-11 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 disabled:opacity-40">{label}</button>
                ))}
            </div>
            <div ref={stageRef} className="relative min-h-[55vh] w-full flex-1 overflow-hidden bg-black" style={{ height: 'calc(100dvh - 230px)' }}>
                <iframe ref={frameRef} key={lesson.path} onLoad={() => setLoadedPath(lesson.path)} src={url} title={`第 ${lesson.id} 课：${lesson.title}`} className="absolute left-1/2 top-1/2 border-0" style={{ width: 1280, height: 720, transform: `translate(-50%, -50%) scale(${scale})` }} allow="fullscreen" />
            </div>
            <nav aria-label="课件导航" className="flex flex-wrap items-center justify-between gap-3 px-4 pb-16 pt-3 text-sm">
                {previous ? <Link to={previous.path} className="inline-flex items-center gap-2"><ArrowLeft size={16} />第 {previous.id} 课 · {previous.title}</Link> : <span>从点亮第一盏灯开始</span>}
                <span className="text-xs text-slate-400">已收录 {innovationLessons.length} 课 · 手机横屏查看更清晰</span>
                {next ? <Link to={next.path} className="inline-flex items-center gap-2">第 {next.id} 课 · {next.title}<ArrowRight size={16} /></Link> : <Link to={course.path}>返回课程目录 →</Link>}
            </nav>
        </main>
    );
}
