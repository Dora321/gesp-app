import assert from 'node:assert/strict';
import test from 'node:test';
import { ASSISTANT_KEY, loadAssistantKey, saveAssistantKey, buildClassroomPrompt } from '../../src/utils/classroomAssistant.js';
const storage = () => { const data = new Map(); return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) }; };
function setup() { globalThis.localStorage = storage(); globalThis.sessionStorage = storage(); }
test('keys persist automatically after one entry and load in later sessions', () => {
  setup(); assert.deepEqual(loadAssistantKey(), { key: '' });
  assert.ok(saveAssistantKey(' test-key '));
  assert.equal(localStorage.getItem(ASSISTANT_KEY), 'test-key');
  assert.equal(sessionStorage.getItem(ASSISTANT_KEY), null);
  globalThis.sessionStorage = storage();
  assert.deepEqual(loadAssistantKey(), { key: 'test-key' });
});

test('saving replaces a temporary key with persistent storage', () => {
  setup(); sessionStorage.setItem(ASSISTANT_KEY, 'temporary');
  assert.equal(loadAssistantKey().key, 'temporary');
  assert.ok(saveAssistantKey('persistent'));
  assert.equal(sessionStorage.getItem(ASSISTANT_KEY), null);
  assert.equal(loadAssistantKey().key, 'persistent');
});

test('blocked storage does not lose the previous key or claim a successful save', () => {
  setup(); localStorage.setItem(ASSISTANT_KEY, 'previous'); localStorage.setItem = () => { throw new Error('blocked'); };
  assert.equal(saveAssistantKey('new'), false); assert.equal(loadAssistantKey().key, 'previous');
});

test('classroom guidance stays present for custom roles and context is optional', () => {
  const prompt = buildClassroomPrompt('使用简短语言', { title: '列表', path: '/python/f3', answers: 'private-answer', token: 'private-key' });
  assert.ok(prompt.includes('一个提示') && prompt.includes('/python/f3'));
  assert.ok(!prompt.includes('private-answer') && !prompt.includes('private-key'));
  assert.ok(!buildClassroomPrompt('使用简短语言', null).includes('/python/f3'));
});
