// 2024-12-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-12-l2",
    title: "2024年12月 GESP C++ 二级真题",
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    note: "年度收官",
    timeLimit: 5400,
    source: {
        officialPdf: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "archived-official",
        notes: "题面、代码、选项、答案表、图示、编程题样例、约束与参考程序均按 CCF GESP 原卷 PDF 逐页转录；Q11 的原卷多答案缺陷已结构化标记。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf"
    },
    reviewStatus: "partial",
    reviewScope: "AI-Codex对照mirror PDF全卷五维核验，保留Q11原卷疑点隔离，卷级partial。",
    reviewedBy: "AI-Codex",
    reviewedAt: "2026-11-06",
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照10页mirror PDF，Git blob SHA f505006a74be63923199aeac00252fea821a7eff一致；答案表逐项一致，全部answer保持。Q11既有官方源缺陷继续隔离；恢复原printf个位乘积后两个空格，重写27题解析，纠正未初始化、单位、bool及上界说明，两份参考程序保持且独立编译运行。",
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
            question: "2024年10月8日，诺贝尔物理学奖“意外地”颁给了两位计算机科学家约翰·霍普菲尔德（John J. Hopfield）和杰弗里·辛顿（Geoffrey E. Hinton）。这两位科学家的主要研究方向是（ ）。",
            options: [
                "天体物理",
                "流体力学",
                "人工智能",
                "量子理论"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n本题按2024年12月mirror PDF第1页答案表选C。题干给出的两位科学家相关工作属于人工神经网络和机器学习，归入人工智能方向；天体物理、流体力学和量子理论均不是本题所指研究方向。判断应依据研究内容，不能仅凭“物理学奖”名称选择物理分支。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "计算机系统中存储的基本单位用B来表示，它代表的是（ ），比如某个照片大小为3MB。",
            options: [
                "Byte",
                "Block",
                "Bulk",
                "Bit"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n大写B代表Byte，即字节，故A。小写b通常表示bit，比特是二进制位；常见计算机中一字节为8位。Block是块，不是这里B的含义；Bulk也不是该容量单位。本题只问B的含义，不需要擅自约定MB按1000还是1024换算，更不能由3MB推断唯一的KB数值。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "C++语句 `cout << (3 + 3 % 3 * 2 - 1)` 执行后输出的值是（ ）。",
            options: [
                "-1",
                "4",
                "56",
                "2"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n先按优先级计算取余和乘法：3%3=0，0*2=0，然后3+0-1=2，所以选D。%和*同级且左结合，加减后算。其余三个选项均不等于该式的值；不应编造某种错误计算一定会得到56或4来解释干扰项，按真实求值顺序即可排除。",
            tags: [
                "算术运算",
                "运算符优先级"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面C++代码执行后其输出是（ ）。\n```cpp\nfor (int i=0; i<10; i++)\n    printf(\"%d\",i);\n```",
            options: [
                "123456789",
                "0123456789",
                "12345678910",
                "012345678910"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [
                1,
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\nfor循环中i从0开始，条件i<10使循环体仅在0到9时执行；每轮printf的%d直接打印i，不含空格、逗号或换行。拼接得到0123456789，选B。i增到10才因条件为假退出，不能把用于终止判断的10也算进输出。",
            tags: [
                "程序分析",
                "循环",
                "输入输出"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面C++代码的相关说法中，正确的是（ ）。\n```cpp\nint tnt;\nfor (int i=0; i<10; i++)\n    tnt += i;\ncout << tnt;\n```",
            options: [
                "上述代码执行后其输出相当于求1-10的和（包含10）",
                "上述代码执行后其输出相当于求1-10的和（不包含10）",
                "上述代码执行后其输出相当于求0-10的和（不包含10）",
                "上述代码执行后将输出不确定的值"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n局部int tnt没有初始化，第一次tnt+=i就读取不确定值，在C++17中是未定义行为。官方D的“不确定的值”用于表示结果无保证，不能进一步声称一定等于某个固定垃圾值加45，也不能保证程序总会打印一个整数。若显式初始化为0，循环才会求0到9之和45；原程序不满足此前提。",
            tags: [
                "变量初始化",
                "未定义行为"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面C++代码执行后输出是（ ）。\n```cpp\nint i;\nfor (i=1; i<10; i++)\n    if (i % 2)\n        continue;\n    else\n        break;\ncout << i;\n```",
            options: [
                "1",
                "2",
                "9",
                "10"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [
                2
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\ni=1时i%2为1，执行continue，随后仍会执行for的i++；i变为2后，i%2为0进入else并break。循环在i=2时提前结束，输出2，选B。continue只结束当前一轮，break才退出当前循环，不能把它们都理解为直接跳到最终输出。",
            tags: [
                "循环控制",
                "程序分析"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nfor (i=0; i<10; i++){\n    if (i % 3)\n        continue;\n    printf(\"0#\");\n}\nif(i>=10)\n    printf(\"1#\");\n```",
            options: [
                "0#0#0#0#0#0#0#1#",
                "0#0#0#0#0#0#1#",
                "0#0#0#0#1#",
                "0#0#0#0#"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n按代码片段中i为已声明整型变量理解，i=0、3、6、9时余数为0，不执行continue，各输出0#；其余六轮跳过printf。循环自然结束时i=10，外部if(i>=10)又输出1#，连成0#0#0#0#1#，故C。原片段未重复给出i声明，运行见证在外围补声明，不改题面。",
            tags: [
                "循环控制",
                "程序分析"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面C++代码用于输出0-100之前（包含100）能被7整除但不能被3整除的数，横线处不能填入的代码是（ ）。\n```cpp\nfor (i=0; i<100; i++)\n    if(_____________)\n        cout << i << endl;\n```",
            options: [
                "i % 7 == 0 && i % 3 != 0",
                "!(i % 7) && i % 3 != 0",
                "i % 7 && i % 3",
                "i % 7 == 0 && !(i % 3 == 0)"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\n能被7整除是i%7==0或!(i%7)，不能被3整除是i%3!=0或!(i%3==0)，A/B/D等价。C在i%7非零时才为真，反而排除了7等目标数，故不能填C。原循环上界i<100虽不含100，但100本来不被7整除，不改变筛选结果；运行见证在外围声明i。",
            tags: [
                "逻辑运算",
                "取模运算"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面C++代码用于求正整数各位数字之和，横线处不应填入代码是（ ）。\n```cpp\nint tnt, N;\nprintf(\"请输入正整数：\");\ncin >> N;\ntnt = 0;\nwhile (N != 0){\n    ________________\n    N /= 10;\n}\ncout <<tnt;\n```",
            options: [
                "tnt = tnt + N % 10",
                "tnt += N % 10",
                "tnt = N % 10 + tnt",
                "tnt = N % 10"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\nA/B/C均在旧tnt基础上加当前个位，D每轮直接覆盖，最后只保留最高位，故D不应填入。以12为例，D依次赋2、1，最后输出1而非3。原空格与选项均未写结尾分号，见证按完整赋值语句补分号来检查算法，保留题面原填空格式；程序还先输出请输入正整数的提示。",
            tags: [
                "程序分析",
                "数位处理"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下图的C++程序执行后的输出是（ ）。\n```cpp\nfor (i=0; i<5; i++)\n    for (j=0; j<i; j++)\n        cout <<j;\n```",
            options: [
                "0010120123",
                "01012012301234",
                "001012012301234",
                "01012012301234012345"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 A**\n\n外层i=0时内层不执行，i=1、2、3、4时分别输出0、01、012、0123；代码没有分隔空格和换行，依次拼接为0010120123，选A。运行时在外围声明i、j。不要把每轮输出写成1到i，也不能把i=5这一不满足条件的取值算进去。",
            tags: [
                "嵌套循环",
                "程序分析"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面C++代码用于实现图示的九九乘法表。相关说法错误的是（ ）。\n```cpp\n/*\n1*1=1\n1*2=2  2*2=4\n1*3=3  2*3=6  3*3=9\n1*4=4  2*4=8  3*4=12  4*4=16\n1*5=5  2*5=10  3*5=15  4*5=20  5*5=25\n1*6=6  2*6=12  3*6=18  4*6=24  5*6=30  6*6=36\n1*7=7  2*7=14  3*7=21  4*7=28  5*7=35  6*7=42  7*7=49\n1*8=8  2*8=16  3*8=24  4*8=32  5*8=40  6*8=48  7*8=56  8*8=64\n1*9=9  2*9=18  3*9=27  4*9=36  5*9=45  6*9=54  7*9=63  8*9=72  9*9=81\n*/\nfor (int Hang=1; Hang<10; Hang++){\n    for (int Lie=1; Lie<Hang+1; Lie++){\n        if (Lie * Hang > 9)\n            printf(\"%d*%d=%d \", Lie, Hang, Lie*Hang);\n        else\n            printf(\"%d*%d=%d  \", Lie, Hang, Lie*Hang);\n        // L2\n    }\n    printf(\"\\n\"); // L1\n}\n```",
            options: [
                "将L1注释的 printf(\"\\n\") 移到L2注释所在行，效果相同",
                "将L1注释的 printf(\"\\n\") 修改为 print(\"%c\", '\\n') 效果相同",
                "将 Lie * Hang > 9 修改为 Lie * Hang >= 10 效果相同",
                "将 Lie * Hang > 9 修改为 Hang * Lie > 9 效果相同"
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [
                3,
                4
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            sourceIntegrity: "official-source-defect",
            integrityNote: "原卷选项 B 将 printf(\"%c\", '\\n') 印成不存在的 print(\"%c\", '\\n')。因此 A、B 两项所称的“效果相同”都不成立，与单选题官方答案仅取 A 的设定冲突。题库保留原文和官方答案，但将本题从评分排除。",
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷选项 B 将 printf(\"%c\", '\\n') 印成不存在的 print(\"%c\", '\\n')。因此 A、B 两项所称的“效果相同”都不成立，与单选题官方答案仅取 A 的设定冲突。题库保留原文和官方答案，但将本题从评分排除。 A把每行换行移进内层会让每个算式单独一行，显然改变布局；B原文print不是标准printf，替换后不能编译。C的乘积>9与>=10对整数等价，D只是交换整数乘法两因子。恢复原代码个位乘积后两个空格，不把B默改成printf消除已有隔离。",
            tags: [
                "嵌套循环",
                "格式化输出"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "在数学中N!表示N的阶乘，即1到N的乘积，如 3!=1*2*3。下面的C++用于求1-N的阶乘之和，如N为3，则是 1!+2!+3!。下面代码段补充选项后用于实现上述功能，其中不能实现阶乘和的选项是（ ）。\n```cpp\nint N;\ncin >> N;\nint tnt=0, nowNum = 1; //tnt保存求和之值，当前N的阶乘\nfor (int i=1; i < N + 1; i++){\n    ______________ // 基于上一个计算出当前数的阶乘\n    ______________ // 从1到i每个数阶乘之和\n}\ncout << tnt;\n```",
            options: [
                "nowNum *= i; tnt += nowNum;",
                "nowNum = nowNum * i; tnt = tnt + nowNum;",
                "nowNum *= i; tnt = nowNum + tnt;",
                "nowNum = nowNum + i; tnt *= nowNum;"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\n以nowNum初值1为基础，每轮乘i得到i!，再把它累加进tnt，A/B/C只是乘法赋值和加法顺序的等价写法。D把乘法改成加法，还用初值0的tnt相乘，结果始终0，故D不能实现目标。例N=3应为1+2+6=9。原代码使用int，阶乘和需在可表示范围内讨论，测试覆盖N=1到12。",
            tags: [
                "循环",
                "累乘累加"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面C++代码用于输出N和M之间（可以包括N和M）的孪生素数。孪生素数是指间隔为2的两个数均为素数，如11和13分别是素数，且间隔为2。isPrime(N)用于判断N是否为素数的函数。为完成上述功能，横线处应填上的代码是（ ）。\n```cpp\nint N,M;\n//本题假设N小于M\ncin >> N >> M;\nfor (int i = N; i < __________; i++)\n    if (isPrime(i) && isPrime(i + 2))\n        printf(\"%d %d\\n\",i, i + 2);\n```",
            options: [
                "M - 2",
                "M - 1",
                "M",
                "M + 1"
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [
                5
            ],
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 B**\n\n要求一对数i、i+2都位于含端点区间[N,M]，所以i+2<=M，即i<=M-2。循环写成严格小于时上界应为M-1，选B。A写M-2会漏掉恰好以M结尾的孪生素数；C/D可能让第二个素数越过M。isPrime由题面假设提供，运行见证给出独立试除实现。",
            tags: [
                "循环边界",
                "质数"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面C++代码实现输出如下图形，横线应填入的代码是（ ）。\n```cpp\n/*\n高度:5\n    *\n   ***\n  *****\n *******\n*********\n*/\nint height;\ncout << \"高度: \";\n//获取用户输入的高度\ncin >> height;\nfor (i=0; i<height; i++){\n    //打印每行前面的空格\n    for (j = 0; j < _______________; j++)\n        cout << \" \";\n    //打印每行的星号\n    for (k = 0; k < _______________; k++)\n        cout << \"*\";\n    //输出一行后，换行\n    cout << endl;\n}\n```",
            options: [
                "height - i, 2 * i",
                "height, 2 * i",
                "height - i, 2 * i + 1",
                "height - i - 1, 2 * i + 1"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 D**\n\ni从0开始，第i行要输出height-i-1个前导空格、2*i+1个星号，故选D。height=5时空格数依次4、3、2、1、0，星号数1、3、5、7、9，与图一致。A/B星号首行是0，C比目标每行多一个空格；运行时外围声明i、j、k，保留原高度提示及逐行换行。",
            tags: [
                "图形绘制",
                "嵌套循环"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面C++代码执行后的输出是30，则横线处不能填入（ ）。\n```cpp\nint a=10,b=20,c=30;\ncout << _____________________ << endl;\ncout << endl;\n```",
            options: [
                "max(max(a, b), c)",
                "min(a+b, c)",
                "sqrt(a+b+c)",
                "(a+b+c)/2"
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**答案 C**\n\na=10、b=20、c=30。A为三者最大值30，B为min(30,30)=30，D为60/2=30；C为sqrt(60)，介于7和8，不能输出30，所以选C。原代码还有单独cout<<endl，实际各选项输出后留一空行，选择关注的是数值，不能把sqrt误当成除以2。",
            tags: [
                "数学函数"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在Windows的资源管理器中为已有文件A建立副本的操作是Ctrl+C，然后Ctrl+V。",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n按题意选中已有文件后Ctrl+C复制、再Ctrl+V粘贴，可生成文件副本，故正确。Ctrl+X剪切后粘贴通常用于移动，是不同操作。解释只需说明复制与粘贴的作用；不能无条件保证在任何目录中反复粘贴都必定增加一个新副本，重名、目标路径等也会影响实际操作。",
            tags: [
                "操作系统"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在C++代码中，假设N为正整数，则 `cout << (N - N / 10 * 10)` 将获得N的个位数。",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n对正整数N，整数除法N/10去掉个位，再乘10相当于把个位换成0，N减去它得到个位，故正确。等价恒等式是N=(N/10)*10+N%10。例如N=123，123-12*10=3。乘除优先于减法，且乘除左结合，不是先把10*10作为除数。",
            tags: [
                "数位处理",
                "整数运算"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "在C++语句 `cout << (10 <= N <= 12)` 中，假设N为12，则其输出为1。",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n关系运算符左结合，表达式按(10<=N)<=12计算。N=12时先得到bool真，提升后按1<=12比较，再得bool真；普通cout未设置boolalpha时打印1，故正确。结果类型是bool而非int。该式不能一般地表达10到12的区间，区间判断应写10<=N&&N<=12。",
            tags: [
                "关系运算",
                "程序分析"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "如果C++表达式 `int(sqrt(N))*int(sqrt(N)) == N` 的值为True，则说明N为完全平方数，如4、9、25等。",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n在开方、整数转换及乘法均有定义的前提下，令k=int(sqrt(N))，若k*k==N为真，就存在整数k使N等于其平方，因此N是完全平方数，故正确。这里只断言表达式为真时的结论，没有说任何类型、负数、越界转换都可以安全计算。例25得到5²=25，8得到2²不等于8。",
            tags: [
                "数学函数",
                "类型转换"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "下面C++代码执行后将输出2*3=6。\n```cpp\nint a = 2, b = 3;\nprintf(\"%%a*%%b=%d\",a*b);\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\nprintf格式串中%%输出一个字面百分号，紧接的字母a、b照原样输出，只有%d对应整数乘积2*3=6。因此实际内容为%a*%b=6，不是2*3=6，判断错误。双引号内的变量名字不会自动替换为变量的值，必须通过有效格式说明与实参建立对应关系。",
            tags: [
                "输入输出",
                "printf格式化"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "以下C++代码因为循环变量为 _ 将导致错误，即不能作为变量名称，不符合C++变量命名规范。\n```cpp\nfor (int _ = 0; _ < 10; _++)\n    continue;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\n本题_是for语句内部的局部变量名，单下划线是合法标识符，不是关键字，也不含双下划线或下划线接大写字母等保留模式；代码可编译，所以题干错误。仍应区分作用域：全局命名空间以下划线开头的名称有实现保留规则，不能把本题推广为任意位置都可随意命名。",
            tags: [
                "标识符",
                "变量命名"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面C++代码执行后因为有break，将输出0。\n```cpp\nint i;\nfor (i = 0; i < 10; i++){\n    continue;\n    break;\n}\ncout << i;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 错误**\n\ncontinue先执行，跳过本轮剩余语句，后面的break始终无法到达。每轮仍执行for的i++，i从0递增到10后才因i<10为假结束，最终输出10而非0，判断错误。是否出现break文字不决定循环是否提前终止，要检查控制流实际能否执行到它。",
            tags: [
                "循环控制",
                "程序分析"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下面的C++代码执行后将输出18行“OK”。\n```cpp\nint i,j;\nfor (i = 8; i > 2; i-=2)\n    for (j =0; j < i; j++)\n        printf(\"OK\\n\");\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n外层i依次为8、6、4，i=2时不满足i>2而停止；每一轮内层j从0到i-1，分别执行8、6、4次，共18次。printf的字符串末尾含换行，所以确为18行OK，判断正确。既不能只按外层3轮计数，也不能把终止值2的一轮加进去。",
            tags: [
                "嵌套循环",
                "程序分析"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "将下面C++代码中的 i = 1 调整为 i = 0 的输出结果相同。\n```cpp\nint i;\nint cnt = 0;\nfor (i = 1; i < 5; i++)\n    if(i%2) cnt += 1;\ncout << cnt;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n原来i=1到4，仅奇数1、3使i%2为真，cnt最终为2。改成i=0后只多出0这一轮，0%2为0，不增加计数，其余各轮一样，因此输出不变，判断正确。比较两段循环应比较新增那轮的实际效果，不能仅因总轮数不同就断定结果不同。",
            tags: [
                "循环",
                "奇偶判断"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "下面两段C++代码都是用于求1-10的和，其运行结果相同。通常说来，for循环都可以用while循环实现。\n```cpp\nint tnt;\nint i;\ntnt = 0;\nfor (i = 1; i < 10 + 1; i++)\n    tnt += i;\ncout << tnt << endl;\n```\n```cpp\nint tnt;\nint i;\ntnt = 0;\ni = 1;\nwhile (i <= 10){\n    tnt += i;\n    i += 1;\n}\ncout << tnt << endl;\n```",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            explanation: "**判断 正确**\n\n两段都先把tnt置0，再把i=1到10全部加进去，均输出55和换行，判断正确。for与while可以相互实现，但机械改写为循环体后追加更新语句时，必须另行处理continue：原for的continue仍执行更新，while体中则可能跳过末尾更新；本题两段没有该问题。",
            tags: [
                "循环",
                "循环等价"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "寻找数字",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "3\n16\n81\n10",
                    output: "2\n3\n-1"
                }
            ],
            question: "\n# [GESP202412 二级] 寻找数字\n- **试题名称**：寻找数字\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n## 题面描述\n小杨有一个正整数 $a$，小杨想知道是否存在一个正整数 $b$ 满足 $a=b^4$。\n## 输入格式\n第一行包含一个正整数 $t$，代表测试数据组数。\n对于每组测试数据，第一行包含一个正整数代表 $a$。\n## 输出格式\n对于每组测试数据，如果存在满足条件的正整数 $b$，则输出 $b$，否则输出 $-1$。\n## 样例\n### 输入样例 1\n```text\n3\n16\n81\n10\n```\n### 输出样例 1\n```text\n2\n3\n-1\n```\n## 数据范围\n对于全部数据，保证有 $1\\le t\\le 10^5$，$1\\le a\\le 10^8$。\n",
            score: 25,
            explanation: "**解析**\n\n由a<=10^8知若a=b^4，则1<=b<=100。原卷参考程序连续两次sqrt取得候选b，再用整数b*b*b*b==a回代检验，匹配时输出b，否则-1；中间乘积不超过10^8，int安全。样例16、81、10分别输出2、3、-1。保留参考程序，独立预生成1..100的精确四次方表核对所有四次方、相邻数、小范围穷举、随机数及t=100000，避免仅依靠同一种开方算法当预言机。每组固定次数计算，总时间O(t)，额外空间O(1)。",
            tags: [
                "编程题",
                "数学",
                "开方"
            ],
            template: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        int a;\n        cin >> a;\n        int b = (int)(sqrt(sqrt(a)));\n        if (b * b * b * b == a) {\n            cout << b << endl;\n        } else {\n            cout << -1 << endl;\n        }\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "数位和",
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
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
            samples: [
                {
                    input: "3\n16\n81\n10",
                    output: "9"
                }
            ],
            question: "\n# [GESP202412 二级] 数位和\n- **试题名称**：数位和\n- **时间限制**：1.0 s\n- **内存限制**：512.0 MB\n## 题面描述\n小杨有 $n$ 个正整数，小杨想知道这些正整数的数位和中最大值是多少。\n“数位和”指的是一个数字中所有数位的和。例如：\n对于数字 $12345$，它的各个数位分别是 $1,2,3,4,5$。将这些数位相加，得到：\n$$1+2+3+4+5=15$$\n因此，$12345$ 的数位和是 $15$。\n## 输入格式\n第一行包含一个正整数 $n$，代表正整数个数。\n之后 $n$ 行，每行包含一个正整数。\n## 输出格式\n输出这些正整数的数位和的最大值。\n## 样例\n### 输入样例 1\n```text\n3\n16\n81\n10\n```\n### 输出样例 1\n```text\n9\n```\n## 数据范围\n对于全部数据，保证有 $1\\le n\\le 10^5$，每个正整数不超过 $10^{12}$。\n",
            score: 25,
            explanation: "**解析**\n\n每轮用long long读入正整数，smu先置0，再反复取tmp%10累加并tmp/=10去位；与全局最大值x比较，最终输出最大的数位和。样例16、81、10的和为7、9、1，最大9。输入可达10^12，不能用32位int读取；合法域真正最大数位和是999999999999的108，10^12本身和为1，累加器int足够。算法O(n log a)时间、O(1)额外空间。保留原参考程序，使用字符串求和检查边界与n上界。",
            tags: [
                "编程题",
                "数位处理",
                "统计"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n#define ll long long\nint main() {\n    int n;\n    cin >> n;\n    int x = 0;\n    for (int i = 0; i < n; i++) {\n        int smu = 0;\n        ll tmp;\n        cin >> tmp;\n        while (tmp > 0) {\n            smu += tmp % 10;\n            tmp /= 10;\n        }\n        x = max(x, smu);\n    }\n    cout << x << endl;\n    return 0;\n}"
        }
    ]
};
