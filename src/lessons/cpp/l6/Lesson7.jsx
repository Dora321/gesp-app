import React, { useMemo, useState } from 'react';
import { ClipboardCheck, GitBranch, Search, Users } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '复用代码' },
    { id: 2, title: '继承关系', category: 'is-a' },
    { id: 3, title: 'protected', category: '给子类用' },
    { id: 4, title: '构造顺序', category: '先父后子' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const animals = {
    Animal: ['name', 'age'],
    Cat: ['name', 'age', 'climb()'],
    Dog: ['name', 'age', 'guard()'],
    Bird: ['name', 'age', 'fly()'],
};

function InheritanceLab() {
    const [type, setType] = useState('Cat');
    const items = useMemo(() => animals[type], [type]);

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitBranch className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">继承关系观察台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <label className="block text-sm font-black text-slate-700">派生类</label>
                    <select value={type} onChange={(event) => setType(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        <option>Cat</option>
                        <option>Dog</option>
                        <option>Bird</option>
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        子类会继承父类的公共能力，再添加自己的特殊能力。继承表达的是“某某是一种某某”。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <div className="text-sm font-black text-slate-500">{type} 拥有的成员</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {items.map((item) => (
                            <span key={item} className="rounded-lg bg-emerald-100 px-3 py-2 font-mono text-sm font-black text-emerald-800">
                                {item}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">name 和 age 来自 Animal，特殊行为来自 {type}。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '继承表达什么关系？',
        answer: 'is-a',
        reason: 'Cat 是一种 Animal，Student 是一种 Person。',
    },
    {
        question: 'protected 给谁访问？',
        answer: '类内部和子类',
        reason: '外部不能直接访问，但派生类可以使用。',
    },
    {
        question: '构造函数调用顺序是什么？',
        answer: '先父类，后子类',
        reason: '子类对象要先拥有父类部分，才能初始化自己的部分。',
    },
];

function InheritancePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'「汽车有一个引擎（Car has Engine）」，适合让 Car 继承 Engine 吗？'}
                options={['适合', '不适合，这是 has-a 组合关系']}
                correctIndex={1}
                explanation="继承表达 is-a（是一种），如 Cat 是 Animal。Car 有 Engine 是 has-a，应该用组合：在 Car 里放一个 Engine 成员。"
                misconception="把「有一个」的组合关系也用继承来表达。"
            />
            <PredictCheck
                prompt={'父类成员放在 private 里，子类能直接使用它吗？'}
                options={['能', '不能，要放 protected 子类才能直接访问']}
                correctIndex={1}
                explanation="private 成员连子类都不能直接访问。希望子类能用、又不对外公开，就放 protected。"
                misconception="以为子类能访问父类的所有成员（包括 private）。"
            />
            <PredictCheck
                prompt={'创建子类 Student 对象时，父类和子类构造函数谁先执行？'}
                options={['子类先', '父类先（先有父类部分才能初始化子类）']}
                correctIndex={1}
                explanation="先调用父类构造函数建好父类部分，再执行子类构造函数。销毁时通常相反，先子后父。"
                misconception="以为先初始化子类自己的部分，再补父类。"
            />
        </div>
    );
}

const inheritanceMasteryItems = [
    {
        label: '能判断 is-a 关系适不适合继承。',
        evidence: 'is-a 用继承，has-a 用组合（成员对象）。',
        retryHint: '回到继承关系表。',
    },
    {
        label: '能写出父类和派生类。',
        evidence: 'class Cat : public Animal，子类再加自己的行为。',
        retryHint: '回到 protected 小节。',
    },
    {
        label: '能区分 public / protected / private。',
        evidence: 'private 仅类内、protected 加子类可用、public 对外。',
        retryHint: 'protected 给子类用、外部看不到。',
    },
    {
        label: '能说清父子类构造顺序。',
        evidence: '先父后子，初始化列表给父类传参数。',
        retryHint: '回到「继承口令」。',
    },
];

export default function CppL6Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="家族传承 (继承/保护)"
            lessonSubtitle="把共同特征抽到父类"
            accent="emerald"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/6"
            nextPath="/lesson/6/8"
            topSupport={<CppL6LessonSupport lessonId={7} />}
            bottomSupport={<CppL6LessonSupport lessonId={7} placement="bottom" />}
            hero={{
                title: '继承解决的是重复：相同部分放父类，差异部分留给子类',
                description: '本课用动物家族模型理解 public 继承、protected 成员和父子类构造顺序。',
            }}
            goals={['能判断适合继承的 is-a 关系', '能写出简单父类和派生类', '能解释 public、protected、private 的区别']}
            prerequisites={['理解类的封装和构造', '理解 public / private 访问控制', '会写带构造函数的类']}
            childrenBySection={{
                1: <InheritanceLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">继承关系：先确认“子类是不是一种父类”</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                不要为了少写代码乱用继承。继承适合表达稳定的分类关系，而不是临时拼装功能。
                            </p>
                        </div>
                        <CompareTable
                            headers={['关系', '适合继承吗', '原因']}
                            rows={[
                                ['Cat 是 Animal', '适合', '猫是一种动物'],
                                ['Car 有 Engine', '不适合', '这是 has-a 组合关系'],
                                ['Student 是 Person', '适合', '学生是一种人'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">protected：外部看不到，子类能使用</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                父类不想把数据完全公开，但又希望子类能继承和使用，就可以放到 <code>protected</code>。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`class Animal {
protected:
  string name;

public:
  Animal(string n) {
    name = n;
  }
};

class Cat : public Animal {
public:
  Cat(string n) : Animal(n) {}

  void speak() {
    cout << name << " says meow" << endl;
  }
};`}</CodeBlock>
                            <StepList steps={[
                                '父类保存共同成员',
                                'protected 允许子类访问',
                                '子类用 public 继承父类',
                                '子类添加自己的行为',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">构造顺序：父类部分先初始化</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                创建子类对象时，会先调用父类构造函数，再调用子类构造函数。初始化列表常用来给父类传参数。
                            </p>
                        </div>
                        <CodeBlock>{`class Student : public Person {
private:
  int score;

public:
  Student(string name, int s) : Person(name) {
    score = s;
  }
};`}</CodeBlock>
                        <Callout icon={Users} title="继承口令" tone="emerald">
                            公共特征上移，特殊行为下放；构造时先父后子，销毁时通常先子后父。
                        </Callout>
                        <InheritancePredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                继承作业要先画类图，再写代码。别让类之间的关系藏在脑子里。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：class Animal{ public: void eat(){} }; class Cat: public Animal{ public: void meow(){} };。Cat 对象能调用哪些方法？为什么？'}
                            hint="公有继承下，子类继承父类的公有成员，还能加自己的。"
                            answer={'Cat 对象能调用 eat() 和 meow()。'}
                            steps={[
                                'Cat 公有继承 Animal，继承了它的公有方法 eat()。',
                                'Cat 自己又定义了 meow()。',
                                '所以 Cat 对象既能 eat() 又能 meow()。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-7 继承与保护离开前检查"
                            description="继承最怕“把 has-a 也写成继承、以为子类能用父类 private”。勾选前先判断 5 组关系是继承还是组合。"
                            items={inheritanceMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写 Person 和 Student 两个类，Student 继承 Person。</li>
                                <li>用 protected 保存姓名，并让子类输出介绍。</li>
                                <li>判断 5 组关系是继承还是组合。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习多态：同一个父类接口，根据真实子类执行不同版本的函数。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
