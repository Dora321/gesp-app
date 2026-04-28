// 2023年12月 GESP C++ 四级真题
export const paperData = {
    id: '2023-12-l4',
    title: '2023年12月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下面有关函数参数的说法，正确的是 ( ) 。`,
            options: [
                "函数参数传递时，主函数当中采用值传递方式将参数传递给子函数时，若子函数将参数值改变，主函数当中 的参数值不变。",
                "函数参数传递时，主函数当中采用值传递方式将参数传递给子函数时，若子函数将参数值改变，主函数当中 的参数值将随子函数一样改变而改变。",
                "函数参数传递时，主函数如果将参数的地址传递给子函数，若子函数将参数值改变，主函数当中的参数值将 不改变。",
                "函数参数传递可以不满⾜子函数的参数个数要求。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            C++ 支持值传递、引用传递和指针传递。递归（Recursion）是一种函数自身的调用方式，而不是参数传递方式。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下面 C++ 代码执⾏后，输出的是 ( ) 。`,
            options: [
                "chen",
                "c",
                "chen a dai",
                "dai",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            数组 arr 存储的是字符串 \"chen a dai\"。在 solve 函数中，strArr[0] 访问并输出了字符数组的第一个元素，即字符 'c'。注意：题目中可能的代码细节会影响具体输出，通常考察数组首元素访问。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `下面 C++ 代码最后执⾏后输出是 ( ) 。`,
            options: [
                "1",
                "2",
                "3",
                "4",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            fun1(arr) 传入的是数组 arr 的首地址。*n 取出首元素 arr[0] 的值（为 2）。函数返回 2 * 2 = 4，并将其赋给 arr[1]。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `下面 C++ 代码执⾏后的结果是 ( ) 。`,
            options: [
                "123 456 789",
                "789 456 123",
                "321 654 987",
                "147 258 369",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            内层循环 for(int j=2; j>=0; j--) 实现了对每一行元素的逆序打印。对于 3x3 矩阵，输出即为每行从右向左。 
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `下面 C++ 代码执⾏后输出是（ ）。`,
            options: [
                "1,2,3",
                "1",
                "2",
                "3",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            指针 p 最初指向 arr[0] (1)。执行 p++ 后，指针后移一位指向 arr[1]，故输出为 2。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `如果变量 x 的地址是 0x6ffe14, 下面 C++ 代码执⾏以后输出的是（ ）。`,
            options: [
                "0x6ffe11",
                "0x6ffe14",
                "0x6ffe18",
                "0x6ffe15",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            p 指向 int 类型变量 x。在 C++ 中，int 类型通常占用 4 个字节。执行 p++ 会使指针地址增加 4，即 0x6ffe14+4 = 0x6ffe18。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `在 C++ 中 , 执⾏下面代码后，输出的是（ ）。`,
            options: [
                "400",
                "200",
                "20",
                "100",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            实参 a 初始值为 20。point(p) 计算 20 * 20 = 400。该值被通过指针赋回给 a，因此输出 400。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `下列 C++ 语句执⾏以后结果是 true 的是（ ）。`,
            options: [
                "3&&false",
                "5&&2",
                "101&&000",
                "4&true",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            在逻辑运算中，非 0 即为 true。5 && 2 中两个操作数均为真，结果为 true (1)。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `在如下的 C++ 代码中实现了对字符串中出现的 26 个字母的个数统计，横线处应填入是（ ）。`,
            options: [
                "alpha[i]=alpha[i-1]+1;",
                "alpha[i]=alpha[i]+1;",
                "alpha[i+1]=alpha[i]+1;",
                "alpha[i-1]=alpha[i]+1;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            alpha[0] 为 65 ('A')。通过 alpha[i] = alpha[i-1]+1，可以利用 ASCII 码依次得到后续字母。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下面 C++ 代码执⾏后生成的文件其字节数为（ ）。`,
            options: [
                "10",
                "16",
                "40",
                "24",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            循环执行 10 次，每次写入 1 个字符，总计 10 个字节。注意：文件的实际大小取决于换行符等细节，但基本字符数为 10。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `下列 C++ 代码输入1,2,3,4，执⾏后，将输出的是（ ）。`,
            options: [
                "1#4#",
                "1#3#",
                "1#2#3#4#",
                "1#2#3#4",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            逗号不是数字，根据代码逻辑被替换为 '#'，数字保持不变，结果为 1#2#3#4。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `以下 C++ 代码用于实现每个整数对应的因数，如输入12，则输出1 2 3 4 6 12；如输入18，则输出1 2 3 6 9 18。横线处应填入代码是（ ）。`,
            options: [
                "if(n%i==0)",
                "if(n/i==0)",
                "if(n%i!=0)",
                "if(n/i!=0)",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            因数是指能整除 N 的数，即 N 除以 i 的余数为 0 (n % i == 0)。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `某公司新出了一款无⼈驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车目的地，车子就能⾃动 选择一条优化路线，告诉乘客后驶达那⾥。请问下面哪项不是驾驶系统完成选路所必须的。（ ）`,
            options: [
                "麦克风",
                "扬声器",
                "油量表",
                "传感器",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            路径规划依靠地图和定位数据，油量表反映能源状态，不是路径选择的必要输入。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `现代计算机是指电子计算机，它所基于的是（ ）体系结构。`,
            options: [
                "艾伦·图灵",
                "冯·诺依曼",
                "阿塔纳索夫",
                "埃克特-莫克利",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            现代计算机体系核心是冯·诺依曼结构，其特点是存储程序并在处理器中执行。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `输入一 个正整数N（N>=7)，想找出它所有相邻的因数对，比 如，输入 12，因数对有(1,2)、(2,3)、(3.4) 。下面 哪段代码找不到所有的因数对?()`,
            options: [
                "for(i=1;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\n\", i, i+1);",
                "for(i=2;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\n\", i, i+1);",
                "for(i=2;i<N/2;i++) if(!(N%(i-1)) && !(N%i)) printf(\"(%d,%d)\n\", i-1, i);",
                "for(i=1;i<N/2;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\n\", i, i+1);",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            算法 C 的循环范围或起始判断逻辑存在漏洞，无法遍历或识别所有的因数对。
            
            **考点：** `,
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `C++的内置函数 sort() 支持数组的局部排序。例如 int a={10,9,8,7,6,5,4,3,2,1} ，可以用 sort(a,a+5) ,排序成 {6,7,8,9,10,5,4,3,2,1} 。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            sort 接收迭代器或指针区间，如 sort(a, a+5) 只对前 5 个元素排序，支持局部排序。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `用递归法求 的阶乘，时间复杂度是 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            char arr[10]; 是 C++ 中定义固定长度字符数组的标准语法。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `[(1,2)*2]*3 在C++中是合法的表达式。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            != 运算符用于判断两个操作数是否不相等，结果为布尔值。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `在下面的C++代码中，将对1.txt文件写入 hello 。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            ifstream (输入), ofstream (输出), fstream (双向) 是 C++ 操作文件的标准类。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `文本文件 1.txt 第1⾏由 01234 共5个字符组成其间没有空格，当用C++代码正常打开文件成功并执⾏如下 代码以后，第1⾏长度为5（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            读入 int 时，\"01234\" 会被转换为整数 1234，数值的前导零不被视作有效位，长度发生变化。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `执⾏ C++ 代码cout<<(5||2);后将输出1。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            逻辑或 (||) 只要有一个为真结果就为真 (true)，cout 输出 true 为 1。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `在 C++ 中，两个字符串相加的运算符为+相当于字符串的合并运算。下面 C++ 代码执⾏后，将输出 chenadai。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            std::string 类重载了+运算符，用于将两个字符串连接在一起。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `C++ 内置函数sort()可以对整数、浮点数、字符数组进⾏从大到小，从小到大，局部排序。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            sort 支持对数组、vector 等容器进行全量、部分以及自定义规则排序。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `小杨最近在准备考 GESP ，他用的 Dev C++ 来练习和运⾏程序，所以 Dev C++ 也是一个小型操作系统。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            Dev C++ 是一个集成开发环境（IDE），而 Linux 或 Windows 才是操作系统。
            
            **易混概念：** 操作系统负责管理硬件和软件资源，编译器负责将源代码翻译成目标代码，两者职能不同。
            
            **考点：** `,
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `任何一个 while 循环都可以转化为等价的 for 循环（ ）。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            任何 while 循环都可以通过初始化、判断条件和迭代更新改写为等效的 for 循环。
            
            **易混概念：** 注意区分相关概念的适用范围和边界条件。
            
            **考点：** `,
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
      type: 'programming',
      samples: [
        { input: `2
abc a
d def
abc.d.d.abc.abcd`, output: `a.def.def.a.UNK` },
        { input: `3
abc a
d def
abcd xxxx
abc,(d)d!-abc?abcd`, output: `a,(def)def!-a?xxxx` },
        { input: `1
abcdefghij klmnopqrst
!()-[]{}\\|;:'",./?<>abcdefghijklmnopqrstuvwxyz`, output: `!()-[]{}\\|;:'",./?<>UNK` }
      ],
      question: `
# [GESP202312 四级] 小杨的字典

## 题目描述

在遥远的星球，有两个国家 A 国和 B 国，他们使用着不同的语言：A 语言和 B 语言。小杨是 B 国的翻译官，他的工作是将 A 语言的文章翻译成 B 语言的文章。

为了顺利完成工作，小杨制作了一本字典，里面记录了 $N$ 个 A 语言单词对应的 B 语言单词，巧合的是，这些单词都由地球上的 26 个小写英文字母组成。

小杨希望你写一个程序，帮助他根据这本字典翻译一段 A 语言文章。这段文章由标点符号 \`!()-[]{}\\|;:'",./?\` 和一些 A 语言单词构成，每个单词之间必定由至少一个标点符号分割，你的程序需要把这段话中的所有 A 语言单词替换成它的 B 语言翻译。特别地，如果遇到不在字典中的单词，请使用大写 UNK 来替换它。

例如，小杨的字典中包含 $2$ 个 A 语言单词 \`abc\` 和 \`d\`，它们的 B 语言翻译分别为 \`a\` 和 \`def\`，那么我们可以把 A 语言文章 \`abc.d.d.abc.abcd.\` 翻译成 B 语言文章 \`a.def.def.a.UNK.\` 其中，单词 \`abcd\` 不在词典内，因此我们需要使用 UNK 来替换它。

## 输入格式

第一行一个整数 $N$，表示词典中的条目数。保证 $N \\le 100$。

接下来 $N$ 行，每行两个用单个空格隔开的字符串 $A$， $B$ ,分别表示字典中的一个 A 语言单词以及它对应的 B 语言翻译。保证所有 $A$ 不重复；保证 $A$ 和 $B$ 的长度不超过 $10$。

最后一行一个字符串 $S$ ，表示需要翻译的 A 语言文章。保证字符串 $S$ 的长度不超过 $1000$，保证字符串 $S$ 只包含小写字母以及标点符号 \`!()-[]{}\\|;:'",./?\` 。

## 输出格式

输出一行，表示翻译后的结果。
`,
      score: 25,
      explanation: `
      **解析：**
      使用 std::set<string> 或 std::unordered_set<string> 可以方便地实现添加和查询操作。LuoGu B3925。
      `,
      tags: ["编程题", "哈希", "集合"],
      template: "#include <iostream>\n#include <string>\n#include <set>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <string>\n#include <set>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    set<string> dict;\n    while (n--) {\n        int op; string s; cin >> op >> s;\n        if (op == 1) dict.insert(s);\n        else {\n            if (dict.count(s)) cout << 1 << endl;\n            else cout << 0 << endl;\n        }\n    }\n    return 0;\n}",
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
1 3 5
2 4 6`, output: `2` },
        { input: `5
10 3 5 8 7
4 6 1 2 9`, output: `5` }
      ],
      question: `
# [GESP202312 四级] 田忌赛马

## 题目描述

你要和田忌赛马。你们各自有 $N$ 匹马，并且要进行 $N$ 轮比赛，每轮比赛，你们都要各派出一匹马决出胜负。

你的马匹的速度分别为 $u_1,u_2,\\cdots，u_n$，田忌的马匹的速度分别为 $v_1,v_2,\\cdots,v_n$。田忌会按顺序派出他的马匹，请问你要如何排兵布阵，才能赢得最多轮次的比赛？巧合的是，你和田忌的所有马匹的速度两两不同，因此不可能出现平局。

## 输入格式

第一行一个整数 $N$。保证 $1\\le N \\le 5\\times 10^4$

接下来一行 $N$ 个用空格隔开的整数，依次为 $u_1,u_2,\\cdots,u_n$，表示你的马匹们的速度。保证 $1\\le u_i\\le 2N$。

接下来一行 $N$ 个用空格隔开的整数，依次为 $v_1,v_2,\\cdots,v_n$，表示田忌的马匹们的速度。保证 $1\\le v_i\\le 2N$。

## 输出格式

输出一行，表示你最多能获胜几轮。
`,
      score: 25,
      explanation: `
      **解析：**
      贪心策略：1. 如果田忌最快的马比齐王最快的快，则比赛；2. 如果田忌最慢的马比齐王最慢的快，则比赛；3. 否则，用田忌最慢的马去消耗齐王最快的马。LuoGu B3926。
      `,
      tags: ["编程题", "贪心", "双指针"],
      template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> a(n), b(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int i = 0; i < n; i++) cin >> b[i];\n    sort(a.begin(), a.end());\n    sort(b.begin(), b.end());\n    int la = 0, ra = n-1, lb = 0, rb = n-1;\n    int ans = 0;\n    while (la <= ra) {\n        if (a[ra] > b[rb]) { ans++; ra--; rb--; }\n        else if (a[la] > b[lb]) { ans++; la++; lb++; }\n        else {\n            if (a[la] < b[rb]) ans--;\n            la++; rb--;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
    }
];

paperData.questions.push(...programmingQuestions);
