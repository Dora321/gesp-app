import React, { useMemo, useState } from 'react';
import { BrainCircuit, ClipboardCheck, GitBranch, Route, Search, Target } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '综合挑战' },
    { id: 2, title: '题型识别', category: '选择工具' },
    { id: 3, title: '拆题流程', category: '稳定解法' },
    { id: 4, title: '综合样题', category: '示范推演' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function StrategyLab() {
    const [feature, setFeature] = useState('字符串里统计每个字母出现次数');

    const suggestion = useMemo(() => {
        if (feature.includes('统计') || feature.includes('次数')) return '优先考虑计数数组或累计变量。';
        if (feature.includes('所有') || feature.includes('可能')) return '优先考虑枚举法，先写清范围。';
        if (feature.includes('规则') || feature.includes('移动')) return '优先考虑模拟法，先设计状态变量。';
        if (feature.includes('进制')) return '优先考虑进制转换模板。';
        return '先找输入、输出、状态和循环边界。';
    }, [feature]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <BrainCircuit className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">解题策略实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label htmlFor="strategy-feature" className="block text-sm font-black text-slate-700">题目特征</label>
                    <textarea
                        id="strategy-feature"
                        value={feature}
                        onChange={(event) => setFeature(event.target.value)}
                        className="mt-3 h-28 w-full rounded-xl border border-slate-200 p-3 text-sm font-bold outline-none focus:border-rose-400"
                    />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">关键词提示（还需核对输入、范围和输出）</p>
                    <p className="mt-3 text-2xl font-black leading-9 text-rose-700">{suggestion}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '看到“所有可能”通常想到什么？',
        answer: '枚举',
        reason: '所有可能意味着要系统尝试一组候选答案。',
    },
    {
        question: '看到“按规则变化”通常想到什么？',
        answer: '模拟',
        reason: '规则变化需要维护状态并逐步更新。',
    },
    {
        question: '综合题第一步该做什么？',
        answer: '拆输入输出',
        reason: '先明确题目给什么、要什么，再选算法工具。',
    },
];

const masteryItems = [
    {
        label: '能从题面关键词判断该用什么工具。',
        evidence: '「出现次数」想计数数组，「所有可能」想枚举，「按规则变化」想模拟，「进制」想转换模板。',
        retryHint: '回到「题型识别」的关键词表。',
    },
    {
        label: '能把综合题拆成四个盒子。',
        evidence: '输入是什么、状态怎么存、规则怎么处理、最后输出什么。',
        retryHint: '回到「拆题流程」的草稿模板。',
    },
    {
        label: '能写出统计最高频字母的三段代码。',
        evidence: "先确认字符在 'a'～'z' 再计数；若没有小写字母则单独处理，最后按并列规则输出。",
        retryHint: '回到「综合样题」逐行读代码。',
    },
    {
        label: '记得并列情况要单独看题目要求。',
        evidence: '次数相同时，题目可能要字典序最小、最早出现或全部输出。',
        retryHint: '回到「并列规则要看题目」的提醒。',
    },
];

export default function CppL3Lesson15() {
    return (
        <CppLessonShell
            prerequisites={['会用数组存一批数据', '会组合循环、分支和函数解题', '会用样例验证自己的思路']}
            lessonNumber={15}
            lessonTitle="综合逻辑挑战"
            lessonSubtitle="把三级工具组合成完整解法"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/14"
            nextPath="/lesson/3/16"
            topSupport={<CppL3LessonSupport lessonId={15} />}
            bottomSupport={<CppL3LessonSupport lessonId={15} placement="bottom" />}
            hero={{
                title: '综合题不是新知识，而是旧工具的组合选择',
                description: '本课训练题型识别、拆题流程和综合样题推演，把数组、字符串、进制、枚举、模拟串成一套解题方法。',
            }}
            goals={['能根据题面选择合适工具', '能把复杂题拆成输入、状态、处理、输出', '能写出综合题的步骤草稿']}
            childrenBySection={{
                1: <StrategyLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">题型识别：用关键词提出候选方法</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                看到题先列出可能用到的工具，再核对输入范围、输出要求和多个工具的组合。关键词只能提示方向，不能代替读题。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题面特征', '常用工具', '第一件事']}
                            rows={[
                                ['出现次数、最多、最少', '计数数组', '定义 cnt 的含义'],
                                ['所有方案、满足条件', '枚举', '确定枚举范围'],
                                ['按规则移动或变化', '模拟', '设计状态变量'],
                                ['二进制、十六进制', '进制模板', '判断转换方向'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">拆题流程：让复杂题变成四个盒子</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                稳定的综合题流程是：输入是什么，状态怎么存，规则怎么处理，最后输出什么。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`伪代码（先描述步骤，再转成 C++）
读入题目要求的数据
检查数据范围与特殊输入
初始化计数或状态
按题目顺序遍历、判断并更新
按照并列规则与输出格式给出答案`}</CodeBlock>
                            <StepList steps={[
                                '把输入变量列出来',
                                '把中间状态命名',
                                '写出循环处理顺序',
                                '检查边界样例',
                            ]} />
                        </div>
                        <CompareTable
                            headers={['描述方式', '本课例子', '用途']}
                            rows={[
                                ['自然语言', '逐个检查字符，统计小写字母', '先说清规则和边界'],
                                ['流程图', '读入 → 判字符范围 → 计数 → 找最大 → 输出', '看清判断与循环的先后'],
                                ['伪代码', "若字符在 'a'～'z'，则对应次数加一", '落笔编码前检查步骤是否齐全'],
                            ]}
                        />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">综合样题：统计字符串中最高频小写字母</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                读入一整行，可含空格和非小写字符；只统计 <code>a</code>～<code>z</code>。并列时输出字典序最小者；没有小写字母时输出“无小写字母”。
                            </p>
                        </div>
                        <CodeBlock>{`#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  getline(cin, s);
  int cnt[26] = {};
  for (char c : s) {
    if (c >= 'a' && c <= 'z') cnt[c - 'a']++;
  }

  int best = -1;
  for (int i = 0; i < 26; i++) {
    if (cnt[i] > 0 && (best == -1 || cnt[i] > cnt[best])) {
      best = i;
    }
  }
  if (best == -1) cout << "无小写字母\\n";
  else cout << char('a' + best) << " " << cnt[best] << '\\n';
}`}</CodeBlock>
                        <Callout icon={GitBranch} title="并列规则要看题目" tone="amber">
                            本例按 <code>a</code> 到 <code>z</code> 扫描，只有次数严格更大才更新，所以并列时保留字典序最小者。若题目改为最早出现或全部输出，需要调整逻辑。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每道题提交前，请用“工具选择 + 状态含义 + 边界样例”三句话复盘。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L3-15 综合逻辑离开前检查"
                            description="综合题考的是工具选择。勾选前先拿一道课后任务题，口头说出「工具 + 状态 + 边界」三句话。"
                            items={masteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>统计字符串中最高频小写字母，若并列输出字典序最小。</li>
                                <li>枚举三位密码，找出满足各位数字和为 k 且能被 7 整除的密码。</li>
                                <li>模拟机器人移动并统计访问过多少个不同位置。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课是全真模拟与避坑，把三级所有高频错误集中清理。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
