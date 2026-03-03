// 2024年6月 GESP C++ 四级真题
export const paperData = {
    id: '2024-06-l4',
    title: '2024年6月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下列代码中，输出结果是（ ）",
            options: [
                "12 24 24 12",
                "24 12 12 24",
                "12 12 24 24",
                "24 24 12 12",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面函数不能正常执⾏的是（）",
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
                "GESP4级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面程序输出的是（）",
            options: [
                "2 2 3 9",
                "2 10 3 9",
                "2 10 11 121",
                "2 10 3 100",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "假设变量a的地址是 0x6ffe14 ，下面程序的输出是（ ）。",
            options: [
                "10",
                "0x6ffe14",
                "0x6ffe15",
                "0x6ffe18",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "如果下列程序输出的地址是0x6ffe00，则cout<<a+1<<endl;输出的是（）",
            options: [
                "0x6ffe04",
                "0x6ffe0C",
                "0x6ffe08",
                "0x6ffe00",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "C++ 中，关于文件路径说法错误的是（）",
            options: [
                "\"GESP.txt\" ：指定与当前⼯作目录中的程序文件相同目录中的 GESP.txt 文件",
                "\"../data/GESP.txt\" ：指定与当前⼯作目录中的程序文件上一级目录下的 data 目录中的 GESP.txt 文件",
                "\"./data/GESP.txt\" ：指定与当前⼯作目录中的程序文件同级目录下的 data 目录中的 GESP.txt 文件",
                "\"GESP.txt\" 是绝对路径",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "关于直接插入排序，下列说法错误的是（）",
            options: [
                "插入排序的最好情况是数组已经有序，此时只需要进⾏ 次比较，时间复杂度为",
                "最坏情况是数组逆序排序，此时需要进⾏ 次比较以及 次赋值操作（插入）",
                "平均来说插入排序算法的复杂度为",
                "空间复杂度上，直接插入法是就地排序，空间复杂度为",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下列程序横线处，应该输入的是 （ ）。",
            options: [
                "swap(a[j],a[j+1]);",
                "swap(a[j-1],a[j]);",
                "swap(a[j-1],a[j+1]);",
                "swap(&a[j-1],&a[j+1]);",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面关于递推的说法不正确的是（ ）。",
            options: [
                "递推表现为⾃⼰调用⾃⼰",
                "递推是从简单问题出发，一步步的向前发展，最终求得问题。是正向的",
                "递推中，问题的 n 要求是在计算中确定，不要求计算前就知道 n",
                "斐波那契数列可以用递推实现求解",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "关于⼏种排序算法的说法，下面说法错误的是（ ）。",
            options: [
                "选择排序不是一个稳定的排序算法",
                "冒泡排序算法不是一种稳定的排序算法",
                "` 插入排序是一种稳定的排序算法",
                "如果排序前 2 个相等的数在序列中的前后位置顺序和排序后它们 2 个的前后位置顺序相同，则称为一种稳定的 排序算法",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "数组 {45,66,23,1,10,97,52,88,5,33} 进⾏从小到大冒泡排序过程中，第一遍冒泡过后的序列是（ ）。",
            options: [
                "{45,23,1,10,66,52,88,5,33,97}",
                "{45,66,1,23,10,97,52,88,5,33}",
                "{45,66,23,1,10,52,88,5,33,97}",
                "{45,66,23,1,10,97,52,88,33,5}",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面的排序算法程序中，横线处应该填入的是（ ）。",
            options: [
                "a[j]=a[j-1];",
                "a[j]=a[j+1];",
                "a[j+1]=a[j-1];",
                "a[j+1]=a[j];",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面的程序中，如果输入10 0，会输出（ ）。 int a[8]={ 2,3, 4, 5, 6,2,3,1}; for (int i=1;i<8;i++) { int key = a[i]; int j=i-1; while(a[j]>key && j>=0) { ________; j -= 1; } a[j + 1]= key; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14",
            options: [
                "Division by zero condition!",
                "0",
                "10",
                "100",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "10 条直线，最多可以把平面分为多少个区域（ ）。",
            options: [
                "55",
                "56",
                "54",
                "58",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面程序中，如果语句 cout<<p<<endl; 输出的是0x6ffe00，则cout<<++p<<endl;输出的是（） 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "0x6ffe0c",
                "0x6ffe09",
                "0x6ffe06",
                "0x6ffe04",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "int& a和&a是一样的，都是取a的地址。",
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
                "GESP4级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "以下代码不能够正确执⾏。",
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
                "GESP4级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "引用是一个指针常量。",
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
                "GESP4级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "下面程序两个输出结果是一样的。",
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
                "GESP4级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "函数不可以调用⾃⼰。",
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
                "GESP4级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "函数参数传递过程中，如果传常量值、常量引用和常量指针都是不能被修改的，它们可以防⽌函数对实参的 值或地址进⾏修改。",
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
                "GESP4级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面代码输出的值等于 0 。 int x[10][10][10]={{0}}; int *p; p=&x[0][0][0]; cout<<p<<endl; cout<<++p<<endl; 1 2 3 4 5",
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
                "GESP4级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "在下面这个程序⾥，a[i][j]和一个普通的整型变量一样使用。",
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
                "GESP4级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "一个一维数组，⾄少含有一个⾃然数 N ，是一个合法的数列。可以在一维数组末尾加入一个⾃然数 M ， M 不 能超过一维数组末尾元素的一半，形成一个新的合法的一维数组，如果 N=6 ，那么可以有 6 个不同的合法数组。",
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
                "GESP4级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "插入排序算法中，平均时间复杂度是 ，最坏的情况逆序情况下，达到最大时间复杂度。",
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
                "GESP4级",
            ]
        }
    ]
};
