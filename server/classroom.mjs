import { createServer } from 'node:http';
import { isIP } from 'node:net';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomInt, createHash, createCipheriv, createDecipheriv, timingSafeEqual } from 'node:crypto';
import { chmodSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
import { buildClassroomPrompt, deepSeekReasoningEffort } from '../src/utils/classroomAssistant.js';
import { AI_PERSONAS } from '../src/utils/aiChatConstants.js';
import { CHAT_IMAGE_HISTORY_LIMIT, CHAT_IMAGE_LIMIT, isChatImage, toModelMessages } from '../src/utils/chatImages.js';
import { createUsageStore } from './usage/store.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
const equal = (a, b) => typeof a === 'string' && typeof b === 'string' && timingSafeEqual(Buffer.from(hash(a)), Buffer.from(hash(b)));
const token = () => randomBytes(32).toString('base64url');
const error = (status, message) => Object.assign(new Error(message), { status });

const providers = {
  deepseek: {
    name: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: process.env.CLASSROOM_MODEL || 'deepseek-flash',
    modelName: process.env.CLASSROOM_MODEL || 'DeepSeek Flash',
  },
  'opencode-go': {
    name: 'OpenCode Go',
    endpoint: 'https://opencode.ai/inference/go/openai/v1/chat/completions',
    model: 'deepseek-v4.1-flash',
    modelName: 'DeepSeek V4.1 Flash',
  },
};
const keyColumn = provider => provider === 'opencode-go' ? 'opencode_go_key' : 'api_key';
const supportsImages = model => ['deepseek-flash', 'deepseek-v4.1-flash', 'deepseek-v4-flash-vision-exp'].includes(model);
const CHAT_BODY_LIMIT = 100_000 + CHAT_IMAGE_HISTORY_LIMIT * CHAT_IMAGE_LIMIT;
const personaIds = new Map(AI_PERSONAS.map(persona => [persona.systemPrompt, persona.id]));
const personaIdFor = persona => {
  if (typeof persona !== 'string' || !persona.trim()) return 'default';
  return personaIds.get(persona) || 'custom';
};
const timezoneOffset = value => {
  if (typeof value !== 'string' || !/^-?\d{1,4}$/.test(value)) return 0;
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(-840, Math.min(840, Math.trunc(number))) : 0;
};

// 只旁路解析转发给浏览器的 SSE，解析失败绝不影响学生端的原始字节。
function createSseCollector(maxChars) {
  const decoder = new TextDecoder();
  let buffer = '';
  let answer = '';
  let usage = null;
  const consume = event => {
    for (const line of event.split('\n')) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const data = JSON.parse(payload);
        if (data?.usage && typeof data.usage === 'object') usage = data.usage;
        const content = data?.choices?.[0]?.delta?.content;
        if (typeof content === 'string' && content) {
          const remaining = maxChars - answer.length;
          if (remaining > 0) answer += content.slice(0, remaining);
        }
      } catch { /* 保留原始转发，忽略无法解析的事件。 */ }
    }
  };
  return {
    push(chunk) {
      try {
        buffer += decoder.decode(chunk, { stream: true });
        buffer = buffer.replace(/\r\n/g, '\n');
        let index;
        while ((index = buffer.indexOf('\n\n')) >= 0) {
          consume(buffer.slice(0, index));
          buffer = buffer.slice(index + 2);
        }
      } catch { /* 解析异常不得影响转发。 */ }
    },
    flush() {
      try {
        buffer += decoder.decode();
        buffer = buffer.replace(/\r\n/g, '\n');
        if (buffer.trim()) consume(buffer);
        buffer = '';
      } catch { /* 解析异常不得影响转发。 */ }
    },
    text: () => answer,
    usage: () => usage,
  };
}

const normalizeIp = value => {
  const ip = typeof value === 'string' ? value.trim() : '';
  return /^::ffff:\d{1,3}(?:\.\d{1,3}){3}$/i.test(ip) ? ip.slice(7) : ip;
};
const loopbackIp = ip => ip === '::1' || /^127\./.test(ip);
const trustedProxyConfig = value => {
  const entries = Array.isArray(value) ? value : String(value ?? 'loopback').split(',');
  const addresses = new Set();
  let loopback = false;
  for (const entry of entries) {
    const name = String(entry).trim();
    if (!name || name.toLowerCase() === 'none') continue;
    if (name.toLowerCase() === 'loopback') { loopback = true; continue; }
    addresses.add(normalizeIp(name));
  }
  return { addresses, loopback };
};

export function clientIp(req, trustedProxies = 'loopback') {
  const peer = normalizeIp(req.socket?.remoteAddress);
  const trusted = trustedProxyConfig(trustedProxies);
  if (!(trusted.loopback && loopbackIp(peer)) && !trusted.addresses.has(peer)) return peer;
  // Node joins repeated X-Forwarded-For headers with commas; the trusted proxy appends the closest hop on the right.
  const header = req.headers?.['x-forwarded-for'];
  const forwarded = Array.isArray(header) ? header.join(',') : header;
  if (typeof forwarded !== 'string' || !forwarded.trim()) return peer;
  const address = normalizeIp(forwarded.split(',').at(-1));
  return isIP(address) ? address : peer;
}

export function createClassroomServer({
  directory = process.env.CLASSROOM_DATA_DIR || resolve('.classroom'),
  adminPassword,
  fetchAI = fetch,
  now = Date.now,
  secure = process.env.NODE_ENV === 'production',
  studentOrigin = process.env.CLASSROOM_STUDENT_ORIGIN || '',
  trustedProxies = process.env.CLASSROOM_TRUSTED_PROXIES || 'loopback',
  usageLog = process.env.CLASSROOM_USAGE_LOG !== '0',
  usageRetentionDays = Number(process.env.CLASSROOM_USAGE_RETENTION_DAYS) || 365,
  usageResponseMaxChars = Number(process.env.CLASSROOM_USAGE_RESPONSE_MAX_CHARS) || 8000,
  usagePromptMaxChars = Number(process.env.CLASSROOM_USAGE_PROMPT_MAX_CHARS) || 4000,
  usageStoreResponse = process.env.CLASSROOM_USAGE_STORE_RESPONSE || 'full',
  usageStoreFactory = createUsageStore,
} = {}) {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const secretFile = resolve(directory, 'secrets.json');
  if (!existsSync(secretFile)) writeFileSync(secretFile, JSON.stringify({ encryptionKey: randomBytes(32).toString('hex'), adminPassword: token() }), { mode: 0o600 });
  const secrets = JSON.parse(readFileSync(secretFile, 'utf8'));
  const retentionDays = Number.isFinite(Number(usageRetentionDays)) && Number(usageRetentionDays) >= 0 ? Math.floor(Number(usageRetentionDays)) : 365;
  const responseMaxChars = Number.isFinite(Number(usageResponseMaxChars)) && Number(usageResponseMaxChars) > 0 ? Math.floor(Number(usageResponseMaxChars)) : 8000;
  const promptMaxChars = Number.isFinite(Number(usagePromptMaxChars)) && Number(usagePromptMaxChars) > 0 ? Math.floor(Number(usagePromptMaxChars)) : 4000;
  const storeResponse = ['full', 'summary', 'none'].includes(usageStoreResponse) ? usageStoreResponse : 'full';
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
  let usageHmacKey = secrets.usageHmacKey;
  if (!usageHmacKey) {
    usageHmacKey = randomBytes(32).toString('hex');
    try {
      secrets.usageHmacKey = usageHmacKey;
      writeFileSync(secretFile, JSON.stringify(secrets), { mode: 0o600 });
      chmodSync(secretFile, 0o600);
    } catch (e) {
      console.error('[usage]', e.message);
      usageHmacKey = null;
    }
  }
  let usage = null;
  if (usageLog && usageHmacKey) {
    try {
      usage = usageStoreFactory({
        directory, encrypt, decrypt, hmacKey: usageHmacKey, now,
        retentionDays, responseMaxChars, promptMaxChars, storeResponse,
      });
    } catch (e) {
      console.error('[usage]', e.message);
      usage = null;
    }
  }
  const usageSafe = (fn, fallback = null) => {
    if (!usage) return fallback;
    try { return fn(usage); } catch (e) { console.error('[usage]', e.message); return fallback; }
  };
  const db = new DatabaseSync(resolve(directory, 'classroom.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS classroom (id INTEGER PRIMARY KEY CHECK(id=1), api_key TEXT, code TEXT, generation INTEGER DEFAULT 0, active INTEGER DEFAULT 0, expires INTEGER DEFAULT 0, max_questions INTEGER DEFAULT 500, used INTEGER DEFAULT 0);
    INSERT OR IGNORE INTO classroom(id) VALUES(1);
    CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, kind TEXT, generation INTEGER, expires INTEGER);
    CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, created INTEGER);
    CREATE TABLE IF NOT EXISTS limits (id TEXT PRIMARY KEY, count INTEGER, expires INTEGER);`);
  const columns = db.prepare('PRAGMA table_info(classroom)').all().map(column => column.name);
  if (!columns.includes('provider')) db.exec("ALTER TABLE classroom ADD COLUMN provider TEXT NOT NULL DEFAULT 'deepseek'");
  if (!columns.includes('opencode_go_key')) db.exec('ALTER TABLE classroom ADD COLUMN opencode_go_key TEXT');
  const state = () => db.prepare('SELECT * FROM classroom WHERE id=1').get();
  const publicState = (s, teacher = false) => ({
    active: Boolean(s.active && now() < s.expires),
    expiresAt: s.expires,
    remaining: Math.max(0, s.max_questions - s.used),
    used: s.used,
    maxQuestions: s.max_questions,
    providerName: providers[s.provider].name,
    modelName: providers[s.provider].modelName,
    supportsImages: supportsImages(providers[s.provider].model),
    ...(teacher ? {
      code: s.code,
      provider: s.provider,
      hasKey: Boolean(s[keyColumn(s.provider)]),
      providers: Object.entries(providers).map(([id, entry]) => ({
        id, name: entry.name, modelName: entry.modelName, hasKey: Boolean(s[keyColumn(id)]),
      })),
    } : {}),
  });
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
  const body = async (req, maxBytes = 100_000) => {
    if (!req.headers['content-type']?.startsWith('application/json')) throw error(415, '请使用 JSON 请求。');
    const tooLarge = () => {
      req.resume();
      return error(413, '内容过长，请缩短文字或缩小图片后重试。');
    };
    if (Number(req.headers['content-length']) > maxBytes) throw tooLarge();
    const chunks = [];
    let size = 0;
    for await (const chunk of req.iterator({ destroyOnReturn: false })) {
      size += chunk.length;
      if (size > maxBytes) throw tooLarge();
      chunks.push(chunk);
    }
    try { return JSON.parse(Buffer.concat(chunks, size).toString('utf8')); } catch { throw error(400, '请求格式不正确。'); }
  };
  const usageFilters = req => {
    const query = new URL(req.url, 'http://localhost').searchParams;
    const tz = timezoneOffset(query.get('tz'));
    const time = (value, end) => {
      if (!value) return undefined;
      if (/^\d+$/.test(value)) return Number(value);
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const timestamp = Date.parse(`${value}T00:00:00.000Z`);
        if (!Number.isFinite(timestamp)) return undefined;
        return timestamp - tz * 60000 + (end ? 86399999 : 0);
      }
      return undefined;
    };
    const lessonId = Number(query.get('lessonId'));
    const page = Number(query.get('page'));
    const pageSize = Number(query.get('pageSize'));
    const pseudonym = query.get('pseudonym');
    return {
      tz,
      from: time(query.get('from'), false),
      to: time(query.get('to'), true),
      lessonId: Number.isInteger(lessonId) && lessonId > 0 ? lessonId : undefined,
      pseudonym: pseudonym ? pseudonym.slice(0, 128) : undefined,
      granularity: query.get('granularity') === 'week' ? 'week' : 'day',
      page: Number.isInteger(page) && page > 0 ? page : 1,
      pageSize: Number.isInteger(pageSize) && pageSize > 0 ? Math.min(100, pageSize) : 20,
    };
  };
  const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    const path = new URL(req.url, 'http://localhost').pathname;
    const ip = clientIp(req, trustedProxies); // Only trust the right-most X-Forwarded-For hop appended by a trusted proxy.
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
          if (req.method === 'GET' && path.startsWith('/api/admin/usage/')) {
            const origin = req.headers.origin;
            const expected = process.env.CLASSROOM_ORIGIN || `${secure ? 'https' : 'http'}://${req.headers.host}`;
            if ((origin && origin !== expected) || req.headers['sec-fetch-site'] === 'cross-site') throw error(403, '请求来源不受信任。');
            limit(`usage:${hash(cookies(req).classroom_admin)}`, 120, 60000);
            const enabled = Boolean(usage);
            if (path === '/api/admin/usage/status') return json(res, 200, { enabled, retentionDays, storeResponse, responseMaxChars });
            const filter = usageFilters(req);
            if (path === '/api/admin/usage/summary') return json(res, 200, {
              enabled, ...usageSafe(u => u.summary(filter), { total: 0, pseudonyms: 0, errors: 0, errorRate: 0, types: [] }),
            });
            if (path === '/api/admin/usage/lessons') return json(res, 200, { enabled, lessons: usageSafe(u => u.lessons(), []) });
            if (path === '/api/admin/usage/types') return json(res, 200, { enabled, types: usageSafe(u => u.types(filter), []) });
            if (path === '/api/admin/usage/knowledge') return json(res, 200, { enabled, knowledge: usageSafe(u => u.knowledge(filter), []) });
            if (path === '/api/admin/usage/trends') return json(res, 200, {
              enabled, granularity: filter.granularity, buckets: [],
              ...usageSafe(u => u.trends(filter), {}),
            });
            if (path === '/api/admin/usage/pseudonyms') return json(res, 200, {
              enabled, ...usageSafe(u => u.pseudonyms(filter), { total: 0, pseudonyms: [] }),
            });
            if (path === '/api/admin/usage/turns') return json(res, 200, {
              enabled, ...usageSafe(u => u.turns(filter), { total: 0, page: filter.page, pageSize: filter.pageSize, turns: [] }),
            });
            const detail = path.match(/^\/api\/admin\/usage\/turns\/(\d+)$/);
            if (detail) {
              const record = usageSafe(u => u.turn(Number(detail[1])), null);
              if (!record) return json(res, enabled ? 404 : 200, enabled ? { message: '记录不存在。' } : { enabled: false });
              return json(res, 200, { enabled, ...record });
            }
            throw error(404, '接口不存在。');
          }
          if (req.method === 'POST' && path === '/api/admin/usage/purge') {
            let data = {};
            if (req.headers['content-type']?.startsWith('application/json') && Number(req.headers['content-length'] || 0) > 0) data = await body(req);
            const raw = String(data?.before ?? '');
            const tz = timezoneOffset(new URL(req.url, 'http://localhost').searchParams.get('tz'));
            const before = /^\d+$/.test(raw) ? Number(raw)
              : /^\d{4}-\d{2}-\d{2}$/.test(raw) ? Date.parse(`${raw}T00:00:00.000Z`) - tz * 60000
                : NaN;
            const result = usageSafe(u => u.purge(Number.isFinite(before) ? { before } : {}), { turns: 0, lessons: 0, total: 0 });
            return json(res, 200, { enabled: Boolean(usage), ...result });
          }
          if (req.method === 'GET' && path === '/api/admin/state') return json(res, 200, publicState(state(), true));
          if (req.method === 'POST' && path === '/api/admin/logout') {
            db.prepare('DELETE FROM sessions WHERE hash=?').run(hash(cookies(req).classroom_admin));
            res.setHeader('Set-Cookie', cookie('classroom_admin', '', 0));
            return json(res, 200, { ok: true });
          }
          if (req.method === 'POST' && path === '/api/admin/settings') {
            const data = await body(req);
            const provider = data.provider === undefined ? 'deepseek' : data.provider;
            if (typeof provider !== 'string' || !Object.hasOwn(providers, provider)) throw error(400, '请选择支持的服务商。');
            if (typeof data.apiKey !== 'string' || data.apiKey.length > 512 || /[\r\n]/.test(data.apiKey)) throw error(400, '请输入有效的 API Key。');
            const key = data.apiKey.trim();
            const column = keyColumn(provider);
            const savedKey = state()[column];
            if (!key && !savedKey) throw error(400, `请填写 ${providers[provider].name} 的 API Key。`);
            if (key && key.length < 10) throw error(400, '请输入有效的 API Key。');
            // The column is selected from two fixed names. Save the key and provider together.
            db.prepare(`UPDATE classroom SET provider=?, ${column}=? WHERE id=1`).run(provider, key ? encrypt(key) : savedKey);
            return json(res, 200, publicState(state(), true));
          }
          if (req.method === 'POST' && path === '/api/admin/start') {
            const data = await body(req);
            const configuration = state();
            if (!configuration[keyColumn(configuration.provider)]) throw error(400, '请先保存 AI 密钥。');
            if (!Number.isInteger(data.minutes) || data.minutes < 5 || data.minutes > 480 || !Number.isInteger(data.maxQuestions) || data.maxQuestions < 1 || data.maxQuestions > 5000) throw error(400, '时长需为 5–480 分钟，提问上限需为 1–5000 次。');
            if (state().active && state().expires > now()) throw error(409, '请先结束当前课堂，再开启新课堂。');
            db.prepare('UPDATE classroom SET active=1, code=?, generation=generation+1, expires=?, max_questions=?, used=0 WHERE id=1').run(String(randomInt(100000, 1000000)), now() + data.minutes * 60000, data.maxQuestions);
            const started = state();
            usageSafe(u => u.startLesson({
              generation: started.generation, maxQuestions: data.maxQuestions,
              provider: started.provider, model: providers[started.provider].model,
            }));
            stopStreams();
            return json(res, 200, publicState(state(), true));
          }
          if (req.method === 'POST' && ['/api/admin/stop', '/api/admin/rotate'].includes(path)) {
            await body(req);
            const s = state();
            if (path.endsWith('/rotate') && (!s.active || s.expires <= now())) throw error(400, '请先开启课堂。');
            let nextCode; do { nextCode = String(randomInt(100000, 1000000)); } while (nextCode === s.code);
            db.prepare('UPDATE classroom SET active=?, code=?, generation=generation+1 WHERE id=1').run(path.endsWith('/stop') ? 0 : 1, nextCode);
            const changed = state();
            if (path.endsWith('/stop')) usageSafe(u => u.endLesson(s.generation));
            else usageSafe(u => u.rotateLesson(changed.generation));
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
          const data = await body(req, CHAT_BODY_LIMIT);
          const { messages } = data || {};
          if (!Array.isArray(messages) || !messages.length || messages.length > 32 || messages.some(m => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 4000) || messages.reduce((n, m) => n + m.content.length, 0) > 24000 || messages.at(-1).role !== 'user') throw error(400, '对话过长或格式不正确，请新建对话并缩短问题。');
          const withImages = messages.filter(message => message.image !== undefined);
          if (withImages.length > CHAT_IMAGE_HISTORY_LIMIT || withImages.some(message => message.role !== 'user' || !isChatImage(message.image))) {
            throw error(400, '图片过大或格式不正确，请重新添加图片。');
          }
          const reasoningLevel = data.reasoningLevel === undefined ? 'low' : data.reasoningLevel;
          if (!['low', 'medium'].includes(reasoningLevel)) throw error(400, '思考强度仅支持极速或认真思考。');
          if (typeof data.requestId !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(data.requestId)) throw error(400, '请求编号不正确。');
          if (inFlight.has(student.hash)) throw error(429, '请等待当前回答完成。');
          limit(`chat:${student.hash}`, 8, 60000);
          limit('chat:global', 180, 60000);
          const requestId = hash(`${student.hash}:${data.requestId}`);
          // No awaits inside the transaction: quota reservation is atomic, including across processes.
          let configuration;
          db.exec('BEGIN IMMEDIATE');
          try {
            const s = configuration = state();
            if (!s.active || s.expires <= now() || s.generation !== student.generation) throw error(401, '课堂授权已失效。');
            if (withImages.length && !supportsImages(providers[s.provider].model)) throw error(400, '当前课堂模型不支持图片，请联系老师。');
            if (db.prepare('SELECT id FROM requests WHERE id=?').get(requestId)) throw error(409, '该问题已受理，请勿重复提交。');
            if (s.used >= s.max_questions) throw error(403, '本堂课的提问次数已用完。');
            db.prepare('INSERT INTO requests VALUES(?,?)').run(requestId, now());
            db.prepare('UPDATE classroom SET used=used+1 WHERE id=1').run();
            db.exec('COMMIT');
          } catch (e) { db.exec('ROLLBACK'); throw e; }
          const conversationId = typeof data.conversationId === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(data.conversationId) ? data.conversationId : '';
          const personaId = personaIdFor(data.persona);
          const turnStartedAt = now();
          const turnId = usageSafe(u => {
            const pseudonym = u.pseudonymFor(data.anonId, student.hash);
            return u.beginTurn({
              lessonId: u.currentLessonId(configuration.generation),
              generation: configuration.generation,
              pseudonym,
              anonId: data.anonId,
              sessionHash: student.hash,
              conversationHash: conversationId ? u.conversationHash(pseudonym, conversationId) : null,
              conversationId,
              turnIndex: messages.filter(message => message.role === 'user').length,
              prompt: messages.at(-1).content,
              hasImage: withImages.length > 0,
              personaId,
              reasoningLevel,
              provider: configuration.provider,
              model: providers[configuration.provider].model,
            });
          });
          const controller = new AbortController();
          const collector = createSseCollector(responseMaxChars * 2);
          let outcome = 'ok';
          let errorClass = null;
          let upstreamStarted = false;
          streams.add(controller); inFlight.add(student.hash);
          const timer = setTimeout(() => controller.abort(), Math.min(90000, Math.max(1, configuration.expires - now())));
          const disconnect = () => controller.abort();
          res.on('close', disconnect);
          try {
            const provider = providers[configuration.provider];
            const persona = typeof data.persona === 'string' ? data.persona.slice(0, 1200) : '使用简短、易懂的语言。';
            const headers = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${decrypt(configuration[keyColumn(configuration.provider)])}`,
            };
            if (configuration.provider === 'opencode-go') {
              headers['User-Agent'] = 'gesp-classroom/1.0';
              headers['x-opencode-session'] = hash(`opencode:${student.hash}:${conversationId}`);
            }
            upstreamStarted = true;
            const up = await fetchAI(provider.endpoint, {
              method: 'POST', signal: controller.signal, redirect: 'error',
              headers,
              body: JSON.stringify({
                model: provider.model,
                messages: [{ role: 'system', content: buildClassroomPrompt(persona) }, ...toModelMessages(messages)],
                stream: true,
                reasoning_effort: deepSeekReasoningEffort(reasoningLevel),
                max_tokens: reasoningLevel === 'medium' ? 2400 : 1200,
              }),
            });
            if (up.status === 401) { outcome = 'error'; errorClass = 'upstream_auth'; throw error(502, `${provider.name} 拒绝了当前 API Key，请联系老师更新密钥。`); }
            if (!up.ok || !up.body) { outcome = 'error'; errorClass = 'upstream_unavailable'; throw error(502, 'AI 服务暂时不可用，请老师检查密钥或稍后重试。'); }
            res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'X-Accel-Buffering': 'no' });
            try {
              for await (const chunk of up.body) {
                if (controller.signal.aborted) break;
                collector.push(chunk);
                if (!res.write(chunk)) await once(res, 'drain', { signal: controller.signal });
              }
              collector.flush();
              res.end();
            } catch (e) {
              if (!controller.signal.aborted) { outcome = 'error'; errorClass = 'upstream_stream'; }
              throw e;
            }
          } catch (e) {
            if (controller.signal.aborted) { outcome = 'aborted'; errorClass = 'aborted'; }
            else if (outcome === 'ok') { outcome = 'error'; errorClass = upstreamStarted ? 'upstream_unavailable' : 'internal'; }
            throw e;
          } finally {
            if (controller.signal.aborted) { outcome = 'aborted'; errorClass = 'aborted'; }
            clearTimeout(timer); streams.delete(controller); inFlight.delete(student.hash); res.off('close', disconnect);
            usageSafe(u => u.finishTurn(turnId, {
              status: outcome, responseText: collector.text(), errorClass,
              usage: collector.usage(), latencyMs: Math.max(0, now() - turnStartedAt),
            }));
          }
          return;
        }
        throw error(404, '接口不存在。');
      }
      if (!['GET', 'HEAD'].includes(req.method)) throw error(405, '请求方法不支持。');
      if (path === '/classroom-admin' || path === '/classroom-admin.js' || path === '/classroom-usage' || path === '/classroom-usage.js') {
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
        const js = path.endsWith('.js');
        const usagePage = path.startsWith('/classroom-usage');
        res.setHeader('Content-Type', js ? 'text/javascript; charset=utf-8' : 'text/html; charset=utf-8');
        const file = usagePage ? (js ? './usage.js' : './usage.html') : (js ? './admin.js' : './admin.html');
        return res.end(readFileSync(new URL(file, import.meta.url)));
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
    usageSafe(u => u.maybeDailyPurge());
  }, 60000);
  cleanup.unref();
  server.on('close', () => { clearInterval(cleanup); stopStreams(); usageSafe(u => u.close()); db.close(); });
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
