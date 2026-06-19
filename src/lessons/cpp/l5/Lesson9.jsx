import React, { useMemo, useState } from 'react';
import { ClipboardCheck, RefreshCw, Search, UsersRound } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '环形淘汰' },
    { id: 2, title: '问题建模', category: '循环链表' },
    { id: 3, title: '模拟模板', category: '删除节点' },
    { id: 4, title: '数组写法', category: '下标递推' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function josephusOrder(n, k) {
    const people = Array.from({ length: n }, (_, index) => index + 1);
    const order = [];
    let index = 0;

    while (people.length > 0) {
        index = (index + k - 1) % people.length;
        order.push(people.splice(index, 1)[0]);
    }

    return order;
}

function JosephusLab() {
    const [n, setN] = useState(7);
    const [k, setK] = useState(3);
    const order = useMemo(() => josephusOrder(n, k), [n, k]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <UsersRound className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">约瑟夫环演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">人数 n = {n}</label>
                    <input type="range" min="5" max="12" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">报数 k = {k}</label>
                    <input type="range" min="2" max="6" value={k} onChange={(event) => setK(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="mb-3 text-sm font-black text-slate-500">出圈顺序</div>
                    <div className="flex flex-wrap gap-2">
                        {order.map((person, index) => (
                            <span key={`${person}-${index}`} className="rounded-lg bg-amber-100 px-3 py-2 font-mono text-sm font-black text-amber-800">
                                {index + 1}. {person}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">最后留下的人：{order[order.length - 1]}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '约瑟夫环为什么适合循环链表？',
        answer: '尾部会回到头部',
        reason: '报数过程是环形的，循环链表天然表达这种结构。',
    },
    {
        question: '数组模拟删除后下标怎么更新？',
        answer: '(index+k-1)%size',
        reason: '删除后下一轮从当前位置继续，取模保证回到开头。',
    },
    {
        question: '链表删除时最怕什么？',
        answer: '丢失后继节点',
        reason: '要先保存或接好 next，再删除当前节点。',
    },
];

export default function CppL5Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="链表综合应用 (约瑟夫环)"
            lessonSubtitle="用循环结构模拟报数淘汰"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/8"
            nextPath="/lesson/5/10"
            hero={{
                title: '约瑟夫环是一道“结构选择题”：环形过程就要想到循环结构',
                description: '本课把循环链表用于真实问题，也对比数组模拟写法，训练删除节点和下标更新。',
            }}
            goals={['能解释约瑟夫环报数规则', '能用循环链表模拟淘汰过程', '能写出数组下标模拟版本']}
            childrenBySection={{
                1: <JosephusLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">问题建模：人围成一圈，报到 k 的人出圈</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                约瑟夫环的关键不是数学故事，而是“删除后继续从下一个人开始”。这正好对应循环链表的尾接头结构。
                            </p>
                        </div>
                        <CompareTable
                            headers={['写法', '优点', '适合场景']}
                            rows={[
                                ['循环链表', '删除节点贴近题意', '学习链表综合应用'],
                                ['数组/vector', '代码短，容易调试', '数据规模不大时'],
                                ['递推公式', '最快', '只求最后幸存者时'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">模拟模板：找到前驱，再删除当前节点</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                单向循环链表删除当前节点时，需要知道它的前驱节点 <code>prev</code>，让 <code>prev-&gt;next</code> 跳过当前节点。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`Node *prev = tail;
Node *cur = head;

while (cur->next != cur) {
  for (int count = 1; count < k; count++) {
    prev = cur;
    cur = cur->next;
  }
  cout << cur->data << " ";
  prev->next = cur->next;
  delete cur;
  cur = prev->next;
}`}</CodeBlock>
                            <StepList steps={[
                                'prev 记录当前节点的前驱',
                                'cur 走到要淘汰的人',
                                'prev->next 跳过 cur',
                                'cur 移到下一轮起点',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组写法：用取模处理环形位置</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果只需要模拟结果，<code>vector</code> 删除更容易写。下标更新公式是核心。
                            </p>
                        </div>
                        <CodeBlock>{`vector<int> people;
for (int i = 1; i <= n; i++) people.push_back(i);

int pos = 0;
while (!people.empty()) {
  pos = (pos + k - 1) % people.size();
  cout << people[pos] << " ";
  people.erase(people.begin() + pos);
}`}</CodeBlock>
                        <Callout icon={RefreshCw} title="取模意识" tone="amber">
                            每次删除后人数变少，取模必须使用当前 <code>people.size()</code>。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                约瑟夫环请至少手推一组 n=5、k=2 的过程，再写程序。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输出约瑟夫环的完整出圈顺序。</li>
                                <li>只输出最后幸存者编号。</li>
                                <li>分别用循环链表和 vector 模拟同一组数据。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习二分查找，从“一个个模拟”切换到“每次砍掉一半”。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
