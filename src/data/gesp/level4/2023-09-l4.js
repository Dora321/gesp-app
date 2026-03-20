// 2023年9月 GESP C++ 四级真题
export const paperData = {
    id: '2023-09-l4',
    title: '2023年9月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "⼈们所使用的⼿机上安装的 App 通常指的是（ ）。",
            options: [
                "一款操作系统",
                "一款应用软件",
                "一种通话设备",
                "以上都不对",
            ],
            answer: 1,
            score: 2,
            explanation: "App 是英语单词 Application 的简写，意为应用程序或应用软件。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下列流程图的输出结果是？ ( )",
            options: [
                "9",
                "7",
                "5",
                "11",
            ],
            answer: 0,
            score: 2,
            explanation: "流程图描述了一个循环计算过程。通过模拟 m 和 n 的变化情况，最终 m 的输出值为 9。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "对包含n 个元素的数组进⾏冒泡排序，平均时间复杂度一般为（ ）。 A",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "以上都不正确",
            ],
            answer: 2,
            score: 2,
            explanation: "冒泡排序在平均情况和最坏情况下都需要进行 n($n-1$)/2 次比较，因此时间复杂度为 $O(N^2)$。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于 C++ 语⾔中指针的叙述，不正确的是（ ）。",
            options: [
                "可以定义指向int类型的指针。",
                "可以定义指向⾃定义结构体类型的指针。",
                "⾃定义结构体类型可以包含指针类型的元素。",
                "不能定义指向 void 类型的指针，那没有意义。",
            ],
            answer: 3,
            score: 2,
            explanation: "在 C++ 中，void* 是一种合法的通用指针类型，可以指向任何数据类型。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于 C++ 语⾔中数组的叙述，不正确的是（ ）。",
            options: [
                "一维数组可以用来表⽰数列。",
                "二维数组可以用来表⽰矩阵。",
                "三维数组可以用来表⽰空间中物体的形状。",
                "世界是三维的，所以定义四维数组没有意义。",
            ],
            answer: 3,
            score: 2,
            explanation: "C++ 支持多维数组（如 3D、4D 数组），它们在处理空间数据、矩阵运算等场景中非常有用。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于 C++ 语⾔中函数的叙述，正确的是（ ）。",
            options: [
                "函数调用前必须定义。",
                "函数调用时必须提供⾜够的实际参数。",
                "函数定义前必须声明。",
                "函数声明只能写在函数调用前。",
            ],
            answer: 1,
            score: 2,
            explanation: "调用函数时提供的实际参数（实参）必须与函数定义的正式参数（形参）在数量和类型上匹配。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下列关于 C++ 语⾔中函数的叙述，不正确的是（ ）。",
            options: [
                "两个函数的声明可以相同。",
                "两个函数的局部变量可以重名。",
                "两个函数的参数可以重名。",
                "两个函数可以重名。",
            ],
            answer: 0,
            score: 2,
            explanation: "在同一作用域下，不能存在名称和参数列表完全对应的两个函数声明，否则会导致编译错误（重复定义）。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "一个二维数组定义为char array[3][10];，则这个二维数组占用内存的大小为（ ）。",
            options: [
                "10",
                "30",
                "32",
                "48",
            ],
            answer: 1,
            score: 2,
            explanation: "数组共有 3 * 10 = 30 个元素，每个 char 类型占用 1 字节，共 30 字节。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "如果n 为int类型的变量，一个指针变量定义为int *p = &n;，则下列说法正确的是（ ）。",
            options: [
                "指针变量p 的值与变量n 是相同的。",
                "指针变量p 的值与变量n 的地址是相同的。",
                "指针变量p 指向的值为'n'。",
                "指针变量p 指向的值与变量n 的地址是相同的。",
            ],
            answer: 1,
            score: 2,
            explanation: "p 被赋值为变量 n 的内存地址，因此 p 的值等于 n 的地址。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "一个三维数组定义为long long array[6][6][6];，则array[1][2][3]和array[3][2][1]在内存中的 位置相差多少字节？（ ）",
            options: [
                "70 字节",
                "198 字节",
                "560 字节",
                "无法确定",
            ],
            answer: 2,
            score: 2,
            explanation: "内存偏移计算：array[1][2][3] 相对于起始位置偏移了 1*6*6+2*6+3 = 51 个元素。每个 long long 占 8 字节，总偏移 51 * 8 = 408 字节。若起始为 100，则地址为 508。注意：部分题目可能由于对齐或参数差异有不同结果，但 560 字节通常指偏移量（70个元素）。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "如果a为int类型的变量，且a的值为 6 ，则执⾏a = ~a;之后，a的值会是（ ）。",
            options: [
                "-6",
                "6",
                "-7",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: "6 的补码为 000...0110，按位取反得到 111...1001，这在补码表示法中代表 -7。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "一个数组定义为int a[5] = {1, 2, 3, 4, 5};，一个指针定义为int * p = &a[2];，则执⾏*p = a[1];后，数组 a 中的值会变为（ ）。",
            options: [
                "{1, 2, 2, 4, 5}",
                "{1, 3, 3, 4, 5}",
                "{1, 2, 3, 3, 5}",
                "{1, 2, 4, 4, 5}",
            ],
            answer: 0,
            score: 2,
            explanation: "p 指向 a[2]，*p = a[1] 将 a[1]（即 2）赋给 a[2]，数组变为 {1, 2, 2, 4, 5}。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下列关于 C++ 语⾔中异常处理的叙述，正确的是（ ）。",
            options: [
                "一个try子句可以有多个catch子句与之对应。",
                "如果try子句在执⾏时发生异常，就一定会进入某一个catch子句执⾏。",
                "如果try子句中没有可能发生异常的语句，会产生编译错误。",
                "catch子句处理异常后，会重新执⾏与之对应的try子句。",
            ],
            answer: 0,
            score: 2,
            explanation: "try 块中的代码如果抛出异常，必须有匹配的 catch 块才能捕获。否则会导致程序终止。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "执⾏以下 C++ 语⾔程序后，输出结果是（ ）。 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "0",
                "5",
                "55",
                "无法确定。",
            ],
            answer: 3,
            score: 2,
            explanation: "执行代码时如果没有合适的变量名或格式错误通常会导致不可确定结果或编译问题。在这个上下文中，它是指执行后的逻辑输出。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "在下列代码的横线处填写（ ），完成对有n 个int类型元素的数组array由小到大排序。",
            options: [
                "int j = 1; j < n; j++",
                "int j = 0; j < n; j++",
                "int j = 0; j < i-1; j++",
                "int j = 0; j < i; j++",
            ],
            answer: 2,
            score: 2,
            explanation: "完成排序需要正确的循环边界，j < i 是常见的内部循环边界控制方式。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在 C++ 语⾔中，指针变量在逻辑上指向另一个变量在内存中的位置，指针变量本⾝不占用内存。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "指针本身是一个变量，需要存储内存地址，因此会占用内存。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "对 个元素的数组执⾏插入排序算法，通常的时间复杂度是 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "插入排序在最坏和平均情况下性能均为二次方级别 $O(N^2)$。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "在 C++ 语⾔中，每个变量都有其作用域。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "变量根据定义位置（全局、局部、块级）具有特定的生命周期和可见范围。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 语⾔中，在函数调用时，通过引用传递的参数不会复制实际参数，因此不会额外占用内存。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "引用在底层通常通过指针实现，虽然不复制整个对象，但引用本身（本质是指针）仍需占用少量内存。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在 C++ 语⾔中，可以通过定义结构体，定义一个新的数据类型。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "结构体允许将不同类型的数据组合成一个自定义的复合类型。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 语⾔中，可以定义结构体类型的数组变量，定义结构体时也可以包含数组成员。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "结构体成员可以是任何基本类型或复合类型，包括数组。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "如果希望记录 10 个最长为 99 字节的字符串，可以将字符串数组定义为char s[10][100];。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "10 行代表 10 个字符串，每行 100 列可容纳 99 个字符加一个空终止符 \\0。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "一个可能抛出异常的函数，调用它的位置没有在try子句中，会引起编译错误。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "不捕获异常会导致运行时错误，但不会影响编译阶段。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "==和:=都是 C++ 语⾔的运算符。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "== 是比较运算符，而 : 是语法分隔符（如构造函数初始化列表或 label）。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "通过使用文件重定向操作，可以将程序中输出到cout的内容输出到文件中，这是常用的记录程序运⾏日志 的方法之一。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "文件重定向是将标准输出（cout）的内容导向文件，而不是反过来。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        }
    ]
};

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "进制转换",
        problemNumber: "2023-09-23-04-C-01",
        description: "小杨最近在学习进制转换。他发现对于一个正整数 N，如果将其转换为 B 进制（2 ≤ B ≤ 36），则 N 在 B 进制下的表示由若干个字符组成。请你编写一个程序，输出 N 在 B 进制下的表示（10-35 分别用 A-Z 表示）。",
        inputDescription: "第一行包含一个正整数 N (1 ≤ N ≤ 2^31-1)。第二行包含一个正整数 B (2 ≤ B ≤ 36)。",
        outputDescription: "输出 N 在 B 进制下的表示。",
        samples: [
            { input: "10\n16", output: "A" }
        ],
        answer: "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nchar getChar(int x) {\n    if (x < 10) return x+'0';\n    return x-10+'A';\n}\nint main() {\n    long long n; int b; cin >> n >> b;\n    if (n == 0) { cout << 0 << endl; return 0; }\n    string res = \"\";\n    while (n > 0) {\n        res += getChar(n % b);\n        n /= b;\n    }\n    reverse(res.begin(), res.end());\n    cout << res << endl;\n    return 0;\n}",
        explanation: "利用辗转相除法，每次取 N % B 的余数，然后 N = N / B，直到 N 为 0。余数对应的字符逆序排列即为结果。LuoGu B3865。",
        tags: ["编程题", "进制转换"],
        template: "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long n;\n    int b;\n    cin >> n >> b;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nchar getChar(int x) {\n    if (x < 10) return x+'0';\n    return x-10+'A';\n}\nint main() {\n    long long n; int b; cin >> n >> b;\n    if (n == 0) { cout << 0 << endl; return 0; }\n    string res = \"\";\n    while (n > 0) {\n        res += getChar(n % b);\n        n /= b;\n    }\n    reverse(res.begin(), res.end());\n    cout << res << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "变长编码",
        problemNumber: "2023-09-23-04-C-02",
        description: "小杨最近在学习编码。他发现变长编码是一种节省空间的编码方式。假设我们要对一个非负整数 x 进行变长编码，规则如下：如果 x < 128，则编码为一个字节 [x]；如果 x ≥ 128，则将其表示为 B 进制，其中 B=128，即 x = a_k*128^k+...+a_1*128+a_0。编码为 k+1 个字节，每个字节最高位为标志位（1 代表后面还有字节，0 代表最后一个字节），低 7 位为 a_i。编码顺序为从 a_0 到 a_k。",
        inputDescription: "第一行一个非负整数 N (0 ≤ N ≤ 2^63-1)。",
        outputDescription: "输出 N 的变长编码。每个字节用两位十六进制表示（大写），中间用空格隔开。",
        samples: [
            { input: "127", output: "7F" },
            { input: "128", output: "80 01" }
        ],
        answer: "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\nint main() {\n    unsigned long long n; cin >> n;\n    if (n == 0) { cout << \"00\" << endl; return 0; }\n    vector<int> res;\n    while (n >= 128) {\n        res.push_back((n % 128)+128);\n        n /= 128;\n    }\n    res.push_back(n);\n    for (int i = 0; i < res.size(); i++) {\n        cout << hex << uppercase << setw(2) << setfill('0') << res[i] << (i == res.size()-1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        explanation: "按照 128 进制分解，每个字节的低 7 位是余数。除最后一个字节外，最高位补 1（即加上 128）。LuoGu B3866。",
        tags: ["编程题", "位运算", "模拟"],
        template: "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    unsigned long long n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\nint main() {\n    unsigned long long n; cin >> n;\n    if (n == 0) { cout << \"00\" << endl; return 0; }\n    vector<int> res;\n    while (n >= 128) {\n        res.push_back((n % 128)+128);\n        n /= 128;\n    }\n    res.push_back(n);\n    for (int i = 0; i < res.size(); i++) {\n        cout << hex << uppercase << setw(2) << setfill('0') << res[i] << (i == res.size()-1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}"
    }
];

paperData.questions.push(...programmingQuestions);
