import React, { useMemo, useState } from 'react';
import { AlertTriangle, Hash, Layers, Trash2 } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '用下标代替比较' },
    { id: 2, title: '冲突与两种解法', category: '撞了怎么办' },
    { id: 3, title: '装载因子', category: '多满算满' },
    { id: 4, title: '删除的麻烦', category: '开放定址的坑' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const KEYS = [23, 13, 21, 14, 7, 1, 34];
const TABLE_SIZE = 11;

// 线性探测：撞了就往后挪一格，直到找到空位。返回每个 key 的落位与探测次数。
function linearProbe(keys, size) {
    const slots = new Array(size).fill(null);
    const trace = [];
    keys.forEach((key) => {
        const home = key % size;
        let probes = 1;
        let pos = home;
        while (slots[pos] !== null) {
            pos = (pos + 1) % size;
            probes += 1;
        }
        slots[pos] = key;
        trace.push({ key, home, pos, probes, moved: pos !== home });
    });
    return { slots, trace };
}

// 链地址：撞了就挂到同一个桶的链表后面。探测次数 = 在链上的位置。
function separateChaining(keys, size) {
    const buckets = Array.from({ length: size }, () => []);
    const trace = [];
    keys.forEach((key) => {
        const home = key % size;
        buckets[home].push(key);
        trace.push({ key, home, probes: buckets[home].length });
    });
    return { buckets, trace };
}

function CollisionLab() {
    const [method, setMethod] = useState('linear');
    const [count, setCount] = useState(KEYS.length);
    const keys = useMemo(() => KEYS.slice(0, count), [count]);

    const linear = useMemo(() => linearProbe(keys, TABLE_SIZE), [keys]);
    const chained = useMemo(() => separateChaining(keys, TABLE_SIZE), [keys]);
    const trace = method === 'linear' ? linear.trace : chained.trace;

    const totalProbes = trace.reduce((sum, item) => sum + item.probes, 0);
    const avgProbes = keys.length ? (totalProbes / keys.length).toFixed(2) : '0.00';
    const loadFactor = (keys.length / TABLE_SIZE).toFixed(2);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Hash className="text-amber-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">冲突处理对照台</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                同一组 key、同一个哈希函数 <code className="font-mono font-bold">h(k) = k % {TABLE_SIZE}</code>，
                两种冲突处理方式的落位和平均查找长度完全不同。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {[['linear', '线性探测（开放定址）'], ['chain', '链地址法']].map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={method === key}
                        onClick={() => setMethod(key)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${method === key
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-amber-200 hover:bg-amber-100'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <label htmlFor="hash-count" className="block text-sm font-black text-slate-700">
                已插入 {keys.length} 个 key：{keys.join('、') || '（无）'}
            </label>
            <input
                id="hash-count"
                type="range"
                min="0"
                max={KEYS.length}
                value={count}
                onChange={(event) => setCount(Number(event.target.value))}
                className="mt-2 w-full"
            />

            <div className="mt-5 overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-amber-100">
                <table className="w-full min-w-[26rem] text-left text-sm">
                    <thead className="text-slate-500">
                        <tr>
                            <th className="px-2 py-2 font-black">下标</th>
                            <th className="px-2 py-2 font-black">{method === 'linear' ? '存的 key' : '桶里的链'}</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono">
                        {Array.from({ length: TABLE_SIZE }, (_, index) => {
                            const cell = method === 'linear' ? linear.slots[index] : chained.buckets[index];
                            const filled = method === 'linear' ? cell !== null : cell.length > 0;
                            return (
                                <tr key={index} className="border-t border-slate-100">
                                    <td className="px-2 py-2 font-bold text-slate-400">{index}</td>
                                    <td className="px-2 py-2">
                                        {!filled && <span className="text-slate-300">—</span>}
                                        {filled && method === 'linear' && (
                                            <span className="rounded bg-amber-500 px-2 py-0.5 font-black text-white">{cell}</span>
                                        )}
                                        {filled && method === 'chain' && (
                                            <span className="flex flex-wrap items-center gap-1">
                                                {cell.map((key, position) => (
                                                    <React.Fragment key={key}>
                                                        {position > 0 && <span className="text-slate-400">→</span>}
                                                        <span className="rounded bg-amber-500 px-2 py-0.5 font-black text-white">{key}</span>
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">装载因子 α = n / m</div>
                    <div className="mt-1 text-2xl font-black text-amber-300">{loadFactor}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">总探测次数</div>
                    <div className="mt-1 text-2xl font-black text-slate-100">{totalProbes}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">平均查找长度 ASL</div>
                    <div className="mt-1 text-2xl font-black text-emerald-400">{avgProbes}</div>
                </div>
            </div>

            {trace.length > 0 && (
                <div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <h4 className="text-sm font-black text-slate-700">逐个插入的探测过程</h4>
                    <ul className="mt-3 space-y-1.5 font-mono text-sm">
                        {trace.map((item) => (
                            <li key={item.key} className="text-slate-600">
                                <span className="font-black text-slate-900">{item.key}</span>
                                {' → h = '}{item.key} % {TABLE_SIZE} = <span className="font-black">{item.home}</span>
                                {method === 'linear' && item.moved && (
                                    <span className="text-rose-600">，被占，往后挪到 {item.pos}</span>
                                )}
                                {method === 'linear' && !item.moved && <span className="text-emerald-600">，空位，直接放</span>}
                                {method === 'chain' && item.probes > 1 && (
                                    <span className="text-rose-600">，桶里已有 {item.probes - 1} 个，挂在第 {item.probes} 位</span>
                                )}
                                {method === 'chain' && item.probes === 1 && <span className="text-emerald-600">，空桶，直接放</span>}
                                <span className="ml-2 text-slate-400">（探测 {item.probes} 次）</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function Lesson4() {
    return (
        <CppLessonShell
            lessonNumber={4}
            lessonTitle="哈希表与冲突处理"
            lessonSubtitle="用下标直接定位，代价是必须处理撞车"
            accent="amber"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/3"
            nextPath="/lesson/7/5"
            prerequisites={['会取模运算 % 的性质', '知道数组随机访问是 O(1)', '了解链表的基本结构']}
            topSupport={<CppL7LessonSupport lessonId={4} />}
            bottomSupport={<CppL7LessonSupport lessonId={4} placement="bottom" />}
            hero={{
                title: '不比较，直接算出位置',
                description: '本课讲哈希表的基本原理、两种冲突处理方式的差别，以及装载因子如何影响性能。',
            }}
            goals={['能说明哈希表的基本原理', '能比较开放定址与链地址两种冲突处理', '能估算装载因子对性能的影响']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Hash} title="哈希表想解决什么" tone="blue">
                            前两课的 BST 查找要一路比较，复杂度 O(h)。哈希表换了个思路：
                            <strong>把 key 直接算成数组下标</strong>，一步到位，理想情况下是 O(1)——
                            不比较，直接算。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            最常用的哈希函数就是取模：<code className="font-mono font-bold">h(k) = k % m</code>，
                            其中 m 是表长。key 是 23、表长 11，那就存到下标 <code className="font-mono font-bold">23 % 11 = 1</code>。
                            查找时同样算一次，直接去下标 1 看。
                        </p>
                        <Callout icon={AlertTriangle} title="但这个想法有个硬伤" tone="rose">
                            key 的取值范围通常远大于表长。23 和 34 都会算到下标 1（
                            <code className="font-mono">23 % 11 = 1</code>，<code className="font-mono">34 % 11 = 1</code>）。
                            这叫<strong>冲突（collision）</strong>。冲突不是罕见异常，而是必然会发生——
                            所以哈希表的设计重点不是「避免冲突」，而是「冲突了怎么办」。
                        </Callout>
                        <Callout icon={Layers} title="表长为什么常取质数" tone="amber">
                            如果 m 取 12，而 key 恰好都是偶数，那么 <code className="font-mono">k % 12</code>
                            的结果也全是偶数——一半的格子永远用不上。取质数（如 11、13、97）能让余数分布更均匀。
                            这是考试里会问的一个小点。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <CollisionLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">线性探测：撞了就往后挪</h3>
                        <CodeBlock>{`const int M = 11;
int slot[M];            // -1 表示空
// 插入
void insert(int key) {
    int pos = key % M;
    while (slot[pos] != -1) pos = (pos + 1) % M;  // 往后找空位，注意绕回
    slot[pos] = key;
}
// 查找
bool find(int key) {
    int pos = key % M;
    while (slot[pos] != -1) {
        if (slot[pos] == key) return true;
        pos = (pos + 1) % M;
    }
    return false;       // 遇到空位就说明不存在
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="线性探测的聚集问题" tone="rose">
                            撞车的元素会挤在一起形成<strong>连续的一块</strong>。这块越长，
                            后面落到这块任意位置的 key 都得从头探测到块尾——一个冲突会拖累一片。
                            这叫「聚集（clustering）」，是线性探测的主要缺点。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">链地址法：每个格子挂一条链</h3>
                        <CodeBlock>{`// C++ 里直接用 vector 数组最省事
vector<int> bucket[M];

void insert(int key) {
    bucket[key % M].push_back(key);
}

bool find(int key) {
    for (int v : bucket[key % M])   // 只需扫这一个桶
        if (v == key) return true;
    return false;
}`}</CodeBlock>
                        <CompareTable
                            headers={['对比项', '线性探测（开放定址）', '链地址法']}
                            rows={[
                                ['冲突时', '往后找空位，元素挪出本位', '挂到本桶的链上，不影响其他桶'],
                                ['装载因子', '必须 < 1，通常控制在 0.7 以下', '可以 > 1'],
                                ['空间', '不需要额外指针，缓存友好', '每个节点要存指针'],
                                ['聚集', '会，一片冲突拖累一片', '不会，各桶互不干扰'],
                                ['删除', '麻烦，不能直接置空', '简单，从链上摘掉即可'],
                            ]}
                        />
                        <PredictCheck
                            className="mt-6"
                            prompt="表长 11、线性探测，已依次插入 23、13、21、14、7、1。现在插入 34（34 % 11 = 1），要探测几次才能找到空位？"
                            options={['1 次', '3 次', '4 次', '5 次']}
                            correctIndex={3}
                            explanation="此时的槽位是 1:23、2:13、3:14、4:1、7:7、10:21。插 34 时 home = 1，依次探测下标 1（被 23 占）、2（13）、3（14）、4（1），到下标 5 才空——共探测 5 次，落在下标 5。注意 key 1 的 home 也是 1，它自己就已经被挤到了下标 4，34 只能再往后。这就是聚集的代价：23、13、14、1 挤成连续一片，后来者必须绕过整块。"
                            misconception="容易只数「往后挪了几格」而漏掉起始那一次探测。ASL 统计的是比较次数，含首次那一下。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">装载因子 α = 元素数 n ÷ 表长 m</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            α 衡量的是「表有多满」。它是哈希表性能的关键指标——
                            <strong>复杂度不取决于 n，而取决于 α</strong>。
                        </p>
                        <CompareTable
                            headers={['装载因子 α', '线性探测的 ASL', '链地址法的 ASL', '说明']}
                            rows={[
                                ['0.1（很空）', '约 1.06', '约 1.05', '几乎不冲突，接近理想 O(1)'],
                                ['0.5（半满）', '约 1.5', '约 1.25', '仍然很快'],
                                ['0.9（很满）', '约 5.5', '约 1.45', '开放定址开始急剧恶化'],
                                ['接近 1', '趋于无穷', '约 1.5', '开放定址几乎找不到空位'],
                            ]}
                        />
                        <Callout icon={Layers} title="两条曲线的形状完全不同" tone="blue">
                            链地址法的 ASL 大约是 <strong>1 + α/2</strong>，随 α 线性缓慢上升。
                            线性探测的 ASL 大约是 <strong>(1 + 1/(1-α)²) / 2</strong>，
                            α 趋近 1 时分母趋近 0，代价爆炸。
                            这就是为什么用开放定址时必须<strong>提前扩容</strong>——
                            工程上通常 α 超过 0.7 就把表长翻倍并重新哈希（rehash）。
                        </Callout>
                        <Callout icon={AlertTriangle} title="最坏情况都是 O(n)" tone="rose">
                            如果所有 key 都算到同一个下标（比如哈希函数选得极差，或者数据被刻意构造），
                            链地址法退化成一条长度 n 的链、开放定址退化成一整片连续块，
                            两者查找都是 <strong>O(n)</strong>。所以「哈希表是 O(1)」严格说是
                            <strong>平均</strong>情况下的结论，前提是哈希函数把 key 打散得足够均匀。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            C++ 里的 <code className="font-mono font-bold">unordered_map</code> / <code className="font-mono font-bold">unordered_set</code>
                            用的就是链地址法，并且会自动 rehash 维持 α。它和 <code className="font-mono font-bold">map</code> 的区别值得记住：
                            <code className="font-mono">unordered_map</code> 平均 O(1) 但无序，
                            <code className="font-mono">map</code> 稳定 O(log n) 且按 key 有序。
                        </p>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">为什么开放定址的删除很麻烦</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            回看线性探测的查找代码：它<strong>遇到空位就断定「不存在」</strong>。
                            这个判断依赖一个前提——探测链上不能有空洞。
                        </p>
                        <Callout icon={Trash2} title="直接置空会切断探测链" tone="rose">
                            接上一节：23 在下标 1、13 在 2、14 在 3、34 在 4。
                            现在删掉 13，把下标 2 置空。这时查找 34：算出 home = 1，
                            下标 1 是 23 不匹配，往后到下标 2——<strong>空的</strong>，
                            于是函数返回「34 不存在」。但 34 明明还在下标 4。
                            <br /><br />
                            删除一个元素，导致另一个元素查不到了。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            标准解法是<strong>墓碑标记（tombstone）</strong>：删除时不置空，
                            而是标成一个特殊的「已删除」状态。查找遇到墓碑<strong>继续往后走</strong>，
                            插入则可以复用墓碑格子。
                        </p>
                        <CodeBlock>{`const int EMPTY = -1, DELETED = -2;
int slot[M];

void remove(int key) {
    int pos = key % M;
    while (slot[pos] != EMPTY) {
        if (slot[pos] == key) { slot[pos] = DELETED; return; }  // 立墓碑，不置空
        pos = (pos + 1) % M;
    }
}

bool find(int key) {
    int pos = key % M;
    while (slot[pos] != EMPTY) {       // 只有 EMPTY 才停，DELETED 要跳过
        if (slot[pos] == key) return true;
        pos = (pos + 1) % M;
    }
    return false;
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="墓碑也有代价" tone="amber">
                            墓碑占着位置但不存数据，删多了会让探测链越来越长——
                            表面上 α 不高，实际性能已经变差。所以墓碑积累到一定程度还得重建整张表。
                            <strong>链地址法完全没有这个问题</strong>，从链上摘掉节点就行，
                            这也是它在工程上更常用的原因之一。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '哈希表的查找最坏时间复杂度是？',
                            answer: 'O(n)',
                            reason: '当所有 key 都哈希到同一个位置时，链地址法退化成长度 n 的链、开放定址退化成一整片连续块，都要扫 n 次。O(1) 只是平均情况的结论。',
                        }, {
                            question: '开放定址法里删除元素为什么不能直接把格子置空？',
                            answer: '会切断后续元素的探测链',
                            reason: '查找靠「遇到空位就停」来判断不存在。中间挖一个空洞，会让原本挪到洞后面的元素被误判为不存在。要用墓碑标记代替置空。',
                        }, {
                            question: '装载因子 α = 0.9 时，线性探测和链地址法哪个明显更慢？',
                            answer: '线性探测',
                            reason: '线性探测的 ASL 约为 (1 + 1/(1-α)²)/2，α=0.9 时约 5.5；链地址法约 1 + α/2 = 1.45。α 越接近 1，开放定址恶化得越剧烈。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用表长 11、h(k) = k % 11，手推插入 23 13 21 14 7 1 34 的线性探测过程，再用上面的对照台核对。',
                                '同一组数据用链地址法重做一遍，计算两者的平均查找长度并比较。',
                                '实现带墓碑标记的线性探测删除，构造出「删一个导致另一个查不到」的场景验证墓碑确实修复了它。',
                                '把表长从 11 改成 12，观察全是偶数的 key 会怎么分布，验证「表长取质数」的道理。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="表长 7，哈希函数 h(k) = k % 7，用线性探测依次插入 8、15、22。三个 key 各落在哪个下标？此时的平均查找长度是多少？如果接着删除 15 并直接把格子置空，查找 22 会发生什么？"
                            hint="8 % 7、15 % 7、22 % 7 都等于 1——这是三个完全冲突的 key。"
                            answer="三者的 home 都是 1。8 放下标 1（探测 1 次）；15 撞 1，挪到 2（探测 2 次）；22 撞 1、撞 2，挪到 3（探测 3 次）。ASL = (1+2+3)/3 = 2。若删 15 后把下标 2 置空：查找 22 时算出 home=1，下标 1 是 8 不匹配，往后到下标 2 发现是空的，于是返回「不存在」——但 22 还在下标 3。这正是必须用墓碑标记的原因。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能手动模拟线性探测在冲突时的探测路径，并算出平均查找长度',
                                '我能说明为什么开放定址法的删除要用墓碑标记而不能直接置空',
                                '我能判断哈希表在什么情况下退化为 O(n)，并说明 O(1) 是平均情况的结论',
                                '我能比较线性探测与链地址法在装载因子升高时的表现差异',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
