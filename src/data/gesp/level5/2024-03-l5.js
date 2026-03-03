// 2024年3月 GESP C++ 五级真题
export const paperData = {
    id: '2024-03-l5',
    title: '2024年3月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "唯一分解定理描述的内容是（ ）？",
            options: [
                "任意整数都可以分解为素数的乘积",
                "每个合数都可以唯一分解为一系列素数的乘积",
                "两个不同的整数可以分解为相同的素数乘积",
                "以上都不对",
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
            question: "贪⼼算法的核⼼思想是（ ）？",
            options: [
                "在每一步选择中都做当前状态下的最优选择",
                "在每一步选择中都选择局部最优解",
                "在每一步选择中都选择全局最优解",
                "以上都对",
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
            question: "下面的 C++ 代码⽚段用于计算阶乘。请在横线处填入（ ），实现正确的阶乘计算。",
            options: [
                "return n * factorial(n - 1);",
                "return factorial(n - 1) / n;",
                "return n * factorial(n);",
                "return factorial(n / 2) * factorial(n / 2);",
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
            question: "下面的代码⽚段用于在双向链表中删除一个节点。请在横线处填入（ ），使其能正确实现相应功能。 int factorial(int n) { if (n == 0 || n == 1) { return 1; } else { _________________________________ // 在此处填入代码 } } 1 2 3 4 5 6 7 void deleteNode(DoublyListNode*& head, int value) {1",
            options: [
                "if (current->next != nullptr) current->next->prev = current->prev;",
                "current->prev->next = current->next;",
                "delete current->next;",
                "current->prev = current->next;",
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
            question: "辗转相除法也被称为（ ）",
            options: [
                "高斯消元法",
                "费马定理",
                "欧⼏⾥德算法",
                "⽜顿迭代法",
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
            question: "下面的代码⽚段用于计算斐波那契数列。该代码的时间复杂度是（ ）？",
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
            id: 7,
            type: "single",
            question: "下面的代码⽚段用于将两个高精度整数进⾏相加。请在横线处填入（ ），使其能正确实现相应功能。 DoublyListNode* current = head; while (current != nullptr && current->val != value) { current = current->next; } if (current != nullptr) { if (current->prev != nullptr) { ____________________________________ // 在此处填入代码 } else { head = current->next; } if (current->next != nullptr) { current->next->prev = current->prev; } delete current; } } 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 int fibonacci(int n) { if (n <= 1) { return n; } else { return fibonacci(n - 1) + fibonacci(n - 2); } } 1 2 3 4 5 6 7",
            options: [
                "result = to_string(sum % 10) + result;",
                "result = to_string(carry % 10) + result;",
                "result = to_string(sum / 10) + result;",
                "result = to_string(sum % 10 + carry) + result;",
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
            question: "给定序列： 1 ， 3 ， 6 ， 9 ， 17 ， 31 ， 39 ， 52 ， 61 ， 79 ， 81 ， 90 ， 96 。使用以下代码进⾏二分查找查找元素 82 时，需要循环多少次，即最后输出的 times 值为（ ）。",
            options: [
                "2",
                "5",
                "3",
                "4",
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
            question: "下面的代码⽚段用于判断一个正整数是否为素数。请对以下代码进⾏修改，使其能正确实现相应功能。（ ） string add(string num1, string num2) { string result; int carry = 0; int i = num1.size() - 1, j = num2.size() - 1; while (i >= 0 || j >= 0 || carry) { int x = (i >= 0) ? num1[i--] - '0' : 0; int y = (j >= 0) ? num2[j--] - '0' : 0; int sum = x + y + carry; carry = sum / 10; _______________________________________ } return result; } 1 2 3 4 5 6 7 8 9 10 11 12 13 int binarySearch(const std::vector<int>& arr, int target) { int left = 0; int right = arr.size() - 1; int times = 0; while (left <= right) { times ++; int mid = left + (right - left) / 2; if (arr[mid] == target) { cout << times << endl; return mid; } else if (arr[mid] < target) { left = mid + 1; } else { right = mid - 1; } } cout << times << endl; return -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
            options: [
                "num < 2 应该改为 num <= 2",
                "循环条件 i * i < num 应该改为 i * i <= num",
                "循环条件应该是 i <= num",
                "循环体中应该是 if (num % i != 0)",
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
            question: "在埃拉托斯特尼筛法中，要筛选出不大于 n 的所有素数，最外层循环应该遍历什么范围（ ）？",
            options: [
                "for (int i = 2; i <= n; ++i)",
                "for (int i = 1; i < n; ++i)",
                "for (int i = 2; i <= sqrt(n); ++i)",
                "for (int i = 1; i <= sqrt(n); ++i)",
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
            question: "素数的线性筛法时间复杂度为（ ）。",
            options: [
                "选项A",
                "选项B",
                "bool isPrime(int num) { if (num < 2) { return false; } for (int i = 2; i * i < num; ++i) { if (num % i == 0) { return false; } } return true; } 1 2 3 4 5 6 7 8 9 10 11 vector<int> sieveOfEratosthenes(int n) { std::vector<bool> isPrime(n + 1, true); std::vector<int> primes; _______________________ { if (isPrime[i]) { primes.push_back(i); for (int j = i * i; j <= n; j += i) { isPrime[j] = false; } } } for (int i = sqrt(n) + 1; i <= n; ++i) { if (isPrime[i]) { primes.push_back(i); } } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 12,
            type: "single",
            question: "归并排序的基本思想是（ ）。",
            options: [
                "动态规划",
                "分治",
                "贪⼼算法",
                "回溯算法",
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
            id: 13,
            type: "single",
            question: "在快速排序中，选择的主元素（ pivot ）会影响算法的（ ）。",
            options: [
                "不影响",
                "时间复杂度",
                "空间复杂度",
                "时间复杂度和空间复杂度",
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
            question: "递归函数在调用⾃⾝时，必须满⾜（ ），以避免无限递归？",
            options: [
                "有终⽌条件",
                "函数参数递减（或递增）",
                "函数返回值固定",
                "以上都对",
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
            id: 15,
            type: "single",
            question: "假设给定链表为 : ，若调用 searchValue(head, 5)，函数返回值为（ ）。",
            options: [
                "返回 1",
                "返回 0",
                "死循环，无法返回",
                "返回 -1",
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
            question: "辗转相除法用于求两个整数的最大公约数。 int searchValue(ListNode* head, int target) { while (head != nullptr) { if (head->val == target) { return 1; } head = head->next; } return 0; } 1 2 3 4 5 6 7 8 9",
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
            question: "插入排序的时间复杂度是 。",
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
            question: "二分查找要求被搜索的序列是有序的，否则无法保证正确性。",
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
            question: "使用贪⼼算法解决问题时，每一步的局部最优解一定会导致全局最优解。",
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
            question: "分治算法的核⼼思想是将一个大问题分解成多个相同或相似的子问题进⾏解决，最后合并得到原问题的解。",
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
            question: "分治算法的典型应用之一是归并排序，其时间复杂度为 。",
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
            question: "素数表的埃⽒筛法和线性筛法的时间复杂度都是 。",
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
            question: "贪⼼算法是一种可以应用于所有问题的通用解决方案。",
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
            question: "单链表和双链表都可以在常数时间内实现在链表头部插入或删除节点的操作。",
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
            question: "在 C 语⾔中，递归的实现方式通常会占用更多的栈空间，可能导致栈溢出。",
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
