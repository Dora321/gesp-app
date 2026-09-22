import React, { useMemo, useState } from 'react';
import { ClipboardCheck, FileText, Search, Type, WholeWord } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, TransferCheck } from '../CppLessonShell';

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

    const isAscii = useMemo(() => /^[\x20-\x7E]*$/.test(text), [text]);
    const chars = useMemo(() => (isAscii ? text.split('') : []), [isAscii, text]);
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
                    <label htmlFor="l3-string-index-input" className="block text-sm font-black text-slate-700">字符串 s（ASCII 演示）</label>
                    <input
                        id="l3-string-index-input"
                        value={text}
                        onChange={handleTextChange}
                        className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    {!isAscii && <p className="mt-3 text-sm font-bold text-rose-700">本实验只演示 ASCII 单字节字符；C++ string 对 UTF-8 中文通常按多个字节计数。</p>}
                    <label htmlFor="l3-string-index-range" className="mt-5 block text-sm font-black text-slate-700">下标：{isAscii && chars.length ? safeIndex : '不可用'}</label>
                    <input
                        id="l3-string-index-range"
                        type="range"
                        min="0"
                        max={Math.max(0, chars.length - 1)}
                        value={safeIndex}
                        onChange={(event) => setActiveIndex(Number(event.target.value))}
                        className="mt-3 w-full"
                        disabled={!isAscii || !chars.length}
                    />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">s.size() = {isAscii ? chars.length : '暂停计算'}</p>
                    <p className="mt-2 font-mono text-3xl font-black text-rose-700">
                        {!isAscii ? '请输入 ASCII 字符' : chars.length ? `s[${safeIndex}] = '${current}'` : '空字符串'}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {chars.map((char, index) => (
                            <button
                                key={`${char}-${index}`}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                aria-label={`查看下标 ${index}，字符 ${char}`}
                                aria-pressed={safeIndex === index}
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
        reason: '非空字符串的最后一个字符下标是长度减 1；空字符串没有最后一个字符。',
    },
    {
        question: 'cin >> s 会读入空格后面的内容吗？',
        answer: '不会',
        reason: '流提取遇到空格、制表符或换行等空白会停止，整行文本要用 getline。',
    },
    {
        question: '能直接写 string s = "ab" + "cd"; 吗？',
        answer: '不能，至少一侧先要是 string',
        reason: '两侧都是字符串字面量时没有 std::string 的 + 运算；可写 string("ab") + "cd"。',
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

for (string::size_type i = 0; i < s.size(); i++) {
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
        <div className="grid gap-4 lg:grid-cols-2">
            <PredictCheck
                prompt={'string s = "cat"; 最后一个字符写成 s[3] 取得到吗？'}
                options={['取得到，是 t', '取不到，最后是 s[2]']}
                correctIndex={1}
                explanation="长度是 3，实际字符的下标只有 0、1、2；最后一个是 s[2]。s[3] 不是字符 t，不能当作最后一个字符使用。"
                misconception="把字符串长度直接当成最后一个下标。"
            />
            <PredictCheck
                prompt={'string s = ""; 可以用 s[s.size() - 1] 读取最后一个字符吗？'}
                options={['可以，空串也有最后一个字符', '不可以，空串没有最后一个字符，减 1 会出错']}
                correctIndex={1}
                explanation="s.size() 为 0 时没有合法的字符下标；先判断 !s.empty()，再访问 s[s.size() - 1]。"
                misconception="记住了“长度减 1”，却忘了先确认字符串非空。"
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
            <PredictCheck
                prompt={'下面哪个能在 C++11 中拼出 "abcd"？'}
                options={['"ab" + "cd"', 'string("ab") + "cd"']}
                correctIndex={1}
                explanation="两个字符串字面量不能直接相加。把至少一侧变成 std::string 后，才会调用 string 的拼接运算符。"
                misconception="看到两个文本就认为 + 一定表示字符串拼接。"
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
        evidence: '能说明非空字符串的最后一个字符是 s[n - 1]，空串要先判断，s[n] 不是最后一个字符。',
        retryHint: '回到下标实验台，把 size() 和最大合法下标分开写。',
    },
    {
        label: '能手推一次字符串遍历，并知道 s[i] 是一个 char。',
        evidence: '能用 string::size_type 遍历 0 到 size()-1；每个 s[i] 是单字符，要用单引号比较。',
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
            prerequisites={['用 cin / cout 读写数据', '写 for 循环按下标遍历', '理解数组下标从 0 开始']}
            childrenBySection={{
                1: <StringLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">读入与长度：string 会自动管理容量</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                使用 <code>string</code> 要包含标准头文件 <code>&lt;string&gt;</code>。本课示例同时使用输入输出，因此也包含 <code>&lt;iostream&gt;</code>；<code>&lt;bits/stdc++.h&gt;</code> 不是 C++ 标准头文件，不作为可移植模板。
                            </p>
                        </div>
                        <CodeBlock>{`#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
cin >> s;

cout << s << endl;
  cout << s.size() << endl;
  return 0;
}`}</CodeBlock>
                        <Callout icon={FileText} title="cin 和 getline 的区别" tone="rose">
                            <ul className="space-y-2">
                                <li><code>cin &gt;&gt; s</code>：跳过开头空白，读到下一处空白停止。</li>
                                <li><code>getline(cin, s)</code>：读入一整行，可以包含空格。</li>
                                <li>若先用 <code>cin &gt;&gt; n</code> 读数字，再用 <code>getline</code> 读下一行，可用 <code>cin.ignore(numeric_limits&lt;streamsize&gt;::max(), '\n')</code> 丢弃本行剩余内容；需要包含 <code>&lt;limits&gt;</code>。</li>
                            </ul>
                        </Callout>
                        <CodeBlock>{`#include <iostream>
#include <limits>
#include <string>
using namespace std;

int main() {
  int n;
  string line;
  cin >> n;
  cin.ignore(numeric_limits<streamsize>::max(), '\\n');
  getline(cin, line);
  cout << n << " | " << line << '\\n';
  return 0;
}`}</CodeBlock>
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
                                ['拼接', 'string("ab") + "cd"', '"abcd"'],
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
                        <TransferCheck
                            prompt={'换个例子：string s = "gesp";。请说出 s.length() 的值、s[0] 和 s[s.length()-1] 各是哪个字符，并写出把 s 变成 "gesp!" 的一行代码。'}
                            hint="下标从 0 到 length()-1；在末尾加字符可以直接用 += 拼接。"
                            answer={'length()=4；s[0]=\'g\'，s[3]=\'p\'；s += "!";（或 s = s + "!";）'}
                            steps={[
                                '"gesp" 有 4 个字符，所以 s.length()=4。',
                                '合法下标是 0~3：s[0]=\'g\'，最后一个是 s[4-1]=s[3]=\'p\'（写 s[4] 会越界）。',
                                '在末尾追加用拼接：s += "!"; 之后 s 变成 "gesp!"，length() 变 5。',
                            ]}
                        />
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
                            下一课进入字符串进阶操作：统计、转换、查找、截取、替换和分割。它们都依赖本课的读入与遍历模型。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
