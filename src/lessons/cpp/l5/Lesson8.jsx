import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Repeat2, Search, Waypoints } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '更多指针' },
    { id: 2, title: '双向链表', category: 'prev + next' },
    { id: 3, title: '循环链表', category: '尾接头' },
    { id: 4, title: '选择哪一种', category: '结构判断' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ComplexListLab() {
    const [mode, setMode] = useState('double');
    const labels = useMemo(() => ['A', 'B', 'C', 'D'], []);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Waypoints className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">复杂链表模型台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setMode('double')} className={`rounded-lg px-3 py-2 text-sm font-black ${mode === 'double' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                            双向链表
                        </button>
                        <button onClick={() => setMode('circle')} className={`rounded-lg px-3 py-2 text-sm font-black ${mode === 'circle' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                            循环链表
                        </button>
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        双向链表能前后走，循环链表从尾部还能回到头部。
                    </p>
                </div>
                <div className="overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="flex min-w-max items-center gap-3">
                        {labels.map((label, index) => (
                            <React.Fragment key={label}>
                                {index > 0 && (
                                    <span className="font-black text-amber-700">{mode === 'double' ? '&lt;-&gt;' : '-&gt;'}</span>
                                )}
                                <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-center font-mono font-black text-amber-900">
                                    {label}
                                    <div className="mt-1 text-xs text-slate-500">{mode === 'double' ? 'prev/data/next' : 'data/next'}</div>
                                </div>
                            </React.Fragment>
                        ))}
                        <span className="font-black text-amber-700">-&gt;</span>
                        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
                            {mode === 'circle' ? 'head' : 'NULL'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '双向链表比单链表多了什么？',
        answer: 'prev 指针',
        reason: 'prev 指向前一个节点，可以向前遍历。',
    },
    {
        question: '循环链表的尾节点 next 指向哪里？',
        answer: '头节点',
        reason: '这样从任意位置继续走都能回到起点。',
    },
    {
        question: '复杂链表更难在哪里？',
        answer: '要维护更多指针',
        reason: '每次插入删除要同时修正多个方向的连接。',
    },
];

export default function CppL5Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="复杂的链表 (双向/循环)"
            lessonSubtitle="理解 prev 指针和尾接头结构"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/7"
            nextPath="/lesson/5/9"
            topSupport={<CppL5LessonSupport lessonId={8} />}
            bottomSupport={<CppL5LessonSupport lessonId={8} placement="bottom" />}
            hero={{
                title: '链表一复杂，规则反而要更清楚：每个指针都必须有去处',
                description: '本课对比单链表、双向链表和循环链表，重点训练结构选择和指针维护顺序。',
            }}
            goals={['能写出双向链表节点结构', '能解释循环链表尾节点指向头节点', '能判断题目适合哪种链表结构']}
            childrenBySection={{
                1: <ComplexListLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">双向链表：每个节点同时记住前后邻居</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                双向链表多了 <code>prev</code> 指针。好处是能从当前节点向前走，代价是插入删除要维护更多连接。
                            </p>
                        </div>
                        <CodeBlock>{`struct Node {
  int data;
  Node *prev;
  Node *next;
};`}</CodeBlock>
                        <CompareTable
                            headers={['结构', '优点', '代价']}
                            rows={[
                                ['单链表', '结构简单', '只能向后走'],
                                ['双向链表', '能前后移动', '插入删除要改更多指针'],
                                ['循环链表', '适合环形过程', '停止条件更容易写错'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">循环链表：尾节点 next 回到 head</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                循环链表没有普通意义上的 <code>NULL</code> 结尾。遍历时要用计数或回到起点作为停止条件。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`tail->next = head;

Node *cur = head;
do {
  cout << cur->data << " ";
  cur = cur->next;
} while (cur != head);`}</CodeBlock>
                            <StepList steps={[
                                '先确认链表非空',
                                '尾节点 next 指向 head',
                                '遍历至少访问 head 一次',
                                '再次回到 head 时停止',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">选择哪一种：看题目需要的移动方式</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                不要因为双向链表看起来高级就乱用。结构越复杂，边界错误越多。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题目需求', '推荐结构', '理由']}
                            rows={[
                                ['只从头到尾处理', '单链表', '简单稳定'],
                                ['需要删除当前节点前后移动', '双向链表', '能直接找到前驱'],
                                ['报数、轮流淘汰', '循环链表', '天然形成环'],
                            ]}
                        />
                        <Callout icon={Repeat2} title="循环链表提醒" tone="amber">
                            循环结构没有 <code>nullptr</code> 终点，必须自己设计停止条件，否则会无限循环。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                复杂链表练习请先写出“要改哪几条边”，再写 C++ 代码。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>定义双向链表节点，并实现从头到尾、从尾到头输出。</li>
                                <li>把一条单链表改造成循环链表，并遍历一圈。</li>
                                <li>说明单链表、双向链表、循环链表分别适合什么题型。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课用循环链表解决约瑟夫环，真正把链表结构用到综合问题里。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
