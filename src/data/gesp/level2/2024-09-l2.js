// 2024-09-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-09-l2",
    title: "2024年9月 GESP C++ 二级真题",
    level: 2,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    source: {
        officialPdf: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "archived-official",
        notes: "题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷逐页转录；Q13 的多答案歧义与 Q14 的边界算法缺陷已结构化标记。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf"
    },
    sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
    reviewStatus: "partial",
    reviewScope: "AI-Codex对照mirror PDF核验全卷，Q13/Q14保留原卷疑点暂停计分，卷级partial。",
    reviewedBy: "AI-Codex",
    reviewedAt: "2026-11-06",
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照9页mirror PDF，Git blob SHA df9f341ee4b71f50cc465df91b04c240dd9f8c78一致；答案表全部对齐，所有answer保持。既有Q13/Q14源缺陷继续隔离，恢复可信AI归属，修正伪随机独立性和输入流等解析，参考程序保持并独立编译运行。",
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
            question: "据有关资料，山东大学于 1972 年研制成功 DJL-1 计算机，并于 1973 年投入运行，其综合性能居当时全国第三位。DJL-1 计算机运算控制部分所使用的磁心存储元件由磁心颗粒组成，设计存贮周期为 2μs（微秒）。那么该磁心存储元件相当于现代计算机的（ ）。",
            options: [
                "内存",
                "磁盘",
                "CPU",
                "显示器"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n**推导：** 磁心存储器直接保存处理器正在使用的数据和指令，承担的是现代主存（内存）的角色；“存贮周期”也是存储器完成一次读写所需的时间。\n**排除：** 磁盘是外存且访问慢得多；CPU 负责运算与控制；显示器是输出设备。\n**易错点：** 题目问的是部件功能，不是用 2μs 与今天硬件的绝对速度做机械比较。\n**最小验证：** 把“磁心存储元件”替换为“主存储器”，只有“内存”在计算机组成中同属这一层级。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "IPv4 版本的因特网总共有（ ）个 A 类地址网络。",
            options: [
                "65000",
                "200万",
                "126",
                "128"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n**推导：** A 类地址首位固定为 0，网络号还剩 7 位，共有 $2^7=128$ 个编号；0 号和 127 号保留，因此可用 A 类网络为 $128-2=126$ 个。\n**排除：** 128 未扣除两个保留编号；65000 与 200 万都不是 A 类网络数量。\n**易错点：** 题目问“网络数量”，不是每个网络的主机数量。\n**最小验证：** 可分配的首字节范围是 1～126，首尾都计入正好 126 个。",
            tags: [
                "网络基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "在 C++ 中，下列不可做变量的是（ ）。",
            options: [
                "ccf-gesp",
                "ccf_gesp",
                "ccfGesp",
                "_ccfGesp"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\nccf-gesp含减号，不能构成一个C++标识符，选A。ccf_gesp与ccfGesp符合名称语法，_ccfGesp在普通局部作用域语法合法，但全局命名空间以下划线开头的名字保留给实现；不能把“以下划线开头”无条件解释为任意作用域都可使用。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "在 C++ 中，与 `for (int i = 1; i < 10; i++)` 效果相同的是（ ）。",
            options: [
                "for (int i = 0; i < 10; i++)",
                "for (int i = 0; i < 11; i++)",
                "for (int i = 1; i < 10; ++i)",
                "for (int i = 0; i < 11; ++i)"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n原循环依次令i取1到9，共9轮。迭代表达式中i++和++i的返回值没有使用，二者都让i增加1，因此C等价。A取0到9多一轮，B、D取0到10，共11轮，起点和终点均不同。前后置自增的差别出现在使用其表达式值时，不影响本题。",
            tags: [
                "循环"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "在 C++ 中，`cout << (5 / 2 + 5 % 3)` 的输出是（ ）。",
            options: [
                "1",
                "2",
                "4",
                "5"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n**推导：** 两个操作数都是整数，`5 / 2` 做整数除法得到 2；`5 % 3` 得余数 2；相加为 4。\n**排除：** 1、2、5 都不等于两个子表达式的和。\n**易错点：** 不要把整数除法误算成 2.5。\n**最小验证：** $5=2\\times2+1$ 对应除法商 2；$5=3\\times1+2$ 对应余数 2。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "假定变量 `a` 和 `b` 可能是整型、字符型或浮点型，则下面 C++ 代码执行时先后输入 `-2` 和 `3.14` 后，其输出不可能是（ ）。已知字符 `+`、`-`、`=` 的 ASCII 码值分别是 43、45 和 61。\n```cpp\ncin >> a;\ncin >> b;\ncout << (a + b);\n```",
            options: [
                "1",
                "1.14",
                "47",
                "将触发异常"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\nint a、int b读取-2和3.14时，a=-2，b只取整数部分3，得到1；int a、double b可输出1.14。char a、int b会先读字符减号，随后从同一行余下的2读得b=2，按ASCII得到45+2=47；并非把下一行3.14读给b。默认cin不因这种普通格式化输入抛异常，故不可能项为D。失败状态与抛异常是不同概念。",
            tags: [
                "输入输出",
                "数据类型"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "在 C++ 代码中假设 `N` 为正整数，则下面代码能获得个位数的是（ ）。",
            options: [
                "N % 10",
                "N / 10",
                "N && 10",
                "以上选项均不正确"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n**推导：** 十进制正整数除以 10 的余数就是个位数字。\n**排除：** `N / 10` 去掉个位；`N && 10` 是逻辑与，对正整数结果为 1；因此 D 也不成立。\n**易错点：** `&&` 是逻辑运算，不是数位提取。\n**最小验证：** $123\\bmod10=3$，正好是个位。",
            tags: [
                "数位处理"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint i;\nfor (i = 0; i < 10; i++) {\n    if (i % 2)\n        break;\n    cout << \"0#\";\n}\nif (i == 10) cout << \"1#\";\n```",
            options: [
                "0#",
                "1#",
                "0#0#1",
                "没有输出"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n**推导：** $i=0$ 时 `i % 2` 为 0，不执行 `break`，输出一次 `0#`；随后 $i=1$，条件为真并退出循环。此时 `i!=10`，末尾也不输出 `1#`。\n**排除：** B 需要正常循环到 10；C 多输出了一次 `0#`；D 忽略了 $i=0$ 的首次输出。\n**易错点：** `break` 发生在第二轮，而不是第一轮。\n**最小验证：** 只需追踪 $i=0,1$ 两轮即可得到完整输出。",
            tags: [
                "循环",
                "流程控制"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "执行下面 C++ 代码并输入 1 和 0，有关说法正确的是（ ）。\n```cpp\nint a, b;\ncin >> a >> b;\nif (a && b)\n    cout << (\"1\");\nelse if (!(a || b))\n    cout << (\"2\");\nelse if (a || b)\n    cout << (\"3\");\nelse\n    cout << (\"4\");\n```",
            options: [
                "1",
                "2",
                "3",
                "4"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n**推导：** 输入后 `a=1,b=0`。`a && b` 为假；`!(a || b)` 为 `!true`，仍为假；第三个 `a || b` 为真，因此输出 3。\n**排除：** 前两个分支条件均为假，最后的 `else` 不会到达。\n**易错点：** 非零视为真，0 视为假；`!` 的优先作用对象是括号内结果。\n**最小验证：** 真值对 $(1,0)$ 的“与”为 0，“或”为 1。",
            tags: [
                "逻辑运算",
                "条件判断"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint loopCount = 0;\nfor (int i = 1; i < 5; i += 2)\n    loopCount += 1;\ncout << (loopCount);\n```",
            options: [
                "1",
                "2",
                "3",
                "5"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\n**推导：** 循环变量依次为 1、3，共执行两次，每次让 `loopCount` 加 1，最终为 2。\n**排除：** 其余数值都与实际执行次数不符。\n**易错点：** `i += 2` 使序列跳过偶数，且 $i=5$ 不满足 `i < 5`。\n**最小验证：** 写出循环体入口值 ${1,3}$，集合大小就是 2。",
            tags: [
                "循环"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下图是 C++ 程序执行后的输出。为实现其功能，横线处应填入的代码是（ ）。\n```text\n7\n1\n2 3\n3 4 5\n4 5 6 7\n5 6 7 8 9\n6 7 8 9 10 11\n7 8 9 10 11 12 13\n```\n```cpp\nint lineNum;\ncin >> lineNum;\nfor (int i = 1; i < lineNum + 1; i++) {\n    for (int __________________)\n        cout << j << \" \";\n    cout << endl;\n}\n```",
            options: [
                "j = i; j < i; j++",
                "j = 1; j < i; j++",
                "j = i; j < i*2; j++",
                "j = i+1; j < i+i; j++"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3,
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n图的第一行7是输入回显，不是程序打印的第一行。输入lineNum=7后，第i行应从i连续打印到2i-1，正好i个数。因此填C：j=i;j<i*2;j++。A从一开始条件即假，B从1开始且少一项，D也少首项。每个数字后有一个空格，行末换行在内层循环外。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面 C++ 代码执行后输出逆序数，如输入 123 则输出 321，如输入 120 则输出 21。横线处先后应填入的代码是（ ）。\n```cpp\nint N;\ncin >> N;\nint rst = 0;\nwhile (N) {\n    ____________________;\n    ____________________;\n}\ncout << (rst);\n```",
            options: [
                "rst = rst * 10 + N % 10；N = N / 10",
                "rst += N % 10；N = N / 10",
                "rst = rst * 10 + N / 10；N = N % 10",
                "rst += N / 10；N = N % 10"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n**推导：** 每轮用 `N % 10` 取末位，把旧结果乘 10 后接上该位，再以 `N / 10` 删除末位。输入 123 时结果依次为 3、32、321。\n**排除：** B 只把各位相加；C、D 混淆了取末位和删末位，不能完成逆序。\n**易错点：** “接到结果末尾”必须先让 `rst * 10`。\n**最小验证：** 输入 120：结果依次 0、2、21，最终输出 21，符合题面。",
            tags: [
                "数位处理"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面的 C++ 代码用于输入学生成绩，并根据人数计算出平均成绩，有关说法错误的是（ ）。\n```cpp\nfloat Sum = 0; // 保存总成绩\nint cnt = 0;   // 保存学生人数\nwhile (1) {\n    int score;\n    cin >> score;\n    if (score < 0)\n        break;\n    cnt += 1;\n    Sum += score;\n}\ncout << \"总学生数：\" << cnt << \"平均分：\" << Sum / cnt;\n```",
            options: [
                "代码 while (1) 写法错误",
                "如果输入负数，将结束输入，并正确输出",
                "如果输入的学生成绩含有小数，程序将无法正常执行",
                "变量 int score 初始值不确定，但不影响程序执行"
            ],
            answer: 0,
            score: 2,
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷为单选并给出答案 A，但 B 也并非始终成立：若首次输入就是负数，cnt 仍为 0，随后计算 Sum / cnt（0/0），不能称为“正确输出”。A、B 均可视为错误说法，构成多答案歧义；题库保留原文与官方答案并停止计分。",
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷为单选并给出答案 A，但 B 也并非始终成立：若首次输入就是负数，cnt 仍为 0，随后计算 Sum / cnt（0/0），不能称为“正确输出”。A、B 均可视为错误说法，构成多答案歧义；题库保留原文与官方答案并停止计分。 while(1)语法合法，故A确实是错误说法；但首次输入-1就退出，cnt仍为0，Sum/cnt无有效平均数，B也不总成立。输入95.5时int先读95并留下小数点，后续读取失败，不能假设每轮都成功覆盖未初始化的score。保留已有隔离，不把“通常能工作”说成全域正确。",
            tags: [
                "输入输出",
                "循环"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "以下 C++ 代码判断输入的正整数是否为质数，如果该数字是质数，则输出 `YES`，否则输出 `NO`。质数是指仅能被 1 和它本身整除的正整数。请在横线上填写代码。（ ）\n```cpp\nint num, i;\ncin >> num;\nfor (i = 2; i < num; i++)\n    if (__________) {\n        cout << (\"NO\");\n        break;\n    }\nif (i == num)\n    cout << (\"YES\");\n```",
            options: [
                "num % i",
                "num % i == 0",
                "num / i",
                "num / i == 0"
            ],
            answer: 1,
            score: 2,
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷声称该代码能判断输入的正整数是否为质数，但当 num=1 时，循环不执行且 i==num 为假，程序不会输出 NO。选项 B 仍是横线处唯一符合预期的填写，题库保留官方答案并因完整程序的边界缺陷停止计分。",
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4,
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷声称该代码能判断输入的正整数是否为质数，但当 num=1 时，循环不执行且 i==num 为假，程序不会输出 NO。选项 B 仍是横线处唯一符合预期的填写，题库保留官方答案并因完整程序的边界缺陷停止计分。 对num>=2，若num%i==0即可判有非平凡因数并输出NO；遍历结束且i==num则输出YES，所以横线意图为B。但num=1时i初始为2，循环不执行，后面条件也不成立，输出为空，不能完成题目对正整数的全部要求。该反例保持隔离，不擅自把题面改为num>=2。",
            tags: [
                "质数",
                "循环"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "一个数如果能被某个数（比如 7）整除，或者含有该数，则说该数是某个数的相关数。下面 C++ 代码用于判定输入的数与 7 是否有关。下列说法错误的是（ ）。\n```cpp\nint N, M;\nbool Flag = false;\ncin >> N;\nM = N;\n\nif (M % 7 == 0)\n    Flag = true;\n\nwhile (!Flag && M) {\n    if (M % 10 == 7) {\n        Flag = true;\n        break;\n    }\n    M /= 10;\n}\n\nif (Flag)\n    cout << N << \"与7有关\";\nelse\n    cout << N << \"与7无关\";\n```",
            options: [
                "删除 break 语句不会导致死循环，但有时会导致结果错误",
                "删除 M /= 10 将可能导致死循环",
                "删除 M = N 并将其后代码中的 M 变量改为 N，并调整输出同样能完成相关功能",
                "删除 break 语句不会导致死循环，但有时会影响效率"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n原代码找到个位7后设Flag=true，删除break后仅多执行一次M/=10，下一轮会因!Flag为假结束，结果保持正确，所以A的“有时结果错误”不成立。D所说效率影响对应这次多余除法。删除M/=10时，N=1会使M恒为1且Flag为假，可能死循环。C要求同时调整输出，避免把已逐位除小的N误当原数显示。",
            tags: [
                "循环",
                "数位处理"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "小杨最近开始学习 C++ 编程，老师说 C++ 是一门面向对象的编程语言，也是一门高级语言。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\nC++支持面向对象编程，可通过类和对象封装数据与行为，也属于高级编程语言，因此题干正确。支持面向对象不代表只能采用这一种风格，C++也支持过程式等写法；不能据“可以写普通函数”否定它支持面向对象。此题不涉及具体程序输出。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 中，`cout << (3, 4, 5)` 可以输出 `3 4 5`，且每个输出项之间用空格分开。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n括号中的逗号是逗号运算符，不会向输出流插入分隔符。表达式依次求值3、4、5，整体值取最后一个5，所以cout只输出5，而不是带空格的3 4 5，故错误。若要输出三项，应分别使用<<并显式插入空格字符。",
            tags: [
                "运算符",
                "输入输出"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "C++ 表达式 `12 % 10 % 10` 的值为 2。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n%按从左到右结合，先算12%10=2，再算2%10=2，故题干正确。这里第二次取余不会把2变成0：较小正数对较大正数取余仍为自身。不要把2/10的整数商0与2%10的余数2混淆，也不能按12%(10%10)计算。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "C++ 语句 `cout << rand() << ' ' << rand();` 的第二个输出值较大。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\nrand返回伪随机序列中的值，标准不保证后一次调用一定较大；因此题干错误。固定种子会产生可重复序列，各项由生成器内部状态决定，不能称为“相互独立的真随机数”。某次连续两项恰好递增也不足以证明所有调用都递增；设置时间种子也不保证每次运行不同。",
            tags: [
                "随机数"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "定义 C++ 的 `int` 类型变量 `ch`，而且值为 `'1'`，则语句 `cout << int(ch);` 的输出为 1。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n单引号中的1是字符常量，其编码赋给int变量ch；在本卷ASCII兼容环境中编码是49。int(ch)只是把已为int的数值按int输出，不会自动解析字符内容，故输出49而非1，题干错误。若要取得对应数字值，应使用ch-'0'。",
            tags: [
                "数据类型",
                "字符编码"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下面 C++ 代码执行后将输出 10。（ ）\n```cpp\nint i;\nfor (i = 0; i < 10; i++)\n    continue;\nif (i == 10)\n    cout << i;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\ncontinue结束当轮循环体，但for的迭代表达式i++仍会执行。i依次取0到9后增到10，条件i<10为假而退出，外部if(i==10)成立，因此输出10，判断正确。这里i在循环之前声明，所以循环结束后仍能读取，不存在作用域外访问。",
            tags: [
                "循环",
                "流程控制"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面 C++ 代码能求整数 N 和 M 之间所有整数之和，包含 N 和 M。（ ）\n```cpp\nint N, M, Sum;\n\ncin >> N >> M;\n\nif (N > M) {\n    int tmp = N;\n    N = M, M = tmp;\n}\n\nfor (int i = N; i < M + 1; i++)\n    Sum += i;\n\ncout << Sum;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n局部变量Sum没有初始化，Sum+=i首次执行便读取其不确定值，不能保证输出区间和，故错误。交换N、M只修正端点顺序，不能修复累加器。若改为Sum=0，在范围及累加结果可表示的前提下才可讨论算法正确；还应注意M+1和i++在极大端点下可能溢出。",
            tags: [
                "变量初始化",
                "循环"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "将下面 C++ 代码中 L3 标记的代码行调整为 `for (int i = 0; i < 5; i++)` 后输出结果相同。（ ）\n```cpp\nint loopCount = 0;\nfor (int i = 1; i < 5; i++) // L3\n    for (int j = 0; j < i; j++)\n        loopCount += 1;\ncout << loopCount;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n原外层i=1、2、3、4时，内层分别执行1、2、3、4次，共10次。改成从0开始只多出i=0的一轮，内层j=0不满足j<i，所以这一轮不增加计数。其余各轮不变，输出仍为10，故题干正确；不能将“外层多一轮”等同于“计数加一”。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "某一系列数据的规律是从第 3 个数值开始是前两个数之和。下面的代码求第 N 个数的值，N 限定为大于 2。（ ）\n```cpp\nint start1; // 第1个数\nint start2; // 第2个数\nint N;      // 求第N个数的值\nint tmp;\ncin >> start1 >> start2 >> N;\n\nfor (int i = 2; i < N; i++) {\n    tmp = start1 + start2;\n    start1 = start2;\n    start2 = tmp;\n}\ncout << start2;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6,
                7
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n把start1、start2视为相邻两项，每轮先用tmp保存两项之和，再把旧第二项移到start1、新项放到start2。i从2到N-1共执行N-2轮，恰好生成第3项直到第N项，因此在计算结果可由int表示时逻辑正确。最小N=3仅循环一次，得到两初值之和；大N或大初值要另行考虑溢出。",
            tags: [
                "循环",
                "递推"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "下面 C++ 代码执行时如果输入 2024，则输出是 4202。（ ）\n```cpp\nint N, flag = 0;\ncin >> N;\nwhile (N) {\n    if (!flag) cout << N % 10;\n    N /= 10;\n    flag = (flag + 1) % 2;\n}\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\nflag初始为0，每次取位后在0、1间切换，仅flag=0时输出。输入2024时，个位4输出，十位2跳过，百位0输出，千位2跳过，最终连成40，故“4202”错误。N/=10始终执行，条件只控制cout，不能把它理解为每次都逆序输出全部数位。",
            tags: [
                "循环",
                "数位处理"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "数位之和",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB",
            score: 25,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [
                7,
                8
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "3\n7\n52\n103",
                    output: "Yes\nYes\nNo"
                }
            ],
            question: "\n# [GESP202409 二级] 数位之和\n\n- **试题名称**：数位之和\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题面描述\n\n小杨有 $n$ 个正整数，他认为一个正整数是美丽数字当且仅当该正整数每一位数字的总和是 $7$ 的倍数。\n\n小杨想请你编写一个程序判断 $n$ 个正整数哪些是美丽数字。\n\n## 输入格式\n\n第一行包含一个正整数 $n$，代表正整数个数。\n\n之后 $n$ 行，每行包含一个正整数 $a_i$。\n\n## 输出格式\n\n对于每个正整数，如果是美丽数字则输出 `Yes`，否则输出 `No`。\n\n## 样例 1\n\n```text\n输入：\n3\n7\n52\n103\n\n输出：\nYes\nYes\nNo\n```\n\n$7$ 的各位数字之和为 $7$，是 $7$ 的倍数。$52$ 的各位数字之和为 $5+2=7$，是 $7$ 的倍数。$103$ 的各位数字之和为 $1+0+3=4$，不是 $7$ 的倍数。\n\n## 数据范围\n\n对于全部数据，保证有 $1 \\le n \\le 10^5$，$1 \\le a_i \\le 10^5$。\n",
            explanation: "**解析**\n\n逐个正整数用%10取位、/10去位，累加到本轮重新置0的tot，再判断tot%7==0。样例7和52的数位和为7，输出Yes；103的和为4，输出No。每组最多6位，a<=100000、n<=100000，复杂度O(n log a)、额外空间O(1)，累加器int足够。现有参考代码与mirror PDF p.8一致，保留未用的ans变量也不影响逻辑；独立字符串求和预言机覆盖所有合法a值及n上界。",
            tags: [
                "编程题",
                "数位处理",
                "模拟"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include<bits/stdc++.h>\nusing namespace std;\n\nint main(){\n    int n;\n    cin>>n;\n    int ans=0;\n    for(int i=1;i<=n;i++){\n        int x;\n        cin>>x;\n        int tot=0;\n        while(x){\n            tot+=(x%10);\n            x/=10;\n        }\n        if(tot%7==0)cout<<\"Yes\\n\";\n        else cout<<\"No\\n\";\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "小杨的 N 字矩阵",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB",
            score: 25,
            sourceVerified: true,
            sourcePage: 8,
            sourcePages: [
                8,
                9
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "5",
                    output: "+---+\n++--+\n+-+-+\n+--++\n+---+"
                }
            ],
            question: "\n# [GESP202409 二级] 小杨的 N 字矩阵\n\n- **试题名称**：小杨的 N 字矩阵\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题面描述\n\n小杨想要构造一个 $m \\times m$ 的 N 字矩阵（$m$ 为奇数），这个矩阵从左上角到右下角的对角线、第 $1$ 列和第 $m$ 列都是半角加号 `+`，其余都是半角减号 `-`。例如，一个 $5 \\times 5$ 的 N 字矩阵如下：\n\n```text\n+---+\n++--+\n+-+-+\n+--++\n+---+\n```\n\n请你帮小杨根据给定的 $m$ 打印出对应的 N 字矩阵。\n\n## 输入格式\n\n第一行包含一个正整数 $m$。\n\n## 输出格式\n\n输出对应的 N 字矩阵。\n\n## 样例 1\n\n```text\n输入：\n5\n\n输出：\n+---+\n++--+\n+-+-+\n+--++\n+---+\n```\n\n## 数据范围\n\n对于全部数据，保证有 $3 \\le m \\le 49$ 且 $m$ 为奇数。\n",
            explanation: "**解析**\n\n遍历m行m列，第1列、第m列以及主对角线位置输出+，其余输出-。等价判定为j==1||j==m||i==j，不要把它写成反对角线i+j==m+1。m=5的五行依次为+---+、++--+、+-+-+、+--++、+---+，与样例一致。每行恰好m字符且无额外空格，O(m²)时间、O(1)额外空间。m为3到49的奇数，共24个合法值，全部以独立画线构造预言机验证，现有参考程序保持不变。",
            tags: [
                "编程题",
                "二维枚举",
                "图形输出"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n;\n    cin>>n;\n    for(int i=1;i<=n;i++){\n        for(int j=1;j<=n;j++){\n            if(j==1||j==n)cout<<\"+\";\n            else{\n                if(i==j)cout<<\"+\";\n                else cout<<\"-\";\n            }\n        }\n        cout<<\"\\n\";\n    }\n}"
        }
    ]
};
