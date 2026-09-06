import React, { useState } from 'react';
import { AlertTriangle, Divide, Filter, Zap } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '三个必会工具' },
    { id: 2, title: '两种筛法', category: '每个合数筛几次' },
    { id: 3, title: 'gcd 与分数', category: '辗转相除' },
    { id: 4, title: '快速幂', category: '把指数折半' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 实测数据：两种筛法在不同 n 下的标记次数。
// 关键发现：线性筛的标记次数恰好等于合数个数——每个合数只被筛了一次。
const SIEVE_DATA = [
    { n: 100, primes: 25, composites: 74, eratos: 104, linear: 74 },
    { n: 1000, primes: 168, composites: 831, eratos: 1411, linear: 831 },
    { n: 100000, primes: 9592, composites: 90407, eratos: 193078, linear: 90407 },
    { n: 1000000, primes: 78498, composites: 921501, eratos: 2122048, linear: 921501 },
];

function SieveLab() {
    const [index, setIndex] = useState(SIEVE_DATA.length - 1);
    const row = SIEVE_DATA[index];
    const ratio = (row.eratos / row.linear).toFixed(2);
    const maxOps = row.eratos;

    return (
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Filter className="text-orange-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">两种筛法的标记次数</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                下面的次数是<strong>真跑出来的</strong>。注意最右一栏：
                线性筛的标记次数<strong>恰好等于合数个数</strong>——这就是「每个合数只被筛一次」的证据。
            </p>

            <label htmlFor="sieve-n" className="block text-sm font-black text-slate-700">
                n = {row.n.toLocaleString('en-US')}
            </label>
            <input
                id="sieve-n"
                type="range" min="0" max={SIEVE_DATA.length - 1} step="1"
                value={index}
                onChange={(event) => setIndex(Number(event.target.value))}
                className="mt-2 w-full"
            />

            <div className="mt-5 space-y-3">
                {[
                    { label: '埃氏筛（埃拉托斯特尼筛）', ops: row.eratos, color: 'bg-orange-500' },
                    { label: '线性筛（欧拉筛）', ops: row.linear, color: 'bg-emerald-600' },
                ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white p-4 ring-1 ring-orange-100">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-sm font-black text-slate-800">{item.label}</span>
                            <span className="font-mono text-lg font-black text-slate-700">
                                {item.ops.toLocaleString('en-US')} 次标记
                            </span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.ops / maxOps) * 100}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">质数个数</div>
                    <div className="mt-1 font-mono text-xl font-black text-slate-100">{row.primes.toLocaleString('en-US')}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">合数个数（2..n 中）</div>
                    <div className="mt-1 font-mono text-xl font-black text-emerald-400">{row.composites.toLocaleString('en-US')}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">埃氏筛 ÷ 线性筛</div>
                    <div className="mt-1 font-mono text-xl font-black text-amber-300">{ratio} 倍</div>
                </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                线性筛标记 {row.linear.toLocaleString('en-US')} 次，合数正好 {row.composites.toLocaleString('en-US')} 个——
                <strong>一个不多一个不少</strong>。埃氏筛则多标了 {(row.eratos - row.linear).toLocaleString('en-US')} 次，
                那些是被多个质因子重复筛到的合数（比如 12 会被 2 和 3 各筛一次）。
            </p>
        </div>
    );
}

export default function Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="数论：质数、gcd 与快速幂"
            lessonSubtitle="三个工具，八级数学题几乎都要用到"
            accent="orange"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/9"
            nextPath="/lesson/8/11"
            prerequisites={['会取模运算', '完成第 2 课的组合数取模', '会写递归函数']}
            topSupport={<CppL8LessonSupport lessonId={10} />}
            bottomSupport={<CppL8LessonSupport lessonId={10} placement="bottom" />}
            hero={{
                title: '判一个数是不是质数，别用 O(n)',
                description: '本课讲埃氏筛与线性筛的差别、辗转相除法的原理，以及快速幂如何把 O(n) 降到 O(log n)。',
            }}
            goals={['能实现素数筛与质因数分解', '能用辗转相除求 gcd', '能写出快速幂']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Divide} title="先说单个数的质数判定" tone="blue">
                            判断 n 是不是质数，不需要试到 n−1，<strong>只试到 √n 就够</strong>。
                            <br /><br />
                            道理：如果 n = a × b 且 a ≤ b，那么必然 a ≤ √n。
                            所以只要在 2..√n 里找不到因子，就说明 n 是质数。
                            复杂度从 O(n) 降到 <strong>O(√n)</strong>。
                        </Callout>
                        <CodeBlock>{`bool isPrime(long long n) {
    if (n < 2) return false;                  // 0 和 1 都不是质数
    for (long long i = 2; i * i <= n; i++)    // 用 i*i <= n 而不是 i <= sqrt(n)
        if (n % i == 0) return false;         // 避免浮点误差
    return true;
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="两个细节" tone="amber">
                            ① 写 <code className="font-mono font-bold">i * i &lt;= n</code> 而不是
                            <code className="font-mono">i &lt;= sqrt(n)</code>——sqrt 返回浮点数，
                            大数时可能有精度误差导致漏判。
                            <br />② <strong>1 不是质数</strong>，0 和负数也不是。这个边界几乎每次都有人漏。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">但要判「很多个数」就不能一个个试</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            如果要求出 1..10<sup>6</sup> 里所有的质数，逐个用 O(√n) 判定是
                            10<sup>6</sup> × 10<sup>3</sup> = 10<sup>9</sup>——超时。
                            <strong>筛法</strong>能一次把全部质数求出来，这是下一节的内容。
                        </p>
                    </>
                ),
                2: (
                    <>
                        <SieveLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">埃氏筛：从质数出发划掉它的倍数</h3>
                        <CodeBlock>{`bool isComposite[N];
vector<int> primes;

void eratosthenes(int n) {
    for (int i = 2; i <= n; i++) {
        if (!isComposite[i]) {
            primes.push_back(i);
            // 从 i*i 开始：比 i*i 小的倍数已被更小的质因子筛过
            for (long long j = (long long)i * i; j <= n; j += i)
                isComposite[j] = true;
        }
    }
}
// 复杂度 O(n log log n)，实际上非常快`}</CodeBlock>
                        <Callout icon={Filter} title="为什么从 i*i 开始而不是 2*i" tone="blue">
                            考虑 i = 5。5×2 = 10 已经被 2 筛过了，5×3 = 15 被 3 筛过了，
                            5×4 = 20 被 2 筛过了——<strong>第一个还没被筛过的是 5×5 = 25</strong>。
                            <br /><br />
                            一般地，i 的倍数 i×k 若 k &lt; i，则 k 有一个比 i 小的质因子，
                            早就被那个质因子筛掉了。所以从 i×i 起筛就够，这是个不小的优化。
                            <br /><br />
                            注意 <code className="font-mono">i * i</code> 在 i 接近 10<sup>6</sup> 时会超 int，
                            要转成 long long。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">埃氏筛的浪费：同一个数被筛多次</h3>
                        <Callout icon={AlertTriangle} title="12 会被筛两次" tone="rose">
                            12 = 2 × 6 = 3 × 4。当 i = 2 时它被标记一次（j = 12），
                            当 i = 3 时又被标记一次（j = 12）。
                            <br /><br />
                            上面实验台的数据：n = 10<sup>6</sup> 时埃氏筛标记了 2,122,048 次，
                            而合数只有 921,501 个——<strong>多做了 130 万次重复标记</strong>。
                            这就是它比 O(n) 慢的原因（log log n 那个因子）。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">线性筛：每个合数只筛一次</h3>
                        <CodeBlock>{`bool isComposite[N];
vector<int> primes;

void linearSieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (!isComposite[i]) primes.push_back(i);
        for (int p : primes) {
            if ((long long)i * p > n) break;
            isComposite[i * p] = true;
            if (i % p == 0) break;      // ← 关键的这一行
        }
    }
}
// 复杂度 O(n)：实测标记次数恰好等于合数个数`}</CodeBlock>
                        <Callout icon={Filter} title="那句 if (i % p == 0) break 是全部的关键" tone="blue">
                            线性筛保证<strong>每个合数只被它的最小质因子筛掉一次</strong>。
                            <br /><br />
                            当 <code className="font-mono">i % p == 0</code> 时，p 就是 i 的最小质因子。
                            此时如果继续用下一个更大的质数 p′ 去筛 i × p′，
                            那么 i × p′ 的最小质因子其实是 p（因为 p 整除 i），
                            <strong>这个数应该留给「i × p′ / p」那一轮去筛</strong>——现在筛就重复了。
                            所以必须 break。
                            <br /><br />
                            实测印证：n = 10<sup>6</sup> 时标记次数 921,501 = 合数个数 921,501，
                            <strong>一次不多</strong>。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="n = 10⁶ 时，2..n 中有 921,501 个合数。线性筛一共执行了多少次标记操作？"
                            options={['约 78 万次', '恰好 921,501 次', '约 212 万次', '约 10⁶ 次']}
                            correctIndex={1}
                            explanation="线性筛的设计目标就是「每个合数被标记恰好一次」，所以标记次数严格等于合数个数 921,501。这正是它叫「线性」筛的原因——总操作数与 n 成正比。相比之下埃氏筛标记了 2,122,048 次（约 2.3 倍），因为像 12 这样有多个质因子的数会被反复标记。78,498 是质数的个数，不是标记次数。"
                            misconception="容易把「质数个数」和「标记次数」搞混。筛法标记的是合数，质数是那些从未被标记的数。"
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">质因数分解</h3>
                        <CodeBlock>{`// 分解单个数：不断除掉最小的因子
void factorize(long long n) {
    for (long long i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            cout << i << " ";
            n /= i;
        }
    }
    if (n > 1) cout << n;      // ← 剩下的这个必然是质数，别漏
}
// 例：360 → 2 2 2 3 3 5`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="最后那句 if (n > 1) 不能省" tone="rose">
                            循环只试到 √n。如果 n 本身含有一个<strong>大于 √原n 的质因子</strong>，
                            循环结束后它还留在 n 里。
                            <br /><br />
                            比如 n = 14：i = 2 时除掉得 n = 7，然后 i = 3 时 3×3 = 9 &gt; 7 循环结束——
                            此时 n = 7 还没输出。漏掉这句，14 就只分解出一个 2。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">辗转相除法（欧几里得算法）</h3>
                        <CodeBlock>{`int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
// 迭代版
int gcd(int a, int b) {
    while (b) { int t = a % b; a = b; b = t; }
    return a;
}`}</CodeBlock>
                        <Callout icon={Divide} title="为什么 gcd(a,b) = gcd(b, a%b)" tone="blue">
                            设 d 是 a 和 b 的公约数。因为 a % b = a − ⌊a/b⌋ × b，
                            而 d 同时整除 a 和 b，所以 d 也整除 a % b。
                            <br /><br />
                            反过来，若 d 整除 b 和 a % b，则 d 也整除 a。
                            于是 <strong>{'{a, b}'} 的公约数集合与 {'{b, a%b}'} 的完全相同</strong>，
                            最大公约数当然也相等。
                            <br /><br />
                            每次 b 都变成 a % b，严格变小，所以一定会终止。
                            <strong>终止条件是 b == 0，此时 gcd 就是 a</strong>——
                            因为任何数都能整除 0。
                        </Callout>
                        <CompareTable
                            headers={['步骤', 'a', 'b', 'a % b']}
                            rows={[
                                ['初始', '48', '18', '12'],
                                ['第 1 步', '18', '12', '6'],
                                ['第 2 步', '12', '6', '0'],
                                ['第 3 步', '6', '0', '— 终止，gcd = 6'],
                            ]}
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">用 gcd 化简分数</h3>
                        <CodeBlock>{`// 把 num/den 化到最简
int g = gcd(abs(num), abs(den));
num /= g;
den /= g;
if (den < 0) { num = -num; den = -den; }   // 约定分母为正

// lcm（最小公倍数）：先除后乘，避免溢出
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;              // ✓ 不是 a * b / gcd
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="lcm 要先除后乘" tone="rose">
                            <code className="font-mono">a * b / gcd(a,b)</code> 在数学上没错，
                            但 <strong>a × b 可能先溢出</strong>。
                            <br /><br />
                            比如 a = b = 10<sup>9</sup>，a × b = 10<sup>18</sup> 已接近 long long 上限；
                            若 a = b = 4×10<sup>9</sup> 就直接溢出。
                            <br /><br />
                            写成 <code className="font-mono font-bold">a / gcd(a,b) * b</code>：
                            因为 gcd 一定整除 a，先除不会有余数损失，而中间值小得多。
                            这个技巧和第 2 课「组合数边乘边除」是同一个思路。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">快速幂：把指数折半</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            要算 a<sup>b</sup> mod p。朴素做法乘 b 次，b = 10<sup>9</sup> 时必然超时。
                            快速幂利用一个恒等式把它降到 O(log b)：
                        </p>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center font-mono text-sm font-black text-orange-300">
                            a<sup>b</sup> = (a<sup>b/2</sup>)²  当 b 是偶数
                            <br />a<sup>b</sup> = a × (a<sup>(b−1)/2</sup>)²  当 b 是奇数
                        </div>
                        <CodeBlock>{`long long qpow(long long a, long long b, long long p) {
    long long res = 1;
    a %= p;                       // 先取模，防止 a 本身很大
    while (b > 0) {
        if (b & 1) res = res * a % p;    // 当前位是 1 就乘上
        a = a * a % p;                    // 底数平方
        b >>= 1;                          // 指数右移一位
    }
    return res;
}`}</CodeBlock>
                        <Callout icon={Zap} title="它其实是在按二进制拆指数" tone="blue">
                            100 的二进制是 1100100，也就是 100 = 64 + 32 + 4。
                            于是 a<sup>100</sup> = a<sup>64</sup> × a<sup>32</sup> × a<sup>4</sup>。
                            <br /><br />
                            循环里 <code className="font-mono">a = a * a % p</code> 依次得到
                            a<sup>1</sup>、a<sup>2</sup>、a<sup>4</sup>、a<sup>8</sup>……
                            而 <code className="font-mono">if (b &amp; 1)</code> 决定这一位要不要乘进答案。
                            <br /><br />
                            所以循环次数就是 b 的二进制位数，即 <strong>O(log b)</strong>。
                            实测 2<sup>100</sup> mod (10<sup>9</sup>+7) 只需 <strong>7 次</strong>迭代
                            （log₂100 ≈ 6.64），而朴素做法要 100 次乘法。
                        </Callout>
                        <Callout icon={AlertTriangle} title="乘法前必须确认不溢出" tone="rose">
                            <code className="font-mono">res * a</code> 时两者都小于 p。
                            若 p = 10<sup>9</sup>+7，乘积接近 10<sup>18</sup>——
                            <strong>刚好在 long long 内（上限 9.22×10<sup>18</sup>）</strong>。
                            <br /><br />
                            但如果 p 大到 10<sup>18</sup> 量级，两个模内的数相乘就会溢出，
                            需要用 __int128 或龟速乘。这也是为什么题目爱用 10<sup>9</sup>+7 做模数——
                            <strong>它的平方刚好安全</strong>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">快速幂的一个重要用途：求逆元</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            第 2 课说过「取模对除法不成立」。要在模意义下做除法，
                            得乘以<strong>逆元</strong>。当 p 是质数时，费马小定理给出：
                        </p>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center font-mono text-sm font-black text-emerald-300">
                            a<sup>−1</sup> ≡ a<sup>p−2</sup> (mod p) （p 为质数且 a 不是 p 的倍数）
                        </div>
                        <CodeBlock>{`// 在模 p 意义下计算 a / b
long long inv(long long b, long long p) { return qpow(b, p - 2, p); }
long long divide(long long a, long long b, long long p) {
    return a % p * inv(b, p) % p;
}

// 于是组合数也能用阶乘法求了（第 2 课那条路走通了）
// C(n,m) = n! * inv(m!) * inv((n-m)!) % p`}</CodeBlock>
                        <Callout icon={Zap} title="这解开了第 2 课留的口子" tone="amber">
                            第 2 课说组合数在取模场景下不能直接用阶乘除法，只能递推打表，
                            而打表在 n 很大时会爆内存。
                            <br /><br />
                            有了快速幂求逆元，就可以<strong>预处理阶乘 O(n)，单次查询 O(log p)</strong>——
                            n 到 10<sup>6</sup> 也没问题，空间只要 O(n)。这是竞赛里求组合数的标准做法。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '线性筛为什么每个合数只被筛一次？',
                            answer: 'if (i % p == 0) break 保证只用最小质因子筛',
                            reason: '当 p 整除 i 时，p 是 i 的最小质因子。继续用更大的质数 p′ 筛 i×p′ 会重复，因为那个数的最小质因子是 p，应留给别的轮次。实测 n=10⁶ 时标记次数 921501 恰等于合数个数。',
                        }, {
                            question: 'gcd 递归的终止条件是什么？为什么？',
                            answer: 'b == 0，此时返回 a',
                            reason: '任何数都能整除 0，所以 gcd(a, 0) = a。每次 b 变成 a%b 严格减小，必然到 0。',
                        }, {
                            question: '快速幂算 a^b mod p 的复杂度是多少？',
                            answer: 'O(log b)',
                            reason: '每轮把指数右移一位，循环次数等于 b 的二进制位数。b=100 时只需 7 次迭代，而朴素做法要 100 次乘法。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '实现 O(√n) 的质数判定，测试 1、2、0、−5 这些边界。',
                                '实现埃氏筛和线性筛，各加一个标记计数器，跑 n = 10⁶，对比 212 万 vs 92 万。',
                                '统计线性筛的标记次数是否恰好等于合数个数（应为 921501）。',
                                '实现质因数分解，测试 360、14、以及一个大质数，确认最后那句 if (n > 1) 生效。',
                                '实现 gcd，手推 gcd(48,18) 的每一步；再实现 lcm，用 a=b=10⁹ 验证先除后乘不溢出。',
                                '实现快速幂，加一个迭代计数器，验证 2^100 只迭代 7 次；再用它求逆元算 C(10,3) mod (10⁹+7)。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：给定 n（n ≤ 10⁵）个正整数，每个数不超过 10⁶。求这 n 个数的最大公约数，以及它们的最小公倍数对 10⁹+7 取模的结果。请说明实现方案，并指出最小公倍数这一问的坑在哪。`}
                            hint={`多个数的 gcd 可以两两归并。但 lcm 取模之后还能继续做 lcm 吗？`}
                            answer={`最大公约数很简单：gcd 满足结合律，从第一个数开始依次和后面的数求 gcd 即可。g = a[0]，然后 g = gcd(g, a[i])。复杂度 O(n log V)，其中 V 是数值上界。一个小优化是遇到 g == 1 可以直接跳出——1 和任何数的 gcd 都是 1，后面不用再算。

最小公倍数这一问有个隐蔽的坑：lcm 的公式是 a / gcd(a,b) * b，其中的除法是真除法。但一旦对 10⁹+7 取了模，累积值就不再是真实的 lcm 了，后续再拿它去求 gcd 就完全错了——因为取模破坏了整除关系。

正确做法是绕开「累积 lcm」这条路，改用质因数分解：n 个数的 lcm，等于每个质因子取所有数中的最高次幂再相乘。具体步骤是先用线性筛预处理 10⁶ 以内的最小质因子，然后对每个数做分解（借助最小质因子表，单次分解只要 O(log V)），用一个数组记录每个质因子出现过的最大指数。最后把所有 p^maxExp 用快速幂算出来并连乘取模。

复杂度是 O(V) 筛 + O(n log V) 分解 + O(π(V) log) 求幂，完全可行。

这道题正好把本课三个工具串起来了：线性筛用来预处理最小质因子表，质因数分解用来取每个质因子的最高次幂，快速幂用来在取模下算 p^maxExp。而它的核心教训是：取模会破坏整除和比较关系，凡是后续还要做除法、gcd、大小比较的中间量，都不能提前取模。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明线性筛为什么每个合数只被筛一次，以及那句 break 的作用',
                                '我能解释 gcd 递归的终止条件为什么是 b == 0',
                                '我能估算快速幂的 O(log b) 复杂度，并说清它是在按二进制拆指数',
                                '我知道 lcm 要先除后乘防溢出，以及为什么 10⁹+7 是常用模数',
                                '我知道取模会破坏整除关系，需要做除法的中间量不能提前取模',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
