import React, { useMemo, useState } from 'react';
import { Binary, ClipboardCheck, Repeat2, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '相邻只差一位' },
    { id: 2, title: '格雷码规律', category: '镜像构造' },
    { id: 3, title: '位运算公式', category: 'n^(n>>1)' },
    { id: 4, title: '递归生成', category: '前缀拼接' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function toBinary(value, width) {
    return value.toString(2).padStart(width, '0');
}

function GrayLab() {
    const [bits, setBits] = useState(3);
    const rows = useMemo(() => {
        const size = 2 ** bits;
        return Array.from({ length: size }, (_, n) => ({
            n,
            binary: toBinary(n, bits),
            gray: toBinary(n ^ (n >> 1), bits),
        }));
    }, [bits]);

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Binary className="text-slate-700" />
                <h3 className="text-xl font-black text-slate-950">格雷码观察台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
                    <label className="block text-sm font-black text-slate-700">位数 = {bits}</label>
                    <input type="range" min="2" max="5" value={bits} onChange={(event) => setBits(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        格雷码序列中相邻两个编码只差一位，适合用来理解二进制变化和递归镜像构造。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
                    <div className="grid max-h-72 gap-2 overflow-y-auto">
                        {rows.map((row, index) => (
                            <div key={row.n} className="grid grid-cols-[3rem_1fr_1fr] gap-2 rounded-lg bg-slate-100 px-3 py-2 font-mono text-sm font-black text-slate-700">
                                <span>{index}</span>
                                <span>{row.binary}</span>
                                <span className="text-blue-700">{row.gray}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-xs font-bold text-slate-500">列：序号 / 普通二进制 / 格雷码</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '格雷码相邻编码有什么特点？',
        answer: '只差一位',
        reason: '这是格雷码最核心的性质。',
    },
    {
        question: '整数 n 的格雷码公式是什么？',
        answer: 'n ^ (n >> 1)',
        reason: '右移后和原数异或，可以快速得到对应格雷码。',
    },
    {
        question: '镜像构造时新一半前缀加什么？',
        answer: '加 1',
        reason: '原序列加 0，反向镜像序列加 1。',
    },
];

function GrayPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'格雷码公式写成 n ^ (n << 1)（左移）行不行？'}
                options={['行，左右移一样', '不行，必须是右移 n >> 1']}
                correctIndex={1}
                explanation="格雷码是 n ^ (n >> 1)。右移让每一位和它的高一位异或；左移会越界且改变最低位含义，得到的不是格雷码。"
                misconception="把左移右移当成可互换，没理解公式里右移的作用。"
            />
            <PredictCheck
                prompt={'镜像构造扩位时，第二半直接复制原序列（不反向）会怎样？'}
                options={['没问题', '中间衔接处会差超过一位']}
                correctIndex={1}
                explanation="格雷码要求相邻只差一位。第二半必须反向，才能让 0 段最后一个和 1 段第一个仅前缀不同；不反向衔接处就会差两位。"
                misconception="忽略了第二半反向的意义，以为只是加个前缀。"
            />
            <PredictCheck
                prompt={'n 位格雷码一共有多少个编码？'}
                options={['2n 个', '2ⁿ 个']}
                correctIndex={1}
                explanation="n 位二进制有 2ⁿ 种取值，格雷码是它们的一个重排，所以同样是 2ⁿ 个，每次镜像构造规模翻倍。"
                misconception="把 2ⁿ 误算成 2n，规模量级完全不同。"
            />
        </div>
    );
}

const grayMasteryItems = [
    {
        label: '能说出格雷码的核心性质。',
        evidence: '相邻两个编码只差一位。',
        retryHint: '回到课程导入观察台。',
    },
    {
        label: '能用位运算公式求格雷码。',
        evidence: 'gray = n ^ (n >> 1)，是右移不是左移。',
        retryHint: '回到位运算公式一节。',
    },
    {
        label: '能用镜像法递归生成。',
        evidence: '原序列加 0，反向序列加 1，规模翻倍到 2ⁿ。',
        retryHint: '回到递归生成，注意第二半要反向。',
    },
    {
        label: '能解释镜像为什么保证只差一位。',
        evidence: '反向让衔接处仅前缀不同，内部继承上一层性质。',
        retryHint: '回到「递归口令」提示。',
    },
];

export default function CppL6Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="特殊的编码 (格雷码)"
            lessonSubtitle="相邻状态只改变一位"
            accent="slate"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/8"
            nextPath="/lesson/6/10"
            topSupport={<CppL6LessonSupport lessonId={9} />}
            bottomSupport={<CppL6LessonSupport lessonId={9} placement="bottom" />}
            hero={{
                title: '格雷码把二进制变化变得温柔：每次只动一位',
                description: '本课从镜像构造和位运算公式理解格雷码，连接递归、编码和二进制操作。',
            }}
            goals={['能解释格雷码相邻只差一位', '能用镜像法生成 n 位格雷码', '能写出 n^(n>>1) 公式']}
            prerequisites={['理解二进制和位运算（^、>>）', '会写简单递归并理解返回值', '理解 2ⁿ 这种指数规模']}
            childrenBySection={{
                1: <GrayLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">镜像构造：旧序列前面加 0，反向旧序列前面加 1</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                1 位格雷码是 0、1。扩展到 2 位时，先保留原顺序加 0，再反向加 1，得到 00、01、11、10。
                            </p>
                        </div>
                        <CompareTable
                            headers={['位数', '构造', '结果']}
                            rows={[
                                ['1 位', '基础', '0, 1'],
                                ['2 位', '0+原序列，1+反序列', '00, 01, 11, 10'],
                                ['3 位', '继续镜像', '000, 001, 011, 010, ...'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">位运算公式：gray = n ^ (n &gt;&gt; 1)</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>&gt;&gt; 1</code> 表示右移一位，<code>^</code> 表示异或。相邻位不同的位置会变成 1。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int gray(int n) {
  return n ^ (n >> 1);
}

for (int i = 0; i < (1 << k); i++) {
  cout << bitset<8>(gray(i)) << endl;
}`}</CodeBlock>
                            <StepList steps={[
                                '确认编码位数 k',
                                '枚举 0 到 2^k-1',
                                '用 n^(n>>1) 得到格雷码',
                                '按固定位数输出二进制',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递归生成：把“上一层答案”变成“下一层答案”</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果题目要求输出字符串形式，镜像递归比位运算更直观。
                            </p>
                        </div>
                        <CodeBlock>{`vector<string> build(int k) {
  if (k == 1) return {"0", "1"};

  vector<string> prev = build(k - 1);
  vector<string> ans;
  for (string s : prev) ans.push_back("0" + s);
  for (int i = prev.size() - 1; i >= 0; i--) {
    ans.push_back("1" + prev[i]);
  }
  return ans;
}`}</CodeBlock>
                        <Callout icon={Repeat2} title="递归口令" tone="slate">
                            扩一位时不要打乱旧序列，第二半必须反向，才能保证中间衔接也只差一位。
                        </Callout>
                        <GrayPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                格雷码题建议同时写镜像法和公式法，分别训练递归和位运算。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：用公式 gray = n ^ (n>>1) 求十进制 6 的格雷码。写出步骤。'}
                            hint="n 的二进制和「n 右移一位」做按位异或。"
                            answer="6 的格雷码是 101（二进制），即十进制 5。"
                            steps={[
                                '6 = 110。',
                                '6 >> 1 = 011。',
                                '110 ^ 011 = 101 → 格雷码 101（十进制 5）。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-9 格雷码离开前检查"
                            description="格雷码最怕“公式记成左移、镜像第二半忘了反向”。勾选前先手推 2 位到 3 位的镜像扩展。"
                            items={grayMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输出 3 位和 4 位格雷码序列。</li>
                                <li>用公式计算 0..15 对应的格雷码。</li>
                                <li>证明镜像构造中间衔接处也只差一位。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课把 OOP 的类、继承、多态合并到一个完整小项目里。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
