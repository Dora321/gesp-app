import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { innovationLessons, innovationLessonUrl } from '../data/innovationCourseCatalog';
import { recordLessonVisit } from '../utils/lessonProgress';

export default function InnovationLesson() {
    const { id } = useParams();
    const frameRef = useRef(null);
    const controlDeck = (key) => {
        const frame = frameRef.current?.contentWindow;
        if (frame) frame.document.dispatchEvent(new frame.KeyboardEvent('keydown', { key, bubbles: true }));
    };
    const index = innovationLessons.findIndex((lesson) => String(lesson.id) === id);
    const lesson = innovationLessons[index];
    useEffect(() => {
        if (lesson) recordLessonVisit(lesson.path);
    }, [lesson]);

    if (!lesson) return (
        <main className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-2xl font-bold">这节网页课件尚未收录</h1>
            <Link to="/?subject=innovation#lesson-catalog" className="mt-4 inline-block text-teal-700">返回课程体系</Link>
        </main>
    );

    const previous = innovationLessons[index - 1];
    const next = innovationLessons[index + 1];
    const url = innovationLessonUrl(lesson);
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-white">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <Link to="/?subject=innovation#lesson-catalog" className="inline-flex items-center gap-2 text-sm text-teal-200">
                    <ArrowLeft size={16} />课程体系
                </Link>
                <h1 className="text-sm font-bold sm:text-base">初阶科创 · 第 {lesson.id} 课 · {lesson.title}</h1>
                <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-teal-200">
                    独立打开课件<ExternalLink size={16} />
                </a>
            </header>
            <div className="flex flex-wrap justify-center gap-2 bg-slate-900 px-3 py-2" role="toolbar" aria-label="演示控制">
                {[['ArrowLeft', '上一页'], ['ArrowRight', '下一页'], ['o', '总览'], ['n', '讲解备注'], ['f', '全屏']].map(([key, label]) => (
                    <button key={key} type="button" onClick={() => controlDeck(key)} className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20">{label}</button>
                ))}
            </div>
            <iframe ref={frameRef} key={lesson.id} src={url} title={`第 ${lesson.id} 课：${lesson.title}`} className="min-h-[65vh] w-full flex-1 border-0" style={{ height: 'calc(100dvh - 190px)' }} allow="fullscreen" />
            <nav aria-label="课件导航" className="flex flex-wrap items-center justify-between gap-3 px-4 pb-16 pt-3 text-sm">
                {previous ? <Link to={previous.path} className="inline-flex items-center gap-2"><ArrowLeft size={16} />第 {previous.id} 课 · {previous.title}</Link> : <span>从点亮第一盏灯开始</span>}
                <span className="text-xs text-slate-400">已收录 {innovationLessons.length} 课 · 保留原课号</span>
                {next ? <Link to={next.path} className="inline-flex items-center gap-2">第 {next.id} 课 · {next.title}<ArrowRight size={16} /></Link> : <Link to="/hardware/esp32-curriculum">继续探索完整课程 →</Link>}
            </nav>
        </main>
    );
}
