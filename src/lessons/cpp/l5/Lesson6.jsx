import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Link2, MousePointer2, Search } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '节点模型' },
    { id: 2, title: '结构体节点', category: '数据 + 指针' },
    { id: 3, title: '创建链表', category: '头指针' },
    { id: 4, title: '遍历链表', category: '顺着 next 走' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function LinkedListLab() {
    const [length, setLength] = useState(4);
    const nodes = useMemo(() => Array.from({ length }, (_, index) => ({
        value: (index + 1) * 10,
        next: index === length - 1 ? 'NULL' : `node${index + 2}`,
    })), [length]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Link2 className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">单链表节点实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">节点数量：{length}</label>
                    <input type="range" min="2" max="6" value={length} onChange={(event) => setLength(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每个节点保存数据和 next 指针。链表靠 next 把节点串起来。
                    </p>
                </div>
                <div className="overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="flex min-w-max items-center gap-3">
                        <span className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white">head</span>
                        {nodes.map((node, index) => (
                            <React.Fragment key={index}>
                                <span className="font-black text-amber-700">-&gt;</span>
                                <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
                                    <div className="font-mono text-sm font-black text-slate-900">data={node.value}</div>
                                    <div className="mt-1 font-mono text-xs font-bold text-amber-800">next={node.next}</div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '链表节点通常包含什么？',
        answer: '数据和指针',
        reason: 'data 保存值，next 保存下一个节点的位置。',
    },
    {
        question: 'head 指向什么？',
        answer: '第一个节点',
        reason: '有了头指针，才能找到整条链表。',
    },
    {
        question: '链表结尾的 next 是什么？',
        answer: 'NULL 或 nullptr',
        reason: '表示后面没有节点了，遍历应该停止。',
    },
];

function LinkedListIntroPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'想用 for (int i = 0; i < n; i++) 加下标遍历链表，可以吗？'}
                options={['可以', '不行，链表没有连续下标']}
                correctIndex={1}
                explanation="链表节点在内存里不连续，没有 a[i] 这种下标。要用 cur = cur->next 顺着指针一步步走。"
                misconception="把链表当数组，以为能用下标随机访问。"
            />
            <PredictCheck
                prompt={'遍历条件写 while (cur->next != nullptr)，会漏掉谁？'}
                options={['不漏', '漏掉最后一个节点']}
                correctIndex={1}
                explanation="应该写 while (cur != nullptr)。写成 cur->next != nullptr，当 cur 是最后一个节点时就停了，最后一个没被处理。"
                misconception="把「还有下一个」错当成「当前还有效」。"
            />
            <PredictCheck
                prompt={'通过指针 cur 访问节点的 data，写 cur.data 对吗？'}
                options={['对', '错，指针要用 cur->data']}
                correctIndex={1}
                explanation="cur 是指针，访问成员要用箭头 cur->data（等价于 (*cur).data）。点号是用在对象本身上的。"
                misconception="在指针上用点号访问成员。"
            />
        </div>
    );
}

const linkedListIntroMasteryItems = [
    {
        label: '能写出链表节点结构体。',
        evidence: 'struct Node { int data; Node *next; };。',
        retryHint: '回到结构体节点，节点 = 数据 + next。',
    },
    {
        label: '能解释 head 和 next 的作用。',
        evidence: 'head 是入口，next 串起下一个，结尾 next = nullptr。',
        retryHint: '回到成员表，head / next 各管什么。',
    },
    {
        label: '能正确遍历到链表结尾。',
        evidence: 'cur = head; while (cur != nullptr) { ...; cur = cur->next; }。',
        retryHint: '别写 cur->next != nullptr，会漏掉最后一个。',
    },
    {
        label: '能区分指针用箭头、对象用点。',
        evidence: 'cur 是指针所以写 cur->data，对象才用点号。',
        retryHint: '指针 ->，对象 . ，别混。',
    },
];

export default function CppL5Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="链表的诞生 (节点/指针)"
            lessonSubtitle="用节点和 next 指针连接离散数据"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/5"
            nextPath="/lesson/5/7"
            topSupport={<CppL5LessonSupport lessonId={6} />}
            bottomSupport={<CppL5LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '链表不是一排连续格子，而是一串互相指路的节点',
                description: '本课从结构体节点、头指针和遍历开始，建立链表的空间模型。',
            }}
            goals={['能写出链表节点结构体', '能解释 head 和 next 的作用', '能遍历一条单链表并输出数据']}
            prerequisites={['理解指针保存的是地址', '会定义结构体', '会用 new 创建对象']}
            childrenBySection={{
                1: <LinkedListLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">结构体节点：一个节点 = 数据 + 下一个节点地址</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组靠下标找到下一个元素，链表靠指针找到下一个节点。节点结构体必须保存 <code>next</code>。
                            </p>
                        </div>
                        <CodeBlock>{`struct Node {
  int data;
  Node *next;
};`}</CodeBlock>
                        <CompareTable
                            headers={['成员', '含义', '作用']}
                            rows={[
                                ['data', '节点保存的数据', '题目里的值、编号或状态'],
                                ['next', '下一个节点地址', '把链表继续连下去'],
                                ['head', '头指针', '找到整条链表的入口'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">创建链表：先创建节点，再连接 next</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                初学阶段可以用 <code>new</code> 创建节点。每次创建新节点后，把前一个节点的 <code>next</code> 指向它。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`Node *head = nullptr;
Node *tail = nullptr;

for (int i = 0; i < n; i++) {
  Node *p = new Node;
  cin >> p->data;
  p->next = nullptr;

  if (head == nullptr) head = p;
  else tail->next = p;
  tail = p;
}`}</CodeBlock>
                            <StepList steps={[
                                'head 记录第一个节点',
                                'tail 记录当前最后一个节点',
                                '新节点 next 先设为空',
                                '旧 tail 的 next 指向新节点',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">遍历链表：指针一步一步走到 NULL</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                遍历链表不能写 <code>i++</code>，而是让当前指针变成它的 <code>next</code>。
                            </p>
                        </div>
                        <CodeBlock>{`Node *cur = head;
while (cur != nullptr) {
  cout << cur->data << " ";
  cur = cur->next;
}`}</CodeBlock>
                        <Callout icon={MousePointer2} title="箭头运算符" tone="amber">
                            <code>cur-&gt;data</code> 等价于 <code>(*cur).data</code>，用于通过指针访问结构体成员。
                        </Callout>
                        <LinkedListIntroPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                链表入门请每一步都画图：哪个指针指向哪个节点，一定要可视化。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L5-6 链表的诞生离开前检查"
                            description="链表入门最怕“还把它当数组用”。勾选前先画一条 3 节点的链，标出 head、每个 next 和结尾的 nullptr。"
                            items={linkedListIntroMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>创建一条包含 n 个整数的单链表，并原样输出。</li>
                                <li>遍历链表，统计节点数量和数据总和。</li>
                                <li>解释 <code>p-&gt;next = nullptr;</code> 的含义。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习链表插入和删除。操作顺序非常关键，先连后断，小心丢链。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
