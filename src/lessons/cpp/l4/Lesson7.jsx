import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Contact, Database, Search, Users } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '结构体模型' },
    { id: 2, title: '定义结构体', category: '字段组合' },
    { id: 3, title: '访问与赋值', category: '点运算符' },
    { id: 4, title: '结构体数组', category: '多对象管理' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function StructLab() {
    const [score, setScore] = useState(88);
    const student = useMemo(() => ({ name: 'Ada', age: 12, score }), [score]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Contact className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">结构体档案实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">score = {score}</label>
                    <input type="range" min="0" max="100" value={score} onChange={(event) => setScore(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    {Object.entries(student).map(([key, value]) => (
                        <div key={key} className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                            <p className="text-xs font-black uppercase text-slate-400">stu.{key}</p>
                            <p className="mt-1 text-2xl font-black text-indigo-700">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '结构体适合保存什么？',
        answer: '同一个对象的多个字段',
        reason: '例如学生的姓名、年龄、分数可以放在一个 Student 里。',
    },
    {
        question: '访问结构体字段用什么符号？',
        answer: '.',
        reason: '例如 stu.score 表示 stu 这个学生的 score 字段。',
    },
    {
        question: '多个学生应该怎么保存？',
        answer: '结构体数组',
        reason: 'Student a[100] 可以保存一组学生对象。',
    },
];

export default function CppL4Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="超级档案袋：结构体 (Struct)"
            lessonSubtitle="用多个字段描述一个完整对象"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/6"
            nextPath="/lesson/4/8"
            hero={{
                title: '结构体让数据从散装变量变成有名字的对象',
                description: '当题目里一个学生有姓名、年龄、成绩，或者一本书有标题、价格、库存时，结构体比多个数组更清楚。',
            }}
            goals={['能定义结构体类型', '能用点运算符访问字段', '能用结构体数组保存多条记录']}
            childrenBySection={{
                1: <StructLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">定义结构体：把相关字段打包</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                结构体是一种自定义数据类型。它可以把多个不同类型的字段放在一起。
                            </p>
                        </div>
                        <CodeBlock>{`struct Student {
  string name;
  int age;
  int score;
};`}</CodeBlock>
                        <CompareTable
                            headers={['字段', '类型', '含义']}
                            rows={[
                                ['name', 'string', '学生姓名'],
                                ['age', 'int', '年龄'],
                                ['score', 'int', '成绩'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">访问与赋值：用点运算符进入字段</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                创建结构体变量后，用 <code>.</code> 访问它的字段。字段可以像普通变量一样赋值和比较。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`Student stu;
stu.name = "Ada";
stu.age = 12;
stu.score = 95;

cout << stu.name << " " << stu.score;`}</CodeBlock>
                            <StepList steps={[
                                '先定义结构体类型',
                                '再创建结构体变量',
                                '用变量名加点访问字段',
                                '字段可以参与判断和计算',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">结构体数组：保存一组完整对象</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果有 n 个学生，每个学生都有多个字段，用结构体数组会比多个平行数组更稳定。
                            </p>
                        </div>
                        <CodeBlock>{`Student a[1005];
int n;
cin >> n;

for (int i = 0; i < n; i++) {
  cin >> a[i].name >> a[i].age >> a[i].score;
}`}</CodeBlock>
                        <Callout icon={Users} title="结构体数组的读法" tone="indigo">
                            <code>a[i]</code> 表示第 i 个学生，<code>a[i].score</code> 表示第 i 个学生的成绩。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习重点是给字段起清楚名字，不要把所有信息继续塞进散装变量。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>定义 <code>Book</code> 结构体，包含标题、价格、库存。</li>
                                <li>读入 n 个学生，输出成绩最高学生的姓名。</li>
                                <li>把一道“姓名 + 分数”的题改写成结构体数组版本。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入二维数组与矩阵。结构体组织一个对象，二维数组组织一张表。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
