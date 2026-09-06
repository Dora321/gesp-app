import React, { useState } from 'react';
import { AlertTriangle, Copy, Layers, Trash2 } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '默认拷贝干了什么' },
    { id: 2, title: '浅拷贝的后果', category: '两个指针一块内存' },
    { id: 3, title: '深拷贝与三法则', category: '该写哪三个' },
    { id: 4, title: '赋值与自赋值', category: '最容易漏的判断' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 浅拷贝与深拷贝的内存示意 + 真实输出。两栏的差别就是这一课的全部内容。
const MODES = {
    shallow: {
        label: '默认拷贝（浅拷贝）',
        code: `class Str {
    char* p;
public:
    Str(const char* s) {
        p = new char[strlen(s) + 1];
        strcpy(p, s);
    }
    ~Str() { delete[] p; }
    // 没有写拷贝构造 → 编译器生成一个「逐成员复制」的版本
};

Str a("hi");
Str b = a;          // 调用拷贝构造：只把指针的值抄过去
cout << "两者地址是否相同：" << (a.addr() == b.addr());`,
        aAddr: '0x5f2a10',
        bAddr: '0x5f2a10',
        shared: true,
        output: ['两者地址是否相同：1', '（程序退出时崩溃 / double free）'],
        verdict: 'bad',
        note: 'a.p 和 b.p 指向同一块堆内存。改 b 会连带改 a；更致命的是两者析构时各 delete[] 一次，同一块内存被释放两遍——「双重释放」，行为未定义，通常直接崩溃。',
    },
    deep: {
        label: '自定义拷贝构造（深拷贝）',
        code: `class Str {
    char* p;
public:
    Str(const char* s) {
        p = new char[strlen(s) + 1];
        strcpy(p, s);
    }
    // 关键：自己申请一块新内存，再把内容抄过去
    Str(const Str& other) {
        p = new char[strlen(other.p) + 1];
        strcpy(p, other.p);
    }
    ~Str() { delete[] p; }
};

Str a("hi");
Str b = a;          // 调用自定义拷贝构造：各有一块内存
cout << "两者地址是否相同：" << (a.addr() == b.addr());`,
        aAddr: '0x5f2a10',
        bAddr: '0x5f2b80',
        shared: false,
        output: ['两者地址是否相同：0', '（程序正常退出）'],
        verdict: 'ok',
        note: 'a.p 和 b.p 各自指向一块独立的内存，内容相同但互不影响。两者析构时各释放自己那块，不会重复释放。',
    },
};

function CopyLab() {
    const [mode, setMode] = useState('shallow');
    const current = MODES[mode];

    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Copy className="text-amber-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">浅拷贝 vs 深拷贝</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                同样一句 <code className="font-mono font-bold">Str b = a;</code>，
                有没有自己写拷贝构造函数，内存布局完全不同。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {Object.entries(MODES).map(([key, item]) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={mode === key}
                        onClick={() => setMode(key)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${mode === key
                            ? 'bg-amber-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-amber-300 hover:bg-amber-100'}`}
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
                    <div className="rounded-xl bg-white p-5 ring-1 ring-amber-200">
                        <div className="text-xs font-black text-slate-500">内存布局</div>
                        <div className="mt-3 space-y-2 font-mono text-xs">
                            <div className="flex items-center gap-2">
                                <span className="w-12 font-black text-slate-700">a.p</span>
                                <span className="text-slate-400">→</span>
                                <span className="rounded bg-amber-600 px-2 py-1 font-black text-white">{current.aAddr}</span>
                                <span className="text-slate-500">"hi"</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-12 font-black text-slate-700">b.p</span>
                                <span className="text-slate-400">→</span>
                                <span className={`rounded px-2 py-1 font-black text-white ${current.shared ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                                    {current.bAddr}
                                </span>
                                <span className="text-slate-500">"hi"</span>
                            </div>
                        </div>
                        <p className={`mt-3 border-t border-slate-100 pt-3 text-xs font-black ${current.shared ? 'text-rose-700' : 'text-emerald-700'}`}>
                            {current.shared
                                ? '同一个地址 —— 一块内存被两个对象共用'
                                : '两个不同地址 —— 各自独立'}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">程序输出</div>
                        <div className="mt-2 space-y-1 font-mono text-sm">
                            {current.output.map((line, index) => (
                                <div key={line} className={index === current.output.length - 1 && current.verdict === 'bad'
                                    ? 'text-rose-400' : 'text-emerald-300'}>
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`rounded-xl p-5 ring-1 ${current.verdict === 'ok'
                        ? 'bg-emerald-50 ring-emerald-200'
                        : 'bg-rose-50 ring-rose-200'}`}>
                        <p className={`text-sm font-semibold leading-6 ${current.verdict === 'ok' ? 'text-emerald-900' : 'text-rose-900'}`}>
                            {current.note}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson4() {
    return (
        <CppLessonShell
            lessonNumber={4}
            lessonTitle="面向对象进阶：拷贝与资源管理"
            lessonSubtitle="有裸指针成员，默认拷贝一定是错的"
            accent="amber"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/3"
            nextPath="/lesson/8/5"
            prerequisites={['完成七级第 11 课的类与构造析构', '会用 new / delete[]', '知道指针存的是地址']}
            topSupport={<CppL8LessonSupport lessonId={4} />}
            bottomSupport={<CppL8LessonSupport lessonId={4} placement="bottom" />}
            hero={{
                title: '编译器替你写的那个拷贝构造，可能正在埋雷',
                description: '本课讲拷贝构造与赋值运算符的调用时机、浅拷贝导致的双重释放，以及三法则和自赋值判断。',
            }}
            goals={['能说明拷贝构造与赋值运算符的调用时机', '能识别浅拷贝的风险', '能写出正确的资源管理']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Copy} title="从七级末尾那道题接上来" tone="blue">
                            七级第 11 课的迁移题问过：一个持有 <code className="font-mono">char* p</code> 的类，
                            构造析构都写对了，为什么 <code className="font-mono">Str b = a;</code> 会崩溃。
                            这一课把它讲透。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">编译器会悄悄帮你生成什么</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            如果你不写，编译器会自动生成四个函数（C++11 起还有移动版本，八级不要求）：
                        </p>
                        <CompareTable
                            headers={['函数', '签名', '默认行为', '什么时候被调用']}
                            rows={[
                                ['默认构造', 'Str()', '成员各自默认初始化', '定义对象且不给参数'],
                                ['拷贝构造', 'Str(const Str&)', '逐成员复制', '用已有对象初始化新对象'],
                                ['拷贝赋值', 'Str& operator=(const Str&)', '逐成员复制', '两个已存在的对象之间赋值'],
                                ['析构', '~Str()', '成员各自析构', '对象销毁时'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="「逐成员复制」是关键的四个字" tone="rose">
                            对 int、double 这类成员，复制值就对了。
                            <br />
                            对 <code className="font-mono">std::string</code>、<code className="font-mono">vector</code>，
                            它们自己的拷贝构造会被调用，也对。
                            <br /><br />
                            但对<strong>裸指针</strong>，复制的是<strong>地址本身</strong>，
                            不是地址指向的内容——两个对象从此共用一块内存。这就叫<strong>浅拷贝</strong>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">拷贝构造 vs 拷贝赋值：怎么区分</h3>
                        <CodeBlock>{`Str a("hi");
Str b = a;          // 拷贝构造 —— b 是新对象，从无到有
Str c(a);           // 拷贝构造 —— 同上，只是写法不同

Str d("hello");
d = a;              // 拷贝赋值 —— d 早就存在了，现在换内容

// 判断标准：等号左边的对象是「刚出生」还是「已经活着」？
// 刚出生 → 拷贝构造；已经活着 → 拷贝赋值。
// 注意 Str b = a; 里的等号是初始化，不是赋值！`}</CodeBlock>
                        <Callout icon={Layers} title="函数传参和返回值也会触发拷贝构造" tone="amber">
                            <code className="font-mono">void f(Str s)</code> 按值传参 → 拷贝构造一个 s。
                            <br /><code className="font-mono">Str g() {'{ Str t("x"); return t; }'}</code> → 返回时可能拷贝构造。
                            <br /><br />
                            这就是七级讲的「对象切片」和这里的「浅拷贝」为什么都爱在传参处出问题——
                            <strong>按值传参会悄悄调用拷贝构造，而你根本没写这行代码</strong>。
                            所以传对象一律用 <code className="font-mono font-bold">const Str&amp;</code>。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <CopyLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">双重释放为什么必然发生</h3>
                        <StepList
                            title="崩溃的四步"
                            steps={[
                                'Str a("hi") 构造：a.p = new char[3]，假设拿到地址 0x5f2a10。',
                                'Str b = a 浅拷贝：b.p 也被赋成 0x5f2a10 —— 两个指针指向同一块。',
                                'b 先析构（后构造先析构）：delete[] 0x5f2a10，这块内存归还系统。',
                                'a 再析构：delete[] 0x5f2a10 —— 这块已经不属于程序了，行为未定义。',
                            ]}
                        />
                        <Callout icon={Trash2} title="它有时「看起来没事」，这才最危险" tone="rose">
                            双重释放是<strong>未定义行为</strong>，不是「一定崩溃」。
                            小程序里可能顺利跑完，换个编译器、换个数据量、加几行无关代码，
                            它就崩了——而且崩溃位置往往离真正的错误很远。
                            <br /><br />
                            所以不能靠「跑了几次没崩」来判断代码对不对。
                            判断依据是<strong>规则</strong>：有裸指针成员且在析构里释放它，默认拷贝就一定是错的。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt={`一个类有 char* p 成员，构造里 new、析构里 delete[]，但没写拷贝构造函数。执行 Str a("hi"); Str b = a; 后程序退出时会发生什么？`}
                            options={[
                                '正常退出，两个对象各自释放自己的内存',
                                '同一块内存被释放两次，行为未定义',
                                '编译报错，提示缺少拷贝构造函数',
                                'b 的内存不会被释放，造成泄漏',
                            ]}
                            correctIndex={1}
                            explanation="编译器生成的默认拷贝构造做逐成员复制，对指针成员复制的是地址值，所以 a.p 和 b.p 指向同一块堆内存。两个对象析构时各执行一次 delete[]，同一块内存被释放两遍——这是双重释放，未定义行为。编译器不会报错（默认拷贝构造语法上完全合法），所以这个 bug 只能靠规则识别，不能靠编译器提醒。"
                            misconception="选「泄漏」是把方向搞反了：浅拷贝的问题是释放太多次，而不是漏了没释放。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">三法则（Rule of Three）</h3>
                        <Callout icon={Layers} title="一条可以直接背的规则" tone="blue">
                            <strong>如果你需要自己写析构函数，那么你几乎一定也需要自己写
                            拷贝构造函数和拷贝赋值运算符。</strong>
                            <br /><br />
                            道理很直接：需要自定义析构，说明类里管着某种资源；
                            管着资源，就说明默认的「逐成员复制」会让两个对象共用同一份资源；
                            共用就会出双重释放。三者是连着的，所以要么都不写，要么三个都写。
                        </Callout>
                        <CompareTable
                            headers={['类的成员', '需要写三件套吗', '为什么']}
                            rows={[
                                ['只有 int、double', '不需要', '值复制天然正确'],
                                ['std::string、vector', '不需要', '它们自己管好了拷贝和释放'],
                                ['裸指针 + 析构里 delete', '需要', '默认拷贝共用内存 → 双重释放'],
                                ['文件句柄、锁', '需要', '同理，资源不能被两个对象同时持有'],
                            ]}
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">深拷贝的写法</h3>
                        <CodeBlock>{`class Str {
    char* p;
public:
    Str(const char* s = "") {
        p = new char[strlen(s) + 1];
        strcpy(p, s);
    }

    // ① 拷贝构造：申请新内存，复制内容
    Str(const Str& other) {
        p = new char[strlen(other.p) + 1];
        strcpy(p, other.p);
    }

    // ② 拷贝赋值：见下一节，要处理自赋值和旧内存
    Str& operator=(const Str& other) {
        if (this == &other) return *this;      // 自赋值检查
        delete[] p;                             // 先释放自己原有的
        p = new char[strlen(other.p) + 1];
        strcpy(p, other.p);
        return *this;                           // 支持链式赋值 a = b = c
    }

    // ③ 析构
    ~Str() { delete[] p; }
};`}</CodeBlock>
                        <Callout icon={Copy} title="更省事的办法：别用裸指针" tone="amber">
                            上面这一整套，如果把 <code className="font-mono">char* p</code> 换成
                            <code className="font-mono font-bold">std::string p</code>，
                            <strong>三个函数一个都不用写</strong>——string 自己管好了拷贝和释放。
                            <br /><br />
                            这就是现代 C++ 的思路：<strong>把资源管理交给已经写对的类</strong>，
                            而不是每个类都自己重写一遍。八级要求会手写三件套（考试要考），
                            但实际写代码时优先用 string 和 vector。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">赋值运算符为什么必须判自赋值</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            看这个<strong>漏掉自赋值检查</strong>的版本，然后看 <code className="font-mono">a = a;</code> 会发生什么：
                        </p>
                        <CodeBlock>{`// ❌ 漏掉自赋值检查
Str& operator=(const Str& other) {
    delete[] p;                             // ← 先把自己的内存释放了
    p = new char[strlen(other.p) + 1];      // ← 但 other 就是自己！
    strcpy(p, other.p);                     //    other.p 已经是野指针
    return *this;
}

Str a("hello");
a = a;          // 灾难：strlen(other.p) 读的是已释放的内存`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="自赋值不只出现在 a = a 这种傻写法里" tone="rose">
                            直接写 <code className="font-mono">a = a</code> 当然没人会写。
                            但下面这些情况都是自赋值，而且看不出来：
                            <br /><br />
                            · <code className="font-mono">v[i] = v[j];</code> 当 i 恰好等于 j。
                            <br />· <code className="font-mono">*p1 = *p2;</code> 当两个指针指向同一个对象。
                            <br />· 排序、交换、去重这类算法内部，元素自赋值很常见。
                            <br /><br />
                            所以那句 <code className="font-mono font-bold">if (this == &amp;other) return *this;</code>
                            不是防呆，是必需的。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">赋值运算符的四个要点</h3>
                        <StepList
                            title="写 operator= 时逐条对照"
                            steps={[
                                '先判自赋值：if (this == &other) return *this; —— 否则会先释放再读自己。',
                                '释放自己原有的资源：delete[] p; —— 否则旧内存泄漏（这是与拷贝构造的关键区别，拷贝构造时对象刚出生，没有旧资源）。',
                                '申请新资源并复制内容。',
                                '返回 *this —— 这样才能写 a = b = c 这样的链式赋值。',
                            ]}
                        />
                        <CompareTable
                            headers={['', '拷贝构造', '拷贝赋值']}
                            rows={[
                                ['对象状态', '刚出生，没有旧资源', '已存在，持有旧资源'],
                                ['要不要 delete 旧的', '不要（没有旧的）', '要，否则泄漏'],
                                ['要不要判自赋值', '不要（新对象不可能是自己）', '要'],
                                ['返回值', '无（构造函数没有返回类型）', 'Str&，支持链式赋值'],
                            ]}
                        />
                        <Callout icon={Trash2} title="一个更稳的写法：拷贝-交换" tone="blue">
                            上面的写法有个隐患：如果 <code className="font-mono">new</code> 抛异常，
                            此时旧内存已经 delete 了、新内存又没拿到，对象处于「p 是野指针」的破损状态。
                            <br /><br />
                            更稳的做法是<strong>先拷贝再交换</strong>：
                            <code className="font-mono">Str tmp(other); swap(p, tmp.p); return *this;</code>
                            —— tmp 出作用域时会带走旧内存。这样要么完全成功、要么对象保持原样。
                            八级不要求掌握这个，但知道有这个思路有好处。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '什么时候编译器会生成默认拷贝构造函数？',
                            answer: '你自己没写的时候',
                            reason: '只要没有自定义拷贝构造，编译器就会生成一个做「逐成员复制」的版本。它对 int、string、vector 成员是对的，对裸指针成员则是浅拷贝，会导致双重释放。',
                        }, {
                            question: '为什么 operator= 必须先判 this == &other？',
                            answer: '否则自赋值时会先释放再读自己',
                            reason: '不判的话，delete[] p 已经把内存还了，接下来 strlen(other.p) 读的正是这块已释放的内存。而自赋值会在 v[i]=v[j]（i==j）这类地方悄悄出现。',
                        }, {
                            question: '拷贝赋值要 delete 旧资源，拷贝构造为什么不用？',
                            answer: '拷贝构造时对象刚出生，没有旧资源',
                            reason: '拷贝构造的对象是从无到有创建的，成员指针还没指向任何东西，delete 它属于释放未初始化的指针。拷贝赋值的对象已经活着并持有资源，不释放就泄漏。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '写一个持有 char* 的 Str 类，只写构造和析构，用 Str b = a; 触发浅拷贝，打印两者指针地址确认相同。',
                                '在析构函数里加一行打印，观察同一个地址被 delete[] 了两次。',
                                '补上深拷贝的拷贝构造函数，重新打印地址，确认变成两个不同的值。',
                                '实现 operator=，先故意漏掉自赋值检查，执行 a = a; 观察结果。',
                                '补上自赋值检查，再测一次 a = a; 以及链式赋值 a = b = c。',
                                '把 char* 换成 std::string，删掉全部三件套，验证程序仍然正确——理解「把资源管理交给已写对的类」。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一个类 class Arr { int* data; int n; public: Arr(int size) : n(size) { data = new int[n]; } ~Arr() { delete[] data; } };。有人写了函数 void printArr(Arr a) { /* 打印 a 的内容 */ }，然后在 main 里 Arr x(100); printArr(x); printArr(x); 程序在第二次调用时崩溃。请解释原因，并给出两种改法。`}
                            hint={`参数是 Arr a 而不是 Arr& a。每次调用发生了什么？函数返回时又发生了什么？`}
                            answer={`原因是按值传参触发了浅拷贝。printArr(Arr a) 的参数是按值传递的，每次调用都会用 x 拷贝构造一个局部对象 a。由于类里没有自定义拷贝构造，编译器生成的版本做逐成员复制，于是 a.data 和 x.data 指向同一块堆内存。

函数返回时局部对象 a 析构，执行 delete[] data —— 把 x 也在用的那块内存释放了。此时 x.data 已经成为悬垂指针（dangling pointer），但 x 自己并不知道。

第二次调用 printArr(x) 时，又拷贝构造一个 a 指向那块已释放的内存，读取它的内容是未定义行为，返回时再 delete[] 一次就是双重释放——所以崩在第二次。注意第一次调用往往「看起来正常」，这正是这类 bug 难查的地方。

改法一（推荐，也最省事）：把参数改成 const 引用 void printArr(const Arr& a)。引用不拷贝对象，函数内用的就是 x 本身，不会有额外的析构，问题从根上消失。凡是传对象都该这么写——顺带也避免了拷贝开销。

改法二（补全三法则）：给 Arr 写深拷贝的拷贝构造函数（data = new int[n]; 再逐个复制内容）和拷贝赋值运算符。这样每次按值传参得到的都是独立副本，析构互不影响。这种改法让类本身变得安全，任何按值使用它的地方都不会出问题，但每次传参要付出复制整个数组的代价。

实际工程里的第三条路是把 int* data 换成 std::vector<int>，那样三件套都不用写、按值传参也安全。八级要求会手写三件套，但要知道这条路存在。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明什么时候编译器会生成默认拷贝构造，以及「逐成员复制」对裸指针为什么是错的',
                                '我能识别需要自定义三件套的场景——看类里有没有需手动归还的资源',
                                '我能解释自赋值为什么必须先判断，并举出 v[i]=v[j] 这类隐蔽的自赋值场景',
                                '我知道拷贝赋值要释放旧资源而拷贝构造不用，以及为什么要返回 *this',
                                '我知道按值传参会悄悄触发拷贝构造，所以传对象一律用 const 引用',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
