# 课堂 AI 使用记录一期：已交付决策与部署交接

本文同步本地设计与 2026-11-17 部署结果，以实际代码与以下已确认决策为准；不是新功能计划。记录时间均为北京时间。

## 已完成与已决定

- PR [#166](https://github.com/Dora321/gesp-app/pull/166) 已合并；合并提交 `279be0415084f51dc63e5822c491242e29b7a925`。Pages 运行 [43900997522](https://github.com/Dora321/gesp-app/actions/runs/43900997522) 成功。
- 仅记录课堂模式；个人模式直连模型，不进入网关记录。前端仅新增 `anonId` 请求字段，不带页面路径、试卷号、题号或题库标签。
- 记录默认开启；提问最多 4000 字、完整回答最多 8000 字，保留期默认 365 天，每日清理过期记录。
- 浏览器 localStorage 的 UUID 经服务端 HMAC 得到稳定假名，用于跨课堂观察同一浏览器。展示为「同学-XXXX」；公共设备会串号，清数据/换浏览器会换号，短展示码也可能碰撞，不应据此点名或排名。
- **不加学生端记录提示**（已决定，不能当作漏做）。
- **课上换口令仍算同一堂课**，不新建场次（已决定）。
- **只保留手机号、身份证号、邮箱、QQ、微信脱敏规则**；「我叫…」「我的名字是…」「学号…」「我是/我在…班」等自述短语不再遮挡（已决定）。不设置专门身份字段、不主动采集身份，不代表自由文本中绝不会出现姓名、学号或其他个人信息；关键词脱敏也不能保证覆盖所有隐私。
- 独立 `usage.sqlite`，提问/回答先脱敏后 AES-256-GCM 加密；分类、时间、知识点、假名等结构化字段明文供聚合。HMAC 密钥由 `secrets.json` 首次自动生成，和原文加密主密钥一起妥善保管。
- 只记录本轮末条用户提问，不存图片、IP、Cookie/Bearer、API Key、自定义人设原文。带图只存标志。按提问关键词进行 `rules-v1` 类型/知识点分类，无额外模型调用。
- `/classroom-usage` 与 `/api/admin/usage/*` 复用教师 Cookie；接口校验来源、不向学生来源开放 CORS，原文需主动点开，提供投屏隐藏功能。
- usage 初始化、写入或锁库错误不能打断学生 SSE 回答。

## 交付边界

一期具备汇总、明细、按假名时间线，以及当前代码提供的趋势表、投屏模式、过期清理。CSV 导出、题目上下文、离线模型复标和教师备课本尚未实现。规则分类只是辅助信号，不是学生能力评定。

内置人设通过 systemPrompt 精确比对归类，旧前端文案变化可能记录为 `custom`；进程异常退出可留下一条 `pending`。这些是已知局限，不以此宣称功能不存在风险。

## 2026-11-17 网关部署验收（历史记录，非实时健康承诺）

在维护者明确批准后，通过已配置 SSH 的 Windows 电脑部署。没有改变 Caddy、端口或 systemd 单元。

- 部署版本：`279be041`。
- 先停止服务，备份程序目录与数据目录，再更新文件、启动单实例。
- 服务于 **10:53:44 北京时间**启动，验收时 `active`、`NRestarts=0`、单进程。
- 运行时使用 `/opt/gesp-runtime/node-v24.11.1-linux-x64/bin/node`，支持 `node:sqlite`；系统默认 Node 18 不用于服务。
- 本机与 HTTPS 的 `/classroom-admin`、`/classroom-admin.js`、`/classroom-usage`、`/classroom-usage.js` 均返回 200；无登录 `/api/session` 和 `/api/admin/usage/status` 返回预期 401。
- 创建了 `usage.sqlite` 与 `usageHmacKey`；数据库权限 0600，目录 0700。没有读取或输出密钥值。
- 没有代替老师发送真实课堂问题；教师登录后的记录/原文端到端验证仍需老师实际提问确认。
- 服务端备份：`/root/gesp-classroom-backups/20261117-105343/opt-gesp-classroom.tgz` 与 `var-lib-gesp-classroom.tgz`。备份含敏感数据，仅留服务器，不纳入 Git。

## 网关更新文件清单

与 `/opt/gesp-classroom/` 保持相对路径（10 个文件）：

```text
server/classroom.mjs
server/usage/store.mjs
server/usage/redact.mjs
server/usage/classify.mjs
server/usage.html
server/usage.js
server/admin.html
src/utils/aiChatConstants.js
src/utils/classroomAssistant.js
src/utils/chatImages.js
```

部署和环境变量详见根目录 [DEPLOYMENT.md](../../DEPLOYMENT.md)。更新前备份 `/var/lib/gesp-classroom/`（含 `secrets.json`、SQLite/WAL 文件，停服备份或使用 SQLite 一致性备份）及 `/opt/gesp-classroom/`；确保单实例。启动失败恢复对应程序和一致数据备份后再启动，不要运行两个网关。

`CLASSROOM_USAGE_LOG=0` 会停用 usage store，不写新记录且查询返回停用/空数据；不会删除已有数据库。回滚整个版本应恢复备份。新 `anonId` 依赖学生站 Pages 发布，旧学生站回退到会话假名。

## 初始验收证据

合并前 lint 与单测 250/250 通过；此前 check、build、网关专测均通过。2026-11-23 此次只归档文档和独立已验收工具修复，不重新部署、不重启队列，也不重新裁定四级争议题。
