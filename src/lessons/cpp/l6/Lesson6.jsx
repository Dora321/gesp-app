import React, { useMemo, useState } from 'react';
import { Boxes, ClipboardCheck, Search, ShieldCheck } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

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

function ClassPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'构造函数前面写了返回类型 void Student()，还算构造函数吗？'}
                options={['是', '不是，构造函数没有返回类型']}
                correctIndex={1}
                explanation="构造函数和类同名、且没有返回类型。写了 void 它就变成一个普通成员函数，不会在创建对象时自动调用。"
                misconception="给构造函数加了返回类型，没意识到它就不再是构造函数。"
            />
            <PredictCheck
                prompt={'成员变量在 private 里，外部 main 写 a.score = 90 直接改，可以吗？'}
                options={['可以', '不行，private 外部不能直接访问']}
                correctIndex={1}
                explanation="private 成员只能在类内部访问。外部要改得通过 public 函数（如 setScore）。这正是封装的意义。"
                misconception="以为对象所有成员都能像 struct 一样随便点出来改。"
            />
            <PredictCheck
                prompt={'class 和 struct 定义成员，默认访问权限一样吗？'}
                options={['一样', '不一样：class 默认 private，struct 默认 public']}
                correctIndex={1}
                explanation="class 的成员默认是 private，struct 默认是 public。这是两者唯一的本质区别。"
                misconception="以为 class 和 struct 完全等价。"
            />
        </div>
    );
}

const classMasteryItems = [
    {
        label: '能区分类和对象。',
        evidence: '类是蓝图（定义），对象是按蓝图造出的具体实例。',
        retryHint: '回到类与对象表。',
    },
    {
        label: '能写出带构造函数的简单类。',
        evidence: '构造函数与类同名、无返回类型，创建对象时自动调用。',
        retryHint: '别给构造函数加返回类型。',
    },
    {
        label: '能用 private / public 做封装。',
        evidence: '数据放 private，操作通过 public 函数对外提供。',
        retryHint: '回到「封装口令」。',
    },
    {
        label: '能说清 class 与 struct 的区别。',
        evidence: 'class 默认 private、struct 默认 public。',
        retryHint: '想一想两者默认的访问权限。',
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
            topSupport={<CppL6LessonSupport lessonId={6} />}
            bottomSupport={<CppL6LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '类不是更复杂的 struct，而是给数据配上受控的行为',
                description: '本课从蓝图、对象、成员变量、成员函数、构造函数和访问控制建立 OOP 基础。',
            }}
            goals={['能区分类和对象', '能写出带构造函数的简单类', '能说明 public 和 private 的区别']}
            prerequisites={['会用结构体组织多个字段', '会定义和调用函数', '理解变量的作用范围']}
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
                        <ClassPredictionChecks />
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
                        <MasteryCheck
                            title="C++ L6-6 类与封装离开前检查"
                            description="OOP 入门最怕“构造函数加了返回类型、private 还想从外面直接改”。勾选前先自己写一个最小 Counter 类验证。"
                            items={classMasteryItems}
                        />
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
