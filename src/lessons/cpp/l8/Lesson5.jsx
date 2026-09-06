import React, { useState } from 'react';
import { AlertTriangle, Braces, Plus, Shapes } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '让自己的类像内置类型' },
    { id: 2, title: '重载运算符', category: '成员还是友元' },
    { id: 3, title: '重载的限制', category: '哪些不能碰' },
    { id: 4, title: '函数模板', category: '编译期生成代码' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 成员函数 vs 友元函数：同一个 + 的两种实现方式，以及各自能不能支持
// 「内置类型在左边」的写法。这一栏对照是本课的核心。
const FORMS = {
    member: {
        label: '重载为成员函数',
        code: `class Vec2 {
public:
    int x, y;
    Vec2(int x = 0, int y = 0) : x(x), y(y) {}

    // 成员函数：左操作数就是 this，所以只需一个参数
    Vec2 operator+(const Vec2& r) const {
        return Vec2(x + r.x, y + r.y);
    }
    Vec2 operator*(int k) const {
        return Vec2(x * k, y * k);
    }
};`,
        works: ['a + b       ✓  等价于 a.operator+(b)', 'a * 3       ✓  等价于 a.operator*(3)'],
        fails: ['3 * a       ✗  左边是 int，找不到 int::operator*'],
        note: '成员函数的左操作数必须是这个类的对象。所以 a * 3 可以，3 * a 不行——编译器会去 int 里找 operator*，当然找不到。',
        verdict: 'partial',
    },
    friend: {
        label: '重载为友元函数',
        code: `class Vec2 {
public:
    int x, y;
    Vec2(int x = 0, int y = 0) : x(x), y(y) {}

    // 友元：两个操作数都写成参数，谁在左边都行
    friend Vec2 operator*(int k, const Vec2& v) {
        return Vec2(v.x * k, v.y * k);
    }
    friend Vec2 operator*(const Vec2& v, int k) {
        return Vec2(v.x * k, v.y * k);
    }
    // << 也必须是友元：左操作数是 ostream，不是 Vec2
    friend ostream& operator<<(ostream& os, const Vec2& v) {
        return os << "(" << v.x << ", " << v.y << ")";
    }
};`,
        works: ['a * 3       ✓', '3 * a       ✓  左边是 int 也没问题', 'cout << a   ✓  左边是 ostream'],
        fails: [],
        note: '友元函数不属于类，两个操作数都是显式参数，所以左边放什么都行。凡是「左操作数不是本类对象」的运算符，都只能写成友元（或普通全局函数）。',
        verdict: 'ok',
    },
};

function OverloadLab() {
    const [form, setForm] = useState('member');
    const current = FORMS[form];

    return (
        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Plus className="text-violet-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">成员函数还是友元函数</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                判断标准只有一条：<strong>左操作数是不是本类的对象</strong>。
                是 → 可以写成员函数；不是 → 只能写友元。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {Object.entries(FORMS).map(([key, item]) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={form === key}
                        onClick={() => setForm(key)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${form === key
                            ? 'bg-violet-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-violet-200 hover:bg-violet-100'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-100" tabIndex={0}>
                    <code>{current.code}</code>
                </pre>

                <div className="space-y-4">
                    <div className="rounded-xl bg-white p-5 ring-1 ring-violet-100">
                        <div className="text-xs font-black text-emerald-700">能编译通过的写法</div>
                        <ul className="mt-2 space-y-1 font-mono text-xs text-slate-700">
                            {current.works.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                        {current.fails.length > 0 && (
                            <>
                                <div className="mt-4 text-xs font-black text-rose-700">编译失败的写法</div>
                                <ul className="mt-2 space-y-1 font-mono text-xs text-rose-700">
                                    {current.fails.map((line) => <li key={line}>{line}</li>)}
                                </ul>
                            </>
                        )}
                    </div>

                    <div className={`rounded-xl p-5 ring-1 ${current.verdict === 'ok'
                        ? 'bg-emerald-50 ring-emerald-200'
                        : 'bg-amber-50 ring-amber-200'}`}>
                        <p className={`text-sm font-semibold leading-6 ${current.verdict === 'ok' ? 'text-emerald-900' : 'text-amber-900'}`}>
                            {current.note}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="运算符重载与模板"
            lessonSubtitle="重载解决「同一个操作用在新类型上」，模板解决「同一份代码用在多种类型上」"
            accent="violet"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/4"
            nextPath="/lesson/8/6"
            prerequisites={['完成上一课的拷贝与资源管理', '会定义类和成员函数', '知道函数重载的概念']}
            topSupport={<CppL8LessonSupport lessonId={5} />}
            bottomSupport={<CppL8LessonSupport lessonId={5} placement="bottom" />}
            hero={{
                title: '让 a + b 和 cout << a 对自己的类也能用',
                description: '本课讲运算符重载的两种形式与限制，以及函数模板在编译期到底做了什么。',
            }}
            goals={['能重载常用运算符', '能说明运算符重载的限制', '能读懂简单的函数模板']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Plus} title="重载想解决什么" tone="blue">
                            自己写了一个二维向量类 Vec2，想把两个向量相加。
                            没有运算符重载时只能写 <code className="font-mono">Vec2 c = add(a, b);</code>，
                            表达式一长就很难读：<code className="font-mono">add(add(a, b), scale(c, 2))</code>。
                            <br /><br />
                            有了重载可以写成 <code className="font-mono font-bold">a + b + c * 2</code>——
                            <strong>让自己的类型用起来像内置类型</strong>。
                        </Callout>
                        <Callout icon={AlertTriangle} title="但重载不该改变直觉" tone="rose">
                            语法上你可以把 <code className="font-mono">+</code> 重载成做减法，
                            编译器不会阻止你。但这样写出来的代码没人看得懂。
                            <br /><br />
                            <strong>重载的目的是让代码更好读，不是炫技。</strong>
                            如果一个运算符在你的类上没有自然的含义，就别重载它，写个有名字的函数更清楚。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">重载 vs 模板：解决的是不同问题</h3>
                        <CompareTable
                            headers={['', '运算符重载', '函数模板']}
                            rows={[
                                ['解决什么', '同一个操作，用在新的类型上', '同一份逻辑，用在多种类型上'],
                                ['例子', '让 Vec2 支持 +', '让 max 同时支持 int、double、string'],
                                ['代码量', '每个类各写一次', '写一次，编译器按需生成多份'],
                                ['何时决定', '编译期按参数类型选重载', '编译期按实参类型实例化'],
                            ]}
                        />
                    </>
                ),
                2: (
                    <>
                        <OverloadLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">成员还是友元：一条判据</h3>
                        <Callout icon={Braces} title="看左操作数是谁" tone="blue">
                            <code className="font-mono">a + b</code> 会被编译器翻译成两种可能：
                            <br />· <code className="font-mono">a.operator+(b)</code> —— 找 a 所属类的成员函数
                            <br />· <code className="font-mono">operator+(a, b)</code> —— 找全局（含友元）函数
                            <br /><br />
                            所以：<strong>左操作数是本类对象 → 两种都行，习惯用成员函数；
                            左操作数不是本类对象 → 只能用友元</strong>。
                        </Callout>
                        <CompareTable
                            headers={['运算符', '推荐形式', '原因']}
                            rows={[
                                ['+ - * /（同类相加）', '成员函数', '左操作数就是本类对象'],
                                ['== != < >', '成员函数或友元', '两者都可，友元更对称'],
                                ['<< >>（输出输入）', '必须友元', '左操作数是 ostream / istream，不是本类'],
                                ['= [] () ->', '必须成员函数', 'C++ 规定这四个只能是成员'],
                                ['3 * a 这种内置类型在左', '必须友元', '不能给 int 加成员函数'],
                            ]}
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">重载 &lt;&lt; 的固定写法</h3>
                        <CodeBlock>{`// 三个要点：返回 ostream&、第一个参数是 ostream&、整体必须是友元
friend ostream& operator<<(ostream& os, const Vec2& v) {
    os << "(" << v.x << ", " << v.y << ")";
    return os;           // ← 返回 os 才能支持链式：cout << a << b << endl;
}

// 用法
Vec2 a(1, 2), b(3, 4);
cout << a << " " << b << endl;      // 输出 (1, 2) (3, 4)`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="为什么必须返回引用而不是值" tone="amber">
                            <code className="font-mono">cout &lt;&lt; a &lt;&lt; b</code> 实际是
                            <code className="font-mono">(cout &lt;&lt; a) &lt;&lt; b</code>——
                            前一个表达式的结果要继续当左操作数用。
                            <br /><br />
                            返回引用，链条上传的一直是同一个 cout；
                            返回值则会尝试<strong>拷贝一个 ostream</strong>，而 ostream 的拷贝构造是被禁用的，
                            直接编译失败。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="Vec2 类把 operator* 重载为成员函数 Vec2 operator*(int k) const。那么 3 * a 这个表达式会怎样？"
                            options={[
                                '正常工作，编译器会自动交换操作数',
                                '编译错误，因为左操作数是 int',
                                '正常工作但结果错误',
                                '运行时崩溃',
                            ]}
                            correctIndex={1}
                            explanation="成员函数形式的 operator* 要求左操作数是 Vec2 对象（它就是 this）。3 * a 的左操作数是 int，编译器会去找 int::operator*(Vec2) 或全局 operator*(int, Vec2)，两者都不存在，于是编译失败。编译器不会自动交换操作数——乘法在数学上可交换，但 C++ 不知道你的重载满足交换律。要支持 3 * a，必须额外写一个友元版本 friend Vec2 operator*(int k, const Vec2& v)。"
                            misconception="容易以为编译器懂数学。它只做符号匹配：找不到匹配的函数签名就报错，不会替你推导对称性。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">不能重载的运算符</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            大多数运算符都能重载，但有几个不行。考试会直接问，值得记住：
                        </p>
                        <CompareTable
                            headers={['运算符', '为什么不能重载']}
                            rows={[
                                ['::（作用域解析）', '它在编译期解析名字，不涉及运行时的值'],
                                ['.（成员访问）', '如果能重载，就无法访问对象的真实成员了'],
                                ['.*（成员指针访问）', '同上'],
                                ['?:（三目条件）', '它有短路语义，重载后无法保证只求值一个分支'],
                                ['sizeof', '编译期由类型决定，不是运行时操作'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="几个能重载但要小心的" tone="rose">
                            · <strong>&amp;&amp; 和 ||</strong>：能重载，但会<strong>丢掉短路特性</strong>——
                            重载后两个操作数都会被求值。这通常不是你想要的，所以实践上不该重载它们。
                            <br />· <strong>逗号运算符</strong>：同理，重载后求值顺序的保证会消失。
                            <br />· <strong>&amp;（取地址）</strong>：能重载，但重载后拿不到对象真实地址，几乎没有正当理由这么做。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">另外几条硬规则</h3>
                        <StepList
                            title="重载时的限制"
                            steps={[
                                '不能创造新运算符：没有 ** 这个运算符，你也不能定义一个。',
                                '不能改变运算符的优先级和结合性：重载了 + 和 *，a + b * c 仍然先算乘法。',
                                '不能改变操作数个数：+ 是二元的就永远是二元的（一元的 +a 是另一个重载）。',
                                '至少有一个操作数是自定义类型：不能重载 int + int。',
                            ]}
                        />
                        <Callout icon={Braces} title="优先级不可改，这一点常被忽略" tone="amber">
                            假设你给矩阵类重载了 <code className="font-mono">*</code> 表示矩阵乘法、
                            <code className="font-mono">+</code> 表示矩阵加法。那么
                            <code className="font-mono">A + B * C</code> <strong>一定</strong>先算 B * C，
                            因为 <code className="font-mono">*</code> 的优先级天生高于 <code className="font-mono">+</code>。
                            <br /><br />
                            想改变顺序只能加括号。重载改变的只是「这个符号对这些类型做什么」，
                            不改变「先算哪个」。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">函数模板：一份代码，多种类型</h3>
                        <CodeBlock>{`// T 是类型参数，写代码时它还不确定是什么
template <typename T>
T myMax(T a, T b) {
    return a > b ? a : b;
}

int main() {
    cout << myMax(3, 7)         << endl;   // T = int      → 7
    cout << myMax(2.5, 1.5)     << endl;   // T = double   → 2.5
    cout << myMax('a', 'z')     << endl;   // T = char     → z
    cout << myMax(string("ab"), string("cd")) << endl;   // T = string → cd
    // cout << myMax(3, 2.5);              // ✗ 两个参数类型不一致，推导冲突
    cout << myMax<double>(3, 2.5) << endl; // ✓ 显式指定 T=double → 3
}`}</CodeBlock>
                        <Callout icon={Shapes} title="模板在编译期做了什么" tone="blue">
                            模板本身<strong>不是代码</strong>，是「生成代码的图纸」。
                            编译器看到 <code className="font-mono">myMax(3, 7)</code>，
                            推导出 T = int，然后<strong>真的生成一份 int 版本的函数</strong>；
                            看到 <code className="font-mono">myMax(2.5, 1.5)</code> 再生成一份 double 版本。
                            <br /><br />
                            这个过程叫<strong>实例化（instantiation）</strong>，全部发生在编译期。
                            所以：
                            <br />· 运行时<strong>没有任何额外开销</strong>，和手写两个函数一样快；
                            <br />· 但<strong>编译时间会变长</strong>，生成的可执行文件也可能变大；
                            <br />· 用到几种类型就生成几份，<strong>没用到的类型不会生成</strong>。
                        </Callout>
                        <Callout icon={AlertTriangle} title="模板对 T 是有隐含要求的" tone="rose">
                            <code className="font-mono">myMax</code> 里用了 <code className="font-mono">a &gt; b</code>，
                            这意味着<strong>T 必须支持 &gt; 运算符</strong>。
                            <br /><br />
                            如果你拿本课的 Vec2 去调用 <code className="font-mono">myMax(v1, v2)</code>，
                            而 Vec2 没有重载 <code className="font-mono">&gt;</code>，就会编译失败。
                            <br /><br />
                            <strong>这正好把本课两半连起来了</strong>：模板要求类型支持某些运算符，
                            而运算符重载就是让自定义类型满足这些要求的手段。
                        </Callout>
                        <CompareTable
                            headers={['', '函数重载', '函数模板']}
                            rows={[
                                ['写几份代码', '每种类型各写一份', '只写一份'],
                                ['类型确定时机', '编译期按实参选择已有的某一份', '编译期按实参生成新的一份'],
                                ['逻辑不同怎么办', '各份可以完全不同', '逻辑必须一致（否则要特化）'],
                                ['适合', '不同类型要做不同的事', '不同类型做同样的事'],
                            ]}
                        />
                        <MiniQuiz items={[{
                            question: '哪些运算符不能重载？举出三个。',
                            answer: '::、.、?:（还有 .* 和 sizeof）',
                            reason: ':: 在编译期解析名字；. 若能重载就无法访问真实成员；?: 有短路语义；sizeof 由类型在编译期决定。这五个是 C++ 明确禁止重载的。',
                        }, {
                            question: 'operator<< 为什么必须重载为友元而不能是成员函数？',
                            answer: '左操作数是 ostream，不是本类',
                            reason: 'cout << a 的左操作数是 cout（ostream 类型）。成员函数要求左操作数是本类对象，而我们无法给标准库的 ostream 添加成员函数，所以只能写成友元或全局函数。',
                        }, {
                            question: '函数模板在编译期做了什么？',
                            answer: '按用到的类型各生成一份真实函数',
                            reason: '模板是生成代码的图纸。编译器推导出实参类型后实例化出对应版本，用到几种类型就生成几份。所以运行时没有额外开销，但编译时间和产物体积会增加。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '写一个 Vec2 类，把 + 重载为成员函数，验证 a + b 可用。',
                                '把 * 重载为成员函数，测试 a * 3 可用而 3 * a 编译失败。',
                                '再加一个友元版本 operator*(int, const Vec2&)，确认 3 * a 也能用了。',
                                '重载 << 输出成 (x, y) 格式，注意返回 ostream&，测试 cout << a << b << endl 的链式写法。',
                                '故意把 << 的返回类型改成 ostream（去掉 &），观察编译报错。',
                                '写一个 myMax 函数模板，用 int、double、char、string 各调用一次；再拿没重载 > 的 Vec2 调用，看报错信息。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`你写了一个分数类 Fraction（成员是分子 num 和分母 den），想让它支持排序：sort(v.begin(), v.end())。需要重载哪个运算符？重载成成员函数还是友元？另外，如果还想让 cout << f 能输出「3/4」这样的格式，又该怎么写？为什么这两个运算符的形式不一样？`}
                            hint={`sort 默认用什么比较两个元素？cout << f 的左操作数是谁？`}
                            answer={`排序需要重载 operator<。sort 在不给比较函数时，默认用 a < b 判断先后，所以只要 Fraction 支持 < 就能直接排序。

operator< 的左操作数是 Fraction 对象，所以两种形式都可以，习惯写成成员函数：
bool operator<(const Fraction& r) const { return num * r.den < r.num * den; }
注意这里用交叉相乘而不是算出小数——避免浮点误差。前提是分母都为正数，否则乘法会翻转不等号方向，需要先规范化符号。还要记得加 const（两个：参数的 const 引用和函数尾部的 const），否则 sort 对 const 容器或 const 迭代器可能调不到它。

输出则必须重载为友元：
friend ostream& operator<<(ostream& os, const Fraction& f) { return os << f.num << "/" << f.den; }

两者形式不同的原因在于左操作数是谁。a < b 的左操作数是 Fraction，可以是 this，所以能写成成员函数。而 cout << f 的左操作数是 cout，类型是 ostream——成员函数形式要求左操作数是本类对象，我们又无法给标准库的 ostream 添加成员函数，所以只能写成友元（或普通全局函数）。这就是本课那条判据的直接应用：先看左操作数是不是本类对象。

补充一点：sort 还要求比较函数满足严格弱序（七级第 14 课讲过），即两个相等的分数必须返回 false。上面的交叉相乘写法用的是严格小于，满足这个要求；如果误写成 <=，sort 可能越界崩溃。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说出哪些运算符不能重载，以及 && || 虽能重载但会丢短路特性',
                                '我能判断该重载为成员函数还是友元——看左操作数是不是本类对象',
                                '我能解释模板在编译期做了什么，知道它按用到的类型各生成一份',
                                '我知道重载不能改变运算符的优先级、结合性和操作数个数',
                                '我知道模板对类型参数有隐含要求，而运算符重载正是满足这些要求的手段',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
