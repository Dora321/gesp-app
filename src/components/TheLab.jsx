import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, NotebookPen, Pause, Pencil, Play, RotateCcw, SkipForward, Trophy } from 'lucide-react';
import { useShouldRunDecorativeMotion } from '../hooks/useShouldRunDecorativeMotion';
// 学习数据的导出/导入/重置是设置项，不是首页内容，已移到错题本页面
// （/question-bank/review）——那里正是学生查看自己学习记录的地方。

// 逐行推演示例：步骤是事先算好的（和课里的推演组件一样），不是在浏览器里运行代码。
// 选这段循环，是因为「手推变量表」正是 GESP 程序阅读题的基本功。
const TRACE_CODE = [
    'int s = 0;',
    'for (int i = 1; i <= 4; i++) {',
    '    s += i;',
    '}',
    'cout << s;',
];

const TRACE_STEPS = [
    { line: 1, i: '—', s: 0, note: '声明 s，初值为 0' },
    { line: 2, i: 1, s: 0, note: 'i = 1，1 ≤ 4 成立，进入循环' },
    { line: 3, i: 1, s: 1, note: 's 加上 i，变成 1' },
    { line: 2, i: 2, s: 1, note: 'i++ 后 i = 2，条件成立' },
    { line: 3, i: 2, s: 3, note: 's = 1 + 2 = 3' },
    { line: 2, i: 3, s: 3, note: 'i = 3，条件成立' },
    { line: 3, i: 3, s: 6, note: 's = 3 + 3 = 6' },
    { line: 2, i: 4, s: 6, note: 'i = 4，条件成立' },
    { line: 3, i: 4, s: 10, note: 's = 6 + 4 = 10' },
    { line: 2, i: 5, s: 10, note: 'i = 5，5 ≤ 4 不成立，退出循环' },
    { line: 5, i: '—', s: 10, note: '输出 10' },
];

const LAST_STEP = TRACE_STEPS.length - 1;
const AUTOPLAY_MS = 1200;

// 这些都是站内已有的真实功能，写清在哪里、数据存在哪里。
const tools = [
    {
        key: 'ai',
        icon: MessageCircle,
        title: 'AI 问答助手',
        detail: '卡住时随时提问，可以切换讲解风格。需要填入你自己的 DeepSeek API Key，Key 只保存在这台设备的浏览器里。',
        where: '电脑在页面右下角，手机在顶部工具栏',
    },
    {
        key: 'points',
        icon: Trophy,
        title: '课堂积分榜',
        detail: '老师上课用：录入学生名单、加减分、查看操作记录，可导出 CSV。数据保存在老师电脑的浏览器里。',
        where: '电脑在页面右下角，手机在顶部工具栏',
    },
    {
        key: 'annotate',
        icon: Pencil,
        title: '页面标注',
        detail: '任何页面都能用画笔圈画重点，支持撤销、重做和清空，适合投屏讲课。',
        where: '页面左下角的「标注」按钮',
    },
    {
        key: 'review',
        icon: NotebookPen,
        title: '错题本与学习数据',
        detail: '交卷后自动记下成绩和错题；学习进度可以导出成文件，换设备时再导入。',
        to: '/question-bank/review',
        cta: '打开错题本',
    },
];

export default function TheLab() {
    const shouldAnimate = useShouldRunDecorativeMotion();
    const [step, setStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const pausedRef = useRef(false);

    useEffect(() => {
        pausedRef.current = isPaused;
    }, [isPaused]);

    // 大屏且未要求减少动态时自动演示；一碰任何按钮就停下，交给学生自己按。
    useEffect(() => {
        if (!shouldAnimate) {
            return undefined;
        }

        const interval = setInterval(() => {
            if (pausedRef.current) return;
            setStep(prev => (prev >= LAST_STEP ? 0 : prev + 1));
        }, AUTOPLAY_MS);
        return () => clearInterval(interval);
    }, [shouldAnimate]);

    const isAutoPlaying = shouldAnimate && !isPaused;
    const current = TRACE_STEPS[step];

    const goNext = () => {
        setIsPaused(true);
        setStep(prev => (prev >= LAST_STEP ? 0 : prev + 1));
    };

    const restart = () => {
        setIsPaused(true);
        setStep(0);
    };

    return (
        <section className="home-section home-lab" aria-labelledby="home-lab-title">
            <div className="home-container">
                <div className="home-section-head">
                    <div>
                        <p className="mw-kicker">学习工具</p>
                        <h2 id="home-lab-title">上课和复习时用得上的工具</h2>
                        <p>课里的程序都能一行一行推演；课外还有提问、积分、标注和错题本。</p>
                    </div>
                </div>

                <div className="home-lab-grid">
                    <figure className="home-trace" aria-labelledby="home-trace-title">
                        <figcaption>
                            <h3 id="home-trace-title">逐行推演示例</h3>
                            <p>课里的推演都是这样：每按一次「下一步」执行一行，变量表多记一笔。</p>
                        </figcaption>

                        <div className="home-trace-body">
                            {/* 窄屏上代码可能横向滚动，所以让它能被键盘聚焦 */}
                            <pre className="mw-code" role="region" aria-label="示例代码" tabIndex={0}>
                                {TRACE_CODE.map((text, index) => (
                                    <span
                                        key={text}
                                        className="mw-code-line"
                                        data-line={index + 1}
                                        data-active={current.line === index + 1}
                                    >
                                        {text}
                                    </span>
                                ))}
                            </pre>

                            <div className="home-trace-table-wrap">
                                <table className="home-trace-table">
                                    <caption className="mw-sr-only">变量表：每一步执行的行号和变量的值</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">步</th>
                                            <th scope="col">行</th>
                                            <th scope="col">i</th>
                                            <th scope="col">s</th>
                                            <th scope="col">发生了什么</th>
                                        </tr>
                                    </thead>
                                    {/* 像一张练习纸：行数固定，还没走到的步骤留空，版面不会跳动 */}
                                    <tbody>
                                        {TRACE_STEPS.map((row, index) => {
                                            const filled = index <= step;
                                            return (
                                                <tr key={index} data-current={index === step}>
                                                    <td>{index + 1}</td>
                                                    <td>{filled ? row.line : ''}</td>
                                                    <td>{filled ? row.i : ''}</td>
                                                    <td>{filled ? row.s : ''}</td>
                                                    <td>{filled ? row.note : ''}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="home-trace-controls">
                            <button type="button" onClick={goNext} className="mw-button mw-button--primary mw-button--small">
                                <SkipForward size={16} aria-hidden="true" />
                                {step >= LAST_STEP ? '从头再来' : '下一步'}
                            </button>
                            <button type="button" onClick={restart} className="mw-button mw-button--secondary mw-button--small">
                                <RotateCcw size={16} aria-hidden="true" />
                                重来
                            </button>
                            {shouldAnimate && (
                                <button
                                    type="button"
                                    onClick={() => setIsPaused(!isPaused)}
                                    className="mw-button mw-button--secondary mw-button--small"
                                >
                                    {isPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                                    {isPaused ? '自动播放' : '暂停'}
                                </button>
                            )}
                            <p className="home-trace-status" aria-live={isAutoPlaying ? 'off' : 'polite'}>
                                第 {step + 1}/{TRACE_STEPS.length} 步：{current.note}
                            </p>
                        </div>
                    </figure>

                    <ul className="home-tools">
                        {tools.map(({ key, icon: Icon, title, detail, where, to, cta }) => (
                            <li key={key} className="home-tool">
                                <Icon size={22} aria-hidden="true" />
                                <div>
                                    <h3>{title}</h3>
                                    <p>{detail}</p>
                                    {to ? (
                                        <Link to={to} className="mw-text-link">
                                            {cta}
                                            <ArrowRight size={15} aria-hidden="true" />
                                        </Link>
                                    ) : (
                                        <p className="home-tool-where">{where}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
