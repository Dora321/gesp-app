import React, { useState } from 'react';
import { AlertTriangle, Crosshair, Layers, Timer } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '同名的东西太多了' },
    { id: 2, title: '名字解析', category: '这个 x 是谁' },
    { id: 3, title: '作用域与生命周期', category: '活多久' },
    { id: 4, title: 'using 的影响范围', category: '风险在哪' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 名字解析判定器。每个场景都是一段真实可编译（或真实报错）的代码。
const CASES = [
    {
        id: 'local',
        label: '函数内有同名局部变量',
        snippet: `int x = 1;                  // 全局
namespace A { int x = 2; }

void g() {
    int x = 4;              // 局部
    cout << x;              // ← 这个 x
}`,
        answer: '4',
        resolves: '局部变量 x',
        reason: '名字查找从最内层作用域开始，一层层向外找，找到第一个就停。局部的 x 把外层的全部遮蔽（shadow）了。',
        tone: 'ok',
    },
    {
        id: 'global',
        label: '用 :: 强制取全局',
        snippet: `int x = 1;                  // 全局
namespace A { int x = 2; }

void g() {
    int x = 4;
    cout << ::x;            // ← 前面加了 ::
}`,
        answer: '1',
        resolves: '全局变量 x',
        reason: '前缀 :: 表示「从全局作用域开始找」，跳过所有局部和命名空间。这是被遮蔽后仍要访问全局的唯一办法。',
        tone: 'ok',
    },
    {
        id: 'qualified',
        label: '用命名空间限定',
        snippet: `int x = 1;
namespace A { int x = 2; }

void g() {
    int x = 4;
    cout << A::x;           // ← 明确指定 A 里的
}`,
        answer: '2',
        resolves: 'A::x',
        reason: '限定名（qualified name）直接指定去哪找，不参与逐层查找。这是最清晰、最不会出错的写法。',
        tone: 'ok',
    },
    {
        id: 'using-one',
        label: 'using namespace 引入一个',
        snippet: `int x = 1;
namespace A { int x = 2; }

using namespace A;          // 把 A 里的名字引入当前作用域

void g() {
    cout << x;              // ← 没有局部 x 了
}`,
        answer: '编译错误：x 有歧义',
        resolves: '（无法确定）',
        reason: 'using namespace A 之后，A::x 和全局 ::x 处在同一层竞争，编译器无法判断该用哪个，报「ambiguous」。注意这不是「A 覆盖全局」——是两者平级冲突。',
        tone: 'bad',
    },
    {
        id: 'using-two',
        label: 'using 两个含同名的命名空间',
        snippet: `namespace A { int x = 2; }
namespace B { int x = 3; }

using namespace A;
using namespace B;

void g() {
    cout << x;              // ← 两个都叫 x
}`,
        answer: '编译错误：x 有歧义',
        resolves: '（无法确定）',
        reason: 'A::x 和 B::x 平级冲突。这就是 using namespace 的核心风险：把大量名字倒进当前作用域，撞车了才发现。',
        tone: 'bad',
    },
    {
        id: 'using-shadowed',
        label: 'using 之后局部又声明同名',
        snippet: `namespace A { int x = 2; }
using namespace A;

void g() {
    int x = 4;              // 局部
    cout << x;              // ← 局部赢
}`,
        answer: '4',
        resolves: '局部变量 x',
        reason: '局部作用域比全局层更内层，所以局部 x 遮蔽了通过 using 引入的 A::x，不产生歧义。层级不同就不冲突，同层才冲突。',
        tone: 'ok',
    },
];

function ResolutionLab() {
    const [activeId, setActiveId] = useState('local');
    const current = CASES.find((item) => item.id === activeId) || CASES[0];

    return (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Crosshair className="text-stone-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">这个 x 解析到哪个定义</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                六个场景，代码几乎一样，答案完全不同。规律只有一条：
                <strong>从最内层往外找，找到第一个就停；同一层里有两个就报歧义</strong>。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {CASES.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={activeId === item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`min-h-11 rounded-lg px-3 py-2 text-xs font-black transition ${activeId === item.id
                            ? 'bg-stone-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-stone-300 hover:bg-stone-100'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-100" tabIndex={0}>
                    <code>{current.snippet}</code>
                </pre>

                <div className="space-y-4">
                    <div className={`rounded-xl p-5 ring-1 ${current.tone === 'ok'
                        ? 'bg-emerald-50 ring-emerald-200'
                        : 'bg-rose-50 ring-rose-200'}`}>
                        <div className={`text-xs font-black ${current.tone === 'ok' ? 'text-emerald-800' : 'text-rose-800'}`}>
                            输出
                        </div>
                        <div className={`mt-1 font-mono text-2xl font-black ${current.tone === 'ok' ? 'text-emerald-900' : 'text-rose-900'}`}>
                            {current.answer}
                        </div>
                        <div className={`mt-3 border-t pt-3 text-xs font-black ${current.tone === 'ok'
                            ? 'border-emerald-200 text-emerald-800'
                            : 'border-rose-200 text-rose-800'}`}>
                            解析到：{current.resolves}
                        </div>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">为什么</div>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{current.reason}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson13() {
    return (
        <CppLessonShell
            lessonNumber={13}
            lessonTitle="命名空间与作用域"
            lessonSubtitle="同名不冲突的前提是分得清层次"
            accent="stone"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/12"
            nextPath="/lesson/7/14"
            prerequisites={['知道局部变量与全局变量的区别', '会用 using namespace std', '完成前两课的类基础']}
            topSupport={<CppL7LessonSupport lessonId={13} />}
            bottomSupport={<CppL7LessonSupport lessonId={13} placement="bottom" />}
            hero={{
                title: '一个名字，可能有好几个定义',
                description: '本课讲名字如何解析、局部/全局/静态变量各活多久，以及 using namespace std 到底有什么风险。',
            }}
            goals={['能使用命名空间组织代码', '能说明作用域与生命周期', '能解释 using 声明的影响范围']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Layers} title="命名空间解决的是撞名问题" tone="blue">
                            两个人各写了一个 <code className="font-mono">max</code> 函数，
                            放进同一个项目就冲突了。命名空间给名字加上「姓」：
                            <code className="font-mono font-bold">A::max</code> 和
                            <code className="font-mono font-bold">B::max</code> 就不再是同一个名字。
                            <br /><br />
                            标准库全部放在 <code className="font-mono font-bold">std</code> 里，
                            正是为了不占用你的名字。
                        </Callout>
                        <CodeBlock>{`namespace Geometry {
    double area(double r) { return 3.14159 * r * r; }   // 圆面积
}

namespace Statistics {
    double area(double a, double b) { return a * b; }    // 矩形面积
}

int main() {
    cout << Geometry::area(2.0) << endl;         // 12.566
    cout << Statistics::area(3.0, 4.0) << endl;  // 12
}`}</CodeBlock>
                        <Callout icon={Layers} title="命名空间可以分开写、可以嵌套" tone="amber">
                            同一个命名空间可以在多个地方多次打开，内容会合并——
                            这就是标准库能分散在几十个头文件里、却都属于 std 的原因。
                            <br /><br />
                            嵌套写法：<code className="font-mono">namespace A {'{ namespace B { int x; } }'}</code>，
                            访问用 <code className="font-mono font-bold">A::B::x</code>。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <ResolutionLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">名字查找的规则</h3>
                        <StepList
                            title="编译器找一个名字的顺序"
                            steps={[
                                '当前语句块（最内层的花括号）。',
                                '外层语句块，一层层往外，直到函数体。',
                                '类作用域（如果在成员函数里）：本类成员，然后基类成员。',
                                '当前命名空间，再往外层命名空间。',
                                '全局作用域。',
                                '任何一层找到就停止；同一层里找到两个以上 → 报歧义错误。',
                            ]}
                        />
                        <Callout icon={Crosshair} title="遮蔽（shadowing）不是错误" tone="amber">
                            内层的同名变量把外层的挡住，这是语言规定的正常行为，编译器<strong>不会报错</strong>
                            （某些编译器加 <code className="font-mono">-Wshadow</code> 才警告）。
                            <br /><br />
                            但它是 bug 的温床：你以为在改全局变量，实际改的是局部副本，
                            函数一返回修改就没了。写代码时<strong>尽量不要让内外层同名</strong>。
                        </Callout>
                        <CompareTable
                            headers={['写法', '含义', '会不会有歧义']}
                            rows={[
                                ['x', '逐层查找', '同层多个定义时会'],
                                ['::x', '直接取全局作用域的 x', '不会'],
                                ['A::x', '直接取命名空间 A 里的 x', '不会'],
                                ['this->x', '明确取当前对象的成员 x', '不会'],
                            ]}
                        />
                        <PredictCheck
                            className="mt-6"
                            prompt="代码里有全局 int x = 1; 和 namespace A { int x = 2; }，然后写了 using namespace A;。函数里没有局部 x，此时 cout << x; 的结果是？"
                            options={['输出 1', '输出 2', '编译错误：歧义', '输出 3']}
                            correctIndex={2}
                            explanation="using namespace A 把 A::x 引入到全局作用域这一层，于是这一层同时存在 ::x 和 A::x 两个候选，且优先级相同——编译器报 ambiguous 错误。它不是「A 覆盖全局」也不是「全局优先」，而是平级冲突。要消除歧义必须写成 ::x 或 A::x。"
                            misconception="容易以为 using 引入的名字会覆盖或被覆盖。实际是被放到同一层参与竞争，撞名就直接报错。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">作用域与生命周期是两件事</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            <strong>作用域</strong>：在代码的哪些地方能用这个名字（空间问题）。
                            <strong>生命周期</strong>：这块内存从什么时候到什么时候有效（时间问题）。
                            静态局部变量最能说明两者的区别。
                        </p>
                        <CompareTable
                            headers={['变量种类', '作用域', '生命周期', '存放位置']}
                            rows={[
                                ['局部变量', '所在花括号内', '进入时创建，离开即销毁', '栈'],
                                ['静态局部变量', '所在花括号内', '第一次执行到时创建，程序结束才销毁', '静态区'],
                                ['全局变量', '整个文件（extern 后跨文件）', '程序开始到结束', '静态区'],
                                ['new 出来的对象', '看指针能传到哪', 'new 到 delete 之间', '堆'],
                            ]}
                        />
                        <CodeBlock>{`void counter() {
    int a = 0;              // 每次进来都重新是 0
    static int b = 0;       // 只在第一次执行时初始化
    a++; b++;
    cout << a << " " << b << endl;
}

int main() {
    counter();      // 输出 1 1
    counter();      // 输出 1 2   ← a 归零了，b 记住了
    counter();      // 输出 1 3
}`}</CodeBlock>
                        <Callout icon={Timer} title="static 局部变量：作用域是局部的，寿命是全局的" tone="blue">
                            b 的名字<strong>只在 counter 里可见</strong>（作用域局部），
                            但它的内存<strong>整个程序运行期间都存在</strong>（生命周期全局）。
                            所以能跨调用记住值，同时又不污染外面的名字空间。
                            <br /><br />
                            注意初始化语句 <code className="font-mono">static int b = 0;</code>
                            <strong>只执行一次</strong>，第二次进函数时会跳过它。
                        </Callout>
                        <Callout icon={AlertTriangle} title="返回局部变量的地址是未定义行为" tone="rose">
                            <CodeBlock>{`int* bad() {
    int x = 42;
    return &x;      // ❌ 函数返回后 x 已销毁，指针指向废弃的栈空间
}
// 调用者拿到的指针可能暂时还能读出 42，也可能是垃圾——
// 这类 bug 时好时坏，最难排查`}</CodeBlock>
                            但返回 static 局部变量的地址是<strong>合法</strong>的——它的生命周期到程序结束。
                            返回 new 出来的指针也合法，只是调用者要负责 delete。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">using 的三种形式</h3>
                        <CompareTable
                            headers={['写法', '引入什么', '影响范围']}
                            rows={[
                                ['using namespace std;', 'std 里的全部名字', '从这行到当前作用域结束'],
                                ['using std::cout;', '只有 cout 这一个', '从这行到当前作用域结束'],
                                ['namespace S = Statistics;', '起个别名，不引入名字', '从这行到当前作用域结束'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="using namespace std 的实际风险" tone="rose">
                            std 里有<strong>上千个名字</strong>，其中不少是很常见的普通词：
                            <code className="font-mono">count</code>、<code className="font-mono">distance</code>、
                            <code className="font-mono">size</code>、<code className="font-mono">data</code>、
                            <code className="font-mono">swap</code>、<code className="font-mono">max</code>、
                            <code className="font-mono">min</code>、<code className="font-mono">next</code>、
                            <code className="font-mono">left</code>、<code className="font-mono">end</code>……
                            <br /><br />
                            你自己写一个 <code className="font-mono">int count = 0;</code> 在全局，
                            就可能和 <code className="font-mono">std::count</code> 撞车。
                            报错信息往往长得离谱、指向标准库头文件内部，很难看出真正原因。
                        </Callout>
                        <CodeBlock>{`#include <algorithm>
using namespace std;

int count = 0;          // 和 std::count 撞名

int main() {
    count++;            // 编译器：count 有歧义 —— 报错信息可能几十行
}

// 三种改法，从好到将就：
// ① 只引入用得到的：using std::cout; using std::endl;
// ② 全部写限定名：std::cout << std::endl;
// ③ 保留 using namespace std，但把自己的变量改名避开`}</CodeBlock>
                        <Callout icon={Layers} title="考试里可以用，工程里别在头文件里用" tone="amber">
                            竞赛和考试代码短、就一个文件，<code className="font-mono">using namespace std;</code>
                            省事且基本不出问题，用它没关系。
                            <br /><br />
                            真正的禁忌是<strong>在头文件（.h）里写它</strong>——
                            所有包含这个头文件的源文件都会被迫引入整个 std，
                            冲突会蔓延到你根本没写过的文件里。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">声明与定义的区别</h3>
                        <CompareTable
                            headers={['', '声明 declaration', '定义 definition']}
                            rows={[
                                ['作用', '告诉编译器「有这么个东西」', '真正分配空间 / 给出实现'],
                                ['能出现几次', '可以多次', '只能一次（单一定义规则）'],
                                ['变量例子', 'extern int x;', 'int x = 1;'],
                                ['函数例子', 'void f();', 'void f() { ... }'],
                            ]}
                        />
                        <MiniQuiz items={[{
                            question: 'using namespace std 的主要风险是什么？',
                            answer: '与自己的名字撞车',
                            reason: 'std 里有 count、distance、size、swap、max 等上千个常见名字，一旦你定义同名变量或函数就产生歧义，且报错信息常指向标准库内部，难以定位。',
                        }, {
                            question: '静态局部变量的作用域和生命周期分别是什么？',
                            answer: '作用域局部，生命周期到程序结束',
                            reason: '名字只在所在花括号内可见，但内存在静态区，第一次执行到时初始化（只一次），程序结束才销毁。因此能跨函数调用保留值。',
                        }, {
                            question: '全局有 int x = 1;，namespace A 里有 int x = 2;，写了 using namespace A; 后直接用 x 会怎样？',
                            answer: '编译错误，歧义',
                            reason: 'using 把 A::x 放进同一层，与 ::x 平级竞争，编译器无法选择。必须写 ::x 或 A::x 来消除歧义。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '写两个命名空间 Geometry 和 Statistics，各放一个同名的 area 函数，分别调用验证不冲突。',
                                '把实验台里六个场景逐个敲进编译器，确认输出（含两个编译错误）与判定一致。',
                                '写一个含 int a 和 static int b 的函数，连续调用三次，观察 1 1 / 1 2 / 1 3。',
                                '故意在函数里声明与全局同名的变量，修改它，再在函数外打印全局值，验证遮蔽的后果。',
                                '在全局定义 int count = 0; 并写 using namespace std;，观察编译器的报错信息有多长。',
                                '用 namespace S = Statistics; 起别名，验证它不引入名字、只是缩写。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="一个类 class Box { int size; public: void setSize(int size) { size = size; } };。编译通过，但调用 setSize(5) 之后成员 size 并没有变成 5。为什么？有哪几种改法？"
                            hint="函数参数也是一个局部名字。setSize 里的 size 解析到哪个定义？"
                            answer={`因为参数名 size 与成员名 size 相同，而参数属于更内层的作用域，把成员 size 遮蔽了。于是 size = size; 这一句实际是「把参数赋值给参数自己」，成员从未被碰到。编译器不报错（某些编译器加 -Wshadow 或 -Wself-assign 才警告），所以这个 bug 很容易溜过去。

三种改法：
① 用 this-> 明确指定成员：this->size = size;——最直接，也最能表达意图。
② 给参数换个名字：void setSize(int newSize) { size = newSize; }——从源头避免遮蔽，很多团队的编码规范就这么要求。
③ 用初始化列表（如果是在构造函数里）：Box(int size) : size(size) {}——这里有个例外，初始化列表中括号外的名字总是解析为成员，括号内的解析为参数，所以这种写法是合法且正确的，C++ 特意为它开了口子。

这道题把本课两个知识点串起来了：遮蔽规则（内层优先）和限定名（this-> 跳过查找直接指定）。实际写代码时，第 ② 种最稳妥——不给遮蔽留机会。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明 using namespace std 的潜在风险，以及为什么头文件里更不能写',
                                '我能判断一个名字在某处解析到哪个定义，知道「同层两个候选」会报歧义而不是覆盖',
                                '我能区分声明与定义，说出各能出现几次',
                                '我能说清作用域与生命周期是两件事，并用静态局部变量举例',
                                '我知道返回局部变量地址是未定义行为，而返回 static 变量地址合法',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
