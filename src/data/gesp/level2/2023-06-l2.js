// 2023年6月 GESP C++ 二级真题
export const paperData = {
    id: "2023-06-l2",
    title: "2023年6月 GESP C++ 二级真题",
    level: 2,
    year: 2023,
    month: 6,
    session: 2,
    note: "首次开启5-8级",
    timeLimit: 5400,
    source: {
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "official",
        notes: "登记mirror中的2023年6月GESP C++二级真题解析，含逐题答案与第三方解析。"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror解析版PDF，参考程序独立编译运行，源疑点隔离。",
        notes: "AI-Codex对照登记mirror第三方解析版PDF全部16页文本与渲染，Git blob SHA 3f62080135559d95a1d9f68bcad1e2049506d24b一致。25题answer保持，Q9语言版本与Q18原文冲突隔离。参考程序及模板另行GNU C++17编译运行。",
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
            question: "高级语言编写的程序需要经过以下（ ）操作，可以生成在计算机上运行的可执行代码。",
            options: [
                "编辑",
                "保存",
                "调试",
                "编译"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n在本题编译型程序的语境下，编译把源代码转换为目标代码，并通过构建和链接等环节形成可执行程序，选 D。编辑修改代码，保存把文件写入存储器，调试检查运行行为，都不负责把源代码翻译成可执行机器指令。实际编译器驱动通常会协调预处理、编译、汇编及链接等步骤。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "能够实现下面流程图功能的伪代码是（ ）。\n\n![原卷流程图](/question-assets/2023-06-l2/q2-flowchart.png)",
            options: [
                "if 条件判断 then 语句块",
                "if 条件判断 then 什么也不做 else 语句块",
                "while 条件判断 do 语句块",
                "while not 条件判断 do 语句块"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n原图先判断条件，否分支执行语句块，再沿返回箭头重新判断。是分支向下离开循环。因此应当在条件不成立时重复，写成 while not 条件判断 do 语句块，选 D。A、B只作一次选择，C在条件成立时循环，与原图的分支方向相反。流程图不能遗漏返回判断框的箭头。",
            tags: [
                "循环",
                "条件判断"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下列关于 C++ 语言的叙述，正确的是（ ）。",
            options: [
                "char类型变量不能赋值给int类型的变量。",
                "两个int类型变量相乘，计算结果还是int类型。",
                "计算两个int类型变量相乘时，如果乘积超出了int类型的取值范围，程序会报错崩溃。",
                "计算两个double类型变量相除时，如果除数的值为0.0，程序会报错崩溃。"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n两个int操作数相乘，表达式类型仍是int，故 B 正确。char可以转换后赋给int。若有符号int乘法溢出，行为未定义，不能保证必然报错崩溃，也不能保证只得到一个固定回绕值。浮点除零的具体表现依赖实现及浮点环境，常见IEEE环境可能产生无穷或NaN，题目所称必然崩溃同样不能保证。",
            tags: [
                "变量与标识符",
                "程序分析"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于C++语言的叙述，不正确的是（ ）。",
            options: [
                "if语句中的判断条件必须用小括号“(”和“)”括起来。",
                "for语句中两个“;”之间的循环条件可以省略，表示循环继续执行的条件一直满足。",
                "循环体包含多条语句时，可以用缩进消除二义性。",
                "除了“先乘除、后加减”，还有很多运算符优先级。"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nC++用语句及花括号确定受控范围，缩进只影响阅读。多条语句若需共同作为循环体，应放入花括号形成复合语句，所以 C 不正确。普通if条件置于括号内，for中省略条件表示继续条件恒真。乘除、加减以外还有关系、逻辑等运算符优先级，不能只按排版判断执行范围。",
            tags: [
                "循环",
                "基础语法"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "以下哪个是 C++ 语言关键字（ ）。",
            options: [
                "main",
                "max",
                "double",
                "sqrt"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\ndouble 是用于浮点类型的关键字，选 C。main 是程序入口函数的名称，max、sqrt 是常见函数名称，本身没有被定义为语言关键字。关键字的身份由语言规定，不能仅凭某个词经常出现在程序中，就把该函数名称当作关键字。使用库函数还须提供相应声明。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "以下哪个不是 C++ 语言运算符（ ）。",
            options: [
                "`>=`",
                "`/=`",
                "`||`",
                "`<>`"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n>= 是大于等于关系运算符，/= 是除后赋值，|| 是逻辑或。这三个都是 C++ 运算符。<>没有被定义为一个不等于运算符，所以选 D。C++比较不等于应使用!=。书写相似字符时要核对语言规定的具体顺序，不能直接沿用其他语言的比较记号。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "若 a 为 int、b 为 char，下列哪个语句不符合 C++ 语法（ ）。",
            options: [
                "a = a+1.0;",
                "a = (int)(b-'0');",
                "b = (char)(a+'0');",
                "(int)b = a;"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n把char转换为int后得到的数值不是可修改的变量，(int)b=a 的左侧不能接受赋值，因此 D 不符合语法。A的double计算结果可以转换回int，B把数码字符减字符0，C把整数与字符0相加后转换为char，语法均允许。赋值转换可能截断或受范围约束，不能把语法允许等同于所有值都符合预期。",
            tags: [
                "变量与标识符",
                "运算符"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "用 int 变量 a、b 表示平行四边形边长，int 变量 h 表示 a 边对应高，以下哪个表达式不能用于计算 b 边对应高（ ）。",
            options: [
                "a / b * (0.0+h)",
                "(0.0+a * h) / b",
                "a * h / (b+0.0)",
                "(a+0.0) * h / b"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n面积为a*h，b边对应高应为a*h/b。A先计算两个int的a/b，若不能整除就已丢失小数，后续乘浮点数无法恢复，故选 A。例如a=3,b=2,h=4，A得4，正确高为6。其他选项在除法前引入double。B、C中的a*h仍先按int相乘，实际使用时还须避免该中间乘积溢出。",
            tags: [
                "运算符",
                "程序分析"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "以下哪个循环语句会无限次执行（ ）。",
            options: [
                "```cpp\nfor (int a = 0; a; a++) ;\n```",
                "```cpp\nfor (bool b = false; b <= true; b++) ;\n```",
                "```cpp\nfor (char c = 'A'; c < 'z'; c++) ;\n```",
                "```cpp\nfor (double d = 0.0; d < 10.0; d += 0.001) ;\n```"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。解析版给 B，依赖旧标准允许bool自增后保持true的规则。C++17草案明确把bool排除在后置自增的算术操作数之外，因此原B选项不能通过C++17编译。A初始条件为0不执行，C、D在通常执行环境下均会终止。题目未指定语言版本，保留answer=1并暂停计分，等待澄清。[C++17草案](https://timsong-cpp.github.io/cppwp/n4659/expr.post.incr)",
            tags: [
                "循环",
                "程序分析"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。解析版p5给B，但原选项对bool使用b++。C++17不允许bool自增，无法作为可执行无限循环。题目未注明采用旧标准，保留answer=1并暂停计分，待语言版本澄清。"
        },
        {
            id: 10,
            type: "single",
            question: "若 char 变量 a 的值为 'C'（ASCII 67），执行 cout << (a+2); 输出（ ）。",
            options: [
                "E",
                "C+2",
                "C2",
                "69"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nchar参与与整数2的加法时先作整型提升。题中已给字符C的ASCII码是67，因此a+2得到int值69，cout按整数输出，选 D。如果显式转换成char再输出，才会在ASCII环境下得到字符E。原表达式没有该转换，也没有把a或加号作为字符串文字输出。",
            tags: [
                "输入输出",
                "运算符"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "若 a、b 均为 int，能正确判断“a 等于 1 且 b 等于 1”的表达式是（ ）。",
            options: [
                "(a == b) && (b == 1)",
                "(a && b)",
                "(a == b == 1)",
                "(a * b == 1)"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nA要求a等于b且b等于1，两条件合起来恰好是a=b=1，因此选 A。B只要求两者非零，C按左结合比较会接受任意相等的a、b。D还会接受a=b=-1。可用a=b=2否定B、C，用a=b=-1否定D。逻辑真值不能直接代替具体数值必须等于1的要求。",
            tags: [
                "条件判断",
                "运算符"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "若 a 为 char，哪个表达式可正确判断“a 是数字字符”（ ）。",
            options: [
                "'0' <= a && a <= '9'",
                "'1' <= a && a <= '0'",
                "'0' <= a <= '9'",
                "'1' <= a <= '0'"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n字符0至字符9是数字字符，必须同时满足下界和上界，故 A 正确。B的区间上下界写反，不能接受数字字符。C、D属于连续比较，先把左侧比较算成bool，再与右侧字符比较，不等同于数学区间判断。这里检查的是单个数字字符，不是变量中数值是否在整数0至9之间。",
            tags: [
                "条件判断",
                "运算符"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在下列代码的横线处填写（ ），使得输出是 9。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    char a = '3', b = '6';\n    cout << ________;  // 在此处填入代码\n    return 0;\n}\n```",
            options: [
                "(a+b)",
                "(a+b-'0')",
                "(char)(a+b)",
                "(char)(a+b-'0')"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nASCII中字符3为51，字符6为54，相加为105，减去字符0的48得57。将57显式转换为char后，cout输出字符9，选 D。A输出整数105，B输出整数57，C将105转为字符i。char本身属于整型，原解析把char说成非数值类型的表述需要纠正。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "字符与ASCII",
                "运算符"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是 42。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 20; i++)\n        if (________)  // 在此处填入代码\n            sum += i;\n    cout << sum << endl;\n    return 0;\n}\n```",
            options: [
                "i % 3 == 0",
                "20 % i == 0",
                "i <= 8",
                "i >= 18"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nB检查20是否能被i整除，选中1、2、4、5、10、20，它们之和为42，所以选 B。A累加3、6、9、12、15、18得63，C累加1至8得36，D累加18至20得57。循环包含i=20且从1开始，因此求余除数始终非零，不会漏掉20本身这一因数。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "循环",
                "条件判断"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "执行以下 C++语言程序后，输出结果是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    for (char x = 'A'; x <= 'D'; x++)\n        if ((x != 'A') + (x == 'C') + (x == 'D') + (x != 'D') == 3)\n            cout << x;\n    return 0;\n}\n```",
            options: [
                "A",
                "B",
                "C",
                "D"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n每个比较表达式转换为整数0或1后相加。x依次为A、B、C、D时，四个条件的真值个数分别为1、2、3、2，只有C满足总和等于3，输出字符C，选 C。这里的加号是在计数条件成立个数，不能当成逻辑或，也不是判断所有四个条件同时成立。",
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "循环",
                "字符与ASCII",
                "运算符"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "诞生于1986年的中华学习机CEC-I入选了2021年的CCF计算机历史记忆（一类），它的内存只有64KB。当时的汉字编码字符集GB2312中共有6763个汉字，假如每个汉字用2个字节编码，将整个GB2312汉字字符集都放入CEC-I的内存，也只占用了不超过1/5的内存空间。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n6763个汉字各2字节，共13526字节。按题源1024换算，64KB为65536字节，其五分之一为13107.2字节，13526更大，因此判断错误。即使用十进制64KB=64000字节，其五分之一12800也更小，结论相同。只计算题中给定编码字节数即可，无需额外假设软件开销。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "域名是由一串用点分隔的名字来标识互联网上一个计算机或计算机组的名称，CCF编程能力等级认证官方网站的域名是gesp.ccf.org.cn，其中顶级域名是gesp。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n完整域名中，最右端的cn是顶级域名标签，gesp位于左端，用来标识该层子域，题目把顶级域名说成gesp，判断错误。org、ccf也分别处在不同层级。域名从右向左逐层划分，不能把网址的最前一段或网站显示名称当作顶级域名。",
            tags: [
                "网络基础"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "在使用C++语言编写程序时，不能使用sqrt、abs等数学函数，包含`<cmath>`或`<math.h>`头文件后就能够使用了。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。原PDF先说使用C++编写程序时“不能使用sqrt、abs等数学函数”，随后说包含cmath或math.h后能够使用，答案判正确。首句未限定未包含头文件的情境，文字前后冲突。现题库曾把它改成使用前需包含头文件，改变了原判断命题。现恢复原文，保留answer=0并暂停计分，等待来源澄清。实际调用应包含适当头文件并处理命名空间。",
            tags: [
                "基础语法"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。解析版p9原文先称不能使用sqrt、abs等数学函数，随后又称包含头文件后能够使用，判√。原题没有给首句增加未包含头文件的条件。恢复原文并保留answer=0，暂停计分，等待来源澄清。"
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 中，下划线“_”既可用于标识符命名，也是运算符。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n标识符中允许出现下划线，例如local_value，题目第一部分成立。但下划线本身不是C++运算符，所以整个判断错误。允许用作名称字符与具有运算含义是两种不同规则。具体以下划线开头的名称还要遵守实现保留标识符限制，不能据此推断任意下划线名称都可自由定义。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "若 a 为 double 且 a=3.5，则 a*10 结果是 35 且类型为 int。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\na是double，整数10在与a相乘时转换为double，乘积类型为double，数值是35.0。因此原判断虽然数值部分为35成立，但类型为int的部分错误，整体应判错误。cout默认可能显示35而不带小数点，这种显示格式不会把表达式本身的类型改成整数。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "if 语句中，若条件成立需执行多条语句，可用花括号把这些语句括起来。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n花括号把多条语句组合成一个复合语句，放在if后就可以让这些语句共同受同一条件控制，因此判断正确。若省略花括号，通常只有紧接的一条语句受if控制，其后语句仍按外层流程执行。缩进有助阅读，但不参与决定C++语句的控制范围。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "循环语句的循环体有可能无限制执行下去。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n若循环条件一直成立且没有执行退出动作，循环体可能持续执行，因此判断正确。例如条件依赖的变量没有被更新时就可能无法结束。分析循环应同时检查初始化、条件、变量更新及break等出口。题目说“有可能”，并未声称每个循环都会无限执行。",
            tags: [
                "循环"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "++ 和 == 是 C++ 运算符，但 += 不是。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n++是自增运算符，==是相等比较，+=是复合加赋值，三个都是C++运算符。因此“+=不是”的说法错误。对简单变量，a+=b把a+b的结果赋回a，a==b仅产生比较真值，不更新a。不能把多个字符组成的运算符误认为几个互不相关的符号。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "若 a 为 char 且值为大写字母 F，执行 a = a+1 后，a 变为 G。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在题目采用的ASCII环境中，大写字母F和G的编码相邻。a+1先进行整型提升得到下一个编码，赋回char变量a后就是G，因此判断正确。赋值步骤保存了新值，如果只写a+1而不赋回，a会保持原字符。字符F与未加引号的变量名F也应区分。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "表达式 sqrt(9.0) 的结果为 3，且结果类型为 int。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n9.0是double字面量，sqrt相应重载返回double，数值为3.0。原判断把返回类型说成int，因此整体错误。输出时显示3并不能证明类型是整数，若显式赋给int变量，才会发生另一次结果转换。应包含cmath并使用正确的函数声明及命名空间。",
            tags: [
                "数据类型"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "找素数",
            samples: [
                {
                    input: "2\n10",
                    output: "4"
                },
                {
                    input: "98\n100",
                    output: "0"
                }
            ],
            question: "\n# [GESP202306 二级] 找素数\n\n## 题目描述\n\n小明刚刚学习了素数的概念：如果一个大于 $1$ 的正整数，除了 $1$ 和它自身外，不能被其他正整数整除，则这个正整数是素数。现在，小明想找到两个正整数 $A$ 和 $B$ 之间（包括 $A$ 和 $B$）有多少个素数。\n\n## 输入格式\n\n输入2行，第一行包含正整数 $A$，第二行包含正整数 $B$。约定 $2 \\le A \\le B \\le 1000$。\n\n## 输出格式\n\n输出一行，包含一个整数 $C$，表示找到 $C$ 个素数。\n",
            score: 25,
            explanation: "**解析**\n\n遍历包含端点的区间A至B，对每个数n从2试除到平方根，找到因子即可判合数，否则计数。若合数两个因子都大于平方根，乘积会超过n，因此检查到平方根已足够。范围2<=A<=B<=1000保证无需把1作为素数，样例2..10有4个，98..100有0个。程序用空白提取整数，能处理原卷两行输入。时间O((B-A+1)√B)、空间O(1)。",
            tags: [
                "编程题",
                "枚举",
                "素数"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // \n    return 0;\n}",
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPrime(int x) {\n    if (x < 2) return false;\n    for (int d = 2; d * d <= x; ++d) {\n        if (x % d == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int A, B;\n    cin >> A >> B;\n    int ans = 0;\n    for (int x = A; x <= B; ++x) if (isPrime(x)) ++ans;\n    cout << ans << endl;\n    return 0;\n}",
            answer: ""
        },
        {
            id: 27,
            type: "programming",
            title: "自幂数判断",
            samples: [
                {
                    input: "3\n152\n111\n153",
                    output: "F\nF\nT"
                },
                {
                    input: "5\n8208\n548834\n88593477\n12345\n5432",
                    output: "T\nT\nT\nF\nF"
                }
            ],
            question: "\n# [GESP202306 二级] 自幂数判断\n\n## 题目描述\n\n自幂数是指，一个 $N$ 位数，满足各位数字 $N$ 次方之和是本身。\n例如，$1634$ 是4位数，$1^4+6^4+3^4+4^4=1634$，因此1634是自幂数。\n例如，$153$ 是 $3$ 位数，$1^3+5^3+3^3=153$，因此 $153$ 是自幂数。\n\n## 输入格式\n\n第一行是一个正整数 $M$，约定 $1 \\le M \\le 100$。从第2行开始的 $M$ 行，每行一个待判断的正整数，均小于 $10^8$。\n\n## 输出格式\n\n输出 $M$ 行，如果是自幂数输出英文大写字母 T，否则输出 F。可以输入一个数就判断并输出，不必等全部输入结束。\n",
            score: 25,
            explanation: "**解析**\n\n先统计待判断正整数的位数L，再把每一位的L次方累加，与原数比较。幂使用整数乘法，避免浮点pow后比较产生误差。M在1..100内，每个正整数小于10^8，最多8位，幂和至多8*9^8=344373768，long long足够。153、1634等应输出T。逐个读入并立即输出是允许的，0不在题目合法域。参考代码保留，时间O(M L²)、额外空间O(1)。",
            tags: [
                "编程题",
                "模拟",
                "数位分解"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int m;\n    cin >> m;\n    // \n    return 0;\n}",
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long ipow(long long a, int b) {\n    long long r = 1;\n    while (b--) r *= a;\n    return r;\n}\n\nbool ok(long long x) {\n    if (x == 0) return true;\n    int len = 0;\n    long long t = x;\n    while (t > 0) { len++; t /= 10; }\n    long long sum = 0; t = x;\n    while (t > 0) {\n        sum += ipow(t % 10, len);\n        t /= 10;\n    }\n    return sum == x;\n}\n\nint main() {\n    int M;\n    cin >> M;\n    while (M--) {\n        long long x;\n        cin >> x;\n        cout << (ok(x) ? 'T' : 'F') << endl;\n    }\n    return 0;\n}",
            answer: ""
        }
    ]
};
