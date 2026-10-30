// 2025年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6
1 2 1 3 2 3`, output: `2` }
      ],
      question: `
# [GESP202512 五级] 数字移动

## 题目描述

小 A 有一个包含 $N$ 个正整数的序列 $A=\\{A_1,A_2,\\cdots,A_N\\}$，序列 $A$ 恰好包含 $\\frac{N}{2}$ 对不同的正整数。形式化地，对于任意 $1 \\le i \\le N$，存在唯一一个 $j$ 满足 $1\\le j \\le N, i\\neq j, A_i=A_j$。

小 A 希望每对相同的数字在序列中相邻，为了实现这一目的，小 A 每次操作会选择任意 $i(1\\le i\\le N)$，将当前序列的第 $i$ 个数字移动到任意位置，并花费对应数字的体力。

例如，假设序列 $A=\\{1,2,1,3,2,3\\}$，小 A 可以选择 $i=2$，将 $A_2=2$ 移动到 $A_3=1$ 的后面，此时序列变为 $\\{1,1,2,3,2,3\\}$，耗费 $2$ 点体力。小 A 也可以选择 $i=3$，将 $A_3=1$ 移动到 $A_2=2$ 的前面，此时序列变为 $\\{1,1,2,3,2,3\\}$，花费 $1$ 点体力。

小 A 可以执行任意次操作，但他希望自己每次花费的体力尽可能小。小 A 希望你能帮他计算出一个最小的 $x$，使得他能够在每次花费的体力均不超过 $x$ 的情况下令每对相同的数字在序列中相邻。

## 输入格式

第一行一个正整数 $N$，代表序列长度，保证 $N$ 为偶数。

第二行包含 $N$ 个正整数 $A_1,A_2,\\ldots,A_N$，代表序列 $A$。且对于任意 $1\\le i\\le N$，存在唯一一个 $j$ 满足 $1\\le j\\le N,i\\neq j,A_i=A_j$。

数据保证小 A 至少需要执行一次操作。

## 输出格式

输出一行，代表满足要求的 $x$ 的最小值。
`,
      score: 25,
      explanation: `**解析：**
      二分答案 x。把所有大于 x 的数按原顺序保留下来：由于这些数无法被移动，所以若最终能两两相邻，它们在保留序列中必须恰好按相邻成对出现。检验该条件即可。

      **考点：** 二分答案、贪心
      `,
      tags: ["编程题", "二分答案", "贪心"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\nconst int N = 100010;\nint a[N];\nint b[N];\nint pos;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 0; i < n; i++) cin >> a[i];\n    int left = 1, right = 1e6, ans = 1e6;\n    while(left <= right){\n        int mid = (left+right) / 2;\n        bool possible = true;\n        pos = 0;\n        for(int i = 0; i < n; i++) {\n            if(a[i] > mid) b[pos++] = a[i];\n        }\n        for(int i = 0; i < pos; i += 2){\n            if(b[i] != b[i+1]) {\n                possible = false;\n                break;\n            }\n        }\n        if(possible){\n            ans = mid;\n            right = mid-1;\n        } else {\n            left = mid+1;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
10 6 35 105 42`, output: `8` }
      ],
      question: `
# [GESP202512 五级] 相等序列

## 题目描述

小 A 有一个包含 $N$ 个正整数的序列 $A=\\{A_1,A_2,\\ldots,A_N\\}$。小 A 每次可以花费 $1$ 个金币执行以下任意一种操作：

- 选择序列中一个正整数 $A_i$（$1\\le i\\le N$），将 $A_i$ 变为 $A_i\\times P$，$P$ 为任意质数；
- 选择序列中一个正整数 $A_i$（$1\\le i\\le N$），将 $A_i$ 变为 $\\frac{A_i}{P}$，$P$ 为任意质数，要求 $A_i$ 是 $P$ 的倍数。

小 A 想请你帮他计算出令序列中所有整数都相同，最少需要花费多少金币。

## 输入格式

第一行一个正整数 $N$，含义如题面所示。

第二行包含 $N$ 个正整数 $A_1,A_2,\\ldots,A_N$，代表序列 $A$。

## 输出格式

输出一行，代表最少需要花费的金币数量。
`,
      score: 25,
      explanation: `**解析：**
      把每个数进行质因数分解。对每个质数单独考虑其指数序列，乘除一次相当于指数加减 1。要让总代价最小，目标指数应取该质数在所有数中的指数中位数；最后把各质数的代价累加即可。

      **考点：** 数论、质因数分解、中位数
      `,
      tags: ["编程题", "数论", "质因数分解", "中位数"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\nconst int N = 100010;\nint num[N][20];\nint n, a[N];\nvoid calc_prime_factor(int x){\n    for(int i = 2; i * i <= x; i++){\n        if(x % i == 0){\n            int cnt = 0;\n            while(x % i == 0){\n                x /= i;\n                cnt++;\n            }\n            num[i][cnt]++;\n        }\n    }\n    if(x > 1) num[x][1]++;\n}\nint main(){\n    scanf(\"%d\", &n);\n    for(int i = 1; i <= n; i++){\n        scanf(\"%d\", &a[i]);\n        calc_prime_factor(a[i]);\n    }\n    long long ans = 0;\n    for(int i = 2; i < 100001; i++){\n        int pos = 0;\n        for(int j = 0; j < 20; j++) pos += num[i][j];\n        num[i][0] = n-pos;\n        int median_exponent = 0;\n        pos = 0;\n        for(int j = 0; j < 20; j++){\n            pos += num[i][j];\n            if(pos * 2 >= n){\n                median_exponent = j;\n                break;\n            }\n        }\n        for(int j = 0; j < 20; j++) ans += 1ll * num[i][j] * abs(j-median_exponent);\n    }\n    printf(\"%lld\\n\", ans);\n}\n",
      answer: '',
    }
];

export const paperData = {
    id: '2025-12-l5',
    title: '2025年12月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `对如下定义的循环单链表，横线处填写（ ）。`,
            options: [`while (p != nullptr) {
    cout << p->data << " ";
    p = p->next;
}`, `while (p->next != nullptr) {
    cout << p->data << " ";
    p = p->next;
}`, `do {
    cout << p->data << " ";
    p = p->next;
} while (p != head);`, `for (; p; p = p->next) {
    cout << p->data << " ";
}`],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
这是循环单链表，尾结点的 \`next\` 指回 \`head\`，链上不存在 \`nullptr\`。因此遍历必须用「先执行、后判断」的 \`do...while\`，走到 \`p == head\` 时停，恰好走完一圈。

- **A \`while (p != nullptr)\`**：循环链表里 \`p\` 永远不会变成 \`nullptr\`，判断恒真，死循环。
- **B \`while (p->next != nullptr)\`**：同样等不到 \`nullptr\`，死循环。
- **C \`do...while (p != head)\`**：先输出当前结点再后移，回到 \`head\` 退出，只走一圈，正确。
- **D \`for (; p; p = p->next)\`**：\`p\` 恒为非空指针，条件恒真，死循环。

**考点：** 循环单链表的遍历`,
            sourceVerified: true,
            sourcePage: 1,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: `区块链技术是比特币的基础。在区块链中，每个区块指向前一个区块，构成链式列表，新区块只能接在链尾，不允许在中间插入或删除。下面代码实现插入区块添加函数，则横线处填写（ ）。`,
            options: [`Block* newBlock = new Block(tail->index + 1, data, tail);
tail = newBlock->prev;`, `Block* newBlock = new Block(tail->index + 1, data, tail);
tail = newBlock;`, `Block* newBlock = new Block(tail->index + 1, data, tail->prev);
tail = newBlock;`, `Block* newBlock = new Block(tail->index + 1, data, tail->prev);
tail = newBlock->prev;`],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
\`Blockchain\` 只用 \`tail\` 一个指针记住链尾，新区块要挂在当前 \`tail\` 之后，并把 \`tail\` 前移到新结点。新块的 \`prev\` 必须指向「旧的 tail」，所以构造时传 \`tail\` 而不是 \`tail->prev\`；插入完成后执行 \`tail = newBlock\`。

- **A** \`prev\` 传对了，但 \`tail = newBlock->prev\` 把链尾又退回了旧结点，新区块等于没挂上。
- **B** \`prev\` 指向旧 \`tail\`，再把 \`tail\` 前移到新块，正确。
- **C** \`prev\` 传成 \`tail->prev\`，跳过了原来的链尾，链断了；\`tail = newBlock\` 也补不回来。
- **D** \`prev\` 与 \`tail\` 双重错误，链尾直接退到倒数第二个块。

**考点：** 单链表的尾插与指针更新`,
            sourceVerified: true,
            sourcePage: 2,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: `下面关于单链表和双链表的描述中，正确的是（ ）。`,
            options: [
                "双链表删除指定结点通常是 $O(N)$，单链表也是 $O(N)$。",
                "双链表删除指定结点通常是 $O(1)$，单链表也是 $O(1)$。",
                "双链表删除指定结点通常是 $O(1)$，单链表若需先找前驱通常是 $O(N)$。",
                "双链表删除指定结点通常是 $O(N)$，单链表若已知前驱则是 $O(1)$。",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
- **A 错误：** 双（单）链表「删除指定结点」在**已持有该结点指针**的前提下：双链表 O(1)（前后指针都在手边），单链表 O(N)（要回头找前驱）。说双链表删除也是 O(N) 不对。
- **B 错误：** 单链表删除指定结点必须先遍历找前驱 O(N)，说「单链表也是 O(1)」不对。
- **C 正确：** 双链表结点自带 prev 指针，删除时 \`p->prev->next = p->next; p->next->prev = p->prev; delete p;\` 是 O(1)；单链表只有 next，定位前驱要从头遍历，通常是 O(N)。
- **D 错误：** 把两者的复杂度恰好说反了。

**易错点：** 复杂度结论依赖于「是否已知前驱/是否持有结点指针」这个前提；若是「按值删除」（先查找再删），两者都是 O(N)。

**考点：** 单链表与双链表、时间复杂度
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
            question: `假设我们有两个数 a = 38 和 b = 14，它们对模 m 同余，即 $a \\equiv b \\pmod{m}$。以下哪个值不可能是 m？`,
            options: ["3", "4", "6", "9"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

**解析：**
$a \\equiv b \\pmod{m}$ 的定义是 $m \\mid (a - b)$，即 $m$ 能整除两数之差。本题 $a = 38$、$b = 14$，$a - b = 24$，所以能当模数 $m$ 的值必须能整除 24。

- **A 3**：$24 \\div 3 = 8$，能整除，$38 \\equiv 14 \\pmod{3}$ 成立。
- **B 4**：$24 \\div 4 = 6$，能整除，成立。
- **C 6**：$24 \\div 6 = 4$，能整除，成立。
- **D 9**：$24 \\div 9 = 2 \\cdots 6$，不能整除，所以 $m$ 不可能是 9。

**考点：** 同余的定义与整除判定`,
            sourceVerified: true,
            sourcePage: 3,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: `下面代码实现了欧几里得算法。下面有关说法，错误的是（ ）。`,
            options: ["gcd1() 实现为递归方式。", "gcd2() 实现为迭代方式。", "当 a 较大时，gcd1() 实现会多次调用自身，需要较多额外的辅助空间。", "当 a 较大时，gcd1() 的实现比 gcd2() 执行效率更高。"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

**解析：**
\`gcd1()\` 是递归写法，\`gcd2()\` 用 \`while\` 循环迭代，两者算法相同（辗转相除），时间复杂度都是 $O(\\log \\min(a,b))$。

- **A** 正确：\`gcd1()\` 在 \`return\` 里再次调用自己，是递归。
- **B** 正确：\`gcd2()\` 用 \`while\` 反复更新 \`a\`、\`b\`，是迭代。
- **C** 正确：每层递归都要压栈保存返回地址和局部变量，辅助空间为 $O(\\log \\min(a,b))$，比迭代多。
- **D** 错误：递归有函数调用开销（压栈、传参、返回），实际执行效率通常**低于**迭代，不会更高。本题选错误项，故答案为 D。

**考点：** 递归与迭代的对比`,
            sourceVerified: true,
            sourcePage: 4,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: `唯一分解定理描述的内容是（ ）。`,
            options: [
                "任何正整数都可以表示为两个素数的和。",
                "任何大于 1 的合数都可以唯一分解为有限个质数的乘积。",
                "两个正整数的最大公约数总是等于它们的最小公倍数除以它们的乘积。",
                "所有素数都是奇数。",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
唯一分解定理（算术基本定理）：任何大于 1 的合数都可以**唯一地**分解为有限个质数的乘积（不计质数顺序），如 12 = 2×2×3。
- **A 错误：** 素数之和是哥德巴赫猜想的研究对象（且至今只是猜想，还只对偶数成立），与唯一分解定理无关。
- **B 正确：** 完整表述定理内容：对象（大于 1 的合数，含素数本身 p = p¹）、形式（有限个质数乘积）、唯一性。
- **C 错误：** gcd(a,b) × lcm(a,b) = a × b，故 lcm = a×b/gcd——C 把关系写反（说 gcd = lcm/乘积），是错误命题。
- **D 错误：** 2 是素数且是偶数，「所有素数都是奇数」不成立。

**易错点：** 定理的关键词是「唯一」；同时记住 gcd×lcm=a×b 这个恒等式的正确形式。

**考点：** 唯一分解定理、数论基础
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
            question: `下述代码实现素数表的线性筛法，筛选出所有小于等于 n 的素数，则横线上应填的代码是（ ）。\n\n\`\`\`cpp\nvector<int> linear_sieve(int n) {\n    vector<bool> is_prime(n + 1, true);\n    vector<int> primes;\n    is_prime[0] = is_prime[1] = 0; // 0和1两个数特殊处理\n    for (int i = 2; i <= n; ++i) {\n        if (is_prime[i]) {\n            primes.push_back(i);\n        }\n        ________________________________ {    // 在此处填入代码\n            is_prime[i * primes[j]] = 0;\n            if (i % primes[j] == 0)\n                break;\n        }\n    }\n    return primes;\n}\n\`\`\``,
            options: [
                "for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)",
                "for(int j = $sqrt{n}$; j <= n && i * primes[j] <= n; j++)",
                "for (int j = 1; j <= $sqrt{n}$; j++)",
                "for(int j = 1; j < n && i * primes[j] <= n; j++)",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
线性筛的内层循环用已筛出的素数 primes[j] 去标记合数 i * primes[j]。
- **A 正确：** \`j\` 从 0 遍历 primes 数组，两个约束缺一不可：\`j < primes.size()\` 防数组越界，\`i * primes[j] <= n\` 防标记超出筛选范围。这是唯一同时满足两个安全条件的写法。
- **B 错误：** \`j = sqrt(n)\` 起点毫无意义（j 是 primes 的下标不是数值），而且起跳位置早已超出大部分素数下标。
- **C 错误：** \`j\` 从 1 开始漏掉 primes[0]（第一个素数 2），且没有 \`i * primes[j] <= n\` 的越界保护，会访问数组界外。
- **D 错误：** \`j\` 从 1 开始同样漏掉 2；虽然有越界保护，但最小质因子 2 永远不参与标记，破坏「每个合数被最小质因子筛一次」的机制，复杂度退化为埃氏筛型。

**易错点：** 线性筛内层的标准写法是 \`for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)\`，配合体内 \`if (i % primes[j] == 0) break;\`——下标从 0 起，双重保护。

**考点：** 线性筛、素数筛法实现
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
            question: `下列关于排序的说法，正确的是（ ）。`,
            options: [
                "快速排序是稳定排序",
                "归并排序通常是稳定的",
                "插入排序是不稳定排序",
                "冒泡排序不是原地排序",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
- **A 错误：** 快速排序不稳定——partition 中远距离交换会打乱相等元素的相对次序（如 5a, 5b 中基准交换后 5b 跑到 5a 前面）。
- **B 正确：** 归并排序通常是稳定的：合并时左半元素 ≤ 右半时优先取左（\`nums[i] <= nums[j]\` 取左），相等元素相对次序得以保留。
- **C 错误：** 插入排序是**稳定**的——插入时遇到相等元素停在它后面，不会跨越相等元素。
- **D 错误：** 冒泡排序是**原地**排序，只用 O(1) 辅助空间（相邻交换），说它不是原地不对。

**易错点：** 常见稳定排序：插入、冒泡、归并、计数；不稳定：选择、希尔、快排、堆排。记忆口诀「快些选堆不稳定」。

**考点：** 排序稳定性、原地排序
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
            question: `下面代码实现了归并排序。下述关于归并排序的说法中，不正确的是（ ）。`,
            options: ["归并排序的平均复杂度是 $O(n\\log n)$。", "归并排序需要 $O(n)$ 的额外空间。", "归并排序在最坏情况的时间复杂度是 $O(n^2)$。", "归并排序适合大规模数据。"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
归并排序固定把序列二分到单元素再两两合并，层数为 $\\log n$，每层合并总代价 $O(n)$。

- **A** 正确：平均复杂度 $O(n\\log n)$。
- **B** 正确：合并时需要长度为 $n$ 的临时数组，额外空间 $O(n)$。
- **C** 错误：最坏情况仍是 $O(n\\log n)$，不退化到 $O(n^2)$。这正是归并排序相对快排的优势。
- **D** 正确：复杂度稳定且有外部排序版本，适合大规模数据。

**考点：** 归并排序的复杂度与空间开销`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: `下述 C++ 代码实现了快速排序算法，最坏情况的时间复杂度是（ ）。`,
            options: ["$O(n)$", "$O(\\log n)$", "$O(n^2)$", "$O(n\\log n)$"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
本题代码取首元素 \`arr[low]\` 作枢轴。当数组已经有序（或全部元素相等）时，每次划分只能分出一个元素，递归深度退化为 $n$，总比较次数约 $n + (n-1) + \\cdots + 1 = O(n^2)$。

- **A** $O(n)$：只在每层都均分且只走一支时才可能，快排每层要处理两支，达不到。
- **B** $O(\\log n)$：这是最好情况下的递归**深度**，不是总时间复杂度。
- **C** $O(n^2)$：有序输入 + 固定首元素枢轴，最坏情况，正确。
- **D** $O(n\\log n)$：平均情况，不是最坏情况。

**考点：** 快速排序的最坏时间复杂度`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: `下面代码尝试在有序数组中查找第一个大于等于 x 的元素位置。如果没有大于等于 x 的元素，返回 arr.size()。以下说法正确的是（ ）。\n\n\`\`\`cpp\nint lower_bound(vector<int>& arr, int x) {\n    int l = 0, r = arr.size();\n    while (l < r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] >= x) r = mid;\n        else l = mid + 1;\n    }\n    return l;\n}\n\`\`\``,
            options: [
                "上述代码逻辑正确",
                "上述代码逻辑错误，while 循环条件应该用 l <= r",
                "上述代码逻辑错误，mid 计算错误",
                "上述代码逻辑错误，边界条件不对",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
逐项核对 lower_bound 代码：
- 区间 [l, r) 左闭右开，\`while (l < r)\` 时区间至少有一个候选或已空；
- \`arr[mid] >= x\` 时 mid 可能就是答案，\`r = mid\` 收缩右界（保留 mid）；\`arr[mid] < x\` 时答案在 mid 右侧，\`l = mid + 1\`；
- \`mid = l + (r - l) / 2\` 下取整，配合 \`l = mid + 1\` 保证区间严格收缩，不死循环；
- 退出时 l == r：若存在第一个 ≥ x 的元素则 l 指向它，否则 l 一路右移到 arr.size()，恰好是题目要求的返回值。

逻辑完全正确，选 A。
- **B 错误：** 改成 \`l <= r\` 会与 \`r = mid\` 产生死循环（l==r==mid 时区间不收缩），反而引入错误。
- **C 错误：** \`l + (r - l) / 2\` 是防溢出的标准 mid 写法，没有错误。
- **D 错误：** 边界处理（r 初值取 size()、r = mid、l = mid+1、返回 l）正是左闭右开模板的标准形态，没有问题。

**易错点：** 求「第一个 ≥ x」用闭区间 [l, r) + \`r = mid\`；注意与「求最后一个 ≤ x」的模板（mid 上取整、l = mid）区分。

**考点：** 二分查找、lower_bound、左闭右开区间
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
            question: `小杨要把一根长度为 L 的木头切成 K 段，使得每段长度小于等于 x。已知每切一刀只能把一段木头分成两段，他用二分法找到满足条件的最小 x（x 为正整数），则横线处应填写（ ）。\n\n\`\`\`cpp\n// 判断：在不超过 K 次切割内，是否能让每段长度 <= x\nbool check(int L, int K, int x) {\n    int cuts = (L - 1) / x;\n    return cuts <= K;\n}\n// 二分查找最小可行的 x\nint binary_cut(int L, int K) {\n    int l = 1, r = L;\n    while (l < r) {\n        int mid = l + (r - l) / 2;\n        ________________________________     // 在此处填入代码\n    }\n    return l;\n}\n\`\`\``,
            options: [
                "if (check(L, K, mid)) r = mid; else l = mid+1;",
                "if (check(L, K, mid)) r = mid+1; else l = mid+1;",
                "if (check(L, K, mid)) r = mid+1; else l = mid-1;",
                "if (check(L, K, mid)) r = mid+1; else l = mid;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
二分求「最小可行 x」：check(mid) 为真说明 x = mid 已足够小可行，但可能还有更小的可行值，需收缩右界保留 mid。
- **A 正确：** \`if (check(L, K, mid)) r = mid; else l = mid + 1;\`——可行则 mid 可能是答案，r = mid；不可行说明 x 要更大，l = mid + 1。配合下取整 mid，区间严格收缩，收敛到最小可行 x。以 L=10, K=2 验证：x=4 时 cuts=(10-1)/4=2≤2 可行，x=3 时 cuts=3>2 不可行，答案 4，二分恰好收敛到 4。
- **B 错误：** \`r = mid + 1\` 把可能的答案 mid 排除掉，若答案恰为 mid 会被跳过，返回偏大值；且 r = mid+1 可能越出初始 [1, L] 的右界。
- **C 错误：** \`l = mid - 1\` 在「不可行」分支收缩不足——mid 不可行时 mid-1 更不可行（check 随 x 增大更易成立），应 l = mid + 1；l = mid - 1 配下取整 mid 还可能死循环。
- **D 错误：** \`l = mid\` 在不可行分支不前进，配合下取整 mid 当 r = l+1 时 mid == l，区间永不收缩，死循环。

**易错点：** 二分模板与「求最大可行值」互为镜像：求最小可行用 \`r = mid; l = mid + 1\`，求最大可行用 \`l = mid; r = mid - 1\`（配 mid 上取整）。

**考点：** 二分答案、最小可行值、check 函数
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
            question: `下面给出了阶乘计算的两种方式。以下说法正确的是（ ）。`,
            options: ["上面两种实现方式的时间复杂度相同，都为 $O(n)$", "上面两种实现方式的空间复杂度相同，都为 $O(n)$", "上面两种实现方式的空间复杂度相同，都为 $O(1)$", "函数 factorial1() 的时间复杂度为 $O(2^n)$，函数 factorial2() 的时间复杂度为 $O(n)$"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：**
\`factorial1()\` 递归 $n$ 层，每层做一次乘法；\`factorial2()\` 用 \`while\` 循环 $n-1$ 次，每次一次乘法。两者乘法次数都是 $n$ 量级，时间复杂度同为 $O(n)$。

- **A** 正确：时间复杂度相同，都是 $O(n)$。
- **B** 错误：递归版每层压栈，空间 $O(n)$；迭代版只用 \`acc\` 一个变量，空间 $O(1)$，不相同。
- **C** 错误：迭代版是 $O(1)$，但递归版不是，所以「相同」不成立。
- **D** 错误：\`factorial1()\` 每次只递归一次（不是两次分支），复杂度是 $O(n)$ 而非 $O(2^n)$；$O(2^n)$ 是朴素斐波那契那种双分支递归的特征。

**考点：** 递归与迭代的复杂度对比`,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: `给定有 n 个任务，每个任务有截止时间和利润，每个任务耗时 1 个时间单位，必须在截止时间前完成，且每个时间槽最多做 1 个任务。为了在规定时间内获得最大利润，可以采用贪心策略，即按利润从高到低排序，尽量安排，则横线处应填写（ ）。`,
            options: [`slot[t] = true;
totalProfit += task.profit;`, `slot[t] = false;
totalProfit += task.profit;`, `slot[t] = true;
totalProfit = task.profit;`, `slot[t] = false;
totalProfit = task.profit;`],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：**
\`slot[t]\` 记录时间槽 $t$ 是否已被占用，初始全为 \`false\`。外层 \`if (!slot[t])\` 已经筛出「槽 $t$ 还空着」，进入分支后要做两件事：把该槽标记为已占用，并把本任务的利润**累加**进总利润。

- **A** 标记占用 + 累加利润，两件事都对。
- **B** 把刚占用的槽又设回 \`false\`，同一槽会被反复使用，且利润只加不减会导致重复安排。
- **C** 标记对了，但 \`totalProfit = task.profit\` 是赋值不是累加，前面任务的利润全被覆盖。
- **D** 既不标记也不累加，两处都错。

**考点：** 贪心算法（带截止时间的任务调度）`,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-25",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: `下面代码实现了对两个数组表示的正整数的高精度加法（数组低位在前），则横线处应填写（ ）。`,
            options: [`c.push_back(carry / 10);
carry %= 10;`, `c.push_back(carry % 10);
carry /= 10;`, "c.push_back(carry % 10);", `c.push_back(carry);
carry /= 10;`],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
\`carry\` 在本轮循环里已经累加了 \`a[i]\`、\`b[i]\` 和上一轮的进位。进入结果数组时要存**个位**（\`carry % 10\`），并把**进位**留给下一轮（\`carry /= 10\`）。

- **A** 存了进位、留下个位，正好颠倒，结果全错。
- **B** 存个位、留进位，正确。
- **C** 只存个位却把进位丢掉，高位全部缺失。
- **D** 直接 push 整个 \`carry\`（可能是多位数），破坏「每一位一个元素」的约定。

**考点：** 高精度加法的进位处理`,
            sourceVerified: true,
            sourcePage: 0,
            reviewedBy: "本站校订",
            reviewedAt: "2026-10-25",
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-26",
            tags: ["客观题", "GESP7级"]
        },
        {
            id: 16,
            type: "judge",
            question: `数组和链表都是线性表。链表的优点是插入删除不需要移动元素，并且能随机查找。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
链表插入/删除只需修改指针指向，无需移动元素，这是它的优点；但链表在内存中不连续存储，访问第 i 个元素必须从头沿指针逐个走，不支持按下标随机查找（随机访问是数组的特性）。题干把「能随机查找」也算作链表优点，说法错误。

**考点：** 链表
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
            question: `假设函数 gcd() 函数能正确求两个正整数的最大公约数，则下面的 $\\text{lcm}(a, b)$ 函数能正确找到两个正整数 a 和 b 的最小公倍数。

\`\`\`cpp
int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}
\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确（√）**

**解析：**
最小公倍数与最大公约数满足 $\\mathrm{lcm}(a,b) \\times \\gcd(a,b) = a \\times b$，所以 $\\mathrm{lcm}(a,b) = a \\div \\gcd(a,b) \\times b$。该函数先整除再相乘，既保证了结果是整数，也避免了先乘后除时 $a \\times b$ 溢出的风险。

- 若写成 \`a * b / gcd(a, b)\`，当 $a$、$b$ 较大时乘积可能超出 \`long long\` 范围。
- 先算 \`a / gcd(a, b)\` 再乘 \`b\`，中间结果不会超过最终答案，更稳妥。

**考点：** 最大公约数与最小公倍数的关系`,
            sourceVerified: true,
            sourcePage: 0,
            reviewedBy: "本站校订",
            reviewedAt: "2026-10-25",
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-26",
            tags: ["客观题", "GESP7级"]
        },
        {
            id: 18,
            type: "judge",
            question: `在单链表中，已知指针 p 指向要删除的结点（非尾结点），想在 O(1) 删除 p，可行做法是用 p->next 覆盖 p 的值与 next，然后删除 p->next。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确（√）**

**解析：**
单链表删除结点通常要找前驱（$O(n)$），但本题只要「逻辑上删掉 p」而不要求释放 p 本身：把 \`p->next\` 的数据域和 \`next\` 指针复制进 \`p\`，再删掉原来的 \`p->next\` 结点，效果等价于删除了 p，且只花 $O(1)$。

- 前提是 p **不是尾结点**（尾结点没有后继可供复制，仍需遍历找前驱）。
- 该技巧被称为「复制后继再删后继」，面试与竞赛中常见。

**考点：** 单链表删除结点的技巧`,
            sourceVerified: true,
            sourcePage: 0,
            reviewedBy: "本站校订",
            reviewedAt: "2026-10-25",
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-26",
            tags: ["客观题", "GESP7级"]
        },
        {
            id: 19,
            type: "judge",
            question: `在求解所有不大于 n 的素数时，线性筛法（欧拉筛）都应当优先于埃氏筛法使用，因为线性筛法的时间复杂度为 $O(N)$，低于埃氏筛法的 $O(n\\log\\log n)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误（×）**

**解析：**
线性筛法的理论复杂度 $O(N)$ 确实优于埃氏筛的 $O(n\\log\\log n)$，但「都应当优先使用」过于绝对：

- 线性筛代码更复杂，要维护 \`primes\` 数组并保证每个合数只被最小质因子筛掉，常数更大、更难写对。
- 在 $n$ 不大（如 $10^6$ 以内）或只筛一次的场景，埃氏筛更简单，实际耗时差距很小。
- 若内存紧张，埃氏筛可以用位压缩等手段做得更省。

理论复杂度低不等于所有场景都更优，「都应当优先」不成立。

**考点：** 线性筛与埃氏筛的取舍`,
            sourceVerified: true,
            sourcePage: 0,
            reviewedBy: "本站校订",
            reviewedAt: "2026-10-25",
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-26",
            tags: ["客观题", "GESP7级"]
        },
        {
            id: 20,
            type: "judge",
            question: `二分查找仅适用于有序数据。若输入数据无序，当仅进行一次查找时，为了使用二分而排序通常不划算。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
两个分句都符合算法常识：
- 「二分查找仅适用于有序数据」——二分依赖单调性来判定舍弃哪一半，无序则判定失效，正确；
- 「仅一次查找时先排序再二分不划算」——排序至少 O(n log n)，一次二分只省 O(n)→O(log n) 的比较；数据量 n 时总代价 O(n log n) 反而高于直接顺序扫描的 O(n)，正确。

只有当**同一批数据要查找多次**（q 次查询，排序成本被摊薄，总代价 O((n+q) log n) < q·n）时，先排序才划算。

**易混概念：** 这是「预处理成本摊销」的典型权衡；二分价值的根源在于比较结果的可复用性（有序性不变）。

**考点：** 二分查找适用条件、算法权衡
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
            question: `通过在数组的第一个、最中间和最后一个这 3 个数据中选择中间值作为枢轴（比较基准），快速排序算法可降低落入最坏情况的概率。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
快排最坏情况的典型触发条件是「每次划分极度不平衡」——对已排序（正序或逆序）数组以首元素为基准时，每轮划分成 0 和 n-1 两段，退化到 O(n²)。

三数取中（首、中、尾选中间值）使「基准恰好是数组最值」的概率大幅下降：即使数组已经有序，取到的基准也是中位数，划分接近对半。这把最坏情况的触发从「确定性输入」变成「需要特殊构造的对抗性输入」，实际数据下落入 O(n²) 的概率显著降低，期望复杂度仍为 O(n log n)。

更彻底的做法是**随机选取基准**（随机化快排），从概率上保证任何固定输入都难以稳定触发最坏情况。

**易混概念：** 三数取中只「降低概率」，不「消除」最坏情况——理论上仍存在让每次取中都失手的构造输入；它不能改变最坏 O(n²) 的上界。

**考点：** 快速排序、三数取中、最坏情况分析
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
            question: `贪心算法在每一步都做出当前看来最优的局部选择，并且一旦做出选择就不再回溯；而分治算法将问题分解 为若干子问题分别求解，再将子问题的解合并得到原问题的解。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：正确（√）**

**解析：**
题干对两种算法策略的概括都准确：
- **贪心**：每步选当前局部最优解，且**不回溯**——一旦选定就不再撤销（如区间调度按结束时间排序后依次选择）；它的正确性需要问题具备贪心选择性质与最优子结构，并非对所有问题都能得到全局最优。
- **分治**：把问题分解为若干**独立子问题**分别求解，再把子问题的解**合并**成原问题的解（如归并排序的分+合、二分查找的分+直接判定）。分治的子问题通常不重叠。

题干完整覆盖了两个策略的核心特征（贪心的「局部最优+不回溯」、分治的「分解-求解-合并」），说法正确。

**易混概念：** 与动态规划对比：DP 的子问题**重叠**且会记录已解结果；分治子问题独立不重复；贪心不做全局权衡。三者常放在一起辨析。

**考点：** 贪心算法、分治算法、算法策略比较
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `以下 fib 函数计算第 n 项斐波那契数（fib(0)=0, fib(1)=1），其时间复杂度为 $O(n)$。

\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误（×）**

**解析：**
该函数是朴素双分支递归：每次调用产生两次子调用，调用树的节点数随 $n$ 指数增长，时间复杂度是 $O(2^n)$（更精确地说是 $O(\\varphi^n)$，$\\varphi \\approx 1.618$），不是 $O(n)$。

- 递归没有记忆化，\`fib(n-2)\` 等子问题被重复计算海量次数。
- 想达到 $O(n)$ 需要加备忘录或改用迭代。

**考点：** 朴素递归斐波那契的时间复杂度`,
            sourceVerified: true,
            sourcePage: 0,
            reviewedBy: "本站校订",
            reviewedAt: "2026-10-25",
            sourceVerified: true,
            sourcePage: 10,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-26",
            tags: ["客观题", "GESP7级"]
        },
        {
            id: 24,
            type: "judge",
            question: `递归函数一定要有终止条件，否则可能会造成栈溢出。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
递归依靠终止条件停止展开：缺少终止条件（或终止条件永远无法到达）时，函数会无限递归，每层调用都在调用栈上压入栈帧，最终耗尽栈空间导致栈溢出（stack overflow）。

**考点：** 递归
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
            question: `使用贪心算法解决问题时，通过对每一步求局部最优解，最终一定能找到全局最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误（×）**

**解析：**
贪心算法只在满足**贪心选择性质**和**最优子结构**的问题上保证得到全局最优（如最小生成树、区间调度）。对不满足这些性质的问题（如一般背包、TSP），局部最优的累积可能离全局最优很远。

- 经典反例：硬币面额 {1, 3, 4} 凑 6 元，贪心先取 4 再取两个 1 共 3 枚，而最优解是 3+3 两枚。
- 动态规划通过枚举子问题状态保证最优，贪心不回溯、不做这种保证。

**考点：** 贪心算法的适用条件`,
            sourceVerified: true,
            sourcePage: 0,
            reviewedBy: "本站校订",
            reviewedAt: "2026-10-25",
            sourceVerified: true,
            sourcePage: 10,
            reviewedBy: "AI对照官方PDF校订",
            reviewedAt: "2026-10-26",
            tags: ["客观题", "GESP7级"]
        },
        ...programmingQuestions
    ]
};
