// 2025年6月 GESP C++ 二级真题 (第10次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照 CCF GESP 原卷镜像校订。
// 镜像文件的 git blob 为 a63a41e5940dff2afdd191610e86c28b1c2e4bb3
//（1291016 字节），与 paperSources.js 登记值一致。
//
// 客观题答案均取自原卷答案表：
//   单选题：C A C A D D C C B A D D D D A
//   判断题：√ √ × √ × × × × × √
// 判断题答案表在 PDF 第 6 页以红色矢量记号呈现，已渲染后逐格人工读取。
//
// 原卷自身存在两处缺陷，均忠实保留并停止计分：
//   Q5：表达式 b == a 读取未初始化的局部变量 a，标准 C++ 行为未定义。
//   Q15：示例提示语为“请输入层数”，代码实际输出“请输入行数”。
const SOURCE_URL = 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf';
const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-27';

export const paperData = {
    id: '2025-06-l2',
    title: '2025年6月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    source: {
        officialPdf: SOURCE_URL,
        type: 'archived-official',
        notes: '题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录；Q5 与 Q15 的原卷缺陷已结构化标记。',
    },
    reviewStatus: 'verified',
    reviewScope: '全卷 27 题（单选 15 + 判断 10 + 编程 2）的题面、代码、选项、答案、解析，以及两道编程题的题意、约束、样例与原卷参考程序，均已逐题核验；Q5 与 Q15 因原卷缺陷从评分排除。',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-27',
    verification: {
        status: 'verified',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-27',
        scope: '全卷 27 题均已逐题对照 CCF GESP 原卷镜像核验；单选题答案取自第 1 页答案表，判断题答案按第 6 页红色矢量标记逐格读取；Q5 与 Q15 保留原卷缺陷并停止计分。',
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
            question: `2025 年 4 月 19 日在北京举行了一场颇为瞩目的人形机器人半程马拉松赛。比赛期间，跑动着的机器人会利用身上安装的多个传感器所反馈的数据来调整姿态、保持平衡等，那么这类传感器类似于计算机的（ ）。`,
            options: ['处理器', '存储器', '输入设备', '输出设备'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（输入设备）**

传感器把机器人外部或自身姿态等物理信息转换成数据，送给计算机系统处理，这正是输入设备的作用。处理器负责运算，存储器负责保存数据，输出设备负责把处理结果传到系统外，因此都不符合“反馈数据给系统”的方向。`,
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: `小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时他需要的内存条是（ ）。`,
            options: ['RAM', 'ROM', 'CACHE', 'EPROM'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（RAM）**

日常所说的“加内存条”是扩充随机存取存储器 RAM，它用于临时保存正在运行的程序和数据。ROM、EPROM 主要用于只读或可擦写的固件存储；CACHE 是处理器附近的高速缓存，通常不以普通内存条的方式升级。`,
            tags: ['计算机基础'],
        },
        {
            id: 3,
            type: 'single',
            question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint a=3;\nfloat b = 3.5;\ncout << (a *= b);\n\`\`\``,
            options: ['3', '3.5', '10', '11'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（10）**

\`a *= b\` 会先计算 $3\\times3.5=10.5$，再把结果存回整型变量 \`a\`。浮点数转换为整数时会截去小数部分，因此 \`a\` 变为 10，\`cout\` 输出 10。它不会四舍五入成 11。`,
            tags: ['数据类型'],
        },
        {
            id: 4,
            type: 'single',
            question: `下面 C++ 代码用于获得正整数的第 3 位数，如 1234 则输出 2。如果是一位数或两位数，则输出 0。横线处应填入的代码是（ ）。\n\n\`\`\`cpp\nint N, remainder;\ncout << "请输入正整数:";\ncin >> N;\ncout << _________________;\n\`\`\``,
            options: ['N % 1000 / 100', 'N / 1000 % 100', 'N / 1000 / 100', 'N % 100 / 100'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1, 2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`N % 1000 / 100\`）**

\`N % 1000\` 先保留末三位，再除以 100，整数除法会去掉末两位，于是得到从右往左数第 3 位。以 1234 为例，$1234\\%1000=234$，$234/100=2$。当 $N<100$ 时，\`N/100\` 的整数商为 0，也符合题意。`,
            tags: ['数位提取'],
        },
        {
            id: 5,
            type: 'single',
            question: `下面 C++ 代码执行，其输出是（ ）。\n\n\`\`\`cpp\nint a, b = (6, 28);\nb == a;\na = b;\ncout << a << ' ' << b;\n\`\`\``,
            options: ['6 28', '6 6', '28 6', '28 28'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷代码先声明但未初始化局部变量 a，随后在表达式 b == a 中读取 a；标准 C++ 下这是未定义行为，程序没有可靠输出。官方答案 D 只反映命题意图：b 由逗号表达式得到 28，随后 a=b，预期输出 28 28。本题保留官方答案但不计分。',
            explanation: `**原卷答案：D（\`28 28\`）；本题不计分**

\`b = (6, 28)\` 使用逗号表达式，先计算 6，再以最后一个值 28 初始化 \`b\`。如果忽略第二行，随后 \`a=b\` 会令两个变量都为 28，这就是原卷答案 D 的命题意图。

但第二行 \`b == a;\` 会先读取尚未初始化的局部变量 \`a\`。即使比较结果没有保存，这次读取本身已经造成未定义行为，因此标准 C++ 不能保证程序输出 \`28 28\`，也不能保证任何固定结果。本站忠实保留原代码和官方答案，并将该题从评分排除。`,
            tags: ['表达式'],
        },
        {
            id: 6,
            type: 'single',
            question: `今天星期六，其后第 N 天星期几？如果是星期一到星期六输出形如：星期 1、星期 2 等，星期天则输出星期天。下面的 C++ 代码用于完成上述要求，横线处应填上的代码是（ ）。\n\n\`\`\`cpp\nint N, remainder;\ncin >> N;\nremainder = _____________;\nif(remainder == 0)\n    printf("星期六后第%d天是星期天\\n", N);\nelse\n    printf("星期六后第%d天是星期%d\\n", N, remainder);\n\`\`\``,
            options: ['(N + 6) / 7', '(N + 6) // 7', 'N % 7', '(N + 6) % 7'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`(N+6)%7\`）**

把星期天到星期六分别编号为 0 到 6，今天星期六的编号就是 6。经过 $N$ 天后的编号为 $(N+6)\\%7$。例如 $N=1$ 得到 0，即星期天；$N=2$ 得到 1，即星期一。选项 B 的 \`//\` 在 C++ 中会开始一段注释，不是整除运算。`,
            tags: ['取模运算'],
        },
        {
            id: 7,
            type: 'single',
            question: `下面的 C++ 代码执行后其输出是（ ）。\n\n\`\`\`cpp\nint i, Sum = 0;\nfor (i = 1; i < 10; i++){\n    Sum += i;\n    if(i % 2) continue;\n    if(i % 7) break;\n}\ncout << Sum;\n\`\`\``,
            options: ['45', '28', '3', '0'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2, 3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（3）**

$i=1$ 时先把 1 加入 \`Sum\`，因为 1 是奇数，执行 \`continue\`。$i=2$ 时再加 2，\`Sum=3\`；2 是偶数，不执行第一个 \`continue\`，而 \`2%7\` 非零，于是执行 \`break\`。循环立即结束并输出 3。`,
            tags: ['循环控制'],
        },
        {
            id: 8,
            type: 'single',
            question: `下面 C++ 代码执行后其输出是（ ）。\n\n\`\`\`cpp\nint i, j;\nfor(i = 1; i < 12; i++)\n    for(j = 1; j < i; j++)\n        if(i * j % 2 == 1)\n            break;\ncout << i * j;\n\`\`\``,
            options: ['110', '22', '12', '3'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（12）**

外层循环结束时 \`i=12\`。最后一次真正执行内层循环是在 \`i=11\`：\`j\` 从 1 开始，$11\\times1$ 是奇数，因此立即 \`break\`，留下 \`j=1\`。外层自增到 12 后退出，最终输出 $i\\times j=12\\times1=12$。`,
            tags: ['嵌套循环'],
        },
        {
            id: 9,
            type: 'single',
            question: `下面 C++ 代码执行后输出是（ ）。\n\n\`\`\`cpp\nint i, cnt = 0;\nfor(i = -99; i < 100; i += 2)\n    cnt = 1 + cnt;\ncout << cnt;\n\`\`\``,
            options: ['101', '100', '99', '98'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（100）**

\`i\` 依次取 $-99,-97,\\ldots,97,99$，即从 -99 到 99 的所有奇数。项数为 $(99-(-99))/2+1=100$。每轮把 \`cnt\` 加 1，所以最后输出 100。`,
            tags: ['循环'],
        },
        {
            id: 10,
            type: 'single',
            question: `下面 C++ 代码执行后输出是（ ）。\n\n\`\`\`cpp\nint i;\nfor(i = 1; i < 10; i++){\n    if(i % 3 != 0){\n        printf("A#");\n        continue;\n    }\n    else\n        break;\n    printf("0#");\n}\nif(i == 10) cout << "1";\n\`\`\``,
            options: ['A#A#', 'A#0#A#0', 'A#A#1', 'A#0#A#0#1'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`A#A#\`）**

$i=1$、$i=2$ 时都不能被 3 整除，各输出一次 \`A#\`，然后 \`continue\`。$i=3$ 时进入 \`else\` 并 \`break\`，所以循环结束时 \`i=3\`，最后的 \`i==10\` 不成立。\`printf("0#")\` 位于 \`continue\` 和 \`break\` 之后，无论走哪个分支都执行不到。`,
            tags: ['循环控制'],
        },
        {
            id: 11,
            type: 'single',
            question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint i,j;\nfor(i = 0; i < 3; i++)\n    for(j = 0; j < i; j++)\n        printf("%d#%d-", i, j);\nprintf("END");\n\`\`\``,
            options: [
                '0#0-1#0-2#0-2#1-END',
                '0#0-1#0-1#1-2#0-2#1-2#2-3#0-3#1-3#2-END',
                '0#0-1#0-1#1-2#0-2#1-2#2-END',
                '1#0-2#0-2#1-END',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`1#0-2#0-2#1-END\`）**

$i=0$ 时条件 \`j<i\` 一开始就不成立，没有输出；$i=1$ 时只有 $j=0$，输出 \`1#0-\`；$i=2$ 时 $j=0,1$，输出 \`2#0-2#1-\`。两个循环全部结束后才执行 \`printf("END")\`，合并后正是选项 D。`,
            tags: ['嵌套循环'],
        },
        {
            id: 12,
            type: 'single',
            question: `下面 C++ 代码执行后，将输出不能被 3 整除且除以 5 余数为 2 的数。下列选项不能实现的是（ ）。\n\n\`\`\`cpp\nint i,j;\nfor(i = 0; i < 100; i++)\n    if(______________________)\n        cout << i << endl;\n\`\`\``,
            options: ['(i % 3 != 0) && (i % 5 == 2)', '(i % 3) && (i % 5 == 2)', '(i % 3) && !(i % 5 != 2)', '!(i % 3) && (i % 5 == 2)'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（不能实现）**

\`i%3\` 非零就表示不能被 3 整除，所以 A、B 的前半部分等价；C 的 \`!(i%5!=2)\` 等价于 \`i%5==2\`，也能实现。D 的 \`!(i%3)\` 恰好表示 \`i%3==0\`，筛选的是能被 3 整除的数，与要求相反。`,
            tags: ['逻辑运算'],
        },
        {
            id: 13,
            type: 'single',
            question: `下面 C++ 代码用于判断一个大于 0 的正整数是几位数，横线处应填入代码先后是（ ）。\n\n\`\`\`cpp\nint N, cnt;\ncout << "请输入大于0的正整数：";\ncin >> N;\n\ncnt = 0;\nwhile (_________){\n    cnt += 1;\n    ______________;\n}\n\ncout << cnt;\n\`\`\``,
            options: ['N > 1；N = N / 10', 'N > 1；N /= 10', 'N == 0；N /= 10', 'N > 0；N /= 10'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4, 5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`N>0\`，\`N/=10\`）**

每做一次 \`N/=10\` 就去掉一个十进制数位，同时把计数器加 1。当所有数位都被去掉后，\`N\` 变为 0，循环结束。条件若写成 \`N>1\`，输入 1、10、100 等数时都会少数一位；\`N==0\` 则会让正整数一开始就不进入循环。`,
            tags: ['数位分离'],
        },
        {
            id: 14,
            type: 'single',
            question: `判断一个数是否为自守数。自守数的定义是如果一个数的平方其尾数与该数相同，则为自守数，如 25 的平方是 625，其尾数是 25，所以 25 是自守数。相关说法错误的是（ ）。\n\n\`\`\`cpp\nint N, N1, M1;\ncout << "输入一个正整数：";\ncin >> N;\nN1 = N, M1 = N * N;\n\nbool Flag = true;\n\nwhile (N1 > 0){\n    if (N1 % 10 != M1 % 10){\n        Flag = false;\n        break;\n    }\n    else{\n        N1 = N1 / 10, M1 = M1 / 10;\n    }\n}\n\nif (Flag == true)\n    printf("%d的平方是%d,是自守数", N, N * N);\nelse\n    printf("%d的平方是%d,不是自守数", N, N * N);\n\`\`\``,
            options: [
                '如果 Flag 在循环中不被改为 false，则说明该数是自守数',
                '代码 if (N1 % 10 != M1 % 10) 用于判断其个位数是否相等，如果不等，则表明不是自守数',
                '代码 N1 = N1 / 10, M1 = M1 / 10 将个位数去掉',
                '将 N1 > 0 改为 N > 0 效果相同',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（该说法错误）**

\`N1\` 是会不断除以 10 的副本，用它控制循环才能在所有数位比较完后结束；原始变量 \`N\` 始终保持正数。若改成 \`while(N>0)\`，当各位一直相等时条件永远为真，最终会陷入死循环。A、B、C 分别正确描述了标记变量、个位比较和去掉个位的作用。这里按题目意图假设 \`N*N\` 在 \`int\` 范围内。`,
            tags: ['数位判断'],
        },
        {
            id: 15,
            type: 'single',
            question: `下面 C++ 代码实现输出如下图形，相关说法错误的是（ ）。\n\n\`\`\`text\n请输入层数: 10\n0\n12\n345\n6789\n01234\n567890\n1234567\n89012345\n678901234\n5678901234\n\`\`\`\n\n\`\`\`cpp\nint line_number, now_number;\nint i,row;\n\ncout << "请输入行数: ";\ncin >> line_number;\nnow_number = 0;\n\nfor (row = 1; row < line_number + 1; row++){ // L1\n    for (i = 0; i < row; i++){ // L2\n        cout << now_number;\n        now_number += 1;\n        if (now_number == 10) now_number = 0; // L3\n    }\n    cout << endl;\n}\n\`\`\``,
            options: [
                '代码 now_number = 0 移动到 L1 和 L2 标记的两行代码之间，效果维持不变',
                '代码 now_number += 1 修改为 now_number = 1 + now_number 效果维持不变',
                '将代码 now_number == 10 调整为 now_number > 9 效果维持不变',
                '将最后一行的 cout << endl 修改为 cout << "\\n"，效果维持不变',
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5, 6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷示例首行显示“请输入层数: 10”，所给代码却输出“请输入行数: ”，因此代码不能逐字产生题目展示的完整输出。官方答案 A 仍能反映数字图形部分的命题意图，但题面与代码不一致，本题不计分。',
            explanation: `**原卷答案：A；本题不计分**

把 \`now_number=0\` 移到外层循环与内层循环之间，会让每一行都重新从 0 开始，数字序列将变成 \`0\`、\`01\`、\`012\`……，与展示图形不同，因此 A 是“效果维持不变”中的错误说法。B 的两种加 1 写法等价；由于数值每次只增加 1，C 的 \`==10\` 与 \`>9\` 在本程序中效果相同；D 的两种写法都输出换行，显示文本相同，只是 \`endl\` 还会刷新缓冲区。

原卷另有一处题面缺陷：示例提示语是“请输入层数”，代码实际打印“请输入行数”。因此代码不能完整复现示例，本站保留原文和官方答案，但从评分排除。`,
            tags: ['嵌套循环'],
        },
        {
            id: 16,
            type: 'judge',
            question: `人们现在参加很多闭卷考试时通常都不允许带智能手机、平板电脑等，此外很多种智能手表同样因为具有嵌入操作系统及通信等功能，所以也不允许随身携带。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

智能手表可能运行嵌入式操作系统，并具备存储、计算或无线通信能力，能够接收和传递信息。因此许多闭卷考试会把它和智能手机、平板电脑一样列为禁止携带的电子设备。`,
            tags: ['计算机基础'],
        },
        {
            id: 17,
            type: 'judge',
            question: `在 C++ 代码中，假设 N 为正整数，则 \`N / 10\` 舍弃个位数。如果 N 小于 10，则其值为 0，大于 10 则是舍弃个位数的数。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

正整数除以 10 使用整数除法，小数部分会被截去，相当于删除十进制表示的个位。例如 $123/10=12$，而 $7/10=0$。题干没有单独描述 $N=10$，此时结果同样是 1。`,
            tags: ['整数除法'],
        },
        {
            id: 18,
            type: 'judge',
            question: `下列 C++ 代码执行后，其输出为 \`10 20\`，即 \`a == b\` 和 \`b == a\` 对 \`a\` 和 \`b\` 的值没有任何影响。（ ）\n\n\`\`\`cpp\nint a = 10, b = 20;\na == b;\nb == a;\ncout << (a, b);\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

两条 \`==\` 确实只是比较，不会修改 \`a\`、\`b\`。但 \`cout << (a, b)\` 中的括号是逗号表达式，它先计算 \`a\`，最后取 \`b\` 的值，因此只输出 \`20\`，不会输出 \`10 20\`。整句话包含错误的输出结论，所以判错。`,
            tags: ['表达式'],
        },
        {
            id: 19,
            type: 'judge',
            question: `a 和 b 分别是 C++ 的整型变量，如果表达式 \`max(a, b) == min(a, b)\` 的值为真，则说明 a 和 b 相等。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

若 $a\\ne b$，较大值和较小值必然不同，\`max(a,b)\` 不可能等于 \`min(a,b)\`。只有 $a=b$ 时，最大值和最小值才是同一个数，因此该表达式为真能够推出 a 和 b 相等。`,
            tags: ['函数'],
        },
        {
            id: 20,
            type: 'judge',
            question: `下面 C++ 代码编译时将报错，因为字符变量 a 被赋值了浮点值。（ ）\n\n\`\`\`cpp\nchar a = '1';\na = 45.6;\ncout << a;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

C++ 允许把浮点数赋给 \`char\`，编译器会进行隐式数值转换：先截去 45.6 的小数部分得到 45，再存入字符变量。编译器可能给出“窄化转换”警告，但这不是必须导致编译失败的语法错误。输出时会按字符编码 45 对应的字符显示。`,
            tags: ['数据类型'],
        },
        {
            id: 21,
            type: 'judge',
            question: `下面 C++ 代码执行时如输入 59.99，将输出“及格”两个汉字。（ ）\n\n\`\`\`cpp\nint score;\ncout << "请输入学生成绩: ";\ncin >> score;\nif (score < 60)\n    cout << "不及格";\nelse\n    cout << "及格";\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

\`score\` 是整数。输入 \`59.99\` 时，\`cin >> score\` 会成功读入小数点之前的 59，小数点及后面的内容留在输入缓冲区。因为 $59<60$，程序进入第一个分支并输出“不及格”，不是“及格”。`,
            tags: ['输入输出'],
        },
        {
            id: 22,
            type: 'judge',
            question: `在下面的 C++ 代码中，因为 \`continue\` 将被执行，因此不会有输出。（ ）\n\n\`\`\`cpp\nint i;\nfor (i = 1; i < 10; i++)\n    if (i % 2 == 0)\n        continue;\nif(i == 10)\n    cout << "END";\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

\`continue\` 只影响当前一轮循环，且这里只有偶数 i 才执行。无论是否执行 \`continue\`，for 循环都会继续递增，最终在 \`i=10\` 时结束。循环后的 \`if(i==10)\` 成立，因此程序会输出 \`END\`。`,
            tags: ['循环控制'],
        },
        {
            id: 23,
            type: 'judge',
            question: `下面的 C++ 代码执行后将输出 15。（ ）\n\n\`\`\`cpp\nint Sum = 0;\nfor (int i = 0; i < 5; i++)\n    Sum += i;\ncout << Sum;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

循环变量依次为 0、1、2、3、4，不会取到 5，因此 \`Sum=0+1+2+3+4=10\`。15 是 $1+2+3+4+5$ 的结果，通常来自误把条件 \`i<5\` 看成 \`i<=5\`。`,
            tags: ['循环'],
        },
        {
            id: 24,
            type: 'judge',
            question: `将下面 C++ 代码中的 \`(int i = 5; i > 1; i--)\` 调整为 \`(int i = 1; i < 5; i++)\` 输出结果相同，因为 5 到 1 与 1 到 5 的求和相同。（ ）\n\n\`\`\`cpp\nint tnt;\ntnt = 0;\nfor (int i = 5; i > 1; i--)\n    tnt += i;\ncout << tnt;\n    cout << endl;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

原循环取 $i=5,4,3,2$，和为 14；修改后的循环取 $i=1,2,3,4$，和为 10。两个循环都使用严格不等号，前者不包含 1，后者不包含 5，所以并不是同一组数的反向遍历，输出不同。`,
            tags: ['循环边界'],
        },
        {
            id: 25,
            type: 'judge',
            question: `为实现如下效果，即 N 行 N 列字符。当输入是奇数时，中间列为 \`*\`，其他是 \`-\`；当输入是偶数时，则中间两列是 \`*\`，其他是 \`-\`。字符阵列后的代码能实现其效果。（ ）\n\n\`\`\`text\n/*\n5\n--*--\n--*--\n--*--\n--*--\n--*--\n*/\n\`\`\`\n\n\`\`\`cpp\nint N;\ncin >> N;\n\nint i,j;\nfor (i = 0; i < N; i++){\n    for (j = 0; j < N; j++)\n        if ((j == N / 2) || (j == (N-1) / 2))\n            cout << "*";\n        else\n            cout << "-";\n    cout << endl;\n}\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

列下标从 0 开始。N 为奇数时，\`N/2\` 与 \`(N-1)/2\` 相等，只会选中唯一的中间列；N 为偶数时，两者分别是右中列和左中列，会选中相邻的两列。外层循环重复 N 行，因此得到题目要求的 N 行 N 列字符阵列。`,
            tags: ['嵌套循环'],
        },
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '数三角形',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7, 8],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `3`,
                    output: `3`,
                },
                {
                    input: `5`,
                    output: `9`,
                },
            ],
            question: `
# [GESP202506 二级] 数三角形

- **试题名称**：数三角形
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

直角三角形有两条直角边与一条斜边，设两条直角边的长度分别为 $a,b$，则直角三角形的面积为 $\\dfrac{ab}{2}$。

请你计算当直角边长 $a,b$ 均取不超过 $n$ 的正整数时，有多少个不同的面积为整数的直角三角形。直角边长分别为 $a,b$ 和 $a',b'$ 的两个直角三角形相同，当且仅当 $a=a',b=b'$ 或者 $a=b',b=a'$。

## 输入格式

一行，一个整数 $n$，表示直角边长的最大值。

## 输出格式

输出一行，一个整数，表示不同的直角三角形数量。

## 样例

### 输入样例 1

\`\`\`text
3
\`\`\`

### 输出样例 1

\`\`\`text
3
\`\`\`

### 输入样例 2

\`\`\`text
5
\`\`\`

### 输出样例 2

\`\`\`text
9
\`\`\`

## 数据范围

对于所有测试点，保证 $1 \\le n \\le 1000$。
`,
            score: 25,
            explanation: `**算法：枚举不重复的两条直角边**

交换 $a,b$ 不会产生新的三角形，所以只枚举 $1\\le a\\le b\\le n$。面积 $ab/2$ 是整数，当且仅当乘积 $ab$ 是偶数，即两条边中至少一条是偶数。原卷参考程序用双重循环枚举所有这样的无序边长对，并在 \`a*b%2==0\` 时计数，时间复杂度为 $O(n^2)$；$n\\le1000$ 时可以通过。

**样例复算：**
- $n=3$ 时，符合条件的是 $(1,2),(2,2),(2,3)$，共 3 个。
- $n=5$ 时，无序边长对共有 $5\\times6/2=15$ 个。两边都为奇数的无序对来自 1、3、5，共 $3\\times4/2=6$ 个；其余 $15-6=9$ 个面积为整数。

**易错点：**
- 内层从 \`b=a\` 开始，避免把 $(2,3)$ 和 $(3,2)$ 重复计数。
- 面积为整数只需判断乘积是否为偶数，不需要使用浮点数。`,
            tags: ['编程题', '枚举', '奇偶性'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <iostream>
using namespace std;

int main()
{
    int n, a, b, cnt=0;
    cin >> n;
    for(a=1; a<=n; a++)
    {
        for(b=a; b<=n; b++)
        {
            if(a*b%2==0) cnt++;
        }
    }
    cout << cnt <<endl;
    return 0;
}`,
        },
        {
            id: 27,
            type: 'programming',
            title: '幂和数',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `2 8`,
                    output: `6`,
                },
                {
                    input: `10 100`,
                    output: `20`,
                },
            ],
            question: `
# [GESP202506 二级] 幂和数

- **试题名称**：幂和数
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

对于正整数 $n$，如果 $n$ 可以表示为两个 2 的次幂之和，即 $n=2^x+2^y$（$x,y$ 均为非负整数），那么称 $n$ 为幂和数。

给定正整数 $l,r$，请你求出满足 $l\\le n\\le r$ 的整数 $n$ 中有多少个幂和数。

## 输入格式

一行，两个正整数 $l,r$，含义如上。

## 输出格式

输出一行，一个整数，表示 $l,r$ 之间幂和数的数量。

## 样例

### 输入样例 1

\`\`\`text
2 8
\`\`\`

### 输出样例 1

\`\`\`text
6
\`\`\`

### 输入样例 2

\`\`\`text
10 100
\`\`\`

### 输出样例 2

\`\`\`text
20
\`\`\`

## 数据范围

对于所有测试点，保证 $1 \\le l \\le r \\le 10^4$。
`,
            score: 25,
            explanation: `**算法：枚举两个 2 的次幂**

从 $1=2^0$ 开始不断乘 2，可以得到不超过 $r$ 的所有 2 的次幂。原卷程序用 \`a\` 枚举第一个幂，再令 \`b=a\` 枚举第二个幂，这相当于只考虑 $x\\le y$，避免把 $2^x+2^y$ 和 $2^y+2^x$ 重复计算。每得到一个和 \`n=a+b\`，若它在 $[l,r]$ 内就计数。

两个 2 的次幂之和具有唯一的二进制形式：指数不同时，二进制中恰有两个 1；指数相同时，和等于下一个 2 的次幂。因此这种按无序指数对计数不会把同一个整数重复统计。

**样例 1：**
$[2,8]$ 中的幂和数为 $2,3,4,5,6,8$，共 6 个。

不超过 $10^4$ 的 2 的次幂只有十几个，双重枚举的复杂度约为 $O((\\log r)^2)$。

**易错点：**
- $x,y$ 可以为 0，所以最小的幂是 $2^0=1$。
- 区间包含端点，判断应使用 \`n>=l && n<=r\`。`,
            tags: ['编程题', '枚举', '幂'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <iostream>
using namespace std;

int main()
{
    int l, r, a, b, n, cnt = 0;
    cin >> l >> r;

    a = 1;
    while(a<=r)
    {
        b = a;
        while(b<=r)
        {
            n = a+b;
            if(n>=l && n<=r) cnt++;
            b *= 2;
        }
        a *= 2;
    }
    cout << cnt <<endl;
    return 0;
}`,
        },
    ],
};
