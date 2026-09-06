import React, { useMemo, useState } from 'react';
import { AlertTriangle, Binary, Calculator, ToggleLeft } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '进制只是写法' },
    { id: 2, title: '进制转换', category: '除基取余' },
    { id: 3, title: '位运算技巧', category: '五个必会式子' },
    { id: 4, title: '补码与优先级', category: '两个坑' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const TRICKS = [
    {
        expr: 'x & 1',
        name: '判奇偶',
        explain: '最低位是 1 就是奇数。比 x % 2 更快，且对负数行为更一致。',
        demo: (x) => x & 1,
        demoNote: (x) => `${x} 是${(x & 1) ? '奇' : '偶'}数`,
    },
    {
        expr: 'x >> 1',
        name: '除以 2',
        explain: '右移一位等于整除 2。注意负数右移的行为由实现定义，一般是算术右移（补符号位）。',
        demo: (x) => x >> 1,
        demoNote: (x) => `${x} >> 1 = ${x >> 1}`,
    },
    {
        expr: 'x & (x - 1)',
        name: '去掉最低位的 1',
        explain: '把二进制里最右边那个 1 变成 0。反复做直到 x 为 0，做了几次就有几个 1（popcount）。',
        demo: (x) => x & (x - 1),
        demoNote: (x) => `${x} (${x.toString(2)}) → ${x & (x - 1)} (${(x & (x - 1)).toString(2)})`,
    },
    {
        expr: 'x & (-x)',
        name: '只留最低位的 1',
        explain: '取出最右边那个 1 所代表的值（lowbit）。树状数组的核心操作就是它。',
        demo: (x) => x & (-x),
        demoNote: (x) => `${x} (${x.toString(2)}) 的 lowbit = ${x & (-x)}`,
    },
    {
        expr: '(x >> k) & 1',
        name: '取第 k 位',
        explain: '把第 k 位移到最低位再取出来。k 从 0 开始算。',
        demo: (x) => (x >> 2) & 1,
        demoNote: (x) => `${x} (${x.toString(2)}) 的第 2 位 = ${(x >> 2) & 1}`,
    },
];

function BitLab() {
    const [value, setValue] = useState(12);
    const [base, setBase] = useState(2);

    const bits = useMemo(() => {
        const arr = [];
        for (let i = 7; i >= 0; i -= 1) arr.push((value >> i) & 1);
        return arr;
    }, [value]);

    const popcount = useMemo(() => {
        let x = value;
        let count = 0;
        while (x) { x &= x - 1; count += 1; }
        return count;
    }, [value]);

    return (
        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Binary className="text-sky-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">位运算实验台</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                拖动数值，观察八位二进制表示和五个常用技巧的结果。
                点二进制位可以直接翻转它。
            </p>

            <div className="rounded-xl bg-white p-5 ring-1 ring-sky-100">
                <label htmlFor="bit-value" className="block text-sm font-black text-slate-700">
                    x = {value}
                </label>
                <input
                    id="bit-value"
                    type="range" min="0" max="255" step="1"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                    className="mt-2 w-full"
                />

                <div className="mt-4 flex flex-wrap justify-center gap-1">
                    {bits.map((bit, index) => {
                        const position = 7 - index;
                        return (
                            <button
                                key={position}
                                type="button"
                                onClick={() => setValue(value ^ (1 << position))}
                                aria-label={`翻转第 ${position} 位，当前为 ${bit}`}
                                className={`flex h-11 w-11 flex-col items-center justify-center rounded-lg font-mono text-sm font-black transition ${bit
                                    ? 'bg-sky-700 text-white'
                                    : 'bg-slate-100 text-slate-400 hover:bg-sky-100'}`}
                            >
                                {bit}
                                <span className="text-[9px] font-bold opacity-60">{position}</span>
                            </button>
                        );
                    })}
                </div>
                <p className="mt-2 text-center text-xs font-bold text-slate-500">
                    下面的小数字是位号（从 0 开始，右边是最低位）· 二进制里有 {popcount} 个 1
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                    <label htmlFor="bit-base" className="block text-sm font-black text-slate-700">
                        转成 {base} 进制
                    </label>
                    <input
                        id="bit-base"
                        type="range" min="2" max="16" step="1"
                        value={base}
                        onChange={(event) => setBase(Number(event.target.value))}
                        className="mt-2 w-full"
                    />
                    <div className="mt-2 font-mono text-2xl font-black text-sky-700">
                        {value.toString(base).toUpperCase()}
                        <span className="ml-2 text-sm font-bold text-slate-400">（{base} 进制）</span>
                    </div>
                </div>
            </div>

            <div className="mt-5 space-y-2">
                {TRICKS.map((trick) => (
                    <div key={trick.expr} className="rounded-xl bg-slate-900 p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="font-mono text-sm font-black text-sky-300">{trick.expr}</span>
                            <span className="text-xs font-black text-slate-400">{trick.name}</span>
                        </div>
                        <div className="mt-1 font-mono text-xs text-amber-300">{trick.demoNote(value)}</div>
                        <p className="mt-1.5 text-xs font-semibold leading-5 text-slate-400">{trick.explain}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="进制转换与位运算技巧"
            lessonSubtitle="同一个数，不同的写法；同一个操作，不同的速度"
            accent="sky"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/10"
            nextPath="/lesson/8/12"
            prerequisites={['知道二进制的基本概念', '会用 % 和 / 运算', '完成第 10 课的快速幂（用到了位运算）']}
            topSupport={<CppL8LessonSupport lessonId={11} />}
            bottomSupport={<CppL8LessonSupport lessonId={11} placement="bottom" />}
            hero={{
                title: 'x & (x−1) 到底干了什么',
                description: '本课讲任意进制互转、五个必会的位运算技巧、补码表示，以及位运算最容易踩的优先级陷阱。',
            }}
            goals={['能在任意进制间转换', '能熟练使用位运算技巧', '能理解补码表示']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Calculator} title="进制只是同一个数的不同写法" tone="blue">
                            数字 255 本身不变，只是写法不同：
                            十进制 <code className="font-mono font-bold">255</code>、
                            二进制 <code className="font-mono font-bold">11111111</code>、
                            八进制 <code className="font-mono font-bold">377</code>、
                            十六进制 <code className="font-mono font-bold">FF</code>。
                            <br /><br />
                            k 进制的含义：每一位的<strong>权重是 k 的幂</strong>。
                            二进制 1101 = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8+4+0+1 = 13。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            为什么八级要专门讲这个？两个原因：
                            <br />① <strong>位运算</strong>操作的是二进制位，不懂二进制就看不懂那些式子；
                            <br />② <strong>状态压缩</strong>类题目用一个整数的每一位表示「某个元素选没选」，
                            这是把集合塞进 int 的标准手段。
                        </p>
                        <Callout icon={Binary} title="C++ 里的进制字面量" tone="amber">
                            <code className="font-mono">42</code> 十进制、
                            <code className="font-mono">0b101010</code> 二进制（C++14 起）、
                            <code className="font-mono">052</code> 八进制（<strong>前导 0 就是八进制</strong>）、
                            <code className="font-mono">0x2A</code> 十六进制。
                            <br /><br />
                            注意那个八进制：写 <code className="font-mono">int x = 012;</code> 得到的是
                            <strong>10 而不是 12</strong>。给数字补前导零对齐是个危险习惯。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">十进制转 k 进制：除基取余，倒序读</h3>
                        <CodeBlock>{`// 十进制 → k 进制（k ≤ 36，用 0-9A-Z 表示）
string toBase(int n, int k) {
    if (n == 0) return "0";                 // ← 别漏这个边界
    string s;
    while (n > 0) {
        int digit = n % k;
        s += (digit < 10) ? ('0' + digit) : ('A' + digit - 10);
        n /= k;
    }
    reverse(s.begin(), s.end());            // 余数是倒着出来的
    return s;
}`}</CodeBlock>
                        <Callout icon={Calculator} title="为什么要倒序" tone="blue">
                            第一次取余得到的是<strong>最低位</strong>（权重 k⁰），
                            最后一次得到最高位。所以收集顺序和书写顺序正好相反，必须 reverse。
                            <br /><br />
                            手算 100 转八进制：100 ÷ 8 = 12 余 <strong>4</strong>；
                            12 ÷ 8 = 1 余 <strong>4</strong>；1 ÷ 8 = 0 余 <strong>1</strong>。
                            倒序读得 <code className="font-mono font-bold">144</code>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">k 进制转十进制：按权展开</h3>
                        <CodeBlock>{`// k 进制字符串 → 十进制
long long fromBase(const string& s, int k) {
    long long n = 0;
    for (char c : s) {
        int digit = (c >= '0' && c <= '9') ? (c - '0') : (toupper(c) - 'A' + 10);
        n = n * k + digit;              // 秦九韶法：每次乘基再加当前位
    }
    return n;
}`}</CodeBlock>
                        <Callout icon={Binary} title="二进制与十六进制可以直接换" tone="amber">
                            因为 16 = 2⁴，<strong>每 4 个二进制位正好对应 1 个十六进制位</strong>。
                            <br /><br />
                            <code className="font-mono">11111111</code> 分成 <code className="font-mono">1111</code> 和
                            <code className="font-mono">1111</code>，各是 F，所以是 <code className="font-mono font-bold">FF</code>。
                            不需要先转十进制。同理 8 = 2³，每 3 位对应 1 个八进制位。
                            <br /><br />
                            这是手算题的快捷方式，考试很常用。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <BitLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">x &amp; (x−1) 的原理</h3>
                        <Callout icon={ToggleLeft} title="为什么它能去掉最低位的 1" tone="blue">
                            设 x 的二进制最右边那个 1 在第 k 位，那么 x 的形式是
                            <code className="font-mono">…1 0000</code>（k 个 0）。
                            <br /><br />
                            x − 1 会把那个 1 借走变成 0，同时低位全部变 1：
                            <code className="font-mono">…0 1111</code>。
                            <br /><br />
                            两者相与：高位不变（都相同），第 k 位是 1&amp;0 = 0，低位是 0&amp;1 = 0。
                            <strong>结果就是把最低位的 1 清掉了</strong>。
                            <br /><br />
                            实例：12 = <code className="font-mono">1100</code>，11 = <code className="font-mono">1011</code>，
                            相与得 <code className="font-mono">1000</code> = 8。✓
                        </Callout>
                        <CompareTable
                            headers={['用途', '写法', '说明']}
                            rows={[
                                ['数二进制里有几个 1', 'while(x) { x &= x-1; cnt++; }', '循环次数 = 1 的个数，比逐位检查快'],
                                ['判断是不是 2 的幂', 'x > 0 && (x & (x-1)) == 0', '2 的幂只有一个 1，去掉后就是 0'],
                                ['枚举一个集合的所有子集', 'for(s = full; ; s = (s-1) & full)', '状态压缩题的常用技巧'],
                            ]}
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">置位、清位、翻转</h3>
                        <CodeBlock>{`// 把第 k 位置成 1
x |= (1 << k);

// 把第 k 位清成 0
x &= ~(1 << k);

// 翻转第 k 位
x ^= (1 << k);

// 取出第 k 位（结果是 0 或 1）
int bit = (x >> k) & 1;

// 注意 k 达到 31 时要用 1LL << k，否则 int 溢出
long long mask = 1LL << 40;`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="1 << 31 是未定义行为" tone="rose">
                            int 是 32 位有符号数，最高位是符号位。
                            <code className="font-mono">1 &lt;&lt; 31</code> 会移进符号位，是<strong>未定义行为</strong>；
                            <code className="font-mono">1 &lt;&lt; 32</code> 更是完全无意义。
                            <br /><br />
                            凡是位数可能超过 30，一律写 <code className="font-mono font-bold">1LL &lt;&lt; k</code>。
                            这在状态压缩题里是高频错误。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">补码：负数怎么存</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            计算机用<strong>补码</strong>表示有符号整数。求 −x 的补码只有两步：
                            <strong>各位取反，然后加 1</strong>。
                        </p>
                        <CompareTable
                            headers={['数值', '8 位补码', '怎么来的']}
                            rows={[
                                ['5', '00000101', '直接写'],
                                ['−5', '11111011', '00000101 取反得 11111010，加 1 得 11111011'],
                                ['−1', '11111111', '全 1'],
                                ['−128', '10000000', '8 位能表示的最小值'],
                                ['127', '01111111', '8 位能表示的最大值'],
                            ]}
                        />
                        <Callout icon={Binary} title="补码的好处：减法变加法" tone="blue">
                            用补码之后，<code className="font-mono">a − b</code> 可以直接算成
                            <code className="font-mono">a + (−b 的补码)</code>，
                            <strong>硬件只需要一套加法电路</strong>。
                            <br /><br />
                            另一个副产品：<code className="font-mono font-bold">−x == ~x + 1</code>。
                            所以上一节 <code className="font-mono">x &amp; (−x)</code> 也可以写成
                            <code className="font-mono">x &amp; (~x + 1)</code>，两者完全等价。
                        </Callout>
                        <Callout icon={AlertTriangle} title="取值范围不对称" tone="amber">
                            n 位有符号数的范围是 <strong>−2<sup>n−1</sup> 到 2<sup>n−1</sup>−1</strong>。
                            8 位是 −128 到 127——<strong>负数一侧多一个</strong>。
                            <br /><br />
                            后果之一：<code className="font-mono">abs(INT_MIN)</code> 会溢出，
                            因为 +2147483648 表示不出来。这是个真实存在的坑。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">位运算的优先级陷阱</h3>
                        <Callout icon={AlertTriangle} title="两个必须记住的错误写法" tone="rose">
                            <strong>① <code className="font-mono">x &amp; 1 == 0</code></strong>
                            <br />
                            <code className="font-mono">==</code> 的优先级<strong>高于</strong> <code className="font-mono">&amp;</code>，
                            所以它被解析成 <code className="font-mono">x &amp; (1 == 0)</code> = <code className="font-mono">x &amp; 0</code> = <strong>0，永远为假</strong>。
                            <br />正确写法：<code className="font-mono font-bold">(x &amp; 1) == 0</code>。
                            <br /><br />
                            <strong>② <code className="font-mono">1 &lt;&lt; 2 + 3</code></strong>
                            <br />
                            <code className="font-mono">+</code> 的优先级<strong>高于</strong> <code className="font-mono">&lt;&lt;</code>，
                            所以是 <code className="font-mono">1 &lt;&lt; 5</code> = <strong>32</strong>，
                            而不是 <code className="font-mono">(1&lt;&lt;2)+3</code> = 7。
                            <br /><br />
                            <strong>结论：位运算一律加括号。</strong>
                            这不是谨慎，是必要——位运算符的优先级低得反直觉。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="表达式 1 << 2 + 3 的值是多少？"
                            options={['7', '32', '12', '编译错误']}
                            correctIndex={1}
                            explanation="加法的优先级高于左移，所以先算 2 + 3 = 5，再算 1 << 5 = 32。如果想要 (1<<2)+3 = 7，必须自己加括号。位运算符（& | ^ << >>）的优先级在 C++ 里普遍低于算术和比较运算符，这与大多数人的直觉相反——所以位运算一律加括号是唯一可靠的做法。"
                            misconception="容易按「先看到的先算」或者按数学直觉推断。C++ 的运算符优先级表里，<< 排在 + 之后，& 甚至排在 == 之后。"
                        />
                        <MiniQuiz items={[{
                            question: 'x & (x-1) 的作用是什么？',
                            answer: '去掉二进制里最低位的那个 1',
                            reason: 'x-1 把最低位的 1 借走变 0、其后低位全变 1，相与后该位及以下全为 0。反复做直到 x 为 0，次数就是 1 的个数；一次做完等于 0 则说明 x 是 2 的幂。',
                        }, {
                            question: '写 if (x & 1 == 0) 有什么问题？',
                            answer: '== 优先级高于 &，条件恒为假',
                            reason: '被解析成 x & (1 == 0) 即 x & 0，结果永远是 0。必须写 (x & 1) == 0。位运算一律加括号。',
                        }, {
                            question: '−5 的 8 位补码是什么？怎么求？',
                            answer: '11111011；取反加一',
                            reason: '5 是 00000101，各位取反得 11111010，加 1 得 11111011。补码的好处是减法可以用加法电路完成，且 −x == ~x + 1。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '实现十进制与任意进制（2~16）的互转，测试 255→FF、100→144（八进制）、0→0 这几个边界。',
                                '手算 11111111 转十六进制，用「每 4 位一组」的方法，验证是 FF。',
                                '实现取位、置位、清位、翻转四个操作，用实验台的数值逐个核对。',
                                '用 while(x) { x &= x-1; cnt++; } 数 1 的个数，测试 12（2 个）、255（8 个）。',
                                '写代码验证 x & (-x) 与 x & (~x + 1) 结果相同。',
                                '亲自跑一遍 cout << (1 << 2 + 3) 和 cout << ((1 << 2) + 3)，确认是 32 和 7。',
                                '写 if (x & 1 == 0) 和 if ((x & 1) == 0)，用 x = 4 测试，观察前者永远走 else。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道状态压缩题：有 n 个物品（n ≤ 20），要枚举它们的所有子集，对每个子集算一个值。请说明怎么用一个整数表示子集、怎么枚举全部子集、以及怎么判断第 i 个物品在不在当前子集里。另外，n = 20 时一共要枚举多少个子集？`}
                            hint={`一个 int 有 32 位，每位可以表示一个物品「选或不选」。`}
                            answer={`用一个整数 s 的第 i 位表示「第 i 个物品选没选」：第 i 位是 1 表示选了，0 表示没选。这样一个整数就唯一对应一个子集。

枚举全部子集：for (int s = 0; s < (1 << n); s++)。因为 n 个物品每个有选或不选两种可能，共 2^n 个子集，而 0 到 2^n − 1 这些整数正好一一对应。n = 20 时是 2^20 = 1,048,576 个，约一百万，可以接受；如果每个子集内部还要 O(n) 遍历，总共 2×10⁷，仍然可行。

判断第 i 个物品在不在：if ((s >> i) & 1)，或者等价地 if (s & (1 << i))。前者把第 i 位移到最低位再取，后者用掩码去与，两种写法都常见。

几个必须注意的点：
一是 for 循环的上界写 (1 << n) 而不是 1 << n − 1——后者因为 − 的优先级高于 <<，会被解析成 1 << (n−1)，子集数直接少一半。这正是本课优先级陷阱的实战版本。
二是 n 接近或超过 31 时必须用 1LL << n，否则 int 溢出。n ≤ 20 时用 int 安全，但养成习惯更好。
三是遍历子集内的元素时，可以用 while (s) { int i = __builtin_ctz(s); /* 处理第 i 个 */ s &= s − 1; }，这样循环次数只等于子集大小而不是 n，比逐位检查快。这里用到的正是本课的 x & (x−1) 和 lowbit。

n = 20 是状态压缩的常见上界，因为 2^20 约一百万刚好可算；n = 25 就是 3×10⁷ 开始吃紧，n = 30 的 10⁹ 基本不可行。看到 n ≤ 20 这个范围就该想到状态压缩。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能手算二进制与十六进制互转，知道每 4 位对应 1 个十六进制位',
                                '我能说明 x & (x-1) 的作用和原理，并用它数 1 的个数、判断 2 的幂',
                                '我能识别位运算中的优先级陷阱，知道 x & 1 == 0 和 1 << 2 + 3 各错在哪',
                                '我能解释负数在补码下的表示，知道取反加一以及 −x == ~x + 1',
                                '我知道 1 << 31 是未定义行为，位数大时要写 1LL << k',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
