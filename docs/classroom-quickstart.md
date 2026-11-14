# 课堂 AI：最简试用版

在侧边栏点齿轮进入设置。**个人模式**使用保存在当前浏览器的 API Key，直连 DeepSeek。**课堂模式**输入老师口令，使用教师托管额度。首次发现旧个人密钥时默认恢复个人模式，之后记住所选模式。点「返回对话」可以继续之前的聊天。两种模式均不附带当前页面标题或链接，共享电脑可在个人模式中清除密钥。

## 线上部署：保留 GitHub Pages 地址

学生入口继续使用 `https://dora321.github.io/gesp-app/`，构建时通过 `VITE_CLASSROOM_API_URL` 指向 HTTPS 网关。教师后台单独访问网关的 `/classroom-admin`。

跨站模式不依赖第三方 Cookie：口令兑换短期随机会话凭证，只存当前标签页的 sessionStorage（被禁用时仅保留内存），刷新可恢复；它不是上游 API key。教师后台仍使用 HttpOnly Cookie。服务端仅为 `CLASSROOM_STUDENT_ORIGIN` 配置的来源开放学生接口 CORS，教师管理接口不对跨站开放。会话可被设备持有人读取，但仍受全班额度、期限及撤销控制。

生产配置见 `server/deploy/`：Node 24 独立运行时，systemd 单实例，SQLite 数据保存在 `/var/lib/gesp-classroom`，Caddy 提供 HTTPS。需要云安全组放行入站 TCP 443。现有 80/8787/8790 服务不改动。

## 本机试用

需要 Node.js 22.13+（推荐 24 LTS）。项目已安装依赖时：

```powershell
npm run dev:classroom
```

打开终端显示的 Vite 地址，教师设置页在同一地址的 `/classroom-admin`，默认是 `http://localhost:5173/classroom-admin`。

首次运行自动生成教师密码，在本机 PowerShell 查看：

```powershell
(Get-Content .classroom/secrets.json | ConvertFrom-Json).adminPassword
```

教师登录 → 保存真实 API key → 设置时长、全班提问上限 → 开启课堂 → 把六位口令告诉学生。学生在侧边栏的「输入课堂口令」激活。

教师密码与 API key 不同，不要把教师密码告诉学生。不要把真实密钥发到聊天中。后台保存密钥后不回显；本项目不会自动测试付费调用，请用学生入口提问确认密钥有效。

## 使用规则

- 全班共享提问上限，默认 500 次、120 分钟。刷新不扣次。
- 每次有效问题受理即扣 1 次，含生成失败和中断，不自动退款或重发。后台会明确展示此规则。
- 换口令：所有旧授权失效，剩余次数保持不变。
- 结束课堂：停止新请求并取消正在生成的回答。
- 退出后台不会结束课堂；学生退出只注销自己的授权。
- 到期停止使用；学生面板每 15 秒刷新状态，实际请求即时校验。
- 新开一堂课才重置额度；开启中的课堂不能重复点开启。
- 密钥加密保存在 `.classroom/classroom.sqlite`，加密主密钥和教师密码位于 `.classroom/secrets.json`。该目录已忽略提交；应限制操作系统访问权限，备份时整体加密。能读取整个服务器目录的人仍可解密，这是本机托管的边界。

## 正式运行

```powershell
npm run build
npm run start:classroom
```

服务默认仅监听 `127.0.0.1:8787`，同时提供构建后的学生页面 `/gesp-app/`、教师页 `/classroom-admin` 和 `/api/*`。

正式使用需同源 HTTPS 反向代理到此服务，并设置 `NODE_ENV=production` 和 `CLASSROOM_ORIGIN=https://你的课堂域名`。反向代理保留 Host、关闭 SSE 缓冲，并将超时设为至少 100 秒。不要在 GitHub Pages 单独发布前端后期待口令接口可用。

可选环境变量：`CLASSROOM_PORT`、`CLASSROOM_HOST`、`CLASSROOM_ADMIN_PASSWORD`、`CLASSROOM_MODEL`（默认沿用项目 `deepseek-flash`，以账号实际支持型号为准）。开发代理固定指向 8787，改端口时需同步修改 Vite 配置。

当前采用单实例 Node 服务与本地 SQLite，保留单实例部署；不要多个进程共享运行，否则正在生成的回答不能跨进程即时取消。限速不信任客户端 X-Forwarded-For；代理场景 IP 限速是全班共用的宽松阈值。

## 已覆盖的自动验证

```powershell
node --test scripts/tests/classroom-gateway.test.mjs
```

模拟上游验证 Cookie 会话、密钥不下发、并发配额、重复请求、换口令、结束、到期、限速、来源校验、错误脱敏和重启恢复。测试不消耗真实 AI 额度。
