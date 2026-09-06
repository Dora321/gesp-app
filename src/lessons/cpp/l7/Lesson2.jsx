import React, { useMemo, useState } from 'react';
import { Binary, GitBranch, ListChecks, Repeat } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '树长什么样' },
    { id: 2, title: '两种存储方式', category: '数组还是指针' },
    { id: 3, title: '三种遍历', category: '根在什么位置' },
    { id: 4, title: '由遍历还原树', category: '反向工程' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 贯穿全课的示例树。用一棵固定的树把三种遍历讲透，比每节换一棵树更省认知。
//        A
//      /   \
//     B     C
//    / \     \
//   D   E     F
const TREE = {
    A: { value: 'A', left: 'B', right: 'C' },
    B: { value: 'B', left: 'D', right: 'E' },
    C: { value: 'C', left: null, right: 'F' },
    D: { value: 'D', left: null, right: null },
    E: { value: 'E', left: null, right: null },
    F: { value: 'F', left: null, right: null },
};

const ORDERS = {
    pre: {
        label: '前序 preorder',
        rule: '根 → 左 → 右',
        note: '根最先被访问。所以前序序列的第一个元素一定是整棵树的根。',
    },
    in: {
        label: '中序 inorder',
        rule: '左 → 根 → 右',
        note: '根在左右子树之间。对二叉排序树做中序遍历，结果一定是升序的。',
    },
    post: {
        label: '后序 postorder',
        rule: '左 → 右 → 根',
        note: '根最后被访问。所以后序序列的最后一个元素一定是整棵树的根。',
    },
};

// 递归遍历，同时记下每个节点被访问的次序，用来驱动动画。
function traverse(order, nodeKey, output = []) {
    if (!nodeKey) return output;
    const node = TREE[nodeKey];
    if (order === 'pre') output.push(nodeKey);
    traverse(order, node.left, output);
    if (order === 'in') output.push(nodeKey);
    traverse(order, node.right, output);
    if (order === 'post') output.push(nodeKey);
    return output;
}

// 节点在图上的坐标（百分比），手排的——六个节点不值得引进布局算法。
const LAYOUT = {
    A: { x: 50, y: 8 },
    B: { x: 26, y: 40 },
    C: { x: 74, y: 40 },
    D: { x: 12, y: 74 },
    E: { x: 40, y: 74 },
    F: { x: 88, y: 74 },
};

const EDGES = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F']];

function TraversalLab() {
    const [order, setOrder] = useState('pre');
    const [step, setStep] = useState(6);
    const sequence = useMemo(() => traverse(order, 'A'), [order]);
    const visited = sequence.slice(0, step);
    const currentKey = step > 0 ? sequence[step - 1] : null;

    const changeOrder = (next) => {
        setOrder(next);
        setStep(6);
    };

    return (
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitBranch className="text-teal-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">遍历顺序观察器</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                三种遍历走的是同一棵树、同一条路线，区别只在<strong>什么时候把节点记下来</strong>。
                拖动进度条，看访问次序怎么铺开。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {Object.entries(ORDERS).map(([key, item]) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={order === key}
                        onClick={() => changeOrder(key)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${order === key
                            ? 'bg-teal-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-teal-200 hover:bg-teal-100'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <div className="relative h-56 w-full" role="img" aria-label={`二叉树结构图，当前${ORDERS[order].label}已访问 ${visited.join(' ') || '无'}`}>
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                            {EDGES.map(([from, to]) => (
                                <line
                                    key={`${from}-${to}`}
                                    x1={`${LAYOUT[from].x}%`}
                                    y1={`${LAYOUT[from].y + 5}%`}
                                    x2={`${LAYOUT[to].x}%`}
                                    y2={`${LAYOUT[to].y + 2}%`}
                                    stroke="#99a1af"
                                    strokeWidth="2"
                                />
                            ))}
                        </svg>
                        {Object.entries(LAYOUT).map(([key, pos]) => {
                            const index = visited.indexOf(key);
                            const isCurrent = key === currentKey;
                            return (
                                <div
                                    key={key}
                                    className="absolute flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-sm font-black transition-all duration-300"
                                    style={{
                                        left: `${pos.x}%`,
                                        top: `${pos.y}%`,
                                        backgroundColor: isCurrent ? '#00786f' : index >= 0 ? '#96f7e4' : '#f1f5f9',
                                        color: isCurrent ? '#ffffff' : '#0f172a',
                                        boxShadow: isCurrent ? '0 0 0 4px #96f7e4' : 'none',
                                    }}
                                >
                                    {key}
                                    {index >= 0 && (
                                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <label htmlFor="traversal-step" className="mt-4 block text-sm font-black text-slate-700">
                        已访问 {step} / 6 个节点
                    </label>
                    <input
                        id="traversal-step"
                        type="range"
                        min="0"
                        max="6"
                        value={step}
                        onChange={(event) => setStep(Number(event.target.value))}
                        className="mt-2 w-full"
                    />
                </div>

                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">访问规则</div>
                    <div className="mt-1 text-2xl font-black text-amber-300">{ORDERS[order].rule}</div>

                    <div className="mt-5 text-xs font-bold text-slate-400">遍历序列</div>
                    <div className="mt-2 flex flex-wrap gap-1.5 font-mono">
                        {sequence.map((key, index) => (
                            <span
                                key={key}
                                className={`rounded px-2 py-1 text-sm font-black transition ${index < step
                                    ? 'bg-emerald-400 text-slate-950'
                                    : 'bg-slate-700 text-slate-500'}`}
                            >
                                {key}
                            </span>
                        ))}
                    </div>

                    <p className="mt-5 border-t border-slate-700 pt-4 text-sm font-semibold leading-6 text-slate-300">
                        {ORDERS[order].note}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Lesson2() {
    return (
        <CppLessonShell
            lessonNumber={2}
            lessonTitle="二叉树的存储与遍历"
            lessonSubtitle="三种遍历走同一条路，区别只在什么时候记下节点"
            accent="teal"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/1"
            nextPath="/lesson/7/3"
            prerequisites={['会写递归函数并理解调用栈', '知道结构体和指针的基本用法', '能读懂数组下标运算']}
            topSupport={<CppL7LessonSupport lessonId={2} />}
            bottomSupport={<CppL7LessonSupport lessonId={2} placement="bottom" />}
            hero={{
                title: '一棵树，三种读法',
                description: '本课把二叉树的两种存储方式和三种遍历顺序讲清楚，并解决考试最爱问的一题：给两种遍历序列，还原这棵树。',
            }}
            goals={['能用数组和指针两种方式存储二叉树', '能写出前中后序的递归与迭代实现', '能由两种遍历序列还原二叉树']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Binary} title="七级为什么从二叉树开始" tone="blue">
                            一级到六级处理的都是「一条线」上的数据——数组、字符串。二叉树是第一个
                            <strong>分叉</strong>的结构。一旦分叉，「按什么顺序把所有节点走一遍」就不再只有一种答案，
                            这正是三种遍历存在的原因。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            二叉树的定义是递归的：一棵二叉树要么是空的，要么由一个根节点、一棵左子树和一棵右子树组成。
                            注意左右子树本身也是二叉树——这个递归定义直接决定了遍历代码为什么天然是递归的。
                        </p>
                        <Callout icon={ListChecks} title="几个必须分清的名词" tone="amber">
                            <strong>深度/高度</strong>：从根到最深叶子的边数（有些教材算节点数，做题时看题目定义）。
                            <strong>满二叉树</strong>：每一层都填满。<strong>完全二叉树</strong>：除最后一层外都填满，
                            且最后一层的节点靠左连续排列——这个性质是数组存储的前提。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">数组存储：靠下标算出亲属关系</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            如果根放在下标 1，那么对任意节点 <code className="font-mono font-bold">i</code>：
                            左孩子是 <code className="font-mono font-bold">2i</code>，右孩子是 <code className="font-mono font-bold">2i+1</code>，
                            父亲是 <code className="font-mono font-bold">i/2</code>。不需要存任何指针。
                        </p>
                        <CodeBlock>{`int tree[105];      // 下标 1 是根，0 表示空节点
// 访问节点 i 的孩子
int leftChild  = 2 * i;
int rightChild = 2 * i + 1;
int parent     = i / 2;`}</CodeBlock>
                        <Callout icon={Repeat} title="数组存储的代价" tone="rose">
                            这套下标公式对任何二叉树都成立，但<strong>空间可能爆炸</strong>。
                            存一棵退化成链的树（每个节点只有右孩子），深度 n 就需要 2<sup>n</sup> 大小的数组。
                            所以数组存储只适合完全二叉树或接近完全的树（堆就是典型用法）。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">指针存储：结构体里放两个指针</h3>
                        <CodeBlock>{`struct Node {
    int value;
    Node* left;
    Node* right;
};

// 新建一个节点，两个孩子先置空
Node* newNode(int v) {
    Node* p = new Node;
    p->value = v;
    p->left = nullptr;
    p->right = nullptr;
    return p;
}`}</CodeBlock>
                        <CompareTable
                            headers={['对比项', '数组存储', '指针存储']}
                            rows={[
                                ['空间', '完全二叉树很省，退化树会爆炸', '与节点数成正比，永远不浪费'],
                                ['找父亲', 'i/2，O(1)', '要么额外存 parent 指针，要么找不到'],
                                ['插入删除', '要挪动一片下标', '改几个指针即可'],
                                ['适用', '堆、完全二叉树、题目规模已知', '一般二叉树、BST'],
                            ]}
                        />
                        <PredictCheck
                            className="mt-6"
                            prompt="用数组存一棵有 5 个节点、但退化成一条右斜链的二叉树（根→右→右→右→右），至少需要多大的数组？"
                            options={['6', '11', '32', '10']}
                            correctIndex={2}
                            explanation="根在 1，右孩子链是 1 → 3 → 7 → 15 → 31。最深的节点下标是 31，所以数组至少要开到 32。只有 5 个节点却要 32 个格子——这就是数组存储在退化树上的代价。"
                            misconception="按「节点数 + 1」估算会得到 6，但数组存储的下标由位置决定，不由节点个数决定。"
                        />
                    </>
                ),
                3: (
                    <>
                        <TraversalLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">三种递归遍历的代码几乎一样</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            对比下面三段：递归的结构完全相同，<strong>只有那一行输出的位置在动</strong>。
                            这就是「前/中/后」三个字的含义——指的是根被访问的时机。
                        </p>
                        <CodeBlock>{`void preorder(Node* p) {          // 根 左 右
    if (p == nullptr) return;
    cout << p->value << ' ';      // ← 输出在最前
    preorder(p->left);
    preorder(p->right);
}

void inorder(Node* p) {           // 左 根 右
    if (p == nullptr) return;
    inorder(p->left);
    cout << p->value << ' ';      // ← 输出在中间
    inorder(p->right);
}

void postorder(Node* p) {         // 左 右 根
    if (p == nullptr) return;
    postorder(p->left);
    postorder(p->right);
    cout << p->value << ' ';      // ← 输出在最后
}`}</CodeBlock>
                        <Callout icon={ListChecks} title="那句 if (p == nullptr) return; 不能省" tone="rose">
                            它同时处理了三件事：空树、叶子节点的两个空孩子、只有一个孩子的节点。
                            考试里的边界错误几乎都出在这里——写成 <code className="font-mono">if (p-&gt;left != nullptr)</code>
                            再递归，代码会长一倍还容易漏。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">用栈写非递归中序</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            递归其实是编译器帮你用栈。手写一遍能看清「回到父节点」这件事是怎么发生的。
                        </p>
                        <CodeBlock>{`void inorderIterative(Node* root) {
    stack<Node*> st;
    Node* p = root;
    while (p != nullptr || !st.empty()) {
        while (p != nullptr) {    // 一路向左，边走边压栈
            st.push(p);
            p = p->left;
        }
        p = st.top(); st.pop();   // 左边走到头，弹出来访问
        cout << p->value << ' ';
        p = p->right;             // 转向右子树
    }
}`}</CodeBlock>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">前序 + 中序 → 唯一确定一棵树</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            这是七级的高频题型。方法只有两步，反复用：
                        </p>
                        <StepList
                            title="还原步骤"
                            steps={[
                                '前序的第一个元素就是当前这棵（子）树的根。',
                                '在中序里找到这个根，它左边的全是左子树的节点，右边的全是右子树的节点。',
                                '数出左子树有几个节点，就能在前序里把剩下的部分也切成左右两段。',
                                '对左右两段各自重复以上步骤，直到段长为 0。',
                            ]}
                        />
                        <Callout icon={GitBranch} title="用本课的树验算一遍" tone="blue">
                            前序 <code className="font-mono font-bold">A B D E C F</code>，
                            中序 <code className="font-mono font-bold">D B E A C F</code>。
                            前序首位 A 是根；中序里 A 左边是 <code className="font-mono">D B E</code>（3 个，左子树），
                            右边是 <code className="font-mono">C F</code>（2 个，右子树）。
                            于是前序里 A 后面的 3 个 <code className="font-mono">B D E</code> 属于左子树，
                            剩下 <code className="font-mono">C F</code> 属于右子树。递归下去即可。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么前序 + 后序不行</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            前序给出根在最前，后序给出根在最后——两个都只能定位根，
                            <strong>谁都没法告诉你左右子树的分界在哪</strong>。中序的价值恰恰在于根把序列一分为二。
                        </p>
                        <CompareTable
                            headers={['已知组合', '能否唯一还原', '原因']}
                            rows={[
                                ['前序 + 中序', '能', '前序定根，中序切分左右'],
                                ['后序 + 中序', '能', '后序末位定根，中序切分左右'],
                                ['前序 + 后序', '不能', '两者都只能定根，缺少左右分界信息'],
                                ['层序 + 中序', '能', '层序首位定根，中序切分左右'],
                            ]}
                        />
                        <Callout icon={Repeat} title="一个具体的反例" tone="rose">
                            前序 <code className="font-mono">A B</code>、后序 <code className="font-mono">B A</code>：
                            B 既可以是 A 的左孩子，也可以是 A 的右孩子，两棵不同的树给出完全相同的序列对。
                            这就是「不唯一」的证明——只要能举出一个反例即可。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '某二叉树的后序遍历是 D E B F C A，那么根节点是谁？',
                            answer: 'A',
                            reason: '后序是「左 右 根」，根最后被访问，所以序列的最后一个元素 A 就是整棵树的根。',
                        }, {
                            question: '对二叉排序树做中序遍历，结果有什么特点？',
                            answer: '严格升序',
                            reason: 'BST 的性质是左子树都比根小、右子树都比根大，而中序正好按「左 根 右」访问，于是从小到大输出。这是判断一棵树是否为合法 BST 的常用方法。',
                        }, {
                            question: '一棵二叉树只有 1 个节点，它的前序、中序、后序序列分别是？',
                            answer: '三者相同',
                            reason: '只有根、没有子树时，三种规则都只输出根本身。这个边界常被用来检查代码里的空指针判断是否正确。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用本课的示例树，手写出三种遍历序列，再用上面的观察器逐步核对。',
                                '用指针方式建出这棵树，实现三种递归遍历并跑通。',
                                '把中序遍历改写成显式栈的非递归版本，对比输出是否一致。',
                                '给定前序 A B D E C F 和中序 D B E A C F，在纸上把树画出来。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="已知一棵二叉树的中序遍历是 D B E A F C，后序遍历是 D E B F C A。请还原这棵树，并写出它的前序遍历。"
                            hint="后序的最后一个元素是根。在中序里定位它，左右两边分别是左右子树，然后对两段递归。"
                            answer="根是 A（后序末位）。中序里 A 左边是 D B E（左子树），右边是 F C（右子树）。左子树的后序是 D E B，末位 B 为根，中序 D B E 说明 D 是左孩子、E 是右孩子。右子树的后序是 F C，末位 C 为根，中序 F C 说明 F 是 C 的左孩子。于是前序（根左右）是 A B D E C F。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说出根节点在前序、中序、后序三种遍历中分别处在什么位置',
                                '我能正确处理空子树和只有一个孩子的节点，知道那句 if (p == nullptr) return 管了哪些情况',
                                '我能由前序加中序还原一棵树，也能说清为什么前序加后序做不到',
                                '我能说明数组存储在退化树上为什么会浪费大量空间',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
