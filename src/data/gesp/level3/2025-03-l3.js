// 2025-03-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-03-l3",
    title: "2025年3月 GESP C++ 三级真题",
    level: 3,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1670868226801696.pdf",
        notes: "AI-Codex于2026-11-08逐页对照登记mirror PDF全部9页及p1单选、p6判断答案表。Q4/Q7/Q11/Q14/Q15/Q16/Q20保留来源疑点并暂停计分。编程题范围以原PDF渲染核对，参考程序另附GNU C++17运行证据。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部9页文本和渲染，Git blob SHA 445d3959a5bc36b2425e573b813fd69a17c730c9一致。p1/p6答案表逐项核对，保留全部answer。Q4/Q7/Q11/Q14/Q15/Q16/Q20源疑点隔离。补完整代码、原world大小写、两编程范围。两参考程序及模板独立GNU C++17编译运行，原有证据收入history。",
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
            question: "Base64 编码将每 3 字节的输入数据编码为 4 字节的输出数据。如果输入数据长度不是 3 的倍数，会用 = 号填充。在 Base64 编码中，如果输入字符串的长度为 10 字节，编码后的字符串长度是多少（ ）",
            options: [
                "12 字节",
                "13 字节",
                "14 字节",
                "16 字节"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n10字节按3字节分组，共3个完整组与1个剩余字节组，总共4组。每组编码输出4个字符，末组通过等号补足，因此总长度为4×4=16字节，选D。不能将10×4/3直接取整，因为输出以4个字符为一个完整编码块。末组只有一个有效输入字节时产生两个有效字符和两个填充字符，填充字符同样计入长度。",
            tags: [
                "字符与ASCII",
                "字符串",
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "UTF-8 编码规则如下：\n1 字节：0xxxxxxx\n2 字节：110xxxxx 10xxxxxx\n3 字节：1110xxxx 10xxxxxx 10xxxxxx\n4 字节：11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\n以下哪个字节序列是合法的 UTF-8 编码（ ）",
            options: [
                "0xC0 0x80",
                "0xF0 0x90 0x80 0x80",
                "0x80 0x80 0x80",
                "0xFF 0xFE 0xFD"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nB的F0 90 80 80满足四字节规则，表示U+10000。合法UTF-8还要求最短编码，不能只检查首位模式。A的C0 80是对零码点的过长编码，应使用单字节00。C以续字节80开头，D含FF、FE等禁用字节。RFC 3629的规则限制四字节序列F0后的第二字节至少90，本题B恰好满足这一边界，故B唯一合法。",
            tags: [
                "进制转换",
                "计算机基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "在 8 位二进制原码表示中，八进制数 -5 的二进制形式是什么（ ）",
            options: [
                "10000101",
                "11111010",
                "11111011",
                "00000101"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n八进制单个数码5的值仍为十进制5。8位原码中最高位表示负号，余下7位保存绝对值5，即0000101，拼接得到10000101，选A。B的11111010是固定8位反码形式，C的11111011是固定8位补码形式，D为正5原码。求负数反码时仅翻转原码的数值位，不能将符号位也一并取反。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "十进制数 111.111 的二进制表示可以是下面的（ ）",
            options: [
                "1101111.0001110001",
                "1101110.1001110001",
                "1101111.1001110001",
                "1101111.0011110001"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n整数111为1101111。把111/1000连续乘2取整，小数前10位为0001110001，后面仍有非零位，所以A符合截断前缀。精确检查A小数为113/1024，与111/1000相差83/128000。原卷未约定截断精度或写省略号，所有有限选项都不精确等于111.111。保留官方A并隔离，解析不能自行添加“题目要求取10位”的条件。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷pp1–2未说明近似精度或省略后续位。111.111=111111/1000的约分分母含5，不能用有限二进制小数精确表示。A是前10位截断，值为111.1103515625。保留官方A及原选项，暂停计分，等待近似表示约定澄清。"
        },
        {
            id: 5,
            type: "single",
            question: "在 C++ 中，补码的主要作用是（ ）",
            options: [
                "提高浮点数的精度",
                "简化整数的加减法运算",
                "增加整数的表示范围",
                "优化内存分配"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n补码允许将减法转换为加上相反数，在固定位宽的模运算下复用加法电路，因此主要作用对应B。它还统一零的编码，8位补码可表示256个不同整数，而8位原码有正零和负零，仅有255个不同整数。旧解析把两者的不同整数个数都说成256需要纠正。浮点精度和内存分配不由整数补码编码方式决定。",
            tags: [
                "二进制",
                "补码",
                "计算机基础"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "在 C++ 中，一个 8 位有符号整数（使用补码表示）的范围是（ ）",
            options: [
                "-128 到 127",
                "-127 到 128",
                "-256 到 255",
                "0 到 255"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n8位补码最高位的权重为−128，其余七位权重之和最多127。最小位串10000000表示−128，最大位串01111111表示127，故A正确。D是8位无符号范围，B把负端和正端错配，C需要9位补码才能覆盖。16位有符号补码范围是−32768到32767，不能沿用旧解析把−256到255误称为16位范围。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "在 C++ 中，以下代码的输出是什么（ ）\n```cpp\nint a = -5;\nunsigned int b = a;\ncout << b;\n```",
            options: [
                "-5",
                "5",
                "4294967291",
                "编译错误"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nC++将负整数转换为无符号整数时，按目标类型的模2^N取同余值。目标有32个数值位时，−5转为2^32−5=4294967291，本机运行结果对应C。若目标仅有16个数值位，则会得到65531。原卷没有位宽前提，因此保留官方C并隔离。转换规则按数值定义，不应笼统解释为任何平台、任何宽度下内存位模式必然完全不变。",
            tags: [
                "二进制",
                "补码",
                "位运算",
                "类型转换",
                "运算符",
                "未定义行为",
                "计算机基础"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p2未限定unsigned int的位宽。负数转无符号按目标类型模2^N转换，32位时才为4294967291，16位模型为65531。保留官方C和原代码，暂停计分，待类型位宽前提澄清。本机实际unsigned int为32位。"
        },
        {
            id: 8,
            type: "single",
            question: "下列程序的作用是（ ）\n```cpp\nint main() {\n int decimal = 25;\n cout << oct << decimal;\n return 0;\n}\n```",
            options: [
                "将十进制数转换成八进制数",
                "将八进制数转换成十进制数",
                "将二进制数转换成八进制数",
                "将八进制数转换成 16 进制数"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\noct把cout的整数输出进制设为八进制。decimal存储的数值仍是25，输出时25=3×8+1，因此显示31，对应A。流格式状态会影响之后的整数输出，直到使用dec或hex等操纵符更改。这里没有读取八进制输入，也没有把变量改为字符串。题目所说转换指输出表示的进制变化，内部整数值保持为25。",
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
            question: "下面程序是将十进制转十六进制，横线处应该填入的是（ ）\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int decimal = 255;\n ________________________\n return 0;\n}\n```",
            options: [
                "cout << oct << decimal;",
                "cout << decimal << decimal;",
                "cout << hex << decimal;",
                "不能正确执行"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nhex把整数以十六进制输出。255=15×16+15，默认十六进制数码字母为小写，因此填C会输出ff。A输出八进制377，B把变量decimal连续输出两次，得到255255，变量名decimal不会触发十进制格式操纵。题给头文件和命名空间已足够支持这些输出语句，所列合法语句都可以执行，不能选D。",
            tags: [
                "进制转换",
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "以下代码的说法正确的是什么（ ）\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int a = 0b1101;\n int b = 0b1011;\n cout << (a ^ b);\n return 0;\n}\n```",
            options: [
                "进行的是整体异或运算",
                "进行的是按位同或运算",
                "进行的是按位与运算",
                "进行的是按位异或运算"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n运算符^对整数逐位异或，所以D正确。1101和1011在相同位置不同才得到1，结果为0110，按cout默认十进制格式输出6。它与按位与的逐位“同时为1”、按位同或的逐位“相同为1”不同。整数异或会先对两个操作数作相应类型转换，当前两个正int值均很小，不涉及符号或溢出问题。",
            tags: [
                "位运算",
                "异或"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面枚举法查找最大值索引程序中，横线处应该填写的是（ ）\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int arr[] = {3, 7, 2, 9, 5};\n int maxIndex = 0;\n for (int i = 1; i < 5; i++) {\n ____________________________\n {\n maxIndex = i;\n }\n }\n cout << maxIndex;\n return 0;\n}\n```",
            options: [
                "if (arr[maxIndex] > arr[i])",
                "if (arr[i]-1 > arr[maxIndex])",
                "if (arr[i]+1 > arr[maxIndex])",
                "if (arr[i] > arr[maxIndex])"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nD维护已扫描区间的最大值索引，固定数组中依次更新到7和9，最终输出3。然而填B和C实际也输出3，不能因为表达式出现±1就认定它们在本题数组上错误。B会漏掉只大1的更新，C对可安全加1的整数相当于>=，允许更新到另一个同值最大元素。题面没有限制保留第一个最大值，官方D缺乏唯一性，原答案保留并隔离。",
            tags: [
                "位运算",
                "枚举",
                "算法思维",
                "循环"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷pp3–4固定数组{3,7,2,9,5}，填B、C、D都输出最大值下标3。D为通常写法，C在无溢出的整数比较下相当于>=，同值更新仍得到最大值索引。题面没有额外排除B/C的要求。保留官方D及原选项，暂停计分。"
        },
        {
            id: 12,
            type: "single",
            question: "以下代码的功能是将数组中的奇数和偶数分别放在数组的前半部分和后半部分，横线处应该填入的是（ ）。\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int left = 0, right = 4;\n    while (left < right) {\n        while (arr[left] % 2 == 1 && left < right) left++;\n        __________________________\n        if (left < right) {\n            swap(arr[left], arr[right]);\n        }\n    }\n    for (int i = 0; i < 5; i++) {\n        cout << arr[i] << \" \";\n    }\n    return 0;\n}\n```",
            options: [
                "while (arr[left] % 2 == 0 && left < right) right--;",
                "while (arr[right] % 2 == 0 && left < right) left--;",
                "while (arr[right] % 2 != 0 && left < right) right--;",
                "while (arr[right] % 2 == 0 && left < right) right--;"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nD让右指针跳过已经处在右侧的偶数，左指针跳过左侧的奇数，再交换一对错位元素。对{1,2,3,4,5}先交换2与5，再跳过3和4，得到1 5 3 4 2，输出每个数后含一个空格。A检查左侧却移动右侧，B可能把left减到负下标，C跳过右侧奇数会破坏分区目标。正确填法D不会访问数组范围之外的位置。",
            tags: [
                "数组",
                "循环",
                "逻辑判断"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面程序最后能够得到 HelloC++ 的是（ ）\n```cpp\nint main() {\n string str = \"HelloWorld\";\n ___________________\n cout << str;\n return 0;\n}\n```",
            options: [
                "str.replace(0, 5, \"C++\");",
                "str.replace(5, 5, \"C++\");",
                "str.replace(1, 5, \"C++\");",
                "str.replace(4, 5, \"C++\");"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nHelloWorld中Hello占下标0到4，World从下标5开始，长度5。B的replace(5,5,\"C++\")恰好删除World并插入C++，得到HelloC++。A得到C++World，C得到HC++orld，D得到HellC++d，均不符。replace第二参数表示被替换字符的数量，最后插入字符串长度可以不同，所以结果总长度由原长度减删除量再加插入量得到。",
            tags: [
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "想要得到字符串 world，下面程序横线处应该填入的是（ ）\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n string str = \"HelloC++\";\n _________________\n _________________\n return 0;\n}\n```",
            options: [
                "str.insert(4, \"World\");\ncout << str.substr(4, 4);",
                "cout << str.substr(5, 5);",
                "str.insert(\"World\");\ncout << str.substr(5, 5);",
                "str.insert(5, \"World\");\ncout << str.substr(5, 5);"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n按原文目标world逐字比较，D先插入World再截取5字符，输出World，首字母大小写不同。A输出Worl，B的substr(5,5)自动截短为剩余C++，不会因为请求长度超过尾部而越界。C的单参数insert(\"World\")没有匹配重载，编译失败。选项D只有把目标改为World后才成立，保留原目标和官方答案并隔离。",
            tags: [
                "位运算",
                "字符串",
                "substr",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5目标为小写world，D实际输出大写W的World，其余A输出Worl、B输出C++、C编译失败，没有一项精确得到world。恢复旧库擅改的目标大小写，保留官方D及原代码，暂停计分，待来源澄清。"
        },
        {
            id: 15,
            type: "single",
            question: "有 n 个正整数，假设一个正整数是美丽数字当且仅当该正整数是 9 的倍数但不是 8 的倍数。下面的程序是编写计算 n 个正整数中美丽数字的数量，横线处应该填入的是（ ）\n```cpp\nfor (int i = 1; i <= n; i++) {\n cin >> a;\n ________________________\n cnt++;\n}\n```",
            options: [
                "if (a % 9 != 0 && a % 8 != 0)",
                "if (a % 9 == 0 & a % 8 == 0)",
                "if (a % 9 == 0 && a % 8 != 0)",
                "if (a % 9 == 0 & a % 8 != 0)"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n两个条件分别是a%9==0与a%8!=0，C用&&连接能够计数。D中相等比较优先于按位与，两个比较经整型提升成为0或1，其按位与结果恰好也是两条件同时成立。由于比较没有副作用且除数均为非零常量，是否短路不影响本题结果，C/D都正确。保留官方C并隔离，不能把推荐使用&&的习惯当作D语义错误的依据。",
            tags: [
                "位运算",
                "循环",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5给C，但D使用的&在两个无副作用比较之间同样得到0或1，与C的&&逻辑结果相同。C/D均能正确计数，不能仅据书写习惯排除D。保留官方C及两项，暂停计分。"
        },
        {
            id: 16,
            type: "judge",
            question: "判断一个三角形是否成立的条件只有：任意两边长度之和大于第三条边的长度。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n对实数a、b、c，“任意两边之和大于第三边”包含a+b>c、a+c>b、b+c>a。前两式相加得2a>0，同理b>0、c>0，正边长条件已由三个不等式推出。这也是非退化三角形的边长判定。旧解析所举0、1、2与−1、2、3均没有满足全部不等式，不能作为反例。官方判×与通常数学含义不符，保留答案并隔离。",
            tags: [
                "数学"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p6判×，但任意两边之和大于第三边即三个严格三角形不等式，已蕴含三条实数边长均为正。例如前两个不等式相加可得2a>0。旧解析用未满足全部不等式的0/负数作反例无效。保留官方×及原文，暂停计分。"
        },
        {
            id: 17,
            type: "judge",
            question: "这段程序进行的是判断一个从键盘输入的字符的ASCII是否是奇数，若是，输出YES，否则，输出NO。\n\n```cpp\nint main()\n{\n    char x;\n    scanf(\"%c\", &x);\n    int ASCII = (int)x;\n    cout << (x & 1 ? \"YES\" : \"NO\") << '\\n';\n    return 0;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在题目ASCII字符语境下，x提升为整数后按位与1，最低位为1表示奇数，条件运算符据此输出YES，否则输出NO，并追加换行。例如A的ASCII为65输出YES，B为66输出NO。代码虽然另存ASCII变量，但判断直接使用x同样有效。scanf的%c会读取包括空格在内的单个字符，不会像默认格式化的cin读取char那样跳过前导空白。",
            tags: [
                "位运算",
                "字符与ASCII"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "闰年的定义\n\n普通闰年为公历年份是4的倍数，且不是100的倍数的年份，如2004年、2020年等。世纪闰年为公历年份是整百数的，必须是400的倍数才是闰年，如1900年不是闰年，2000年是闰年。下面程序是判断是否是闰年的正确程序。\n\n```cpp\ncin>>n;\ncout<<((n%4==0&&n%100!=0)||(n%400==0))?1:0;\nreturn 0;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n闰年逻辑的两个分支正确覆盖非整百的4倍数和整百的400倍数。在默认输出格式下布尔值显示1或0，所以本段确实给出正确闰年标志。须注意原语句的<<优先于?:，实际是先输出布尔值，再对输出流作条件判断并丢弃1/0的结果。不能说?:的分支被cout输出。普通正常输出流下这个附带条件表达式不改变已经写出的闰年标志。",
            tags: [
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "C++ 语句 cout << (n % 15 == 0 ? \"YES\" : \"NO\"); 能够判断一个整数能否被 3 和 5 同时整除。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n整数能同时被3与5整除，当且仅当能被它们的最小公倍数15整除，所以n%15==0可以判定，输出YES或NO与题意一致。负的15倍数余数也是0，零同样可被非零的3和5整除。这里两个除数互质，如果换成存在公共因子的两个整数，应使用其最小公倍数，不能直接照搬乘积作为必要条件。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "有 n 个同学，从中抽取任意个人数来参加学校组织的大合唱，共有 2 的 n 次幂个方法。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n每人有入选和不入选两种选择，包括空集时共有2^n个不同子集，官方√对应这种解释。例如n=3的子集共有8个，其中一个选择了0人。若参加合唱必须至少抽取1人，应排除空集，方法数为2^n−1。原文“任意个人数”没有明确是否允许无人参加，不能在解析中强行宣布0人为合法合唱方案，因此保留答案并隔离，待计数口径澄清。",
            tags: [
                "数学"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p6给√，2^n是包含空集的全部子集数。参加合唱的抽取是否允许0人未明确，至少1人时为2^n−1。保留官方√和原文，暂停计分，待空选是否有效的前提澄清。"
        },
        {
            id: 21,
            type: "judge",
            question: "若将一个正整数化为二进制数，在此二进制数中，我们将数字1的个数是偶数的这类二进制数称为A类数，否则就称其为B类数。\n\n例如(13)₁₀=(1101)₂，其中1的个数为3，则称此数为B类数。(10)₁₀=(1010)₂，其中1的个数为2，称此数为A类数。\n\n判断(2025)₁₀化为二进制后，1的个数为偶数个，因此2025为A类数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n2025=1024+512+256+128+64+32+8+1，其二进制为11111101001，共8个1，8是偶数，按题目定义归为A类数，判断正确。例子13有3个1为B类，10有2个1为A类，与该定义一致。除2取余时余数从低位到高位产生，写最终二进制需逆序，但统计1的个数可以直接累计各次余数而无需保存整串。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "该段程序将n不停地除以2，并输出此时的商和余数，直到n=0为止。\n\n```cpp\nlong long n;\ncin >> n;\nwhile(n != 0) {\n    cout << n/2 << ' ' << n%2 << '\\n';\n    n /= 2;\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n每次循环先输出当前n除以2的商与余数，再用整数除法更新n，直至n等于0。正负long long的除以2均向零截断，绝对值会逐步缩小，因此有限步结束，0输入则不输出任何行。例如5依次输出2 1、1 0、0 1。程序没有将余数倒序拼成二进制字符串，题干只是描述当前商余数的逐行输出，所以判断正确。",
            tags: [
                "位运算",
                "循环"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "两个 13 进制的数 A 和 B，在 10 进制下分别表示 10 和 11。 (A+B)13 = (18)13，也就是说 13 进制数 A 加上 13 进制数 B，和是 13 进制数 18。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n依题设，十三进制数码A、B分别代表10和11，和的十进制数值为21。21=1×13+8，因此十三进制表示为18，等式成立。十三进制允许数码0到12，使用字母时A为10、B为11、C为12，所以两个操作数和结果的每个数码均合法。进制改变的是位权与可用数码范围，已经给定的A/B数码数值不随加法步骤改变。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "k 进制，逢 k 进第二位，逢 k² 进百位，逢 k³ 进千位。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原答案表判错。一般k进制相邻位的进位规则均为满k向高一位进1，位权从右向左依次为1、k、k²、k³。百位和千位通常指十进制的100与1000位权，对一般k不能直接按这两个十进制名称来解释其位权。教学中宜用第几位及明确的位权说明。原题的混合位名表述照录，不能在题面擅自改成规范进位定义后沿用错的判断。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "CCF（十九进制）= 21AC（十三进制）（不区分大小写）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n依高进制数码约定，C为12、F为15。CCF在十九进制下为12×19²+12×19+15=4575。21AC在十三进制下为2×13³+1×13²+10×13+12=4705。两个十进制值不同，所以原等式错误。这里字母数码本身的值没有改变，只是所在位置的基数幂不同，旧解析声称同一字母随进制改变数码值需要纠正。",
            tags: [
                "进制转换",
                "字符与ASCII"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "1025",
                    output: "1000"
                }
            ],
            question: "\n# [GESP202503 三级] 2025\n\n## 题目描述\n\n小 A 有一个整数 $x$，他想找到最小的正整数 $y$ 使得下式成立：\n\n$(x \\ \\operatorname{and} \\ y) + (x \\ \\operatorname{or} \\ y) = 2025$\n\n其中 $\\operatorname{and}$ 表示二进制按位与运算，$\\operatorname{or}$ 表示二进制按位或运算。如果不存在满足条件的 $y$，则输出 $-1$。\n\n## 输入格式\n\n一行，一个整数 $x$。\n\n## 输出格式\n\n一行，一个整数，若满足条件的 $y$ 存在则输出 $y$，否则输出 $-1$。\n\n\n## 数据范围\n\n对于所有测试点，保证0 ≤ x < 2025。\n\n## 提示\n\nand表示按位与运算，运算符为`&`。or表示按位或运算，运算符为`|`。",
            explanation: "**解析**\n\n合法输入范围为0≤x<2025，所以x和候选y都非负且很小。逐位看，00贡献0，01或10贡献1，11在与加或中共贡献2，乘各位权求和可得(x&y)+(x|y)=x+y。因此唯一正解为2025−x，范围1到2025，唯一也就最小。样例1025对应1000。参考用long long计算，时间和额外空间均O(1)。测试还用逐个枚举正整数y并直接计算原位运算式的独立方法核对全部2025个合法x。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "位运算",
                "数学"
            ],
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long x;\n    cin >> x;\n    long long y = 2025-x;\n    if (y > 0) cout << y << \"\\n\";\n    else cout << -1 << \"\\n\";\n    return 0;\n}",
            answer: "",
            title: "2025",
            timeLimit: 1,
            memoryLimit: 512
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "6\nApple\nbanana\napple\nOrange\nbanana\napple",
                    output: "apple"
                }
            ],
            question: "\n# [GESP202503 三级] 词频统计\n\n## 题目描述\n\n在文本处理中，统计单词出现的频率是一个常见的任务。现在，给定 $n$ 个单词，你需要找出其中出现次数最多的单词。在本题中，忽略单词中字母的大小写（即 `Apple`、`apple`、`APPLE`、`aPPle` 等均视为同一个单词）。\n\n请你编写一个程序，输入 $n$ 个单词，输出其中出现次数最多的单词。\n\n## 输入格式\n\n第一行，一个整数 $n$，表示单词的个数；\n\n接下来 $n$ 行，每行包含一个单词，单词由大小写英文字母组成。\n\n输入保证，出现次数最多的单词只会有一个。\n\n## 输出格式\n\n输出一行，包含出现次数最多的单词（输出单词为小写形式）。\n\n\n## 数据范围\n\n对于所有测试点，1 ≤ n ≤ 100，每个单词的长度不超过30，且仅由大小写英文字母组成。",
            explanation: "**解析**\n\n把每个单词的所有字符统一转为小写，再累计该字符串频次，维护最高次数及对应单词。输入保证最终最高频词唯一，所以临时并列时保留旧答案仍可在最终正确输出。样例apple计3次，banana计2次，orange计1次。tolower先转换为unsigned char再传入，满足字符函数的输入要求。最多100词、每词30字符，map方案约O(nL log n)时间与O(nL)空间，大小写必须遍历全词。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "字符串",
                "哈希表"
            ],
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, int> cnt;\n    int best = -1;\n    string ans;\n\n    for (int i = 0; i < n; ++i) {\n        string s;\n        cin >> s;\n        for (char &c : s) c = tolower(static_cast<unsigned char>(c));\n        int cur = ++cnt[s];\n        if (cur > best) {\n            best = cur;\n            ans = s;\n        }\n    }\n\n    cout << ans << \"\\n\";\n    return 0;\n}",
            answer: "",
            title: "词频统计",
            timeLimit: 1,
            memoryLimit: 512
        }
    ]
};
