// 2025年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "数字选取",
        problemNumber: "2025-09-21-05-C-01",
        description: "给定正整数 n，现在有 1,2,...,n 共计 n 个整数。你需要从这 n 个整数中选取一些整数，使得所选取的整数中任意两个不同的整数均互质。请你最大化所选取整数的数量。",
        inputDescription: "一行，一个正整数 n，表示给定的正整数。",
        outputDescription: "一行，一个正整数，表示所选取整数的最大数量。",
        samples: [
            { input: "6", output: "4" },
            { input: "9", output: "5" }
        ],
        explanation: "除 1 以外，任何两个不同的质数都互质；而大于 1 的合数通常会与某个更小的质数不互质。因此最优策略是选 1 以及所有不超过 n 的质数，答案为 1 + pi(n)。",
        tags: ["编程题", "数论", "线性筛"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nconst int N = 1e5 + 5;\nint n, p[N], cnt;\nbool np[N];\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 2; i <= n; i++) {\n        if (!np[i]) p[++cnt] = i;\n        for (int j = 1; j <= cnt && i * p[j] <= n; j++) {\n            np[i * p[j]] = 1;\n            if (i % p[j] == 0) break;\n        }\n    }\n    printf(\"%d\\n\", 1 + cnt);\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "有趣的数字和",
        problemNumber: "2025-09-21-05-C-02",
        description: "如果一个正整数的二进制表示包含奇数个 1，那么小 A 就会认为这个正整数是有趣的。给定正整数 l,r，请你统计满足 l<=n<=r 的有趣的整数 n 之和。",
        inputDescription: "一行，两个正整数 l,r，表示给定的正整数。",
        outputDescription: "一行，一个正整数，表示 l,r 之间有趣的整数之和。",
        samples: [
            { input: "3 8", output: "19" },
            { input: "65 362481", output: "3285054901" }
        ],
        explanation: "设 f(n) 表示 [1,n] 中所有二进制中 1 的个数为奇数的数之和。可按最高位递归统计：先处理完整的 [0,2^k-1] 块，再递归处理剩余部分，同时根据最高位翻转奇偶性。最终答案为 f(r)-f(l-1)。",
        tags: ["编程题", "位运算", "递归", "数位DP"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int l, r;\n    cin >> l >> r;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nint l, r;\nlong long ans;\npair<int, long long> cal2(int n, int p) {\n    if (n == 0) return {1 - p, 0};\n    if (n == 1) return {1, p};\n    return {(n + 1) / 2, 1ll * n * (n + 1) / 4};\n}\npair<int, long long> cal(int n, int p) {\n    if (n <= 1) return cal2(n, p);\n    long long x = 1ll << (31 - __builtin_clz(n));\n    auto l = cal2(x - 1, p);\n    auto r = cal(n - x, 1 - p);\n    return {l.first + r.first, l.second + r.second + x * r.first};\n}\nint main() {\n    scanf(\"%d%d\", &l, &r);\n    ans -= cal(l - 1, 1).second;\n    ans += cal(r, 1).second;\n    printf(\"%lld\\n\", ans);\n    return 0;\n}"
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
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "以下哪种情况使用链表比数组更合适？",
            options: [
                "数据量固定且读多写少",
                "需要频繁在中间或开头插入、删除元素",
                "需要高效随机访问元素",
                "存储空间必须连续",
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
            id: 2,
            type: "single",
            question: "函数removeElements删除单链表中所有结点值等于 val 的结点，并返回新的头结点，其中链表头结点为 head，则横线处填写（ ）。",
            options: [
                "选项A",
                "// 结点结构体 struct Node { int val; Node* next; Node() : val(0), next(nullptr) {} Node(int x) : val(x), next(nullptr) {} Node(int x, Node *next) : val(x), next(next) {} }; Node* removeElements(Node* head, int val) { Node dummy(0, head); // 哑结点，统一处理头结点 Node* cur = &dummy; while (cur->next) { if (cur->next->val == val) { _______________________ // 在此填入代码 } else { cur = cur->next; } } return dummy.next; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 Node* del = cur; cur = del->next; delete del; 1 2 3",
                "选项C",
                "选项D",
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
            question: "函数hasCycle采用 Floyd 快慢指针法判断一个单链表中是否存在环，链表的头节点为head，即用两个指针 在链表上前进：slow 每次走 1 步，fast 每次走 2 步，若存在环，fast 终会追上 slow（相遇）；若无环， fast 会先到达 nullptr ，则横线上应填写（ ）。",
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
            id: 4,
            type: "single",
            question: "函数isPerfectNumber判断一个正整数是否为完全数（该数是否即等于它的真因子之和），则横线上应填 写（ ）。一个正整数n的真因子包括所有小于n的正因子，如 28 的真因子为 1, 2, 4, 7, 14 。 Node* del = cur->next; cur->next = del; delete del; 1 2 3 Node* del = cur->next; cur->next = del->next; delete del; 1 2 3 Node* del = cur->next; delete del; cur->next = del->next; 1 2 3 struct Node { int val; Node *next; Node(int x) : val(x), next(nullptr) {} }; bool hasCycle(Node *head) { if (!head || !head->next) return false; Node* slow = head; Node* fast = head->next; while (fast && fast->next) { if (slow == fast) return true; _______________________ // 在此填入代码 } return false; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 slow = slow->next; fast = fast->next->next; 1 2 slow = fast->next; fast = slow->next->next; 1 2 slow = slow->next; fast = slow->next->next; 1 2 slow = fast->next; fast = fast->next->next; 1 2",
            options: [
                "i <= n",
                "i*i <= n",
                "i <= n/2",
                "i < n",
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
            question: "以下代码计算两个正整数的最大公约数(GCD)，横线上应填写（ ）。",
            options: [
                "b",
                "a",
                "temp",
                "a * b",
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
            id: 6,
            type: "single",
            question: "函数 sieve 实现埃拉托斯特尼筛法(埃⽒筛)，横线处应填入（ ）。",
            options: [
                "i",
                "i+1",
                "i*2",
                "i*i",
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
            question: "函数 linearSieve 实现线性筛法(欧拉筛)，横线处应填入（ ）。 bool isPerfectNumber(int n) { if(n <= 1) return false; int sum = 1; for(int i = 2; ______; i++) { if(n % i == 0) { sum += i; if(i != n/i) sum += n/i; } } return sum == n; } 1 2 3 4 5 6 7 8 9 10 11 int gcd0(int a, int b) { if (a < b) { swap(a, b); } while(b != 0) { int temp = a % b; a = b; b = temp; } return ______; } 1 2 3 4 5 6 7 8 9 10 11 vector<bool> sieve(int n) { vector<bool> is_prime(n+1, true); is_prime[0] = is_prime[1] = false; for(int i = 2; i <= n; i++) { if(is_prime[i]) { for(int j = ______; j <= n; j += i) { is_prime[j] = false; } } } return is_prime; } 1 2 3 4 5 6 7 8 9 10 11 12",
            options: [
                "i % p == 0",
                "p % i == 0",
                "i == p",
                "i * p == n",
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
            question: "关于 埃⽒筛 和 线性筛 的比较，下列说法错误的是（ ）。",
            options: [
                "埃⽒筛可能会对同一个合数进⾏多次标记",
                "线性筛的理论时间复杂度更优，所以线性筛的速度往往优于埃⽒筛",
                "线性筛保证每个合数只被其最小质因子筛到一次",
                "对于常见范围（ ），埃⽒筛因实现简单，常数较小，其速度往往优于线性筛",
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
            question: "唯一分解定理描述的是( )。",
            options: [
                "每个整数都能表⽰为任意素数的乘积",
                "每个大于 1 的整数能唯一分解为素数幂乘积（忽略顺序）",
                "合数不能分解为素数乘积",
                "素数只有两个因子：1 和⾃⾝",
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
            id: 10,
            type: "single",
            question: "给定一个 n x n 的矩阵 matrix ，矩阵的每一⾏和每一列都按升序排列。函数 countLE 返回矩阵中第 k 小的元素，则两处横线上应分别填写（ ）。 vector<int> linearSieve(int n) { vector<bool> is_prime(n+1, true); vector<int> primes; for(int i = 2; i <= n; i++) { if(is_prime[i]) primes.push_back(i); for(int p : primes) { if(p * i > n) break; is_prime[p * i] = false; if(________) break; } } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 // 统计矩阵中 <= x 的元素个数：从左下角开始 int countLE(const vector<vector<int>>& matrix, int x) { int n = (int)matrix.size(); int i = n - 1, j = 0, cnt = 0; while (i >= 0 && j < n) { if (matrix[i][j] <= x) { cnt += i + 1; ++j; } else { --i; } } return cnt; } int kthSmallest(vector<vector<int>>& matrix, int k) { int n = (int)matrix.size(); int lo = matrix[0][0]; int hi = matrix[n - 1][n - 1]; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 11,
            type: "single",
            question: "下述C++代码实现了快速排序算法，下面说法错误的是（ ）。",
            options: [
                "快速排序之所以叫“快速”，是因为它在平均情况下运⾏速度较快，常数小、就地排序，实践中通常比归并排 序更高效。",
                "在平均情况下，划分的递归层数为 ，每层中的总循环数为 ，总时间为 。",
                "在最差情况下，每轮划分操作都将长度为 的数组划分为长度为 0 和 的两个子数组，此时递归层数达到 ，每层中的循环数为 ，总时间为 。",
                "划分函数 partition 中“从右往左查找”与“从左往右查找”的顺序可以交换。",
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
            id: 12,
            type: "single",
            question: "下述C++代码实现了归并排序算法，则横线上应填写（ ）。 while (lo < hi) { int mid = lo + (hi - lo) / 2; if (countLE(matrix, mid) >= k) { ________________ // 在此处填入代码 } else { ________________ // 在此处填入代码 } } return lo; } 22 23 24 25 26 27 28 29 30 31 hi = mid - 1; lo = mid + 1; 1 2 hi = mid; lo = mid; 1 2 hi = mid; lo = mid + 1; 1 2 hi = mid + 1; lo = mid; 1 2 int partition(vector<int>& arr, int low, int high) { int i = low, j = high; int pivot = arr[low]; // 以首元素为基准 while (i < j) { while (i < j && arr[j] >= pivot) j--; //从右往左查找 while (i < j && arr[i] <= pivot) i++; //从左往右查找 if (i < j) swap(arr[i], arr[j]); } swap(arr[i], arr[low]); return i; } void quickSort(vector<int>& arr, int low, int high) { if (low >= high) return; int p = partition(arr, low, high); quickSort(arr, low, p - 1); quickSort(arr, p + 1, high); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 void merge(vector<int> &nums, int left, int mid, int right) {1",
            options: [
                "i < mid",
                "j < right",
                "i <= mid",
                "j <= right",
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
            question: "假设你是一家电影院的排⽚经理，只有一个放映厅。你有一个电影列表 movies ，其中 movies[i] = [start_i, end_i] 表⽰第 i 部电影的开始和结束时间。请你找出最多能安排多少部不重叠的电影，则横线上应分 别填写的代码为（ ）。",
            options: [
                "a[0] < b[0] 和 lastEnd",
                "a[1] < b[1] 和 lastEnd // 左子数组区间为 [left, mid], 右子数组区间为 [mid+1, right] vector<int> tmp(right - left + 1); int i = left, j = mid + 1, k = 0; while (i <= mid && j <= right) { if (nums[i] <= nums[j]) tmp[k++] = nums[i++]; else tmp[k++] = nums[j++]; } while (i <= mid) { tmp[k++] = nums[i++]; } while (________) { // 在此处填入代码 tmp[k++] = nums[j++]; } for (k = 0; k < tmp.size(); k++) { nums[left + k] = tmp[k]; } } void mergeSort(vector<int> &nums, int left, int right) { if (left >= right) return; int mid = (left + right) / 2; mergeSort(nums, left, mid); mergeSort(nums, mid + 1, right); merge(nums, left, mid, right); } 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 int maxMovies(vector<vector<int>>& movies) { if (movies.empty()) return 0; sort(movies.begin(), movies.end(), [](const vector<int>& a, const vector<int>& b) { return ______; // 在此处填入代码 }); int count = 1; int lastEnd = movies[0][1]; for (int i = 1; i < movies.size(); i++) { if (movies[i][0] >= lastEnd) { count++; ______ = movies[i][1]; // 在此处填入代码 } } return count; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
                "a[0] < b[0] 和 movies[i][0]",
                "a[1] < b[1] 和 movies[i][0]",
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
            id: 14,
            type: "single",
            question: "给定一个整数数组 nums ，下面代码找到一个具有最大和的连续子数组，并返回该最大和。则下面说法错 误的是（ ）。",
            options: [
                "上述代码采用分治算法实现",
                "上述代码采用贪⼼算法",
                "上述代码时间复杂度为",
                "上述代码采用递归方式实现",
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
            id: 15,
            type: "single",
            question: "给定一个由非负整数组成的数组 digits ，表⽰一个非负整数的各位数字，其中最高位在数组⾸位，且 digits 不含前导0（除非是0本⾝）。下面代码对该整数执⾏ +1 操作，并返回结果数组，则横线上应填写（ ）。",
            options: [
                "选项A",
                "int crossSum(vector<int>& nums, int left, int mid, int right) { int leftSum = INT_MIN, rightSum = INT_MIN; int sum = 0; for (int i = mid; i >= left; i--) { sum += nums[i]; leftSum = max(leftSum, sum); } sum = 0; for (int i = mid + 1; i <= right; i++) { sum += nums[i]; rightSum = max(rightSum, sum); } return leftSum + rightSum; } int helper(vector<int>& nums, int left, int right) { if (left == right) return nums[left]; int mid = left + (right - left) / 2; int leftMax = helper(nums, left, mid); int rightMax = helper(nums, mid + 1, right); int crossMax = crossSum(nums, left, mid, right); return max({leftMax, rightMax, crossMax}); } int maxSubArray(vector<int>& nums) { return helper(nums, 0, nums.size() - 1); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 vector<int> plusOne(vector<int>& digits) { for (int i = (int)digits.size() - 1; i >= 0; --i) { if (digits[i] < 9) { digits[i] += 1; return digits; } ________________ // 在此处填入代码 } digits.insert(digits.begin(), 1); return digits; } 1 2 3 4 5 6 7 8 9 10 11 digits[i] = 0;1 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            question: "基于下面定义的函数，通过判断isDivisibleBy9(n) == isDigitSumDivisibleBy9(n)代码可验算如果 一个数能被 9 整除，则它的各位数字之和能被 9 整除。",
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
            question: "假设函数gcd()能正确求两个正整数的最大公约数，则下面的findMusicalPattern(4 ， 6)函数返回 2 。",
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
            question: "下面递归实现的斐波那契数列的时间复杂度为 。",
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
            question: "链表通过更改指针实现高效的结点插入与删除，但结点访问效率低、占用内存较多，且对缓存利用不友好。",
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
            question: "二分查找依赖数据的有序性，通过循环逐步缩减一半搜索区间来进⾏查找，且仅适用于数组或基于数组实现 的数据结构。 digits[i] = 9;1 digits[i] = 1;1 digits[i] = 10;1 bool isDivisibleBy9(int n) { return n % 9 == 0; } bool isDigitSumDivisibleBy9(int n) { int sum = 0; string numStr = to_string(n); for (char c : numStr) { sum += (c - '0'); } return sum % 9 == 0; } 1 2 3 4 5 6 7 8 9 10 11 12 void findMusicalPattern(int rhythm1, int rhythm2) { int commonDivisor = gcd(rhythm1, rhythm2); int patternLength = (rhythm1 * rhythm2) / commonDivisor; return patternLength ； } 1 2 3 4 5 long long fib_memo(int n, long long memo[]) { if (n <= 1) return n; if (memo[n] != -1) return memo[n]; memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo); return memo[n]; } int main() { int n = 40; long long memo[100]; fill_n(memo, 100, -1); long long result2 = fib_memo(n, memo); return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14",
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
            question: "线性筛关键是 “ 每个合数只会被最小质因子筛到一次 ” ，因此为 。",
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
            question: "快速排序和归并排序都是稳定的排序算法。",
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
            question: "下面代码采用分治算法求解标准 3 柱汉诺塔问题，时间复杂度为 。",
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
            question: "所有递归算法都可以转换为迭代算法。",
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
            question: "贪⼼算法总能得到全局最优解。",
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
