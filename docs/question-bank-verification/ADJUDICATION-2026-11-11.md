# 2026-11-11 用户裁定：一、二级 22 道争议题落地说明

依据（用户人工核对后返回，权威）：
- `adjudication-2026-11-11/GESP一二级裁定_终稿.md`：22 题逐题裁定、修改稿、字段级落实清单
- `adjudication-2026-11-11/原卷缺陷题处置规范.md`：四类缺陷 T1–T4、10 张处置卡、字段设计、三种场景展示策略、解析四段模板
- `adjudication-2026-11-11/verify.cpp`、`q22.cpp`：实测程序
- 机器可读记录：`user-rulings.json`（version 2，`status: user-adjudicated`，裁定日期 2026-11-11 台北时间）

## 最终口径

**22 题 = 12 题按原卷改字段后计分 + 3 题 T1 加注计分 + 7 题不计分。**

**用户 2026-11-11 额外改口（以此为准，覆盖终稿原文）**：第 7 题（2026-03-l1 #15）和第 15 题（2025-03-l2 #10）**题面一个字都不改**，只在解析里加「原卷提示」，照常计分。终稿里「改题干 / 在题干或解析里注明」的说法作废。

缺陷是否使考生无法按命题意图作答？不能答的才不计分，能答的必须计分。

## 字段拆分

| 字段 | 取值 | 含义 |
|---|---|---|
| `sourceIntegrity` | `ok` / `official-source-defect`（以及历史值） | 是否忠实原卷、有没有已知缺陷 |
| `defectKind` | `out-of-scope` / `multi-answer` / `ub` / `non-compilable` / `self-contradictory` | 缺陷类型 |
| `examScoring` | `counted` / `excluded` | 是否参与得分统计 |

- 判定入口：`src/utils/sourceIntegrity.js`（`isScoringExcluded`、`hasSourceDefect`、`isHiddenFromMockExam`、`integrityNoticeTiming`）。
- **兼容旧标记**：没有 `examScoring` 的题沿用历史语义（带 `sourceIntegrity` ⇒ 不计分、模考里展示但不判分、始终在题目上方提示）。
- 计分、交卷成绩、错题本、考点练习默认池都看 `isScoringExcluded`。
- 数据校验（`npm run validate:bank`）：`out-of-scope` 必须配 `counted`；`multi-answer / ub / non-compilable / self-contradictory` 必须配 `excluded`；有 `defectKind` / `excluded` 必须有 `sourceIntegrity` 缺陷标记和 `integrityNote`。
- `sourceIntegrity` 与 `examScoring` 解耦：T1 三题「忠实原卷、有瑕疵、但该计分」，一个标记装不下，正是拆字段的原因。

## 三种场景的展示

| 场景 | T1（计分） | T2 多解（不计分） | T3/T4（不计分） |
|---|---|---|---|
| 日常练习（解析模式 / 考点练习） | 正常出题、判对错，查看答案后说明原卷瑕疵 | 判对错，查看答案后提示「原卷多解」 | 查看答案后先提示缺陷 |
| 模拟考试（考试模式） | 正常计入总分 | 移出卷面 | 移出卷面 |
| 原卷缺陷专题 | **未做**，见下 | **未做** | **未做** |

旧标记题（历史 `answer-key-conflict` 等）在三个场景的行为不变。

## 模考「换题补位」方案（本次未实现，只记录）

一张卷对应一次真实考试，卷内没有备用题池，自动补位会让「真题率」悄悄失真。本次先做到「排除出卷面，并在考试模式入口说明 N 题未编入」。要补位时建议：

1. 由人工在 `docs/question-bank-verification/adjudication-2026-11-11/` 下登记补位表 `paperId:题号 → 来源 paperId:题号`；
2. 补位题必须同级别、同题型、同分值、同考点标签，且 `sourceIntegrity` 无标记、`examScoring` 为 counted；
3. 组卷时替换并在卷面标注「补位题（来自 YYYY·MM）」，不改原题文字；
4. 不自动挑题：补位题的选择需用户确认。

## 22 题清单

| # | 试卷 | 题号 | 处置 | `examScoring` | `defectKind` |
|---|---|---|---|---|---|
| 1 | 2023-03-l1 | 27 | 按原卷改（删去站内擅加的数据范围） | counted | — |
| 2 | 2023-06-l1 | 8 | 按原卷整体恢复（题干、选项、解析） | counted | — |
| 3 | 2023-09-l1 | 12 | 按原卷恢复选项 C=6、D=7，解析重写 | counted | — |
| 4 | 2023-09-l1 | 13 | 按原卷恢复选项，解析调整 | counted | — |
| 5 | 2025-12-l1 | 7 | 补回 `printf(…, N+M, int(N+M))` | counted | — |
| 6 | 2026-03-l1 | 7 | T2 多解；解析重写（删「-10 和 -10」反例） | **excluded** | multi-answer |
| 7 | 2026-03-l1 | 15 | 题面不动；解析加「原卷提示」（奇数位从个位起算） | counted | — |
| 8 | 2023-09-l2 | 14 | 按原卷补回 `lineCount` 声明/读入、去掉「数字金字塔」；解析改 2i+1 与 9 行示例 | counted | — |
| 9 | 2023-12-l2 | 12 | 代码补行号 1–10（第 5 行恢复 `""`） | counted | — |
| 10 | 2024-03-l2 | 26 | 题干、数据范围、特别提醒、原卷参考程序、解析 | counted | — |
| 11 | 2024-06-l2 | 24 | 补全原卷 7 行代码 | counted | — |
| 12 | 2024-09-l2 | 13 | T2 多解 | **excluded** | multi-answer |
| 13 | 2024-09-l2 | 14 | T1 考点外瑕疵，加注 | counted | out-of-scope |
| 14 | 2024-12-l2 | 11 | T2 多解；解析删「笔误遗漏 f」 | **excluded** | multi-answer |
| 15 | 2025-03-l2 | 10 | 题面不动；解析加「原卷提示」（`i<N` 不含 N） | counted | — |
| 16 | 2025-03-l2 | 27 | T4 题面矛盾（不暗改「正整数」） | **excluded** | self-contradictory |
| 17 | 2025-06-l2 | 5 | T3 未定义行为 | **excluded** | ub |
| 18 | 2025-06-l2 | 15 | T1 考点外瑕疵，加注 | counted | out-of-scope |
| 19 | 2025-09-l2 | 6 | T4 公式边界 | **excluded** | self-contradictory |
| 20 | 2025-09-l2 | 15 | T1 考点外瑕疵，加注 | counted | out-of-scope |
| 21 | 2025-09-l2 | 19 | T3 代码无法编译 | **excluded** | non-compilable |
| 22 | 2026-06-l2 | 11 | 题面不动；解析改正 B/C/D 失效机理 | counted | — |

所有题的 `answer` 字段均未改动（终稿确认 22 题答案与原卷答案表一致）。逐题前后对照见 PR 描述与 `adjudication-2026-11-11/` 下的证据文件。

## 与五维队列的关系

- `user-rulings.json` 覆盖了这 22 题在五维证据（`docs/question-bank-verification/<paperId>.json` 的 `unresolved`）里的全部未决维度，因此一级 5 套、二级 10 套的未决项都由用户裁定关闭，一、二级可收束、放行三级；`scripts/tests/source-integrity.test.mjs` 对此做了验证。
- 用户裁定**永远不等于通过**：`countsAsPassed` 恒为 `false`，状态仍记为 `reviewed-with-open-issues`，不改写任何卷的通过状态。
- `scripts/lib/level-barrier.mjs` 的 `loadUserRulings` 现在接受 `status` 为 `original-paper-dispute`（2026-11-09 起）或 `user-adjudicated`（2026-11-11 起）。
- 本 PR 不启动队列。队列工作树合并本 PR 后才会读到新的裁定文件。
