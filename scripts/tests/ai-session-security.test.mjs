import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../../src/components/AIChatWidget.jsx', import.meta.url), 'utf8');

test('DeepSeek API key is session-scoped and legacy persistent copies are removed', () => {
  assert.match(source, /sessionStorage\.getItem\(API_KEY_STORAGE_KEY\)/);
  assert.match(source, /sessionStorage\.setItem\(API_KEY_STORAGE_KEY, nextApiKey\)/);
  assert.match(source, /sessionStorage\.removeItem\(API_KEY_STORAGE_KEY\)/);
  assert.match(source, /localStorage\.removeItem\(API_KEY_STORAGE_KEY\)/);
  assert.doesNotMatch(source, /localStorage\.(?:getItem|setItem)\(['"]deepseek_api_key['"]/);
});

test('API key settings explain data handling and expose an explicit clear action', () => {
  assert.match(source, /关闭标签页后清除/);
  assert.match(source, /由浏览器直接发送至 DeepSeek API/);
  assert.match(source, /本网站服务器不接收或保存/);
  assert.match(source, /onClick=\{clearApiKey\}/);
  assert.match(source, /htmlFor="deepseek-api-key"/);
});
