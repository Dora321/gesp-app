import test from 'node:test';
import assert from 'node:assert/strict';
import { getRouteSeo } from '../../src/seo/routeMeta.js';

test('question paper routes receive unique paper metadata', () => {
  const seo = getRouteSeo('/question-bank/2/2026-03-l2');
  assert.match(seo.fullTitle, /2026年3月 GESP C\+\+ 2级真题/);
  assert.equal(seo.canonicalUrl, 'https://Dora321.github.io/gesp-app/question-bank/2/2026-03-l2');
});

test('course and hardware routes receive route-specific metadata', () => {
  assert.match(getRouteSeo('/level7').fullTitle, /7级知识体系/);
  assert.match(getRouteSeo('/hardware/esp32-ai').fullTitle, /ESP32 × MicroPython × AI/);
});
