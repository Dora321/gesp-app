// 2023年12月 GESP C++ 八级真题

const programmingQuestions = [
    {
        "type": "programming",
        "tags": [
            "编程题",
            "组合数学",
            "组合数",
            "计数"
        ],
        "id": 26,
        "title": "奖品分配",
        "problemNumber": "2023-12-l8-Q26",
        "description": "共有 T 个班级分配问题。对某个班级，n 名同学需要各分到 1 个奖品，共有 m 种奖品，第 i 种奖品有 a_i 个。求把奖品种类分配给所有同学的方案数；只要存在一位同学拿到的奖品种类不同，就视为不同方案。输出答案对 1e9+7 取模。",
        "inputDescription": "第一行一个整数 T。每组数据一行：先给出 n、m，再给出 m 个正整数 a_i。",
        "outputDescription": "对每组数据输出一行，一个整数，表示方案数对 1e9+7 取模后的结果。",
        "samples": [
            {
                "input": "3\n3 2 1 2\n3 2 1 3\n5 3 3 1 1",
                "output": "3\n4\n20"
            }
        ],
        "explanation": "按奖品种类依次分配。若当前还剩 sum 件奖品，其中某类有 a_i 件，则有 C(sum, a_i) 种选位方式，依次相乘即可。",
        "template": "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){/* TODO */}return 0;}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\nconst int N=1005,MOD=1000000007;int C[N+5][N+5],a[N+5];void addmod(int &x,int y){x+=y;if(x>=MOD)x-=MOD;}void init(){C[0][0]=1;for(int i=1;i<=N;++i){C[i][0]=C[i][i]=1;for(int j=1;j<i;++j){C[i][j]=C[i-1][j-1];addmod(C[i][j],C[i-1][j]);}}}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);init();int T;cin>>T;while(T--){int n,m,sum=0;cin>>n>>m;for(int i=1;i<=m;++i)cin>>a[i],sum+=a[i];long long ans=1;for(int i=1;i<=m;++i){ans=ans*C[sum][a[i]]%MOD;sum-=a[i];}cout<<ans<<\"\\n\";}return 0;}"
    },
    {
        "type": "programming",
        "tags": [
            "编程题",
            "树",
            "LCA",
            "重链剖分"
        ],
        "id": 27,
        "title": "大量的工作沟通",
        "problemNumber": "2023-12-l8-Q27",
        "description": "公司形成一棵管理树，0 号员工是老板，其余每名员工都有唯一直接领导。若 x 是 y 的祖先（也允许 x=y），则称 x 可以管理 y。给定若干场合作，每场合作给出若干参与员工，要求找出一位能管理所有参与者的主持人；若有多名满足条件，输出编号最大的那位。",
        "inputDescription": "第一行一个整数 n。第二行给出 1..n-1 号员工的直接领导编号。第三行一个整数 q，表示合作场数。接下来 q 行，每行先给出 m，再给出 m 个互不重复的员工编号。",
        "outputDescription": "输出 q 行，每行一个整数，表示该场合作的主持人编号。",
        "samples": [
            {
                "input": "5\n0 0 2 2\n3\n2 3 4\n3 2 3 4\n2 1 4",
                "output": "2\n2\n0"
            }
        ],
        "explanation": "所有参与者的公共管理者就是这些点在树上的最近公共祖先。再预处理根到每点路径上的最大编号 mxId，答案即为 mxId[LCA]。",
        "template": "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;/* TODO */return 0;}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;const int N=100005;int fa[N],sz[N],dep[N],son[N],tp[N],mxId[N],cnt,fir[N],tar[N],nxt[N];void linkEdge(int a,int b){tar[++cnt]=b;nxt[cnt]=fir[a];fir[a]=cnt;}void dfs(int x,int mxid){int mx=0;sz[x]=1;mxId[x]=max(x,mxid);for(int i=fir[x];i;i=nxt[i]){dep[tar[i]]=dep[x]+1;dfs(tar[i],mxId[x]);sz[x]+=sz[tar[i]];if(mx<sz[tar[i]])mx=sz[son[x]=tar[i]];}}void getTop(int x){tp[x]=x;if(son[fa[x]]==x)tp[x]=tp[fa[x]];for(int i=fir[x];i;i=nxt[i])getTop(tar[i]);}int lca(int x,int y){while(tp[x]!=tp[y])dep[tp[x]]>dep[tp[y]]?x=fa[tp[x]]:y=fa[tp[y]];return dep[x]<dep[y]?x:y;}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;for(int i=2;i<=n;++i){cin>>fa[i];++fa[i];linkEdge(fa[i],i);}dfs(1,1);getTop(1);int q;cin>>q;while(q--){int m,x,y;cin>>m>>x;x++;for(int i=2;i<=m;++i){cin>>y;x=lca(x,y+1);}cout<<mxId[x]-1<<\"\\n\";}return 0;}"
    }
];

export const paperData = {
    id: '2023-12-l8',
    title: '2023年12月 GESP C++ 八级真题',
    level: 8,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "小杨要从 A 城到 B 城，⼜想顺路游览一番。他有两个选项： 1 、坐高铁路到 C 城游览，再坐高铁或飞机到 B 城； 2 、坐船到 D 城游览，再坐船、高铁或飞机到 B 城。请问小杨从 A 城到 B 城共有⼏种交通方案可以选择？（ ）。",
            options: [
                "2",
                "3",
                "5",
                "6",
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
            id: 2,
            type: "single",
            question: "以下哪个函数声明是符合语法的，且在调用时可以将二维数组的名字作为实际参数传递给形式参数a？（ ）。",
            options: [
                "void QuickSort(int a[][10], int n);",
                "void QuickSort(int a[5][], int m);",
                "void QuickSort(int a[][], int n, int m);",
                "void QuickSort(int ** a, int n, int m);",
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
            id: 3,
            type: "single",
            question: "下面有关 C++ 类和对象的说法，错误的是（ ）。",
            options: [
                "对象的生命周期开始时，会执⾏构造函数。",
                "对象的生命周期结束时，会执⾏析构函数。",
                "类的析构函数可以为虚函数。",
                "类的构造函数可以为虚函数。",
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
            id: 4,
            type: "single",
            question: "使用邻接矩阵表达n个顶点的有向图，则该矩阵的大小为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "5位同学排队，其中一位同学不能排在第一，则共有多少种可能的排队方式？（ ）。",
            options: [
                "5",
                "24",
                "96",
                "120",
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
            question: "一个无向图包含n个顶点，则其最小生成树包含多少条边？（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "最小生成树可能不存在。",
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
            question: "已知三个double类型的变量a、b和theta分别表⽰一个三角形的两条边长及二者的夹角（弧度），则 下列哪个表达式可以计算这个三角形的面积？（ ）。",
            options: [
                "a * b * sin(theta) / 2",
                "(a + b) * sin(theta) / 2",
                "a * b * cos(theta) / 2",
                "sqrt(a * a + b * b - 2 * a * b * cos(theta))",
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
            id: 8,
            type: "single",
            question: "对有n个元素的二叉排序树进⾏中序遍历，其时间复杂度是（ ）。",
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
            id: 9,
            type: "single",
            question: "假设输入参数m和n满⾜ ，则下面程序的最差情况的时间复杂度为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 10,
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
            id: 11,
            type: "single",
            question: "下面程序的时间复杂度为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面的程序使用出边的邻接表表达有向图，则下列选项中哪个是它表达的图？（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "12",
                "18",
                "36",
                "42",
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
            id: 14,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "3",
                "6",
                "11",
                "22",
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
            id: 15,
            type: "single",
            question: "下面的程序中，二维数组h和v分别代表如下图所⽰的⽹格中的⽔平边的时间消耗和垂直边的时间消耗。 程序使用动态规划计算从左下角到右上角的最小时间消耗，则横线处应该填写下列哪个选项的代码？（ ）。",
            options: [
                "dis[i][j] = min(dis[i - 1][j] + v[i - 1][j], dis[i][j - 1] + h[i][j - 1]);",
                "dis[i][j] = min(dis[i - 1][j] + h[i - 1][j], dis[i][j - 1] + v[i][j - 1]);",
                "dis[i + 1][j + 1] = min(dis[i][j + 1] + v[i][j + 1], dis[i + 1][j] + h[i + 1][j]); 题号 1 2 3 4 5 6 7 8 9 10 答案",
                "dis[i + 1][j + 1] = min(dis[i][j + 1] + h[i][j + 1], dis[i + 1][j] + v[i + 1][j]);",
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
            question: "C++ 语⾔非常强大，可以用来求解方程的解。例如，如果变量x为double类型的变量，则执⾏语句x * 2 - 4 = 0;后，变量x的值会变为2.0。",
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
            question: "一个袋子中有 3 个完全相同的红⾊小球、 2 个完全相同的蓝⾊小球。每次从中取出 1 个，且不放回袋子，这样 进⾏ 3 次后，将取出的小球依次排列，则可能的颜⾊顺序有 7 种。",
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
            question: "杨辉三角，是二项式系数的一种三角形排列，在中国南宋数学家杨辉 1261 年所著的《详解九章算法》一书中 出现，是中国数学史上的一项伟大成就。",
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
            question: "个顶点的有向完全图（不带⾃环）有 条边。",
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
            question: "如果待查找的元素确定，只要哈希表的大小不小于查找元素的个数，就一定存在不会产生冲突的哈希函数。",
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
            question: "动态规划算法的时间复杂度一般为：必要状态的数量，乘以计算一次状态转移方程的时间复杂度。",
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
            question: "已知int类型的变量a、b和h中分别存储着一个梯形的顶边长、底边长和高，则这个梯形的面积可以通 过表达式(a + b) * h / 2求得。",
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
            question: "判断图是否连通只能用⼴度优先搜索算法实现。",
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
            question: "在 个元素的二叉排序树中查找一个元素，最好情况的时间复杂度是 。",
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
        }
    ]
};
