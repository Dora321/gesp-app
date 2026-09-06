import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, FileText, NotebookPen, ShieldAlert, Tag } from 'lucide-react';

import { paperStats } from '../data/gesp/_stats';

// 题库是全站最难被复制的资产：92 套官方真题、逐卷标注核验状态、按考点聚合、
// 交卷后自动记错题。但它此前只是「学习路径」三张卡里的一张，最大的数字
// （2484 道题）连提都没提。这一块把它单独拎出来。
//
// 核验状态照实写出来，包括「28 卷尚未核验」和「160 道题因原卷内容缺失退出计分」。
// 同类站点通常只字不提这些，写出来反而是这个站的差异点——学生和家长能判断
// 哪些内容可以信。

const entries = [
    {
        to: '/question-bank',
        icon: FileText,
        title: '整卷练习',
        detail: `${paperStats.paperCount} 套官方真题，${paperStats.firstYear}–${paperStats.latestYear} 年，覆盖 ${paperStats.levelCount} 个等级。计时交卷、客观题自动判分。`,
        cta: '挑一套开始',
        tone: 'border-blue-200 bg-blue-50/60 text-blue-700',
    },
    {
        to: '/question-bank/topics/1',
        icon: Tag,
        title: '按考点练习',
        detail: '把同一知识点的题聚到一起集中攻克：递归、动态规划、树与二叉树、最短路……一到八级都能按考点刷。',
        cta: '选一个考点',
        tone: 'border-emerald-200 bg-emerald-50/60 text-emerald-700',
    },
    {
        to: '/question-bank/review',
        icon: NotebookPen,
        title: '错题本与成绩历史',
        detail: '每次交卷自动记录成绩和错题，按考点汇总薄弱环节；订正做对后自动移出错题本。',
        cta: '看我的错题',
        tone: 'border-indigo-200 bg-indigo-50/60 text-indigo-700',
    },
];

const verification = [
    {
        key: 'verified',
        icon: BadgeCheck,
        tint: 'text-emerald-600',
        term: `${paperStats.verifiedPaperCount} 卷完整核验`,
        detail: '题面、选项、答案、解析逐项对照过官方 PDF。',
    },
    {
        key: 'partial',
        icon: FileText,
        tint: 'text-blue-600',
        term: `${paperStats.partialPaperCount} 卷部分核验 · ${paperStats.unverifiedPaperCount} 卷待核验`,
        detail: '每套卷子的卡片上都写明当前进度，不含糊。',
    },
    {
        key: 'flagged',
        icon: ShieldAlert,
        tint: 'text-orange-600',
        term: `${paperStats.integrityFlaggedQuestionCount} 道题已标注风险`,
        detail: '原卷代码或公式缺失的题会提示原因，并退出计分与考点练习。',
    },
];

export default function QuestionBankHighlight() {
    return (
        <section id="question-bank-highlight" className="bg-slate-50 py-16" aria-labelledby="question-bank-heading">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="text-xs font-bold tracking-widest text-slate-500">真题题库</div>
                        <h2 id="question-bank-heading" className="mt-1 text-2xl font-bold text-slate-800 md:text-3xl">
                            {paperStats.questionCount} 道真题，每一道都标着能不能信
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            题目全部来自 CCF GESP 官方试卷。我们逐卷比对原卷并公开核验进度，凡是题面不完整、
                            无法作答的题都会明确标出来，并且不计入分数。
                        </p>
                    </div>
                    <Link
                        to="/question-bank"
                        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                        进入题库 <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {entries.map(({ to, icon: Icon, title, detail, cta, tone }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`group flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${tone.split(' ')[0]}`}
                        >
                            <div>
                                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone.split(' ').slice(1).join(' ')}`}>
                                    <Icon size={20} aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                                <p className="mt-1.5 text-sm leading-6 text-slate-600">{detail}</p>
                            </div>
                            <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${tone.split(' ').slice(-1)}`}>
                                {cta}
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </div>
                        </Link>
                    ))}
                </div>

                <dl className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
                    {verification.map(({ key, icon: Icon, tint, term, detail }) => (
                        <div key={key}>
                            <dt className="flex items-start gap-2 text-sm font-bold text-slate-800">
                                <Icon className={`mt-0.5 shrink-0 ${tint}`} size={20} aria-hidden="true" />
                                <span>{term}</span>
                            </dt>
                            <dd className="mt-1 pl-7 text-xs leading-5 text-slate-600">{detail}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
