// 2024年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `128`, output: `3` }
      ],
      question: `
# [GESP202412 五级] 奇妙数字

## 题目描述

小杨认为一个数字 $x$ 是奇妙数字当且仅当 $x=p^a$，其中 $p$ 为任意质数且 $a$ 为正整数。例如，$8=2^3$，所以 $8$ 是奇妙的，而 $6$ 不是。

对于一个正整数 $n$，小杨想要构建一个包含 $m$ 个奇妙数字的集合 $\\{x_1,x_2,\\cdots,x_m\\}$，使其满足以下条件：
- 集合中不包含相同的数字。
- $x_1\\times x_2\\times \\cdots\\times x_m$ 是 $n$ 的因子（即 $x_1,x_2,\\cdots,x_m$ 这 $m$ 个数字的乘积是 $n$ 的因子）。

小杨希望集合包含的奇妙数字尽可能多，请你帮他计算出满足条件的集合最多包含多少个奇妙数字。

## 输入格式

第一行包含一个正整数 $n$，含义如题面所示。

## 输出格式

输出一个正整数，代表满足条件的集合最多包含的奇妙数字个数。
`,
      score: 25,
      explanation: `**解析：**
      由于 n = p1^e1 * p2^e2 * ...，每个质因子 pi 及其幂都是奇妙数字。为了让奇妙数字尽可能多，我们应把每一个质因子的幂分解成尽可能多的不同幂次的组合（例如 p^6 可以分解为 p^1, p^2, p^3，因为 1+2+3=6）。最终答案是每个质因子分解出的不同幂次数量之和。

      **考点：** 数论、质因数分解、贪心
      `,
      tags: ["编程题", "数论", "质因数分解", "贪心"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    int total = 0;\n    for (long long i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            int e = 0;\n            while (n % i == 0) { e++; n /= i; }\n            // 将 e 分解为 1, 2, 3... 尽量多的项\n            int count = 0, k = 1;\n            while (e >= k) { e -= k; k++; count++; }\n            total += count;\n        }\n    }\n    if (n > 1) total += 1;\n    cout << total << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4 4
1 1
2 1
3 1
3 2`, output: `1` }
      ],
      question: `
# [GESP202412 五级] 武器强化

## 题目描述

小杨有 $n$ 种武器和 $m$ 种强化材料。第 $i$ 种强化材料会适配第 $p_i$ 种武器，小杨可以花费 $c_i$ 金币将该材料对应的适配武器修改为任意武器。

小杨最喜欢第 $1$ 种武器，因此他希望适配该武器的强化材料种类数**严格大于**其他的武器，请你帮小杨计算为了满足该条件最少需要花费多少金币。

## 输入格式

第一行包含两个正整数 $n,m$，含义如题面所示。

之后 $m$ 行，每行包含两个正整数 $p_i,c_i$，代表第 $i	$ 种强化材料的适配武器和修改花费。

## 输出格式

输出一个整数，代表能够使适配第 $1$ 种武器的强化材料种类数**严格大于**其他的武器最少需要花费的金币。
`,
      score: 25,
      explanation: `**解析：**
      经典的冰雹猜想（Collatz Conjecture）。按照规则直接模拟计算并维护最大值即可。

      **考点：** 模拟
      `,
      tags: ["编程题", "模拟"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<long long>> byWeapon(n + 1);\n    int cnt1 = 0;\n    for (int i = 0; i < m; i++) {\n        int p;\n        long long cost;\n        cin >> p >> cost;\n        if (p == 1) cnt1++;\n        else byWeapon[p].push_back(cost);\n    }\n    for (auto &v : byWeapon) sort(v.begin(), v.end());\n    long long best = -1;\n    // 枚举其他武器允许的最大材料数 cap，超出的强制移给 1 号武器\n    for (int cap = 0; cap <= m; cap++) {\n        long long cost = 0;\n        int moved = 0;\n        vector<long long> leftovers;\n        for (int w = 2; w <= n; w++) {\n            const auto &v = byWeapon[w];\n            int excess = (int)v.size() - cap;\n            for (int i = 0; i < (int)v.size(); i++) {\n                if (i < excess) { cost += v[i]; moved++; }\n                else leftovers.push_back(v[i]);\n            }\n        }\n        int final1 = cnt1 + moved;\n        if (final1 <= cap) {\n            int extra = cap + 1 - final1;\n            if (extra > (int)leftovers.size()) continue;\n            sort(leftovers.begin(), leftovers.end());\n            for (int i = 0; i < extra; i++) cost += leftovers[i];\n            final1 += extra;\n        }\n        if (best == -1 || cost < best) best = cost;\n    }\n    cout << best << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-12-l5',
    title: '2024年12月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 12,
    session: 4,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下面关于链表和数组的描述，错误的是（ ）。`,
            options: [
                "当数据数量不确定时，为了应对各种可能的情况，需要申请一个较大的数组，可能浪费空间；此时用链表比较合适，大小可动态调整。",
                "在链表中访问节点的效率较低，时间复杂度为 $O(N)$。",
                "链表插入和删除元素效率较低，时间复杂度为 $O(N)$。",
                "链表的节点在内存中是分散存储的，通过指针连在一起。"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            链表在已知节点位置的情况下，插入和删除效率很高（$O(1)$），不需要移动元素。C 选项说效率低是错误的。

            - **A 当数据数量不确定时，为了应对各种可能的情况，需要申请一个较大的数组，可能浪费空间...**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。
            - **B 在链表中访问节点的效率较低，时间复杂度为 $O(N)$。**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。
            - **C 链表插入和删除元素效率较低，时间复杂度为 $O(N)$。**：正确答案。
            - **D 链表的节点在内存中是分散存储的，通过指针连在一起。**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: `在循环单链表中，节点的 next 指针指向下一个节点，最后一个节点的 next 指针指向（ ）。`,
            options: ["当前节点", "nullptr", "第一个节点", "上一个节点"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            循环链表首尾相连。

            - **A 当前节点**：错误。
            - **B nullptr**：错误。
            - **C 第一个节点**：正确答案。
            - **D 上一个节点**：错误。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: `为了方便链表的增删操作，一些算法生成一个虚拟头节点，方便统一删除头节点和其他节点。下面代码实现了删除链表中值为 val 的节点，横线上应填的最佳代码是（　）。

\`\`\`cpp
struct LinkedNode {
    int val;
    LinkedNode* next;
    LinkedNode(int val):val(val), next(nullptr){}
};
void removeElements(LinkedNode* head, int val) {
    if (head == nullptr) {
        return;
    }
    LinkedNode* cur;
    LinkedNode* dummyHead = new LinkedNode(0); // 虚拟头节点
    ________________________________     // 在此处填入代码
    while(cur ->next != nullptr) {
        if(cur->next->val == val) {
            LinkedNode* tmp = cur->next;
\`\`\`

> ⚠️ 原卷该代码在官方 PDF 中跨栏排版，末尾若干行未能完整提取，其余部分与原卷一致。`,
            options: ["dummyHead->next = head; cur = dummyHead;", "dummyHead->next = head->next; cur = dummyHead;", "dummyHead->next = head; cur = dummyHead->next;", "dummyHead->next = head->next; cur = dummyHead->next;"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（dummyHead->next = head; cur = dummyHead;）**

虚拟头节点的作用是让「删除头节点」和「删除中间节点」用同一套代码处理。要做到这一点需要两件事：

1. **把虚拟头接到真实链表前面**：\`dummyHead->next = head\`，这样原来的头节点就变成了「某个节点的 next」，不再特殊。
2. **让遍历指针从虚拟头开始**：\`cur = dummyHead\`。循环里判断的是 \`cur->next->val == val\` 并删除 \`cur->next\`，所以 cur 必须停在待删节点的**前一个**位置。若 \`cur = dummyHead->next\`（即真实头节点），就永远无法删除头节点本身。

**逐项分析**：
- **A**：正确，两个条件都满足。
- **B**：\`dummyHead->next = head->next\` 直接跳过了原头节点，头节点被漏掉。
- **C**：接链正确，但 cur 从真实头开始，删不掉头节点。
- **D**：两处都错。

**考点**：虚拟头节点（dummy head）的作用与遍历指针的起点`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: `对下面两个函数，说法错误的是（ ）。`,
            options: ["两个函数的实现的功能相同。", "fibA 采用递推方式。", "fibB 采用的是递归方式。", "fibA 时间复杂度为 ， fibB 的时间复杂度为 。"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（fibA 时间复杂度为 ， fibB 的时间复杂度为 。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: `下列关于栈的描述，正确的是（ ）。`,
            options: ["先进先出", "支持下标访问", "后进先出", "动态增加长度"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            栈（Stack）是 LIFO 数据结构。

            - **A 先进先出**：错误。
            - **B 支持下标访问**：错误。数组下标从 0 开始，请仔细验证下标范围。
            - **C 后进先出**：正确答案。
            - **D 动态增加长度**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: `唯一分解定理表明，每个大于 1 的自然数可以唯一地写成若干个质数的乘积。下面函数将自然数 n 的所有质因数找出来，横线上能填写的最佳代码是（　）。

\`\`\`cpp
#include <vector>
vector<int> get_prime_factors(int n) {
    vector<int> factors;
    if (n <= 1) {
        cout << " 输入的数必须是大于 1 的正整数 " << endl;
        return;
    }
    while (n % 2 == 0) {
        factors.push_back(2);
        n /= 2;
    }
    ________________________________    {    // 在此处填入代码
        while (n % i == 0) {
            factors.push_back(i);
            n /= i;
        }
    }
    if (n > 2) {
        factors.push_back(n);
    }
    return factors;
}
\`\`\``,
            options: ["for (int i = 3; i <= n; i ++)", "for (int i = 3; i * i <= n; i ++)", "for (int i = 3; i <= n; i += 2)", "for (int i = 3; i * i <= n; i += 2)"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（for (int i = 3; i * i <= n; i += 2)）**

函数已经在前面把所有因子 2 除尽，所以进入循环时 n 一定是奇数，接下来只需检查奇数因子。两个优化各自对应选项中的一半：

- **上界用 \`i * i <= n\`**：若 n 还有大于 \`√n\` 的质因子，它只可能剩一个，循环结束后由 \`if (n > 2) factors.push_back(n)\` 兜底。写成 \`i <= n\` 虽然结果也对，但会白跑大量无用循环。
- **步长用 \`i += 2\`**：偶数已在前面处理干净，再检查偶数毫无意义。

两个优化都用上的只有 D。

**逐项分析**：
- **A \`i <= n\`**：结果正确但最慢，两个优化都没用。
- **B \`i * i <= n; i++\`**：用了平方上界，但仍在检查偶数。
- **C \`i <= n; i += 2\`**：跳过了偶数，但上界没优化。
- **D**：正确，兼顾两点。

**考点**：质因数分解的循环上界与步长优化`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: `下述代码实现素数表的埃拉托色尼（埃氏）筛法，筛选出所有小于等于 n 的素数。下面说法，正确的是（　）。

\`\`\`cpp
vector<int> sieve_Eratosthenes(int n) {
    vector<bool> is_prime(n +1, true);
    vector<int> primes;
    for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
            for (int j = i * i; j <= n; j += i) {
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
\`\`\`

> ⚠️ 本题部分选项中的数学式（如复杂度表达式）在原卷中为公式图片，官方 PDF 文本层未包含，本站选项文字因此缺少该部分符号。答案与解析依据官方答案表。`,
            options: ["代码的时间复杂度是 。", "在标记非素数时，代码从 开始，可以减少重复标记。", "代码会输出所有小于等于 的奇数。", "调用函数sieve_Eratosthenes(10)，函数返回值的数组中包含的元素有：2, 3, 5, 7, 9。"],
            answer: 1,
            score: 2,
            explanation: `**答案：B（在标记非素数时，代码从 i * i 开始，可以减少重复标记）**

看内层循环的起点：\`for (int j = i * i; j <= n; j += i)\`。

对质数 i，比 \`i * i\` 小的合数倍数（\`2i, 3i, …, (i-1)i\`）都含有一个比 i 更小的质因子，在处理那个更小的质数时**已经被标记过了**。所以从 \`i * i\` 起标记不会漏，且避免了重复标记——这正是埃氏筛的标准优化。

**考点**：埃氏筛为什么从 i² 开始标记`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: `下述代码实现素数表的线性筛法，筛选出所有小于等于 n 的素数。下面说法正确的是（　）。

\`\`\`cpp
vector<int> sieve_linear(int n) {
    vector<bool> is_prime(n +1, true);
    vector<int> primes;
    for (int i = 2; i <= n/2; i++) {
        if (is_prime[i])
            primes.push_back(i);
        for (int j = 0; j < primes.size() && i * primes[j] <= n; j++) {
            is_prime[ i * primes[j] ] = 0;
            if (i % primes[j] == 0)
                break;
        }
    }
    for (int i = n/2 +1; i <= n; i++) {
        if (is_prime[i])
            primes.push_back(i);
    }
    return primes;
\`\`\`

> ⚠️ 原卷该代码在官方 PDF 中跨栏排版，末尾若干行未能完整提取，其余部分与原卷一致。

> ⚠️ 本题部分选项中的数学式（如复杂度表达式）在原卷中为公式图片，官方 PDF 文本层未包含，本站选项文字因此缺少该部分符号。答案与解析依据官方答案表。`,
            options: ["线性筛的时间复杂度是 。", "每个合数会被其所有的质因子标记一次。", "线性筛和埃拉托色尼筛的实现思路完全相同。", "以上都不对"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（线性筛的时间复杂度是 O(n)）**

线性筛之所以是 **O(n)**，关键在内层的 break：

\`\`\`cpp
is_prime[ i * primes[j] ] = 0;
if (i % primes[j] == 0)
    break;
\`\`\`

当 \`i % primes[j] == 0\` 时，\`primes[j]\` 就是 i 的最小质因子。此时立刻停止，保证**每个合数只会被它的最小质因子筛掉恰好一次**；由于每个合数只被处理一次，总操作数与 n 成正比，故为 O(n)。

**逐项分析**：
- **A**：正确，线性筛的时间复杂度为 O(n)。
- **B 每个合数会被其所有的质因子标记一次**：错误。那是**埃氏筛**的行为，正是线性筛用 break 消除掉的重复。
- **C 两者实现思路完全相同**：错误。埃氏筛从质数出发标记其倍数，线性筛从每个数出发乘以不超过其最小质因子的质数，思路不同。
- **D 以上都不对**：A 已正确。

**考点**：线性筛的时间复杂度及其与埃氏筛的区别`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: `考虑以下 C++ 代码实现的快速排序算法：

\`\`\`cpp
int partition(vector<int>& arr, int left, int right) {
    int pivot = arr[right]; // 基准值
    int i = left - 1;

    for (int j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[right]);
    return i + 1;
}

// 快速排序
void quickSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int pi = partition(arr, left, right);
        quickSort(arr, left, pi - 1);
        quickSort(arr, pi + 1, right);
    }
}
\`\`\`

以下关于快速排序的说法，正确的是（ ）。`,
            options: [
                "快速排序通过递归对子问题进行求解。",
                "快速排序的最坏时间复杂度是 $O(n \\log n)$。",
                "快速排序是一个稳定的排序算法。",
                "在最优情况下，快速排序的时间复杂度是 $O(n)$。",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5],
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1733577765027904.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：A（快速排序通过递归对子问题进行求解。）**

**推导过程：**

1. \`partition\` 以区间最右元素为基准，把小于基准的元素移到左侧，并返回基准的最终位置 \`pi\`。
2. \`quickSort\` 随后递归处理 \`[left, pi - 1]\` 和 \`[pi + 1, right]\` 两个子区间，所以 A 正确。
3. 若每次基准都落在区间一端，递归规模依次为 $n-1,n-2,\\ldots,1$，总比较次数为 $O(n^2)$，因此 B 错误。
4. 分区中的交换可能改变相等元素的先后次序，快速排序通常不稳定，因此 C 错误。
5. 划分最均衡时递归深度为 $O(\\log n)$，每层处理 $O(n)$ 个元素，最优时间复杂度为 $O(n\\log n)$，因此 D 错误。

**最小验证：** 对已经升序的数组使用最右元素作基准，每轮只能确定一个元素，正好出现最坏的 $O(n^2)$ 情况。

**考点：** 快速排序、分治、递归、时间复杂度、排序稳定性。`,
            tags: ["客观题", "单选题", "GESP5级", "快速排序", "分治", "递归", "时间复杂度", "排序稳定性"]
        },
        {
            id: 10,
            type: "single",
            question: `唯一分解定理描述的是（ ）。`,
            options: [
                "一个合数可以分解为多个整数的乘积",
                "每个大于1的自然数均可唯一地写成质数的幂的乘积",
                "任意正整数都可以被分解",
                "一个数可以被分解成多个因子之和"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            算术基本定理的精确表述。

            - **A 可以直接**：错误。
            - **B 可以通过友元函数**：正确答案。
            - **C 不能**：错误。
            - **D 只有在多重继承时可以**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: `给定一个长度为 的有序数组nums，其中所有元素都是唯一的。下面的函数返回数组中元素target的索
引。
}22
int partition(vector<int>& arr, int left, int right) {
 int pivot = arr[right]; // 基准值
 int i = left - 1;
 for (int j = left; j < right; j++) {
 if (arr[j] < pivot) {
 i++;
 swap(arr[i], arr[j]);
 }
 }
 swap(arr[i + 1], arr[right]);
 return i + 1;
}
// 快速排序
void quickSort(vector<int>& arr, int left, int right) {
 if (left < right) {
 int pi = partition(arr, left, right);
 quickSort(arr, left, pi - 1);
 quickSort(arr, pi + 1, right);
 }
}
关于上述函数，描述不正确的是（ ）。`,
            options: ["函数采用二分查找，每次计算搜索当前搜索区间的中点，然后根据中点的元素值排除一半搜索区间。", "函数采用递归求解，每次问题的规模减小一半。", "递归的终止条件是中间元素的值等于target，若数组中不包含该元素，递归不会终止。", "算法的复杂度为 ."],
            answer: 2,
            score: 2,
            explanation: `**答案：C（递归的终止条件是中间元素的值等于target，若数组中不包含该元素，递归不会终止。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: `在 C++ 中，\`std::vector\` 的内存分配方式是（ ）。`,
            options: ["静态分配", "按需动态分配，通常预留额外空间", "固定大小", "按链表方式存储"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            vector 使用动态数组并在容量不足时自动扩容。

            - **A 静态分配**：错误。
            - **B 按需动态分配，通常预留额外空间**：正确答案。
            - **C 固定大小**：错误。
            - **D 按链表方式存储**：错误。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。

            **考点：** 指针与内存
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: `假设有多个孩子，数组g保存所有孩子的胃口值。有多块饼干，数组s保存所有饼干的尺寸。小杨给孩子
们发饼干，每个孩子最多只能给一块饼干。饼干的尺寸大于等于孩子的胃口时，孩子才能得到满足。小杨的目标是
尽可能满足越多数量的孩子，因此打算采用贪心算法来找出能满足的孩子的数目，则横线上应填写的代码为（ ）。

\`\`\`cpp
int cooki4children(vector<int>& g, vector<int>& s) {
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());

    int index = s.size() - 1; // 饼干数组下标
    int result = 0;
    for (int i = g.size() - 1; i >= 0; i--) {
        if (index >= 0 && s[index] >= g[i]) {
            ________________________________ // 在此处填入代码
        }
    }
    return result;
}
\`\`\``,
            options: ["result++; index--;", "result--; index--;", "result--; index++;", "result++; index++;"],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1733577765027904.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：A（result++; index--;）**

**推导过程：**

两个数组升序排序后，循环从胃口最大的孩子开始检查，\`index\` 始终指向当前最大的未使用饼干。

- 当 \`s[index] >= g[i]\` 时，这块饼干能满足当前孩子，已满足人数应执行 \`result++\`。
- 一块饼干最多使用一次，分配成功后必须执行 \`index--\`，转向下一块未使用饼干。
- 若最大饼干也无法满足当前孩子，本轮不消耗饼干，循环自然继续检查胃口更小的孩子。

因此横线应填写 \`result++; index--;\`。B、C 会错误减少已满足人数；C、D 还会让下标向数组右侧增长，既重复使用或跳过饼干，也可能越界。

**最小验证：** $g=[1,2]$、$s=[1,2]$。先用尺寸 2 的饼干满足胃口 2 的孩子，得到 \`result=1,index=0\`；再用尺寸 1 的饼干满足胃口 1 的孩子，最终返回 2。

**考点：** 贪心算法、排序、双指针。`,
            tags: ["客观题", "单选题", "GESP5级", "贪心算法", "排序", "双指针"]
        },
        {
            id: 14,
            type: "single",
            question: `关于分治算法，以下说法中不正确的是（ ）。`,
            options: ["分治算法将问题分成子问题，然后分别解决子问题，最后合并结果。", "归并排序采用了分治思想。", "快速排序采用了分治思想。", "冒泡排序采用了分治思想。"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（冒泡排序采用了分治思想。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: `贪心算法的核心是（ ）。`,
            options: ["全局搜索", "局部最优选择", "回溯", "并行计算"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            贪心算法的基础策略。

            - **A 全局搜索**：错误。
            - **B 局部最优选择**：正确答案。
            - **C 回溯**：错误。
            - **D 并行计算**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: `单链表只支持在表头进行插入和删除操作。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            可以在任意位置操作，只是效率不同。

            **纠错：** 原命题说法有误。可以在任意位置操作，只是效率不同。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: `线性筛相对于埃氏筛法，每个合数只会被它的最小质因数筛去一次，因此效率更高。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            线性筛的优势。

            **易混概念：** gcd(a,b)=gcd(b, a%b)，辗转相除法；质因数分解用试除法到 sqrt(n)。注意 1 既不是质数也不是合数。

            **考点：** 数论
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: `任何一个大于 1 的自然数都可以分解成若干个不同的质数的乘积，且分解方式是唯一的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            分解出来的质数不一定“不同”（可以有幂次）。

            **纠错：** 原命题说法有误。分解出来的质数不一定“不同”（可以有幂次）。

            **易混概念：** 埃氏筛：标记每个质数的倍数为合数，从 i*i 开始标记避免重复；欧拉筛每个合数只被最小质因子筛一次，效率更高。

            **考点：** 筛法
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: `贪心算法通过每一步选择当前最优解，从而一定能获得全局最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            不一定。

            **纠错：** 原命题说法有误。不一定。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: `递归算法必须有一个明确的结束条件，否则会导致无限递归并可能引发栈溢出。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            递归的核心要求。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: `快速排序和归并排序的平均时间复杂度均为 $O(n log n)$，且都是稳定排序。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            快排不稳定。

            **纠错：** 原命题说法有误。快排不稳定。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: `快速排序的时间复杂度总比插入排序的时间复杂度低。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            不总。在数组已有序或近乎有序时，插入排序更高。

            **纠错：** 原命题说法有误。不总。在数组已有序或近乎有序时，插入排序更高。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: `二分查找仅适用于数组而不适合链表，因为二分查找需要跳跃式访问元素，链表中执行跳跃式访问的效率低。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            正确。链表不支持随机访问。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: `对有序数组{5,13,19,21,37,56,64,75,88,92,100} 进行二分查找，成功查找元素 19 的比较次数是 2 。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            第一次中间值 56；第二次左半部 21；第三次 13；第四次 19。需 4 次。

            **纠错：** 原命题说法有误。第一次中间值 56；第二次左半部 21；第三次 13；第四次 19。需 4 次。

            **易混概念：** 二分查找前提：序列有序。注意边界 while(left<=right) 还是 while(left<right)，mid 用 left+(right-left)/2 防溢出，以及更新左右边界时是否 ±1。

            **考点：** 二分查找
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: `递归函数每次调用自身时，系统都会为新开启的函数分配内存，以存储局部变量、调用地址和其他信息等，导致递归通常比迭代更加耗费内存空间。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            函数调用的栈开销。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
