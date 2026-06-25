import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, ClipboardCheck, Search, Sigma } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

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

function ArrayParamPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'void addOne(int a[], int n){ ...a[i]++... } 调用后，main 里的原数组会变吗？'}
                options={['不会，和传值一样', '会，数组传的是地址']}
                correctIndex={1}
                explanation="数组参数传的是首地址，函数操作的就是原数组。和普通 int 传值不同——这正是数组的特殊之处。"
                misconception="把数组传参当成和 int 一样的「复制一份副本」。"
            />
            <PredictCheck
                prompt={'int a[] 作为参数，函数自己能知道数组有多少个元素吗？'}
                options={['能，数组自带长度', '不能，必须单独传 n']}
                correctIndex={1}
                explanation="int a[] 只告诉函数数组在哪里，不带长度信息。必须再传一个 n 才知道处理几个。"
                misconception="以为数组参数会自动带上长度。"
            />
            <PredictCheck
                prompt={'maxArray 里把 ans 初始化为 0，数组全是负数会怎样？'}
                options={['没问题', '错，应初始化为 a[0]']}
                correctIndex={1}
                explanation="全是负数时没有元素大于 0，函数返回错误的 0。应该用 a[0] 当初值。"
                misconception="沿用「最大值从 0 开始」的习惯，忽略了全负数的情形。"
            />
        </div>
    );
}

const arrayParamMasteryItems = [
    {
        label: '能写数组作为函数参数的语法。',
        evidence: '知道写成 int a[]，传的是地址而不是复制整份数据。',
        retryHint: '回到「数组进函数」，看 sumArray 的参数列表。',
    },
    {
        label: '能解释数组传参为什么能改原数组。',
        evidence: '数组传首地址，函数里改 a[i] 就是改原数组——和上一课 int 传值相反。',
        retryHint: '对照上一课的 int 传值，想清两者区别。',
    },
    {
        label: '能说清长度 n 为什么要单独传。',
        evidence: 'int a[] 不带长度，循环要靠传入的 n 控制 i < n。',
        retryHint: '回到「长度必须单独传」，别在函数里猜长度。',
    },
    {
        label: '能封装并迁移数组函数。',
        evidence: '能写 sumArray / maxArray / reverseArray，让 main 变成读入 + 调用 + 输出。',
        retryHint: '先固定 (int a[], int n) 签名，再改函数体。',
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
            topSupport={<CppL4LessonSupport lessonId={3} />}
            bottomSupport={<CppL4LessonSupport lessonId={3} placement="bottom" />}
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
                        <ArrayParamPredictionChecks />
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
                        <MasteryCheck
                            title="C++ L4-3 数组进函数离开前检查"
                            description="数组进函数最怕“以为复制了一份，其实改的是原数组”。勾选前先用一个小数组手推 addOne 的效果。"
                            items={arrayParamMasteryItems}
                        />
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
