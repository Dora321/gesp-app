import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, ClipboardCheck, Search, Waypoints } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '数组地址' },
    { id: 2, title: '数组名与首地址', category: '核心关系' },
    { id: 3, title: '指针遍历数组', category: '等价写法' },
    { id: 4, title: '数组参数再理解', category: '函数衔接' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ArrayPointerLab() {
    const [index, setIndex] = useState(0);
    const values = [6, 13, 20, 27, 34];
    const address = useMemo(() => `a + ${index}`, [index]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Boxes className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">数组地址实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="grid grid-cols-5 gap-2 rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    {values.map((value, i) => (
                        <button
                            key={value}
                            onClick={() => setIndex(i)}
                            className={`rounded-xl border p-3 font-black ${index === i ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
                        >
                            <span className="block text-xs">a[{i}]</span>
                            <span className="mt-1 block text-2xl">{value}</span>
                        </button>
                    ))}
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <p className="text-sm font-black text-slate-500">当前关系</p>
                    <p className="mt-2 font-mono text-2xl font-black text-indigo-700">*(a + {index}) = {values[index]}</p>
                    <p className="mt-3 font-mono text-sm font-black text-slate-600">{address} 等价于 &amp;a[{index}]</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '数组名 a 常常表示什么？',
        answer: '首元素地址',
        reason: '在表达式中，a 通常可以理解为 &a[0]。',
    },
    {
        question: '*(a + i) 等价于什么？',
        answer: 'a[i]',
        reason: '下标访问本质上和地址偏移有关。',
    },
    {
        question: '数组参数为什么会影响原数组？',
        answer: '传的是地址',
        reason: '函数通过地址访问原数组元素，不是复制整份数组。',
    },
];

function ArrayPointerPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'int a[3] = {10, 20, 30}; cout << *a; 输出什么？'}
                options={['a 的地址', '10']}
                correctIndex={1}
                explanation="a 是首元素地址（相当于 &a[0]），*a 解引用就是 a[0] = 10。"
                misconception="以为 *a 会输出地址，没分清 a 是地址、*a 才是值。"
            />
            <PredictCheck
                prompt={'*(a + 2) 等价于下面哪个？'}
                options={['a[3]', 'a[2]']}
                correctIndex={1}
                explanation="a + 2 从首地址向后移 2 个元素，*(a + 2) 就是 a[2]。下标 i 对应 *(a + i)。"
                misconception="把偏移量和下标错位，多算了一个。"
            />
            <PredictCheck
                prompt={'int 数组里，a + 1 的地址比 a 大多少？'}
                options={['1 个字节', '1 个 int 的大小（通常 4 字节）']}
                correctIndex={1}
                explanation="指针加法按元素类型缩放，a + 1 跳过一个完整的 int，不是 1 个字节。"
                misconception="以为 a + 1 只是把地址数值加 1。"
            />
        </div>
    );
}

const arrayPointerMasteryItems = [
    {
        label: '能解释数组名和首地址的关系。',
        evidence: 'a 通常代表 &a[0]，*a 就是 a[0]。',
        retryHint: '回到「数组名与首地址」表。',
    },
    {
        label: '能说明 a[i] 与 *(a + i) 等价。',
        evidence: 'a + i 移到第 i 个元素，*(a + i) 取它的值。',
        retryHint: '回到数组地址实验台，点不同下标看关系。',
    },
    {
        label: '能解释指针加法按元素缩放。',
        evidence: 'a + 1 跳过一个完整的 int，不是 1 个字节。',
        retryHint: '把每一格想象成一个 int 那么宽。',
    },
    {
        label: '能用地址模型解释数组参数。',
        evidence: '函数拿到首地址，改 a[i] 会影响原数组，不复制整份。',
        retryHint: '连回第 3 课「数组进函数」。',
    },
];

export default function CppL4Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="指针与数组的纠葛"
            lessonSubtitle="理解数组名、地址偏移和函数参数"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/5"
            nextPath="/lesson/4/7"
            topSupport={<CppL4LessonSupport lessonId={6} />}
            bottomSupport={<CppL4LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '数组和指针的关系，是四级理解数组参数的关键',
                description: '本课把数组名、首地址、地址偏移和 a[i] 的等价写法讲清楚，连接上一课指针和第 3 课数组进函数。',
            }}
            goals={['能解释数组名和首元素地址的关系', '能理解 a[i] 与 *(a + i) 的等价性', '能用地址模型解释数组参数']}
            prerequisites={['理解指针保存地址', '会遍历一维数组', '理解 a[i] 下标访问']}
            childrenBySection={{
                1: <ArrayPointerLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组名与首地址：a 常常代表 &amp;a[0]</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组是一串连续空间。数组名在很多表达式中会转换成第一个元素的地址。
                            </p>
                        </div>
                        <CompareTable
                            headers={['写法', '含义', '说明']}
                            rows={[
                                ['a[0]', '第一个元素的值', '普通 int'],
                                ['&a[0]', '第一个元素地址', 'int*'],
                                ['a', '通常代表首地址', '常可看成 &a[0]'],
                            ]}
                        />
                        <CodeBlock>{`int a[3] = {10, 20, 30};
cout << a[0];
cout << *a; // 也得到 10`}</CodeBlock>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">指针遍历数组：移动地址访问不同元素</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>a + i</code> 表示从首元素地址向后移动 i 个元素，<code>*(a + i)</code> 就是第 i 个元素的值。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 0; i < n; i++) {
  cout << *(a + i) << " ";
}

// 等价于
for (int i = 0; i < n; i++) {
  cout << a[i] << " ";
}`}</CodeBlock>
                            <StepList steps={[
                                'a 是首元素地址',
                                'a + i 移到第 i 个元素',
                                '*(a + i) 取出该位置的值',
                                '实际写题仍推荐 a[i]，更清楚',
                            ]} />
                        </div>
                        <ArrayPointerPredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组参数再理解：函数拿到的是访问入口</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这就是为什么数组进函数不会复制整份数据，也为什么函数里改 <code>a[i]</code> 会影响原数组。
                            </p>
                        </div>
                        <CodeBlock>{`void clearArray(int a[], int n) {
  for (int i = 0; i < n; i++) {
    a[i] = 0;
  }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="不要用地址写法炫技" tone="amber">
                            考试中优先写 <code>a[i]</code>，只有题目考查指针时再写 <code>*(a + i)</code>。清晰比花哨重要。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课目标不是把数组题全改成指针写法，而是理解数组参数为什么特殊。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：int a[4] = {10,20,30,40}; int* p = a;。*(p + 2) 是几？它等价于哪种下标写法？'}
                            hint="数组名就是首地址；p+2 指向第 2 个元素（从 0 数），*(p+2) 取它的值。"
                            answer="*(p + 2) = 30，等价于 a[2]。"
                            steps={[
                                'p = a 指向 a[0]。',
                                'p + 2 指向 a[2]（地址往后移 2 个 int）。',
                                '*(p + 2) 取出 a[2] = 30。即 a[i] 等价于 *(a + i)。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L4-6 指针与数组离开前检查"
                            description="这一课最怕“记住 a[i]=*(a+i)，但说不清偏移和缩放”。勾选前先画一张 5 格地址偏移图。"
                            items={arrayPointerMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>解释 <code>a[2]</code> 和 <code>*(a + 2)</code> 的关系。</li>
                                <li>写函数把数组所有元素加一。</li>
                                <li>手动画出长度为 5 的数组地址偏移示意。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习结构体。结构体解决的是“一个对象有多个字段”的组织问题。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
