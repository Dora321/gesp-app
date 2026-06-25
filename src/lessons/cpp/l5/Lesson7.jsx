import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Plus, Search } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '先连后断' },
    { id: 2, title: '插入节点', category: '连接顺序' },
    { id: 3, title: '删除节点', category: '跳过目标' },
    { id: 4, title: '头节点特判', category: '边界处理' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function InsertDeleteLab() {
    const [mode, setMode] = useState('insert');
    const nodes = useMemo(() => {
        if (mode === 'insert') return ['A', 'B', 'X', 'C', 'D'];
        return ['A', 'B', 'D'];
    }, [mode]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Plus className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">链表增删演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setMode('insert')} className={`rounded-lg px-3 py-2 text-sm font-black ${mode === 'insert' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                            插入 X
                        </button>
                        <button onClick={() => setMode('delete')} className={`rounded-lg px-3 py-2 text-sm font-black ${mode === 'delete' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                            删除 C
                        </button>
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        插入要先让新节点接住后半段；删除要先让前驱跳过目标节点。
                    </p>
                </div>
                <div className="overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="flex min-w-max items-center gap-3">
                        <span className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white">head</span>
                        {nodes.map((node) => (
                            <React.Fragment key={node}>
                                <span className="font-black text-amber-700">-&gt;</span>
                                <div className={`rounded-xl border-2 p-4 font-mono font-black ${node === 'X'
                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                    : 'border-amber-200 bg-amber-50 text-amber-900'
                                }`}>
                                    {node}
                                </div>
                            </React.Fragment>
                        ))}
                        <span className="font-black text-amber-700">-&gt;</span>
                        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">NULL</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '插入节点时为什么要先连新节点的 next？',
        answer: '防止丢失后半段',
        reason: '如果先改前驱 next，原来的后继节点地址可能找不到。',
    },
    {
        question: '删除节点本质上改谁的 next？',
        answer: '前驱节点',
        reason: '让前驱直接指向目标节点的下一个节点。',
    },
    {
        question: '删除头节点为什么特殊？',
        answer: '没有前驱节点',
        reason: '需要直接移动 head 到 head->next。',
    },
];

function LinkedListPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'插入 x 时先写 p->next = x; 再写 x->next = p->next; 会怎样？'}
                options={['正常插入', 'x 指向自己，后半段全丢']}
                correctIndex={1}
                explanation="先改 p->next = x 后，p 原来的后继地址就丢了；接着 x->next = p->next 此时 p->next 已是 x，于是 x 指向自己。必须先 x->next = p->next，再 p->next = x。"
                misconception="颠倒了「先连后断」的顺序，先断了链才去连。"
            />
            <PredictCheck
                prompt={'删除节点时先 delete q; 再用 q->next，可以吗？'}
                options={['可以', '不行，delete 后 q->next 是悬空访问']}
                correctIndex={1}
                explanation="delete q 之后 q 指向的内存已释放，再读 q->next 是未定义行为。必须先用 q->next 把链改好，最后再 delete q。"
                misconception="以为 delete 之后还能安全读这个节点的字段。"
            />
            <PredictCheck
                prompt={'删除链表第一个节点，能套用「改前驱 next」的模板吗？'}
                options={['能', '不能，头节点没有前驱']}
                correctIndex={1}
                explanation="头节点前面没有节点帮它跳过，必须直接 head = head->next，再 delete 旧 head。"
                misconception="套用中间节点的删除模板，忘了头节点没有前驱。"
            />
        </div>
    );
}

const linkedListMasteryItems = [
    {
        label: '能解释插入为什么要「先连后断」。',
        evidence: '先 x->next = p->next 接住后半段，再 p->next = x。',
        retryHint: '回到插入小节，想想颠倒顺序会发生什么。',
    },
    {
        label: '能安全删除一个节点。',
        evidence: '先保存/改链，再 delete，绝不在 delete 之后访问该节点。',
        retryHint: '回到「不要直接 delete 后再访问」。',
    },
    {
        label: '能处理头节点删除的特判。',
        evidence: '头节点直接 head = head->next，因为它没有前驱。',
        retryHint: '回到头节点特判表。',
    },
    {
        label: '能先画箭头图再改指针。',
        evidence: '插入/删除前先画出修改前、修改后的指针指向。',
        retryHint: '别凭感觉改指针，先把 before/after 画出来。',
    },
];

export default function CppL5Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="链表的增删改 (先连后断)"
            lessonSubtitle="掌握插入和删除节点的指针顺序"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/6"
            nextPath="/lesson/5/8"
            topSupport={<CppL5LessonSupport lessonId={7} />}
            bottomSupport={<CppL5LessonSupport lessonId={7} placement="bottom" />}
            hero={{
                title: '链表操作最怕“手一快”：顺序错了，后半条链就找不回来了',
                description: '本课聚焦单链表插入、删除和头节点特判，训练每一步指针变化的可视化推演。',
            }}
            goals={['能在指定节点后插入新节点', '能删除指定节点后的节点', '能处理头节点和空链表边界']}
            prerequisites={['理解指针保存的是地址', '理解节点 node->next 指向下一个', '会在纸上画指针指向图']}
            childrenBySection={{
                1: <InsertDeleteLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">插入节点：新节点先接后面，前驱再接新节点</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                在节点 <code>p</code> 后插入 <code>x</code>，必须先让 <code>x</code> 指向原来的后继，再让 <code>p</code> 指向 <code>x</code>。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`Node *x = new Node;
x->data = value;

x->next = p->next;
p->next = x;`}</CodeBlock>
                            <StepList steps={[
                                '创建新节点 x',
                                'x->next 接住 p 原来的后继',
                                'p->next 改为指向 x',
                                '检查链是否仍能走到结尾',
                            ]} />
                        </div>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">删除节点：让前驱跳过目标节点</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                删除 <code>p</code> 后面的节点时，先保存目标节点地址，再改 <code>p-&gt;next</code>，最后释放目标节点。
                            </p>
                        </div>
                        <CodeBlock>{`Node *q = p->next;
if (q != nullptr) {
  p->next = q->next;
  delete q;
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="不要直接 delete 后再访问" tone="amber">
                            <code>delete q</code> 之后不能再使用 <code>q-&gt;next</code>。需要的信息必须提前保存。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">头节点特判：head 本身也可能被改掉</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                删除第一个节点时，没有前驱节点可以帮忙跳过它，所以要直接移动 <code>head</code>。
                            </p>
                        </div>
                        <CodeBlock>{`if (head != nullptr && head->data == target) {
  Node *old = head;
  head = head->next;
  delete old;
}`}</CodeBlock>
                        <CompareTable
                            headers={['操作位置', '是否有前驱', '处理方式']}
                            rows={[
                                ['头节点', '没有', '直接修改 head'],
                                ['中间节点', '有', '修改 prev->next'],
                                ['尾节点', '有', 'prev->next 变成 nullptr'],
                            ]}
                        />
                        <LinkedListPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                链表增删题不要只写代码，请先画出修改前和修改后的箭头。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L5-7 链表增删改离开前检查"
                            description="链表增删最怕“手一快，顺序错了后半条链就找不回来”。勾选前先把插入和删除各画一张 before/after 箭头图。"
                            items={linkedListMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>在单链表第 k 个节点后插入一个新值。</li>
                                <li>删除链表中第一个值等于 target 的节点。</li>
                                <li>删除链表中所有值等于 target 的节点。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习双向链表和循环链表。它们增加了指针数量，也增加了边界复杂度。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
