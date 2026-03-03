// 2023年12月 GESP C++ 五级真题
export const paperData = {
    id: '2023-12-l5',
    title: '2023年12月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面 C++ 代码用于求斐波那契数列，该数列第 1 、 2 项为 1 ，以后各项均是前两项之和。下面有关说法错误的 是 ( ) 。",
            options: [
                "fiboA( )用递归方式，fiboB()循环方式",
                "fiboA( )更加符合斐波那契数列的数学定义，直观易于理解，而fiboB()需要将数学定义转换为计算机程 序实现",
                "fiboA( )不仅仅更加符合数学定义，直观易于理解，且因代码量较少执⾏效率更高",
                "fiboB( )虽然代码量有所增加，但其执⾏效率更高",
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
            question: "下面 C++ 代码以递归方式实现合并排序，并假设merge (int T[], int R[], int s, int m, int t)函 数将有序（同样排序规则）的 T[s..m] 和 T[m+1..t] 归并到 R[s..t] 中。横线处应填上代码是 ( ) 。",
            options: [
                "mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m,t,len)",
                "mergeSort(SList, T2, s, m-1,len), mergeSort(SList, T2, m+1,t,len)",
                "mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m+1,t,len)",
                "mergeSort(SList, T2, s, m-1,len), mergeSort(SList, T2, m-1,t,len)",
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
            question: "阅读下面的C++代码，执⾏后其输出是( )。",
            options: [
                "1->120<===>2->120",
                "1->120<===>1->120",
                "1->120<===>1->2->3->4->5->120",
                "1->120<===>2->3->4->5->6->120",
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
            question: "下面的C++用于对 lstA 排序，使得偶数在前奇数在后，横线处应填入( )。",
            options: [
                "选项A",
                "isEven(lstA[j]) && !isEven(lstA[j+1])",
                "lstA[j] > lstA[j+1] !isEven(lstA[j]) && isEven(lstA[j+1])",
                "lstA[j] < lstA[j+1]",
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
            question: "下面的 C++ 代码用于将字符串保存到带头节点的双向链表中，并对重复的串计数，然后将最新访问的串的节 点放在链头便于查找。横线处应填入代码是（ ）。",
            options: [
                "if(pHead) {p->next = pHead->next, pHead->next->prev = p;}",
                "if(pHead->next) {p->next = pHead->next, pHead->next->prev = p;}",
                "p->next = pHead->next, pHead->next->prev = p;",
                "触发异常，不能对空指针进⾏操作。",
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
            question: "有关下面 C++ 代码说法正确的是（ ）。",
            options: [
                "如果x小于 10 ，rc值也不会超过 20",
                "foo可能无限递归",
                "foo可以求出 x 和 y 的最大公共质因子",
                "foo能够求出 x 和 y 的最小公倍数",
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
            question: "下面的 C++ 代码实现对 list 的快速排序，有关说法，错误的是（ ）。",
            options: [
                "qSort(less) + qSort(greater) + (vector<int>)pivot",
                "(vector<int>)pivot + (qSort(less) + qSort(greater))",
                "(qSort(less) + (vector<int>)pivot + qSort(greater))",
                "qSort(less) + pivot + qSort(greater)",
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
            question: "下面 C++ 代码中的 isPrimeA() 和 isPrimeB() 都用于判断参数 N 是否素数，有关其时间复杂度的正确说 法是（ ）。",
            options: [
                "isPrimeA( )的最坏时间复杂度是 ，isPrimeB( )的最坏时间复杂度是 ，isPrimeA()优 于isPrimeB()",
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB( )的最坏时间复杂度是 ，isPrimeB()绝大 多数情况下优于isPrimeA()",
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB( )的最坏时间复杂度是 ，isPrimeA( )优于 isPrimeB( )",
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB( )的最坏时间复杂度是 ，isPrimeA()优于 isPrimeB( )",
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
            question: "下面 C++ 代码用于有序list的二分查找，有关说法错误的是（ ）。",
            options: [
                "代码采用二分法实现有序list的查找",
                "代码采用分治算法实现有序list的查找",
                "代码采用递归方式实现有序list的查找",
                "代码采用动态规划算法实现有序list的查找",
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
            id: 10,
            type: "single",
            question: "在上题的_binarySearch算法中，如果lst中有N个元素，其时间复杂度是（ ）。",
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
            question: "下面的 C++ 代码使用数组模拟整数加法，可以处理超出大整数范围的加法运算。横线处应填入代码是（ ）。",
            options: [
                "c.push_back(t % 10), t = t % 10;",
                "c.push_back(t / 10), t = t % 10;",
                "c.push_back(t / 10), t = t / 10;",
                "c.push_back(t % 10), t = t / 10;",
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
            question: "有关下面 C++ 代码的说法正确的是（ ）。",
            options: [
                "上述代码构成单向链表",
                "上述代码构成双向链表",
                "上述代码构成循环链表",
                "上述代码构成指针链表",
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
            question: "通讯卫星在通信⽹络系统中主要起到（）的作用。",
            options: [
                "信息过滤",
                "信号中继",
                "避免攻击",
                "数据加密",
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
            question: "小杨想编写一个判断任意输入的整数 N 是否为素数的程序，下面哪个方法不合适？（ ）",
            options: [
                "埃⽒筛法",
                "线性筛法",
                "二分答案",
                "枚举法",
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
            question: "下面的排序算法都要处理多趟数据，哪种排序算法不能保证在下一趟处理时从待处理数据中选出最大或最 小的数据？（ ）",
            options: [
                "选择排序",
                "快速排序",
                "堆排序",
                "冒泡排序 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            question: "归并排序的时间复杂度是 。 ( )",
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
            question: "小杨在生日聚会时拿一块 H*W 的巧克力招待来的 K 个小朋友，保证每位小朋友⾄少能获得一块相同大小的巧 克力。那么小杨想分出来最大边长的巧克力可以使用二分法。（ ）",
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
            question: "以下 C++ 代码能以递归方式实现斐波那契数列，该数列第 1 、 2 项为 1 ，以后各项均是前两项之和。 ( )",
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
            question: "贪⼼算法可以达到局部最优，但可能不是全局最优解。 ( )",
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
            question: "小杨设计了一个拆数程序，它能够将任意的非质数⾃然数 N 转换成若⼲个质数的乘积，这个程序是可以设计 出来的。（ ）",
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
            question: "插入排序有时比快速排序时间复杂度更低。（ ）",
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
            question: "下面的 C++ 代码能实现⼗进制正整数 N 转换为⼋进制并输出。（ ）",
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
            question: "对数组int arr[] = {2, 6, 3, 5, 4, 8, 1, 0, 9, 10}执⾏sort(arr, arr+10)，则执⾏后arr 中的数据调整为{0, 1, 2, 3, 4, 5, 6, 8,9, 10}。（ ）",
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
            question: "小杨想写一个程序来算出正整数 N 有多少个因数，经过思考他写出了一个重复没有超过 N/2 次的循环就能够算 出来了。（ ）",
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
            question: "同样的整数序列分别保存在单链表和双向链中，这两种链表上的简单冒泡排序的复杂度相同。（ ）",
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
