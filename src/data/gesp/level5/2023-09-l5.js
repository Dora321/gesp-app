// 2023年9月 GESP C++ 五级真题
export const paperData = {
    id: '2023-09-l5',
    title: '2023年9月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "近年来，线上授课变得普遍，很多有助于改善教学效果的设备也逐渐流⾏，其中包括比较常用的⼿写板，那 么它属于哪类设备？（ ）。",
            options: [
                "输入",
                "输出",
                "控制",
                "记录",
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
            question: "如果a 和b 均为int类型的变量，且b 的值不为0，那么下列能正确判断 “a 是b 的 3 倍 ” 的表达式是（ ）。",
            options: [
                "(a >> 3 == b)",
                "(a - b) % 3 == 0",
                "(a / b == 3)",
                "(a == 3 * b)",
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
            question: "如果变量a 和b 分别为double类型和int类型，则表达式(a = 6, b = 3 * (7 + 8) / 2, b += a)的 计算结果为（ ）。",
            options: [
                "6",
                "21",
                "28",
                "不确定",
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
            question: "有关下面 C++ 代码说法错误的是（ ）。",
            options: [
                "sumA()用循环方式求从1 到N之和，sumB()用递归方式求从1 到N之和。",
                "默认情况下，如果输入正整数1000，能实现求从1 到1000之和。",
                "默认情况下，如果输入正整数100000，能实现求从1 到100000之和。",
                "一般说来，sumA()的效率高于sumB()。",
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
            question: "下面 C++ 代码以递归方式实现字符串反序，横线处应填上代码是（ ）。",
            options: [
                "sIn[sIn.length() - 1] + sReverse(sIn.substr(0, sIn.length() - 1));",
                "sIn[0] + sReverse(sIn.substr(1, sIn.length() - 1));",
                "sReverse(sIn.substr(0, sIn.length() - 1)) + sIn[sIn.length() - 1];",
                "sReverse(sIn.substr(1, sIn.length() - 1)) + sIn[sIn.length() - 1];",
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
            id: 6,
            type: "single",
            question: "印度古⽼的汉诺塔传说：创世时有三根⾦刚柱，其中一柱从下往上按照大小顺序摞着 64 ⽚黄⾦圆盘，当圆盘 逐一从一柱借助另外一柱全部移动到另外一柱时，宇宙毁灭。移动规则：在小圆盘上不能放大圆盘，在三根柱子之 间一次只能移动一个圆盘。下面的 C++ 代码以递归方式实现汉诺塔，横线处应填入代码是（ ）。",
            options: [
                "Hanoi(B, C, A, N - 2)",
                "Hanoi(B, A, C, N - 1)",
                "Hanoi(A, B, C, N - 2)",
                "Hanoi(C, B, A, N - 1)",
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
            id: 7,
            type: "single",
            question: "根据下面 C++ 代码的注释，两个横线处应分别填入（ ）。",
            options: [
                "compare和isOdd(lstA[i])",
                "compare(x1,y1)和isOdd",
                "compare和isOdd",
                "compare(x1,y1)和isOdd(lstA[i])",
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
            question: "有关下面代码正确的是（ ）。",
            options: [
                "checkNum()函数定义错误。",
                "将isEven作为checkNum()参数将导致错误。",
                "执⾏后将输出1 。",
                "运⾏时触发异常。",
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
            id: 9,
            type: "single",
            question: "有关下面 C++ 代码正确的是（ ）。",
            options: [
                "checkNum()函数定义错误。",
                "输出⾏A 的语句将导致编译错误。",
                "输出⾏B 的语句将导致编译错误。",
                "该代码没有编译错误。",
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
            question: "下面代码执⾏后的输出是（ ）。",
            options: [
                "4#3#2#2#4",
                "4#3#2#2#1#5",
                "4#3#2#1#2#4",
                "4#3#2#1#2#5",
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
            question: "下面代码中的isPrimeA()和isPrimeB()都用于判断参数N是否素数，有关其时间复杂度的正确说法是 （ ）。",
            options: [
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB()的最坏时间复杂度是 ，isPrimeB()优于 isPrimeA()。",
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB()的最坏时间复杂度是 ，isPrimeB()优于 isPrimeA()。",
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB()的最坏时间复杂度是 ，isPrimeA()优于 isPrimeB()。",
                "isPrimeA()的最坏时间复杂度是 ，isPrimeB()的最坏时间复杂度是 ，isPrimeA()优于 isPrimeB()",
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
            question: "下面代码用于归并排序，其中merge()函数被调用次数为（ ）。",
            options: [
                "0",
                "1",
                "6",
                "7",
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
            id: 13,
            type: "single",
            question: "在上题的归并排序算法中，mergeSort(listData, start, middle);和mergeSort(listData, middle + 1, end);涉及到的算法为（ ）。",
            options: [
                "搜索算法",
                "分治算法",
                "贪⼼算法",
                "递推算法",
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
            question: "归并排序算法的基本思想是（ ）。",
            options: [
                "将数组分成两个子数组，分别排序后再合并。",
                "随机选择一个元素作为枢轴，将数组划分为两个部分。",
                "从数组的最后一个元素开始，依次与前一个元素比较并交换位置。",
                "比较相邻的两个元素，如果顺序错误就交换位置。",
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
            question: "有关下面代码的说法正确的是（ ）。",
            options: [
                "上述代码构成单向链表。",
                "上述代码构成双向链表。",
                "上述代码构成循环链表。",
                "上述代码构成指针链表。 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            question: "TCP/IP 的传输层的两个不同的协议分别是 UDP 和 TCP 。",
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
            question: "在特殊情况下流程图中可以出现三角框和圆形框。",
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
            question: "找出⾃然数N以内的所有质数，常用算法有埃⽒筛法和线性筛法，其中埃⽒筛法效率更高。",
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
            question: "在 C++ 中，可以使用二分法查找链表中的元素。",
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
            question: "在 C++ 中，通过恰当的实现，可以将链表⾸尾相接，形成循环链表。",
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
            question: "贪⼼算法的解可能不是最优解。",
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
            question: "一般说来，冒泡排序算法优于归并排序。",
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
            question: "C++ 语⾔中的qsort库函数是不稳定排序。",
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
            question: "质数的判定和筛法的目的并不相同，质数判定旨在判断特定的正整数是否为质数，而质数筛法意在筛选出范 围内的所有质数。",
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
            question: "下面的 C++ 代码执⾏后将输出0 5 1 6 2 3 4 。",
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
