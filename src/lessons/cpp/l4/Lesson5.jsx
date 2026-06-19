import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, MapPin, Search, Waypoints } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '地址模型' },
    { id: 2, title: '地址与指针', category: '核心概念' },
    { id: 3, title: '取地址与解引用', category: '操作模板' },
    { id: 4, title: '指针常见坑', category: '安全边界' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function PointerLab() {
    const [value, setValue] = useState(42);
    const fakeAddress = useMemo(() => `0x${(4096 + value * 16).toString(16).toUpperCase()}`, [value]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <MapPin className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">指针地址实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">变量 x = {value}</label>
                    <input type="range" min="1" max="99" value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-indigo-700 ring-1 ring-indigo-100">&amp;x = {fakeAddress}</div>
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-emerald-700 ring-1 ring-indigo-100">p = &amp;x</div>
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-rose-700 ring-1 ring-indigo-100">*p = {value}</div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '指针变量保存的是什么？',
        answer: '地址',
        reason: '指针不是直接保存普通数据，而是保存某个变量所在的位置。',
    },
    {
        question: '&x 表示什么？',
        answer: 'x 的地址',
        reason: '取地址运算符可以得到变量在内存中的位置。',
    },
    {
        question: '*p 表示什么？',
        answer: 'p 指向位置里的值',
        reason: '解引用会访问指针保存的地址对应的数据。',
    },
];

export default function CppL4Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="神秘的门牌号：指针入门"
            lessonSubtitle="理解变量地址和指针保存的内容"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/4"
            nextPath="/lesson/4/6"
            hero={{
                title: '指针不是玄学，它只是保存地址的变量',
                description: '本课把指针拆成三个动作：取地址、保存地址、通过地址访问值。先建立地址模型，再进入数组和指针的关系。',
            }}
            goals={['能解释地址和指针的区别', '能写出取地址和解引用语法', '能识别未初始化指针的风险']}
            childrenBySection={{
                1: <PointerLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">地址与指针：变量有值，也有位置</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                普通变量保存数据，指针变量保存地址。理解这一点，后面的数组参数和链表才不会散架。
                            </p>
                        </div>
                        <CodeBlock>{`int x = 10;
int *p = &x;

cout << x;  // 10
cout << &x; // x 的地址
cout << p;  // p 保存的地址`}</CodeBlock>
                        <CompareTable
                            headers={['写法', '含义', '结果类型']}
                            rows={[
                                ['x', '变量的值', 'int'],
                                ['&x', '变量的地址', 'int*'],
                                ['p', '指针保存的地址', 'int*'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">取地址与解引用：从变量到地址，再从地址回到值</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>&amp;</code> 是取地址，<code>*</code> 在表达式中是解引用。它们像一去一回。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int x = 10;
int *p = &x;

*p = 20;
cout << x; // 20`}</CodeBlock>
                            <StepList steps={[
                                'x 是普通变量',
                                '&x 得到 x 的地址',
                                'p 保存这个地址',
                                '*p 修改地址里的值',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">指针常见坑：没有目标就不要解引用</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                指针必须指向一个合法变量后，才能使用 <code>*p</code>。未初始化指针保存的是未知地址。
                            </p>
                        </div>
                        <Callout icon={AlertTriangle} title="危险写法" tone="amber">
                            <CodeBlock>{`int *p;
*p = 10; // 错误：p 没有指向合法变量`}</CodeBlock>
                        </Callout>
                        <Callout icon={Waypoints} title="安全写法" tone="blue">
                            <CodeBlock>{`int x = 0;
int *p = &x;
*p = 10;`}</CodeBlock>
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                指针入门阶段，请每行代码旁边写清楚它处理的是“值”还是“地址”。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写程序输出变量 x 的值和地址。</li>
                                <li>用指针 p 修改变量 x 的值。</li>
                                <li>解释 <code>int *p = &amp;x;</code> 中每个符号的含义。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习指针与数组。数组名本身就和地址密切相关。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
