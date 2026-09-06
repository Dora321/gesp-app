import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowDownUp, Scissors, Sprout } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '有序的树' },
    { id: 2, title: '查找与插入', category: '一路比较一路走' },
    { id: 3, title: '退化与树高', category: '为什么是 O(h)' },
    { id: 4, title: '删除的三种情况', category: '最难的那一步' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const PRESETS = [
    { id: 'balanced', label: '较平衡：50 30 70 20 40 60 80', values: [50, 30, 70, 20, 40, 60, 80] },
    { id: 'sorted', label: '升序插入：20 30 40 50 60 70 80', values: [20, 30, 40, 50, 60, 70, 80] },
    { id: 'desc', label: '降序插入：80 70 60 50 40 30 20', values: [80, 70, 60, 50, 40, 30, 20] },
    { id: 'zigzag', label: '锯齿：50 20 80 30 70 40 60', values: [50, 20, 80, 30, 70, 40, 60] },
];

// 按 BST 规则逐个插入，返回带层号和路径的节点表。
// 不用真的建指针树——这里只关心形状，用 { value, depth, path } 就够画图了。
function buildBst(values) {
    const nodes = [];
    values.forEach((value) => {
        let depth = 0;
        const path = [];
        let index = nodes.findIndex((node) => node.isRoot);
        if (index === -1) {
            nodes.push({ value, depth: 0, isRoot: true, left: null, right: null, path: [] });
            return;
        }
        // 沿树往下找空位，记录比较路径
        let current = nodes[index];
        for (;;) {
            path.push(current.value);
            depth += 1;
            const goLeft = value < current.value;
            const childValue = goLeft ? current.left : current.right;
            if (childValue === null) {
                if (goLeft) current.left = value;
                else current.right = value;
                nodes.push({ value, depth, isRoot: false, left: null, right: null, path });
                return;
            }
            current = nodes.find((node) => node.value === childValue);
        }
    });
    return nodes;
}

function BstShapeLab() {
    const [presetId, setPresetId] = useState('balanced');
    const preset = PRESETS.find((item) => item.id === presetId) || PRESETS[0];
    const nodes = useMemo(() => buildBst(preset.values), [preset]);

    const height = Math.max(...nodes.map((node) => node.depth)) + 1;
    const byDepth = useMemo(() => {
        const rows = [];
        nodes.forEach((node) => {
            if (!rows[node.depth]) rows[node.depth] = [];
            rows[node.depth].push(node);
        });
        return rows;
    }, [nodes]);

    // 最坏查找要比较的次数就等于树高。平衡时约 log₂n，退化时等于 n。
    const idealHeight = Math.ceil(Math.log2(nodes.length + 1));
    const degenerate = height >= nodes.length;

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Sprout className="text-emerald-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">插入顺序决定树的形状</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                同样的 7 个数，换一个插入顺序，树高能从 3 变成 7。
                <strong>BST 的查找复杂度取决于树高，而树高取决于插入顺序。</strong>
            </p>

            <label htmlFor="bst-preset" className="block text-sm font-black text-slate-700">选一个插入序列</label>
            <select
                id="bst-preset"
                value={presetId}
                onChange={(event) => setPresetId(event.target.value)}
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"
            >
                {PRESETS.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                ))}
            </select>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <div className="min-w-[18rem] space-y-2">
                        {byDepth.map((row, depth) => (
                            <div key={depth} className="flex items-center gap-2">
                                <span className="w-14 shrink-0 text-xs font-black text-slate-400">
                                    第 {depth + 1} 层
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {row.map((node) => (
                                        <span
                                            key={node.value}
                                            className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-emerald-600 px-2 text-sm font-black text-white"
                                            title={node.path.length ? `插入路径：${node.path.join(' → ')} → ${node.value}` : '根节点'}
                                        >
                                            {node.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">节点数 n</div>
                    <div className="mt-1 text-2xl font-black text-slate-100">{nodes.length}</div>

                    <div className="mt-4 text-xs font-bold text-slate-400">树高 h（= 最坏查找比较次数）</div>
                    <div className={`mt-1 text-3xl font-black ${degenerate ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {height}
                    </div>

                    <div className="mt-4 text-xs font-bold text-slate-400">理想平衡时的树高 ⌈log₂(n+1)⌉</div>
                    <div className="mt-1 text-2xl font-black text-amber-300">{idealHeight}</div>

                    <p className="mt-5 border-t border-slate-700 pt-4 text-sm font-semibold leading-6 text-slate-300">
                        {degenerate
                            ? '这棵树已经退化成一条链：每个节点只有一个孩子，查找要一路走到底，复杂度是 O(n)，和在数组里顺序查找没有区别。'
                            : `树高 ${height} 接近理想值 ${idealHeight}，查找大约只要比较 ${height} 次，这才是 BST 值得用的状态。`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Lesson3() {
    return (
        <CppLessonShell
            lessonNumber={3}
            lessonTitle="二叉排序树与平衡"
            lessonSubtitle="查找是 O(h) 不是 O(log n)——这两个字母的差别就是这一课"
            accent="emerald"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/2"
            nextPath="/lesson/7/4"
            prerequisites={['会二叉树的三种遍历', '知道中序遍历 BST 得到升序序列', '会写递归函数']}
            topSupport={<CppL7LessonSupport lessonId={3} />}
            bottomSupport={<CppL7LessonSupport lessonId={3} placement="bottom" />}
            hero={{
                title: '有序性带来的便利，和它的代价',
                description: '本课讲 BST 的查找、插入、删除三种操作，以及考试最爱考的一点：为什么复杂度要写成 O(h) 而不是 O(log n)。',
            }}
            goals={['能说明 BST 的有序性质', '能实现查找、插入与删除', '能解释退化为链表时复杂度的变化']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Sprout} title="BST 的定义只有一句话" tone="blue">
                            对树中<strong>任意</strong>一个节点：它左子树里的所有值都比它小，右子树里的所有值都比它大。
                            注意是「所有」，不是「左孩子和右孩子」——这是判断合法 BST 时最常踩的坑。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            这条性质带来一个直接推论：<strong>对 BST 做中序遍历，输出一定是严格升序的</strong>。
                            反过来也成立，所以「中序遍历检查是否升序」是验证 BST 最简洁的写法。
                        </p>
                        <Callout icon={AlertTriangle} title="一个经典的错误判断法" tone="rose">
                            只检查「每个节点 &gt; 左孩子且 &lt; 右孩子」是不够的。看这棵树：根 10，左孩子 5，
                            5 的右孩子是 <strong>12</strong>。局部看每一对父子关系都对，但 12 在根的左子树里却比 10 大，
                            不是合法 BST。正确做法是给递归传下「允许的取值区间」。
                        </Callout>
                        <CodeBlock>{`// 正确的 BST 判定：把允许区间一层层收窄
bool isBST(Node* p, int low, int high) {
    if (p == nullptr) return true;
    if (p->value <= low || p->value >= high) return false;
    return isBST(p->left,  low, p->value)     // 左子树上限收到当前值
        && isBST(p->right, p->value, high);   // 右子树下限抬到当前值
}
// 调用：isBST(root, INT_MIN, INT_MAX)`}</CodeBlock>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">查找：每一步砍掉一半（如果树是平衡的）</h3>
                        <CodeBlock>{`Node* find(Node* p, int target) {
    while (p != nullptr) {
        if (target == p->value) return p;      // 找到
        if (target < p->value) p = p->left;    // 比当前小，往左
        else                   p = p->right;   // 比当前大，往右
    }
    return nullptr;                            // 走到空，说明不存在
}`}</CodeBlock>
                        <p className="mt-4 text-base leading-7 text-slate-700">
                            查找过程不需要回头，所以写成循环比递归更自然。走过的路径长度最多等于树高，
                            这就是复杂度 O(h) 的来源。
                        </p>

                        <h3 className="mt-8 text-xl font-black text-slate-950">插入：走到空位就挂上去</h3>
                        <CodeBlock>{`// 返回值是「这棵子树插入后的新根」，这样写能自然处理空树
Node* insert(Node* p, int value) {
    if (p == nullptr) return newNode(value);   // 找到空位，新建节点
    if (value < p->value)      p->left  = insert(p->left,  value);
    else if (value > p->value) p->right = insert(p->right, value);
    // value == p->value：本课约定不插入重复值，直接忽略
    return p;
}`}</CodeBlock>
                        <Callout icon={ArrowDownUp} title="重复值怎么办" tone="amber">
                            标准 BST 没有规定。常见三种处理：<strong>忽略</strong>（如上）、
                            <strong>统一放到右子树</strong>（把 <code className="font-mono">&gt;</code> 改成 <code className="font-mono">&gt;=</code>）、
                            或者<strong>在节点里加一个计数字段</strong>。做题时按题目要求来，
                            但注意如果放右子树，中序遍历就变成非严格升序了。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="往空 BST 里依次插入 50、30、70、20、40。此时 40 这个节点的父亲是谁？"
                            options={['30', '50', '20', '70']}
                            correctIndex={0}
                            explanation="插 40 时：40 < 50 往左到 30；40 > 30 往右，30 的右孩子是空的，于是 40 挂在 30 的右边。父亲是 30。"
                            misconception="容易只看数值大小猜「40 离 50 近所以挂 50 下面」，但插入位置由比较路径决定，不由数值远近决定。"
                        />
                    </>
                ),
                3: (
                    <>
                        <BstShapeLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么必须写 O(h)，不能写 O(log n)</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            h 是树高，只有在树<strong>平衡</strong>时才有 h ≈ log₂n。上面的实验里，
                            升序插入 7 个数得到的树高是 7 而不是 3——此时查找退化成 O(n)。
                        </p>
                        <CompareTable
                            headers={['树的形态', '树高 h', '查找复杂度', '什么时候出现']}
                            rows={[
                                ['接近完全二叉树', '约 log₂n', 'O(log n)', '插入顺序随机打乱'],
                                ['一般情况', 'log₂n ~ n', 'O(h)', '大多数实际情况'],
                                ['退化成链', 'n', 'O(n)', '按升序或降序插入'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="考试怎么问这一点" tone="rose">
                            「在含 n 个节点的二叉排序树中查找，最坏时间复杂度是？」答案是
                            <strong>O(n)</strong>，不是 O(log n)。因为没说明树是平衡的，就必须按最坏形态算。
                            这道题在历年真题里反复出现。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            解决办法是<strong>自平衡</strong>：插入删除时通过旋转维持树高在 O(log n)。
                            AVL 树和红黑树就是这么做的，C++ 的 <code className="font-mono font-bold">std::map</code> 和
                            <code className="font-mono font-bold">std::set</code> 底层就是红黑树——这也是它们能保证
                            O(log n) 的原因。七级只要求知道这个概念和结论，不要求手写旋转。
                        </p>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">删除要分三种情况</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            删除是 BST 三个操作里最容易写错的，因为要保证删完之后<strong>剩下的树仍然是合法 BST</strong>。
                        </p>
                        <StepList
                            title="三种情况"
                            steps={[
                                '没有孩子（叶子）：直接删掉，把父亲对应的指针置空。',
                                '只有一个孩子：把这个孩子提上来接替自己的位置。',
                                '有两个孩子：不能直接删——要先找到「中序后继」（右子树里最小的节点），把它的值搬过来，然后转而删除那个后继节点。',
                            ]}
                        />
                        <Callout icon={Scissors} title="为什么两个孩子时要找中序后继" tone="blue">
                            被删节点的位置必须放一个值，它得<strong>同时大于整个左子树、小于整个右子树</strong>。
                            满足这个条件的只有两个候选：左子树里最大的（中序前驱）或右子树里最小的（中序后继）。
                            任选一个都对，习惯上用后继。
                            <br /><br />
                            关键点：中序后继是右子树里一路向左走到底的节点，它<strong>最多只有一个右孩子</strong>——
                            所以删除它必然落回前两种简单情况，递归不会无限下去。
                        </Callout>
                        <CodeBlock>{`Node* removeNode(Node* p, int value) {
    if (p == nullptr) return nullptr;
    if (value < p->value)      p->left  = removeNode(p->left,  value);
    else if (value > p->value) p->right = removeNode(p->right, value);
    else {
        // 找到了要删的节点
        if (p->left == nullptr)  return p->right;  // 情况 1、2 合并
        if (p->right == nullptr) return p->left;
        // 情况 3：找右子树最小值（中序后继）
        Node* succ = p->right;
        while (succ->left != nullptr) succ = succ->left;
        p->value = succ->value;                    // 搬值
        p->right = removeNode(p->right, succ->value); // 再删后继
    }
    return p;
}`}</CodeBlock>
                        <Callout icon={ArrowDownUp} title="前两种情况合并的技巧" tone="amber">
                            代码里 <code className="font-mono">if (p-&gt;left == nullptr) return p-&gt;right;</code>
                            一句话就同时处理了「叶子」和「只有右孩子」：叶子的右孩子也是 nullptr，返回 nullptr 正好等于删掉。
                            不用写三个分支。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '在含 n 个节点的 BST 中查找一个元素，最坏时间复杂度是？',
                            answer: 'O(n)',
                            reason: '题目没说树是平衡的。按升序插入构造出的 BST 退化成一条链，树高为 n，查找要一路走到底。',
                        }, {
                            question: '删除一个有两个孩子的节点，为什么不会陷入无限递归？',
                            answer: '后继最多只有一个孩子',
                            reason: '中序后继是右子树里一路向左到底的节点，它没有左孩子。所以第二次删除必然落进「无孩子」或「只有一个孩子」的简单情况。',
                        }, {
                            question: 'C++ 的 std::map 为什么能保证 O(log n)？',
                            answer: '底层是自平衡的红黑树',
                            reason: '红黑树在插入删除时通过旋转和变色维持树高在 O(log n)，不会像普通 BST 那样退化成链。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '实现 BST 的 insert 和 find，测试插入重复值时的行为是否符合你的约定。',
                                '实现 removeNode，分别构造出三种情况各测一次，删完后用中序遍历验证仍是升序。',
                                '构造一个让 BST 退化成链的插入序列，并测量查找最深节点要比较多少次。',
                                '写一个 isBST 函数，用上面那个「根 10、左孩子 5、5 的右孩子 12」的反例测试它。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="一棵 BST 依次插入 50 30 70 20 40 60 80 建成。现在要删除根节点 50，按「找中序后继」的做法，删除后的新根是谁？请说明理由，并写出删除后的中序遍历。"
                            hint="中序后继是右子树里最小的节点——从 50 的右孩子出发，一路向左走到底。"
                            answer="50 的右子树是 70（左 60、右 80）。从 70 出发一路向左走到 60，60 没有左孩子，所以中序后继是 60。把 60 搬到根的位置，再从右子树里删掉原来的 60（它是叶子，直接删）。新根是 60。删除后的中序遍历是 20 30 40 60 70 80——仍然严格升序，说明结构合法。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明删除两个孩子的节点为什么要找中序后继，以及为什么递归不会无限下去',
                                '我能解释查找复杂度为什么写成 O(h) 而不是 O(log n)，并说出最坏情况是 O(n)',
                                '我能判断一棵树是不是合法 BST，并知道只比较父子两代是不够的',
                                '我能构造出一个让 BST 退化成链表的插入序列',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
