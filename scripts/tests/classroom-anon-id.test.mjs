import test from 'node:test';
import assert from 'node:assert/strict';
import { ANON_ID_STORAGE_KEY, classroomAnonId } from '../../src/utils/classroomAnon.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function useLocalStorage(storage) {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, writable: true, value: storage });
  return () => {
    if (original) Object.defineProperty(globalThis, 'localStorage', original);
    else delete globalThis.localStorage;
  };
}

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => { values.set(key, String(value)); },
    removeItem: key => { values.delete(key); },
    values,
  };
}

test('classroomAnonId persists a UUID and replaces invalid values', t => {
  const storage = memoryStorage();
  t.after(useLocalStorage(storage));

  const first = classroomAnonId();
  assert.match(first, UUID);
  assert.equal(storage.getItem(ANON_ID_STORAGE_KEY), first);
  assert.equal(classroomAnonId(), first);

  storage.setItem(ANON_ID_STORAGE_KEY, 'not-a-uuid');
  const second = classroomAnonId();
  assert.match(second, UUID);
  assert.notEqual(second, 'not-a-uuid');
  assert.equal(storage.getItem(ANON_ID_STORAGE_KEY), second);

  storage.setItem(ANON_ID_STORAGE_KEY, '123e4567-e89b-42d3-a456-426614174000');
  assert.equal(classroomAnonId(), '123e4567-e89b-42d3-a456-426614174000');
});

test('classroomAnonId falls back to memory when localStorage is unavailable', t => {
  const storage = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
    removeItem() { throw new Error('blocked'); },
  };
  t.after(useLocalStorage(storage));

  const first = classroomAnonId();
  const second = classroomAnonId();
  assert.match(first, UUID);
  assert.equal(second, first);
});
