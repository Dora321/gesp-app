// 2025-06-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-06-l2",
    title: "2025年6月 GESP C++ 二级真题",
    level: 2,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    source: {
        officialPdf: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "archived-official",
        notes: "题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录；Q5 与 Q15 的原卷缺陷已结构化标记。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf"
    },
    reviewStatus: "partial",
    reviewScope: "AI-Codex全卷五维对照mirror PDF，Q5/Q15源缺陷保持隔离，卷级partial。",
    reviewedBy: "AI-Codex",
    reviewedAt: "2026-11-06",
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照9页mirror PDF，Git blob SHA a63a41e5940dff2afdd191610e86c28b1c2e4bb3一致，全部answer保持。Q5/Q15既有源缺陷隔离保留；重写27题解析，参考程序独立编译运行并保持原样，不用未定义程序偶然输出清除隔离。",
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
            question: "2025 年 4 月 19 日在北京举行了一场颇为瞩目的人形机器人半程马拉松赛。比赛期间，跑动着的机器人会利用身上安装的多个传感器所反馈的数据来调整姿态、保持平衡等，那么这类传感器类似于计算机的（ ）。",
            options: [
                "处理器",
                "存储器",
                "输入设备",
                "输出设备"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n传感器采集外部状态，并把测量数据送给控制系统，功能相当于计算机的输入设备，选C。处理器负责运算和决策，存储器保存数据，输出设备向外传递结果或执行控制。本题依据题干描述的信号流向分类，不因设备属于机器人就把传感器当成处理器。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时他需要的内存条是（ ）。",
            options: [
                "RAM",
                "ROM",
                "CACHE",
                "EPROM"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n题目要扩充运行程序使用的内存条，对应RAM，选A。ROM、EPROM主要用于保存固化或可擦写的内容，不是通常所说扩容运行内存的内存条；CACHE用于高速缓存。这里应区分运行内存容量与硬盘文件存储容量，也不能因名称中都有存储含义就混选。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n\n```cpp\nint a=3;\nfloat b = 3.5;\ncout << (a *= b);\n```",
            options: [
                "3",
                "3.5",
                "10",
                "11"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\na*=b先以相应算术类型计算3*3.5得到10.5，再转换回左侧int变量a，丢弃小数部分后保存10。整个复合赋值表达式的结果对应更新后的a，所以输出10，选C。不是浮点数四舍五入到11，也不会因右侧float而把a的声明类型永久变成float。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面 C++ 代码用于获得正整数的第 3 位数，如 1234 则输出 2。如果是一位数或两位数，则输出 0。横线处应填入的代码是（ ）。\n\n```cpp\nint N, remainder;\ncout << \"请输入正整数:\";\ncin >> N;\ncout << _________________;\n```",
            options: [
                "N % 1000 / 100",
                "N / 1000 % 100",
                "N / 1000 / 100",
                "N % 100 / 100"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1,
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n题目示例1234取2，指的是从右向左数第三位，即百位。N%1000先保留末三位，再/100取出其中百位，选A。一位或两位正数不足100，整除100得到0。其余选项不是这个位值的提取；例如1234/1000%100得到1，已经与样例不符。",
            tags: [
                "数位提取"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面 C++ 代码执行，其输出是（ ）。\n\n```cpp\nint a, b = (6, 28);\nb == a;\na = b;\ncout << a << ' ' << b;\n```",
            options: [
                "6 28",
                "6 6",
                "28 6",
                "28 28"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷代码先声明但未初始化局部变量 a，随后在表达式 b == a 中读取 a；标准 C++ 下这是未定义行为，程序没有可靠输出。官方答案 D 只反映命题意图：b 由逗号表达式得到 28，随后 a=b，预期输出 28 28。本题保留官方答案但不计分。",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷代码先声明但未初始化局部变量 a，随后在表达式 b == a 中读取 a；标准 C++ 下这是未定义行为，程序没有可靠输出。官方答案 D 只反映命题意图：b 由逗号表达式得到 28，随后 a=b，预期输出 28 28。本题保留官方答案但不计分。 逗号表达式(6,28)确实把28赋给b，而b==a并非给a赋值。即使编译器把未使用的比较优化掉，也不能据某次出现28 28的结果保证原代码标准语义可靠。保留answer=3和源缺陷隔离，不通过补a初值来冒充原程序已修复。",
            tags: [
                "表达式"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "今天星期六，其后第 N 天星期几？如果是星期一到星期六输出形如：星期 1、星期 2 等，星期天则输出星期天。下面的 C++ 代码用于完成上述要求，横线处应填上的代码是（ ）。\n\n```cpp\nint N, remainder;\ncin >> N;\nremainder = _____________;\nif(remainder == 0)\n    printf(\"星期六后第%d天是星期天\\n\", N);\nelse\n    printf(\"星期六后第%d天是星期%d\\n\", N, remainder);\n```",
            options: [
                "(N + 6) / 7",
                "(N + 6) // 7",
                "N % 7",
                "(N + 6) % 7"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n按星期天为0、星期一至六为1到6编码，星期六为6；向后N天需加N再对7取余，故D。N=1得到0即星期天，N=2得到1即星期一。A是商而非循环余数，B中的//是C++行注释起点，C缺少起始星期偏移；加法还需在整型可表示范围内计算。",
            tags: [
                "取模运算"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面的 C++ 代码执行后其输出是（ ）。\n\n```cpp\nint i, Sum = 0;\nfor (i = 1; i < 10; i++){\n    Sum += i;\n    if(i % 2) continue;\n    if(i % 7) break;\n}\ncout << Sum;\n```",
            options: [
                "45",
                "28",
                "3",
                "0"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [
                2,
                3
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\ni=1先把1加入Sum，再因奇数continue跳过后面的判断；i=2再加2得到3，i%2为0不continue，i%7为2使break执行。循环因此在i=2时停止，输出3，选C。要注意累加位于两个条件之前，不能把发生break这一轮的加法漏掉。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 代码执行后其输出是（ ）。\n\n```cpp\nint i, j;\nfor(i = 1; i < 12; i++)\n    for(j = 1; j < i; j++)\n        if(i * j % 2 == 1)\n            break;\ncout << i * j;\n```",
            options: [
                "110",
                "22",
                "12",
                "3"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n最后一轮外层i=11是奇数，内层初始j=1，11*1为奇数，立即break，退出内层时j仍为1。随后外层i++变12，条件i<12为假，最后输出i*j=12，选C。输出语句在两层循环之外，不能拿进入最后一轮时的i=11或前一轮内层终值计算。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面 C++ 代码执行后输出是（ ）。\n\n```cpp\nint i, cnt = 0;\nfor(i = -99; i < 100; i += 2)\n    cnt = 1 + cnt;\ncout << cnt;\n```",
            options: [
                "101",
                "100",
                "99",
                "98"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\ni从-99开始每次加2，遍历-99、-97直到99，共(99-(-99))/2+1=100项。cnt每轮加1，初值0，所以输出100，选B。正负两侧各有50个奇数，0不会被这条序列访问；不要因包含负数就漏掉首项或末项。",
            tags: [
                "循环"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后输出是（ ）。\n\n```cpp\nint i;\nfor(i = 1; i < 10; i++){\n    if(i % 3 != 0){\n        printf(\"A#\");\n        continue;\n    }\n    else\n        break;\n    printf(\"0#\");\n}\nif(i == 10) cout << \"1\";\n```",
            options: [
                "A#A#",
                "A#0#A#0",
                "A#A#1",
                "A#0#A#0#1"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\ni=1、2都不被3整除，分别输出A#后continue；i=3进入else并break。printf(\"0#\")在两条路径上都到不了，外部i==10也不成立。因此只有A#A#，选A。continue执行for更新，而break直接退出，二者都不能让紧随其后的0#输出。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n\n```cpp\nint i,j;\nfor(i = 0; i < 3; i++)\n    for(j = 0; j < i; j++)\n        printf(\"%d#%d-\", i, j);\nprintf(\"END\");\n```",
            options: [
                "0#0-1#0-2#0-2#1-END",
                "0#0-1#0-1#1-2#0-2#1-2#2-3#0-3#1-3#2-END",
                "0#0-1#0-1#1-2#0-2#1-2#2-END",
                "1#0-2#0-2#1-END"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\ni=0时内层不执行；i=1时仅j=0打印1#0-；i=2时j=0、1依次打印2#0-、2#1-。两层结束后再输出END，拼接为1#0-2#0-2#1-END，选D。格式串里已有#和连字符，没有额外换行，不能把外层本身也当成一次打印。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面 C++ 代码执行后，将输出不能被 3 整除且除以 5 余数为 2 的数。下列选项不能实现的是（ ）。\n\n```cpp\nint i,j;\nfor(i = 0; i < 100; i++)\n    if(______________________)\n        cout << i << endl;\n```",
            options: [
                "(i % 3 != 0) && (i % 5 == 2)",
                "(i % 3) && (i % 5 == 2)",
                "(i % 3) && !(i % 5 != 2)",
                "!(i % 3) && (i % 5 == 2)"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\nA用显式不等于0，B直接用余数的真假，C否定“模5不等于2”，都表示不能被3整除且模5为2。D的!(i%3)却要求模3为0，方向反了，故D不能实现目标。例i=2应输出而D不输出；i=12满足D却应被目标排除，可作双向反例。",
            tags: [
                "逻辑运算"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面 C++ 代码用于判断一个大于 0 的正整数是几位数，横线处应填入代码先后是（ ）。\n\n```cpp\nint N, cnt;\ncout << \"请输入大于0的正整数：\";\ncin >> N;\n\ncnt = 0;\nwhile (_________){\n    cnt += 1;\n    ______________;\n}\n\ncout << cnt;\n```",
            options: [
                "N > 1；N = N / 10",
                "N > 1；N /= 10",
                "N == 0；N /= 10",
                "N > 0；N /= 10"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4,
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n正整数每执行一次N/=10就删掉一位；循环应在N>0时继续，并把每轮计入cnt，故D。N=1也必须处理一轮，A/B的N>1会漏掉这种末位，C在初始正数时根本不执行。以123为例，处理123、12、1共三轮，N变0时结束。",
            tags: [
                "数位分离"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "判断一个数是否为自守数。自守数的定义是如果一个数的平方其尾数与该数相同，则为自守数，如 25 的平方是 625，其尾数是 25，所以 25 是自守数。相关说法错误的是（ ）。\n\n```cpp\nint N, N1, M1;\ncout << \"输入一个正整数：\";\ncin >> N;\nN1 = N, M1 = N * N;\n\nbool Flag = true;\n\nwhile (N1 > 0){\n    if (N1 % 10 != M1 % 10){\n        Flag = false;\n        break;\n    }\n    else{\n        N1 = N1 / 10, M1 = M1 / 10;\n    }\n}\n\nif (Flag == true)\n    printf(\"%d的平方是%d,是自守数\", N, N * N);\nelse\n    printf(\"%d的平方是%d,不是自守数\", N, N * N);\n```",
            options: [
                "如果 Flag 在循环中不被改为 false，则说明该数是自守数",
                "代码 if (N1 % 10 != M1 % 10) 用于判断其个位数是否相等，如果不等，则表明不是自守数",
                "代码 N1 = N1 / 10, M1 = M1 / 10 将个位数去掉",
                "将 N1 > 0 改为 N > 0 效果相同"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n按平方可由int表示的输入范围分析，原循环逐位比较N1和M1，匹配后同时除10，全部位相同即自守。D改用始终不变的原N作条件，对于25等自守数，副本最终都变0，此后仍反复比较0并除10，无法结束，所以D错误。A/B/C描述原算法相应步骤；大输入N*N可能溢出，原代码不能据此推广到任意大正数。",
            tags: [
                "数位判断"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面 C++ 代码实现输出如下图形，相关说法错误的是（ ）。\n\n```text\n请输入层数: 10\n0\n12\n345\n6789\n01234\n567890\n1234567\n89012345\n678901234\n5678901234\n```\n\n```cpp\nint line_number, now_number;\nint i,row;\n\ncout << \"请输入行数: \";\ncin >> line_number;\nnow_number = 0;\n\nfor (row = 1; row < line_number + 1; row++){ // L1\n    for (i = 0; i < row; i++){ // L2\n        cout << now_number;\n        now_number += 1;\n        if (now_number == 10) now_number = 0; // L3\n    }\n    cout << endl;\n}\n```",
            options: [
                "代码 now_number = 0 移动到 L1 和 L2 标记的两行代码之间，效果维持不变",
                "代码 now_number += 1 修改为 now_number = 1 + now_number 效果维持不变",
                "将代码 now_number == 10 调整为 now_number > 9 效果维持不变",
                "将最后一行的 cout << endl 修改为 cout << \"\\n\"，效果维持不变"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [
                5,
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷示例首行显示“请输入层数: 10”，所给代码却输出“请输入行数: ”，因此代码不能逐字产生题目展示的完整输出。官方答案 A 仍能反映数字图形部分的命题意图，但题面与代码不一致，本题不计分。",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷示例首行显示“请输入层数: 10”，所给代码却输出“请输入行数: ”，因此代码不能逐字产生题目展示的完整输出。官方答案 A 仍能反映数字图形部分的命题意图，但题面与代码不一致，本题不计分。 只看数字图形，A把now_number=0移入每行循环会让每行重新从0开始，故官方选择A反映此意图。B是等价加法，C在当前0到10的演化范围等价，D换行显示相同但endl还会刷新缓冲。保留原图“层数”和代码“行数”的差异，不把图或提示词改掉清除隔离。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "人们现在参加很多闭卷考试时通常都不允许带智能手机、平板电脑等，此外很多种智能手表同样因为具有嵌入操作系统及通信等功能，所以也不允许随身携带。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n按本卷题意，具备嵌入式操作系统、存储和通信能力的智能手表同样可能成为闭卷考试禁止携带的电子设备，题干说“很多种”而非所有手表，故正确。这是对设备能力与考试场景的概括，不把本题解析当作任一现行考试的具体管理规定或普通机械手表的统一限制。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 代码中，假设 N 为正整数，则 `N / 10` 舍弃个位数。如果 N 小于 10，则其值为 0，大于 10 则是舍弃个位数的数。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n正整数N做整数除法N/10会去掉个位；一位数除以10得到0，两位及以上则保留剩余高位，判断正确。N=10时结果1，虽题干未单独列举等于10的情况，仍符合“舍弃个位”。例123/10=12，不是取出个位3，取个位应使用取余。",
            tags: [
                "整数除法"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "下列 C++ 代码执行后，其输出为 `10 20`，即 `a == b` 和 `b == a` 对 `a` 和 `b` 的值没有任何影响。（ ）\n\n```cpp\nint a = 10, b = 20;\na == b;\nb == a;\ncout << (a, b);\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\na==b与b==a确实都不改变变量，但cout<<(a,b)中的逗号表达式只保留最后一个操作数b的值。因此输出20，而不是带空格的10 20，整体判断错误。不能因为题干后半句关于比较的描述成立，就忽略前半句声称的实际输出不正确。",
            tags: [
                "表达式"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "a 和 b 分别是 C++ 的整型变量，如果表达式 `max(a, b) == min(a, b)` 的值为真，则说明 a 和 b 相等。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n对于两个整型数，最大值等于最小值时，两者必然是同一个值，因此判断正确。若a<b则max为b、min为a，二者不同；a>b同理，只有a=b才能相等。这一推理只涉及取值与比较，没有加减乘法，不会引入有符号算术溢出问题。",
            tags: [
                "函数"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "下面 C++ 代码编译时将报错，因为字符变量 a 被赋值了浮点值。（ ）\n\n```cpp\nchar a = '1';\na = 45.6;\ncout << a;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n普通赋值允许将可表示的浮点值转换为char。45.6先截去小数成为45，再保存到char，在ASCII兼容环境输出编码45的减号，因此不会仅因这次赋值而编译报错，判断错误。大括号列表初始化中的窄化限制是另一情形，不能套用到此处的赋值语句。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下面 C++ 代码执行时如输入 59.99，将输出“及格”两个汉字。（ ）\n\n```cpp\nint score;\ncout << \"请输入学生成绩: \";\ncin >> score;\nif (score < 60)\n    cout << \"不及格\";\nelse\n    cout << \"及格\";\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\nscore为int，格式化输入59.99时先读整数部分59，余下小数点和数字留在输入流中。59<60为真，所以输出提示后接不及格，而不是及格，判断错误。这与将已经读入的浮点数四舍五入成60不同；原代码没有浮点变量或舍入操作。",
            tags: [
                "输入输出"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在下面的 C++ 代码中，因为 `continue` 将被执行，因此不会有输出。（ ）\n\n```cpp\nint i;\nfor (i = 1; i < 10; i++)\n    if (i % 2 == 0)\n        continue;\nif(i == 10)\n    cout << \"END\";\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n循环条件使i依次取1到9，偶数轮的continue仍会执行for更新，最终i=10才退出。循环后的if(i==10)位于循环体之外，条件成立，输出END，所以“不输出”错误。不能因某轮continue执行，就误以为整个函数后续语句都不再执行。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下面的 C++ 代码执行后将输出 15。（ ）\n\n```cpp\nint Sum = 0;\nfor (int i = 0; i < 5; i++)\n    Sum += i;\ncout << Sum;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\nSum先置0，循环实际累加0、1、2、3、4，结果10，不含5，所以“输出15”错误。循环变量增到5后用于判定条件为假，这个终止状态本身不会再执行Sum+=i。把1到5的和15套入此代码，会同时误读起点和严格小于的终点。",
            tags: [
                "循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "将下面 C++ 代码中的 `(int i = 5; i > 1; i--)` 调整为 `(int i = 1; i < 5; i++)` 输出结果相同，因为 5 到 1 与 1 到 5 的求和相同。（ ）\n\n```cpp\nint tnt;\ntnt = 0;\nfor (int i = 5; i > 1; i--)\n    tnt += i;\ncout << tnt;\n    cout << endl;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n原循环i取5、4、3、2，总和14；调整后i取1、2、3、4，总和10，因此输出不同，判断错误。原条件i>1没有包括1，新条件i<5没有包括5，不能根据“5到1与1到5”这句文字忽视真实代码边界。两个版本都从tnt=0开始。",
            tags: [
                "循环边界"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "为实现如下效果，即 N 行 N 列字符。当输入是奇数时，中间列为 `*`，其他是 `-`；当输入是偶数时，则中间两列是 `*`，其他是 `-`。字符阵列后的代码能实现其效果。（ ）\n\n```text\n/*\n5\n--*--\n--*--\n--*--\n--*--\n--*--\n*/\n```\n\n```cpp\nint N;\ncin >> N;\n\nint i,j;\nfor (i = 0; i < N; i++){\n    for (j = 0; j < N; j++)\n        if ((j == N / 2) || (j == (N-1) / 2))\n            cout << \"*\";\n        else\n            cout << \"-\";\n    cout << endl;\n}\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n列从0编号，奇数N时N/2与(N-1)/2相同，只标记一个中央列；偶数N时两式相邻，正好标记中间两列。每行都按这一条件打印N字符，外层共N行，因此图形逻辑正确。N=5时两索引都是2，得到--*--；N=4时为2和1，得到-**-。",
            tags: [
                "嵌套循环"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "数三角形",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB",
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [
                7,
                8
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "3",
                    output: "3"
                },
                {
                    input: "5",
                    output: "9"
                }
            ],
            question: "\n# [GESP202506 二级] 数三角形\n\n- **试题名称**：数三角形\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题目描述\n\n直角三角形有两条直角边与一条斜边，设两条直角边的长度分别为 $a,b$，则直角三角形的面积为 $\\dfrac{ab}{2}$。\n\n请你计算当直角边长 $a,b$ 均取不超过 $n$ 的正整数时，有多少个不同的面积为整数的直角三角形。直角边长分别为 $a,b$ 和 $a',b'$ 的两个直角三角形相同，当且仅当 $a=a',b=b'$ 或者 $a=b',b=a'$。\n\n## 输入格式\n\n一行，一个整数 $n$，表示直角边长的最大值。\n\n## 输出格式\n\n输出一行，一个整数，表示不同的直角三角形数量。\n\n## 样例\n\n### 输入样例 1\n\n```text\n3\n```\n\n### 输出样例 1\n\n```text\n3\n```\n\n### 输入样例 2\n\n```text\n5\n```\n\n### 输出样例 2\n\n```text\n9\n```\n\n## 数据范围\n\n对于所有测试点，保证 $1 \\le n \\le 1000$。\n",
            score: 25,
            explanation: "**解析**\n\n交换两条直角边视为同一三角形，所以参考程序只枚举1<=a<=b<=n。面积ab/2为整数当且仅当ab为偶数。样例n=3的三对为(1,2)、(2,2)、(2,3)，n=5得到9。复杂度O(n²)、额外空间O(1)；n<=1000时乘积最多1000000，计数最多500500，int安全。保留原程序，以总无序对减去两边都奇数的组合数为独立预言机验证全部n=1..1000，不把相同面积但边长不同的三角形合并。",
            tags: [
                "编程题",
                "枚举",
                "奇偶性"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int n, a, b, cnt=0;\n    cin >> n;\n    for(a=1; a<=n; a++)\n    {\n        for(b=a; b<=n; b++)\n        {\n            if(a*b%2==0) cnt++;\n        }\n    }\n    cout << cnt <<endl;\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "幂和数",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "2 8",
                    output: "6"
                },
                {
                    input: "10 100",
                    output: "20"
                }
            ],
            question: "\n# [GESP202506 二级] 幂和数\n\n- **试题名称**：幂和数\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题目描述\n\n对于正整数 $n$，如果 $n$ 可以表示为两个 2 的次幂之和，即 $n=2^x+2^y$（$x,y$ 均为非负整数），那么称 $n$ 为幂和数。\n\n给定正整数 $l,r$，请你求出满足 $l\\le n\\le r$ 的整数 $n$ 中有多少个幂和数。\n\n## 输入格式\n\n一行，两个正整数 $l,r$，含义如上。\n\n## 输出格式\n\n输出一行，一个整数，表示 $l,r$ 之间幂和数的数量。\n\n## 样例\n\n### 输入样例 1\n\n```text\n2 8\n```\n\n### 输出样例 1\n\n```text\n6\n```\n\n### 输入样例 2\n\n```text\n10 100\n```\n\n### 输出样例 2\n\n```text\n20\n```\n\n## 数据范围\n\n对于所有测试点，保证 $1 \\le l \\le r \\le 10^4$。\n",
            score: 25,
            explanation: "**解析**\n\n从1=2^0开始倍增枚举幂a、b，令b从a起避免对称重复。a!=b的和二进制恰有两个1，a=b的和是大于1的二次幂，二者不会互相重计；因此直接按无序幂对计数可行。[2,8]符合2、3、4、5、6、8共6个。l,r<=10000，末次倍增及a+b不超过32768，int安全。时间O(log²r)、额外空间O(1)。保留原程序，用二进制1个数的前缀表独立核对边界、单点及随机区间。",
            tags: [
                "编程题",
                "枚举",
                "幂"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int l, r, a, b, n, cnt = 0;\n    cin >> l >> r;\n\n    a = 1;\n    while(a<=r)\n    {\n        b = a;\n        while(b<=r)\n        {\n            n = a+b;\n            if(n>=l && n<=r) cnt++;\n            b *= 2;\n        }\n        a *= 2;\n    }\n    cout << cnt <<endl;\n    return 0;\n}"
        }
    ]
};
