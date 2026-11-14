import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomInt, createHash, createCipheriv, createDecipheriv, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
import { buildClassroomPrompt } from '../src/utils/classroomAssistant.js';

const hash = value => createHash('sha256').update(value).digest('hex');
const equal = (a, b) => typeof a === 'string' && typeof b === 'string' && timingSafeEqual(Buffer.from(hash(a)), Buffer.from(hash(b)));
const token = () => randomBytes(32).toString('base64url');
const error = (status, message) => Object.assign(new Error(message), { status });

export function createClassroomServer({ directory = process.env.CLASSROOM_DATA_DIR || resolve('.classroom'), adminPassword, fetchAI = fetch, now = Date.now, secure = process.env.NODE_ENV === 'production', studentOrigin = process.env.CLASSROOM_STUDENT_ORIGIN || '' } = {}) {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const secretFile = resolve(directory, 'secrets.json');
  if (!existsSync(secretFile)) writeFileSync(secretFile, JSON.stringify({ encryptionKey: randomBytes(32).toString('hex'), adminPassword: token() }), { mode: 0o600 });
  const secrets = JSON.parse(readFileSync(secretFile, 'utf8'));
  const password = adminPassword || process.env.CLASSROOM_ADMIN_PASSWORD || secrets.adminPassword;
  const encrypt = value => {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(secrets.encryptionKey, 'hex'), iv);
    return [iv.toString('hex'), Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]).toString('hex'), cipher.getAuthTag().toString('hex')].join('.');
  };
  const decrypt = value => {
    const [iv, body, tag] = value.split('.');
    const cipher = createDecipheriv('aes-256-gcm', Buffer.from(secrets.encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
    cipher.setAuthTag(Buffer.from(tag, 'hex'));
    return Buffer.concat([cipher.update(Buffer.from(body, 'hex')), cipher.final()]).toString('utf8');
  };
  const db = new DatabaseSync(resolve(directory, 'classroom.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS classroom (id INTEGER PRIMARY KEY CHECK(id=1), api_key TEXT, code TEXT, generation INTEGER DEFAULT 0, active INTEGER DEFAULT 0, expires INTEGER DEFAULT 0, max_questions INTEGER DEFAULT 500, used INTEGER DEFAULT 0);
    INSERT OR IGNORE INTO classroom(id) VALUES(1);
    CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, kind TEXT, generation INTEGER, expires INTEGER);
    CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, created INTEGER);
    CREATE TABLE IF NOT EXISTS limits (id TEXT PRIMARY KEY, count INTEGER, expires INTEGER);`);
  const state = () => db.prepare('SELECT * FROM classroom WHERE id=1').get();
  const publicState = (s, teacher = false) => ({ active: Boolean(s.active && now() < s.expires), expiresAt: s.expires, remaining: Math.max(0, s.max_questions - s.used), used: s.used, maxQuestions: s.max_questions, ...(teacher ? { code: s.code, hasKey: Boolean(s.api_key) } : {}) });
  const streams = new Set();
  const inFlight = new Set();
  const limit = (id, max, ms) => {
    const row = db.prepare('SELECT * FROM limits WHERE id=?').get(id);
    if (row && now() < row.expires && row.count >= max) throw error(429, '操作太频繁，请稍后再试。');
    db.prepare('INSERT OR REPLACE INTO limits VALUES(?,?,?)').run(id, row && now() < row.expires ? row.count + 1 : 1, row && now() < row.expires ? row.expires : now() + ms);
  };
  const cookie = (name, value, seconds) => `${name}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${seconds}${secure ? '; Secure' : ''}`;
  const cookies = req => Object.fromEntries((req.headers.cookie || '').split(';').map(x => x.trim().split('=')));
  const studentToken = req => req.headers.authorization?.match(/^Bearer ([A-Za-z0-9_-]{43})$/)?.[1] || cookies(req).classroom_session;
  const session = (req, kind) => {
    const value = kind === 'admin' ? cookies(req).classroom_admin : studentToken(req);
    const s = value && db.prepare('SELECT * FROM sessions WHERE hash=? AND kind=?').get(hash(value), kind);
    if (!s || s.expires <= now()) throw error(401, kind === 'admin' ? '请先登录教师后台。' : '课堂授权已失效，请重新输入口令。');
    if (kind === 'student') {
      const c = state();
      if (!c.active || c.expires <= now() || c.generation !== s.generation) throw error(401, '课堂已结束或口令已更换，请联系老师。');
    }
    return s;
  };
  const issue = (res, kind, generation, expires, useBearer = false) => {
    const value = token();
    db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').run(hash(value), kind, generation, expires);
    if (!useBearer) res.setHeader('Set-Cookie', cookie(kind === 'admin' ? 'classroom_admin' : 'classroom_session', value, Math.max(1, Math.floor((expires - now()) / 1000))));
    return value;
  };
  const stopStreams = () => { for (const controller of streams) controller.abort(); };
  const json = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(data)); };
  const body = async req => {
    if (!req.headers['content-type']?.startsWith('application/json')) throw error(415, '请使用 JSON 请求。');
    let data = '';
    for await (const chunk of req) { data += chunk; if (Buffer.byteLength(data) > 100000) throw error(413, '内容过长，请缩短后重试。'); }
    try { return JSON.parse(data); } catch { throw error(400, '请求格式不正确。'); }
  };
  const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    const path = new URL(req.url, 'http://localhost').pathname;
    const ip = req.socket.remoteAddress; // Never trust arbitrary X-Forwarded-For.
    try {
      if (path.startsWith('/api/')) {
        const isStudentPath = ['/api/classroom/redeem', '/api/session', '/api/chat', '/api/logout'].includes(path);
        const crossStudent = Boolean(studentOrigin && req.headers.origin === studentOrigin && isStudentPath);
        if (crossStudent) {
          res.setHeader('Access-Control-Allow-Origin', studentOrigin);
          res.setHeader('Vary', 'Origin');
          if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Max-Age', '600');
            res.writeHead(204); return res.end();
          }
        }
        if (req.method === 'POST') {
          const origin = req.headers.origin;
          const expected = process.env.CLASSROOM_ORIGIN || `${secure ? 'https' : 'http'}://${req.headers.host}`;
          if (!origin || (origin !== expected && !crossStudent)) throw error(403, '请求来源不受信任。');
        }
        if (req.method === 'POST' && path === '/api/admin/login') {
          limit(`login:${ip}`, 10, 600000);
          const data = await body(req);
          if (!equal(data.password, password)) throw error(401, '教师密码不正确。');
          issue(res, 'admin', 0, now() + 8 * 3600000);
          return json(res, 200, publicState(state(), true));
        }
        if (path.startsWith('/api/admin/')) {
          session(req, 'admin');
          if (req.method === 'GET' && path === '/api/admin/state') return json(res, 200, publicState(state(), true));
          if (req.method === 'POST' && path === '/api/admin/logout') {
            db.prepare('DELETE FROM sessions WHERE hash=?').run(hash(cookies(req).classroom_admin));
            res.setHeader('Set-Cookie', cookie('classroom_admin', '', 0));
            return json(res, 200, { ok: true });
          }
          if (req.method === 'POST' && path === '/api/admin/settings') {
            const data = await body(req);
            if (typeof data.apiKey !== 'string' || data.apiKey.trim().length < 10 || data.apiKey.length > 512 || /[\r\n]/.test(data.apiKey)) throw error(400, '请输入有效的 API key。');
            db.prepare('UPDATE classroom SET api_key=? WHERE id=1').run(encrypt(data.apiKey.trim()));
            return json(res, 200, publicState(state(), true));
          }
          if (req.method === 'POST' && path === '/api/admin/start') {
            const data = await body(req);
            if (!state().api_key) throw error(400, '请先保存 AI 密钥。');
            if (!Number.isInteger(data.minutes) || data.minutes < 5 || data.minutes > 480 || !Number.isInteger(data.maxQuestions) || data.maxQuestions < 1 || data.maxQuestions > 5000) throw error(400, '时长需为 5–480 分钟，提问上限需为 1–5000 次。');
            if (state().active && state().expires > now()) throw error(409, '请先结束当前课堂，再开启新课堂。');
            db.prepare('UPDATE classroom SET active=1, code=?, generation=generation+1, expires=?, max_questions=?, used=0 WHERE id=1').run(String(randomInt(100000, 1000000)), now() + data.minutes * 60000, data.maxQuestions);
            stopStreams();
            return json(res, 200, publicState(state(), true));
          }
          if (req.method === 'POST' && ['/api/admin/stop', '/api/admin/rotate'].includes(path)) {
            await body(req);
            const s = state();
            if (path.endsWith('/rotate') && (!s.active || s.expires <= now())) throw error(400, '请先开启课堂。');
            let nextCode; do { nextCode = String(randomInt(100000, 1000000)); } while (nextCode === s.code);
            db.prepare('UPDATE classroom SET active=?, code=?, generation=generation+1 WHERE id=1').run(path.endsWith('/stop') ? 0 : 1, nextCode);
            stopStreams();
            return json(res, 200, publicState(state(), true));
          }
        }
        if (req.method === 'POST' && path === '/api/classroom/redeem') {
          limit(`redeem:${ip}`, 180, 600000); // Whole classroom may share an IP.
          limit('redeem:global', 600, 600000);
          const data = await body(req);
          const s = state();
          if (!s.active || now() >= s.expires || !equal(String(data.code || '').trim(), s.code || '')) throw error(401, '口令不正确或课堂未开放，请向老师确认。');
          if (s.used >= s.max_questions) throw error(403, '本堂课的提问次数已用完。');
          const old = studentToken(req);
          if (old) db.prepare('DELETE FROM sessions WHERE hash=? AND kind=?').run(hash(old), 'student');
          const value = issue(res, 'student', s.generation, s.expires, crossStudent);
          return json(res, 200, { ...publicState(s), ...(crossStudent ? { token: value } : {}) });
        }
        if (req.method === 'GET' && path === '/api/session') { session(req, 'student'); return json(res, 200, publicState(state())); }
        if (req.method === 'POST' && path === '/api/logout') {
          const value = studentToken(req);
          if (value) db.prepare('DELETE FROM sessions WHERE hash=? AND kind=?').run(hash(value), 'student');
          res.setHeader('Set-Cookie', cookie('classroom_session', '', 0));
          return json(res, 200, { ok: true });
        }
        if (req.method === 'POST' && path === '/api/chat') {
          const student = session(req, 'student');
          const data = await body(req);
          if (!Array.isArray(data.messages) || !data.messages.length || data.messages.length > 32 || data.messages.some(m => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 4000) || data.messages.reduce((n, m) => n + m.content.length, 0) > 24000 || data.messages.at(-1).role !== 'user') throw error(400, '对话过长或格式不正确，请新建对话并缩短问题。');
          if (typeof data.requestId !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(data.requestId)) throw error(400, '请求编号不正确。');
          if (inFlight.has(student.hash)) throw error(429, '请等待当前回答完成。');
          limit(`chat:${student.hash}`, 8, 60000);
          limit('chat:global', 180, 60000);
          const requestId = hash(`${student.hash}:${data.requestId}`);
          // No awaits inside the transaction: quota reservation is atomic, including across processes.
          db.exec('BEGIN IMMEDIATE');
          try {
            const s = state();
            if (!s.active || s.expires <= now() || s.generation !== student.generation) throw error(401, '课堂授权已失效。');
            if (db.prepare('SELECT id FROM requests WHERE id=?').get(requestId)) throw error(409, '该问题已受理，请勿重复提交。');
            if (s.used >= s.max_questions) throw error(403, '本堂课的提问次数已用完。');
            db.prepare('INSERT INTO requests VALUES(?,?)').run(requestId, now());
            db.prepare('UPDATE classroom SET used=used+1 WHERE id=1').run();
            db.exec('COMMIT');
          } catch (e) { db.exec('ROLLBACK'); throw e; }
          const controller = new AbortController();
          streams.add(controller); inFlight.add(student.hash);
          const timer = setTimeout(() => controller.abort(), Math.min(90000, Math.max(1, state().expires - now())));
          const disconnect = () => controller.abort();
          res.on('close', disconnect);
          try {
            const context = data.context && typeof data.context.title === 'string' && typeof data.context.path === 'string' ? data.context : null;
            const up = await fetchAI('https://api.deepseek.com/chat/completions', {
              method: 'POST', signal: controller.signal,
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${decrypt(state().api_key)}` },
              body: JSON.stringify({ model: process.env.CLASSROOM_MODEL || 'deepseek-flash', messages: [{ role: 'system', content: buildClassroomPrompt(typeof data.persona === 'string' ? data.persona.slice(0, 1200) : '使用简短、易懂的语言。', context) }, ...data.messages], stream: true, max_tokens: 1200 }),
            });
            if (!up.ok || !up.body) throw error(502, 'AI 服务暂时不可用，请老师检查密钥或稍后重试。');
            res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'X-Accel-Buffering': 'no' });
            for await (const chunk of up.body) { if (controller.signal.aborted) break; if (!res.write(chunk)) await once(res, 'drain', { signal: controller.signal }); }
            res.end();
          } finally { clearTimeout(timer); streams.delete(controller); inFlight.delete(student.hash); res.off('close', disconnect); }
          return;
        }
        throw error(404, '接口不存在。');
      }
      if (!['GET', 'HEAD'].includes(req.method)) throw error(405, '请求方法不支持。');
      if (path === '/classroom-admin' || path === '/classroom-admin.js') {
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
        const js = path.endsWith('.js');
        res.setHeader('Content-Type', js ? 'text/javascript; charset=utf-8' : 'text/html; charset=utf-8');
        return res.end(readFileSync(new URL(js ? './admin.js' : './admin.html', import.meta.url)));
      }
      const root = resolve('dist');
      const relative = decodeURIComponent(path).replace(/^\/gesp-app\/?/, '').replace(/^\/+/, '');
      let file = resolve(root, relative || 'index.html');
      if (!file.startsWith(root + sep)) throw error(403, '无法访问。');
      if (!extname(file)) file = resolve(root, 'index.html');
      if (!existsSync(file)) throw error(404, '请先运行 npm run build，或使用 npm run dev:classroom。');
      res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' })[extname(file)] || 'application/octet-stream');
      res.end(readFileSync(file));
    } catch (e) {
      if (res.headersSent) res.end();
      else json(res, e.status || 502, { message: e.status ? e.message : '服务暂时异常，请稍后再试。' });
    }
  });
  const cleanup = setInterval(() => {
    db.prepare('DELETE FROM sessions WHERE expires<?').run(now());
    db.prepare('DELETE FROM limits WHERE expires<?').run(now());
    db.prepare('DELETE FROM requests WHERE created<?').run(now() - 86400000);
  }, 60000);
  cleanup.unref();
  server.on('close', () => { clearInterval(cleanup); stopStreams(); db.close(); });
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createClassroomServer();
  const port = Number(process.env.CLASSROOM_PORT || 8787);
  server.listen(port, process.env.CLASSROOM_HOST || '127.0.0.1', () => {
    console.log(`课堂服务已启动：http://localhost:${port}/classroom-admin`);
    console.log('教师登录密码：读取本机 .classroom/secrets.json 中的 adminPassword，或设置 CLASSROOM_ADMIN_PASSWORD。');
  });
}
