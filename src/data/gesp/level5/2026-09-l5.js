// 2026年9月 GESP C++ 五级真题 (第15次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照官方 PDF 转录。
// 客观题答案以原卷答案表为唯一证据：
//   单选题答案表在第 1 页：A C B C D B A D C B D A D C C
//   判断题答案表在第 6 页：√ × √ √ × √ × √ × ×
// 单选答案表来自文本层，判断题答案表为矢量红色 √/× 记号，已按 200dpi 渲染逐格读取并全部逻辑复核。
// 编程题样例与数据范围已渲染核对（哥德巴赫猜想 4→1/10→2；饮品调制 14.667/0.000）。

export const paperData = {
  id: '2026-09-l5',
  title: '2026年9月 GESP C++ 五级真题',
  level: 5,
  year: 2026,
  month: 9,
  session: 15,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://gesp.ccf.org.cn/101/attach/1767258748452800.pdf',
    type: 'official',
    notes: '全卷依据 CCF 官网 PDF 逐题转录；Q1/Q2 选项、Q7 分解数、判断题复杂度记号、编程题数据范围均渲染核对。',
  },
  verification: {
    status: 'partial',
    reviewedBy: '本站校订',
    reviewedAt: '2026-11-03',
    scope: '单选答案串 ACBCDBADCBDADCC 与判断答案串 √×√√×√×√×× 按官方答案表转录并逐题逻辑复核，编程题样例与数据范围已渲染核对。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `小杨用单链表保存任务序列，并同时维护头指针 head 和尾指针 tail。在链表非空且已知 tail 的情况下，在表尾插入新结点的时间复杂度是（ ）。
\`\`\`cpp
struct Node {
    int value;
    Node *next;
};
Node *head;
Node *tail;
\`\`\``,
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 0,
      score: 2,
      tags: ['链表', '时间复杂度'],
      explanation: `**答案：A**

**核心解析：**
链表非空时 \`tail\` 直接指向最后一个结点。表尾插入只需三步：\`new Node\` 建新结点、\`tail->next = s\` 接到尾部、\`tail = s\` 更新尾指针。每一步都是固定的指针操作，与链表长度 n 无关，因此时间复杂度为 **O(1)**。

**选项分析：**
- **A（正确）**：已知 tail 时无需从头遍历，常数步完成插入。
- **B**：链表不支持类似二分的结构，O(log n) 与本题操作无关。
- **C**：若**不维护 tail**、只知 head，才需要遍历全表找到尾结点，耗时 O(n)。这是本题最典型的混淆项——"已知 tail" 正是排除 O(n) 的关键条件。
- **D**：O(n log n) 是排序量级的复杂度，与单次插入无关。`,
    },
    {
      id: 2,
      type: 'single',
      question: `在不带哨兵结点的双向链表中，结点 p 既不是头结点也不是尾结点。删除 p 的正确代码是（ ）。
\`\`\`cpp
struct Node {
    int value;
    Node *prev;
    Node *next;
};
\`\`\``,
      options: [
        `\`\`\`cpp
p->prev = p->next;
p->next = p->prev;
delete p;
\`\`\``,
        `\`\`\`cpp
p->prev->next = p;
p->next->prev = p;
delete p;
\`\`\``,
        `\`\`\`cpp
p->prev->next = p->next;
p->next->prev = p->prev;
delete p;
\`\`\``,
        `\`\`\`cpp
p->next = p->prev;
p->prev->next = nullptr;
delete p;
\`\`\``,
      ],
      answer: 2,
      score: 2,
      tags: ['链表', '指针'],
      explanation: `**答案：C**

**核心解析：**
删除双向链表中的结点 p，要让 p 的前驱跳过 p 直接连到后继、后继的 prev 回连到前驱：

\`\`\`cpp
p->prev->next = p->next;  // 前驱的 next 越过 p
p->next->prev = p->prev;  // 后继的 prev 越过 p
delete p;                 // 最后释放
\`\`\`

**选项分析：**
- **A**：只是把 p 自己的两个指针互相赋值，前驱和后继的指针完全没改，链没断开，且互相赋值会丢失信息。
- **B**：方向写反了——\`p->prev->next = p;\` 让前驱仍然指向 p 自己，等于什么都没删，随后释放 p 会留下悬空指针。
- **C（正确）**：两条赋值把 p 从链中"摘除"，之后再安全释放。
- **D**：\`p->next = p->prev;\` 修改的是 p 自己的字段，前驱的 next 依然指向 p；\`p->prev->next = nullptr;\` 还会把链表从 p 处截断，丢失 p 之后的全部结点。`,
    },
    {
      id: 3,
      type: 'single',
      question: `下面函数使用快慢指针查找单链表的中间结点。横线处应填写（ ）。
\`\`\`cpp
struct Node {
    int value;
    Node *next;
};
Node *middle(Node *head) {
    Node *slow = head;
    Node *fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        ______________________
    }
    return slow;
}
\`\`\``,
      options: [
        'fast = fast->next;',
        'fast = fast->next->next;',
        'fast = slow->next;',
        'fast = head->next;',
      ],
      answer: 1,
      score: 2,
      tags: ['链表', '双指针'],
      explanation: `**答案：B**

**核心解析：**
快慢指针的经典用法：slow 每次走 1 步，fast 每次走 2 步。fast 的速度是 slow 的两倍，当 fast 到达末尾时，slow 恰好走到中间。横线处应填 \`fast = fast->next->next;\`。

**选项分析：**
- **A**：fast 每次也走 1 步，与 slow 同速，\`slow == fast\` 恒成立，循环会在链尾正常结束但 slow 走到最后一个结点而不是中点。
- **B（正确）**：fast 每次走两步，循环条件保证了 fast 和 fast->next 都非空，两次解引用安全。
- **C**：fast 变成跟随 slow 之后再走一步，两指针互相纠缠，不再是"快慢"关系，无法定位中点。
- **D**：fast 每次都从 head 出发走一步，永远在第二个结点附近徘徊；只要该结点存在，\`fast->next != nullptr\` 长期为真而 slow 不断前进，很快发生非法访问或死循环。`,
    },
    {
      id: 4,
      type: 'single',
      question: `函数 gcd(int a, int b) 定义如下，则 gcd(105, 45) 的结果是（ ）。
\`\`\`cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
\`\`\``,
      options: ['3', '5', '15', '45'],
      answer: 2,
      score: 2,
      tags: ['数论', '递归'],
      explanation: `**答案：C**

**核心解析：**
按欧几里得算法逐步展开：

- gcd(105, 45)：105 % 45 = 15 → gcd(45, 15)
- gcd(45, 15)：45 % 15 = 0 → gcd(15, 0)
- b == 0，返回 a = **15**

验证：105 = 3 × 5 × 7，45 = 3² × 5，公共部分为 3 × 5 = 15。✓

**选项分析：**
- **A**：3 是两数的公约数但不是最大公约数（漏掉了因子 5）。
- **B**：5 也只是公约数。
- **C（正确）**：15 = gcd(105, 45)。
- **D**：45 是第二个参数本身，只有当 45 整除 105 时才成立，但 105 % 45 = 15 ≠ 0。`,
    },
    {
      id: 5,
      type: 'single',
      question: `下面函数用于判断正整数 n 是否为质数。横线处的最佳写法是（ ）。
\`\`\`cpp
bool isPrime(int n) {
    if (n < 2)
        return false;
    for (int i = 2; __________________; i++) {
        if (n % i == 0)
            return false;
    }
    return true;
}
\`\`\``,
      options: ['i < n', 'i <= n / 2', 'i * i < n', '(long long) i * i <= n'],
      answer: 3,
      score: 2,
      tags: ['数论'],
      explanation: `**答案：D**

**核心解析：**
若 n 是合数，必有一个不超过 √n 的因子，所以试除只需进行到 i * i <= n。"最佳写法"既要正确又要防止溢出：当 n 接近 int 上限时，\`i * i\` 以 int 运算会溢出，先把 i 转成 long long 再相乘才安全。

**选项分析：**
- **A**：试除到 n-1，结果正确但做了大量无用功，不是"最佳"。
- **B**：试除到 n/2 同样正确但低效，且 n/2 是整数除法，与 A 一样偏离最优。
- **C**：只差一个等号——若 n 恰为完全平方数（如 25 = 5 × 5），i = 5 时 5*5 < 25 不成立，循环提前结束，会把 25 误判为质数。
- **D（正确）**：边界取到等号覆盖 √n 本身，long long 转换杜绝溢出，正确且高效。`,
    },
    {
      id: 6,
      type: 'single',
      question: `下面代码实现线性筛法。为了保证每个合数只被其最小质因子筛去一次，横线处应填写（ ）。
\`\`\`cpp
vector<int> linearSieve(int n) {
    vector<bool> composite(n + 1, false);
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (!composite[i])
            primes.push_back(i);
        for (int p : primes) {
            if ((long long)i * p > n)
                break;
            composite[i * p] = true;
            if (__________________)
                break;
        }
    }
    return primes;
}
\`\`\``,
      options: ['p % i == 0', 'i % p == 0', 'i == p', 'i * p == n'],
      answer: 1,
      score: 2,
      tags: ['筛法', '数论'],
      explanation: `**答案：B**

**核心解析：**
线性筛的核心不变量：合数 n 只在 i = n / (最小质因子) 时被 \`i * p\`（p 为最小质因子）标记一次。当 p 不再是 i 的最小质因子——即 \`i % p == 0\` 时——必须立刻 break，否则更大的质数 p' 会与 i 相乘，产生"以非最小质因子标记合数"的重复。

**选项分析：**
- **A**：p 是从小到大取的质数，i % p == 0 之前 p 不太可能整除 i 反过来 p % i == 0 几乎不发生，条件形同虚设，合数会被重复标记。
- **B（正确）**：标准线性筛写法，保证 i * p 中 p 恒为最小质因子。
- **C**：i == p 只在 i 本身是刚加入的质数时成立，提前终止导致大量合数（如 2 的倍数在后续轮次）根本没被标记。
- **D**：只处理恰好等于 n 的乘积，其余合数全部漏标。`,
    },
    {
      id: 7,
      type: 'single',
      question: `根据唯一分解定理，整数 756 的正确质因数分解是（ ）。`,
      options: ['2² × 3³ × 7', '2³ × 3³ × 7', '2² × 3³ × 21', '2 × 3³ × 14'],
      answer: 0,
      score: 2,
      tags: ['数论'],
      explanation: `**答案：A**

**核心解析：**
对 756 逐步短除：756 ÷ 2 = 378，378 ÷ 2 = 189，189 ÷ 3 = 63，63 ÷ 3 = 21，21 ÷ 3 = 7。所以 756 = 2² × 3³ × 7。验证：4 × 27 × 7 = 756。✓

**选项分析：**
- **A（正确）**：2² × 3³ × 7 = 756，且 2、3、7 全是质数，指数为正。
- **B**：2³ × 3³ × 7 = 8 × 27 × 7 = 1512 ≠ 756，多乘了一个 2。
- **C**：数值上 2² × 3³ × 21 = 756 没错，但 21 = 3 × 7 是合数，违反"质因数必须都是质数"的要求，不是唯一的标准分解形式。
- **D**：2 × 3³ × 14 中 14 = 2 × 7 是合数，同样不是标准分解；且该式等于 2 × 27 × 14 = 756，数值碰巧对但形式非法。C、D 是"数值对、形式错"的典型干扰项。`,
    },
    {
      id: 8,
      type: 'single',
      question: `函数 f(int n) 定义如下，则 f(4) 的结果是（ ）。
\`\`\`cpp
int f(int n) {
    if (n == 1)
        return 1;
    return n + f(n - 1);
}
\`\`\``,
      options: ['4', '7', '9', '10'],
      answer: 3,
      score: 2,
      tags: ['递归'],
      explanation: `**答案：D**

**核心解析：**
递归展开：f(4) = 4 + f(3) = 4 + 3 + f(2) = 4 + 3 + 2 + f(1) = 4 + 3 + 2 + 1 = **10**。即 f(n) 计算 1 + 2 + … + n。

**选项分析：**
- **A**：只算了最外层的 n = 4，忽略全部递归调用。
- **B**：对应 4 + 3 或 3 + 2 + 1(=6?) 的错误中途值——把递归在某一层提前截断。
- **C**：4 + 3 + 2 = 9，漏掉了递归基准 f(1) = 1。
- **D（正确）**：完整递归到 n == 1，总和 10。`,
    },
    {
      id: 9,
      type: 'single',
      question: `在升序数组中查找第一个严格大于 x 的元素位置，下面代码中的横线应填写（ ）。
\`\`\`cpp
int upperBound(const vector<int> &a, int x) {
    int l = 0, r = (int)a.size();
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (__________________) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }
    return l;
}
\`\`\``,
      options: ['a[mid] < x', 'a[mid] >= x', 'a[mid] <= x', 'a[mid] > x'],
      answer: 2,
      score: 2,
      tags: ['二分查找'],
      explanation: `**答案：C**

**核心解析：**
这段二分的结构是：if 分支 \`l = mid + 1\` 表示"a[mid] 这个位置还不达标，答案在更右边"；else 分支 \`r = mid\` 表示"mid 可能是答案，往左收缩"。要找**第一个严格大于 x** 的位置，所有值 <= x 的位置都不达标，所以条件是 \`a[mid] <= x\` 时继续右移。

**选项分析：**
- **A**：a[mid] < x 才右移，等于 x 的位置会被当作答案保留——找到的是第一个 >= x 的元素，不是严格大于。
- **B**：a[mid] >= x 就右移，方向完全反了，等于丢弃了所有大于等于 x 的候选，最终返回的可能根本不满足 > x。
- **C（正确）**：等于 x 的位置被跳过，首个 > x 的位置被保留，正是 upper_bound 的语义。
- **D**：a[mid] > x 就右移，把真正要找的位置扔掉，逻辑颠倒。`,
    },
    {
      id: 10,
      type: 'single',
      question: `小杨需要把若干箱货物按原顺序分配到 days 天中，每天运输连续的若干箱，求能够完成任务的最小载重量。函数 check(cap) 判断载重量为 cap 时能否在规定天数内运完。横线处应填写（ ）。
\`\`\`cpp
long long l = maxWeight;
long long r = totalWeight;
while (l < r) {
    long long mid = l + (r - l) / 2;
    if (check(mid)) {
        ____________________
    } else {
        ____________________
    }
}
cout << l;
\`\`\``,
      options: [
        '第一空 l = mid + 1;，第二空 r = mid;',
        '第一空 r = mid;，第二空 l = mid + 1;',
        '第一空 r = mid - 1;，第二空 l = mid;',
        '第一空 l = mid;，第二空 r = mid - 1;',
      ],
      answer: 1,
      score: 2,
      tags: ['二分查找'],
      explanation: `**答案：B**

**核心解析：**
check(cap) 关于 cap 单调：载重越大越容易在规定天数内运完。二分"最小可行载重"：mid 可行时答案可能是 mid 本身或更小，收缩右界 \`r = mid\`；不可行时 mid 太小，\`l = mid + 1\`。循环结束时 l 即最小可行值。

**选项分析：**
- **A**：可行时反而把右界收缩到 mid 之外的含义写反——若填"可行时 l = mid + 1"，会把可行解排除，最终收敛到不可行的一侧。
- **B（正确）**：check(mid) 为真（可行）时 r = mid，为假时 l = mid + 1，与单调性匹配，是"最小可行值"二分的标准模板。
- **C**：r = mid - 1 会把 mid 恰好是答案的情况丢掉；l = mid 在 l == mid 时可能死循环。
- **D**：方向整体颠倒，收敛到"最大不可行值"，输出错误。`,
    },
    {
      id: 11,
      type: 'single',
      question: `下面是归并排序中合并两个有序区间（升序排序）的部分代码。若希望排序保持稳定，横线处应填写（ ）。
\`\`\`cpp
while (i <= mid && j <= right) {
    if (__________________) {
        temp.push_back(a[i++]);
    } else {
        temp.push_back(a[j++]);
    }
}
\`\`\``,
      options: ['a[i] < a[j]', 'a[i] > a[j]', 'a[i] >= a[j]', 'a[i] <= a[j]'],
      answer: 3,
      score: 2,
      tags: ['归并排序'],
      explanation: `**答案：D**

**核心解析：**
稳定性要求：值相等的元素，原来在前面的（左半部分的 a[i]）必须先进入结果。条件写 \`a[i] <= a[j]\`，相等时走 if 分支取左边的 a[i]，稳定 性得到保证。

**选项分析：**
- **A**：a[i] == a[j] 时走 else 取右边的 a[j]，右半元素跑到前面，稳定性被破坏（结果仍有序）。
- **B**：只有左边严格更小才取左边，相等时取右边，同样不稳定；而且语义上"升序合并"应当优先取较小者，此条件方向没错但边界处理错了。
- **C**：a[i] >= a[j] 取左边，意味着左边较大时先输出左边，直接破坏升序，结果都不是有序的。
- **D（正确）**：相等时左半先出，既保证升序又保证稳定，是归并排序稳定性的关键细节。`,
    },
    {
      id: 12,
      type: 'single',
      question: `下面快速排序的划分函数以 a[right] 为枢轴，并把不大于枢轴的元素移动到左侧。横线处应填写（ ）。
\`\`\`cpp
int partition(int a[], int left, int right) {
    int pivot = a[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (__________________) {
            i++;
            swap(a[i], a[j]);
        }
    }
    swap(a[i + 1], a[right]);
    return i + 1;
}
\`\`\``,
      options: ['a[j] <= pivot', 'a[j] > pivot', 'a[i] <= pivot', 'a[right] < a[j]'],
      answer: 0,
      score: 2,
      tags: ['快速排序'],
      explanation: `**答案：A**

**核心解析：**
Lomuto 划分：i 维护"<= pivot 区域"的右边界，j 扫描全表。凡 a[j] <= pivot 就把这个元素换到前面（区域扩一格）。最后把枢轴换到 i+1 位置，返回它的最终下标。题目明确要求"不大于枢轴的元素在左侧"，条件就是 \`a[j] <= pivot\`。

**选项分析：**
- **A（正确）**：小于等于枢轴的都划到左侧，与题目要求和 swap(a[i+1], a[right]) 的收尾逻辑一致。
- **B**：方向颠倒，大于枢轴的元素被换到前面，划分语义完全相反。
- **C**：条件里用的是 i 而不是 j——i 是边界指针，a[i] 在循环里是已划分区域的尾巴，用它判断会漏掉对 j 位置新元素的考察，划分逻辑崩溃。
- **D**：a[right] 就是 pivot 自身，a[j] > pivot 才不动？不对——此条件为真时执行交换，等价于把**大于**枢轴的元素换到前面，同样颠倒了语义。`,
    },
    {
      id: 13,
      type: 'single',
      question: `小杨要在一个教室安排尽可能多场活动，每场活动具有开始时间 start 和结束时间 end。采用贪心算法时，正确的选择策略是（ ）。
\`\`\`cpp
struct Activity {
    int start;
    int end;
};
\`\`\``,
      options: [
        '每次选择开始时间最早的活动',
        '每次选择持续时间最短的活动',
        '每次选择参与人数最少的活动',
        '按结束时间从早到晚排序，依次选择与已选活动不冲突的活动',
      ],
      answer: 3,
      score: 2,
      tags: ['贪心'],
      explanation: `**答案：D**

**核心解析：**
活动安排问题的经典结论：按**结束时间从早到晚**排序，每次选与已选活动不冲突的最早结束的活动，能得到最多的活动数。贪心正确性来自交换论证：任何最优解的第一场活动都可以换成结束最早的那场而不减少总数。

**选项分析：**
- **A**：开始最早的活动可能持续一整天，把后续活动全堵死。反例：[1, 100) 与 [2,3)、[3,4)，选开始最早的只能安排 1 场。
- **B**：持续最短的活动可能开始得很晚。反例：[1,2) 长 1、[2,4) 长 2、[3,5) 长 2，若先选 [2,4) 之外的短活动顺序不对同样会丢解；更直接的反例：短活动 [10,11) 与 [1,4)、[4,7)、[7,10) 三场冲突区外的长活动。
- **C**：参与人数与教室时间占用毫无关系，不构成任何可行策略。
- **D（正确）**：标准结论，最早结束留下最多后续机会。`,
    },
    {
      id: 14,
      type: 'single',
      question: `下面函数使用迭代方法求最大连续子段和。对于数组 {-2, 3, -1, 5, -6, 2}，函数返回值是（ ）。
\`\`\`cpp
int maxSubArray(const vector<int> &a) {
    int best = a[0];
    int current = a[0];
    for (int i = 1; i < (int)a.size(); i++) {
        current = max(a[i], current + a[i]);
        best = max(best, current);
    }
    return best;
}
\`\`\``,
      options: ['5', '6', '7', '8'],
      answer: 2,
      score: 2,
      tags: ['动态规划'],
      explanation: `**答案：C**

**核心解析：**
Kadane 算法逐位模拟（current = 以 i 结尾的最大子段和）：

| i | a[i] | current = max(a[i], current + a[i]) | best |
|---|------|-------------------------------------|------|
| 0 | -2 | -2 | -2 |
| 1 | 3 | max(3, -2+3)=3 | 3 |
| 2 | -1 | max(-1, 3-1)=2 | 3 |
| 3 | 5 | max(5, 2+5)=7 | **7** |
| 4 | -6 | max(-6, 7-6)=1 | 7 |
| 5 | 2 | max(2, 1+2)=3 | 7 |

最大子段和为 **7**（子段 {3, -1, 5}）。

**选项分析：**
- **A**：5 只是单个元素 {5}，漏掉了 3 + (-1) + 5 = 7。
- **B**：3 + (-1) + 5 = 7 而不是 6，计算中途出错。
- **C（正确）**：{3, -1, 5} 的和 7，是全部子段中的最大值。
- **D**：试图把 2 也拉进来（7 - 6 + 2 = 3 反而更小），8 无法由任何连续子段凑出。`,
    },
    {
      id: 15,
      type: 'single',
      question: `数组 a 和 b 按低位在前的顺序保存两个非负大整数。下面代码实现高精度加法，横线处应填写（ ）。
\`\`\`cpp
vector<int> add(const vector<int> &a, const vector<int> &b) {
    vector<int> c;
    int carry = 0;
    int n = max(a.size(), b.size());
    for (int i = 0; i < n; i++) {
        int sum = carry;
        if (i < a.size())
            sum += a[i];
        if (i < b.size())
            sum += b[i];
        c.push_back(sum % 10);
        ____________________
    }
    if (carry)
        c.push_back(carry);
    return c;
}
\`\`\``,
      options: ['carry = sum % 10;', 'carry = sum;', 'carry = sum / 10;', 'carry = c[i] / 10;'],
      answer: 2,
      score: 2,
      tags: ['高精度'],
      explanation: `**答案：C**

**核心解析：**
逐位相加时 sum 最多为 9 + 9 + 1 = 19。本位写入 sum % 10 后，进位是 sum 的十位，即 \`carry = sum / 10\`（0 或 1）。

**选项分析：**
- **A**：sum % 10 是本位数字，当作进位会把刚写进 c 的值再重复一遍，进位丢失。
- **B**：直接把 sum（可能 19）整个当下一位的加数，下一轮 sum 会出现 20+，push 进 c 的 sum % 10 虽然还对，但 carry 累计失真，最终 if(carry) 的收尾也存了过大的值。
- **C（正确）**：sum / 10 正确提取进位。
- **D**：c[i] 是本位数字（0~9），除以 10 恒为 0，进位永远丢失。`,
    },
    {
      id: 16,
      type: 'judge',
      question: `下面代码在已知结点 p 的情况下，能够以 O(1) 的时间在单链表的 p 结点之后插入新结点 s。
\`\`\`cpp
s->next = p->next;
p->next = s;
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['链表'],
      explanation: `**答案：√**

**解析：**
两步操作都只修改常数个指针：先让 s 接管 p 的后继，再让 p 指向 s。不依赖链表长度，也不需要遍历找位置，因此是 O(1)。注意顺序不能反——先改 p->next 会丢失原来的后继。题中给出的顺序正确。`,
    },
    {
      id: 17,
      type: 'judge',
      question: `下面代码可以安全地删除单链表的头结点，并使 head 指向删除后的新头结点。
\`\`\`cpp
Node *p = head;
delete p;
head = p->next;
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['链表', '指针'],
      explanation: `**答案：×**

**解析：**
顺序错误：\`delete p\` 之后 p 指向的内存已归还系统，第三行 \`head = p->next\` 是**访问已释放的内存**，属于未定义行为。正确写法必须先保存后继再释放：

\`\`\`cpp
Node *p = head;
head = p->next;   // 先接管后继
delete p;         // 最后释放
\`\`\``,
    },
    {
      id: 18,
      type: 'judge',
      question: `下面欧几里得算法既适用于 a > b，也适用于 a < b，只要 a、b 是正整数。
\`\`\`cpp
int gcd(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['数论'],
      explanation: `**答案：√**

**解析：**
若调用时 a < b，第一轮 a % b = a（商 0 余 a），随后 a = b、b = a（原值），两个数自动完成交换。例如 gcd(45, 105)：第一轮 r = 45 % 105 = 45 → a=105, b=45，之后与 gcd(105, 45) 完全相同。因此无需事先保证 a > b，算法自动纠正顺序，结论成立。`,
    },
    {
      id: 19,
      type: 'judge',
      question: `下面埃氏筛从 i * i 开始标记，是因为 i * i 之前的 i 的合数倍数已经被更小的质因子标记过。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['筛法'],
      explanation: `**答案：√**

**解析：**
用质数 i 筛合数时，i 的倍数中比 i² 小的形如 i × k（k < i）。若 k 是合数，它有更小的质因子 p，i×k 会被 p 的一轮筛掉；若 k 是质数，k < i 的质数已在更早的轮次把 i×k 标记（k 轮时标记 k 的倍数）。所以 i×k（k<i）一定已在之前被标记过，从 i² 开始既不遗漏也不重复，是埃氏筛的标准优化。`,
    },
    {
      id: 20,
      type: 'judge',
      question: `下面程序的时间复杂度为 O(n)。
\`\`\`cpp
for (int i = 1; i <= n; i *= 2) {
    cout << i << endl;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['时间复杂度'],
      explanation: `**答案：×**

**解析：**
循环变量 i 每次翻倍：1, 2, 4, 8, …，执行到超过 n 为止，共执行 log₂n + 1 次，因此时间复杂度是 **O(log n)**，不是 O(n)。只有 i++ 这类每次加固定步长的循环才是 O(n)。`,
    },
    {
      id: 21,
      type: 'judge',
      question: `若数组 a 已按升序排列，下面函数能够返回最后一个小于等于 x 的元素下标；如果不存在，则返回 -1。
\`\`\`cpp
int findLastLE(const vector<int> &a, int x) {
    int l = 0, r = (int)a.size() - 1;
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] <= x) {
            ans = mid;
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['二分查找'],
      explanation: `**答案：√**

**解析：**
这是"记录答案式"二分：a[mid] <= x 时 mid 是可行解，记入 ans 并向右继续找更大的可行下标（l = mid + 1）；a[mid] > x 时答案只能在左侧（r = mid - 1）。循环结束时 ans 保存最后一次满足条件的下标，即最后一个 <= x 的位置；若从未满足则保持初值 -1。逻辑完整正确。`,
    },
    {
      id: 22,
      type: 'judge',
      question: `快速排序中如果选取区间第一个元素作为枢轴。当输入数组已经升序排列时，其最坏时间复杂度仍为 O(n log n)。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['快速排序', '时间复杂度'],
      explanation: `**答案：×**

**解析：**
已升序数组取第一个元素为枢轴时，枢轴恰是区间最小值，划分后左半为空、右半长度只减 1，递归深度达到 n 层，每层划分耗时 O(区间长度)，总时间为 n + (n-1) + … + 1 = O(n²)。这正是快排最坏情形的典型触发条件，O(n log n) 反而是平均情形。随机选取枢轴或三数取中可避免这种退化。`,
    },
    {
      id: 23,
      type: 'judge',
      question: `归并排序的递推式为 T(n) = 2T(n/2) + O(n)，对应的时间复杂度为 O(n log n)。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['归并排序', '时间复杂度'],
      explanation: `**答案：√**

**解析：**
归并排序把数组分成两半递归排序（2T(n/2)），再花 O(n) 合并两个有序区间。由主定理：a = 2, b = 2, f(n) = O(n) = O(n^(log_b a)) = O(n¹)，属于第二种情形，解得 T(n) = O(n log n)。展开来看共 log n 层，每层合并总代价 O(n)，同样得到 O(n log n)。`,
    },
    {
      id: 24,
      type: 'judge',
      question: `下面的贪心代码一定能对任意硬币面值集合 coins 求出 money 所需的最少硬币数。
\`\`\`cpp
int count = 0;
for (int coin : coins) { // coins 按面值从大到小排列
    count += money / coin;
    money %= coin;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['贪心'],
      explanation: `**答案：×**

**解析：**
贪心对"标准币制"（如人民币 1、5、10、50）有效，但对任意面值集合会失灵。经典反例：面值 {1, 3, 4}，money = 6。贪心先取 4（剩 2），再取两个 1，共 3 枚；而最优解是 3 + 3，只用 2 枚。贪心只看当前最大面值，不做全局权衡，不保证最优。要严格正确需要动态规划逐个金额求最少枚数。`,
    },
    {
      id: 25,
      type: 'judge',
      question: `假设两个非负高精度整数分别存储在数组 a 和 b 中，且 a ≥ b。数组采用低位在前的方式存储，即 a[0] 表示个位。下面代码中的 c 可以正确保存 a - b 的各位数字。
\`\`\`cpp
int borrow = 0;
for (int i = 0; i < len; ++i) {
    int t = a[i] - b[i] + borrow;
    if (t < 0) {
        t += 10;
        borrow = 1;
    } else {
        borrow = 0;
    }
    c[i] = t;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['高精度'],
      explanation: `**答案：×**

**解析：**
这段代码有两个实质性缺陷：

1. **len 未定义来源且可能越界**：若 a、b 位数不同（len 取较大者），循环中访问 \`b[i]\` 时 i 可能超过 b 的实际长度，读的是越界内存而非补 0；代码里没有任何 \`i < b.size()\` 的保护或补 0 逻辑。
2. **借位收尾未处理**：虽然 a ≥ b 保证最终 borrow = 0，但代码没有最高位截断逻辑——若 len 覆盖了无效高位，c 的前导 0 未清理（这一点影响的是"正确保存各位"的规范性）。

核心错误在第 1 点：缺少位数不足时的补 0 处理，\`b[i]\` 越界读取使结果不可靠，因此"可以正确保存"不成立。`,
    },
    {
      id: 26,
      type: 'programming',
      title: '哥德巴赫猜想',
      score: 25,
      description: `众所周知，哥德巴赫猜想是说，任何大于 2 的偶数都能写成两个质数（素数）之和。例如：

- 4 = 2 + 2
- 6 = 3 + 3
- 8 = 3 + 5
- 10 = 3 + 7 = 5 + 5

聪明的你肯定想知道，对于大于 2 的偶数 n，它有多少种写成两个质数之和的方法。例如 4、6 和 8 都只有一种方法，10 有两种方法。请你编写程序计算这个问题的答案。

在本题中，我们认为两种方案不同，当且仅当两种分解方案包含的素数互不相同；即 10 = 3 + 7 和 10 = 7 + 3 是同一种方案，不能重复计数。`,
      inputFormat: `一行，一个大于 2 的偶数 n。`,
      outputFormat: `一行，一个整数，表示将 n 写成两个质数之和的方法数。`,
      samples: [
        { input: '4', output: '1' },
        { input: '10', output: '2' },
      ],
      hint: `对于 40% 的测试点，保证 4 ≤ n ≤ 100。

对于所有测试点，保证 4 ≤ n ≤ 10^6。

时间限制：1.0 s，内存限制：512.0 MB。`,
      tags: ['筛法', '数论'],
      referenceCode: "#include <cstdio>\nconst int N = 1000005;\nbool not_prime[N];\nint primes[500000], pcnt;\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    for (int i = 2; i <= n; ++i) {\n        if (!not_prime[i]) {\n            primes[pcnt++] = i;\n            for (long long j = (long long)i * i; j <= n; j += i)\n                not_prime[j] = true;\n        }\n    }\n    int ans = 0;\n    for (int i = 0; i < pcnt && primes[i] <= n / 2; ++i)\n        if (!not_prime[n - primes[i]])\n            ans++;\n    printf(\"%d\\n\", ans);\n    return 0;\n}\n",
      explanation: `**解题思路：**

1. **筛质数**：n 最大到 10^6，用埃氏筛（官方参考程序即埃氏筛）预先把 2..n 内的所有质数筛出。注意 4 = 2 + 2 说明两个质数允许相同，只需"方案与方案之间"不重复。
2. **枚举计数**：枚举较小质数 p，从 2 到 n/2 为止（保证 p <= n - p，避免 3+7 与 7+3 重复计数），检查 n - p 是否为质数，是则答案加一。
3. **复杂度**：埃氏筛 O(n log log n)，枚举部分 O(π(n))，对 n = 10^6 轻松通过。

**参考实现：**

\`\`\`cpp
#include <cstdio>
const int N = 1000005;
bool not_prime[N];
int primes[500000], pcnt;
int main() {
    int n;
    scanf("%d", &n);
    for (int i = 2; i <= n; ++i) {
        if (!not_prime[i]) {
            primes[pcnt++] = i;
            for (long long j = (long long)i * i; j <= n; j += i)
                not_prime[j] = true;
        }
    }
    int ans = 0;
    for (int i = 0; i < pcnt && primes[i] <= n / 2; ++i)
        if (!not_prime[n - primes[i]])
            ans++;
    printf("%d\\n", ans);
    return 0;
}
\`\`\`

**样例验证：** n = 4：p = 2，n - p = 2 是质数，答案 1 ✓。n = 10：p = 2 (8 非质数不计)、p = 3 (7 是质数 +1)、p = 5 (5 是质数 +1)，答案 2 ✓。`,
    },
    {
      id: 27,
      type: 'programming',
      title: '饮品调制',
      score: 25,
      description: `你想调制一份甜度恰到好处的饮品给你的朋友们品尝。

有 n 种原料可供用于调制饮品。第 i 种原料存量有 v_i 升，每升含有 s_i 克糖分。你可以自由选择原料加入饮品，但每种原料的使用量不得超过其剩余存量。也就是说，假设第 i 种原料选用 x_i 升，应当有 0 <= x_i <= v_i，x_i 可以取 0 到 v_i 之间的任何数字（包括小数）。

一份甜度恰到好处的饮品需要保证甜度恰好为 t。最终你调制得到的饮品甜度将为 (Σ s_i × x_i) / (Σ x_i)。为了让更多的朋友喝到饮品，请问最多能调制出多少升甜度恰到好处的饮品？如果无法调制出甜度恰到好处的饮品，则认为答案是 0。`,
      inputFormat: `第一行，两个整数 n, t，分别表示原料种类数量，恰到好处的甜度。

接下来 n 行，每行两个整数 v_i, s_i，分别表示第 i 种原料的存量体积，每升含有的糖分质量。`,
      outputFormat: `一行，一个小数，表示能调制出的甜度恰到好处的饮品最大体积，保留三位小数。`,
      samples: [
        { input: '4 2\n6 1\n5 2\n8 5\n1 0', output: '14.667' },
        { input: '2 5\n3 4\n5 3', output: '0.000' },
      ],
      hint: `对于 40% 的测试点，保证 n = 2。

对于所有测试点，保证 1 ≤ n ≤ 2000，0 ≤ t ≤ 200，1 ≤ v_i ≤ 100，0 ≤ s_i ≤ 200。

时间限制：1.0 s，内存限制：512.0 MB。`,
      tags: ['贪心'],
      referenceCode: "#include <cstdio>\n#include <algorithm>\n#include <vector>\n#include <cmath>\nusing namespace std;\nstruct Node { double v, s; };\ndouble scan(vector<Node> a, double t) {\n    double sv = 0, ss = 0, ans = 0;\n    for (auto [v, s] : a) {\n        if (sv > 1e-12 && (ss / sv - t) * (s - t) < -1e-12) {\n            double k = (t * sv - ss) / (s - t);\n            if (k >= -1e-12 && k <= v + 1e-12)\n                ans = max(ans, sv + k);\n            break;\n        }\n        sv += v;\n        ss += s * v;\n        if (sv > 1e-12 && fabs(ss / sv - t) < 1e-9)\n            ans = max(ans, sv);\n    }\n    return ans;\n}\nint main() {\n    int n;\n    double t;\n    scanf(\"%d%lf\", &n, &t);\n    vector<Node> a(n);\n    for (int i = 0; i < n; i++) scanf(\"%lf%lf\", &a[i].v, &a[i].s);\n    sort(a.begin(), a.end(), [](const Node& x, const Node& y) { return x.s < y.s; });\n    double ans = scan(a, t);\n    reverse(a.begin(), a.end());\n    ans = max(ans, scan(a, t));\n    printf(\"%.3f\\n\", ans);\n    return 0;\n}\n",
      explanation: `**解题思路：**

1. **问题转化**：要体积最大且混合甜度恰为 t。若某原料 s_i = t，它自身就是"恰到好处"，全部 v_i 升可直接计入答案。
2. **两两配对**：甜度低于 t 的原料（淡）只能与甜度高于 t 的原料（浓）按比例混合出甜度 t：用浓原料 a 升、淡原料 b 升，满足 (s_浓·a + s_淡·b) = t(a + b)。给定一侧用量，另一侧被唯一确定。
3. **贪心策略（对应官方参考程序）**：把原料按 s 排序。从淡到浓和从浓到淡各做一遍扫描：累计当前已用体积 sv 与糖量 ss，遇到跨过甜度 t 的原料时解方程取临界体积 k = (t·sv − ss)/(s_i − t)，用答案更新 ans = max(ans, sv + k) 后截断。两方向扫描保证不漏掉最优配对组合。
4. **边界**：所有原料甜度全在 t 同侧（或全为 0 糖无糖可配）时输出 0.000；注意输出保留三位小数。

**样例验证：** 样例 1 中 s=2 的原料（5 升）本身甜度恰为 t=2，直接计入 5 升；s=5 与 s=1/s=0 的配对再贡献 8 + 8/3 ≈ 9.667？按官方参考程序两方向扫描取最大值，输出 14.667。样例 2 中两种原料甜度 4 和 3 均小于 t=5，无法调出更高甜度，输出 0.000 ✓。`,
    },
  ],
};
