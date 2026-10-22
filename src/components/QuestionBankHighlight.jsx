import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, NotebookPen, ShieldAlert, Tag } from 'lucide-react';

import { paperStats } from '../data/gesp/_stats';

// 题库是全站最难被复制的资产：官方真题、逐卷标注核验状态、按考点聚合、
// 交卷后自动记错题。它是 C++ 线的终点站，在首页单独占一条深色带。
//
// 核验状态照实写出来，包括尚未核验的卷数和因原卷内容缺失退出计分的题数。
// 同类站点通常只字不提这些，写出来反而是这个站的差异点——学生和家长能判断
// 哪些内容可以信。所有数字都来自生成的 paperStats，不手写。

const entries = [
    {
        to: '/question-bank',
        icon: FileText,
        title: '整卷练习',
        detail: `${paperStats.paperCount} 套官方真题，${paperStats.firstYear}–${paperStats.latestYear} 年，覆盖 ${paperStats.levelCount} 个等级。计时交卷、客观题自动判分。`,
        cta: '挑一套开始',
    },
    {
        to: '/question-bank/topics/1',
        icon: Tag,
        title: '按考点练习',
        detail: '把同一知识点的题聚到一起集中攻克：递归、动态规划、树与二叉树、最短路……一到八级都能按考点刷。',
        cta: '选一个考点',
    },
    {
        to: '/question-bank/review',
        icon: NotebookPen,
        title: '错题本与成绩历史',
        detail: '每次交卷自动记录成绩和错题，按考点汇总薄弱环节；订正做对后自动移出错题本。',
        cta: '看我的错题',
    },
];

const figures = [
    { key: 'papers', label: '官方真题', value: paperStats.paperCount, unit: '套' },
    { key: 'questions', label: '题目', value: paperStats.questionCount, unit: '道' },
    { key: 'years', label: '收录年份', value: `${paperStats.firstYear}–${paperStats.latestYear}` },
    { key: 'levels', label: '覆盖等级', value: paperStats.levelCount, unit: '个' },
];

const verification = [
    {
        key: 'verified',
        label: '完整核验',
        count: paperStats.verifiedPaperCount,
        detail: '题面、选项、答案、解析逐项对照过官方 PDF。',
    },
    {
        key: 'partial',
        label: '部分核验',
        count: paperStats.partialPaperCount,
        detail: '每套卷子的卡片上都写明当前核验到哪一步。',
    },
    {
        key: 'unverified',
        label: '待核验',
        count: paperStats.unverifiedPaperCount,
        detail: '可以练，题目页会提示答案尚未完成核验。',
    },
];

const verificationSummary = verification.map((item) => `${item.label} ${item.count} 套`).join('，');

export default function QuestionBankHighlight() {
    return (
        <section id="question-bank-highlight" className="home-bank" aria-labelledby="question-bank-heading">
            <div className="home-container">
                <div className="home-section-head">
                    <div>
                        <p className="mw-kicker">真题题库 · C++ 线终点站</p>
                        <h2 id="question-bank-heading">学到哪一级，就用那一级的真题检验</h2>
                        <p>
                            {paperStats.questionCount} 道 CCF GESP
                            官方真题，从整卷训练到考点突破，再到错题复盘。逐卷公开核验进度，题面不完整、无法作答的题会明确标注且不计分。
                        </p>
                    </div>
                    <Link to="/question-bank" className="mw-button home-bank-cta">
                        进入题库
                        <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>

                <dl className="home-bank-figures">
                    {figures.map((figure) => (
                        <div key={figure.key}>
                            <dt>{figure.label}</dt>
                            <dd>
                                {figure.value}
                                {figure.unit && <small>{figure.unit}</small>}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="home-bank-grid">
                    <ul className="home-bank-entries">
                        {entries.map(({ to, icon: Icon, title, detail, cta }) => (
                            <li key={to} className="home-bank-entry">
                                <Icon size={22} aria-hidden="true" />
                                <div>
                                    <h3>
                                        <Link to={to} className="home-bank-entry-link">{title}</Link>
                                    </h3>
                                    <p>{detail}</p>
                                </div>
                                <span className="home-bank-entry-cta" aria-hidden="true">
                                    {cta}
                                    <ArrowRight size={15} />
                                </span>
                            </li>
                        ))}
                    </ul>

                    <figure className="home-audit" aria-labelledby="home-audit-title">
                        <figcaption id="home-audit-title">
                            核验进度
                            <span>共 {paperStats.paperCount} 套</span>
                        </figcaption>
                        <div className="home-audit-bar" role="img" aria-label={verificationSummary}>
                            {verification.map((item) => (
                                <span
                                    key={item.key}
                                    data-status={item.key}
                                    style={{ flexGrow: item.count }}
                                    title={`${item.label} ${item.count} 套`}
                                />
                            ))}
                        </div>
                        <dl className="home-audit-legend">
                            {verification.map((item) => (
                                <div key={item.key} data-status={item.key}>
                                    <dt>
                                        <span className="home-audit-swatch" aria-hidden="true" />
                                        {item.label}
                                    </dt>
                                    <dd className="home-audit-count">
                                        {item.count}
                                        <small>套</small>
                                    </dd>
                                    <dd className="home-audit-detail">{item.detail}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="home-audit-flag">
                            <ShieldAlert size={18} aria-hidden="true" />
                            <span>
                                <strong>{paperStats.integrityFlaggedQuestionCount} 道题已标注风险</strong>
                                原卷代码或公式缺失的题会提示原因，并退出计分与考点练习。
                            </span>
                        </p>
                    </figure>
                </div>
            </div>
        </section>
    );
}
