import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createClassroomServer } from '../../server/classroom.mjs';

async function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'classroom-test-'));
  let time = Date.now();
  const calls = [];
  let fail = false;
  let blocking = false;
  const options = { directory, adminPassword: 'teacher-test-password', secure: false, now: () => time, fetchAI: async (url, init) => {
    calls.push({ url, ...init });
    if (fail) return new Response('SECRET upstream error', { status: 500 });
    if (blocking) return new Response(new ReadableStream({ start(controller) {
      controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"开始"}}]}\n\n'));
      init.signal.addEventListener('abort', () => controller.close(), { once: true });
    } }));
    return new Response('data: {"choices":[{"delta":{"content":"你好"}}]}\n\ndata: [DONE]\n\n', { headers: { 'Content-Type': 'text/event-stream' } });
  } };
  let server = createClassroomServer(options);
  let base;
  async function listen() { server.listen(0, '127.0.0.1'); await once(server, 'listening'); base = `http://127.0.0.1:${server.address().port}`; }
  await listen();
  t.after(async () => { await new Promise(resolve => server.close(resolve)); rmSync(directory, { recursive: true, force: true }); });
  async function req(path, data, cookie = '', origin = base) {
    const res = await fetch(base + path, { ...(data === undefined ? {} : { method: 'POST', body: JSON.stringify(data) }), headers: { Origin: origin, 'Content-Type': 'application/json', Cookie: cookie } });
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
  assert.equal(f.calls[0].headers.Authorization, 'Bearer sk-classroom-secret-test');
  assert.equal(JSON.parse(f.calls[0].body).max_tokens, 1200);
  assert.equal(readFileSync(join(f.directory, 'classroom.sqlite')).includes(Buffer.from('sk-classroom-secret-test')), false);
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
