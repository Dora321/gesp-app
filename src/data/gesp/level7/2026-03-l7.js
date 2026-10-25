// 2026年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      title: '拆分',
      problemNumber: 'P15802',
      score: 25,
      description: `小 A 想将正整数 $n$ 拆分成若干个正整数之和，并最大化拆分后的正整数之积。小 A 希望你帮他计算出拆分后正整数之积的最大值。由于答案可能很大，你只需要求出答案对 $10^9$ 取模的结果。

形式化地，$n$ 的拆分是满足 $a_1+\\cdots+a_k=n$ 的若干个正整数 $a_1,\\ldots,a_k$，其中 $1\\le k\\le n$。你需要求出 $n$ 的所有拆分中 $a_1\\times\\cdots\\times a_k$ 的最大值对 $10^9$ 取模的结果。

**数据范围**：对于 40% 的测试点，保证 $n\\le 50$；对于所有测试点，保证 $1\\le t\\le 10^4$，$1\\le n\\le 10^6$。`,
      inputDescription: '第一行，一个正整数 $t$，表示数据组数。\n\n对于每组数据：一行，一个整数 $n$，表示给定的正整数。',
      outputDescription: '对于每组数据：输出一行，一个整数，表示 $n$ 拆分后正整数之积的最大值对 $10^9$ 取模的结果。',
      samples: [
        {
          input: '3\n5\n8\n100',
          output: '6\n18\n755407364'
        }
      ],
      explanation: `**考点**：整数拆分（数学贪心结论）+ 递推预处理，注意「取模后无法比较大小」。

**1. 最优拆分只含 2 和 3。** 若某个加数 $a\\ge 5$，把它换成 $3$ 与 $a-3$ 乘积会变大（$3(a-3)-a=2a-9>0$）；若出现加数 $1$，把它与任意加数 $a$ 合并为 $a+1$ 也更优（$a+1>a$）。故所有加数都在 $\\{2,3,4\\}$ 中。

**2. 三个 2 不如两个 3。** $3\\times 3=9>2\\times 2\\times 2=8$，所以 $2$ 至多出现两个；$4=2+2$ 保留即可。

由此得到结论：
- $n\\bmod 3=0$：全拆成 3，答案 $3^{n/3}$；
- $n\\bmod 3=1$：留一个 $4$（$3+1$ 不如 $2+2$），答案 $4\\times 3^{(n-4)/3}$；
- $n\\bmod 3=2$：留一个 $2$，答案 $2\\times 3^{(n-2)/3}$；
- 特判 $n=1,2,3,4$，答案分别为 $1,2,3,4$。

**3. 取模的坑。** 取模之后数值大小关系被破坏，不能写 \`f[n]=max(3*f[n-3], 2*f[n-2])\` 这类 DP。必须先把「用几个 3、留 2 还是留 4」的结构定下来，再在模意义下递推。由上述结论对 $n\\ge 5$ 恒有 $f[n]=3\\times f[n-3]$（最优拆分里一定含加数 3），因此可以 $O(n)$ 预处理出所有 $f$。

**参考实现**：预处理 $f[1..10^6]$（\`f[i] = 3 * f[i-3] % 10^9\`），每组询问 $O(1)$ 回答，总复杂度 $O(10^6+t)$。`,
      tags: ["编程题", "数学", "贪心"],
      template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    // 在此编写代码
    return 0;
}`,
      referenceCode: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000000;
const int MAXN = 1000000;

int f[MAXN + 1];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // 最优拆分只由 2 和 3 组成：n>=5 时取一个 3 一定不亏，故 f[n] = 3 * f[n-3]
    f[1] = 1;
    f[2] = 2;
    f[3] = 3;
    f[4] = 4;
    for (int i = 5; i <= MAXN; ++i) {
        f[i] = (int)(3LL * f[i - 3] % MOD);
    }

    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << f[n] << '\\n';
    }
    return 0;
}`,
    },
    {
      id: 27,
      type: 'programming',
      title: '物流网络',
      problemNumber: 'P15803',
      score: 25,
      description: `一个物流网络由 $n$ 个城市和 $m$ 条双向公路组成。每条公路都有两个属性：

- 运输费用 $w_i$
- 景观评分 $b_i$

当一辆运输车从城市 $1$ 运送货物到城市 $n$ 时，需要支付经过道路的运输费用之和。

为了推广旅游线路，物流公司推出了一项优惠政策：在运输路径上，可以免除景观评分最高的那条公路的运输费用。如果有多条公路的景观评分同为最大值，则只免除其中一条的费用。

请你计算，从城市 $1$ 到城市 $n$ 的最小运输费用。

**数据范围**：$1\\le n\\le 5000$，$1\\le m\\le 5000$，$1\\le w_i,b_i\\le 10^9$。`,
      inputDescription: '第一行两个整数 $n,m$，分别表示城市数量和公路数量。\n\n接下来 $m$ 行，每行四个整数 $u,v,w,b$，表示存在一条连接城市 $u$ 和城市 $v$ 的双向公路，其中 $w$ 为运输费用，$b$ 为景观评分。',
      outputDescription: '输出一个整数，表示从城市 $1$ 到城市 $n$ 的最小费用。\n\n如果无法到达，输出 -1。',
      samples: [
        {
          input: '3 3\n1 2 10 5\n2 3 20 6\n1 3 100 1',
          output: '0'
        }
      ],
      explanation: `**考点**：单源最短路（Dijkstra）+ 双属性处理（按景观评分排序、增量加边）。

**样例理解**：路径 $1\\to2\\to3$ 费用 $10+20$，$b$ 的最大值为 $6$（边 $2-3$），免除 $20$，总花费 $10$；路径 $1\\to3$ 费用 $100$，$b$ 的最大值为 $1$，免除 $100$，总花费 $0$。取最小值，答案为 $0$。

**关键观察**：设路径 $P$ 上被免除的边为 $e$，则 $e$ 必是 $P$ 上 $b$ 值最大的边，因此 $P$ 的其余边都满足 $b\\le b_e$。于是「固定被免除的边 $e=(u,v)$」后，问题变成：在只保留 $b\\le b_e$ 的边的子图中，求 $1\\to u$ 与 $v\\to n$ 的最短路，代价为 \`d1[u] + dn[v]\`（反向走则取 \`d1[v] + dn[u]\`）。对每条边都算一次并取最小值即得答案；若始终不可达则输出 -1。

**实现技巧**：把所有公路按 $b$ 升序排序，逐条加边并做增量 Dijkstra——加入一条边只会让 $d_1$、$d_n$ 变小，把两个端点的新距离压入堆继续松弛即可，无需每次重跑。处理到评分为 $b$ 的一组时，子图恰好是 $b'\\le b$ 的全部公路。

**易错点**：$b$ 相同时必须先把整组边都加入、再统计答案。如果写成「先用旧距离算答案、再加当前边」，当最优路径上景观评分最大的边不止一条（并列）时，会漏掉「免除其中较贵那条」的方案。

**复杂度**：排序 $O(m\\log m)$，增量松弛的总体量约为 $O(m\\log n)$，在 $n,m\\le 5000$ 下远快于时限。费用之和最大可达约 $5\\times10^{12}$，距离必须用 \`long long\`。`,
      tags: ["编程题", "图论", "最短路"],
      template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    // 在此编写代码
    return 0;
}`,
      referenceCode: `#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll INF = (ll)4e18;

struct Edge {
    int u, v;
    ll w, b;
};

typedef priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<pair<ll, int>>> MinHeap;

// 把队列里的松弛信息传播完（dist 数组在加边过程中单调不增）
void drain(vector<ll> &d, const vector<vector<pair<int, ll>>> &g, MinHeap &q) {
    while (!q.empty()) {
        pair<ll, int> top = q.top();
        q.pop();
        ll du = top.first;
        int u = top.second;
        if (du != d[u]) continue;
        for (size_t i = 0; i < g[u].size(); ++i) {
            int v = g[u][i].first;
            ll w = g[u][i].second;
            if (du + w < d[v]) {
                d[v] = du + w;
                q.push(make_pair(d[v], v));
            }
        }
    }
}

void addEdge(vector<vector<pair<int, ll>>> &g, vector<ll> &d1, vector<ll> &dn,
             MinHeap &q1, MinHeap &qn, int u, int v, ll w) {
    g[u].push_back(make_pair(v, w));
    g[v].push_back(make_pair(u, w));

    if (d1[u] + w < d1[v]) { d1[v] = d1[u] + w; q1.push(make_pair(d1[v], v)); }
    if (d1[v] + w < d1[u]) { d1[u] = d1[v] + w; q1.push(make_pair(d1[u], u)); }
    if (dn[u] + w < dn[v]) { dn[v] = dn[u] + w; qn.push(make_pair(dn[v], v)); }
    if (dn[v] + w < dn[u]) { dn[u] = dn[v] + w; qn.push(make_pair(dn[u], u)); }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<Edge> e(m);
    for (int i = 0; i < m; ++i) {
        int u, v;
        ll w, b;
        cin >> u >> v >> w >> b;
        e[i].u = u;
        e[i].v = v;
        e[i].w = w;
        e[i].b = b;
    }

    if (n == 1) {
        cout << 0 << '\\n';
        return 0;
    }

    // 按景观评分升序加边：处理评分为 b 的一组时，图中恰好包含评分不超过 b 的公路
    sort(e.begin(), e.end(), [](const Edge &a, const Edge &b) { return a.b < b.b; });

    vector<vector<pair<int, ll>>> g(n + 1);
    vector<ll> d1(n + 1, INF), dn(n + 1, INF);
    MinHeap q1, qn;
    d1[1] = 0;
    q1.push(make_pair(0, 1));
    dn[n] = 0;
    qn.push(make_pair(0, n));

    ll ans = INF;
    int i = 0;
    while (i < m) {
        int j = i;
        while (j < m && e[j].b == e[i].b) ++j;

        // 先把评分同为 e[i].b 的公路全部加入，再做最短路松弛
        for (int k = i; k < j; ++k) addEdge(g, d1, dn, q1, qn, e[k].u, e[k].v, e[k].w);
        drain(d1, g, q1);
        drain(dn, g, qn);

        // 组内任一条公路都可能作为被免除费用的「景观评分最大」的公路
        for (int k = i; k < j; ++k) {
            int u = e[k].u, v = e[k].v;
            if (d1[u] < INF && dn[v] < INF) ans = min(ans, d1[u] + dn[v]);
            if (d1[v] < INF && dn[u] < INF) ans = min(ans, d1[v] + dn[u]);
        }

        i = j;
    }

    cout << (ans == INF ? -1LL : ans) << '\\n';
    return 0;
}`,
    }
];

export const paperData = {
    id: '2026-03-l7',
    title: '2026年3月 GESP C++ 七级真题',
    level: 7,
    year: 2026,
    month: 3,
    session: 3,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `假设一个算法时间复杂度的递推式是 $T(n)=2T(n-1)+1$（n 为正整数），且 $T(0)=1$，那么这个算法的时间复杂度是（　）。`,
            options: [
                "$O(n)$",
                "$O(n\\log n)$",
                "$O(n^2)$",
                "$O(2^n)$",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（O(2^n)）**

把递推式展开：

- $T(1)=2T(0)+1=3$
- $T(2)=2T(1)+1=7$
- $T(3)=2T(2)+1=15$

可以看出 $T(n)=2^{n+1}-1$。忽略常数倍和低阶项后，时间复杂度为 $O(2^n)$。

**易错点**：递推式每深入一层都把前一层的工作量乘 2，这不是线性增长。连续乘 n 次会产生指数级增长。

**考点**：递推关系、指数复杂度。`,
            tags: [
                "递推",
                "时间复杂度",
            ],
            sourceVerified: true,
            sourcePage: 1,
            sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B43%E6%9C%88-C%2B%2B7%E7%BA%A7.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27'
        },
        {
            id: 2,
            type: "single",
            question: `下面关于 “ 唯一分解定理 ” 和 “ 素数筛法 ” 的说法中，错误的是（ ）。`,
            options: ["如果预处理出 以内每个数的最小质因子，那么可以在 时间内完成任意一个不超过 的整数的质因", "线性筛（欧拉筛）能够保证每个合数只被其最小质因子筛掉一次，这一性质依赖于唯一分解定理。", "唯一分解定理保证：若一个数未被任何不超过其平方根的质数筛去，则它一定是质数。", "唯一分解定理是埃氏筛时间复杂度为 的根本原因。"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（唯一分解定理是埃氏筛时间复杂度为 的根本原因。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `若字符串 与字符串 的最长公共子序列（ LCS ）长度为 5 ，则（ ）。`,
            options: ["它们的编辑距离为 5", "它们至少有 5 个公共字符", "它们最长公共子串长度为 5", "它们一定长度相等"],
            answer: 1,
            score: 2,
            explanation: `**答案：B（它们至少有 5 个公共字符）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `在 $0/1$ 背包问题中，给定一组物品，每个物品有一个重量和价值，背包的容量有限。假设背包的最大容量为 $W$，物品的数量为 $n$，其中第 $i$ 个物品的重量为 $w_i$，价值为 $v_i$。以下关于 $0/1$ 背包问题的描述，正确的是（ ）。`,
            options: [
                "在解决 $0/1$ 背包问题时，使用贪心算法可以保证找到最优解，因为物品只能放入一次。",
                "0/1 背包是 P 问题（多项式时间可解问题），它可以在 $O(nW)$ 的时间复杂度内解决。",
                "0/1 背包问题中，动态规划解法的空间复杂度为 $O(nW)$，但可以通过滚动数组技巧将空间复杂度优化到 $O(W)$。",
                "0/1 背包问题中，每个物品只能选择一次，并且子问题之间是独立的，无法重用计算结果。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（注：C 项同样正确，本题标准答案为 B）**

**解析：**
- A 错误——0/1 背包具有最优子结构但不具贪心选择性质，贪心一般不能保证最优解。
- B 正确——0/1 背包可用动态规划在 \`O(nW)\` 时间求解（伪多项式），是经典结论。
- C 正确——二维状态 \`dp[i][j]\` 空间 \`O(nW)\`，滚动数组可优化到 \`O(W)\`（两项均正确，单选题仅选其一）。
- D 错误——DP 正因子问题重叠、可复用子问题计算结果才高效，并非“无法重用”。

**考点**：0/1 背包的动态规划解法及时间 / 空间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            sourceIntegrity: "missing-formula",
            integrityNote: "选项 C、D 末尾的复杂度公式在提取时丢失（「链地址法在最坏情况下查找时间复杂度为」「查找哈希表的时间复杂度总是」后无内容），而记录答案正是 D，无法据以判断。",
            question: `关于哈希表（ Hash Table ）在不考虑扩容且采用简单均匀哈希函数的前提下，下列说法中错误的是（ ）。`,
            options: ["装载因子越大，发生冲突的概率通常越高", "开放定址法在删除元素时实现相对复杂", "链地址法在最坏情况下查找时间复杂度为", "查找哈希表的时间复杂度总是"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（查找哈希表的时间复杂度总是）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `对于如下二叉树，下面关于访问的顺序说法错误的是（ ）。`,
            options: [
                "D E B F H J I G C A 是它的后序遍历序列。",
                "A B C D E F G H I J 是它的广度优先遍历序列。",
                "A B D E C F G H I J 是它的先序遍历序列。",
                "D B E A F C H G J I 是它的中序遍历序列。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（D 项说法错误）**

**解析：** 由 C 项（先序 \`A B D E C F G H I J\`）与 D 项（中序 \`D B E A F C H G J I\`）可唯一重建二叉树：A 左子树为 B（左 D、右 E），右子树为 C（左 F，右 G（左 H，右 I（左 J）））。据此计算各遍历：
- 后序：D E B F H J I G C A，与 A 项一致 ✓
- 广度优先（层序）：A B C D E F G H I J，与 B 项一致 ✓
- 先序：A B D E C F G H I J，与 C 项一致 ✓
- 实际中序为 \`D B E A F H G J I C\`，而 D 项写为 \`D B E A F C H G J I\`（把 C 错放在 F 之后），与真实中序不符 ✗

故 D 说法错误。

**考点**：由先序 + 中序重建二叉树，并验证三种遍历与层序。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `下面程序的运行结果为（ ）。

\`\`\`cpp
#include <iostream>
#include <algorithm>

bool check(int n, int a[], int k, int dist) {
    int cnt = 1;
    int last = a[0];

    for (int i = 1; i < n; i++) {
        if (a[i] - last >= dist) {
            cnt++;
            last = a[i];
        }
    }

    return cnt >= k;
}


int solve(int n, int a[], int k) {
    std::sort(a, a + n);

    int l = 0;
    int r = a[n - 1] - a[0];

    while (l < r) {
        int mid = (l + r + 1) / 2;

        if (check(n, a, k, mid))
            l = mid;
        else
            r = mid - 1;
    }

    return l;

}

int main() {
    int a[] = {1, 2, 8, 4, 9};
    int n = 5;
    int k = 3;

    std::cout << solve(n, a, k) << std::endl;

    return 0;
}
\`\`\``,
            options: [
                "2",
                "3",
                "4",
                "5",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（3）**

**解析：** 代码对数组 \`a={1,2,8,4,9}\` 排序得 \`{1,2,4,8,9}\`，用二分查找“最大的最小间距 dist”，使得能选出不少于 \`k=3\` 个点且任意相邻被选点间距 ≥ dist。\`check(3)\`：从 1 开始，≥1+3=4 选 4（cnt=2），≥4+3=7 选 8（cnt=3）≥3 满足。二分过程：\`l=0,r=8\`；\`mid=4\` 不满足→\`r=3\`；\`mid=2\` 满足→\`l=2\`；\`mid=3\` 满足→\`l=3\`；结束得 3。

**考点**：二分答案 + 贪心判定（最大化最小间距）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。假设数组 $a$ 的值域范围是 $D$。

\`\`\`cpp
#include <iostream>
#include <algorithm>

bool check(int n, int a[], int k, int dist) {
    int cnt = 1;
    int last = a[0];

    for (int i = 1; i < n; i++) {
        if (a[i] - last >= dist) {
            cnt++;
            last = a[i];
        }
    }

    return cnt >= k;
}


int solve(int n, int a[], int k) {
    std::sort(a, a + n);

    int l = 0;
    int r = a[n - 1] - a[0];

    while (l < r) {
        int mid = (l + r + 1) / 2;

        if (check(n, a, k, mid))
            l = mid;
        else
            r = mid - 1;
    }

    return l;

}

int main() {
    int a[] = {1, 2, 8, 4, 9};
    int n = 5;
    int k = 3;

    std::cout << solve(n, a, k) << std::endl;

    return 0;
}
\`\`\``,
            options: [
                "O(n log n + n log D)",
                "O(n log n log D)",
                "O(n log n)",
                "O(n log D)",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（O(n log n + n log D)）**

**解析：** 程序分两段计费：\`solve\` 先对数组排序 \`std::sort\`，为 O(n log n)；随后在值域区间 [0, a[n-1]−a[0]]（长度不超过 D）上二分答案，共 O(log D) 轮，每轮调用 \`check\` 一次，\`check\` 为线性扫描 O(n)，合计 O(n log D)。两部分相加，总时间复杂度 O(n log n + n log D)。
- B. O(n log n log D)：多乘了一个 log n，\`check\` 只扫一遍数组，错误。
- C. O(n log n)：遗漏了二分答案 × check 的开销（仅当 D 有界且可忽略时才近似成立，题面已明确值域 D 为变量），不精确。
- D. O(n log D)：遗漏了排序的 O(n log n)，错误。
**考点**：二分答案的复杂度分析——排序 + 值域二分 × 线性 check。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `某二叉树共有 10 个结点，记为 A~J，已知它的先序遍历序列为：A B D H I E C F J G，中序遍历序列为：H D I B E A F J C G，则该二叉树的后序遍历序列是（ ）。`,
            options: ["H I D E B J F G C A", "H I D B E J F G C A", "I H D E B J F G C A", "H I D E B F J G C A"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（H I D E B J F G C A）**

**解析：** 由先序 + 中序重建二叉树：
- 先序首结点 A 为根；中序中 A 左侧 \`H D I B E\` 为左子树、右侧 \`F J C G\` 为右子树。
- 左子树：先序 \`B D H I E\` 首结点 B 为根，中序 \`H D I | B | E\`，故 B 的左子树含 {H,D,I}、右孩子为 E；先序 \`D H I\` 首结点 D 为根，中序 \`H | D | I\`，故 D 左孩子 H、右孩子 I。
- 右子树：先序 \`C F J G\` 首结点 C 为根，中序 \`F J | C | G\`，故 C 的左子树含 {F,J}、右孩子为 G；先序 \`F J\` 首结点 F 为根，中序 \`J | F\`，故 J 是 F 的左孩子。

树形：A（B（D（H, I）, E）, C（F（J, —）, G））。后序遍历（左右根）：H I D E B ｜ J F G C ｜ A，即 \`H I D E B J F G C A\`。

**考点**：由先序 + 中序序列重建二叉树并求后序遍历。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下面哪一个可能是下图的深度优先遍历序列（ ）。

![有向图：9 个结点，边为 1→4、1→5、1→7、2→1、2→5、2→9、3→1、3→2、4→7、5→4、5→8、6→3、8→4、8→7、8→9、9→6](/question-assets/2026-03-l7/q10-dfs.png)`,
            options: [
                "1, 5, 4, 8, 7, 9, 6, 3, 2",
                "1, 5, 8, 4, 7, 9, 6, 3, 2",
                "2, 5, 8, 7, 9, 6, 3, 4, 1",
                "8, 9, 6, 3, 2, 5, 1, 4, 7",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（1, 5, 8, 4, 7, 9, 6, 3, 2）**

**解析：** 由图读出各结点的出边邻接表：

- 1 → 4, 5, 7
- 2 → 1, 5, 9
- 3 → 1, 2
- 4 → 7
- 5 → 4, 8
- 6 → 3
- 8 → 4, 7, 9
- 9 → 6

DFS 从某点出发，每次沿一条边访问未访问的邻接点，无路可走时回溯。逐项判定：

- **A**：\`1, 5, 4, …\` 访问 4 后，4 有未访问出边 4→7，DFS 必须先深入 7，而序列下一项是 8，矛盾，排除。
- **B**：\`1 → 5 → 8 → 4 → 7\`（7 为叶，回溯到 8）\`→ 9 → 6 → 3 → 2\`（2 的出边全已访问，结束）。每一步都是沿合法出边深入或回溯后继续，9 个结点全部访问，是合法 DFS 序列。
- **C**：\`…, 6, 3, 4, …\` 结点 3 的出边只有 3→1、3→2，没有 3→4，从 3 无法直接到达 4，排除。
- **D**：\`…, 2, 5, 1, …\` 访问 5 时，5 有未访问出边 5→4，DFS 必须先访问 4，而序列下一项是 1，矛盾，排除。

**考点**：图的深度优先遍历（DFS）序列的判定——沿出边深入、无路回溯；有向图中「可能」的序列指存在某种邻接点访问次序使 DFS 产生该序列。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `下面这个有向图的强连通分量的个数是（ ）。`,
            options: ["3", "4", "5", "6"],
            answer: 1,
            score: 2,
            explanation: `**答案：B（4）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `下面关于二叉树的说法正确的是（ ）。`,
            options: [
                "任意二叉树的中序遍历与后序遍历必定不相同。",
                "对任意二叉树，若已知先序遍历与后序遍历，则该二叉树唯一确定。",
                "若二叉树有 $n$ 个结点，根节点高度为 $h$，则其高度满足：$2^h-1 \\ge n$。",
                "在二叉树的先序遍历中，根后紧跟的结点一定是根的左孩子。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
- A 错误——单结点树的中序与后序相同（都是该结点），并非“必定不相同”。
- B 错误——仅由先序 + 后序一般不能唯一确定二叉树（出现单孩子结点时左右难辨）。
- C 正确——高度为 h 的二叉树最多有 \`2^h-1\` 个结点，故 \`n ≤ 2^h-1\`，即 \`2^h-1 ≥ n\` 成立。
- D 错误——若根没有左孩子，则先序中根后紧跟的是右孩子，不一定是左孩子。

**考点**：二叉树遍历性质与高度 / 节点数关系。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `有 6 个字符，它们出现的次数分别为：{2, 3, 3, 4, 6, 8}，现在用哈夫曼编码为这些字符编码，最小加权路径长度 WPL（每个字符的出现次数 × 它的编码长度，再把每个字符结果加起来）的值为（ ）。`,
            options: ["58", "60", "62", "64"],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734447340716064.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：D（64）**

哈夫曼算法每次合并当前权值最小的两个结点，WPL 等于所有合并产生的新结点权值之和：

1. \`2 + 3 = 5\`，剩余 \`{3, 4, 5, 6, 8}\`；
2. \`3 + 4 = 7\`，剩余 \`{5, 6, 7, 8}\`；
3. \`5 + 6 = 11\`，剩余 \`{7, 8, 11}\`；
4. \`7 + 8 = 15\`，剩余 \`{11, 15}\`；
5. \`11 + 15 = 26\`。

因此 \`WPL = 5 + 7 + 11 + 15 + 26 = 64\`，选择 D。

**易错点**：不能只把最初的 6 个频次相加；某个叶子每向下增加一层，它的权值都会再贡献一次，所以应累加每轮合并权值。

**原卷核验**：题干见官方 PDF 第 4 页，选项见第 5 页；答案表见第 1 页。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `下面哪一个可能是下图的深度优先遍历序列（ ）。`,
            options: [
                "1, 5, 6, 3, 2, 8, 9, 4, 7",
                "1, 5, 8, 9, 7, 4, 6, 3, 2",
                "3, 2, 1, 4, 7, 6, 9, 5, 8",
                "2, 5, 6, 3, 8, 7, 9, 4, 1",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（库内标注；原图缺失无法独立验证，见说明）**

**解析：** 本题在题库中缺失对应的图，无法独立验证哪条是合法 DFS 序列。库内标注答案为 D。DFS 序列需满足：从起点出发，每次沿一个未访问的邻接点深入，回溯后再继续；同一图因邻接点选择顺序不同可对应多个合法 DFS 序列。请补全原图后核对。

**考点**：图的深度优先遍历（DFS）序列性质（本题数据缺陷待补）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下面这个有向图的强连通分量的个数是（ ）。`,
            options: [
                "3",
                "4",
                "5",
                "6",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（5，库内标注；原图缺失无法独立验证，见说明）**

**解析：** 本题在题库中缺失对应的有向图，无法独立数出强连通分量个数。库内标注答案为 5（选项 C）。强连通分量指顶点间互相可达的极大子图，可用 Tarjan 或 Kosaraju 算法求解。请补全原图后核对。

**考点**：有向图强连通分量（SCC）计数（本题数据缺陷待补）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语言中，表达式3 ^ 2的结果类型为int，值为9。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** C++ 中 \`^\` 是位异或运算符，不是乘方。\`3 (二进制 011) ^ 2 (二进制 010) = 001 = 1\`，结果类型确为 int，但“值为 9”错误（9 是 3 的平方）。故命题整体为假。

**考点**：位运算 \`^\`（异或）与乘方的区分。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `使用cmath头文件中的正弦函数，表达式sin(90)的结果类型为double，值约为1.0。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** \`cmath\` 的 \`sin\` 参数为弧度而非角度。\`sin(90)\` 表示 90 弧度的正弦，约 \`sin(90 - 14·2π) = sin(2.04) ≈ 0.89\`，并非 ≈ 1.0；只有 \`sin(π/2)\`（即 90°）才 ≈ 1.0。结果类型为 double 正确，但“值约为 1.0”错误。

**考点**：\`sin\` 的弧度制与角度制区别。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `使用strcmp("10", "9")比较两个字符串，返回值大于 0 ，说明"10"比"9"大。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** \`strcmp\` 按字典序逐字节比较。\`'1'(49) < '9'(57)\`，故 \`"10" < "9"\` 字典序，\`strcmp("10","9")\` 返回负数（<0），并非 >0；且 \`strcmp\` 比较的是字符串字典序而非数值大小，不能说明“10 比 9 大”。命题整体为假。

**考点**：\`strcmp\` 的字典序比较语义。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `选择排序是一种不稳定的排序算法，而冒泡排序是一种稳定的排序算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 选择排序每趟把最小元素交换到前面，可能跨越相等元素而改变其相对次序，是**不稳定**排序；冒泡排序只在相邻逆序时交换，相等元素不交换，是**稳定**排序。命题正确。

**考点**：排序算法的稳定性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `求两个长度为 $n$ 序列的最长公共子序列（LCS）长度时，可以使用滚动数组将空间复杂度从 $O(N^2)$ 优化到 $O(N)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** LCS 递推 \`dp[i][j]\` 只依赖 \`dp[i-1][*]\` 与 \`dp[i][*]\`，只需保留上一行，用滚动数组即可将空间从 \`O(n²)\` 降到 \`O(n)\`。命题正确。

**考点**：LCS 动态规划与滚动数组空间优化。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `在无向图中，所有顶点的度数之和等于边数的两倍。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 握手定理：每条无向边贡献 2 个度数（两端各 1），故所有顶点度数之和 = 2 × 边数。命题正确。

**考点**：握手定理。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `使用邻接矩阵存储一个有 $n$ 个顶点、$m$ 条边的图，对该图进行一次完整的 BFS 遍历，时间复杂度为 $O(N^2)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 邻接矩阵下，对每个出队顶点需扫描整行 n 个元素以找邻居，单次 \`O(n)\`，共 n 个顶点，完整 BFS 为 \`O(n²)\`（与边数 m 无关）。命题正确。

**考点**：邻接矩阵上 BFS 的时间复杂度。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `在图像处理或游戏开发中，泛洪（ flood fill ）算法既可以用 BFS 实现，也可以用 DFS 实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** Flood Fill（油漆桶式填充）本质是四 / 八连通区域的图搜索，既可用 BFS（队列）也可用 DFS（栈 / 递归）实现。命题正确。

**考点**：泛洪算法（Flood Fill）的实现方式。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `使用链地址法处理冲突的哈希表，当所有元素都映射到同一个槽位时，查找操作的最坏时间复杂度为 $O(N)$，其中 $n$ 为元素个数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 链地址法下，若全部 n 个元素哈希到同一槽位，该槽位退化为长度 n 的链表，最坏查找需遍历整条链，时间复杂度 \`O(n)\`。命题正确。

**考点**：链地址法哈希冲突的最坏查找复杂度。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `一个包含 $n$ 个顶点的连通无向图，其任何一棵生成树都恰好包含 $n-1$ 条边。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 连通无向图的一棵生成树是包含全部 n 个顶点、连通且无环的子图，必恰有 \`n-1\` 条边（树的基本性质）。命题正确。

**考点**：生成树边数 = 顶点数 − 1。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
