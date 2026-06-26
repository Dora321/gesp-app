import React, { useMemo, useState } from 'react';
import { ClipboardCheck, GitBranch, Route, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '三种顺序' },
    { id: 2, title: '遍历规则', category: '根的位置' },
    { id: 3, title: '递归模板', category: '左右子树' },
    { id: 4, title: '还原意识', category: '序列与结构' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const tree = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F', 'G'],
    D: [],
    E: [],
    F: [],
    G: [],
};

function traverse(node, mode, result = []) {
    if (!node) return result;
    const [left, right] = tree[node];
    if (mode === 'pre') result.push(node);
    traverse(left, mode, result);
    if (mode === 'in') result.push(node);
    traverse(right, mode, result);
    if (mode === 'post') result.push(node);
    return result;
}

function TraversalLab() {
    const [mode, setMode] = useState('pre');
    const order = useMemo(() => traverse('A', mode, []), [mode]);
    const labels = { pre: '前序：根-左-右', in: '中序：左-根-右', post: '后序：左-右-根' };

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Route className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">二叉树遍历演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">遍历方式</label>
                    <select value={mode} onChange={(event) => setMode(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        <option value="pre">前序遍历</option>
                        <option value="in">中序遍历</option>
                        <option value="post">后序遍历</option>
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        记住根节点什么时候访问：根在前就是前序，根在中间就是中序，根在最后就是后序。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="text-sm font-black text-slate-500">{labels[mode]}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {order.map((node, index) => (
                            <span key={`${node}-${index}`} className="rounded-lg bg-indigo-100 px-4 py-3 font-mono text-sm font-black text-indigo-800">
                                {index + 1}. {node}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">当前序列：{order.join(' ')}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '前序遍历先访问什么？',
        answer: '根节点',
        reason: '前序规则是根、左、右。',
    },
    {
        question: '后序遍历常用于什么？',
        answer: '先处理孩子再处理根',
        reason: '例如计算子树大小、删除树节点。',
    },
    {
        question: '中序遍历在哪类树特别有用？',
        answer: '二叉搜索树',
        reason: '二叉搜索树中序遍历会得到有序序列。',
    },
];

function TraversalPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'前序、中序、后序三种遍历的区别到底在哪？'}
                options={['访问左右子树的顺序不同', '只在「访问根节点」的时机不同']}
                correctIndex={1}
                explanation="三种遍历都是先左子树后右子树递归，区别只在「什么时候访问根」：根在前=前序、根在中=中序、根在后=后序。"
                misconception="以为连左右子树的递归顺序也跟着变。"
            />
            <PredictCheck
                prompt={'写递归遍历时，忘了写 if (root == 0) return; 会怎样？'}
                options={['没事', '对空节点继续递归，越界 / 死递归崩溃']}
                correctIndex={1}
                explanation="没有空节点边界，会对不存在的孩子继续递归，访问越界或无限递归崩溃。每个递归遍历都要先处理空节点。"
                misconception="忘了递归遍历也需要边界（空节点要返回）。"
            />
            <PredictCheck
                prompt={'已知前序 A B D…、中序 D B E A…，根是谁？怎么切左右子树？'}
                options={['根是中序第一个 D', '根是前序第一个 A，中序里 A 左边是左子树、右边是右子树']}
                correctIndex={1}
                explanation="前序第一个就是根 A；在中序里找到 A，它左边的是左子树、右边的是右子树，再对每棵子树重复同样过程。"
                misconception="在中序序列里直接拿第一个当根。"
            />
        </div>
    );
}

const traversalMasteryItems = [
    {
        label: '能手推三种遍历序列。',
        evidence: '同一棵树写出前 / 中 / 后序，区别只在根的位置。',
        retryHint: '回到遍历演示台，切换三种看序列。',
    },
    {
        label: '能写递归遍历模板并处理空节点。',
        evidence: 'if (root == 0) return; 再按顺序访问根 / 左 / 右。',
        retryHint: '回到递归模板，第一行先写空节点边界。',
    },
    {
        label: '能说清三种遍历各自的用途。',
        evidence: '前序复制结构、中序让 BST 有序、后序统计子树。',
        retryHint: '回到遍历规则表。',
    },
    {
        label: '能用前序 + 中序还原二叉树。',
        evidence: '前序找根，中序切左右，再对子树重复。',
        retryHint: '回到「还原口令」。',
    },
];

export default function CppL6Lesson2() {
    return (
        <CppLessonShell
            lessonNumber={2}
            lessonTitle="树的遍历 (前/中/后序)"
            lessonSubtitle="根节点访问时机决定遍历名称"
            accent="indigo"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/1"
            nextPath="/lesson/6/3"
            topSupport={<CppL6LessonSupport lessonId={2} />}
            bottomSupport={<CppL6LessonSupport lessonId={2} placement="bottom" />}
            hero={{
                title: '遍历就是给树安排一条访问路线：每个节点一次，不重复不遗漏',
                description: '本课用固定二叉树对比前序、中序、后序，训练递归访问左右子树的模板。',
            }}
            goals={['能手推三种遍历序列', '能写出二叉树递归遍历模板', '能说明根节点访问时机的区别']}
            prerequisites={['会写递归并定边界', '理解二叉树的左右子节点', '会用数组存树结构']}
            childrenBySection={{
                1: <TraversalLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">遍历规则：差别只在“访问根”的位置</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                左子树和右子树也按同样规则递归处理。树题最常见的错误，是只看当前节点，忘了子树整体。
                            </p>
                        </div>
                        <CompareTable
                            headers={['遍历', '顺序', '典型用途']}
                            rows={[
                                ['前序', '根 左 右', '复制树、输出结构'],
                                ['中序', '左 根 右', '二叉搜索树排序'],
                                ['后序', '左 右 根', '统计子树、释放节点'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递归模板：空节点返回，非空节点拆成三步</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                写递归遍历时先处理空节点，再按遍历顺序安排访问根、遍历左、遍历右。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`void preorder(int root) {
  if (root == 0) return;
  cout << root << " ";
  preorder(leftChild[root]);
  preorder(rightChild[root]);
}

void postorder(int root) {
  if (root == 0) return;
  postorder(leftChild[root]);
  postorder(rightChild[root]);
  cout << root << " ";
}`}</CodeBlock>
                            <StepList steps={[
                                '判断空节点或越界',
                                '按规则访问根节点',
                                '递归处理左子树',
                                '递归处理右子树',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">还原意识：遍历序列里藏着树结构</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                前序的第一个是根，后序的最后一个是根。中序能把左右子树分开，所以常和前序或后序一起还原二叉树。
                            </p>
                        </div>
                        <CodeBlock>{`前序：A B D E C F G
中序：D B E A F C G

根是 A；
中序里 A 左边是左子树 D B E；
中序里 A 右边是右子树 F C G。`}</CodeBlock>
                        <Callout icon={GitBranch} title="还原口令" tone="indigo">
                            先找根，再用中序切左右子树，然后对子树重复同样过程。
                        </Callout>
                        <TraversalPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                遍历题要手推一遍样例。只靠代码跑，很容易把左右顺序写反却不自知。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt="换个例子：二叉树 根=1，左子=2，右子=3。写出前序、中序、后序遍历结果。"
                            hint="前序=根左右，中序=左根右，后序=左右根。"
                            answer="前序 1 2 3；中序 2 1 3；后序 2 3 1。"
                            steps={[
                                '前序（根左右）：1，再左 2，再右 3 → 1 2 3。',
                                '中序（左根右）：左 2，根 1，右 3 → 2 1 3。',
                                '后序（左右根）：左 2，右 3，根 1 → 2 3 1。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-2 树的遍历离开前检查"
                            description="遍历最怕“把根访问时机记混、漏了空节点边界”。勾选前先在一棵 7 节点树上手推三种序列。"
                            items={traversalMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>给一棵 7 个节点的二叉树写出三种遍历序列。</li>
                                <li>用数组 leftChild/rightChild 保存二叉树并输出前序遍历。</li>
                                <li>解释为什么后序适合统计子树大小。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习哈夫曼树，它会用树结构表达“高频字符走短路径”的最优编码。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
