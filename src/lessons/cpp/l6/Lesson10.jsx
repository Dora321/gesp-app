import React, { useMemo, useState } from 'react';
import { ClipboardCheck, PackageCheck, Search, Users } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '对象建模' },
    { id: 2, title: '项目拆分', category: '类职责' },
    { id: 3, title: '接口设计', category: 'public 方法' },
    { id: 4, title: '综合代码', category: '继承与多态' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const projectModels = {
    图书馆: ['Book', 'Reader', 'Library'],
    成绩系统: ['Student', 'Course', 'GradeBook'],
    图形计算: ['Shape', 'Circle', 'Rectangle'],
};

function OopProjectLab() {
    const [project, setProject] = useState('图形计算');
    const classes = useMemo(() => projectModels[project], [project]);

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <PackageCheck className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">OOP 建模面板</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <label className="block text-sm font-black text-slate-700">项目场景</label>
                    <select value={project} onChange={(event) => setProject(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        {Object.keys(projectModels).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        OOP 综合题先找名词，再把名词变成类；再找动作，把动作变成成员函数。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <div className="text-sm font-black text-slate-500">候选类</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {classes.map((item) => (
                            <span key={item} className="rounded-lg bg-emerald-100 px-4 py-3 font-mono text-sm font-black text-emerald-800">
                                {item}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">下一步：为每个类写数据、行为和关系。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'OOP 建模先找什么？',
        answer: '名词和动作',
        reason: '名词通常变成类或对象，动作通常变成成员函数。',
    },
    {
        question: 'public 接口应该怎样设计？',
        answer: '少而清晰',
        reason: '外部只需要知道怎么用，不需要知道内部怎么存。',
    },
    {
        question: '多态适合什么场景？',
        answer: '同接口不同实现',
        reason: '例如不同图形都有 area()，但计算公式不同。',
    },
];

function OopPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'基类 Shape 的 area() 忘了写 virtual。执行 Shape* p = new Circle(3); p->area(); 调用的是谁的 area？'}
                options={['Circle 的（继承自动多态）', 'Shape 的（按指针类型静态绑定）']}
                correctIndex={1}
                explanation="没有 virtual 就没有动态绑定：编译器按指针的静态类型 Shape 决定调用哪个函数。多态三件套一个都不能少：virtual + override + 通过指针/引用调用。"
                misconception="以为写了继承就自动获得多态。"
            />
            <PredictCheck
                prompt={'把容器声明成 vector<Shape>（存对象而不是指针），再放入 Circle，会发生什么？'}
                options={['正常，遍历时还是多态调用', '对象切片：Circle 被截成 Shape，派生部分全部丢失']}
                correctIndex={1}
                explanation="按值存基类时发生 object slicing——只有基类那部分被拷贝进容器，虚函数也退化成基类版本。要多态就必须存 Shape*（或智能指针/引用）。"
                misconception="把值语义和指针语义混为一谈。"
            />
            <PredictCheck
                prompt={'基类析构函数没写 virtual，通过 Shape* 指针 delete 一个 Circle，会怎样？'}
                options={['自动先调 Circle 的析构再调 Shape 的', '行为未定义，常见表现是 Circle 的析构不执行、资源泄漏']}
                correctIndex={1}
                explanation="通过基类指针 delete 派生对象时，析构必须是 virtual 的，否则是未定义行为。所以示例里写了 virtual ~Shape() {}——这一行不是装饰。"
                misconception="以为 delete 总能自动完成完整清理。"
            />
        </div>
    );
}

const oopMasteryItems = [
    {
        label: '能用“名词→类、动作→方法”从题面建模。',
        evidence: '拿图书馆场景能列出 Book/Reader/Library 和各自的方法。',
        retryHint: '回到 OOP 建模面板切换三个场景练一遍。',
    },
    {
        label: '记住多态三件套。',
        evidence: 'virtual 声明 + 派生类 override + 通过指针或引用调用，缺一不可。',
        retryHint: '重做“忘写 virtual”预测题。',
    },
    {
        label: '知道虚析构和对象切片这两个坑。',
        evidence: '能解释 virtual ~Shape() 的作用和 vector<Shape> 为什么错。',
        retryHint: '重做后两道预测题。',
    },
    {
        label: '主流程只依赖基类接口。',
        evidence: '新增一种图形时，遍历统计的循环一行都不用改。',
        retryHint: '完成迁移练习的 Triangle 扩展。',
    },
];

export default function CppL6Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="OOP 综合实战"
            lessonSubtitle="从题面到类图再到代码"
            accent="emerald"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/9"
            nextPath="/lesson/6/11"
            topSupport={<CppL6LessonSupport lessonId={10} />}
            bottomSupport={<CppL6LessonSupport lessonId={10} placement="bottom" />}
            hero={{
                title: 'OOP 综合题不是炫语法，而是把对象关系整理清楚',
                description: '本课用图形面积项目串联封装、构造、继承、多态和接口设计。',
            }}
            goals={['能从题面抽取类和对象', '能为类设计成员变量和 public 接口', '能在小项目中使用继承和多态']}
            childrenBySection={{
                1: <OopProjectLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">项目拆分：先找类的职责边界</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                一个类只负责一类事情。职责越乱，代码越难测试，也越容易出现互相修改数据的问题。
                            </p>
                        </div>
                        <CompareTable
                            headers={['类', '负责什么', '不负责什么']}
                            rows={[
                                ['Shape', '定义共同接口 area()', '不关心具体公式'],
                                ['Circle', '保存半径并计算圆面积', '不管理其他图形'],
                                ['Canvas', '保存多个图形并输出统计', '不直接改图形内部数据'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">接口设计：外部通过 public 方法使用对象</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                好接口应该像按钮：名字清楚、参数少、行为稳定。不要把内部数据全部公开出去。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`class Shape {
public:
  virtual double area() = 0;
  virtual string name() = 0;
  virtual ~Shape() {}
};

class Rectangle : public Shape {
private:
  double width, height;

public:
  Rectangle(double w, double h) : width(w), height(h) {}
  double area() override { return width * height; }
  string name() override { return "Rectangle"; }
};`}</CodeBlock>
                            <StepList steps={[
                                '抽象出共同接口',
                                '把成员变量设为 private',
                                '构造函数保证初始状态合法',
                                '派生类 override 具体行为',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">综合代码：用基类指针统一处理不同图形</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                多态的价值在这里出现：主流程不需要知道每个图形的具体公式，只调用共同接口。
                            </p>
                        </div>
                        <CodeBlock>{`vector<Shape*> shapes;
shapes.push_back(new Circle(3));
shapes.push_back(new Rectangle(4, 5));

for (Shape* item : shapes) {
  cout << item->name() << ": " << item->area() << endl;
}

for (Shape* item : shapes) {
  delete item;
}`}</CodeBlock>
                        <CodeBlock>{`运行输出：
Circle: 28.2743
Rectangle: 20`}</CodeBlock>
                        <Callout icon={Users} title="项目口令" tone="emerald">
                            类负责状态，接口负责使用，继承负责复用，多态负责统一调用。
                        </Callout>
                        <OopPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                OOP 综合作业先交类图，再交代码。类图清楚，代码通常不会太乱。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：给图形项目新增 Triangle（底 b、高 h）。写出类声明的要点，并说明主流程的遍历循环要改哪几行。'}
                            hint="照着 Rectangle 的模板：继承、private 成员、构造函数、override 两个接口。"
                            answer={'Triangle : public Shape，private 存 b 和 h，构造函数初始化，override area() 返回 b * h / 2、name() 返回 "Triangle"。主流程只需多一行 push_back(new Triangle(6, 4))，遍历循环一行都不用改——这正是多态的价值。'}
                            steps={[
                                'class Triangle : public Shape，成员 double b, h 设为 private。',
                                '构造函数 Triangle(double b, double h) 初始化成员。',
                                'override：area() 返回 b * h / 2，name() 返回 "Triangle"。',
                                '主流程只加 shapes.push_back(new Triangle(6, 4));，统计循环零改动。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-10 OOP 综合离开前检查"
                            description="OOP 综合题的分丢在细节：virtual、切片、虚析构。勾选前先把三道预测题的错误各复述一遍。"
                            items={oopMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成 Shape/Circle/Rectangle 的面积统计程序。</li>
                                <li>为图书馆系统设计 Book、Reader、Library 三个类。</li>
                                <li>给每个类写一句职责说明。</li>
                                <li>挑战：故意删掉 area() 的 virtual 再运行，观察输出变化并解释原因。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课回到算法：动态规划同样讲究“建模”，只是建的是状态和转移。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
