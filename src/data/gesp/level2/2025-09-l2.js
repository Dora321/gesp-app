// 2025-09-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-09-l2",
    title: "2025年9月 GESP C++ 二级真题",
    level: 2,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    source: {
        officialPdf: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "archived-official",
        notes: "题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf"
    },
    reviewStatus: "partial",
    reviewScope: "AI-Codex全卷五维对照mirror PDF，Q6/Q11/Q15/Q18/Q19源疑点保持隔离，卷级partial。",
    reviewedBy: "AI-Codex",
    reviewedAt: "2026-11-06",
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照10页mirror PDF，Git blob SHA ee47f8b19c9c5c5f1d1cb1bf3ae4ac3e2eb80057一致，全部answer保持。保留Q6/Q15/Q19既有隔离；Q11无结束标记与最终输出前提新增疑点隔离，重写27题解析，两参考程序保持并独立编译运行。 Q18原判×与具体输出1及a=5的大小关系不符，追加源疑点隔离，答案保持。",
        dimensions: {
            statement: "partial",
            options: "partial",
            answer: "partial",
            explanation: "partial",
            referenceCode: "partial"
        }
    },
    questions: [
        {
            id: 1,
            type: "single",
            question: "人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切是指（ ）。",
            options: [
                "大电脑模型",
                "大规模智能",
                "智能的单位",
                "大语言模型"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n按本卷四个选项语境，大语言模型D最贴近所指的人工智能大模型；其余三项不是对应的模型类别或正式计量单位。这里不应推广为所有大模型都只能处理语言：人工智能还包括视觉和多模态等模型。本题按给定选项作最贴切选择，来源答案表位于mirror PDF第1页。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "在 TCP 协议中，完成连接建立需要通过（ ）握手。",
            options: [
                "一次",
                "二次",
                "三次",
                "四次"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\nTCP连接的典型建立过程是三次握手：发起方发送SYN，对端以SYN与ACK回应，发起方再确认ACK，因此选C。建立连接与关闭连接是不同阶段，不能把常见的关闭连接报文过程套入本题。题目询问握手次数，不是双方计算机数量。",
            tags: [
                "网络基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面的 C++ 代码用于输入姓名，然后输出姓名，正确的说法是（ ）。\n\n```cpp\nstring XingMing;\ncout << \"请输入您的姓名：\";\ncin >> XingMing;\ncout << XingMing;\n```",
            options: [
                "XingMing 是汉语拼音，不能作为变量名称",
                "可以将 XingMing 改为 Xing Ming",
                "可以将 XingMing 改为 xingming",
                "可以将 XingMing 改为 Xing-Ming"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\nXingMing与xingming都由字母组成，符合变量命名规则；在所有使用处一致改名即可，所以选C。拼音拼写并不影响词法合法性，空格会分开标识符，减号会成为运算符。C++区分大小写，改名时不能只改声明而保留原引用，否则将变成两个不同名字。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面 C++ 代码用于获得正整数 N 的第 M 位数，如 N 等于 1234，M 等于 2，则输出 3。此题假设 M 的值大于等于 1 且小于等于 N 的位数。横线处应填入的代码是（ ）。\n\n```cpp\nint N, M, div=1;\ncout << \"请输入一个正整数：\";\ncin >> N;\ncout << \"请输入从右到左取第几位数：\";\ncin >> M;\n\nfor (int i =0; i < (M - 1); i++) div *= 10;\n\ncout << (______________);\n```",
            options: [
                "N % div / 10",
                "N / div / 10",
                "N % div % 10",
                "N / div % 10"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1,
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n循环后div=10的M-1次方，先N/div去掉右侧M-1位，再%10取当前个位，即原第M位，所以选D。N=1234、M=2时div=10，1234/10%10=3。M保证不超过N的位数，int可表示的正N在此计算中最多用到10^9，div不会越界。",
            tags: [
                "数位提取"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面 C++ 代码执行，其输出是（ ）。\n\n```cpp\na, b = 3, 4;\nc = a == b;\ncout << a << ' ' << b << ' ' << c;\n```",
            options: [
                "3 4 0",
                "3 3 3",
                "4 4 4",
                "以上都不对"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\na,b=3,4不是分别给a、b赋3和4；逗号从左到右求值，只给b赋3，最右的4也不会赋给a。随后c记录a与b相等的比较结果，a保持原值。因此A/B/C均不是可据此保证的输出，选D。片段省略了变量声明和a初值，不能把它当Python式多目标赋值；见证提供明确初值展示真实赋值效果。",
            tags: [
                "表达式"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "某种编号的规则是“XX-Y”，其中 XX 从 00 到 11，Y 从 0 到 9。第 1 个编号是 00-0，第 2 个编号是 01-1，……，第 12 个编号 11-1，第 13 个编号 00-2，即其编码规则是 XX 和 Y 同时增 1，到 XX 到 11 时下一个变为 00，Y 到 9 时，下一个变为 0。下面的 C++ 代码用于生成第 N 个编号，横线处应填上的代码是（ ）。\n\n```cpp\ncout << \"请输入编号位置：\";\ncin >> N;\n\npart1 = N % _____;\npart2 = N % _____;\n\nif (part1 < 10)\n    printf(\"0%d-%d\\n\", part1, part2);\nelse\n    printf(\"%d-%d\\n\", part1, part2);\n```",
            options: [
                "12 10",
                "10 10",
                "11 9",
                "9 9"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷示例称第 1 个编号为 00-0，但所给代码直接使用 N 取模，输入 1 会得到 01-1。两处填空的除数仍可确定为 12 和 10，但整段程序缺少 N-1 的序号转换，因此本题不计分。",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷示例称第 1 个编号为 00-0，但所给代码直接使用 N 取模，输入 1 会得到 01-1。两处填空的除数仍可确定为 12 和 10，但整段程序缺少 N-1 的序号转换，因此本题不计分。 12和10是两个分量的周期，故填空意图是A，但从第1项00-0开始时需要使用N-1。原代码填A，N=1会输出01-1，N=12会输出00-2，都比题意序号偏一；不能只因周期正确就清除已有隔离或修改原程序补偏移。",
            tags: [
                "取模运算"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面的 C++ 代码执行后其输出是（ ）。\n\n```cpp\ncnt = 0;\nfor (int i = -10; i < 10; i++)\n    for (int j =0; j < i; j++)\n        cnt += 1;\ncout << cnt;\n```",
            options: [
                "145",
                "125",
                "55",
                "45"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [
                2,
                3
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\ni=-10到0时内层j从0开始，j<i一开始为假，不加cnt。i=1到9时分别加1到9次，总和45，选D。不能把外层20轮直接当成计数，也不能认为负i会让内层按负方向执行；内层更新仍是j++且必须先满足条件。",
            tags: [
                "循环"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 代码执行后其输出是（ ）。\n\n```cpp\nfor (i =1; i < 12; i++){\n    if (i % 2 == 0)\n        continue;\n\n    for (j = 0; j < i; j++)\n        if (i * j % 2)\n            break;\n}\nif(i>= 12)\n    cout << (i * j);\n```",
            options: [
                "110",
                "12",
                "不确定",
                "无输出"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\n外层偶数轮continue跳过内层。最后实际执行内层的i=11，j=0时乘积为偶数不break，j=1时乘积为奇数而break，留下j=1。随后i增到12退出，外部if成立，输出12*1=12，选B。在运行见证外围声明i、j，不把退出后的i误写成11。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "阅读下面的 C++ 代码，其中变量都是整型，则说法正确的是（ ）。\n\n```cpp\ncin >>a >> b;\n\nwhile (b != 0){\n    remainder = a % b;\n    a = b;\n    b = remainder;\n}\ncout << a;\n```",
            options: [
                "b 不能为 0，因为 a % b 将导致错误",
                "a 必须小于 b，否则 a % b 将导致错误",
                "a 和 b 都必须为正整数，否则 a % b 将导致错误",
                "如果 a 输入为 0，则不管 b 的输入值是什么，输出值的绝对值都是 abs(b)"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\na初始为0时，若b也为0，循环不执行直接输出0；若b非0，第一轮余数0，随后a=b、b=0，退出并输出原b，所以输出的数学绝对值等于原b的绝对值，选D。b=0由循环条件挡住，a不必小于b或为正。若把abs落实为int函数，INT_MIN的绝对值需更宽类型表达；不能对超范围abs作无条件保证。",
            tags: [
                "最大公约数"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后输出是（ ）。\n\n```cpp\nnum = 0;\nwhile (num <= 5){\n    num += 1;\n    if (num == 3)\n        continue;\n    printf(\"%d#\", num);\n}\n```",
            options: [
                "1#2#4#5#6#",
                "1#2#4#5#6",
                "1#2#3#4#5#6#",
                "1#2#3#4#5#6"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\nnum从0开始，每轮先加1；依次得到1、2、3、4、5、6。3时continue只跳过该次打印，while会再次判断，6这一轮也会打印，然后因6<=5为假退出。结果1#2#4#5#6#，选A。末尾#来自格式串，不能省略；不能把先更新的循环误算到5为止。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面 C++ 代码用于记录多个输入数中的最大数和最小数（输入 -999 则输入结束），相关说法错误的是（ ）。\n\n```cpp\ncin >> now_num;\nmin_num = max_num = now_num;\n\nwhile (now_num != -999){\n    if (max_num < now_num)\n        max_num = now_num;\n\n    if (min_num > now_num)\n        min_num = now_num;\n\n    cin >> now_num;\n}\ncout << min_num << ' ' << max_num;\n```",
            options: [
                "程序运行时如果第一个数输入 -999，则输出将是 -999 -999",
                "程序输入过程中，如果输入的第一个数不是 -999，则如果待输入的数据中没有 -999，则程序能求出已输入整数中的最大数和最小数",
                "如果用于输入考试成绩，即成绩中不可能有 -999，则程序能求出已输入成绩中的最高成绩和最低成绩",
                "可以将 cin >> now_num; 移动到 while (now_num != -999) { 下面，结果不变"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3,
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.3–4 B称首数不是-999且待输入数据没有-999时，程序能求出结果，但代码仅在读到-999后退出并输出，且未检查EOF/输入失败；有限无标记输入不能完成最终输出。D移动读入也不等价。若B仅指内部维护极值而非程序完成输出，需说明终止前提；保留官方D、answer=3与原文，暂停计分。 原逻辑以首数初始化极值，每次比较当前数再读下一项。若按D把循环末尾读入移到开头，会跳过首轮当前值的正常处理，并可能把-999纳入最小值，确实不等价。正常测试须显式附结束标记；无标记见证只做有界EOF观察，不运行无限循环。",
            tags: [
                "循环"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.3–4 B称首数不是-999且待输入数据没有-999时，程序能求出结果，但代码仅在读到-999后退出并输出，且未检查EOF/输入失败；有限无标记输入不能完成最终输出。D移动读入也不等价。若B仅指内部维护极值而非程序完成输出，需说明终止前提；保留官方D、answer=3与原文，暂停计分。"
        },
        {
            id: 12,
            type: "single",
            question: "下面 C++ 代码执行后输出与 5 有关数的数量。“与 5 有关的数”定义为含有 5 或者能被 5 整除的数。相关说法正确的是（ ）。\n\n```cpp\ncnt = 0;\nfor (i = 1; i < 1000; i++){\n    if (i % 5 == 0){\n        cnt += 1;\n        continue;\n    }\n    j = i;\n    while (j > 0)\n        if (j % 10 == 5){\n            cnt += 1;\n            break;\n        }\n        else\n            j /= 10;\n}\ncout << cnt;\n```",
            options: [
                "删除代码中 continue 不影响程序执行结果",
                "删除 j = i 并将 while 循环内的 j 修改为 i，不影响程序执行结果",
                "代码中 break 修改为 j = 0，不影响程序执行结果",
                "将 while (j > 0) 修正为 while (j >= 0) 不影响程序执行的结果"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n命中数字5时把break替换为j=0，会使下一次while条件失败，同时计数仍只加一次，所以C等价。删除continue会让既被5整除又含5的数重计；直接用i拆位会破坏外层变量；j>=0会在j归0后一直执行除10而不终止。原定义是满足二者之一，不能把两类分别相加不去重。",
            tags: [
                "数位判断"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面 C++ 代码实现输出如下图形，应该在横线处填入的代码是（ ）。\n\n```text\n请输入层数：10\n         1\n        23\n       456\n      7891\n     23456\n    789123\n   4567891\n  23456789\n 123456789\n1234567891\n```\n\n```cpp\ncout << \"请输入层数：\";\ncin >> N;\n\nK = 1;\n\nfor (i = 1; i < N + 1; i++){\n    for (int _ = 1; _ < ___________; _++)\n        cout << \" \";\n\n    for (int _ = 1; _ < ________; _++){\n        cout << K;\n\n        K += 1;\n        if (K == 10)\n            K = 1;\n    }\n    cout << '\\n';\n}\n```",
            options: [
                "N - i + 1；i + 1",
                "N - i；i",
                "N；i",
                "N - i；i + 1"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4,
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n第i行需N-i个前导空格、i个数字。两处循环都从1开始并使用严格小于，因此上界分别要写N-i+1和i+1，选A。K持续从1到9循环，不在行首清零。N=10时第一行九个空格后打印1，最后一行十个数字1234567891；示例中的10是输入回显。",
            tags: [
                "循环"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面 C++ 代码执行，其输出是（ ）。\n\n```cpp\nint a=9, b=27;\na = 'a' + 'b';\nb = 'a' - 'b';\na = a - b;\ncout << a << ' ' << b << endl;\n```",
            options: [
                "196 -1",
                "27 9",
                "98 97",
                "不确定"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n按本卷ASCII兼容字符编码，'a'=97、'b'=98，先赋a=195、b=-1，再令a=a-b=196。于是输出196、空格、-1和换行，选A。字符常量参与加减时进行整数提升，不会连接成字符串；初始9和27已被后面的赋值覆盖。",
            tags: [
                "字符编码"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "有个无限长的链，由 3 种外形相同但材质不同的环链成。3 种环的重量分别是 3、4、6 克，相同材质的多个环每 12 克一组，分别记为 G3、G4、G6。链依次 G3、G4、G6、G3、G4、G6、……。同时对链上所有环从头依次编号 1、2、3、4……。输入正整数代表环编号，求该编号前所有环（不含该环本身）的重量。下面是 C++ 代码实现，正确说法是（ ）。\n\n```cpp\ni int N, G, R;\nint wc = 0;\n\ncin >> N; // 输入正整数\nG = (N - 1) / 9; // L1\nR = (N - 1) % 9; // L2: 保存余数\nwc += 36*G;\n\nif((1 <= R) && (R <= 4))\n    wc += 3*R; // L3\nelse if ((5 <= R) && (R <= 7))\n    wc += 4*R; // L4\nelse if(R == 8)\n    wc += 6*(R - 1); // L5\ncout << wc << endl;\n```",
            options: [
                "必须同时修改 L1 和 L2 代码行才能实现功能",
                "必须同时修改 L3 和 L4 代码行才能实现功能",
                "必须同时修改 L3 和 L5 代码行才能实现功能",
                "其他说法都不对"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [
                5,
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷代码首行印为“i int N, G, R;”，无法通过编译。题目考查的 L1-L5 逻辑仍可分析，但题面程序不是可执行的完整 C++，因此本题不计分。",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷代码首行印为“i int N, G, R;”，无法通过编译。题目考查的 L1-L5 逻辑仍可分析，但题面程序不是可执行的完整 C++，因此本题不计分。 若仅为分析逻辑先排除首行多余i，9环一周期重量36，前R环重量在R=5到7时应12+4*(R-4)，R=8时应30。L1/L2/L3本来符合周期/前四环，实际需改L4/L5而非A/B/C所列组合，故官方D反映意图；语法修正后的见证只用于解释，不替换原卷或解除隔离。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在集成开发环境里调试程序时，要注意不能修改源程序，因为如果修改，就要终止调试、关闭该文件并重新打开，才能再次开始调试。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n集成开发环境可以在编辑后重新编译调试，通常不需要关闭源文件再打开；有些还支持特定条件下的热修改，因此题干所称必需流程错误。修改正在调试的代码是否立即生效取决于工具和配置，但这不足以推出“不能修改源程序”或“一定要关闭文件”的普遍结论。",
            tags: [
                "调试"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 代码中，假设 N 为正整数且大于 100，则 `N / 100` 将舍弃个位和十位，如 N 为 1234 则 `cout << (N / 100)` 将输出 12。如果 N 小于 100，则其值为 0。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n整数N/100会丢弃末两位，N=1234得到12；正数小于100时整数商是0，故题干描述的数位操作正确。其前后分别讨论不同范围的N，不能把先前假设大于100理解为后半句也必须同时小于100。取百位单个数字还需再%10，本题没有这一要求。",
            tags: [
                "整数除法"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "下列 C++ 代码执行后将输出 1，因为 a 确实小于 20 和 10。（ ）\n\n```cpp\na = 5;\ncout << (a < 10 and 20);\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.6判×，但a=5时(a<10 and 20)实际输出1，且5确实同时小于10和20。and后面的20虽是非零常量，但本题10、20顺序使“a<10”与“a<10且a<20”对整型a等价，不能据此否定题干具体输出与事实。保留answer=1与原文，暂停计分。 真实求值为(5<10)&&20，即true&&true。它没有执行第二个比较，但原文也未明确声称执行了两次比较，不能把教学意图替代原句真假。将常数写入逻辑与并非通用双上界写法，仍应说明应显式写两个关系式；该建议不能用来宣称本题实际输出不是1。",
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.6判×，但a=5时(a<10 and 20)实际输出1，且5确实同时小于10和20。and后面的20虽是非零常量，但本题10、20顺序使“a<10”与“a<10且a<20”对整型a等价，不能据此否定题干具体输出与事实。保留answer=1与原文，暂停计分。",
            tags: [
                "逻辑运算"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "下面的 C++ 代码中变量都是整型，则执行后将输出 1。（ ）\n\n```cpp\nx, y, z = 5, 10, 15;\nresult = x < y < z;\ncout << result;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷写作“x, y, z = 5, 10, 15;”，按 C++ 逗号运算符规则只会给 z 赋值，不能得到题目解析所假设的 x=5、y=10、z=15。官方答案按命题意图为“正确”，但程序片段本身不足以推出该结果，因此本题不计分。",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷写作“x, y, z = 5, 10, 15;”，按 C++ 逗号运算符规则只会给 z 赋值，不能得到题目解析所假设的 x=5、y=10、z=15。官方答案按命题意图为“正确”，但程序片段本身不足以推出该结果，因此本题不计分。 原逗号表达式只将z赋为5，不能据它推得x=5、y=10。若x、y在外围已确定，x<y先产生0或1，再与z=5比较会为真；但原题未给出其可靠初值，存在未初始化读取的可能。保留answer=0和已有隔离，不把原行改成三条赋值掩盖来源问题。",
            tags: [
                "表达式"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "下面 C++ 代码执行时如输入 99.99，将输出“及格”两个汉字。（ ）\n\n```cpp\nint score;\ncout << \"请输入学生成绩：\";\ncin >> score;\nif (score >= 60)\n    printf(\"及格\");\nelse\n    printf(\"不及格\");\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\nscore为int，输入99.99只提取整数部分99，余下小数点留在流中。99>=60为真，打印提示后输出及格，因此判断正确。该行为不是四舍五入成100，也不是将整个99.99当int语法错误；后续若继续读取整数还要考虑残留小数点和流状态。",
            tags: [
                "输入输出"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "执行下面的 C++ 代码时输入 123，则输出是 DCB。（ ）\n\n```cpp\nint a;\ncin >> a;\nwhile(a){\n    cout << 'A'+a%10;\n    a /= 10;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n依次拆出个位3、2、1，但'A'+a%10经整数提升得到编码整数，而非char。在ASCII兼容环境中分别为68、67、66，cout连在一起输出686766，不是DCB，判断错误。若要输出对应字符需显式转换为char；原代码没有这个转换，不能按字符直觉替它补上。",
            tags: [
                "字符编码"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面的 C++ 代码执行后将输出 `+#+#3#`。（ ）\n\n```cpp\nint i;\nfor (i = 0; i < 3; i++){\n    if (i == 2)\n        continue;\n    printf(\"+#\");\n}\ncout << i << '#';\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [
                7
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\ni=0、1各输出+#；i=2执行continue但仍走for更新，i最终变3退出。循环外cout再打印3#，整体+#+#3#，判断正确。continue只影响当前一轮，不能跳过循环后的输出；末尾#也属于明确输出内容。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下列 C++ 代码用于求斐波那契数列，即第 1 个数 0，第 2 个数 1，从第三个数开始，是前两个数之和。如果输入的值为大于 1 的正整数，该代码能实现。（ ）\n\n```cpp\ncin >> n;\na = 0, b = 1;\nfor (int j = 0; j < n; j++){\n    cout << a << \" \";\n    b = b + a;\n    a = b - a;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [
                7
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n每轮输出当前a，再令b=a+b，随后a=b-a取得更新前的b，状态从相邻两项移动到后一对。因此输出从0、1开始的n项，判断正确。实现时需确保所用整数类型容纳中间结果；若按int运行见证，只测试不会溢出的n范围，不能把算法正确性说成任意长度都不会溢出。",
            tags: [
                "循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "下面的 C++ 不能实现如下输出，但如果将 L1 标记的 `cout << 0` 行移动到 `if` 块外面，或者说移动到 L2 标记行，则可以。（ ）\n\n```text\n请输入矩阵大小n: 9\n100000000\n020000000\n003000000\n000400000\n000050000\n000006000\n000000700\n000000080\n000000009\n```\n\n```cpp\nint n, i, j;\ncout << \"请输入矩阵大小n: \";\ncin >> n;\n\nfor (i = 0; i < n; i++){\n    for (j = 0; j < n; j++){\n        if (i == j){\n            cout << i + 1;\n            continue;\n            cout << 0; // L1\n        }\n        // L2\n    }\n    printf(\"\\n\");\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [
                7
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n原L1位于continue之后，永远执行不到；非对角位置也没有输出，所以原程序每行只打印一个对角数字。将cout<<0移到L2，非对角位置输出0，而对角位置在continue前已输出数字并跳过L2，形成目标矩阵，判断正确。示例n=9，不能因改动后某些位置为0就误以为会覆盖已打印数字。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "C++ 代码 `cout << ('5'+4);` 执行后的输出为 9。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [
                7
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n'5'是字符编码，参与加法先提升为整数；在ASCII兼容环境中编码53，加4得到57，cout输出整数57，不是数字9，判断错误。若要把字符表示的数字转成数值，应先减'0'；原表达式没有这一步，也没有把结果再转换成字符输出。",
            tags: [
                "字符编码"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "优美的数字",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB",
            sourceVerified: true,
            sourcePage: 8,
            sourcePages: [
                8,
                9
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "6",
                    output: "6"
                },
                {
                    input: "2025",
                    output: "28"
                }
            ],
            question: "\n# [GESP202509 二级] 优美的数字\n\n- **试题名称**：优美的数字\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题目描述\n\n如果一个正整数在十进制下的所有数位都相同，小 A 就会觉得这个正整数很优美。例如，正整数 6 的数位都是 6，所以 6 是优美的。正整数 99 的数位都是 9，所以 99 是优美的。正整数 123 的数位不都相同，所以 123 并不优美。\n\n小 A 想知道不超过 $n$ 的正整数中有多少优美的数字。你能帮他数一数吗？\n\n## 输入格式\n\n一行，一个正整数 $n$。\n\n## 输出格式\n\n一行，一个正整数，表示不超过 $n$ 的优美正整数的数量。\n\n## 样例\n\n### 输入样例 1\n\n```text\n6\n```\n\n### 输出样例 1\n\n```text\n6\n```\n\n### 输入样例 2\n\n```text\n2025\n```\n\n### 输出样例 2\n\n```text\n28\n```\n\n## 数据范围\n\n对于所有测试点，保证 $1 \\le n \\le 2025$。\n",
            score: 25,
            explanation: "**解析**\n\n参考程序枚举1到n，以个位v为标准，副本t逐位检查是否全部相同，chk只要变0便不再加分；全局ans自动初始化为0。n<=2025，最多四位，O(n log n)时间、O(1)额外空间。样例6得到6；2025以内有9个一位、9个两位、9个三位和1111，共28。保留原代码，独立从1到9分别重复拼接1到4次构造集合，检查全部n=1..2025，不复用原拆位算法作预言机。",
            tags: [
                "编程题",
                "枚举",
                "数位分离"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <algorithm>\n#include <cstdio>\n\nusing namespace std;\n\nint n, ans;\n\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) {\n        int v = i % 10, t = i / 10, chk = 1;\n        while (t) {\n            if (t % 10 != v) chk = 0;\n            t /= 10;\n        }\n        ans += chk;\n    }\n    printf(\"%d\\n\", ans);\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "菱形",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB",
            sourceVerified: true,
            sourcePage: 9,
            sourcePages: [
                9,
                10
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "3",
                    output: ".#.\n#.#\n.#."
                },
                {
                    input: "9",
                    output: "....#....\n...#.#...\n..#...#..\n.#.....#.\n#.......#\n.#.....#.\n..#...#..\n...#.#...\n....#...."
                }
            ],
            question: "\n# [GESP202509 二级] 菱形\n\n- **试题名称**：菱形\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题目描述\n\n小 A 想绘制一个菱形。具体来说，需要绘制的菱形是一个 $n$ 行 $n$ 列的字符画，$n$ 是一个大于 1 的奇数。菱形的四个顶点依次位于第 1 行、第 1 列、第 $n$ 行、第 $n$ 列的正中间，使用 `#` 绘制。相邻顶点之间也用 `#` 连接。其余位置都是 `.`。例如，一个 5 行 5 列的菱形字符画是这样的：\n\n```text\n..#..\n.#.#.\n#...#\n.#.#.\n..#..\n```\n\n给定 $n$，请你帮小 A 绘制对应的菱形。\n\n## 输入格式\n\n一行，一个正整数 $n$。\n\n## 输出格式\n\n输出共 $n$ 行，表示对应的菱形。\n\n## 样例\n\n### 输入样例 1\n\n```text\n3\n```\n\n### 输出样例 1\n\n```text\n.#.\n#.#\n.#.\n```\n\n### 输入样例 2\n\n```text\n9\n```\n\n### 输出样例 2\n\n```text\n....#....\n...#.#...\n..#...#..\n.#.....#.\n#.......#\n.#.....#.\n..#...#..\n...#.#...\n....#....\n```\n\n## 数据范围\n\n对于所有测试点，保证 $3 \\le n \\le 29$ 并且 $n$ 为奇数。\n",
            score: 25,
            explanation: "**解析**\n\nn为3到29的奇数，中心坐标按1编号为(k+1,k+1)，k=n/2。参考程序以到中心的行列绝对差之和等于k判断边界，故四个顶点及其连线为#，内部和外部均为点。复杂度O(n²)时间、O(1)额外空间；最大841格，不作无依据的具体毫秒耗时承诺。保留原程序，独立按四条斜线画边检查14个合法n全部输入；样例3为.#.、#.#、.#.，每行恰好n字符，无额外空格。",
            tags: [
                "编程题",
                "嵌套循环",
                "曼哈顿距离"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <algorithm>\n#include <cstdio>\n\nusing namespace std;\n\nint main() {\n    int n, i, j, k;\n    scanf(\"%d\", &n);\n    k = n / 2;\n    for (i = 1; i <= n; i++) {\n        for (j = 1; j <= n; j++) {\n            if (abs(k - i + 1) + abs(k - j + 1) == k)\n                printf(\"#\");\n            else\n                printf(\".\");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"
        }
    ]
};
