import React, { useMemo, useState } from 'react';
import { CaseSensitive, ClipboardCheck, Search, Sparkles, TextSearch } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '字符串处理' },
    { id: 2, title: '字符统计', category: '计数模板' },
    { id: 3, title: '大小写转换', category: 'ASCII 应用' },
    { id: 4, title: '查找、截取、替换与分割', category: '常用函数' },
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
                    <label htmlFor="l3-string-transform-input" className="block text-sm font-black text-slate-700">输入字符串</label>
                    <input
                        id="l3-string-transform-input"
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
                        <p className="mt-1 break-all font-mono text-lg font-black text-rose-700">{result.upper || '（空字符串）'}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-rose-100">
                        <p className="text-xs font-black uppercase text-slate-400">转小写</p>
                        <p className="mt-1 break-all font-mono text-lg font-black text-blue-700">{result.lower || '（空字符串）'}</p>
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
    {
        question: 'replace(pos, len, text) 会怎样改变原字符串？',
        answer: '从 pos 开始移除最多 len 个字符，再插入 text',
        reason: 'replace 会直接修改原字符串；先用 find 找位置时，要检查是否为 string::npos。',
    },
    {
        question: 'C++11 中按空白把一整行分成单词，用什么组合？',
        answer: 'getline 读整行，再用 istringstream >> word 逐个读取',
        reason: 'C++11 的 string 没有 split 成员；流提取会跳过连续空白，读不到单词时循环结束。',
    },
];

function CharCountTracer() {
    const s = 'a1b2';
    const steps = useMemo(() => {
        const result = [{ active: [0, 1], vars: { i: '–', digit: 0, letter: 0 } }];
        let digit = 0;
        let letter = 0;
        for (let i = 0; i < s.length; i += 1) {
            const c = s[i];
            const isDigit = c >= '0' && c <= '9';
            const isLetter = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
            if (isDigit) digit += 1;
            if (isLetter) letter += 1;
            result.push({
                active: [3, 4, 6, 7, 8],
                vars: { i, digit, letter },
                action: i === 0 ? '开始统计' : '下一个字符',
                row: [`i = ${i}`, c, isDigit ? '数字 → digit++' : isLetter ? '字母 → letter++' : '其他', digit, letter],
            });
        }
        result.push({
            active: [3],
            vars: { i: s.length, digit, letter },
            action: '退出',
            output: `digit = ${digit}，letter = ${letter}`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="字符统计追踪器"
            code={`int digit = 0;
int letter = 0;

for (int i = 0; i < s.size(); i++) {
  char c = s[i];

  if (c >= '0' && c <= '9') digit++;
  if ((c >= 'a' && c <= 'z') ||
      (c >= 'A' && c <= 'Z')) letter++;
}`}
            varOrder={['i', 'digit', 'letter']}
            columns={['i', 'c', '判断', 'digit', 'letter']}
            steps={steps}
            hint="点击「开始统计」，看 digit / letter 怎么累加 →"
        />
    );
}

function StringAdvPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <PredictCheck
                prompt={'写 s[i] -= 32 转大写，如果不先判断范围，遇到数字 5 会怎样？'}
                options={['没事，数字不受影响', '会被改成别的字符，结果出错']}
                correctIndex={1}
                explanation={"字符 5 的 ASCII 是 53，减 32 变成 21，是另一个字符。必须先确认 s[i] 在 'a' 到 'z' 之间再转。"}
                misconception="以为减 32 只会影响字母，不会动到数字和标点。"
            />
            <PredictCheck
                prompt={'s.find("ab") 没找到时返回什么？'}
                options={['返回 -1', '返回 string::npos']}
                correctIndex={1}
                explanation="find 找不到会返回 string::npos，这是 string::size_type 的特殊值。用 string::size_type 保存位置，并与 string::npos 比较；不要依赖 -1 与无符号数比较时的隐式转换。"
                misconception="用 int 保存查找结果，或把失败值直接当作普通的 -1。"
            />
            <PredictCheck
                prompt={'s.substr(2, 3) 截出来的是哪一段？'}
                options={['下标 2 到下标 3 的字符', '从下标 2 开始的 3 个字符']}
                correctIndex={1}
                explanation="substr(pos, len) 第二个参数是长度，不是结束下标。所以是从下标 2 起数 3 个。"
                misconception="把 substr 第二个参数当成结束位置。"
            />
            <PredictCheck
                prompt={'string s = "banana"; 找到首次出现的 "ana" 后，执行 s.replace(pos, 3, "o")，s 变成什么？'}
                options={['"bona"（只替换首次匹配）', '"boo"（替换所有匹配）']}
                correctIndex={0}
                explanation="find 首次找到 ana 的起点是 1；replace 从下标 1 移除 3 个字符并插入 o，所以 banana → bona。它不会自动继续搜索并替换其他匹配。"
                misconception="把一次 replace 当作全局替换。"
            />
        </div>
    );
}

function SplitPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <PredictCheck
                prompt={'整行是 "  red   blue  "，用 istringstream >> word 反复读取，会得到几个单词？'}
                options={['2 个：red、blue', '5 个：连续空格也算单词']}
                correctIndex={0}
                explanation="流提取跳过行首、行尾和连续的空白，只读到 red、blue 两个非空单词；全空白行得到 0 个。"
                misconception="把空格数量当成分割后的单词数量。"
            />
            <PredictCheck
                prompt={"用 getline(input, part, ',') 分割 \"a,,b\"，中间连续两个逗号会怎样？"}
                options={['得到 a、空字符串、b', '只得到 a、b，空字段会自动跳过']}
                correctIndex={0}
                explanation="指定逗号为分隔符时，两枚逗号之间没有字符，因此中间会得到一个空字符串；这与按空白使用 >> 时跳过连续空白不同。"
                misconception="把按空白提取和按指定分隔符 getline 的空字段规则混为一谈。"
            />
        </div>
    );
}

const advStringMasteryItems = [
    {
        label: '能写出“先判断范围，再转换”的大小写模板。',
        evidence: '转换前先确认 s[i] 是目标字母，不会误改数字或标点。',
        retryHint: '回到“只转换字母”，想想数字 5 减 32 会变成什么。',
    },
    {
        label: '能手推一次字符统计：遍历 + if + 计数器。',
        evidence: '能说出 digit、letter 各由哪条 if 累加出来。',
        retryHint: '回到字符统计追踪器，逐字符点一次。',
    },
    {
        label: '能正确判断 find 是否找到。',
        evidence: '知道找不到返回 string::npos，要用 != string::npos 判断。',
        retryHint: '用 string::size_type 保存位置，再与 string::npos 比较。',
    },
    {
        label: '能先查找再安全替换或截取。',
        evidence: '用 string::npos 判断是否找到；找到后才能按题意调用 replace 或 substr，并说清只处理首次匹配。',
        retryHint: '别想一次写完，先拆成独立的小步骤。',
    },
    {
        label: '能按题目的分隔规则选择分词方法。',
        evidence: '按空白用 istringstream >> word，连续空白会跳过；按逗号用 getline(input, part, \',\')，能保留中间空字段。',
        retryHint: '回到分割对照，分别手推全空白行和 a,,b。',
    },
];

export default function CppL3Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="字符串进阶操作"
            lessonSubtitle="统计、转换、查找、截取、替换与分割"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/7"
            nextPath="/lesson/3/9"
            topSupport={<CppL3LessonSupport lessonId={8} />}
            bottomSupport={<CppL3LessonSupport lessonId={8} placement="bottom" />}
            hero={{
                title: '字符串题本质是字符遍历加规则判断',
                description: '本课把字符串处理拆成统计、大小写转换、查找、截取、替换与分割几个动作，再练习按题意组合使用。',
            }}
            goals={['能统计数字、字母、空格等字符类型', '能按字符范围转换大小写', '能查找、截取、替换并按规则分割字符串']}
            prerequisites={['用下标遍历字符串', '知道字符就是 ASCII 数值', '写 for + if 做条件计数']}
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
                        <CharCountTracer />
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
                            <h3 className="text-3xl font-black text-slate-950">查找、截取与替换：先确认位置</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>find</code> 找首次出现的位置，<code>substr</code> 截取子串，<code>replace</code> 修改原字符串。先判断是否找到，再使用位置。
                            </p>
                        </div>
                        <CompareTable
                            headers={['函数', '示例', '含义']}
                            rows={[
                                ['find', 's.find("abc")', '查找 abc 第一次出现的位置'],
                                ['npos', 'pos == string::npos', '表示没有找到'],
                                ['substr', 's.substr(2, 3)', '从下标 2 开始截 3 个字符'],
                                ['replace', 's.replace(pos, 3, "o")', '从 pos 开始移除最多 3 个字符，并插入 o；会修改 s'],
                            ]}
                        />
                        <CodeBlock>{`string s = "hello world";

string::size_type pos = s.find("world");
if (pos != string::npos) {
  cout << "found at " << pos << endl;
}

cout << s.substr(0, 5); // hello`}</CodeBlock>
                        <Callout icon={Search} title="只替换第一次找到的片段" tone="rose">
                            <p>下面的完整程序输出 <code>bona</code>。如果 <code>find</code> 返回 <code>string::npos</code>，保持原串不变；一次 <code>replace</code> 不会自动替换所有匹配。</p>
                        </Callout>
                        <CodeBlock>{`#include <iostream>
#include <string>
using namespace std;

int main() {
  string s = "banana";
  string::size_type pos = s.find("ana");
  if (pos != string::npos) {
    s.replace(pos, 3, "o");
  }
  cout << s << '\\n'; // bona
  return 0;
}`}</CodeBlock>
                        <StringAdvPredictionChecks />
                        <div>
                            <h4 className="text-2xl font-black text-slate-950">字符串分割：先确定分隔符</h4>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                C++11 的 <code>string</code> 没有 <code>split</code> 成员。按空格、制表符等空白分词，可先用 <code>getline</code> 读整行，再用 <code>istringstream</code> 提取；若题目指定逗号，则用带分隔符的 <code>getline</code>。
                            </p>
                        </div>
                        <CodeBlock>{`#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
  string line;
  getline(cin, line); // 保留行内空格
  istringstream input(line);
  string word;
  int count = 0;
  while (input >> word) {
    cout << '[' << word << ']';
    count++;
  }
  cout << " count=" << count << '\\n';
  return 0;
}`}</CodeBlock>
                        <Callout icon={TextSearch} title="空白与逗号的规则不同" tone="rose">
                            <p><code>"  red   blue  "</code> 经上面的程序得到 <code>[red][blue] count=2</code>；全空白行得到 <code>count=0</code>。逗号分隔时可写 <code>while (getline(input, part, ','))</code>，中间连续逗号会产生空字段；行末逗号后的空字段若需要保留，还须按题意单独处理。</p>
                        </Callout>
                        <CodeBlock>{`istringstream input("a,,b");
string part;
while (getline(input, part, ',')) {
  cout << '[' << part << ']';
}
// 输出 [a][][b]`}</CodeBlock>
                        <SplitPredictionChecks />
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
                        <TransferCheck
                            prompt={'换个例子：string s = "abcdef";。s.substr(2, 3) 返回什么？s.find("cd") 返回什么？'}
                            hint="substr(起始下标, 长度)；find 返回首次出现的起始下标，找不到返回 string::npos。"
                            answer={'s.substr(2, 3) = "cde"；s.find("cd") = 2。'}
                            steps={[
                                'substr(2, 3)：从下标 2（字符 c）起，取 3 个字符 → "cde"。',
                                'find("cd")：在 s 里首次出现 "cd" 的起始下标是 2。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L3-8 字符串进阶离开前检查"
                            description="进阶字符串题要先判字符范围、查找结果和分隔规则。勾选前手推含数字的转换、未找到时的替换，以及连续分隔符的结果。"
                            items={advStringMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入一个字符串，统计其中数字字符的个数。</li>
                                <li>读入一个字符串，把所有小写字母转成大写。</li>
                                <li>读入一个字符串和一个关键词，判断关键词是否出现，并输出第一次出现的位置。</li>
                                <li>找到关键词后只替换第一次出现的位置；未找到时原样输出。</li>
                                <li>读入一整行，分别按空白和按逗号分割；记录空行、连续分隔符和行末逗号的结果。</li>
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
