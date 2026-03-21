// 2025年9月 GESP C++ 三级真题 (第11次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
//-客观题 1~15：题面主体、选项与单选答案可由官方 PDF 直接提取并整理；其中少量代码/版式题按官方 PDF 文本层做等价排版。
//-判断题 16~25：题面来自官方 PDF；官方 PDF 文本层未完整带出判断题答案表，当前答案依据公开解析交叉复核填写。
//-编程题 26~27：题名、题意主体、样例与参考代码来自官方 PDF；少量数据范围/公式符号因 PDF 文本层缺字，按官方题意做等价整理。
export const paperData = {
    id: '2025-09-l3',
    title: '2025年9月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1703975921385504.pdf',
        notes: '客观题 25 题已尽量补齐；其中判断题答案因官方 PDF 文本层未完整带出答案表，现依据公开解析交叉复核。编程题 2 题已补题意、样例与参考代码；少量变量符号/范围文字按官方题意等价整理。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '执行以下 C++ 代码后，c 的数值是（ ）。\n```cpp\nint a = 10, b = 3;\ndouble c = a / b;\n```',
            options: ['3.33333', '3.333', '3.0', '3.3'],
            answer: 2,
            score: 2,
            explanation: 'a 和 b 都是 int，a / b 做整数除法得到 3，再赋给 double 变量 c，所以结果是 3.0。'
        },
        {
            id: 2,
            type: 'single',
            question: '下列 C++ 表达式的结果为 true 的是（ ）。',
            options: ['(5 <= 5) && (7 < 5)', '!(10 > 5)', '(10 != 10) || (5 >= 3)', '(5 == 3) && (4 > 2)'],
            answer: 2,
            score: 2,
            explanation: '前两项与第四项结果都为 false；只有 (10 != 10) || (5 >= 3) 等于 false || true，即 true。'
        },
        {
            id: 3,
            type: 'single',
            question: '以下关于 C++ 数组的说法，错误的是（ ）。',
            options: [
                '数组的下标通常从 0 开始。',
                'int arr[5]; 声明了一个包含 5 个整数的数组。',
                '数组的大小必须在编译时确定，不能使用变量定义大小。',
                '可以通过 arr[5] 来访问 int arr[5]; 数组的最后一个元素。'
            ],
            answer: 3,
            score: 2,
            explanation: 'int arr[5] 的合法下标范围是 0~4，arr[5] 已越界，不是最后一个元素。'
        },
        {
            id: 4,
            type: 'single',
            question: '执行以下 C++ 代码后，变量 sum 的值是（ ）。\n```cpp\nint sum = 0;\nfor (int i = 1; i <= 5; i += 2) {\n    sum += i;\n    int sum = 0;\n}\n```',
            options: ['6', '9', '15', '死循环'],
            answer: 1,
            score: 2,
            explanation: '外层 sum 依次累加 1、3、5 得到 9；循环内重新定义的局部 sum 不影响外层变量。'
        },
        {
            id: 5,
            type: 'single',
            question: '要正确定义一个返回两个整数中较大值的函数 max，应该使用（ ）。',
            options: [
                'void max(int a, int b) { return a > b ? a : b; }',
                'int max(int a, int b) { if (a > b) return a; else return b; }',
                'int max(a, b) { if (a > b) return a; else return b; }',
                'void max(a, b) { cout << (a > b ? a : b); }'
            ],
            answer: 1,
            score: 2,
            explanation: '返回值类型应为 int，且参数类型需要显式写出，只有 B 符合 C++ 函数定义规范。'
        },
        {
            id: 6,
            type: 'single',
            question: '执行以下 C++ 代码后，数组 arr 的内容是（ ）。\n```cpp\nint arr[4] = {1, 2, 3};\narr[3] = arr[0]+arr[2];\n```',
            options: ['{1, 2, 3, 3}', '{1, 2, 3, 4}', '{1, 2, 3, 5}', '{1, 2, 3, 6}'],
            answer: 1,
            score: 2,
            explanation: '初始化后 arr 为 {1,2,3,0}，再令 arr[3] = 1+3 = 4，所以结果是 {1, 2, 3, 4}。'
        },
        {
            id: 7,
            type: 'single',
            question: '以下关于 C++ 函数的描述，正确的是（ ）。',
            options: [
                '函数必须要有参数。',
                '函数通过 return 语句只能返回一个值，但是可以通过其他方式间接返回多个值。',
                'main 函数可以被其他函数调用。',
                '函数的定义可以直接嵌套，即一个函数内部可以真正定义另一个函数。'
            ],
            answer: 1,
            score: 2,
            explanation: '函数可以无参数；main 不能作为普通函数随意调用；C++ 不支持函数内部再定义函数。B 正确。'
        },
        {
            id: 8,
            type: 'single',
            question: '以下 C++ 代码 count++ 执行的次数是（ ）。\n```cpp\nint i = 10;\nint count = 0;\nwhile (i > 0) {\n    i -= 3;\n    continue;\n    count++;\n}\n```',
            options: ['2', '3', '4', '0'],
            answer: 3,
            score: 2,
            explanation: '每次执行到 continue 就直接进入下一轮循环，count++ 永远不会执行。'
        },
        {
            id: 9,
            type: 'single',
            question: '以下 C++ 代码段的输出是（ ）。\n```cpp\nfor (int i = 0; i < 4; i++) {\n    for (int j = 0; j <= i; j++) {\n        cout << j;\n    }\n    cout << "#";\n}\n```',
            options: ['0#01#012#0123#', '1#12#123#1234#', '0#1#2#3#', '0#01#012#01243#'],
            answer: 0,
            score: 2,
            explanation: '四轮分别输出 0、01、012、0123，每轮末尾输出 #。'
        },
        {
            id: 10,
            type: 'single',
            question: '以下关于 C++ 变量作用域的说法，错误的是（ ）。',
            options: [
                '在 for 循环语句中声明的变量，其作用域仅限于该循环体内。',
                '在函数内部声明的变量（局部变量），仅在函数内部有效。',
                '在所有函数外部声明的变量，在整个程序中都有效。',
                '不同函数中的局部变量可以同名，它们代表不同的内存单元。'
            ],
            answer: 2,
            score: 2,
            explanation: '全局变量虽在文件中通常可见，但“在整个程序中都有效”表述过满，在多文件场景下并不总能直接使用。官方答案为 C。'
        },
        {
            id: 11,
            type: 'single',
            question: '关于以下代码的说法正确的是（ ）。\n```cpp\nint reversed = 0;\nwhile (x != 0) {\n    int digit = x % 10;\n    x /= 10;\n    reversed = reversed * 10+digit;\n}\n```',
            options: [
                '能够反转任何位数的整数',
                '能够反转的最大位数正整数是 2147483647',
                '能够反转的最大位数正整数是 2147483648',
                '能够反转的最大位数正整数是 1463847412'
            ],
            answer: 3,
            score: 2,
            explanation: '整数翻转要受 int 范围限制，1463847412 翻转后是 2147483641，仍在 int 范围内；再大就可能溢出。'
        },
        {
            id: 12,
            type: 'single',
            question: '以下 C++ 代码试图查找数组中的最大值，划线处应填入（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint findMax(int arr[], int size) {\n    int maxVal = ________;\n    for (int i = 1; i < size; i++) {\n        if (arr[i] > maxVal) {\n            maxVal = arr[i];\n        }\n    }\n    return maxVal;\n}\n```',
            options: ['0', 'arr[-1]', 'arr[0]', 'size'],
            answer: 2,
            score: 2,
            explanation: '打擂台找最大值时，通常先把第一个元素 arr[0] 作为当前最大值。'
        },
        {
            id: 13,
            type: 'single',
            question: '以下关于 C++ 函数的说法，正确的是（ ）。',
            options: [
                '函数参数传递只有值传递一种方式。',
                '函数的形参在函数调用结束后依然占用内存空间。',
                '没有返回值的函数必须声明为 void 类型，且不能包含 return 语句。',
                'C++11 及之后标准要求函数必须显式声明返回类型，不允许默认返回 int。'
            ],
            answer: 3,
            score: 2,
            explanation: 'A、B、C 都不正确；C++11 起函数返回类型必须显式声明，不能默认 int。'
        },
        {
            id: 14,
            type: 'single',
            question: '以下 C++ 代码中存在几处错误（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    const int SIZE = 5;\n    int arr[SIZE];\n    for (int i = 0; i <= SIZE; i++) {\n        arr[i] = i * 2;\n    }\n    cout << arr[SIZE] << endl;\n    return 0;\n}\n```',
            options: ['0 处', '1 处', '2 处', '3 处'],
            answer: 2,
            score: 2,
            explanation: 'for 条件 i <= SIZE 会访问 arr[5] 越界；输出 arr[SIZE] 也越界，共 2 处错误。'
        },
        {
            id: 15,
            type: 'single',
            question: '以下关于 C++ 中 string 类和字符数组（char[]）的说法，错误的是（ ）。',
            options: [
                'string 对象可以使用 = 进行赋值，而字符数组需要使用 strcpy。',
                'string 对象的长度可以使用 length() 成员函数获取，而字符数组需要使用 strlen() 函数。',
                'string 对象在内存中是动态分配空间的，因此可以自动处理字符串长度的变化。',
                'string 对象和字符数组都可以使用 == 运算符来直接比较两个字符串的内容是否相同。'
            ],
            answer: 3,
            score: 2,
            explanation: 'string 可以直接用 == 比较内容，但字符数组不能；字符数组若要比较内容通常应使用 strcmp。'
        },
        {
            id: 16,
            type: 'judge',
            question: "表达式 sizeof('a') 的结果总是 1，因为 'a' 是一个字符。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '该说法并不“总是”成立；在不同语言语境/实现背景下结论不应这样绝对化。公开解析给出的结论为错误。'
        },
        {
            id: 17,
            type: 'judge',
            question: '在 C++ 中，所有全局变量如果没有显式初始化，都会被自动初始化为 0。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '未显式初始化的全局变量与静态存储期对象会被自动进行零初始化。'
        },
        {
            id: 18,
            type: 'judge',
            question: 'do { ... } while (false); 循环体内的语句至少会被执行一次。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'do-while 先执行循环体，再判断条件，因此至少执行一次。'
        },
        {
            id: 19,
            type: 'judge',
            question: '在 C++ 中，++i 是一个左值表达式，而 i++ 是一个右值表达式。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '前置自增通常返回可继续赋值/取地址的对象本身，后置自增返回旧值临时量。'
        },
        {
            id: 20,
            type: 'judge',
            question: '对于 enum Color { RED, GREEN, BLUE };，RED 的类型是 int。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'RED 的类型是该枚举类型本身，不是 int；只是可在很多场景下转换为整数。'
        },
        {
            id: 21,
            type: 'judge',
            question: '宏定义 #define SQUARE(x) x * x 是一个安全的宏定义，SQUARE(2+3) 会正确计算出 25。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '未加括号会展开成 2+3*2+3，结果不是 25；安全写法应为 ((x) * (x))。'
        },
        {
            id: 22,
            type: 'judge',
            question: '在 C++ 中，char 类型的取值范围总是 -128 到 127。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '普通 char 是否带符号由实现决定，不一定总是 -128 到 127。'
        },
        {
            id: 23,
            type: 'judge',
            question: '表达式 a > b ? a : b = 10; 一定是合法的 C++ 代码。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '该表达式并非在所有情况下都合法，取决于条件运算结果是否可作为赋值左值。题干中的“一定”错误。'
        },
        {
            id: 24,
            type: 'judge',
            question: '#include "file.h" 和 #include <file.h> 在编译器查找头文件时的搜索策略是完全相同的。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '双引号通常优先从当前源文件目录查找，尖括号通常优先查系统头文件路径，搜索策略并不完全相同。'
        },
        {
            id: 25,
            type: 'judge',
            question: '在同一个作用域内，extern 声明的变量可以多次定义。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'extern 主要用于声明；变量在同一作用域内不能被重复定义。'
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            score: 25,
            title: '数组清零',
            problemNumber: 'B4413',
            source: 'official-pdf+luogu-mapping',
            description: '小 A 有一个由 n 个非负整数组成的数组 a。她会对数组 a 重复进行如下操作，直到数组只包含 0：1）找到数组中的最大值，若最大值有多个则取下标最大的那个；2）在所有非零元素中找到最小值；3）将第 1 步选中的最大值减去第 2 步得到的最小值。请你计算最少需要进行多少次操作，才能把整个数组都变成 0。',
            inputDescription: '第一行，一个正整数 n，表示数组长度。第二行，n 个非负整数 a1, a2, ..., an，表示数组中的元素。',
            outputDescription: '输出一行一个整数，表示把数组全部变成 0 所需要的操作次数。',
            samples: [
                {
                    input: '3\n2 3 4',
                    output: '7'
                },
                {
                    input: '5\n1 3 2 2 5',
                    output: '13'
                }
            ],
            explanation: '直接按题意模拟即可：每轮先找“最右侧最大值”，再找当前所有正数中的最小值并做减法，统计轮数直到最大值也变成 0。若进一步分析，答案也可理解为排序后各层高度对剩余正数个数的贡献总和。',
            tags: ['编程题', '模拟', '数组'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <algorithm>\n#include <cstdio>\nusing namespace std;\nconst int N = 105;\nint n;\nint a[N];\nint cnt;\nint main() {\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);\n    while (1) {\n        int mx = n;\n        for (int i = 1; i <= n; i++)\n            if (a[i] >= a[mx]) mx = i;\n        if (a[mx] == 0) break;\n        int mn = a[mx];\n        for (int i = 1; i <= n; i++)\n            if (a[i] > 0) mn = min(mn, a[i]);\n        a[mx] -= mn;\n        cnt++;\n    }\n    printf("%d\\n", cnt);\n    return 0;\n}'
        },
        {
            id: 27,
            type: 'programming',
            score: 25,
            title: '日历制作',
            problemNumber: 'B4414',
            source: 'official-pdf+luogu-mapping',
            description: '小 A 想制作 2025 年每个月的日历。输入一个月份 m，请按题目指定格式输出该月日历：先输出表头 MON TUE WED THU FRI SAT SUN，再按每周一到周日的顺序输出日期，并保证日期个位与对应星期缩写的最后一个字母对齐。题面特别说明：2025 年 9 月 1 日是星期一。',
            inputDescription: '输入一行，一个正整数 m，表示要输出 2025 年 m 月的日历。',
            outputDescription: '输出若干行，表示 2025 年 m 月的日历。',
            samples: [
                {
                    input: '9',
                    output: 'MON TUE WED THU FRI SAT SUN\n  1   2   3   4   5   6   7\n  8   9  10  11  12  13  14\n 15  16  17  18  19  20  21\n 22  23  24  25  26  27  28\n 29  30'
                },
                {
                    input: '6',
                    output: 'MON TUE WED THU FRI SAT SUN\n                          1\n  2   3   4   5   6   7   8\n  9  10  11  12  13  14  15\n 16  17  18  19  20  21  22\n 23  24  25  26  27  28  29\n 30'
                }
            ],
            explanation: '已知 2025 年 9 月 1 日是星期一，可以向前或向后按每月天数推算任意月份 1 日对应的星期。输出时先补齐首周空位，再按宽度格式化输出每个日期即可。',
            tags: ['编程题', '模拟', '日期', '格式化输出'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <algorithm>\n#include <cstdio>\nusing namespace std;\nint days[20] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\nint main() {\n    int m;\n    scanf("%d", &m);\n    printf("MON TUE WED THU FRI SAT SUN\\n");\n    int d = days[m];\n    int w = 1;\n    if (m > 9) {\n        for (int i = 9; i < m; i++) w = (w+days[i]-1) % 7+1;\n    } else if (m < 9) {\n        for (int i = 8; i >= m; i--) w = ((w-days[i]) % 7+7) % 7;\n        if (w == 0) w = 7;\n    }\n    for (int i = 1; i < w; i++) printf("    ");\n    for (int i = 1; i <= d; i++) {\n        printf("% 3d", i);\n        w = w % 7+1;\n        if (w == 1 || i == d)\n            printf("\\n");\n        else\n            printf(" ");\n    }\n    return 0;\n}'
        }
    ]
};
