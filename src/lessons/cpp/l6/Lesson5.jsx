import React, { useMemo, useState } from 'react';
import { ClipboardCheck, GitBranch, ListChecks, Search } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '深入搜索' },
    { id: 2, title: 'DFS 思想', category: '递归栈' },
    { id: 3, title: '回溯模板', category: '选择与撤销' },
    { id: 4, title: '连通块', category: '访问标记' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const choices = ['A', 'B', 'C', 'D'];

function makePath(depth) {
    const result = [];
    function dfs(path, used) {
        if (result.length >= depth) return;
        if (path.length === 3) {
            result.push(path.join(''));
            return;
        }
        for (const item of choices) {
            if (used.has(item)) continue;
            used.add(item);
            path.push(item);
            dfs(path, used);
            path.pop();
            used.delete(item);
        }
    }
    dfs([], new Set());
    return result;
}

function DfsLab() {
    const [steps, setSteps] = useState(6);
    const paths = useMemo(() => makePath(steps), [steps]);

    return (
        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitBranch className="text-purple-700" />
                <h3 className="text-xl font-black text-slate-950">DFS 路径展开台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                    <label className="block text-sm font-black text-slate-700">展示前 {steps} 条路径</label>
                    <input type="range" min="1" max="12" value={steps} onChange={(event) => setSteps(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        DFS 会沿着一条路走到底，回退后再尝试下一条路。它适合枚举方案、找连通块、做回溯搜索。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                    <div className="flex flex-wrap gap-2">
                        {paths.map((path, index) => (
                            <span key={`${path}-${index}`} className="rounded-lg bg-purple-100 px-3 py-2 font-mono text-sm font-black text-purple-800">
                                {index + 1}. {path}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">每条路径长度为 3，字母不可重复。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'DFS 的核心动作是什么？',
        answer: '深入、返回、再尝试',
        reason: '先沿一个方向走到底，再回溯到上一个选择点。',
    },
    {
        question: '回溯为什么要撤销选择？',
        answer: '恢复现场',
        reason: '不撤销会影响兄弟分支，导致方案丢失或重复。',
    },
    {
        question: '连通块 DFS 最重要的数组是什么？',
        answer: 'visited',
        reason: '它保证每个点只访问一次，避免无限递归。',
    },
];

export default function CppL6Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="不撞南墙不回头 (DFS)"
            lessonSubtitle="一条路走到底，再回头换路"
            accent="purple"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/4"
            nextPath="/lesson/6/6"
            hero={{
                title: 'DFS 像一支铅笔：先把一条可能路线画到底，再擦回去换选择',
                description: '本课用排列枚举、网格连通块和回溯模板建立 DFS 的递归思维。',
            }}
            goals={['能解释 DFS 的递归调用过程', '能写出选择、递归、撤销的回溯模板', '能用 visited 求连通块']}
            childrenBySection={{
                1: <DfsLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">DFS 思想：栈里保存的是还没走完的路线</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                递归版 DFS 会自动使用调用栈。每进入一层递归，就相当于沿当前选择往深处走一步。
                            </p>
                        </div>
                        <CompareTable
                            headers={['对比', 'BFS', 'DFS']}
                            rows={[
                                ['数据结构', '队列', '递归栈或手写栈'],
                                ['访问方式', '一层层扩展', '一条路走到底'],
                                ['常见用途', '最短步数', '枚举方案、连通块'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">回溯模板：做选择、递归、撤销选择</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                只要题目要求“输出所有方案”“选择若干个不重复对象”，就要警惕回溯模型。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`void dfs(int depth) {
  if (depth == target) {
    printAnswer();
    return;
  }

  for (int i = 1; i <= n; i++) {
    if (used[i]) continue;
    used[i] = true;
    path.push_back(i);

    dfs(depth + 1);

    path.pop_back();
    used[i] = false;
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '判断是否达到递归出口',
                                '枚举当前层可选项',
                                '记录选择并进入下一层',
                                '递归返回后撤销选择',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">连通块：遇到一个新点，就把它所在的一整块染色</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                网格、图、树都能用 DFS 找连通块。关键是访问一个点后，把它能到达的邻居继续访问。
                            </p>
                        </div>
                        <CodeBlock>{`void dfs(int x, int y) {
  visited[x][y] = true;
  for (int k = 0; k < 4; k++) {
    int nx = x + dx[k];
    int ny = y + dy[k];
    if (nx < 1 || nx > n || ny < 1 || ny > m) continue;
    if (grid[nx][ny] == '#') continue;
    if (visited[nx][ny]) continue;
    dfs(nx, ny);
  }
}`}</CodeBlock>
                        <Callout icon={ListChecks} title="DFS 检查清单" tone="purple">
                            出口是否明确？visited 是否及时标记？回溯题是否撤销选择？方向数组是否覆盖所有方向？
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                DFS 作业要画递归树。看见递归树，才更容易发现为什么要回溯。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输出 1..n 的全排列。</li>
                                <li>统计网格中有多少个连通块。</li>
                                <li>对比 BFS 和 DFS 在迷宫题里的用途差异。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入 C++ 类与对象，把数据和操作封装到同一个结构里。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
