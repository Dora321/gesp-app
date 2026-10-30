// 2025年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6`, output: `4` },
        { input: `9`, output: `5` }
      ],
      question: `
# [GESP202509 五级] 数字选取

## 题目描述

给定正整数 $n$，现在有 $1,2,\\ldots,n$ 共计 $n$ 个整数。你需要从这 $n$ 个整数中选取一些整数，使得所选取的整数中任意两个不同的整数均互质（也就是说，这两个整数的最大公因数为 $1$）。请你最大化所选取整数的数量。

例如，当 $n=9$ 时，可以选择 $1,5,7,8,9$ 共计 $5$ 个整数。可以验证不存在数量更多的选取整数的方案。

## 输入格式

一行，一个正整数 $n$，表示给定的正整数。

## 输出格式

一行，一个正整数，表示所选取整数的最大数量。
`,
      score: 25,
      explanation: `**解析：**
      除 1 以外，任何两个不同的质数都互质；而大于 1 的合数通常会与某个更小的质数不互质。因此最优策略是选 1 以及所有不超过 n 的质数，答案为 1+pi(n)。

      **考点：** 数论、线性筛
      `,
      tags: ["编程题", "数论", "线性筛"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nconst int N = 1e5+5;\nint n, p[N], cnt;\nbool np[N];\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 2; i <= n; i++) {\n        if (!np[i]) p[++cnt] = i;\n        for (int j = 1; j <= cnt && i * p[j] <= n; j++) {\n            np[i * p[j]] = 1;\n            if (i % p[j] == 0) break;\n        }\n    }\n    printf(\"%d\\n\", 1+cnt);\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 8`, output: `19` },
        { input: `65 36248`, output: `328505490` }
      ],
      question: `
# [GESP202509 五级] 有趣的数字和

## 题目描述

如果一个正整数的二进制表示包含奇数个 $1$，那么小 A 就会认为这个正整数是有趣的。

例如，$7$ 的二进制表示为 $(111)_2$，包含 $1$ 的个数为 $3$ 个，所以 $7$ 是有趣的。但是 $9=(1001)_2$ 包含 $2$ 个 $1$，所以 $9$ 不是有趣的。

给定正整数 $l,r$，请你统计满足 $l\\le n\\le r$ 的有趣的整数 $n$ 之和。

## 输入格式

一行，两个正整数 $l,r$，表示给定的正整数。

## 输出格式

一行，一个正整数，表示 $l,r$ 之间有趣的整数之和。
`,
      score: 25,
      explanation: `**解析：**
      设 f(n) 表示 [1,n] 中所有二进制中 1 的个数为奇数的数之和。可按最高位递归统计：先处理完整的 [0,2^k-1] 块，再递归处理剩余部分，同时根据最高位翻转奇偶性。最终答案为 f(r)-f(l-1)。

      **考点：** 位运算、递归、数位DP
      `,
      tags: ["编程题", "位运算", "递归", "数位DP"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int l, r;\n    cin >> l >> r;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nint l, r;\nlong long ans;\npair<int, long long> cal2(int n, int p) {\n    if (n == 0) return {1-p, 0};\n    if (n == 1) return {1, p};\n    return {(n+1) / 2, 1ll * n * (n+1) / 4};\n}\npair<int, long long> cal(int n, int p) {\n    if (n <= 1) return cal2(n, p);\n    long long x = 1ll << (31-__builtin_clz(n));\n    auto l = cal2(x-1, p);\n    auto r = cal(n-x, 1-p);\n    return {l.first+r.first, l.second+r.second+x * r.first};\n}\nint main() {\n    scanf(\"%d%d\", &l, &r);\n    ans -= cal(l-1, 1).second;\n    ans += cal(r, 1).second;\n    printf(\"%lld\\n\", ans);\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2025-09-l5',
    title: '2025年9月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `以下哪种情况使用链表比数组更合适？`,
            options: [
                "数据量固定且读多写少",
                "需要频繁在中间或开头插入、删除元素",
                "需要高效随机访问元素",
                "存储空间必须连续",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
链表与数组的核心差异在于内存布局：数组连续、链表离散。
- **A 错误：** 数据量固定且读多写少时，数组更合适——连续内存支持 O(1) 随机访问，缓存友好，无指针额外开销。
- **B 正确：** 链表插入/删除只需修改相邻结点的指针（已定位到位置时 O(1)），不像数组需要整体搬移元素（O(n)）；且在开头插入时链表只需改 head 指针。
- **C 错误：** 随机访问正是数组的强项（下标直接寻址 O(1)），链表必须从头遍历 O(n)。
- **D 错误：** 「存储空间必须连续」是数组的前提，不是选链表的理由；链表恰恰不需要连续空间。

**易错点：** 链表「插入删除 O(1)」的前提是**已经定位到目标位置**；若算上查找位置的开销仍是 O(n)，但无需搬移元素这点始终成立。

**考点：** 链表与数组
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `函数 removeElements 删除单链表中所有结点值等于 val 的结点，并返回新的头结点，其中链表头结点为 head，则横线处填写（ ）。

\`\`\`cpp
// 结点结构体
struct Node {
    int val;
    Node* next;

    Node() : val(0), next(nullptr) {}
    Node(int x) : val(x), next(nullptr) {}
    Node(int x, Node *next) : val(x), next(next) {}
};

Node* removeElements(Node* head, int val) {
    Node dummy(0, head); // 哑结点，统一处理头结点
    Node* cur = &dummy;
    while (cur->next) {
        if (cur->next->val == val) {
            _______________________ // 在此填入代码
        }
        else {
            cur = cur->next;
        }
    }
    return dummy.next;
}
\`\`\``,
            options: [
                "Node* del = cur;\ncur = del->next;\ndelete del;",
                "Node* del = cur->next;\ncur->next = del;\ndelete del;",
                "Node* del = cur->next;\ncur->next = del->next;\ndelete del;",
                "Node* del = cur->next;\ndelete del;\ncur->next = del->next;",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1, 2],
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1704013600915488.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C**

**推导过程：**

\`cur\` 指向待检查结点的前驱，真正要删除的是 \`cur->next\`。删除一个单链表结点必须按以下顺序完成：

1. 用 \`del = cur->next\` 保存待删除结点；
2. 用 \`cur->next = del->next\` 让前驱绕过待删除结点；
3. 最后 \`delete del\` 释放该结点。

删除后 \`cur\` 不向后移动，下一轮仍检查新的 \`cur->next\`，因此连续多个值等于 \`val\` 的结点也能全部删除。

**逐项分析：**

- **A** 删除的是前驱 \`cur\`，而 \`cur\` 还可能指向栈上的哑结点，逻辑和内存管理都错误。
- **B** 把 \`cur->next\` 重新指向原结点，没有把它从链表中摘除，随后释放该结点会留下悬空指针。
- **C** 先保存目标结点，再连接其后继，最后释放，顺序正确。
- **D** 先释放 \`del\`，再读取 \`del->next\`，属于释放后使用，行为未定义。

**最小验证：** 对链表 \`1 -> 2 -> 2 -> 3\` 删除 2。第一次删除后 \`cur\` 仍指向 1，新的 \`cur->next\` 是第二个 2；再次执行同样三行后得到 \`1 -> 3\`。

**考点：** 单链表删除、哑结点、指针更新、动态内存管理。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
                "链表",
                "指针",
                "动态内存",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `函数 hasCycle 采用 Floyd 快慢指针法判断单链表中是否存在环。slow 每次走 1 步，fast 每次走 2 步，则横线处应填写（ ）。\n\n\`\`\`cpp\nstruct Node {\n    int val;\n    Node *next;\n    Node(int x) : val(x), next(nullptr) {}\n};\nbool hasCycle(Node *head) {\n    if (!head || !head->next)\n        return false;\n    Node* slow = head;\n    Node* fast = head->next;\n    while (fast && fast->next) {\n        if (slow == fast) return true;\n        _______________________        // 在此填入代码\n    }\n    return false;\n}\n\`\`\``,
            options: [
                "slow = slow->next; fast = fast->next->next;",
                "slow = fast->next; fast = slow->next->next;",
                "slow = slow->next; fast = slow->next->next;",
                "slow = fast->next; fast = fast->next->next;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
Floyd 判圈：slow 每次走 1 步，fast 每次走 2 步，两者速度差为 1，若有环必相遇。
- **A 正确：** \`slow = slow->next; fast = fast->next->next;\`——slow 走 1 步、fast 走 2 步，符合定义。注意 fast 走两步写成 \`fast->next->next\`，由于循环条件已保证 \`fast && fast->next\` 非空，安全。
- **B 错误：** \`slow = fast->next\` 让 slow 跳到了 fast 的下一位置，不再是「每次走 1 步」；且先改 slow 后 \`slow->next\` 语义混乱，fast 的步进也依赖被改过的 slow，逻辑错误。
- **C 错误：** \`fast = slow->next->next\` 中 fast 的新位置由 slow 计算，fast 不再独立以 2 步前进；当 slow 与 fast 相邻时 \`slow->next->next\` 可能等于 slow 自身，造成假相遇或死循环。
- **D 错误：** \`slow = fast->next\` 同样让 slow 的移动依赖 fast，两者耦合后不再是 1 步/2 步的速度差，判圈失效。

**易错点：** 快慢指针的关键是**两个指针各自独立地按固定速度前进**；任何「用对方的 next 计算自己的新位置」的写法都会破坏速度差。

**考点：** 链表、Floyd 判圈、双指针
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `函数 isPerfectNumber 判断一个正整数是否为完全数（该数等于其所有真因子之和），为避免重复枚举因子，循环条件横线处应填写（ ）。\n\n\`\`\`cpp\nbool isPerfectNumber(int n) {\n    if(n <= 1) return false;\n    int sum = 1;\n    for(int i = 2; ________; i++) {\n        if(n % i == 0) {\n            sum += i;\n            if(i != n/i) sum += n/i;\n        }\n    }\n    return sum == n;\n}\n\`\`\``,
            options: [
                "i <= n",
                "i*i <= n",
                "i <= n/2",
                "i < n",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
完全数判断需枚举 n 的所有真因子。因子总是成对出现（i 与 n/i），其中较小的一个不超过 √n。
- **A 错误：** \`i <= n\` 枚举到 n 本身，既浪费（O(n)），又会在 i == n 时把 n 自己加进 sum（n % i == 0），而真因子不包括 n 自身，结果必然错误。
- **B 正确：** \`i*i <= n\` 只枚举到 √n，每找到一个因子 i 就同时加上配对因子 n/i（代码中 \`if(i != n/i) sum += n/i\` 避免平方数重复计），复杂度降为 O(√n) 且不重不漏。
- **C 错误：** \`i <= n/2\` 虽然不会把 n 算进因子，但复杂度仍是 O(n)，没有利用因子成对的性质，不是「避免重复枚举」的最佳写法。
- **D 错误：** \`i < n\` 同样是 O(n) 全量枚举，且当 n 本身是因子时（i 从 2 到 n-1 中不会有 n），虽然结果碰巧正确，但效率与 C 相同，远逊于 B。

**易错点：** 枚举因子时 \`i*i <= n\` 与「i 到 √n、同时输出 i 和 n/i」是固定搭配；忘记处理 \`i == n/i\`（完全平方数）会导致因子重复累加。

**考点：** 因子枚举、完全数、时间复杂度优化
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `以下代码计算两个正整数的最大公约数(GCD)，横线上应填写（ ）。\n\n\`\`\`cpp\nint gcd0(int a, int b) {\n    if (a < b) {\n        swap(a, b);\n    }\n    while(b != 0) {\n        int temp = a % b;\n        a = b;\n        b = temp;\n    }\n    return ______;\n}\n\`\`\``,
            options: [
                "b",
                "a",
                "temp",
                "a * b",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
这是辗转相除法（欧几里得算法）的迭代实现。
- **A 正确：** 循环 \`while(b != 0)\` 每轮执行 \`temp = a % b; a = b; b = temp;\`，当 b 变为 0 时退出，此时 **a 中保存的就是最大公约数**，故填 \`return a\`——但这正是答案 B 的内容。
- **B 正确（答案）：** 循环不变量：每一轮 (a, b) 的最大公约数不变（gcd(a,b) = gcd(b, a mod b)）。退出时 b == 0，gcd(a, 0) = a，返回 a 即为所求。
- **C 错误：** temp 是循环体内的临时变量，存放的是本轮的余数；循环结束后 temp 的值是最后一轮的余数 0，返回它毫无意义。
- **D 错误：** a * b 是两数乘积，与最大公约数无关（最小公倍数才需要 lcm(a,b) = a*b/gcd(a,b)）。

**易错点：** 迭代版欧几里得算法退出时答案是 **a 不是 b**（b 已被置 0）；对比递归版 \`return b == 0 ? a : gcd(b, a % b)\` 帮助记忆。

**考点：** 最大公约数、欧几里得算法
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `函数 sieve 实现埃拉托斯特尼筛法(埃氏筛)，横线处应填入（ ）。\n\n\`\`\`cpp\nvector<bool> sieve(int n) {\n    vector<bool> is_prime(n+1, true);\n    is_prime[0] = is_prime[1] = false;\n    for(int i = 2; i <= n; i++) {\n        if(is_prime[i]) {\n            for(int j = ______; j <= n; j += i) {\n                is_prime[j] = false;\n            }\n        }\n    }\n    return is_prime;\n}\n\`\`\``,
            options: [
                "i",
                "i+1",
                "i*2",
                "i*i",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
埃氏筛的内层循环负责把 i 的倍数全部标记为合数。
- **A 错误：** 从 \`j = i\` 开始会把 i 本身标记为合数（i 是素数时 is_prime[i] 刚被确认为 true），自我矛盾。
- **B 错误：** \`i+1\` 与 i 的倍数序列无关，起标记起点错乱，会漏标 i*2、i*3 等真倍数。
- **C 正确性不足：** \`j = i*2\` 是常见的朴素写法（从 2 倍开始），算法仍正确，但会把 i 的 1 倍（即 i 自己，素数）之外的 2i, 3i… 全部标记，其中 2i 会被更小的素数 2 重复标记，常数更大；题目问「应填入」的最佳选择，D 更优。
- **D 正确（答案）：** \`j = i*i\`——i 的更小倍数 2i, 3i, …, (i-1)·i 都含有小于 i 的素因子，早已被更小的素数标记过；从 i² 起跳可避免全部重复标记，这是埃氏筛的标准优化。

**易错点：** 「从 i² 开始筛」的前提是外层 i 只枚举到 √n；两个优化常常成对出现（\`i*i <= n\` + \`j = i*i\`），注意与判素题的 \`i*i <= n\` 区分场景。

**考点：** 埃拉托斯特尼筛法、素数筛
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `函数 linearSieve 实现线性筛法(欧拉筛)，横线处应填入（ ）。\n\n\`\`\`cpp\nvector<int> linearSieve(int n) {\n    vector<bool> is_prime(n+1, true);\n    vector<int> primes;\n    for(int i = 2; i <= n; i++) {\n        if(is_prime[i]) primes.push_back(i);\n        for(int p : primes) {\n            if(p * i > n) break;\n            is_prime[p * i] = false;\n            if(________) break;\n        }\n    }\n    return primes;\n}\n\`\`\``,
            options: [
                "i % p == 0",
                "p % i == 0",
                "i == p",
                "i * p == n",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
线性筛（欧拉筛）的核心：保证每个合数只被其**最小质因子**筛掉一次。
- **A 正确：** \`if (i % p == 0) break;\`——当 i 能被当前质数 p 整除时，p 恰是 i 的最小质因子；若继续用更大的质数 p' 标记 i*p'，则 i*p' 的最小质因子是 p 而非 p'，会造成重复标记，必须 break。
- **B 错误：** \`p % i == 0\` 方向反了——p 是素数、i 是当前数，通常 i ≥ p 时才有意义；用余数判断应查「i 被 p 整除」。
- **C 错误：** \`i == p\` 只在 i 恰好等于某个已筛出的素数时触发，绝大多数 i 不会遇到，起不到防止重复标记的作用。
- **D 错误：** \`i * p == n\` 中 n 是筛选上界，这个条件与「避免重复标记」无关，而且循环里已有 \`if(p * i > n) break\` 处理越界。

**易错点：** 线性筛两个 break 各司其职：\`p*i > n\` 防越界，\`i % p == 0\` 保证最小质因子唯一性——后者是 O(n) 复杂度的关键。

**考点：** 线性筛、欧拉筛、最小质因子
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `关于埃氏筛和线性筛的比较，下列说法错误的是（ ）。`,
            options: [
                "埃氏筛可能会对同一个合数进行多次标记",
                "线性筛的理论时间复杂度更优，所以线性筛的速度往往优于埃氏筛",
                "线性筛保证每个合数只被其最小质因子筛到一次",
                "对于常见的数据范围，埃氏筛因实现简单、常数较小，实际运行速度往往优于线性筛",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
本题考查两种筛法的理论与实践差异。
- **A 正确：** 埃氏筛中一个合数（如 12）会被 2、3 等多个质因子重复标记，这正是它的冗余所在。
- **B 错误（答案）：** 「理论复杂度更优，所以实际速度往往更快」的推理不成立。线性筛 O(n) 每次标记伴随取模与 primes 数组访问，缓存局部性差、常数大；埃氏筛 O(n log log n) 实现简单、内存访问连续，在常见数据范围（10⁷ 以内）实测往往**不慢于甚至快于**线性筛。理论優 ≠ 实际快。
- **C 正确：** 「每个合数只被最小质因子筛一次」正是线性筛命名的由来，也是 O(n) 的依据。
- **D 正确：** 与 B 的分析一致——简单、常数小，常见范围内埃氏筛实际表现常常更好。

**易错点：** 复杂度低不等于跑得快；常数、缓存命中率、实现难度都在起作用。这是「理论 vs 工程」的典型题。

**考点：** 筛法比较、时间复杂度与常数
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `唯一分解定理描述的是( )。`,
            options: [
                "每个整数都能表示为任意素数的乘积",
                "每个大于 1 的整数能唯一分解为素数幂乘积（忽略顺序）",
                "合数不能分解为素数乘积",
                "素数只有两个因子：1 和自身",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
唯一分解定理（算术基本定理）：任何大于 1 的整数都可以**唯一地**分解为若干素数的幂的乘积（不计顺序），即 n = p₁^a₁ × p₂^a₂ × … × pₖ^aₖ。
- **A 错误：** 漏掉「大于 1」的限定（1 与素数本身不能写成多个素数的乘积）且漏掉「唯一性」——「任意素数的乘积」表述有无数种可能，恰恰丢掉了定理的核心。
- **B 正确：** 完整涵盖三个要点：对象（大于 1 的整数）、形式（素数幂乘积）、唯一性（忽略顺序）。
- **C 错误：** 合数恰恰**能**分解为素数乘积（这正是定理的主要应用对象），说法与事实相反。
- **D 错误：** 「素数只有 1 和自身两个因子」是素数的**定义**，不是唯一分解定理的内容；本题考的是定理本身。

**易错点：** 唯一分解定理的关键词是「唯一」；1 不参与分解（1 的分解是空乘积），素数 p 的分解就是 p¹。

**考点：** 唯一分解定理、算术基本定理
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `给定一个 n x n 的矩阵 matrix，矩阵的每一行和每一列都按升序排列。函数通过二分答案求第 k 小元素，则两处横线应分别填写（ ）。\n\n\`\`\`cpp\n// 统计矩阵中 <= x 的元素个数：从左下角开始\nint countLE(const vector<vector<int>>& matrix, int x) {\n    int n = (int)matrix.size();\n    int i = n - 1, j = 0, cnt = 0;\n    while (i >= 0 && j < n) {\n        if (matrix[i][j] <= x) {\n            cnt += i + 1;\n            ++j;\n        }\n        else {\n            --i;\n        }\n    }\n    return cnt;\n}\nint kthSmallest(vector<vector<int>>& matrix, int k) {\n    int n = (int)matrix.size();\n    int lo = matrix[0][0];\n    int hi = matrix[n - 1][n - 1];\n    while (lo < hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (countLE(matrix, mid) >= k) {\n            ________________    // 在此处填入代码\n        } else {\n            ________________    // 在此处填入代码\n        }\n    }\n    return lo;\n}\n\`\`\``,
            options: [
                "hi = mid-1; 和 lo = mid+1",
                "hi = mid; 和 lo = mid",
                "hi = mid; 和 lo = mid+1",
                "hi = mid+1; 和 lo = mid",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
二分答案求第 k 小：在值域 [lo, hi] 上二分，用 countLE(mid)（矩阵中 ≤ mid 的元素个数）与 k 比较收缩区间。
- **A 错误：** \`hi = mid-1; lo = mid+1\` 两侧都跳过 mid。当 countLE(mid) == k 恰好相等时，mid 可能就是答案（值域二分中第 k 小一定存在且是满足条件的最小值），mid-1 会跳过它，导致返回偏小的值。
- **B 错误：** \`lo = mid\` 在 else 分支（countLE < k）中不前进——lo=mid 与 \`mid = lo + (hi-lo)/2\`（下取整）组合，当 hi = lo+1 且 countLE(lo) < k 时 mid == lo，区间永不收缩，**死循环**。
- **C 正确：** \`hi = mid; lo = mid + 1\`——countLE(mid) ≥ k 说明答案 ≤ mid（mid 本身可能是答案），收缩 hi = mid；countLE(mid) < k 说明答案 > mid，lo = mid + 1 必然前进。配合下取整 mid，区间严格收缩，收敛到最小可行值即第 k 小。
- **D 错误：** \`hi = mid+1\` 可能越界到矩阵最大值之外；\`lo = mid\` 同样有 B 的死循环问题。

**易错点：** 值域二分求「最小可行值」的标准模板是 \`hi = mid; lo = mid + 1\` 配下取整 mid；求「最大可行值」才是 \`lo = mid; hi = mid - 1\` 配上取整 mid。两套模板不能混用。

**考点：** 二分答案、第 k 小元素、二分模板
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `下述 C++ 代码实现了快速排序算法，下面说法错误的是（ ）。\n\n\`\`\`cpp\nint partition(vector<int>& arr, int low, int high) {\n    int i = low, j = high;\n    int pivot = arr[low];                 // 以首元素为基准\n    while (i < j) {\n        while (i < j && arr[j] >= pivot) j--;   //从右往左查找\n        while (i < j && arr[i] <= pivot) i++;   //从左往右查找\n        if (i < j) swap(arr[i], arr[j]);\n    }\n    swap(arr[i], arr[low]);\n    return i;\n}\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low >= high) return;\n    int p = partition(arr, low, high);\n    quickSort(arr, low, p - 1);\n    quickSort(arr, p + 1, high);\n}\n\`\`\``,
            options: [
                "快速排序平均情况下速度较快、常数较小，且属于原地排序，实践中通常较高效。",
                "平均情况下递归层数约为 $O(log n)$，每层总工作量为 $O(N)$，总时间复杂度为 $O(n log n)$。",
                "最坏情况下会不断分成 0 和 $n-1$ 两部分，递归层数达 $O(N)$，每层工作量为 $O(N)$，总时间复杂度为 $O(N^2)$。",
                "partition 中“先从右往左找”与“先从左往右找”的顺序可以随意交换，算法仍然完全等价。",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
- **A 正确：** 快排平均 O(n log n)、原地排序、缓存友好，实践中常数小，通常优于同样 O(n log n) 但需辅助数组的归并排序。
- **B 正确：** 随机数据下划分大致均衡，递归层数期望 O(log n)，每层总划分工作量 O(n)，总时间 O(n log n)。
- **C 正确：** 最坏情况（如已有序时以首元素为基准）每轮划分成 0 和 n-1 两部分，递归深度 O(n)，总时间退化为 O(n²)。
- **D 错误（答案）：** 划分顺序**不能**随意交换。基准取 \`arr[low]\`（首元素）时，必须**先从右往左找**（j 先行）：这样停下来的 arr[j] ≤ pivot，最后 swap(arr[i], arr[low]) 才能正确地把基准放到分界点；若先从左往右找，i 会停在一个大于 pivot 的位置，交换后基准左侧出现大元素，排序结果错误。

**易错点：** 「以首元素为基准 → 先扫右」是固定搭配；若基准取 arr[high]（尾部），则要先扫左。两处代码（基准位置与扫描顺序）必须配套。

**考点：** 快速排序、partition 划分、最坏情况分析
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `下述C++代码实现了归并排序算法，则横线上应填写（ ）。\n\n\`\`\`cpp\nvoid merge(vector<int> &nums, int left, int mid, int right) {\n    // 左子数组区间为 [left, mid], 右子数组区间为 [mid+1, right]\n    vector<int> tmp(right - left + 1);\n    int i = left, j = mid + 1, k = 0;\n    while (i <= mid && j <= right) {\n        if (nums[i] <= nums[j])\n            tmp[k++] = nums[i++];\n        else\n            tmp[k++] = nums[j++];\n    }\n    while (i <= mid) {\n        tmp[k++] = nums[i++];\n    }\n    while (________) {    // 在此处填入代码\n        tmp[k++] = nums[j++];\n    }\n    for (k = 0; k < tmp.size(); k++) {\n        nums[left + k] = tmp[k];\n    }\n}\nvoid mergeSort(vector<int> &nums, int left, int right) {\n    if (left >= right)\n        return;\n    int mid = (left + right) / 2;\n    mergeSort(nums, left, mid);\n    mergeSort(nums, mid + 1, right);\n    merge(nums, left, mid, right);\n}\n\`\`\``,
            options: [
                "i < mid",
                "j < right",
                "i <= mid",
                "j <= right",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
归并的收尾阶段：先合并公共段，再把没有取完的子数组整体搬入 tmp。
- **A 错误：** \`while (i < mid)\` 会漏掉下标 mid 的元素（左半区间是 [left, mid]，闭区间），且与上一段 \`while (i <= mid)\` 的边界风格矛盾。
- **B 错误：** \`j < right\` 同样漏掉下标 right 的元素（右半区间是 [mid+1, right]），导致最右元素丢失。
- **C 错误：** \`i <= mid\` 是**上一段已完成的循环**条件——公共段结束后左半必然已取完（i == mid+1），若在这里再写 \`while (i <= mid)\` 一遍，循环体根本不会执行，右半剩余元素全部丢失。
- **D 正确：** \`while (j <= right)\`——公共段结束后，若右半还有剩余（j ≤ right），逐个搬入 tmp。这正是把右半尾部接上的标准写法，且与上文 \`while (i <= mid)\` 形成对称。

**易错点：** 归并收尾的两个 while 通常**最多只有一个会执行**；边界一律用闭区间 \`<=\`，与 \`[left, mid]\`、\`[mid+1, right]\` 的区间定义保持一致。

**考点：** 归并排序、merge 过程、边界处理
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `假设你是一家电影院的排片经理，只有一个放映厅。你有一个电影列表 movies，其中 movies[i] = [start_i, end_i] 表示第 i 部电影的开始和结束时间。请你找出最多能安排多少部不重叠的电影，则横线上应分别填写的代码为（ ）。\n\`\`\`cpp\nint maxMovies(vector<vector<int>>& movies) {\n    if (movies.empty()) return 0;\n\n    sort(movies.begin(), movies.end(), [](const vector<int>& a, const vector<int>& b) {\n        return ________; // 在此处填入代码\n    });\n\n    int count = 1;\n    int lastEnd = movies[0][1];\n\n    for (int i = 1; i < movies.size(); i++) {\n        if (movies[i][0] >= lastEnd) {\n            count++;\n            ________ = movies[i][1]; // 在此处填入代码\n        }\n    }\n\n    return count;\n}\n\`\`\``,
            options: [
                "a[0] < b[0] 和 lastEnd",
                "a[1] < b[1] 和 lastEnd",
                "a[0] < b[0] 和 movies[i][0]",
                "a[1] < b[1] 和 movies[i][0]",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
「最多不重叠区间」是经典活动选择/区间调度问题，标准解法是**贪心：按结束时间排序，每次选结束最早且与已选不冲突的电影**。
- **A 错误：** 按开始时间 \`a[0] < b[0]\` 排序不能保证最优——一部开始很早但放映极久的电影会占住大厅，挡掉多部短电影。反例：[1,100], [2,3], [4,5] 按开始时间排先选 [1,100]，只能安排 1 部；最优是后两部共 2 部。
- **B 正确：** 按结束时间 \`a[1] < b[1]\` 升序排序（结束越早，给后面留的空间越大）；遍历时若 \`movies[i][0] >= lastEnd\`（当前电影开始时间不早于上一部选中电影的结束时间，不重叠），则选中并把**lastEnd 更新为当前电影的结束时间 \`movies[i][1]\`**——第二空填 \`lastEnd\`，与题库代码中 \`________ = movies[i][1]\` 的赋值目标一致。
- **C 错误：** 排序依据 \`a[0] < b[0]\` 与 A 同错；第二空填 \`movies[i][0]\` 则成了把结束时间变量赋成开始时间，后续比较全乱。
- **D 错误：** 排序依据 \`a[1] < b[1]\` 正确，但第二空填 \`movies[i][0]\` 相当于执行 \`movies[i][0] = movies[i][1]\`——改了输入数据而不是维护 lastEnd，\`lastEnd\` 永远停留在第一部电影的结束时间，后续判断全错。

**易错点：** 区间调度的贪心排序键是**右端点（结束时间）**不是左端点；「>= lastEnd」与「> lastEnd」取决于端点相接是否算重叠（本题为不重叠，端点相接可选）。

**考点：** 贪心、区间调度、活动选择问题
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `给定一个整数数组 nums，下面代码找到一个具有最大和的连续子数组并返回该最大和。则下面说法错误的是（ ）。\n\n\`\`\`cpp\nint crossSum(vector<int>& nums, int left, int mid, int right) {\n    int leftSum = INT_MIN, rightSum = INT_MIN;\n    int sum = 0;\n    for (int i = mid; i >= left; i--) {\n        sum += nums[i];\n        leftSum = max(leftSum, sum);\n    }\n    sum = 0;\n    for (int i = mid + 1; i <= right; i++) {\n        sum += nums[i];\n        rightSum = max(rightSum, sum);\n    }\n    return leftSum + rightSum;\n}\nint helper(vector<int>& nums, int left, int right) {\n    if (left == right)\n        return nums[left];\n    int mid = left + (right - left) / 2;\n    int leftMax = helper(nums, left, mid);\n    int rightMax = helper(nums, mid + 1, right);\n    int crossMax = crossSum(nums, left, mid, right);\n    return max({leftMax, rightMax, crossMax});\n}\nint maxSubArray(vector<int>& nums) {\n    return helper(nums, 0, nums.size() - 1);\n}\n\`\`\``,
            options: [
                "上述代码采用分治算法实现",
                "上述代码采用贪心算法",
                "上述代码的时间复杂度为 $O(n log n)$",
                "上述代码采用递归方式实现",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
- **A 正确：** 代码把数组从中间分成两半，分别递归求左半最大子数组、右半最大子数组，再用 crossSum 求跨越中点的最大子数组，三者取 max——这是标准的分治结构。
- **B 错误（答案）：** 该代码是**分治**不是贪心。贪心解法是一次遍历、维护「以当前位置结尾的最大和」（Kadane 算法），不递归、不拆分区间；本代码明显递归分半，与贪心的单趟扫描完全不同。
- **C 正确：** 分治递归式 T(n) = 2T(n/2) + O(n)（crossSum 是 O(n)），由主定理得 O(n log n)。
- **D 正确：** helper 自我调用、以 left==right 为边界，是典型的递归实现。

**易错点：** 最大子数组有三种经典解法：暴力 O(n²)、分治 O(n log n)、Kadane 贪心/DP O(n)。判断依据看结构：递归分半+跨越中点是分治，单趟维护当前和是贪心。

**考点：** 最大子数组和、分治算法
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `给定一个由非负整数组成的数组 digits，表示一个非负整数的各位数字。下面代码对该整数执行 +1 操作并返回结果数组，则横线处应填写（ ）。\n\n\`\`\`cpp\nvector<int> plusOne(vector<int>& digits) {\n    for (int i = (int)digits.size() - 1; i >= 0; --i) {\n        if (digits[i] < 9) {\n            digits[i] += 1;\n            return digits;\n        }\n        ________________    // 在此处填入代码\n    }\n    digits.insert(digits.begin(), 1);\n    return digits;\n}\n\`\`\``,
            options: [
                "digits[i] = 0;",
                "digits[i] = 9;",
                "digits[i] = 1;",
                "digits[i] = 10;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
加一操作从最低位往高位处理：digits[i] < 9 时直接 +1 返回；否则该位是 9，加 1 后变 10——本位归 0 并向前进位，由循环的下一轮继续处理。
- **A 正确：** \`digits[i] = 0;\`——9 + 1 = 10，本位写 0，进位 1 隐式地由循环继续处理（若更高位 < 9 则 +1 返回；若全是 9，循环结束后在头部插入 1，如 999 → 1000）。
- **B 错误：** 置回 9 等于没进位，999 + 1 会得到 999，结果错误。
- **C 错误：** 置 1 无从解释：9+1 的本位应是 0 而非 1，且没有任何进位规则支持这个值。
- **D 错误：** digits 每位只能存 0~9，写 10 超出数位范围，且后续 \`digits.insert(begin, 1)\` 的兜底逻辑也无从正确工作。

**易错点：** 全 9 的情形（999→1000）由**循环外**的 insert(begin,1) 兜底，循环内只需「置 0 继续进位」；不要在循环里试图插入新元素（遍历中修改容器是危险操作）。

**考点：** 数组模拟加法、进位处理
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `基于下面定义的函数，通过判断 isDivisibleBy9(n) == isDigitSumDivisibleBy9(n)，可用于验算：如果一个数能被 9 整除，则它的各位数字之和也能被 9 整除。\n\n\`\`\`cpp\nbool isDivisibleBy9(int n) {\n    return n % 9 == 0;\n}\nbool isDigitSumDivisibleBy9(int n) {\n    int sum = 0;\n    string numStr = to_string(n);\n    for (char c : numStr) {\n        sum += (c - '0');\n    }\n    return sum % 9 == 0;\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
两个函数分别计算「n 是否被 9 整除」与「n 的各位数字之和是否被 9 整除」。由整除性质：n 与其各位数字之和模 9 同余（因为 10 ≡ 1 (mod 9)，故 n = Σdᵢ·10ⁱ ≡ Σdᵢ (mod 9)）。因此两个函数对任何 n 的返回值恒相同，\`isDivisibleBy9(n) == isDigitSumDivisibleBy9(n)\` 恒为 true。

这正是「弃九验算法」的原理：一个数能被 9 整除 ⟺ 它的各位数字之和能被 9 整除。用代码验算两个函数的一致性，即可验证该数学结论，说法正确。

**易混概念：** 该性质对 3 同样成立（10 ≡ 1 (mod 3)）；对 11 的验算规则则是奇偶位差和（10 ≡ -1 (mod 11)），不要混淆。

**考点：** 整除性质、弃九法、同余
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `假设函数gcd()能正确求两个正整数的最大公约数，则下面的findMusicalPattern(4 ， 6)函数返回 2 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

\`\`\`cpp
void findMusicalPattern(int rhythm1, int rhythm2) {
    int commonDivisor = gcd(rhythm1, rhythm2);
    int patternLength = (rhythm1 * rhythm2) / commonDivisor;
    return patternLength;
}
\`\`\`

代入 rhythm1=4、rhythm2=6：

- \`gcd(4,6) = 2\`
- \`patternLength = (4*6)/2 = 12\`

函数返回 12，不是题干说的 2。题干把最大公约数与最小公倍数混淆了——\`(a*b)/gcd(a,b)\` 求的是最小公倍数。

**易错提醒：** \`gcd\` 求最大公约数，\`a*b/gcd\` 求最小公倍数。本题 2 是 gcd，12 是 lcm。

**考点：** 最大公约数与最小公倍数的关系、函数返回值推导。`,
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `下面递归实现的斐波那契数列的时间复杂度为指数级。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

题干说"下面递归实现的斐波那契数列"，但给出的代码是**带记忆化**的递归：

\`\`\`cpp
long long fib_memo(int n, long long memo[]) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];       // 已算过直接取
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo);
    return memo[n];
}
\`\`\`

每个 \`fib_memo(i)\` 只会被真正计算一次，之后都命中缓存，总计算量是 $O(n)$，不是指数级 $O(2^n)$。指数级指的是**不带记忆化**的朴素递归（同一子问题被反复求解）。

**易错提醒：** 看递归题的时间复杂度，先看有没有备忘录/缓存。带记忆化的递归是"自顶向下的动态规划"，复杂度通常与状态数同阶。

**考点：** 递归、记忆化搜索与时间复杂度分析。`,
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `链表通过更改指针实现高效的结点插入与删除，但结点访问效率低、占用内存较多，且对缓存利用不友好。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
逐项核对链表的特性：
- 「更改指针实现高效插入删除」——已定位到位置时只需修改相邻结点指针，O(1)，正确；
- 「结点访问效率低」——不支持随机访问，查找需从头遍历 O(n)，正确；
- 「占用内存较多」——每个结点要额外存储 prev/next 指针（64 位系统每个指针 8 字节），空间开销大于等量数组，正确；
- 「对缓存利用不友好」——结点分散在堆中各处，指针跳跃导致 cache 命中率低，而数组连续内存对缓存友好，正确。

四个分句全部符合数据结构常识，说法正确。

**易混概念：** 链表的优势只在频繁插入删除且无需随机访问的场景；「链表比数组省内存」是常见误解——指针域是净开销。

**考点：** 链表特性、缓存局部性
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `二分查找依赖数据的有序性，通过循环逐步缩减一半搜索区间来进行查找，且仅适用于数组或基于数组实现的数据结构。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
三个分句逐一核对：
- 「依赖数据的有序性」——二分查找的前提就是序列有序（或满足单调性），正确；
- 「循环逐步缩减一半搜索区间」——每轮比较中点后舍弃一半，O(log n)，正确；
- 「仅适用于数组或基于数组实现的数据结构」——二分需要**O(1) 随机访问中点元素**，链表等不支持随机访问的结构无法高效二分（跳表虽用链表思想但本质加了索引层）。STL 中 \`lower_bound\` 作用于随机访问迭代器，正是这个道理。

说法正确。

**易混概念：** 二分「跳表除外」的表述——跳表是在链表上加了多级索引才获得 O(log n)，普通链表不行；判定标准始终是能否 O(1) 取到中间元素。

**考点：** 二分查找、适用条件、随机访问
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `线性筛的关键性质是“每个合数只会被其最小质因子筛到一次”，因此其时间复杂度为 $O(N)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
线性筛的准确表述：每个合数 x 只在「外层 i = x / p（p 为 x 的最小质因子）」这一轮，被 p 标记一次——\`if (i % p == 0) break\` 保证用更大的质数标记的路径全部被切断。因此每个合数恰好被标记一次，加上每个素数入队一次，总操作数与 n 同阶，时间复杂度 O(N)。

对比埃氏筛 O(n log log n)：同一个合数会被多个质因子重复标记。「最小质因子筛一次」与「O(N)」互为因果，题干把这两点连起来说，完全正确。

**易混概念：** O(N) 的成立依赖两个 break 同时在场：\`p*i > n\` 防越界、\`i % p == 0\` 保唯一性；缺了后者复杂度退化为埃氏筛同阶。

**考点：** 线性筛、均摊复杂度
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `快速排序和归并排序都是稳定的排序算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

- **归并排序是稳定的**：合并两个有序段时，相等元素优先取左边，相对次序不变。
- **快速排序不稳定**：划分过程中元素被长距离交换，相等元素的相对次序可能被打乱。

所以"都是稳定的排序算法"错误。

**易错提醒：** 稳定排序有插入、冒泡、归并、计数、基数；不稳定的是选择、快速、堆、希尔。口诀"快选堆希"不稳定。

**考点：** 排序算法的稳定性。`,
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `下面代码采用分治算法求解标准 3 柱汉诺塔问题，其时间复杂度为 O(n log n)。

\`\`\`cpp
void move(vector<int> &src, vector<int> &tar) {
    int pan = src.back();
    src.pop_back();
    tar.push_back(pan);
}

void dfs(int n, vector<int> &src, vector<int> &buf, vector<int> &tar) {
    if (n == 1) {
        move(src, tar);
        return;
    }

    dfs(n - 1, src, tar, buf);
    move(src, tar);
    dfs(n - 1, buf, src, tar);
}

void solveHanota(vector<int> &A, vector<int> &B, vector<int> &C) {
    int n = A.size();
    dfs(n, A, B, C);
}
\`\`\`
`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **解析：**
            dfs(n) 的移动次数满足递推式 T(n) = 2T(n-1) + 1：先把 n-1 个盘从 src 借助 tar 移到 buf，再把最大的盘移到 tar，最后把 n-1 个盘从 buf 借助 src 移到 tar。由 T(n) = 2T(n-1) + 1 解得 T(n) = 2^n - 1，时间复杂度为 O(2^n)，不是 O(n log n)，题目说法错误。

            - 代码结构是典型的分治：把规模为 n 的问题分解为两个规模为 n-1 的子问题加上一次常数时间的移动。
            - 注意区分：O(n log n) 是归并排序一类的递推式 T(n) = 2T(n/2) + O(n) 的结果；汉诺塔的子问题规模是 n-1 而非 n/2，指数级不可避免——汉诺塔本身必须完成 2^n - 1 次移动。

            **考点：** 分治、递归复杂度分析（汉诺塔）
            **勘误：** 录入时题干误写为「O(2^n)」导致判定翻转；官方原卷（p.9）题干为「O(n log n)」，官方答案表（p.8）本题答案为 ×，已于 2026-10-24 按原卷更正。
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `所有递归算法都可以转换为迭代算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
任何递归算法都可以机械地转换为迭代算法，理论依据是：递归的本质是调用栈上保存的返回地址与局部状态，而调用栈可以由程序员用**显式栈（或队列等数据结构）手工模拟**。
- 尾递归可直接改写为循环（如阶乘、斐波那契的迭代版）；
- 一般递归用显式栈保存「待处理子问题」，如二叉树的非递归遍历（栈模拟）、快速排序的显式栈版本；
- 甚至任意图灵机上的递归都可用通用机制（CPS 变换等）系统化消除。

因此「所有递归算法都可以转换为迭代算法」成立。

**易混概念：** 「可以转换」是可行性判断，不等于「转换后一定更优」——显式栈版本代码更繁琐、可读性下降，有些递归（如树的遍历）递归写法反而更清晰；转换的代价与收益要分开评价。

**考点：** 递归与迭代、调用栈、图灵等价
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `贪心算法总能得到全局最优解。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

贪心算法每步只取当前看起来最优的选择，局部最优不保证全局最优。经典反例：

- **找零钱**：面值 1、3、4 元，凑 6 元。贪心先取 4，剩 2 只能取两个 1，共 3 枚；最优是 3+3，共 2 枚。
- **0-1 背包**：按单位价值贪心会优先拿单价最高的物品，可能因容量浪费而错过更优组合。

因此"贪心算法总能得到全局最优解"是错的。贪心要正确，必须证明问题具备**贪心选择性质**和**最优子结构**（如最小生成树、Dijkstra）。

**易错提醒：** 贪心求局部最优，动态规划求全局最优（在满足最优子结构时）。两者的分水岭就是"局部最优能否推出全局最优"。

**考点：** 贪心算法的适用范围与反例。`,
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
