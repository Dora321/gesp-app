import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, NotebookPen, Target } from 'lucide-react';

import { getCppLesson } from '../data/cppLessonIndex';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';
import { paperMeta } from '../data/gesp';
import { LEARNING_DATA_EVENT } from '../utils/learningData';
import { readLessonProgress } from '../utils/lessonProgress';
import { latestWrongIdsByPaper, readExamAttempts } from '../utils/examHistory';

// 主页原本只有「营销页」的三层入口：学习路径、课程目录、探索内容。回访的学生
// 每次都要重新找自己学到哪了，而站内其实已经记着——课程进度、历次交卷成绩、
// 还没订正的错题。这一块把这些接到首屏下方，让主页对回访者变成工作台。
//
// 没有任何学习记录时整块不渲染：新访客看到的仍是原来的路径卡，不会多出一片空白。

const PYTHON_TITLES = new Map(
    [...pythonFoundationLessons, ...pythonProjects].map((lesson) => [lesson.path, lesson.catalogTitle || lesson.title]),
);

const LEVEL_NAMES = '一二三四五六七八';

const describeLessonPath = (path) => {
    const cpp = path.match(/^\/lesson\/(\d+)\/(\d+)$/);
    if (cpp) {
        const lesson = getCppLesson(cpp[1], cpp[2]);
        const levelName = LEVEL_NAMES[Number(cpp[1]) - 1] || cpp[1];
        return lesson ? `C++ ${levelName}级 · ${lesson.title}` : `C++ ${levelName}级 第 ${cpp[2]} 课`;
    }
    const python = PYTHON_TITLES.get(path);
    return python ? `Python · ${python}` : path;
};

const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
});

// 挑一节「最该继续」的课：优先没过关的，其次最近看过的。
const pickLesson = (progress) => {
    const entries = Object.entries(progress)
        .map(([path, entry]) => ({ path, ...entry }))
        .filter((entry) => Number.isFinite(entry.visitedAt));
    if (entries.length === 0) return null;

    const unfinished = entries.filter((entry) => entry.status !== 'mastered');
    const pool = unfinished.length > 0 ? unfinished : entries;
    return pool.reduce((latest, entry) => (
        (entry.masteredAt ?? entry.visitedAt) > (latest.masteredAt ?? latest.visitedAt) ? entry : latest
    ));
};

const pickAttempt = (attempts) => {
    let best = null;
    for (const [paperId, list] of Object.entries(attempts)) {
        const latest = list[0];
        if (latest && (!best || latest.at > best.attempt.at)) best = { paperId, attempt: latest };
    }
    return best;
};

const readSnapshot = () => {
    const lesson = pickLesson(readLessonProgress());
    const attempt = pickAttempt(readExamAttempts());
    const wrongTotal = Object.values(latestWrongIdsByPaper())
        .reduce((total, ids) => total + ids.length, 0);
    return { lesson, attempt, wrongTotal };
};

const EMPTY = { lesson: null, attempt: null, wrongTotal: 0 };

const Card = ({ to, icon: Icon, tone, eyebrow, title, detail, cta }) => (
    <Link
        to={to}
        className={`group flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${tone.border}`}
    >
        <div>
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone.chip}`}>
                <Icon size={20} aria-hidden="true" />
            </div>
            <div className="text-xs font-semibold text-slate-500">{eyebrow}</div>
            <div className="mt-1 text-lg font-bold text-slate-800">{title}</div>
            <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
        </div>
        <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${tone.text}`}>
            {cta}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
    </Link>
);

const TONES = {
    blue: { border: 'border-blue-200', chip: 'bg-blue-50 text-blue-700', text: 'text-blue-700' },
    indigo: { border: 'border-indigo-200', chip: 'bg-indigo-50 text-indigo-700', text: 'text-indigo-700' },
    orange: { border: 'border-orange-200', chip: 'bg-orange-50 text-orange-800', text: 'text-orange-800' },
};

export default function ContinueLearning() {
    // 预渲染的静态外壳里没有 localStorage，所以首次渲染必须是空的，
    // 挂载后再补上——否则爬虫抓到的会是一段永远为空的骨架。
    const [snapshot, setSnapshot] = useState(EMPTY);

    useEffect(() => {
        const refresh = () => setSnapshot(readSnapshot());
        refresh();
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        return () => window.removeEventListener(LEARNING_DATA_EVENT, refresh);
    }, []);

    const cards = useMemo(() => {
        const { lesson, attempt, wrongTotal } = snapshot;
        const list = [];

        if (lesson) {
            list.push({
                key: 'lesson',
                to: lesson.path,
                icon: BookOpen,
                tone: TONES.blue,
                eyebrow: lesson.status === 'mastered' ? '最近学完' : '上次学到',
                title: describeLessonPath(lesson.path),
                detail: lesson.status === 'mastered'
                    ? '这节课已过关，可以复习一遍或直接进入下一节。'
                    : '这节课还没完成离开前检查，继续把它收尾。',
                cta: lesson.status === 'mastered' ? '再看一遍' : '继续学习',
            });
        }

        if (attempt) {
            const meta = paperMeta[attempt.paperId];
            const { score, total, correct, wrong } = attempt.attempt;
            list.push({
                key: 'attempt',
                to: '/question-bank/review',
                icon: Target,
                tone: TONES.indigo,
                eyebrow: `上次交卷 · ${formatDate(attempt.attempt.at)}`,
                title: meta ? meta.title : attempt.paperId,
                detail: `客观题得分 ${score}/${total}，答对 ${correct} 题、答错 ${wrong} 题。`,
                cta: '看成绩趋势',
            });
        }

        if (snapshot.wrongTotal > 0) {
            list.push({
                key: 'wrong',
                to: '/question-bank/review',
                icon: NotebookPen,
                tone: TONES.orange,
                eyebrow: '错题本',
                title: `还有 ${wrongTotal} 道题没订正`,
                detail: '按考点看看错在哪一类，订正做对后会自动移出错题本。',
                cta: '去订正',
            });
        }

        return list;
    }, [snapshot]);

    if (cards.length === 0) return null;

    return (
        <section id="continue-learning" className="bg-white py-14" aria-labelledby="continue-learning-heading">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mb-6">
                    <div className="text-xs font-bold tracking-widest text-slate-500">继续学习</div>
                    <h2 id="continue-learning-heading" className="mt-1 text-2xl font-bold text-slate-800 md:text-3xl">
                        接着上次的地方往下走
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        以下记录只保存在这台设备的浏览器里，换设备或清理数据后会消失。
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {cards.map(({ key, ...card }) => <Card key={key} {...card} />)}
                </div>
            </div>
        </section>
    );
}
