import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ExternalLink } from 'lucide-react';
import { scienceCourses, innovationLessonUrl } from '../data/innovationCourseCatalog';
import { getLessonStatus, readLessonProgress, recordLessonMastered, recordLessonVisit } from '../utils/lessonProgress';
import { LEARNING_DATA_EVENT } from '../utils/learningData';

const AIChat = lazy(() => import('../components/AIChat'));

export default function InnovationLesson({ courseId = 'advanced', redirectLegacy = false }) {
    const { id, num } = useParams();
    const course = scienceCourses[courseId];
    const innovationLessons = course.lessons;
    const [loadedPath, setLoadedPath] = useState(null);
    const [progress, setProgress] = useState(() => readLessonProgress());
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
    // 学习数据可能被其他路由或标签页改写（例如首页目录），这里保持本课状态实时同步。
    useEffect(() => {
        const refresh = () => setProgress(readLessonProgress());
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        window.addEventListener('storage', refresh);
        window.addEventListener('focus', refresh);
        return () => {
            window.removeEventListener(LEARNING_DATA_EVENT, refresh);
            window.removeEventListener('storage', refresh);
            window.removeEventListener('focus', refresh);
        };
    }, []);

    if (!lesson) return <Navigate to={course.path} replace />;
    if (redirectLegacy) return <Navigate to={lesson.path} replace />;

    const lessonStatus = getLessonStatus(lesson.path, progress);
    const passed = lessonStatus === 'mastered' || lessonStatus === 'review';
    const masteryLabel = lessonStatus === 'mastered'
        ? '已完成本课（再次点击刷新复习时间）'
        : lessonStatus === 'review'
            ? '已完成复习，更新记录'
            : '完成本课学习（标记已过关）';
    const masteryAnnouncement = lessonStatus === 'mastered'
        ? '本课已过关'
        : lessonStatus === 'review'
            ? '本课已过关，建议复习'
            : '本课尚未过关';

    const previous = innovationLessons[index - 1];
    const next = innovationLessons[index + 1];
    const url = innovationLessonUrl(lesson, courseId);
    return (
        <main className="mw-surface mw-line-maker mw-science-viewer flex min-h-screen flex-col bg-slate-950 text-white">
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
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-white/10 bg-slate-900 px-3 pb-3">
                <button
                    type="button"
                    onClick={() => recordLessonMastered(lesson.path)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${passed
                        ? 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/40 hover:bg-emerald-500/25'
                        : 'bg-teal-300 text-slate-950 hover:bg-teal-200'}`}
                >
                    {passed ? <Check size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
                    {masteryLabel}
                </button>
                <span className="text-xs text-slate-300">
                    {passed ? '学习记录已保存，首页目录会显示本课进度。' : '学完这节网页课件后点这里登记，首页目录的「已过关」会同步更新。'}
                </span>
                <span className="sr-only" role="status" aria-live="polite">{masteryAnnouncement}</span>
            </div>
            <div ref={stageRef} className="relative min-h-[55vh] w-full flex-1 overflow-hidden bg-black" style={{ height: 'calc(100dvh - 230px)' }}>
                <iframe ref={frameRef} key={lesson.path} onLoad={() => setLoadedPath(lesson.path)} src={url} title={`第 ${lesson.id} 课：${lesson.title}`} className="absolute left-1/2 top-1/2 border-0" style={{ width: 1280, height: 720, transform: `translate(-50%, -50%) scale(${scale})` }} allow="fullscreen" />
                <Suspense fallback={null}><AIChat corner /></Suspense>
            </div>
            <nav aria-label="课件导航" className="flex flex-wrap items-center justify-between gap-3 px-4 pb-16 pt-3 text-sm">
                {previous ? <Link to={previous.path} className="inline-flex items-center gap-2"><ArrowLeft size={16} />第 {previous.id} 课 · {previous.title}</Link> : <span>从点亮第一盏灯开始</span>}
                <span className="text-xs text-slate-400">已收录 {innovationLessons.length} 课 · 手机横屏查看更清晰</span>
                {next ? <Link to={next.path} className="inline-flex items-center gap-2">第 {next.id} 课 · {next.title}<ArrowRight size={16} /></Link> : <Link to={course.path}>返回课程目录 →</Link>}
            </nav>
        </main>
    );
}
