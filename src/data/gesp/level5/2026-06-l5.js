// 2026年6月 GESP C++ 五级真题 (第14次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照官方 PDF 镜像转录。
// 客观题答案以原卷答案表为唯一证据：
//   单选题答案表在第 1 页：B C A B A B C C C B B B A C A
//   判断题答案表在第 7 页：√ × √ √ √ × × × √ ×
// 判断题答案表为矢量红色 √/× 记号，已按 200dpi 渲染逐格读取并全部逻辑复核。

export const paperData = {
  id: '2026-06-l5',
  title: '2026年6月 GESP C++ 五级真题',
  level: 5,
  year: 2026,
  month: 6,
  session: 14,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B46%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    type: 'official',
    notes: '全卷依据官方 PDF 镜像逐题转录；Q13 调用次数等缺失数字均渲染核对。',
  },
  verification: {
    status: 'partial',
    reviewedBy: '本站校订',
    reviewedAt: '2026-10-30',
    scope: '单选答案串 BCABA BCCCB BBBACA 与判断答案串 √×√√√×××√× 按官方答案表转录，编程题样例与数据范围已渲染核对。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `假设 head != nullptr，下面是实现单向循环链表在头节点后插入新节点的代码，横线处应填入（ ）。
\`\`\`cpp
struct Node {
    int val;
    Node* next;
};
void insertAfterHead(Node* head, int x) {
    Node* newNode = new Node;
    newNode->val = x;
    ______________________ // 在此处填入代码
}
\`\`\``,
      options: [
        `\`\`\`cpp
newNode->next = head;
head->next = newNode;
\`\`\``,
        `\`\`\`cpp
newNode->next = head->next;
head->next = newNode;
\`\`\``,
        `\`\`\`cpp
head->next = newNode;
newNode->next = head->next;
\`\`\``,
        `\`\`\`cpp
newNode->next = head->next;
head = newNode;
\`\`\``,
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
在头节点后插入新节点，必须先让 newNode 接上 head 原来的后继，再修改 head->next：

\`\`\`cpp
newNode->next = head->next;  // 先接管 head 的原后继
head->next = newNode;        // 再让 head 指向新节点
\`\`\`

**选项分析：**
- **A**：\`newNode->next = head;\` 让新节点指回头节点，随后 \`head->next = newNode;\` 会覆盖掉 head 原来的后继——原来 head 后面的整条链全部丢失，环被破坏。
- **C**：先执行 \`head->next = newNode;\` 后，head 原来的后继已丢失，第二句 \`newNode->next = head->next;\` 只会让 newNode 指向自己，形成自环。
- **D**：只是把局部指针变量 head 改指向新节点，既没接入链表，函数返回后原链表也没变。

**考点：** 链表、指针操作`,
      tags: ['链表', '指针与引用'],
    },
    {
      id: 2,
      type: 'single',
      question: `下面代码遍历并输出一个循环单链表，其中 head 指向链表的第一个节点，横线处应填入的是（ ）。
\`\`\`cpp
struct Node {
    int val;
    Node* next;
};
void printList(Node* head) {
    if (head == nullptr) return;
    Node* p = head;
    _______________________; // 在此处填入代码
    cout << endl;
}
\`\`\``,
      options: [
        `\`\`\`cpp
while (p != nullptr) {
    cout << p->val << " ";
    p = p->next;
}
\`\`\``,
        `\`\`\`cpp
while (p->next != nullptr) {
    cout << p->val << " ";
    p = p->next;
}
\`\`\``,
        `\`\`\`cpp
do {
    cout << p->val << " ";
    p = p->next;
} while (p != head);
\`\`\``,
        `\`\`\`cpp
for (; p; p = p->next) {
    cout << p->val << " ";
}
\`\`\``,
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
循环单链表的尾节点 next 指回头节点，不会出现 nullptr，所以终止条件是"绕回起点"：先用 do-while 输出当前节点再前进，直到 p 重新等于 head 停止。每个节点恰好输出一次。

**选项分析：**
- **A**：\`p != nullptr\` 在循环链表中永远为真，死循环。
- **B**：\`p->next != nullptr\` 同样永假不了——尾节点 next 指回头节点而非 nullptr，也是死循环。
- **D**：与 A 相同，\`p\` 非 nullptr 恒成立，死循环。

**易错点：** 若把 do-while 换成 while (p != head)，第一个节点还没输出就退出了，会漏掉整条链。

**考点：** 循环链表、遍历`,
      tags: ['链表'],
    },
    {
      id: 3,
      type: 'single',
      question: `双链表结点定义如下，若要删除双链表中的中间结点（非首尾节点）p，下面写法正确的是（ ）。
\`\`\`cpp
struct Node {
    int val;
    Node* prev;
    Node* next;
};
\`\`\``,
      options: [
        `\`\`\`cpp
p->prev->next = p->next;
p->next->prev = p->prev;
delete p;
\`\`\``,
        `\`\`\`cpp
p->next->prev = p->next;
p->prev->next = p->prev;
delete p;
\`\`\``,
        `\`\`\`cpp
p->prev = p->next;
p->next = p->prev;
delete p;
\`\`\``,
        `\`\`\`cpp
p->next->next = p->prev;
p->prev->prev = p->next;
delete p;
\`\`\``,
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
删除中间结点 p，就是让 p 的前驱与后继直接相连：
1. \`p->prev->next = p->next;\`：前驱的 next 跳过 p 指向后继；
2. \`p->next->prev = p->prev;\`：后继的 prev 跳过 p 指向前驱；
3. \`delete p;\` 释放内存。

**选项分析：**
- **B**：\`p->next->prev = p->next;\` 让后继的 prev 指向自己，链没接对。
- **C**：只是修改 p 自身的两个指针，前后驱与 p 的连接原封不动，删掉 p 后链表断裂（悬空指针）。
- **D**：改的是 p 的前驱的前驱、后继的后继，完全接错了对象。

**考点：** 双链表、删除操作`,
      tags: ['链表', '指针与引用'],
    },
    {
      id: 4,
      type: 'single',
      question: `使用如下欧几里得算法求 gcd(105, 45) 时，函数 gcd(a, b) 的递归调用序列正确的是（ ）。
\`\`\`cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
\`\`\``,
      options: [
        'gcd(105, 45) -> gcd(45, 60) -> gcd(60, 15) -> gcd(15, 0)',
        'gcd(105, 45) -> gcd(45, 15) -> gcd(15, 0)',
        'gcd(105, 45) -> gcd(60, 45) -> gcd(15, 45)',
        'gcd(105, 45) -> gcd(15, 45) -> gcd(15, 0)',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
按 \`gcd(a, b) = gcd(b, a % b)\` 逐步展开：
1. \`gcd(105, 45)\`：105 % 45 = 15 → \`gcd(45, 15)\`
2. \`gcd(45, 15)\`：45 % 15 = 0 → \`gcd(15, 0)\`
3. \`gcd(15, 0)\`：b == 0，返回 15。

即序列为 \`gcd(105, 45) -> gcd(45, 15) -> gcd(15, 0)\`，gcd(105, 45) = 15。

**选项分析：**
- **A**：gcd(45, 60) 中 b=60 > a=45，不可能由合法递归产生（且 105%45=15 不是 60）。
- **C**：gcd(60, 45) 的两个参数与 a%b 的计算结果对不上。
- **D**：gcd(15, 45) 中第二个参数大于第一个，方向反了。

**考点：** 递归、欧几里得算法、数论`,
      tags: ['递推与递归', '数论'],
    },
    {
      id: 5,
      type: 'single',
      question: `下面代码实现线性筛（欧拉筛），以筛选出 n 以内的所有素数。横线处的代码应为（ ）。
\`\`\`cpp
vector<int> sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    vector<int> primes;
    if (n >= 0) is_prime[0] = false;
    if (n >= 1) is_prime[1] = false;
    for (int i = 2; i <= n; ++i) {
        if (is_prime[i]) {
            primes.push_back(i);
        }
        for (int j = 0; j < primes.size() && i * primes[j] <= n; j++) {
            is_prime[i * primes[j]] = false;
            if (________________) break; // 在此处填入代码
        }
    }
    return primes;
}
\`\`\``,
      options: [
        'i % primes[j] == 0',
        'primes[j] % i == 0',
        'i % primes[j] != 0',
        'i == primes[j]',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
线性筛的核心保证是**每个合数只被其最小质因数筛掉一次**。当 i 中已经含有 primes[j] 这个质因子（即 \`i % primes[j] == 0\`）时，若继续用更大的质数 primes[j+1] 去筛 \`i * primes[j+1]\`，那个合数的最小质因数仍是 primes[j]，会重复筛——所以此时必须 break。

**选项分析：**
- **B**：primes[j] % i == 0 通常不成立（primes[j] 是质数且一般小于 i），几乎每次都 break，筛法失效。
- **C**：条件取反，i 不含该质因子时反而提前 break，恰好筛不干净。
- **D**：i == primes[j] 只在 i 恰为质数时触发，起不到去重作用。

**考点：** 线性筛、素数、数论`,
      tags: ['数论', '素数'],
    },
    {
      id: 6,
      type: 'single',
      question: `下面关于埃氏筛法的说法正确的是（ ）。`,
      options: [
        '每个合数只会被筛掉一次',
        '从每个素数出发，把它的倍数标记为合数',
        '只能判断一个数是不是偶数',
        '不能求出素数表',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
埃氏筛的基本思想：从 2 开始，每遇到一个素数，就把它的所有倍数（一般从平方开始）标记为合数。全部标记完后未被标记的就是素数，同时也就得到了素数表。

**选项分析：**
- **A**：这是线性筛（欧拉筛）的性质。埃氏筛中例如 12 会被 2 和 3 各筛一次，存在重复标记。
- **C**：埃氏筛筛的是素数，与奇偶无关，能判断任意正整数的素性。
- **D**：埃氏筛正是常用的求素数表方法。

**考点：** 埃氏筛、素数、数论`,
      tags: ['数论', '素数'],
    },
    {
      id: 7,
      type: 'single',
      question: `下面代码实现了计算 x^n 的快速幂算法，该算法体现的编程思想是（ ）。
\`\`\`cpp
long long power(long long x, int n) {
    if (n == 0) return 1;
    long long res = power(x, n / 2);
    if (n % 2 == 0) return res * res;
    else return res * res * x;
}
\`\`\``,
      options: ['枚举', '贪心', '分治', '模拟'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
快速幂把 n 次连乘拆成"先算一半"：x^n = (x^(n/2))^2（n 为偶数）或再乘一个 x（n 为奇数）。大问题分解为规模减半的同类子问题，子问题解再合并——这正是**分治**：分（拆半）、治（递归求子幂）、合（平方）。时间复杂度从 O(n) 降到 O(log n)。

**选项分析：**
- **A 枚举**：逐个尝试所有可能，与减半递归不符。
- **B 贪心**：每步做局部最优选择，此处无"选择"过程。
- **D 模拟**：按题意逐步模拟过程，此处是问题分解而非模拟。

**考点：** 分治、快速幂、递归`,
      tags: ['分治', '递推与递归'],
    },
    {
      id: 8,
      type: 'single',
      question: `下面代码用于统计 n 中因子 2 出现了多少次。若 n = 40，输出是（ ）。
\`\`\`cpp
int n = 40;
int cnt = 0;
while (n % 2 == 0) {
    cnt++;
    n /= 2;
}
cout << cnt;
\`\`\``,
      options: ['1', '2', '3', '4'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
把 40 分解质因数：40 = 2³ × 5，所以因子 2 出现 3 次。逐步模拟：
1. 40 % 2 == 0 → cnt = 1，n = 20
2. 20 % 2 == 0 → cnt = 2，n = 10
3. 10 % 2 == 0 → cnt = 3，n = 5
4. 5 % 2 != 0，循环结束，输出 3。

**选项分析：**
- **A / B**：少算了若干次除 2，比如只除到 20 或 10 就停。
- **D**：多算一次，4 次除 2 会把 n 变成 2.5，不是整数，实际循环只能执行 3 次。

**考点：** 质因数分解、循环、数论`,
      tags: ['数论', '循环'],
    },
    {
      id: 9,
      type: 'single',
      question: `在一个有序数组中查找第一个大于或等于 x 的元素位置，横线处应填写（ ）。
\`\`\`cpp
int lowerBound(vector<int>& a, int x) {
    int l = 0, r = a.size();
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (a[mid] >= x) ________________; // 在此处填入代码
        else l = mid + 1;
    }
    return l;
}
\`\`\``,
      options: ['r = mid + 1', 'r = mid - 1', 'r = mid', 'l = mid'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
这是"找左边界"的二分模板：a[mid] >= x 说明 mid 可能是答案，但更靠左的位置也可能满足，所以**不能丢弃 mid**，令 \`r = mid\` 继续向左收缩；a[mid] < x 时答案只可能在右侧，令 \`l = mid + 1\`。循环结束时 l == r，即为第一个 >= x 的位置。

**选项分析：**
- **A** \`r = mid + 1\`：会把 mid 这个候选位置排除，可能跳过答案。
- **B** \`r = mid - 1\`：同样丢掉 mid，且可能造成 l > r 死角。
- **D** \`l = mid\`：在 a[mid] < x 分支外错误地右移左界，且 mid = l + (r-l)/2 向上取整时可能 l 不变，死循环。

**考点：** 二分查找、lower_bound`,
      tags: ['二分查找'],
    },
    {
      id: 10,
      type: 'single',
      question: `有若干根木头，长度存于 wood。每切一刀可以把一段木头分成两段。函数 check(wood, K, x) 返回：用不超过 K 刀，能否使所有木段长度都不超过 x。下面代码使用二分答案查找最小可行的 x，横线处应填（ ）。
\`\`\`cpp
int binary_cut(vector<int>& wood, int K) {
    int l = 1;
    int r = 0;
    for (int len : wood) r = max(r, len);
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (check(wood, K, mid))
            _________________; // 在此处填入代码
        else l = mid + 1;
    }
    return l;
}
\`\`\``,
      options: ['r = mid + 1', 'r = mid', 'l = mid', 'r = mid - 1'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
可行性随 x 单调：x 越大越容易满足（刀数需求单调不增），所以可以二分答案找**最小可行值**。check(mid) 为真时，mid 是可行解，但更小的值也许仍可行，因此保留 mid：\`r = mid\`；不可行则 \`l = mid + 1\`。结束时 l 即最小可行的 x。这与第 9 题 lowerBound 是同一套"找左边界"模板。

**选项分析：**
- **A / D**：把 mid 排除出搜索区间，若 mid 恰是最优解就会答错。
- **C** \`l = mid\`：可行时反而向右收缩，找到的是更大的 x，方向反了；且 mid 向下取整时可能死循环。

**考点：** 二分答案、单调性`,
      tags: ['二分查找', '分治'],
    },
    {
      id: 11,
      type: 'single',
      question: `下面代码段实现了快速排序的划分操作（以首元素为基准），横线处代码应填入（ ）。
\`\`\`cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[low];
    int i = low, j = high;
    while (i < j) {
        while (i < j && arr[j] >= pivot) j--;
        while (i < j && arr[i] <= pivot) i++;
        if (i < j) swap(arr[i], arr[j]);
    }
    __________________; // 在此处填入代码
    return i;
}
\`\`\``,
      options: [
        'swap(arr[low], arr[high])',
        'swap(arr[low], arr[i])',
        'swap(arr[i], arr[high])',
        'arr[i] = pivot',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
划分结束后 i == j，指向"最后一个不大于 pivot 的位置"（从右往左扫停止时 j 先停在 <= pivot 处）。此时应把基准元素从 arr[low] 换到这个交汇位置，使左边都 <= pivot、右边都 >= pivot，并返回基准的最终下标：\`swap(arr[low], arr[i])\`。

**选项分析：**
- **A** \`swap(arr[low], arr[high])\`：与区间端点交换，基准未必落在正确分界处。
- **C** \`swap(arr[i], arr[high])\`：把交汇位置与右端点交换，基准没归位，划分结果错。
- **D** \`arr[i] = pivot\`：直接赋值会覆盖 arr[i] 原来的值（且基准仍在 arr[low] 中被重复保留），数据丢失。

**考点：** 快速排序、划分操作`,
      tags: ['排序算法', '快速排序'],
    },
    {
      id: 12,
      type: 'single',
      question: `下面哪句话最符合归并排序的思想？（ ）`,
      options: [
        '每次选择最小元素放到前面',
        '将数组分成两半分别排序，再合并两个有序部分',
        '相邻元素两两交换',
        '从左到右把元素插入有序区',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
归并排序是典型的分治算法：不断把数组从中点一分为二，分别递归排序，再用 mergeArray 把两个有序子数组合并为一个有序数组。

**选项分析：**
- **A**：是选择排序的思想。
- **C**：相邻两两交换更接近冒泡排序。
- **D**：是插入排序的思想（把新元素插入前面已有序的区域）。

**考点：** 归并排序、分治`,
      tags: ['排序算法', '归并排序'],
    },
    {
      id: 13,
      type: 'single',
      question: `在对长度为 n（n ≥ 1）的数组进行归并排序的过程中，mergeArray 函数（合并两个有序子数组的操作）被调用的次数是（ ）。`,
      options: ['n - 1', 'log n', 'n log n', '2n'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
把递归调用画成一棵二叉树：每个叶子对应一个长度为 1 的区间（不再调用 mergeArray），每个内部节点对应一次 mergeArray 调用（合并两个孩子）。n 个叶子的满二叉树恰有 n - 1 个内部节点，所以 mergeArray 恰好被调用 **n - 1** 次。

**验证（n = 4）：** 递归树为 [0,1][2,3] 两层——先合并 2 次长度 2 的区间，再合并 1 次长度 4 的区间，共 3 = 4 - 1 次。

**选项分析：**
- **B** log n：是递归的层数，不是合并次数。
- **C** n log n：是总时间复杂度的量级，不是函数调用次数。
- **D** 2n：把叶子数与内部节点数混淆，内部节点是 n - 1。

**考点：** 归并排序、递归树、分治`,
      tags: ['归并排序', '分治', '时间复杂度'],
    },
    {
      id: 14,
      type: 'single',
      question: `小杨在学校义卖会上负责打包"零食盲盒"。每个盲盒重量不同，快递盒最多承重 limit 克，每个快递盒最多装两个盲盒。为了尽量少用快递盒，他采用如下策略：
（1）每次把最轻的盲盒和最重的盲盒尝试放在一起；
（2）如果两者重量之和不超过 limit，就一起装；
（3）否则，只能让最重的盲盒单独装一盒。
下面代码用于计算最少需要多少个快递盒，则横线处应填入的是（ ）。
\`\`\`cpp
int minBoxes(vector<int>& w, int limit) {
    sort(w.begin(), w.end());
    int l = 0, r = w.size() - 1;
    int boxes = 0;
    while (l <= r) {
        if (w[l] + w[r] <= limit) {
            __________; // 在此处填入代码
        } else {
            r--;
        }
        boxes++;
    }
    return boxes;
}
\`\`\``,
      options: [
        `\`\`\`cpp
l++;
\`\`\``,
        `\`\`\`cpp
r--;
\`\`\``,
        `\`\`\`cpp
l++;
r--;
\`\`\``,
        `\`\`\`cpp
boxes--;
\`\`\``,
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
最轻的 l 与最重的 r 能配对时，两盒一起装走，双指针同时内移：\`l++; r--;\`。随后 boxes++ 记录这一盒。不能配对时，最重的 r 只能单独装（r--），l 不动。

**选项分析：**
- **A** 只移动 l：最重的盲盒没有被"装箱"却被跳出了考虑范围，相当于凭空消失。
- **B** 只移动 r：最轻的盲盒还在区间里，下一轮会重复参与配对，导致多算盒子。
- **D** boxes--：装箱后不应减少计数，逻辑完全相反。

**考点：** 贪心、双指针、排序`,
      tags: ['贪心', '双指针'],
    },
    {
      id: 15,
      type: 'single',
      question: `高精度减法中，假设两个高精度数按低位在前存储，且已经保证被减数不小于减数。下面处理借位逻辑代码中横线处应填入（ ）。
\`\`\`cpp
if (a[i] < b[i]) {
    a[i + 1]--;
    ________________;
}
t = a[i] - b[i];
\`\`\``,
      options: [
        'a[i] += 10',
        'a[i] -= 10',
        'b[i] += 10',
        'a[i] = a[i+1] + 10',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
按低位在前逐位相减。当前位 a[i] < b[i] 时需要向高位借 1 位：高位 a[i+1] 减 1（借 1），本位加上进制的值（\`a[i] += 10\`），随后再做减法 t = a[i] - b[i] 就不会出负数。

**选项分析：**
- **B** \`a[i] -= 10\`：本位更小，减法结果错误。
- **C** \`b[i] += 10\`：被减数不够才借位，给减数加 10 方向反了。
- **D** \`a[i] = a[i+1] + 10\`：直接用高位的值覆盖本位，本位数字丢失，也不是借位的含义。

**考点：** 高精度运算、模拟`,
      tags: ['高精度', '模拟'],
    },
    {
      id: 16,
      type: 'judge',
      question: `数组的存储空间在物理上通常是连续的，而链表的结点可以存储在不连续的内存空间中。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
数组在内存中占用一段连续空间，依靠下标偏移随机访问；链表的每个结点单独分配，通过指针链接，各结点在内存中的位置可以互不相邻。这正是两者最本质的存储差异，也决定了数组支持 O(1) 随机访问、链表只支持顺序访问。`,
      tags: ['数组', '链表'],
    },
    {
      id: 17,
      type: 'judge',
      question: `带哨兵头尾节点的双向循环链表，在表头插入节点 p，以下四步操作无论什么顺序执行结果都正确。
\`\`\`cpp
① p->next = head->next;
② p->prev = head;
③ head->next->prev = p;
④ head->next = p;
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
四步操作之间存在依赖：③ 中 \`head->next->prev = p\` 里的 \`head->next\` 必须还是**原来的第一个结点**。若先执行 ④（\`head->next = p\`），再执行 ③ 就变成 \`p->prev = p\`，p 的 prev 指向自己，原首结点的 prev 链断裂。

正确顺序必须保证 ①、③ 都在 ④ 之前执行（② 与其他步无冲突）。因此"无论什么顺序都正确"的说法不成立。`,
      tags: ['链表', '指针与引用'],
    },
    {
      id: 18,
      type: 'judge',
      question: `对任意正整数 a、b，以下两种写法的 gcd 函数返回值完全相同。
\`\`\`cpp
int gcd1(int a, int b) {
    return b ? gcd1(b, a % b) : a;
}
int gcd2(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
两者是同一个欧几里得算法的递归与迭代版本。gcd1 在 b == 0 时返回 a；gcd2 的 while 循环在 b 变为 0 时结束并返回 a。每轮迭代都是 a、b = b、a % b，与递归调用的参数传递完全一致，所以对任意输入返回值相同。`,
      tags: ['递推与递归', '数论'],
    },
    {
      id: 19,
      type: 'judge',
      question: `在归并排序的合并操作中，如下代码片段可以正确地将两个已排序的子数组 L 和 R 合并回原数组 arr 中。
\`\`\`cpp
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
代码先把左右两个有序子数组复制到 L、R，再用双指针逐个比较取较小者写回 arr，最后把某个数组剩余部分整体追加。比较使用 \`<=\`，相同时优先取左半部分，还保证了排序的稳定性。各边界（n1、n2 的计算，k 从 left 开始）均正确，是标准的归并实现。`,
      tags: ['排序算法', '归并排序'],
    },
    {
      id: 20,
      type: 'judge',
      question: `分治法通常将一个规模较大的问题拆分为若干个规模较小、结构相似的子问题，分别求解后再合并子问题的结果。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
这正是分治法的定义：分（Divide）——把大问题拆成结构相同的子问题；治（Conquer）——递归求解子问题，子问题足够小时直接解；合（Combine）——把子问题的解合并成原问题的解。归并排序、快速排序、快速幂都是典型应用。`,
      tags: ['分治'],
    },
    {
      id: 21,
      type: 'judge',
      question: `贪心算法只要每一步选择当前最优解，就一定能得到全局最优解。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
贪心算法只保证每一步的局部最优，**不保证**全局最优——全局最优成立需要问题具有贪心选择性质与最优子结构（如本题背景中的装盒问题、区间调度），否则贪心可能得到次优解。例如 0-1 背包问题中按"单位价值最高"贪心就可能错过最优组合（此时需要动态规划）。所以说"一定能"是错误的。`,
      tags: ['贪心'],
    },
    {
      id: 22,
      type: 'judge',
      question: `二分查找不仅可以应用于有序数组，也可以在不增加时间复杂度的情况下应用于有序的单链表，因为链表也支持 O(1) 时间内的随机访问。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
说法有两处错误：
1. 单链表**不支持** O(1) 随机访问——定位第 k 个结点必须从头顺序走 k 步，是 O(k) 时间；
2. 因此链表上的"二分"每取一个 mid 都要 O(n) 遍历，总时间退化为 O(n log n)，无法保持有序数组二分 O(log n) 的效率。二分查找的高效依赖数组的随机访问特性。`,
      tags: ['二分查找', '链表', '时间复杂度'],
    },
    {
      id: 23,
      type: 'judge',
      question: `以下函数 f1 的时间复杂度比函数 f2 的更高。
\`\`\`cpp
void f1(int n) {
    for (int i = 1; i < n; i *= 2);
}
void f2(int n) {
    if (n <= 1) return;
    f2(n - 1);
    f2(n - 1);
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
f1 的循环变量 i 每次翻倍，执行约 log₂n 轮，时间复杂度为 **O(log n)**。

f2 每次调用自身两次、问题规模只减 1，调用次数满足 T(n) = 2T(n-1) + O(1)，即约 2ⁿ - 1 次调用，时间复杂度为 **O(2ⁿ)**（指数级）。

O(log n) 远低于 O(2ⁿ)，所以 f1 的复杂度比 f2 **低**，说法相反。`,
      tags: ['时间复杂度'],
    },
    {
      id: 24,
      type: 'judge',
      question: `唯一分解定理表明，任何一个大于 1 的自然数都可以唯一地分解为若干个质数的乘积，如果不考虑质因数的顺序，这种分解方式是唯一的。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
这就是算术基本定理（唯一分解定理）：任何大于 1 的整数 n 都能写成 n = p₁^a₁ × p₂^a₂ × … × pₖ^aₖ（pᵢ 为质数、aᵢ 为正整数），且在不计次序的前提下该表达方式唯一。例如 12 = 2² × 3，无论怎么分解，最终都归约为同样的质因数组合。`,
      tags: ['数论', '素数'],
    },
    {
      id: 25,
      type: 'judge',
      question: `归并排序和快速排序在平均情况下的时间复杂度均为 O(n log n)。但在稳定性方面，归并排序通常是不稳定的，而快速排序是稳定的。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
前半句正确：两者平均时间复杂度都是 O(n log n)。

后半句说反了：**归并排序是稳定的**（合并时用 \`<=\` 优先取左半部分，相等元素相对次序不变）；**快速排序是不稳定的**（划分中的远距离交换会打乱相等元素的相对次序，如 swap(arr[i], arr[j])）。

典型记忆：稳定的有归并、插入、冒泡、计数排序；不稳定的有快速、选择、堆排序。`,
      tags: ['排序算法', '归并排序', '快速排序'],
    },
    {
      id: 26,
      type: 'programming',
      title: '排排坐',
      score: 25,
      description: `老师正在和小朋友们分糖果。

小朋友们先在自己的手上写一个数字，然后坐成一排。

老师分发糖果的规则是：每个小朋友获得自己以及左侧所有小朋友的手上数字之和个糖果。

现在小朋友们都已经在自己手上写上了数字。

请帮小朋友们安排合适的座位顺序，使得小朋友们分到的糖果总量最大，输出这个最大值。

## 数据范围

$1 \\leq n \\leq 1000$，$1 \\leq a_i \\leq 1000$。`,
      inputDescription: `输入 2 行，

第一行为一个正整数 n，表示小朋友的个数；

第二行为 n 个正整数 a₁, a₂, …, aₙ，表示小朋友们手上的数字，整数之间以空格分隔。`,
      outputDescription: `输出一个整数，表示小朋友们可能分到的最大糖果总数量。`,
      samples: [
        {
          input: `5
7 5 8 9 3`,
          output: `111`,
        },
      ],
      explanation: `**解析：**

第 i 个位置上的小朋友获得"自己及左侧所有数之和"，即前缀和。设座位顺序为 b₁, b₂, …, bₙ，总糖果数为：

$$\\sum_{i=1}^{n} (b_1 + b_2 + \\cdots + b_i) = \\sum_{i=1}^{n} (n - i + 1) \\times b_i$$

即排在越左边的数字被累加的次数越多（第 1 个数被加 n 次，最后一个数只被加 1 次）。要使总和最大，应把**大的数字放在左边**——将数组**从大到小排序**后求前缀和再累加。

**样例验证：** 7 5 8 9 3 降序排列为 9 8 7 5 3，前缀和依次为 9、17、24、29、32，总和 9+17+24+29+32 = **111** ✓

时间复杂度 O(n²)（冒泡排序，n ≤ 1000 足够）或 O(n log n)（sort）。

**考点：** 排序、贪心、前缀和
`,
      template: '#include <iostream>\nusing namespace std;\n\nint a[1010];\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; ++i)\n        cin >> a[i];\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\nint a[1010];\nvoid bubble_sort(int n) {\n    for (int i = 0; i < n; ++i) {\n        for (int j = 1; j < n - i; ++j) {\n            if (a[j - 1] < a[j])\n                swap(a[j - 1], a[j]);\n        }\n    }\n}\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; ++i)\n        cin >> a[i];\n    bubble_sort(n);\n    int ans = 0, sum = 0;\n    for (int i = 0; i < n; ++i) {\n        sum += a[i];\n        ans += sum;\n    }\n    cout << ans << endl;\n    return 0;\n}',
      tags: ['排序算法', '贪心', '前缀和'],
    },
    {
      id: 27,
      type: 'programming',
      title: '晚宴',
      score: 25,
      description: `小明去参加晚宴。晚宴中有 n 个菜肴，每个菜肴都有一个美味度，第 i 个菜肴的美味度为 v_i。

晚宴规定小明只能恰好选取两道菜肴，并且这两道菜肴的美味度必须要互质（即最大公约数为 1）。

请帮助小明选取两道菜肴，使得两道菜肴美味度之和最大。

## 数据范围

$2 \\leq n \\leq 1000$，$1 \\leq v_i \\leq 1000000$。

数据保证不存在相同美味度的菜肴。

数据保证至少存在一种选取两道菜肴的方案。`,
      inputDescription: `输入 2 行，

第一行为一个正整数 n，表示菜肴的个数；

第二行为 n 个整数 v₁, v₂, …, vₙ 表示菜肴的美味度，整数之间以空格分隔。`,
      outputDescription: `输出一个整数，表示两道互质菜肴美味度之和的最大值。`,
      samples: [
        {
          input: `5
3 5 7 35 105`,
          output: `38`,
        },
      ],
      explanation: `**解析：**

### 题目大意
从给定的 \`n\` 个正整数中任选两个不同的数，要求这两个数互质（即它们的最大公约数为 1），求这两个数的最大和。

### 算法步骤与完整流程
1. **读取输入**：
   - 读入正整数个数 \`n\`。
   - 使用数组 \`arr\` 依次读入这 \`n\` 个正整数。

2. **实现最大公约数函数（辗转相除法）**：
   - 判断互质的核心是计算最大公约数 \`gcd(a, b)\` 是否等于 1。
   - 采用欧几里得算法（辗转相除法）：
     - 若 \`b == 0\`，最大公约数即为 \`a\`；
     - 否则递归调用 \`gcd(b, a % b)\`。
   - 辗转相除法每次取模都会使数值规模大幅缩小，计算单次 \`gcd\` 的时间复杂度为对数级 \`O(log(min(a, b)))\`，运行速度极快。

3. **双重循环枚举所有数对**：
   - 题目中 \`n <= 1000\`，任意两个数配对的总方案数为 \`n * (n - 1) / 2\`，在 \`n = 1000\` 时大约有 \`5 * 10^5\` 对，枚举完全可行。
   - 外层循环变量 \`i\` 从 \`0\` 遍历至 \`n - 1\`，内层循环变量 \`j\` 从 \`i + 1\` 遍历至 \`n - 1\`。这样既能保证每个数对只被检查一次，又能避免同一个数与自身配对。
   - 维护一个用于记录最大和的变量 \`ans\`，初值设为 \`0\`。
   - 在循环内部，若 \`gcd(arr[i], arr[j]) == 1\`，说明两数互质，执行 \`ans = max(ans, arr[i] + arr[j])\` 更新最大值。

4. **输出答案**：
   - 遍历结束后，输出 \`ans\` 即可。

---

### 样例走查
以输入数据为例：
\`n = 5\`，数组为 \`[3, 5, 7, 35, 105]\`。
初始时 \`ans = 0\`。我们按 \`(i, j)\` 双重循环检查所有组合：

- **以 \`arr[0] = 3\` 为第一个数**：
  - 与 \`arr[1] = 5\`：\`gcd(3, 5) == 1\`（互质），两数之和为 \`3 + 5 = 8\`，更新 \`ans = max(0, 8) = 8\`；
  - 与 \`arr[2] = 7\`：\`gcd(3, 7) == 1\`（互质），两数之和为 \`3 + 7 = 10\`，更新 \`ans = max(8, 10) = 10\`；
  - 与 \`arr[3] = 35\`：\`gcd(3, 35) == 1\`（互质），两数之和为 \`3 + 35 = 38\`，更新 \`ans = max(10, 38) = 38\`；
  - 与 \`arr[4] = 105\`：\`gcd(3, 105) == 3 != 1\`（不互质），跳过。

- **以 \`arr[1] = 5\` 为第一个数**：
  - 与 \`arr[2] = 7\`：\`gcd(5, 7) == 1\`（互质），两数之和为 \`5 + 7 = 12\`，小于当前 \`ans\`，保持 \`ans = 38\`；
  - 与 \`arr[3] = 35\`：\`gcd(5, 35) == 5 != 1\`（不互质），跳过；
  - 与 \`arr[4] = 105\`：\`gcd(5, 105) == 5 != 1\`（不互质），跳过。

- **以 \`arr[2] = 7\` 为第一个数**：
  - 与 \`arr[3] = 35\`：\`gcd(7, 35) == 7 != 1\`（不互质），跳过；
  - 与 \`arr[4] = 105\`：\`gcd(7, 105) == 7 != 1\`（不互质），跳过。

- **以 \`arr[3] = 35\` 为第一个数**：
  - 与 \`arr[4] = 105\`：\`gcd(35, 105) == 35 != 1\`（不互质），跳过。

所有数对枚举完毕，最大和为 \`38\`，程序输出 \`38\`，与样例输出一致。

---

### 复杂度分析
- **时间复杂度**：总共枚举 \`n * (n - 1) / 2\` 对数，每次调用 \`gcd\` 耗时约 \`O(log V)\`（\`V\` 为数值上限）。当 \`n = 1000\` 时，总运算次数在数百万级别，C++ 在 1 秒内大约可执行 \`10^8\` 次操作，可在时限内轻松通过。
- **空间复杂度**：仅使用了一个大小为 1010 的一维整型数组存放数据，空间复杂度为 \`O(n)\`。

**易错提醒：**
- **内层循环起点**：内层循环必须从 \`j = i + 1\` 开始，不能从 \`0\` 开始。若从 \`0\` 开始不仅会造成重复比较，还会出现 \`i == j\`（自身与自身求 gcd，只要该数大于 1 结果就不是 1，但如果数组里有 1 就会错误地将自身相加）。
- **互质的概念**：互质是指两数的“最大公约数为 1”，并不是要求两数本身是质数。例如样例中的 35 是合数，但它与 3 互质，能组成合法数对。

**知识延伸：**
- **欧几里得定理**：辗转相除法的数学原理为 \`gcd(a, b) = gcd(b, a % b)\`。在掌握手写递归版 \`gcd\` 的同时，在 C++17 标准库头文件 \`<numeric>\` 中也提供了现成的 \`std::gcd(a, b)\` 函数可供调用。熟练手写辗转相除法是 GESP 五级数论模块的必考基本功。`,
      template: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint arr[1010];\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; ++i)\n        cin >> arr[i];\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\nint arr[1010];\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; ++i)\n        cin >> arr[i];\n    int ans = 0;\n    for (int i = 0; i < n; ++i)\n        for (int j = i + 1; j < n; ++j)\n            if (gcd(arr[i], arr[j]) == 1)\n                ans = max(ans, arr[i] + arr[j]);\n    cout << ans << endl;\n    return 0;\n}',
      tags: ['枚举', '数论', '最大公约数'],
    },
  ],
};
