// 2024-03-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-03-l3",
    title: "2024年3月 GESP C++ 三级真题",
    level: 3,
    year: 2024,
    month: 3,
    session: 5,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1602047101108256.pdf",
        notes: "AI-Codex对照登记mirror PDF全部8页文本和渲染，逐项核对p1单选/p5判断答案表，补编程范围并恢复原代码空行。Q2/Q4/Q13来源疑点保留官方答案隔离。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部8页文本和渲染，Git blob SHA 37a63c4fc0a34cbf57aa761620402f5a4cd05199一致。p1单选/p5判断答案表逐项一致。Q2进制用词、Q4负数左移、Q13包含关系选项疑点保留官方答案隔离。参考程序保持，合法域独立运行审计另存。",
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
            question: "整数 -5 的 16 位补码表示是（ ）。",
            options: [
                "1005",
                "1006",
                "FFFA",
                "FFFB"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n16位补码中，−5的位模式可按2^16−5计算，65536−5=65531，写成十六进制为FFFB，选D。也可从正5的0005逐位取反得到FFFA，再加1得到FFFB。题目明确给出位宽和补码，不能省略高位F后又按另一个位宽解释，也不要把负数的符号直接附在十六进制位模式之前。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "如果16位短整数-2的二进制是\"FFFE\"，则短整数-4的十六进制是（ ）。",
            options: [
                "FF04",
                "FFFA",
                "FFFC",
                "FFFH"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原卷把FFFE称为二进制，但二进制数码只能为0、1，含F/E的写法与该词不符。若按其明显指向的16位补码十六进制位模式解释，−4为2^16−4=65532，即FFFC，对应官方C。本轮恢复原文并保留答案，因前提进制用词矛盾隔离，等待来源澄清。FFFH也不是合法十六进制数码表示，不能把H看作十六进制的一位。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p1写“二进制是FFFE”，含F/E的表示不能是二进制。旧库擅改为“十六进制”，本轮恢复原词并隔离。按16位补码的十六进制意图可得FFFC，但需来源澄清原题进制用词。保留官方answer=2及原选项。"
        },
        {
            id: 3,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint main() {\n cout << (3 | 16) << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "3",
                "16",
                "19",
                "48"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n3的低位为00011，16的对应位为10000，逐位或得10011，即十进制19，选C。两数在本题没有同时为1的二进制位，所以结果也恰好等于3+16。代码随后有两次endl，实际字符流先输出19再有两次换行，本轮按PDF恢复该额外空行。按位或不是逻辑或，结果不会被归一为布尔值1。",
            tags: [
                "二进制",
                "补码",
                "位运算"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "定义整数 int x = -5，则执行 C++ 代码 cout << (x == (x << 1 >> 1)) 输出是（ ）。",
            options: [
                "0",
                "1",
                "-5",
                "5"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原题x为−5，原表给输出1，但本次C++17核验规则下x<<1已对负有符号整数实施左移，属于未定义行为。因此不能用补码算术右移的某次实现结果保证表达式一定为真，也不能说移位后必然恢复原值。保留官方B和原表达式并隔离，等待标准版本或适用条件澄清。没有运行该未定义表达式并据偶然输出判定正确。",
            tags: [
                "二进制",
                "补码",
                "位运算"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p1–2令int x=-5，计算x<<1>>1，官方给B。C++17负有符号数左移属于未定义行为，不能保证输出1，后续右移也不能消除该问题。保留answer=1和原代码，暂停计分，等待语言版本/前提澄清。"
        },
        {
            id: 5,
            type: "single",
            question: "已知字符 '0' 的 ASCII 编码的十进制表示为 48，则执行下面 C++ 代码后，输出是（ ）。\n```cpp\nint main() {\n string s = \"316\";\n int n = s.length();\n int x = 0;\n for (int i = 0; i < n; i++) x += s[i];\n cout << x << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "10",
                "58",
                "154",
                "316"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n已知ASCII字符'0'为48，'3'、'1'、'6'分别为51、49、54。程序直接把字符编码加到x，没有减去'0'，所以总和是154，选C。数字之和10和整数316是另外两种含义，均不等于本段代码的字符累加。原代码输出154后还额外输出一行空行，本轮保留两次endl，并用精确字符流检查格式。",
            tags: [
                "位运算",
                "字符与ASCII",
                "循环"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面 C++ 代码执行后数组中大于 0 的数的特征是（ ）。\n```cpp\nint main() {\n int a[20], i;\n for (i = 0; i < 20; i++) a[i] = i+1;\n for (int i = 0; i < 20; i++)\n if ((a[i] % 2) && (a[i] % 3)) a[i] = 0;\n for (i = 0; i < 20; i++)\n if (a[i]) cout << a[i] << \" \";\n cout << endl;\n return 0;\n}\n```",
            options: [
                "2 的倍数",
                "3 的倍数",
                "能被 2 或 3 整除的数",
                "能被 2 和 3 同时整除的数"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n只有当一个元素既不是2的倍数、也不是3的倍数时，两项余数都非零，逻辑与为真，该元素才被置为0。留下的大于0元素因此能被2或3整除，选C。满足两者任意一个即可，不要求同时满足。对1到20，保留序列为2、3、4、6、8、9、10、12、14、15、16、18、20，每项输出后带一个空格。",
            tags: [
                "位运算",
                "数组",
                "循环",
                "逻辑判断"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "执行下面 C++ 代码后输出的第一个数是（ ）。\n```cpp\nint main() {\n int a[20], i;\n for (i = 0; i < 20; i++) a[i] = i+1;\n for (; i > 0; i--) cout << a[i-1] << \" \";\n cout << endl;\n return 0;\n}\n```",
            options: [
                "20",
                "19",
                "1",
                "不确定"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n第一个循环用外部变量i从0递增至20才退出，此时i保留为20。第二个循环没有重新初始化i，首先访问a[i−1]即a[19]，其值为20，所以第一个数是20，选A。随后i递减，依次倒序输出到1，全部下标仍在0到19内。不能把循环结束时的i误写成19，也不能把第一次访问误读为a[20]。",
            tags: [
                "位运算",
                "数组",
                "循环"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是 GESP IS INTERESTING。\n```cpp\nint main() {\n string str = \"gEsP is Interesting\";\n int x = str.length();\n for (int i = 0; i < x; i++)\n if ((str[i] >= 'a') && (str[i] <= 'z'))\n ________________________;\n cout << str << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "str[i] += 'a'-'A'",
                "str[i] += 20",
                "str[i] += 'A'-'a'",
                "无法实现"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n在ASCII中，大写字母比相应小写字母的编码小32，正确转换应加上'A'−'a'，因此填C。条件只进入小写字母位置，大写字母和空格保持，最终文本为GESP IS INTERESTING。A的差值方向相反，B的20也不是正确偏移量。原卷使用字符常量'a'与'z'作范围比较，本轮恢复并保留末尾额外空行。",
            tags: [
                "位运算",
                "循环",
                "逻辑判断"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "假设英文句子由若干词构成。下面 C++ 代码统计输出的词数是（ ）。\n```cpp\nint main() {\n string str = \"gEsP is  Interesting  !\";\n int x = str.length();\n int nwords = 0;\n for (int i = 0; i < x; i++)\n if (str[i] == ' ') {\n nwords++;\n while (str[++i] == ' ');\n }\n cout << nwords << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n原字符串gEsP is  Interesting  !有三段连续空格。每遇到一段，先使nwords加1，再由while跳过该段剩余空格，最后共计3，选C。这个程序实际统计空格段数，并不是通用的正确单词计数器，若无空格、前导空格或尾随空格，统计含义都会不同。必须按原输入执行，双空格不能在转录时压缩成单空格来代替原题。",
            tags: [
                "位运算",
                "字符与ASCII",
                "字符串",
                "循环"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "C++ 的字符变量的码值是整数，下面字面量形式的字符码值最大的是（ ）。",
            options: [
                "100",
                "075",
                "0x70",
                "0x60"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n四个整数字面量分别按其前缀解释。100为十进制100，075是八进制，等于7×8+5=61，0x70为十六进制112，0x60为十六进制96。因此最大的是0x70，选C。前导0和0x决定进制，不能只按可见数字大小比较，也不需要把它们先当作字符串或字符编码中的十进制文本。",
            tags: [
                "进制转换",
                "字符与ASCII"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面 C++ 程序执行的结果是（ ）。\n```cpp\nint main() {\n int a[20], i;\n int cnt = 0;\n for (i = 0; i < 20; i++) a[i] = i+1;\n for (; i > 1; i--)\n if ((a[i-1]+a[i-2]) % 3) cnt++;\n cout << cnt << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "5",
                "6",
                "10",
                "12"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n初始化后i=20，第二个循环检查i=20到2，共19个相邻对。对应元素和依次为39、37、35直到3，全是连续的19个奇数。其中可被3整除的有3、9、15、21、27、33、39共7个，余数非零的为19−7=12，选D。原if直接使用余数作为布尔条件，统计的是不整除的对，不能把这7组当成cnt结果。",
            tags: [
                "位运算",
                "数组",
                "循环"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "定义字符数组 char str[20] = {'G', 'E', 'S', 'P'};，则 str 的字符串长度为（ ）。",
            options: [
                "4",
                "5",
                "19",
                "20"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n字符数组容量为20，只给前4个元素初始化G、E、S、P，其余自动补为零字符。因此第一个'\\0'出现在下标4，C风格字符串内容长度为4，选A。容量20不等于字符串长度，也不需要把终止零字符本身计入长度。这里数组初始化保证有终止标记，区别于一个恰好没有预留空位的未终止字符序列。",
            tags: [
                "字符与ASCII",
                "字符串",
                "字符数组",
                "数组"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "定义整型变量 int a = 3, b = 16，则 a | b 的值和 a+b 的关系是（ ）。",
            options: [
                "大于",
                "等于",
                "小于",
                "等于或小于"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\na=3与b=16的二进制置位不重叠，按位或得19，相加也得19。B“等于”成立，而D“等于或小于”是包含等于的关系，也同样成立。原题没有给出选择最精确描述的要求，不能仅凭精确程度否定D，因此保留官方B并隔离。这个具体例子的或等于加也不能推广到位有重叠的整数，例如3|1=3而3+1=4。",
            tags: [
                "程序分析"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5给B“等于”，但a=3、b=16时a|b与a+b均为19，D“等于或小于”也为真。没有要求选择最精确关系，不能仅以B更精确排除包含等于的D。保留answer=1和四个原选项，暂停计分，等待单选唯一性澄清。"
        },
        {
            id: 14,
            type: "single",
            question: "小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是（ ）。",
            options: [
                "小程序",
                "计时器",
                "操作系统",
                "神话人物"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n鸿蒙在题设手表中承担管理设备资源、提供应用运行环境等系统职责，属于操作系统，选C。小程序是依托平台运行的应用形式，计时器是一种功能或设备，神话人物是名称来源相关的干扰选项，均不符合题干“手表上跑的”软件类别。这里按系统软件与应用软件的职责分类，不依赖某一个手表型号的界面或功能列表。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（CCF）在 2024 年 1 月 27 日的颁奖典礼上颁布了王选奖，王选先生的重大贡献是（ ）。",
            options: [
                "制造自动驾驶汽车",
                "创立培训学校",
                "发明汉字激光照排系统",
                "成立方正公司"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n本题选择王选先生在汉字激光照排系统方面的贡献，C。北京大学王选计算机研究所的成果介绍记录其带领团队研制汉字激光照排技术并形成中文电子出版系统，题干考查这一计算机中文信息处理成果。制造自动驾驶汽车和创立培训学校不对应此项贡献，成立公司也不能替代题目所指的核心技术发明。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "任意整数 a 的二进制反码与补码都有 1 位不同。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原判断错误。正数的反码与补码和原码相同，已足以反驳“任意整数都有1位不同”。负数补码是在其反码上加1，加法进位还可能改变多个位，例如固定8位下−3的反码11111100、补码11111101只差一位，而−4的反码11111011、补码11111100有多位变化。不能把“加1”理解成必然只翻转一位。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "对整型变量 int a = 3，执行 C++ 代码 a << 2 将把 2 输出到 a 中。",
            sourcePage: 5,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原判断错误。a<<2表示把a的值左移两位，a为3时表达式值为12，这不是输入输出运算，也不会自动赋回a。若单独写a<<2，a本身仍为3，要更新需要a=a<<2或a<<=2。流插入cout<<a虽然使用相同的两个尖括号，但左操作数和重载含义不同，不能把整数位移解释成向变量输出数字2。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "下面 C++ 代码可以计算 1 到 100 的累加和，采用的是穷举法。\n```cpp\nint main() {\n int i, sum = 0;\n for (int i = 1; i <= 100; i++) sum += i;\n cout << sum << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原程序可得到1到100的累加和5050，但它按既定求和步骤遍历各加数并累加，不是在候选解空间中逐一检验来筛选满足条件的解，依本卷算法分类原判断错误。算法分析不能见到for循环就一概称为穷举法，还要看循环中处理对象和目标。外层另声明的i未被读取，内层for的同名变量单独控制求和过程。",
            tags: [
                "位运算",
                "枚举",
                "算法思维",
                "循环"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "一个 int 类型变量 a，执行操作 (a << 2 >> 2) 后的值一定是 a。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原判断错误，题目只限定int，左移可能丢失高位，且有符号移位还受标准版本和操作数范围约束。本机C++17实现中可用a=536870912观察左移2位得到负值后再右移不能恢复a，右移负数的结果还具有实现相关性。不能把某几个小正数成功恢复推广到所有int，也不能忽略左移对负数及可表示性的限制。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在 C++ 语言中，(010 << 1) 执行结果是 100。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n010在C++整数字面量中是八进制，数值为8，左移1位得到16，所以“结果是100”错误。不能把以0开头的010直接当作二进制文本10来操作，也不能把移位后的数字串想象成在尾部加一个0然后仍按十进制读。若需要明确二进制字面量，应使用0b前缀，但这不会改变原题中010的进制。",
            tags: [
                "进制转换",
                "位运算"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "执行下面 C++ 代码后将输出 2。\n```cpp\nint main() {\n string str = \"gEsP is Interesting\";\n int x = str.find(\"s\");\n cout << x << endl;\n cout << endl;\n return 0;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nfind(\"s\")寻找小写s第一次出现的位置，大小写敏感。字符串gEsP中下标0、1、2、3对应g、E、s、P，因此首次找到的位置为2，原判断正确。中间is中的另一个s出现在更后面，不影响第一次匹配。原程序在输出2之后还有一次额外endl，本轮按原卷恢复完整输出框架与空行。",
            tags: [
                "位运算",
                "字符串"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 语言中，字符数组被定义时，它的大小可以调整。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n按已定义的普通字符数组对象来理解，元素个数在创建该对象时确定，其存储容量不能靠后续赋值自行改变，所以原判断错误。可以修改已有元素的字符值，也可以另行定义不同大小的数组，但这不等于给原数组扩容。std::string或vector提供可变长度管理，是不同对象类型，不能把它们的resize规则套到内建字符数组。",
            tags: [
                "字符串",
                "字符数组",
                "数组"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "对定义的数组 int a[7] = {2, 0, 2, 4, 3, 1, 6}，可以用简单循环就找到其中最小的整数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原判断正确。先把最小值初始化为a[0]即2，再从下标1到6逐项比较，遇到更小值更新，最终得到0。单次遍历即可找到本数组最小值，时间O(n)、额外空间O(1)，不需要先排序，也不需要枚举所有元素对。初始化为一个已有元素比随意设为0更适合通用数组，尤其当所有数据为正或为负时。",
            tags: [
                "数组"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨今年春节回奶奶家了，奶奶家的数字电视要设置 IP 地址并接入到 WIFI 盒子才能收看节目，那这个 WIFI 盒子具有路由器的功能。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n题设WIFI盒子承担设备接入家庭网络并转发通信的职责，具有路由器功能，原判断正确。电视配置IP地址后接入该设备，反映的是网络通信层面的连接功能，与显示节目的屏幕硬件功能不同。实际家用设备常集成多种网络功能，本题判断“具有”路由功能即可，不能把它理解成所有无线接入设备都只执行单一功能。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "任何一个 for 循环都可以转化为等价的 while 循环。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原判断正确，但改写时要保持初始化、条件判断、循环体和更新表达式的执行时机。对for(init;cond;step)，可在等价作用域中先init，再用while(cond)执行循环体及step。若原循环体中的continue针对该for，改写时需在对应路径执行step再继续，不能机械地把step只放在末尾并让continue跳过。带嵌套循环时也须保留continue所属目标。",
            tags: [
                "循环"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "3\naAc",
                    output: "-61"
                }
            ],
            question: "\n# [GESP202403 三级] 字母求和\n\n## 题目描述\n\n小杨同学发明了一种新型密码，对于每一个小写英文字母，该小写字母代表了一个正整数，即该字母在字母顺序中的位置，例如字母 `a` 代表了正整数 $1$，字母 `b` 代表了正整数 $2$；对于每一个大写英文字母，该大写字母代表了一个负整数，即该字母的 ASCII 码的相反数，例如字母 `A` 代表了正整数 $-65$。小杨同学利用这种方式对一个整数进行了加密并得到了一个由大写字母和小写字母组成的字符串，该字符串中每个字母所代表数字的总和即为加密前的整数，例如 `aAc` 对应的加密前的整数为 $1+(-65)+3=-61$。\n\n对于给定的字符串，请你计算出它对应的加密前的整数是多少。\n\n## 输入格式\n\n第一行一个正整数 $n$，表示字符串中字母的个数。\n第二行一个由大写字母和小写字母组成的字符串 `T`，代表加密后得到的字符串。\n\n## 输出格式\n\n输出一行一个整数，代表加密前的整数。\n\n\n对于全部数据，保证1 ≤ n ≤ 10^5。",
            explanation: "**解析**\n\n逐字母累加。小写字母按其在a到z中的位置映射到1至26，大写字母取ASCII编码相反数，A至Z映射到−65至−90。示例aAc为1−65+3=−61。原卷示例误写“正整数−65”，本轮保留原词并在转录说明中指出前文已定义为负值。n最多10^5时总和在−9000000至2600000之间，当前int足够。参考程序时间O(n)、字符数组空间O(n)，以输入n与实际长度一致为合法输入前提。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "字符串",
                "模拟"
            ],
            referenceCode: "#include <iostream>\n#include <assert.h>\n#include <cstdlib>\n#include <cstdio>\n#include <cstring>\nusing namespace std;\nconst int N = 100005;\nchar str[N];\nint main() {\n    int n;\n    cin >> n;\n    cin >> str;\n    assert(n == strlen(str));\n    int ans = 0;\n    for (int i = 0; i < n; i++) {\n        if (str[i] >= 'a' && str[i] <= 'z')\n            ans += str[i]-'a'+1;\n        else if (str[i] >= 'A' && str[i] <= 'Z')\n            ans -= str[i];\n        else\n            assert(false);\n    }\n    cout << ans << endl;\n    return 0;\n}",
            answer: "",
            title: "字母求和",
            sourceTranscriptionNote: "原卷p6示例将-65写作“正整数-65”，保留原词。前文明确规定大写字母为ASCII码的相反数，算法按负值计算。"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "5\n1 4 3 3 5",
                    output: "3"
                }
            ],
            question: "\n# [GESP202403 三级] 完全平方数\n\n## 题目描述\n\n小杨同学有一个包含 $n$ 个非负整数的序列 $A$，他想要知道其中有多少对下标组合 $\\langle i,j\\rangle$（$1 \\leq i < j \\leq n$），使得 $A_i + A_j$ 是完全平方数。\n\n如果 $x$ 是完全平方数，则存在非负整数 $y$ 使得 $y \\times y = x$。\n\n## 输入格式\n\n第一行一个非负整数 $n$，表示非负整数个数。\n第二行包含 $n$ 个非负整数 $A_1, A_2, \\dots A_n$，表示序列 $A$ 包含的非负整数。\n\n## 输出格式\n\n输出一行一个整数表示答案。\n\n\n对于全部数据，保证1 ≤ n ≤ 1000，0 ≤ A_i ≤ 10^5。",
            explanation: "**解析**\n\n枚举每个i<j的下标对，检查两元素之和是否为非负整数平方。重复数值的不同下标仍须分别计数，0+0=0也符合定义。合法范围n≤1000、A_i≤10^5使和最多200000，平方根附近用整数平方回查可判断，计数最大为1000×999/2=499500，int安全。样例中下标值为(1,3)的两对以及(4,5)的一对共3对。参考时间O(n²)、数组空间O(n)，独立检查用平方集合和数值频次组合计数。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "枚举",
                "数学"
            ],
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\nconst int N = 1010;\nint a[N];\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 1; i <= n; i++) cin >> a[i];\n    int ans = 0;\n    for(int i = 1; i <= n; i++){\n        for(int j = i+1; j <= n; j++){\n            int m = a[i]+a[j];\n            int t = sqrt(m+1e-7);\n            if(t * t == m) ans++;\n        }\n    }\n    cout << ans << \"\\n\";\n}",
            answer: "",
            title: "完全平方数"
        }
    ]
};
