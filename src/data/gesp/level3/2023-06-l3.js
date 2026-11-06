// 2023-06-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-06-l3",
    title: "2023年6月 GESP C++ 三级真题",
    level: 3,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1569361659691040.pdf",
        type: "official-analysis",
        notes: "2023-06 三级目前对照的是 CCF 官方真题解析 PDF，而非单独试卷 PDF。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B46%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf"
    },
    verification: {
        status: "verified",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror的15页《2023年6月GESP C++三级真题解析》PDF（非独立原始试卷，答案逐题红色内嵌，无独立答案表）；Git blob SHA 8ce76e5847382b18cafa0052ff9f89d8b77dfbe2一致。恢复原Q13–15完整框架、Q14数组及边界、Q8/Q9选项及判断前提，修复编程样例说明乱码，重写27题解析。全部answer保持，两参考程序以等价题库实现独立编译运行。",
        dimensions: {
            statement: "verified",
            options: "verified",
            answer: "verified",
            explanation: "verified",
            referenceCode: "verified"
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
            explanation: "**答案 D**\n\n在给定四项中，编译将源代码翻译成机器可以执行的形式，故D。编辑只修改源码，保存只把内容写入存储，调试用于观察并排查运行问题。完整C++可执行文件通常还需链接等步骤，不能把所有高级语言都说成只能按同一种编译流程运行；本题按编程环境的基本概念区分操作。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "二进制数 11.01 在十进制下是（ ）。",
            options: [
                "3.01",
                "3.05",
                "3.125",
                "3.25"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n二进制11.01按位权展开为1*2+1*1+0*(1/2)+1*(1/4)=3.25，选D。小数点后的位权依次为二分之一、四分之一等，不是把二进制小数点后01直接当成十进制0.01，也不是八分之一0.125。整数部分11对应十进制3。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "已知大写字符'A'的 ASCII 编码的十六进制表示为 0x41，则字符'F'的 ASCII 编码的十六进制表示为（ ）。",
            options: [
                "46",
                "47",
                "48",
                "49"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nASCII大写字母连续排列，F比A后移5位；0x41加5为0x46，所以十六进制写作46，选A。这里问的是十六进制表示，不是十进制数46；0x46实际对应十进制70。不能把从A数到F的字母个数6误当成编码差值。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "以下哪个不是 C++语言中的运算符？（ ）",
            options: [
                "&",
                "&&",
                "*",
                "**"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n&可以表示按位与或取地址，&&是逻辑与，*可以表示乘法或解引用，均为C++运算符；**不是一个独立运算符，选D。两个连续星号在某些合法表达式中可以分别充当两个解引用运算符，但这不会使**成为C++的乘方运算符。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "如果字符串定义为 char str[] = \"Hello\";，则字符数组 str 的长度为（ ）。",
            options: [
                "0",
                "5",
                "6",
                "7"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n字符串字面量Hello含5个可见字符，末尾还带一个空字符\\0作为终止标记，初始化未指定长度的char数组时推导出6个元素，所以C。数组元素数与C风格字符串内容长度不同：sizeof(str)为6，strlen(str)为5，不能把二者混为同一个长度。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "一个数组定义为 double array[3];，则这个数组占用内存的大小为（ ）。",
            options: [
                "24",
                "12",
                "6",
                "3"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n在本卷常用的double占8字节实现中，3个double共3*8=24字节，选A。一般公式是3*sizeof(double)，C++标准不把所有平台的double大小都固定为8。本次MinGW运行环境中实际sizeof(double)=8，sizeof(array)=24；数组元素之间没有额外的逐元素填充。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "以下数组定义，符合 C++语言语法的是（ ）。",
            options: [
                "int a[];",
                "int b['3'];",
                "int c[3.0];",
                "int[3] d;"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n字符常量'3'属于整型可提升值，可作数组长度常量表达式，在ASCII环境对应51，所以B语法合法。A没有长度也没有初始化信息，不能在这种普通数组定义中推导大小；C以浮点数作长度不合法；D把维度放在类型和变量名之间，语法位置错误。",
            tags: [
                "数组"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下列关于进制的叙述，不正确的是（ ）。",
            options: [
                "正整数的二进制表示中只会出现0和1。",
                "10不是2的整数次幂，所以十进制数无法转换为二进制数。",
                "从二进制转换为8进制时，可以很方便地由低到高将每3位二进制位转换为对应的一位8进制位。",
                "从二进制转换为16进制时，可以很方便地由低到高将每4位二进制位转换为对应的一位16进制位。"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n正整数可以在十进制与二进制等进制之间表示转换，10不是2的幂并不阻止转换，所以B不正确。二进制每三位对应一位八进制，因为8=2³；每四位对应一位十六进制，因为16=2⁴。整数分组从低位开始，不足一组可在高位补0而不改变数值。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下列关于 C++语言中数组的叙述，不正确的是（ ）。",
            options: [
                "数组必须先定义后使用。",
                "数组的所有元素在内存中是连续存放的。",
                "除了字符数组，在定义数组时“[]”内必须有常数。",
                "不能对数组赋值，但可以对数组的每个基础类型的元素赋值。"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n如int a[]={1,2,3}可由初始化项推导数组长度，并不限于字符数组，因此C说必须在括号里写常数不正确。普通内建数组各元素连续，不能直接把一个数组整体赋给另一个同类型数组，但可逐元素赋值。不要把std::array或vector的赋值规则替代原生数组规则。",
            tags: [
                "数组"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "一个 int 类型的值，做以下哪个操作，一定会变回原来的值？（ ）",
            options: [
                "左移 3 位，再右移 3 位",
                "右移 3 位，再左移 3 位",
                "按位或 7，再按位与-8",
                "按位异或 7，再按位异或 7"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n异或同一个掩码两次会逐位恢复：(x^7)^7=x，故D。右移再左移会丢掉低位信息，例如9得到8；按位或7再与-8也把最低三位清零。左移再右移不对所有int保证恢复，还需考虑有符号移位规则及位丢失，不能用某个小正数成功作为全域保证。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "如果 a 和 b 均为 int 类型的变量，下列表达式能正确判断“a 等于 b”的是（ ）。",
            options: [
                "((a / b) == 1)",
                "((a & b) == a)",
                "((a ^ b) == 0)",
                "((a | b) == b)"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\na^b为0当且仅当每个对应位都相同，因此C可判断相等。A用整数商为1不能保证相等，例如5/3为1，还存在b=0危险；B和D可描述位包含关系，例a=5、b=15时两式均成立而二者不相等。判断位模式相等无需做除法或可能溢出的差值运算。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "如果 a 为 int 类型的变量，下列哪个表达式可以正确求出满足“小于等于 a 且是 4 的倍数”的整数中最大的？",
            options: [
                "(a & (~3))",
                "((a << 2) >> 2)",
                "(a ^ 3)",
                "((a-1) | 3)+1"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n在本次补码整型实现中，~3把最低两位置0、其余位保留；a&~3相当于向下对齐到4的倍数，选A。负数也应向更小方向对齐，例如-1得到-4，不能套用向0截断的a/4*4。这里明确补码环境，不能泛称“任意按位与都使有符号数减小”；其他选项不具备目标对齐作用。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是“24 12”。\n\n```cpp\n#include <iostream>\nusing namespace std;\nint main(){\n    int a = 12, b = 24;\n    ___________; // 在此填入代码\n    a = a ^ b;\n    b = a ^ b;\n    cout << a << \" \" << b << endl;\n    return 0;\n}\n```",
            options: [
                "a = a ^ b",
                "b = a ^ b",
                "a = a+b",
                "b = a+b"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n原卷填空在两条异或赋值之前，恢复完整框架后填B。初始a=12、b=24，先b=a^b=20，再a=a^b=24，最后b=a^b=12，输出24 12。旧题库把填空挪到中间并改了最后赋值，虽然仍能描述另一种交换写法，也必须按原卷位置恢复。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是“2”。\n\n```cpp\n#include <iostream>\nusing namespace std;\nint main(){\n    int array[5] = {3, 7, 5, 2, 4};\n    int min = 0;\n    for (int i = 0; i < 5; i++)\n        if (___________) // 在此填入代码\n            min = array[i];\n    cout << min << endl;\n    return 0;\n}\n```",
            options: [
                "min > array[i]",
                "min < array[i]",
                "min = array[i]",
                "以上均不对"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n原数组是3、7、5、2、4，循环从i=0开始。A由于min初值0、所有元素为正，永不更新，输出0；B会求最大值7；C是赋值条件，元素均非0使条件为真，最后输出4。三者都不是2，故D。不能擅自把min初值改成首元素以迁就求最小值意图。",
            tags: [
                "算法思维"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出不是“31”。\n\n```cpp\n#include <iostream>\nusing namespace std;\nint main(){\n    int array[5] = {1, 2, 4, 8, 16};\n    int res = 0;\n    for (int i = 0; i < 5; i++)\n        ___________; // 在此填入代码\n    cout << res << endl;\n    return 0;\n}\n```",
            options: [
                "res = res+array[i]",
                "res = res & array[i]",
                "res = res | array[i]",
                "res = res ^ array[i]"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n数组是1、2、4、8、16，分别只占一个互不重叠的二进制位。求和、按位或、按位异或均得到31；按位与从res=0开始一直为0，所以B使输出不是31。这里或与异或同结果依赖各元素位不重叠，不能推广到任意数组都与加法相等。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "一个算法可以用不同的形式来描述，但要求描述比较规范，因此不能用自然语言描述。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n算法可以用自然语言、流程图、伪代码或程序等形式描述，因此题干否定自然语言的说法错误。自然语言也需要足够明确，避免歧义和漏步骤；要求规范并不等于必须使用编程语言。一个步骤能否可靠执行取决于描述内容，而不是只看使用了哪种文字。",
            tags: [
                "编程基础"
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
            explanation: "**判断 错误**\n\n域名gesp.ccf.org.cn从右侧最高层向左细分，顶级域名是cn，而不是最左的gesp，因此错误。gesp是该完整名称中的一个子域标签；题干所指是CCF编程能力等级认证网站，不能省略后变成声称它是CCF全部机构网站唯一域名。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "数据编码方式只有原码、反码、补码三种。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原码、反码、补码是有符号整数常见表示方法，不是数据编码的全部方式。字符编码、格雷码以及面向压缩等用途的编码都属于更广泛的数据表示与编码方法，所以“只有三种”错误。讨论时需区分具体整数表示问题与所有类型数据如何编码的总范围。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "长度为 n 的数组，合理的下标范围是从 0 到 n，包括 0 和 n。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n长度为n的普通数组包含n个元素，其合法元素下标为0到n-1，不包括n，所以错误。a+n可以作为越过尾元素一位的指针用于边界表示，但不能据此解引用并当作第n+1个元素。下标个数若从0一直计到n，已经有n+1个位置，超出长度。",
            tags: [
                "数组"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "字符常量 '\\0' 常用来表示字符串结束，它和字符 '0' 是不同的。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n转义字符\\0的值为0，常用作C风格字符串结束标记；字符'0'是可见数字字符，在ASCII中编码48，二者不同，故正确。字符数组不必天然带字符串结束标记，只有按以空字符终止的约定解释时才据此判断内容结束，不能把所有char数组都当成字符串。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++中，可以使用字符（如 '0'）作为数组下标。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n字符可整数提升用于下标，故正确。例如ASCII字符'0'作为下标值是48，前提是数组确实至少有49个元素才能访问。它不等于字符表示的数字0，若要映射数字字符到0..9常用c-'0'。不要把合法下标表达式的类型与特定数组是否会越界混淆。",
            tags: [
                "数组"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++中，数组被定义时，其大小就确定了。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n内建数组一旦被创建，其元素个数固定，不能在同一对象存续期间原地改变长度，因此正确。可由初始化推导长度，或通过new创建运行期确定长度的数组，但创建后仍固定；需要可增长容器时通常用vector，其容量变化不是原生数组突然改变大小。",
            tags: [
                "数组"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "计算机中存储的数据都是二进制形式。因此，在使用C++语言编写程序时，将所有十进制数改写为相同数值的二进制数，会使得程序运行效率更高。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n同一个数值的十进制和二进制整数字面量交给编译器后表示同一个值，改写源码进制不会自然带来更快执行，因此错误。比如15与0b1111的数值相同。数据在机器中的表示与人书写源代码的形式是两个层次，不能仅凭机器使用二进制就推断源码应尽量写二进制。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++语言中，表达式 (0xf == 015) 的值为 true。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n0xf是十六进制15，015的前导0表示八进制，等于十进制1*8+5=13，所以比较为假，题干错误。不能把015当成带一个无意义前导0的十进制15。两种字面量的前缀决定基数，比较前最终都得到整数值，再进行相等比较。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "如果a为int类型的变量，且表达式((a | 3) == 3)的值为true，则说明a在从0到3之间（可能为0、可能为3）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n按本卷整型位表示，a|3==3表示除了最低两位以外不能再有置1位，最低两位可以任意，所以a只能为0、1、2、3，判断正确。原题明确a是int且允许0与3两个端点，已恢复该前提；若换成未知类型或其它逻辑表达式，不能无条件沿用此推论。",
            tags: [
                "位运算"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}",
            score: 25,
            title: "春游",
            description: "老师带领同学们春游。已知班上有 N 位同学，每位同学有从 0 到 $N-1$ 的唯一编号。到了集合时间，老师确认是否所有同学都到达了集合地点，就让同学们报出自己的编号。到达的同学都会报出自己的编号，不会报出别人的编号，但有的同学很顽皮，会多次报出。你能帮老师找出有哪些同学没有到达吗？",
            inputDescription: "输入包含 2 行。第一行包含两个整数 N 和 M，表示班级有 N 位同学，同学们共有 M 次报出编号。约定 2 ≤ N, M ≤ 1000。\n第二行包含 M 个整数，分别为 M 次报出的编号。约定所有编号都在合理范围内（即小于 N 的非负整数）。",
            outputDescription: "输出一行。如果所有同学都到达，则输出 N；否则由小到大输出所有未到达的同学编号，空格分隔。",
            samples: [
                {
                    input: "3 3\n0 2 1",
                    output: "3",
                    explanation: "编号0、2、1覆盖所有三名同学，所以输出总人数3。"
                },
                {
                    input: "3 5\n0 0 0 0 0",
                    output: "1 2",
                    explanation: "五次都只报编号0，编号1和2未到，按升序输出1 2。"
                }
            ],
            explanation: "**解析**\n\n用布尔标记记录报过的编号，重复报到仍只把同一项置真。最后从0到N-1检查缺席编号，升序输出并在编号间加空格；若无缺席者输出N。N,M均2到1000，数组1005足够，O(N+M)时间、O(N)空间。现有参考程序与解析版标记算法等价，保留未改。样例全到输出3，重复0时输出1 2；独立集合差预言机检查重复、全到及上下界。",
            tags: [
                "数组",
                "模拟"
            ],
            referenceCode: "\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool arrived[1005];\n\nint main() {\n    int N, M;\n    cin >> N >> M;\n    for (int i = 0; i < M; i++) {\n        int id;\n        cin >> id;\n        arrived[id] = true;\n    }\n    bool all = true;\n    bool first = true;\n    for (int i = 0; i < N; i++) {\n        if (!arrived[i]) {\n            if (!first) cout << \" \";\n            cout << i;\n            first = false;\n            all = false;\n        }\n    }\n    if (all) cout << N;\n    cout << endl;\n    return 0;\n}\n",
            question: "# [GESP202306 三级] 春游\n\n## 题目描述\n老师带领同学们春游。班上有N位同学，每位有从0到N-1的唯一编号。集合时到达的同学报出自己的编号，不会报别人的编号，但可能重复报出。找出没有到达的同学。\n\n## 输入格式\n共2行，第一行N和M，约定2 ≤ N,M ≤ 1000；第二行M个报出的编号，均为小于N的非负整数。\n\n## 输出格式\n一行。全员到达输出N；否则从小到大输出未到达编号，以空格分隔。"
        },
        {
            id: 27,
            type: "programming",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}",
            score: 25,
            title: "密码合规检测",
            description: "网站注册时需要用户名和密码。本题的任务是编写程序检查用户输入密码的有效性。合规的密码需满足以下条件：\n1. 只能由 a-z 之间 26 个小写字母、A-Z 之间 26 个大写字母、0-9 之间 10 个数字以及 !@#$ 这四个特殊字符构成。\n2. 密码最短长度为 6 个字符，最长长度为 12 个字符。\n3. 大写字母、小写字母和数字这三类字符中，必须至少包含其中两种，并且至少包含一个 !@#$ 中的特殊字符。",
            inputDescription: "输入一行不含空格的字符串，约定其长度不超过 100。该字符串会通过英文逗号分隔为多段，每一段都作为一个待检测的密码。",
            outputDescription: "程序将输出若干行，每行输出一个合规的密码。输出顺序应与输入顺序保持一致，即先输入的合规密码先输出。",
            samples: [
                {
                    input: "seHJ12!@,sjdkffH$123,sdf!@&12HDHa!,123&^YUhg@!",
                    output: "seHJ12!@\nsjdkffH$123",
                    explanation: "前两段符合长度、字符白名单和类别要求；第三段长13且有非法&，第四段有非法&、^，所以仅输出前两段。"
                }
            ],
            explanation: "**解析**\n\n按逗号分割后，每段必须同时满足长度6..12、字符白名单、指定特殊字符至少一个，以及大写/小写/数字至少两类。现有string版参考程序与镜像char数组版条件等价，保留未改。样例前两段合格，第三段长13且含非法&，第四段含非法&和^。输入约定无空格、总长<=100，不能说cin>>必因输入含空格而不适用原题。时间O(L)，现有string分割辅助空间O(L)。以独立正则分类预言机核对类别组合、长度端点、全部ASCII标点和多段顺序。",
            tags: [
                "字符串",
                "逻辑判断"
            ],
            referenceCode: "\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nbool check(string s) {\n    if (s.length() < 6 || s.length() > 12) return false;\n    bool hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;\n    for (char c : s) {\n        if (c >= 'A' && c <= 'Z') hasUpper = true;\n        else if (c >= 'a' && c <= 'z') hasLower = true;\n        else if (c >= '0' && c <= '9') hasDigit = true;\n        else if (c == '!' || c == '@' || c == '#' || c == '$') hasSpecial = true;\n        else return false; // 非法字符\n    }\n    int types = (hasUpper ? 1 : 0)+(hasLower ? 1 : 0)+(hasDigit ? 1 : 0);\n    return (types >= 2 && hasSpecial);\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    string pass;\n    while (getline(ss, pass, ',')) {\n        if (check(pass)) {\n            cout << pass << endl;\n        }\n    }\n    return 0;\n}\n",
            question: "# [GESP202306 三级] 密码合规检测\n\n## 题目描述\n密码只能包含a-z、A-Z、0-9及!@#$四种特殊字符；长度6到12；大写字母、小写字母、数字三类中至少有两类，且至少有一个指定特殊字符。\n\n## 输入格式\n一行不含空格、长度不超过100的字符串，以英文逗号分成多段待检测密码。\n\n## 输出格式\n依输入先后顺序，每行输出一个合规密码。"
        }
    ]
};
