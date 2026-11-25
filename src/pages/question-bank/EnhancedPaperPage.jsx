import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AlertTriangle, Tags } from 'lucide-react';
import LoadingScreen from '../../components/LoadingScreen';
import { getPaper } from '../../data/gesp';
import { tagStats } from 'virtual:gesp-tag-stats';
import { needsSynthesizedCoding, withSynthesizedCoding } from '../../data/gesp/codingQuestions';
import useLuoguPool from '../../hooks/useLuoguPool';
import { navigateBack } from '../../utils/navigateBack';
import QuestionAnalysisShell from './QuestionAnalysisShell';
import { RelatedLessonLinks } from './QuestionStudyActions';

const sectionMetaByLevel = {
    1: { tone: '语法启蒙', focus: '语句规则与基础逻辑' },
    2: { tone: '流程强化', focus: '循环与分支协同' },
    3: { tone: '算法入门', focus: '枚举、模拟与结构化表达' },
    4: { tone: '结构进阶', focus: '数据组织与流程控制' },
    5: { tone: '综合建模', focus: '多步骤推理与状态管理' },
    6: { tone: '算法深化', focus: '复杂度与策略优化' },
    7: { tone: '竞赛视角', focus: '抽象化与高效实现' },
    8: { tone: '高阶压轴', focus: '综合算法与工程稳健性' },
};

function KnowledgePanel({ level, tags: questionTags, inferred: tagsInferred }) {
    const levelTagStats = tagStats[level] || { paperCount: 0, tags: {} };
    const knowledgeTagSet = new Set(questionTags);
    return (
        <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm"><Tags size={14} /> 本题能力画像</div>
                <span className="text-xs text-slate-500">
                    {questionTags.length === 0 ? '未标注知识点' : tagsInferred ? '题干推测' : '题库人工标注'}
                </span>
            </div>
            {tagsInferred && questionTags.length > 0 && (
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
                    本题没有人工知识点标签，以下按题干关键词推测，仅供参考。
                </p>
            )}
            <div className="flex flex-wrap gap-2">
                {questionTags.length ? questionTags.map((tag) => (
                    <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${tagsInferred ? 'border-dashed border-amber-300 bg-amber-50 text-amber-800' : 'border-indigo-200 bg-white text-indigo-700'}`}
                    >
                        #{tag}
                    </span>
                )) : (
                    <span className="text-sm text-slate-500">题库未标注知识点，题干中也未识别到明确关键词。</span>
                )}
            </div>

            <div className="border-t border-slate-200 pt-3">
                <div className="text-sm font-semibold text-slate-700 mb-2">本站题库统计</div>
                <p className="text-xs leading-5 text-slate-500">
                    统计口径：本站题库 L{level} 共 {levelTagStats.paperCount} 套试卷；选择题、判断题和编程题都计入，历史占位等非正式卷（如有）也计入，按题目的知识点标注汇总，不代表官方考情。
                </p>
                <div className="mt-2 space-y-1 text-sm text-slate-600 leading-relaxed">
                    {questionTags.map((tag) => {
                        const stat = levelTagStats.tags[tag];
                        const paperHits = stat?.papers || 0;
                        const questionHits = stat?.questions || 0;
                        return (
                            <p key={tag}>
                                • 本站题库 L{level} 共 {levelTagStats.paperCount} 套试卷中，有 {paperHits} 套出现「{tag}」（共 {questionHits} 题）
                                {tagsInferred && <span className="text-xs text-amber-700"> · 推测标签，仅供参考</span>}
                            </p>
                        );
                    })}
                    {!questionTags.length && <p>暂无可用于统计的知识点标签。</p>}
                </div>
            </div>

            {(knowledgeTagSet.has('循环') || knowledgeTagSet.has('条件判断') || knowledgeTagSet.has('数组') || knowledgeTagSet.has('二维数组')) && (
                <div className="border-t border-slate-200 pt-3">
                    <div className="text-sm font-semibold text-slate-700 mb-2">考点归纳</div>
                    <div className="text-sm text-slate-600 leading-relaxed space-y-1">
                        {knowledgeTagSet.has('循环') && (
                            <p>• <code className="bg-slate-200 px-1 rounded text-xs">for</code>、<code className="bg-slate-200 px-1 rounded text-xs">while</code> 先判断条件再执行循环体，<code className="bg-slate-200 px-1 rounded text-xs">do-while</code> 先执行一次再判断</p>
                        )}
                        {knowledgeTagSet.has('条件判断') && (
                            <p>• <code className="bg-slate-200 px-1 rounded text-xs">if-else</code> 就近配对；<code className="bg-slate-200 px-1 rounded text-xs">switch-case</code> 通常配合 <code className="bg-slate-200 px-1 rounded text-xs">break</code> 防止穿透</p>
                        )}
                        {(knowledgeTagSet.has('数组') || knowledgeTagSet.has('二维数组')) && (
                            <p>• 数组下标从 <code className="bg-slate-200 px-1 rounded text-xs">0</code> 开始，长度为 <code className="bg-slate-200 px-1 rounded text-xs">n</code> 的数组最大下标是 <code className="bg-slate-200 px-1 rounded text-xs">n-1</code>；二维数组按行或按列遍历会影响处理顺序</p>
                        )}
                    </div>
                </div>
            )}

            <div className="border-t border-slate-200 pt-3">
                <div className="text-sm font-semibold text-slate-700 mb-2">复盘建议</div>
                <div className="bg-white rounded-lg border border-slate-200 p-3 text-sm text-slate-600 leading-relaxed space-y-1.5">
                    <p>1️⃣ <strong>复述题意</strong>：用自己的话把题目要求说一遍</p>
                    <p>2️⃣ <strong>定位关键</strong>：找出题目考查的核心概念或语法点</p>
                    <p>3️⃣ <strong>手动推演</strong>：用最小样例逐步模拟程序执行过程</p>
                    <p>4️⃣ <strong>边界验证</strong>：检查极端情况（0、1、空、最大值）是否正确</p>
                    <p>5️⃣ <strong>归纳总结</strong>：记录本题的解题套路，用于同类题目</p>
                </div>
            </div>
            <RelatedLessonLinks tags={questionTags} level={level} />
        </div>
    );
}

// ExamPaper 已经取过卷和洛谷题池时直接使用传入数据。
export default function EnhancedPaperPage({ forcedPaperId, paperData: providedPaper = null, luoguPool: providedPool = null }) {
    const { paperId: routePaperId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paperId = forcedPaperId || routePaperId || providedPaper?.id;
    const [fetched, setFetched] = useState(null);

    useEffect(() => {
        if (providedPaper) return undefined;
        let cancelled = false;
        getPaper(paperId).then((data) => {
            if (!cancelled) setFetched({ paperId, data });
        }).catch(() => {
            if (!cancelled) setFetched({ paperId, data: null });
        });
        return () => { cancelled = true; };
    }, [paperId, providedPaper]);

    const paperData = providedPaper || (fetched?.paperId === paperId ? fetched?.data : null);
    const loading = !providedPaper && fetched?.paperId !== paperId;
    const mistakeSource = useCallback((question) => ({ paperId, questionId: question.id }), [paperId]);

    const baseQuestions = useMemo(() => {
        if (!paperData) return [];
        return [
            ...(paperData.questions || []),
            ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
            ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' }))
        ];
    }, [paperData]);

    // Coding questions (Q26/Q27) are filled from the per-level Luogu problem
    // set. Only papers that don't already embed those need it, so load that
    // ~200KB dataset on demand instead of bundling it into the ExamPaper chunk.
    // 合成逻辑与考试模式共用（见 data/gesp/codingQuestions.js）：同一张卷子
    // 在两种模式下必须是同样的题数，此前各写一套，考试模式那份漏掉了。
    const needsLuogu = useMemo(
        () => Boolean(paperData) && needsSynthesizedCoding(baseQuestions),
        [paperData, baseQuestions],
    );

    const luogu = useLuoguPool(paperData?.level, needsLuogu && !providedPool);
    const luoguPool = providedPool || luogu.pool;

    const questions = useMemo(
        () => (paperData ? withSynthesizedCoding(baseQuestions, { paperId, luoguPool }) : []),
        [paperData, baseQuestions, paperId, luoguPool],
    );

    if (loading || (needsLuogu && !providedPool && luogu.status === 'loading')) {
        return <LoadingScreen message="正在加载试卷" variant="dark" />;
    }

    if (needsLuogu && !providedPool && luogu.status === 'error') {
        return (
            <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6" role="alert">
                    <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">上机编程题加载失败</h2>
                    <p className="mb-6">这张卷的第 26、27 题（上机编程）题面没能加载出来，可能是网络不稳定。请重试一次。</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={luogu.retry} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">重新加载</button>
                        <button onClick={() => navigate('/question-bank')} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg">返回题库</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!paperData) {
        return (
            <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6">
                    <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">无法加载试卷</h2>
                    <p className="mb-4">试卷数据未找到，请返回题库后重试。</p>
                    <button onClick={() => navigate('/question-bank')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                        返回题库
                    </button>
                </div>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="mw-surface mw-line-bank min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md text-center space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">试卷数据不可用</h2>
                    <p className="text-slate-500 text-sm">未找到对应试卷，请返回题库后重试。</p>
                    <button
                        onClick={() => navigate('/question-bank')}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                    >
                        返回题库
                    </button>
                </div>
            </div>
        );
    }

    const { tone, focus } = sectionMetaByLevel[paperData.level] || { tone: '综合训练', focus: '核心知识点巩固' };
    const backFallback = paperData.level ? `/question-bank?level=${paperData.level}` : '/question-bank';
    return (
        <QuestionAnalysisShell
            key={paperId}
            paper={paperData}
            paperId={paperId}
            questions={questions}
            storageKey={paperId}
            mistakeSource={mistakeSource}
            targetQuestion={searchParams.get('mode') === 'analysis' ? searchParams.get('q') : null}
            subtitle={`${tone} · ${focus}`}
            onBack={() => navigateBack(navigate, backFallback)}
            renderKnowledge={(props) => <KnowledgePanel level={paperData.level} {...props} />}
        />
    );
}
