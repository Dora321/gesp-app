> 历史审计快照（2026-11-16，北京时间），2026-11-23 归档。下文“仍存在”仅指审计当时，**不代表当前 main 的未修复清单**。
>
> 后续修复已合并：[#159](https://github.com/Dora321/gesp-app/pull/159)、[#161](https://github.com/Dora321/gesp-app/pull/161)、[#162](https://github.com/Dora321/gesp-app/pull/162)、[#163](https://github.com/Dora321/gesp-app/pull/163)、[#164](https://github.com/Dora321/gesp-app/pull/164)、[#165](https://github.com/Dora321/gesp-app/pull/165)。是否仍需修改应以当前代码和复测为准，不能按本快照重复开发。
>
> 审计第 5 项（把个人 API Key 改存 sessionStorage）已被维护者明确排除，**不要实施**。以下其余建议亦不构成开发、发布或部署授权。原始评分、工期为当时意见，不是承诺。
>
> 原始材料中的本地截图/文件路径仅为历史证据索引，本次不上传截图、缓存或日志。

# gesp-app 三份审计报告合并清单（去重）

- 合并时间：2026-11-16
- 代码基线：`ae600a7b6e71c6435f030e074ab2728042b22944`（`Support image attachments in personal and classroom chat`，2026-11-15 17:14 +08:00）
- 核对方式：只读。`grep` / `sed` / `git log` / 只读 Node 脚本 / 已有截图；未修改、未提交仓库任何文件；未读取 `.env` 或任何密钥；未填写口令或 API Key；**不判定任何 GESP 真题答案或官方规则**。

## 一、说明

### 1.1 输入

| 代号 | 文件 | 观察对象 | 口径与局限 |
|---|---|---|---|
| F | `报告.md` | `ae600a7` + 线上 `https://dora321.github.io/gesp-app/`（线上 `last-modified` 2026-11-15 17:20） | 主报告。源码 + 线上产物 + 1440/1280/390 三种视口 + 32 张截图；本次合并以 F 的行号和结论为主干 |
| G | `google-agent-报告摘要.md` | Mac OneDrive 旧工作副本，**不保证是 `ae600a7`** | 全文不在本机，只有用户贴入的摘要；只能按摘要条目合并，无法核对 G 的原始行号与截图 |
| D | `dsh-报告摘要.md` | 最新 main 浅克隆，`build` 成功 | 摘要 + 其引用的行号。Lighthouse（移动首页 68 / 桌面 98）、Playwright 390/820/1440、扫描 111 个试卷文件；Lighthouse 数字本次未复跑 |

### 1.2 方法

1. **按问题去重，不按报告章节去重。** 同一根因只保留一条，来源合并计数（F/G/D 各算 1 份）；同一报告内的重复表述只算 1 份。
2. **逐条抽查关键证据。** 在 `ae600a7` 上用 `grep -n` / `sed -n` 定位文件与行号，判断：`仍存在` / `已修` / `行号偏移到 X` / `无法核实`。行号以当前 `ae600a7` 为准；F 的行号多数精确，少数偏移 1–5 行，已在条目中注明。
3. **能复现的尽量复现。** 对 `\neq`/`\ne` 用 Node 直接调用 `normalizeEscapedLineBreaks` 做了输入输出验证；对视觉类条目查看了 F 留在 `shots/` 的原始截图（390×844、1280×577、1440×900）。
4. **G 的“真题与 PDF 不一致 / 存疑真题人工复核”单独处理。** 只核对 `docs/question-bank-verification/` 的当前核验状态，引用旧 `PDF-CONSISTENCY-AUDIT.md` 的条目按“已被五维核验 / 用户裁定接管”剔除；**不判断题目答案，也不判断官方规则**。
5. **优先级口径。** P0 = 直接误导学习、核心功能不可用或明显安全风险；P1 = 高频主链路明显受损；P2 = 局部、打磨、增强。
6. **工作量口径。** S < 半天；M = 1–2 天；L > 2 天。

### 1.3 三份评分对照

| 报告 | 基线 / 时点 | 内容 | 性能 | 可用性 | 美观 | 均分 | 备注 |
|---|---|---:|---:|---:|---:|---:|---|
| F | `ae600a7` + 线上 2026-11-15 | 6 | 8 | 5 | 7 | 6.5 | 取证最完整；以线上为准，未跑 Lighthouse |
| G | Mac OneDrive 旧副本 | 7.0 | 7.5 | 6.5 | 6.5 | 6.9 | 旧副本 + 仅摘要；结论可能已被 main 修掉 |
| D | 最新 main 浅克隆，build 成功 | 7 | 6 | 6 | 7 | 6.5 | 有移动 Lighthouse 68；构建/扫描口径与 F 不同 |

**评分分歧（只用于定位，不取平均分）：**

- **性能**：F 给 8，D 给 6。F 量的是 gzip 体积与懒加载结构；D 的 6 分主要来自移动 Lighthouse 68（LCP 3.8s）与 `public/` 52MB。两者不矛盾：包体可控，但移动首屏与静态大文件仍有空间。
- **可用性**：F 给 5，G/D 给 6.5/6。F 找到 2 个做题主链路 P0（题干字号、查看解析），G/D 的摘要没有把这两条都列为 P0。
- **内容**：F 给 6，G/D 给 7。F 抓到编程题模板解析与站内题解自相矛盾；D 另外抓到 `\neq` 被当换行（F 未提）。这两条都会直接伤内容可信度。
- **美观**：F 7、G 6.5、D 7。分歧集中在 `site-surfaces.css`：F 认为蓝色/靛色映射成墨色是品牌统一，G 认为这是把语义色压死、圆角/阴影被清零的 P0；本清单把它作为“设计系统争议”单列，不并入紫色残留。

### 1.4 合并结果概览

- 去重后 **70 条**：内容 16、性能 14、可用性 28、美观 12。
- 优先级：**P0 5 条、P1 20 条、P2 45 条**。
- 来源共识：**3 份共同提到 6 条、2 份 23 条、单份 41 条**。单份条目里也有高严重度（如 D 的 `\neq`、F 的网关限速），所以“份数”只用于排序参考，不代替严重度。
- 已修复/过时剔除 7 条（第四节），未核实 17 项（第五节）。

---

## 二、合并后最值得先做的 10 条

| 序号 | 优先级 | 工作量 | 做什么 | 来源（份数） | 证据文件:行号 | 核对状态 |
|---:|---|---|---|---|---|---|
| 1 | P0 | S | 去掉 `.markdown-body` 固定的 15px 与独立字体栈；题干 18–20px（手机）/20–22px（桌面），选项 17–18px；题号与题干同一行 | F/G/D · 3 份 | `src/index.css:103-111`、`:358-362`、`:383-385`；`src/pages/exam/ExamModeView.jsx:81-84`；`src/pages/question-bank/EnhancedPaperPage.jsx:466-469` | 仍存在；截图 `04`、`09` 已复现“题号独占一行、题干 15px” |
| 2 | P0 | M | 交卷后的“查看解析”真正渲染每题解析，并加“只看错题”；现在只把选项标绿/标红 | F/G · 2 份 | `src/pages/ExamPaper.jsx:414`；`src/pages/exam/ExamModeView.jsx:91-119`；`src/pages/exam/ResultDialog.jsx:52` | 仍存在；`onViewAnalysis` 只 `setShowResult(false)`，`ExamModeView` 不渲染 `explanation` |
| 3 | P0 | S | 有站内 `explanation`/`referenceCode` 时不再追加模板化的“解题思路 / 复杂度 / 流程 / 易错点”四卡；通用提示需明确标“不针对本题” | F/G · 2 份 | `src/pages/question-bank/EnhancedPaperPage.jsx:68-103`、`:565-572`、`:598-621` | 仍存在；四卡在站内题解之后无条件渲染；截图 `13` 已复现 |
| 4 | P0 | S | 修 `\neq` / `\ne` 被当成换行：仅替换真正的 `\n`，不要吞掉 LaTeX 命令；全库 5 处 `\neq` + 10 处 `\ne` 需回归 | D · 1 份 | `src/utils/questionTextFormatting.js:45-51`；`src/components/MarkdownRenderer.jsx:31`；数据见 `level5/2025-12-l5.js:16,28`、`level3/2024-06-l3.js:641`、`luogu-coding/level5.js:186-187` 等 | 仍存在；Node 实测 `$i\neq j$` → `$i` + 换行 + `eq j$`；影响面比 D 说的“5+2”更大 |
| 5 | P0 | S | 个人 DeepSeek Key 默认只存 `sessionStorage`，提供“仅本次 / 私人电脑记住 7 天”，并保留一键清除 | G/D · 2 份 | `src/utils/classroomAssistant.js:10-15`；`src/components/AIChatWidget.jsx:24`、`:274-276`、`:652` | 仍存在；`saveAssistantKey` 只写 `localStorage`，没有“仅本次”选项 |
| 6 | P1 | S | “标注”浮钮默认不对学生显示、打开面板默认停在“浏览”、考试模式不挂载；手机上不要压住“上一步”/搜索框/题面 | F/G/D · 3 份 | `src/components/PageAnnotations.jsx:123`；`src/components/PageAnnotations.css:1-3`；`src/App.jsx:192` | 仍存在；截图 `31` 压住“上一步”、`21` 压住搜索框、`35` 压住课程卡 |
| 7 | P1 | M | 解析模式作答持久化（按卷号进 `learningData`）；重置前确认；答错题并入错题集合 | F/G/D · 3 份 | `src/pages/question-bank/EnhancedPaperPage.jsx:197-198`、`:290-302`、`:351-356`；`src/pages/question-bank/InteractiveAnalysisPage.jsx:39-40`、`:48`、`:127` | 仍存在；只有 `useState`，重置无 `confirm`，不写学习数据 |
| 8 | P1 | M | 错题本每题可展开看题干/答案/解析、可只练错题；“清除本卷记录”二次确认；修“空白交卷清空错题” | F/G/D · 3 份 | `src/utils/examHistory.js:39-50`、`:87-94`；`src/pages/question-bank/ReviewPage.jsx:94-97`、`:191-197`、`:230-241` | 仍存在；列表只截 90 字纯文本，清除无确认，错题只取最近一次 `wrongIds` |
| 9 | P1 | S | 路由层统一去掉尾斜杠，修标题、canonical、课程范围说明、浮钮规则；随后统一 sitemap/canonical 或改预渲染产物以消掉 301 | F · 1 份 | `src/seo/routeMeta.js:30-34`、`:39`、`:51`、`:54`；`src/components/RouteSeo.jsx:44`；`src/components/CourseScopeNote.jsx:15`；`src/App.jsx:78`；`src/ekart/EkartLayout.jsx:36`；`scripts/prerender-static-routes.mjs:104-106`；`public/sitemap.xml:14,19` | 仍存在；预渲染仍是 `路由/index.html`，sitemap 仍是不带斜杠地址 |
| 10 | P1 | M | （A01+A02 同轮）编程题页放宽正文到 640–720px、去掉多层套框；同时清掉解析页顶部渐变、紫色“编程已标记”与写死紫色 | F/G/D · 3 份 | `src/pages/exam/ExamModeView.jsx:51`、`:53`；`src/components/CodingProblemView.jsx:246`、`:267`、`:102`、`:118`；`src/pages/question-bank/EnhancedPaperPage.jsx:125-134`、`:336`、`:671-672`；`src/pages/exam/ResultDialog.jsx:46`；`src/index.css:162`、`:182-184`、`:272` | 仍存在；截图 `05` 正文约 408px、四层白框；截图 `09` 顶部紫色渐变 |

**候补（未进前 10，但单方严重度高）：** U11 课堂网关限速按反向代理 IP 计（F，代码推断，S–M）；C08 逐项分析覆盖约 34%（D，M–L）；U01 的根因 A04 字体栈/代码块（F）；C03 “已订正错题”假指标（F/D，S）。

**建议顺序：** 第 1、3、4、5、6、9 条都是 S，可合成一轮先发；第 2、7、8、10 条各 1–2 天。第 4 条修完要跑一次全库题面回归（至少覆盖上述 15 处），避免把真正的 `\n` 换行改坏。

---

## 三、完整去重清单

> 状态说明：`仍存在` = 当前文件/行号与问题结构都对得上；`部分存在` = 主问题在、但某一部分已改善；`无法核实` = 受“不构建/不联网/无真机/仅摘要”限制。F/G/D 后的“份数”是该问题被几份报告提到。

### 3.1 内容

| 编号 | P | 工作量 | 问题与建议 | 来源（份数） | 证据与核对 |
|---|---|---|---|---|---|
| C01 | P0 | S | `\neq` / `\ne` 被当成换行，题面出现断行或“ieqj”。建议只替换真正的 `\n`，先保护 `$...$` 与 LaTeX 命令 | D · 1 份 | `src/utils/questionTextFormatting.js:45-51`；`MarkdownRenderer.jsx:31`；Node 实测已复现。全库 5 处 `\neq` + 10 处 `\ne`（D 只列 2 处 `\ne`），其中 3 处在行内代码中受保护。**仍存在** |
| C02 | P0 | S | 编程题解析页在真实题解后追加四张模板卡，与站内题解在目标/复杂度/步骤上互相矛盾；`buildCodingGuide` 用单字“格”等正则选模板。建议有 `explanation`/`referenceCode` 时不渲染 | F/G · 2 份 | `EnhancedPaperPage.jsx:68-103`（第 70 行含单字“格”）、`:565-572`、`:598-621`；截图 `13`。**仍存在** |
| C03 | P1 | S | “已订正错题”实际是 `revealedCount - wrongCount`（看过解析且答对的题数）。建议改名“答对”并另加“答错”，或真正实现订正 | F/D · 2 份 | `EnhancedPaperPage.jsx:369-370`（标签在 369、公式在 370）；截图 `13` 显示答对 1 题时“已订正错题 1”。**仍存在** |
| C04 | P1 | S–M | “知识点”页签按题干关键词三选一，出现“循环结构……几乎每次必考”“高频题型”等无数据支撑表述；标签由正则猜出（D 举例一级 2025-12 Q1 因含“判断”被挂“条件分支”）；D 另指级别画像措辞像官方考纲 | F/D · 2 份 | `EnhancedPaperPage.jsx:36-66`、`:318`、`:725-754`（“几乎每次必考”在 729，“高频”在 731）；`2025-12-l1.js:26` 确实含“判断失误”。**仍存在**；考情是否属实本次未核实 |
| C05 | P1 | S–M | 空白交卷就能清空错题：未作答不进 `wrongIds`，错题本只看每卷最近一次交卷。建议改为“历次做错过、且之后没做对过”，未答不改变状态 | F · 1 份 | `src/utils/examHistory.js:39-50`、`:87-94`；文案 `ReviewPage.jsx:113-115`、`:147-149`。**仍存在** |
| C06 | P1 | S | 考试模式编程题写“交卷后会提示人工评阅”，站内没有人工评阅。建议改成“这里不判分，可去洛谷提交或对照参考代码” | F · 1 份 | `CodingProblemView.jsx:386-390`；`ResultDialog.jsx:49`；截图 `05`。**仍存在** |
| C07 | P1 | M | 试卷卡片把“按已登记证据分项统计……”、五个 11px 核验小标、GitHub JSON 外链放在最显眼位置，真正要点的“立即练习”反而最弱；G 建议收进默认折叠的教研抽屉 | F/G · 2 份 | `QuestionBankHome.jsx:301-306`、`:323-344`；截图 `02`、`22`。**仍存在** |
| C08 | P1 | M–L | 选项逐项分析覆盖不足。D 报 34%（L5 16%、L6 13%）；本次粗算全库“选项逐项分析”出现 1005 次 / 2916 题 ≈ 34.5%，总量与 D 一致 | D · 1 份 | `src/data/gesp/**`（100 个数据文件含该段）；`EnhancedPaperPage.jsx:648-665` 只在有 `optionAnalysis` 时渲染。**仍存在（已抽查，约 34%）**；分级比例未复算 |
| C09 | P2 | S | 搜索无结果时统一提示“该等级暂无相关真题，请稍后再试”，孩子会以为整个等级没题。建议区分“没有找到包含『xxx』的试卷”并给清空按钮 | F · 1 份 | `QuestionBankHome.jsx:366-374`（文案在 372）。**仍存在** |
| C10 | P2 | S | 结果弹窗只有“客观正确/客观错误/编程已标记/不计分题”，不显示未答；大分数只写 `0/50`，没说明是客观题部分 | F/G/D · 3 份 | `ResultDialog.jsx:39-48`；`examScoring.js:24` 已算出 `objectiveUnansweredCount` 但未传入；截图 `07`。**仍存在** |
| C11 | P2 | S | 课堂模式下学生仍可自建“系统提示词”角色并随请求发给网关。建议课堂模式隐藏自定义角色，或只允许老师预设 | F · 1 份 | `AIChatWidget.jsx:723-730`、`:734-786`；`persona` 发送在 `:426`。**仍存在** |
| C12 | P2 | S | 回到顶部按钮的无障碍名称是英文“Back to Top”。建议改中文，并同步 `home-tools.css` 里 7 处按该 aria-label 写的选择器 | F · 1 份 | `ScrollToTop.jsx:36`；`src/styles/home-tools.css:5,20,30,39,50,95,103`。**仍存在** |
| C13 | P2 | M–L | 没有 Python 真题库；G 建议明确标注“暂缺”，并给 Python 课补考纲映射。D 也确认无 Python 题库 | G/D · 2 份 | `src/data/gesp/` 只有 C++ 各级与 `luogu-coding`，未见 Python 卷；`routeMeta` 有 Python 课标题但无题库入口。**仍存在（产品缺口）** |
| C14 | P2 | S | 多级课程重名。D 举例“诊疗室”；实际 `cppLessonTitles.js` 有 4 处“第 15 课：易错题诊疗室” | D · 1 份 | `src/data/cppLessonTitles.js:40,116,135,154`。**仍存在** |
| C15 | P2 | S | 博物馆展品使用网络梗“夯 / 人上人 / 拉完了”作稀有度，小学生与家长可能看不懂 | D · 1 份 | `src/data/museum-exhibits/part1.jsx:7,53,122,191,237,260,283,306,329,421`。**仍存在** |
| C16 | P2 | L | 学习闭环增强：收藏、错题到期复习、知识点↔课时双向链接（G 的 C-8）。属于产品增强，不是缺陷 | G · 1 份 | 未见收藏/到期复习/双向链接的现有实现；错题本已有“薄弱考点”聚合（`ReviewPage.jsx:87-90,139-160`）。**仍存在（未实现）** |

### 3.2 性能

| 编号 | P | 工作量 | 问题与建议 | 来源（份数） | 证据与核对 |
|---|---|---|---|---|---|
| PF01 | P1 | S–M | 每个直达链接多一次 301：预渲染产物是 `路由/index.html`；sitemap 与 canonical 却是不带斜杠的地址。建议二选一：输出 `路由.html`，或统一成带斜杠；都要先做 U05 路径归一化 | F · 1 份 | `scripts/prerender-static-routes.mjs:104-106`；`public/sitemap.xml:14,19`；`routeMeta.js:74-78`。**仍存在**；同名文件方案未在预览环境验证 |
| PF02 | P1 | S | 题库做题链路为一个 8px 淡入静态依赖 framer-motion（F 测 gzip 41KB / D 测原始 124KB）。建议改用 `animate-fade-in` + `animationDelay` | F/D · 2 份 | `CodingProblemView.jsx:2`、`:178-184`；`vite.config.js:63`；全仓库仅 5 个文件引用，另 4 个在 `ekart/`。**仍存在** |
| PF03 | P2 | M | 试卷链路全量/串行：任一取卷都加载整份勘误覆盖层；洛谷题池 8 级一个文件；考点练习 `Promise.all` 拉整级试卷；页面等 `paperData` + `luogu` 都完成才渲染。建议按级拆题池/勘误，考点索引构建期生成 | F/G · 2 份 | `codingQuestions.js:84-87`；`ExamPaper.jsx:211`；`topics.js:26-33`；`src/data/gesp/index.js:14`。**仍存在** |
| PF04 | P2 | S | Service Worker 对带 hash 的静态资源仍每次发起网络请求，命中缓存也后台刷新。建议 `/assets/` 带 hash 的直接返回缓存 | F · 1 份 | `public/sw.js:57`、`:76`。**仍存在** |
| PF05 | P2 | S | 离线缓存按“150 条”淘汰，而构建产物有数百个、大量是 0.3KB 图标小分块。建议把 lucide 图标并块，或按字节计上限 | F · 1 份 | `public/sw.js:8`。**仍存在** |
| PF06 | P2 | S | 未激活课堂时，AI 面板仍每 15 秒轮询 `/api/session` 并持续收 401。建议只在 `classroomActive` 为真时轮询 | F · 1 份 | `AIChatWidget.jsx:213-223`；默认课堂模式在 `:28-29`。**仍存在** |
| PF07 | P2 | S | 图标与 Logo 偏大：`icon-512.png` 178KB、`icon-192.png` 31KB、`logo.jpg` 51KB（800×800）同时作 favicon，导航只显示约 36px | F/D · 2 份 | `public/` 文件尺寸；`index.html:6-7`；`Navigation.jsx:89`。**仍存在**；F 记 182KB，实测 178KB |
| PF08 | P2 | S | 已不用的代码/样式/文档仍被打包或当现状：旧导航分支、`.luogu-problem` 整套样式、`enhancedPaperRegistry`、`AnnouncementBar`、`badgeClass`、`API_KEY_STORAGE_KEY` | F · 1 份 | `Navigation.jsx:21,176-328`（`isHome` 恒真）；`index.css:389-457`；`enhancedPaperRegistry.js` 仅自引用；`AnnouncementBar.jsx` 仅检查脚本；`QuestionBankHome.jsx:10-17`；`aiChatConstants.js:61`。**仍存在** |
| PF09 | P2 | S | 全站 Tailwind 工具类合成约 270KB（gzip 36KB）阻塞样式表。建议纳入 `check:bundle` 的 CSS 预算，防继续涨 | F · 1 份 | F 测线上 `createLucideIcon-*.css`；本机未构建，**无法核实体积**（结构上仍是单个 `<link>`） |
| PF10 | P2 | S–M | `MathMarkdownContent`/KaTeX 分块较大（D 测 276KB），且 `Suspense` fallback 先渲染原文，数学定界符 `$...$` 会闪一下。建议骨架/占位，不要先露原文 | D · 1 份 | `MarkdownRenderer.jsx:38-44`；`MathMarkdownContent.jsx` 仅 513B，实际 chunk 需构建。**结构仍存在；体积无法核实** |
| PF11 | P2 | M | `public/` 约 52MB，`three` 在 `esp-labs` 与 `courseware` 多处重复。建议去重、按需加载 | D · 1 份 | `du -sh public` = 52M；`public/esp-labs/assets/three.module-*.js`、`public/courseware/*/assets/three-*.js`。**仍存在** |
| PF12 | P2 | S | 无路由预取；悬停/空闲时不预取下一个懒加载块 | D · 1 份 | `src/`、`scripts/` 未见 `prefetch`。**仍存在** |
| PF13 | P2 | S | GA/gtag 仍在 `index.html` 头部立即注入，未推迟到 `load`/`idle`；G/D 都建议延后 | G/D · 2 份 | `index.html:31-44`。**仍存在** |
| PF14 | P2 | M | 预渲染只写 SEO 壳与一段 noscript 文本；首页 hero、题库等级列表仍未进静态 HTML，弱爬虫/微信内置浏览器看到的内容有限。D/G 建议把首屏内容进预渲染 | G/D · 2 份 | `prerender-static-routes.mjs:43-61`（已注入 h1/description/课程同级列表）、`:63-80`；首页 hero/等级卡未注入。**部分已做（仍缺首页 hero/等级卡）** |

### 3.3 可用性

| 编号 | P | 工作量 | 问题与建议 | 来源（份数） | 证据与核对 |
|---|---|---|---|---|---|
| U01 | P0 | S | 题干字号被 `.markdown-body` 压成 15px，题号 24px 独占一行；选项 15px（手机 14px）；JSX 的 `text-xl md:text-2xl` 全部失效 | F/G/D · 3 份 | `index.css:103-111`、`:358-362`、`:383-385`；`ExamModeView.jsx:81-84`；`EnhancedPaperPage.jsx:466-469`；`CodingProblemView.jsx:211-214`；截图 `04`、`09`。**仍存在** |
| U02 | P0 | M | 交卷后“查看解析”只关闭弹窗并给选项上色，不显示解析文字，也没有“进入解析模式”入口 | F/G · 2 份 | `ExamPaper.jsx:414`；`ExamModeView.jsx:91-119`；截图 `08`。**仍存在** |
| U03 | P0 | S | 个人 DeepSeek Key 只写 `localStorage`，机房公用电脑换人即泄露；没有“仅本次”选项 | G/D · 2 份 | `classroomAssistant.js:10-15`；`AIChatWidget.jsx:24,274-276,652`。**仍存在**；UI 已提示“共享电脑用完请清除”，但不解决默认持久化 |
| U04 | P1 | S | 全站“标注”浮钮：手机上压住“上一步”、搜索框、题面；一点进入画笔模式并接管指针，页面无法滚动；考试模式也挂载 | F/G/D · 3 份 | `PageAnnotations.jsx:123`；`PageAnnotations.css:1-3`；`App.jsx:192`；截图 `31`、`21`、`35`。**仍存在** |
| U05 | P1 | S | GitHub Pages 尾斜杠导致直达页面走错分支：标题全变默认、canonical 带斜杠、课程范围说明取不到、浮钮/E-Kart 高亮规则失效。建议路由层统一归一化 | F · 1 份 | `routeMeta.js:30-34,39,51,54`；`RouteSeo.jsx:44`；`CourseScopeNote.jsx:15`；`App.jsx:78`；`EkartLayout.jsx:36`。**仍存在**；`/python/f1/`、`/museum/` 两条 F 也注明是代码推断 |
| U06 | P1 | S | 解析模式“返回”用 `navigate(-1)`，从链接直达时 `history.length=1`，点了没反应；页头没有别的出口；考点练习的返回还缺 `aria-label` | F · 1 份 | `EnhancedPaperPage.jsx:338`；`InteractiveAnalysisPage.jsx:120`；考试模式对照 `ExamPaper.jsx:333`。**仍存在** |
| U07 | P1 | S | 手机上滚动后 AI 入口被“回到顶部”完全盖住；两个按钮同为 `bottom-20 right-4`，后者 `z-[100]` | F · 1 份 | `AIChat.jsx:47`；`ScrollToTop.jsx:31`；截图 `35`（只剩向上箭头，聊天图标不可见）。**仍存在** |
| U08 | P1 | S | 题库不记住所选等级，回题库又回一级；手机上等级是横向滚动、每项 160px，只露出前两个且无滑动提示 | F · 1 份 | `QuestionBankHome.jsx:28`（`useState(1)`）、`:162-168`；截图 `21`。**仍存在** |
| U09 | P1 | M | 错题本每题只显示“第几题 + 90 字纯文本”，不能点开、不能看答案/解析、不能只练错题；“清除本卷记录”无二次确认；“只练错题”缺入口 | F/G/D · 3 份 | `ReviewPage.jsx:230-241`（截断在 237）、`:191-197`、`:94-97`；对照 `LearningDataManager.jsx:68` 的确认框。**仍存在**；D 的“无知识点索引”不成立，见第四节 |
| U10 | P1 | S–M | AI 答疑入口与图片提示：题库页桌面端按钮默认 `opacity:0`，悬停才出现；回形针无文字、格式/大小限制出错才说；不支持图片时回形针直接消失、粘贴无反应；空状态仍默认课堂模式 | F/G · 2 份 | `AIChatCorner.css:39-53`；`ChatComposer.jsx:41-48,76-81`；`chatImages.js:37-38,56`；`AIChatWidget.jsx:28-29,869`。**仍存在**；空状态文案已比 G 描述的具体 |
| U11 | P1 | S–M | 课堂网关限速按 `req.socket.remoteAddress` 计，Caddy 反代后全是 `127.0.0.1`；教师登录 10 次/10 分钟、学生兑换 180 次/10 分钟都被外部请求全局占满；POST 来源只校验可伪造的 `Origin` | F · 1 份 | `server/classroom.mjs:129`、`:144-150`、`:198-200`；`server/deploy/Caddyfile` `reverse_proxy 127.0.0.1:8792`。**代码/配置仍如此**；未对线上网关发测试请求 |
| U12 | P1 | M | 解析模式作答只在 `useState`，刷新清零，也不进错题本；重置无确认（EnhancedPaperPage 与 InteractiveAnalysisPage 都是） | F/G/D · 3 份 | `EnhancedPaperPage.jsx:197-198,290-302,351-356`；`InteractiveAnalysisPage.jsx:39-40,48,127`。**仍存在** |
| U13 | P1 | S–M | 移动端解析页/考点练习页顶部统计块 + 题号矩阵占掉半屏；`InteractiveAnalysisPage` 主栅格缺 `min-w-0` | G · 1 份 | `EnhancedPaperPage.jsx:359-375`；`InteractiveAnalysisPage.jsx:142`；截图 `21`（题库首页同类问题）。**仍存在（结构确认）；精确占屏比例未量** |
| U14 | P2 | S–M | 考试中返回无确认；用绝对 `endsAt`，超时后回来即强制交卷。G/D 建议暂停或询问；F 把“刷新续考、到时自动交卷”视为正确行为，属设计取舍 | G/D · 2 份 | `ExamPaper.jsx:333`（直接 `navigate('/question-bank')`）、`:168`；`ExamTimer.jsx:30-37`。**仍存在**；是否改需产品决策 |
| U15 | P2 | S | 解析模式点一下选项就立刻判分并跳到解析，不能改选；“查看答案与解析”按钮对选择题永远用不上；选项缺 `aria-pressed` | F/D · 2 份 | `EnhancedPaperPage.jsx:297-302`、`:505-524`。**仍存在** |
| U16 | P2 | S | 手机考试模式看不到“第几题 / 共几题”：标题 `sr-only`，进度只在抽屉里 | F/D · 2 份 | `ExamPaper.jsx:339`；`QuestionSidebar.jsx:30`；截图 `24`。**仍存在** |
| U17 | P2 | S | 代码块“复制”只在鼠标悬停出现，触屏看不到；也没有 `:focus-visible` 规则 | F/G · 2 份 | `index.css:287-308`。**仍存在** |
| U18 | P2 | S | 小靶面：编程题样例“复制”约 66×30、创建自定义角色约 100×16、解析页返回约 34px、模拟卷切换 `py-1.5 text-xs` | F/G · 2 份 | `CodingProblemView.jsx:78`；`AIChatWidget.jsx:724-729`；`EnhancedPaperPage.jsx:338`；`QuestionBankHome.jsx:246-251`。**仍存在** |
| U19 | P2 | S | 最后 5 分钟计时器红色 `animate-pulse`，不受“减少动态效果”控制；全仓库 91 处 pulse/bounce/ping，全局只覆盖 2 个自定义动画 | F · 1 份 | `ExamTimer.jsx:52`；`index.css:31-36`；`grep` 计数 91。**仍存在** |
| U20 | P2 | S | 几个没有出口/失败处理的状态：“课程未找到”无链接；错题本 `Promise.all` 无 `.catch`；考点练习 `loadLevelTopics` 无 `.catch`，弱网会一直停在加载页 | F · 1 份 | `LessonRouter.jsx:36-45`；`ReviewPage.jsx:64-69`；`TopicPracticePage.jsx:25-28`（F 写 25-27，现多一行 `return`）。**仍存在（行号 +1）** |
| U21 | P2 | S | 把所有 `TypeError` 都提示成“网络不通”；课堂模式依赖 `crypto.randomUUID()`，局域网 HTTP 下会抛错并显示没网 | F · 1 份 | `aiChatHelpers.js:85-94`（F 写 89-94，函数起点在 85）；`AIChatWidget.jsx:424`；`classroomClient.js:12`。**仍存在**；局域网未实机验证 |
| U22 | P2 | S | 试卷卡片主按钮“立即练习”默认浅灰底灰字，靠 `group-hover` 变深；触屏没有悬停，看起来像禁用 | F · 1 份 | `QuestionBankHome.jsx:354-360`；截图 `22`。**仍存在** |
| U23 | P2 | S | 主导航项是 `<button>` + `navigate()`，不是链接；不能新标签页打开/长按复制，违背项目自己的设计规范 | F · 1 份 | `Navigation.jsx:96-106,110-117`；`docs/site-design-language.md` 第 8 节。**仍存在** |
| U24 | P2 | S | 课堂额度用尽只禁用发送，没有“找老师/换模式/等下一节”的下一步说明 | G/D · 2 份 | `AIChatWidget.jsx:55,384,854,935`。**部分存在**；状态行仍显示剩余 0 |
| U25 | P2 | S | 聊天消息区没有 `aria-live` / `role="log"`，读屏用户听不到新回复 | D · 1 份 | `AIChatWidget.jsx` 全文无 `aria-live`，消息区也无 `role="log"`。**仍存在** |
| U26 | P2 | M | 深色模式只做了 `theme-color`，没有实际深色样式；G 也把“深色模式”列为缺口 | D/G · 2 份 | `index.html:14-15`；`src/` 未见 `prefers-color-scheme` 的页面级深色规则。**仍存在** |
| U27 | P2 | S | 题库首页首屏被四张统计卡（收录试卷/五项全核验/已有进展/无记录）占满，孩子要先滑过审计信息才能选题 | D · 1 份 | `QuestionBankHome.jsx:132-149`；截图 `21`。**仍存在**；与 C07 的试卷卡片信息不是同一处 |
| U28 | P2 | S | 冲刺课/关卡小测用 `alert()` 收尾，成绩表达式还写成 `score + 0`；孩子看到的是浏览器弹窗而不是可读的成绩页，分数也没有增量 | G · 1 份 | `src/courses/CourseLevel7.jsx:669`；`CourseLevel4.jsx:770`、`CourseLevel6.jsx:692`、`CourseLevel8.jsx:570`；`course-level1/PracticeModules.jsx:730`、`course-level3/ReviewModules.jsx:154`。**仍存在**；G 的“施工中 Tab/缺 CppLessonDirectory”两项已过时，见 X04 |

### 3.4 美观

| 编号 | P | 工作量 | 问题与建议 | 来源（份数） | 证据与核对 |
|---|---|---|---|---|---|
| A01 | P1 | M | 考试模式编程题页：主区 1152px，题卡限 768px，正文列 408px（约 27 字/行），四层白框，样例代码 13px。建议容器放宽到 `max-w-5xl`、正文 640–720px、小节改标题+分隔线、样例 14–15px | F/G · 2 份 | `ExamModeView.jsx:51,53`；`CodingProblemView.jsx:246`（450/260 栅格）、`:267`、`:102`、`:118`；截图 `05`。**仍存在** |
| A02 | P1 | S | 紫色/渐变残留：解析页顶部按等级渐变条（四级紫）、交卷确认/结果/题号面板“编程已标记”用紫、题干引用条/链接/行内代码写死紫、解析卡“核心知识点”紫标题。建议改 token 并加 lint 禁止新增 violet/purple/fuchsia | F/D · 2 份 | `EnhancedPaperPage.jsx:125-134,336,671-672`；`ResultDialog.jsx:46`；`SubmitConfirmDialog.jsx:24`；`QuestionSidebar.jsx:42`；`index.css:162,182-184,272`；`site-surfaces.css:5-49` 未覆盖 violet/purple。**仍存在** |
| A03 | P2 | S | 编程题页整体用翠绿做主色，与设计规范冲突（绿色应只表示“答对/已完成”）；题库首页“按考点练习”也是 emerald 实底 | F/D · 2 份 | `CodingProblemView.jsx:39-49,227,360,378`；`ExamModeView.jsx:38-42`；`QuestionBankHome.jsx:216`；`docs/site-design-language.md:14`。**仍存在** |
| A04 | P2 | S | 题干用另一套字体栈（`-apple-system…`）和另一套深色代码块（`#0d1117`），与站点 token 不一致；Windows 上题干与界面像两种字体 | F · 1 份 | `index.css:104-106,169-177`。**仍存在**；建议与 U01 同批处理 |
| A05 | P2 | S | 模式选择页“考试模式”图标深色压深色（`indigo-500` 被映射成墨色），解析模式却是亮绿；结果弹窗 5 列把“客观正确”折成两行。建议图标改芥黄、结果改 2–3 列并缩短文案 | F/G/D · 3 份 | `ExamPaper.jsx:272`；`site-surfaces.css:33`；`ResultDialog.jsx:42`；截图 `03`、`07`。**仍存在** |
| A06 | P2 | S | 多处小于 12px 的文字（规范要求中文最小 12px）：题库首页 11px 核验小标、错题本 11px、题号侧栏 10px；本次 `grep` 到 16 处 `text-[10px]/[11px]` | F · 1 份 | `QuestionBankHome.jsx:270,275,280,285,290,334`；`ReviewPage.jsx:208,210`；`QuestionSidebar.jsx:60-61`；`docs/site-design-language.md:104`。**16 处确认**；F 说 390px 下 76 个文字节点，未逐节点复算 |
| A07 | P2 | S | 404、错误页、“课程未找到”页没有跟随站点风格：NotFound 纯黑底 `bg-slate-950` 无 `mw-surface`；ErrorBoundary 仍是旧式转圈 | F · 1 份 | `NotFound.jsx:12`；`ErrorBoundary.jsx:52-53`；`LessonRouter.jsx:38`。**部分存在**（NotFound 文案已较完整，风格仍不同） |
| A08 | P2 | S | 1280px 宽度下右侧浮钮（奖杯/聊天）压住首页线路图卡片右边缘，紧贴“项目”站 | F · 1 份 | 截图 `40`（1280×577）：卡片右缘约 1244px，浮钮 1228–1264px。**已复现** |
| A09 | P2 | S | PWA 的 maskable 图标直接复用普通图标；`icon-192.png` 图形几乎贴边，按 maskable 安全区裁切可能缺角 | F · 1 份 | `manifest.webmanifest:24-35`；`public/icon-192.png`、`icon-512.png`。**仍存在（清单确认）；裁切无法核实** |
| A10 | P2 | S | 设计系统层：`site-surfaces.css` 把 `blue/indigo 500–700` 映射成 `--mw-line-ink`，`radius-lg/xl/2xl/3xl` 全压到 6px，`shadow-sm/md/lg/xl` 全清零。G 认为是 P0 级“语义色被压死”，F 认为是品牌统一；本清单按争议项保留 | G · 1 份 | `site-surfaces.css:5-49`。**仍存在**；这是 A05“考试模式图标深色压深色”的直接原因。建议先定设计口径，再决定改不改 |
| A11 | P2 | S | hover scale/投影与设计规范冲突：规范写“不用投影，层级靠底色和 1px 线”，代码多处 `hover:scale-105/110`、`shadow-xl` | D · 1 份 | `AIChat.jsx:48`；`ExamPaper.jsx:272`；`Navigation.jsx:320`；`docs/site-design-language.md:141`。**仍存在** |
| A12 | P2 | S | 答对/高分没有正反馈（confetti 等），G 建议加轻量庆祝；属于增强，不是缺陷 | G · 1 份 | 未见答对后的庆祝层；`ResultDialog` 只有分数与文案。**仍存在（未实现）** |

---

## 四、已修复 / 过时剔除

| 编号 | 来源 | 原结论 | 本次核对 | 处置 |
|---|---|---|---|---|
| X01 | G | “没有 Service Worker” | 不成立。`src/main.jsx:8-10` 注册 `sw.js`；`public/sw.js` 有完整 install/activate/fetch；F 也以 SW 为前提提了 P-4/P-5 | **剔除（事实错误）**；SW 的真实问题保留为 PF04/PF05 |
| X02 | G | “lucide-react 152KB 单块” | 与当前 main 不符/过时。`vite.config.js:53-66` 只给 `framer-motion`、`react*` 命名 chunk，没有 lucide 单块；F 在线上量到的是数百个约 0.3KB 的图标小分块 | **过时剔除**；“图标碎片多、SW 按条数淘汰”保留为 PF05/PF07 |
| X03 | G | “真题与 PDF 不一致 / 存疑真题人工复核”，引用旧 `PDF-CONSISTENCY-AUDIT` | 旧体检是 **2026-10-25 的卷级筛查**（92 卷、覆盖率、14 卷逐卷定性、三卷 L4 整卷重建）。当前口径已转为 **2026-11-05 起的五维核验清单**（`docs/question-bank-verification/checklist.json`）与 **2026-11-11 的 22 题用户裁定**（`user-rulings.json`、`ADJUDICATION-2026-11-11.md`、`adjudication-2026-11-11/`）。裁定记录明确 `countsAsPassed` 恒为 `false`：22 题 = 12 题改字段后计分 + 3 题 T1 加注计分 + 7 题不计分；这只说明“已按用户裁定落地”，**不等于通过五维核验**。首页统计当前为 108 卷 / 28 卷五项全核验 / 80 卷部分 / 0 卷无记录 | **过时剔除**。G 未给具体题号，无法逐条映射；五维未核验的维度作为独立的核验缺口存在，不进入本清单。**不判定答案** |
| X04 | G | `/level7` 等冲刺页“施工中 Tab、英文无响应卡片、alert()、计分 +0、缺 CppLessonDirectory” | 部分过时、部分仍在。已过时：`src/pages`、`src/components`、`src/ekart` 中无“施工中”Tab；`CppLessonDirectory.jsx` 已存在；未建成课时由 `LessonCatalog.jsx:373,506,527-534,736` 标为“建设中”，不是死入口。**仍存在**：`src/courses` 下多个关卡小测仍用 `alert()`，且成绩写成 `score + 0`（见 U28），所以 G 的“alert()/计分 +0”不能整条剔除 | **部分剔除**；施工中 Tab/缺目录剔到过时，alert/计分转入 U28；“英文无响应卡片”缺 URL，未核实 |
| X05 | G | “缺键盘切题”（与深色、44px 触控并列） | 已实现。`useQuestionKeyboardNavigation` 支持 ←/→ 翻题，输入框内不拦截；考试模式在 `ExamPaper.jsx:203-207` 启用 | **已修**；深色模式与 44px 触控仍保留为 U26/U18 |
| X06 | D | “错题本无知识点索引” | 部分不成立。错题本已有“薄弱考点”聚合：`ReviewPage.jsx:87-90` 计算 `weakTopics`，`:139-160` 渲染并按考点进入集中练习 | **剔除该子项**；“不能点开单题、不能只练错题、清除无确认”仍保留为 U09 |
| X07 | D | “120 题题号侧栏太长” | 未在题库中找到 120 题的卷：L1–L8 单卷多为 27 题（`_stats.js` 总题数 2916 / 108 卷，均值约 27）。可能是 D 看到的旧稿或把多卷合计当成单卷 | **暂列过时/无法核实**；若确有 120 题卷，需给 paperId |

---

## 五、未核实项

以下条目本次**不列入建议**，只记录限制，避免把推断当结论：

1. **G 的全文与原始行号**：本机只有摘要，无法核对 G 的截图、具体 URL 和未写进摘要的条目。
2. **G 的旧副本与 main 的差异**：X01/X02 已证明是事实错误/过时，X04 是部分过时；其余 G 条目可能同样已被 main 修掉，但无法逐条比对 G 的原始副本。
3. **U11 网关限速锁定**：只根据 `server/classroom.mjs` 与 Caddyfile 推断，未向线上网关发任何测试请求；真实反代头与限速键需部署环境确认。
4. **U21 局域网 HTTP 下的 `crypto.randomUUID`**：未在 `http://192.168.x.x` 实机验证。
5. **PF01 同名文件预渲染方案**：GitHub Pages 对“同名文件 + 同名目录”的优先级未在预览环境验证。
6. **PF09 阻塞 CSS 体积**：未安装依赖、未构建，270KB/gzip 36KB 来自 F 的线上测量，本机无法复核。
7. **PF10 MathMarkdown 分块体积**：D 的 276KB 未复测；只确认了 `Suspense` fallback 会先渲染原文。
8. **PF14 预渲染正文覆盖度**：未构建，无法看最终 HTML；只确认脚本会注入 h1/description/课程同级列表，首页 hero/等级卡未注入。
9. **A09 maskable 图标裁切**：未在真机“添加到桌面”验证。
10. **AI 遮罩颜色（D 的 `bg-slate-900/45` 被重映射成不透明米色）**：按 token 推断 `slate-900 → --mw-night #23283d`，仍是深色半透明，不是米色；需要浏览器 `getComputedStyle` 才能定论，故不列入 A 节。
11. **对比度（D 的 FAB 2.15:1、灯泡 2.28:1）**：未用对比度工具复算，不列入清单。
12. **真实触屏/横屏**：所有视觉核对都基于 F 的桌面浏览器窄视口截图，未在真机验证 hover/pointer 媒体查询、横屏与触控手感。
13. **课堂激活后的界面、教师后台、图片附件真实交互**：没有口令/密钥，未实机操作；只读代码。
14. **门禁与构建**：受“不安装依赖、不构建、不启动服务”约束，`npm run lint`、`npm test`、`check:a11y`、Lighthouse 未复跑；D 的移动 68 / 桌面 98 未复现。
15. **逐项分析分级比例（L5 16%、L6 13%）**：只复算了全库约 34%，分级未逐级统计。
16. **任何题目的答案、解析是否正确，以及“必考/高频”等考情说法是否属实**：本次一律不判定；C04 只指出“无数据支撑”和“正则推断”，不判断说法真假。
17. **C13 Python 课与考纲映射质量**：只确认“没有 Python 真题库”，未逐课审读 Python 课程内容。
