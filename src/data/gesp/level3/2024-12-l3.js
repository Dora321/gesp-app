// 2024-12-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-12-l3",
    title: "2024年12月 GESP C++ 三级真题",
    level: 3,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1650388837072928.pdf",
        notes: "AI-Codex逐页对照登记mirror PDF全部11页文本与渲染，p1单选/p7判断表逐项核对，恢复Q13/Q14完整原选项，补编程范围。Q5/Q12/Q13/Q17/Q19/Q26/Q27来源疑点保留官方答案隔离。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部11页文本与渲染，Git blob SHA 1111967effffbf7b1db46dd43dfcb2e03a8b8ac2一致。p1单选/p7判断表逐项一致。恢复Q13/Q14完整选项与原程序，Q19四倍裁图确认六个1，保留全部answer和旧隔离，Q5/Q12/Q13/Q17/Q19/Q26/Q27源疑点隔离。参考及模板保持，独立运行另记。",
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
            question: "下列二进制表示的十进制数值分别是（ ）。\n[10000011]原 = （ ）\n[10000011]补 = （ ）",
            options: [
                "-125，-3",
                "-3，-125",
                "-3，-3",
                "-125，-125"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n固定8位时，原码10000011的符号位为1，数值绝对值部分为3，因此真值−3。相同位串按补码解释则可用131−256=−125得到真值，故选B。原码的最高位单独表示符号，补码则以固定宽度的整个位模式编码有符号值，两者不能用同一个“去符号位”步骤处理。位宽改变会改变补码解释，所以应保留题设8位形式。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "关于计算机中的编码，下列说法中错误的是（ ）。",
            options: [
                "对于无符号数，原码就是真值",
                "正数的反码是其本身",
                "负数的反码和补码是不一样的",
                "负数的反码，在其原码的基础上，各个位取反"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n负数求反码时符号位保持1，只把其余数值位取反，D说各个位都取反会连符号位也翻掉，因此错误项为D。正数的反码与原码相同；负数补码在反码基础上加1。无符号情形按普通二进制数值解释，不额外附加符号位。这些规则都以固定的编码位宽为背景，不能把“反码”一词和C++整型提升后的按位取反完全混同。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "16 进制数 B2025 转换成 8 进制数是（ ）。",
            options: [
                "2620045",
                "2004526",
                "729125",
                "2420045"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n十六进制B2025按每位四比特展开，再从低位每三比特分组，得到八进制2620045，选A。位权验证中0xB2025=729125，八进制2620045也等于729125；C恰为同值的十进制写法，且含八进制不允许的数码9，所以不能作为八进制答案。位分组需要在最高位补0对齐，不能交换中间的0或按十进制读转换结果。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "625.625 变成二进制是（ ）。",
            options: [
                "1001110001.101",
                "101.101",
                "101.1001110001",
                "1001110001.1101"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n整数625等于512+64+32+16+1，二进制为1001110001。小数0.625为1/2+1/8，二进制小数为.101，连接得到1001110001.101，选A。B只表示5.625，C交换了整数和小数片段，D的小数.1101为0.8125。分别处理整数与小数部分可以避免直接对十进制字符串逐位替换的错误。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面逻辑运算中，正确的是（ ）。",
            options: [
                "5&&3==0",
                "5|3==8",
                "5||3==11",
                "5&3==0001"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n如果把四项当作C++表达式，==比按位与、按位或和逻辑运算结合得更紧，依次得到0、5、1、0，官方D不成立。命题意图若是先计算运算符两侧数值再比较，(5&3)==0001才为真，其他相应等式为假。原题没有这些括号，保留四个原表达式并隔离，等待语境澄清，不能在题面暗加括号后宣称原代码已核验正确。",
            tags: [
                "位运算",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p2四项均未加括号。按C++优先级分别得到0、5、1、0，官方D并非真；若将运算先分组再作相等比较才有(5&3)==0001成立。保留answer=3和原表达式，暂停计分，待括号/比较语境澄清。"
        },
        {
            id: 6,
            type: "single",
            question: "补码 1111 1101 进行运算 1111 1101 >> 1 以后得到的结果是（ ）。",
            options: [
                "1111 1100",
                "-2",
                "1111 1101",
                "1111 1010"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n把11111101按8位补码解释得到−3，在本卷使用算术右移的补码实现中，右移1位时左侧补符号位1，位模式成为11111110，数值−2，选B。本机C++17的负数右移采用该实现行为，已实际核对。若讨论其他语言版本或逻辑右移，规则须另行指定，不能简单把所有右移都说成高位补0，负数结果也不是向0截断的−1。",
            tags: [
                "二进制",
                "补码",
                "位运算"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下列代码输出的是（ ）。\n\n```cpp\nstring s=\"1234@@chenadai\";\nstring str=\"12345\";\ns.replace(1,5,str);\ncout<<s<<endl;\n```",
            options: [
                "12345",
                "2345@",
                "112345chenadai",
                "12345chenadai"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nreplace(1,5,str)从下标1开始替换5个字符，即删除原s中的234@@，用12345替换。首字符1保留，后面的chenadai保留，结果为112345chenadai，选C。第二个参数表示被替换片段的长度，不是末尾下标；替换串长度恰好也是5，但这不是replace的普遍要求。程序最后输出整个s，而不是只输出刚替入的字符串。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "a|10（a 与 10 都是 10 进制，且二进制表示最高位为 1）运算的结果是（ ）。",
            options: [
                "使 a 的二进制表示从右往左的第二位为 1",
                "使 a 的二进制表示从右往左的第一位为 0",
                "使 a 的二进制表示从右往左第二位为 0",
                "使 a 的二进制表示最高位为 0"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n十进制10的二进制为1010，在从右起第二位与第四位上均为1。a|10会将这两个位置设为1，其余位置保持a对应位，因此A描述的第二位置1成立。它不会强制最低位为0，更不会清最高位或第二位。原题的“最高位为1”是对有效二进制写法的描述，不能把10直接错当成二进制2，或据此忽略第四位也会置1。",
            tags: [
                "二进制",
                "补码",
                "进制转换",
                "位运算"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下列程序输出的是（ ）。\n```cpp\nstring ch = \"hello\";\nif (ch[5] == NULL) {\n cout << \"right\" << endl;\n} else if (ch[5] == '\\0') {\n cout << \"wrong\" << endl;\n} else {\n cout << \"hello\" << endl;\n}\n```",
            options: [
                "right",
                "wrong",
                "hello",
                "不能正确执行"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nC++17允许读取string在pos==size()处的零字符，hello长度为5，所以ch[5]值为0。本机NULL为整型零常量，第一条比较即成立，输出right，选A，后面的else if不会执行。这里没有访问大于size()的位置，不应误判为数组越界。NULL用于指针空值的惯用宏，判断字符终止值通常直接写零字符更清楚，本题仍按原代码求值。",
            tags: [
                "位运算",
                "字符串",
                "条件判断"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下列程序中，假设一个字符占用的内存空间是 1，下列程序中，ch 占用的内存空间是（ ）。\n```cpp\nchar ch[] = \"hello world\";\nsize_t ret = strlen(ch);\ncout << ret << endl;\n```",
            options: [
                "11",
                "10",
                "13",
                "12"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nhello world含5个字母、1个空格、5个字母，共11个可见字符；用字符串字面量初始化char数组时还存一个终止零字符，所以数组ch占12个char单位，选D。strlen(ch)返回11，程序实际输出11，但题目询问的是ch占用的内存空间，不能把这两个量混为一谈。假设一个字符占1个空间单位时，答案为12。",
            tags: [
                "位运算",
                "字符与ASCII",
                "字符串",
                "字符数组",
                "数组",
                "计算机基础"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下列程序最后输出的是（ ）。\n```cpp\nint a = 65;\ncout << tolower(a) << endl;\n```",
            options: [
                "65",
                "A",
                "a",
                "97"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n在默认C区域设置与ASCII环境中，tolower把编码65的大写A映射到小写a的编码97。其返回类型为int，直接送入cout会打印数值97，所以选D。若再强制转换为char才会显示字符a，不能因函数名涉及字符转换就假定返回char。输入65在unsigned char可表示范围内，满足本次字符分类函数使用要求。",
            tags: [
                "位运算",
                "字符与ASCII"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "想要计算从数字 n 到数字 m 之间（包含 n 和 m）有多少个数字 d 出现，下列程序哪个能够实现（ ）。",
            options: [
                "```cpp\nint n,m,res,d;\ncin >> n >> m>>d;\nfor(int i = n+1; i <= m; i++){\n    int temp = i;\n    while(temp){\n        if(temp % 10 == d) res++;\n        temp /= 10;\n    }\n}\ncout << res << endl;\nreturn 0;\n```",
                "```cpp\nint n,m,res,d;\ncin >> n >> m>>d;\nfor(int i = n; i <= m; i++){\n    int temp = i;\n    while(temp){\n        if(temp % 10 = d) res++;\n        temp /= 10;\n    }\n}\ncout << res << endl;\nreturn 0;\n```",
                "```cpp\nint n,m,res=0,d;\ncin >> n >> m>>d;\nfor(int i = n; i <= m; i++){\n    int temp = i;\n    while(temp){\n        if(temp % 10 == d) res++;\n        temp /= 10;\n    }\n}\ncout << res << endl;\nreturn 0;\n```",
                "```cpp\nint n,m,res=0,d;\ncin >> n >> m>>d;\nfor(int i = n; i <= m; i++){\n    while(temp){\n        if(temp % 10 == d) res++;\n        temp /= 10;\n    }\n}\ncout << res << endl;\nreturn 0;\n```"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nC初始化res为0、包含n与m两个端点，对正整数可逐位取余统计d。但原题未限定输入域排除0，n=m=d=0时temp为0，循环一次也不执行而输出0，通常十进制写法0却包含一个0。官方C保留并隔离。A既漏左端点又未初始化，B对求余结果赋值不合法，D没有定义temp，均不是可据以修复原题的可靠选项。",
            tags: [
                "循环",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷pp3–4未限定n、m排除0，官方C在n=m=d=0时while(temp)不进入，输出0，但数字0的十进制表示含一个0。保留answer=2和原代码，暂停计分，待输入域或零特判澄清。"
        },
        {
            id: 13,
            type: "single",
            question: "兔子五元一只，鸡三元一只，小鸭子一元三只，现在你有一百元要买一百只，兔子、鸡、鸭子各买多少只，每种必须至少一只，下列哪个程序能实现（ ）。",
            options: [
                "```cpp\nfor(int i = 0; i <= 100; i++) {\n    for(int j = 0; j <= 100; j++) {\n        for(int k = 0; k <= 100; k++) {\n            if(i+j+k==100 && 25*i+10*j+k==300)\n                cout<<i<<\" \"<<j<<\" \"<<k<<endl;\n        }\n    }\n}\n```",
                "```cpp\nfor(int i = 0; i <= 100; i++) {\n    for(int j = 0; j <= 100; j++) {\n        for(int k = 0; k <= 100; k++) {\n            if(i+j+k==100 && 20*i+10*j+k==300)\n                cout<<i<<\" \"<<j<<\" \"<<k<<endl;\n        }\n    }\n}\n```",
                "```cpp\nfor(int i = 0; i <= 20; i++) {\n    for(int j = 0; j <= 34; j++) {\n        for(int k = 0; k <= 20; k++) {\n            if(i+j+k==100 && 15*i+9*j+k==300)\n                cout<<i<<\" \"<<j<<\" \"<<k<<endl;\n        }\n    }\n}\n```",
                "```cpp\nfor(int i = 0; i <= 100; i++) {\n    for(int j = 0; j <= 100; j++) {\n        for(int k = 0; k <= 100; k++) {\n            if(i+j+k==100 && 15*i+9*j+k==300)\n                cout<<i<<\" \"<<j<<\" \"<<k<<endl;\n        }\n    }\n}\n```"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n把金额条件乘3可消除鸭子单价中的分母，正确式子为15i+9j+k=300，再加总只数i+j+k=100。D的金额式和大范围枚举符合这一部分意图，但从0开始会输出0 25 75，违反每种至少一只。合法正数方案应为4 18 78、8 11 81、12 4 84。保留官方D并隔离，恢复完整原代码，不能把输出中的零只方案默默删去来认证程序正确。",
            tags: [
                "枚举",
                "算法思维",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5要求每种至少一只，但官方D从0枚举并输出0 25 75，未排除0只兔子。保留answer=3和全部原选项，暂停计分；正整数限制不能通过解析默默加入程序。"
        },
        {
            id: 14,
            type: "single",
            question: "求小于等于 N 的素数的方法中，有一种方法是将所有从 2 到它本身减 1 的数都除一遍，如果不能整除，就是素数。下列哪个程序体现了这种方法（ ）。",
            options: [
                "```cpp\nif(N>=3) {\n    cout<<2<<endl;\n    for(int i=2;i<=N;i++) {\n        for(int j=2;j<i;j++) {\n            if(i%j!=0) flag=1;\n        }\n        if(flag==0) cout<<i<<endl;\n        flag=0;\n    }\n}\n```",
                "```cpp\nif(N>=2) {\n    for(int i=3;i<=N;i++) {\n        for(int j=2;j<i;j++) {\n            if(i%j==0) flag=1;\n        }\n        if(flag==0) cout<<i<<endl;\n        flag=0;\n    }\n}\n```",
                "```cpp\nif(N>=2) {\n    cout<<2<<endl;\n    for(int i=3;i<=N;i++) {\n        for(int j=2;j<i;j++) {\n            if(i%j==0) flag=1;\n        }\n        if(flag==0) cout<<i<<endl;\n        flag=0;\n    }\n}\n```",
                "```cpp\nif(N>=2) {\n    cout<<2<<endl;\n    for(int i=3;i<=N;i++) {\n        for(int j=2;j<i;j++) {\n            if(i%j==0) flag=1;\n        }\n        if(flag==0) cout<<i<<endl;\n    }\n}\n```"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n在外部提供N并将flag初始化为0的片段上下文中，C先输出2，对3到N的每个i逐一用2到i−1试除，找到因子置flag，最后根据flag决定是否输出并在下一数前清零，符合题意。A用非整除条件置flag且会重复处理2，B漏输出2，D未在每个i结束重置flag，遇到首个合数后会误屏蔽后面的素数。本轮将概括选项全部恢复为原卷完整程序片段。",
            tags: [
                "位运算",
                "枚举",
                "算法思维",
                "循环",
                "逻辑判断"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "工人工作一天，会得到一个金环作为工资报酬。某个工作需要 15 天完成，一条 15 个环的金环项链，为了严格执行每天工作结束时完成对工人工资的结算，最少需要将金环项链剪裁成几段，每段几个金环（ ）。",
            options: [
                "4 段，分别是 1、2、4、8",
                "15 段，每段 1 个",
                "6 段，分别是 3、3、3、3、2、1",
                "9 段，分别是 2、2、2、2、2、2、1、1、1"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n在每日结算时可交换已交付段的模型中，长度1、2、4、8可用其子集表示1到15的每个日工资累计额，因此4段足够，选A。k段最多有2^k种子集金额，需覆盖0到15共16个累计状态，所以至少4段。每天可按当天累计工资重新组合所需段数，不能把任务误解成每日一定再交一段新的完整链段而禁止结算找换。",
            tags: [
                "位运算",
                "按位取反"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "为了简化计算机基本运算电路，使加减法都只需要通过加法电路实现，也就是让减去一个正数或加上一个负数这样的运算可以用加上一个正数来代替。于是改变负数存储的形式，存储成一种可以直接当成正数来相加的形式，这种形式就是补码。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原判断正确。固定宽度补码把负数编码为模2^w的加法逆元，使减去某个正数可通过加上其负值的补码模式共用加法电路。最高位的进位按固定字长处理，仍需区分结果是否在有符号可表示范围内，不能据此认定C++有符号溢出都合法回绕。本题讲的是硬件编码对统一加减法的作用。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "使用原码进行的计算，2+(-1) 的结果是 -3。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原码若正确处理符号，2+(−1)=1。若把8位位串00000010与10000001直接相加，再把结果10000011解释成原码，才得到−3。原句没有明确采用不处理符号的直接位串相加模型，官方却判正确，本轮保留该答案并隔离。与9月原码歧义题同样需要明确运算规则，不能把−3表述为正确数学加法本身的结果。",
            tags: [
                "二进制",
                "补码"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p7称使用原码计算2+(-1)结果-3并判√，只有将00000010与10000001的位串直接相加再按原码读才得-3；正确处理原码符号的加法结果为1。保留answer=0，暂停计分，待运算模型澄清。"
        },
        {
            id: 18,
            type: "judge",
            question: "反码计算加减法：加法与减法结果都是正确的，只是解决不了 -0 的问题。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n按反码的配套运算规则处理回卷进位时，加减法能够表示预期结果，仍存在正零与负零两种零编码，依本卷语境原判断正确。关键是反码加法并非只做一次普通位串相加就结束，还要将最高位进位加回最低位。对固定字长不能表示的结果同样需要处理溢出，不能把原句推广成任意无限范围的整数运算都无条件正确。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "10 进制数 63，在转换成二进制的计算过程中，产生了如下式子：63/2=31 余1，31/2=15 余1，15/2=7 余1，7/2=3 余1，3/2=1 余1，1/2=0 余1。按照从前往后的顺序，获得 63 的二进制值是 111111。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原卷针对63的六次除2余数全部为1，无论正序还是倒序连接都得到111111，其数值确为63。通用的除2取余法通常应倒序读余数，但这一特例的全1序列恰好正反相同，不能据通用规则直接否定具体结论。四倍裁图已确认原图写六个1，官方错误判断保留并隔离，等待题目结论或输入示例澄清。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p7针对63列出的六个余数全为1，从前往后连接仍为111111，数值确为63；官方却判×。通用取余应倒序的规则不能否定本题特例恰好一致的具体结论。四倍裁图确认原图写六个1，保留answer=1及原题，暂停计分。"
        },
        {
            id: 20,
            type: "judge",
            question: "下列程序输出的是 A。\n```cpp\nchar x = 65;\nx = x & 00001111;\ncout << x << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n00001111在C++中因前导0而按八进制解释，数值为585，即二进制1001001001；65的二进制为1000001，按位与后仍是65，所以输出A，原判断正确。不能把这个源码字面量擅改成低四位掩码0b00001111；若那样计算会得到1，含义已经不同。本轮按原字面量直接编译核对，并区分图示二进制与源码进制前缀。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "二进制",
                "补码",
                "位运算"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下列可执行程序段中，最后pos的值是4。\n\n```cpp\nstring str=\"chenADai\";\nint pos = str.find('D');\n--pos&11;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n字符串chenADai中的D位于下标5，find返回5。--pos先将pos减为4，再求与十进制11的按位与；这一按位与结果没有赋回pos，最终pos仍为4，原判断正确。若误读成pos&=11会使4&11=0，但原代码并没有复合赋值。前缀自减本身的副作用会保留，表达式其余计算结果被丢弃。",
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "位运算"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下列程序将不能正确执行。\n\n```cpp\nstring ch=\"chen\";\ncout<<ch[4]<<endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nchen的长度为4，C++17允许只读访问string在pos==size()的位置，此处返回零字符，所以程序可以执行，声称不能正确执行错误。cout会输出不可见零字符和随后endl的换行，不能据屏幕无可见字形判定程序失败。本题与读取ch[5]不同，后者才超过允许的末尾位置；两种边界必须分开核验。",
            tags: [
                "位运算",
                "字符串"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "将输出 97。\n```cpp\nchar a = 'A';\na = a+32;\ncout << (int)a << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nASCII中大写A编码65，增加32后为97，对应小写a。变量a仍是char，但在输出处强制转换为int，所以流显示十进制97，原判断正确。若没有最后的强制转换会显示字符a。当前值97能被char表示，不涉及窄化越界或未知字符值，不能把编码运算与字符串拼接混同。",
            tags: [
                "位运算",
                "字符与ASCII"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "自然界中，最小的素数是 2。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n素数是大于1且只有1和自身两个正因数的整数。2的正因数恰为1和2，符合定义；比2小的自然数0、1均不符合素数定义，因此最小素数为2，原判断正确。这也是唯一的偶素数，因为其他大于2的偶数还具有因数2。不能把1误当成只因不可再分就算素数。",
            tags: [
                "数学"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "CCF（十六进制）= 12363（七进制）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n十六进制CCF按位权计算为12×256+12×16+15=3279。七进制12363为1×2401+2×343+3×49+6×7+3=3279，两边相等，原判断正确。七进制允许的数码为0到6，右侧每位均合法。比较时先统一为十进制或相同基数，不应按五位数比三位数大来判断。",
            tags: [
                "进制转换"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "5 0\n-2 -1 0 1 2",
                    output: "-2 -2 0 2 2"
                }
            ],
            question: "\n# [GESP202412 三级] 数字替换\n\n## 题目描述\n\n小杨有一个包含 $n$ 个数字的序列 $A$，即 $A=[a_1,a_2,\\ldots,a_n]$，他想将其中大于 $k$ 的数字都替换为序列的最大值，将其中小于 $k$ 的数字都替换为序列的最小值，请你帮他计算出替换后的序列。\n\n## 输入格式\n\n第一行包含两个正整数 $n,k$，含义如题面所示。\n\n第二行包含 $n$ 个数字，代表序列 $A$。\n\n## 输出格式\n\n输出 $n$ 个整数，代表替换后的结果。\n\n\n对于全部数据，保证1 ≤ n ≤ 10^5，|k|、|a_i| ≤ 10^5。",
            explanation: "**原卷疑点，暂停计分**\n\n先从原序列确定最大值和最小值，再逐项比较k，大于k替换为原最大值，小于k替换为原最小值，等于k保持。范围允许负数及0，参考程序从a[1]初始化极值，因此全负数也正确。时间O(n)、数组空间O(n)，输出只用相邻空格分隔。原输入用词称n,k均为正整数，却与样例k=0和|k|≤10^5范围冲突，保留原词并隔离，实际程序按明确范围独立核验。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "模拟",
                "数组"
            ],
            referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint a[100010];\nint main() {\n    int n, k;\n    cin >> n >> k;\n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    int max_value = a[1], min_value = a[1];\n    for (int i = 1; i <= n; i++) {\n        max_value = max(max_value, a[i]);\n        min_value = min(min_value, a[i]);\n    }\n    for (int i = 1; i <= n; i++) {\n        if (a[i] > k) {\n            a[i] = max_value;\n        } else if (a[i] < k) {\n            a[i] = min_value;\n        }\n        if (i != n) {\n            cout << a[i] << \" \";\n        } else {\n            cout << a[i] << endl;\n        }\n    }\n    return 0;\n}",
            answer: "",
            title: "数字替换",
            timeLimit: 1,
            memoryLimit: 512,
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p8称第一行两个正整数n,k，但官方样例k=0，p9范围|k|≤10^5还允许负数。保留原文、样例与参考程序，暂停计分，待输入措辞澄清。参考按明确数据范围实际核验。"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "12230",
                    output: "****.....................\n****.****.****.****..***.\n****.................***.\n****..****.********..***.\n****....................."
                }
            ],
            question: "\n# [GESP202412 三级] 打印数字\n\n## 题目描述\n\n小杨为数字 $0,1,2$ 和 $3$ 设计了一款表示形式，每个数字占用了 $5\\times 5$ 的网格。数字 $0,1,2$ 和 $3$ 的表示形式如下：\n\n```plain\n..... ****. ..... .....\n.***. ****. ****. ****.\n.***. ****. ..... .....\n.***. ****. .**** ****.\n..... ****. ..... .....\n```\n\n小杨想请你将给定的数字 $n$ 转换为对应的表示形式。\n\n## 输入格式\n\n第一行包含一个正整数代表 $n$。\n\n## 输出格式\n\n输出对应的表示形式。\n\n\n对于全部数据，保证0 ≤ n ≤ 10^6，且n仅由数字0、1、2、3组成。",
            explanation: "**原卷疑点，暂停计分**\n\n逐行拼接每个数码的5列图形，五行全部处理后得到目标图案，数字间没有额外分隔列。0是边框，1只有最右列为点，2和3具有相应横线和左右竖线。本题点号表示笔画，星号表示背景，不能按常见相反约定绘制。数码长度为L时时间O(L)，每行临时串长5L。原输入说正整数，但范围允许0，保留原词并隔离，程序在n=0时按一个0绘制5×5。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "字符串",
                "模拟",
                "字符画"
            ],
            referenceCode: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string n;\n    cin >> n;\n    for (int row = 0; row < 5; row++) {\n        string line = \"\";\n        for (char digit : n) {\n            if (digit == '0') {\n                if (row == 0 || row == 4) {\n                    line += \".....\";\n                } else {\n                    line += \".***.\";\n                }\n            } else if (digit == '1') {\n                line += \"****.\";\n            } else if (digit == '2') {\n                if (row == 0) {\n                    line += \".....\";\n                } else if (row == 1) {\n                    line += \"****.\";\n                } else if (row == 2) {\n                    line += \".....\";\n                } else if (row == 3) {\n                    line += \".****\";\n                } else {\n                    line += \".....\";\n                }\n            } else if (digit == '3') {\n                if (row == 0) {\n                    line += \".....\";\n                } else if (row == 1) {\n                    line += \"****.\";\n                } else if (row == 2) {\n                    line += \".....\";\n                } else if (row == 3) {\n                    line += \"****.\";\n                } else {\n                    line += \".....\";\n                }\n            }\n        }\n        cout << line << endl;\n    }\n    return 0;\n}",
            answer: "",
            title: "打印数字",
            timeLimit: 1,
            memoryLimit: 512,
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p10输入说正整数n，数据范围却明确0≤n≤10^6允许0。旧库把输入改成非负整数，本轮恢复原词并隔离，保留范围/样例/参考代码，等待来源澄清。"
        }
    ]
};
