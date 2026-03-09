// 2025年3月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "平均分配",
        problemNumber: "2025-03-23-05-C-01",
        description: "小 A 有 2n 件物品，小 B 和小 C 想从小 A 手上买走这些物品。对于第 i 件物品，小 B 会以 b_i 的价格购买，而小 C 会以 c_i 的价格购买。为了平均分配这 2n 件物品，小 A 决定小 B 和小 C 各自只能买走恰好 n 件物品。你能帮小 A 求出他卖出这 2n 件物品所能获得的最大收入吗？",
        inputDescription: "第一行，一个正整数 n。第二行，2n 个整数 b_1,b_2,...,b_{2n}。第三行，2n 个整数 c_1,c_2,...,c_{2n}。",
        outputDescription: "一行，一个整数，表示答案。",
        samples: [
            { input: "3\n1 3 5 6 8 10\n2 4 6 7 9 11", output: "36" },
            { input: "2\n6 7 9 9\n1 2 10 12", output: "35" }
        ],
        explanation: "先假设全部卖给小 B，得到基础收入 sum(b_i)。再计算每件物品若改卖给小 C 的增量 d_i = c_i - b_i。为了让小 C 恰好买走 n 件物品，只需选择增量最大的 n 件改卖给小 C。",
        tags: ["编程题", "贪心", "排序"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\nconst int N = 2e5 + 5;\nint n;\nlong long b[N], c[N], d[N];\nlong long ans;\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= 2 * n; i++) scanf(\"%lld\", &b[i]);\n    for (int i = 1; i <= 2 * n; i++) scanf(\"%lld\", &c[i]);\n    for (int i = 1; i <= 2 * n; i++) {\n        ans += b[i];\n        d[i] = c[i] - b[i];\n    }\n    sort(d + 1, d + 2 * n + 1);\n    for (int i = n + 1; i <= 2 * n; i++) ans += d[i];\n    printf(\"%lld\\n\", ans);\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "原根判断",
        problemNumber: "2025-03-23-05-C-02",
        description: "小 A 知道，对于质数 p 而言，p 的原根 g 是满足以下条件的正整数：g 与 p 互质；g^(p-1) ≡ 1 (mod p)；并且对于任意 1 ≤ x < p-1，均有 g^x mod p ≠ 1。小 A 现在有一个整数 a，请你帮他判断 a 是不是 p 的原根。",
        inputDescription: "第一行，一个正整数 T，表示测试数据组数。每组测试数据包含一行，两个正整数 a,p。",
        outputDescription: "对于每组测试数据，输出一行，如果 a 是 p 的原根则输出 Yes，否则输出 No。",
        samples: [
            { input: "3\n3 998244353\n5 998244353\n7 998244353", output: "Yes\nYes\nNo" }
        ],
        explanation: "对质数 p，只需验证对于 p-1 的每个不同质因子 q，都有 a^((p-1)/q) mod p != 1。若全部成立，则 a 是 p 的原根。",
        tags: ["编程题", "数论", "快速幂", "原根"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int T;\n    cin >> T;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <cstdio>\nusing namespace std;\nint a, p;\nint ans;\nint fpw(int b, int e) {\n    if (e == 0) return 1;\n    int r = fpw(b, e >> 1);\n    r = 1ll * r * r % p;\n    if (e & 1) r = 1ll * r * b % p;\n    return r;\n}\nvoid check(int e) {\n    if (fpw(a, e) == 1) ans = 0;\n}\nint main() {\n    int T;\n    scanf(\"%d\", &T);\n    while (T--) {\n        scanf(\"%d%d\", &a, &p);\n        ans = 1;\n        int phi = p - 1, r = phi;\n        for (int i = 2; i * i <= phi; i++)\n            if (phi % i == 0) {\n                check(phi / i);\n                while (r % i == 0) r /= i;\n            }\n        if (r > 1) check(phi / r);\n        printf(ans ? \"Yes\\n\" : \"No\\n\");\n    }\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2025-03-l5',
    title: '2025年3月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "链表不具备的特点是 ( ) 。",
            options: [
                "可随机访问任何一个元素",
                "插入、删除操作不需要移动元素",
                "无需事先估计存储空间大小",
                "所需存储空间与存储元素个数成正比",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "双向链表中每个结点有两个指针域prev和next，分别指向该结点的前驱及后继结点。设p指向链表中的 一个结点，它的前驱结点和后继结点均非空。要删除结点p，则下述语句中错误的是（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "p->next->prev = p->next; p->prev->next = p->prev; delete p; 1 2 3 p->prev->next = p->next; p->next->prev = p->prev; delete p; 1 2 3 p->next->prev = p->prev; p->next->prev->next = p->next; delete p; 1 2 3 p->prev->next = p->next; p->prev->next->prev = p->prev; delete p; 1 2 3",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "假设双向循环链表包含头尾哨兵结点 ( 不存储实际内容 ) ，分别为head和tail，链表中每个结点有两个指 针域prev和next，分别指向该结点的前驱及后继结点。下面代码实现了一个空的双向循环链表，横线上应填的最 佳代码是 ( ) 。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "用以下辗转相除法（欧⼏⾥得算法）求 gcd(84, 60) 的步骤中，第二步计算的数是（ ）。 // 链表结点 template <typename T> struct ListNode { T data; ListNode* prev; ListNode* next; // 构造函数 explicit ListNode(const T& val = T()) : data(val), prev(nullptr), next(nullptr) {} }; struct LinkedList { ListNode<T>* head; ListNode<T>* tail; }; void InitLinkedList(LinkedList* list) { list->head = new ListNode<T>; list->tail = new ListNode<T>; ________________________________ // 在此处填入代码 }; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 list->head->prev = list->head; list->tail->prev = list->head; 1 2 list->head->next = list->tail; list->tail->prev = list->head; 1 2 list->head->next = list->tail; list->tail->next = list->head; 1 2 list->head->next = list->tail; list->tail->next = nullptr; 1 2",
            options: [
                "84 和 60",
                "60 和 24",
                "24 和 12",
                "12 和 0",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "根据唯一分解定理，下面整数的唯一分解是正确的（ ）。",
            options: [
                "18 = 3 × 6",
                "28 = 4 × 7",
                "36 = 2 × 3 × 6",
                "30 = 2 × 3 × 5",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下述代码实现素数表的线性筛法，筛选出所有小于等于 的素数，横线上应填的最佳代码是 ( ) 。",
            options: [
                "j < primes.size() int gcd(int a, int b) { int big = a > b ? a : b; int small = a < b ? a : b; if (big % small == 0) { return small; } return gcd(small, big % small); } 1 2 3 4 5 6 7 8 vector<int> sieve_linear(int n) { vector<bool> is_prime(n +1, true); vector<int> primes; if (n < 2) return primes; is_prime[0] = is_prime[1] = false; for (int i = 2; i <= n/2; i++) { if (is_prime[i]) primes.push_back(i); for (int j = 0; ________________________________ ; j++) { // 在此处填入代码 is_prime[ i * primes[j] ] = false; if (i % primes[j] == 0) break; } } for (int i = n/2 +1; i <= n; i++) { if (is_prime[i]) primes.push_back(i); } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25",
                "i * primes[j] <= n",
                "j < primes.size() && i * primes[j] <= n",
                "j <= n",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "在程序运⾏过程中，如果递归调用的层数过多，会因为（ ）引发错误。",
            options: [
                "系统分配的栈空间溢出",
                "系统分配的堆空间溢出",
                "系统分配的队列空间溢出",
                "系统分配的链表空间溢出",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "对下面两个函数，说法错误的是（ ）。",
            options: [
                "两个函数的实现的功能相同。",
                "两个函数的时间复杂度均为 。",
                "factorialA采用递归方式。",
                "factorialB采用递归方式。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下算法中，（ ）是不稳定的排序。",
            options: [
                "选择排序",
                "插入排序",
                "归并排序",
                "冒泡排序",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "考虑以下C++代码实现的快速排序算法，将数据从小到大排序，则横线上应填的最佳代码是( )。 int factorialA(int n) { if (n <= 1) return 1; return n * factorialA(n-1); } int factorialB(int n) { if (n <= 1) return 1; int res = 1; for(int i=2; i<=n; i++) res *= i; } 1 2 3 4 5 6 7 8 9 10 int partition(vector<int>& arr, int low, int high) { int pivot = arr[high]; // 基准值 int i = low - 1; for (int j = low; j < high; j++) { ________________________________ // 在此处填入代码 } swap(arr[i + 1], arr[high]); return i + 1; 1 2 3 4 5 6 7 8 9",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "若用二分法在 [1, 100] 内猜数，最多需要猜（ ）次。",
            options: [
                "100",
                "10",
                "7",
                "5",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面代码实现了二分查找算法，在数组 arr 找到目标元素 target 的位置，则横线上能填写的最佳代码 是（ ）。 } // 快速排序 void quickSort(vector<int>& arr, int low, int high) { if (low < high) { int pi = partition(arr, low, high); quickSort(arr, low, pi - 1); quickSort(arr, pi + 1, high); } } 10 11 12 13 14 15 16 17 18 19 if (arr[j] > pivot) { i++; swap(arr[i], arr[j]); } 1 2 3 4 if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); } 1 2 3 4 if (arr[j] < pivot) { swap(arr[i], arr[j]); i++; } 1 2 3 4 if (arr[j] == pivot) { i++; swap(arr[i], arr[j]); } 1 2 3 4",
            options: [
                "int mid = left + (right - left) / 2;",
                "int mid = left;",
                "int mid = (left + right) / 2;",
                "int mid = right;",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "贪⼼算法的核⼼特征是（ ）。",
            options: [
                "总是选择当前最优解",
                "回溯尝试所有可能",
                "分阶段解决子问题",
                "总能找到最优解",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "函数int findMax(int arr[], int low, int high) 计算数组中最大元素，其中数组arr从索引 low到high，（ ）正确实现了分治逻辑。",
            options: [
                "选项A",
                "选项B",
                "int binarySearch(int arr[], int left, int right, int target) { while (left <= right) { ________________________________ // 在此处填入代码 if (arr[mid] == target) return mid; else if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 if (low == high) return arr[low]; int mid = (low + high) / 2; return arr[mid]; 1 2 3 4 if (low >= high) return arr[low]; int mid = (low + high) / 2; int leftMax = findMax(arr, low, mid - 1); int rightMax = findMax(arr, mid, high); return leftMax + rightMax; 1 2 3 4 5 6",
                "选项D",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "小杨编写了一个如下的高精度乘法函数，则横线上应填写的代码为（ ）。",
            options: [
                "int temp = c[k];",
                "int temp = c[k] + carry;",
                "int temp = c[k] - carry;",
                "int temp = c[k] * carry; if (low > high) return 0; int mid = low + (high - low) / 2; int leftMax = findMax(arr, low, mid); int rightMax = findMax(arr, mid + 1, high); return leftMax * rightMax; 1 2 3 4 5 6 if (low == high) return arr[low]; int mid = low + (high - low) / 2; int leftMax = findMax(arr, low, mid); int rightMax = findMax(arr, mid + 1, high); return (leftMax > rightMax) ? leftMax : rightMax; 1 2 3 4 5 6 vector<int> multiply(vector<int>& a, vector<int>& b) { int m = a.size(), n = b.size(); vector<int> c(m + n, 0); // 逐位相乘，逆序存储 for (int i = 0; i < m; i++) { for (int j = 0; j < n; j++) { c[i + j] += a[i] * b[j]; } } // 处理进位 int carry = 0; for (int k = 0; k < c.size(); ++k) { ________________________________ // 在此处填入代码 c[k] = temp % 10; carry = temp / 10; } while (c.size() > 1 && c.back() == 0) c.pop_back(); return c; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 题号 1 2 3 4 5 6 7 8 9 10 答案",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "快速排序算法的时间复杂度与输入是否有序无关，始终稳定",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "要删除单链表中某个结点`p`(非尾结点)，但不知道头结点，可⾏的操作是将`p->next`的数据拷贝 到`p`的数",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "链表存储线性表时要求内存中可用存储单元地址是连续的。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "线性筛相对于埃拉托斯特尼筛法，每个合数只会被它的最小质因数筛去一次，因此效率更高。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "贪⼼算法通过每一步选择当前最优解，从而一定能获得全局最优解。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "递归函数必须具有一个终⽌条件，以防⽌无限递归。 为 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "归并排序算法的时间复杂度与输入是否有序无关，始终稳定为 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "二分查找适用于对无序数组和有序数组的查找。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨有100元去超市买东西，每个商品有各⾃的价格，每种商品只能买1个，小杨的目标是买到最多数量的商 品。小杨采用的策略是每次挑价格最低的商品买，这体现了分治思想。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "归并排序算法体现了分治算法，每次将大的待排序数组分成大小大致相等的两个小数组，然后分别对两个 小数组进⾏排序，最后对排好序的两个小数组合并成有序数组。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        }
    ]
};
