import React, { useState } from 'react';
import { AlertTriangle, GitFork, Table2, Trash2 } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '一个指针，多种行为' },
    { id: 2, title: 'virtual 的作用', category: '加与不加的对照' },
    { id: 3, title: '虚函数表', category: '多态怎么实现的' },
    { id: 4, title: '虚析构函数', category: '不写会泄漏' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 两种情形的实际输出。这不是示意——是把「加 virtual / 不加 virtual」
// 两份代码各跑一遍的真实结果，差别全在这里。
const SCENARIOS = {
    withVirtual: {
        label: '基类函数加了 virtual',
        code: `class Shape {
public:
    virtual void draw() { cout << "画一个形状" << endl; }
    virtual ~Shape() { cout << "~Shape" << endl; }
};
class Circle : public Shape {
public:
    void draw() override { cout << "画一个圆" << endl; }
    ~Circle() { cout << "~Circle" << endl; }
};

Shape* p = new Circle();
p->draw();
delete p;`,
        output: ['画一个圆', '~Circle', '~Shape'],
        verdict: 'ok',
        note: 'draw 走虚表分派到 Circle::draw——这就是多态。delete 时先跑 ~Circle 再跑 ~Shape，派生类的资源被正确释放。',
    },
    withoutVirtual: {
        label: '基类函数没加 virtual',
        code: `class Shape {
public:
    void draw() { cout << "画一个形状" << endl; }   // 没有 virtual
    ~Shape() { cout << "~Shape" << endl; }         // 也没有 virtual
};
class Circle : public Shape {
public:
    void draw() { cout << "画一个圆" << endl; }     // 这叫「隐藏」，不是覆盖
    ~Circle() { cout << "~Circle" << endl; }
};

Shape* p = new Circle();
p->draw();
delete p;`,
        output: ['画一个形状', '~Shape'],
        verdict: 'bad',
        note: 'draw 按指针的静态类型（Shape*）直接调用 Shape::draw，派生类的实现被完全忽略。delete 时只跑 ~Shape，~Circle 从未执行——Circle 里申请的资源全部泄漏。',
    },
};

function VirtualLab() {
    const [mode, setMode] = useState('withVirtual');
    const scenario = SCENARIOS[mode];

    return (
        <div className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitFork className="text-fuchsia-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">加不加 virtual，输出完全不同</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                同样的 <code className="font-mono font-bold">Shape* p = new Circle();</code>，
                基类函数有没有 <code className="font-mono font-bold">virtual</code>，
                决定了调到谁、以及析构时漏不漏。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {Object.entries(SCENARIOS).map(([key, item]) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={mode === key}
                        onClick={() => setMode(key)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${mode === key
                            ? 'bg-fuchsia-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-fuchsia-200 hover:bg-fuchsia-100'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-100" tabIndex={0}>
                    <code>{scenario.code}</code>
                </pre>

                <div className="space-y-4">
                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">程序输出</div>
                        <div className="mt-2 space-y-1 font-mono text-sm">
                            {scenario.output.map((line) => (
                                <div key={line} className="text-emerald-300">{line}</div>
                            ))}
                        </div>
                        {scenario.verdict === 'bad' && (
                            <div className="mt-3 border-t border-slate-700 pt-3 font-mono text-sm text-rose-400">
                                ~Circle 从未出现 ← 资源泄漏
                            </div>
                        )}
                    </div>

                    <div className={`rounded-xl p-5 ring-1 ${scenario.verdict === 'ok'
                        ? 'bg-emerald-50 ring-emerald-200'
                        : 'bg-rose-50 ring-rose-200'}`}>
                        <div className={`text-xs font-black ${scenario.verdict === 'ok' ? 'text-emerald-800' : 'text-rose-800'}`}>
                            {scenario.verdict === 'ok' ? '正确' : '有缺陷'}
                        </div>
                        <p className={`mt-2 text-sm font-semibold leading-6 ${scenario.verdict === 'ok' ? 'text-emerald-900' : 'text-rose-900'}`}>
                            {scenario.note}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson12() {
    return (
        <CppLessonShell
            lessonNumber={12}
            lessonTitle="继承、虚函数与多态"
            lessonSubtitle="基类指针指向派生对象时，到底调用了谁"
            accent="fuchsia"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/11"
            nextPath="/lesson/7/13"
            prerequisites={['完成上一课的类与构造析构', '会用指针指向对象', '知道函数重载的概念']}
            topSupport={<CppL7LessonSupport lessonId={12} />}
            bottomSupport={<CppL7LessonSupport lessonId={12} placement="bottom" />}
            hero={{
                title: 'virtual 一个关键字的分量',
                description: '本课讲多态的实现机制、覆盖与隐藏的区别，以及虚析构函数为什么不写就会泄漏。',
            }}
            goals={['能通过基类指针实现多态', '能说明虚函数表的作用', '能判断何时需要虚析构函数']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={GitFork} title="多态想解决什么" tone="blue">
                            假设要画一堆形状：圆、矩形、三角形。没有多态时，你得写
                            <code className="font-mono">if (type == CIRCLE) drawCircle(); else if (...)</code>，
                            每加一种形状就要改这个 if 链。
                            <br /><br />
                            有了多态，写成 <code className="font-mono font-bold">shapes[i]-&gt;draw()</code> 就够了——
                            <strong>同一句调用，根据对象的实际类型自动跑对应的实现</strong>。
                            加新形状不用改这行代码。
                        </Callout>
                        <CodeBlock>{`class Shape {
public:
    virtual void draw() { cout << "形状" << endl; }
    virtual ~Shape() {}                 // 基类析构必须是虚的，见第 4 节
};

class Circle : public Shape {
public:
    void draw() override { cout << "圆" << endl; }
};

class Rectangle : public Shape {
public:
    void draw() override { cout << "矩形" << endl; }
};

// 统一用基类指针管理，一句调用应对所有派生类
vector<Shape*> shapes = { new Circle(), new Rectangle() };
for (Shape* s : shapes) s->draw();      // 输出：圆 矩形
for (Shape* s : shapes) delete s;       // 靠虚析构正确释放`}</CodeBlock>
                        <Callout icon={Table2} title="多态成立的三个条件" tone="amber">
                            ① 有<strong>继承</strong>关系；
                            ② 基类的函数声明为 <strong>virtual</strong>；
                            ③ 通过基类的<strong>指针或引用</strong>调用。
                            <br /><br />
                            三个缺一个都不行。特别是第三条：如果用的是对象本身而不是指针/引用
                            （<code className="font-mono">Shape s = circle;</code>），
                            会发生「对象切片」——派生部分被直接砍掉，多态无从谈起。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <VirtualLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">覆盖（override）与隐藏（hiding）</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            派生类里写了一个同名函数，到底是「覆盖」还是「隐藏」，取决于基类有没有 virtual。
                            两者的表现完全不同：
                        </p>
                        <CompareTable
                            headers={['情形', '术语', '基类指针调用时跑谁']}
                            rows={[
                                ['基类有 virtual，签名完全相同', '覆盖 override', '派生类的版本（多态生效）'],
                                ['基类无 virtual，名字相同', '隐藏 hiding', '基类的版本（按指针类型静态决定）'],
                                ['基类有 virtual，但参数列表不同', '隐藏，不是覆盖', '基类的版本（这是个典型 bug）'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="第三种情形最坑：以为覆盖了，其实没有" tone="rose">
                            <CodeBlock>{`class Base {
public:
    virtual void f(int x) { cout << "Base::f" << endl; }
};
class Derived : public Base {
public:
    void f(double x) { cout << "Derived::f" << endl; }   // 参数是 double！
};
Base* p = new Derived();
p->f(1);        // 输出 Base::f —— 签名不同，压根没覆盖成功`}</CodeBlock>
                            参数类型差一点（int vs double）、少写一个 const、返回类型不兼容——
                            都会让「覆盖」悄悄退化成「隐藏」，而且<strong>编译器不报错</strong>。
                        </Callout>
                        <Callout icon={Table2} title="override 关键字就是为这个而生" tone="blue">
                            在派生类的函数后面加 <code className="font-mono font-bold">override</code>，
                            就是告诉编译器「我打算覆盖基类的虚函数」。
                            如果实际上<strong>没有匹配的基类虚函数</strong>，
                            编译器会<strong>直接报错</strong>，而不是默默变成隐藏。
                            <br /><br />
                            上面那段加上 override 后：<code className="font-mono">void f(double x) override</code>
                            会立刻编译失败，提示「没有找到可覆盖的虚函数」——bug 在编译期就被抓住了。
                            <strong>凡是打算覆盖的函数，都加上 override。</strong>
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="基类 Shape 的 draw() 没有加 virtual，派生类 Circle 也定义了 draw()。执行 Shape* p = new Circle(); p->draw(); 输出什么？"
                            options={['画一个圆', '画一个形状', '两句都输出', '编译错误']}
                            correctIndex={1}
                            explanation="没有 virtual 时，调用哪个函数在编译期就按指针的静态类型（Shape*）定下来了，运行时不再查看对象的实际类型。所以调用的是 Shape::draw()，输出「画一个形状」。Circle::draw 只是隐藏了基类版本，通过 Circle* 或 Circle 对象调用时才会跑到它。"
                            misconception="容易凭「对象实际是 Circle」推断会调 Circle::draw。但没有 virtual 就没有运行时分派，编译器只看指针的声明类型。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">虚函数表（vtable）</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            多态不是魔法。编译器给每个<strong>含虚函数的类</strong>生成一张表，
                            表里存着「这个类的各个虚函数分别在哪」；
                            再给每个<strong>对象</strong>塞一个隐藏指针，指向它所属类的那张表。
                        </p>
                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 bg-white p-5">
                                <h4 className="font-black text-slate-900">Shape 的虚表</h4>
                                <ul className="mt-3 space-y-2 font-mono text-sm">
                                    <li className="rounded bg-slate-100 px-3 py-1.5 text-slate-700">draw → Shape::draw</li>
                                    <li className="rounded bg-slate-100 px-3 py-1.5 text-slate-700">~Shape → Shape::~Shape</li>
                                </ul>
                            </div>
                            <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-5">
                                <h4 className="font-black text-fuchsia-900">Circle 的虚表</h4>
                                <ul className="mt-3 space-y-2 font-mono text-sm">
                                    <li className="rounded bg-fuchsia-200 px-3 py-1.5 font-bold text-fuchsia-900">draw → Circle::draw</li>
                                    <li className="rounded bg-fuchsia-200 px-3 py-1.5 font-bold text-fuchsia-900">~Circle → Circle::~Circle</li>
                                </ul>
                                <p className="mt-3 text-xs font-bold text-fuchsia-800">
                                    覆盖过的槽位被换成了自己的实现
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            于是 <code className="font-mono font-bold">p-&gt;draw()</code> 的实际过程是：
                            顺着 p 找到对象里的虚表指针 → 在虚表里找 draw 这一格 → 跳到那个地址执行。
                            <strong>指针的声明类型不参与这个过程</strong>，所以对象是 Circle 就跑 Circle::draw。
                        </p>
                        <CompareTable
                            headers={['结论', '说明']}
                            rows={[
                                ['虚表是每个类一张', '不是每个对象一张，所以不会因对象多而占大量内存'],
                                ['对象多一个指针大小', '含虚函数的类，每个对象额外占 8 字节（64 位）'],
                                ['虚调用比普通调用略慢', '多一次间接寻址；七级不考性能细节，知道有开销即可'],
                                ['虚表指针由构造函数设置', '这正是构造函数不能是虚函数的原因'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="在构造函数里调用虚函数是个陷阱" tone="rose">
                            基类构造函数执行时，派生类部分<strong>还没构造</strong>，
                            此时虚表指针指向的是<strong>基类</strong>的虚表。
                            所以在基类构造函数里调用虚函数，跑的是基类版本，而不是派生类的覆盖版——
                            和你的预期正好相反。同理，基类析构函数里调用虚函数也是基类版本。
                            <strong>构造和析构函数里不要调用虚函数。</strong>
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">基类析构函数必须是虚的</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            这是七级 OOP 部分最实用的一个知识点，也是实际写代码时最容易泄漏的地方。
                        </p>
                        <CodeBlock>{`class Shape {
public:
    ~Shape() { cout << "~Shape" << endl; }     // ❌ 没有 virtual
};
class Circle : public Shape {
    int* buffer;
public:
    Circle() { buffer = new int[1000]; }
    ~Circle() { delete[] buffer; cout << "~Circle" << endl; }
};

Shape* p = new Circle();
delete p;         // 只调用 ~Shape，~Circle 从未执行
                  // → buffer 那 1000 个 int 永久泄漏`}</CodeBlock>
                        <Callout icon={Trash2} title="为什么会漏" tone="rose">
                            <code className="font-mono">delete p</code> 时，编译器要决定「调用哪个析构函数」。
                            如果 ~Shape 不是虚函数，这个决定就在<strong>编译期按 p 的静态类型</strong>做出——
                            p 是 Shape*，所以只调 ~Shape。
                            <br /><br />
                            派生类的析构函数被完全跳过，它负责释放的资源就再也没人管了。
                            对象越大、创建越频繁，泄漏越严重。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            改法只有一个字：给基类析构函数加 <code className="font-mono font-bold">virtual</code>。
                        </p>
                        <CodeBlock>{`class Shape {
public:
    virtual ~Shape() { cout << "~Shape" << endl; }   // ✅
};
// 现在 delete p 会：先查虚表找到 ~Circle → 执行 ~Circle
//                 → 自动接着执行基类 ~Shape
// 输出：~Circle 然后 ~Shape`}</CodeBlock>
                        <Callout icon={Trash2} title="析构链条是自动的" tone="blue">
                            注意你<strong>不需要</strong>在 ~Circle 里手动调用 ~Shape。
                            派生类析构函数执行完自己的函数体后，编译器会自动接着调用基类的析构函数——
                            顺序永远是<strong>派生 → 基类</strong>，和构造顺序（基类 → 派生）正好相反。
                        </Callout>
                        <Callout icon={AlertTriangle} title="一条可以直接背的规则" tone="amber">
                            <strong>只要一个类可能被继承、并且会通过基类指针 delete，
                            它的析构函数就必须是 virtual。</strong>
                            <br /><br />
                            实践中更简单：<strong>只要类里有虚函数，就把析构函数也写成虚的</strong>。
                            有虚函数说明它本来就是准备被继承的，代价只是一个虚表槽位。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '通过基类指针 delete 派生类对象，基类析构函数不是虚函数会有什么后果？',
                            answer: '派生类析构函数不执行，资源泄漏',
                            reason: '非虚函数在编译期按指针的静态类型决定调用目标，所以只调基类析构。派生类申请的内存、文件句柄等全部无人释放。',
                        }, {
                            question: 'override 关键字能在编译期发现什么错误？',
                            answer: '本想覆盖却签名不匹配',
                            reason: '参数类型差异、漏写 const、返回类型不兼容都会让覆盖悄悄退化成隐藏，且编译器默认不报错。加上 override 后，找不到可覆盖的虚函数就直接编译失败。',
                        }, {
                            question: '在基类构造函数里调用虚函数，跑的是哪个版本？',
                            answer: '基类版本',
                            reason: '基类构造时派生部分尚未构造，虚表指针还指向基类虚表。所以调用不会分派到派生类的覆盖版本——这与直觉相反，因此构造析构函数里应避免调虚函数。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '写 Shape / Circle / Rectangle 三个类，用 vector<Shape*> 存起来，循环调用 draw() 验证多态。',
                                '把基类 draw 前面的 virtual 去掉，重新运行，观察输出全变成「形状」。',
                                '给派生类的 draw 加上 override，然后故意把参数改成 double，确认编译器报错。',
                                '给 Circle 加一个 new 出来的成员，基类析构不加 virtual，观察 ~Circle 是否执行。',
                                '给基类析构补上 virtual，确认输出变成「~Circle 然后 ~Shape」。',
                                '在基类构造函数里调用一个虚函数，打印结果，验证跑的是基类版本。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="有人写了 void render(Shape s) { s.draw(); }，然后调用 render(circle)（circle 是一个 Circle 对象）。结果输出的是「形状」而不是「圆」，即使 draw 已经声明为 virtual。为什么？该怎么改？"
                            hint="注意参数是 Shape s，不是 Shape& 或 Shape*。传参时发生了什么？"
                            answer={`因为参数是按值传递的 Shape 对象。传参时会用 circle 拷贝构造出一个全新的 Shape 对象，这个过程只复制 circle 里属于 Shape 的那部分成员，Circle 独有的部分被直接砍掉，虚表指针也被设成 Shape 的虚表。这个现象叫「对象切片（object slicing）」。

切片之后，s 在各种意义上就是一个纯粹的 Shape 对象，不再是 Circle，所以 s.draw() 只能输出「形状」。这不是 virtual 没生效，而是根本没有派生对象了。

改法是把参数改成基类的引用或指针：void render(Shape& s) 或 void render(Shape* s)。引用和指针不会拷贝对象，它们指向的仍是原来那个 Circle，虚表指针也还是 Circle 的，于是多态正常工作。加上 const 更好：void render(const Shape& s)，既避免拷贝又表明不修改。

这正好印证第 1 节说的多态三条件里的第三条——必须通过基类的指针或引用调用。按值传参是这一条最常见的违反方式，而且编译器不会给任何警告。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能区分覆盖（override）与隐藏，并说出让覆盖悄悄失效的几种签名差异',
                                '我能说明基类指针 delete 派生对象时不加虚析构的风险，以及析构链条是自动的',
                                '我知道 override 关键字能在编译期发现什么错误，并习惯给覆盖函数都加上',
                                '我能说明虚函数表的作用，以及虚表指针由构造函数设置这一点的两个推论',
                                '我知道多态成立的三个条件，能识别按值传参导致的对象切片',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
