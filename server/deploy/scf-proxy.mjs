// 腾讯云 SCF（上海）国内 Web 函数流式反代脚本
// 函数名称：gesp-classroom-proxy（Nodejs 24.11，监听 0.0.0.0:9000，超时 100s）
// 函数 URL：https://1257025246-1flq3qi91w.ap-shanghai.tencentscf.com
import { createServer } from 'node:http';
import { Readable } from 'node:stream';

const UPSTREAM = 'https://43.156.68.157.sslip.io';
const ALLOWED_PATHS = new Set([
  '/api/classroom/redeem',
  '/api/session',
  '/api/chat',
  '/api/logout',
]);

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/' || url.pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ ok: true }));
  }
  if (!ALLOWED_PATHS.has(url.pathname)) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ message: 'Not Found' }));
  }

  try {
    const upstreamRes = await fetch(`${UPSTREAM}${url.pathname}`, {
      method: req.method,
      headers: {
        origin: req.headers.origin || 'https://dora321.github.io',
        ...(req.headers['content-type'] ? { 'content-type': req.headers['content-type'] } : {}),
        ...(req.headers.authorization ? { authorization: req.headers.authorization } : {}),
      },
      body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : req,
      duplex: 'half',
    });

    const headers = {};
    for (const key of [
      'content-type',
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers',
      'access-control-max-age',
      'vary',
      'cache-control',
      'x-accel-buffering',
    ]) {
      const val = upstreamRes.headers.get(key);
      if (val) headers[key] = val;
    }
    res.writeHead(upstreamRes.status, headers);

    if (!upstreamRes.body) return res.end();
    Readable.fromWeb(upstreamRes.body).pipe(res);
  } catch {
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    }
    res.end(JSON.stringify({ message: '课堂网关连接超时，请稍后重试。' }));
  }
}).listen(9000, '0.0.0.0');
