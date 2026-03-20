// 2024年3月 GESP C++ 八级真题

const programmingQuestions = [
    {
        "type": "programming",
        "tags": [
            "编程题",
            "数论",
            "约数统计"
        ],
        "id": 26,
        "title": "公倍数问题",
        "problemNumber": "2024-03-l8-Q26",
        "description": "存在一个 N×M 的矩阵 A，每个位置 A[i][j] 一定同时是 i 和 j 的公倍数。现在对 x=1..K，统计矩阵中最多有多少个元素可以等于 x，并输出 ∑ x*cnt_x。",
        "inputDescription": "输入一行三个正整数 N、M、K。",
        "outputDescription": "输出一个整数，表示所求总和。",
        "samples": [
            {
                "input": "2 5 21",
                "output": "91"
            },
            {
                "input": "100 100 1001",
                "output": "1852331"
            }
        ],
        "explanation": "若某位置能取值为 x，则该位置的行号和列号都必须是 x 的约数。分别统计 1..N 和 1..M 中各有多少数整除 x，即得可行位置数。",
        "template": "#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int N,M,K;cin>>N>>M>>K;return 0;}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;vector<int> count_divisors(int limit,int num){vector<int>s(num+1,0);for(int i=1;i<=limit;++i)for(int j=i;j<=num;j+=i)s[j]++;return s;}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int N,M,K;cin>>N>>M>>K;vector<int>sN=count_divisors(N,1000000),sM=count_divisors(M,1000000);long long ans=0;for(int x=1;x<=K;++x)ans+=1LL*x*sN[x]*sM[x];cout<<ans<<\"\\n\";return 0;}"
    },
    {
        "type": "programming",
        "tags": [
            "编程题",
            "倍增",
            "模拟",
            "区间查询"
        ],
        "id": 27,
        "title": "接竹竿",
        "problemNumber": "2024-03-l8-Q27",
        "description": "给定一个长度为 n 的卡牌序列。按顺序放牌；若新牌点数与队列中已有某张相同，则把两张相同牌之间的所有牌（含两端）全部移除。多次询问区间 [l,r]，问只使用该区间的牌按顺序游戏后最后剩余多少张牌。",
        "inputDescription": "第一行 T。每组数据先输入 n，再输入长度为 n 的牌面序列，随后输入 q 和 q 个区间询问。",
        "outputDescription": "对每个询问输出最终剩余牌数。",
        "samples": [
            {
                "input": "1\n6\n1 2 2 3 1 3\n4\n1 3\n1 6\n1 5\n5 6",
                "output": "1\n1\n0\n2"
            }
        ],
        "explanation": "预处理每个位置第一次形成消去时会跳到哪里，并做倍增。回答询问时一边统计无法消去的牌，一边尽量用倍增跳过可整体消去的段。",
        "template": "#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){}return 0;}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;const int N=100000+10;int a[N],nxt[N][30],pos[25];int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){int n;cin>>n;memset(pos,0,sizeof(pos));for(int i=1;i<=n;++i){cin>>a[i];for(int j=0;j<=20;++j)nxt[i][j]=n+1;}for(int i=n;i>=1;--i){if(!pos[a[i]]){nxt[i][0]=n+1;pos[a[i]]=i;}else{nxt[i][0]=pos[a[i]];pos[a[i]]=i;}}for(int i=n;i>=1;--i)for(int j=1;j<=20;++j)if(nxt[i][j-1]+1<=n)nxt[i][j]=nxt[nxt[i][j-1]+1][j-1];int q;cin>>q;while(q--){int l,r;cin>>l>>r;int i=l,ans=0;while(i<=r){while(i<=r&&nxt[i][0]>r)++i,++ans;if(i>r)break;for(int j=20;j>=0;--j)if(nxt[i][j]<=r){i=nxt[i][j];break;}++i;}cout<<ans<<\"\\n\";}}return 0;}"
    }
];

export const paperData = {
    id: '2024-03-l8',
    title: '2024年3月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "为丰富⾷堂菜谱，炒菜部进⾏头脑风暴。⾁类有鸡⾁、⽜⾁、⽺⾁、猪⾁ 4 种，切法有⾁排、⾁块、⾁末 3 种，配菜有圆⽩菜、油菜、⾖腐 3 种，辣度有⿇辣、微辣、不辣 3 种。不考虑⼝感的情况下，选 1 种⾁、 1 种切法、 1 种 配菜、 1 种辣度产生一道菜（例如：⿇辣⽜⾁⽚炒⾖腐），这样能产生多少道菜？（ ）。",
            options: [
                "13",
                "42",
                "63",
                "108",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "已知袋中有 2 个相同的红球、 3 个相同的绿球、 5 个相同的黄球。每次取出一个不放回，全部取出。可能产生 多少种序列？（ ）。",
            options: [
                "6",
                "1440",
                "2520",
                "3628800",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "以下二维数组的初始化，哪个是符合语法的？（ ）。",
            options: [
                "int a[][] = {{1, 2}, {3, 4}};",
                "int a[][2] = {};",
                "int a[2][2] = {{1, 2, 3}, {4, 5, 6}};",
                "int a[2][] = {{1, 2, 3}, {4, 5, 6}};",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面有关 C++ 拷贝构造函数的说法，错误的是（ ）。",
            options: [
                "必须实现拷贝构造函数，否则一定会出现编译错误。",
                "对象作为函数参数、以值传递方式传入函数时，会⾃动调用拷贝构造函数。",
                "对象作为函数返回值、以值传递方式从函数返回时，会⾃动调用拷贝构造函数。",
                "使用一个对象初始化另一个对象时，会⾃动调用拷贝构造函数。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "使用邻接表表达一个无向简单图，图中包含v个顶点、e条边，则该表中边节点的个数为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "关于生成树的说法，错误的是（ ）。",
            options: [
                "一个无向连通图可以有多个生成树。",
                "一个无向图，只要连通，就一定有生成树。",
                "n个顶点的无向完全图，有 棵生成树。",
                "n个顶点的无向图，生成树包含$n-1$条边。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "已知三个double类型的变量a、b和theta分别表⽰一个三角形的两条边长及二者的夹角（弧度），则 下列哪个表达式可以计算这个三角形的周长？（ ）。",
            options: [
                "a * b * sin(theta) / 2",
                "a+b+(a+b) * sin(theta) / 2",
                "a * b * cos(theta) / 2",
                "a+b+sqrt(a * a+b * b-2 * a * b * cos(theta))",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "在有n个元素的二叉排序树中进⾏查找，其最好、最差时间复杂度分别为（ ）。",
            options: [
                "、",
                "、",
                "、",
                "、",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "如下图所⽰，半径为r、圆⼼角为t（弧度）的扇形，下面哪个表达式能够求出顶部阴影部分的面积？（ ）。",
            options: [
                "r * r * sin(t) / 2",
                "r * r * t / 2",
                "r * r * (t-sin(t))",
                "r * r * (t-sin(t)) / 2",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面程序的时间复杂度为（ ）。",
            options: [
                "选项A",
                "，其中",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面程序的时间复杂度为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面程序的时间复杂度为（ ）。",
            options: [
                "int fib(int n) { if (n <= 1) return 1; return fib(n-1)+fib(n-2); } 1 2 3 4 5 int choose(int n, int m) { if (m == 0 || m == n) return 1; return choose(n-1, m-1)+choose(n-1, m); } 1 2 3 4 5 int primes[MAXP], num = 0; bool isPrime[MAXN] = {false}; void sieve() { for (int n = 2; n <= MAXN; n++) { if (!isPrime[n]) primes[num++] = n; for (int i = 0; i < num && n * primes[i] <= MAXN; i++) { isPrime[n * primes[i]] = true; if (n % primes[i] == 0) break; } } } 1 2 3 4 5 6 7 8 9 10 11 12 13",
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
                "GESP8级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "4",
                "5",
                "126",
                "3024",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "90",
                "91",
                "96",
                "100 #include <iostream> using namespace std; int a[10][10]; int main() { int m = 5, n = 4; for (int x = 0; x <= m; x++) a[x][0] = 1; for (int y = 1; y <= n; y++) a[0][y] = 1; for (int x = 1; x <= m; x++) for (int y = 1; y <= n; y++) a[x][y] = a[x-1][y]+a[x][y-1]; cout << a[m][n] << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 #include <iostream> using namespace std; int main() { int cnt = 0; for (int x = 0; x <= 10; x++) for (int y = 0; y <= 10; y++) for (int z = 0; z <= 10; z++) if (x+y+z == 15) cnt++; cout << cnt << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 题号 1 2 3 4 5 6 7 8 9 10 答案",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面的程序使用邻接矩阵表达的带权无向图，则从顶点 0 到顶点 3 的最短距离为（ ）。",
            options: [
                "100",
                "16",
                "12",
                "13",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "已知int类型的变量a和b，则执⾏语句a, b = b, a;后，变量a和b的值会互换。",
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
                "GESP8级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "一个袋子中有 3 个完全相同的红⾊小球、 2 个完全相同的蓝⾊小球。每次从中取出 1 个，再放回袋子，这样进 ⾏ 3 次后，可能的颜⾊顺序有 7 种。",
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
                "GESP8级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "孙子定理是求解一次同余方程组的方法，最早见于中国南北朝时期（公元 5 世纪）的数学著作《孙子算 经》。⼜称中国余数定理，是中国数学史上的一项伟大成就。",
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
                "GESP8级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "个顶点的无向完全图有 条边。",
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
                "GESP8级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "为解决哈希函数冲突，在哈希表项内设置链表存储该项内的所有冲突元素，则该哈希表内查找元素的最差时 间复杂度为 。",
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
                "GESP8级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "求一个包含v个顶点、e条边的带权连通无向图的最小生成树， Prim 算法的时间复杂度为 。",
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
                "GESP8级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "已知int类型的变量a、b和c中分别存储着一个三角形的三条边长，则这个三角形的面积可以通过表达 式sqrt((a+b+c) * (b+c-a) * (a+c-b) * (a+b-c)) / 4求得。",
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
                "GESP8级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "可以使用深度优先搜索算法判断图的连通性。",
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
                "GESP8级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在 个元素的二叉排序树中查找一个元素，平均情况的时间复杂度是 。",
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
                "GESP8级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "给定double类型的变量x，且其值大于等于 ，我们可以通过二分法求出 的近似值。",
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
                "GESP8级",
            ]
        },
        ...programmingQuestions
    ]
};
