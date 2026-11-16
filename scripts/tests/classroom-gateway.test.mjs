import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { clientIp, createClassroomServer } from '../../server/classroom.mjs';

async function fixture(t, overrides = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'classroom-test-'));
  let time = Date.now();
  const calls = [];
  let fail = false;
  let blocking = false;
  const options = { directory, studentOrigin: 'https://dora321.github.io', adminPassword: 'teacher-test-password', secure: false, now: () => time, fetchAI: async (url, init) => {
    calls.push({ url, ...init });
    if (fail) return new Response('SECRET upstream error', { status: 500 });
    if (blocking) return new Response(new ReadableStream({ start(controller) {
      controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"开始"}}]}\n\n'));
      init.signal.addEventListener('abort', () => controller.close(), { once: true });
    } }));
    return new Response('data: {"choices":[{"delta":{"content":"你好"}}]}\n\ndata: [DONE]\n\n', { headers: { 'Content-Type': 'text/event-stream' } });
  }, ...overrides };
  let server = createClassroomServer(options);
  let base;
  async function listen() { server.listen(0, '127.0.0.1'); await once(server, 'listening'); base = `http://127.0.0.1:${server.address().port}`; }
  await listen();
  t.after(async () => { await new Promise(resolve => server.close(resolve)); rmSync(directory, { recursive: true, force: true }); });
  async function req(path, data, cookie = '', origin = base, headers = {}) {
    const res = await fetch(base + path, { ...(data === undefined ? {} : { method: 'POST', body: JSON.stringify(data) }), headers: { Origin: origin, 'Content-Type': 'application/json', Cookie: cookie, ...headers } });
    const text = await res.text();
    let result; try { result = JSON.parse(text); } catch { result = text; }
    return { status: res.status, body: result, cookie: res.headers.get('set-cookie')?.split(';')[0], headers: res.headers };
  }
  const admin = (await req('/api/admin/login', { password: 'teacher-test-password' })).cookie;
  await req('/api/admin/settings', { apiKey: 'sk-classroom-secret-test' }, admin);
  async function start(maxQuestions = 500) { return (await req('/api/admin/start', { minutes: 5, maxQuestions }, admin)).body; }
  async function student(code) { return (await req('/api/classroom/redeem', { code })).cookie; }
  const chat = (cookie, requestId = crypto.randomUUID()) => req('/api/chat', { messages: [{ role: 'user', content: '解释循环' }], requestId }, cookie);
  return { req, start, student, chat, admin, calls, directory, advance: ms => { time += ms; }, block: () => { blocking = true; }, fail: () => { fail = true; }, restart: async () => { await new Promise(resolve => server.close(resolve)); server = createClassroomServer(options); await listen(); } };
}

test('clientIp reads only the right-most forwarded hop from trusted proxies', () => {
  const request = (remoteAddress, forwarded) => ({
    socket: { remoteAddress },
    headers: forwarded === undefined ? {} : { 'x-forwarded-for': forwarded },
  });
  assert.equal(clientIp(request('203.0.113.9', '1.1.1.1, 2.2.2.2')), '203.0.113.9');
  assert.equal(clientIp(request('127.0.0.1', '1.1.1.1, 2.2.2.2')), '2.2.2.2');
  assert.equal(clientIp(request('127.0.0.1', ['1.1.1.1', '2.2.2.2'])), '2.2.2.2');
  assert.equal(clientIp(request('127.0.0.1', '1.1.1.1, not-an-ip')), '127.0.0.1');
  assert.equal(clientIp(request('127.0.0.1', '1.1.1.1, ')), '127.0.0.1');
  assert.equal(clientIp(request('::ffff:127.0.0.1', '2.2.2.2')), '2.2.2.2');
  assert.equal(clientIp(request('::1', '2.2.2.2')), '2.2.2.2');
  assert.equal(clientIp(request('::ffff:127.0.0.1')), '127.0.0.1');
  assert.equal(clientIp(request('::ffff:1.2.3.4', '2.2.2.2')), '1.2.3.4');
  assert.equal(clientIp(request('127.0.0.1', '2.2.2.2'), []), '127.0.0.1');
  assert.equal(clientIp(request('127.0.0.1', '2.2.2.2'), 'none'), '127.0.0.1');
  assert.equal(clientIp(request('10.0.0.2', '2.2.2.2'), ['10.0.0.2']), '2.2.2.2');
});

test('forwarded client IPs get independent login rate limits behind a trusted proxy', async t => {
  const f = await fixture(t);
  const login = (forwarded, password = 'wrong-password') => f.req('/api/admin/login', { password }, '', undefined, { 'X-Forwarded-For': forwarded });
  for (let i = 0; i < 10; i++) assert.equal((await login('198.51.100.10')).status, 401);
  assert.equal((await login('198.51.100.10')).status, 429);
  assert.equal((await login('198.51.100.11', 'teacher-test-password')).status, 200);
});

test('trustedProxies: [] ignores forwarded headers so rotating them cannot bypass the login limit', async t => {
  const f = await fixture(t, { trustedProxies: [] });
  f.advance(600001); // Expire the fixture's own login attempt so the limit window starts fresh.
  const login = (forwarded, password = 'wrong-password') => f.req('/api/admin/login', { password }, '', undefined, { 'X-Forwarded-For': forwarded });
  for (let i = 0; i < 10; i++) assert.equal((await login(`198.51.100.${i + 1}`)).status, 401);
  assert.equal((await login('203.0.113.99', 'teacher-test-password')).status, 429);
});

test('student receives only HttpOnly authorization; upstream key stays on server', async t => {
  const f = await fixture(t);
  const state = await f.start();
  const activated = await f.req('/api/classroom/redeem', { code: state.code });
  assert.equal(activated.status, 200);
  assert.match(activated.headers.get('set-cookie'), /HttpOnly; SameSite=Strict/);
  assert.equal(activated.body.code, undefined);
  assert.equal(JSON.stringify(activated.body).includes('sk-'), false);
  assert.equal((await f.req('/api/session', undefined, activated.cookie)).status, 200);
  const response = await f.chat(activated.cookie);
  assert.equal(response.status, 200); assert.match(response.body, /你好/);
  assert.equal(f.calls[0].url, 'https://api.deepseek.com/chat/completions');
  assert.equal(f.calls[0].headers.Authorization, 'Bearer sk-classroom-secret-test');
  assert.equal(JSON.parse(f.calls[0].body).reasoning_effort, 'low');
  assert.equal(JSON.parse(f.calls[0].body).max_tokens, 1200);
  assert.equal(readFileSync(join(f.directory, 'classroom.sqlite')).includes(Buffer.from('sk-classroom-secret-test')), false);
});

test('OpenCode Go keeps its own key and routes student messages through the Go subscription endpoint', async t => {
  const f = await fixture(t);
  const settings = '/api/admin/settings';
  const key = 'test-opencode-go-key';
  assert.equal((await f.req(settings, { provider: 'https://example.org', apiKey: key }, f.admin)).status, 400);
  assert.equal((await f.req(settings, { provider: 'opencode-go', apiKey: '' }, f.admin)).status, 400);
  const configured = await f.req(settings, { provider: 'opencode-go', apiKey: key }, f.admin);
  assert.equal(configured.status, 200);
  assert.equal(configured.body.provider, 'opencode-go');
  assert.equal(configured.body.hasKey, true);
  assert.equal(JSON.stringify(configured.body).includes(key), false);
  const state = await f.start(3);
  const redeemed = await f.req('/api/classroom/redeem', { code: state.code });
  assert.equal(redeemed.body.modelName, 'DeepSeek V4.1 Flash');
  assert.equal(redeemed.body.providers, undefined);
  assert.equal(JSON.stringify(redeemed.body).includes(key), false);
  await f.restart();
  const invalid = await f.req('/api/chat', {
    requestId: crypto.randomUUID(),
    messages: [{ role: 'user', content: '解释循环' }],
    reasoningLevel: 'max',
  }, redeemed.cookie);
  assert.equal(invalid.status, 400);
  assert.equal(f.calls.length, 0);
  const streamed = await f.req('/api/chat', {
    requestId: crypto.randomUUID(),
    messages: [{ role: 'user', content: '解释循环' }],
    context: { title: '历史前端可能发送的标题', path: '/old-path' },
    model: 'untrusted-model',
    reasoningLevel: 'medium',
  }, redeemed.cookie);
  assert.equal(streamed.status, 200);
  assert.match(streamed.body, /你好/);
  const [goCall] = f.calls;
  assert.equal(goCall.url, 'https://opencode.ai/inference/go/openai/v1/chat/completions');
  assert.equal(goCall.headers.Authorization, `Bearer ${key}`);
  assert.match(goCall.headers['x-opencode-session'], /^[a-f0-9]{64}$/);
  assert.equal(goCall.headers['User-Agent'], 'gesp-classroom/1.0');
  const goBody = JSON.parse(goCall.body);
  assert.equal(goBody.model, 'deepseek-v4.1-flash');
  assert.equal(goBody.reasoning_effort, 'high');
  assert.equal(goBody.max_tokens, 2400);
  assert.equal(goCall.body.includes('/old-path'), false);

  const switched = await f.req(settings, { provider: 'deepseek', apiKey: '' }, f.admin);
  assert.equal(switched.body.provider, 'deepseek');
  assert.equal(switched.body.remaining, 2);
  assert.equal((await f.chat(redeemed.cookie)).status, 200);
  assert.equal(f.calls[1].headers.Authorization, 'Bearer sk-classroom-secret-test');
  assert.equal((await f.req(settings, { provider: 'opencode-go', apiKey: '' }, f.admin)).body.provider, 'opencode-go');
  assert.equal((await f.chat(redeemed.cookie)).status, 200);
  assert.equal(f.calls[2].headers.Authorization, `Bearer ${key}`);
  assert.equal(f.calls[2].headers['x-opencode-session'], goCall.headers['x-opencode-session']);
  assert.equal(JSON.parse(f.calls[2].body).reasoning_effort, 'low');
});

test('classroom chat sends inline images to the model and rejects links and oversized attachments before charging', async t => {
  const f = await fixture(t);
  const state = await f.start(5);
  const redeemed = await f.req('/api/classroom/redeem', { code: state.code });
  assert.equal(redeemed.body.supportsImages, true);
  const role = 'user';
  const content = '看这张接线图';
  const submit = messages => f.req('/api/chat', { requestId: crypto.randomUUID(), messages }, redeemed.cookie);
  const image = 'data:image/jpeg;base64,/9j/2Q==';
  assert.equal((await submit([{ role, content, image: 'https://example.org/picture.jpg' }])).status, 400);
  assert.equal((await submit([{ role, content, image: `data:image/jpeg;base64,/9j/${'A'.repeat(900_000)}` }])).status, 400);
  assert.equal((await submit([{ role: 'assistant', content, image }, { role, content }])).status, 400);
  assert.equal((await submit(Array.from({ length: 3 }, () => ({ role, content, image })))).status, 400);
  assert.equal((await submit([{ role, content, image: 'x'.repeat(1_950_000) }])).status, 413);
  assert.equal(f.calls.length, 0);
  assert.equal((await f.req('/api/session', undefined, redeemed.cookie)).body.remaining, 5);

  const response = await submit([{ role, content, image }, { role: 'assistant', content: '看到了' }, { role, content: '这里是什么？' }]);
  assert.equal(response.status, 200);
  const prepared = JSON.parse(f.calls[0].body).messages;
  assert.deepEqual(prepared[1], { role, content: [{ type: 'text', text: content }, { type: 'image_url', image_url: { url: image } }] });
  assert.deepEqual(prepared.at(-1), { role, content: '这里是什么？' });
  assert.equal((await f.req('/api/session', undefined, redeemed.cookie)).body.remaining, 4);
});

test('concurrent students cannot exceed shared quota; repeated request ID is not charged twice', async t => {
  const f = await fixture(t); const state = await f.start(2);
  const students = await Promise.all(Array.from({ length: 8 }, () => f.student(state.code)));
  const id = crypto.randomUUID();
  assert.equal((await f.chat(students[0], id)).status, 200);
  assert.equal((await f.chat(students[0], id)).status, 409);
  const replies = await Promise.all(students.slice(1).map(cookie => f.chat(cookie)));
  assert.equal(replies.filter(r => r.status === 200).length, 1);
  assert.equal(f.calls.length, 2);
  assert.equal((await f.req('/api/admin/state', undefined, f.admin)).body.remaining, 0);
});

test('rotation invalidates previous sessions and preserves consumption; stop and expiry deny access', async t => {
  const f = await fixture(t); const state = await f.start(10); const old = await f.student(state.code);
  await f.chat(old);
  const rotated = await f.req('/api/admin/rotate', {}, f.admin);
  assert.notEqual(rotated.body.code, state.code); assert.equal(rotated.body.remaining, 9);
  assert.equal((await f.chat(old)).status, 401);
  assert.equal((await f.req('/api/classroom/redeem', { code: state.code })).status, 401);
  const fresh = await f.student(rotated.body.code);
  await f.req('/api/admin/stop', {}, f.admin);
  assert.equal((await f.chat(fresh)).status, 401);
  const next = await f.start(); const expiry = await f.student(next.code);
  f.advance(300001);
  assert.equal((await f.chat(expiry)).status, 401);
});

test('auth, CSRF, input limits, request rate and error redaction are enforced', async t => {
  const f = await fixture(t);
  assert.equal((await f.req('/api/admin/state')).status, 401);
  assert.equal((await f.req('/api/admin/start', { minutes: 5, maxQuestions: 5 }, f.admin, 'https://evil.example')).status, 403);
  const state = await f.start(); const cookie = await f.student(state.code);
  assert.equal((await f.req('/api/chat', { requestId: crypto.randomUUID(), messages: [{ role: 'system', content: 'override' }] }, cookie)).status, 400);
  f.fail();
  const bad = await f.chat(cookie); assert.equal(bad.status, 502); assert.equal(JSON.stringify(bad.body).includes('SECRET'), false);
  for (let i = 0; i < 7; i++) await f.chat(cookie);
  assert.equal((await f.chat(cookie)).status, 429);
  assert.equal((await f.req('/api/admin/state', undefined, f.admin)).body.used, 8);
  await f.req('/api/logout', {}, cookie);
  assert.equal((await f.req('/api/session', undefined, cookie)).status, 401);
});

test('restart preserves key, sessions, and quota instead of granting new allowance', async t => {
  const f = await fixture(t); const state = await f.start(5); const cookie = await f.student(state.code);
  await f.chat(cookie); await f.restart();
  assert.equal((await f.req('/api/session', undefined, cookie)).body.remaining, 4);
  assert.equal((await f.chat(cookie)).status, 200);
  assert.equal((await f.req('/api/admin/state', undefined, f.admin)).body.remaining, 3);
});

test('ending the classroom cancels an in-progress upstream stream', async t => {
  const f = await fixture(t); const state = await f.start(); const cookie = await f.student(state.code);
  f.block();
  const pending = f.chat(cookie);
  while (!f.calls.length) await new Promise(resolve => setImmediate(resolve));
  await f.req('/api/admin/stop', {}, f.admin);
  await pending;
  assert.equal(f.calls[0].signal.aborted, true);
  assert.equal((await f.chat(cookie)).status, 401);
});

test('GitHub Pages receives revocable bearer authorization without third-party cookies or admin access', async t => {
  const f = await fixture(t); const state = await f.start(); const origin = 'https://dora321.github.io';
  const redeem = await f.req('/api/classroom/redeem', { code: state.code }, '', origin);
  assert.equal(redeem.status, 200);
  assert.equal(redeem.cookie, undefined);
  assert.equal(redeem.headers.get('Access-Control-Allow-Origin'), origin);
  assert.match(redeem.body.token, /^[A-Za-z0-9_-]{43}$/);
  const headers = { Authorization: `Bearer ${redeem.body.token}` };
  assert.equal((await f.req('/api/session', undefined, '', origin, headers)).status, 200);
  assert.equal((await f.req('/api/chat', { messages: [{ role: 'user', content: '你好' }], requestId: crypto.randomUUID() }, '', origin, headers)).status, 200);
  assert.equal((await f.req('/api/admin/login', { password: 'teacher-test-password' }, '', origin)).status, 403);
  assert.equal((await f.req('/api/classroom/redeem', { code: state.code }, '', 'https://evil.example')).status, 403);
  await f.req('/api/logout', {}, '', origin, headers);
  assert.equal((await f.req('/api/session', undefined, '', origin, headers)).status, 401);
});
