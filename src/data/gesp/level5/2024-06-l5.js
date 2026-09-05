// 2024年6月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4 5 5
00000
01111
00011
00011`, output: `6` }
      ],
      question: `
# [GESP202406 五级] 黑白格

## 题目描述

小杨有一个 $n$ 行 $m$ 列的网格图，其中每个格子要么是白色，要么是黑色。

小杨想知道至少包含 $k$ 个黑色格子的最小子矩形包含了多少个格子。

## 输入格式

第一行包含三个正整数 $n,m,k$，含义如题面所示。

之后 $n$ 行，每行一个长度为 $m$ 的 $\\texttt{01}$ 串，代表网格图第 $i$ 行格子的颜色，如果为 $\\texttt{0}$，则对应格子为白色，否则为黑色。

## 输出格式

输出一个整数，代表至少包含 $k$ 个黑色格子的最小子矩形包含格子的数量，如果不存在则输出 $0$。
`,
      score: 25,
      explanation: `**解析：**
      由于 n, m 较小（最大 100），可以枚举子矩形的上下边界 (r1, r2)，然后利用双指针或暴力枚举左右边界 (c1, c2)。利用二维前缀和快速计算子矩形内 1 的个数。

      **考点：** 二维前缀和、双指针
      `,
      tags: ["编程题", "二维前缀和", "双指针"],
      template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, k;\n    cin >> n >> m >> k;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, m, k; cin >> n >> m >> k;\n    vector<vector<int>> s(n+1, vector<int>(m+1, 0));\n    for (int i = 1; i <= n; i++) {\n        string row; cin >> row;\n        for (int j = 1; j <= m; j++) {\n            s[i][j] = s[i-1][j]+s[i][j-1]-s[i-1][j-1]+(row[j-1]-'0');\n        }\n    }\n    int min_area = 1e9;\n    for (int r1 = 1; r1 <= n; r1++) {\n        for (int r2 = r1; r2 <= n; r2++) {\n            for (int c1 = 1; c1 <= m; c1++) {\n                for (int c2 = c1; c2 <= m; c2++) {\n                    int count = s[r2][c2]-s[r1-1][c2]-s[r2][c1-1]+s[r1-1][c1-1];\n                    if (count >= k) min_area = min(min_area, (r2-r1+1) * (c2-c1+1));\n                }\n            }\n        }\n    }\n    if (min_area == 1e9) cout << 0 << endl;\n    else cout << min_area << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
7
12
30`, output: `0
1
0` }
      ],
      question: `
# [GESP202406 五级] 小杨的幸运数字

## 题目描述

小杨认为他的幸运数字应该恰好有两种不同的质因子，例如，$12=2\\times 2\\times 3$ 的质因子有 $2,3$，恰好为两种不同的质因子，因此 $12$ 是幸运数字，而 $30=2\\times3\\times5$ 的质因子有 $2,3,5$，不符合要求，不为幸运数字。

小杨现在有 $n$ 个正整数，他想知道每个正整数是否是他的幸运数字。

## 输入格式

第一行包含一个正整数 $n$，代表正整数个数。

之后 $n$ 行，每行一个正整数。

## 输出格式

输出 $n$ 行，对于每个正整数，如果是幸运数字，输出 $1$，否则输出 $0$。
`,
      score: 25,
      explanation: `**解析：**
      遍历 [L, R] 之间的每一个数字，判断其是否能被 7 整除或包含数字 7。由于范围较小，直接模拟即可。

      **考点：** 模拟
      `,
      tags: ["编程题", "模拟"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int L, R;\n    cin >> L >> R;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\n\nint distinctPrimeFactors(long long x) {\n    int count = 0;\n    for (long long p = 2; p * p <= x; p++) {\n        if (x % p == 0) {\n            count++;\n            while (x % p == 0) x /= p;\n        }\n    }\n    if (x > 1) count++;\n    return count;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        long long x;\n        cin >> x;\n        cout << (distinctPrimeFactors(x) == 2 ? 1 : 0) << \"\\n\";\n    }\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-06-l5',
    title: '2024年6月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 6,
    session: 2,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下面 C++ 代码用于求斐波那契数列，该数列第 1、2 项为 1，以后各项均是前两项之和。函数 fibo() 属于 ( ) 。`,
            options: ["枚举算法", "贪心算法", "迭代算法", "递归算法"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            代码中使用循环（for 循环）不断根据前两项求当前项，这种方式属于迭代算法。

            - **A 枚举算法**：不是本题答案。
            - **B 贪心算法**：不是本题答案。
            - **C 迭代算法**：正确答案。
            - **D 递归算法**：不是本题答案。
            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `下面 C++ 代码用于将输入金额换成最少币种组合方案，其实现算法是 ( ) 。`,
            options: ["分治算法", "贪心算法", "动态规划", "枚举算法"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            换零钱的最少币种问题，在面额符合特定规律时，通常使用贪心算法（从大面额开始匹配）。

            - **A 分治算法**：错误。
            - **B 贪心算法**：正确答案。
            - **C 动态规划**：错误。
            - **D 枚举算法**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: `小杨采用如下双链表结构保存他喜欢的歌曲列表：

\`\`\`cpp
struct dl_node {
    string song;
    dl_node* next;
    dl_node* prev;
};
\`\`\`

小杨想在头指针为 \`head\` 的双链表中查找他喜欢的某首歌曲，采用如下查询函数，该操作的时间复杂度为（ ）。

\`\`\`cpp
dl_node* search(dl_node* head, string my_song) {
    dl_node* temp = head;
    while (temp != nullptr) {
        if (temp->song == my_song)
            return temp;
        temp = temp->next;
    }
    return nullptr;
}
\`\`\``,
            options: ["$O(1)$", "$O(n)$", "$O(\\log n)$", "$O(n^2)$"],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1621071558082592.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：B（$O(n)$）**

**推导过程：**

1. \`temp\` 从头结点 \`head\` 开始。
2. 每次循环只检查当前歌曲并沿 \`next\` 前进一个结点，单次循环是常数时间。
3. 最坏情况下，目标歌曲位于链尾或不存在，需要访问全部 $n$ 个结点。
4. 因此总操作次数与结点数成正比，最坏时间复杂度为 $O(n)$。

**选项辨析：** $O(1)$ 只适用于目标已知或直接访问的情况；链表没有支持二分查找的随机访问能力，因此不是 $O(\\log n)$；代码只有一重遍历，也不是 $O(n^2)$。

**最小验证：** 若链表依次有 4 首歌且目标不存在，循环恰好检查 4 个结点，规模翻倍时检查次数也约翻倍。

**考点：** 双向链表、顺序查找、时间复杂度。`,
            tags: ["客观题", "单选题", "GESP5级", "双向链表", "顺序查找", "时间复杂度"]
        },
        {
            id: 4,
            type: "single",
            question: `下列哪个时间复杂度最低（ ）。`,
            options: ["$O(n log n)$", "$O(N^2)$", "$O(log n)$", "$O(N)$"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            常见复杂度排序：$O(1)$ < $O(log n)$ < $O(N)$ < $O(n log n)$ < $O(N^2)$。

            - **A $O(n log n)$**：错误。
            - **B $O(N^2)$**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **C $O(log n)$**：正确答案。
            - **D $O(N)$**：错误。

            **考点：** 排序算法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: `关于 C++ 的类和继承，下列说法正确的是（ ）。`,
            options: ["私有成员可以被派生类访问", "公有继承时，基类的公有成员在派生类中变为私有", "基类的析构函数通常应声明为虚函数", "一个派生类只能继承一个基类"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            为了确保通过基类指针删除派生类对象时能正确调用析构函数，基类的析构函数应声明为 virtual。

            - **A 私有成员可以被派生类访问**：错误。
            - **B 公有继承时，基类的公有成员在派生类中变为私有**：错误。
            - **C 基类的析构函数通常应声明为虚函数**：正确答案。
            - **D 一个派生类只能继承一个基类**：错误。

            **考点：** 指针与内存
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: `欧几里得算法还可以写成如下形式 :
下面有关说法，错误的是（ ）。`,
            options: ["本题的gcd()实现为递归方式。", "本题的gcd()代码量少，更容易理解其辗转相除的思想。", "当 较大时，本题的gcd()实现会多次调用自身，需要较多额外的辅助空间。", "当 较大时，相比上题中的gcd()的实现，本题的gcd()执行效率更高。"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（当 较大时，相比上题中的gcd()的实现，本题的gcd()执行效率更高。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: `在 C++ 中，\`std::queue\` 的入队操作是（ ）。`,
            options: ["push", "pop", "front", "back"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            queue 的入队函数是 push，出队是 pop。

            - **A push**：正确答案。
            - **B pop**：错误。
            - **C front**：错误。
            - **D back**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: `上题的线性筛代码如下，其时间复杂度是（　）。

\`\`\`cpp
vector<int> linear_sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    vector<int> primes;
    is_prime[0] = is_prime[1] = 0;
    for (int i = 2; i <= n; ++i) {
        if (is_prime[i]) {
            primes.push_back(i);
        }
        for (int j = 0;
             j < primes.size() && i * primes[j] <= n;
             j++) {
            is_prime[i * primes[j]] = 0;
            if (i % primes[j] == 0)
                break;
        }
    }
    return primes;
}
\`\`\``,
            options: ["$O(n^2)$", "$O(n\\log n)$", "$O(n\\log\\log n)$", "$O(n)$"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（O(n)）**

这段程序是线性筛（欧拉筛）。内层循环看似嵌套在外层循环中，但不能简单地把两层循环相乘为 $O(n^2)$。

关键在于 \`if (i % primes[j] == 0) break;\`：每个合数只会被“它的最小质因子”筛掉一次。把所有 i 的内层操作合起来看，总操作次数与 n 同阶，因此整体时间复杂度为 $O(n)$。

**易错点**：看到两层循环就判断为 $O(n^2)$。复杂度要看循环体实际执行总次数，而不是只看代码缩进层数。

**考点**：线性筛、均摊分析、时间复杂度。`,
            tags: ["数论", "线性筛", "复杂度"],
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [3, 4],
            sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27'
        },
        {
            id: 9,
            type: "single",
            question: `为了正确实现快速排序，下面横线上的代码应为（　）。

\`\`\`cpp
void qsort(vector<int>& arr, int left, int right) {
    int i, j, mid;
    int pivot;
    i = left;
    j = right;
    mid = (left + right) / 2;  // 计算中间元素的索引
    pivot = arr[mid];          // 选择中间元素作为基准值
    do {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
            swap(arr[i], arr[j]);  // 交换两个元素
            i++; j--;
        }
    } ________________________________;  // 在此处填入代码
    if (left < j) qsort(arr, left, j);   // 对左子数组进行快速排序
    if (i < right) qsort(arr, i, right); // 对右子数组进行快速排序
}
\`\`\``,
            options: ["while (i <= mid)", "while (i < mid)", "while (i < j)", "while (i <= j)"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（while (i <= j)）**

横线在 \`do { ... } ____;\` 的位置，要填的是 **do-while 循环的结束条件**。

这一轮划分的目标是：让 i 和 j 从两端相向扫描，把小于基准的换到左边、大于基准的换到右边，**直到两个指针交错为止**。所以只要 \`i <= j\`（尚未交错）就应继续下一轮扫描，即 \`while (i <= j)\`。

循环结束时必然有 \`i > j\`，数组被分成 \`[left, j]\` 和 \`[i, right]\` 两段，正好对应后面两行递归调用。

**逐项分析**：
- **A \`while (i <= mid)\` / B \`while (i < mid)\`**：\`mid\` 只是最初用来取基准值的下标，划分过程中并不更新它，拿它当循环条件既不能保证扫描完成，还可能死循环。
- **C \`while (i < j)\`**：当 \`i == j\` 时循环就退出了，此时该位置的元素还没和基准比较过，划分不完整，后续递归的边界也会出错。
- **D \`while (i <= j)\`**：正确，扫描到两指针交错才停止。

**易错点**：C 和 D 只差一个等号。快排划分必须让 \`i == j\` 这一格也参与比较，否则会漏掉一个元素。

**考点**：快速排序划分阶段的指针交错条件`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
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
            id: 11,
            type: "single",
            question: `唯一分解定理表明任何一个大于 1 的整数都可以唯一地表示为一系列（ ）的乘积。`,
            options: ["合数", "偶数", "质数", "奇数"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            质因数分解唯一性。

            - **A 合数**：错误。
            - **B 偶数**：错误。
            - **C 质数**：正确答案。
            - **D 奇数**：错误。

            **考点：** 数论
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: `快速排序的基础操作是（ ）。`,
            options: ["分区", "合并", "筛选", "搜索"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            快速排序的核心是通过 Partition 操作进行分区。

            - **A 分区**：正确答案。
            - **B 合并**：错误。
            - **C 筛选**：错误。
            - **D 搜索**：错误。

            **考点：** 快速排序
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: `在 C++ 中，下列哪个关键字用于声明命名空间（ ）。`,
            options: ["class", "struct", "namespace", "using"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            namespace 用于定义命名空间，防止名称冲突。

            - **A class**：错误。
            - **B struct**：错误。
            - **C namespace**：正确答案。
            - **D using**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: `下列哪个操作属于线性表的基本操作（ ）。`,
            options: ["插入", "排序", "查找", "以上都是"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            线性表的基本操作涵盖增删改查及排序等。

            - **A 插入**：错误。
            - **B 排序**：错误。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **C 查找**：错误。
            - **D 以上都是**：正确答案。

            **考点：** 排序算法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: `给定如下函数（函数功能同上题，增加输出打印）：

\`\`\`cpp
int fun(int n) {
    cout << n << " ";
    if (n == 1) return 1;
    if (n == 2) return 2;
    return fun(n - 2) - fun(n - 1);
}
\`\`\`

则当 \`n = 4\` 时，屏幕上输出序列为（ ）。`,
            options: ["4 3 2 1", "1 2 3 4", "4 2 3 1 2", "4 2 3 2 1"],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C（4 2 3 1 2）**

**推导过程：**

按本题官方答案采用的从左到右求值顺序展开：

1. 调用 \`fun(4)\`，先输出 \`4\`；
2. 求 \`fun(2)\`，输出 \`2\` 后直接返回；
3. 再求 \`fun(3)\`，先输出 \`3\`；
4. \`fun(3)\` 内依次调用 \`fun(1)\`、\`fun(2)\`，分别输出 \`1\`、\`2\`。

所以输出顺序为 \`4 2 3 1 2\`。A 把调用顺序误当成简单倒序；B 不符合递归展开；D 把 \`fun(3)\` 的两个子调用顺序或节点重复关系判断错了。

**易错点：** 输出发生在函数入口，而不是函数返回时；同一个参数可能在不同递归分支中多次出现。严格按 C++ 语言标准，减号两侧操作数的求值先后并未保证，本题答案采用官方试卷预期的左侧调用先求值。

**考点：** 递归调用顺序、递归树、表达式求值。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: `如果将双向链表的最后一个结点的下一项指针指向第一个结点，第一个结点的前一项指针指向最后一个结点，则该双向链表构成循环链表。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            双向循环链表的定义。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: `数组和链表都是线性表，链表的优点是插入删除不需要移动元素，并且能随机查找。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            链表不能随机查找（只能顺序查找）。

            **纠错：** 原命题说法有误。链表不能随机查找（只能顺序查找）。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: `链表的存储空间物理上可以连续，也可以不连续。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            链表通过指针逻辑相连，物理存储位置无要求。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: `找出自然数 n 以内的所有质数，常用算法有埃拉托斯特尼（埃氏）筛法和线性筛法，其中埃氏筛法效率更高。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            线性筛法（欧拉筛）效率更高，时间复杂度为 $O(N)$。

            **纠错：** 原命题说法有误。线性筛法（欧拉筛）效率更高，时间复杂度为 $O(N)$。

            **易混概念：** 常见排序复杂度：快排/归并/堆排 O(n log n)，冒泡/选择/插入 O(n²)。稳定：冒泡、插入、归并；不稳定：快排、选择、堆排。

            **考点：** 筛法
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: `唯一分解定理表明任何一个大于 1 的整数都可以唯一地表示为一系列质数的乘积，即质因数分解是唯一的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            算术基本定理的内容。

            **易混概念：** gcd(a,b)=gcd(b, a%b)，辗转相除法；质因数分解用试除法到 sqrt(n)。注意 1 既不是质数也不是合数。

            **考点：** 数论
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: `贪心算法通过每一步选择局部最优解来获得全局最优解，但并不一定能找到最优解。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            贪心算法的特性说明。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: `归并排序和快速排序都采用递归实现，也都是不稳定排序。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            归并排序是稳定的排序算法，快速排序是不稳定的。

            **纠错：** 原命题说法有误。归并排序是稳定的排序算法，快速排序是不稳定的。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: `插入排序有时比快速排序时间复杂度更低。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            在数组几乎有序时，插入排序为 $O(N)$，优于快排。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: `在进行全国人口普查时，将其分解为对每个省市县乡来进行普查和统计。这是典型的分治策略。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            大问题拆分为小问题分别解决再汇总，符合分治思想。

            **易混概念：** 分治三步骤：分解、解决子问题、合并结果。子问题应与原问题结构相同且规模更小，直到可直接求解。

            **考点：** 分治
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: `在 C++ 代码中，执行 \`delete ptr;\` 后，ptr 对应的数据被销毁，再次使用该指针会导致未定义行为。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            悬挂指针（Dangling Pointer）问题。

            **易混概念：** 指针存储地址；解引用空指针或野指针是未定义行为；delete 后应将指针置 nullptr 避免悬垂指针。

            **考点：** 指针与内存
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
