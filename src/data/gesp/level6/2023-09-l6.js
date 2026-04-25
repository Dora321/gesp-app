// 2023年9月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `5 100
100 2000
2 50
4 40
5 30
3 20`, output: `9` },
        { input: `5 141
100 2000
2 50
4 40
5 30
3 20`, output: `100` },
        { input: `4 141
2 50
4 40
5 30
3 20`, output: `no solution` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202309 六级] 小杨买饮料

## 题目描述

小杨来到了一家商店，打算购买一些饮料。这家商店总共出售 $N$ 种饮料，编号从 $0$ 至 $N-1$，其中编号为 $i$ 的饮料售价 $c_i$ 元，容量 $l_i$ 毫升。

小杨的需求有如下几点：

1. 小杨想要尽可能尝试不同种类的饮料，因此他希望每种饮料至多购买 $1$ 瓶；

2. 小杨很渴，所以他想要购买总容量不低于 $L$ 的饮料；

3. 小杨勤俭节约，所以在 $1$ 和 $2$ 的前提下，他希望使用尽可能少的费用。

方便起见，你只需要输出最少花费的费用即可。特别地，如果不能满足小杨的要求，则输出 \`no solution\`。

## 输入格式

第一行两个整数 $N,L$。

接下来 $N$行，依次描述第 $i=0,1,\\cdots,N-1$ 种饮料：每行两个整数 $c_i,l_i$。

## 输出格式

输出一行一个整数，表示最少需要花费多少钱，才能满足小杨的要求。特别地，如果不能满足要求，则输出 \`no solution\`。
`,
      score: 25,
      explanation: "把容量上限压到 L：dp[j] 表示凑到容量至少 j 的最小花费。枚举每瓶饮料做一次 0/1 转移，新容量用 min(L, j+l_i) 截断即可；最后若 dp[L] 仍为无穷大则无解。",
      tags: ["编程题", "动态规划", "0/1背包"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, L;\n    cin >> n >> L;\n\n    const long long INF = (1LL << 60);\n    vector<long long> dp(L+1, INF);\n    dp[0] = 0;\n\n    for (int i = 0; i < n; ++i) {\n        int c, len;\n        cin >> c >> len;\n        vector<long long> ndp = dp;\n        for (int j = 0; j <= L; ++j) {\n            if (dp[j] == INF) continue;\n            int nj = min(L, j+len);\n            ndp[nj] = min(ndp[nj], dp[j]+c);\n        }\n        dp.swap(ndp);\n    }\n\n    if (dp[L] == INF) {\n        cout << \"no solution\\n\";\n    } else {\n        cout << dp[L] << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
2 1 3 0`, output: `2` },
        { input: `6
0 1 2 3 4 5`, output: `15` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202309 六级] 小杨的握手问题

## 题目描述

小杨的班级里共有 $N$ 名同学，学号从 $0$ 至 $N-1$。

某节课上，老师安排全班同学进行一次握手游戏，具体规则如下：老师安排了一个顺序，让全班 $N$ 名同学依次进入教室。每位同学进入教室时，需要和 **已经在教室内** 且 **学号小于自己** 的同学握手。

现在，小杨想知道，整个班级总共会进行多少次握手。

**提示：可以考虑使用归并排序进行降序排序，并在此过程中求解。**

## 输入格式

输入包含 $2$ 行。第一行一个整数 $N$ ，表示同学的个数；第二行 $N$ 个用单个空格隔开的整数，依次描述同学们进入教室的顺序，每个整数在 $0 \\sim N-1$ 之间，表示该同学的学号。

保证每位同学会且只会进入教室一次。

## 输出格式

输出一行一个整数，表示全班握手的总次数。
`,
      score: 25,
      explanation: "按进入顺序统计：第 i 个同学会和此前所有学号更小的人握手，因此答案是满足 i<j 且 a_i<a_j 的二元组个数。用树状数组维护已经进入的学号个数即可。",
      tags: ["编程题", "归并排序", "逆序对"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Fenwick {\n    int n;\n    vector<long long> bit;\n    Fenwick(int n = 0) { init(n); }\n    void init(int n_) {\n        n = n_;\n        bit.assign(n+1, 0);\n    }\n    void add(int x, long long v) {\n        for (++x; x <= n; x += x & -x) bit[x] += v;\n    }\n    long long sumPrefix(int x) const {\n        long long res = 0;\n        for (++x; x > 0; x -= x & -x) res += bit[x];\n        return res;\n    }\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    int mx = 0;\n    for (int i = 0; i < n; ++i) {\n        cin >> a[i];\n        mx = max(mx, a[i]);\n    }\n\n    Fenwick fw(mx+1);\n    long long ans = 0;\n    for (int x : a) {\n        if (x > 0) ans += fw.sumPrefix(x-1);\n        fw.add(x, 1);\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2023-09-l6',
    title: '2023年9月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `近年来，线上授课变得普遍，很多有助于改善教学效果的设备也逐渐流⾏，其中包括比较常用的⼿写板，那 么它属于哪类设备？（ ）。`,
            options: [
                "输入",
                "输出",
                "控制",
                "记录",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `如果 a 和 b 均为 int 类型的变量，且 b 的值不为 0，那么下列能正确判断“ a 是 b 的3倍”的表达式是（ ）。`,
            options: [
                "(a >> 3 == b)",
                "(a-b) % 3 == 0",
                "(a / b == 3)",
                "(a == 3 * b)",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `以下不属于面向对象程序设计语⾔的是（ ）。`,
            options: [
                "C++",
                "Python",
                "Java",
                "C",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `下面有关C++类定义的说法，错误的是（ ）。`,
            options: [
                "C++类实例化时，会执⾏构造函数。",
                "C++⾃定义类可以通过定义构造函数实现⾃动类型转换。",
                "C++⾃定义类可以通过重载 >、 < 等运算符实现大小比较。",
                "C++⾃定义类可以包含任意类型的成员。",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `有关下面C++代码的说法，错误的是（ ）。`,
            options: [
                "代码 cout << st << endl;会报错，",
                "第 6 ⾏代码的 data是 MyStr类的成员变量。",
                "代码 MyStr st(\"ABC\");不会报错，将执⾏构造函数。",
                "选项D",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `下列关于命名空间的说法错误的是（ D. 代码 cout<< st.data <<endl; 可输出 ABC。 ）。`,
            options: [
                "命名空间可以嵌套, 例如 namespace A { namespace B { int i;}}。",
                "命名空间只可以在全局定义。",
                "命名空间中可以存放变量和函数。",
                "代码 cout<< st.data <<endl; 可输出 ABC。 ）。",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `有关下面C++代码的说法，正确的是（ ）。 因为没有为 MyStr类重载 <<运算符。`,
            options: [
                "这段代码不能正常运⾏。",
                "ManyData类可用于构造队列（ Queue ）数据结构。",
                "在上面代码环境，代码cout<< myData.__data[0] << endl;可以增加到代码main函数末尾（return 0; 之前），且不会导致报错。",
                "可以为ManyData类的push()、pop()函数增加异常处理代码，否则在使用ManyData类时可能导致运⾏ 时错误或逻辑错误（不一定局限于上述代码中的 main函数）。",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `有关下面 C++ 代码的说法，错误的是（ ）。`,
            options: [
                "MoreData类可用于构造队列（ Queue ）数据结构。",
                "代码第 29 ⾏，连续push()的用法将导致编译错误。",
                "__data是MoreData类的私有成员，只能在类内访问。",
                "以上说法均没有错误。",
            ],
            answer: 1,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `某内容仅会出现ABCDEFG，其对应的出现概率为 0.40 、 0.30 、 0.15 、 0.05 、 0.04 、 0.03 、 0.03 ，如下图所⽰。 按照哈夫曼编码规则，假设B 的编码为11，则D 的编码为（ ）。`,
            options: [
                "10010",
                "10011",
                "10111",
                "10001",
            ],
            answer: 1,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下面有关格雷码的说法，错误的是（ ）。`,
            options: [
                "在格雷码中，任意两个相邻的代码只有一位二进制数不同。",
                "格雷码是一种唯一性编码。",
                "在格雷码中，最大数和最小数只有一位二进制数不同。",
                "格雷码是一种可靠性编码。",
            ],
            answer: 1,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `有关下图的二叉树，说法正确的是（ ）。`,
            options: [
                "既是完全二叉树也是满二叉树。",
                "既是二叉搜索树也是平衡二叉树。",
                "非平衡二叉树。",
                "以上说法都不正确。",
            ],
            answer: 1,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `个节点的二叉搜索树，其查找的平均时间复杂度为（ ）。`,
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `青蛙每次能跳1或2步。下面是青蛙跳到第 N 步台阶C++实现代码。该段代码采用的算法是（ ）。`,
            options: [
                "递推算法",
                "贪⼼算法",
                "动态规划算法",
                "分治算法",
            ],
            answer: 2,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `个节点的双向循环链，在其中查找某个节点的平均时间复杂度是（ ）。`,
            options: [
                "[待补充选项]",
                "题号 1 2 3 4 5 6 7 8 9 10 答案",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `关于C++语⾔，以下说法不正确的是（ ）。`,
            options: [
                "若对象被定义为常量，则它只能调用以 const修饰的成员函数。",
                "所有的常量静态变量都只能在类外进⾏初始化。",
                "若类 A 的对象 a 是类 B 的静态成员变量，则 a 在 main() 函数调用之前应被初始化。",
                "静态全局对象、常量全局对象都是在 main 函数调用之前完成初始化，执⾏完 main 函数后被析构。",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `TCP/IP的传输层的两个不同的协议分别是UDP和TCP。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `5G⽹络中，5G中的G表⽰Gigabytes/s，其中 1 GB = 1024 MB。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `在面向对象中，类是对象的实例。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `在C++类的定义中，使用 static修饰符定义的静态成员被该类的所有对象共享。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `在C++类的定义中，可以定义初始化函数或运算符函数等。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `DFS是深度优先算法的英文简写。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `哈夫曼编码是一种有损压缩算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `有些算法或数据结构在C/C++语⾔中使用指针实现，一个典型的例子就是链表。因此，链表这一数据结构在 C/C++语⾔中只能使用指针来实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `如果节点数为 ，⼴度搜索算法的最差时间复杂度为 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `二叉搜索树的左右子树也是二叉搜索树。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        ...programmingQuestions
    ]
};
