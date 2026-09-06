import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, Lock, Wrench } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '从结构体到类' },
    { id: 2, title: '访问权限与封装', category: 'public 还是 private' },
    { id: 3, title: '构造与析构', category: '对象的一生' },
    { id: 4, title: '初始化列表', category: '两种写法的差别' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 一个「对象生命周期」的时序追踪。用最小的例子把三件事讲清：
// 成员的构造在函数体之前、析构顺序与构造相反、局部对象出作用域即析构。
const TIMELINE = [
    { line: 18, event: '进入 main', detail: '还没有任何对象存在。', live: [] },
    { line: 19, event: 'Box a(3) 开始构造', detail: '先为成员 data 分配空间——注意这一步发生在构造函数体之前。', live: [] },
    { line: 10, event: 'a 的初始化列表执行', detail: 'size(n) 直接用 n 初始化成员，一步到位，没有「先默认初始化再赋值」。', live: [] },
    { line: 11, event: 'a 的构造函数体执行', detail: 'new int[size] 申请堆内存。到这里 a 才算完整可用。', live: ['a'] },
    { line: 20, event: 'Box b(5) 构造完成', detail: 'b 独立拥有自己的一块堆内存，与 a 无关。', live: ['a', 'b'] },
    { line: 21, event: '进入内层作用域', detail: '{ } 划出一个新作用域。', live: ['a', 'b'] },
    { line: 22, event: 'Box c(2) 构造完成', detail: 'c 是局部对象，只活在这个花括号里。', live: ['a', 'b', 'c'] },
    { line: 23, event: '离开内层作用域', detail: 'c 立刻析构——不用等到 main 结束。', live: ['a', 'b'] },
    { line: 15, event: 'c 的析构函数执行', detail: 'delete[] data 归还堆内存。没有这一句就是内存泄漏。', live: ['a', 'b'] },
    { line: 25, event: 'main 即将返回', detail: 'a 和 b 还活着，马上要按「与构造相反」的顺序析构。', live: ['a', 'b'] },
    { line: 15, event: 'b 析构', detail: 'b 比 a 后构造，所以先析构——后进先出。', live: ['a'] },
    { line: 15, event: 'a 析构', detail: '最后一个对象也销毁了，程序干净退出。', live: [] },
];

const CODE_LINES = [
    'class Box {',
    'private:',
    '    int* data;      // 指向堆内存',
    '    int  size;',
    '',
    'public:',
    '    // 初始化列表：在函数体之前完成成员初始化',
    '    Box(int n) : size(n) {',
    '        data = new int[size];',
    '        cout << "构造 size=" << size << endl;',
    '    }',
    '',
    '    ~Box() {',
    '        delete[] data;      // 必须自己归还',
    '        cout << "析构 size=" << size << endl;',
    '    }',
    '',
    '    int length() const { return size; }',
    '};',
];

const MAIN_LINES = [
    'int main() {',
    '    Box a(3);',
    '    Box b(5);',
    '    {',
    '        Box c(2);',
    '    }                   // c 在这里析构',
    '    return 0;',
    '}                       // b、a 依次析构',
];

function LifecycleLab() {
    const [step, setStep] = useState(TIMELINE.length - 1);
    const current = TIMELINE[step];
    const liveSet = useMemo(() => new Set(current.live), [current]);

    return (
        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Boxes className="text-sky-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">对象的一生</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                拖动进度条，看三件事：<strong>成员初始化在函数体之前</strong>、
                <strong>局部对象出花括号就析构</strong>、<strong>析构顺序与构造相反</strong>。
            </p>

            <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-xl bg-slate-950 p-5">
                    <div className="mb-2 text-xs font-bold text-slate-500">Box 类定义</div>
                    <pre className="overflow-x-auto font-mono text-xs leading-6" tabIndex={0}>
                        {CODE_LINES.map((line, index) => (
                            <div
                                key={index}
                                className={`px-2 ${current.line === index + 1 ? 'rounded bg-sky-800 text-white' : 'text-slate-400'}`}
                            >
                                <span className="mr-3 inline-block w-4 text-right text-slate-600">{index + 1}</span>
                                {line || ' '}
                            </div>
                        ))}
                    </pre>
                    <div className="mt-3 border-t border-slate-800 pt-3 text-xs font-bold text-slate-500">main 函数</div>
                    <pre className="overflow-x-auto font-mono text-xs leading-6" tabIndex={0}>
                        {MAIN_LINES.map((line, index) => (
                            <div
                                key={index}
                                className={`px-2 ${current.line === index + 18 ? 'rounded bg-sky-800 text-white' : 'text-slate-400'}`}
                            >
                                <span className="mr-3 inline-block w-4 text-right text-slate-600">{index + 18}</span>
                                {line || ' '}
                            </div>
                        ))}
                    </pre>
                </div>

                <div className="space-y-4">
                    <div className="rounded-xl bg-white p-5 ring-1 ring-sky-100">
                        <div className="text-xs font-bold text-slate-500">第 {step + 1} / {TIMELINE.length} 步</div>
                        <h4 className="mt-1 text-base font-black text-slate-900">{current.event}</h4>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{current.detail}</p>
                    </div>

                    <div className="rounded-xl bg-white p-5 ring-1 ring-sky-100">
                        <div className="text-xs font-bold text-slate-500">此刻活着的对象</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {['a', 'b', 'c'].map((name) => (
                                <span
                                    key={name}
                                    className={`flex h-11 w-11 items-center justify-center rounded-lg font-mono text-sm font-black transition ${liveSet.has(name)
                                        ? 'bg-sky-700 text-white'
                                        : 'bg-slate-100 text-slate-300'}`}
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                        <p className="mt-3 text-xs font-bold leading-5 text-slate-500">
                            {liveSet.size === 0 ? '没有对象存活' : `共 ${liveSet.size} 个对象持有堆内存`}
                        </p>
                    </div>

                    <label htmlFor="lifecycle-step" className="block text-sm font-black text-slate-700">
                        执行进度
                    </label>
                    <input
                        id="lifecycle-step"
                        type="range"
                        min="0"
                        max={TIMELINE.length - 1}
                        value={step}
                        onChange={(event) => setStep(Number(event.target.value))}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default function Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="类、封装与构造析构"
            lessonSubtitle="谁负责申请，谁就负责归还"
            accent="sky"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/10"
            nextPath="/lesson/7/12"
            prerequisites={['会定义和使用结构体', '知道 new / delete 的基本用法', '理解局部变量的作用域']}
            topSupport={<CppL7LessonSupport lessonId={11} />}
            bottomSupport={<CppL7LessonSupport lessonId={11} placement="bottom" />}
            hero={{
                title: '类就是「数据 + 操作数据的规矩」',
                description: '本课讲访问权限与封装、构造与析构的时机、以及初始化列表和函数体内赋值的实际差别。',
            }}
            goals={['能定义类并区分成员与访问权限', '能写出构造函数与析构函数', '能说明封装带来的好处']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Boxes} title="class 和 struct 差在哪" tone="blue">
                            在 C++ 里两者<strong>几乎完全等价</strong>，唯一的语法差别是<strong>默认访问权限</strong>：
                            <code className="font-mono font-bold">struct</code> 默认 public，
                            <code className="font-mono font-bold">class</code> 默认 private。
                            <br /><br />
                            习惯上：只是一堆数据放在一起就用 struct；数据带着规矩、要保护起来就用 class。
                            这是约定而非强制。
                        </Callout>
                        <CodeBlock>{`struct Point {      // 默认 public
    int x, y;       // 外面可以直接改
};

class Counter {     // 默认 private
    int count;      // 外面碰不到
public:
    void add() { count++; }
    int get() const { return count; }
};`}</CodeBlock>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            前十课处理的都是「算法」，这三课（11–13）转向「怎么组织代码」。
                            七级对 OOP 的要求不深，但考点很集中：<strong>权限、构造析构时机、虚函数</strong>。
                            这一课先把前两个打牢。
                        </p>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">三种访问权限</h3>
                        <CompareTable
                            headers={['权限', '类内部', '派生类', '外部代码']}
                            rows={[
                                ['public', '可访问', '可访问', '可访问'],
                                ['protected', '可访问', '可访问', '不可访问'],
                                ['private', '可访问', '不可访问', '不可访问'],
                            ]}
                        />
                        <Callout icon={Lock} title="封装到底带来什么好处" tone="blue">
                            不是为了「藏起来」，而是为了<strong>把不变量集中到一处维护</strong>。
                            <br /><br />
                            比如一个 Box 类要保证「size 永远等于 data 数组的实际长度」。
                            如果 size 是 public，外面随手改一下 <code className="font-mono">box.size = 100</code>，
                            这个约定立刻被破坏，而且<strong>出错的地方和改错的地方相隔很远</strong>，极难排查。
                            <br /><br />
                            设成 private 之后，只有类内的几个成员函数能改它。
                            出问题时排查范围从「整个程序」缩小到「这个类的几十行」。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">把全 public 的类改造成封装良好的版本</h3>
                        <CodeBlock>{`// ❌ 改造前：谁都能改，约定无法保证
struct BadBox {
    int* data;
    int  size;
};
BadBox b;
b.size = 100;        // data 其实只有 3 个元素——之后一定越界

// ✅ 改造后：size 只能读不能写，越界检查集中在一处
class Box {
private:
    int* data;
    int  size;
public:
    Box(int n) : size(n) { data = new int[n](); }
    ~Box() { delete[] data; }

    int length() const { return size; }        // 只读接口

    int& at(int i) {                           // 带检查的访问
        if (i < 0 || i >= size) {
            cout << "下标越界" << endl;
            exit(1);
        }
        return data[i];
    }
};`}</CodeBlock>
                        <Callout icon={Wrench} title="const 成员函数" tone="amber">
                            <code className="font-mono font-bold">int length() const</code> 末尾那个 const 表示
                            「这个函数不会修改任何成员」。好处有两个：一是编译器帮你检查，写错了直接报错；
                            二是<strong>只有 const 成员函数能被 const 对象调用</strong>。
                            凡是只读的接口都该加上。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <LifecycleLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">构造函数：对象诞生时自动跑</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            函数名与类同名、<strong>没有返回类型</strong>（连 void 都不写）。
                            可以重载多个，编译器按参数选。
                        </p>
                        <CodeBlock>{`class Box {
    int* data; int size;
public:
    Box() : data(nullptr), size(0) {}          // 默认构造
    Box(int n) : size(n) { data = new int[n](); }  // 带参构造
    ~Box() { delete[] data; }
};`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="什么时候必须自己写析构函数" tone="rose">
                            判断标准只有一条：<strong>这个类有没有申请需要手动归还的资源</strong>。
                            <br /><br />
                            有 <code className="font-mono">new</code> / <code className="font-mono">new[]</code>、
                            打开的文件、申请的锁 —— 必须写析构函数归还，否则内存泄漏。
                            <br /><br />
                            只有 int、double、<code className="font-mono">std::string</code>、
                            <code className="font-mono">std::vector</code> 这类成员 —— <strong>不用写</strong>，
                            它们自己的析构函数会被自动调用。这也是为什么实际写代码时优先用 vector 而不是裸指针。
                        </Callout>
                        <CompareTable
                            headers={['要点', '规则']}
                            rows={[
                                ['构造顺序', '先成员（按声明顺序），再函数体'],
                                ['析构顺序', '先函数体，再成员；整体与构造相反'],
                                ['多个对象', '后构造的先析构（后进先出）'],
                                ['局部对象', '离开所在花括号立即析构，不等函数结束'],
                                ['new 出来的对象', '只有 delete 时才析构，忘了就泄漏'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="构造函数不能是虚函数" tone="rose">
                            虚函数的调用要靠对象里的<strong>虚函数表指针</strong>来分派，
                            而那个指针是<strong>构造函数负责设置</strong>的。
                            如果构造函数本身要通过虚表来调用，就成了「用还没建好的东西去建它自己」——
                            逻辑上不成立。
                            <br /><br />
                            <strong>但析构函数可以、而且常常必须是虚函数</strong>——
                            析构时对象还完整存在，虚表可用。这是下一课的重点。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="按上面实验台的代码，Box a(3)、Box b(5)、内层作用域里 Box c(2)。程序输出的析构顺序是什么？"
                            options={['a、b、c', 'c、a、b', 'c、b、a', 'a、c、b']}
                            correctIndex={2}
                            explanation="c 是内层作用域的局部对象，离开那对花括号立刻析构，所以 c 最先。然后 main 返回时，a 和 b 按「与构造相反」的顺序析构——b 后构造所以先析构，a 最后。顺序是 c、b、a，即 size=2、size=5、size=3。"
                            misconception="容易以为析构顺序和构造顺序一致（a、b、c）。栈上对象是后进先出，永远反着来。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">初始化列表 vs 函数体内赋值</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            两种写法看着等价，实际差别不小：
                        </p>
                        <CodeBlock>{`// 写法一：初始化列表（推荐）
Box(int n) : size(n), tag("hello") {
    data = new int[n]();
}

// 写法二：函数体内赋值
Box(int n) {
    size = n;              // size 先被默认初始化，再被赋值
    tag  = "hello";        // string 先构造成空串，再赋值 —— 多做了一遍
    data = new int[n]();
}`}</CodeBlock>
                        <CompareTable
                            headers={['对比项', '初始化列表', '函数体内赋值']}
                            rows={[
                                ['执行时机', '进入函数体之前', '函数体内'],
                                ['做几步', '一步：直接用给定值构造', '两步：先默认构造，再赋值'],
                                ['const 成员', '可以', '不行（const 不能被赋值）'],
                                ['引用成员', '可以', '不行（引用必须初始化时绑定）'],
                                ['基类构造', '可以显式传参', '不行'],
                            ]}
                        />
                        <Callout icon={Wrench} title="三种情况下初始化列表是唯一选择" tone="rose">
                            ① <strong>const 成员</strong>：<code className="font-mono">const int id;</code> ——
                            const 变量只能初始化不能赋值。
                            <br />② <strong>引用成员</strong>：<code className="font-mono">int&amp; ref;</code> ——
                            引用必须在诞生时就绑定目标。
                            <br />③ <strong>基类没有默认构造函数</strong>时，必须在初始化列表里显式传参。
                            <br /><br />
                            对 int 这类内置类型，两种写法性能上没差别；
                            但对 string、vector 这类有构造开销的成员，函数体内赋值会白做一遍构造。
                            所以养成用初始化列表的习惯。
                        </Callout>
                        <Callout icon={AlertTriangle} title="初始化列表的顺序不由你决定" tone="amber">
                            成员的实际初始化顺序<strong>按类里的声明顺序</strong>，
                            <strong>不是</strong>按初始化列表里写的顺序。
                            <br /><br />
                            <code className="font-mono">class A {'{ int x; int y; A() : y(1), x(y) {} }'};</code>
                            —— 看着像先 y=1 再 x=y=1，实际上 x 先初始化，而此时 y 还是垃圾值。
                            <strong>让初始化列表的顺序和声明顺序保持一致</strong>，能避开这个坑。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '构造函数为什么不能是虚函数？',
                            answer: '虚表由构造函数负责建立',
                            reason: '虚函数调用依赖对象中的虚表指针，而那个指针是构造函数设置的。构造函数若靠虚表分派，等于用还没建好的东西建它自己。析构函数则可以是虚的，因为析构时对象仍完整。',
                        }, {
                            question: '什么情况下必须用初始化列表而不能在函数体里赋值？',
                            answer: 'const 成员、引用成员、基类无默认构造',
                            reason: 'const 只能初始化不能赋值；引用必须在诞生时绑定；基类没有默认构造函数时必须显式传参。这三种情况函数体内赋值都编译不过。',
                        }, {
                            question: '一个类只有 int 和 std::vector 成员，需要自己写析构函数吗？',
                            answer: '不需要',
                            reason: 'int 无需清理，vector 会自动调用自己的析构函数释放内部内存。只有当类里有裸 new、文件句柄等需手动归还的资源时才必须写析构函数。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '写一个管理动态数组的 Box 类：private 成员 data 和 size，构造里 new、析构里 delete[]。',
                                '为它补上初始化列表和带越界检查的 at 方法，用越界下标测试检查是否生效。',
                                '照实验台的代码写 a(3)、b(5) 和内层作用域的 c(2)，跑一遍确认析构顺序是 c、b、a。',
                                '把析构函数里的 delete[] 注释掉，用 valgrind 或反复创建对象观察内存增长，理解泄漏。',
                                '故意写 class A { int x; int y; A() : y(1), x(y) {} };，打印 x 的值，验证声明顺序才是初始化顺序。',
                                '把一个全 public 的结构体改造成封装良好的类，列出改造后哪些非法操作被挡住了。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`有人写了一个类：class Str { char* p; public: Str(const char* s) { p = new char[strlen(s)+1]; strcpy(p, s); } ~Str() { delete[] p; } };。看起来构造析构都对。但如果写 Str a("hi"); Str b = a; 程序会崩溃。为什么？`}
                            hint="想一想 Str b = a; 这一句复制了什么——复制的是指针本身，还是指针指向的内容？"
                            answer={`因为编译器自动生成的拷贝构造函数做的是「逐成员复制」，对指针成员 p 而言，复制的是指针的值（地址），不是它指向的字符串内容。于是 a.p 和 b.p 指向堆上同一块内存。

后果有两个：一是修改 b 的内容会连带改变 a；二是更致命的——main 结束时 b 和 a 各自析构一次，同一块内存被 delete[] 两遍，这叫「双重释放」，行为未定义，通常直接崩溃。

判断规律：只要类里有裸指针成员并在析构函数里释放它，默认的拷贝行为就一定是错的。这就是所谓「三法则」——如果你需要自定义析构函数，那么你几乎一定也需要自定义拷贝构造函数和拷贝赋值运算符。

两条出路：① 自己写拷贝构造函数做「深拷贝」，即重新 new 一块内存再 strcpy 内容过去；② 更简单也更现代的做法是把 char* 换成 std::string，让它自己管理内存，此时连析构函数都不用写了。八级会正式讲拷贝与资源管理，这一课先建立「有裸指针就要警惕拷贝」的意识。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明构造函数为什么不能是虚函数，以及析构函数为什么可以',
                                '我能判断一个类何时需要自定义析构函数——看有没有需手动归还的资源',
                                '我能解释初始化列表与函数体内赋值的差别，说出三种必须用初始化列表的情况',
                                '我知道成员的初始化顺序按声明顺序而非列表顺序',
                                '我能说清封装的实际好处是把不变量集中到一处维护，缩小排查范围',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
