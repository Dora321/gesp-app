// 2024年3月 GESP C++ 四级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "相似字符串",
        problemNumber: "2024-03-23-04-C-01",
        description: "对于两个字符串 A 和 B，如果 A 可以通过删除一个字符，或插入一个字符，或修改一个字符变成 B，那么我们说 A 和 B 是相似的。特别地，完全相同的两个字符串也是相似的。给定 T 组 A, B，请你分别判断他们是否相似。",
        inputDescription: "第一行一个正整数 T。接下来 T 行，每行两个用空格隔开的字符串 A 和 B。保证 T ≤ 100，字符串长度不超过 100，只包含小写字母。",
        outputDescription: "输出 T 行，对于每组 A, B，如果它们相似，则输出 similar，否则输出 not similar。",
        samples: [
            { input: "5\napple applee\napple appe\napple bpple\napplee bpple\napple apple", output: "similar\nsimilar\nsimilar\nnot similar\nsimilar" }
        ],
        explanation: "相似字符串定义等价于编辑距离（Edit Distance）不超过 1。由于字符串长度较短，可以直接分类讨论：长度差为 0（修改或相同）或长度差为 1（增加或删除）。",
        tags: ["编程题", "字符串", "编辑距离"],
        template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int T;\n    cin >> T;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <string>\n#include <cmath>\nusing namespace std;\nbool isSimilar(string A, string B) {\n    int m = A.size(), n = B.size();\n    if (abs(m - n) > 1) return false;\n    if (m == n) {\n        int diff = 0;\n        for (int i = 0; i < m; ++i) if (A[i] != B[i]) diff++;\n        return diff <= 1;\n    } else {\n        string& s = (m < n) ? A : B;\n        string& l = (m < n) ? B : A;\n        int i = 0, j = 0, diff = 0;\n        while (i < s.size() && j < l.size()) {\n            if (s[i] != l[j]) {\n                if (++diff > 1) return false;\n                ++j;\n            } else { ++i; ++j; }\n        }\n        return true;\n    }\n}\nint main() {\n    int T; cin >> T;\n    while (T--) {\n        string A, B; cin >> A >> B;\n        if (isSimilar(A, B)) cout << \"similar\" << endl;\n        else cout << \"not similar\" << endl;\n    }\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "做题",
        problemNumber: "2024-03-23-04-C-02",
        description: "小杨为了提高实力制定了做题计划，在第 i 天时，他必须要完成 i 道题。他找到了 n 套题单，每套题单有一定数量的题目。每套题单只能使用一次，每一天也只能使用一套题单里的题目。对于每套题单，他不必完成题单内所有的题。问小杨最多会做题几天才偷懒？",
        inputDescription: "第一行 1 个数为 n (1 ≤ n ≤ 1,000,000)。第二行 n 个整数 ai，分别表示每套题单有多少道题。",
        outputDescription: "输出一行，小杨同学偷懒前最多做题天数。",
        samples: [
            { input: "4\n3 1 4 1", output: "3" }
        ],
        explanation: "贪心策略：为了尽可能做更多的天数，我们需要在第 i 天选择一个题目数量 ≥ i 且题目数量尽可能小的题单。因此，先对题单按题目数量从小到大排序，然后尝试匹配每一天。",
        tags: ["编程题", "贪心", "排序"],
        template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    int day = 0;\n    for (int i = 0; i < n; i++) {\n        if (a[i] >= day + 1) day++;\n    }\n    cout << day << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-03-l4',
    title: '2024年3月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 3,
    session: 1,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "若函数声明为int f(int &x){ x+=3; return x; }，则对声明的变量int a=3，下面哪个调用能够改变a的值 ( ) 。",
            options: ["f(&a);", "f(*a);", "f(a);", "f(a-3);"],
            answer: 2,
            score: 2,
            explanation: "函数参数为引用传递 int &x，直接传递变量名 f(a) 即可改变 a 的值。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "下面 C++ 代码执行后，输出的是 ( ) 。\n```cpp\nint main() {\n    char *p = \"GESP\";\n    cout << *(p+2) << endl;\n    return 0;\n}\n```",
            options: ["G", "e", "n", "S"],
            answer: 2,
            score: 2,
            explanation: "p 指向字符串 \"GESP\"。p+2 指向字符 'S'（下标从0开始），解引用得到 'S'。注：样例选项 D 原文为 P 可能有误，应为 S。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "下面 C++ 代码执行后输出是 ( ) 。\n```cpp\nint main() {\n    int x[]={2, 0, 2, 4};\n    char geSP[]=\"Grade Examination of SP\";\n    cout << geSP[sizeof(x)] << endl;\n    return 0;\n}\n```",
            options: ["G", "r", "a", "E"],
            answer: 3,
            score: 2,
            explanation: "sizeof(x) = 4 * sizeof(int) = 4 * 4 = 16 (在常见64位系统)。geSP[16] 对应字符串中第 17 个字符。'Grade Examination' 长度正好是 17，下标 16 对应 ' ' 后的 'o'？不，'Grade Examination of SP' 中 'Grade ' (6) + 'Examination ' (12) ... 重新计算：G(0)r(1)a(2)d(3)e(4) (5)E(6)x(7)a(8)m(9)i(10)n(11)a(12)t(13)i(14)o(15)n(16)。所以下标 16 对应 'n'。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "对二维数组int arr[3][16];，则arr[1]占用内存的大小为（ ）字节。",
            options: ["4", "16", "48", "64"],
            answer: 3,
            score: 2,
            explanation: "arr[1] 是一个包含 16 个 int 的一维数组。大小为 16 * 4 = 64 字节。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "对二维数组int arr[3][16];，若arr的地址是0x28cbc0，则arr[1]的值是（ ）。",
            options: ["0x28cbc4", "0x28cbd0", "0x28cc00", "0x28cc40"],
            answer: 2,
            score: 2,
            explanation: "arr[1] 的地址相对于 arr 偏移了 16 个 int。16 * 4 = 64 (0x40)。0x28cbc0 + 0x40 = 0x28cc00。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "下面 C++ 代码执行后输出是（ ）。\n```cpp\nint main() {\n    char *p = \"I love GESP!\";\n    cout << p + 7 << endl;\n    return 0;\n}\n```",
            options: ["e", "I lov", "e GESP!", "GESP!"],
            answer: 2,
            score: 2,
            explanation: "p+7 指向字符串中从第 8 个字符开始的部分。'I'(0) ' '(1) 'l'(2) 'o'(3) 'v'(4) 'e'(5) ' '(6) 'G'(7)... 输出 \"GESP!\"？不，'I' ' ' 'l' 'o' 'v' 'e' ' ' 是 7 个字符。下标 7 指向 'G'。输出从 'G' 到结束：\"GESP!\"。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "下面 C++ 代码执行以后输出的是（ ）。\n```cpp\nint foo(float *f) { return int(*f * 2); }\nint main() {\n    float fnum[10] = {1.1};\n    fnum[1] = foo(fnum);\n    cout << fnum[0] + fnum[1] << endl;\n    return 0;\n}\n```",
            options: ["1.1", "3.1", "3.3", "不确定"],
            answer: 3,
            score: 2,
            explanation: "foo(fnum) 传入 fnum[0]=1.1，返回 int(1.1*2) = 2。fnum[1]=2.0。输出 1.1 + 2.0 = 3.1。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 函数中采用的算法是（ ）。\n```cpp\nint fib(int n) {\n    int i, f[n]={0, 1};\n    for(int i=2; i<=n; i++) f[i]=f[i-1]+f[i-2];\n    return f[n];\n}\n```",
            options: ["递推", "递归", "迭代", "分治"],
            answer: 0,
            score: 2,
            explanation: "使用循环和数组保存中间结果，根据前两项求当前项，属于递推算法。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "插入排序在最好情况下的时间复杂度是（ ）。",
            options: ["$$O(1)$$", "$$$O(N)$$$", "$O(n \log n)$", "$$$O(N^2)$$$"],
            answer: 2,
            score: 2,
            explanation: "插入排序在数组已经有序时，只需比较 $N-1$ 次，复杂度为 $$$O(N)$$$。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "在如下的 C++ 代码执行后，设第 11 和 12 行的输出地址值分别为X和Y，则下面正确的是（ ）。\n```cpp\nstruct pass {\n    int no;\n    char name[20];\n    int level;\n};\nint main() {\n    struct pass XiaoYang;\n    cout << &XiaoYang << endl; // 第 11 行\n    cout << &(XiaoYang.no) << endl; // 第 12 行\n    return 0;\n}\n```",
            options: ["X > Y", "X == Y", "X < Y", "不确定"],
            answer: 1,
            score: 2,
            explanation: "结构体的地址等于其第一个成员的地址。因此 X == Y。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "如果文件 1.txt 中的内容为 `50 2024 3.16 I love GESP!`，则执行下面 C++ 代码时输出的 x 的值为（ ）。\n```cpp\nint main() {\n    ifstream fin;\n    string line; int x;\n    fin.open(\"1.txt\", ios::in);\n    for (int i=0; i<2; i++) fin >> line;\n    fin >> x;\n    cout << x << endl;\n    return 0;\n}\n```",
            options: ["50", "2024", "3", "0"],
            answer: 2,
            score: 2,
            explanation: "循环读入两次字符串：'50' 和 '2024'。下一次读入整数 x，读取 '3.16' 中的整数部分 '3'。因此输出 3。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "执行下列 C++ 代码时输出的第 2 行是（ ）。\n```cpp\nint main() {\n    char *s[]={(char*)\"2024\",(char*)\"3.16\",(char*)\"GESP\"};\n    for (int i=0; i<2; i++) cout << *s+i << endl;\n    return 0;\n}\n```",
            options: ["2024", "024", "3.16", "16"],
            answer: 2,
            score: 2,
            explanation: "s 是指针数组。*s 指向 \"2024\"。i=0 输出 *s+0 (\"2024\"); i=1 输出 *s+1 (\"024\")。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "C++ 语言中下面哪个关键字能够限定对象的作用域（ ）。",
            options: ["extern", "static", "inline", "public"],
            answer: 1,
            score: 2,
            explanation: "static 关键字可以限制变量或函数仅在当前文件（编译单元）可见，起到限定作用域的作用。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是（ ）。",
            options: ["小程序", "计时器", "操作系统", "神话人物"],
            answer: 2,
            score: 2,
            explanation: "华为鸿蒙（HarmonyOS）是一款操作系统。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（ CCF ）在 2024 年 1 月 27 日颁布了王选奖，王选先生的重大贡献是（ ）。",
            options: ["制造自动驾驶汽车", "创立培训学校", "发明汉字激光照排系统", "成立方正公司"],
            answer: 2,
            score: 2,
            explanation: "王选先生被称为“当代毕昇”，主要贡献是发明了汉字激光照排系统。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "对int a[]={2,0,2,4,3,1,6}，执行第一趟选择排序处理后a中数据变为{0,2,2,4,3,1,6}。 ( )",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "第一趟选择排序会把最小值 0 交换到首位，数组变为 {0,2,2,4,3,1,6}，说法正确。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "如果待排序数据不能都装进内存，需要使用外排序算法。（ ）",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "当数据规模大到无法一次性全部装入内存时，需要借助磁盘等外存进行外排序，说法正确。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "定义变量int a=5, 则cout << &++a会输出6。 ( )",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "++a 的结果是变量 a 本身的左值，对它取地址得到的是地址，不会输出数值 6，因此说法错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "两个函数之间可以使用全局变量来传递数据。 ( )",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "全局变量具有更大的作用域，不同函数都可以访问它，因此可以用来在函数之间传递数据。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "定义数组int a[2024][3][16]={2,0,2,4,3,1,6}，则cout << a[2023][2][15]的结果不确定。（ ）",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "部分初始化时，未显式赋值的数组元素会被自动初始化为 0，所以 a[2023][2][15] 的值确定为 0，该说法错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 语言中，函数的参数为指针时，可以在函数内部修改该参数的值。（ ）",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "参数是指针时，可以通过指针间接修改它所指向对象的值，因此说法正确。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 语言中try子句里抛出的结构体等类型的异常无法被catch捕获。（ ）",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "C++ 可以抛出并捕获结构体、类等各种类型的异常对象，该说法错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "C++ 语言中cout << 9^2 << endl;会输出 81 。（ ）",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "^ 在 C++ 中是按位异或运算，不是乘方。9 ^ 2 的结果是 11，不是 81，所以说法错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨今年春节回奶奶家了，奶奶家的数字电视要设置 ip 地址并接入到 WIFI 盒子才能收看节目，那这个 WIFI 盒子具有路由器的功能。（ ）",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "WIFI 盒子主要负责无线接入/联网转换，并不等同于具备完整路由功能，因此该说法错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "任何一个for循环都可以转化为等价的while循环（ ）。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "for 循环本质上都能改写为初始化 + 条件判断 + 循环体 + 更新语句组成的 while 循环，说法正确。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
