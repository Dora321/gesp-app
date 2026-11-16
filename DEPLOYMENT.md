# 快速部署指南

## 🚀 发布到GitHub并部署到网页

### 步骤1：创建GitHub仓库

1. 访问 https://github.com/new
2. 仓库名：`gesp-app`
3. 选择 **Public**（公开）
4. **不要**勾选任何初始化选项
5. 点击 **Create repository**

### 步骤2：推送代码到GitHub

在项目目录打开PowerShell，执行：

```powershell
# 初始化Git（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 连接GitHub仓库（替换YOUR-USERNAME）
git remote add origin https://github.com/YOUR-USERNAME/gesp-app.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择：**GitHub Actions**
4. 保存

### 步骤4：等待部署完成

- 在仓库的 **Actions** 标签页查看部署进度
- 部署完成后，访问：`https://YOUR-USERNAME.github.io/gesp-app/`

---

## 🔄 后续更新

每次修改代码后：

```powershell
git add .
git commit -m "更新说明"
git push
```

GitHub Actions会自动重新部署网站。

---

## 📝 注意事项

1. 如果仓库名不是 `gesp-app`，需要修改 `vite.config.js` 中的 `base` 配置
2. 首次部署可能需要等待5-10分钟
3. 确保仓库是 Public（公开）才能使用免费的GitHub Pages

---

## 🎯 其他部署选项（更简单）

### Vercel（推荐）
1. 访问 https://vercel.com
2. 使用GitHub登录
3. 导入仓库 → 自动部署
4. 每次推送自动更新

### Netlify
1. 访问 https://netlify.com
2. 使用GitHub登录
3. 导入仓库 → 自动部署

---

## 课堂服务反向代理

课堂服务默认只信任回环地址上的代理，并取 `X-Forwarded-For` 最右侧一跳作为客户端 IP。若反向代理不在本机，请用 `CLASSROOM_TRUSTED_PROXIES`（逗号分隔的精确 IP；`none` 表示不信任任何代理）配置，然后重启 `gesp-classroom`。

## 上线后验证直达链接不再 301

构建脚本会为每个非根路由额外生成一份 `dist/<route>.html`，内容与 `dist/<route>/index.html` 一致。GitHub Pages 的 `.html` 规则优先于目录重定向，因此站内链接、分享链接和收藏里不带斜杠的地址应直接返回 200（canonical 与 sitemap 仍使用带斜杠地址）。部署后执行：

```bash
curl -sI https://dora321.github.io/gesp-app/question-bank | head -1   # 期望 HTTP/2 200
curl -sI https://dora321.github.io/gesp-app/question-bank/ | head -1  # 期望 HTTP/2 200
curl -sI https://dora321.github.io/gesp-app/question-bank/2/2026-03-l2 | head -1
curl -sI https://dora321.github.io/gesp-app/hardware/esp32/16.5 | head -1
```

若不带斜杠的地址仍返回 301，说明 GitHub Pages 的实际行为与预期不符；可直接回退此改动（回退后只是少了多出来的 `.html` 文件，对现有页面没有副作用）。

## 课堂 AI 使用记录

课堂网关会在 `/api/chat` 受理课堂模式提问后异步写入使用记录，供教师在 `/classroom-usage` 查看。记录失败只写服务端日志，不打断学生已经收到的回答。

- **记录范围**：仅课堂模式经网关受理的提问。个人模式在浏览器直连 DeepSeek，不经过网关，始终不记录。
- **记录内容**：服务端时间、课堂场次、浏览器匿名代号（HMAC 后显示为「同学-XXXX」）、提问类型与关键词知识点、脱敏并加密后的提问（最多 4000 字）和完整回答（最多 8000 字）、是否带图、内置人设 id、思考强度、服务商/模型、token、耗时、状态和错误类别。
- **不记录**：姓名、学号、IP、Cookie 或 Bearer 原文、API Key、图片、题面全文、页面标题/路径、试卷号/题号，以及自定义人设原文。
- **存储位置**：`/var/lib/gesp-classroom/usage.sqlite`（与 `classroom.sqlite` 分开）。目录权限 `0700`，服务 `UMask=0077`。默认保留 365 天，每天自动清理过期记录。
- **密钥**：`/var/lib/gesp-classroom/secrets.json` 会新增 `usageHmacKey`，首次启动自动生成（文件权限 `0600`），用于匿名代号 HMAC。勿外泄；备份必须包含 `secrets.json`。丢失 `encryptionKey` 后历史原文无法解密；丢失 `usageHmacKey` 后匿名代号会重新映射。

环境变量均可不设，默认即开启记录、保存全文、保留 1 年：

| 变量 | 默认 | 含义 |
|---|---|---|
| `CLASSROOM_USAGE_LOG` | `1` | 设为 `0` 关闭记录（不影响学生提问） |
| `CLASSROOM_USAGE_RETENTION_DAYS` | `365` | 记录保留天数，到期自动删除 |
| `CLASSROOM_USAGE_STORE_RESPONSE` | `full` | 回答保存方式；`summary` / `none` 仅作应急，默认不要改 |
| `CLASSROOM_USAGE_RESPONSE_MAX_CHARS` | `8000` | 回答保存前截断的最大字符数 |
| `CLASSROOM_USAGE_PROMPT_MAX_CHARS` | `4000` | 提问保存前截断的最大字符数，与前端单条消息上限一致 |

部署步骤（实现合并后由你本人在网关上操作）：

1. 先备份整个 `/var/lib/gesp-classroom/`，确保包含 `secrets.json`、`classroom.sqlite` 和 `usage.sqlite`（首次部署时还没有后者）。
2. 更新 `/opt/gesp-classroom` 下的 `server/classroom.mjs`、`server/usage/`（`store.mjs`、`redact.mjs`、`classify.mjs`）、`server/usage.html`、`server/usage.js`、`server/admin.html`，以及服务端依赖的 `src/utils/aiChatConstants.js`、`src/utils/classroomAssistant.js`、`src/utils/chatImages.js`。Caddy、端口 `8792` 和 systemd 单元通常不必改。
3. `systemctl restart gesp-classroom`，只保留一个实例。首次启动会自动创建 `usage.sqlite` 并写入 `usageHmacKey`。
4. 打开 `https://43.156.68.157.sslip.io/classroom-admin` 登录，进入「使用分析」，用课堂模式提一条测试问题，确认出现匿名记录、可点开原文，且没有姓名、学号、路径或题号。
5. 回滚：在 `gesp-classroom.service` 设置 `CLASSROOM_USAGE_LOG=0` 后 `daemon-reload` 并重启，或还原本次更新的文件。`usage.sqlite` 可保留不删。

`anonId` 需要 GitHub Pages 发布后的学生站才会随 `/api/chat` 发送；网关可以先上线，此时会按学生会话哈希回退为匿名代号，分析仍可用，只是同一浏览器的多堂课暂时无法串起来。
