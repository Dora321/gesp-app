import React, { useMemo, useState } from 'react';
import { ClipboardCheck, GitBranch, Network, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '非线性结构' },
    { id: 2, title: '树的性质', category: '节点与边' },
    { id: 3, title: '存储方式', category: '父子关系' },
    { id: 4, title: '建树模板', category: '邻接表' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function makeTreeEdges(nodes) {
    const edges = [];
    for (let child = 2; child <= nodes; child++) {
        edges.push([Math.floor(child / 2), child]);
    }
    return edges;
}

function TreeLab() {
    const [nodes, setNodes] = useState(9);
    const edges = useMemo(() => makeTreeEdges(nodes), [nodes]);

    return (
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitBranch className="text-teal-700" />
                <h3 className="text-xl font-black text-slate-950">树结构观察台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <label className="block text-sm font-black text-slate-700">节点数 n = {nodes}</label>
                    <input type="range" min="3" max="15" value={nodes} onChange={(event) => setNodes(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        一棵有 n 个节点的树一定有 n-1 条边。节点越多，边只线性增长，不会像完全图那样爆炸。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg bg-teal-100 p-4 text-center">
                            <div className="text-3xl font-black text-teal-800">{nodes}</div>
                            <div className="text-xs font-black text-teal-700">节点</div>
                        </div>
                        <div className="rounded-lg bg-emerald-100 p-4 text-center">
                            <div className="text-3xl font-black text-emerald-800">{edges.length}</div>
                            <div className="text-xs font-black text-emerald-700">边</div>
                        </div>
                        <div className="rounded-lg bg-slate-100 p-4 text-center">
                            <div className="text-3xl font-black text-slate-800">1</div>
                            <div className="text-xs font-black text-slate-600">根节点</div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {edges.map(([parent, child]) => (
                            <span key={`${parent}-${child}`} className="rounded-lg bg-white px-3 py-2 font-mono text-sm font-black text-slate-700 ring-1 ring-slate-200">
                                {parent} - {child}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '一棵 n 个节点的树有多少条边？',
        answer: 'n-1 条',
        reason: '这是树最重要的性质之一，也常用来检查输入是否合法。',
    },
    {
        question: '树和链表最大的区别是什么？',
        answer: '一个节点可有多个孩子',
        reason: '链表是一条线，树从根向下分叉。',
    },
    {
        question: '存一般树最常用什么？',
        answer: '邻接表',
        reason: '每个节点保存相邻节点，适合遍历和搜索。',
    },
];

export default function CppL6Lesson1() {
    return (
        <CppLessonShell
            lessonNumber={1}
            lessonTitle="树的初相识 (性质/存储)"
            lessonSubtitle="从线性结构走向分层结构"
            accent="teal"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/level6"
            nextPath="/lesson/6/2"
            topSupport={<CppL6LessonSupport lessonId={1} />}
            bottomSupport={<CppL6LessonSupport lessonId={1} placement="bottom" />}
            hero={{
                title: '树是六级算法的入口：很多问题不再是一条线，而是一层层分叉',
                description: '本课建立树的节点、边、根、父子关系和邻接表存储，为遍历、哈夫曼、BFS/DFS 打基础。',
            }}
            goals={['能说出树的基本概念和 n-1 条边性质', '能区分父节点、孩子、叶子和根', '能用邻接表保存一棵树']}
            childrenBySection={{
                1: <TreeLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">树的性质：连通、无环、n 个点 n-1 条边</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                树可以看成一种特殊图：任意两个节点之间只有一条简单路径。只要多一条边，就可能形成环。
                            </p>
                        </div>
                        <CompareTable
                            headers={['概念', '含义', '常见检查']}
                            rows={[
                                ['根 root', '整棵树的起点', '通常题目指定 1 为根'],
                                ['父亲 parent', '当前节点的上一层节点', '根没有父亲'],
                                ['孩子 child', '当前节点的下一层节点', '可能有多个'],
                                ['叶子 leaf', '没有孩子的节点', '递归边界常出现'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">存储方式：父亲数组和邻接表各有用处</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果只需要知道每个节点的父亲，用 <code>parent[i]</code> 就够；如果要从一个点走到相邻点，邻接表更通用。
                            </p>
                        </div>
                        <CompareTable
                            headers={['方式', '代码形态', '适合问题']}
                            rows={[
                                ['父亲数组', 'parent[child] = father', '查祖先、判断根'],
                                ['孩子数组', 'children[u].push_back(v)', '自顶向下遍历'],
                                ['邻接表', 'g[u].push_back(v)', '无根树、DFS/BFS'],
                            ]}
                        />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">建树模板：无向边要双向加入</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                题目给出的树边通常是无向边。建邻接表时两边都要加，遍历时用 <code>parent</code> 防止走回去。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`vector<int> g[1005];

for (int i = 1; i <= n - 1; i++) {
  int u, v;
  cin >> u >> v;
  g[u].push_back(v);
  g[v].push_back(u);
}`}</CodeBlock>
                            <StepList steps={[
                                '读入 n 个节点',
                                '循环读取 n-1 条边',
                                '无向边双向加入邻接表',
                                '遍历时记录父节点避免回头',
                            ]} />
                        </div>
                        <Callout icon={Network} title="树题口令" tone="teal">
                            看到 n 个点、n-1 条边、连通关系，就先把它当树处理。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课作业重点是“会建树”。后面的遍历、搜索和 DP 都建立在正确存储上。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入一棵 n 个点的树，输出每个点的度数。</li>
                                <li>用 parent 数组保存每个节点的父亲。</li>
                                <li>画出样例输入对应的树形结构。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习前序、中序、后序遍历，把“树怎么存”推进到“树怎么走”。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
