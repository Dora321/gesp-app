import test from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, getRouteSeo, normalizePathname } from '../../src/seo/routeMeta.js';

test('question paper routes receive unique paper metadata', () => {
  const seo = getRouteSeo('/question-bank/2/2026-03-l2');
  assert.match(seo.fullTitle, /2026年3月 GESP C\+\+ 2级真题/);
  assert.equal(seo.canonicalUrl, 'https://Dora321.github.io/gesp-app/question-bank/2/2026-03-l2/');
});

test('course and hardware routes receive route-specific metadata', () => {
  assert.match(getRouteSeo('/level7').fullTitle, /7级知识体系/);
  assert.match(getRouteSeo('/hardware/esp32-curriculum').fullTitle, /ESP32 MicroPython 高阶科创/);
  assert.match(getRouteSeo('/hardware/arduino').fullTitle, /Arduino UNO 零基础课程/);
  assert.match(getRouteSeo('/hardware/arduino/16').fullTitle, /智能垃圾桶/);
  assert.match(getRouteSeo('/innovation-foundation').fullTitle, /初阶科创/);
});

// GitHub Pages 把 /question-bank 301 到 /question-bank/，直达页面拿到的 pathname 带斜杠。
test('trailing-slash pathnames resolve to the same route metadata', () => {
  for (const route of ['/question-bank', '/question-bank/4/2025-12-l4', '/lesson/1/5', '/level1', '/museum', '/hardware/arduino/16']) {
    const plain = getRouteSeo(route);
    const slashed = getRouteSeo(`${route}/`);
    assert.equal(slashed.fullTitle, plain.fullTitle, route);
    assert.notEqual(plain.title, 'GESP 编程备考与编程课堂', `${route} should not fall back to the default title`);
    assert.equal(slashed.canonicalUrl, plain.canonicalUrl, route);
  }
});

test('public URLs use the trailing-slash form GitHub Pages serves with 200', () => {
  assert.equal(normalizePathname('/question-bank/'), '/question-bank');
  assert.equal(normalizePathname('/lesson/1/5//'), '/lesson/1/5');
  assert.equal(normalizePathname('/'), '/');
  assert.equal(normalizePathname(''), '/');
  assert.equal(absoluteUrl('/'), 'https://Dora321.github.io/gesp-app/');
  assert.equal(absoluteUrl('/question-bank'), 'https://Dora321.github.io/gesp-app/question-bank/');
  assert.equal(getRouteSeo('/').canonicalUrl, 'https://Dora321.github.io/gesp-app/');
});
