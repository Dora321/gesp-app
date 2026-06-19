import React, { useMemo, useState } from 'react';
import { CaseSensitive, ClipboardCheck, Search, Sparkles, TextSearch } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '字符串处理' },
    { id: 2, title: '字符统计', category: '计数模板' },
    { id: 3, title: '大小写转换', category: 'ASCII 应用' },
    { id: 4, title: '查找与子串', category: '常用函数' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function StringTransformLab() {
    const [text, setText] = useState('Gesp Level 3');

    const result = useMemo(() => {
        let letters = 0;
        let digits = 0;
        let spaces = 0;
        let upper = '';
        let lower = '';

        for (const char of text) {
            if (char >= '0' && char <= '9') digits++;
            if (char === ' ') spaces++;
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) letters++;
            upper += char >= 'a' && char <= 'z' ? String.fromCharCode(char.charCodeAt(0) - 32) : char;
            lower += char >= 'A' && char <= 'Z' ? String.fromCharCode(char.charCodeAt(0) + 32) : char;
        }

        return { letters, digits, spaces, upper, lower };
    }, [text]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Sparkles className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">字符串变换实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">输入字符串</label>
                    <input
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    <p className="mt-3 text-xs font-bold text-slate-500">可以输入字母、数字和空格</p>
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-rose-100">
                        <p className="text-xs font-black uppercase text-slate-400">统计</p>
                        <p className="mt-1 text-sm font-black text-slate-700">字母 {result.letters} · 数字 {result.digits} · 空格 {result.spaces}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-rose-100">
                        <p className="text-xs font-black uppercase text-slate-400">转大写</p>
                        <p className="mt-1 break-all font-mono text-lg font-black text-rose-700">{result.upper || '空'}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-rose-100">
                        <p className="text-xs font-black uppercase text-slate-400">转小写</p>
                        <p className="mt-1 break-all font-mono text-lg font-black text-blue-700">{result.lower || '空'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '统计数字字符时，条件怎么写？',
        answer: "c >= '0' && c <= '9'",
        reason: '字符数字在 ASCII 中是连续排列的。',
    },
    {
        question: '小写字母转大写，可以减多少？',
        answer: '32',
        reason: 'ASCII 中同一个字母的小写码值比大写码值大 32。',
    },
    {
        question: 'substr(pos, len) 的第二个参数表示什么？',
        answer: '截取长度',
        reason: 'pos 是开始位置，len 是要截取几个字符。',
    },
];

export default function CppL3Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="字符串进阶操作"
            lessonSubtitle="统计、转换、查找和子串"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/7"
            nextPath="/lesson/3/9"
            hero={{
                title: '字符串题本质是字符遍历加规则判断',
                description: '本课把字符串处理拆成四类高频动作：统计字符、大小写转换、查找位置、截取子串。三级综合题经常把它们组合起来。',
            }}
            goals={['能统计数字、字母、空格等字符类型', '能用 ASCII 规则进行大小写转换', '能使用 find 和 substr 处理子串']}
            childrenBySection={{
                1: <StringTransformLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">字符统计：每个字符都要经过条件判断</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                统计题的模板是遍历字符串，用 if 判断字符类型，满足条件就让计数器加一。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int digit = 0;
int letter = 0;

for (int i = 0; i < s.size(); i++) {
  char c = s[i];

  if (c >= '0' && c <= '9') digit++;
  if ((c >= 'a' && c <= 'z') ||
      (c >= 'A' && c <= 'Z')) letter++;
}`}</CodeBlock>
                            <StepList steps={[
                                '遍历字符串每个字符',
                                '用 char c 保存当前字符',
                                '判断字符是否在某个范围内',
                                '满足条件就更新计数器',
                            ]} />
                        </div>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">大小写转换：ASCII 差值是 32</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                字母 <code>'a'</code> 到 <code>'z'</code> 连续排列，<code>'A'</code> 到 <code>'Z'</code> 也连续排列。同一个字母大小写相差 32。
                            </p>
                        </div>
                        <CodeBlock>{`for (int i = 0; i < s.size(); i++) {
  if (s[i] >= 'a' && s[i] <= 'z') {
    s[i] = s[i] - 32;
  }
}`}</CodeBlock>
                        <Callout icon={CaseSensitive} title="只转换字母" tone="rose">
                            数字、空格、标点不要直接加减 32。转换前必须先判断它是不是目标范围内的字母。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">查找与子串：用函数减少手写循环</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>find</code> 可以查找字符或字符串第一次出现的位置，<code>substr</code> 可以截取一段字符串。
                            </p>
                        </div>
                        <CompareTable
                            headers={['函数', '示例', '含义']}
                            rows={[
                                ['find', 's.find("abc")', '查找 abc 第一次出现的位置'],
                                ['npos', 'pos == string::npos', '表示没有找到'],
                                ['substr', 's.substr(2, 3)', '从下标 2 开始截 3 个字符'],
                            ]}
                        />
                        <CodeBlock>{`string s = "hello world";

int pos = s.find("world");
if (pos != string::npos) {
  cout << "found at " << pos << endl;
}

cout << s.substr(0, 5); // hello`}</CodeBlock>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习要把“字符范围判断”写清楚，避免把数字或标点误处理成字母。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入一个字符串，统计其中数字字符的个数。</li>
                                <li>读入一个字符串，把所有小写字母转成大写。</li>
                                <li>读入一个字符串和一个关键词，判断关键词是否出现，并输出第一次出现的位置。</li>
                            </ul>
                        </Callout>
                        <Callout icon={TextSearch} title="下一课衔接" tone="blue">
                            下一课会把数组和字符串放在一起处理，例如字符频率统计、去重和简单编码。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
