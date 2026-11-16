import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { DatabaseSync } from 'node:sqlite';
import { createClassroomServer } from '../../server/classroom.mjs';
import { createUsageStore } from '../../server/usage/store.mjs';
import { AI_PERSONAS } from '../../src/utils/aiChatConstants.js';

const sse = (text, usage) => `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`
  + (usage ? `data: ${JSON.stringify({ choices: [], usage })}\n\n` : '')
  + 'data: [DONE]\n\n';

async function quiet(fn) {
  const original = console.error;
  console.error = () => {};
  try { return await fn(); } finally { console.error = original; }
}

async function fixture(t, overrides = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'classroom-usage-test-'));
  let time = Date.now();
  const calls = [];
  const behavior = { mode: 'ok', answer: '你好', sse: null };
  const options = {
    directory,
    studentOrigin: 'https://dora321.github.io',
    adminPassword: 'teacher-test-password',
    secure: false,
    now: () => time,
    fetchAI: async (url, init) => {
      calls.push({ url, ...init });
      if (behavior.mode === 'fail') return new Response('SECRET upstream error', { status: 500 });
      if (behavior.mode === 'unauthorized') return new Response('SECRET upstream auth', { status: 401 });
      if (behavior.mode === 'block') return new Response(new ReadableStream({ start(controller) {
        controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"开始"}}]}\n\n'));
        init.signal.addEventListener('abort', () => {
          try { controller.close(); } catch { /* already closed */ }
        }, { once: true });
      } }));
      return new Response(behavior.sse ?? sse(behavior.answer), { headers: { 'Content-Type': 'text/event-stream' } });
    },
    ...overrides,
  };
  let server = createClassroomServer(options);
  let base;
  async function listen() {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    base = `http://127.0.0.1:${server.address().port}`;
  }
  await listen();
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    rmSync(directory, { recursive: true, force: true });
  });
  async function req(path, data, cookie = '', origin = base, headers = {}) {
    const requestHeaders = { 'Content-Type': 'application/json', Cookie: cookie, ...headers };
    if (origin) requestHeaders.Origin = origin;
    const res = await fetch(base + path, {
      ...(data === undefined ? {} : { method: 'POST', body: JSON.stringify(data) }),
      headers: requestHeaders,
    });
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text; }
    return { status: res.status, body, cookie: res.headers.get('set-cookie')?.split(';')[0], headers: res.headers };
  }
  const admin = (await req('/api/admin/login', { password: 'teacher-test-password' })).cookie;
  await req('/api/admin/settings', { apiKey: 'sk-classroom-secret-test' }, admin);
  async function start(maxQuestions = 500) { return (await req('/api/admin/start', { minutes: 5, maxQuestions }, admin)).body; }
  async function student(code) { return (await req('/api/classroom/redeem', { code })).cookie; }
  async function chat(cookie, payload = {}) {
    return req('/api/chat', {
      messages: [{ role: 'user', content: '解释循环' }],
      requestId: crypto.randomUUID(),
      ...payload,
    }, cookie);
  }
  function usageRows() {
    const file = join(directory, 'usage.sqlite');
    if (!existsSync(file)) return [];
    const db = new DatabaseSync(file);
    try { return db.prepare('SELECT * FROM turns ORDER BY id').all(); } finally { db.close(); }
  }
  function usageBytes() {
    const parts = [];
    for (const name of ['usage.sqlite', 'usage.sqlite-wal', 'usage.sqlite-shm']) {
      const file = join(directory, name);
      if (existsSync(file)) parts.push(readFileSync(file));
    }
    return Buffer.concat(parts);
  }
  return {
    directory, req, admin, start, student, chat, calls, behavior, usageRows, usageBytes,
    advance: ms => { time += ms; },
    setTime: value => { time = value; },
    base,
  };
}

test('successful, failed and stopped chats leave ok/error/aborted rows', async t => {
  const f = await fixture(t);
  const state = await f.start(10);
  const cookie = await f.student(state.code);
  const success = await f.chat(cookie, { conversationId: 'conversation-0000000001', anonId: crypto.randomUUID() });
  assert.equal(success.status, 200);
  assert.match(success.body, /你好/);

  let rows = f.usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, 'ok');
  const detail = await f.req(`/api/admin/usage/turns/${rows[0].id}`, undefined, f.admin);
  assert.equal(detail.status, 200);
  assert.equal(detail.body.enabled, true);
  assert.match(detail.body.prompt, /解释循环/);
  assert.match(detail.body.response, /你好/);

  f.behavior.mode = 'fail';
  assert.equal((await f.chat(cookie)).status, 502);
  rows = f.usageRows();
  assert.equal(rows.length, 2);
  assert.equal(rows[1].status, 'error');
  assert.equal(rows[1].error_class, 'upstream_unavailable');

  f.behavior.mode = 'block';
  const pending = f.chat(cookie);
  while (f.calls.length < 3) await new Promise(resolve => setImmediate(resolve));
  await f.req('/api/admin/stop', {}, f.admin);
  const aborted = await pending;
  assert.equal(aborted.status, 200);
  rows = f.usageRows();
  assert.equal(rows.length, 3);
  assert.equal(rows[2].status, 'aborted');
  assert.equal(rows[2].error_class, 'aborted');
});

test('upstream 401 records upstream_auth without storing the upstream body', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  const cookie = await f.student(state.code);
  f.behavior.mode = 'unauthorized';
  const response = await f.chat(cookie);
  assert.equal(response.status, 502);
  assert.equal(JSON.stringify(response.body).includes('SECRET'), false);
  const [row] = f.usageRows();
  assert.equal(row.status, 'error');
  assert.equal(row.error_class, 'upstream_auth');
  assert.equal(f.usageBytes().includes(Buffer.from('SECRET upstream auth')), false);
});

test('SSE usage is recorded; missing usage is estimated', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  const cookie = await f.student(state.code);
  f.behavior.sse = sse('你好', { prompt_tokens: 7, completion_tokens: 3 });
  assert.equal((await f.chat(cookie)).status, 200);
  let [row] = f.usageRows();
  assert.equal(row.prompt_tokens, 7);
  assert.equal(row.completion_tokens, 3);
  assert.equal(row.tokens_estimated, 0);

  f.behavior.sse = null;
  f.behavior.answer = '再讲一次';
  assert.equal((await f.chat(cookie)).status, 200);
  [, row] = f.usageRows();
  assert.equal(row.tokens_estimated, 1);
  assert.ok(row.prompt_tokens > 0);
  assert.ok(row.completion_tokens > 0);
});

test('disabled usage creates no rows and leaves chat behavior unchanged', async t => {
  const f = await fixture(t, { usageLog: false });
  const state = await f.start(5);
  const cookie = await f.student(state.code);
  const response = await f.chat(cookie);
  assert.equal(response.status, 200);
  assert.match(response.body, /你好/);
  assert.equal(existsSync(join(f.directory, 'usage.sqlite')), false);
  const summary = await f.req('/api/admin/usage/summary', undefined, f.admin);
  assert.equal(summary.status, 200);
  assert.equal(summary.body.enabled, false);
  assert.equal(summary.body.total, 0);
  assert.equal((await f.req('/api/admin/state', undefined, f.admin)).body.used, 1);
});

test('prompt and answer redaction hides personal data and image bytes from the database', async t => {
  const f = await fixture(t);
  const state = await f.start(10);
  const cookie = await f.student(state.code);
  const prompt = '我的手机号是 13800138000，邮箱 student@example.com，服务器 127.0.0.1，密钥 sk-should-not-appear，Bearer should-not-appear，请解释循环。';
  f.behavior.sse = sse('回答里也有手机号 13900139000 和邮箱 teacher-leak@example.com');
  assert.equal((await f.chat(cookie, { messages: [{ role: 'user', content: prompt }] })).status, 200);
  const [textRow] = f.usageRows();
  const flags = JSON.parse(textRow.redaction_flags);
  assert.ok(flags.includes('phone'));
  assert.ok(flags.includes('email'));
  assert.equal(textRow.has_image, 0);
  const detail = await f.req(`/api/admin/usage/turns/${textRow.id}`, undefined, f.admin);
  assert.equal(detail.body.prompt.includes('13800138000'), false);
  assert.equal(detail.body.prompt.includes('student@example.com'), false);
  assert.match(detail.body.prompt, /【已脱敏】/);
  assert.equal(detail.body.response.includes('13900139000'), false);
  assert.equal(detail.body.response.includes('teacher-leak@example.com'), false);

  const marker = 'IMAGE_SECRET_9f8e7d6c';
  const image = `data:image/jpeg;base64,/9j/${Buffer.from(marker).toString('base64')}`;
  f.behavior.sse = null;
  assert.equal((await f.chat(cookie, { messages: [{ role: 'user', content: '看这张图', image }] })).status, 200);
  const rows = f.usageRows();
  assert.equal(rows.length, 2);
  assert.equal(rows[1].has_image, 1);

  const bytes = f.usageBytes();
  const cookieValue = cookie.split('=').slice(1).join('=');
  for (const secret of [
    '13800138000', '13900139000', 'student@example.com', 'teacher-leak@example.com',
    'sk-should-not-appear', 'sk-classroom-secret-test', 'Bearer should-not-appear', '127.0.0.1',
    cookieValue, Buffer.from(marker).toString('base64'), marker,
  ]) {
    assert.equal(bytes.includes(Buffer.from(secret)), false, `usage database should not contain ${secret}`);
  }
});

test('turns table has no IP, path, paper or question columns', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  await f.chat(await f.student(state.code));
  const db = new DatabaseSync(join(f.directory, 'usage.sqlite'));
  try {
    const columns = db.prepare('PRAGMA table_info(turns)').all().map(column => column.name);
    for (const forbidden of ['ip', 'path', 'paper_id', 'question_id', 'name', 'student_id']) {
      assert.equal(columns.includes(forbidden), false, `unexpected column ${forbidden}`);
    }
    for (const required of ['created_at', 'lesson_id', 'pseudonym', 'prompt_enc', 'response_enc', 'prompt_type', 'redaction_flags']) {
      assert.ok(columns.includes(required), `missing column ${required}`);
    }
  } finally { db.close(); }
});

test('usage summary, types, knowledge, trends, pseudonyms and turns endpoints return aggregate data', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  const cookie = await f.student(state.code);
  await f.chat(cookie, { messages: [{ role: 'user', content: '数组下标越界，for 循环报错' }] });

  const summary = await f.req('/api/admin/usage/summary', undefined, f.admin);
  assert.equal(summary.status, 200);
  assert.equal(summary.body.enabled, true);
  assert.equal(summary.body.total, 1);
  assert.equal(summary.body.errors, 0);
  assert.equal(summary.body.types.length, 6);
  assert.equal(summary.body.types.find(item => item.type === 'debugging').count, 1);

  const types = await f.req('/api/admin/usage/types', undefined, f.admin);
  assert.equal(types.body.types.find(item => item.type === 'debugging').count, 1);
  const knowledge = await f.req('/api/admin/usage/knowledge', undefined, f.admin);
  assert.ok(knowledge.body.knowledge.some(item => item.tag === '数组与容器'));
  assert.ok(knowledge.body.knowledge.some(item => item.tag === '循环结构'));

  const trends = await f.req('/api/admin/usage/trends?granularity=day', undefined, f.admin);
  assert.equal(trends.body.granularity, 'day');
  assert.equal(trends.body.buckets.length, 1);
  assert.equal(trends.body.buckets[0].total, 1);
  assert.equal(trends.body.buckets[0].types.debugging, 1);

  const pseudonyms = await f.req('/api/admin/usage/pseudonyms', undefined, f.admin);
  assert.equal(pseudonyms.body.total, 1);
  assert.match(pseudonyms.body.pseudonyms[0].displayName, /^同学-[0-9A-F]{4}$/);
  assert.equal(pseudonyms.body.pseudonyms[0].mainType, 'debugging');
  assert.ok(pseudonyms.body.pseudonyms[0].knowledgeTags.includes('数组与容器'));

  const turns = await f.req('/api/admin/usage/turns?page=1&pageSize=20', undefined, f.admin);
  assert.equal(turns.body.total, 1);
  assert.equal(turns.body.turns[0].prompt, undefined);
  assert.equal(turns.body.turns[0].response, undefined);
  assert.equal(turns.body.turns[0].status, 'ok');
  assert.ok(turns.body.turns[0].knowledgeTags.includes('循环结构'));

  const lessons = await f.req('/api/admin/usage/lessons', undefined, f.admin);
  assert.equal(lessons.body.lessons.length, 1);
  assert.equal(lessons.body.lessons[0].turns, 1);
});

test('the same anonId keeps its pseudonym across lessons; invalid ids fall back to the session', async t => {
  const f = await fixture(t);
  const anonId = crypto.randomUUID();
  const first = await f.start(10);
  const firstCookie = await f.student(first.code);
  await f.chat(firstCookie, { anonId });
  await f.req('/api/admin/stop', {}, f.admin);

  const second = await f.start(10);
  const secondCookie = await f.student(second.code);
  await f.chat(secondCookie, { anonId });
  await f.chat(secondCookie, { anonId: 'not-a-uuid' });
  await f.chat(secondCookie);
  let rows = f.usageRows();
  assert.equal(rows[0].pseudonym, rows[1].pseudonym);
  assert.equal(rows[2].pseudonym, rows[3].pseudonym, 'non-UUID anonId should be ignored');
  assert.notEqual(rows[2].pseudonym, rows[1].pseudonym, 'a new classroom session has a different fallback hash');

  await f.req('/api/admin/stop', {}, f.admin);
  const third = await f.start(10);
  await f.chat(await f.student(third.code));
  rows = f.usageRows();
  assert.notEqual(rows[4].pseudonym, rows[2].pseudonym);
});

test('persona ids match built-in prompts only; custom persona text is never stored', async t => {
  const f = await fixture(t);
  const state = await f.start(10);
  const cookie = await f.student(state.code);
  const tutor = AI_PERSONAS.find(persona => persona.id === 'tutor');
  const customText = '自定义人设原文-SECRET-7c4f2a：请假装你认识我的家人。';

  await f.chat(cookie, { persona: tutor.systemPrompt });
  await f.chat(cookie, { persona: customText });
  await f.chat(cookie);
  await f.chat(cookie, { personaId: 'expert' });

  const rows = f.usageRows();
  assert.equal(rows[0].persona_id, 'tutor');
  assert.equal(rows[1].persona_id, 'custom');
  assert.equal(rows[2].persona_id, 'default');
  assert.equal(rows[3].persona_id, 'default', 'client-supplied personaId must be ignored');
  assert.equal(f.usageBytes().includes(Buffer.from(customText)), false);
});

test('daily buckets honour the browser timezone offset', async t => {
  const f = await fixture(t);
  f.setTime(Date.parse('2026-11-16T21:00:00+08:00'));
  const state = await f.start(5);
  const cookie = await f.student(state.code);
  assert.equal((await f.chat(cookie)).status, 200);

  const trends = await f.req('/api/admin/usage/trends?granularity=day&tz=480', undefined, f.admin);
  assert.equal(trends.status, 200);
  assert.equal(trends.body.buckets.length, 1);
  assert.equal(trends.body.buckets[0].period, '2026-11-16');

  await f.req('/api/admin/stop', {}, f.admin);
  f.setTime(Date.parse('2026-11-17T01:00:00+08:00'));
  const second = await f.start(5);
  const secondCookie = await f.student(second.code);
  assert.equal((await f.chat(secondCookie)).status, 200);
  const filtered = await f.req('/api/admin/usage/summary?from=2026-11-17&to=2026-11-17&tz=480', undefined, f.admin);
  assert.equal(filtered.body.total, 1, '01:00 Beijing time belongs to the next local day');
  const utcDay = await f.req('/api/admin/usage/summary?from=2026-11-16&to=2026-11-16&tz=0', undefined, f.admin);
  assert.equal(utcDay.body.total, 2, 'without tz both records fall on the UTC date');
});

test('rotation keeps the lesson while following the new generation, and stop ends it', async t => {
  const f = await fixture(t);
  const state = await f.start(10);
  const firstCookie = await f.student(state.code);
  await f.chat(firstCookie);
  const rotated = await f.req('/api/admin/rotate', {}, f.admin);
  const secondCookie = await f.student(rotated.body.code);
  await f.chat(secondCookie);

  const rows = f.usageRows();
  assert.equal(rows[0].lesson_id, rows[1].lesson_id);
  assert.notEqual(rows[0].generation, rows[1].generation);
  let lessons = (await f.req('/api/admin/usage/lessons', undefined, f.admin)).body.lessons;
  assert.equal(lessons.length, 1);
  assert.equal(lessons[0].turns, 2);
  assert.equal(lessons[0].endedAt, null);

  await f.req('/api/admin/stop', {}, f.admin);
  lessons = (await f.req('/api/admin/usage/lessons', undefined, f.admin)).body.lessons;
  assert.equal(typeof lessons[0].endedAt, 'number');
});

test('usage endpoints require a teacher cookie, reject cross-site GETs and never expose CORS', async t => {
  const f = await fixture(t);
  assert.equal((await f.req('/api/admin/usage/summary', undefined, '', '')).status, 401);
  assert.equal((await f.req('/api/admin/usage/summary?teacher=1', undefined, '', '')).status, 401);
  assert.equal((await f.req('/api/admin/usage/status', undefined, '', '')).status, 401);

  const state = await f.start(5);
  assert.equal((await f.req('/api/admin/usage/summary', undefined, f.admin)).status, 200);
  const cross = await f.req('/api/admin/usage/summary', undefined, f.admin, 'https://dora321.github.io');
  assert.equal(cross.status, 403);
  assert.equal(cross.headers.get('access-control-allow-origin'), null);
  const fetchSite = await f.req('/api/admin/usage/summary', undefined, f.admin, '', { 'Sec-Fetch-Site': 'cross-site' });
  assert.equal(fetchSite.status, 403);

  const redeem = await f.req('/api/classroom/redeem', { code: state.code }, '', 'https://dora321.github.io');
  assert.equal(redeem.status, 200);
  const bearer = await f.req('/api/admin/usage/summary', undefined, '', '', { Authorization: `Bearer ${redeem.body.token}` });
  assert.equal(bearer.status, 401);
});

test('secrets gain a usage HMAC key, and status does not expose secrets', async t => {
  const f = await fixture(t);
  const secretFile = join(f.directory, 'secrets.json');
  const secrets = JSON.parse(readFileSync(secretFile, 'utf8'));
  assert.match(secrets.usageHmacKey, /^[0-9a-f]{64}$/);
  assert.equal(statSync(secretFile).mode & 0o777, 0o600);
  const status = await f.req('/api/admin/usage/status', undefined, f.admin);
  assert.deepEqual(status.body, { enabled: true, retentionDays: 365, storeResponse: 'full', responseMaxChars: 8000 });
  const serialized = JSON.stringify(status.body);
  assert.equal(serialized.includes(secrets.usageHmacKey), false);
  assert.equal(serialized.includes(secrets.encryptionKey), false);
  assert.equal(serialized.includes(secrets.adminPassword), false);
});

test('usage store purges old rows, keeps new ones, and rate-limits daily purges to once per 24h', async t => {
  const day = 86400000;
  const base = Date.now();
  const directory = mkdtempSync(join(tmpdir(), 'usage-store-test-'));
  let time = base;
  const encrypt = value => `enc:${value}`;
  const decrypt = value => value.slice(4);
  const store = createUsageStore({ directory, encrypt, decrypt, hmacKey: 'test-hmac-key', now: () => time });
  t.after(() => { store.close(); rmSync(directory, { recursive: true, force: true }); });

  time = base - 366 * day;
  store.beginTurn({ prompt: '很旧的提问' });
  time = base;
  const fresh = store.beginTurn({ prompt: '今天的提问' });
  const purged = store.purge();
  assert.equal(purged.turns, 1);
  assert.equal(store.turns().total, 1);
  assert.equal(store.turn(fresh).prompt, '今天的提问');

  const dailyDirectory = mkdtempSync(join(tmpdir(), 'usage-daily-test-'));
  let dailyTime = base;
  const daily = createUsageStore({ directory: dailyDirectory, encrypt, decrypt, hmacKey: 'test-hmac-key', now: () => dailyTime });
  t.after(() => { daily.close(); rmSync(dailyDirectory, { recursive: true, force: true }); });
  dailyTime = base - 400 * day;
  daily.beginTurn({ prompt: '更旧的提问' });
  dailyTime = base;
  assert.equal(daily.maybeDailyPurge().turns, 1);
  assert.equal(daily.turns().total, 0);

  dailyTime = base - 400 * day;
  daily.beginTurn({ prompt: '清理窗口之外的旧提问' });
  dailyTime = base + 3600000;
  assert.equal(daily.maybeDailyPurge(), null);
  assert.equal(daily.turns().total, 1);
  dailyTime = base + 25 * 3600000;
  assert.equal(daily.maybeDailyPurge().turns, 1);
  assert.equal(daily.turns().total, 0);
});

test('teacher purge endpoint deletes expired rows', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  await f.chat(await f.student(state.code));
  assert.equal(f.usageRows().length, 1);
  f.advance(366 * 86400000);
  const admin = (await f.req('/api/admin/login', { password: 'teacher-test-password' }, '')).cookie;
  const response = await f.req('/api/admin/usage/purge', {}, admin);
  assert.equal(response.status, 200);
  assert.equal(response.body.enabled, true);
  assert.equal(response.body.turns, 1);
  assert.equal(f.usageRows().length, 0);
});

test('store response modes and character limits truncate after redaction', async t => {
  const directory = mkdtempSync(join(tmpdir(), 'usage-limits-test-'));
  const encrypt = value => `enc:${value}`;
  const decrypt = value => value.slice(4);
  const full = createUsageStore({ directory: join(directory, 'full'), encrypt, decrypt, hmacKey: 'k', promptMaxChars: 5, responseMaxChars: 10 });
  const summary = createUsageStore({ directory: join(directory, 'summary'), encrypt, decrypt, hmacKey: 'k', storeResponse: 'summary' });
  const none = createUsageStore({ directory: join(directory, 'none'), encrypt, decrypt, hmacKey: 'k', storeResponse: 'none' });
  t.after(() => {
    full.close(); summary.close(); none.close();
    rmSync(directory, { recursive: true, force: true });
  });
  const fullId = full.beginTurn({ prompt: 'abcdefgh' });
  full.finishTurn(fullId, { status: 'ok', responseText: '0123456789abcdef' });
  const fullTurn = full.turn(fullId);
  assert.equal(fullTurn.prompt, 'abcde');
  assert.equal(fullTurn.response, '0123456789');

  const summaryId = summary.beginTurn({ prompt: '提问' });
  summary.finishTurn(summaryId, { status: 'ok', responseText: '好'.repeat(300) });
  assert.equal(Array.from(summary.turn(summaryId).response).length, 200);

  const noneId = none.beginTurn({ prompt: '提问' });
  none.finishTurn(noneId, { status: 'ok', responseText: '不保存的回答' });
  assert.equal(none.turn(noneId).response, '');
  const db = new DatabaseSync(join(directory, 'none', 'usage.sqlite'));
  try {
    assert.equal(db.prepare('SELECT response_enc FROM turns WHERE id=?').get(noneId).response_enc, null);
  } finally { db.close(); }
});

test('a throwing usage store never interrupts the student stream', async t => {
  let started = 0;
  const store = {
    startLesson: () => { started++; return 1; },
    rotateLesson: () => 1,
    endLesson: () => 1,
    currentLessonId: () => 1,
    pseudonymFor: () => 'abc12345',
    conversationHash: () => 'hash',
    beginTurn: () => { throw new Error('begin failed'); },
    finishTurn: () => { throw new Error('finish failed'); },
    close: () => {},
  };
  const f = await fixture(t, { usageStoreFactory: () => store });
  const state = await f.start(5);
  assert.equal(started, 1);
  const cookie = await f.student(state.code);
  const response = await quiet(() => f.chat(cookie));
  assert.equal(response.status, 200);
  assert.match(response.body, /你好/);
});

test('chat still succeeds while usage.sqlite is exclusively locked', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  const cookie = await f.student(state.code);
  const lock = new DatabaseSync(join(f.directory, 'usage.sqlite'));
  lock.exec('BEGIN EXCLUSIVE');
  try {
    const response = await quiet(() => f.chat(cookie));
    assert.equal(response.status, 200);
    assert.match(response.body, /你好/);
  } finally {
    lock.exec('ROLLBACK');
    lock.close();
  }
  assert.equal(f.usageRows().length, 0);
});

test('the usage page is served by the gateway with the admin CSP', async t => {
  const f = await fixture(t);
  const page = await f.req('/classroom-usage', undefined, '', '');
  assert.equal(page.status, 200);
  assert.match(page.headers.get('content-security-policy'), /default-src 'self'/);
  assert.match(page.body, /使用分析/);
  assert.match(page.body, /投屏模式/);
  assert.match(page.body, /立即清理过期记录/);
  assert.match(page.body, /知识点来自提问关键词/);
  assert.doesNotMatch(page.body, /<script(?![^>]*\bsrc=)/i);
  const script = await f.req('/classroom-usage.js', undefined, '', '');
  assert.equal(script.status, 200);
  assert.match(script.headers.get('content-type'), /text\/javascript/);
  assert.equal(script.body.includes('innerHTML'), false);
  const adminPage = await f.req('/classroom-admin', undefined, '', '');
  assert.match(adminPage.body, /href="\/classroom-usage"/);
});
