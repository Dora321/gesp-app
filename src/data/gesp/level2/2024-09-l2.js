// 2024年9月 GESP C++ 二级真题（第7次认证）
//
// 全卷 27 题已逐页对照 CCF GESP 原卷 PDF 校订。原卷镜像 git blob：
// df9f341ee4b71f50cc465df91b04c240dd9f8c78（1001572 字节）。
// 单选答案取自第 1 页答案表；判断答案按第 6 页红色标记逐格读取，并逐题独立复核。
//
// 原卷 Q13 存在单选不唯一：A 的 while (1) 并无语法错误；B 在首次输入负数时会令
// cnt 保持 0，随后计算 Sum / cnt，不能“正确输出”。Q14 的完整程序在 num=1 时不会
// 输出 NO。本站保留两题原文与官方答案，并将两道原卷缺陷题停止计分。
const SOURCE_URL = 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf';
const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-27';

const verified = (sourcePage, sourcePages = [sourcePage]) => ({
    sourceVerified: true,
    sourcePage,
    sourcePages,
    reviewedBy: REVIEWED_BY,
    reviewedAt: REVIEWED_AT,
    sourceUrl: SOURCE_URL,
});

export const paperData = {
    id: '2024-09-l2',
    title: '2024年9月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    source: {
        officialPdf: SOURCE_URL,
        type: 'archived-official',
        notes: '题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷逐页转录；Q13 的多答案歧义与 Q14 的边界算法缺陷已结构化标记。',
    },
    sourceUrl: SOURCE_URL,
    reviewStatus: 'verified',
    reviewScope: '全卷 27 题（单选 15 + 判断 10 + 编程 2）的题面、代码、选项、答案、解析、样例、约束与参考程序均已核验；Q13、Q14 因原卷缺陷从评分排除。',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-27',
    verification: {
        status: 'verified',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-27',
        scope: '全卷 27 题逐题对照原卷 PDF；单选答案取自第 1 页，判断答案从第 6 页红色矢量标记人工读取并独立推理；Q13、Q14 保留原卷缺陷并停止计分。',
        dimensions: {
            statement: 'verified',
            options: 'verified',
            answer: 'verified',
            explanation: 'verified',
            referenceCode: 'verified',
        },
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '据有关资料，山东大学于 1972 年研制成功 DJL-1 计算机，并于 1973 年投入运行，其综合性能居当时全国第三位。DJL-1 计算机运算控制部分所使用的磁心存储元件由磁心颗粒组成，设计存贮周期为 2μs（微秒）。那么该磁心存储元件相当于现代计算机的（ ）。',
            options: ['内存', '磁盘', 'CPU', '显示器'],
            answer: 0,
            score: 2,
            ...verified(1),
            explanation: `**答案：A（内存）**
**推导：** 磁心存储器直接保存处理器正在使用的数据和指令，承担的是现代主存（内存）的角色；“存贮周期”也是存储器完成一次读写所需的时间。
**排除：** 磁盘是外存且访问慢得多；CPU 负责运算与控制；显示器是输出设备。
**易错点：** 题目问的是部件功能，不是用 2μs 与今天硬件的绝对速度做机械比较。
**最小验证：** 把“磁心存储元件”替换为“主存储器”，只有“内存”在计算机组成中同属这一层级。`,
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: 'IPv4 版本的因特网总共有（ ）个 A 类地址网络。',
            options: ['65000', '200万', '126', '128'],
            answer: 2,
            score: 2,
            ...verified(1),
            explanation: `**答案：C（126）**
**推导：** A 类地址首位固定为 0，网络号还剩 7 位，共有 $2^7=128$ 个编号；0 号和 127 号保留，因此可用 A 类网络为 $128-2=126$ 个。
**排除：** 128 未扣除两个保留编号；65000 与 200 万都不是 A 类网络数量。
**易错点：** 题目问“网络数量”，不是每个网络的主机数量。
**最小验证：** 可分配的首字节范围是 1～126，首尾都计入正好 126 个。`,
            tags: ['网络基础'],
        },
        {
            id: 3,
            type: 'single',
            question: '在 C++ 中，下列不可做变量的是（ ）。',
            options: ['ccf-gesp', 'ccf_gesp', 'ccfGesp', '_ccfGesp'],
            answer: 0,
            score: 2,
            ...verified(1),
            explanation: `**答案：A（ccf-gesp）**
**推导：** C++ 标识符可由字母、数字和下划线组成，且不能以数字开头；连字符 \`-\` 不属于标识符字符，会被解析成减法运算符。
**排除：** B 含下划线、C 使用大小写字母、D 以下划线开头，在本题给定形式下都能作为变量名。
**易错点：** 连字符 \`-\` 与下划线 \`_\` 不是同一个字符。
**最小验证：** \`int ccf-gesp;\` 会被编译器拆成标识符和减号，无法形成变量声明。`,
            tags: ['变量与标识符'],
        },
        {
            id: 4,
            type: 'single',
            question: '在 C++ 中，与 `for (int i = 1; i < 10; i++)` 效果相同的是（ ）。',
            options: [
                'for (int i = 0; i < 10; i++)',
                'for (int i = 0; i < 11; i++)',
                'for (int i = 1; i < 10; ++i)',
                'for (int i = 0; i < 11; ++i)',
            ],
            answer: 2,
            score: 2,
            ...verified(1),
            explanation: `**答案：C**
**推导：** 原循环依次令 $i=1,2,\ldots,9$。在 \`for\` 的迭代表达式中，\`i++\` 与 \`++i\` 都使 \`i\` 增加 1，且返回值未被使用，所以效果相同。
**排除：** A 多执行 $i=0$；B、D 从 0 执行到 10，边界和次数都不同。
**易错点：** 前置与后置自增只在表达式值被使用时可能体现差异。
**最小验证：** 原循环与 C 都执行 9 次，循环体看到的序列均为 1～9。`,
            tags: ['循环'],
        },
        {
            id: 5,
            type: 'single',
            question: '在 C++ 中，`cout << (5 / 2 + 5 % 3)` 的输出是（ ）。',
            options: ['1', '2', '4', '5'],
            answer: 2,
            score: 2,
            ...verified(2),
            explanation: `**答案：C（4）**
**推导：** 两个操作数都是整数，\`5 / 2\` 做整数除法得到 2；\`5 % 3\` 得余数 2；相加为 4。
**排除：** 1、2、5 都不等于两个子表达式的和。
**易错点：** 不要把整数除法误算成 2.5。
**最小验证：** $5=2\\times2+1$ 对应除法商 2；$5=3\\times1+2$ 对应余数 2。`,
            tags: ['运算符'],
        },
        {
            id: 6,
            type: 'single',
            question: `假定变量 \`a\` 和 \`b\` 可能是整型、字符型或浮点型，则下面 C++ 代码执行时先后输入 \`-2\` 和 \`3.14\` 后，其输出不可能是（ ）。已知字符 \`+\`、\`-\`、\`=\` 的 ASCII 码值分别是 43、45 和 61。
\`\`\`cpp
cin >> a;
cin >> b;
cout << (a + b);
\`\`\``,
            options: ['1', '1.14', '47', '将触发异常'],
            answer: 3,
            score: 2,
            ...verified(2),
            explanation: `**答案：D（将触发异常）**
**推导：** 若 \`a,b\` 都为整数，读得 -2 与 3，和为 1；若有浮点变量完整读取 3.14，可得到 1.14；若 \`a\` 为字符，第一次只读入字符 \`'-'\`（ASCII 45），后续整数读取同一输入中剩余的 2，可得到 47。格式化输入失败会设置流状态，不会按题目说法抛出异常。
**排除：** A、B、C 都能由题设允许的类型组合产生。
**易错点：** \`operator>>\` 读取字符时只取一个非空白字符；输入流失败默认不抛异常。
**最小验证：** \`char a; int b;\` 输入 \`-2\` 后得到 $45+2=47$。`,
            tags: ['输入输出', '数据类型'],
        },
        {
            id: 7,
            type: 'single',
            question: '在 C++ 代码中假设 `N` 为正整数，则下面代码能获得个位数的是（ ）。',
            options: ['N % 10', 'N / 10', 'N && 10', '以上选项均不正确'],
            answer: 0,
            score: 2,
            ...verified(2),
            explanation: `**答案：A（\`N % 10\`）**
**推导：** 十进制正整数除以 10 的余数就是个位数字。
**排除：** \`N / 10\` 去掉个位；\`N && 10\` 是逻辑与，对正整数结果为 1；因此 D 也不成立。
**易错点：** \`&&\` 是逻辑运算，不是数位提取。
**最小验证：** $123\\bmod10=3$，正好是个位。`,
            tags: ['数位处理'],
        },
        {
            id: 8,
            type: 'single',
            question: `下面 C++ 代码执行后的输出是（ ）。
\`\`\`cpp
int i;
for (i = 0; i < 10; i++) {
    if (i % 2)
        break;
    cout << "0#";
}
if (i == 10) cout << "1#";
\`\`\``,
            options: ['0#', '1#', '0#0#1', '没有输出'],
            answer: 0,
            score: 2,
            ...verified(2),
            explanation: `**答案：A（\`0#\`）**
**推导：** $i=0$ 时 \`i % 2\` 为 0，不执行 \`break\`，输出一次 \`0#\`；随后 $i=1$，条件为真并退出循环。此时 \`i!=10\`，末尾也不输出 \`1#\`。
**排除：** B 需要正常循环到 10；C 多输出了一次 \`0#\`；D 忽略了 $i=0$ 的首次输出。
**易错点：** \`break\` 发生在第二轮，而不是第一轮。
**最小验证：** 只需追踪 $i=0,1$ 两轮即可得到完整输出。`,
            tags: ['循环', '流程控制'],
        },
        {
            id: 9,
            type: 'single',
            question: `执行下面 C++ 代码并输入 1 和 0，有关说法正确的是（ ）。
\`\`\`cpp
int a, b;
cin >> a >> b;
if (a && b)
    cout << ("1");
else if (!(a || b))
    cout << ("2");
else if (a || b)
    cout << ("3");
else
    cout << ("4");
\`\`\``,
            options: ['1', '2', '3', '4'],
            answer: 2,
            score: 2,
            ...verified(2, [2, 3]),
            explanation: `**答案：C（3）**
**推导：** 输入后 \`a=1,b=0\`。\`a && b\` 为假；\`!(a || b)\` 为 \`!true\`，仍为假；第三个 \`a || b\` 为真，因此输出 3。
**排除：** 前两个分支条件均为假，最后的 \`else\` 不会到达。
**易错点：** 非零视为真，0 视为假；\`!\` 的优先作用对象是括号内结果。
**最小验证：** 真值对 $(1,0)$ 的“与”为 0，“或”为 1。`,
            tags: ['逻辑运算', '条件判断'],
        },
        {
            id: 10,
            type: 'single',
            question: `下面 C++ 代码执行后的输出是（ ）。
\`\`\`cpp
int loopCount = 0;
for (int i = 1; i < 5; i += 2)
    loopCount += 1;
cout << (loopCount);
\`\`\``,
            options: ['1', '2', '3', '5'],
            answer: 1,
            score: 2,
            ...verified(3),
            explanation: `**答案：B（2）**
**推导：** 循环变量依次为 1、3，共执行两次，每次让 \`loopCount\` 加 1，最终为 2。
**排除：** 其余数值都与实际执行次数不符。
**易错点：** \`i += 2\` 使序列跳过偶数，且 $i=5$ 不满足 \`i < 5\`。
**最小验证：** 写出循环体入口值 $\{1,3\}$，集合大小就是 2。`,
            tags: ['循环'],
        },
        {
            id: 11,
            type: 'single',
            question: `下图是 C++ 程序执行后的输出。为实现其功能，横线处应填入的代码是（ ）。
\`\`\`text
7
1
2 3
3 4 5
4 5 6 7
5 6 7 8 9
6 7 8 9 10 11
7 8 9 10 11 12 13
\`\`\`
\`\`\`cpp
int lineNum;
cin >> lineNum;
for (int i = 1; i < lineNum + 1; i++) {
    for (int __________________)
        cout << j << " ";
    cout << endl;
}
\`\`\``,
            options: [
                'j = i; j < i; j++',
                'j = 1; j < i; j++',
                'j = i; j < i*2; j++',
                'j = i+1; j < i+i; j++',
            ],
            answer: 2,
            score: 2,
            ...verified(3, [3, 4]),
            explanation: `**答案：C（\`j = i; j < i*2; j++\`）**
**推导：** 第 $i$ 行从 $i$ 开始，连续输出 $i$ 个数，末值为 $2i-1$；恰好由 \`j=i\`、\`j<2*i\`、\`j++\` 描述。
**排除：** A 循环一次也不执行；B 从 1 开始且仅输出 $i-1$ 个数；D 从 $i+1$ 开始并少一个数。
**易错点：** \`j < 2*i\` 的最后一个值是 $2i-1$。
**最小验证：** 取 $i=3$，C 输出 3、4、5，与图中第三行一致。`,
            tags: ['嵌套循环'],
        },
        {
            id: 12,
            type: 'single',
            question: `下面 C++ 代码执行后输出逆序数，如输入 123 则输出 321，如输入 120 则输出 21。横线处先后应填入的代码是（ ）。
\`\`\`cpp
int N;
cin >> N;
int rst = 0;
while (N) {
    ____________________;
    ____________________;
}
cout << (rst);
\`\`\``,
            options: [
                'rst = rst * 10 + N % 10；N = N / 10',
                'rst += N % 10；N = N / 10',
                'rst = rst * 10 + N / 10；N = N % 10',
                'rst += N / 10；N = N % 10',
            ],
            answer: 0,
            score: 2,
            ...verified(4),
            explanation: `**答案：A**
**推导：** 每轮用 \`N % 10\` 取末位，把旧结果乘 10 后接上该位，再以 \`N / 10\` 删除末位。输入 123 时结果依次为 3、32、321。
**排除：** B 只把各位相加；C、D 混淆了取末位和删末位，不能完成逆序。
**易错点：** “接到结果末尾”必须先让 \`rst * 10\`。
**最小验证：** 输入 120：结果依次 0、2、21，最终输出 21，符合题面。`,
            tags: ['数位处理'],
        },
        {
            id: 13,
            type: 'single',
            question: `下面的 C++ 代码用于输入学生成绩，并根据人数计算出平均成绩，有关说法错误的是（ ）。
\`\`\`cpp
float Sum = 0; // 保存总成绩
int cnt = 0;   // 保存学生人数
while (1) {
    int score;
    cin >> score;
    if (score < 0)
        break;
    cnt += 1;
    Sum += score;
}
cout << "总学生数：" << cnt << "平均分：" << Sum / cnt;
\`\`\``,
            options: [
                '代码 while (1) 写法错误',
                '如果输入负数，将结束输入，并正确输出',
                '如果输入的学生成绩含有小数，程序将无法正常执行',
                '变量 int score 初始值不确定，但不影响程序执行',
            ],
            answer: 0,
            score: 2,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷为单选并给出答案 A，但 B 也并非始终成立：若首次输入就是负数，cnt 仍为 0，随后计算 Sum / cnt（0/0），不能称为“正确输出”。A、B 均可视为错误说法，构成多答案歧义；本站保留原文与官方答案并停止计分。',
            ...verified(4),
            explanation: `**官方答案：A；本题因原卷多答案缺陷停止计分。**
**推导：** \`while (1)\` 是合法的无限循环写法，循环可由 \`break\` 退出，所以 A 确实错误。C 中若输入 88.5，\`int score\` 先读 88，后续读取遇到小数点会使输入流失败，程序不能按预期继续；D 中 \`score\` 在参与比较前先由 \`cin\` 赋值。
**原卷缺陷：** B 只在此前至少录入过一名学生且输入有效时才可能“正确输出”。若首个值为负数，\`cnt=0\`，表达式 \`Sum / cnt\` 为 $0/0$，输出不是有效平均分，因此 B 也有问题。
**易错点：** 既要判断语法，也要检查边界输入和除数是否为 0。
**最小验证：** 首次输入 \`-1\`，循环立即退出，输出阶段计算 \`0.0f / 0\`，无法得到正确平均分。`,
            tags: ['输入输出', '循环'],
        },
        {
            id: 14,
            type: 'single',
            question: `以下 C++ 代码判断输入的正整数是否为质数，如果该数字是质数，则输出 \`YES\`，否则输出 \`NO\`。质数是指仅能被 1 和它本身整除的正整数。请在横线上填写代码。（ ）
\`\`\`cpp
int num, i;
cin >> num;
for (i = 2; i < num; i++)
    if (__________) {
        cout << ("NO");
        break;
    }
if (i == num)
    cout << ("YES");
\`\`\``,
            options: ['num % i', 'num % i == 0', 'num / i', 'num / i == 0'],
            answer: 1,
            score: 2,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷声称该代码能判断输入的正整数是否为质数，但当 num=1 时，循环不执行且 i==num 为假，程序不会输出 NO。选项 B 仍是横线处唯一符合预期的填写，本站保留官方答案并因完整程序的边界缺陷停止计分。',
            ...verified(4, [4, 5]),
            explanation: `**官方答案：B（\`num % i == 0\`）；本题因原卷边界缺陷停止计分。**
**推导：** 从 2 到 $num-1$ 枚举可能的因数；一旦余数为 0，就说明存在 1 和自身之外的约数，应输出 \`NO\` 并退出。
**排除：** A 在“不能整除”时为真，逻辑相反；C 的整数商在大多数循环中非 0；D 对 $i<num$ 的正整数枚举通常不成立。
**原卷缺陷：** 题干范围包含正整数 1，但输入 1 时循环不进入，循环后的 \`i==num\` 也为假，程序没有任何输出；横线处的四个选项都无法修复这个边界。
**易错点：** \`if\` 中要检测“整除”，即余数等于 0；同时不能忽略质数判定对 1 的特殊处理。
**最小验证：** 输入 4 时 B 令 $4\\bmod2=0$ 并输出 \`NO\`；输入 1 时无输出，证明题面所称完整功能不成立。`,
            tags: ['质数', '循环'],
        },
        {
            id: 15,
            type: 'single',
            question: `一个数如果能被某个数（比如 7）整除，或者含有该数，则说该数是某个数的相关数。下面 C++ 代码用于判定输入的数与 7 是否有关。下列说法错误的是（ ）。
\`\`\`cpp
int N, M;
bool Flag = false;
cin >> N;
M = N;

if (M % 7 == 0)
    Flag = true;

while (!Flag && M) {
    if (M % 10 == 7) {
        Flag = true;
        break;
    }
    M /= 10;
}

if (Flag)
    cout << N << "与7有关";
else
    cout << N << "与7无关";
\`\`\``,
            options: [
                '删除 break 语句不会导致死循环，但有时会导致结果错误',
                '删除 M /= 10 将可能导致死循环',
                '删除 M = N 并将其后代码中的 M 变量改为 N，并调整输出同样能完成相关功能',
                '删除 break 语句不会导致死循环，但有时会影响效率',
            ],
            answer: 0,
            score: 2,
            ...verified(5),
            explanation: `**答案：A**
**推导：** 找到数字 7 后令 \`Flag=true\`。即使删掉 \`break\`，本轮结束后 \`while (!Flag && M)\` 的 \`!Flag\` 为假，循环仍会结束，结果不会改变，所以 A 所说“有时会导致结果错误”不成立。
**排除：** B 中若当前末位不是 7 且不能被 7 整除，\`M\` 不再变化，可能死循环；C 可直接修改 \`N\` 做数位扫描并另存原值用于输出；D 删除 \`break\` 会多做一次循环条件判断，可能轻微影响效率。
**易错点：** 判断删掉 \`break\` 的影响时，还要看到循环条件本身含 \`!Flag\`。
**最小验证：** 输入 17，找到 7 后 \`Flag=true\`；无论是否执行 \`break\`，下一次条件都为假且最终判定相同。`,
            tags: ['循环', '数位处理'],
        },
        {
            id: 16,
            type: 'judge',
            question: '小杨最近开始学习 C++ 编程，老师说 C++ 是一门面向对象的编程语言，也是一门高级语言。（ ）',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            ...verified(6),
            explanation: `**答案：正确。** C++ 提供类、继承、多态等面向对象机制，也通过较高层的类型、函数和标准库抽象底层机器细节，属于高级编程语言。C++ 同时支持过程式和泛型编程，不影响题干所述两种属性。`,
            tags: ['计算机基础'],
        },
        {
            id: 17,
            type: 'judge',
            question: '在 C++ 中，`cout << (3, 4, 5)` 可以输出 `3 4 5`，且每个输出项之间用空格分开。（ ）',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            ...verified(6),
            explanation: `**答案：错误。** 括号中的逗号是逗号运算符：从左到右计算各子表达式，整个表达式的值取最后一个，即 5。因此 \`cout\` 只输出 \`5\`，不会自动插入空格。最小验证：运行 \`cout << (3, 4, 5);\`，输出为 \`5\`。`,
            tags: ['运算符', '输入输出'],
        },
        {
            id: 18,
            type: 'judge',
            question: 'C++ 表达式 `12 % 10 % 10` 的值为 2。（ ）',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            ...verified(6),
            explanation: `**答案：正确。** 取模运算符按从左到右结合：\`12 % 10\` 得 2，再算 \`2 % 10\` 仍得 2。易错点是把它误看成一次“对 100 取模”；本例虽不需要括号，按结合性逐步计算即可。`,
            tags: ['运算符'],
        },
        {
            id: 19,
            type: 'judge',
            question: 'C++ 语句 `cout << rand() << \' \' << rand();` 的第二个输出值较大。（ ）',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            ...verified(6),
            explanation: `**答案：错误。** \`rand()\` 产生伪随机序列中的下一个值，两个相邻结果不存在“第二个一定更大”的单调保证。第二个值可能大于、等于或小于第一个；执行一次观察到的大小关系也不能证明必然性。`,
            tags: ['随机数'],
        },
        {
            id: 20,
            type: 'judge',
            question: '定义 C++ 的 `int` 类型变量 `ch`，而且值为 `\'1\'`，则语句 `cout << int(ch);` 的输出为 1。（ ）',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            ...verified(6),
            explanation: `**答案：错误。** 字符字面量 \`'1'\` 表示字符编码，不是整数 1；在常见 ASCII 编码中其值为 49。赋给 \`int ch\` 后保存的就是该编码，\`int(ch)\` 不会把字符内容转换为数字 1，因此通常输出 49。`,
            tags: ['数据类型', '字符编码'],
        },
        {
            id: 21,
            type: 'judge',
            question: `下面 C++ 代码执行后将输出 10。（ ）
\`\`\`cpp
int i;
for (i = 0; i < 10; i++)
    continue;
if (i == 10)
    cout << i;
\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            ...verified(6),
            explanation: `**答案：正确。** \`continue\` 跳到本轮的迭代表达式，\`i++\` 仍会执行。循环在 \`i\` 增至 10 时结束，此时 \`i == 10\` 为真，输出 \`i\`，即 10。易错点是把 \`continue\` 误认为退出整个循环。`,
            tags: ['循环', '流程控制'],
        },
        {
            id: 22,
            type: 'judge',
            question: `下面 C++ 代码能求整数 N 和 M 之间所有整数之和，包含 N 和 M。（ ）
\`\`\`cpp
int N, M, Sum;

cin >> N >> M;

if (N > M) {
    int tmp = N;
    N = M, M = tmp;
}

for (int i = N; i < M + 1; i++)
    Sum += i;

cout << Sum;
\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            ...verified(6),
            explanation: `**答案：错误。** 代码会正确调整区间端点并遍历 $N$ 到 $M$，但局部变量 \`Sum\` 没有初始化；第一次执行 \`Sum += i\` 就读取了不确定值，行为未定义，结果不能保证是区间和。最小修复是声明为 \`int Sum = 0;\`。`,
            tags: ['变量初始化', '循环'],
        },
        {
            id: 23,
            type: 'judge',
            question: `将下面 C++ 代码中 L3 标记的代码行调整为 \`for (int i = 0; i < 5; i++)\` 后输出结果相同。（ ）
\`\`\`cpp
int loopCount = 0;
for (int i = 1; i < 5; i++) // L3
    for (int j = 0; j < i; j++)
        loopCount += 1;
cout << loopCount;
\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            ...verified(6),
            explanation: `**答案：正确。** 原代码的外层 $i=1,2,3,4$，内层执行次数总计 $1+2+3+4=10$。改为从 $i=0$ 开始后，多出的 $i=0$ 轮中条件 \`j < 0\` 一开始就为假，执行 0 次，所以总数仍为 10。`,
            tags: ['嵌套循环'],
        },
        {
            id: 24,
            type: 'judge',
            question: `某一系列数据的规律是从第 3 个数值开始是前两个数之和。下面的代码求第 N 个数的值，N 限定为大于 2。（ ）
\`\`\`cpp
int start1; // 第1个数
int start2; // 第2个数
int N;      // 求第N个数的值
int tmp;
cin >> start1 >> start2 >> N;

for (int i = 2; i < N; i++) {
    tmp = start1 + start2;
    start1 = start2;
    start2 = tmp;
}
cout << start2;
\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            ...verified(6, [6, 7]),
            explanation: `**答案：正确。** 输入后 \`start1\`、\`start2\` 分别保存第 1、2 项。循环每执行一次就生成下一项并把窗口向前移动；从 \`i=2\` 到 \`i=N-1\` 共生成第 3 项至第 N 项，结束时 \`start2\` 即第 N 项。取 $N=3$ 最小验证：循环一次后输出两初值之和。`,
            tags: ['循环', '递推'],
        },
        {
            id: 25,
            type: 'judge',
            question: `下面 C++ 代码执行时如果输入 2024，则输出是 4202。（ ）
\`\`\`cpp
int N, flag = 0;
cin >> N;
while (N) {
    if (!flag) cout << N % 10;
    N /= 10;
    flag = (flag + 1) % 2;
}
\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            ...verified(7),
            explanation: `**答案：错误。** \`flag\` 在 0、1 间交替，只有为 0 时才输出当前末位。输入 2024：第一次输出个位 4；十位 2 被跳过；第三次输出百位 0；千位 2 被跳过，最终输出 \`40\`，不是 \`4202\`。易错点是忽略 \`if (!flag)\` 的隔位筛选。`,
            tags: ['循环', '数位处理'],
        },
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '数位之和',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            score: 25,
            ...verified(7, [7, 8]),
            samples: [{
                input: `3
7
52
103`,
                output: `Yes
Yes
No`,
            }],
            question: `
# [GESP202409 二级] 数位之和

- **试题名称**：数位之和
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题面描述

小杨有 $n$ 个正整数，他认为一个正整数是美丽数字当且仅当该正整数每一位数字的总和是 $7$ 的倍数。

小杨想请你编写一个程序判断 $n$ 个正整数哪些是美丽数字。

## 输入格式

第一行包含一个正整数 $n$，代表正整数个数。

之后 $n$ 行，每行包含一个正整数 $a_i$。

## 输出格式

对于每个正整数，如果是美丽数字则输出 \`Yes\`，否则输出 \`No\`。

## 样例 1

\`\`\`text
输入：
3
7
52
103

输出：
Yes
Yes
No
\`\`\`

$7$ 的各位数字之和为 $7$，是 $7$ 的倍数。$52$ 的各位数字之和为 $5+2=7$，是 $7$ 的倍数。$103$ 的各位数字之和为 $1+0+3=4$，不是 $7$ 的倍数。

## 数据范围

对于全部数据，保证有 $1 \\le n \\le 10^5$，$1 \\le a_i \\le 10^5$。
`,
            explanation: `**算法推导：** 对每个 $a_i$，反复用 \`x % 10\` 取出最低位并累加，再执行 \`x /= 10\` 删除最低位。数位和 \`tot\` 满足 \`tot % 7 == 0\` 时输出 \`Yes\`，否则输出 \`No\`。
**复杂度：** 每个数最多 6 位，总时间 $O(n\\log_{10}a_i)$，额外空间 $O(1)$。
**常见错误：** 判断原数是否能被 7 整除，而不是判断“数位和”；处理多组数时忘记每次把 \`tot\` 清零。
**最小验证：** $52\\to5+2=7$ 输出 \`Yes\`；$103\\to1+0+3=4$ 输出 \`No\`。`,
            tags: ['编程题', '数位处理', '模拟'],
            template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // 在此编写代码
    return 0;
}`,
            referenceCode: `#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin>>n;
    int ans=0;
    for(int i=1;i<=n;i++){
        int x;
        cin>>x;
        int tot=0;
        while(x){
            tot+=(x%10);
            x/=10;
        }
        if(tot%7==0)cout<<"Yes\\n";
        else cout<<"No\\n";
    }
    return 0;
}`,
        },
        {
            id: 27,
            type: 'programming',
            title: '小杨的 N 字矩阵',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            score: 25,
            ...verified(8, [8, 9]),
            samples: [{
                input: '5',
                output: `+---+
++--+
+-+-+
+--++
+---+`,
            }],
            question: `
# [GESP202409 二级] 小杨的 N 字矩阵

- **试题名称**：小杨的 N 字矩阵
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题面描述

小杨想要构造一个 $m \\times m$ 的 N 字矩阵（$m$ 为奇数），这个矩阵从左上角到右下角的对角线、第 $1$ 列和第 $m$ 列都是半角加号 \`+\`，其余都是半角减号 \`-\`。例如，一个 $5 \\times 5$ 的 N 字矩阵如下：

\`\`\`text
+---+
++--+
+-+-+
+--++
+---+
\`\`\`

请你帮小杨根据给定的 $m$ 打印出对应的 N 字矩阵。

## 输入格式

第一行包含一个正整数 $m$。

## 输出格式

输出对应的 N 字矩阵。

## 样例 1

\`\`\`text
输入：
5

输出：
+---+
++--+
+-+-+
+--++
+---+
\`\`\`

## 数据范围

对于全部数据，保证有 $3 \\le m \\le 49$ 且 $m$ 为奇数。
`,
            explanation: `**算法推导：** 用两层循环枚举行 $i$、列 $j$。当 \`j == 1\`（第一列）、\`j == n\`（最后一列）或 \`i == j\`（主对角线）时输出 \`+\`，其余位置输出 \`-\`；每行结束换行。
**复杂度：** 必须输出 $m^2$ 个字符，时间 $O(m^2)$，额外空间 $O(1)$。
**常见错误：** 把主对角线写成 \`i + j == n + 1\`，那会画出反斜线；或漏掉左右两列。
**最小验证：** $m=3$ 时三行应为 \`+-+\`、\`+++\`、\`+-+\`，同时满足两边竖线与主对角线。`,
            tags: ['编程题', '二维枚举', '图形输出'],
            template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // 在此编写代码
    return 0;
}`,
            referenceCode: `#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=n;j++){
            if(j==1||j==n)cout<<"+";
            else{
                if(i==j)cout<<"+";
                else cout<<"-";
            }
        }
        cout<<"\\n";
    }
}`,
        },
    ],
};
