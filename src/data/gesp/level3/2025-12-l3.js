// 2025-12-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-12-l3",
    title: "2025年12月 GESP C++ 三级真题",
    level: 3,
    year: 2025,
    month: 12,
    session: 12,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1723012369874976.pdf",
        notes: "AI-Codex于2026-11-08逐页对照登记mirror PDF全部10页，补原流程图、分词、完整代码及数据范围，27个答案字段保持。Q22类型前提来源疑点保留隔离。两参考程序及模板经GNU C++17编译与独立样例边界核验。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B412%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部10页及答案表，Git blob SHA 0e53148a247d948c01155e55b49c20fe737ed6ed一致。27个answer字段保持，Q22类型前提疑点隔离，补Q12原流程图、Q19原分词、Q22漏录程序和两编程题范围，逐题重写解析并独立运行参考。",
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
            question: "请将二进制数 (1101.101)₂ 转换为等值的 10 进制数（ ）。",
            options: [
                "14.25",
                "13.625",
                "13.5",
                "14.5"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n按二进制位权展开，整数部分为 8+4+1=13，小数部分为 1/2+1/8=0.625，所以结果为 13.625。小数点后的第一、二、三位分别对应 1/2、1/4、1/8。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "以下关于标准 C++ 一维数组的描述，哪一项是错误的？（ ）",
            options: [
                "数组的下标从 0 开始",
                "数组在内存中是连续存放的",
                "数组的长度只能在运行时才能确定",
                "可以在程序中修改数组某个元素的值"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n内置一维数组下标从 0 开始，元素连续存放，非 const 元素可以通过下标修改。固定长度数组的界限需要常量表达式，定义时即可确定，因此“只能在运行时确定”错误。动态分配数组可以在运行时选定长度，也不能据此支持“只能”这一说法。",
            tags: [
                "数组",
                "计算机基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下列代码段执行后，变量 sum 的值是（ ）。\n\n```cpp\n{\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 8 >> 2)\n            continue;\n        sum += i;\n    }\n}\n```",
            options: [
                "12",
                "17",
                "33",
                "40"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n移位优先级高于相等比较，先算 8>>2 得 2，再比较 i%3 是否等于 2。i=2、5、8 时 continue 跳过累加，其余数相加为 55−2−5−8=40。continue 后仍执行 for 的 i++，循环可以正常结束。",
            tags: [
                "位运算",
                "循环"
            ],
            code: "{\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 8 >> 2)\n            continue;\n        sum += i;\n    }\n}",
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08"
        },
        {
            id: 4,
            type: "single",
            question: "执行以下程序段，输出值是（ ）。\n```cpp\nint x = 5;\nif (x == 3 >> 2) x = 8 >> 3;\ncout << x << endl;\n```",
            options: [
                "0",
                "5",
                "120",
                "1"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n右移优先级高于 ==，条件相当于 x==(3>>2)。3>>2 为 0，初值 5 与 0 不相等，赋值语句不执行。输出仍为 5。8>>3 本身为 1，但本题不会执行这一赋值。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "已知字符串 s = \"C++ Programming\"，下列程序运行的结果是（ ）。\n```cpp\ncout << (int)(s.length() | 3) << endl;\n```",
            options: [
                "14",
                "15",
                "16",
                "17"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nC++ 有 3 个字符，加 1 个空格和 Programming 的 11 个字符，s.length() 为 15。15 的低四位全是 1，与 3 按位或仍为 15，转换成 int 后输出 15。空格也计入字符串长度。",
            tags: [
                "位运算",
                "字符与ASCII",
                "字符串"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "以下代码是一个程序的部分代码，能够正确执行，输出的结果是（ ）。\n```cpp\nint arr[5] = {1, 2, 3, 4, 5};\nint p = arr[1];\ncout << (p+2) << endl;\n```",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n数组下标从 0 开始，arr[1] 为第二个元素 2。p 保存这个整数值，所以 p+2 为 4。这段代码没有声明指针，也没有执行指针偏移。选项 A 把下标误当成元素值，选项 B 只取到了 p 自身的值，选项 C 相当于忽略数组从 0 起算的规则。整个计算中数组内容保持不变，表达式 p+2 只产生加法结果。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "以下关于 C++ 求最小值函数 min() 的描述，不正确的是（ ）。",
            options: [
                "函数必须返回一个值",
                "该函数可以嵌套调用",
                "调用 min(5) 是错误的，不能通过编译",
                "调用 min()（不传任何参数）可以通过编译，结果为 0"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n这里讨论标准库求最小值函数 std::min。常见重载需要两个待比较值，也可以使用非空初始化列表。min(5) 没有匹配重载，min() 同样没有匹配重载，更不会自动返回 0。嵌套 min(5,min(2,3)) 合法，返回最小值 2，因此不正确的是 D。",
            tags: [
                "函数"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "在一个特定的计算机系统中，假如 unsigned int 类型需要占用 2 个字节的存储空间（每个字节有 8 位），则 unsigned int 可以表示的数据范围是（ ）。",
            options: [
                "0 ~ 65535",
                "0 ~ 65536",
                "-65536 ~ 65535",
                "0 ~ 32767"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n题设明确 2 字节、每字节 8 位，共 16 位无符号数。全部位用于表示非负数，一共有 2^16 个值，从 0 到 2^16−1，即 65535。此处按题设计算，不以本机 unsigned int 的实际宽度替代。",
            tags: [
                "位运算",
                "按位取反",
                "计算机基础"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "以下代码执行后，数组 arr 的内容是（ ）。\n```cpp\nint arr[6] = {1, 2, 3, 4, 5, 6};\nfor (int i = 0; i < 6; i += 2) {\n arr[i] = arr[i]+arr[i+1];\n arr[i+1] = arr[i]-arr[i+1];\n arr[i] = arr[i]-arr[i+1];\n}\n```",
            options: [
                "{2,1,4,3,6,5}",
                "{1,2,3,4,5,6}",
                "{3,1,4,2,5,3}",
                "{1,3,2,5,4,6}"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n每轮处理相邻一对。设原值为 u、v，先变为 u+v、v，再变为 u+v、u，最后变为 v、u。三对 (1,2)、(3,4)、(5,6) 交换后得到 {2,1,4,3,6,5}。本题给定的小整数相加不会溢出，不能把这一技巧无条件推广到任意 int。",
            tags: [
                "数组",
                "循环"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "a & b | (c ^ d)，其中 a = 3，b = 7，c = 15，d = 4，计算结果是（ ）。",
            options: [
                "十进制 11",
                "二进制 11",
                "八进制 11",
                "十六进制 11"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n按位与优先级高于按位或，原式为 (a&b)|(c^d)。3&7=3，15^4=11，3|11=11。选项 A 的十进制 11 符合，二进制 11、八进制 11、十六进制 11 分别表示十进制 3、9、17。",
            tags: [
                "二进制",
                "补码",
                "进制转换",
                "位运算"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "整型变量 x 的初始值为 10，以下代码的输出结果是（ ）。\n```cpp\nint t = x--;\nt -= x;\ncout << t << endl;\n```",
            options: [
                "0",
                "-1",
                "1",
                "死循环"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n后缀自减先提供旧值再改变变量。int t=x-- 之后 t=10、x=9，接着 t-=x 得 1，所以输出 1。两个语句分开执行，没有同一完整表达式多次修改 x 的求值问题。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "根据下面的流程图，如果成绩 score 输入 60，输出的结果是（ ）。\n\n![成绩流程图，输入score，先判断score是否大于等于90，是则输出优秀，否则判断score是否大于等于60，是则输出及格，否则输出不及格，各分支最后结束。](/question-assets/2025-12-l3/q12-flow.png)",
            options: [
                "优秀",
                "及格",
                "不及格",
                "没有输出"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n流程图先判断 score≥90。60 不满足，沿“否”分支进入 score≥60，等号使 60 满足条件，沿“是”分支输出及格，然后结束。边界 59、60、89、90 分别进入不及格、及格、及格、优秀。",
            tags: [
                "流程图"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "以下代码运行后，sum 的结果是（ ）。\n```cpp\nint arr[5] = {2, 4, 6, 8, 10};\nint sum = 0;\nfor (int i = 0; i < 5; i++) {\n switch (arr[i] % (1 | 2)) {\n case 0: sum += 1; break;\n case 1: sum += 2; break;\n case 2: sum += 3; break;\n }\n}\n```",
            options: [
                "10",
                "11",
                "14",
                "15"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n1|2 是按位或，结果为 3。数组元素 2、4、6、8、10 除以 3 的余数依次为 2、1、0、2、1，对应给 sum 加 3、2、1、3、2，总和为 11。每个 case 末尾都有 break，不会继续落入后面的分支。",
            tags: [
                "循环",
                "条件判断"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "以下关于 C++ 中 abs() 函数的描述，正确的是（ ）。",
            options: [
                "abs() 函数可用于计算 int 类型整数的绝对值，头文件为 <cmath> 或 <cstdlib>",
                "调用 abs(3.14) 可以四舍五入得到 3",
                "abs(-1, -2) 的返回值是 1",
                "若传入负数浮点数，abs() 会自动截断小数部分后返回整数绝对值"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n使用适当的标准头文件及 std::abs 重载可以求 int 绝对值，所以 A 正确。浮点重载 abs(3.14) 返回 3.14，abs(-3.14) 返回 3.14，不负责四舍五入或截断。abs(-1,-2) 没有双参数重载。对最小负整数取绝对值还必须注意结果是否能由返回类型表示。",
            tags: [
                "函数"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "如果字符串 s 的值是 GESP，以下代码 s 的最后结果是（ ）。\n```cpp\nfor (int i = 0; i < s.length(); i++) {\n s[i] = toupper(s[i]+i);\n}\n```",
            options: [
                "GESP",
                "HFTR",
                "hesp",
                "GFUS"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n在题目使用的 ASCII 字符编码下，依次把 G、E、S、P 的字符值加 0、1、2、3，得到 G、F、U、S。这些字母已经大写，toupper 不再改变它们，最终字符串为 GFUS。循环只修改元素值，字符串长度不变。",
            tags: [
                "字符与ASCII",
                "字符串",
                "循环"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在 C++ 中，数组名不能改变，数组名不能被赋值。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n这里的数组名表示已定义的数组对象，不能像指针变量那样改为指向另一块存储，也不能通过 a=b 给整个内置数组赋值。数组中的可修改元素仍然可以逐个赋值，不应把数组名不可赋值理解成所有元素都不可修改。",
            tags: [
                "数组"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "整型变量 a 的值为 3，浮点数变量 b 的值为 3.5，在 C++ 编译环境下，经过 a *= b 计算后，a 的值变为 10.5，此时如果输出 a，将输出 10.5。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\na 的声明类型仍为 int。a*=b 先按浮点运算得到 10.5，再转换为 int 存回 a，小数部分舍弃，最后输出 10。复合赋值不会把 a 的类型自动改成浮点类型，所以原说法错误。",
            tags: [
                "类型转换"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "strcmp(str1, str2) 返回 0 表示 str1 大于 str2，返回正数表示两者相等。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nstrcmp 按字符序列进行字典序比较，结果为 0 表示内容相等，正数表示第一个字符串较大，负数表示第一个字符串较小。结果只保证符号，不保证差值一定等于 1 或 −1，原文把 0 与正数的意义颠倒。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "以下代码输出结果为 8。\n\n```cpp\nint a = 5, b = 3;\nint c = a++ + ++b;\ncout << c << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原 PDF 明确写作 a++ + ++b，三个运算之间有空格。a++ 提供旧值 5，++b 把 b 从 3 增加到 4 并提供 4，c=9，随后 a=6、b=4。输出 9，因此“输出 8”错误。若删去间隔写成 a+++++b，词法分组会改变并导致编译错误，题面必须保留原分词。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "位运算符 &、|、^、~ 的优先级高于算术运算符 +、-、*、/。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原说法把四种位运算一并断言为高于算术运算，错误。单目 ~ 的优先级确实较高，但二元 &、^、| 都低于 +、−、*、/。例如 1|2+1 按 1|(2+1) 计算为 3，加括号成为 (1|2)+1 才是 4。",
            tags: [
                "位运算",
                "按位取反",
                "运算符"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 中，int a[] = {1, 2, 3, 4, 5}; 可以定义一个包含 5 个元素的整型数组。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n省略数组界限而提供完整初始化列表时，编译器依据初始化项数量推导长度。这里有 5 个 int 初始化项，得到长度 5 的数组，有效下标为 0..4。sizeof(a)/sizeof(a[0]) 可在数组尚未退化为指针的当前位置得到 5。",
            tags: [
                "数组",
                "计算机基础"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "C++ 表达式 `z = a > b ? x : y` 等同于\n\n```cpp\nif (a > b) {\n    z = x;\n} else {\n    z = y;\n}\n```\n\n以下代码执行后，输出将会是 2。\n\n```cpp\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    cout << arr[3 > 2 ? 1 : 2] << endl;\n    return 0;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n官方判断为正确，后附数组代码也确实输出 2，因为 3>2 为真，选中下标 1。前半句若默认 x、y 为同型普通整数，分支选择与 if/else 一致，但原文未声明类型，不能一般化保证赋值结果相同。条件运算符会先为两个候选操作数确定共同类型，例如 int x=-1、unsigned int y=1，条件为真且以 double z 接收时，条件表达式先将 x 转为 unsigned int，再转为 double，而 if 分支直接将 −1 转为 double，结果不同。本机 32 位 unsigned int 实际得到 4294967295 与 −1。保留官方 answer，记录 ANSWER-DOUBT 并暂停计分，等待来源明确类型前提。",
            tags: [
                "条件判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT Q22。条件表达式与if/else等价缺少操作数类型前提，混合int负值与unsigned int时的共同类型转换会改变赋给double的结果。官方√保持，等待来源澄清。"
        },
        {
            id: 23,
            type: "judge",
            question: "在 C++ 中，++ 和 -- 运算符只能用于整型变量，不能用于浮点数变量。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n前缀和后缀 ++、-- 都可用于可修改的浮点变量。例如 double x=1.5，++x 后为 2.5，x-- 后回到 1.5。因此“只能用于整型，不能用于浮点数”错误。类型是否可修改与是否支持这些运算同样需要满足。",
            tags: [
                "类型转换"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "给定一个正整数 a，当需要计算 -a 的补码时，有这样一个计算技巧：将 a 的二进制形式从右往左扫描，遇到第一个 1 之后，将找到的第一个 1 左边的所有位都取反，能得到 -a 的补码。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在选定的固定二进制位宽下，负数补码可由按位取反再加 1 得到。加 1 会把最低位开始连续的 1 变回 0，并把第一个 0 变成 1，对应原正数最低的 1 及其右侧各位保持不变，左侧所有位取反。例如 8 位的 12 为 00001100，按规则得到 11110100，即 −12 的补码。计算应保留同一位宽及前导位。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "以下代码中，Hello 将被输出 5 次。\n```cpp\nfor (int i = 0; i < 5; i++);\n{\n cout << \"Hello\" << endl;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nfor 行末的分号构成空循环体。i 从 0 递增到 5，循环结束后，后面的独立花括号块只执行一次，因此 Hello 只输出一次。块中的输出不依赖循环变量 i，不会因为 i 已离开作用域而出错。",
            tags: [
                "位运算",
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
                    input: "6\nPAs1s2an\n1a2bCql3\nPa12bsna\nab1da3cd\nPaabdbcd\nPa2",
                    output: "Y\nY\nY\nN\nN\nN"
                }
            ],
            question: "\n# [GESP202512 三级] 密码强度\n\n## 题目描述\n\n小杨是学校网络安全小组的成员，今天他的任务是设计一个“密码强度检测器”，帮助同学们检查自己的密码是否足够安全。一个安全的密码需要满足以下条件：\n\n- 密码至少包含 $8$ 个字符（太短的密码容易被猜出来哦！）。\n- 密码至少包含一个大写字母（A、B、C、...、Z 都可以）。\n- 密码至少包含一个数字（0、1、2、3、...、9 都可以）。\n\n例如：\n\n- 密码 `PAs1s2an` 是安全密码（有 $8$ 位、包含大写字母 `P`、`A` 和数字 `1`、`2`）。\n- 密码 `ab1da3cd` 不是安全密码（没有大写字母）。\n- 密码 `Paabdbcd` 不是安全密码（没有数字）。\n- 密码 `Pa2` 不是安全密码（只有 $3$ 位，太短了）。\n\n## 输入格式\n\n第一行一个正整数 $T$，代表需要安全检测的密码组数。\n\n对于每组密码，一行包含一个字符串，代表需要安全检测的密码。\n\n## 输出格式\n\n对于每组密码，输出一行，如果满足强度要求输出 Y，否则输出 N。\n\n## 数据范围\n\n对于所有测试点，保证 $1 \\le T \\le 100$，每组密码长度至少为 $1$ 且不超过 $100$，每组密码仅由大小写字母和数字组成。\n\n时间限制 1 秒。内存限制 512 MB。\n",
            explanation: "**解析**\n\n对每个密码独立记录是否出现大写字母和数字，并检查长度是否至少为 8，三个条件全部成立才输出 Y。遍历当前串时只把两个布尔标记设为真，每组开始重新置为假，避免上一组状态泄漏。样例六组依次为 Y、Y、Y、N、N、N。原范围为 T≤100、串长 1..100 且仅含英文字母和数字，均为字符分类函数的合法 ASCII 输入。参考程序逐组遍历，总时间 O(全部字符数)，除输入字符串外额外空间 O(1)。独立核验以正则存在性谓词判定，覆盖 7/8/9/100 长度、字母数字边界和多组重置。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "字符串",
                "模拟"
            ],
            referenceCode: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int T;\n    cin >> T;\n    while (T--) {\n        string password;\n        cin >> password;\n        bool has_upper = false;\n        bool has_digit = false;\n        for (size_t i = 0; i < password.length(); ++i) {\n            if (isupper(password[i])) {\n                has_upper = true;\n            }\n            if (isdigit(password[i])) {\n                has_digit = true;\n            }\n        }\n        if (password.length() >= 8 && has_upper && has_digit) {\n            cout << \"Y\\n\";\n        } else {\n            cout << \"N\\n\";\n        }\n    }\n    return 0;\n}",
            answer: ""
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "2 5\n1 1\n1 2\n1 1\n2 3\n2 10",
                    output: "4"
                }
            ],
            question: "\n# [GESP202512 三级] 小杨的智慧购物\n\n## 题目描述\n\n小杨的班级要举办一个环保手工作品展览，老师请小杨去文具店购买 $M$ 种不同的文具（例如：铅笔、橡皮、尺子等）。\n\n商店里共有 $N$ 件文具，每件文具都有一个种类编号（从 $1$ 到 $M$）和价格。\n\n小杨的预算有限，他想了一个聪明的办法：对于每种文具，他只买最便宜的那一件（如果同种文具有多件价格相同且都是最便宜的，他只会购买其中的一件）。请你帮小杨计算出，买齐这 $M$ 种文具一共需要花费多少钱。\n\n## 输入格式\n\n第一行两个正整数 $M, N$，代表文具的种类数和总数。\n\n之后 $N$ 行，每行两个正整数 $K_i$ 和 $P_i$，分别代表第 $i$ 件文具的种类编号和它的价格。数据保证每个种类至少有一件文具可供购买。\n\n## 输出格式\n\n输出一行，代表购买文具的总价。\n\n## 数据范围\n\n对于所有测试点，保证 $1 \\le M \\le N \\le 10^5$，$1 \\le K_i \\le M$，$1 \\le P_i \\le 10^3$。\n\n时间限制 1 秒。内存限制 512 MB。\n",
            explanation: "**解析**\n\n每个种类独立挑最便宜的一件。读入时维护 min_price[K]=min(min_price[K],P)，结束后对种类 1..M 的最低价求和。循环不变量是每个数组项保存该种类目前读到的最低价，初值 10^9 大于价格上界 1000，而题设保证每类存在，因此最终都被有效价格替换。样例两类最低价为 1 和 3，总价 4。原范围 M≤N≤10^5，最大总价为 10^5×1000=10^8，在本题常用 32 位 int 范围内，现有 int 累加安全。时间 O(M+N)，有效辅助空间 O(M)，参考数组固定分配 100005 项。独立预言机按价格排序后首次选取各类，覆盖相同最低价、最便宜商品最后出现及最大种类数。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "模拟",
                "最值统计",
                "数组"
            ],
            referenceCode: "#include <iostream>\n#include <cstring>\nusing namespace std;\nint min_price[100005];\nint main() {\n    int M, N;\n    cin >> M >> N;\n    for (int i = 0; i <= M; i ++)\n        min_price[i] = 1000000000;\n    for (int i = 0; i < N; ++i) {\n        int K, P;\n        cin >> K >> P;\n        min_price[K] = min(min_price[K], P);\n    }\n    int total_cost = 0;\n    for (int k = 1; k <= M; ++k) {\n        total_cost += min_price[k];\n    }\n    cout << total_cost;\n    return 0;\n}",
            answer: ""
        }
    ]
};
