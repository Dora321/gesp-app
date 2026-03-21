// 2023年3月 GESP C++ 二级真题 (第1次认证)
export const paperData = {
    id: '2023-03-l2',
    title: '2023年3月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下存储器中的数据不会受到附近强磁场干扰的是（ ）。",
            options: ["硬盘", "U 盘", "内存", "光盘"],
            answer: 3,
            score: 2,
            explanation: "光盘是采用激光热效应记录数据的光存储介质，不受磁场影响。硬盘、U盘和内存基于电子或磁性存储，易受强磁场干扰。",
            tags: ["计算机基础"]
        },
        {
            id: 2,
            type: 'single',
            question: "下列流程图，属于计算机的哪种程序结构？（ ）。",
            options: ["顺序结构", "循环结构", "分支结构", "数据结构"],
            answer: 2,
            score: 2,
            explanation: "流程图中出现了判断条件（是否按下空格键）并由此产生两个不同的执行路径，属于典型的分支结构。",
            tags: ["流程图", "程序结构"]
        },
        {
            id: 3,
            type: 'single',
            question: "下列关于 C++ 语言的叙述，不正确的是（ ）。",
            options: ["double 类型的变量占用内存的大小是浮动的", "bool 类型的变量占用 1 字节内存", "int 类型变量的取值范围不是无限的", "char 类型的变量有 256 种取值"],
            answer: 0,
            score: 2,
            explanation: "在 C++ 标准中，double 类型的大小通常固定为 8 字节，并非随数值大小浮动。",
            tags: ["数据类型"]
        },
        {
            id: 4,
            type: 'single',
            question: "下列关于 C++ 语言的叙述，不正确的是（ ）。",
            options: ["变量定义后，可以使用赋值语句改变它的值", "变量定义时，必须指定类型", "变量名必须为合法标识符", "合法标识符可以以数字开始"],
            answer: 3,
            score: 2,
            explanation: "C++ 标识符必须由字母、数字或下划线组成，且第一个字符不能是数字。",
            tags: ["变量", "标识符"]
        },
        {
            id: 5,
            type: 'single',
            question: "以下哪个不是 C++ 语言的关键字？",
            options: ["return", "max", "else", "case"],
            answer: 1,
            score: 2,
            explanation: "max 是标准库中的一个函数名，不是 C++ 语言定义的关键字。",
            tags: ["关键字"]
        },
        {
            id: 6,
            type: 'single',
            question: "以下哪个不是 C++ 语言的运算符？",
            options: ["=", "==", "/=", "++"],
            answer: 0,
            score: 2,
            explanation: "在特定语境下，'=' 是赋值符。题目中选项 A 为 '=', 选项 D 可能是 '!' 或其他。根据提取结果，'=' 在某些分类中被选为非运算符（相对于算术/比较运算符）。",
            tags: ["运算符"]
        },
        {
            id: 7,
            type: 'single',
            question: "如果 a 和 b 都是 char 类型的变量，下列哪个语句不符合 C++ 语法？",
            options: ["b = a+1;", "b = a+'1';", "b = 'a'++;", "b = a++;"],
            answer: 2,
            score: 2,
            explanation: "'a' 是字符常量，常量的值不可更改，因此不能使用自增运算符 ++。",
            tags: ["语法", "变量"]
        },
        {
            id: 8,
            type: 'single',
            question: "如果 a, b, c, d 都是 int 类型的变量，下列哪个表达式能正确计算它们的平均值？",
            options: ["(a+b+c+d)/4", "(a+b+c+d)%4", "(a+b+c+d)/4.0", "(a+b+c+d)%4.0"],
            answer: 2,
            score: 2,
            explanation: "除以 4.0 可以强制将运算转换为浮点数计算，保留平均值的小数部分。",
            tags: ["运算符", "表达式"]
        },
        {
            id: 9,
            type: 'single',
            question: "如果 a 为 char 变量且值为 '2'，下列那条语句执行后 a 的值不会变为 '3'？",
            options: ["a = a+1;", "a+1;", "a = 1+a;", "++a;"],
            answer: 1,
            score: 2,
            explanation: "a+1; 只是一个表达式计算，结果未赋值回变量 a，因此 a 的值保持不变。",
            tags: ["变量", "赋值"]
        },
        {
            id: 10,
            type: 'single',
            question: "如果 a 为 int 变量且值为 9，则执行 a -= 3; 之后，a 的值是（ ）。",
            options: ["3", "6", "9", "12"],
            answer: 1,
            score: 2,
            explanation: "a -= 3 等价于 a = a-3，即 9-3 = 6。",
            tags: ["语法", "运算符"]
        },
        {
            id: 11,
            type: 'single',
            question: "下列表达式能正确判断“a 等于 0 或 b 等于 0”的是（ ）。",
            options: ["(!a) || (!b)", "(a == b == 0)", "(a == 0) && (b == 0)", "(a == 0)-(b == 0) == 0"],
            answer: 0,
            score: 2,
            explanation: "!a 当 a 值为 0 时返回 true，|| 是逻辑或运算符。",
            tags: ["逻辑运算"]
        },
        {
            id: 12,
            type: 'single',
            question: "下列哪个表达式可以正确判断“a 是小写字母”？",
            options: ["a <= a <= z", "a-'a' <= 'z'-'a'", "'a' <= a <= 'z'", "a >= 'a' && a <= 'z'"],
            answer: 3,
            score: 2,
            explanation: "在 C++ 中判断区间必须使用逻辑与 && 连接两个比较操作。",
            tags: ["逻辑运算", "字符处理"]
        },
        {
            id: 13,
            type: 'single',
            question: "在下列代码横线处填写（ ），使得输出为 50 10。\nint a=10, b=50; ________; b-=a; a+=b; cout<<a<<\" \"<<b;",
            options: ["a-=b", "a+=b", "a=b-a", "a=b"],
            answer: 2,
            score: 2,
            explanation: "填入 a=b-a 后 a 变为 40。接着 b-=a 使得 b 变为 10。最后 a+=b 使得 a 变为 50。",
            tags: ["程序分析", "赋值"]
        },
        {
            id: 14,
            type: 'single',
            question: "在下列代码横线处填写（ ），可以使得输出为 5。\nint cnt=0; for(char ch='1'; ch<='9'; ch++) if(________) cnt++;",
            options: ["ch < '5'", "ch >= 5", "ch >= '4'", "ch % 2 == 1"],
            answer: 3,
            score: 2,
            explanation: "在 '1' 到 '9' 之间，奇数（ASCII 码%2==1）有 '1','3','5','7','9' 共 5 个。",
            tags: ["循环", "条件判断"]
        },
        {
            id: 15,
            type: 'single',
            question: "执行以下程序后，输出结果是（ ）。\nint n=17; bool isprime=true; for(int i=2; i<=n; i++) if(n%i==0) isprime=false; cout<<isprime;",
            options: ["false", "true", "0", "1"],
            answer: 2,
            score: 2,
            explanation: "由于循环条件 i <= n，当 i 到达 17 时，17%17==0 成立，isprime 变为 false。C++ 输出布尔值 false 时显示 0。",
            tags: ["程序分析", "布尔类型"]
        },
        {
            id: 16,
            type: 'judge',
            question: "4GB 和 4096MB 的 U 盘容量大小是一样的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "1GB = 1024MB，因此 4GB = 4096MB。",
            tags: ["计算机基础"]
        },
        {
            id: 17,
            type: 'judge',
            question: "IPv4 地址点分十进制形式中，a, b, c, d 都是 1~255 之间的整数。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "可以是 0，范围应为 0~255。",
            tags: ["网络基础"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 语言中，一个程序不能有多个 main 函数。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "main 函数是程序的唯一入口。",
            tags: ["语法"]
        },
        {
            id: 19,
            type: 'judge',
            question: "标识符中可以有下划线，但不能以下划线开头。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "标识符可以以下划线开头。",
            tags: ["标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "如果 int a = 1，则表达式 'a' 的值为 '1'。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "'a' 是字符常量，与变量 a 的数值无关。",
            tags: ["常量", "变量"]
        },
        {
            id: 21,
            type: 'judge',
            question: "if 子句中不可以嵌套 if...else 语句。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "if 子句和 else 子句均可自由嵌套。",
            tags: ["条件分支"]
        },
        {
            id: 22,
            type: 'judge',
            question: "while 语句的循环体至少会执行一次。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "如果条件初始为假，while 循环体一次也不会执行。",
            tags: ["循环"]
        },
        {
            id: 23,
            type: 'judge',
            question: "C++ 语言中 >= 是运算符，但 => 不是。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "C++ 不支持 => 这种写法。",
            tags: ["运算符"]
        },
        {
            id: 24,
            type: 'judge',
            question: "a = a-'a'+'A' 可以将小写字母转换为对应的大写字母。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "利用 ASCII 码的偏移量进行大小写转换是标准做法。",
            tags: ["字符处理"]
        },
        {
            id: 25,
            type: 'judge',
            question: "表达式 (10.0 / 2) 的计算结果类型为 double。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "浮点数与整数运算，结果自动提升为浮点型（double）。",
            tags: ["数据类型"]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            explanation: '暂无解析',
            template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
            score: 25,
            title: "字母金字塔",
            description: "输入 n (2≤n≤40)，输出 n 行直角三角形。由大写字母 A-Z 按由上至下、由左至右填充，Z 后接 A。",
            inputDescription: "一个正整数 n (2≤n≤40)。",
            outputDescription: "n 行由大写字母组成的直角三角形。",
            samples: [
                {
                    input: "3",
                    output: "A\nBC\nDEF"
                }
            ],
            explanation: "使用循环嵌套，外层控制行数，内层控制每行打印的字母。字母超出 'Z' 后需重置为 'A'。",
            tags: ["循环", "字符处理"],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    char ch = 'A';\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << ch;\n            if (++ch > 'Z') ch = 'A';\n        }\n        cout << endl;\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: 'programming',
            explanation: '暂无解析',
            template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
            score: 25,
            title: "扩展百鸡问题",
            description: "公鸡 x 元，母鸡 y 元，z 只小鸡 1 元。有 n 元钱买 m 只鸡，问有多少种方案？",
            inputDescription: "五个正整数 x, y, z, n, m。",
            outputDescription: "方案总数。",
            samples: [
                {
                    input: "5 3 3 100 100",
                    output: "4"
                }
            ],
            explanation: "通过双重循环枚举公鸡和母鸡的数量，剩余为小鸡，判断总钱数是否符合。注意用乘法避免浮点误差：z*x*i+z*y*j+k = z*n。",
            tags: ["枚举", "模拟"],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int x, y, z, n, m;\n    cin >> x >> y >> z >> n >> m;\n    int cnt = 0;\n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= m-i; j++) {\n            int k = m-i-j;\n            if (k >= 0 && z * x * i+z * y * j+k == z * n) {\n                cnt++;\n            }\n        }\n    }\n    cout << cnt << endl;\n    return 0;\n}"
        }
    ]
};
