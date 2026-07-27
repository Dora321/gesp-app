// 2025年9月 GESP C++ 二级真题 (第11次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照 CCF GESP 原卷镜像校订。
// 镜像文件的 git blob 为 ee47f8b19c9c5c5f1d1cb1bf3ae4ac3e2eb80057
//（1162339 字节），与 paperSources.js 登记值一致。
//
// 客观题答案均取自原卷答案表：
//   单选题：D C C D D A D B D A D C A A D
//   判断题：× √ × √ √ × √ √ √ ×
// 判断题答案表在 PDF 第 6 页以红色矢量记号呈现，已渲染后逐格人工读取。
const SOURCE_URL = 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf';
const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-27';

export const paperData = {
    id: '2025-09-l2',
    title: '2025年9月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    source: {
        officialPdf: SOURCE_URL,
        type: 'archived-official',
        notes: '题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录。',
    },
    reviewStatus: 'verified',
    reviewScope: '全卷 27 题（单选 15 + 判断 10 + 编程 2）的题面、代码、选项、答案、解析，以及两道编程题的题意、约束、样例与原卷参考程序，均已逐题核验。',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-27',
    verification: {
        status: 'verified',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-27',
        scope: '全卷 27 题均已逐题对照 CCF GESP 原卷镜像核验；单选题答案取自第 1 页答案表，判断题答案按第 6 页红色矢量标记逐格读取。',
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
            question: `人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切是指（ ）。`,
            options: ['大电脑模型', '大规模智能', '智能的单位', '大语言模型'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（大语言模型）**

在四个选项中，“大语言模型”是人工智能领域的正式术语，指用大量数据和参数训练、能够理解或生成语言的模型。“大”说的是模型规模，不是电脑的物理大小；“大规模智能”和“智能的单位”也都不是这里对应的术语。`,
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: `在 TCP 协议中，完成连接建立需要通过（ ）握手。`,
            options: ['一次', '二次', '三次', '四次'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（三次）**

TCP 建立连接使用“三次握手”：客户端先发送连接请求，服务器回复请求并确认，客户端再确认服务器的回复。这样双方都能知道自己的发送能力和对方的接收能力可用。不要和 TCP 关闭连接时常说的“四次挥手”混淆。`,
            tags: ['网络基础'],
        },
        {
            id: 3,
            type: 'single',
            question: `下面的 C++ 代码用于输入姓名，然后输出姓名，正确的说法是（ ）。\n\n\`\`\`cpp\nstring XingMing;\ncout << "请输入您的姓名：";\ncin >> XingMing;\ncout << XingMing;\n\`\`\``,
            options: ['XingMing 是汉语拼音，不能作为变量名称', '可以将 XingMing 改为 Xing Ming', '可以将 XingMing 改为 xingming', '可以将 XingMing 改为 Xing-Ming'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（可以改为 \`xingming\`）**

C++ 标识符可以由字母、数字和下划线组成，但不能以数字开头，也不能含空格或减号。\`XingMing\` 和 \`xingming\` 都合法，只是 C++ 区分大小写，它们是两个不同名称。\`Xing Ming\` 含空格，\`Xing-Ming\` 会被解释成减法表达式，因此都不能作为一个变量名。`,
            tags: ['变量与标识符'],
        },
        {
            id: 4,
            type: 'single',
            question: `下面 C++ 代码用于获得正整数 N 的第 M 位数，如 N 等于 1234，M 等于 2，则输出 3。此题假设 M 的值大于等于 1 且小于等于 N 的位数。横线处应填入的代码是（ ）。\n\n\`\`\`cpp\nint N, M, div=1;\ncout << "请输入一个正整数：";\ncin >> N;\ncout << "请输入从右到左取第几位数：";\ncin >> M;\n\nfor (int i =0; i < (M - 1); i++) div *= 10;\n\ncout << (______________);\n\`\`\``,
            options: ['N % div / 10', 'N / div / 10', 'N % div % 10', 'N / div % 10'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1, 2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`N / div % 10\`）**

循环结束后，\`div\` 等于 $10^{M-1}$。先做 \`N / div\`，会把目标位右边的数字去掉，使目标位来到个位；再做 \`% 10\`，就能取出这个个位。以 $N=1234,M=2$ 为例，\`div=10\`，所以 \`1234/10%10=123%10=3\`。`,
            tags: ['数位提取'],
        },
        {
            id: 5,
            type: 'single',
            question: `下面 C++ 代码执行，其输出是（ ）。\n\n\`\`\`cpp\na, b = 3, 4;\nc = a == b;\ncout << a << ' ' << b << ' ' << c;\n\`\`\``,
            options: ['3 4 0', '3 3 3', '4 4 4', '以上都不对'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（以上都不对）**

逗号运算符的优先级低于赋值运算符，因此第一行按 \`(a), (b = 3), (4)\` 计算：\`b\` 被赋值为 3，最后的 4 没有赋给变量，\`a\` 也没有在这行得到新值。随后 \`c\` 只能是比较结果 0 或 1，不可能是选项 B、C 中的 3 或 4；A 的 \`b=4\` 也不成立，所以选 D。原卷片段省略了变量此前的声明与初值，但不影响排除前三项。`,
            tags: ['表达式'],
        },
        {
            id: 6,
            type: 'single',
            question: `某种编号的规则是“XX-Y”，其中 XX 从 00 到 11，Y 从 0 到 9。第 1 个编号是 00-0，第 2 个编号是 01-1，……，第 12 个编号 11-1，第 13 个编号 00-2，即其编码规则是 XX 和 Y 同时增 1，到 XX 到 11 时下一个变为 00，Y 到 9 时，下一个变为 0。下面的 C++ 代码用于生成第 N 个编号，横线处应填上的代码是（ ）。\n\n\`\`\`cpp\ncout << "请输入编号位置：";\ncin >> N;\n\npart1 = N % _____;\npart2 = N % _____;\n\nif (part1 < 10)\n    printf("0%d-%d\\n", part1, part2);\nelse\n    printf("%d-%d\\n", part1, part2);\n\`\`\``,
            options: ['12 10', '10 10', '11 9', '9 9'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷示例称第 1 个编号为 00-0，但所给代码直接使用 N 取模，输入 1 会得到 01-1。两处填空的除数仍可确定为 12 和 10，但整段程序缺少 N-1 的序号转换，因此本题不计分。',
            explanation: `**答案：A（12，10）**

\`part1\` 需要在 0 到 11 之间循环，共 12 种值，所以使用 \`N % 12\`；\`part2\` 需要在 0 到 9 之间循环，共 10 种值，所以使用 \`N % 10\`。取模的结果范围总是从 0 到“除数减 1”。原卷的编号示例采用从第 1 个开始的自然语言序号，而代码直接对 \`N\` 取模；若要让输入 1 严格对应 00-0，还需先把序号换成 \`N-1\`，但这不影响两处横线分别应填 12 和 10。`,
            tags: ['取模运算'],
        },
        {
            id: 7,
            type: 'single',
            question: `下面的 C++ 代码执行后其输出是（ ）。\n\n\`\`\`cpp\ncnt = 0;\nfor (int i = -10; i < 10; i++)\n    for (int j =0; j < i; j++)\n        cnt += 1;\ncout << cnt;\n\`\`\``,
            options: ['145', '125', '55', '45'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2, 3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（45）**

当 $i\\le0$ 时，内层循环一开始就是 \`j=0\`，条件 \`j<i\` 不成立，所以不累加。$i=1$ 到 $9$ 时，内层分别执行 1、2、……、9 次，因此 \`cnt=1+2+...+9=45\`。外层条件是 \`i<10\`，不会执行 $i=10$。`,
            tags: ['循环'],
        },
        {
            id: 8,
            type: 'single',
            question: `下面 C++ 代码执行后其输出是（ ）。\n\n\`\`\`cpp\nfor (i =1; i < 12; i++){\n    if (i % 2 == 0)\n        continue;\n\n    for (j = 0; j < i; j++)\n        if (i * j % 2)\n            break;\n}\nif(i>= 12)\n    cout << (i * j);\n\`\`\``,
            options: ['110', '12', '不确定', '无输出'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（12）**

偶数 $i$ 会被 \`continue\` 跳过。每次遇到奇数 $i$，内层循环都会重新执行 \`j=0\`：此时乘积为 0，不会退出；接着 \`j=1\`，奇数乘 1 仍是奇数，于是 \`break\`，留下 \`j=1\`。最后一次奇数是 $i=11$，所以外层结束时 $i=12,j=1$，条件成立并输出 $12\\times1=12$。`,
            tags: ['循环控制'],
        },
        {
            id: 9,
            type: 'single',
            question: `阅读下面的 C++ 代码，其中变量都是整型，则说法正确的是（ ）。\n\n\`\`\`cpp\ncin >>a >> b;\n\nwhile (b != 0){\n    remainder = a % b;\n    a = b;\n    b = remainder;\n}\ncout << a;\n\`\`\``,
            options: ['b 不能为 0，因为 a % b 将导致错误', 'a 必须小于 b，否则 a % b 将导致错误', 'a 和 b 都必须为正整数，否则 a % b 将导致错误', '如果 a 输入为 0，则不管 b 的输入值是什么，输出值的绝对值都是 abs(b)'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D**

循环只在 \`b != 0\` 时计算 \`a % b\`，所以输入的 \`b\` 可以是 0；此时循环直接跳过。取模也不要求 $a<b$，负整数同样可以进行整数取模。若初始 $a=0,b\\ne0$，第一轮得到余数 0，然后令 \`a=b,b=0\`，最终输出原来的 $b$；若初始 $b=0$，输出 0。因此输出值的绝对值都是 \`abs(b)\`。`,
            tags: ['最大公约数'],
        },
        {
            id: 10,
            type: 'single',
            question: `下面 C++ 代码执行后输出是（ ）。\n\n\`\`\`cpp\nnum = 0;\nwhile (num <= 5){\n    num += 1;\n    if (num == 3)\n        continue;\n    printf("%d#", num);\n}\n\`\`\``,
            options: ['1#2#4#5#6#', '1#2#4#5#6', '1#2#3#4#5#6#', '1#2#3#4#5#6'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`1#2#4#5#6#\`）**

每轮先把 \`num\` 加 1，再判断是否等于 3。等于 3 时只跳过本轮输出，因此没有 \`3#\`。当进入最后一轮时 \`num=5\` 仍满足 \`num<=5\`，加 1 后会输出 \`6#\`，下一次检查才结束循环。`,
            tags: ['循环控制'],
        },
        {
            id: 11,
            type: 'single',
            question: `下面 C++ 代码用于记录多个输入数中的最大数和最小数（输入 -999 则输入结束），相关说法错误的是（ ）。\n\n\`\`\`cpp\ncin >> now_num;\nmin_num = max_num = now_num;\n\nwhile (now_num != -999){\n    if (max_num < now_num)\n        max_num = now_num;\n\n    if (min_num > now_num)\n        min_num = now_num;\n\n    cin >> now_num;\n}\ncout << min_num << ' ' << max_num;\n\`\`\``,
            options: [
                '程序运行时如果第一个数输入 -999，则输出将是 -999 -999',
                '程序输入过程中，如果输入的第一个数不是 -999，则如果待输入的数据中没有 -999，则程序能求出已输入整数中的最大数和最小数',
                '如果用于输入考试成绩，即成绩中不可能有 -999，则程序能求出已输入成绩中的最高成绩和最低成绩',
                '可以将 cin >> now_num; 移动到 while (now_num != -999) { 下面，结果不变',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3, 4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（该说法错误）**

程序先读入第一个数，用它初始化最大值和最小值，之后每轮先处理当前值、再读下一个值。这个顺序不能随意移动：若把首次读入移进循环，循环条件会先读取尚未获得有效值的 \`now_num\`；若把循环末尾的读入移到循环开头，则当前值的处理顺序也会改变，所以“结果不变”不成立。首次输入 -999 时循环不执行，A 的输出正确；B、C 按题意都需要在有效数据之后再输入 -999 作为结束标志。`,
            tags: ['循环'],
        },
        {
            id: 12,
            type: 'single',
            question: `下面 C++ 代码执行后输出与 5 有关数的数量。“与 5 有关的数”定义为含有 5 或者能被 5 整除的数。相关说法正确的是（ ）。\n\n\`\`\`cpp\ncnt = 0;\nfor (i = 1; i < 1000; i++){\n    if (i % 5 == 0){\n        cnt += 1;\n        continue;\n    }\n    j = i;\n    while (j > 0)\n        if (j % 10 == 5){\n            cnt += 1;\n            break;\n        }\n        else\n            j /= 10;\n}\ncout << cnt;\n\`\`\``,
            options: ['删除代码中 continue 不影响程序执行结果', '删除 j = i 并将 while 循环内的 j 修改为 i，不影响程序执行结果', '代码中 break 修改为 j = 0，不影响程序执行结果', '将 while (j > 0) 修正为 while (j >= 0) 不影响程序执行的结果'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（把 \`break\` 改为 \`j=0\`）**

发现某一位是 5 后，\`break\` 会立刻结束内层 \`while\`；改成 \`j=0\` 后，下一次检查 \`j>0\` 也会结束循环，计数相同。删除 \`continue\` 会让某些既能被 5 整除又含 5 的数重复计数；直接修改外层变量 \`i\` 会破坏枚举；把条件改成 \`j>=0\` 则会在 \`j=0\` 时永远循环。`,
            tags: ['数位判断'],
        },
        {
            id: 13,
            type: 'single',
            question: `下面 C++ 代码实现输出如下图形，应该在横线处填入的代码是（ ）。\n\n\`\`\`text\n请输入层数：10\n         1\n        23\n       456\n      7891\n     23456\n    789123\n   4567891\n  23456789\n 123456789\n1234567891\n\`\`\`\n\n\`\`\`cpp\ncout << "请输入层数：";\ncin >> N;\n\nK = 1;\n\nfor (i = 1; i < N + 1; i++){\n    for (int _ = 1; _ < ___________; _++)\n        cout << " ";\n\n    for (int _ = 1; _ < ________; _++){\n        cout << K;\n\n        K += 1;\n        if (K == 10)\n            K = 1;\n    }\n    cout << '\\n';\n}\n\`\`\``,
            options: ['N - i + 1；i + 1', 'N - i；i', 'N；i', 'N - i；i + 1'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4, 5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`N-i+1\`，\`i+1\`）**

第 $i$ 行需要先输出 $N-i$ 个空格，再输出 $i$ 个数字。循环变量从 1 开始且条件使用“小于”：\`_ < N-i+1\` 恰好执行 $N-i$ 次，\`_ < i+1\` 恰好执行 $i$ 次。数字 $K$ 加到 10 时重置为 1，所以会按 1 到 9 循环。`,
            tags: ['循环'],
        },
        {
            id: 14,
            type: 'single',
            question: `下面 C++ 代码执行，其输出是（ ）。\n\n\`\`\`cpp\nint a=9, b=27;\na = 'a' + 'b';\nb = 'a' - 'b';\na = a - b;\ncout << a << ' ' << b << endl;\n\`\`\``,
            options: ['196 -1', '27 9', '98 97', '不确定'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`196 -1\`）**

按本题采用的 ASCII 编码，\`'a'=97\`、\`'b'=98\`。因此先得到 \`a=97+98=195\`，再得到 \`b=97-98=-1\`，最后 \`a=195-(-1)=196\`。输出时两个整数之间有一个空格，所以结果是 \`196 -1\`。`,
            tags: ['字符编码'],
        },
        {
            id: 15,
            type: 'single',
            question: `有个无限长的链，由 3 种外形相同但材质不同的环链成。3 种环的重量分别是 3、4、6 克，相同材质的多个环每 12 克一组，分别记为 G3、G4、G6。链依次 G3、G4、G6、G3、G4、G6、……。同时对链上所有环从头依次编号 1、2、3、4……。输入正整数代表环编号，求该编号前所有环（不含该环本身）的重量。下面是 C++ 代码实现，正确说法是（ ）。\n\n\`\`\`cpp\ni int N, G, R;\nint wc = 0;\n\ncin >> N; // 输入正整数\nG = (N - 1) / 9; // L1\nR = (N - 1) % 9; // L2: 保存余数\nwc += 36*G;\n\nif((1 <= R) && (R <= 4))\n    wc += 3*R; // L3\nelse if ((5 <= R) && (R <= 7))\n    wc += 4*R; // L4\nelse if(R == 8)\n    wc += 6*(R - 1); // L5\ncout << wc << endl;\n\`\`\``,
            options: ['必须同时修改 L1 和 L2 代码行才能实现功能', '必须同时修改 L3 和 L4 代码行才能实现功能', '必须同时修改 L3 和 L5 代码行才能实现功能', '其他说法都不对'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5, 6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷代码首行印为“i int N, G, R;”，无法通过编译。题目考查的 L1-L5 逻辑仍可分析，但题面程序不是可执行的完整 C++，因此本题不计分。',
            explanation: `**答案：D（其他说法都不对）**

**转录说明：** 原卷第 5 页首行确实印有多余的字符 \`i\`。要编译需先改成 \`int N, G, R;\`；选项考查的是标记为 L1 至 L5 的计算逻辑，以下按原卷显然意图分析。

每种材质凑 12 克时，G3 有 4 个环、G4 有 3 个环、G6 有 2 个环，所以一个完整周期共 9 个环、36 克。L1、L2 正确。余数 $R=1..4$ 时，前 $R$ 个都是 3 克环，L3 正确；$R=5..7$ 时应为 $12+4(R-4)=4R-4$，L4 错；$R=8$ 时应为 $12+12+6=30$，L5 也错。真正需要修改的是 L4 和 L5，而前三个选项都没有这一组合，所以选 D。`,
            tags: ['程序分析'],
        },
        {
            id: 16,
            type: 'judge',
            question: `在集成开发环境里调试程序时，要注意不能修改源程序，因为如果修改，就要终止调试、关闭该文件并重新打开，才能再次开始调试。（ ）`,
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

调试时通常可以修改源文件。修改后的代码要重新编译并重新启动调试，才会成为新的可执行程序，但没有“必须关闭文件再重新打开”的要求。源文件、编译出的程序和正在运行的调试进程是不同层次，不能混为一谈。`,
            tags: ['调试'],
        },
        {
            id: 17,
            type: 'judge',
            question: `在 C++ 代码中，假设 N 为正整数且大于 100，则 \`N / 100\` 将舍弃个位和十位，如 N 为 1234 则 \`cout << (N / 100)\` 将输出 12。如果 N 小于 100，则其值为 0。（ ）`,
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

两个正整数相除时，C++ 的整数除法会丢掉小数部分。\`1234/100=12\`，等价于去掉末尾两位；当 $0<N<100$ 时，商小于 1，截去小数后就是 0。`,
            tags: ['整数除法'],
        },
        {
            id: 18,
            type: 'judge',
            question: `下列 C++ 代码执行后将输出 1，因为 a 确实小于 20 和 10。（ ）\n\n\`\`\`cpp\na = 5;\ncout << (a < 10 and 20);\n\`\`\``,
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

\`and\` 是 \`&&\` 的另一种写法，且 \`<\` 优先级更高，所以表达式是 \`(a < 10) and 20\`。当 $a=5$ 时，左边为真，非零整数 20 也会转换为真，因此程序确实输出 1；但代码根本没有比较 \`a<20\`，题干给出的“因为 a 小于 20 和 10”不是这段表达式的语义。原卷据此把整句判断为错误。若要同时检查两个上界，应写出两个完整比较，例如 \`a < 10 && a < 20\`。`,
            tags: ['逻辑运算'],
        },
        {
            id: 19,
            type: 'judge',
            question: `下面的 C++ 代码中变量都是整型，则执行后将输出 1。（ ）\n\n\`\`\`cpp\nx, y, z = 5, 10, 15;\nresult = x < y < z;\ncout << result;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷写作“x, y, z = 5, 10, 15;”，按 C++ 逗号运算符规则只会给 z 赋值，不能得到题目解析所假设的 x=5、y=10、z=15。官方答案按命题意图为“正确”，但程序片段本身不足以推出该结果，因此本题不计分。',
            explanation: `**答案：正确（按原卷答案表）**

原卷的考查意图是：在 $x=5,y=10,z=15$ 的前提下，\`x < y < z\` 按从左到右计算，先得 \`x<y\` 为 1，再算 \`1<z\`，仍为真，所以输出 1。

**严格的 C++ 提醒：** 原卷第一行写成 \`x, y, z = 5, 10, 15;\`，按逗号运算符的真实规则只会把 5 赋给 \`z\`，并不会依次把 5、10、15 赋给三个变量；片段又没有给出 \`x,y\` 的旧值。因此这行本身存在上下文歧义。本站保留原卷的“正确”答案，同时明确指出：实际程序应分别写 \`x=5; y=10; z=15;\`，范围判断则应写 \`x < y && y < z\`。`,
            tags: ['表达式'],
        },
        {
            id: 20,
            type: 'judge',
            question: `下面 C++ 代码执行时如输入 99.99，将输出“及格”两个汉字。（ ）\n\n\`\`\`cpp\nint score;\ncout << "请输入学生成绩：";\ncin >> score;\nif (score >= 60)\n    printf("及格");\nelse\n    printf("不及格");\n\`\`\``,
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

\`score\` 是 \`int\`。用 \`cin >> score\` 读取输入 \`99.99\` 时，会先成功读到小数点之前的整数 99，小数点及后面的内容留在输入缓冲区。因为 $99\\ge60$，程序进入第一个分支并输出“及格”。`,
            tags: ['输入输出'],
        },
        {
            id: 21,
            type: 'judge',
            question: `执行下面的 C++ 代码时输入 123，则输出是 DCB。（ ）\n\n\`\`\`cpp\nint a;\ncin >> a;\nwhile(a){\n    cout << 'A'+a%10;\n    a /= 10;\n}\n\`\`\``,
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

循环确实按个位、十位、百位依次取得 3、2、1，但表达式 \`'A' + a % 10\` 发生整数运算，结果类型是 \`int\`，所以 \`cout\` 输出数值而不是字符。按 ASCII，三次结果分别为 $65+3=68$、$65+2=67$、$65+1=66$，且代码没有分隔符，实际输出是 \`686766\`，不是 \`DCB\`。本站已用 C++17 实测确认。若要输出字符，应写 \`cout << char('A' + a % 10);\`。`,
            tags: ['字符编码'],
        },
        {
            id: 22,
            type: 'judge',
            question: `下面的 C++ 代码执行后将输出 \`+#+#3#\`。（ ）\n\n\`\`\`cpp\nint i;\nfor (i = 0; i < 3; i++){\n    if (i == 2)\n        continue;\n    printf("+#");\n}\ncout << i << '#';\n\`\`\``,
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

$i=0$ 和 $i=1$ 时各输出一次 \`+#\`，合起来是 \`+#+#\`。$i=2$ 时 \`continue\` 跳过输出，但仍会执行 for 循环的 \`i++\`，所以循环结束时 $i=3$。最后再输出 \`3#\`，完整结果就是 \`+#+#3#\`。`,
            tags: ['循环控制'],
        },
        {
            id: 23,
            type: 'judge',
            question: `下列 C++ 代码用于求斐波那契数列，即第 1 个数 0，第 2 个数 1，从第三个数开始，是前两个数之和。如果输入的值为大于 1 的正整数，该代码能实现。（ ）\n\n\`\`\`cpp\ncin >> n;\na = 0, b = 1;\nfor (int j = 0; j < n; j++){\n    cout << a << " ";\n    b = b + a;\n    a = b - a;\n}\n\`\`\``,
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

每轮先输出当前的 \`a\`。随后令新 \`b=旧a+旧b\`，再令新 \`a=新b-旧a=旧b\`，所以二元组会从 $(0,1)$ 依次变成 $(1,1)$、$(1,2)$、$(2,3)$……。循环执行 $n$ 次，正好输出斐波那契数列的前 $n$ 项。`,
            tags: ['循环'],
        },
        {
            id: 24,
            type: 'judge',
            question: `下面的 C++ 不能实现如下输出，但如果将 L1 标记的 \`cout << 0\` 行移动到 \`if\` 块外面，或者说移动到 L2 标记行，则可以。（ ）\n\n\`\`\`text\n请输入矩阵大小n: 9\n100000000\n020000000\n003000000\n000400000\n000050000\n000006000\n000000700\n000000080\n000000009\n\`\`\`\n\n\`\`\`cpp\nint n, i, j;\ncout << "请输入矩阵大小n: ";\ncin >> n;\n\nfor (i = 0; i < n; i++){\n    for (j = 0; j < n; j++){\n        if (i == j){\n            cout << i + 1;\n            continue;\n            cout << 0; // L1\n        }\n        // L2\n    }\n    printf("\\n");\n}\n\`\`\``,
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

原来的 \`cout << 0\` 位于 \`continue\` 后面，永远执行不到，因此非对角线位置也没有任何输出。把它移到 L2 后：当 $i=j$ 时先输出 $i+1$，再由 \`continue\` 跳过 L2；当 $i\\ne j$ 时执行 L2 输出 0。这样每行就会有一个对角线数字和其余的 0，得到题目展示的矩阵。`,
            tags: ['嵌套循环'],
        },
        {
            id: 25,
            type: 'judge',
            question: `C++ 代码 \`cout << ('5'+4);\` 执行后的输出为 9。（ ）`,
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

\`'5'\` 是字符常量，不是整数 5。它参与加法时会提升为字符编码的整数值；按 ASCII，\`'5'=53\`，所以 \`'5'+4=57\`，表达式类型也是整数，\`cout\` 输出 \`57\`。如果想得到数值 9，可写 \`'5'-'0'+4\`。`,
            tags: ['字符编码'],
        },
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '优美的数字',
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
                    input: `6`,
                    output: `6`,
                },
                {
                    input: `2025`,
                    output: `28`,
                },
            ],
            question: `
# [GESP202509 二级] 优美的数字

- **试题名称**：优美的数字
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

如果一个正整数在十进制下的所有数位都相同，小 A 就会觉得这个正整数很优美。例如，正整数 6 的数位都是 6，所以 6 是优美的。正整数 99 的数位都是 9，所以 99 是优美的。正整数 123 的数位不都相同，所以 123 并不优美。

小 A 想知道不超过 $n$ 的正整数中有多少优美的数字。你能帮他数一数吗？

## 输入格式

一行，一个正整数 $n$。

## 输出格式

一行，一个正整数，表示不超过 $n$ 的优美正整数的数量。

## 样例

### 输入样例 1

\`\`\`text
6
\`\`\`

### 输出样例 1

\`\`\`text
6
\`\`\`

### 输入样例 2

\`\`\`text
2025
\`\`\`

### 输出样例 2

\`\`\`text
28
\`\`\`

## 数据范围

对于所有测试点，保证 $1 \\le n \\le 2025$。
`,
            score: 25,
            explanation: `**题意与样例：**

一个数只有在每一位都相同时才计数。样例 1 中，1 到 6 都只有一位，所以共有 6 个。样例 2 中，一位数有 9 个；两位数 \`11,22,...,99\` 有 9 个；三位数 \`111,222,...,999\` 有 9 个；四位数中只有 \`1111\\le2025\`，合计 $9+9+9+1=28$。

**原卷算法：逐个枚举并检查数位**

对每个 $i\\in[1,n]$，先用 \`i%10\` 记住个位 \`v\`，再不断用 \`t%10\` 检查其余数位。只要发现不同数位，就把 \`chk\` 设为 0；检查结束后把 \`chk\` 加入答案。$n\\le2025$，最多检查 2025 个数，每个数不超过 4 位，运算量很小。

**易错点：**
- 一位正整数都满足“所有数位相同”。
- 检查数位时要使用副本 \`t\`，不要破坏外层枚举变量 \`i\`。
- 原卷参考程序即使发现不同数位也继续检查，结果仍正确；提前退出只是可选优化。`,
            tags: ['编程题', '枚举', '数位分离'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <algorithm>
#include <cstdio>

using namespace std;

int n, ans;

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        int v = i % 10, t = i / 10, chk = 1;
        while (t) {
            if (t % 10 != v) chk = 0;
            t /= 10;
        }
        ans += chk;
    }
    printf("%d\\n", ans);
    return 0;
}`,
        },
        {
            id: 27,
            type: 'programming',
            title: '菱形',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 9,
            sourcePages: [9, 10],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `3`,
                    output: `.#.\n#.#\n.#.`,
                },
                {
                    input: `9`,
                    output: `....#....\n...#.#...\n..#...#..\n.#.....#.\n#.......#\n.#.....#.\n..#...#..\n...#.#...\n....#....`,
                },
            ],
            question: `
# [GESP202509 二级] 菱形

- **试题名称**：菱形
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

小 A 想绘制一个菱形。具体来说，需要绘制的菱形是一个 $n$ 行 $n$ 列的字符画，$n$ 是一个大于 1 的奇数。菱形的四个顶点依次位于第 1 行、第 1 列、第 $n$ 行、第 $n$ 列的正中间，使用 \`#\` 绘制。相邻顶点之间也用 \`#\` 连接。其余位置都是 \`.\`。例如，一个 5 行 5 列的菱形字符画是这样的：

\`\`\`text
..#..
.#.#.
#...#
.#.#.
..#..
\`\`\`

给定 $n$，请你帮小 A 绘制对应的菱形。

## 输入格式

一行，一个正整数 $n$。

## 输出格式

输出共 $n$ 行，表示对应的菱形。

## 样例

### 输入样例 1

\`\`\`text
3
\`\`\`

### 输出样例 1

\`\`\`text
.#.
#.#
.#.
\`\`\`

### 输入样例 2

\`\`\`text
9
\`\`\`

### 输出样例 2

\`\`\`text
....#....
...#.#...
..#...#..
.#.....#.
#.......#
.#.....#.
..#...#..
...#.#...
....#....
\`\`\`

## 数据范围

对于所有测试点，保证 $3 \\le n \\le 29$ 并且 $n$ 为奇数。
`,
            score: 25,
            explanation: `**图形规律：**

令 \`k=n/2\`。把行列都按 1 开始编号，菱形边界上的格子满足

$$|k-i+1|+|k-j+1|=k.$$

左边是这个格子到中心 $(k+1,k+1)$ 的曼哈顿距离。距离恰好为 $k$ 时输出 \`#\`，否则输出 \`.\`。双重循环检查每个格子即可，时间复杂度为 $O(n^2)$；$n\\le29$，运行量很小。

**样例理解：**

$n=3$ 时中心在第 2 行第 2 列，距离中心为 1 的四个格子组成菱形，所以输出三行 \`.#.\`、\`#.#\`、\`.#.\`。$n=9$ 时同理，只是半径变成 4。

**易错点：**
- 原卷参考程序的 \`i,j\` 从 1 开始，公式中的 \`+1\` 不能漏掉。
- 每完成一行都要输出换行。
- 题目只画菱形边界，内部仍然是 \`.\`，不能把内部全部填成 \`#\`。`,
            tags: ['编程题', '嵌套循环', '曼哈顿距离'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <algorithm>
#include <cstdio>

using namespace std;

int main() {
    int n, i, j, k;
    scanf("%d", &n);
    k = n / 2;
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            if (abs(k - i + 1) + abs(k - j + 1) == k)
                printf("#");
            else
                printf(".");
        }
        printf("\\n");
    }
    return 0;
}`,
        },
    ],
};
