import React, { useMemo, useState } from 'react';
import { ClipboardCheck, MousePointer2, Search, Sparkles } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '同名不同形' },
    { id: 2, title: '虚函数', category: 'virtual' },
    { id: 3, title: '基类指针', category: '动态绑定' },
    { id: 4, title: '常见坑', category: '析构与 override' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const shapes = {
    Circle: { code: '3.14 * r * r', area: '28.26' },
    Rectangle: { code: 'w * h', area: '24' },
    Triangle: { code: 'base * h / 2', area: '15' },
};

function PolymorphismLab() {
    const [shape, setShape] = useState('Circle');
    const current = useMemo(() => shapes[shape], [shape]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Sparkles className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">多态调用观察台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">真实对象类型</label>
                    <select value={shape} onChange={(event) => setShape(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        {Object.keys(shapes).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        调用同一个 <code>area()</code> 接口，真实对象不同，执行的函数版本也不同。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <div className="text-sm font-black text-slate-500">Shape* p 指向 {shape}</div>
                    <div className="mt-4 rounded-lg bg-rose-100 px-4 py-3 font-mono text-sm font-black text-rose-800">
                        p-&gt;area() = {current.area}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">实际公式：{current.code}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '多态依赖哪个关键字？',
        answer: 'virtual',
        reason: '基类函数声明为 virtual，才能通过基类指针动态绑定。',
    },
    {
        question: 'override 的作用是什么？',
        answer: '确认重写成功',
        reason: '函数签名写错时，编译器会帮你报错。',
    },
    {
        question: '基类析构函数为什么常写 virtual？',
        answer: '正确释放子类对象',
        reason: '通过基类指针 delete 派生类对象时需要虚析构。',
    },
];

export default function CppL6Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="千变万化 (多态/虚函数)"
            lessonSubtitle="同一个接口，不同对象有不同表现"
            accent="rose"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/7"
            nextPath="/lesson/6/9"
            hero={{
                title: '多态让代码面向接口工作：不问你是谁，只调用共同能力',
                description: '本课用图形面积模型讲清 virtual、override、基类指针和虚析构的使用场景。',
            }}
            goals={['能解释虚函数和动态绑定', '能用基类指针调用派生类函数', '能说明 override 和虚析构的价值']}
            childrenBySection={{
                1: <PolymorphismLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">虚函数：把“运行时再决定调用谁”写进接口</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                没有 <code>virtual</code> 时，基类指针通常按基类类型调用；加上 virtual 后，会根据真实对象类型调用。
                            </p>
                        </div>
                        <CompareTable
                            headers={['写法', '含义', '风险']}
                            rows={[
                                ['普通函数', '编译期按类型决定', '基类指针可能调用基类版本'],
                                ['virtual 函数', '运行期按真实对象决定', '需要理解动态绑定'],
                                ['override', '明确重写父类虚函数', '少写会降低检查能力'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">基类指针：统一管理不同子类对象</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                多态常见写法是用基类指针或引用保存不同派生类对象，再调用共同接口。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`class Shape {
public:
  virtual double area() {
    return 0;
  }
};

class Circle : public Shape {
private:
  double r;
public:
  Circle(double radius) : r(radius) {}
  double area() override {
    return 3.14 * r * r;
  }
};

Shape* p = new Circle(3);
cout << p->area() << endl;`}</CodeBlock>
                            <StepList steps={[
                                '父类声明 virtual 接口',
                                '子类用 override 重写',
                                '基类指针指向子类对象',
                                '调用时执行真实对象版本',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">常见坑：函数签名、对象切片和虚析构</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                多态必须通过指针或引用才能体现。把子类对象直接赋值给父类对象，可能发生对象切片。
                            </p>
                        </div>
                        <CodeBlock>{`class Base {
public:
  virtual void speak() {}
  virtual ~Base() {}
};

class Derived : public Base {
public:
  void speak() override {}
};`}</CodeBlock>
                        <Callout icon={MousePointer2} title="多态口令" tone="rose">
                            父类接口写 virtual，子类重写写 override，通过指针或引用调用，基类析构函数也写 virtual。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                多态作业要故意写两个派生类，才能看出“同一接口，不同表现”。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写 Shape、Circle、Rectangle，并通过 Shape* 调用 area。</li>
                                <li>去掉 virtual 观察输出变化，并解释原因。</li>
                                <li>整理 virtual、override、virtual destructor 三个关键点。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习格雷码，把递归、位运算和编码规律连接起来。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
