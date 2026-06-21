import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Database, GitBranch, Search, Target } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '函数模型' },
    { id: 2, title: '为什么要函数', category: '拆分代码' },
    { id: 3, title: '函数定义与调用', category: '语法模板' },
    { id: 4, title: '返回值与参数', category: '数据流' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function FunctionFlowLab() {
    const [radius, setRadius] = useState(3);
    const [height, setHeight] = useState(5);

    const data = useMemo(() => {
        const area = radius * radius;
        const volume = area * height;
        return { area, volume };
    }, [height, radius]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitBranch className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">函数调用实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">边长 r：{radius}</label>
                    <input type="range" min="1" max="10" value={radius} onChange={(event) => setRadius(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">高度 h：{height}</label>
                    <input type="range" min="1" max="10" value={height} onChange={(event) => setHeight(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <p className="text-xs font-black uppercase text-slate-400">square(r)</p>
                        <p className="mt-1 text-2xl font-black text-indigo-700">{radius} * {radius} = {data.area}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <p className="text-xs font-black uppercase text-slate-400">volume(r, h)</p>
                        <p className="mt-1 text-2xl font-black text-emerald-700">{data.area} * {height} = {data.volume}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '函数最直接的作用是什么？',
        answer: '封装一段可复用逻辑',
        reason: '把重复或复杂步骤放进函数，main 只负责组织流程。',
    },
    {
        question: '有返回值的函数需要写什么？',
        answer: 'return',
        reason: 'return 把计算结果交回调用位置。',
    },
    {
        question: '函数声明通常放在哪里？',
        answer: 'main 前面',
        reason: 'C++ 要先知道函数长什么样，后面才能调用。',
    },
];

export default function CppL4Lesson1() {
    return (
        <CppLessonShell
            lessonNumber={1}
            lessonTitle="代码的积木：自定义函数"
            lessonSubtitle="把复杂程序拆成可复用的小模块"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/3/16"
            nextPath="/lesson/4/2"
            topSupport={<CppL4LessonSupport lessonId={1} />}
            bottomSupport={<CppL4LessonSupport lessonId={1} placement="bottom" />}
            hero={{
                title: '四级从函数开始：让程序从一长串代码变成模块组合',
                description: '三级重点是会写循环、数组、字符串和模拟；四级开始要学会拆代码。函数就是第一块积木。',
            }}
            goals={['能解释函数为什么能降低复杂度', '能写出函数定义和调用', '能理解参数、返回值和 main 的关系']}
            childrenBySection={{
                1: <FunctionFlowLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">为什么要函数：让 main 变短，让逻辑变清楚</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                当一道题有多个步骤时，把每个步骤写成函数，程序会更容易检查、复用和调试。
                            </p>
                        </div>
                        <CompareTable
                            headers={['写法', '问题', '改进']}
                            rows={[
                                ['全部写在 main', '代码长，难检查', '适合很短的小题'],
                                ['拆成函数', '要多写函数名和参数', '逻辑清楚，便于复用'],
                                ['函数命名清楚', '需要先想职责', '读代码像读步骤清单'],
                            ]}
                        />
                        <Callout icon={Target} title="函数只做一件事" tone="indigo">
                            一个函数最好有清楚职责，比如判断质数、求最大值、输出图形。职责越清楚，越不容易写乱。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">函数定义与调用：先定义，再调用</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                函数定义说明“这个函数怎么工作”，函数调用表示“现在执行它”。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int square(int x) {
  return x * x;
}

int main() {
  int a;
  cin >> a;
  cout << square(a);
  return 0;
}`}</CodeBlock>
                            <StepList steps={[
                                '写返回值类型',
                                '写函数名和参数列表',
                                '在函数体里完成计算',
                                '调用时传入实际数据',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">返回值与参数：函数的数据入口和出口</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                参数是函数的输入，返回值是函数的输出。理解数据怎么进出函数，是学好四级传参的基础。
                            </p>
                        </div>
                        <CodeBlock>{`bool isEven(int x) {
  return x % 2 == 0;
}

int add(int a, int b) {
  return a + b;
}`}</CodeBlock>
                        <Callout icon={Database} title="void 函数没有返回值" tone="blue">
                            如果函数只负责输出或修改外部状态，可以写 <code>void</code>。这种函数可以不写返回值。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习重点不是写复杂函数，而是让函数名、参数、返回值三件事对应清楚。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写函数 <code>int square(int x)</code>，返回 x 的平方。</li>
                                <li>写函数 <code>bool isPrime(int x)</code>，判断 x 是否为质数。</li>
                                <li>把三级里的一道数组统计题改写成函数版本。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习传值与传参：同样是把数据传给函数，为什么有时改不动外面的变量？
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
