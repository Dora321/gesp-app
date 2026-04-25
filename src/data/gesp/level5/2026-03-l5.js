// 2026年3月 GESP C++ 五级真题
// 客观题与编程题已按官方 PDF 补全

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      title: '有限不循环小数',
      problemNumber: 'P15798',
      score: 25,
      description: '若最简分数 a / b 可以化为一个有限的、不循环的小数，则称 b 为终止数。请你求出在区间 [L, R] 中终止数的数量。',
      inputDescription: '输入一行，包含两个整数 L 和 R。',
      outputDescription: '输出一行，包含一个整数，表示 L 到 R 中终止数的数量。',
      samples: [
        {
          input: '2 111',
          output: '51'
        }
      ],
      explanation: "一个正整数能作为最简分数分母并得到有限小数，当且仅当它的质因数分解中只包含 2 和 5。枚举区间内每个数，不断除去 2 和 5，最后剩 1 就是终止数。",
      tags: ["编程题", "数论", "枚举"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, r;\n    cin >> l >> r;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, r, ans = 0;\n    cin >> l >> r;\n    for (int i = l; i <= r; i++) {\n        int t = i;\n        while (t && t % 2 == 0) t /= 2;\n        while (t && t % 5 == 0) t /= 5;\n        if (t == 1) ans++;\n    }\n    cout << ans;\n    return 0;\n}",
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      title: '找数',
      problemNumber: 'P15799',
      score: 25,
      description: '给定一个包含 n 个互不相同的正整数的数组 A，以及一个包含 m 个互不相同的正整数的数组 B。输出一个整数，表示在数组 A 与数组 B 中均出现的数的个数。',
      inputDescription: '第一行包含两个整数 n, m。第二行包含 n 个正整数 a_i 表示数组 A。第三行包含 m 个正整数 b_i 表示数组 B。',
      outputDescription: '输出一个整数，表示在数组 A 与数组 B 中均出现的数的个数。',
      samples: [
        {
          input: '3 5\n4 2 3\n3 1 5 4 6',
          output: '2'
        }
      ],
      explanation: "先把数组 A 排序。随后依次读入数组 B 中的每个数，用二分查找判断它是否在 A 中出现；出现就把答案加一。",
      tags: ["编程题", "二分查找", "排序"],
      template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m, l, r, mid;\n    bool ok;\n    cin >> n >> m;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    int ans = 0;\n    for (int i = 0, b; i < m; i++) {\n        cin >> b;\n        ok = false;\n        l = 0;\n        r = n - 1;\n        while (l <= r) {\n            mid = l + (r - l) / 2;\n            if (a[mid] > b) r = mid - 1;\n            else if (a[mid] < b) l = mid + 1;\n            else {\n                ok = true;\n                break;\n            }\n        }\n        if (ok) ans++;\n    }\n    cout << ans;\n    return 0;\n}",
    }
];

export const paperData = {
    id: '2026-03-l5',
    title: '2026年3月 GESP C++ 五级真题',
    level: 5,
    year: 2026,
    month: 3,
    session: 13,
    note: '按官方 PDF 补全',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `关于单链表、双链表和循环链表，下列说法正确的是（ ）。`,
            options: [
                "在单链表中，若已知任意结点的指针，则可以在 O(1) 时间内删除该结点。",
                "循环链表中一定不存在空指针。",
                "在循环双链表中，尾结点的 next 指针一定为 nullptr。",
                "在带头结点的循环单链表中，判定链表是否为空只需判断头结点的 next 是否指向自身。"
            ],
            answer: 3,
            score: 2,
            explanation: "带头结点的循环单链表在空表时只有头结点自身，因此 head->next 是否回到头结点即可判空。",
            tags: ["客观题", "单选题", "链表"]
        },
        {
            id: 2,
            type: "single",
            question: `双向循环链表中要在结点 p 之前插入新结点 s（均非空），以下指针操作正确的是（ ）。`,
            options: [
                "s->next = p;\np->prev = s;\np->next = s;\ns->prev = p;",
                "s->prev = p;\ns->next = p->next;\np->next->prev = s;\np->next = s;",
                "s->next = p;\ns->prev = p->prev;\np->prev->next = s;\np->prev = s;",
                "s->next = p;\ns->prev = nullptr;\np->prev = s;"
            ],
            answer: 2,
            score: 2,
            explanation: "在 p 前插入 s 时，需要让 s 接到 p 和 p->prev 之间，再分别修正四条双向链。",
            tags: ["客观题", "单选题", "链表", "指针"]
        },
        {
            id: 3,
            type: "single",
            question: `下面函数用“哑结点”统一处理删除单向链表中的头结点与中间结点。横线处应填（ ）。\n\nstruct Node {\n int val;\n Node* next;\n Node(int v): val(v), next(nullptr) {}\n};\n\nNode* eraseAll(Node* head, int x) {\n Node dummy(0);\n dummy.next = head;\n Node* cur = &dummy;\n while (cur->next) {\n if (cur->next->val == x) {\n Node* del = cur->next;\n ______________________\n delete del;\n } else cur = cur->next;\n }\n return dummy.next;\n}`,
            options: [
                "cur = cur->next;",
                "cur->next = del->next;",
                "del->next = cur->next;",
                "cur->next = nullptr;"
            ],
            answer: 1,
            score: 2,
            explanation: "删除 cur->next 指向的结点时，应先让 cur->next 跳过 del，连接到 del->next。",
            tags: ["客观题", "单选题", "链表"]
        },
        {
            id: 4,
            type: "single",
            question: `对如下代码实现的欧几里得算法（辗转相除法），执行 gcd(48, 18) 得到的调用序列为（ ）。\n\nint gcd(int a, int b) {\n return b == 0 ? a : gcd(b, a % b);\n}`,
            options: [
                "gcd(48,18) -> gcd(18,12) -> gcd(12,6) -> gcd(6,0)",
                "gcd(48,18) -> gcd(30,18) -> gcd(12,18)",
                "gcd(48,18) -> gcd(18,30) -> gcd(30,6)",
                "gcd(48,18) -> gcd(12,18) -> gcd(6,12)"
            ],
            answer: 0,
            score: 2,
            explanation: "每次递归把参数变成 (b, a%b)，所以依次得到 (18,12)、(12,6)、(6,0)。",
            tags: ["客观题", "单选题", "递归", "数论"]
        },
        {
            id: 5,
            type: "single",
            question: `下面代码实现了欧拉（线性）筛，横线处应填写（ ）。\n\nvector<int> euler_sieve(int n) {\n vector<bool> is_composite(n + 1, false);\n vector<int> primes;\n for (int i = 2; i <= n; i++) {\n if (!is_composite[i]) primes.push_back(i);\n for (int j = 0; __________________________ && (long long)i * primes[j] <= n; j++) {\n is_composite[i * primes[j]] = true;\n if (i % primes[j] == 0) break;\n }\n }\n return primes;\n}`,
            options: [
                "j <= n",
                "j < sqrt(n)",
                "j < primes.size()",
                "j < i"
            ],
            answer: 2,
            score: 2,
            explanation: "内层循环遍历当前已找到的素数表，因此边界应是 primes.size()。",
            tags: ["客观题", "单选题", "筛法"]
        },
        {
            id: 6,
            type: "single",
            question: `埃氏筛中将内层循环从 j = i * i 开始而不是 j = 2 * i 的主要原因是（ ）。`,
            options: [
                "因为 2 * i 一定不是合数",
                "i * i 一定是质数",
                "小于 i * i 的 i 的倍数已被更小质因子筛过",
                "这样可以把时间复杂度降为 O(n)"
            ],
            answer: 2,
            score: 2,
            explanation: "对于 i 的较小倍数，它们早已在处理更小质因子时被标记过了，从 i*i 开始可避免重复。",
            tags: ["客观题", "单选题", "筛法"]
        },
        {
            id: 7,
            type: "single",
            question: `下面程序的运行结果为（ ）。\n\nbool check(int n, int a[], int k, int dist) {\n int cnt = 1;\n int last = a[0];\n for (int i = 1; i < n; i++) {\n if (a[i] - last >= dist) {\n cnt++;\n last = a[i];\n }\n }\n return cnt >= k;\n}\n\nint solve(int n, int a[], int k) {\n sort(a, a + n);\n int l = 0;\n int r = a[n - 1] - a[0];\n while (l < r) {\n int mid = (l + r + 1) / 2;\n if (check(n, a, k, mid)) l = mid;\n else r = mid - 1;\n }\n return l;\n}\n\nint main() {\n int a[] = {1, 2, 8, 4, 9};\n int n = 5;\n int k = 3;\n cout << solve(n, a, k) << endl;\n}`,
            options: [
                "2",
                "3",
                "4",
                "5"
            ],
            answer: 1,
            score: 2,
            explanation: "排序后为 1,2,4,8,9。选 1、4、8 时最小间距最大，为 3。",
            tags: ["客观题", "单选题", "二分答案"]
        },
        {
            id: 8,
            type: "single",
            question: `在升序数组中查找第一个大于等于 x 的位置，下面循环中横线应填（ ）。\n\nint lowerBound(const vector<int>& a, int x) {\n int l = 0, r = a.size();\n while (l < r) {\n int mid = l + (r - l) / 2;\n if (a[mid] >= x) _____________;\n else l = mid + 1;\n }\n return l;\n}`,
            options: [
                "r = mid;",
                "r = mid - 1;",
                "l = mid;",
                "l = mid + 1;"
            ],
            answer: 0,
            score: 2,
            explanation: "当 a[mid] 已满足条件时，应保留 mid 作为候选答案，因此右边界收缩到 mid。",
            tags: ["客观题", "单选题", "二分查找"]
        },
        {
            id: 9,
            type: "single",
            question: `关于递归函数调用，下列说法错误的是（ ）。`,
            options: [
                "递归调用层次过深时，可能会耗尽栈空间导致栈溢出。",
                "尾递归函数可以通过编译器优化来避免栈溢出。",
                "所有递归函数都可以通过循环结构来改写，从而避免栈溢出。",
                "栈溢出发生时，程序会抛出异常并可以继续执行后续代码。"
            ],
            answer: 3,
            score: 2,
            explanation: "栈溢出通常会导致程序异常终止，并不能保证还能继续执行后续代码。",
            tags: ["客观题", "单选题", "递归"]
        },
        {
            id: 10,
            type: "single",
            question: `给定 n 根木头，第 i 根长度为 a[i]。要切成不少于 m 段等长木段，求最大可能长度，则横线上应填写（ ）。\n\nconst int MAXN = 100005;\nlong long a[MAXN];\nint n, m;\n\nbool check(long long x) {\n long long cnt = 0;\n for (int i = 1; i <= n; i++) {\n if (x == 0) return true;\n cnt += a[i] / x;\n if (cnt >= m) return true;\n }\n return false;\n}\n\nint main() {\n cin >> n >> m;\n long long mx = 0;\n for (int i = 1; i <= n; i++) {\n cin >> a[i];\n mx = max(mx, a[i]);\n }\n long long l = 1, r = mx;\n long long ans = 0;\n while (l <= r) {\n long long mid = l + (r - l) / 2;\n if (check(mid)) {\n ans = mid;\n ______________________\n } else {\n ______________________\n }\n }\n cout << ans << endl;\n}`,
            options: [
                "l = mid + 1;\nr = mid - 1;",
                "l = mid - 1;\nr = mid + 1;",
                "l = mid + 1;\nr = mid;",
                "l = mid;\nr = mid + 1;"
            ],
            answer: 0,
            score: 2,
            explanation: "可行时应继续向右找更长长度，所以 l = mid + 1；不可行时向左缩到 r = mid - 1。",
            tags: ["客观题", "单选题", "二分答案"]
        },
        {
            id: 11,
            type: "single",
            question: `下面代码用分治求“最大连续子段和”，其时间复杂度为（ ）。\n\nint solve(vector<int>& a, int l, int r) {\n if (l == r) return a[l];\n int mid = l + (r - l) / 2;\n int left = solve(a, l, mid);\n int right = solve(a, mid + 1, r);\n int sum = 0, lmax = INT_MIN;\n for (int i = mid; i >= l; i--) {\n sum += a[i];\n lmax = max(lmax, sum);\n }\n sum = 0;\n int rmax = INT_MIN;\n for (int i = mid + 1; i <= r; i++) {\n sum += a[i];\n rmax = max(rmax, sum);\n }\n return max({left, right, lmax + rmax});\n}`,
            options: [
                "O(n^2)",
                "O(n log n)",
                "O(log n)",
                "O(n)"
            ],
            answer: 1,
            score: 2,
            explanation: "递推式为 T(n) = 2T(n/2) + O(n)，根据主定理可得时间复杂度为 O(n log n)。",
            tags: ["客观题", "单选题", "分治"]
        },
        {
            id: 12,
            type: "single",
            question: `游戏大赛决赛，两组选手分别按得分从小到大排好队，现在要把他们合并成一个有序排行榜。A 组：A = {12, 35, 67, 89}，B 组：B = {20, 45, 55, 78}。下面是归并合并函数的核心循环，横线处应填入（ ）。\n\nint i = 0, j = 0;\nvector<int> result;\nwhile (i < A.size() && j < B.size()) {\n if (___________________) {\n result.push_back(A[i++]);\n } else {\n result.push_back(B[j++]);\n }\n}`,
            options: [
                "A[i] >= B[j]",
                "A[i] <= B[j]",
                "i >= j",
                "i <= j"
            ],
            answer: 1,
            score: 2,
            explanation: "要保持整体升序，应在 A[i] 不大于 B[j] 时优先放入 A[i]。",
            tags: ["客观题", "单选题", "归并排序"]
        },
        {
            id: 13,
            type: "single",
            question: `有 n 位同学的成绩已经从小到大排好序，现在对它执行下面这段以第一个元素为 pivot 的快速排序，请问此次排序的时间复杂度是（ ）。\n\nvoid quicksort(vector<int>& a, int l, int r) {\n if (l >= r) return;\n int pivot = a[l];\n int i = l, j = r;\n while (i < j) {\n while (i < j && a[j] >= pivot) j--;\n while (i < j && a[i] <= pivot) i++;\n if (i < j) swap(a[i], a[j]);\n }\n swap(a[l], a[i]);\n quicksort(a, l, i - 1);\n quicksort(a, i + 1, r);\n}`,
            options: [
                "O(n)",
                "O(n log n)",
                "O(n^2)",
                "O(log n)"
            ],
            answer: 2,
            score: 2,
            explanation: "数组已升序且总选首元素为枢轴，会退化成每次只划分出一个元素的最坏情况，复杂度为 O(n^2)。",
            tags: ["客观题", "单选题", "快速排序"]
        },
        {
            id: 14,
            type: "single",
            question: `下面关于排序算法的描述中，不正确的是（ ）。`,
            options: [
                "冒泡排序和插入排序都是稳定的排序算法。",
                "快速排序和归并排序都是不稳定的排序算法。",
                "冒泡排序和插入排序最好时间复杂度均为 O(n)。",
                "归并排序在最好、最坏和平均三种情况下的时间复杂度均为 O(n log n)。"
            ],
            answer: 1,
            score: 2,
            explanation: "归并排序是稳定排序，快速排序通常是不稳定排序，因此 B 说法错误。",
            tags: ["客观题", "单选题", "排序"]
        },
        {
            id: 15,
            type: "single",
            question: `下面代码实现两个整数除法，其中被除数为一个“大整数”，用字符串表示，除数是一个小整数，用 int 表示，则横线处应该填写（ ）。\n\nint main() {\n string s;\n int b;\n cin >> s >> b;\n vector<int> a;\n for (char c : s) a.push_back(c - '0');\n vector<int> c;\n long long rem = 0;\n for (int i = 0; i < a.size(); i++) {\n rem = rem * 10 + a[i];\n int q = rem / b;\n c.push_back(q);\n ______________________\n }\n int pos = 0;\n while (pos < c.size() - 1 && c[pos] == 0) pos++;\n for (int i = pos; i < c.size(); i++) cout << c[i];\n cout << endl;\n cout << rem << endl;\n}`,
            options: [
                "rem /= b;",
                "rem %= b;",
                "rem = b;",
                "rem = q;"
            ],
            answer: 1,
            score: 2,
            explanation: "长除法中 rem 应保留当前余数，因此应更新为 rem %= b。",
            tags: ["客观题", "单选题", "高精度"]
        },
        {
            id: 16,
            type: "judge",
            question: `有一个存储了 n 个整数的线性表，分别用数组和单链表两种方式实现。在已知下标（或结点指针）的前提下，数组的随机访问是 O(1)，而在链表中已知某结点的指针时，在该结点之后插入一个新结点的操作也是 O(1)。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "数组按下标随机访问是 O(1)；单链表若已知结点指针，在其后插入新结点只需常数次指针修改。",
            tags: ["客观题", "判断题", "线性表"]
        },
        {
            id: 17,
            type: "judge",
            question: `若数组 a 已按升序排列，则下面代码可以正确实现“在 a 中查找第一个大于等于 x 的元素的位置”。\n\nint lowerBound(vector<int>& a, int x) {\n int l = 0, r = a.size();\n while (l < r) {\n int mid = (l + r) / 2;\n if (a[mid] >= x) r = mid;\n else l = mid + 1;\n }\n return l;\n}`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "这是标准 lower_bound 写法，循环结束时 l 恰为第一个大于等于 x 的位置。",
            tags: ["客观题", "判断题", "二分查找"]
        },
        {
            id: 18,
            type: "judge",
            question: `快速排序只要每次都选取中间元素作为枢轴，就一定是稳定排序。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "枢轴选择方式不会改变快速排序本身通常不稳定的事实。",
            tags: ["客观题", "判断题", "快速排序"]
        },
        {
            id: 19,
            type: "judge",
            question: `若某算法满足递推式 T(n) = 2T(n / 2) + O(n)，则其时间复杂度为 O(n log n)。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "根据主定理，a = 2、b = 2、f(n) = O(n)，可得时间复杂度为 O(n log n)。",
            tags: ["客观题", "判断题", "分治"]
        },
        {
            id: 20,
            type: "judge",
            question: `在一个数组中，如果两个元素 a[i] 和 a[j] 满足 i < j 且 a[i] > a[j]，则 a[i] 和 a[j] 是一个逆序对。下列代码可以正确统计数组 a 区间 [l, r] 内的逆序对总数。\n\nlong long cnt = 0;\nvoid merge_count(vector<int>& a, int l, int m, int r) {\n int i = l, j = m + 1;\n while (i <= m && j <= r) {\n if (a[i] <= a[j]) i++;\n else {\n cnt += (m - i + 1);\n j++;\n }\n }\n}`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "这段代码只统计跨区间逆序对，缺少完整归并过程，不能单独正确统计整个区间的逆序对总数。",
            tags: ["客观题", "判断题", "归并排序", "逆序对"]
        },
        {
            id: 21,
            type: "judge",
            question: `根据唯一分解定理，如果大于 1 的整数 n 不能被任何不超过其平方根的质数整除，那么 n 一定是质数。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "若 n 是合数，则必有一个不大于 sqrt(n) 的质因子，因此该命题成立。",
            tags: ["客观题", "判断题", "数论"]
        },
        {
            id: 22,
            type: "judge",
            question: `假设数组 a 的值域范围是 [0, D]，下列程序的时间复杂度是 O(n log n + n log D)。\n\nbool check(int n, int a[], int k, int dist) {\n int cnt = 1;\n int last = a[0];\n for (int i = 1; i < n; i++) {\n if (a[i] - last >= dist) {\n cnt++;\n last = a[i];\n }\n }\n return cnt >= k;\n}\n\nint solve(int n, int a[], int k) {\n sort(a, a + n);\n int l = 0;\n int r = a[n - 1] - a[0];\n while (l < r) {\n int mid = (l + r + 1) / 2;\n if (check(n, a, k, mid)) l = mid;\n else r = mid - 1;\n }\n return l;\n}`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "先排序 O(n log n)，再在答案范围上二分 O(log D) 次，每次 check 线性扫描 O(n)，总复杂度为 O(n log n + n log D)。",
            tags: ["客观题", "判断题", "二分答案"]
        },
        {
            id: 23,
            type: "judge",
            question: `若一个问题满足最优子结构性质，则一定可以用贪心算法得到最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "最优子结构只是动态规划和贪心可能共用的性质之一，不足以保证贪心策略一定正确。",
            tags: ["客观题", "判断题", "算法设计"]
        },
        {
            id: 24,
            type: "judge",
            question: `线性筛相比埃氏筛的核心改进在于：埃氏筛中一个合数可能被多个质数重复标记，线性筛通过“每个合数只被其最大质因子筛去”的策略，保证每个合数恰好被标记一次，从而实现 O(n) 的时间复杂度。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "线性筛强调的是每个合数由其最小质因子对应的一次转移完成标记，不是最大质因子。",
            tags: ["客观题", "判断题", "筛法"]
        },
        {
            id: 25,
            type: "judge",
            question: `任何递归程序都可以改写为等价的非递归程序，但改写后的非递归程序一定需要显式地使用栈来模拟递归调用过程。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "递归可以改写为非递归，但未必都必须显式使用栈，例如部分情形可直接改写为循环或用其他状态表示方式。",
            tags: ["客观题", "判断题", "递归"]
        },
        ...programmingQuestions
    ]
};
