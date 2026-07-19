// 2024年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3
6
188
9999`, output: `2
4
-1` }
      ],
      question: `
# [GESP202409 五级] 挑战怪物

## 题目描述

小杨正在和一个怪物战斗，怪物的血量为 $h$，只有当怪物的血量**恰好**为 $0$ 时小杨才能够成功击败怪物。

小杨有两种攻击怪物的方式：
- 物理攻击。假设当前为小杨第 $i$ 次使用物理攻击，则会对怪物造成 $2^{i - 1}$ 点伤害。
- 魔法攻击。小杨选择任意一个质数 $x$（ 不能超过怪物当前血量），对怪物造成 $x$ 点伤害。由于小杨并不擅长魔法，他只能使用**至多一次**魔法攻击。

小杨想知道自己能否击败怪物，如果能，小杨想知道自己最少需要多少次攻击。

## 输入格式

**本题单个测试点内有多组测试数据**。第一行包含一个正整数 $t$，代表测试用例组数。

接下来是 $t$ 组测试用例。对于每组测试用例，只有一行一个整数 $h$，代表怪物血量。

## 输出格式

对于每组测试用例，如果小杨能够击败怪物，输出一个整数，代表小杨需要的最少攻击次数，如果不能击败怪物，
输出 $-1$。
`,
      score: 25,
      explanation: `**解析：**
      每一场战斗，只要选择当前熟练度最大的武器或能使熟练度增加最多的武器（此题中由于每次只能选一个，实际上只需考虑对所有武器熟练度的增加总量）。由于是求最大值的最大化，我们只需关注单种武器能达到的最大值。其实每场战斗都可以选同一种或不同种，关键在于最大熟练度。策略：每场战斗如果 cj > 0，则加到当前最大的武器上；如果 cj < 0，不加到最大武器上（加到其他武器上）？不对，题目是求 *最后* 熟练度最大值。那么只需让某一种武器吃掉所有正的 cj，另一种吃掉负的 cj（如果不一定要选每种武器）。但题目说‘每场战斗只能选择一种武器使用’。所以总共只有 m 个 cj。我们可以把所有的正 cj 都加给初始最大的武器即可。

      **考点：** 贪心、策略
      `,
      tags: ["编程题", "贪心", "策略"],
      template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\n\nbool isPrime(long long x) {\n    if (x < 2) return false;\n    for (long long p = 2; p * p <= x; p++) {\n        if (x % p == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        long long h;\n        cin >> h;\n        int best = -1;\n        for (int k = 0; k <= 60; k++) {\n            long long dealt = (1LL << k) - 1;\n            if (dealt > h) break;\n            long long rem = h - dealt;\n            int attacks = -1;\n            if (rem == 0) attacks = k;\n            else if (isPrime(rem)) attacks = k + 1;\n            if (attacks != -1 && (best == -1 || attacks < best)) best = attacks;\n        }\n        cout << best << \"\\n\";\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2 2
9 9
1 -1`, output: `10` }
      ],
      question: `
# [GESP202409 五级] 小杨的武器

## 题目描述

小杨有 $n$ 种不同的武器，他对第 $i$ 种武器的初始熟练度为 $c_i$。

小杨会依次参加 $m$ 场战斗，每场战斗小杨只能且必须选择一种武器使用，假设小杨使用了第 $i$ 种武器参加了第 $j$ 场战斗，战斗前该武器的熟练度为 $c'_i$，则战斗后小杨对该武器的熟练度会变为 $c'_i + a_j$。需要注意的是，$a_j$ 可能是正数，$0$ 或负数，这意味着小杨参加战斗后对武器的熟练度可能会提高，也可能会不变，还有可能降低。

小杨想请你编写程序帮他计算出如何选择武器才能使得 $m$ 场战斗后，自己对 $n$ 种武器的熟练度的**最大值尽可能大**。

## 输入格式

第一行包含两个正整数 $n,m$，含义如题面所示。 
第二行包含 $n$ 个正整数 $c_1, c_2, \\dots c_n$，代表小杨对武器的初始熟练度。 
第三行包含 $m$ 个正整数 $a_1, a_2, \\dots a_m$，代表每场战斗后武器熟练度的变化值。

## 输出格式

输出一个整数，代表 $m$ 场战斗后小杨对 $n$ 种武器的熟练度的最大值最大是多少。
`,
      score: 25,
      explanation: `**解析：**
      螺旋填充经典题。维护当前坐标和方向，当越界或遇到已填充位置时旋转 90 度。

      **考点：** 模拟、矩阵
      `,
      tags: ["编程题", "模拟", "矩阵"],
      template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<long long> c(n), a(m);\n    for (auto &x : c) cin >> x;\n    for (auto &x : a) cin >> x;\n    long long best = *max_element(c.begin(), c.end());\n    if (n == 1) {\n        for (long long x : a) best += x;\n    } else {\n        // 有替补武器时，负数战斗全部丢给替补，正数全部给最高熟练度的武器\n        for (long long x : a) if (x > 0) best += x;\n    }\n    cout << best << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-09-l5',
    title: '2024年9月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 9,
    session: 3,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下面关于链表和数组的描述，错误的是（ ）。`,
            options: [
                "数组大小固定，链表大小可动态调整。",
                "数组支持随机访问，链表只能顺序访问。",
                "存储相同数目的整数，数组比链表所需的内存多。",
                "数组插入和删除元素效率低，链表插入和删除元素效率高。"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            链表节点除了存储数据，还需要存储指向下一个（或前一个）节点的指针，因此在存储相同数目的数据时，链表占用的内存更多。

            - **A 数组大小固定，链表大小可动态调整。**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。
            - **B 数组支持随机访问，链表只能顺序访问。**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。
            - **C 存储相同数目的整数，数组比链表所需的内存多。**：正确答案。
            - **D 数组插入和删除元素效率低，链表插入和删除元素效率高。**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: `通过（ ）操作，能完成在双向循环链表结点 p 之后插入结点 s 的功能（其中 next 域为直接后继，prev 域为直接前驱）。`,
            options: [
                "p->next->prev = s; s->prev = p; p->next = s; s->next = p->next;",
                "p->next->prev = s; p->next = s; s->prev = p; s->next = p->next;",
                "s->prev = p; s->next = p->next; p->next = s; p->next->prev = s;",
                "s->next = p->next; p->next->prev = s; s->prev = p; p->next = s;"
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            插入节点 s 需要先连接 s 的后继（s->next = p->next）和前驱（s->prev = p），然后修改原后继的前驱（p->next->prev = s）和 p 的后继（p->next = s）。顺序很重要，D 选项是正确顺序。

            - **A p->next->prev = s; s->prev = p; p->next ...**：错误。
            - **B p->next->prev = s; p->next = s; s->prev ...**：错误。
            - **C s->prev = p; s->next = p->next; p->next ...**：错误。
            - **D s->next = p->next; p->next->prev = s; s-...**：正确答案。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: `对下面两个函数，说法错误的是（ ）。`,
            options: ["sumA 体现了迭代的思想。", "SumB 采用的是递归方式。", "SumB 函数比 SumA 的时间效率更高。", "两个函数的实现的功能相同。"],
            answer: 2,
            score: 2,
            explanation: `**答案：C（SumB 函数比 SumA 的时间效率更高。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: `有如下函数fun，则fun(20, 12)的返回值为（ ）。`,
            options: ["20", "12", "4", "2"],
            answer: 2,
            score: 2,
            explanation: `**答案：C（4）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: `下列哪个算法的时间复杂度是 $O(n log n)$（ ）。`,
            options: ["冒泡排序", "选择排序", "归并排序", "插入排序"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            归并排序的最好、最坏、平均时间复杂度均为 $O(n log n)$。

            - **A 冒泡排序**：错误。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **B 选择排序**：错误。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **C 归并排序**：正确答案。
            - **D 插入排序**：错误。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。

            **考点：** 归并排序
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            sourceIntegrity: 'missing-figure',
            integrityNote: "原卷该题的代码/图以图片形式给出，官方 PDF 无文本层，本站无法提取；题干、选项与答案均取自官方原卷，但缺少代码部分，暂不足以独立作答。",
            type: "single",
            question: `下述代码实现素数表的线性筛法，筛选出所有小于等于n的素数，则横线上应填的代码是 ( ) 。
int fun(int a, int b) {
 if (a % b == 0)
 return b;
 else
 return fun(b, a % b);
}
void sieve_Eratosthenes(int n) {
 vector<bool> is_prime(n + 1, true);
 vector<int> primes;
 for (int i = 2; i * i <= n; i++) {
 if (is_prime[i]) {
 primes.push_back(i);
 ________________________________ { // 在此处填入代码
 is_prime[j] = false;
 }
 }
 }
 for (int i = sqrt(n) + 1; i <= n; i++) {
 if (is_prime[i]) {
 primes.push_back(i);
 }
 }
 return primes;
}
vector<int> sieve_linear(int n) {
 vector<bool> is_prime(n + 1, true);

> ⚠️ 原卷此处配有代码或图片。官方 PDF 中该部分为图片，或其文本层与相邻试题混排、无法可靠切分，本站尚未还原。请对照原卷阅读代码。`,
            options: ["for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)", "for (int j = 1; j < primes.size() && i * j <= n; j++)", "for (int j = 2; j < primes.size() && i * primes[j] <= n; j++)", "以上都不对"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)）**

**依据**：官方真题 PDF 第 1 页答案表。本题题干与选项均已按官方原卷回填。

> ⚠️ 原卷该题的代码/图以图片形式给出，官方 PDF 无文本层，本站无法提取；题干、选项与答案均取自官方原卷，但缺少代码部分，暂不足以独立作答。因此本站不对该代码做推测性讲解，请对照原卷阅读代码。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: `在 C++ 中，\`std::stack\` 遵循的原则是（ ）。`,
            options: ["先进先出", "随机访问", "后进先出", "按优先级访问"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            栈（Stack）是后进先出（LIFO）的数据结构。

            - **A 先进先出**：错误。
            - **B 随机访问**：错误。
            - **C 后进先出**：正确答案。
            - **D 按优先级访问**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            sourceIntegrity: 'not-official-question',
            integrityNote: "对照官方真题 PDF，本站此题与原卷第 8 题不一致（原卷该题答案为 A，本站选项与题干均不同）。本题可作为练习使用，但不代表原卷真题内容，待逐题回填原卷后移除此标记。",
            type: "single",
            question: `贪心算法通常解决（ ）问题。`,
            options: ["所有全局最优解", "局部最优选择导致全局最优的问题", "需要枚举所有可能性的问题", "需要通过动态规划解决的问题"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            贪心算法适用于具备贪心选择性质的问题，即局部最优能推导到全局最优。

            - **A 所有全局最优解**：错误。
            - **B 局部最优选择导致全局最优的问题**：正确答案。
            - **C 需要枚举所有可能性的问题**：错误。
            - **D 需要通过动态规划解决的问题**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: `假设快速排序算法的输入是一个长度为 的已排序数组，且该快速排序算法在分治过程总是选择第一个元素
作为基准元素。下面选项（ ）描述的是在这种情况下的快速排序行为。`,
            options: ["快速排序对于此类输入的表现最好，因为数组已经排序。", "快速排序对于此类输入的时间复杂度是 。", "快速排序对于此类输入的时间复杂度是 。", "快速排序无法对此类数组进行排序，因为数组已经排序。"],
            answer: 2,
            score: 2,
            explanation: `**答案：C（快速排序对于此类输入的时间复杂度是 。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            sourceIntegrity: 'not-official-question',
            integrityNote: "对照官方真题 PDF，本站此题与原卷第 10 题不一致（原卷该题答案为 B，本站选项与题干均不同）。本题可作为练习使用，但不代表原卷真题内容，待逐题回填原卷后移除此标记。",
            type: "single",
            question: `在 C++ 中，基类中的私有成员在公有派生类中（ ）。`,
            options: ["变为公有", "变为保护", "不可访问", "保持私有"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            基类的 private 成员在派生类中是不可直接访问的（无论何种继承方式）。

            - **A 变为公有**：错误。
            - **B 变为保护**：错误。
            - **C 不可访问**：正确答案。
            - **D 保持私有**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            sourceIntegrity: 'missing-figure',
            integrityNote: "原卷该题的代码/图以图片形式给出，官方 PDF 无文本层，本站无法提取；题干、选项与答案均取自官方原卷，但缺少代码部分，暂不足以独立作答。",
            type: "single",
            question: `现在有n个人要过河，每只船最多载 2 人，船的承重为 100kg 。下列代码中，数组weight中保存有n个人
的体重（单位为 kg ），已经按从小到大排好序，代码输出过河所需要的船的数目，采用的思想为（ ）。

> ⚠️ 原卷此处配有代码或图片。官方 PDF 中该部分为图片，或其文本层与相邻试题混排、无法可靠切分，本站尚未还原。请对照原卷阅读代码。`,
            options: ["枚举算法", "贪心算法", "迭代算法", "递归算法"],
            answer: 1,
            score: 2,
            explanation: `**答案：B（贪心算法）**

**依据**：官方真题 PDF 第 1 页答案表。本题题干与选项均已按官方原卷回填。

> ⚠️ 原卷该题的代码/图以图片形式给出，官方 PDF 无文本层，本站无法提取；题干、选项与答案均取自官方原卷，但缺少代码部分，暂不足以独立作答。因此本站不对该代码做推测性讲解，请对照原卷阅读代码。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: `关于分治算法，以下哪个说法正确？`,
            options: ["分治算法将问题分成子问题，然后分别解决子问题，最后合并结果。", "归并排序不是分治算法的应用。", "分治算法通常用于解决小规模问题。", "分治算法的时间复杂度总是优于 。"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（分治算法将问题分成子问题，然后分别解决子问题，最后合并结果。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: `下列关于 static 的描述，错误的是（ ）。`,
            options: [
                "静态局部变量只初始化一次。",
                "静态成员变量必须在类外定义和初始化。",
                "静态成员函数可以访问非静态成员函数。",
                "静态全局变量限制了变量在当前文件外的可见性。"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            静态成员函数没有 this 指针，无法直接调用非静态成员函数。

            - **A 分解**：错误。
            - **B 解决**：错误。
            - **C 合并**：正确答案。
            - **D 贪心选择**：错误。

            **考点：** 指针与内存
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: `下列关于双向链表的说法，正确的是（ ）。`,
            options: [
                "可以在常数时间内访问第 i 个元素",
                "插入和删除操作只需要修改一个指针",
                "每个节点存储两个指针空间开销较大",
                "不支持循环遍历"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            双向链表每个节点需要两个指针（prev, next），空间开销确实比单链表大。

            - **A 分解**：错误。
            - **B 解决**：错误。
            - **C 合并**：正确答案。
            - **D 贪心选择**：错误。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: `中国计算机学会（ CCF ）GESP 认证的 5 级考试，编程题通常考察（ ）。`,
            options: ["基础循环和分支", "二维数组和模拟", "简单数论和排序算法", "复杂图论算法"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            根据考纲，5 级主要考察数论基础、各种排序和模拟题。

            - **A 基础循环和分支**：错误。
            - **B 二维数组和模拟**：错误。数组下标从 0 开始，请仔细验证下标范围。
            - **C 简单数论和排序算法**：正确答案。
            - **D 复杂图论算法**：错误。

            **考点：** 排序算法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: `在操作系统中，CPU 时间片轮转调度可以通过环形链表来实现。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            环形链表是实现循环访问的经典数据结构。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: `线性筛法的效率通常高于埃氏筛法。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            线性筛（欧拉筛）确保每个合数只被其最小质因子筛一次，复杂度 $O(N)$。

            **易混概念：** 埃氏筛：标记每个质数的倍数为合数，从 i*i 开始标记避免重复；欧拉筛每个合数只被最小质因子筛一次，效率更高。

            **考点：** 筛法
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: `唯一分解定理表明任何一个大于 1 的整数都可以唯一地分解为素数之和。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            是分解为素数的 *乘积*，而非之和。

            **纠错：** 原命题说法有误。是分解为素数的 *乘积*，而非之和。

            **易混概念：** 埃氏筛：标记每个质数的倍数为合数，从 i*i 开始标记避免重复；欧拉筛每个合数只被最小质因子筛一次，效率更高。

            **考点：** 筛法
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: `贪心算法一定能获得最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            贪心算法只有在问题具备贪心选择性质时才有效，否则不一定是最优。

            **纠错：** 原命题说法有误。贪心算法只有在问题具备贪心选择性质时才有效，否则不一定是最优。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: `快速排序和归并排序的平均时间复杂度均为 $O(n log n)$，且都是稳定排序。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            快速排序是不稳定的。

            **纠错：** 原命题说法有误。快速排序是不稳定的。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: `插入排序的时间复杂度总是比快速排序低。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            通常快排效率更高，除非数组已有序。

            **纠错：** 原命题说法有误。通常快排效率更高，除非数组已有序。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: `引入分治策略往往可以提升算法效率，因为它减少了操作数量并利于并行优化。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            分治的优势。

            **易混概念：** 分治三步骤：分解、解决子问题、合并结果。子问题应与原问题结构相同且规模更小，直到可直接求解。

            **考点：** 分治
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: `二分查找要求被搜索的序列是有序的，否则无法保证正确性。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            有序性是基础。

            **易混概念：** 二分查找前提：序列有序。注意边界 while(left<=right) 还是 while(left<right)，mid 用 left+(right-left)/2 防溢出，以及更新左右边界时是否 ±1。

            **考点：** 二分查找
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: `在 C++ 语言中，递归的实现方式通常会占用更多的栈空间，可能导致栈溢出。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            递归的风险。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: `对于已经定义好的标准数学函数 sin(x)，y = sin(sin(x)) 是递归调用。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            这只是普通嵌套调用，并非递归（函数没有调用自身）。

            **纠错：** 原命题说法有误。这只是普通嵌套调用，并非递归（函数没有调用自身）。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
