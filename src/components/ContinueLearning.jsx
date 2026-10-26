import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, NotebookPen, Target } from 'lucide-react';

import { getCppLesson } from '../data/cppLessonIndex';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';
import { arduinoLessons, contestLessons, foundationLessons, innovationLessons } from '../data/innovationCourseCatalog';
import { paperMeta } from '../data/gesp';
import { LEARNING_DATA_EVENT } from '../utils/learningData';
import { readLessonProgress, toLessonProgressKey, toLessonRoutePath } from '../utils/lessonProgress';
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
    const foundation = foundationLessons.find((lesson) => lesson.path === path);
    if (foundation) return `初阶科创 · 第 ${foundation.id} 课 · ${foundation.title}`;
    const arduino = arduinoLessons.find((lesson) => lesson.path === path);
    if (arduino) return `Arduino UNO · 第 ${arduino.id} 课 · ${arduino.title}`;
    const innovation = innovationLessons.find((lesson) => lesson.path === path || `/innovation/${lesson.id}` === path);
    if (innovation) return `高阶科创 · 第 ${innovation.id} 课 · ${innovation.title}`;
    const contest = contestLessons.find((lesson) => lesson.path === path);
    if (contest) return `竞赛延伸 · ${contest.label} · ${contest.title}`;
    const python = PYTHON_TITLES.get(path);
    return python ? `Python · ${python}` : path;
};

const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
});

// 挑一节「最该继续」的课：优先没过关的，其次最近看过的。
// 记录的键可能是带版本的 /lesson/1/v2/N，path 统一转回真实路由；
// 旧版一级键 /lesson/1/N 对应的是改版前的课序，直接跳过。
const pickLesson = (progress) => {
    const entries = Object.entries(progress)
        .filter(([key]) => toLessonProgressKey(key) === key)
        .map(([key, entry]) => ({ ...entry, path: toLessonRoutePath(key) }))
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

// 整张卡由标题链接覆盖（::after 拉伸），读屏只念标题，不重复念按钮文字。
const Card = ({ to, icon: Icon, tone, eyebrow, title, detail, cta }) => (
    <li className={`home-trip ${tone}`}>
        <p className="home-trip-eyebrow">
            <Icon size={16} aria-hidden="true" />
            {eyebrow}
        </p>
        <h3>
            <Link to={to} className="home-trip-link">{title}</Link>
        </h3>
        <p className="home-trip-detail">{detail}</p>
        <span className="home-trip-cta" aria-hidden="true">
            {cta}
            <ArrowRight size={15} />
        </span>
    </li>
);

// 课程卡跟随所属线路取色；成绩归题库（墨色）；错题用提醒色。
const lineToneForPath = (path) => {
    if (path.startsWith('/lesson/')) return 'mw-line-cpp';
    if (path.startsWith('/python/')) return 'mw-line-python';
    return 'mw-line-maker';
};

const TONES = {
    attempt: 'mw-line-bank',
    wrong: 'home-trip--warn',
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
                tone: lineToneForPath(lesson.path),
                eyebrow: lesson.status === 'mastered' ? '最近学完' : '上次学到',
                title: describeLessonPath(lesson.path),
                detail: lesson.status === 'mastered'
                    ? /^\/lesson\/[1-3]\//.test(lesson.path)
                        ? '这节课已完成课内自查，可以复习一遍或进入下一节。'
                        : '这节课已过关，可以复习一遍或直接进入下一节。'
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
                tone: TONES.attempt,
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
                tone: TONES.wrong,
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
        <section id="continue-learning" className="home-continue" aria-labelledby="continue-learning-heading">
            <div className="home-container">
                <div className="home-continue-head">
                    <p className="mw-kicker">继续学习</p>
                    <h2 id="continue-learning-heading">接着上次的地方往下走</h2>
                    <p>以下记录只保存在这台设备的浏览器里，换设备或清理数据后会消失。</p>
                </div>
                <ul className="home-trips">
                    {cards.map(({ key, ...card }) => <Card key={key} {...card} />)}
                </ul>
            </div>
        </section>
    );
}
