import React, { useMemo, useState } from 'react';
import { ClipboardCheck, FileText, Search, Type, WholeWord } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: 'string 模型' },
    { id: 2, title: '读入与长度', category: '基础操作' },
    { id: 3, title: '下标访问', category: '字符遍历' },
    { id: 4, title: '拼接与比较', category: '常用操作' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function StringLab() {
    const [text, setText] = useState('gesp2026');
    const [activeIndex, setActiveIndex] = useState(0);

    const chars = useMemo(() => text.split(''), [text]);
    const safeIndex = chars.length ? Math.min(activeIndex, chars.length - 1) : 0;
    const current = chars[safeIndex] ?? '';

    const handleTextChange = (event) => {
        const next = event.target.value;
        setText(next);
        setActiveIndex((index) => Math.min(index, Math.max(0, next.length - 1)));
    };

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Type className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">string 下标实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">字符串 s</label>
                    <input
                        value={text}
                        onChange={handleTextChange}
                        className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    <label className="mt-5 block text-sm font-black text-slate-700">下标：{safeIndex}</label>
                    <input
                        type="range"
                        min="0"
                        max={Math.max(0, chars.length - 1)}
                        value={safeIndex}
                        onChange={(event) => setActiveIndex(Number(event.target.value))}
                        className="mt-3 w-full"
                        disabled={!chars.length}
                    />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">s.size() = {chars.length}</p>
                    <p className="mt-2 font-mono text-3xl font-black text-rose-700">
                        {chars.length ? `s[${safeIndex}] = '${current}'` : '空字符串'}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {chars.map((char, index) => (
                            <button
                                key={`${char}-${index}`}
                                onClick={() => setActiveIndex(index)}
                                className={`rounded-lg px-3 py-2 font-mono text-sm font-black ${safeIndex === index ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                            >
                                {index}:{char}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'string s = "abc"; s.size() 是多少？',
        answer: '3',
        reason: '字符串长度就是字符个数。',
    },
    {
        question: '最后一个字符应该写成？',
        answer: 's[s.size() - 1]',
        reason: '下标从 0 开始，最后一个下标是长度减 1。',
    },
    {
        question: 'cin >> s 会读入空格后面的内容吗？',
        answer: '不会',
        reason: 'cin 遇到空白会停止，整行文本要用 getline。',
    },
];

function StringTraverseTracer() {
    const s = 'hello';
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–', 's[i]': '–' } }];
        for (let i = 0; i < s.length; i += 1) {
            result.push({
                active: [2, 3],
                vars: { i, 's[i]': s[i] },
                action: i === 0 ? '开始遍历' : '下一个 i',
                row: [`i = ${i}`, s[i], `输出 ${i}: ${s[i]}`],
            });
        }
        result.push({
            active: [2],
            vars: { i: s.length, 's[i]': '–' },
            action: '判断并结束',
            exit: `i = ${s.length}：${s.length} < s.size() ✗，结束`,
            output: `逐行输出 ${[...s].map((ch, i) => `${i}:${ch}`).join('  ')}`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="字符串遍历追踪器"
            code={`string s = "hello";

for (int i = 0; i < s.size(); i++) {
  cout << i << ": " << s[i] << endl;
}`}
            varOrder={['i', 's[i]']}
            columns={['i', 's[i]', '输出']}
            steps={steps}
            hint="点击「开始遍历」，看每个 s[i] 都是一个 char →"
        />
    );
}

function StringPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'string s = "cat"; 最后一个字符写成 s[3] 取得到吗？'}
                options={['取得到，是 t', '取不到，最后是 s[2]']}
                correctIndex={1}
                explanation="长度是 3，合法下标只有 0、1、2。最后一个是 s[2]，s[3] 已经越界。"
                misconception="把字符串长度直接当成最后一个下标。"
            />
            <PredictCheck
                prompt={'输入 hello world，用 cin >> s 读，s 里装的是？'}
                options={['hello world 整句', '只有 hello']}
                correctIndex={1}
                explanation="cin 遇到空格就停下，所以只读到 hello。要带空格的整行，得用 getline(cin, s)。"
                misconception="以为 cin 能一口气读入带空格的一整行。"
            />
            <PredictCheck
                prompt={'s[i] 是一个字符，判断它是不是字母 a，应该写哪个？'}
                options={['s[i] == "a"', "s[i] == 'a'"]}
                correctIndex={1}
                explanation={"s[i] 是 char，要和单引号的字符 'a' 比。\"a\" 是字符串，类型对不上。"}
                misconception="分不清单引号字符和双引号字符串。"
            />
        </div>
    );
}

const stringMasteryItems = [
    {
        label: '能说清 cin >> s 和 getline 的区别。',
        evidence: '知道 cin 遇空格就停，带空格的整行要用 getline(cin, s)。',
        retryHint: '回到“读入与长度”，想一下读 hello world 会发生什么。',
    },
    {
        label: '能写出字符串最后一个字符的下标。',
        evidence: '能说明长度 n 的字符串，最后一个是 s[n - 1]，s[n] 越界。',
        retryHint: '回到下标实验台，把 size() 和最大合法下标分开写。',
    },
    {
        label: '能手推一次字符串遍历，并知道 s[i] 是一个 char。',
        evidence: '能解释 i 从 0 走到 size()-1，每个 s[i] 是单字符，要用单引号比较。',
        retryHint: '回到字符串遍历追踪器，盯住 i = size() 时为什么停。',
    },
    {
        label: '能把遍历模板迁移到统计类题目。',
        evidence: '例如数某个字母出现几次，只改循环体里的 if 判断。',
        retryHint: '先固定遍历框架，只改循环体那一行。',
    },
];

export default function CppL3Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="字符串魔法 (string)"
            lessonSubtitle="把文本当作可以遍历的一串字符"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/6"
            nextPath="/lesson/3/8"
            topSupport={<CppL3LessonSupport lessonId={7} />}
            bottomSupport={<CppL3LessonSupport lessonId={7} placement="bottom" />}
            hero={{
                title: 'string 像一个字符数组，但更好用',
                description: '本课学习 string 的读入、长度、下标访问、拼接和比较。字符串题的核心仍然是下标、循环和边界。',
            }}
            goals={['能读入和输出 string', '能用 size() 获取长度并遍历字符', '能理解 cin 和 getline 的区别']}
            childrenBySection={{
                1: <StringLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">读入与长度：string 会自动管理容量</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                使用 string 需要包含 <code>&lt;string&gt;</code>，竞赛里常用 <code>#include &lt;bits/stdc++.h&gt;</code> 一次性包含。
                            </p>
                        </div>
                        <CodeBlock>{`string s;
cin >> s;

cout << s << endl;
cout << s.size() << endl;`}</CodeBlock>
                        <Callout icon={FileText} title="cin 和 getline 的区别" tone="rose">
                            <ul className="space-y-2">
                                <li><code>cin &gt;&gt; s</code>：读一个单词，遇到空格停止。</li>
                                <li><code>getline(cin, s)</code>：读入一整行，可以包含空格。</li>
                            </ul>
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">下标访问：string 的每个位置都是 char</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                字符串同样从 0 开始编号。遍历时可以把 <code>s[i]</code> 当作一个字符处理。
                            </p>
                        </div>
                        <StringTraverseTracer />
                        <StringPredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">拼接与比较：string 可以直接用运算符</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                string 支持 <code>+</code> 拼接，也支持 <code>==</code>、<code>&lt;</code>、<code>&gt;</code> 比较。比较时按字典序判断。
                            </p>
                        </div>
                        <CompareTable
                            headers={['操作', '示例', '结果']}
                            rows={[
                                ['拼接', '"ab" + "cd"', '"abcd"'],
                                ['相等判断', 's == "yes"', '完全一样为 true'],
                                ['字典序比较', '"apple" < "banana"', 'true'],
                            ]}
                        />
                        <CodeBlock>{`string first = "hello";
string second = "world";
string both = first + " " + second;

if (both == "hello world") {
  cout << "matched";
}`}</CodeBlock>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                字符串入门阶段，先把读入、长度、遍历、拼接练稳，再去做删除、查找、替换。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L3-7 字符串魔法离开前检查"
                            description="字符串题最怕“看懂代码，但下标一写就越界、cin 一读就漏字”。勾选前先拿一个小例子手推一次。"
                            items={stringMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入一个字符串，输出它的长度。</li>
                                <li>读入一个字符串，逐行输出每个字符和它的下标。</li>
                                <li>读入两个字符串，输出拼接后的结果，并判断它们是否相等。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入字符串进阶操作：统计字符、大小写转换、查找和子串。它们都依赖本课的遍历模型。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
