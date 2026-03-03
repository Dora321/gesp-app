// 2024年9月 GESP C++ 五级真题
export const paperData = {
    id: '2024-09-l5',
    title: '2024年9月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面关于链表和数组的描述，错误的是（ ）。",
            options: [
                "数组大小固定，链表大小可动态调整。",
                "数组支持随机访问，链表只能顺序访问。",
                "存储相同数目的整数，数组比链表所需的内存多。",
                "数组插入和删除元素效率低，链表插入和删除元素效率高。",
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
            question: "通过（ ）操作，能完成在双向循环链表结点p之后插入结点s的功能（其中next域为结点的直接后继， prev域为结点的直接前驱）。",
            options: [
                "p->next->prev = s; s->prev = p; p->next = s; s->next = p->next;",
                "p->next->prev = s; p->next = s; s->prev = p; s->next = p->next;",
                "s->prev = p; s->next = p->next; p->next = s; p->next->prev = s;",
                "s->next = p->next; p->next->prev = s; s->prev = p; p->next = s;",
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
            id: 3,
            type: "single",
            question: "对下面两个函数，说法错误的是（ ）。",
            options: [
                "sumA 体现了迭代的思想。",
                "SumB 采用的是递归方式。 int sumA(int n) { int res = 0; for (int i = 1; i <= n; i++) { res += i; } return res; } int sumB(int n) { if (n == 1) return 1; int res = n + sumB(n - 1); return res; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14",
                "SumB 函数比 SumA 的时间效率更高。",
                "两个函数的实现的功能相同。",
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
            id: 4,
            type: "single",
            question: "有如下函数fun，则fun(20, 12)的返回值为（ ）。",
            options: [
                "20",
                "12",
                "4",
                "2",
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
            id: 5,
            type: "single",
            question: "下述代码实现素数表的埃拉托斯特尼筛法，筛选出所有小于等于n的素数，则横线上应填的最佳代码是 ( ) 。",
            options: [
                "for (int j = i; j <= n; j++)",
                "for (int j = i * i; j <= n; j++)",
                "for (int j = i * i; j <= n; j += i)",
                "for (int j = i; j <= n; j += i)",
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
            question: "下述代码实现素数表的线性筛法，筛选出所有小于等于n的素数，则横线上应填的代码是 ( ) 。 int fun(int a, int b) { if (a % b == 0) return b; else return fun(b, a % b); } 1 2 3 4 5 6 void sieve_Eratosthenes(int n) { vector<bool> is_prime(n + 1, true); vector<int> primes; for (int i = 2; i * i <= n; i++) { if (is_prime[i]) { primes.push_back(i); ________________________________ { // 在此处填入代码 is_prime[j] = false; } } } for (int i = sqrt(n) + 1; i <= n; i++) { if (is_prime[i]) { primes.push_back(i); } } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 vector<int> sieve_linear(int n) { vector<bool> is_prime(n + 1, true); 1 2",
            options: [
                "for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)",
                "for (int j = 1; j < primes.size() && i * j <= n; j++)",
                "for (int j = 2; j < primes.size() && i * primes[j] <= n; j++)",
                "以上都不对",
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
            id: 7,
            type: "single",
            question: "下面函数可以将n的所有质因数找出来，其时间复杂度是（ ）。",
            options: [
                "vector<int> primes; for (int i = 2; i <= n / 2; i++) { if (is_prime[i]) primes.push_back(i); ________________________________ { // 在此处填入代码 is_prime[i * primes[j]] = 0; if (i % primes[j] == 0) break; } } for (int i = n / 2 + 1; i <= n; i++) { if (is_prime[i]) primes.push_back(i); } return primes; } 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 #include <iostream> #include <vector> vector<int> get_prime_factors(int n) { vector<int> factors; while (n % 2 == 0) { factors.push_back(2); n /= 2; } for (int i = 3; i * i <= n; i += 2) { while (n % i == 0) { factors.push_back(i); n /= i; } } if (n > 2) { factors.push_back(n); } return factors; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
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
            id: 8,
            type: "single",
            question: "现在用如下代码来计算 （ 个 相乘），其时间复杂度为（ ）。",
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
            id: 9,
            type: "single",
            question: "假设快速排序算法的输入是一个长度为 的已排序数组，且该快速排序算法在分治过程总是选择第一个元素 作为基准元素。下面选项（ ）描述的是在这种情况下的快速排序⾏为。",
            options: [
                "快速排序对于此类输入的表现最好，因为数组已经排序。",
                "快速排序对于此类输入的时间复杂度是 。",
                "快速排序对于此类输入的时间复杂度是 。",
                "快速排序无法对此类数组进⾏排序，因为数组已经排序。",
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
            question: "考虑以下 C++ 代码实现的归并排序算法： double quick_power(double x, unsigned n) { if (n == 0) return 1; if (n == 1) return x; return quick_power(x, n / 2) * quick_power(x, n / 2) * ((n & 1) ? x : 1); } 1 2 3 4 5 void merge(int arr[], int left, int mid, int right) { int n1 = mid - left + 1; int n2 = right - mid; int L[n1], R[n2]; for (int i = 0; i < n1; i++) L[i] = arr[left + i]; for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j]; int i = 0, j = 0, k = left; while (i < n1 && j < n2) { if (L[i] <= R[j]) { arr[k] = L[i]; i++; } else { arr[k] = R[j]; j++; } k++; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 对长度为n的数组arr，挑用函数merge_sort(a, 0, n-1)，在排序过程中merge函数的递归调用次数大约是 （ ）。",
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
            question: "现在有n个⼈要过河，每只船最多载 2 ⼈，船的承重为 100kg 。下列代码中，数组weight中保存有n个⼈ 的体重（单位为 kg ），已经按从小到大排好序，代码输出过河所需要的船的数目，采用的思想为（ ）。",
            options: [
                "枚举算法",
                "贪⼼算法",
                "迭代算法 } while (i < n1) { arr[k] = L[i]; i++; k++; } while (j < n2) { arr[k] = R[j]; j++; k++; } } void merge_sort(int arr[], int left, int right) { if (left < right) { int mid = left + (right - left) / 2; merge_sort(arr, left, mid); merge_sort(arr, mid + 1, right); merge(arr, left, mid, right); } } 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 int i, j; int count = 0; for (i = 0, j = n - 1; i < j; j--) { if (weight[i] + weight[j] <= 100) { i++; } count++; } printf(\" 过河的船数： %d\n\", count); 1 2 3 4 5 6 7 8 9",
                "递归算法",
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
            id: 12,
            type: "single",
            question: "关于分治算法，以下哪个说法正确？",
            options: [
                "分治算法将问题分成子问题，然后分别解决子问题，最后合并结果。",
                "归并排序不是分治算法的应用。",
                "分治算法通常用于解决小规模问题。",
                "分治算法的时间复杂度总是优于 。",
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
            question: "根据下述二分查找法，在排好序的数组1 ， 3 ， 6 ， 9 ， 17 ， 31 ， 39 ， 52 ， 61 ， 79中查找数值31，循环 while (left <= right)执⾏的次数为（ ）。",
            options: [
                "1",
                "2",
                "3",
                "4",
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
            id: 14,
            type: "single",
            question: "以下关于高精度运算的说法错误的是 ( ) 。",
            options: [
                "高精度计算主要是用来处理大整数或需要保留多位小数的运算。",
                "大整数除以小整数的处理的步骤可以是，将被除数和除数对齐，从左到右逐位尝试将除数乘以某个数，通过 减法得到新的被除数，并累加商。",
                "高精度乘法的运算时间只与参与运算的两个整数中长度较长者的位数有关。",
                "高精度加法运算的关键在于逐位相加并处理进位。",
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
            id: 15,
            type: "single",
            question: "当 时，下面函数的返回值为（ ）。 int binary_search(vector<int>& nums, int target) { int left = 0; int right = nums.size() - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) { return mid; } else if (nums[mid] < target) { left = mid + 1; } else { right = mid - 1; } } return -1; // 如果找不到目标元素，返回 -1 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "105",
                "840",
                "210",
                "420",
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
            id: 16,
            type: "judge",
            question: "在操作系统中，需要对一组进程进⾏循环。每个进程被赋予一个时间⽚，当时间⽚用完时， CPU 将切换到下 一个进程。这种循环操作可以通过环形链表来实现。",
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
            question: "找出⾃然数n以内的所有质数，常用算法有埃拉托斯特尼（埃⽒）筛法和线性筛法，其中线性筛法效率更 高。",
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
            question: "唯一分解定理表明任何一个大于1的整数都可以唯一地分解为素数之和。",
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
            question: "贪⼼算法通过每一步选择局部最优解，从而一定能获得最优解。",
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
            question: "快速排序和归并排序的平均时间复杂度均为 ，且都是稳定排序。",
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
            question: "插入排序的时间复杂度总是比快速排序低。",
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
            question: "引入分治策略往往可以提升算法效率。一方面，分治策略减少了操作数量；另一方面，分治后有利于系统的 并⾏优化。",
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
            id: 24,
            type: "judge",
            question: "在 C++ 语⾔中，递归的实现方式通常会占用更多的栈空间，可能导致栈溢出。",
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
            question: "对于已经定义好的标准数学函数sin(x)，应用程序中的语句y=sin(sin(x));是一种递归调用。",
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
