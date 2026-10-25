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

## 8. 2026-10-25 补充：解析硬伤清理 + 全库 PDF 一致性体检

### 已修（已提交）

- **5 条 contradictory 解析清零**：2023-06-l2 Q4、2023-06-l3 Q4/Q5、2023-09-l3 Q9、2025-12-l3 Q7。
  这 5 条都是「选项逐项分析」段与正文逐项分析互相矛盾（同一选项既写「❌ 错误」又写「说法正确」），
  已删除重复段或按语义重写。
- **172 行套话清理**：早期脚本给非答案选项补的「该项本身符合规则，因此不是本题要选的项。」
  出现在 63 道题里，已全部删除；顺手清掉紧跟其后的「错误（说法正确）。」「该项本身正确。」
  等同义碎片。该句式已加入 `scripts/audit-explanation-quality.mjs` 的 `filler` 分类做棘轮（现为 0）。
- **12 处未定稿标记**：2024-09-l4 解析里留着「该项本身正确/错误？」的半成品问句，已按上下文改写。
- 解析质量基线：template 245 → 179，contradictory 5 → 0，filler 0。

### 新增工具

`scripts/audit-pdf-stem-diff.mjs` —— 全库「题库题面是否真的出自官方卷」体检。
把题面归一化成纯汉字/字母/数字，取 14 字特征串，看能否在官方 PDF 全文里原样命中。
结论写 `tmp/pdf-stem-diff.json`，报告见 `docs/question-bank-verification/PDF-CONSISTENCY-AUDIT.md`。

**已人工确认与官方卷不一致的卷**：2024-06-l4（Q5 起）、2024-09-l4（Q4 起）、2024-12-l4（Q3 起）。
其中 2024-09-l4 Q13 把 `std::sort` 的头文件答成 `<iostream>`（正确是 `<algorithm>`），
而这道题在官方卷中并不存在——只能整卷按官方卷重建，不能只改答案位。

**注意**：覆盖率低不必然等于题库错。2023-06-l2 的 PDF 是「真题解析」讲义而非官方试卷，
排版不同，指标天然偏低。判定前必须打开 PDF 看。

## 9. 2026-10-25 补充：三卷 L4 已整卷重建（上一节的「未做」已补一半）

### 已完成

**2024-06-l4 / 2024-09-l4 / 2024-12-l4 三卷共 75 道客观题按官方 PDF 整卷重录。**

| 卷 | 原覆盖率 | 重建后 | 说明 |
|---|---|---|---|
| 2024-06-l4 | 2/15 | 17/17 | PDF 有 9 页题面是图形，文本层几乎为空，只能整页读图 |
| 2024-09-l4 | 9/20 | 18/18 | 第 3 题起为仿写题，已按官方重录 |
| 2024-12-l4 | 10/21 | 17/19 | 第 3 题起为仿写题；2 项未命中是 Unicode 减号导致的假阴性 |

- 每题带 `sourceVerified` / `sourcePage` / `reviewedBy` / `reviewedAt` 溯源字段。
- 三卷证据 JSON 的 `answerTable` 拆成 `single`/`judge` 双表并标页码，
  `questions` 段按 25 题逐条重写，`unresolved` 清零，加 `rebuild: true`。
- 三卷编程题补「数据范围」章节（6 处，按官方原文），题面与样例原本就正确。

### 重建中发现的两处官方答案问题

1. **2024-12 L4 Q13**：官方答案表标 **B**（`j = i`），实测 B 会把数组写成
   `5 2 2 2 2 2`，A（`j = i - 1`）才得到 `1 2 3 4 5 6`。
   题库按 **A** 收录，解析首行标注官方表有误，证据里同时保留
   `answerTableValue: 'B'` 与 `official: 'A'`。
2. **2024-09 L4 Q11**：官方程序 `swap(arr, i, j)` 按冒泡语义应为 `swap(arr, j, j+1)`，
   属原卷笔误。代码照录，解析加注。

### 复现方式

```bash
# 1. 下载官方 PDF（本仓库不存 PDF）
#    https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024年6月-C++4级.pdf
# 2. 逐页渲染读图
python tmp/render-rebuild.py 2024-06-l4          # 输出到 %TEMP%/rebuild/*.jpg
# 3. 判断题答案表裁剪（√/× 是矢量图形，文本层只有表头）
#    见 tmp/l4-2024-06-data.py 中的 get_charbox 裁剪逻辑说明
# 4. 生成题库数据并组装
python tmp/l4-2024-06-data.py                    # -> tmp/l4-2024-06-rebuild.json
python tmp/assemble-paper.py src/data/gesp/level4/2024-06-l4.js tmp/l4-2024-06-rebuild.json
```

### 踩坑

- **Python 写 JS 模板字符串必须转义反斜杠**：`$1 \leq n$` 写入时若只转义反引号，
  `\l` 在 JS 模板字符串里是无效转义，会静默变成 `l`，最终显示 `$1 leq n$`。
  正确做法是 `s.replace('\\','\\\\').replace('`','\\`')`。
- **选项里含换行时必须转成 `\n`**：`js_str` 用双引号字符串，真实换行会让 JS 语法报错。
- **改动 `sourceIntegrity` / `reviewedAt` 后必须重跑 `npm run generate:papers`**，
  否则 `paper-registry-generation` 与 `verified-question-corrections` 两个测试会失败。
- 改动 2024-12-l4 的 `sourcePage`（Q15 由 p6 改 p7）时，需同步更新
  `scripts/tests/verified-question-corrections.test.mjs` 里的 `restoredOfficialQuestionCases`。

### 仍未做

- 2026-06 八卷未收录：官方 PDF 已在 `gesp-official-pdfs` 仓库（`2026年6月-C++1..8级.pdf`），
  整卷转写（每卷 15 单选 + 10 判断 + 2 编程）未开工。
- 2026-09 官方 PDF 尚未发布，暂不可收录。

---

## 10. 2026-10-25 第二轮：14 卷低覆盖率试卷逐卷定性

### 新增工具（已入库）

- `scripts/audit-judge-alignment.mjs`（`npm run audit:judge`）——把题库第 16–25 题
  （判断题）的 14 字特征串投到官方 PDF 的「判断题」区段里找命中。判断题是短陈述句、
  官方基本整句照录，所以命中率能直接说明这批判断题是不是官方题。
  归一化后不足 14 字的题（如「以下代码不能够正确执行」）取不出特征串，记入
  `noProbe` 并从分母剔除 —— 不做这一步会把 2024-06-l4 这种已核过的卷误判成 4/10。
- `scripts/dump-judge-compare.mjs` —— 逐题并排打印「题库 Q16…」与「官方判断题第 1 题…」，
  一眼看出是「同题改写」还是「换了道题」。
- 本地 `tmp/trace-question-source.py` —— 对 92 卷建 12 字滑窗索引，把每道找不到的题
  反查最长公共子串。**只能当线索**：命中另一卷 ≠ 一定错挂（时事题官方会在多级复用），
  全库不命中 ≠ 一定编造（题库可能是改写）。必须回到并排对照确认。

### 全库判断题体检结论

91 卷可判定：命中 ≥9/10 的 70 卷，4–8 的 15 卷，≤3 的 6 卷。
6 卷里 5 卷是真问题，2023-06-l2 是讲义改写造成的假阳性。

### 14 卷定性结论

- **假阴性、不必重录**：2023-06-l2（讲义，判断题号从 1 重开）、2024-12-l1
  （Q1 诺贝尔奖题官方 L1 卷确实有，PDF 里 `⽉`/`⽇` 用了兼容汉字）、2024-03-l2、
  2024-09-l5、2025-12-l5。
- **硬伤（判断题整批是无出处的通用知识点陈述）**：2026-03-l7、2025-09-l1、
  2023-12-l2、2024-03-l5、2025-06-l4。
  其中 **2026-03-l7 的 15 题逐字来自 2025-12-l7**（Q4/Q6/Q12/Q14/Q15/Q16–Q25），
  官方 2026-03 卷根本没有 01 背包题、判断题第 1 题是「4 ^ 2 结果类型为 int，值为 6」。
- **半卷错位**：2026-03-l4（单选从 Q3 起）、2023-03-l2、2024-06-l2。
- **已知限制**：2023-12-l3 的 Q4–Q8/Q11/Q21/Q22 题面自己写着「题面按公开解析还原」，
  当年无 PDF 依据，属自主标注而非新问题。

### 下一步优先级

1. ~~`2026-03-l7`~~ ✅ 16 题已重录
2. ~~`2025-09-l1`~~ ✅ 判断题 10 题已重录（Q9–Q15 单选仍未动）
3. ~~`2023-12-l2` / `2024-03-l5`~~ ✅ 各 10 道判断题已重录
4. ~~`2025-06-l4`~~ ✅ 判断题 10 题已重录
5. 剩下的单选题错位：`2026-03-l4`（半卷）、`2025-09-l1` Q9–Q15、`2023-12-l2`
   Q1/Q5/Q12/Q15、`2024-03-l2`、`2024-09-l5`、`2023-03-l2`、`2024-06-l2`
6. 2026-06 八卷收录

---

## 11. 2026-10-25 第三轮：5 卷 56 题按官方原卷重录

### 做了什么

| 卷 | 重录题号 | 答案表核对 |
|---|---|---|
| 2026-03-l7 | Q4/Q6/Q8/Q12/Q14/Q15 + Q16–Q25 | 单选 D D B B D D B A A B B C D D C；判断 √×√×√×√××√ |
| 2025-09-l1 | Q16–Q25 | ×√××√××××√ |
| 2023-12-l2 | Q16–Q25 | √×√××××√×√ |
| 2024-03-l5 | Q16–Q25 | √×√×√√××√√ |
| 2025-06-l4 | Q16–Q25 | √××√××√√×√ |

覆盖率：2026-03-l7 10/24 → 22/23、2024-03-l5 10/18 → 19/20、2023-12-l2 6/20 → 14/18、
2025-09-l1 6/15 → 14/16、2025-06-l4 11/21 → 20/21。
判断题维度全库只剩 2023-06-l2 命中 ≤3，已确认是讲义假阳性。

`duplicate-papers.test.mjs` 的 `KNOWN_DUPLICATE_PAIRS` 已清空——2026-03 系列串
2025-12 同级卷的问题（L6/L8 于 10-24 修、L7 本轮修）至此收口。

### 新增工具（本地 tmp/，未入库）

- `tmp/render-any.py`：把任意 PDF 指定页渲染成 JPEG，并打印每页文本层摘要与
  是否含「题号」，用来定位答案表在那一页。
- `tmp/crop-answer-table.py`：`get_charbox` 定位「题号」→ 6 倍放大裁剪横带，
  √/× 是矢量图形只能这样读。
- `tmp/replace-judge.py`：按 `id: 16,` 到 `...programmingQuestions`（或内联 `id: 26,`）
  整段替换判断题，自动识别缩进与编程题挂载方式。
- `tmp/replace_question.py`：**按题号替换任意单题**（单选也行）。要点是找对象左花括号
  不能用 `rfind('{')`——模板字符串里的代码块也含 `{`；要往回找最近一行「只有 `{`」
  的行。另外原对象后面的逗号要吃掉，否则会多出一个 `,,`。
- `tmp/add-judge-evidence.py`：给证据 JSON 补 `judgeRebuild` 块（答案表串、页码、
  方法、替换原因）。

### 踩坑

- **改写 `docs/question-bank-verification/*.json` 后必须重跑 `npm run generate:papers`**，
  否则 `paper-registry-generation` 会报 `regenerate metadata after evidence changes`
  （`_generated.js` 里嵌了 reviewedAt）。
- 修改题库数据后同样要重跑，否则 `_stats.js` 与生成物不同步。
- 判断题答案表每卷都在「2 判断题」标题下方，**不是**在整卷首页；用「题号」定位时要
  取判断题节内那一个，别拿到单选答案表。
