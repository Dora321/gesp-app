export const l8ProgrammingByPaper = {
  '2024-06-l8': [
    {
      type: 'programming', id: 26, title: '最远点对', problemNumber: '2024-06-l8-Q26',
      score: 25,
      description: '给定一棵 n 个节点的树，每个节点颜色为 0/1。求一对颜色不同的节点之间的最大距离（边数）。保证至少存在一对白黑颜色不同的节点。',
      inputDescription: '第一行一个正整数 n。第二行 n 个整数 c_i，0 表示白色，1 表示黑色。接下来 n-1 行每行两个正整数 u、v，表示树边。',
      outputDescription: '输出一个整数，表示颜色不同的两点间的最大距离。',
      samples: [{ input: '5\n0 1 0 1 0\n1 2\n1 3\n3 4\n3 5', output: '3' }],
      explanation: '对每个节点维护子树内两种颜色能到达的最深深度，合并子树时更新异色端点形成的最优答案，本质上是在树上求异色直径。',
      tags: ['编程题', '树形DP', '树的直径', 'DFS'],
      template: '#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;/* TODO */return 0;}',
      referenceCode: '#include <bits/stdc++.h>\nusing namespace std;\nconst int N=100000+5; vector<int> g[N]; int col[N],dep[N],best[N][2],ans; void dfs(int u,int fa){dep[u]=dep[fa]+1; best[u][0]=best[u][1]=-1; best[u][col[u]]=dep[u]; for(int v:g[u]) if(v!=fa){dfs(v,u); for(int c=0;c<2;c++) if(best[u][c]!=-1&&best[v][c^1]!=-1) ans=max(ans,best[u][c]+best[v][c^1]-2*dep[u]); for(int c=0;c<2;c++) best[u][c]=max(best[u][c],best[v][c]);} if(best[u][col[u]^1]!=-1) ans=max(ans,best[u][col[u]^1]-dep[u]);} int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n; for(int i=1;i<=n;i++) cin>>col[i]; for(int i=1,u,v;i<n;i++){cin>>u>>v; g[u].push_back(v); g[v].push_back(u);} dfs(1,0); cout<<ans<<"\\n"; return 0;}'
    },
    {
      type: 'programming', id: 27, title: '空间跳跃', problemNumber: '2024-06-l8-Q27',
      score: 25,
      description: '平面上有 n 个互不重叠的水平挡板。小杨从某个挡板的左端点出发，可以在挡板上水平移动；走到端点外侧会竖直下落到下方第一个能接住该 x 坐标的位置。水平移动和竖直下落都按长度/高度计时。求从起始挡板 s 到目标挡板 t 的最少耗时；若无法到达则输出 -1。',
      inputDescription: '第一行一个正整数 n。第二行两个正整数 s、t。接下来 n 行每行三个正整数 l_i、r_i、h_i，表示一个挡板。',
      outputDescription: '输出一个整数，表示最少耗时；若无法到达输出 -1。',
      samples: [{ input: '3\n3 1\n5 6 3\n3 5 6\n1 4 100000', output: '100001' }],
      explanation: '把每块挡板的左右端点看成关键状态，并为可能落到的位置建立中间点，边权就是水平位移或竖直下落耗时；随后在状态图上跑 Dijkstra。',
      tags: ['编程题', '最短路', '建图', 'Dijkstra'],
      template: '#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;/* TODO */return 0;}',
      referenceCode: '// 参考官方思路：端点/落点建图 + Dijkstra。'
    }
  ],
  '2024-09-l8': [
    { type: 'programming', id: 26, title: '手套配对', problemNumber: '2024-09-l8-Q26', description: '有 n 对不同的手套，每对由左手和右手各一只组成。现在恰好取出 m 只手套，要求其中恰好包含 k 对完整配对。问不同取法有多少种。答案对 1e9+7 取模。', inputDescription: '第一行一个正整数 T。接下来 T 组数据，每组一行三个正整数 n、m、k。', outputDescription: '每组数据输出一个整数。', samples: [{ input: '2\n5 6 2\n5 1 5', output: '120\n0' }], explanation: '方案数为 C(n,k)×C(n-k,m-2k)×2^(m-2k)。', tags: ['编程题', '组合数学', '计数'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){}return 0;}', referenceCode: '#include <bits/stdc++.h>\nusing namespace std; const int N=2005,MOD=1000000007; long long C[N][N],pw[N]; int main(){ios::sync_with_stdio(false);cin.tie(nullptr); pw[0]=1; for(int i=1;i<N;i++) pw[i]=pw[i-1]*2%MOD; for(int i=0;i<N;i++){ C[i][0]=1; for(int j=1;j<=i;j++) C[i][j]=(C[i-1][j]+C[i-1][j-1])%MOD; } int T;cin>>T; while(T--){int n,m,k;cin>>n>>m>>k; if(m<2*k||m-2*k>n-k){cout<<0<<"\\n"; continue;} cout<<C[n][k]*C[n-k][m-2*k]%MOD*pw[m-2*k]%MOD<<"\\n";} return 0;}' },
    { type: 'programming', id: 27, title: '美丽路径', problemNumber: '2024-09-l8-Q27', description: '给定一棵 n 个节点的树，每个节点颜色为黑/白。若一条简单路径上任意相邻两个节点颜色都不同，则称这条路径为美丽路径。求最长美丽路径的长度。', inputDescription: '第一行一个正整数 n。第二行 n 个整数 c_i，其中 0 表示白色、1 表示黑色。接下来 n-1 行每行两个正整数 u、v，表示树边。', outputDescription: '输出一个整数。', samples: [{ input: '5\n1 0 0 1 0\n1 2\n3 5\n4 3\n1 3', output: '4' }, { input: '5\n0 0 0 0 0\n1 2\n2 3\n3 4\n4 5', output: '1' }], explanation: '删去所有同色端点的边后，合法路径就变成森林中的普通简单路径。对每个连通块求直径，取最大值。', tags: ['编程题', '树形DP', '直径'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;return 0;}', referenceCode: '// 参考做法：仅沿异色边 DFS，求森林直径。' }
  ],
  '2024-12-l8': [
    { type: 'programming', id: 26, title: '树上移动', problemNumber: '2024-12-l8-Q26', description: '给定一棵 n 个节点的树，每个节点颜色为 0/1，其中 1 表示黑色。任选起点和终点，沿简单路径移动，要求路径上经过的黑色节点数不超过 k。求最多能经过多少个节点。', inputDescription: '第一行两个正整数 n、k。第二行 n 个整数表示各节点颜色。接下来 n-1 行每行两个正整数 u、v。', outputDescription: '输出一个正整数。', samples: [{ input: '5 1\n0 0 1 1 1\n1 2\n2 3\n2 5\n1 4', output: '3' }], explanation: '等价于在树上找一条点权和（黑点记 1）不超过 k 的最长简单路径。', tags: ['编程题', '树', 'DFS'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,k;cin>>n>>k;return 0;}', referenceCode: '// 基础写法可从每个点出发 DFS；高阶可用点分治优化。' },
    { type: 'programming', id: 27, title: '排队', problemNumber: '2024-12-l8-Q27', description: '有 n 位同学要排成一列。给出 m 条相邻约束，每条约束要求 a 必须紧挨在 b 前面。问满足全部约束的排队方案数，答案对 1e9+7 取模。', inputDescription: '第一行两个整数 n、m。接下来 m 行每行两个整数 a、b。', outputDescription: '输出一个整数。', samples: [{ input: '4 2\n1 3\n2 4', output: '2' }, { input: '3 0', output: '6' }, { input: '3 2\n1 2\n2 1', output: '0' }], explanation: '约束会把若干同学压缩成有向链。若出现环、某点入度或出度超过 1，则无解；否则把每条链视为一个整体再排列。', tags: ['编程题', '排列计数', '链与环'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m;cin>>n>>m;return 0;}', referenceCode: '// 参考做法：检查每点入/出度 ≤1，判环，统计链数后做阶乘。' }
  ],
  '2025-03-l8': [
    { type: 'programming', id: 26, title: '上学', problemNumber: '2025-03-l8-Q26', description: 'C 城是一张无向带权连通图，学校位于固定结点 s。给出 q 位同学家的结点位置，每位同学每秒走 1 米，问每位同学从家到学校的最短时间。', inputDescription: '第一行四个正整数 n、m、s、q。接下来 m 行每行三个正整数 u、v、l。接下来 q 行每行一个正整数 p。', outputDescription: '输出 q 行。', samples: [{ input: '5 5 3 3\n1 2 3\n2 3 2\n3 4 1\n4 5 3\n1 4 2\n5\n1\n4', output: '4\n3\n1' }], explanation: '从学校结点 s 出发做一次 Dijkstra，随后每个询问直接输出对应结点的最短路。', tags: ['编程题', '最短路', 'Dijkstra'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m,s,q;cin>>n>>m>>s>>q;return 0;}', referenceCode: '#include <bits/stdc++.h>\nusing namespace std; const long long INF=4e18; int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m,s,q;cin>>n>>m>>s>>q; vector<vector<pair<int,int>>> g(n+1); for(int i=0,u,v,w;i<m;i++){cin>>u>>v>>w; g[u].push_back({v,w}); g[v].push_back({u,w});} vector<long long> d(n+1,INF); priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>> pq; d[s]=0; pq.push({0,s}); while(!pq.empty()){auto [du,u]=pq.top();pq.pop(); if(du!=d[u]) continue; for(auto [v,w]:g[u]) if(d[v]>du+w){d[v]=du+w; pq.push({d[v],v});}} while(q--){int p;cin>>p; cout<<d[p]<<"\\n";} return 0;}' },
    { type: 'programming', id: 27, title: '割裂', problemNumber: '2025-03-l8-Q27', description: '给定一棵树、k 个好点对和 1 个坏点对。删除某节点后，若所有好点对仍连通而坏点对不连通，则该节点可删除。求可删除节点数。', inputDescription: '第一行两个正整数 n、k。接下来 n-1 行树边；再接 k 行好点对；最后一行一个坏点对。', outputDescription: '输出一个正整数。', samples: [{ input: '6 2\n1 3\n1 5\n3 6\n3 2\n5 4\n5 4\n5 3\n2 6', output: '1' }], explanation: '对好点对路径做一类树上差分，对坏点对路径做另一类差分，后序汇总后统计满足 g[u]=0 且 h[u]>0 的节点。', tags: ['编程题', '树上差分', 'LCA'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,k;cin>>n>>k;return 0;}', referenceCode: '// 参考做法：LCA + 两组树上差分。' }
  ],
  '2025-06-l8': [
    { type: 'programming', id: 26, title: '树上旅行', problemNumber: '2025-06-l8-Q26', description: '给定一棵以 1 为根的有根树。正数操作表示向父亲走若干步，负数操作表示反复走向当前节点编号最小的儿子；若无法继续则停在原点。求每次旅行结束所在的节点。', inputDescription: '第一行两个正整数 n、q。第二行给出 2..n 号节点的父节点。接下来 q 组询问：先给起点 s 和序列长度 k，下一行给出 k 个非零整数表示操作。', outputDescription: '输出 q 行。', samples: [{ input: '5 4\n1 1 2 2\n3 3\n1 -1 -1\n2 5\n1 -1 1 -1 1\n5 8\n1 1 1 -1 -1 -1 -1 -1\n5 3\n-1 -1 1', output: '4\n1\n4\n2' }], explanation: '分别预处理向父亲跳和向最小儿子跳的倍增表，每个操作做按位跳跃即可。', tags: ['编程题', '倍增', '树上跳跃'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,q;cin>>n>>q;return 0;}', referenceCode: '// 参考做法：parent/son 两套倍增表。' },
    { type: 'programming', id: 27, title: '遍历计数', problemNumber: '2025-06-l8-Q27', description: '给定一棵树。深度优先遍历的起点可以任意选，访问相邻未访问结点的顺序也可以任意。问可能得到多少种不同 DFS 序列，答案对 1e9 取模。', inputDescription: '第一行一个整数 n。接下来 n-1 行每行两个正整数 u、v。', outputDescription: '输出一个整数。', samples: [{ input: '4\n1 2\n2 3\n3 4', output: '6' }, { input: '8\n1 2\n1 3\n1 4\n2 5\n2 6\n3 7\n3 8', output: '112' }], explanation: '固定根后方案数为 deg(root)! × ∏_{u≠root}(deg(u)-1)!。枚举根并用前后缀积即可在线性时间求总和。', tags: ['编程题', '树计数', '排列'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;return 0;}', referenceCode: '#include <bits/stdc++.h>\nusing namespace std; const int N=100000+5,MOD=1000000000; int deg[N],fac[N],pre[N],suf[N]; int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n; fac[0]=1; for(int i=1;i<=n;i++) fac[i]=1LL*fac[i-1]*i%MOD; for(int i=1,u,v;i<n;i++){cin>>u>>v; deg[u]++; deg[v]++;} pre[0]=1; for(int i=1;i<=n;i++) pre[i]=1LL*pre[i-1]*fac[deg[i]-1]%MOD; suf[n+1]=1; for(int i=n;i>=1;i--) suf[i]=1LL*suf[i+1]*fac[deg[i]-1]%MOD; long long ans=0; for(int i=1;i<=n;i++) ans=(ans+1LL*pre[i-1]*fac[deg[i]]%MOD*suf[i+1])%MOD; cout<<ans<<"\\n"; return 0;}' }
  ],
  '2025-09-l8': [
    { type: 'programming', id: 26, title: '最短距离', problemNumber: '2025-09-l8-Q26', description: '构造一张完全图，边权只由两点编号是否互质决定：互质权 p，否则权 q。给出多组询问，求两点最短距离。', inputDescription: '第一行三个正整数 n、p、q，其中 n 为询问组数。接下来 n 行每行两个正整数 a、b。', outputDescription: '输出 n 行。', samples: [{ input: '4 4 3\n1 2\n2 3\n4 2\n3 5', output: '4\n4\n3\n4' }, { input: '5 2 6\n1 2\n2 3\n4 2\n3 5\n6 6', output: '2\n2\n4\n2\n0' }], explanation: '最优路径最多只需两条边：直接连边，或经中转点（尤其是 1 号点）中转。', tags: ['编程题', '图论', '最短路'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,p,q;cin>>n>>p>>q;return 0;}', referenceCode: '#include <bits/stdc++.h>\nusing namespace std; int gcd2(int a,int b){return b?gcd2(b,a%b):a;} int main(){ios::sync_with_stdio(false);cin.tie(nullptr); int n,p,q;cin>>n>>p>>q; while(n--){int a,b;cin>>a>>b; int ans; if(a==b) ans=0; else if(a==1||b==1) ans=p; else {ans=min(2*p,2*q); if(gcd2(a,b)==1) ans=min(ans,p); else ans=min(ans,q);} cout<<ans<<"\\n";} return 0;}' },
    { type: 'programming', id: 27, title: '最小生成树', problemNumber: '2025-09-l8-Q27', description: '给定一个连通无向带权图。对于每条边，删除它之后分别求剩余图的最小生成树权值和；若最小生成树不存在则输出 -1。', inputDescription: '第一行两个正整数 n、m。接下来 m 行每行三个正整数 u、v、w。', outputDescription: '输出 m 行。', samples: [{ input: '5 5\n1 2 4\n2 3 3\n3 4 1\n2 5 2\n3 1 8', output: '14\n15\n-1\n-1\n10' }, { input: '6 10\n1 2 6\n2 3 3\n3 1 4\n3 4 5\n4 5 8\n5 6 2\n6 4 1\n3 2 4\n5 4 4\n3 3 6', output: '15\n16\n17\n-1\n15\n17\n18\n15\n15\n15' }], explanation: '先求原图 MST。非树边被删除不影响答案；树边被删除时，需要找到穿过该割的最小替换边。', tags: ['编程题', '最小生成树', 'Kruskal'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m;cin>>n>>m;return 0;}', referenceCode: '// 参考做法：原 MST + 非树边替换树边。' }
  ],
  '2025-12-l8': [
    { type: 'programming', id: 26, title: '猫和老鼠', problemNumber: '2025-12-l8-Q26', description: '庄园是一张带权无向连通图，猫从结点 a 出发，老鼠洞在结点 b。若某结点到老鼠洞的最短路长度严格小于猫窝到老鼠洞的最短路长度，则老鼠可安全取得该结点奶酪。求安全结点奶酪总价值。', inputDescription: '第一行两个正整数 n、m。第二行两个正整数 a、b。第三行 n 个正整数 c_i。接下来 m 行每行三个正整数 u、v、w。', outputDescription: '输出一个整数。', samples: [{ input: '5 5\n1 2\n1 2 4 8 16\n1 2 4\n2 3 3\n3 4 1\n2 5 2\n3 1 8', output: '22' }, { input: '6 10\n3 4\n1 1 1 1 1 1\n1 2 6\n2 3 3\n3 1 4\n3 4 5\n4 5 8\n5 6 2\n6 4 1\n3 2 4\n5 4 4\n3 3 6', output: '3' }], explanation: '从老鼠洞出发做最短路，若某点到洞的最短时间小于猫窝到洞的最短时间，则该点安全。', tags: ['编程题', '最短路', '图论'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m;cin>>n>>m;return 0;}', referenceCode: '#include <bits/stdc++.h>\nusing namespace std; const long long INF=4e18; int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m,a,b;cin>>n>>m>>a>>b; vector<int> c(n+1); for(int i=1;i<=n;i++) cin>>c[i]; vector<vector<pair<int,int>>> g(n+1); for(int i=0,u,v,w;i<m;i++){cin>>u>>v>>w; g[u].push_back({v,w}); g[v].push_back({u,w});} vector<long long> d(n+1,INF); priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>> pq; d[b]=0; pq.push({0,b}); while(!pq.empty()){auto [du,u]=pq.top();pq.pop(); if(du!=d[u]) continue; for(auto [v,w]:g[u]) if(d[v]>du+w){d[v]=du+w; pq.push({d[v],v});}} long long ans=0; for(int i=1;i<=n;i++) if(d[i]<d[a]) ans+=c[i]; cout<<ans<<"\\n"; return 0;}' },
    { type: 'programming', id: 27, title: '宝石项链', problemNumber: '2025-12-l8-Q27', description: '有一条长度为 n 的项链，宝石种类共有 m 种。需要把项链划分成若干连续段，且每一段都包含全部 m 种宝石。求最多能划分多少段。', inputDescription: '第一行两个正整数 n、m。第二行 n 个正整数 t_i。', outputDescription: '输出一个整数。', samples: [{ input: '6 2\n1 2 1 2 1 2', output: '3' }, { input: '7 3\n3 1 3 1 2 1 2', output: '2' }], explanation: '先对每个起点求出包含全部种类的最短段长，再在环上倍增连续跳段。', tags: ['编程题', '双指针', '倍增'], template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m;cin>>n>>m;return 0;}', referenceCode: '// 参考做法：双指针求 jump[0]，倍增求最大段数。' }
  ]
,
  '2026-03-l8': [
    {
      type: 'programming',
      score: 25,
      id: 26,
      title: '消息查找',
      problemNumber: '2026-03-l8-Q26',
      description: '有 n 条消息，编号 1..n。每条消息 i 可能引用一条编号小于 i 的消息 r_i。从消息 i 可一步移动到 i-1 或 r_i。给定多组询问，求从 x 到 y 的最少操作次数。',
      inputDescription: '第一行两个正整数 n、q。第二行给出 r_1..r_n（若无引用可为 0）。接下来 q 行每行两个整数 x、y。',
      outputDescription: '每个询问输出一个整数，表示最少操作次数。',
      samples: [],
      explanation: '可建反向跳边并结合倍增/LCA 或最短路思想处理多询问。',
      tags: ['编程题', '图论', '最短路/倍增'],
      template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,q;cin>>n>>q;return 0;}',
      referenceCode: '// 参考官方题意实现。'
    },
    {
      type: 'programming',
      score: 25,
      id: 27,
      title: '子图最短路',
      problemNumber: '2026-03-l8-Q27',
      description: '给定 n 点 m 边无向带权图。对所有区间 [l,r] 构造只含编号在区间内节点的子图，累加每个子图中所有点对最短路长度（不连通记 0），结果对 1e9 取模。',
      inputDescription: '第一行两个正整数 n、m。接下来 m 行每行 u、v、w。',
      outputDescription: '输出总和对 1e9 取模的结果。',
      samples: [],
      explanation: '可考虑按区间增量维护最短路（如 Floyd 增点思想）并累计贡献。',
      tags: ['编程题', '最短路', '图论'],
      template: '#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n,m;cin>>n>>m;return 0;}',
      referenceCode: '// 参考官方题意实现。'
    }
  ]
};
