import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, ListChecks, Search, TableProperties } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '综合模型' },
    { id: 2, title: '字符频率表', category: '数组映射' },
    { id: 3, title: '去重与标记', category: '布尔数组' },
    { id: 4, title: '综合题套路', category: '拆题步骤' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function FrequencyLab() {
    const [text, setText] = useState('banana');

    const counts = useMemo(() => {
        const next = Array(26).fill(0);
        for (const char of text.toLowerCase()) {
            if (char >= 'a' && char <= 'z') {
                next[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
            }
        }
        return next;
    }, [text]);

    const topLetters = counts
        .map((count, index) => ({ letter: String.fromCharCode('a'.charCodeAt(0) + index), count }))
        .filter((item) => item.count > 0);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Hash className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">字符频率实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">输入小写字符串</label>
                    <input
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    <p className="mt-3 text-xs font-bold text-slate-500">只统计 a-z，其他字符会被忽略。</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                    {topLetters.length ? topLetters.map((item) => (
                        <div key={item.letter} className="rounded-xl bg-white p-3 ring-1 ring-rose-100">
                            <p className="font-mono text-lg font-black text-rose-700">cnt['{item.letter}'] = {item.count}</p>
                        </div>
                    )) : (
                        <div className="rounded-xl bg-white p-4 font-bold text-slate-500 ring-1 ring-rose-100">暂无可统计字母</div>
                    )}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: "字母 c 对应 cnt 的下标怎么求？",
        answer: "c - 'a'",
        reason: '小写字母在 ASCII 中连续排列，减去 a 就得到 0 到 25。',
    },
    {
        question: 'bool seen[26] 常用来做什么？',
        answer: '标记是否出现过',
        reason: '每个下标对应一个字母，true 表示这个字母已经出现。',
    },
    {
        question: '频率统计为什么是数组字符串综合？',
        answer: '字符串遍历 + 数组计数',
        reason: '遍历每个字符，再把字符映射到数组下标更新数量。',
    },
];

export default function CppL3Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="数组与字符串综合"
            lessonSubtitle="用数组保存字符串处理的中间结果"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/8"
            nextPath="/lesson/3/10"
            hero={{
                title: '字符串负责提供字符，数组负责保存统计结果',
                description: '本课把数组和字符串放在一起：字符频率、是否出现、去重输出。这是三级综合题非常常见的组合。',
            }}
            goals={['能把字符映射成数组下标', '能用计数数组统计频率', '能用标记数组做去重和出现判断']}
            childrenBySection={{
                1: <FrequencyLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">字符频率表：每个字母占一个数组格子</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                对小写字母来说，<code>'a'</code> 映射到 0，<code>'b'</code> 映射到 1，依次类推。这样就能用 <code>cnt[26]</code> 保存每个字母的出现次数。
                            </p>
                        </div>
                        <CodeBlock>{`int cnt[26] = {0};
string s;
cin >> s;

for (int i = 0; i < s.size(); i++) {
  char c = s[i];
  if (c >= 'a' && c <= 'z') {
    cnt[c - 'a']++;
  }
}`}</CodeBlock>
                        <Callout icon={TableProperties} title="映射关系" tone="rose">
                            <code>cnt[0]</code> 统计 a，<code>cnt[1]</code> 统计 b，<code>cnt[25]</code> 统计 z。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">去重与标记：只让第一次出现通过</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果题目要求“按首次出现顺序输出不同字符”，可以用布尔数组记录某个字符是否已经出现。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`bool seen[26] = {false};

for (int i = 0; i < s.size(); i++) {
  int id = s[i] - 'a';
  if (!seen[id]) {
    cout << s[i];
    seen[id] = true;
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '把字符转成 id',
                                '检查 seen[id] 是否为 false',
                                '第一次出现就输出',
                                '输出后立刻标记为 true',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">综合题套路：先确定数组格子代表什么</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组和字符串综合题最怕一上来写循环。先问：数组下标表示字符、位置、次数，还是某种状态？
                            </p>
                        </div>
                        <CompareTable
                            headers={['任务', '数组含义', '核心动作']}
                            rows={[
                                ['统计每个字母', 'cnt[i] 表示第 i 个字母出现次数', "cnt[c - 'a']++"],
                                ['判断是否出现', 'seen[i] 表示第 i 个字母是否出现', 'seen[c - a] = true'],
                                ['找最高频字母', 'cnt[i] 保存频率', '遍历 cnt 找最大值'],
                            ]}
                        />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                写综合题时，请先在纸上写出数组下标和含义，再开始敲代码。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>统计一个字符串中每个小写字母出现次数。</li>
                                <li>按首次出现顺序输出不重复的小写字母。</li>
                                <li>找出出现次数最多的小写字母，如果并列输出字典序最小的。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习枚举法。数组和字符串给我们数据，枚举法负责系统地试所有可能。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
