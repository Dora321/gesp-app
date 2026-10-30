import assert from 'node:assert/strict';
import test from 'node:test';
import {
  truncateChatHistory,
  isHistoryNearLimit,
  mapCatchErrorMessage,
  mapHttpErrorMessage,
  MAX_HISTORY_MESSAGES,
  HISTORY_WARN_MESSAGES,
} from '../../src/utils/aiChatHelpers.js';

test('truncateChatHistory keeps the most recent messages within the cap', () => {
  const msgs = Array.from({ length: MAX_HISTORY_MESSAGES + 6 }, (_, i) => ({
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: `m${i}`,
  }));
  const truncated = truncateChatHistory(msgs);
  assert.ok(truncated.length <= MAX_HISTORY_MESSAGES);
  assert.equal(truncated.at(-1).content, msgs.at(-1).content);
  assert.equal(truncated[0].role, 'user');
});

test('isHistoryNearLimit trips on message count', () => {
  const msgs = Array.from({ length: HISTORY_WARN_MESSAGES }, (_, i) => ({
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: 'x',
  }));
  assert.equal(isHistoryNearLimit(msgs), true);
  assert.equal(isHistoryNearLimit(msgs.slice(0, 2)), false);
});

test('mapCatchErrorMessage covers network and avoids generic key blame', () => {
  assert.equal(
    mapCatchErrorMessage(Object.assign(new TypeError('Failed to fetch'), { name: 'TypeError' })),
    '网络不通，请检查网络连接后重试。',
  );
  assert.equal(mapCatchErrorMessage({ name: 'AbortError', message: 'aborted' }), null);
  const msg = mapCatchErrorMessage(new Error('密钥无效或已过期，请在设置里重新填写 API Key'));
  assert.match(msg, /密钥无效/);
  assert.doesNotMatch(msg, /请检查 API Key 是否正确/);
});

test('mapHttpErrorMessage maps common status codes', async () => {
  const fake = (status, body = '') => ({
    status,
    text: async () => body,
  });
  assert.match(await mapHttpErrorMessage(fake(401)), /密钥无效/);
  assert.match(await mapHttpErrorMessage(fake(402)), /余额不足/);
  assert.match(await mapHttpErrorMessage(fake(429)), /太频繁/);
  assert.match(await mapHttpErrorMessage(fake(503)), /服务暂时异常/);
  assert.match(await mapHttpErrorMessage(fake(418, '{"error":{"message":"teapot"}}')), /418/);
});
