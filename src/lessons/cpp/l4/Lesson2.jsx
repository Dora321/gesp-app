import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRightLeft, ClipboardCheck, Database, Search } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '传参模型' },
    { id: 2, title: '传值', category: '复制一份' },
    { id: 3, title: '引用传参', category: '操作原件' },
    { id: 4, title: '返回值 vs 引用', category: '选择策略' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function SwapLab() {
    const [a, setA] = useState(3);
    const [b, setB] = useState(8);
    const [mode, setMode] = useState('value');

    const result = useMemo(() => {
        if (mode === 'value') return { a, b, note: '传值只交换函数内部副本，外面的 a 和 b 不变。' };
        return { a: b, b: a, note: '引用传参操作原变量，外面的 a 和 b 会交换。' };
    }, [a, b, mode]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <ArrowRightLeft className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">传参交换实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">a = {a}</label>
                    <input type="range" min="1" max="20" value={a} onChange={(event) => setA(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">b = {b}</label>
                    <input type="range" min="1" max="20" value={b} onChange={(event) => setB(Number(event.target.value))} className="mt-3 w-full" />
                    <div className="mt-5 grid grid-cols-2 gap-2">
                        {[
                            ['value', '传值'],
                            ['reference', '引用'],
                        ].map(([id, label]) => (
                            <button
                                key={id}
                                onClick={() => setMode(id)}
                                className={`rounded-lg px-3 py-2 text-sm font-black ${mode === id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <p className="text-sm font-black text-slate-500">调用 swap 后</p>
                    <p className="mt-2 font-mono text-3xl font-black text-indigo-700">a = {result.a}, b = {result.b}</p>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{result.note}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '传值传参会修改原变量吗？',
        answer: '不会',
        reason: '函数拿到的是一份副本，副本变了不影响原变量。',
    },
    {
        question: '引用传参的符号是什么？',
        answer: '&',
        reason: '例如 void swapNum(int &a, int &b)。',
    },
    {
        question: '只需要一个计算结果时优先用什么？',
        answer: '返回值',
        reason: '返回值表达清楚，副作用少，适合单结果函数。',
    },
];

export default function CppL4Lesson2() {
    return (
        <CppLessonShell
            lessonNumber={2}
            lessonTitle="数据的替身：传值与传参"
            lessonSubtitle="弄清函数拿到的是副本还是原变量"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/1"
            nextPath="/lesson/4/3"
            topSupport={<CppL4LessonSupport lessonId={2} />}
            bottomSupport={<CppL4LessonSupport lessonId={2} placement="bottom" />}
            hero={{
                title: '传参决定函数能不能改动外面的变量',
                description: '本课解决四级函数题的核心疑问：为什么函数里改了变量，main 里的值却没变？什么时候该用引用？',
            }}
            goals={['能区分传值和引用传参', '能写出引用交换两个变量', '能选择返回值或引用传参']}
            childrenBySection={{
                1: <SwapLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">传值：函数拿到的是复制品</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                普通参数传递会复制一份数据给函数。函数内部怎么改，都不会影响 main 里的原变量。
                            </p>
                        </div>
                        <CodeBlock>{`void change(int x) {
  x = 100;
}

int main() {
  int a = 5;
  change(a);
  cout << a; // 仍然是 5
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="传值不是错误" tone="amber">
                            如果函数只是读取数据、计算答案，传值很安全。需要修改原变量时，才考虑引用传参。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">引用传参：函数直接操作原变量</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                在参数名前加 <code>&amp;</code>，函数里的参数就绑定到外面的变量。修改参数，原变量也会变。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`void swapNum(int &x, int &y) {
  int t = x;
  x = y;
  y = t;
}

int main() {
  int a = 3, b = 8;
  swapNum(a, b);
  cout << a << " " << b; // 8 3
}`}</CodeBlock>
                            <StepList steps={[
                                '参数写成 int &x',
                                'x 和外面的 a 绑定',
                                '函数内修改 x',
                                'main 里的 a 同步改变',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">返回值 vs 引用：看函数要交回几个结果</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                一个清晰结果通常用返回值。需要同时修改多个变量时，引用传参更合适。
                            </p>
                        </div>
                        <CompareTable
                            headers={['需求', '推荐写法', '理由']}
                            rows={[
                                ['判断是否质数', 'bool isPrime(int x)', '只有一个判断结果'],
                                ['求两个数最大值', 'int maxNum(int a, int b)', '返回一个数即可'],
                                ['交换两个变量', 'void swapNum(int &a, int &b)', '需要同时修改两个变量'],
                            ]}
                        />
                        <Callout icon={Database} title="少用无意义引用" tone="blue">
                            不要为了“高级”乱用引用。引用会修改外部数据，使用前要非常明确。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习要画出变量是否被复制，避免凭感觉判断。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写一个传值函数，证明 main 中变量不会被修改。</li>
                                <li>写 <code>swapNum</code>，用引用交换两个整数。</li>
                                <li>写函数 <code>void addOne(int &x)</code>，让传入变量加一。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习数组进函数。数组参数很特殊，它不像普通 int 那样完整复制一份。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
