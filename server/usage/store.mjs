import { createHmac } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { CLASSIFIER_VERSION, PROMPT_TYPE_LABELS, classifyPrompt, knowledgeTags } from './classify.mjs';
import { redact } from './redact.mjs';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ERRORS = new Set(['upstream_auth', 'upstream_unavailable', 'upstream_stream', 'aborted', 'timeout', 'internal']);
const STATUSES = new Set(['pending', 'ok', 'aborted', 'error']);
const TYPES = Object.keys(PROMPT_TYPE_LABELS);

const parseJson = value => {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};
const integer = (value, fallback = null) => {
  if (value === null || value === undefined || value === '') return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
};
const estimateTokens = value => {
  const length = value ? Array.from(value).length : 0;
  return length ? Math.max(1, Math.ceil(length / 2)) : 0;
};
const timezoneOffset = value => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(-840, Math.min(840, Math.trunc(number))) : 0;
};
const bucketStart = (timestamp, granularity, tz = 0) => {
  const zone = timezoneOffset(tz) * 60000;
  const shifted = timestamp + zone;
  if (granularity === 'week') {
    const date = new Date(shifted);
    const offset = (date.getUTCDay() + 6) % 7;
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - offset) - zone;
  }
  return Math.floor(shifted / 86400000) * 86400000 - zone;
};
const periodOf = (timestamp, tz = 0) => new Date(timestamp + timezoneOffset(tz) * 60000).toISOString().slice(0, 10);

export function createUsageStore({
  directory,
  encrypt,
  decrypt,
  hmacKey,
  now = Date.now,
  retentionDays = 365,
  responseMaxChars = 8000,
  promptMaxChars = 4000,
  storeResponse = 'full',
} = {}) {
  if (typeof encrypt !== 'function' || typeof decrypt !== 'function') throw new Error('缺少加密函数。');
  if (!hmacKey) throw new Error('缺少 usageHmacKey。');
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(resolve(directory, 'usage.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL;
    PRAGMA busy_timeout=0;
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      generation INTEGER,
      started_at INTEGER,
      ended_at INTEGER,
      max_questions INTEGER,
      provider TEXT,
      model TEXT
    );
    CREATE TABLE IF NOT EXISTS lesson_generations (
      generation INTEGER PRIMARY KEY,
      lesson_id INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS turns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at INTEGER NOT NULL,
      lesson_id INTEGER,
      generation INTEGER,
      pseudonym TEXT,
      conversation_hash TEXT,
      turn_index INTEGER,
      knowledge_tags TEXT,
      prompt_enc TEXT,
      response_enc TEXT,
      has_image INTEGER,
      persona_id TEXT,
      reasoning_level TEXT,
      provider TEXT,
      model TEXT,
      prompt_tokens INTEGER,
      completion_tokens INTEGER,
      tokens_estimated INTEGER,
      latency_ms INTEGER,
      status TEXT,
      error_class TEXT,
      prompt_type TEXT,
      classifier TEXT,
      redaction_flags TEXT
    );
    CREATE INDEX IF NOT EXISTS turns_created_at_idx ON turns(created_at);
    CREATE INDEX IF NOT EXISTS turns_lesson_id_idx ON turns(lesson_id);
    CREATE INDEX IF NOT EXISTS turns_pseudonym_idx ON turns(pseudonym);`);

  const retention = Number.isFinite(Number(retentionDays)) && Number(retentionDays) >= 0 ? Math.floor(Number(retentionDays)) : 365;
  const promptLimit = Number.isFinite(Number(promptMaxChars)) && Number(promptMaxChars) > 0 ? Math.floor(Number(promptMaxChars)) : 4000;
  const responseLimit = Number.isFinite(Number(responseMaxChars)) && Number(responseMaxChars) > 0 ? Math.floor(Number(responseMaxChars)) : 8000;
  const responseMode = ['full', 'summary', 'none'].includes(storeResponse) ? storeResponse : 'full';
  const hmac = value => createHmac('sha256', hmacKey).update(String(value)).digest('hex');
  const displayName = pseudonym => `同学-${String(pseudonym || '').slice(0, 4).toUpperCase()}`;
  const pseudonymFor = (anonIdOrNull, sessionHash) => {
    const anonId = typeof anonIdOrNull === 'string' ? anonIdOrNull : '';
    return hmac(UUID.test(anonId) ? `anon:${anonId}` : `session:${typeof sessionHash === 'string' ? sessionHash : ''}`);
  };
  const conversationHash = (sessionOrPseudonym, conversationId) => hmac(`conversation:${sessionOrPseudonym || ''}:${conversationId || ''}`);
  const currentLessonId = generation => {
    const value = integer(generation);
    if (value === null) return null;
    const row = db.prepare('SELECT lesson_id FROM lesson_generations WHERE generation=?').get(value);
    if (row) return Number(row.lesson_id);
    const fallback = db.prepare('SELECT id FROM lessons WHERE generation=? ORDER BY id DESC LIMIT 1').get(value);
    return fallback ? Number(fallback.id) : null;
  };

  const filters = ({ from, to, lessonId, pseudonym } = {}) => {
    const parts = [];
    const params = [];
    const start = integer(from);
    const end = integer(to);
    const lesson = integer(lessonId);
    if (start !== null) { parts.push('created_at >= ?'); params.push(start); }
    if (end !== null) { parts.push('created_at <= ?'); params.push(end); }
    if (lesson !== null) { parts.push('lesson_id = ?'); params.push(lesson); }
    if (typeof pseudonym === 'string' && pseudonym) { parts.push('pseudonym = ?'); params.push(pseudonym.slice(0, 128)); }
    return { where: parts.length ? ` WHERE ${parts.join(' AND ')}` : '', params };
  };
  const typeRows = counts => TYPES.map(type => {
    const count = counts.get(type) || 0;
    const total = counts.get('__total') || 0;
    return { type, label: PROMPT_TYPE_LABELS[type], count, ratio: total ? count / total : 0 };
  });
  const rowView = row => ({
    id: Number(row.id),
    createdAt: Number(row.created_at),
    lessonId: row.lesson_id === null ? null : Number(row.lesson_id),
    generation: row.generation === null ? null : Number(row.generation),
    pseudonym: row.pseudonym,
    displayName: displayName(row.pseudonym),
    conversationHash: row.conversation_hash,
    turnIndex: row.turn_index,
    knowledgeTags: parseJson(row.knowledge_tags),
    hasImage: Boolean(row.has_image),
    personaId: row.persona_id,
    reasoningLevel: row.reasoning_level,
    provider: row.provider,
    model: row.model,
    promptTokens: row.prompt_tokens,
    completionTokens: row.completion_tokens,
    tokensEstimated: Boolean(row.tokens_estimated),
    latencyMs: row.latency_ms,
    status: row.status,
    errorClass: row.error_class,
    promptType: row.prompt_type,
    promptTypeLabel: PROMPT_TYPE_LABELS[row.prompt_type] || '',
    classifier: row.classifier,
    redactionFlags: parseJson(row.redaction_flags),
  });

  let lastPurge = null;
  let closed = false;

  const startLesson = ({ generation, maxQuestions, provider, model } = {}) => {
    const startedAt = now();
    db.exec('BEGIN IMMEDIATE');
    try {
      // 过期未手动结束的旧场次在这里补上结束时间。
      db.prepare('UPDATE lessons SET ended_at=? WHERE ended_at IS NULL').run(startedAt);
      const info = db.prepare('INSERT INTO lessons(generation,started_at,max_questions,provider,model) VALUES(?,?,?,?,?)')
        .run(integer(generation, 0), startedAt, integer(maxQuestions, 0), provider || null, model || null);
      const id = Number(info.lastInsertRowid);
      const value = integer(generation, 0);
      db.prepare('INSERT OR REPLACE INTO lesson_generations(generation,lesson_id) VALUES(?,?)').run(value, id);
      db.exec('COMMIT');
      return id;
    } catch (e) {
      db.exec('ROLLBACK');
      throw e;
    }
  };

  const rotateLesson = generation => {
    const value = integer(generation);
    const open = db.prepare('SELECT id FROM lessons WHERE ended_at IS NULL ORDER BY id DESC LIMIT 1').get();
    if (!open || value === null) return null;
    const id = Number(open.id);
    db.prepare('INSERT OR REPLACE INTO lesson_generations(generation,lesson_id) VALUES(?,?)').run(value, id);
    db.prepare('UPDATE lessons SET generation=? WHERE id=?').run(value, id);
    return id;
  };

  const endLesson = generation => {
    const id = currentLessonId(generation);
    if (id === null) return 0;
    return Number(db.prepare('UPDATE lessons SET ended_at=COALESCE(ended_at,?) WHERE id=?').run(now(), id).changes);
  };

  const beginTurn = ({ lessonId = null, generation = null, pseudonym = null, anonId = null, sessionHash = null, conversationHash: conversation = null, conversationId = null, turnIndex = 1, prompt, promptText, text, hasImage = false, personaId = null, reasoningLevel = null, provider = null, model = null } = {}) => {
    const original = typeof prompt === 'string' ? prompt : typeof promptText === 'string' ? promptText : typeof text === 'string' ? text : '';
    const person = pseudonym !== null && pseudonym !== undefined
      ? pseudonym
      : (anonId !== null || sessionHash !== null) ? pseudonymFor(anonId, sessionHash) : null;
    // 分类和知识点只使用脱敏前的标签结果，不保存原文。
    const type = classifyPrompt(original, { turnIndex });
    const tags = knowledgeTags(original);
    const redacted = redact(original);
    const conversationValue = conversation || (conversationId ? conversationHash(person, conversationId) : null);
    const info = db.prepare(`INSERT INTO turns (
      created_at, lesson_id, generation, pseudonym, conversation_hash, turn_index, knowledge_tags,
      prompt_enc, response_enc, has_image, persona_id, reasoning_level, provider, model,
      prompt_tokens, completion_tokens, tokens_estimated, latency_ms, status, error_class,
      prompt_type, classifier, redaction_flags
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      now(), integer(lessonId), integer(generation), person || null, conversationValue || null,
      integer(turnIndex, 1), JSON.stringify(tags), encrypt(redacted.text.slice(0, promptLimit)), null,
      hasImage ? 1 : 0, personaId || null, reasoningLevel || null, provider || null, model || null,
      null, null, null, null, 'pending', null, type, CLASSIFIER_VERSION, JSON.stringify(redacted.flags),
    );
    return Number(info.lastInsertRowid);
  };

  const finishTurn = (id, { status = 'ok', responseText, response, errorClass = null, usage = null, latencyMs = null } = {}) => {
    const turnId = integer(id);
    if (turnId === null) return false;
    const row = db.prepare('SELECT prompt_enc, redaction_flags FROM turns WHERE id=?').get(turnId);
    if (!row) return false;
    const finalStatus = STATUSES.has(status) && status !== 'pending' ? status : 'error';
    const finalError = ERRORS.has(errorClass) ? errorClass : null;
    const original = typeof responseText === 'string' ? responseText : typeof response === 'string' ? response : '';
    let redacted = { text: '', flags: [] };
    let responseEnc = null;
    if (responseMode !== 'none' && original) {
      redacted = redact(original);
      const limit = responseMode === 'summary' ? Math.min(200, responseLimit) : responseLimit;
      responseEnc = encrypt(redacted.text.slice(0, limit));
    }
    const flags = Array.from(new Set([...parseJson(row.redaction_flags), ...redacted.flags]));
    let promptTokens = integer(usage?.prompt_tokens);
    let completionTokens = integer(usage?.completion_tokens);
    let estimated = 0;
    if (promptTokens === null) {
      let promptText = '';
      try { promptText = row.prompt_enc ? decrypt(row.prompt_enc) : ''; } catch { promptText = ''; }
      promptTokens = estimateTokens(promptText);
      estimated = 1;
    }
    if (completionTokens === null) {
      completionTokens = estimateTokens(redacted.text || original);
      estimated = 1;
    }
    db.prepare(`UPDATE turns SET status=?, response_enc=?, error_class=?, prompt_tokens=?, completion_tokens=?,
      tokens_estimated=?, latency_ms=?, redaction_flags=? WHERE id=?`).run(
      finalStatus, responseEnc, finalError, promptTokens, completionTokens, estimated,
      integer(latencyMs), JSON.stringify(flags), turnId,
    );
    return true;
  };

  const summary = filter => {
    const { where, params } = filters(filter);
    const row = db.prepare(`SELECT COUNT(*) total, COUNT(DISTINCT pseudonym) people, COALESCE(SUM(status='error'),0) errors FROM turns${where}`).get(...params);
    const total = Number(row.total);
    const counts = new Map([['__total', total]]);
    for (const item of db.prepare(`SELECT COALESCE(prompt_type,'other') type, COUNT(*) count FROM turns${where} GROUP BY 1`).all(...params)) {
      counts.set(item.type, Number(item.count));
    }
    const errors = Number(row.errors);
    return {
      total,
      pseudonyms: Number(row.people),
      errors,
      errorRate: total ? errors / total : 0,
      types: typeRows(counts),
    };
  };

  const lessons = () => db.prepare(`SELECT l.*,
      (SELECT COUNT(*) FROM turns t WHERE t.lesson_id=l.id) turns,
      (SELECT COUNT(DISTINCT t.pseudonym) FROM turns t WHERE t.lesson_id=l.id) pseudonyms
    FROM lessons l ORDER BY l.started_at DESC, l.id DESC`).all().map(row => ({
    id: Number(row.id),
    generation: row.generation === null ? null : Number(row.generation),
    startedAt: row.started_at === null ? null : Number(row.started_at),
    endedAt: row.ended_at === null ? null : Number(row.ended_at),
    maxQuestions: row.max_questions === null ? null : Number(row.max_questions),
    provider: row.provider,
    model: row.model,
    turns: Number(row.turns),
    pseudonyms: Number(row.pseudonyms),
  }));

  const types = filter => {
    const { where, params } = filters(filter);
    const counts = new Map();
    let total = 0;
    for (const item of db.prepare(`SELECT COALESCE(prompt_type,'other') type, COUNT(*) count FROM turns${where} GROUP BY 1`).all(...params)) {
      counts.set(item.type, Number(item.count));
      total += Number(item.count);
    }
    counts.set('__total', total);
    return typeRows(counts);
  };

  const knowledge = filter => {
    const { where, params } = filters(filter);
    const counts = new Map();
    let total = 0;
    for (const row of db.prepare(`SELECT knowledge_tags FROM turns${where}`).all(...params)) {
      total++;
      for (const tag of parseJson(row.knowledge_tags)) counts.set(tag, (counts.get(tag) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count, ratio: total ? count / total : 0 }))
      .sort((a, b) => b.count - a.count || (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0));
  };

  const trends = ({ granularity = 'day', from, to, tz = 0 } = {}) => {
    const mode = granularity === 'week' ? 'week' : 'day';
    const zone = timezoneOffset(tz);
    const { where, params } = filters({ from, to });
    const buckets = new Map();
    for (const row of db.prepare(`SELECT created_at, COALESCE(prompt_type,'other') type FROM turns${where} ORDER BY created_at`).all(...params)) {
      const start = bucketStart(Number(row.created_at), mode, zone);
      if (!buckets.has(start)) {
        buckets.set(start, {
          period: periodOf(start, zone),
          start,
          total: 0,
          types: Object.fromEntries(TYPES.map(type => [type, 0])),
        });
      }
      const bucket = buckets.get(start);
      bucket.total++;
      if (Object.hasOwn(bucket.types, row.type)) bucket.types[row.type]++;
      else bucket.types.other++;
    }
    return { granularity: mode, buckets: [...buckets.values()].sort((a, b) => a.start - b.start) };
  };

  const pseudonyms = filter => {
    const { where, params } = filters(filter);
    const people = new Map();
    for (const row of db.prepare(`SELECT pseudonym, COALESCE(prompt_type,'other') type, knowledge_tags FROM turns${where}`).all(...params)) {
      if (!row.pseudonym) continue;
      if (!people.has(row.pseudonym)) people.set(row.pseudonym, { count: 0, types: new Map(), tags: new Map() });
      const person = people.get(row.pseudonym);
      person.count++;
      person.types.set(row.type, (person.types.get(row.type) || 0) + 1);
      for (const tag of parseJson(row.knowledge_tags)) person.tags.set(tag, (person.tags.get(tag) || 0) + 1);
    }
    const list = [...people.entries()].map(([pseudonym, person]) => {
      let mainType = 'other';
      let mainCount = -1;
      for (const type of TYPES) {
        const count = person.types.get(type) || 0;
        if (count > mainCount) { mainType = type; mainCount = count; }
      }
      return {
        pseudonym,
        displayName: displayName(pseudonym),
        count: person.count,
        mainType,
        mainTypeLabel: PROMPT_TYPE_LABELS[mainType],
        knowledgeTags: [...person.tags.entries()]
          .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
          .slice(0, 3)
          .map(([tag]) => tag),
      };
    }).sort((a, b) => a.displayName < b.displayName ? -1 : a.displayName > b.displayName ? 1
      : a.pseudonym < b.pseudonym ? -1 : a.pseudonym > b.pseudonym ? 1 : 0);
    return { total: list.length, pseudonyms: list };
  };

  const turns = ({ from, to, lessonId, pseudonym, page = 1, pageSize = 20 } = {}) => {
    const { where, params } = filters({ from, to, lessonId, pseudonym });
    const currentPage = Math.max(1, integer(page, 1));
    const size = Math.min(100, Math.max(1, integer(pageSize, 20)));
    const total = Number(db.prepare(`SELECT COUNT(*) total FROM turns${where}`).get(...params).total);
    const rows = db.prepare(`SELECT * FROM turns${where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`)
      .all(...params, size, (currentPage - 1) * size);
    return { total, page: currentPage, pageSize: size, turns: rows.map(rowView) };
  };

  const turn = id => {
    const value = integer(id);
    if (value === null) return null;
    const row = db.prepare('SELECT * FROM turns WHERE id=?').get(value);
    if (!row) return null;
    const view = rowView(row);
    const prompt = row.prompt_enc ? decrypt(row.prompt_enc) : '';
    const response = row.response_enc ? decrypt(row.response_enc) : '';
    return { ...view, prompt, response };
  };

  const purge = ({ before } = {}) => {
    const cutoff = integer(before) ?? now() - retention * 86400000;
    const removedTurns = Number(db.prepare('DELETE FROM turns WHERE created_at < ?').run(cutoff).changes);
    const removedLessons = Number(db.prepare(`DELETE FROM lessons WHERE ended_at IS NOT NULL AND ended_at < ?
      AND NOT EXISTS (SELECT 1 FROM turns WHERE turns.lesson_id=lessons.id)`).run(cutoff).changes);
    db.prepare('DELETE FROM lesson_generations WHERE lesson_id NOT IN (SELECT id FROM lessons)').run();
    return { turns: removedTurns, lessons: removedLessons, total: removedTurns + removedLessons };
  };

  const maybeDailyPurge = () => {
    const time = now();
    if (lastPurge !== null && time - lastPurge < 86400000) return null;
    const result = purge();
    lastPurge = time;
    return result;
  };

  const close = () => {
    if (closed) return;
    closed = true;
    db.close();
  };

  return {
    startLesson,
    rotateLesson,
    endLesson,
    currentLessonId,
    pseudonymFor,
    displayName,
    conversationHash,
    beginTurn,
    finishTurn,
    summary,
    lessons,
    types,
    knowledge,
    trends,
    pseudonyms,
    turns,
    turn,
    purge,
    maybeDailyPurge,
    close,
    retentionDays: retention,
    storeResponse: responseMode,
    responseMaxChars: responseLimit,
  };
}
