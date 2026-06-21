import React, { useMemo, useState } from 'react';
import { BrainCircuit, ClipboardCheck, Repeat2, Search } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '重复子问题' },
    { id: 2, title: '记忆化思想', category: '缓存答案' },
    { id: 3, title: '递归模板', category: '先查再算' },
    { id: 4, title: '常见模型', category: '路径与选择' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function countFibCalls(n, memoized) {
    const memo = new Map();
    let calls = 0;

    function dfs(x) {
        calls += 1;
        if (x <= 1) return x;
        if (memoized && memo.has(x)) return memo.get(x);
        const value = dfs(x - 1) + dfs(x - 2);
        if (memoized) memo.set(x, value);
        return value;
    }

    const value = dfs(n);
    return { value, calls };
}

function MemoLab() {
    const [n, setN] = useState(10);
    const plain = useMemo(() => countFibCalls(n, false), [n]);
    const memo = useMemo(() => countFibCalls(n, true), [n]);

    return (
        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <BrainCircuit className="text-purple-700" />
                <h3 className="text-xl font-black text-slate-950">递归缓存实验室</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                    <label className="block text-sm font-black text-slate-700">计算 fib({n})</label>
                    <input type="range" min="5" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        同一个状态被反复计算时，记忆化能把“递归树爆炸”压回“每个状态只算一次”。
                    </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                        <div className="text-xs font-black uppercase text-slate-400">普通递归</div>
                        <div className="mt-2 text-3xl font-black text-rose-700">{plain.calls}</div>
                        <p className="text-sm font-bold text-slate-500">次函数调用</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                        <div className="text-xs font-black uppercase text-slate-400">记忆化递归</div>
                        <div className="mt-2 text-3xl font-black text-emerald-700">{memo.calls}</div>
                        <p className="text-sm font-bold text-slate-500">次函数调用，答案 {memo.value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '记忆化解决的核心浪费是什么？',
        answer: '重复计算同一状态',
        reason: '把已经算过的状态存下来，下次直接返回。',
    },
    {
        question: '递归状态通常由什么决定？',
        answer: '参数',
        reason: '参数相同，子问题相同，答案也应该相同。',
    },
    {
        question: '写记忆化时先做哪一步？',
        answer: '检查缓存',
        reason: '先查 memo，再处理递归计算，最后存答案。',
    },
];

export default function CppL5Lesson13() {
    return (
        <CppLessonShell
            lessonNumber={13}
            lessonTitle="递归的进阶 (记忆化)"
            lessonSubtitle="把算过的子问题存起来"
            accent="purple"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/12"
            nextPath="/lesson/5/14"
            topSupport={<CppL5LessonSupport lessonId={13} />}
            bottomSupport={<CppL5LessonSupport lessonId={13} placement="bottom" />}
            hero={{
                title: '记忆化递归的关键是识别“状态”，不是多写一个数组',
                description: '本课用斐波那契、路径计数和选择问题建立记忆化递归模板，为动态规划打底。',
            }}
            goals={['能判断题目是否有重复子问题', '能用数组或 map 缓存递归答案', '能写出先查、再算、后存的模板']}
            childrenBySection={{
                1: <MemoLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">记忆化思想：每个状态只认真算一次</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                普通递归慢，常常不是因为递归本身，而是同一个子问题被算了很多遍。记忆化就是给递归加一个答案缓存。
                            </p>
                        </div>
                        <CompareTable
                            headers={['写法', '特点', '适合场景']}
                            rows={[
                                ['普通递归', '结构清楚但可能重复计算', '小规模、无重复状态'],
                                ['记忆化递归', '保留递归思路并缓存答案', '状态容易用参数描述'],
                                ['递推 DP', '从小状态推到大状态', '顺序明确、需要压缩空间'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递归模板：先判断边界，再检查缓存</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>memo[x]</code> 存的是状态 <code>x</code> 的答案。不要把“未计算”和“答案为 0”混在一起。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int memo[1005];
bool done[1005];

int dfs(int x) {
  if (x <= 1) return x;
  if (done[x]) return memo[x];

  done[x] = true;
  memo[x] = dfs(x - 1) + dfs(x - 2);
  return memo[x];
}`}</CodeBlock>
                            <StepList steps={[
                                '先写递归边界',
                                '再判断这个状态是否算过',
                                '递归求出答案',
                                '标记 done 并保存 memo',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">常见模型：路径、选择、拆分都可能有重复状态</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                当题目问“从当前位置到终点有多少种方法”或“当前剩余容量最多能拿多少”时，通常可以把当前位置、剩余量当状态。
                            </p>
                        </div>
                        <CodeBlock>{`// 网格路径：从 (i, j) 走到右下角
int dfs(int i, int j) {
  if (i == n && j == m) return 1;
  if (i > n || j > m) return 0;
  if (done[i][j]) return memo[i][j];

  done[i][j] = true;
  memo[i][j] = dfs(i + 1, j) + dfs(i, j + 1);
  return memo[i][j];
}`}</CodeBlock>
                        <Callout icon={Repeat2} title="状态口令" tone="purple">
                            问自己：如果两个递归调用的参数完全一样，它们后面要解决的问题是不是也完全一样？
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课作业重点不是背模板，而是先写清楚状态含义。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写出 fib(n) 的普通递归和记忆化递归，并比较调用次数。</li>
                                <li>完成一个网格路径计数题，状态写成 f[i][j]。</li>
                                <li>给一道题写出“状态、边界、转移、答案位置”四句话。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习复杂度，用更严谨的方式判断一个算法是否能在考试时限内跑完。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
