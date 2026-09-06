import React, { useState } from 'react';
import { AlertTriangle, ArrowDownUp, ListOrdered, Scale } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '为什么还要学慢的排序' },
    { id: 2, title: '手推一趟', category: '三种算法的第一趟' },
    { id: 3, title: '稳定性', category: '同键值的相对顺序' },
    { id: 4, title: '怎么选', category: 'sort 还是 stable_sort' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const RAW = [5, 2, 9, 1, 7, 3];

// 三种排序的「第一趟」——数字是跑出来的，不是示意。
// 一趟的定义各不相同，这正是手推题最容易混的地方。
const PASSES = {
    bubble: {
        label: '冒泡排序',
        onePass: '一趟 = 从头到尾比较相邻两个，逆序就交换',
        result: [2, 5, 1, 7, 3, 9],
        highlight: 5,
        note: '走完一趟，最大的 9 被一路「换」到了末尾。所以冒泡是每趟确定一个最大值，从后往前排好。',
        stable: true,
        stableWhy: '只有严格「前 > 后」时才交换，相等时不动，因此同键值的相对顺序保持不变。',
    },
    selection: {
        label: '选择排序',
        onePass: '一趟 = 在未排好的区间里找出最小值，与区间首位交换',
        result: [1, 2, 9, 5, 7, 3],
        highlight: 0,
        note: '在整个数组里找到最小的 1（原本在下标 3），与下标 0 的 5 交换。所以选择排序是从前往后确定最小值。',
        stable: false,
        stableWhy: '那一次「远距离交换」会把中间的元素跨过去，可能改变同键值元素的先后——这就是它不稳定的原因。',
    },
    insertion: {
        label: '插入排序',
        onePass: '一趟 = 把当前元素插入到前面已排好的区间里的正确位置',
        result: [2, 5, 9, 1, 7, 3],
        highlight: 0,
        note: '把下标 1 的 2 插到 5 前面。前两个已有序，后面四个还没动过。插入排序像整理手里的扑克牌。',
        stable: true,
        stableWhy: '往前挪的条件是「前面的元素严格大于待插入元素」，相等就停下，于是相等元素保持原有先后。',
    },
};

const STUDENTS = [
    { name: '甲', score: 90 },
    { name: '乙', score: 85 },
    { name: '丙', score: 90 },
    { name: '丁', score: 85 },
    { name: '戊', score: 95 },
];

// 稳定与不稳定各跑一遍。结果验证过：同为 90 分的甲、丙在选择排序后变成了丙、甲。
const STABLE_RESULT = [
    { name: '乙', score: 85 }, { name: '丁', score: 85 },
    { name: '甲', score: 90 }, { name: '丙', score: 90 },
    { name: '戊', score: 95 },
];
const UNSTABLE_RESULT = [
    { name: '乙', score: 85 }, { name: '丁', score: 85 },
    { name: '丙', score: 90 }, { name: '甲', score: 90 },
    { name: '戊', score: 95 },
];

function PassLab() {
    const [algo, setAlgo] = useState('bubble');
    const current = PASSES[algo];

    return (
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <ListOrdered className="text-yellow-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">三种排序的「第一趟」</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                手推题最容易混的地方：<strong>三种算法里「一趟」的含义完全不同</strong>。
                同一组数据走一趟，结果差得很远。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {Object.entries(PASSES).map(([key, item]) => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={algo === key}
                        onClick={() => setAlgo(key)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${algo === key
                            ? 'bg-yellow-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-yellow-300 hover:bg-yellow-100'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="rounded-xl bg-white p-5 ring-1 ring-yellow-200">
                <div className="text-xs font-black text-slate-500">{current.onePass}</div>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="w-16 shrink-0 text-xs font-black text-slate-400">原始</span>
                        <div className="flex flex-wrap gap-1.5">
                            {RAW.map((value, index) => (
                                <span key={index} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 font-mono text-sm font-black text-slate-700">
                                    {value}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-16 shrink-0 text-xs font-black text-slate-400">一趟后</span>
                        <div className="flex flex-wrap gap-1.5">
                            {current.result.map((value, index) => (
                                <span
                                    key={index}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-black ${index === current.highlight
                                        ? 'bg-yellow-700 text-white'
                                        : 'bg-slate-100 text-slate-700'}`}
                                >
                                    {value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm font-semibold leading-6 text-slate-600">
                    {current.note}
                </p>
            </div>

            <div className={`mt-5 rounded-xl p-5 ring-1 ${current.stable
                ? 'bg-emerald-50 ring-emerald-200'
                : 'bg-rose-50 ring-rose-200'}`}>
                <div className={`text-xs font-black ${current.stable ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {current.stable ? '稳定' : '不稳定'}
                </div>
                <p className={`mt-2 text-sm font-semibold leading-6 ${current.stable ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {current.stableWhy}
                </p>
            </div>
        </div>
    );
}

function StabilityLab() {
    const [stable, setStable] = useState(true);
    const result = stable ? STABLE_RESULT : UNSTABLE_RESULT;


    return (
        <div className="rounded-2xl border border-yellow-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
                <Scale className="text-yellow-700" aria-hidden="true" />
                <h3 className="text-lg font-black text-slate-950">按分数排序，同分者怎么排</h3>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                {[[true, '稳定排序（如插入排序）'], [false, '不稳定排序（如选择排序）']].map(([value, label]) => (
                    <button
                        key={String(value)}
                        type="button"
                        aria-pressed={stable === value}
                        onClick={() => setStable(value)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${stable === value
                            ? 'bg-yellow-700 text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                <div>
                    <div className="mb-1.5 text-xs font-black text-slate-400">排序前</div>
                    <div className="flex flex-wrap gap-2">
                        {STUDENTS.map((student) => (
                            <span key={student.name} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
                                {student.name} <span className="font-mono text-slate-500">{student.score}</span>
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="mb-1.5 text-xs font-black text-slate-400">排序后</div>
                    <div className="flex flex-wrap gap-2">
                        {result.map((student) => {
                            const isSwapped = !stable && (student.name === '甲' || student.name === '丙');
                            return (
                                <span
                                    key={student.name}
                                    className={`rounded-lg px-3 py-2 text-sm font-black ${isSwapped
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-slate-100 text-slate-700'}`}
                                >
                                    {student.name} <span className={`font-mono ${isSwapped ? 'text-rose-100' : 'text-slate-500'}`}>{student.score}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            <p className="mt-4 border-t border-slate-100 pt-4 text-sm font-semibold leading-6 text-slate-600">
                {stable
                    ? '同为 90 分的甲和丙，排序后仍是「甲在丙前」——与排序前一致。这就是稳定。'
                    : '同为 90 分的甲和丙，排序后变成了「丙在甲前」——相对顺序被打乱了。分数排对了，但同分者的原有次序丢了。'}
            </p>
        </div>
    );
}

export default function Lesson14() {
    return (
        <CppLessonShell
            lessonNumber={14}
            lessonTitle="排序算法的稳定性与选择"
            lessonSubtitle="排对了不等于排好了——同键值的顺序也是信息"
            accent="yellow"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/13"
            nextPath="/lesson/7/15"
            prerequisites={['会写冒泡、选择、插入三种基础排序', '知道 sort 的基本用法', '能估算 O(n²) 与 O(n log n) 的差别']}
            topSupport={<CppL7LessonSupport lessonId={14} />}
            bottomSupport={<CppL7LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '同分的两个人，谁排前面',
                description: '本课讲常见排序的复杂度与稳定性、怎么手推一趟中间结果，以及 sort 与 stable_sort 该用哪个。',
            }}
            goals={['能说出常见排序的复杂度与稳定性', '能根据场景选择排序算法', '能手推一趟排序的中间结果']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={ListOrdered} title="实际写代码当然用 sort" tone="blue">
                            比赛和考试的编程题里，排序一律写 <code className="font-mono font-bold">sort(a, a + n)</code>，
                            没人手写冒泡。但七级的<strong>选择题</strong>会考三件事，
                            这三件事 sort 帮不了你：
                            <br /><br />
                            ① 给一个数组，问某种排序<strong>第 k 趟之后</strong>数组长什么样；
                            ② 问某种排序<strong>稳不稳定</strong>；
                            ③ 给一个场景，问<strong>该选哪种</strong>排序。
                        </Callout>
                        <CompareTable
                            headers={['排序', '平均', '最坏', '空间', '稳定']}
                            rows={[
                                ['冒泡排序', 'O(n²)', 'O(n²)', 'O(1)', '稳定'],
                                ['选择排序', 'O(n²)', 'O(n²)', 'O(1)', '不稳定'],
                                ['插入排序', 'O(n²)', 'O(n²)', 'O(1)', '稳定'],
                                ['快速排序', 'O(n log n)', 'O(n²)', 'O(log n)', '不稳定'],
                                ['归并排序', 'O(n log n)', 'O(n log n)', 'O(n)', '稳定'],
                                ['堆排序', 'O(n log n)', 'O(n log n)', 'O(1)', '不稳定'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="这张表里最常考的三格" tone="amber">
                            ① <strong>快排最坏是 O(n²)</strong>——数据已经有序、且每次都取端点做基准时退化。
                            <br />② <strong>归并要 O(n) 额外空间</strong>，是三个 O(n log n) 里唯一稳定的。
                            <br />③ <strong>插入排序在「几乎已有序」时接近 O(n)</strong>——
                            每个元素只需往前挪一两格。这是它唯一的优势场景，也是小数据量下它反而比快排快的原因。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <PassLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">三份代码，注意「一趟」的边界</h3>
                        <CodeBlock>{`// 冒泡：每趟把最大的沉到末尾，所以内层上界随 i 缩小
for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - 1 - i; j++)
        if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);

// 选择：每趟找出最小值，与未排好区间的首位交换
for (int i = 0; i < n - 1; i++) {
    int mn = i;
    for (int j = i + 1; j < n; j++)
        if (a[j] < a[mn]) mn = j;
    swap(a[i], a[mn]);              // ← 这次远距离交换导致不稳定
}

// 插入：把 a[i] 插进前面已有序的区间
for (int i = 1; i < n; i++) {
    int key = a[i], j = i - 1;
    while (j >= 0 && a[j] > key) {  // ← 严格大于，相等就停 → 稳定
        a[j + 1] = a[j];
        j--;
    }
    a[j + 1] = key;
}`}</CodeBlock>
                        <Callout icon={ArrowDownUp} title="手推题的三条自检" tone="blue">
                            ① <strong>冒泡</strong>：第 k 趟后，<strong>末尾 k 个</strong>一定是全数组最大的 k 个且已排好。
                            <br />② <strong>选择</strong>：第 k 趟后，<strong>开头 k 个</strong>一定是全数组最小的 k 个且已排好。
                            <br />③ <strong>插入</strong>：第 k 趟后，<strong>开头 k+1 个</strong>互相有序，
                            但它们不一定是全数组最小的——<strong>后面的元素压根没被看过</strong>。
                            <br /><br />
                            第三条最容易错。上面实验台里插入一趟后是 2 5 9 1 7 3——
                            开头的 2、5 有序，但 1 还在后面没动。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="数组 5 2 9 1 7 3，用插入排序走完第 1 趟（即处理完下标 1 的元素）后，数组是什么？"
                            options={['2 5 9 1 7 3', '1 2 9 5 7 3', '2 5 1 7 3 9', '1 2 3 5 7 9']}
                            correctIndex={0}
                            explanation="插入排序第 1 趟只处理下标 1 的元素 2：把它插到 5 前面，得到 2 5 9 1 7 3。后面的 9、1、7、3 完全没被触碰。选「1 2 9 5 7 3」是选择排序第 1 趟的结果；选「2 5 1 7 3 9」是冒泡第 1 趟的结果——三种算法一趟的含义各不相同，这正是手推题的考点。"
                            misconception="容易以为「一趟」后数组开头就是全局最小。插入排序只保证已处理区间内部有序，未处理的部分还是原样。"
                        />
                    </>
                ),
                3: (
                    <>
                        <StabilityLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">稳定性的定义</h3>
                        <Callout icon={Scale} title="一句话定义" tone="blue">
                            排序后，<strong>键值相等</strong>的元素之间的<strong>相对先后顺序</strong>
                            与排序前完全一致——这样的排序算法叫稳定的。
                            <br /><br />
                            注意：稳定性说的<strong>只是相等元素之间</strong>的事。
                            不稳定的排序<strong>结果也是正确排好序的</strong>，
                            只是同键值元素的原有次序可能被打乱。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么选择排序不稳定</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            关键在那句 <code className="font-mono font-bold">swap(a[i], a[mn])</code>——
                            这是一次<strong>跨越中间元素的远距离交换</strong>。
                        </p>
                        <CodeBlock>{`// 甲90 乙85 丙90 丁85 戊95，按分数升序
// 第 1 趟：在全区间找最小 = 乙(85)，与位置 0 的甲(90) 交换
// → 乙85 甲90 丙90 丁85 戊95
//   甲被扔到了位置 1，而丙原本在甲后面……

// 第 2 趟：在 [1..4] 找最小 = 丁(85)，与位置 1 的甲(90) 交换
// → 乙85 丁85 丙90 甲90 戊95
//   甲被扔到了位置 3，跑到了丙的后面 —— 甲丙顺序反了`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="对比：冒泡和插入为什么稳定" tone="amber">
                            两者的移动都是<strong>相邻交换或相邻挪位</strong>，而且条件都是
                            <strong>严格不等</strong>（<code className="font-mono">a[j] &gt; a[j+1]</code>、
                            <code className="font-mono">a[j] &gt; key</code>）。
                            相等时不动，就不可能越过一个相等的元素，相对顺序自然保住了。
                            <br /><br />
                            反过来说：<strong>把冒泡的判断写成 <code className="font-mono">&gt;=</code>，它就变成不稳定的了。</strong>
                            稳定性不是算法名字自带的属性，而是实现细节决定的。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">稳定性在多关键字排序里的意义</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            这是稳定性<strong>唯一真正重要</strong>的场景。
                            需求：先按班级排，班级相同的再按分数排。有两种做法：
                        </p>
                        <CompareTable
                            headers={['做法', '写法', '要求']}
                            rows={[
                                ['一次排序，比较函数写全', 'sort + cmp 里先比班级、再比分数', '不需要稳定'],
                                ['两次排序，从次要到主要', '先 stable_sort 按分数，再 stable_sort 按班级', '第二次必须稳定'],
                            ]}
                        />
                        <CodeBlock>{`struct Student { int cls, score; string name; };

// 做法一：推荐。一个比较函数说清全部规则
sort(v.begin(), v.end(), [](const Student& a, const Student& b) {
    if (a.cls != b.cls) return a.cls < b.cls;   // 主关键字
    return a.score > b.score;                    // 次关键字：分数降序
});

// 做法二：分两步，顺序是「先次要，后主要」
stable_sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.score > b.score; });
stable_sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.cls < b.cls; });
// 第二次排班级时，稳定性保住了上一步排好的分数顺序。
// 如果第二次用了 sort（不保证稳定），分数顺序可能被打乱。`}</CodeBlock>
                        <Callout icon={ArrowDownUp} title="做法二为什么是「先次要后主要」" tone="blue">
                            因为最后一次排序决定了<strong>最外层</strong>的顺序，
                            而它的稳定性又<strong>保住了之前排好的内层顺序</strong>。
                            所以要倒着做：先排最次要的关键字，最后排最主要的。
                            <br /><br />
                            实际做题时建议用做法一——一个比较函数写清所有规则，
                            不依赖稳定性，也不容易搞错顺序。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">sort 与 stable_sort</h3>
                        <CompareTable
                            headers={['', 'sort', 'stable_sort']}
                            rows={[
                                ['稳定性', '不保证', '保证'],
                                ['时间复杂度', 'O(n log n)', 'O(n log n)，常数略大'],
                                ['额外空间', 'O(log n)', '可能需要 O(n)'],
                                ['底层', '快排 + 堆排 + 插排混合', '归并类算法'],
                                ['什么时候用', '默认用它', '明确需要保住同键值原顺序时'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="比较函数必须是「严格弱序」" tone="rose">
                            传给 sort 的比较函数，<strong>两个元素相等时必须返回 false</strong>。
                            写成 <code className="font-mono">return a &lt;= b;</code> 是错的——
                            相等时返回 true 会让 sort 的内部逻辑判断失效，
                            可能<strong>越界访问导致程序崩溃</strong>，而不只是排错。
                            <br /><br />
                            记法：比较函数问的是「a 必须严格排在 b 前面吗」，
                            相等时答案是「不必须」，所以返回 false。一律用
                            <code className="font-mono">&lt;</code> 或 <code className="font-mono">&gt;</code>，
                            不用 <code className="font-mono">&lt;=</code>、<code className="font-mono">&gt;=</code>。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '选择排序为什么不稳定？',
                            answer: '远距离交换会跨过中间元素',
                            reason: 'swap(a[i], a[mn]) 把区间首位的元素扔到 mn 位置，可能越过与它键值相等的元素，从而颠倒两者的原有先后。冒泡和插入只做相邻移动且相等时不动，所以稳定。',
                        }, {
                            question: '要「先按班级、班级内按分数」排序，用两次排序的话顺序该怎么定？',
                            answer: '先排分数，再排班级',
                            reason: '最后一次排序决定最外层顺序，而它的稳定性保住之前排好的内层顺序。所以先排次要关键字（分数），最后排主要关键字（班级），且第二次必须用 stable_sort。',
                        }, {
                            question: '给 sort 的比较函数写成 return a <= b; 会怎样？',
                            answer: '可能崩溃',
                            reason: '比较函数必须满足严格弱序：相等时返回 false。返回 true 会破坏 sort 内部的边界判断，可能越界访问导致运行时崩溃，不只是结果错。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把 5 2 9 1 7 3 分别用冒泡、选择、插入手推第 1 趟和第 2 趟，与实验台核对。',
                                '实现三种排序，每趟结束后打印整个数组，验证你手推的结果。',
                                '用「甲90 乙85 丙90 丁85 戊95」这组数据跑选择排序和插入排序，观察甲丙顺序是否改变。',
                                '把冒泡的判断从 > 改成 >=，用同一组数据验证它变成了不稳定的。',
                                '用 sort 和 stable_sort 各排一次同一份含重复键值的数据，对比结果。',
                                '故意把比较函数写成 return a <= b;，用较大的数据量（如 10000 个元素）运行，观察是否崩溃。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="一道题：给 n 个学生的姓名和成绩，要求按成绩从高到低输出；成绩相同的，按输入的先后顺序输出。n ≤ 10⁵。请说明该怎么实现，并指出有几种可行方案。"
                            hint="「按输入先后」意味着原始顺序本身就是一个关键字——想想有没有办法把它变成显式的数据。"
                            answer={`方案一（推荐，不依赖稳定性）：读入时给每个学生记一个下标 idx（第几个输入的），然后用 sort 配一个完整的比较函数：成绩不同时按成绩降序，成绩相同时按 idx 升序。这样比较规则是全序的，用 sort 就行，O(n log n)，不需要 stable_sort。

方案二：直接用 stable_sort，比较函数只写「成绩降序」。由于 stable_sort 保证同键值元素保持输入时的相对顺序，「按输入先后」自动满足。代码更短，但依赖稳定性这个隐含性质。

方案三（错误示范）：用 sort 且比较函数只写成绩降序。sort 不保证稳定，同分学生的输出顺序不确定——可能碰巧对，换个数据或换个编译器就错。这是这类题最常见的错法，而且小样例往往测不出来。

两点提醒：一是比较函数里成绩相同时要返回 idx 的严格小于（return a.idx < b.idx），不能写 <=；二是 n = 10⁵ 时必须用 O(n log n) 的 sort，手写冒泡的 10¹⁰ 次操作会超时。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能解释稳定性在多关键字排序中的意义，知道两次排序要「先次要后主要」',
                                '我能说明选择排序为什么不稳定，以及冒泡改成 >= 后也会变得不稳定',
                                '我能判断题目是否要求稳定排序，并知道加下标可以绕开对稳定性的依赖',
                                '我能手推冒泡、选择、插入各一趟的结果，清楚三者「一趟」的含义不同',
                                '我知道比较函数必须满足严格弱序，写成 <= 可能导致崩溃',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
