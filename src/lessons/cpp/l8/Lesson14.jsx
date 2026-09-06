import React, { useState } from 'react';
import { AlertTriangle, Bug, ShieldAlert, Trash2 } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '栈、堆、静态区' },
    { id: 2, title: '四种内存错误', category: '各自的症状' },
    { id: 3, title: '怎么避免', category: '规则与工具' },
    { id: 4, title: '异常处理', category: '什么时候该抛' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 四种典型内存错误。每条都给出「错在哪、症状是什么、怎么改」。
const BUGS = [
    {
        id: 'leak',
        label: '内存泄漏',
        bad: `void f() {
    int* p = new int[1000];
    if (someCondition) return;    // ← 提前返回，忘了 delete
    delete[] p;
}
// 每次走进 if 都漏掉 4000 字节`,
        good: `void f() {
    vector<int> v(1000);          // ✅ 出作用域自动释放
    if (someCondition) return;    // 无论从哪条路径返回都安全
}
// 或者用 unique_ptr<int[]> p(new int[1000]);`,
        symptom: '程序运行越久占用内存越多。短程序看不出来，长时间运行或循环调用会 MLE。',
        cause: 'new 了但没有 delete，或者某条执行路径绕过了 delete。',
    },
    {
        id: 'dangling',
        label: '悬垂指针',
        bad: `int* f() {
    int x = 42;
    return &x;                    // ← 返回局部变量的地址
}
int* p = f();
cout << *p;                       // x 已销毁，读的是废弃栈空间`,
        good: `int f() { return 42; }            // ✅ 直接返回值

// 或者如果必须返回指针，用 new（调用者负责 delete）
int* f() { return new int(42); }`,
        symptom: '时好时坏。有时能读出正确的值（内存还没被覆盖），有时是垃圾，有时崩溃。',
        cause: '指针指向的对象已经销毁，但指针本身还在被使用。',
    },
    {
        id: 'double',
        label: '重复释放',
        bad: `int* p = new int(5);
int* q = p;                       // 两个指针指向同一块
delete p;
delete q;                         // ← 同一块内存被释放两次`,
        good: `int* p = new int(5);
delete p;
p = nullptr;                      // ✅ 释放后立即置空
delete p;                         // delete nullptr 是安全的空操作`,
        symptom: '通常直接崩溃，但也可能悄悄破坏堆结构，导致后面某个无关的 new 出错。',
        cause: '两个指针指向同一块内存，各自释放一次；或者上一课的浅拷贝。',
    },
    {
        id: 'overflow',
        label: '越界访问',
        bad: `int a[10];
for (int i = 0; i <= 10; i++)     // ← 应该是 i < 10
    a[i] = i;
// a[10] 越界，改写了数组后面的内存`,
        good: `int a[10];
for (int i = 0; i < 10; i++)      // ✅
    a[i] = i;

// 或者用 vector 的 at()，越界会抛异常而不是静默破坏
vector<int> v(10);
v.at(10) = 1;                     // 抛 out_of_range`,
        symptom: 'C++ 不做边界检查，越界写会静默破坏相邻变量，导致「另一个变量莫名变了」这类诡异 bug。',
        cause: '循环条件写错（<= 而不是 <）、数组开小了、下标从 1 开始但数组按 0 开的。',
    },
];

function MemoryBugLab() {
    const [id, setId] = useState('leak');
    const [showFix, setShowFix] = useState(false);
    const current = BUGS.find((b) => b.id === id) || BUGS[0];

    const pick = (next) => { setId(next); setShowFix(false); };

    return (
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Bug className="text-yellow-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">四种内存错误</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                这四种是 C++ 里最常见的内存问题。先看错误代码，
                <strong>自己想想症状会是什么</strong>，再点开对照。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {BUGS.map((b) => (
                    <button
                        key={b.id}
                        type="button"
                        aria-pressed={id === b.id}
                        onClick={() => pick(b.id)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${id === b.id
                            ? 'bg-yellow-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-yellow-300 hover:bg-yellow-100'}`}
                    >
                        {b.label}
                    </button>
                ))}
            </div>

            <div className="rounded-xl border border-rose-300 bg-rose-50 p-4">
                <div className="mb-2 text-xs font-black text-rose-800">有问题的写法</div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100" tabIndex={0}>
                    <code>{current.bad}</code>
                </pre>
            </div>

            {!showFix ? (
                <button
                    type="button"
                    onClick={() => setShowFix(true)}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-yellow-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-yellow-800"
                >
                    我想好症状了，看答案
                </button>
            ) : (
                <div className="mt-4 space-y-4">
                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">错因</div>
                        <p className="mt-1 text-sm font-bold leading-6 text-amber-300">{current.cause}</p>
                        <div className="mt-3 border-t border-slate-700 pt-3 text-xs font-bold text-slate-400">症状</div>
                        <p className="mt-1 text-sm font-bold leading-6 text-rose-400">{current.symptom}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
                        <div className="mb-2 text-xs font-black text-emerald-800">修正后</div>
                        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100" tabIndex={0}>
                            <code>{current.good}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Lesson14() {
    return (
        <CppLessonShell
            lessonNumber={14}
            lessonTitle="C++ 综合：指针、内存与异常"
            lessonSubtitle="C++ 不帮你检查，所以规则要自己守"
            accent="yellow"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/13"
            nextPath="/lesson/8/15"
            prerequisites={['完成第 4 课的拷贝与资源管理', '会用 new / delete', '知道局部变量的生命周期']}
            topSupport={<CppL8LessonSupport lessonId={14} />}
            bottomSupport={<CppL8LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '这些 bug 的共同点是「不报错」',
                description: '本课讲三种内存区域的差别、四种典型内存错误的症状与修法，以及异常处理该在什么时候用。',
            }}
            goals={['能安全使用指针与动态内存', '能识别常见的内存错误', '能使用异常处理']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={ShieldAlert} title="先分清三块内存" tone="blue">
                            搞清变量住在哪里，才能判断它什么时候消失。
                        </Callout>
                        <CompareTable
                            headers={['区域', '住着什么', '什么时候释放', '大小限制']}
                            rows={[
                                ['栈（stack）', '局部变量、函数参数、返回地址', '离开作用域自动释放', '小，通常几 MB'],
                                ['堆（heap）', 'new 出来的对象', '只有 delete 时才释放', '大，接近可用内存'],
                                ['静态区', '全局变量、static 变量', '程序结束时', '编译期确定'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="为什么大数组要开成全局或用 new" tone="rose">
                            栈通常只有几 MB。在函数里写
                            <code className="font-mono">int a[1000000];</code>（4 MB）就可能<strong>栈溢出</strong>，
                            表现是程序启动就崩溃，而且不给任何提示。
                            <br /><br />
                            正确做法：<strong>开在全局</strong>（进静态区）或用
                            <code className="font-mono font-bold">vector</code>（数据在堆上）。
                            这也是竞赛代码习惯把大数组写在 main 外面的原因。
                        </Callout>
                        <CodeBlock>{`int big[1000000];              // ✅ 全局，静态区，4 MB 没问题

void f() {
    int bad[1000000];         // ❌ 栈上 4 MB，很可能溢出
    vector<int> ok(1000000);  // ✅ 数据在堆上，vector 对象本身很小
    int* also = new int[1000000];   // ✅ 也在堆上，但要记得 delete[]
    delete[] also;
}`}</CodeBlock>
                        <Callout icon={ShieldAlert} title="new 与 delete 必须配对，且形式要匹配" tone="amber">
                            · <code className="font-mono">new int</code> 配 <code className="font-mono">delete</code>
                            <br />· <code className="font-mono font-bold">new int[n]</code> 配 <code className="font-mono font-bold">delete[]</code>
                            <br /><br />
                            用 <code className="font-mono">delete</code> 去释放 <code className="font-mono">new[]</code> 的内存是
                            <strong>未定义行为</strong>——对 int 这类内置类型可能碰巧没事，
                            但对有析构函数的类，只会调用第一个元素的析构函数，其余全部泄漏。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <MemoryBugLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">这四种错误的共同点</h3>
                        <Callout icon={Bug} title="都不会在出错的地方报错" tone="rose">
                            这是它们最麻烦的地方：
                            <br /><br />
                            · <strong>泄漏</strong>：程序照常跑完，只是内存没还。
                            <br />· <strong>悬垂</strong>：读到的可能是「看起来对」的旧值。
                            <br />· <strong>重复释放</strong>：可能崩在后面某个无关的 new 上。
                            <br />· <strong>越界写</strong>：改坏的是相邻变量，症状表现为「另一个变量莫名变了」。
                            <br /><br />
                            <strong>所以不能靠「跑了几次没崩」判断代码对不对</strong>——
                            要靠规则检查。这与第 4 课讲双重释放时的结论一致。
                        </Callout>
                        <CompareTable
                            headers={['错误', '典型症状', '在评测机上表现为']}
                            rows={[
                                ['内存泄漏', '占用持续增长', 'MLE（内存超限）'],
                                ['悬垂指针', '结果时对时错', 'WA 或 RE，且难以复现'],
                                ['重复释放', '崩溃位置飘忽', 'RE（运行时错误）'],
                                ['越界访问', '别的变量被改坏', 'WA 或 RE，小数据常测不出'],
                                ['栈溢出（递归太深/大数组）', '启动即崩', 'RE'],
                            ]}
                        />
                        <PredictCheck
                            className="mt-6"
                            prompt="函数 int* f() { int x = 42; return &x; } 调用后 cout << *p; 会输出什么？"
                            options={[
                                '一定输出 42',
                                '一定崩溃',
                                '未定义行为：可能是 42、可能是垃圾、可能崩溃',
                                '编译错误',
                            ]}
                            correctIndex={2}
                            explanation="x 是局部变量，住在栈上，函数返回时它的栈帧就被释放了。p 指向的那块内存已经不属于这个变量——这是未定义行为。实际表现取决于那块栈空间有没有被后续的函数调用覆盖：紧接着读可能还是 42（值还没被冲掉），中间隔几次函数调用就变成垃圾，运气不好直接崩溃。多数编译器会给一个 warning，但不会报错。正是这种「有时能用」的特性让悬垂指针成为最难查的一类 bug。"
                            misconception="容易因为「测了一下输出 42」就认为代码没问题。未定义行为的危险恰恰在于它经常碰巧正确。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">五条能挡住大部分问题的规则</h3>
                        <StepList
                            title="按重要性排序"
                            steps={[
                                '优先用 vector 和 string，不用裸指针和 new。它们自己管内存，四种错误里三种直接消失。',
                                '如果必须 new：写完 new 立刻在对应位置写 delete，别等「后面再补」。',
                                'delete 之后立刻把指针置 nullptr。delete nullptr 是安全的空操作，能挡住重复释放。',
                                '不返回局部变量的地址或引用。要返回大对象就返回值（编译器会优化），或者返回 new 出来的指针并说明由谁释放。',
                                '循环边界一律检查一遍：数组开 n 就用 i < n，下标从 1 开始就开 n+1。',
                            ]}
                        />
                        <Callout icon={Trash2} title="第 1 条能解决多少问题" tone="blue">
                            回头看第 4 课：一个持有 <code className="font-mono">char* p</code> 的类要写
                            <strong>三件套</strong>（拷贝构造、拷贝赋值、析构），
                            还要处理自赋值、浅拷贝、双重释放。
                            <br /><br />
                            把 <code className="font-mono">char* p</code> 换成
                            <code className="font-mono font-bold">std::string p</code>——
                            <strong>三件套一个都不用写，四种内存错误全部消失</strong>。
                            <br /><br />
                            八级考试要求会手写这些（选择题会考原理），
                            但实际写代码时应该优先用标准库。
                        </Callout>
                        <CompareTable
                            headers={['别用', '改用', '好处']}
                            rows={[
                                ['int* a = new int[n]', 'vector<int> a(n)', '自动释放，还能 .size()'],
                                ['char* s', 'std::string s', '自动管理长度和内存'],
                                ['a[i] 直接访问', 'a.at(i)（调试时）', '越界抛异常而不是静默破坏'],
                                ['手写链表节点 new/delete', 'list 或 vector', '省掉全部指针管理'],
                            ]}
                        />
                        <Callout icon={ShieldAlert} title="调试工具" tone="amber">
                            本地调试时可以给编译器加参数：
                            <br />· <code className="font-mono font-bold">-fsanitize=address</code>：
                            检测越界、悬垂、重复释放，出错时<strong>直接指出行号</strong>。
                            <br />· <code className="font-mono font-bold">-fsanitize=undefined</code>：检测各类未定义行为。
                            <br />· <code className="font-mono font-bold">-Wall -Wextra</code>：打开全部警告，
                            返回局部地址这类问题会被警告出来。
                            <br /><br />
                            这些工具能把「时好时坏的诡异 bug」变成「明确的错误行号」，
                            调试效率差别巨大。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">异常处理的基本形式</h3>
                        <CodeBlock>{`#include <stdexcept>

double divide(int a, int b) {
    if (b == 0) throw runtime_error("除数不能为 0");   // 抛出
    return (double)a / b;
}

int main() {
    try {
        cout << divide(10, 0) << endl;
    } catch (const runtime_error& e) {          // 捕获，用 const 引用
        cout << "出错了：" << e.what() << endl;
    } catch (...) {                              // 兜底，捕获任何类型
        cout << "未知错误" << endl;
    }
    cout << "程序继续运行" << endl;              // try/catch 之后照常执行
}`}</CodeBlock>
                        <Callout icon={ShieldAlert} title="三个语法要点" tone="blue">
                            ① <strong>catch 用 const 引用</strong>：<code className="font-mono">catch (const exception&amp; e)</code>。
                            按值捕获会拷贝异常对象，且对派生类异常会发生对象切片（七级第 12 课那个问题）。
                            <br />② <strong>catch 的顺序从派生类到基类</strong>：
                            如果先写 <code className="font-mono">catch (const exception&amp;)</code>，
                            后面更具体的 catch 永远轮不到。
                            <br />③ <strong><code className="font-mono">catch (...)</code> 放最后</strong>：它捕获一切，放前面会吃掉所有异常。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">什么时候该抛异常，什么时候返回错误码</h3>
                        <CompareTable
                            headers={['', '抛异常', '返回错误码']}
                            rows={[
                                ['适合', '真正异常的、罕见的情况', '预期内的、常见的失败'],
                                ['例子', '内存耗尽、文件损坏、参数根本非法', '查找没找到、用户输入格式不对'],
                                ['调用者能忽略吗', '不能，不处理就一路上抛直到崩溃', '能，容易被忘记检查'],
                                ['性能', '不抛时几乎零开销，抛出时较慢', '一直有一点开销'],
                                ['代码可读性', '正常逻辑不被错误处理打断', 'if 检查散落各处'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="判断标准：这件事「正常吗」" tone="amber">
                            <strong>「查一个不存在的键」是正常的</strong>——用返回值表示没找到
                            （比如 <code className="font-mono">map::find</code> 返回 <code className="font-mono">end()</code>）。
                            <br /><br />
                            <strong>「数组下标是 −1」是不正常的</strong>——调用方写错了代码，
                            该抛异常让问题暴露出来，而不是静默返回一个默认值掩盖它。
                            <br /><br />
                            标准库正是这么设计的：<code className="font-mono">v[i]</code> 不检查（快，但越界是未定义行为），
                            <code className="font-mono">v.at(i)</code> 检查并<strong>抛 out_of_range</strong>。
                            两个接口对应两种取舍。
                        </Callout>
                        <Callout icon={Trash2} title="竞赛里几乎不用异常" tone="rose">
                            考试和竞赛的代码是一次性的、输入保证合法、只关心速度——
                            <strong>用异常没有收益，还可能拖慢速度</strong>。
                            <br /><br />
                            八级要求「会用 try/catch」和「知道何时该抛」，
                            主要是为了理解<strong>标准库的行为</strong>
                            （比如 <code className="font-mono">at()</code> 和 <code className="font-mono">stoi()</code> 会抛什么），
                            以及将来写工程代码时的取舍。做题时不必主动用。
                        </Callout>
                        <MiniQuiz items={[{
                            question: 'new int[n] 应该配哪个释放语句？用错了会怎样？',
                            answer: 'delete[]；用 delete 是未定义行为',
                            reason: 'new[] 必须配 delete[]。用 delete 释放数组时，对有析构函数的类只会调用第一个元素的析构函数，其余元素的资源全部泄漏；对内置类型可能碰巧没事但仍是未定义行为。',
                        }, {
                            question: '返回局部变量地址为什么危险？',
                            answer: '函数返回后局部变量已销毁',
                            reason: '局部变量在栈上，函数返回时栈帧被释放。指针指向的内存不再属于该变量，读写它是未定义行为——可能碰巧正确、可能是垃圾、可能崩溃。static 局部变量则可以返回地址。',
                        }, {
                            question: '什么时候该抛异常而不是返回错误码？',
                            answer: '真正异常、调用方不该忽略的情况',
                            reason: '「查不到某个键」是正常情况，用返回值表示；「下标为负」说明调用方代码有错，该抛异常让问题暴露。标准库的 v[i] 和 v.at(i) 正是这两种取舍的体现。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '写一段有内存泄漏的代码（new 后在某条分支提前 return），用循环调用它一万次，观察内存增长。',
                                '把它改成用 vector，验证泄漏消失。',
                                '写一个返回局部变量地址的函数，紧接着读它、再隔几次函数调用后读它，对比两次结果。',
                                '构造重复释放：两个指针指向同一块，各 delete 一次，观察是否崩溃；再加上 delete 后置 nullptr，验证问题消失。',
                                '写一个 int a[10] 的越界循环（i <= 10），在数组前后各放一个变量，观察哪个被改坏了。',
                                '用 try/catch 捕获 vector::at 的越界异常，以及自己 throw runtime_error 的除零。',
                                '如果本地编译器支持，加上 -fsanitize=address 重跑上面几个程序，对比它给出的报错信息。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一段代码：class Node { public: int val; Node* next; }; 有人用它写链表，函数 void clear(Node* head) { while (head) { delete head; head = head->next; } }。这段代码有什么问题？该怎么改？另外调用 clear 之后，调用方手里的 head 指针处于什么状态？`}
                            hint={`注意 delete head 和 head = head->next 的先后顺序。delete 之后 head 指向的内存还能读吗？`}
                            answer={`问题在于 delete 和读取的顺序反了。while 循环里先 delete head，然后才执行 head = head->next——但此时 head 指向的内存已经被释放，读它的 next 成员是访问已释放内存，属于未定义行为。实际表现可能是拿到垃圾值导致后续 delete 一个非法地址而崩溃，也可能碰巧还能读出正确的 next（内存内容尚未被覆盖）而看起来正常，这正是本课强调的「不在出错处报错」。

正确写法是先把 next 存下来再删：
void clear(Node* head) {
    while (head) {
        Node* nxt = head->next;   // 先保存
        delete head;              // 再删除
        head = nxt;
    }
}

关于调用方的 head：clear 的参数是按值传递的指针，函数内对 head 的修改不影响调用方的变量。所以 clear 返回后，调用方手里的 head 仍然指向那块已经被 delete 的内存——这是一个悬垂指针。此时再用它（读 val、遍历、甚至再 delete 一次）都是未定义行为。

两种改法：把参数改成引用 void clear(Node*& head)，函数末尾令 head = nullptr；或者保持按值传递，但要求调用方自己在调用后置空。前者更安全，因为不依赖调用方记得做这件事。

更根本的做法是按本课第 3 节的第 1 条规则——用 std::list 或 vector 代替手写链表，整个 clear 函数和这两个 bug 都不存在了。手写链表节点管理是八级考察的知识点（选择题会问指针操作顺序），但实际写题时几乎没有理由不用标准库容器。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明 new 与 delete 必须配对，且 new[] 要配 delete[]',
                                '我能识别野指针的来源：返回局部地址、delete 后未置空、指向已销毁对象',
                                '我知道这四种内存错误都不在出错处报错，不能靠「跑几次没崩」判断',
                                '我能判断何时该抛异常而不是返回错误码，并知道 v[i] 与 v.at(i) 的取舍',
                                '我知道栈只有几 MB，大数组要开全局或用 vector',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
