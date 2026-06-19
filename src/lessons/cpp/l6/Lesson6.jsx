import React, { useMemo, useState } from 'react';
import { Boxes, ClipboardCheck, Search, ShieldCheck } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '封装' },
    { id: 2, title: '类与对象', category: '蓝图和实例' },
    { id: 3, title: '构造函数', category: '初始化' },
    { id: 4, title: '访问控制', category: 'public/private' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const fields = {
    Student: ['name', 'score', 'level'],
    Point: ['x', 'y'],
    Timer: ['minute', 'second'],
};

function ClassLab() {
    const [className, setClassName] = useState('Student');
    const props = useMemo(() => fields[className], [className]);

    return (
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Boxes className="text-teal-700" />
                <h3 className="text-xl font-black text-slate-950">类蓝图生成器</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <label className="block text-sm font-black text-slate-700">选择类名</label>
                    <select value={className} onChange={(event) => setClassName(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        {Object.keys(fields).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        类像一张蓝图，对象是按蓝图造出来的具体实例。成员变量保存状态，成员函数定义行为。
                    </p>
                </div>
                <div className="rounded-xl bg-slate-950 p-5 ring-1 ring-teal-100">
                    <div className="font-mono text-sm leading-7 text-slate-100">
                        <div><span className="text-violet-300">class</span> <span className="text-yellow-200">{className}</span> {'{'}</div>
                        <div className="pl-4 text-rose-300">private:</div>
                        {props.map((prop) => <div key={prop} className="pl-8"><span className="text-sky-300">int</span> {prop};</div>)}
                        <div className="pl-4 text-rose-300">public:</div>
                        <div className="pl-8">{className}();</div>
                        <div className="pl-8"><span className="text-sky-300">void</span> print();</div>
                        <div>{'};'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '类和对象的关系是什么？',
        answer: '蓝图和实例',
        reason: '类定义结构和行为，对象是实际创建出来的变量。',
    },
    {
        question: '构造函数什么时候执行？',
        answer: '创建对象时',
        reason: '它负责给对象建立初始状态。',
    },
    {
        question: 'private 的主要作用是什么？',
        answer: '隐藏内部数据',
        reason: '外部只能通过公开接口修改，减少误操作。',
    },
];

export default function CppL6Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="类的蓝图 (封装/构造)"
            lessonSubtitle="把数据和操作放在一起"
            accent="teal"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/5"
            nextPath="/lesson/6/7"
            hero={{
                title: '类不是更复杂的 struct，而是给数据配上受控的行为',
                description: '本课从蓝图、对象、成员变量、成员函数、构造函数和访问控制建立 OOP 基础。',
            }}
            goals={['能区分类和对象', '能写出带构造函数的简单类', '能说明 public 和 private 的区别']}
            childrenBySection={{
                1: <ClassLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">类与对象：类负责定义，对象负责使用</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果很多变量总是一起出现，而且有固定操作，就可以把它们封装成一个类。
                            </p>
                        </div>
                        <CompareTable
                            headers={['概念', '作用', '例子']}
                            rows={[
                                ['类 class', '定义蓝图', 'Student'],
                                ['对象 object', '具体实例', 'Student a'],
                                ['成员变量', '保存状态', 'score'],
                                ['成员函数', '操作数据', 'print()'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">构造函数：让对象一出生就是合法状态</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                构造函数和类同名，没有返回值。它常用来初始化成员变量。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`class Student {
private:
  string name;
  int score;

public:
  Student(string n, int s) {
    name = n;
    score = s;
  }

  void print() {
    cout << name << " " << score << endl;
  }
};`}</CodeBlock>
                            <StepList steps={[
                                '写 class 和类名',
                                '把内部数据放进 private',
                                '用构造函数初始化数据',
                                '通过 public 函数提供操作',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">访问控制：公开接口，隐藏细节</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>private</code> 不是为了麻烦，而是为了不让外部随便破坏对象状态。
                            </p>
                        </div>
                        <CodeBlock>{`class Counter {
private:
  int value;

public:
  Counter() { value = 0; }
  void add() { value++; }
  int getValue() { return value; }
};`}</CodeBlock>
                        <Callout icon={ShieldCheck} title="封装口令" tone="teal">
                            数据默认 private，外部需要什么操作，就提供清晰的 public 函数。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                写类时先用一句话说明“这个类代表什么对象”，再列成员变量和行为。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写一个 Point 类，保存 x、y 并输出坐标。</li>
                                <li>写一个 Counter 类，支持 add、reset、getValue。</li>
                                <li>说明为什么不建议把所有成员变量都设为 public。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习继承：当多个类有共同特征时，把公共部分抽到父类里。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
