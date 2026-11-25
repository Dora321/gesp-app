export const CODING_DRAFTS_KEY = 'gesp_coding_drafts_v1';
export const MAX_CODING_DRAFT_LENGTH = 16000;

const MAX_DRAFTS = 60;
const MAX_STORE_LENGTH = 500_000;
const isKey = key => typeof key === 'string' && key.length > 0 && key.length <= 160;
const isStore = value => value && typeof value === 'object' && !Array.isArray(value);
const isDraft = draft => isStore(draft)
  && typeof draft.code === 'string' && draft.code.length > 0 && draft.code.length <= MAX_CODING_DRAFT_LENGTH
  && Number.isSafeInteger(draft.updatedAt) && draft.updatedAt >= 0;

const entriesOf = value => isStore(value) ? Object.entries(value)
  .filter(([key, draft]) => isKey(key) && isDraft(draft))
  .map(([key, { code, updatedAt }]) => [key, { code, updatedAt }]) : [];

function readStore(storage) {
  const raw = storage?.getItem(CODING_DRAFTS_KEY);
  if (!raw || raw.length > MAX_STORE_LENGTH) return {};
  return Object.fromEntries(entriesOf(JSON.parse(raw)).slice(0, MAX_DRAFTS));
}

export function readAllCodingDrafts(storage) {
  try {
    return readStore(storage ?? globalThis.localStorage);
  } catch {
    return {};
  }
}

export function readCodingDraft(problemKey, storage) {
  if (!isKey(problemKey)) return '';
  const drafts = readAllCodingDrafts(storage);
  return Object.hasOwn(drafts, problemKey) ? drafts[problemKey].code : '';
}

function writeStore(problemKey, draft, storage) {
  if (!isKey(problemKey)) return false;
  try {
    const target = storage ?? globalThis.localStorage;
    if (!target) return false;
    let drafts;
    try { drafts = readStore(target); } catch { drafts = {}; }
    delete drafts[problemKey];
    const next = draft ? { ...drafts, [problemKey]: draft } : drafts;
    const json = JSON.stringify(next);
    if (Object.keys(next).length > MAX_DRAFTS || json.length > MAX_STORE_LENGTH) return false;
    target.setItem(CODING_DRAFTS_KEY, json);
    return true;
  } catch {
    return false;
  }
}

export function saveCodingDraft(problemKey, code, storage, updatedAt = Date.now()) {
  if (code === '') return clearCodingDraft(problemKey, storage);
  const draft = { code, updatedAt };
  return isDraft(draft) && writeStore(problemKey, draft, storage);
}

export function clearCodingDraft(problemKey, storage) {
  return writeStore(problemKey, null, storage);
}

// 供备份导入使用。取较新的版本，时间相同时保留本机版本。
export function mergeCodingDrafts(current, incoming) {
  const merged = new Map(entriesOf(current));
  for (const [key, draft] of entriesOf(incoming)) {
    if (draft.updatedAt > (merged.get(key)?.updatedAt ?? -1)) merged.set(key, draft);
  }
  const ranked = [...merged].sort((a, b) => b[1].updatedAt - a[1].updatedAt);
  const result = [];
  let size = 2;
  for (const [key, draft] of ranked) {
    const entryLength = JSON.stringify(key).length + JSON.stringify(draft).length + 2;
    if (size + entryLength > MAX_STORE_LENGTH) continue;
    result.push([key, draft]);
    size += entryLength;
    if (result.length === MAX_DRAFTS) break;
  }
  return Object.fromEntries(result);
}
