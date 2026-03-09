// 2025年6月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "奖品兑换",
        problemNumber: "2025-06-22-05-C-01",
        description: "班主任给上课专心听讲、认真完成作业的同学们分别发放了若干张课堂优秀券和作业优秀券。同学们可以使用这两种券找班主任兑换奖品。具体来说，可以使用 a 张课堂优秀券和 b 张作业优秀券兑换一份奖品，或者使用 b 张课堂优秀券和 a 张作业优秀券兑换一份奖品。现在小 A 有 n 张课堂优秀券和 m 张作业优秀券，他最多能兑换多少份奖品呢？",
        inputDescription: "第一行，两个正整数 n,m，分别表示小 A 持有的课堂优秀券和作业优秀券的数量。第二行，两个正整数 a,b，表示兑换一份奖品所需的两种券的数量。",
        outputDescription: "输出共一行，一个整数，表示最多能兑换的奖品份数。",
        samples: [
            { input: "8 8\n2 1", output: "5" },
            { input: "314159 2653589\n27 1828", output: "1599" }
        ],
        explanation: "答案具有单调性：若能兑换 v 份，则一定也能兑换更少的份数。可以二分答案 v，再检查是否能把这 v 份分成两种兑换方式，使两类券都不超出持有数量。",
        tags: ["编程题", "二分答案", "数学"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m, a, b;\n    cin >> n >> m >> a >> b;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nint n, m, a, b;\nint l, r;\nint check(int v) {\n    long long x, y, t;\n    x = 1ll * v * a;\n    y = 1ll * v * b;\n    if (y > m) {\n        t = (y - m + (b - a) - 1) / (b - a);\n        y -= t * (b - a);\n        x += t * (b - a);\n    }\n    return x <= n && y <= m;\n}\nint main() {\n    scanf(\"%d%d\", &n, &m);\n    scanf(\"%d%d\", &a, &b);\n    if (n > m) swap(n, m);\n    if (a > b) swap(a, b);\n    if (a == b) {\n        printf(\"%d\\n\", n / a);\n        return 0;\n    }\n    l = 0;\n    r = n;\n    while (l < r) {\n        int mid = (l + r + 1) >> 1;\n        if (check(mid)) l = mid;\n        else r = mid - 1;\n    }\n    printf(\"%d\\n\", r);\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "最大公因数",
        problemNumber: "2025-06-22-05-C-02",
        description: "对于两个正整数 a,b，他们的最大公因数记为 gcd(a,b)。对于 k 个正整数 c_1,c_2,...,c_k，它们的最大公因数可以递归定义。给定 n 个正整数 a_1,a_2,...,a_n 以及 q 组询问。对于第 i 组询问，请求出 gcd(a_1+i,a_2+i,...,a_n+i)。",
        inputDescription: "第一行，两个正整数 n,q，分别表示给定正整数的数量，以及询问组数。第二行，n 个正整数 a_1,a_2,...,a_n。",
        outputDescription: "输出共 q 行，第 i 行包含一个正整数，表示 a_1+i,a_2+i,...,a_n+i 的最大公因数。",
        samples: [
            { input: "5 3\n6 9 12 18 30", output: "1\n1\n3" },
            { input: "3 5\n31 47 59", output: "1\n1\n1\n1\n1" }
        ],
        explanation: "将数组排序后，设所有相邻差值的 gcd 为 g，则 gcd(a_1+i,a_2+i,...,a_n+i) = gcd(g, a_1+i)。因此预处理一次差分 gcd 后，每次询问只需再求一次 gcd。",
        tags: ["编程题", "数论", "最大公因数"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, q;\n    cin >> n >> q;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nconst int N = 1e5 + 5;\nint n, q, a[N], g;\nint gcd(int a, int b) {\n    if (a == 0 || b == 0) return a + b;\n    return gcd(b, a % b);\n}\nint main() {\n    scanf(\"%d%d\", &n, &q);\n    for (int i = 1; i <= n; i++) scanf(\"%d\", &a[i]);\n    sort(a + 1, a + n + 1);\n    for (int i = 2; i <= n; i++) g = gcd(g, a[i] - a[i - 1]);\n    for (int i = 1; i <= q; i++) printf(\"%d\\n\", gcd(g, a[1] + i));\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2025-06-l5',
    title: '2025年6月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "与数组相比，链表在（ ）操作上通常具有更高的效率。",
            options: [
                "随机访问元素",
                "查找指定元素",
                "在已知位置插入或删除节点",
                "遍历所有元素",
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
            id: 2,
            type: "single",
            question: "下面C++代码实现双向链表。函数 is_empty() 判断链表是否为空，如链表为空返回 true ，否则返回 false 。横线处不能填写（ ）。 // 节点结构体 struct Node { int data; Node* prev; Node* next; }; // 双向链表结构体 struct DoubleLink { Node* head; Node* tail; int size; DoubleLink() { head = nullptr; tail = nullptr; size = 0; } ~DoubleLink() { Node* curr = head; while (curr) { Node* next = curr->next; delete curr; curr = next; } } // 判断链表是否为空 bool is_empty() const { _______________________ } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32",
            options: [
                "return head == nullptr;",
                "return tail == nullptr;",
                "return head.data == 0;",
                "return size == 0;",
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
            id: 3,
            type: "single",
            question: "基于上题代码正确的前提下，填入相应代码完善 append() ，用于在双向链表尾部增加新节点，横线上应填 写（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
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
            id: 4,
            type: "single",
            question: "下列C++代码用循环链表解决约瑟夫问题，即假设 n 个⼈围成一圈，从第一个⼈开始数，每次数到第 k 个 的⼈就出圈，输出最后留下的那个⼈的编号。横线上应填写（ ）。 };33 void append(int data) { Node* newNode = new Node{data, nullptr, nullptr}; if (is_empty()) { head = tail = newNode; } else { _______________________ } ++size; } 1 2 3 4 5 6 7 8 9 10 tail->next = newNode;1 newNode->prev = tail; tail = newNode; 1 2 tail = newNode; newNode->prev = tail; tail->next = newNode; 1 2 3 tail->next = newNode; newNode->prev = tail; tail = newNode; 1 2 3 struct Node { int data; Node* next; }; Node* createCircularList(int n) { Node* head = new Node{1, nullptr}; Node* prev = head; for (int i = 2; i <= n; ++i) { Node* node = new Node{i, nullptr}; prev->next = node; 1 2 3 4 5 6 7 8 9 10 11",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 5,
            type: "single",
            question: "下列C++代码判断一个正整数是否是质数，说法正确的是( )。 prev = node; } prev->next = head; return head; } int fingLastSurvival(int n, int k) { Node* head = createCircularList(n); Node* p = head; Node* prev = nullptr; while (p->next != p) { for (int count = 1; count < k; ++count) { prev = p; p = p->next; } _______________________ } cout << \"最后留下的人编号是: \" << p->data << endl; delete p; return 0; } 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 prev->next = p->next; delete p; p = prev->next; 1 2 3 delete p; prev->next = p->next; p = prev->next; 1 2 3 delete p; p = prev->next; prev->next = p->next; 1 2 3 prev->next = p->next; p = prev->next; delete p; 1 2 3 bool is_prime(int n) { if (n <= 1) return false; if (n == 2 || n == 3 || n == 5) return true; if (n % 2 == 0 || n % 3 == 0 || n % 5 == 0) return false; int i = 7; int step = 4; int finish_number = sqrt(n) + 1; 1 2 3 4 5 6 7 8 9 10 11",
            options: [
                "代码存在错误，比如 5 是质数，但因为5 % 5 余数是 0 返回了false",
                "finish_number 的值应该是n / 2 ，当前写法将导致错误",
                "当前while 循环正确的前提是：所有大于 3 的质数都符合6k±1 形式",
                "while 循环修改如下，其执⾏效果和执⾏时间相同。",
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
            id: 6,
            type: "single",
            question: "下列 C++ 代码用两种方式求解两个正整数的最大公约数，说法错误的是 ( ) 。",
            options: [
                "gcd0() 函数的时间复杂度为",
                "gcd1() 函数的时间复杂度为",
                "一般说来，gcd0() 的效率高于gcd1()",
                "gcd1() 中的代码for (int i = small; i >= 1; --i) 应该修改为for (int i = small; i > 1; --i)",
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
            id: 7,
            type: "single",
            question: "下面的代码用于判断整数 是否是质数，错误的说法是（ ）。 while (i <= finish_number) { if (n % i == 0) return false; i += step; step = 6 - step; } return true; } 12 13 14 15 16 17 18 19 20 for (int i = 2; i < finish_number; i++) { if (n % i == 0) return false; } return true; 1 2 3 4 5 int gcd0(int big, int small) { if (big < small) { swap(big, small); } if (big % small == 0) { return small; } return gcd0(small, big % small); } int gcd1(int big, int small) { if (big < small) { swap(big, small); } for (int i = small; i >= 1; --i) { if (big % i == 0 && small % i == 0) return i; } return 1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
            options: [
                "埃⽒筛算法相对于上面的代码效率更高",
                "线性筛算法相对于上面的代码效率更高",
                "上面的代码有很多重复计算，因为不是判断单个数是否为质数，故而导致筛选出连续数中质数的效率不高",
                "相对而⾔，埃⽒筛算法比上面代码以及线性筛算法效率都高",
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
            id: 8,
            type: "single",
            question: "唯一分解定理描述了关于正整数的什么性质？",
            options: [
                "任何正整数都可以表⽰为两个素数的和。",
                "任何大于 1 的合数都可以唯一分解为有限个质数的乘积。",
                "两个正整数的最大公约数总是等于它们的最小公倍数除以它们的乘积。",
                "所有素数都是奇数。",
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
            id: 9,
            type: "single",
            question: "下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（ ）。",
            options: [
                "该算法采用分治算法",
                "该算法是递归实现",
                "该算法采用贪⼼算法",
                "该算法不是递推算法",
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
            id: 10,
            type: "single",
            question: "下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（ ）。 bool is_prime(int n) { if (n <= 1) return false; int finish_number = static_cast<int>(sqrt(n)) + 1; for (int i = 2; i < finish_number; ++i) { if (n % i == 0) return false; } return true; } 1 2 3 4 5 6 7 8 9 10 int find_max_recursive(const vector<int>& nums, int left, int right) { if (left == right) return nums[left]; int mid = left + (right - left) / 2; int left_max = find_max_recursive(nums, left, mid); int right_max = find_max_recursive(nums, mid + 1, right); return max(left_max, right_max); } int find_max(const vector<int>& nums) { if (nums.empty()) { throw invalid_argument(\" 输入数组不能为空 \"); } return find_max_recursive(nums, 0, nums.size() - 1); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
            options: [
                "本题 find_max() 函数采用的是迭代算法",
                "本题 find_max() 函数的时间复杂度为",
                "和上一题的 find_max() 相比，因为没有递归，所以没有栈的创建和销毁开销",
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
            id: 11,
            type: "single",
            question: "下面的 C++ 代码用于在升序数组 D. 本题 find_max() 函数和上一题的 find_max() 空间复杂度相同 lst 中查找目标值 target 最后一次出现的位置。相关说法，正确的是（ ）。",
            options: [
                "当 lst 中存在重复的 target 时，该函数总能返回最后一个 target 的位置，即便 lst 全由相同元素组成",
                "当 target 小于 lst 中所有元素时，该函数会返回 0",
                "循环条件改为 while (low <= high) 程序执⾏效果相同，且能提高准确性",
                "本题 find_max() 函数和上一题的 find_max() 空间复杂度相同 lst 中查找目标值 target 最后一次出现的位置。相关说法，正确的是（ ）。",
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
            id: 12,
            type: "single",
            question: "有关下面C++代码的说法，错误的是（ ）。 int find_max(const vector<int>& nums) { if (nums.empty()) { throw invalid_argument(\"输入数组不能为空\"); } int max_value = nums[0]; for (int num : nums) { if (num > max_value) { max_value = num; } } return max_value; } 1 2 3 4 5 6 7 8 9 10 11 12 13 int binary_search_last_occurrence(const vector<int>& lst, int target) { if (lst.empty()) return -1; int low = 0, high = lst.size() - 1; while (low < high) { int mid = (low + high + 1) / 2; if (lst[mid] <= target) { low = mid; } else { high = mid - 1; } } if (lst[low] == target) return low; else return -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 double sqrt_binary(long long n, double epsilon = 1e-10) { if (n < 0) { throw invalid_argument(\"输入必须为非负整数\"); } if (n == 0 || n == 1) return n; 1 2 3 4 5 6 7",
            options: [
                "“阶段1”的目标是寻找正整数 n 可能的正完全平方根",
                "“阶段2”的目标是如果正整数 n 没有正完全平方根，则在可能产生完全平方根附近寻找带小数点的平方根",
                "代码 check_int = (long long)(result + 0.5) 是检查因浮点误差是否为正完全平方根",
                "阶段2的二分法中 high_d - low_d >= epsilon 不能用于浮点数比较，会进入死循环",
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
            id: 13,
            type: "single",
            question: "13.硬币找零问题中要求找给客户最少的硬币。 coins 存储可用硬币规格，单位为角，假设规格都小于10 角，且一定有1角规格。 amount 为要找零的⾦额，约定必须为1角的整数倍。输出为每种规格及其数量，按规格从大 到小输出，如果某种规格不必要，则输出为0。下面是其实现代码，相关说法正确的是（ ）。 // 阶段 1 long long low = 1, high = n; long long k = 0; while (low <= high) { long long mid = (low + high) / 2; long long mid_sq = mid * mid; if (mid_sq == n) { return mid; } else if (mid_sq < n) { k = mid; low = mid + 1; } else { high = mid - 1; } } long long next_k = k + 1; if (next_k * next_k == n) { return next_k; } // 阶段 2 double low_d = (double)k; double high_d = (double)(k + 1); double mid; while (high_d - low_d >= epsilon) { mid = (low_d + high_d) / 2; double mid_sq = mid * mid; if (mid_sq < n) { low_d = mid; } else { high_d = mid; } } double result = (low_d + high_d) / 2; long long check_int = (long long)(result + 0.5); if (check_int * check_int == n) { return check_int; } return result; } 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 const int MAX_COINS = 10; int result[MAX_COINS] = {0}; // 假设最多10种面额 1 2 3",
            options: [
                "上述代码采用贪⼼算法实现",
                "针对本题具体要求，上述代码总能找到最优解",
                "上述代码采用枚举算法",
                "上述代码采用分治算法",
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
            question: "关于下述 C++ 代码的快速排序算法，说法错误的是（ ）。",
            options: [
                "在randomPartition 函数中，变量i 的作用是记录大于基准值的元素的边界",
                "randomPartition 函数随机选择基准值，可以避免输入数据特定模式导致的最坏情况下时间复杂度 ²",
                "快速排序平均时间复杂度是 int find_coins(const vector<int>& coins, int amount) { sort(coins.begin(), coins.end(), greater<int>()); int n = coins.size(); for (int i = 0; i < n; ++i) { int coin = coins[i]; int num = amount / coin; result[i] = num; amount -= num * coin; if (amount == 0) break; } cout << \" 找零方案如下： \" << endl; for (int i = 0; i < n; ++i) { cout << sorted_coins[i] << \" 角需要 \" << result[i] << \" 枚 \" << endl; } return 0; } 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 int randomPartition(std::vector<int>& arr, int low, int high) { int random = low + rand() % (high - low + 1); std::swap(arr[random], arr[high]); int pivot = arr[high]; int i = low - 1; for (int j = low; j < high; j++) { if (arr[j] <= pivot) { i++; std::swap(arr[i], arr[j]); } } std::swap(arr[i + 1], arr[high]); return i + 1; } void quickSort(std::vector<int>& arr, int low, int high) { if (low < high) { int pi = randomPartition(arr, low, high); quickSort(arr, low, pi - 1); quickSort(arr, pi + 1, high); } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25",
                "快速排序是稳定排序算法",
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
            question: "小杨编写了一个如下的高精度除法函数，则横线上应填写的代码为（ ）。 const int MAXN = 1005; // 最大位数 struct BigInt { int d[MAXN]; // 存储数字，d[0]是个位，d[1]是十位，... int len; // 数字长度 BigInt() { memset(d, 0, sizeof(d)); len = 0; } }; // 比较两个高精度数的大小 int compare(BigInt a, BigInt b) { if(a.len != b.len) return a.len > b.len ? 1 : -1; for(int i = a.len - 1; i >= 0; i--) { if(a.d[i] != b.d[i]) return a.d[i] > b.d[i] ? 1 : -1; } return 0; } // 高精度减法 BigInt sub(BigInt a, BigInt b) { BigInt c; for(int i = 0; i < a.len; i++) { c.d[i] += a.d[i] - b.d[i]; if(c.d[i] < 0) { c.d[i] += 10; c.d[i+1]--; } } c.len = a.len; while(c.len > 1 && c.d[c.len-1] == 0) c.len--; return c; } // 高精度除法（a/b，返回商和余数） pair<BigInt, BigInt> div(BigInt a, BigInt b) { BigInt q, r; // q是商，r是余数 if(compare(a, b) < 0) { // 如果a<b，商为0，余数为a q.len = 1; q.d[0] = 0; r = a; return make_pair(q, r); } // 初始化余数r为a的前b.len位 r.len = b.len; for(int i = a.len - 1; i >= a.len - b.len; i--) { r.d[i - (a.len - b.len)] = a.d[i]; } // 逐位计算商 for(int i = a.len - b.len; i >= 0; i--) { // 把下一位加入余数 if(r.len > 1 || r.d[0] != 0) { for(int j = r.len; j > 0; j--) { r.d[j] = r.d[j-1]; } _______________________ } else { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 16,
            type: "judge",
            question: "下面 C++ 代码是用欧⼏⾥得算法（辗转相除法）求两个正整数的最大公约数，a 大于b 还是小于b 都适用。",
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
            question: "假设函数gcd() 函数能正确求两个正整数的最大公约数，则下面的lcm() 函数能求相应两数的最小公倍数。 r.d[0] = a.d[i]; r.len = 1; } // 计算当前位的商 while(compare(r, b) >= 0) { r = sub(r, b); q.d[i]++; } } // 确定商的长度 q.len = a.len - b.len + 1; while(q.len > 1 && q.d[q.len-1] == 0) q.len--; // 处理余数前导零 while(r.len > 1 && r.d[r.len-1] == 0) r.len--; return make_pair(q, r); } 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 r.d[0] = a.d[i]; r.len++; 1 2 r.d[i] = a.d[i]; r.len++; 1 2 r.d[i] = a.d[i]; r.len = 1; 1 2 r.d[0] = a.d[i]; r.len = 1; 1 2 int gcd(int a, int b) { while (b) { int temp = b; b = a % b; a = temp; } return a; } 1 2 3 4 5 6 7 8",
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
            question: "下面的C++代码用于输出每个数对应的质因数列表，输出形如： {5: [5], 6: [2, 3], 7: [7], 8: [2, 2, 2]} 。",
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
            question: "下面的C++代码实现归并排序。代码在执⾏时，将输出一次 HERE 字符串，因为merge()函数仅被调用一次。 int lcm(int a, int b) { return a * b / gcd(a, b); } 1 2 3 int main() { int n, m; cin >> n >> m; if (n > m) swap(n, m); map<int, vector<int>> prime_factor; for (int i = n; i <= m; ++i) { int j = 2, k = i; while (k != 1) { if (k % j == 0) { prime_factor[i] = prime_factor[i] + j; k /= j; } else { ++j; } } } for (auto& p : prime_factor) { cout << p.first << \": \"; for (int v : p.second) cout << v << \" \"; cout << endl; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 void merge(std::vector<int>& arr, int left, int mid, int right) { std::vector<int> temp(right - left + 1); int i = left; int j = mid + 1; int k = 0; while (i <= mid && j <= right) { if (arr[i] <= arr[j]) { temp[k++] = arr[i++]; } else { temp[k++] = arr[j++]; } } while (i <= mid) { temp[k++] = arr[i++]; } while (j <= right) { temp[k++] = arr[j++]; } for (int p = 0; p < k; ++p) { arr[left + p] = temp[p]; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25",
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
            question: "归并排序的最好、最坏和平均时间复杂度均为 。",
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
            question: "查字典这个小学生必备技能，可以把字典视为一个已排序的数组。假设小杨要查找一个⾳⾸字母为 g 的单 词，他⾸先翻到字典约一半的页数，发现该页的⾸字母是 m ，由于字母表中 g 位于 m 之前，所以排除字典后半部 分，查找范围缩小到前半部分；不断重复上述步骤，直⾄找到⾸字母为 g 的页码。这种查字典的一系列操作可看作 二分查找。",
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
            question: "求解下图中A点到D点最短路径，其中A到B之间的12可以理解为距离。求解这样的问题常用Dijkstra算法，其 思路是通过逐步选择当前距离起点最近的节点来求解非负权重图（如距离不能为负值）单源最短路径的算法。从该 算法的描述可以看出，Dijkstra算法是贪⼼算法。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
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
            question: "分治算法将原问题可以分解成规模更小的子问题，使得求解问题的难度降低。但由于分治算法需要将问题进 ⾏分解，并且需要将多个子问题的解合并为原问题的解，所以分治算法的效率通常比直接求解原问题的效率低。",
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
            question: "函数 puzzle 定义如下，则调用 puzzle(7) 程序会无限递归。",
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
            question: "如下为线性筛法，用于高效生成素数表，其核⼼思想是每个合数只被它的最小质因数筛掉一次，时间复杂 度为 。 } } void mergeSort(std::vector<int>& arr, int left, int right) { if (left >= right) { return; } int mid = left + (right - left) / 2; mergeSort(arr, left, mid); mergeSort(arr, mid + 1, right); std::cout << \"HERE\"; merge(arr, left, mid, right); } 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 int puzzle(int n) { if (n == 1) return 1; if (n % 2 == 0) return puzzle(n / 2); return puzzle(3 * n + 1); } 1 2 3 4 5 vector<int> linearSieve(int n) { vector<bool> is_prime(n + 1, true); vector<int> primes; for (int i = 2; i <= n; ++i) { if (is_prime[i]) { primes.push_back(i); } for (int j = 0; j < primes.size() && i * primes[j] <= n; ++j) { 1 2 3 4 5 6 7 8 9 10",
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
