// 2023-12-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-12-l2",
    title: "2023年12月 GESP C++ 二级真题",
    level: 2,
    year: 2023,
    month: 12,
    session: 4,
    note: "年度收官",
    timeLimit: 5400,
    source: {
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex对照登记mirror PDF全部9页文本与渲染，Git blob SHA 8cf4f4b60e3aefc4a755a2ca3b6ea19cae80c446一致。25题answer保持，Q11与Q15单选不唯一隔离。恢复原题代码与m<=1000000范围，参考程序和模板另行GNU C++17编译运行。",
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
            question: "以下不可以做为 C++ 变量的是（ ）。",
            options: [
                "FiveStar",
                "fiveStar",
                "5Star",
                "Star5"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nC++标识符不能以数字开头，所以5Star不能作为变量名，选C。FiveStar、fiveStar和Star5都以字母开头，且不属于关键字，是合法名称。大小写敏感意味着前两个名称是不同标识符，数字可以出现在首字符之后。题目问变量名称是否合法，不涉及变量尚未声明或是否已经赋值。",
            sourceVerified: true,
            sourcePage: 1,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "在 C++ 中，与 for(int i = 10; i < 20; i += 2) cout << i; 输出结果相同的是（ ）。",
            options: [
                "for(int i = 10; i < 19; i += 2) cout << i;",
                "for(int i = 11; i < 19; i += 2) cout << i;",
                "for(int i = 10; i < 21; i += 2) cout << i;",
                "以上均不对"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n原循环i取10、12、14、16、18，连续输出为1012141618。A的上界改成i<19，仍保留相同五个偶数，因此选A。B从11开始，输出奇数11、13、15、17。C允许i=20参与输出，比原程序多一个20。循环是否等价应核对实际取值集合，不能只比较上界数字是否相同。",
            tags: [
                "循环"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "以下 C++ 代码实现从小到大的顺序输出能整除 N 的数（N 的因子），例如 N=18 时输出 1 2 3 6 9 18，横线处应填入（ ）。\n```cpp\ncin >> N;\nfor (________)\n    if (N % i == 0)\n        cout << i << \" \";\n```",
            options: [
                "int i = 0; i < N; i++",
                "int i = 1; i < N; i++",
                "int i = 0; i < N+1; i++",
                "int i = 1; i < N+1; i++"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n应从1递增到N并包含N自身，所以选择D的int i=1;i<N+1;i++。A、C从0开始，第一次N%i的除数为0，不能正常求余。B虽然避开0，但i<N漏掉N本身。N=18时，D按升序输出1、2、3、6、9、18，每个因子后按原格式还有一个空格。",
            sourceVerified: true,
            sourcePage: 1,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面 C++ 代码用于判断输入的整数是否为对称数，如 1221、12321 是对称数，但 123、972 不是对称数。下面对该题对应代码的说法，正确的是（ ）。\n```cpp\ncin >> N;\nnewNum = 0;\nwhile(N){\n    newNum = newNum * 10 + N % 10;\n    N = N / 10;\n}\nif(newNum == N)\n    cout << N << \"为对称数\";\n```",
            options: [
                "代码没有语法错误，如果 N 为对称数，第 8 行将能正确输出。",
                "代码没有语法错误，但如果 N 为负数，将导致死循环。",
                "代码存在语法错误，程序不能被执行。",
                "代码没有语法错误，但不能达到预期目标，因为循环结束 N 总为 0。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n循环通过取个位并除以10反转数字，但不断改变N。正常终止时N已经为0，最后比较newNum==N并未与原输入比较，因此不能判断一般对称数，选D。整数负数除以10也向零收缩，不会仅因负数就死循环。这里应按已声明且计算可表示的代码片段情境分析，实际修复需先保存原数。",
            sourceVerified: true,
            sourcePage: 2,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面 C++ 代码用于判断 N（大于等于 2 的正整数）是否为质数（素数）。下面对如下代码的说法，正确的是（ ）。\n```cpp\ncin >> N;\nfor(i = 2; i < N/2; i++)\n    if(N % i == 0){\n        cout << N << \" 不是质数\";\n        break;\n    }\nif(i >= N/2)\n    cout << N << \" 是质数\";\n```",
            options: [
                "代码能正确判断 N 是否为质数。",
                "代码总是不能判断 N 是否质数。",
                "删除第 5 行 break，将能正确判断 N 是否质数。",
                "代码存在漏洞，边界存在问题，应将第 2 行和第 7 行的 N / 2 改为 N / 2 + 1。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n原程序只检查i<N/2，漏掉边界因子。例如N=4时不进入循环，却输出是质数。把循环上界和最后比较中的N/2都改为N/2+1，可覆盖该因子并区分break退出与正常结束，所以选D。删除break可能继续并错误再输出质数。程序能处理一些输入，不能说总是无法判断。",
            sourceVerified: true,
            sourcePage: 2,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nN = 4;\nfor(int i = 0; i < N; i++) {\n    for(int j = 1; j < i; j++)\n        if (i * j % 2 == 0)\n            cout << i << \"#\";\n    continue;\n}\ncout << \"0\";\n```",
            options: [
                "2#3#0",
                "1#2#0",
                "1#0#",
                "2#3#"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nN=4，外层i为0、1、2、3。前两轮内层为空，i=2时j=1使乘积为偶数，输出2#。i=3时j=1不输出，j=2输出3#。continue位于外层循环体末尾，随后仍执行外层更新，不会提前结束整个循环。循环之后输出0，完整为2#3#0，选A。",
            sourceVerified: true,
            sourcePage: 2,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\ncnt = 0;\nfor(i = 1; i < 10; i++)\n    for(j = 1; j < i; j += 2)\n        if (i * j % 2 == 0) {\n            cnt++;\n            break;\n        }\nif(i>=10) cout << cnt << \"#\";\ncout << cnt ;\n```",
            options: [
                "0",
                "8#8",
                "4",
                "4#4"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\ni依次从1到9。偶数i=2、4、6、8时，内层第一个j=1便满足偶数乘积，cnt加1并break。奇数i与内层奇数j相乘始终为奇数，不增加cnt。最终cnt=4，外层正常结束时i=10，先输出4#再输出4，得到4#4，选D。break只退出内层，不能把它当成外层结束。",
            sourceVerified: true,
            sourcePage: 3,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nN=100;\nwhile (N > 0)\n    if (N % 2)\n        break;\n    else if (N % 3 == 0)\n        N -= 5;\n    else\n        N -= 20;\ncout << N;\n```",
            options: [
                "100",
                "95",
                "55",
                "0"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nN先为100，偶数且不能被3整除，减20得到80，再减20得到60。60能被3整除，所以减5得到55。55为奇数，下一轮立即break，输出55，选C。if、else if、else属于同一条选择链，每轮只执行其中一个分支，不能在减5后立刻又执行减20。",
            sourceVerified: true,
            sourcePage: 3,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nx = 1;\nwhile (x<100){\n    if (x % 3 != 0)\n        cout << x << \",\";\n    else if (x / 10)\n        break;\n    else\n        x+=5;\n    x += 2;\n}\ncout << x;\n```",
            options: [
                "1",
                "1,3",
                "15,17",
                "1,10,12"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nx=1时输出1,并加2到3。x=3能被3整除且x/10为0，走else先加5再加2，到10。x=10输出10,后变为12。x=12能被3整除且x/10非零，break使本轮不再加2，循环后输出12。完整结果为1,10,12，选D。需要同时追踪分支内与分支后的两处更新。",
            sourceVerified: true,
            sourcePage: 3,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\ncnt = 0;\nfor (i=0; i<5; i++)\n    for (j=0; j<i; j++)\n        cnt += 1;\ncout << cnt;\n```",
            options: [
                "5",
                "10",
                "20",
                "30"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n外层i从0到4，内层j从0到i-1，各轮执行次数分别为0、1、2、3、4，cnt累计为10，选B。i=0时内层初始条件0<0为假，不能算成一次。没有花括号时，两个for仍按语法嵌套，cnt+=1是最内层循环体，最后cout仅在所有循环结束后执行。",
            sourceVerified: true,
            sourcePage: 4,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "以下C++代码用于输出1-100（含）的整数平方数（完全平方数），如16是4的平方，横线处应填写（ ）。\n\n```cpp\nfor (i = 1; i < 100 + 1; i++)\n    if (____________)\n        cout << i << \" \";\n```",
            options: [
                "int(sqrt(i)) * int(sqrt(i)) = i",
                "int(sqrt(i)) == sqrt(i)",
                "int(sqrt(i)) * int(sqrt(i)) == i",
                "int(sqrt(i)) = sqrt(i)"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。原卷给C，answer=2保持。C先截取平方根整数部分，再平方与i比较，可筛出完全平方数。但B直接比较截取后的平方根与原平方根，在本题1..100及本轮GNU C++17环境中也准确筛出1、4、9、16、25、36、49、64、81、100。两个选项完整域编译运行结果相同，单选不唯一。A、D试图给临时数值赋值，不能编译。登记源疑点并暂停计分。",
            tags: [
                "数学函数"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p4的B和C在1..100上都能筛出完全平方数，答案表给C。保持answer=2，暂停计分并等待单选唯一性澄清。"
        },
        {
            id: 12,
            type: "single",
            question: "下面的C++代码用于实现原图所示的效果，应在代码中填入（ ）。原图先输入12，实际输出如下，首行输入值不属于程序输出。\n```text\n0\n01\n012\n0123\n01234\n012345\n0123456\n01234567\n012345678\n0123456789\n01234567890\n012345678901\n```\n\n```cpp\ncin >> N;\nfor (i = 0; i < N; i++) {\n    nowNum = 0;\n    for (j = 0; j < i + 1; j++) {\n        cout << nowNum << \"\";\n        nowNum += 1;\n        if (nowNum == 10)\n            nowNum = 0;\n    }\n}\n```",
            options: [
                "与第 8 行下面填入一行：cout << nowNum;",
                "与第 2 行下面填入一行：cout << endl;",
                "与第 7 行下面填入一行：cout << nowNum;",
                "与第 9 行下面填入一行：cout << endl;"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n内层循环逐个输出当前数字，并把10回绕为0。每一行完成后要换行，因此应在第9行的内层循环结束大括号后、仍在外层循环内插入cout<<endl，选D。放在外层开头会先多出空行且缺少正确的最后换行。A、C额外输出数字会改变每行内容。原卷输出使用空串分隔，不能录成空格。",
            sourceVerified: true,
            sourcePage: 4,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "某公司新出了一款无人驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车目的地，车子就能自动选择一条优化路线，告诉乘客后驶达那里。请问下面哪项不是驾驶系统完成选路所必须的。（ ）",
            options: [
                "麦克风",
                "扬声器",
                "油量表",
                "传感器"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n题目描述通过声控输入目的地、自动选路并告知乘客的流程。麦克风负责语音输入，扬声器承担通知乘客，传感器提供环境信息。油量表主要显示燃油信息，在这道基础系统组成题的描述中并非完成该选路交互所必需，因此选C。具体汽车导航设计仍可能使用能量数据，本题依据的是所给功能说明。",
            tags: [
                "科技常识"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "现代计算机是指电子计算机，它所基于的是（ ）体系结构。",
            options: [
                "艾伦·图灵",
                "冯·诺依曼",
                "阿塔纳索夫",
                "埃克特-莫克利"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n本题考查通常计算机组成教学中的存储程序思想，程序和数据存放在存储器，处理器按指令控制执行，对应冯·诺依曼体系结构，选B。图灵在计算理论等领域作出贡献，其名字不对应本题所问的常见存储程序体系名称。此处按题目通常电子计算机模型作答。",
            tags: [
                "计算机历史"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "输入一个正整数 N，想找出它所有相邻的因数对，比如，输入 12，因数对有 (1,2)、(2,3)、(3,4)。下面哪段代码找不到所有的因数对？（ ）",
            options: [
                "for(i=1;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);",
                "for(i=2;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);",
                "for(i=2;i<N/2;i++) if(!(N%(i-1)) && !(N%i)) printf(\"(%d,%d)\\n\", i-1, i);",
                "for(i=1;i<N/2;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。原卷给B，answer=1保持。B从i=2开始，会漏掉因数对(1,2)，确实有缺陷。但题目只限定N为正整数，C在N=6时i从2开始且i<3，只输出(1,2)，漏掉(2,3)。D在N=2时条件i<1使循环不执行，也漏(1,2)。因此B、C、D都存在漏解输入，不能作为唯一答案。保留原四选项并暂停计分。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5答案表给B，但题目仅限定N为正整数，C在N=6时漏(2,3)，D在N=2时漏(1,2)，多项不能找齐因数对。保持answer=1并暂停计分。"
        },
        {
            id: 16,
            type: "judge",
            question: "C++ 表达式 `-7 / 2` 的值为整数 `-3`。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n两个操作数均为整数，C++整数除法向零截断，-7/2为-3，结果类型是int，因此判断正确。它与数学向负无穷取整不同，后者会给出-4。若写成-7.0/2则是浮点除法，值为-3.5，不能把两种表达式的类型与取整规则混淆。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 表达式 `2 * int('9') * 2` 的值为 36。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nint(字符9)取得字符编码，不是把数码字符转换成数字9。在ASCII环境中字符9编码为57，因此2*57*2=228，原说法36错误。将数字字符转换成相应0..9数值通常要减去字符0。显式转换成int只改变表达式类型，不会自动解析字符所代表的十进制数字。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "C++ 表达式 `3 + 2 && 5 - 5` 的值为 false。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n加减运算优先级高于逻辑与，所以先算3+2=5、5-5=0，再计算5&&0。左侧非零为真，右侧为假，逻辑与结果是bool类型false，因此判断正确。不是先把2与5作逻辑与，也不能把得到的0解释为原表达式结果类型一定是int。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 代码中，执行 `srand(0)` 后连续两次执行 `rand()` 的结果相等。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nsrand设置伪随机数发生器的种子，之后每次rand取序列的下一项，不会因种子为0就保证连续两次结果相等，因此原判断错误。重新用同一个种子初始化再取序列，才能复现同一实现的序列。相邻结果可能偶然相等，也可能不同，不能把序列可复现误解成序列恒定。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "C++ 代码中 `while(1){...}` 的判断条件不是逻辑值，将导致语法错误。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nwhile条件允许可转换为bool的表达式，整数1转换后为true，因此while(1)语法合法，原判断错误。若循环体不改变控制流程且没有退出动作，它会持续执行。不能因为条件源表达式的静态类型不是bool，就断言语法出错。for和if等条件也有相应的条件转换规则。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "执行以下C++代码后将输出0。（ ）\n\n```cpp\nSum = 0;\nfor (i = -500; i < 500; i++)\n    Sum += i;\ncout << Sum;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原卷循环体为Sum+=i，累加的是-500、-499、……、499。除-500外其余正负项相互抵消，结果为-500，因此不是0。题库曾录成Sum+=1，那会得到1000，但不属于原代码。恢复原卷后应按实际参与求和的数列分析，并注意右端不包含500。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 代码中，运算符只能处理相同的数据类型，不同类型之间必须转换为相同的数据类型。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n不同类型的操作数并不普遍要求先由程序员转换成同一种类型。int与double的算术可通过通常算术转换处理，指针加整数则是合法的不同类别操作数，结果仍为指针。因此“运算符只能处理相同数据类型”的全称说法错误。应逐类检查各运算符的操作数要求，不能把一般算术转换推广为所有运算符的统一限制。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "在 C++ 代码中，虽然变量都有数据类型，但同一个变量也可以先后用不同类型的值赋值。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n变量自身的声明类型固定，但可先后接受能够转换到该类型的不同类型值，因此判断正确。例如double变量先接收整数2，再接收浮点数3.5，两次赋值都成立。若给int赋3.5，会转换为整数3，变量不会因此变成double。题目并非说任意类型值都能无条件赋给任意变量。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨最近在准备考 GESP，他用的 Dev C++ 来练习和运行程序，所以 Dev C++ 也是一个小型操作系统。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nDev-C++是集成开发环境，提供代码编辑、构建和调试等工具，依赖操作系统运行。能运行编程工具不表示该工具本身就是操作系统，因此原判断错误。操作系统负责进程、内存、文件及设备等资源管理，开发环境提供面向编程任务的应用功能，两者承担的职责不同。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "任何一个 while 循环都可以转化为等价的 for 循环。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在通常程序执行语义下，while(condition) body可以写成for(;condition;) body，两个形式都先判断条件，条件真时执行循环体，再重新判断，因此原判断正确。省略for初始化与更新部分不会添加额外动作，原body中的break、continue也保持相应循环控制效果。转换时应保留原条件与循环体的作用域。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 26,
            type: "programming",
            title: "小杨做题",
            samples: [
                {
                    input: "1\n2\n10\n5",
                    output: "19"
                },
                {
                    input: "1\n1\n5\n8",
                    output: "12"
                }
            ],
            question: "\n# [GESP202312 二级] 小杨做题\n\n## 题目描述\n\n为了准备考试，小杨每天都要做题。第 1 天，小杨做了 $a$ 道题；第 2 天，小杨做了 $b$ 道题；从第 3 天起，小杨每天做的题目数量是前两天的总和。\n\n此外，小杨还规定，当自己某一天做了大于或等于 $m$ 题时，接下来的所有日子里，他就再也不做题了。\n\n请问，到了第 $N$ 天，小杨总共做了多少题呢？\n\n## 输入格式\n\n总共 4 行。第一行一个整数 $a$，第二行一个整数 $b$，第三行一个整数 $m$，第四行一个整数 $N$。\n\n保证 $0 \\le a, b \\le 10$；$a, b < m \\le 1{,}000{,}000$；$3 \\le N \\le 364$。\n\n## 输出格式\n\n一行一个整数，表示小杨 $N$ 天里总共做了多少题目。\n\n## 特别提醒\n\n在本场考试中，请不要在输入、输出中附带任何提示信息。\n",
            score: 25,
            explanation: "**解析**\n\n从第三天开始，每天数量为前两天之和，先把当天数量计入累计，再判断是否达到m，达到后停止后续日期。前两天由a,b<m保证尚未触发停止。0<=a,b<=10，m上限为1000000，a=b=0时始终为0，仍可按最多364天结束。样例第二组第五天做5题，累计12后停止。现参考程序与原卷break写法等价，时间O(N)、额外空间O(1)。",
            tags: [
                "编程题",
                "递推",
                "模拟"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int a, b, m, n;\n    cin >> a >> b >> m >> n;\n    long long sum = a + b;\n    int p2 = a, p1 = b;\n    bool stopped = false;\n    for (int i = 3; i <= n; i++) {\n        if (!stopped) {\n            int cur = p1 + p2;\n            sum += cur;\n            if (cur >= m) stopped = true;\n            p2 = p1;\n            p1 = cur;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "小杨的 H 字矩阵",
            samples: [
                {
                    input: "5",
                    output: "|aaa|\n|aaa|\n|---|\n|aaa|\n|aaa|"
                },
                {
                    input: "7",
                    output: "|aaaaa|\n|aaaaa|\n|aaaaa|\n|-----|\n|aaaaa|\n|aaaaa|\n|aaaaa|"
                }
            ],
            question: "\n# [GESP202312 二级] 小杨的 H 字矩阵\n\n## 题目描述\n\n小杨想要构造一个 $N \\times N$ 的 H 字矩阵（$N$ 为奇数），具体来说，这个矩阵共有 $N$ 行，每行 $N$ 个字符，其中最左列、最右列都是 `|` ，而中间一行（即第 $\\frac{N+1}{2}$ 行）的第 2 ~ $N-1$ 个字符都是 `-` ，其余所有字符都是半角小写字母 `a`。例如，一个 $N=5$ 的 H 字矩阵如下：\n```\n|aaa|\n|aaa|\n|---|\n|aaa|\n|aaa|\n```\n请你帮小杨根据给定的 $N$ 打印出对应的“H 字矩阵”。\n\n## 输入格式\n\n一行一个整数 $N$（$5 \\le N \\le 49$ ，保证 $N$ 为奇数）。\n\n## 输出格式\n\n输出对应的“H 字矩阵”。\n\n请严格按格式输出，恰好输出 $N$ 行，每行除换行符外恰好包含 $N$ 个字符，字符只能是 `-`、`|` 或 `a`。请不要添加空格、标点、空行及输入输出提示。\n",
            score: 25,
            explanation: "**解析**\n\n逐行逐列输出，最左列和最右列优先放竖线，中间行内部放减号，其余内部放小写a。先判断边界列可保证中心行两端仍为竖线。N是5..49的奇数，中心行从0编号为N/2。每行恰有N个字符并换行，不附提示或空格。参考程序与原卷分别打印上半、中间、下半的实现等价，时间O(N²)、额外空间O(1)。",
            tags: [
                "编程题",
                "图形绘制",
                "模拟"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (j == 0 || j == n - 1) cout << '|';\n            else if (i == n / 2) cout << '-';\n            else cout << 'a';\n        }\n        cout << endl;\n    }\n    return 0;\n}"
        }
    ]
};
