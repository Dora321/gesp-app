# 题库核验任务交接文档

> 交接时间：2026-10-25　｜　交接人：WorkBuddy（小布，GLM）
> 接手人：任意 AI agent。本文档自包含，读完即可接手，无需翻旧会话。

---

## 1. 任务背景（一句话）

对 GESP C++ 题库（93 卷、2484 题）做**逐卷逐题五维核验与纠错**：题面（代码/图片/表格）、选项、答案、解析、编程题参考代码。修正真实问题，每卷留可追溯证据 JSON。**不得以清空"未核验"标签冒充完成；证据不足保持未核验；AI 核验不得标"已人工核验"。**

- 仓库：`https://github.com/Dora321/gesp-app`（本地 `d:/OneNote/OneDrive/附件/c++课件/kejian/gesp-app`）
- 分支：`codex/question-bank-verification`（基于 main，**只开 PR 不合并**）
- PR：**#22**，当前 13 commits，全部检查通过，等待人工审核合并
- 主报告：`docs/question-bank-verification/VERIFICATION-REPORT.md`（读它可快速了解全貌）

## 2. 已完成工作（三轮，全部已提交推送）

### 第一轮（2026-10-24 早）
- 84 道 `missing-code` 缺码题恢复 76 道（官方 PDF 渲染逐字转写 + g++ 编译/独立推导验证）；剩 8 道确认串卷污染保留标记
- 更正 3 道判断题答案：2025-09-l5 Q23、2025-09-l6 Q24、2025-12-l6 Q16（官方答案表 ×）
- 修复约 16 题臆造/串入选项
- 发现重大串卷污染：2026-03-l6（5+ 题）、2026-03-l8（10 题）系 2025-12 同级卷串入
- 新工具 `npm run checklist`（`scripts/generate-verification-checklist.mjs`）按运行时数据输出五维核验清单
- `verificationModel.js` 维度标签「已人工核验」→「已核验」
- 解析质量棘轮：template 374→354、short 73→72 等

### 第二轮（2026-10-24 晚）
- **2026-03-l6 / 2026-03-l8 整卷重建**：镜像 PDF git-blob SHA 校验 → 渲染逐页转写重录 15 单选+10 判断+2 编程。l6 编程题原为 2025-12-l6 串入，原卷实为「选数/完全二叉树」；官方参考程序转写后 g++ 4 样例全过
- 2026-03-l7 Q9 重录（删除混入的 Q7 代码）+ Q10 重建为图形 DFS 题（裁图 `public/question-assets/2026-03-l7/q10-dfs.png`，答案 B）
- `duplicate-papers.test.mjs`：l6/l8 两对重复卷消除，从 `KNOWN_DUPLICATE_PAIRS` 移除（**保留 l7 对**，l7 与 2025-12-l7 仍高重复）
- l6 全 25 客观题从纯元标签升级为具体知识点标签；l8 Q14/Q18 标签具体化
- `topicTaxonomy.js` 新登记：倍增/图论入组 + 二叉搜索树/DFS/BFS/线性DP/区间DP/树形DP 等别名
- 解析棘轮再收紧：template 354→331、short 72→69

### 第三轮（2026-10-24 晚～25）
- **15 卷无答案表卷（L1×6、L2×5、L3×4）逐题核对官方答案页**：
  - L2×5 + L3×4 共 9 卷答案 25/25 全对，**0 修改**
  - L1 更正 2 题（2023-06-l1 Q11 D→B 恢复官方选项、Q13 B→C 按原卷恢复）
  - 2025-12-l1 判断题官方恰为全 ×，逐题推导排除可疑误标
- **2023-03-l1 整卷重录完成**（原为占位重建题）：27 题全官方原题，答案串与官方逐题一致，placeholder 标记已消，validate:bank 0 错误

### 当前检查基线（全绿）
`validate:bank` 0 错误 ｜ `test` 99/99 ｜ `lint` / `build` / `check:prerender` / `check:bundle` / `check` 全过 ｜ `validate:programming:run` 184 题 286 样例通过 ｜ 答案文本审计 61 卷 915 答案 0 错

## 3. 环境与命令备忘（Windows + Git Bash）

| 事项 | 做法 |
|---|---|
| 官方 PDF 镜像 | `src/data/gesp/paperSources.js` 每卷有 `mirrorUrl` + `mirrorSha`（git-blob SHA）。下载后必须 `git hash-object <file>` 比对，**不一致立即停** |
| 页面渲染 | `C:/Users/0/.workbuddy/binaries/python/envs/default/Scripts/python.exe`（含 pypdfium2 + PIL）：<br>`-c "import pypdfium2 as pdfium; pdf=pdfium.PdfDocument('tmp/<f>.pdf'); [pdf[i].render(scale=2.2).to_pil().save(f'tmp/pages/<pid>/p{i+1:02d}.png') for i in range(len(pdf))]"` |
| 读图转写 | 直接用 Read 工具看 PNG；√/× 与 A/D 形近字符必须放大二次核对 |
| 答案表位置规律 | 新卷（2024-12 起）单选表在 p.1 顶部、判断表在判断题节首；旧卷多为「解析版」，答案红色【答案】逐题内嵌 |
| 判断题语义 | judge 题 `options=["正确","错误"]`，**answer 0=√、1=×** |
| 改数据后 | `node --check <file>` → `npm run generate:papers`（重生成 `_generated.js`/`_stats.js`/sitemap，**不许手改 _generated.js**） |
| 答案更正惯例 | **直接改试卷文件**的 answer 字段 + 重写解析补判定理由；覆盖层 `verifiedQuestionCorrections.js` 只用于早期已登记的条目（2026-03-l6 Q11 等已有条目勿动） |
| sourceVerified 约束 | 卷文件里标 `sourceVerified: true` 的题**必须同时有** `sourcePage` / `reviewedAt` / `reviewedBy` 三个字段，否则 validate:bank 报错 |
| 解析质量棘轮 | 改解析后若 `npm run check` 报"已改善请收紧基线"，跑 `node scripts/audit-explanation-quality.mjs --update-baseline`（只许收紧不许放松） |
| 证据 JSON | `docs/question-bank-verification/<paperId>.json`，参考 `2023-09-l4.json` 结构：reviewedBy{type:"AI",executor,mirrorSha,pages,questions[],unresolved[],executedAt} |
| 编程题验证 | g++ 直接可用；或 `npm run validate:programming:run`（耗时 ~7 分钟，建议后台跑） |
| 构建注意 | 沙箱可能拦 `dist` 万级文件清空 → 用 `npx vite build --emptyOutDir false` |
| 答案文本审计 | 需 python shim：`export PYTHONPATH="C:/Users/0/.workbuddy/binaries/python/envs/default/Lib/site-packages" && PATH="/c/Users/0/AppData/Local/Temp/gesp-shim:$PATH" node scripts/audit-answers-against-pdf.mjs`（~2.5 分钟） |

## 4. 未完成任务清单（按优先级）

### P1-a：46+ 卷判断题答案渲染核对（下一批就做这个）
有文本答案表的 ~61 卷（2023/2025 部分卷为答案内嵌除外），官方答案表中**判断题答案是图片**，文本审计不覆盖。做法：逐卷下载/复用 tmp/ 中 PDF → 渲染 → 读判断表 √/× → 与题库比对 → 不符的直接改卷文件 + 证据 JSON。**已核完的 15 卷（L1-L3 无答案表批）不要重复做**，名单见 `docs/question-bank-verification/` 下已有 JSON 的卷 + VERIFICATION-REPORT.md 第三节。建议按级别分组并行子代理（不同代理不碰同一卷），每代理 ≤6 卷。

### P1-b：2024-12-l1 整卷重录（**上次会话中断，代理未落盘，需重做**）
题库该卷客观题系占位重建题（题库 Q1"三位科学家" vs 原卷"两位"）。官方答案表：单选 p.1 顶部（`CCDBBDBCCCDCDBD`）、判断 p.5 节首（`√√×××××√××`）。做法与 2023-03-l1 相同（见 §5 流程模板）。2023-03-l1 已完成可作参照。

### P1-c：2025-09-l1 部分题重录
Q9/Q10/Q12-Q15 与判断题为改写题（答案自洽），是否重录由人工决定；证据 JSON 有原卷对照。

### P2
- **2025-06-l5 Q10**：官方答案表版本冲突（现行 CCF 版 C vs 存档版 D，推导支持 D）。**维持争议标记、排除计分，不要擅自定案**，等官方澄清。
- **2025-12-l7 与 2026-03-l7 高重复**：duplicate-papers 测试仍在 KNOWN_DUPLICATE_PAIRS 里，需逐题比对是否同样存在串卷（2026-03-l7 已修 Q9/Q10，但整体重复率仍超 0.3 阈值）。
- 2023-03-l2 六题为自编替换题（答案自洽、未擅改），可按原卷重录。
- 「解析」「参考代码」两个维度绝大多数卷仍为未核验——**未触达的不虚标**。

## 5. 整卷重录流程模板（以 2024-12-l1 为例）

1. 从 `paperSources.js` 取 mirrorUrl 下载 + `git hash-object` 校验
2. 渲染全页 PNG 到 `tmp/pages/<paperId>/`
3. Read 逐页转写：题干（代码逐字符）、四选项、答案（以官方答案表为准，放大核对）
4. 图形题用 venv python（PIL）裁图到 `public/question-assets/<paperId>/`，题干引用 `![…](/question-assets/<paperId>/xxx.png)`
5. 重写 `src/data/gesp/level1/2024-12-l1.js`：保留 paperData 元数据，questions 整体替换；每题写实质解析 + 具体知识点 tags（词表见 `topicTaxonomy.js`）+ 元标签；judge 题 answer 0=√、1=×
6. `node --check` → `npm run generate:papers` → `npm run validate:bank` → `npm test`
7. 更新证据 JSON（questions[] 逐题：官方答案/页码/是否重录），unresolved 清掉已解决项
8. git 提交（`verify(l1): …` 风格），推到 `codex/question-bank-verification`

## 6. 红线（必须遵守）

1. **不虚标**：证据不足的维度保持未核验；AI 核验不得写"已人工核验"。
2. **不臆造**：代码/选项/答案必须逐字对照原卷；题面缺失宁可留标记不猜造。
3. **镜像 SHA 校验**：每次下载 PDF 后必须校验，坏镜像不得使用。
4. **不合并 main**：只推分支、PR #22 保持 OPEN，等人工审核。
5. **不碰并行会话 WIP**：工作区可能有其他任务未提交改动（如 AIChatWidget、App.jsx、learning-data 等），**不得纳入核验提交、不得还原/覆盖它们**。提交前用 `git status` 逐文件确认。
6. 提交风格：`verify(<范围>): 中文描述`，一批一个 commit，先 add 明确的文件列表再提交。
7. 每卷证据 JSON 是验收凭据，改了什么、没改什么都要如实记录。

## 7. 快速自检命令（接手后先跑一遍确认基线）

```bash
npm run validate:bank        # 应 0 错误
npm test                     # 应 99/99（并行 WIP 可能造成少量失败，先分辨归属）
npm run checklist -- --write # 重生成核验清单
```
