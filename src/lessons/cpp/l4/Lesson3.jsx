import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, ClipboardCheck, Search, Sigma } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '数组参数' },
    { id: 2, title: '数组进函数', category: '传递地址' },
    { id: 3, title: '长度必须单独传', category: '边界控制' },
    { id: 4, title: '常见数组函数', category: '模板积累' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ArrayFunctionLab() {
    const [values, setValues] = useState('4 7 2 9 5');

    const stats = useMemo(() => {
        const nums = values.trim().split(/\s+/).map(Number).filter(Number.isFinite);
        const sum = nums.reduce((total, value) => total + value, 0);
        const max = nums.length ? Math.max(...nums) : 0;
        return { nums, sum, max };
    }, [values]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Boxes className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">数组函数实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">数组内容</label>
                    <textarea
                        value={values}
                        onChange={(event) => setValues(event.target.value)}
                        className="mt-3 h-28 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-indigo-400"
                    />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <p className="text-xs font-black uppercase text-slate-400">n</p>
                        <p className="mt-1 text-2xl font-black text-indigo-700">{stats.nums.length}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <p className="text-xs font-black uppercase text-slate-400">sumArray</p>
                        <p className="mt-1 text-2xl font-black text-emerald-700">{stats.sum}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <p className="text-xs font-black uppercase text-slate-400">maxArray</p>
                        <p className="mt-1 text-2xl font-black text-rose-700">{stats.max}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '数组作为参数时，函数知道长度吗？',
        answer: '不知道',
        reason: '需要单独把 n 传进去，函数才能知道实际处理多少个元素。',
    },
    {
        question: '函数里修改 a[i] 会影响原数组吗？',
        answer: '会',
        reason: '数组参数传递的是数组首地址，函数操作的是原数组内容。',
    },
    {
        question: '求数组最大值时 ans 可以初始化为 0 吗？',
        answer: '不稳',
        reason: '如果数组全是负数，初始化为 0 会得到错误答案。',
    },
];

export default function CppL4Lesson3() {
    return (
        <CppLessonShell
            lessonNumber={3}
            lessonTitle="特殊的参数：数组进函数"
            lessonSubtitle="把数组处理封装成函数模板"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/2"
            nextPath="/lesson/4/4"
            hero={{
                title: '数组进函数时，数据不会完整复制一份',
                description: '本课把三级数组统计升级成函数版本，重点掌握数组参数、长度参数和常见数组函数模板。',
            }}
            goals={['能写数组作为函数参数的语法', '能解释为什么长度 n 要单独传入', '能封装求和、最大值和修改数组的函数']}
            childrenBySection={{
                1: <ArrayFunctionLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组进函数：参数写成 int a[]</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组作为参数时，函数拿到的是原数组的位置。函数里访问 <code>a[i]</code>，就是在访问原来的数组元素。
                            </p>
                        </div>
                        <CodeBlock>{`int sumArray(int a[], int n) {
  int sum = 0;
  for (int i = 0; i < n; i++) {
    sum += a[i];
  }
  return sum;
}`}</CodeBlock>
                        <Callout icon={Sigma} title="数组函数常常需要 n" tone="indigo">
                            <code>int a[]</code> 只告诉函数数组在哪里，不告诉函数实际有几个元素。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">长度必须单独传：容量不是实际长度</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                声明 <code>int a[1005]</code> 只是容量。本次题目实际读入多少个，要靠 <code>n</code> 控制。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int countEven(int a[], int n) {
  int cnt = 0;
  for (int i = 0; i < n; i++) {
    if (a[i] % 2 == 0) cnt++;
  }
  return cnt;
}`}</CodeBlock>
                            <StepList steps={[
                                '数组参数保存数据位置',
                                'n 保存实际长度',
                                '循环条件写 i < n',
                                '不要扫完整个最大容量',
                            ]} />
                        </div>
                        <Callout icon={AlertTriangle} title="不要在函数里猜长度" tone="amber">
                            四级数组函数题里，漏传 n 是常见错误。函数不知道输入数据实际有多少个。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">常见数组函数：统计、最值、修改</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                把三级数组题封装成函数后，main 会变成“读入 + 调用 + 输出”的清晰流程。
                            </p>
                        </div>
                        <CompareTable
                            headers={['函数', '职责', '返回值']}
                            rows={[
                                ['sumArray(a, n)', '求数组和', 'int'],
                                ['maxArray(a, n)', '求最大值', 'int'],
                                ['reverseArray(a, n)', '原地倒置数组', 'void'],
                            ]}
                        />
                        <CodeBlock>{`void addOne(int a[], int n) {
  for (int i = 0; i < n; i++) {
    a[i]++;
  }
}`}</CodeBlock>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课请把函数参数含义写在草稿上：a 表示数组，n 表示实际长度。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写函数 <code>int sumArray(int a[], int n)</code>。</li>
                                <li>写函数 <code>int maxArray(int a[], int n)</code>。</li>
                                <li>写函数 <code>void reverseArray(int a[], int n)</code>，原地倒置数组。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入递归。函数不只可以被 main 调用，也可以调用自己。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
