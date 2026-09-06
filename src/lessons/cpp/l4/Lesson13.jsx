import React, { useState } from 'react';
import { ClipboardCheck, FileText, FolderOpen, Save, Search } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '文件场景' },
    { id: 2, title: 'freopen 用法', category: '输入输出重定向' },
    { id: 3, title: '本地调试模板', category: '安全切换' },
    { id: 4, title: '常见错误', category: '提交诊断' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function FileIoLab() {
    const [baseName, setBaseName] = useState('score');
    const safeName = baseName.trim() || 'score';

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <FolderOpen className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">文件名实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">题目文件前缀</label>
                    <input
                        value={baseName}
                        onChange={(event) => setBaseName(event.target.value)}
                        className="mt-3 w-full rounded-lg border border-indigo-100 px-3 py-2 font-mono text-sm font-bold outline-none focus:border-indigo-400"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        大多数文件题会规定输入文件和输出文件名，代码必须完全匹配。
                    </p>
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 font-mono text-sm font-black text-indigo-700 ring-1 ring-indigo-100">
                        freopen("{safeName}.in", "r", stdin);
                    </div>
                    <div className="rounded-xl bg-white p-4 font-mono text-sm font-black text-emerald-700 ring-1 ring-indigo-100">
                        freopen("{safeName}.out", "w", stdout);
                    </div>
                    <div className="rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-600 ring-1 ring-indigo-100">
                        之后仍然使用 <code>cin</code> 和 <code>cout</code>，只是来源和去向变成了文件。
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'freopen 的作用是什么？',
        answer: '重定向输入输出',
        reason: '可以让 cin 从文件读，让 cout 写到文件。',
    },
    {
        question: '"r" 和 "w" 分别表示什么？',
        answer: '读文件和写文件',
        reason: '"r" 用于读取输入文件，"w" 用于创建或覆盖输出文件。',
    },
    {
        question: '使用 freopen 后还要改 cin/cout 吗？',
        answer: '不用',
        reason: '标准输入输出已经被重定向，后续写法保持不变。',
    },
];

function FileIoPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'题目要求读 score.in，代码却写了 freopen("score.txt", "r", stdin)。运行时会发生什么？'}
                options={['报错提示文件不存在', '编译运行都“正常”，但 cin 一直读不到数据']}
                correctIndex={1}
                explanation="freopen 打不开文件不会报错也不会崩溃：cin 会静默读取失败，变量保持原值。这是文件题最阴险的错——没有任何报错提示，只能靠逐字核对文件名排查。"
                misconception="以为文件不存在时程序会报错提醒你。"
            />
            <PredictCheck
                prompt={'已经写了 freopen("data.out", "w", stdout)，想临时 cout 一行调试信息到屏幕，能看到吗？'}
                options={['能，调试信息会走屏幕', '不能，所有 cout 都进了文件；调试要改用 cerr']}
                correctIndex={1}
                explanation="重定向后所有标准输出都写进文件。调试信息应该用 cerr 输出——标准错误流不受 stdout 重定向影响，永远显示在屏幕上。"
                misconception="以为 cout 能自动区分“答案”和“调试信息”。"
            />
            <PredictCheck
                prompt={'用 "w" 模式打开一个已经存在的 data.out，旧内容会怎样？'}
                options={['保留，新内容追加在后面', '被清空，从头开始写']}
                correctIndex={1}
                explanation='"w" 每次打开都会清空文件从头写，这正是评测需要的行为；想追加要用 "a"。调试时若要保留旧输出，先备份。'
                misconception="以为写文件默认是追加模式。"
            />
        </div>
    );
}

const fileIoMasteryItems = [
    {
        label: '能默写成对的 freopen 模板并写对文件名。',
        evidence: '文件名和题面逐字符一致，包括大小写和后缀。',
        retryHint: '回到文件名实验台改几个前缀看生成结果。',
    },
    {
        label: '知道“打不开文件”的表现是静默失败。',
        evidence: '排查顺序：核对文件名 → 确认 .in 在工作目录 → 检查模式字符串。',
        retryHint: '回到“常见错误”对照表。',
    },
    {
        label: '会用 cerr 输出调试信息。',
        evidence: '能解释 cerr 为什么不受 stdout 重定向影响。',
        retryHint: '重做 cout 进文件的预测题。',
    },
    {
        label: '清楚 "w" 覆盖、"a" 追加，提交前按平台处理 freopen。',
        evidence: '能说出平台不需要文件读写时要注释掉这两行。',
        retryHint: '回看“提交提醒”。',
    },
];

export default function CppL4Lesson13() {
    return (
        <CppLessonShell
            prerequisites={['会写完整的输入输出程序', '知道文件和标准输入输出的区别', '会用循环读入不定数量的数据']}
            lessonNumber={13}
            lessonTitle="文件小管家 (freopen)"
            lessonSubtitle="把键盘输入和屏幕输出切换到文件"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/12"
            nextPath="/lesson/4/14"
            topSupport={<CppL4LessonSupport lessonId={13} />}
            bottomSupport={<CppL4LessonSupport lessonId={13} placement="bottom" />}
            hero={{
                title: '文件输入输出并不改变算法，只改变数据从哪里来、到哪里去',
                description: '本课学习竞赛中常见的 freopen 写法，建立本地调试和正式提交之间的切换习惯。',
            }}
            goals={['能写出 freopen 输入输出模板', '能区分本地调试和在线提交场景', '能排查文件名、路径和覆盖输出问题']}
            childrenBySection={{
                1: <FileIoLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">freopen 用法：重定向标准输入输出</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>stdin</code> 是标准输入，<code>stdout</code> 是标准输出。重定向后，原来的 <code>cin</code> 和 <code>cout</code> 仍然能用。
                            </p>
                        </div>
                        <CodeBlock>{`freopen("data.in", "r", stdin);
freopen("data.out", "w", stdout);

int n;
cin >> n;
cout << n * n << endl;`}</CodeBlock>
                        <CompareTable
                            headers={['参数', '含义', '示例']}
                            rows={[
                                ['文件名', '要读写的文件', '"data.in"'],
                                ['模式', '读或写', '"r" / "w"'],
                                ['目标流', '重定向谁', 'stdin / stdout'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">本地调试模板：先开文件，再写算法</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                文件重定向通常放在 <code>main</code> 开头。算法部分不要混进文件名逻辑，这样更容易切换测试环境。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`#include <bits/stdc++.h>
using namespace std;

int main() {
  freopen("score.in", "r", stdin);
  freopen("score.out", "w", stdout);

  int n, sum = 0;
  cin >> n;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    sum += x;
  }
  cout << sum << endl;
  return 0;
}`}</CodeBlock>
                            <StepList steps={[
                                '确认题目要求的文件名',
                                '在 main 开头写 freopen',
                                '后续照常写 cin 和 cout',
                                '提交前按平台要求决定是否保留',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">常见错误：文件名差一个字符也读不到</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                文件题的错误往往不是算法错，而是文件名、路径或输出覆盖出了问题。
                            </p>
                        </div>
                        <CompareTable
                            headers={['问题', '现象', '处理方式']}
                            rows={[
                                ['文件名不一致', '读不到数据', '逐字核对大小写和后缀'],
                                ['输入文件不在同目录', '本地运行空读', '把 .in 文件放到程序工作目录'],
                                ['误用 "w"', '旧输出被覆盖', '这是正常行为，调试时注意备份'],
                            ]}
                        />
                        <Callout icon={FileText} title="提交提醒" tone="amber">
                            有些在线评测不允许或不需要 <code>freopen</code>。遇到运行错误时，先查看题面和平台说明。
                        </Callout>
                        <div>
                            <h4 className="text-xl font-black text-slate-900">调试小技巧：答案走 cout，调试走 cerr</h4>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`freopen("data.out", "w", stdout);

cout << ans << endl;          // 进文件，交给评测
cerr << "n=" << n << endl;    // 上屏幕，只给自己看`}</CodeBlock>
                            <div className="rounded-xl bg-slate-50 p-5 text-sm font-semibold leading-7 text-slate-600 ring-1 ring-slate-200">
                                <code>cerr</code> 走标准错误流，不受 <code>stdout</code> 重定向影响，也不会混进输出文件。
                                提交前不用删调试语句，评测只看输出文件——但保持好习惯，还是清理干净。
                            </div>
                        </div>
                        <FileIoPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                文件输入输出要和普通输入输出一起练：同一个算法，分别用键盘版和文件版运行。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：题目《求最大值》要求从 max.in 读入 n 和 n 个整数，把最大值写进 max.out。写出 main 开头两行和完整读写流程。'}
                            hint="两行 freopen（注意文件名和模式），后面照常 cin/cout 打擂台。"
                            answer='freopen("max.in", "r", stdin); freopen("max.out", "w", stdout); 然后 cin >> n，读入第一个数作初值，循环打擂台，最后 cout 最大值。'
                            steps={[
                                '第 1 行：freopen("max.in", "r", stdin);',
                                '第 2 行：freopen("max.out", "w", stdout);',
                                '读 n，再读第一个数当 mx 的初值（避免全负数出错）。',
                                '循环读剩下 n-1 个数打擂台，最后 cout << mx。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L4-13 文件读写离开前检查"
                            description="文件题最怕“算法全对，文件名错一个字母得 0 分”。勾选前先把 sum.in/sum.out 的完整程序跑通一次。"
                            items={fileIoMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写一个从 <code>sum.in</code> 读取整数并输出总和到 <code>sum.out</code> 的程序。</li>
                                <li>把第 12 课的递推程序改成文件输入输出版本。</li>
                                <li>故意改错文件名，观察“静默失败”的表现并记录排查过程。</li>
                                <li>挑战：在文件版程序里用 cerr 打印每步中间值，确认输出文件不受影响。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习复杂度和异常意识。文件能让数据规模变大，复杂度判断就更重要。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
