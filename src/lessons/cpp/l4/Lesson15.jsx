import React, { useMemo, useState } from 'react';
import { Calculator, ClipboardCheck, ListChecks, Search, Target } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '综合拆题' },
    { id: 2, title: '题目建模', category: '结构体排序' },
    { id: 3, title: '代码实现', category: '模块化编程' },
    { id: 4, title: '测试与复盘', category: '样例设计' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const sampleStudents = [
    { name: 'Ann', score: 88 },
    { name: 'Bob', score: 95 },
    { name: 'Cindy', score: 91 },
    { name: 'Dan', score: 76 },
];

function ProjectLab() {
    const [descending, setDescending] = useState(true);
    const sorted = useMemo(() => {
        return [...sampleStudents].sort((a, b) => descending ? b.score - a.score : a.score - b.score);
    }, [descending]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Target className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">成绩排行实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="flex items-center gap-3 text-sm font-black text-slate-700">
                        <input
                            type="checkbox"
                            checked={descending}
                            onChange={(event) => setDescending(event.target.checked)}
                        />
                        按成绩从高到低
                    </label>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        综合题常把结构体、数组和排序揉在一起。先确定数据字段，再决定排序规则。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="space-y-3">
                        {sorted.map((student, index) => (
                            <div key={student.name} className="flex items-center justify-between rounded-lg bg-indigo-50 px-4 py-3">
                                <span className="font-black text-slate-800">#{index + 1} {student.name}</span>
                                <span className="font-mono font-black text-indigo-800">{student.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '综合题第一步应该做什么？',
        answer: '拆输入和输出',
        reason: '先明确读什么、算什么、输出什么，再选数据结构。',
    },
    {
        question: '多字段数据适合用什么保存？',
        answer: '结构体',
        reason: '姓名、成绩、编号等字段可以组织在同一个对象里。',
    },
    {
        question: '排序规则复杂时应该先写什么？',
        answer: '比较规则',
        reason: '先用自然语言写清楚谁排前面，再转成代码条件。',
    },
];

export default function CppL4Lesson15() {
    return (
        <CppLessonShell
            lessonNumber={15}
            lessonTitle="综合编程实战 (1)"
            lessonSubtitle="用结构体、函数和排序解决成绩排行题"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/14"
            nextPath="/lesson/4/16"
            hero={{
                title: '综合题不怕长，怕没拆开：先建模，再编码，再测试',
                description: '本课以成绩排行为主线，把结构体、数组、函数、排序和复杂度检查串成完整解题流程。',
            }}
            goals={['能把综合题拆成输入、处理、输出', '能用结构体数组保存多字段数据', '能写出稳定的排序和测试流程']}
            childrenBySection={{
                1: <ProjectLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">题目建模：先决定数据长什么样</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果每个学生有姓名、成绩、编号，多字段数据就不适合拆成很多零散数组。结构体能让数据更清楚。
                            </p>
                        </div>
                        <CodeBlock>{`struct Student {
  string name;
  int score;
  int id;
};

Student a[105];`}</CodeBlock>
                        <CompareTable
                            headers={['模块', '职责', '对应知识']}
                            rows={[
                                ['读入', '把每个学生的信息保存起来', '结构体数组'],
                                ['处理', '按规则排序并统计', '排序、函数'],
                                ['输出', '输出排名或目标学生', '格式控制'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">代码实现：比较规则写清楚，排序才不乱</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                下面用选择排序实现成绩从高到低。真实题目如果要求同分按编号升序，就要在比较条件里继续补规则。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`bool better(Student x, Student y) {
  if (x.score != y.score) return x.score > y.score;
  return x.id < y.id;
}

for (int i = 0; i < n - 1; i++) {
  int best = i;
  for (int j = i + 1; j < n; j++) {
    if (better(a[j], a[best])) {
      best = j;
    }
  }
  swap(a[i], a[best]);
}`}</CodeBlock>
                            <StepList steps={[
                                '把排序规则封装成 better 函数',
                                '主排序循环只关心谁更靠前',
                                '同分规则必须在函数里补完整',
                                '排序后再统一输出结果',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">测试与复盘：综合题必须测同分、边界和顺序</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                排名题最容易在同分时出错。只测“分数都不一样”的样例是不够的。
                            </p>
                        </div>
                        <CompareTable
                            headers={['样例类型', '目的', '例子']}
                            rows={[
                                ['最小数据', '检查 n=1 能否输出', '1 个学生'],
                                ['同分数据', '检查第二排序规则', '两人 score 相同'],
                                ['逆序数据', '检查排序是否真的生效', '输入从低到高'],
                            ]}
                        />
                        <Callout icon={Calculator} title="复杂度复盘" tone="blue">
                            选择排序是 O(n^2)。如果 n 只有 100 或 1000 通常还能接受；如果 n 达到 100000，就要考虑更快排序。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这节课的重点是完整流程，不是某一个语法点。每题都写出拆题表。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>实现学生成绩排行：分数高者在前，同分编号小者在前。</li>
                                <li>统计平均分，并输出高于平均分的学生。</li>
                                <li>给自己的程序设计 5 个测试样例。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课做全真模拟与避坑，重点训练考试时间分配和错题复盘。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
