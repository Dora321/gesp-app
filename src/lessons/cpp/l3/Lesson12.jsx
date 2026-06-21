import React, { useMemo, useState } from 'react';
import { ClipboardCheck, KeyRound, LockKeyhole, RotateCw, Search } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '字符偏移' },
    { id: 2, title: 'Caesar 加密', category: '向后移动' },
    { id: 3, title: '解密与取模', category: '绕回处理' },
    { id: 4, title: '综合模板', category: '大小写与非字母' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function CaesarLab() {
    const [text, setText] = useState('attack');
    const [shift, setShift] = useState(3);

    const encrypted = useMemo(() => {
        let result = '';
        for (const char of text) {
            if (char >= 'a' && char <= 'z') {
                const id = char.charCodeAt(0) - 'a'.charCodeAt(0);
                result += String.fromCharCode('a'.charCodeAt(0) + ((id + shift) % 26));
            } else {
                result += char;
            }
        }
        return result;
    }, [text, shift]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <LockKeyhole className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">Caesar 加密实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">明文</label>
                    <input
                        value={text}
                        onChange={(event) => setText(event.target.value.toLowerCase())}
                        className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    <label className="mt-5 block text-sm font-black text-slate-700">偏移量：{shift}</label>
                    <input type="range" min="0" max="25" value={shift} onChange={(event) => setShift(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">密文</p>
                    <p className="mt-2 break-all font-mono text-3xl font-black text-rose-700">{encrypted || '空'}</p>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                        每个小写字母向后移动 {shift} 位，超过 z 后从 a 继续。
                    </p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: "为什么要对 26 取模？",
        answer: '处理 z 后绕回 a',
        reason: '字母表只有 26 个小写字母，取模能让位置留在 0 到 25。',
    },
    {
        question: '解密 Caesar 加密要怎么做？',
        answer: '反向移动',
        reason: '加密加 k，解密就减 k；为了避免负数通常加 26 再取模。',
    },
    {
        question: '非字母字符要不要偏移？',
        answer: '通常不动',
        reason: '除非题目特别说明，空格、数字和标点一般保持原样。',
    },
];

export default function CppL3Lesson12() {
    return (
        <CppLessonShell
            lessonNumber={12}
            lessonTitle="加密与解密"
            lessonSubtitle="用字符偏移和取模处理字母变换"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/11"
            nextPath="/lesson/3/13"
            topSupport={<CppL3LessonSupport lessonId={12} />}
            bottomSupport={<CppL3LessonSupport lessonId={12} placement="bottom" />}
            hero={{
                title: '加密题是字符串、ASCII 和取模的组合训练',
                description: '本课以 Caesar 加密为核心，学习字符偏移、绕回处理、解密反推和非字母保留。',
            }}
            goals={['能写出 Caesar 加密公式', '能用取模处理字母绕回', '能区分字母与非字母字符']}
            childrenBySection={{
                1: <CaesarLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">Caesar 加密：字母向后移动 k 位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                先把字母转成 0 到 25 的编号，加上偏移量，再转回字符。
                            </p>
                        </div>
                        <CodeBlock>{`char encrypt(char c, int k) {
  int id = c - 'a';
  int next = (id + k) % 26;
  return 'a' + next;
}`}</CodeBlock>
                        <Callout icon={KeyRound} title="编号思想" tone="rose">
                            <code>'a'</code> 到 <code>'z'</code> 先变成 0 到 25，做完数学运算后再变回字符。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">解密与取模：反方向移动也要防负数</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                解密时从密文字母向前移动 k 位。如果直接减可能变成负数，所以常写成 <code>(id - k + 26) % 26</code>。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`char decrypt(char c, int k) {
  int id = c - 'a';
  int prev = (id - k + 26) % 26;
  return 'a' + prev;
}`}</CodeBlock>
                            <StepList steps={[
                                '字符转编号 id',
                                '反向移动 id - k',
                                '加 26 防止负数',
                                '对 26 取模后转回字符',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">综合模板：只处理题目要求的字符</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                真题里常出现大小写、数字、空格、标点混合。最稳的写法是先分类，再分别处理。
                            </p>
                        </div>
                        <CompareTable
                            headers={['字符类型', '判断条件', '常见处理']}
                            rows={[
                                ['小写字母', "c >= 'a' && c <= 'z'", '按 26 个字母偏移'],
                                ['大写字母', "c >= 'A' && c <= 'Z'", '同样偏移，但基准是 A'],
                                ['其他字符', 'else', '通常原样保留'],
                            ]}
                        />
                        <CodeBlock>{`for (int i = 0; i < s.size(); i++) {
  char c = s[i];
  if (c >= 'a' && c <= 'z') {
    s[i] = 'a' + (c - 'a' + k) % 26;
  } else if (c >= 'A' && c <= 'Z') {
    s[i] = 'A' + (c - 'A' + k) % 26;
  }
}`}</CodeBlock>
                        <Callout icon={RotateCw} title="别把 ASCII 偏移写成纯加法" tone="amber">
                            直接写 <code>c + k</code> 会把 z 推到非字母字符。字母循环必须用取模处理。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                加密题最适合检查边界：a、z、A、Z、空格、数字都要单独测。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入小写字符串和 k，输出 Caesar 加密结果。</li>
                                <li>读入密文和 k，输出解密结果。</li>
                                <li>扩展到大小写字母都能处理，非字母保持不变。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课回到图形打印。它会继续训练循环、模拟和边界控制，只是输出变成二维图案。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
