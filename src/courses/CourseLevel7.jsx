import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, CheckCircle, AlertTriangle, Play, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Copy, Check, Unlock, ArrowRight, Grid, Info, ArrowRightLeft, RefreshCw, Clock, Target, XCircle, Layout, GitBranch, Share2, Search, Map, Network, Route, Menu, X } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';

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
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-4">GESP C++ 七级冲刺指南</h1>
      <p className="text-blue-100 text-lg mb-6">
        探索非线性数据结构。掌握树与图的奥秘，精通 DFS 与 BFS 搜索算法，挑战复杂逻辑。
      </p>
      <button
        onClick={() => onStart('tree')}
        className="bg-white text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition flex items-center gap-2"
      >
        开始学习 <ArrowRight size={18} />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <GitBranch size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">树与二叉树</h3>
        <p className="text-slate-600 text-sm">
          层级结构之美。完全二叉树、遍历序(前/中/后)、树的深度与节点。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
          <Share2 size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">图论基础</h3>
        <p className="text-slate-600 text-sm">
          万物互联。邻接矩阵 vs 邻接表，有向图与无向图，度数与连通性。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
          <Search size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">搜索算法</h3>
        <p className="text-slate-600 text-sm">
          走出迷宫。DFS (不撞南墙不回头) 与 BFS (层层推进) 的实战应用。
        </p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calculator className="text-indigo-500" /> GESP 七级分数构成
      </h3>
      <div className="flex gap-2 mb-4">
        {[
          { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题 概念/手算遍历" },
          { name: "判断题", score: 20, color: "bg-green-500", desc: "10题 性质辨析" },
          { name: "编程题", score: 50, color: "bg-purple-500", desc: "2题 搜索/模拟" },
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
          <strong>💡 核心考点：</strong>七级重点考察<b>抽象思维</b>。树的遍历手算必考，图的存储方式要熟练。编程题通常是一道复杂的模拟或搜索题 (DFS/BFS)，需要细心处理边界。
        </p>
      </div>
    </div>

    {/* Self Assessment */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 七级核心技能自测
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "Tree Traversal", icon: "🌲", hint: "Pre/In/Post Order" },
          { skill: "Binary Props", icon: "🌱", hint: "Nodes vs Height" },
          { skill: "Adj Matrix", icon: "▦", hint: "2D Array Graph" },
          { skill: "Adj List", icon: "📝", hint: "Vector<int> G[]" },
          { skill: "DFS", icon: "🐍", hint: "Stack / Recursion" },
          { skill: "BFS", icon: "🌊", hint: "Queue / Level Order" },
          { skill: "Connected Comp", icon: "🔗", hint: "Graph Visited" },
          { skill: "Complete Tree", icon: "🔼", hint: "Array Indexing" },
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

// 专题一：树与二叉树 (TreeModule)
const TreeModule = () => {
  // Tree Visualization State
  const [traversal, setTraversal] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simple hardcoded binary tree structure: 1 -> (2, 3), 2 -> (4, 5), 3 -> (6, 7)
  const tree = { 1: [2, 3], 2: [4, 5], 3: [6, 7], 4: [], 5: [], 6: [], 7: [] };

  const runTraversal = (type) => {
    setIsAnimating(true);
    setTraversal([]);
    setActiveNode(null);

    let order = [];
    const preOrder = (n) => { if (!n) return; order.push(n); tree[n].forEach(child => preOrder(child)); };
    const inOrder = (n) => { if (!n) return; if (tree[n][0]) inOrder(tree[n][0]); order.push(n); if (tree[n][1]) inOrder(tree[n][1]); };
    const postOrder = (n) => { if (!n) return; tree[n].forEach(child => postOrder(child)); order.push(n); };

    if (type === 'pre') preOrder(1);
    if (type === 'in') inOrder(1);
    if (type === 'post') postOrder(1);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= order.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setActiveNode(null);
        return;
      }
      setActiveNode(order[i]);
      setTraversal(prev => [...prev, order[i]]);
      i++;
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="font-bold text-green-800 mb-2">核心心法</h3>
        <p className="text-green-700">二叉树核心在于<b>递归定义</b>。前序(根左右)、中序(左根右)、后序(左右根)。满二叉树节点数 $2^k-1$。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 遍历代码模板</h4>
          <CodeBlock
            title="DFS Traversal (Recursion)"
            code={`void dfs(int u) {
    if(!u) return;
    // cout << u << " "; // 前序
    dfs(L[u]);
    // cout << u << " "; // 中序
    dfs(R[u]);
    // cout << u << " "; // 后序
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><GitBranch size={18} /> 遍历演示器</h4>
          <div className="relative h-48 border border-slate-100 rounded-lg bg-slate-50 mb-4 flex justify-center pt-4">
            {/* Manual SVG for Tree (1 root, 2-3 level 2, 4-7 level 3) */}
            <svg width="300" height="160" className="overflow-visible">
              <g stroke="#cbd5e1" strokeWidth="2">
                <line x1="150" y1="20" x2="80" y2="70" />
                <line x1="150" y1="20" x2="220" y2="70" />
                <line x1="80" y1="70" x2="45" y2="120" />
                <line x1="80" y1="70" x2="115" y2="120" />
                <line x1="220" y1="70" x2="185" y2="120" />
                <line x1="220" y1="70" x2="255" y2="120" />
              </g>
              {[
                { id: 1, x: 150, y: 20 },
                { id: 2, x: 80, y: 70 }, { id: 3, x: 220, y: 70 },
                { id: 4, x: 45, y: 120 }, { id: 5, x: 115, y: 120 }, { id: 6, x: 185, y: 120 }, { id: 7, x: 255, y: 120 }
              ].map(n => (
                <g key={n.id}>
                  <circle
                    cx={n.x} cy={n.y} r="15"
                    fill={activeNode === n.id ? "#10b981" : traversal.includes(n.id) ? "#d1fae5" : "white"}
                    stroke={activeNode === n.id ? "#059669" : "#94a3b8"} strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  <text x={n.x} y={n.y} dy="5" textAnchor="middle" fill={activeNode === n.id ? "white" : "#475569"} fontSize="12" fontWeight="bold">
                    {n.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            <Button size="sm" onClick={() => runTraversal('pre')} disabled={isAnimating} variant="outline">前序 (Pre)</Button>
            <Button size="sm" onClick={() => runTraversal('in')} disabled={isAnimating} variant="outline">中序 (In)</Button>
            <Button size="sm" onClick={() => runTraversal('post')} disabled={isAnimating} variant="outline">后序 (Post)</Button>
          </div>

          <div className="bg-slate-100 p-3 rounded text-sm text-center font-mono h-12 flex items-center justify-center text-slate-600">
            {traversal.length > 0 ? traversal.join(" -> ") : "点击按钮开始遍历"}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题二：图论基础 (GraphModule)
const GraphModule = () => {
  // Graph Matrix State
  const [edges, setEdges] = useState([]); // Array of strings "1-2"
  const nodes = [1, 2, 3, 4];

  const toggleEdge = (u, v) => {
    if (u === v) return;
    // Undirected graph logic
    const key1 = `${Math.min(u, v)}-${Math.max(u, v)}`;

    setEdges(prev => {
      if (prev.includes(key1)) return prev.filter(e => e !== key1);
      return [...prev, key1];
    });
  };

  const hasEdge = (u, v) => edges.includes(`${Math.min(u, v)}-${Math.max(u, v)}`);

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-2">核心心法</h3>
        <p className="text-purple-700">图由<b>顶点(Vertex)</b>和<b>边(Edge)</b>组成。稠密图用<b>邻接矩阵</b> (二维数组)，稀疏图用<b>邻接表</b> (vector数组)。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Grid size={18} /> 邻接矩阵 (Adjacency Matrix)</h4>
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm p-4">
            <table className="w-full text-center text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-slate-400"></th>
                  {nodes.map(n => <th key={n} className="p-2 font-bold text-slate-700">{n}</th>)}
                </tr>
              </thead>
              <tbody>
                {nodes.map(i => (
                  <tr key={i}>
                    <td className="p-2 font-bold text-slate-700 border-r border-slate-100">{i}</td>
                    {nodes.map(j => (
                      <td key={j} className="p-1">
                        <button
                          onClick={() => toggleEdge(i, j)}
                          className={`w-8 h-8 rounded hover:bg-purple-100 transition-colors ${i === j ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : hasEdge(i, j) ? 'bg-purple-600 text-white font-bold' : 'bg-slate-50 text-slate-400'}`}
                          disabled={i === j}
                        >
                          {hasEdge(i, j) ? 1 : 0}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-xs text-slate-500 text-center">
              点击格子添加/删除连边 (无向图)
            </div>
          </div>
        </div>

        <Card className="p-5 bg-white flex items-center justify-center relative min-h-[250px]">
          <h4 className="absolute top-5 left-5 font-bold text-slate-700 flex items-center gap-2"><Share2 size={18} /> 可视化视图</h4>

          <svg width="200" height="200" className="overflow-visible">
            {/* Edges */}
            {edges.map(e => {
              const [u, v] = e.split('-').map(Number);
              // Fixed positions for 1,2,3,4 in a square
              const pos = { 1: [50, 50], 2: [150, 50], 3: [150, 150], 4: [50, 150] };
              return (
                <line
                  key={e}
                  x1={pos[u][0]} y1={pos[u][1]}
                  x2={pos[v][0]} y2={pos[v][1]}
                  stroke="#9333ea" strokeWidth="3"
                />
              );
            })}
            {/* Nodes */}
            {[1, 2, 3, 4].map(id => {
              const pos = { 1: [50, 50], 2: [150, 50], 3: [150, 150], 4: [50, 150] };
              return (
                <g key={id}>
                  <circle cx={pos[id][0]} cy={pos[id][1]} r="20" fill="white" stroke="#64748b" strokeWidth="2" />
                  <text x={pos[id][0]} y={pos[id][1]} dy="5" textAnchor="middle" fontWeight="bold" fill="#334155">{id}</text>
                </g>
              )
            })}
          </svg>
        </Card>
      </div>
    </div>
  );
};

// 专题三：搜索算法 (SearchModule)
const SearchModule = () => {
  // Maze State
  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ]); // 0=path, 1=wall, 2=start, 3=end, 5=visited, 6=path-found
  const [isSearching, setIsSearching] = useState(false);

  // Initial Start/End
  // Start (0,0), End (4,4) hardcoded logic for demo simplicity

  const resetGrid = () => {
    setGrid([
      [2, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 3]
    ]);
    setIsSearching(false);
  };

  useEffect(() => { resetGrid(); }, []);

  const runBFS = async () => {
    if (isSearching) return;
    setIsSearching(true);
    let g = grid.map(row => [...row]);
    // Simple queue based BFS visualization
    let q = [[0, 0]];
    let visited = new Set(["0,0"]);
    let parent = {}; // stringify coord -> stringify coord

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let found = false;

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    while (q.length > 0) {
      let lvlSize = q.length;
      while (lvlSize--) {
        const [r, c] = q.shift();
        if (r === 4 && c === 4) { found = true; break; }

        for (let [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5 && g[nr][nc] !== 1 && !visited.has(`${nr},${nc}`)) {
            visited.add(`${nr},${nc}`);
            parent[`${nr},${nc}`] = [r, c];
            q.push([nr, nc]);
            if (g[nr][nc] !== 3) g[nr][nc] = 5; // mark visited
          }
        }
      }
      setGrid(g.map(row => [...row])); // force update
      await sleep(200);
      if (found) break;
    }

    if (found) {
      let cur = [4, 4];
      while (cur) {
        const [r, c] = cur;
        if (g[r][c] !== 2 && g[r][c] !== 3) g[r][c] = 6;
        setGrid(g.map(row => [...row]));
        await sleep(100);
        const pKey = parent[`${r},${c}`];
        if (!pKey) break;
        cur = pKey;
      }
    }
    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
        <h3 className="font-bold text-orange-800 mb-2">核心心法</h3>
        <p className="text-orange-700"><b>BFS (广度优先)</b>：像水波纹一样层层扩散，适合找<b>最短路径</b>。需要用到队列 Queue。<br /><b>DFS (深度优先)</b>：一条路走到黑，撞墙回头。适合找所有解/迷宫探险。需要用到递归/栈。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Search size={18} /> BFS 迷宫寻路 demo</h4>
          <Card className="p-4 flex flex-col items-center">
            <div className="grid grid-cols-5 gap-1 mb-4 bg-slate-900 p-2 rounded">
              {grid.map((row, r) => row.map((cell, c) => (
                <div key={`${r}-${c}`} className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300
                                    ${cell === 0 ? 'bg-slate-700' : ''}
                                    ${cell === 1 ? 'bg-slate-500' : ''}
                                    ${cell === 2 ? 'bg-green-500 text-white font-bold' : ''}
                                    ${cell === 3 ? 'bg-red-500 text-white font-bold' : ''}
                                    ${cell === 5 ? 'bg-indigo-500/50 scale-90' : ''}
                                    ${cell === 6 ? 'bg-yellow-400 scale-100 shadow-lg' : ''}
                                `}>
                  {cell === 2 && 'S'}
                  {cell === 3 && 'E'}
                </div>
              )))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={resetGrid} variant="secondary">重置</Button>
              <Button size="sm" onClick={runBFS} disabled={isSearching}>开始 BFS 搜索</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> BFS 模板</h4>
          <CodeBlock
            title="BFS Template"
            code={`queue<Node> q;
q.push(start);
vis[start.x][start.y] = 1;

while(!q.empty()) {
    Node u = q.front(); q.pop();
    if(u == target) return u.step;

    for(int i=0; i<4; i++) {
        int nx = u.x + dx[i];
        int ny = u.y + dy[i];
        if(isValid(nx, ny)) {
            vis[nx][ny] = 1;
            q.push({nx, ny, u.step+1});
        }
    }
}`}
          />
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Module: Code Trace (Placeholder for now, but enabled)
// -----------------------------------------------------------------------------
const CodeTraceModule = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Eye /> 代码跟踪模拟器</h2>
      <p className="text-slate-300">观察 DFS 递归调用栈与 BFS 队列变化。</p>
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
        title="1. 邻接表建图"
        desc="vector<int> G[N]"
        code={`int n, m;
vector<int> G[1005];

// main
cin >> n >> m;
for(int i=0; i<m; i++) {
    int u, v; 
    cin >> u >> v;
    G[u].push_back(v);
    G[v].push_back(u); // 无向图
}`}
      />
      <TemplateBlock
        title="2. DFS 遍历"
        desc="递归实现"
        code={`bool vis[1005];
void dfs(int u) {
    vis[u] = true;
    for(int v : G[u]) {
        if(!vis[v]) dfs(v);
    }
}`}
      />
      <TemplateBlock
        title="3. BFS 最短路"
        desc="队列实现"
        code={`queue<int> q;
int dist[1005];
memset(dist, -1, sizeof(dist));

q.push(start);
dist[start] = 0;

while(!q.empty()) {
    int u = q.front(); q.pop();
    if(u == end) return dist[u];

    for(int v : G[u]) {
        if(dist[v] == -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}`}
      />
      <TemplateBlock
        title="4. 二叉树节点定义"
        desc="Struct 实现"
        code={`struct Node {
    int val;
    Node *left, *right;
    Node(int v) : val(v), left(NULL), right(NULL) {}
};`}
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
      <p className="text-amber-100">GESP 七级满分避坑指南。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 时间复杂度</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>DFS/BFS</strong>: 复杂度是 O(V+E)，不是 O(V^2)，前提是用邻接表。如果是邻接矩阵则是 O(V^2)。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 空间陷阱</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>邻接矩阵</strong>: `int G[5000][5000]` 会爆内存 (25,000,000 * 4B ≈ 100MB)。超过 2000 个点必须用邻接表或者链式前向星。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 易错点</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• <strong>连通性</strong>: 题目不一定保证图是连通的。可能需要对每个未访问的点都跑一次 DFS/BFS。</li>
          <li>• <strong>Vis数组</strong>: 多组数据 (Test Cases) 时，切记 `memset(vis, 0, sizeof(vis))` 清空状态。</li>
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
      q: "一个有 n 个节点的完全二叉树，其高度约为？",
      opts: ["n", "n/2", "log2(n)", "n^2"],
      ans: 2,
      expl: "完全二叉树的高度是 log2(n)。这是二叉树查找效率高的原因。"
    },
    {
      q: "有 5 个顶点的无向完全图，共有多少条边？",
      opts: ["5", "10", "20", "25"],
      ans: 1,
      expl: "公式 n*(n-1)/2。5*4/2 = 10。"
    },
    {
      q: "BFS 寻找最短路径时，必须保证边的权值是？",
      opts: ["任意值", "正数", "负数", "全部相等(如1)"],
      ans: 3,
      expl: "普通 BFS 只能处理权值为 1 的图的最短路。带权图需要 Dijkstra。"
    },
    {
      q: "二叉树的前序遍历是根-左-右，中序是左-根-右。如果前序是 AB，中序是 BA，那么这棵树是？",
      opts: ["A是根，B是左孩子", "A是根，B是右孩子", "B是根，A是左孩子", "B是根，A是右孩子"],
      ans: 0,
      expl: "前序 A... 说明 A 是根。中序 ...A 说明 A 左边是 B，即 B 是左子树。所以 A 是根，B 是 A 的左孩子。"
    },
    {
      q: "DFS 适合解决什么问题？",
      opts: ["最短路径", "最小生成树", "迷宫寻路/穷举所有可能", "网络流"],
      ans: 2,
      expl: "DFS 本质是穷举，适合搜索所有可行解。"
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
    "树：区分度(Degree)、深度(Depth)、高度(Height)的概念。",
    "二叉树：弄清满二叉树与完全二叉树的区别 (完全二叉树最后一层左对齐)。",
    "图：如果 N=5000, 千万别开 adj[N][N]，会 MLE。用 vector<int> G[N]。",
    "搜索：BFS 必须配合 visited 数组，否则会死循环。",
    "调试：图论题画图很重要，对着图单步调试代码。",
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

export default function CourseLevel7() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'tree', label: '树与二叉树', icon: GitBranch },
    { id: 'graph', label: '图论基础', icon: Share2 },
    { id: 'search', label: '搜索算法', icon: Search },
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
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 七级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
          aria-expanded={isMobileMenuOpen}
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
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </Link>
            <h1 className="text-xl font-bold text-slate-800">GESP 七级</h1>
          </div>
          <p className="text-xs text-slate-500">图论算法 2025版</p>
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
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 7</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <CppLevelSupport level={7} />}
            {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
            {activeTab === 'tree' && <div className="animate-fade-in"><TreeModule /></div>}
            {activeTab === 'graph' && <div className="animate-fade-in"><GraphModule /></div>}
            {activeTab === 'search' && <div className="animate-fade-in"><SearchModule /></div>}
            {activeTab === 'trace' && <div className="animate-fade-in"><CodeTraceModule /></div>}
            {activeTab === 'templates' && <div className="animate-fade-in"><TemplatesModule /></div>}
            {activeTab === 'tips' && <div className="animate-fade-in"><ExamTipsModule /></div>}
            {activeTab === 'practice' && <div className="animate-fade-in"><PracticeModule /></div>}
            {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
            <CppLevelSupport level={7} placement="bottom" />
          </div>
          <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
            GESP C++ 七级备考互动课件 | 树与图论搜索
          </footer>
        </main>
      </div>
    </div>
  );
}
