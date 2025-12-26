import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Terminal, CheckCircle, AlertTriangle, Play, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Copy, Check, Unlock, ArrowRight, Grid, Info, ArrowRightLeft, RefreshCw, Clock, Target, XCircle, Layout, GitBranch, Share2, Search, Map, Network, Route, Database, Box, Menu, X } from 'lucide-react';

// --- Shared Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const CodeBlock = ({ code, title }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden my-4 text-sm font-mono text-slate-50">
    {title && (
      <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex items-center gap-2">
        <Code size={14} />
        {title}
      </div>
    )}
    <pre className="p-4 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

// --- Modules ---

// Overview Module
const OverviewModule = ({ onStart }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-4">GESP C++ 八级巅峰指南</h1>
      <p className="text-purple-100 text-lg mb-6">
        算法皇冠上的明珠。征服图论最短路与最小生成树，掌握动态规划(DP)的状态转移，向竞赛级选手进阶。
      </p>
      <button
        onClick={() => onStart('graph_alg')}
        className="bg-white text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition flex items-center gap-2"
      >
        开始挑战 <ArrowRight size={18} />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Share2 size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">图论进阶</h3>
        <p className="text-slate-600 text-sm">
          最短路径(Dijkstra/Floyd)、最小生成树(Prim/Kruskal)、拓扑排序。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <Database size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">动态规划</h3>
        <p className="text-slate-600 text-sm">
          决策的艺术。背包问题(0/1, 完全)、线性DP、状态定义与转移方程。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
          <Hash size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">组合数学</h3>
        <p className="text-slate-600 text-sm">
          计数的智慧。排列组合 $C(n,k)$、杨辉三角、同余运算与逆元。
        </p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calculator className="text-indigo-500" /> GESP 八级分数构成
      </h3>
      <div className="flex gap-2 mb-4">
        {[
          { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题 算法/数学" },
          { name: "判断题", score: 20, color: "bg-green-500", desc: "10题 概念/复杂度" },
          { name: "编程题", score: 50, color: "bg-purple-500", desc: "2题 图论/DP" },
        ].map((item, idx) => (
          <div key={idx} className="flex-1">
            <div className={`h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
              {item.name}: {item.score}分
            </div>
            <div className="text-xs text-slate-500 text-center mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-indigo-800 text-sm">
          <strong>💡 核心考点：</strong>八级是真正迈向算法竞赛的门槛。<b>DP (Dynamic Programming)</b> 是绝对的难点，需要大量的练习来培养"状态"的感觉。图论算法则需要背诵模板 (尤其是 Dijkstra 和 Kruskal)。
        </p>
      </div>
    </div>

    {/* Self Assessment */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 八级核心技能自测
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "Dijkstra", icon: "🚀", hint: "Shortest Path" },
          { skill: "Floyd", icon: "🌐", hint: "All-Pairs Path" },
          { skill: "Union-Find", icon: "🤝", hint: "Disjoint Sets" },
          { skill: "Topological Sort", icon: "📉", hint: "Dependency" },
          { skill: "0/1 Knapsack", icon: "🎒", hint: "DP Basics" },
          { skill: "LCS/LIS", icon: "📏", hint: "Linear DP" },
          { skill: "Combinatorics", icon: "🎲", hint: "C(n,k)" },
          { skill: "Modulo", icon: "➗", hint: "(a*b)%m" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-medium text-slate-700 text-sm group-hover:text-indigo-600">{item.skill}</div>
            <div className="text-xs text-slate-400 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Topic Modules ---

// 专题一：图论进阶 (GraphAlgModule)
const GraphAlgModule = () => {
  // Dijkstra Visualization State
  const [dist, setDist] = useState({ 1: 0, 2: Infinity, 3: Infinity, 4: Infinity });
  const [visited, setVisited] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Graph: 1 ->(2, w=5), 1 ->(3, w=2), 3 ->(2, w=1), 2 ->(4, w=3), 3 ->(4, w=7)
  // Shortest 1 -> 4: 1->3 (2) -> 2 (2+1=3) -> 4 (3+3=6)

  const runDijkstra = () => {
    setIsAnimating(true);
    setDist({ 1: 0, 2: Infinity, 3: Infinity, 4: Infinity });
    setVisited([]);
    setActiveNode(null);

    const steps = [
      { n: 1, d: { 1: 0, 2: 5, 3: 2, 4: Infinity }, v: [1], desc: "Start at 1. Update neibs 2(5), 3(2)." },
      { n: 3, d: { 1: 0, 2: 3, 3: 2, 4: 9 }, v: [1, 3], desc: "Pick min dist 3. Update 2(2+1=3), 4(2+7=9)." },
      { n: 2, d: { 1: 0, 2: 3, 3: 2, 4: 6 }, v: [1, 3, 2], desc: "Pick min dist 2. Update 4(3+3=6)." },
      { n: 4, d: { 1: 0, 2: 3, 3: 2, 4: 6 }, v: [1, 3, 2, 4], desc: "Pick min dist 4. Done." }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      const s = steps[i];
      setActiveNode(s.n);
      setDist(s.d);
      setVisited(s.v);
      i++;
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2">核心心法</h3>
        <p className="text-blue-700"><b>Dijkstra</b>: 贪心。每次找离起点最近的未访问点，用它去松弛 (relax) 邻居。只适用非负权图。<br /><b>Floyd</b>: DP思想。`f[k][i][j]` 中转前k个点。适用多源最短路，N&lt;300。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> Dijkstra Template</h4>
          <CodeBlock
            title="Dijkstra (Priority Queue)"
            code={`priority_queue<PII, vector<PII>, greater<PII>> q;
memset(dist, 0x3f, sizeof(dist));
dist[start] = 0;
q.push({0, start});

while(!q.empty()) {
    auto t = q.top(); q.pop();
    int u = t.second;
    if(vis[u]) continue;
    vis[u] = true;

    for(auto edge : G[u]) {
        int v = edge.to, w = edge.w;
        if(dist[v] > dist[u] + w) {
            dist[v] = dist[u] + w;
            q.push({dist[v], v});
        }
    }
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Map size={18} /> Dijkstra 演示</h4>
          <div className="relative h-48 border border-slate-100 rounded-lg bg-slate-50 mb-4 flex items-center justify-center">
            {/* Manual SVG Graph */}
            <svg width="300" height="180" className="overflow-visible">
              {/* Edges */}
              <g stroke="#cbd5e1" strokeWidth="2">
                <line x1="50" y1="90" x2="150" y2="40" /> {/* 1-2 */}
                <line x1="50" y1="90" x2="150" y2="140" /> {/* 1-3 */}
                <line x1="150" y1="140" x2="150" y2="40" /> {/* 3-2 */}
                <line x1="150" y1="40" x2="250" y2="90" /> {/* 2-4 */}
                <line x1="150" y1="140" x2="250" y2="90" /> {/* 3-4 */}
              </g>
              {/* Weights */}
              <g fontSize="10" fill="#64748b" className="bg-white">
                <rect x="90" y="55" width="12" height="12" fill="white" /> <text x="96" y="65" textAnchor="middle">5</text>
                <rect x="90" y="115" width="12" height="12" fill="white" /> <text x="96" y="125" textAnchor="middle">2</text>
                <rect x="155" y="90" width="12" height="12" fill="white" /> <text x="161" y="100" textAnchor="middle">1</text>
                <rect x="200" y="55" width="12" height="12" fill="white" /> <text x="206" y="65" textAnchor="middle">3</text>
                <rect x="200" y="115" width="12" height="12" fill="white" /> <text x="206" y="125" textAnchor="middle">7</text>
              </g>

              {[
                { id: 1, x: 50, y: 90 }, { id: 2, x: 150, y: 40 }, { id: 3, x: 150, y: 140 }, { id: 4, x: 250, y: 90 }
              ].map(n => (
                <g key={n.id}>
                  <circle
                    cx={n.x} cy={n.y} r="18"
                    fill={activeNode === n.id ? "#f59e0b" : visited.includes(n.id) ? "#10b981" : "white"}
                    stroke={activeNode === n.id ? "#d97706" : "#94a3b8"} strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  <text x={n.x} y={n.y} dy="5" textAnchor="middle" fill={activeNode === n.id ? "white" : "#475569"} fontSize="12" fontWeight="bold">
                    {n.id}
                  </text>
                  <text x={n.x} y={n.y - 25} textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="bold">
                    {dist[n.id] === Infinity ? '∞' : dist[n.id]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            <Button size="sm" onClick={runDijkstra} disabled={isAnimating}>开始 Dijkstra</Button>
          </div>

          <div className="bg-slate-100 p-3 rounded text-sm text-center text-slate-600">
            {activeNode ? `正在处理节点 ${activeNode}...` : "点击按钮开始寻找 1 到 4 的最短路"}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题二：动态规划 (DPModule)
const DPModule = () => {
  // 0/1 Knapsack: Cap=5. Items: (w2, v3), (w3, v4), (w4, v5), (w5, v6)
  // dp[i][j] = max(dp[i-1][j], dp[i-1][j-w] + v)
  const [step, setStep] = useState(0);

  // DP Table state for animation (simplified)
  const items = [
    { w: 2, v: 3 },
    { w: 3, v: 4 },
    { w: 4, v: 5 }
  ];
  // Final table for reference
  //    0 1 2 3 4 5  (Capacity)
  // 0  0 0 0 0 0 0
  // 1  0 0 3 3 3 3  (Items: 1)
  // 2  0 0 3 4 4 7  (Items: 1, 2)
  // 3  0 0 3 4 5 7  (Items: 1, 2, 3)

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
        <h3 className="font-bold text-red-800 mb-2">核心心法</h3>
        <p className="text-red-700">DP 是<b>状态</b>的艺术。关键在于定义 `dp[i][j]` 是什么意思，以及如何从子问题转移而来。0/1背包倒序循环，完全背包正序循环。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Database size={18} /> 0/1 背包模板</h4>
          <CodeBlock
            title="1D Array Optimization"
            code={`// dp[j] 表示容量为 j 时的最大价值
for(int i=0; i<n; i++) {
    for(int j=Capacity; j>=w[i]; j--) { // 倒序
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Layout size={18} /> DP 表格可视化 (二维)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-2 border border-slate-200">i \\ Cap</th>
                  {[0, 1, 2, 3, 4, 5].map(c => <th key={c} className="p-2 border border-slate-200">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold bg-slate-50">Init</td>
                  {[0, 0, 0, 0, 0, 0].map((v, i) => <td key={i} className="p-2 border border-slate-200 text-slate-400">{v}</td>)}
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold bg-slate-50">Item 1 (2,3)</td>
                  {[0, 0, 3, 3, 3, 3].map((v, i) => <td key={i} className={`p-2 border border-slate-200 ${i >= 2 ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}>{v}</td>)}
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold bg-slate-50">Item 2 (3,4)</td>
                  {[0, 0, 3, 4, 4, 7].map((v, i) => <td key={i} className={`p-2 border border-slate-200 ${i >= 3 ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}>{v}</td>)}
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold bg-slate-50">Item 3 (4,5)</td>
                  {[0, 0, 3, 4, 5, 7].map((v, i) => <td key={i} className={`p-2 border border-slate-200 ${i === 4 ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}>{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题三：组合数学 (MathModule)
const MathModule = () => (
  <div className="space-y-6">
    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
      <h3 className="font-bold text-teal-800 mb-2">核心心法</h3>
      <p className="text-teal-700">不要硬算阶乘！$C(n, m)$ 可以用杨辉三角预处理 (DP思想)，或者用逆元计算 (当 m 很大时)。记得随时<b>取模</b>。</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 杨辉三角模板</h4>
        <CodeBlock
          title="Pascal Triangle"
          code={`// c[i][j] = C(i, j)
for(int i=0; i<=n; i++) {
    c[i][0] = 1;
    for(int j=1; j<=i; j++) {
        c[i][j] = (c[i-1][j] + c[i-1][j-1]) % MOD;
    }
}`}
        />
      </div>
      <Card className="p-5 bg-white">
        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Target size={18} /> 杨辉三角演示</h4>
        <div className="flex flex-col items-center gap-2 font-mono text-sm">
          <div className="flex gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
            <div className="w-8 h-8 flex items-center justify-center bg-teal-200 font-bold rounded ring-2 ring-teal-400">2</div>
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
            <div className="w-8 h-8 flex items-center justify-center bg-teal-200 font-bold rounded">3</div>
            <div className="w-8 h-8 flex items-center justify-center bg-teal-200 font-bold rounded">3</div>
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded">1</div>
          </div>
        </div>
        <div className="text-center mt-4 text-xs text-slate-400">
          每个数等于它"肩膀"上两个数之和。<br /> C(n, k) = C(n-1, k) + C(n-1, k-1)
        </div>
      </Card>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Code Trace (Placeholder for now, but enabled)
// -----------------------------------------------------------------------------
const CodeTraceModule = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Eye /> 代码跟踪模拟器</h2>
      <p className="text-slate-300">观察 Dijkstra 优先队列变化与 DP 状态转移过程。</p>
    </div>
    <div className="p-10 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
      🚧 施工中 (Coming Soon)
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Templates
// -----------------------------------------------------------------------------
const TemplateBlock = ({ title, desc, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
        <button onClick={handleCopy} className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border">
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? '已复制' : '复制'}
        </button>
      </div>
      <div className="p-4 bg-slate-900 overflow-x-auto">
        <pre className="text-sm font-mono text-green-400"><code>{code}</code></pre>
      </div>
    </div>
  );
};

const TemplatesModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Code /> 万能代码模板</h2>
      <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">背诵 + 理解</span>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <TemplateBlock
        title="1. Floyd-Warshall"
        desc="多源最短路 O(N^3)"
        code={`// init d[i][j] = INF, d[i][i] = 0
for(int k=1; k<=n; k++) {
    for(int i=1; i<=n; i++) {
        for(int j=1; j<=n; j++) {
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
        }
    }
}`}
      />
      <TemplateBlock
        title="2. Kruskal (MST)"
        desc="并查集 + 贪心 O(E log E)"
        code={`struct Edge { int u, v, w; };
bool cmp(Edge a, Edge b) { return a.w < b.w; }

sort(edges, edges+m, cmp);
for(auto e : edges) {
    if(find(e.u) != find(e.v)) {
        unite(e.u, e.v);
        ans += e.w;
    }
}`}
      />
      <TemplateBlock
        title="3. 最长上升子序列 (LIS)"
        desc="O(N log N) 贪心优化"
        code={`vector<int> tail;
for(int x : nums) {
    if(tail.empty() || x > tail.back()) {
        tail.push_back(x);
    } else {
        *lower_bound(tail.begin(), tail.end(), x) = x;
    }
}
return tail.size();`}
      />
      <TemplateBlock
        title="4. 快速幂"
        desc="(a^b) % p"
        code={`long long qpow(long long a, long long b, long long p) {
    long long res = 1;
    while(b) {
        if(b & 1) res = (res * a) % p;
        a = (a * a) % p;
        b >>= 1;
    }
    return res;
}`}
      />
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Exam Tips
// -----------------------------------------------------------------------------
const ExamTipsModule = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Lightbulb /> 考场秘籍</h2>
      <p className="text-amber-100">GESP 八级满分避坑指南。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 复杂度陷阱</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>Floyd</strong>: 三重循环 $N^3$。N=1000 时绝对超时！只适用于 N&le;300。</li>
          <li>• <strong>SPFA</strong>: 很容易被卡到 $O(VE)$。正权图首选 Dijkstra ($O(E \log V)$)。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 空间陷阱</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>DP数组</strong>: 注意内存限制。普通背包用滚动数组 ($1D$) 优化空间。</li>
          <li>• <strong>递归深度</strong>: 记忆化搜索时，防止栈溢出。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 常见错误</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• <strong>取模</strong>: 题目要求结果对 1e9+7 取模时，加减乘每一步都要取模！减法 `(a-b+MOD)%MOD`。</li>
          <li>• <strong>INF</strong>: `0x3f3f3f3f` 是好习惯。不要用 INT_MAX 避免加法溢出。</li>
        </ul>
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Practice
// -----------------------------------------------------------------------------
const PracticeModule = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      q: "对于有 N 个顶点的稠密图 (E ≈ N^2)，求单源最短路径最适合的算法是？",
      opts: ["Bellman-Ford", "SPFA", "朴素 Dijkstra", "堆优化 Dijkstra"],
      ans: 2,
      expl: "朴素 Dijkstra 复杂度 O(N^2)，适合稠密图。堆优化 O(E log N) 在稠密图时退化为 O(N^2 log N)。"
    },
    {
      q: "0/1 背包问题中，使用一维数组优化时，内层循环必须如何进行？",
      opts: ["从 0 到 Capacity 正序", "从 Capacity 到 0 倒序", "无所谓", "先正序后倒序"],
      ans: 1,
      expl: "必须倒序 (Capacity -> w[i])，是为了保证计算 dp[j] 时使用的是上一行的旧状态 dp[j-w[i]]，避免同一个物品被多次放入。"
    },
    {
      q: "杨辉三角第 n 行 (从0开始) 的第 k 个数表示什么？",
      opts: ["A(n, k)", "C(n, k)", "n^k", "k^n"],
      ans: 1,
      expl: "杨辉三角对应组合数 C(n, k)。"
    },
    {
      q: "在一个联通无向图中，最小生成树 (MST) 的边的权值之和是？",
      opts: ["唯一的", "不确定的", "最大的", "所有生成树中最小的"],
      ans: 3,
      expl: "MST 的定义就是权值和最小。虽然 MST 的形态可能不唯一(如果有相同权值的边)，但最小权值和是唯一的。"
    },
    {
      q: "Floyd 算法的三重循环中，最外层循环 k 代表什么？",
      opts: ["起点", "终点", "中间经过的节点", "边的权重"],
      ans: 2,
      expl: "Floyd 的核心思想是 DP：`f[k][i][j]` 表示只允许经过前 k 个点作为中转。所以 k 必须最先枚举。"
    }
  ];

  const q = questions[current];

  const handleAnswer = (idx) => {
    setSelected(idx);
    setShowResult(true);
    if (idx === q.ans) setScore(score + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setShowResult(false);
      setSelected(null);
    } else {
      alert(`练习结束！得分：${score + (selected === q.ans ? 0 : 0)}/${questions.length}`);
      setCurrent(0);
      setScore(0);
      setShowResult(false);
      setSelected(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Trophy className="text-yellow-500" /> 真题模拟小测</h3>
          <span className="text-xs bg-white border px-2 py-1 rounded text-slate-500">Q {current + 1} / {questions.length}</span>
        </div>
        <div className="p-8">
          <h4 className="text-lg font-bold text-slate-800 mb-6">{q.q}</h4>
          <div className="space-y-3">
            {q.opts.map((opt, idx) => (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center
                    ${showResult
                    ? idx === q.ans
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : idx === selected
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : 'opacity-50 border-slate-100'
                    : 'border-slate-100 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700'}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}. {opt}</span>
                {showResult && idx === q.ans && <CheckCircle size={20} className="text-green-600" />}
                {showResult && idx === selected && idx !== q.ans && <XCircle size={20} className="text-red-600" />}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="mt-6 animate-fade-in">
              <div className={`p-4 rounded-xl text-sm ${selected === q.ans ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="font-bold mb-1">{selected === q.ans ? '回答正确！' : '回答错误'}</p>
                <p>{q.expl}</p>
              </div>
              <Button onClick={next} variant="primary" className="w-full mt-4">
                {current < questions.length - 1 ? '下一题' : '查看结果'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Module: CheckList
// -----------------------------------------------------------------------------
const CheckListModule = () => {
  const items = [
    "图论：背诵 Dijkstra (Priority Queue) 和 Kruskal 模板，能 3 分钟内默写。",
    "DP：理解 0/1 背包的一维优化原理。对于 LIS/LCS 等经典模型要烂熟于心。",
    "复杂度：看到 N=1000 想到 N^2，看到 N=10^5 想到 N log N。",
    "数学：遇到大数取模题目，检查每一步运算是否都取模了。减法记得 +MOD 再 %MOD。",
    "心态：DP 题如果一时想不出状态转移，尝试从小规模数据找规律 (打表找规律)。",
  ];
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-600" />
        考前冲刺 CheckList
      </h3>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-bold text-slate-400 mt-0.5">
              {idx + 1}
            </div>
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

// --- Main Component ---

export default function CourseLevel8() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'graph_alg', label: '图论进阶', icon: Share2 },
    { id: 'dp', label: '动态规划', icon: Database },
    { id: 'math', label: '组合数学', icon: Hash },
    { id: 'trace', label: '代码跟踪', icon: Eye },
    { id: 'templates', label: '万能模板', icon: Code },
    { id: 'tips', label: '考场秘籍', icon: Lightbulb },
    { id: 'practice', label: '真题实战', icon: Trophy },
    { id: 'checklist', label: '考前清单', icon: CheckCircle },
  ];

  const activeTabInfo = menuItems.find(item => item.id === activeTab);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 八级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              G
            </div>
            <h1 className="text-xl font-bold text-slate-800">GESP 八级</h1>
          </div>
          <p className="text-xs text-slate-500">进阶提升 2025版</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                            `}
            >
              <item.icon size={18} />
              {item.label}
              {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2025 GESP 备考互动课件</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {activeTabInfo?.icon && <activeTabInfo.icon className="text-indigo-600" size={24} />}
            {activeTabInfo?.label}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 8</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
            {activeTab === 'graph_alg' && <div className="animate-fade-in"><GraphAlgModule /></div>}
            {activeTab === 'dp' && <div className="animate-fade-in"><DPModule /></div>}
            {activeTab === 'math' && <div className="animate-fade-in"><MathModule /></div>}
            {activeTab === 'trace' && <div className="animate-fade-in"><CodeTraceModule /></div>}
            {activeTab === 'templates' && <div className="animate-fade-in"><TemplatesModule /></div>}
            {activeTab === 'tips' && <div className="animate-fade-in"><ExamTipsModule /></div>}
            {activeTab === 'practice' && <div className="animate-fade-in"><PracticeModule /></div>}
            {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
          </div>
          <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
            GESP C++ 八级备考互动课件 | 图论算法与动态规划
          </footer>
        </main>
      </div>
    </div>
  );
}
