// 2025-03-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-03-l2",
    title: "2025年3月 GESP C++ 二级真题",
    level: 2,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    source: {
        officialPdf: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "archived-official",
        notes: "题面、代码、选项、答案表、输出图示、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录；Q27 的原卷措辞缺陷已结构化标记。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf"
    },
    reviewStatus: "partial",
    reviewScope: "AI-Codex对照mirror PDF全卷五维核验，Q10/Q27源疑点保持隔离，卷级partial。",
    reviewedBy: "AI-Codex",
    reviewedAt: "2026-11-06",
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照10页mirror PDF，Git blob SHA 0c7122676556eb84513dbaaa55b2899eeeddc6f6一致，全部answer保持。Q27既有源缺陷保留，Q10端点缺陷新增隔离，恢复Q9/Q10原输出两个空格，重写27题解析，两份参考程序保持且独立编译运行。",
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
            question: "2025年春节有两件轰动全球的事件，一个是DeepSeek横空出世，另一个是贺岁片《哪吒2》票房惊人，入了全球票房榜。下面关于DeepSeek与《哪吒2》的描述成立的是（ ）。",
            options: [
                "《哪吒2》是一款新型操作系统",
                "DeepSeek是深海钻探软件",
                "《哪吒2》可以生成新的软件",
                "DeepSeek可以根据《哪吒2》的场景生成剧情脚本"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n按本卷2025年3月mirror PDF第1页答案表选D。题目把DeepSeek作为生成式人工智能应用，把哪吒2作为电影，D描述根据场景生成文本脚本这一用途。A把电影说成操作系统，B把人工智能模型说成深海钻探软件，C把电影说成软件生成工具，均混淆对象；这里不宣称任何具体输出必然准确。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "对整型变量N，如果它能够同时被3和5整除，则输出“N是含有至少两个质因数”。如果用流程图来描述处理过程，则输出语句应该在哪种图形框中（ ）。",
            options: [
                "圆形框",
                "椭圆形框",
                "平行四边形框",
                "菱形框"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n传统程序流程图中，平行四边形表示输入或输出，因此输出语句放在C所示图形。菱形用于判断，例如检验是否同时被3和5整除；起止符常用椭圆形。题目询问的是输出步骤，不是进行条件判断的步骤，不能因为题干出现整除条件就选菱形。",
            tags: [
                "流程图"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面C++代码执行，其输出是（ ）。\n\n```cpp\nint a=3, b = 4;\na == b;\nb == a;\ncout << a << ' ' << b << endl;\n```",
            options: [
                "3 4",
                "3 3",
                "4 4",
                "4 3"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\na==b和b==a都是相等比较，结果并未被使用，也没有修改任何变量。a仍为3、b仍为4，输出3、一个空格、4和换行，所以选A。两个等号不能当成赋值运算符，单纯交换比较操作数也不能完成两个变量数值的交换。",
            tags: [
                "运算符",
                "程序分析"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "求三色彩球的颜色。有数量无限的红(Red)绿(Green)蓝(Blue)三种彩球排成一行，每组先为5个红色球，随后3个绿色，最后为2个蓝色。每个球都有编号，从左到右依次为1,2,3……。输入整数代表编号，求该编号球的颜色。下面是C++代码实现，正确说法是（ ）。\n\n```cpp\nint N, remainder;\ncin >> N;\nremainder = N % 10; // remainder变量保存余数\n\nif((1 <= remainder) && (remainder <= 5))\n    cout << \"Red\";\nelse if ((6 <= remainder) && (remainder <= 8))\n    cout << \"Green\";\nelse if ((remainder == 9) || (remainder == 0))\n    cout << \"Blue\";\n```",
            options: [
                "将 else if ((remainder == 9) || (remainder == 0)) 修改为 else 效果相同",
                "将 ((1 <= remainder) && (remainder <= 5)) 修改为 (remainder <= 5) 效果相同",
                "else if ((6 <= remainder) && (remainder <= 8)) 写法错误，应修改为 else if (6 <= remainder <= 8)",
                "根据题意 remainder = N % 10 应修改为 remainder = N / 10"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n编号从1开始，每10球为一组；余数1到5为红，6到8为绿，9和0为蓝。经过前两分支筛选，剩下正好9和0，所以最后改成else等价，选A。B会把余数0误作红，C的连写比较不能表达区间，D除以10得到组号而非组内位置。此结论按题目给定的正编号域成立。",
            tags: [
                "条件分支",
                "取模运算"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面C++代码执行后其输出是（ ）。\n\n```cpp\nint tnt = 0;\nfor (int i = 0; i < 10; i++)\n    if (i % 3)\n        tnt += 1;\n    else\n        tnt += 2;\ncout << tnt;\n```",
            options: [
                "18",
                "17",
                "16",
                "14"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\ni=0到9中，0、3、6、9共4个数的i%3为0，走else各加2；另外6个数的余数非0，走if各加1。总量4*2+6*1=14，选D。不能只数3、6、9而漏掉0，也不能把if(i%3)误读成“能被3整除时为真”。",
            tags: [
                "循环",
                "逻辑运算"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面C++代码执行后输出是（ ）。\n\n```cpp\nint i;\nfor (i = 10; i > 0; i -= 2)\n    break;\ncout << i;\n```",
            options: [
                "10",
                "8",
                "0",
                "因为循环执行时会执行break语句而终止循环，所以i的值不确定"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\nfor先把i设为10，条件10>0成立，第一次进入循环立即break，退出时不会再执行i-=2。因而i仍为10，选A。变量已经被for初始化，不是“不确定”；break只改变控制流，不会自动改变i，也不会让循环继续到8或0。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面C++代码执行后输出是（ ）。\n\n```cpp\nint i;\nfor (i = 0; i < 10; i++){\n    if (i % 3 == 0)\n        continue;\n    cout << \"0\" << \"#\";\n}\nif (i >= 10)\n    cout << \"1\" << \"#\";\n```",
            options: [
                "0#0#0#0#0#0#",
                "0#0#0#0#0#0#0#1#",
                "0#0#0#0#1#",
                "0#0#0#0#0#0#1#"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\ni=0、3、6、9时满足i%3==0而continue，跳过输出；其余1、2、4、5、7、8共6轮输出0#。自然退出后i=10，if(i>=10)成立，再输出1#，所以选D。printf和cout均不会凭空补空格，原串应连续拼接。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面C++代码执行后的输出是（ ）。\n\n```cpp\nint i, j;\nfor (i = 0; i < 5; i++)\n    for (j = i; j > 0; j -= 1)\n        printf(\"%d-\", j);\n```",
            options: [
                "1-2-1-3-2-1-4-3-2-1-",
                "1-2-1-3-2-1-4-3-2-1",
                "0-0-1-0-1-2-0-1-2-3-",
                "0-0-1-0-1-2-0-1-2-3"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\ni=0时内层j=0不满足j>0，不输出；随后i=1到4分别打印1-、2-1-、3-2-1-、4-3-2-1-。连成1-2-1-3-2-1-4-3-2-1-，选A。格式串在每个数字后都有连字符，因此最终的末尾连字符也不能省略。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面C++代码执行后，将输出能被2整除且除以7余数为2的数。下列选项不能实现的是（ ）。\n\n```cpp\nfor (int i = 0; i < 100; i++)\n    if _______________________\n        cout << i << \"  \";\n```",
            options: [
                "((i % 2 == 0) && (i % 7 == 2))",
                "((!(i % 2)) && (i % 7 == 2))",
                "((!(i % 2)) && (!(i % 7)))",
                "((i % 2 != 1) && (i % 7 == 2))"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\nA/B/D在i=0到99的非负域内都判断偶数且模7等于2；D的i%2!=1也在这个域等价于偶数。C判断的是模2、模7都为0，即14的倍数，不能实现目标，故C。原代码每个输出数字后两个空格，已按原卷恢复；例如2应被目标筛入而不被C筛入。",
            tags: [
                "逻辑运算",
                "取模运算"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面C++代码用于求1到N之间正整数中含有3的数的个数，比如 123 和 32 都是符合条件的数。则前后两处横线应填入代码分别是（ ）。\n\n```cpp\nint i, j;\nint cnt = 0, N;\ncout << \"请输入正整数N：\";\ncin >> N;\nfor (i = 1; (j = i) < N; i++)\n    while (j != 0)\n        if (j % 10 == 3){\n            cnt += 1;\n            __________;\n        }\n        else\n            __________;\ncout << cnt << \"  \";\n```",
            options: [
                "continue 和 j /= 10",
                "break 和 j /= 10",
                "continue 和 j %= 10",
                "break 和 j %= 10"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3,
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.3–4题意求1到N之间含3的整数个数，但原循环(j=i)<N排除端点N。填官方B时N=3输出0，应含3计为1；N=13、33也漏端点。保留answer=1及原循环，暂停计分。 算法意图上命中个位3后break可让每个整数只计一次，未命中时j/=10去位，所以B是填空意图；但不能由此认证整段程序满足包含端点的题意。A/C命中后continue而j不变可死循环，D的j%=10也无法持续去掉高位。",
            tags: [
                "数位处理",
                "循环控制"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.3–4题意求1到N之间含3的整数个数，但原循环(j=i)<N排除端点N。填官方B时N=3输出0，应含3计为1；N=13、33也漏端点。保留answer=1及原循环，暂停计分。"
        },
        {
            id: 11,
            type: "single",
            question: "在数学中N!表示N的阶乘，即1到N的乘积，如 3!=1*2*3，且 0!=1。下面的两段C++代码用于求1到N的阶乘之和，如N为3，则结果是9（1!+2!+3!的值）。选项中的说法正确的是（ ）。\n\n**实现1：**\n\n```cpp\nint i, N;\ncin >> N;\nint tnt = 0, last = 1;\nfor (i = 1; i < N + 1; i++){\n    last *= i;\n    tnt += last;\n}\ncout << tnt << endl;\n```\n\n**实现2：**\n\n```cpp\nint i, N;\ncin >> N;\nint tnt = 0, tmp;\nfor (i = 1; i < N + 1; i++){\n    tmp = 1;\n    for (int j = 1; j < i + 1; j++)\n        tmp *= j;\n    tnt += tmp;\n}\ncout << tnt << endl;\n```",
            options: [
                "虽然实现1的代码短小，但效率并不高",
                "实现2的代码效率更高，且更易于理解",
                "实现1因为应用了前项计算结果，计算量更小，因此效率高",
                "两种实现，效率几乎一致"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [
                4,
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n实现1用last保存上一个阶乘，每轮只乘一次i，总乘法次数N；实现2为每个i从1重新连乘，次数1+2+…+N。实现1复用已算结果、运算量更小，选C。两者在int未溢出的适当范围内给出相同阶乘和，效率比较不能仅依代码长短判断；测试覆盖N=1到12。",
            tags: [
                "循环",
                "算法效率"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "哥德巴赫猜想是指大于2的偶数都可以分解为两个质数之和，下面的代码用于验证4-1000之内的偶数能否分解为两个质数之和。下面C++代码中假设isPrime()是已经定义好用于判断正整数N是否为质数，返回bool值。对该段代码，错误的说法是（ ）。\n\n```cpp\nfor (i = 4; i < 1000; i += 2)\n    for (j = 2; j < i; j++)\n        if (isPrime(j) && isPrime(i-j)){\n            printf(\"%d=%d+%d\\n\", i, j, i-j);\n            break;\n        }\n```",
            options: [
                "将代码 isPrime(j) && isPrime(i-j) 修改为 isPrime(j) == true && isPrime(i-j) == true 效果相同",
                "代码执行后，输出的一对质数，一定是小的数在前",
                "即便将外层循环中i的上界1000修改为很大的整数，也不能说从数学上证明了哥德巴赫猜想",
                "根据题意，break语句应该移到if语句块之外"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n找到满足条件的j后才应break，因此D把break移出if是错误说法。若放在内层循环体但在if之外，将在首次j=2检查后退出，即使失败也不再尝试其他j。j从小到大找第一对，前者不大于后者；显式与true比较不改变bool逻辑，有限范围计算验证也不能替代无限命题的数学证明。",
            tags: [
                "循环控制",
                "质数"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "已知C++代码和执行后的期望输出如下，相关说法正确的是（ ）。\n\n```cpp\nint i, j;\nint last, N;\n\ncout << \"请输入层数N：\";\ncin >> N;\n\nlast = 1;\nfor (i = 1; i < N; i++){\n    for (j = 1; j < i + 1; j++){ // L1\n        if (last > 9)\n            last = 1;\n\n        cout << last << \" \";\n        last += 1;\n    }\n    printf(\"\\n\");\n}\n```\n\n```text\n请输入层数N：10\n1\n2 3\n4 5 6\n7 8 9 1\n2 3 4 5 6\n7 8 9 1 2 3\n4 5 6 7 8 9 1\n2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n```",
            options: [
                "倒数第二行的 printf(\"\\n\") 有错，应该修改为 cout << endl;，printf()函数不能输出换行",
                "last += 1 修改为 last = last + 1 执行效果相同",
                "代码中L1标记行中的 j < i + 1 应修改为 j < i",
                "外层for循环前的 last = 1 修改为 last = 0 执行效果相同"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [
                5,
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\nlast+=1与last=last+1都使变量加1，因此B等价。last从1开始，超过9时回到1，连续填各行；内层j=1到i控制第i行打印i个数。printf可以输出换行，A错误；C改成j<i会少一项，D从0开始则首项改变。N=10时原外层只打印9行，示例首行10是输入回显。",
            tags: [
                "嵌套循环",
                "赋值运算"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "在C++中，（ ）最适合填入横线处连续5次正确生成1到10之间的随机整数？\n\n```cpp\nfor(int i=0; i<5; i++)\n    __________________;\n```",
            options: [
                "rand() % 11",
                "rand() % 10",
                "rand() % 10 + 1",
                "rand() % 9 + 1"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\nrand()非负，rand()%10范围为0到9，加1后为1到10，故C。A包含0且上界10，B缺少10、含0，D只到9。五次循环调用会连续生成五个范围内的值，并不保证互不相同；取模也不能在任意RAND_MAX下保证完全均匀，题目仅考查取值范围。",
            tags: [
                "随机数",
                "取模运算"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "在C++中，如果a和b均为float类型的变量，那么二者如果相差足够小（比如0.000001），就可以视作相等。比如2.2345676和2.2345677就可以视作相等。下列哪个表达式能用来正确判断“a等于b”（ ）。",
            options: [
                "((b-a) < 0.000001)",
                "((b-a) <= 0.000001)",
                "(abs(b-a) <= 0.000001)",
                "(sqrt(b-a) <= 0.000001)"
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [
                6
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n需要同时处理a大于b和b大于a，故使用浮点重载abs求绝对差，再与题设容差0.000001比较，选C。A/B未取绝对值，b-a为很大的负数也会通过；D对负差开方没有实数结果，且开方改变阈值含义。这是题目约定下的近似相等，不能据此把浮点严格相等或所有数量级的容差规则混为一谈。",
            tags: [
                "浮点运算"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "C++、Python都是高级编程语言，它们的每条语句最终都要通过机器指令来完成。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\nC++和Python都是高级编程语言；程序实际运行最终由处理器机器指令完成，题干正确。具体实现可先编译、经中间表示，或由解释器执行，不能理解为每条源码语句都与一条机器指令一一对应；一个高级操作往往需要多条指令才能完成。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在C++代码中，假设N为正整数，则 N - N / 10 * 10 与 N % 10 都将获得N的个位数。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n正整数N满足N=(N/10)*10+N%10，因此N-N/10*10与N%10相同，都得到个位，判断正确。例如123两式都为3。这里乘除在减法之前计算、整数除法丢弃小数部分；若任意把运算对象改成浮点数，不能沿用这个整数取位推理。",
            tags: [
                "数位处理",
                "整数运算"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "C++语句 `cout << ((10 <= N <= 12)? \"true\":\"false\")` 中，假设整型变量N为12，则其输出为true。原因是执行 `10 <= N` 后其值为true，true与12相比仍然是true。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\nN=12时表达式按(10<=N)<=12计算，先得到bool真，在后续比较中提升为整数1，1<=12仍为真，条件运算符选择字符串true输出，判断正确。它并不是把C++的连写比较自动识别为区间；若需通用区间判断，应显式连接两个关系式。",
            tags: [
                "关系运算",
                "程序分析"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "C++表达式 `(sqrt(N) * sqrt(N)) == N` 中的N如果为正整数，则表达式的值为true，相当于开平方后平方是本身。（ ）",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n数学上的平方根与平方互逆，不等于浮点计算保证精确回到原整数。sqrt产生有限精度近似值，乘回去可能略大或略小于N，而==要求精确相等，因此题干的一概保证错误。验证见证使用volatile保存中间根避免把编译优化后的恒等变换当作浮点误差消失；不能用单个平方数成功的例子证明全域正确。",
            tags: [
                "浮点运算",
                "数学函数"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "下面C++执行后将输出 `3*2=6`。（ ）\n\n```cpp\nint a=2, b = 3;\na=a-b;\nb=a+b;\na=b-a;\nprintf(\"%d*%d=%d\\n\", a, b, a*b);\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\na=2、b=3时，依次执行后a=-1，b=2，最后a=3，于是printf输出3*2=6和换行，判断正确。三条赋值采用了前一条更新后的值，不能同时拿初始a、b代入所有右端。此固定小数值没有溢出，不表示加减交换适用于任意有符号整数而无需范围检查。",
            tags: [
                "赋值运算",
                "程序分析"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下面C++代码执行后将输出10。（ ）\n\n```cpp\nint i;\nfor (i = 0; i < 10; i++)\n    continue;\ncout << i << endl;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\nfor令i从0到9逐轮执行continue；continue仍会走迭代表达式i++，最终i增为10，条件不成立退出。i在循环前声明，退出后仍在作用域内，所以输出10和换行，判断正确。不要把continue与break混淆，前者不会提前终止整个循环。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面C++代码执行后将输出1。（ ）\n\n```cpp\nint i;\nfor (i = 1; i < 10; i++){\n    break;\n    continue;\n}\ncout << i << endl;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\ni先赋值1，第一次进入循环就执行break，后面的continue永远无法到达。break使程序直接跳到循环后，也不会再执行i++，所以输出1和换行，判断正确。与continue写在break前面的程序不同，分析时必须按真实语句顺序确定哪条能执行。",
            tags: [
                "循环控制"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下面的C++代码执行后将输出10行\"OK\"。（ ）\n\n```cpp\nfor (int i = 0; i < 5; i++)\n    for(int j = 0; j < i; j++)\n        printf(\"OK\\n\");\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n外层i=0、1、2、3、4时，内层j从0到i-1，执行次数分别0、1、2、3、4，合计10。每次printf含换行，因此共10行OK，判断正确。内层的边界随i改变，不是每轮执行5次；i=5也不会进入外层循环体。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "将下面C++代码中的for循环中的 `i = 1` 调整为 `i = 0` 的输出结果相同。（ ）\n\n```cpp\nint tnt = 0;\nfor (int i = 1; i < 5; i++) // i=1\n    tnt += i;\ncout << tnt;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n原代码把1、2、3、4累加成10；若从i=0开始，只额外加一次0，不影响总和，输出仍10，判断正确。这里累加器已显式置0，不能与未初始化累加器的题混为一谈。循环多一轮不等于数值结果一定改变，应看新增项的具体值。",
            tags: [
                "循环",
                "累加"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "下面C++代码执行后将输出0123。（ ）\n\n```cpp\nfor (i = 0; i < 5; i++)\n    for (i = 0; i < i; i++)\n        continue;\nprintf(\"%d\\n\", i);\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n内外层复用同一个i。内层每次先把i重设0，条件i<i恒假，内层体不执行；然后外层更新使i=1，下一轮又被内层重设0。外层始终无法达到5，所以在i已声明的前提下循环不能终止，末尾printf到不了，题干输出0123错误。见证只做有限步状态追踪，不运行无限循环。",
            tags: [
                "嵌套循环",
                "死循环"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "等差矩阵",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB",
            sourceVerified: true,
            sourcePage: 8,
            sourcePages: [
                8
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "3 4",
                    output: "1 2 3 4\n2 4 6 8\n3 6 9 12"
                }
            ],
            question: "\n# [GESP202503 二级] 等差矩阵\n\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题目描述\n\n小 A 想构造一个 $n$ 行 $m$ 列的矩阵，使得矩阵的每一行与每一列均是等差数列。小 A 发现，在矩阵的第 $i$ 行第 $j$ 列填入整数 $i\\times j$，得到的矩阵能满足要求。你能帮小 A 输出这个矩阵吗？\n\n## 输入格式\n\n一行，两个正整数 $n,m$。\n\n## 输出格式\n\n共 $n$ 行，每行 $m$ 个由空格分割的整数，表示小 A 需要构造的矩阵。\n\n## 样例\n\n### 输入样例 1\n\n```text\n3 4\n```\n\n### 输出样例 1\n\n```text\n1 2 3 4\n2 4 6 8\n3 6 9 12\n```\n\n## 数据范围\n\n对于所有测试点，保证 $1\\le n\\le50$，$1\\le m\\le50$。\n",
            score: 25,
            explanation: "**解析**\n\n第i行填i、2i、3i等，同行相邻差为i；第j列填j、2j、3j等，同列相邻差为j，故i*j构造满足要求。两层循环输出n*m项，每行最后一项后换行，其余项后一个空格，不能多末尾空格。n,m<=50，最大乘积2500，int足够。复杂度O(nm)时间、O(1)额外空间。现有参考程序保留，使用逐行重复加行号构造独立预言机检查边界与随机尺寸。",
            tags: [
                "编程题",
                "构造",
                "嵌套循环"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <bits/stdc++.h>\n#include <cassert>\n\nusing namespace std;\n\nint n, m;\n\nint main() {\n    scanf(\"%d%d\", &n, &m);\n    assert(1 <= n && n <= 50 && 1 <= m && m <= 50);\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j <= m; j++)\n            printf(\"%d%c\", i * j, \" \\n\"[j == m]);\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "时间跨越",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷输入格式称五个输入均为“正整数”，但数据范围允许小时 h=0；输出格式又称输出四个“正整数”，但结果小时 h' 也可以为 0，且原卷样例输出正是 2008 2 29 0。题库保留原文、样例和参考程序，不把 0 暗改为正数，并将本题从评分排除。",
            samples: [
                {
                    input: "2008\n2\n28\n23\n1",
                    output: "2008 2 29 0"
                }
            ],
            question: "\n# [GESP202503 二级] 时间跨越\n\n- **试题名称**：时间跨越\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n\n## 题面描述\n\n假设现在是 $y$ 年 $m$ 月 $d$ 日 $h$ 时而 $k$ 小时后是 $y'$ 年 $m'$ 月 $d'$ 日 $h'$ 时，对于给定的 $y,m,d,h,k$，小杨想请你帮他计算出对应的 $y',m',d',h'$ 是多少。\n\n## 输入格式\n\n输入包含五行，每行一个正整数，分别代表 $y,m,d,h,k$。\n\n## 输出格式\n\n输出四个正整数，代表 $y',m',d',h'$。\n\n## 样例\n\n### 输入样例 1\n\n```text\n2008\n2\n28\n23\n1\n```\n\n### 输出样例 1\n\n```text\n2008 2 29 0\n```\n\n## 数据范围\n\n对于全部数据，保证有 $2000\\le y\\le3000$，$1\\le m\\le12$，$1\\le d\\le31$，$0\\le h\\le23$，$1\\le k\\le24$。数据保证为合法时间。\n\n## 提示\n\n闰年判断规则：\n\n- 普通闰年：年份能被 4 整除，但不能被 100 整除。\n- 世纪闰年：年份能被 400 整除。\n\n满足以上任意一条规则的年份就是闰年，否则是平年。\n",
            score: 25,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷输入格式称五个输入均为“正整数”，但数据范围允许小时 h=0；输出格式又称输出四个“正整数”，但结果小时 h' 也可以为 0，且原卷样例输出正是 2008 2 29 0。题库保留原文、样例和参考程序，不把 0 暗改为正数，并将本题从评分排除。 参考程序仍按原数据范围处理小时0，不用修改原文掩盖矛盾。先h+=k；h<=23且k<=24，和不超过47，最多跨一天，所以if减24一次足够。再依据原年、月天数进位，12月后跨年；样例2008-2-28 23时后1小时得到闰日0时。复杂度O(1)。保留现有参考程序，用独立UTC时间轴预言机验证月末、闰年/世纪、k=24、小时0和输入年3000跨到3001；不以程序运行正确清除原卷措辞隔离。",
            tags: [
                "编程题",
                "日期计算",
                "条件分支"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int y, m, d, h, k;\n    cin >> y >> m >> d >> h >> k;\n    h += k;\n    if (h >= 24) {\n        h -= 24;\n        d += 1;\n        int days = 0;\n        if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {\n            days = 31;\n        } else if (m == 4 || m == 6 || m == 9 || m == 11) {\n            days = 30;\n        } else if (m == 2) {\n            if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) {\n                days = 29;\n            } else {\n                days = 28;\n            }\n        }\n        if (d > days) {\n            d -= days;\n            m += 1;\n            if (m > 12) {\n                m = 1;\n                y += 1;\n            }\n        }\n    }\n    cout << y << \" \" << m << \" \" << d << \" \" << h << \"\\n\";\n\n    return 0;\n}"
        }
    ]
};
