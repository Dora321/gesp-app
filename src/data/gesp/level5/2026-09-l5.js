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
    officialPdf: 'https://gesp.ccf.org.cn/101/attach/1767258833551392.pdf',
    type: 'official',
    notes: '全卷依据 CCF 官网 PDF 逐题转录；Q1/Q2 选项、Q7 分解数、判断题复杂度记号、编程题数据范围均渲染核对。',
  },
  verification: {
    "status": "verified",
    "reviewedBy": "AI-Codex",
    "reviewedAt": "2026-11-06",
    "scope": "全卷27题的题面、选项、答案、解析，以及两道编程题的样例、数据范围与参考代码。",
    "notes": "AI-Codex 对照官方PDF 1767258833551392.pdf全卷文本及第1/3/6/8/10/11页渲染图。单选ACBCDBADCBDADCC，判断√×√√×√×√××。补正Q7指数与Q19代码，Q27恢复原卷参考程序，修复提前停止错误。参考代码编译、官方样例和针对性反例运行核对。AI核验。",
    "dimensions": {
      "statement": "verified",
      "options": "verified",
      "answer": "verified",
      "explanation": "verified",
      "referenceCode": "verified"
    }
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
      explanation: `**答案为A。**

已知尾指针tail，插入位置可以直接找到。先建立新结点s，并将其next初始化为nullptr，再令tail->next=s、tail=s，即完成表尾插入。需要修改的指针个数固定，与链表长度无关，时间为O(1)。

若只知道head，需要先遍历找到尾结点，这时才会产生O(n)的查找代价。链表是否维护tail是本题判断复杂度的条件。`,
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
      explanation: `**答案为B。**

质数p从小到大枚举。当首次遇到i%p==0时，p就是i的最小质因子。当前乘积i*p先被标记，然后退出内层循环。若继续使用更大的质数q，i*q的最小质因子仍是p，之后会由p对应的组合再次标记，破坏线性筛的一次性。

例如i=6时，用2标记12后就退出，不再用3标记18。18由i=9、p=2这一组标记。A和C只会在i本身为质数等特殊情况下退出，D只限制乘积等于上界的情况，它们主要造成重复标记，不能解释成“其余合数全部漏标”。`,
    },
    {
      id: 7,
      type: 'single',
      question: `根据唯一分解定理，整数 756 的正确质因数分解是（ ）。`,
      options: ['2² × 3³ × 7', '2³ × 3² × 7', '2² × 3² × 21', '2 × 3³ × 14'],
      answer: 0,
      score: 2,
      tags: ['数论'],
      explanation: `**答案为A。**

连续除以质因子可得756=2×378=2²×189=2²×3³×7，所有因子2、3、7都是质数，符合唯一分解定理。

B为2³×3²×7，值为504，与756不同。C为2²×3²×21，值为756，但21是合数，尚未分解到质因子。D为2×3³×14，值同样为756，但14也是合数。C、D的数值相等并不足以满足“质因数分解”的要求。`,
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
      explanation: `**答案为D。**

递归到n=1时返回1。随后逐层返回，f(2)=2+1=3，f(3)=3+3=6，f(4)=4+6=10。

也可以把调用展开为4+3+2+1。选项4只保留了最外层的n，7相当于只加4和3，9则漏掉递归出口返回的1。必须既跟踪递归调用，也把出口返回值纳入求和。`,
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
      explanation: `**答案为B。**

载重量增加不会使可行运输方案失效，所以check从不可行到可行具有单调性。mid可行时保留mid并向左找更小载重，令r=mid。mid不可行时，所有不大于mid的值都可排除，令l=mid+1。

A在可行时向右搜索，会丢弃可能更小的答案。C把可行的mid直接排除，且l=mid可能停滞。D两处分支的收缩方向相反，同样无法维持“最小可行值位于当前区间”的不变量。`,
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
      explanation: `**答案为D。**

升序合并每次应取两个当前元素中的较小者。当二者相等时，原数组中左半部分的元素在前，因此先取左半的a[i]，才能保持相同关键字的原有次序。条件应为a[i]<=a[j]。

A在相等时取右半，虽然仍有序，却会失去稳定性。B在左侧较大时先取左侧，直接破坏升序。C也会优先取较大者。D同时满足升序与相等时左侧优先。`,
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
      explanation: `**答案为D。**

按结束时间升序选择与已选活动兼容的活动，可为后续留下最多时间。若某个最优解第一场结束得更晚，把它替换成最早结束的活动不会挤掉后续活动，因此可逐步得到最优方案。

开始最早可能选中占满全天的活动。持续最短也可能失败，例如活动[0,3)、[3,6)、[2,4)。最短的[2,4)同时与另外两场冲突，选择后只能安排1场，而前两场可安排2场。参与人数与时间兼容性无关。`,
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
      question: `下面埃氏筛从 i * i 开始标记，是因为 i * i 之前的 i 的合数倍数已经被更小的质因子标记过。
\`\`\`cpp
for (int i = 2; (long long)i * i <= n; i++) {
    if (isPrime[i]) {
        for (int j = i * i; j <= n; j += i) {
            isPrime[j] = false;
        }
    }
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['筛法'],
      explanation: `**答案为正确。**

筛到质数i时，i的合数倍数i*k若小于i²，则2<=k<i。k至少有一个不大于k的质因子p，因此p<i。这个乘积在筛p的倍数时已经被标记，不需要再从2*i开始。

从i²开始可以跳过这些已处理的小倍数，同时仍覆盖所有需要由i标记的合数。这个优化减少重复工作，但埃氏筛中同一合数仍可能被不同质数标记，不能据此声称整个筛法每个合数只标记一次。`,
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
      explanation: `**答案为错误，按本题要求的紧确增长量级判断。**

i从1开始每轮翻倍，在不发生整型溢出的通常复杂度分析范围内，执行floor(log₂n)+1次，所以紧确量级为Θ(log n)，通常写作O(log n)。

大O在数学上表示上界，O(n)也是较宽松的上界。本题沿用考试中给出紧确量级的惯例，官方判错。每轮加固定步长也不能脱离循环上下界，直接断言任何此类循环都是O(n)。`,
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
      explanation: `**答案为错误。**

在已升序数组上以首元素为枢轴，枢轴每次都是最小值，一边为空、另一边仅减少一个元素。各层划分长度依次为n、n-1等，总工作量为Θ(n²)，达到快速排序的最坏情况。

随机选枢轴可以降低这种退化的概率，使期望复杂度达到O(n log n)，但它不提供最坏情况保证。三数取中也能改善部分输入，仍可能遇到退化排列。`,
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
      explanation: `**答案为错误。**

borrow=1表示上一位向当前位借走了1，因此当前位应计算a[i]-b[i]-borrow。题中却加上borrow，借位方向写反。

例如100-1，低位在前的数组分别为[0,0,1]和[1,0,0]。个位算得-1，补10后写9并令borrow=1。十位按原代码得到0-0+1=1，百位得到1，最终成为119，正确结果应为99。

即使假设数组已经补零到len且不会越界，这个反例仍然成立。修复时应减去借位，负数补10后将borrow设为1，非负时设为0。`,
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
      explanation: `**解题思路**

先用埃氏筛建立2到n的质数表，再枚举不超过n/2的质数p。若n-p也为质数，就得到一组分解。限制p<=n-p可避免把3+7与7+3重复计数，同时保留2+2、5+5这类相同质数的合法组合。

样例4只有2+2这一组。样例10有3+7与5+5两组。当前参考代码从p²开始筛倍数，是对原卷从2p开始筛的等价优化。筛选耗时O(n log log n)，枚举不超过O(n)，空间O(n)。`,
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
      referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nconst int N = 2005;\nint n, t;\nint v[N], s[N], p[N];\ndouble ans;\nbool cmp(int x, int y) {\n    return s[x] < s[y];\n}\nint main() {\n    scanf(\"%d%d\", &n, &t);\n    for (int i = 1; i <= n; i++) {\n        scanf(\"%d%d\", &v[i], &s[i]);\n        p[i] = i;\n    }\n    sort(p + 1, p + n + 1, cmp);\n    int ss = 0, sv = 0;\n    for (int i = 1; i <= n; i++) {\n        int cv = v[p[i]], cs = s[p[i]];\n        if (ss + cs * cv > t * (sv + cv)) {\n            double k = (double)(t * sv - ss) / (cs - t);\n            ans = max(ans, sv + k);\n            break;\n        }\n        ss += cs * cv;\n        sv += cv;\n    }\n    if (ss == sv * t) ans = max(ans, (double)sv);\n    sv = ss = 0;\n    for (int i = n; i >= 1; i--) {\n        int cv = v[p[i]], cs = s[p[i]];\n        if (ss + cs * cv < t * (sv + cv)) {\n            double k = (double)(t * sv - ss) / (cs - t);\n            ans = max(ans, sv + k);\n            break;\n        }\n        ss += cs * cv;\n        sv += cv;\n    }\n    if (ss == sv * t) ans = max(ans, (double)sv);\n    printf(\"%.3lf\\n\", ans);\n    return 0;\n}\n",
      explanation: `**解题思路**

按甜度从小到大排序，累计已加入原料的糖量ss与体积sv。只有加入当前原料的全部存量后会令总体甜度超过t，才需要只取一部分并停止。设当前甜度cs、可用体积cv，解ss+cs*k=t*(sv+k)，得k=(t*sv-ss)/(cs-t)。未越界时应整份加入并继续扫描。

升序扫描得到全体原料总体偏甜时的最优方案。所有偏淡原料都可用来抵消糖分，偏甜原料优先取最接近t的品种，每消耗相同的抵消额度可保留更多体积。总体偏淡时，对称地做降序扫描。总体恰好为t时全部加入。两次取最大值，排序耗时O(n log n)，扫描O(n)。

样例1先取1升甜度0、6升甜度1和5升甜度2，共12升、16克糖。再取甜度5的原料k=(2*12-16)/(5-2)=8/3升，总体积为14.666…，输出14.667。样例2全都低于5且没有甜度等于5的原料，输出0.000。`,
    },
  ],
};
