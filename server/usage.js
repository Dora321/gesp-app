const $ = id => document.getElementById(id);
const tz = -new Date().getTimezoneOffset();
const SCREEN_KEY = 'gesp_usage_screen_mode';
const state = { page: 1, pageSize: 20, total: 0, lessons: new Map(), selected: null, screen: false };
const STATUS_LABELS = { ok: '成功', error: '错误', aborted: '学生中断', pending: '生成中' };

const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const clear = node => {
  while (node.firstChild) node.removeChild(node.firstChild);
};
const empty = (node, text) => {
  clear(node);
  node.append(make('p', 'empty', text));
};
const percent = value => `${Math.round((Number(value) || 0) * 100)}%`;
const pad = value => String(value).padStart(2, '0');
const formatTime = value => {
  const date = new Date(Number(value));
  if (!Number.isFinite(date.getTime())) return '时间未知';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
const formatLesson = value => {
  const date = new Date(Number(value));
  if (!Number.isFinite(date.getTime())) return '时间未知的场次';
  return `${date.getMonth() + 1}月${date.getDate()}日 ${pad(date.getHours())}:${pad(date.getMinutes())} 那堂课`;
};
const lessonLabel = id => {
  const lesson = state.lessons.get(String(id));
  return lesson ? formatLesson(lesson.startedAt) : id === null || id === undefined ? '未关联场次' : `历史场次 #${id}`;
};
const statusLabel = status => STATUS_LABELS[status] || '未知';
const knowledgeText = tags => tags && tags.length ? tags.join('、') : '无';

function readScreenMode() {
  try { return localStorage.getItem(SCREEN_KEY) === '1'; } catch { /* localStorage 不可用时默认关闭投屏模式。 */ }
  return false;
}
function saveScreenMode(value) {
  try { localStorage.setItem(SCREEN_KEY, value ? '1' : '0'); } catch { /* 无法保存时仍保持当前页面状态。 */ }
}

function showLogin() {
  $('login-required').hidden = false;
  $('app').hidden = true;
}
function showError(error) {
  if (error?.unauthorized) return;
  $('notice').textContent = error?.message || '无法连接课堂服务，请稍后再试。';
}

async function api(path, options = {}) {
  const response = await fetch(`/api/admin/usage/${path}`, {
    credentials: 'same-origin',
    cache: 'no-store',
    ...options,
  });
  if (response.status === 401) {
    showLogin();
    throw Object.assign(new Error('请先在 /classroom-admin 登录。'), { unauthorized: true });
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || '加载失败，请稍后再试。');
  return result;
}

function filterParams() {
  const params = new URLSearchParams();
  params.set('tz', String(tz));
  if ($('from').value) params.set('from', $('from').value);
  if ($('to').value) params.set('to', $('to').value);
  if ($('lesson').value) params.set('lessonId', $('lesson').value);
  return params;
}

async function loadLessons() {
  const data = await api(`lessons?tz=${tz}`);
  const select = $('lesson');
  const current = select.value;
  clear(select);
  select.add(new Option('全部场次', ''));
  state.lessons.clear();
  for (const lesson of data.lessons || []) {
    state.lessons.set(String(lesson.id), lesson);
    select.add(new Option(formatLesson(lesson.startedAt), String(lesson.id)));
  }
  if (current && state.lessons.has(current)) select.value = current;
}

function renderSummary(summary) {
  $('stat-total').textContent = String(summary.total || 0);
  $('stat-total-detail').textContent = summary.total ? '已受理并计次的课堂提问' : '当前筛选范围暂无记录';
  $('stat-people').textContent = String(summary.pseudonyms || 0);
  const errors = Number(summary.errors) || 0;
  $('stat-error').textContent = percent(summary.errorRate);
  $('stat-error-detail').textContent = `${errors} 条错误`;
  renderTypes(summary.types || []);
}

function renderTypes(types) {
  const host = $('types');
  clear(host);
  if (!types.length) {
    empty(host, '暂无数据');
    return;
  }
  for (const item of types) {
    const row = make('div', 'bar-row');
    row.append(make('span', null, item.label));
    const track = make('div', 'bar');
    const fill = make('div', 'bar-fill');
    fill.style.width = percent(item.ratio);
    track.append(fill);
    row.append(track);
    row.append(make('span', 'value', `${item.count} · ${percent(item.ratio)}`));
    host.append(row);
  }
}

function renderKnowledge(items) {
  const host = $('knowledge');
  clear(host);
  if (!items.length) {
    empty(host, '暂无知识点标签');
    return;
  }
  const max = Math.max(...items.map(item => item.count), 1);
  for (const item of items) {
    const row = make('div', 'knowledge-row');
    row.append(make('span', null, item.tag));
    const track = make('div', 'bar');
    const fill = make('div', 'bar-fill');
    fill.style.width = `${Math.round((item.count / max) * 100)}%`;
    track.append(fill);
    row.append(track);
    row.append(make('span', 'value', String(item.count)));
    host.append(row);
  }
}

function renderTrends(data, types) {
  const host = $('trends');
  clear(host);
  const buckets = data.buckets || [];
  if (!buckets.length) {
    empty(host, '暂无数据');
    return;
  }
  const table = make('table');
  const head = make('thead');
  const headRow = make('tr');
  for (const label of ['时间段', '提问次数', ...types.map(item => item.label)]) headRow.append(make('th', null, label));
  head.append(headRow);
  table.append(head);
  const body = make('tbody');
  for (const bucket of buckets) {
    const row = make('tr');
    const period = data.granularity === 'week' ? `${bucket.period} 起` : bucket.period;
    row.append(make('td', null, period));
    row.append(make('td', null, String(bucket.total)));
    for (const type of types) row.append(make('td', null, String(bucket.types?.[type.type] || 0)));
    body.append(row);
  }
  table.append(body);
  host.append(table);
}

function markSelected() {
  for (const button of $('pseudonyms').querySelectorAll('.pseudo')) {
    button.setAttribute('aria-pressed', String(button.dataset.pseudonym === state.selected));
  }
}

function hideTimeline() {
  state.selected = null;
  $('timeline-wrap').hidden = true;
  clear($('timeline'));
  markSelected();
}

async function loadTimeline(person) {
  state.selected = person.pseudonym;
  markSelected();
  $('timeline-wrap').hidden = false;
  $('timeline-title').textContent = `${person.displayName} 的提问时间线（正在加载…）`;
  const params = filterParams();
  params.set('pseudonym', person.pseudonym);
  params.set('page', '1');
  params.set('pageSize', '100');
  try {
    const data = await api(`turns?${params}`);
    const host = $('timeline');
    clear(host);
    $('timeline-title').textContent = `${person.displayName} 的提问时间线（共 ${data.total} 条）`;
    if (!data.turns?.length) {
      empty(host, '当前筛选范围没有记录');
      return;
    }
    const table = make('table');
    const head = make('thead');
    const headRow = make('tr');
    for (const label of ['时间', '类型', '知识点', '场次', '状态']) headRow.append(make('th', null, label));
    head.append(headRow);
    table.append(head);
    const body = make('tbody');
    for (const turn of data.turns) {
      const row = make('tr');
      row.append(make('td', null, formatTime(turn.createdAt)));
      row.append(make('td', null, turn.promptTypeLabel || '其他'));
      row.append(make('td', null, knowledgeText(turn.knowledgeTags)));
      row.append(make('td', null, lessonLabel(turn.lessonId)));
      row.append(make('td', null, statusLabel(turn.status)));
      body.append(row);
    }
    table.append(body);
    host.append(table);
    if (data.total > data.turns.length) host.append(make('p', 'empty', `仅显示前 ${data.turns.length} 条，请缩小日期范围。`));
  } catch (error) {
    showError(error);
    empty($('timeline'), error?.unauthorized ? '请先登录。' : '时间线加载失败。');
  }
}

function renderPseudonyms(data) {
  const host = $('pseudonyms');
  clear(host);
  const list = data.pseudonyms || [];
  if (!list.length) {
    empty(host, '当前筛选范围暂无匿名代号');
    return;
  }
  for (const person of list) {
    const button = make('button', 'pseudo');
    button.type = 'button';
    button.dataset.pseudonym = person.pseudonym;
    button.setAttribute('aria-pressed', String(state.selected === person.pseudonym));
    button.append(make('strong', null, person.displayName));
    button.append(make('span', 'muted', `${person.count} 次 · 主类型：${person.mainTypeLabel}`));
    button.append(make('span', 'tags', person.knowledgeTags?.length ? `常问知识点：${person.knowledgeTags.join('、')}` : '暂未识别出知识点'));
    button.addEventListener('click', () => {
      if (state.selected === person.pseudonym) hideTimeline();
      else loadTimeline(person);
    });
    host.append(button);
  }
}

function renderTurns(turns, data) {
  const host = $('turns');
  clear(host);
  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));
  $('turns-meta').textContent = `共 ${data.total} 条`;
  $('page-info').textContent = `第 ${data.page} / ${pages} 页`;
  $('prev').disabled = data.page <= 1;
  $('next').disabled = data.page >= pages;
  if (!turns.length) {
    empty(host, '当前筛选范围暂无记录');
    return;
  }
  for (const turn of turns) {
    const item = make('article', 'turn');
    const head = make('div', 'turn-head');
    head.append(make('span', 'time', formatTime(turn.createdAt)));
    head.append(make('span', 'who', turn.displayName));
    head.append(make('span', null, turn.promptTypeLabel || '其他'));
    head.append(make('span', 'time', lessonLabel(turn.lessonId)));
    head.append(make('span', 'spacer'));
    const button = make('button', 'secondary view-original', '查看原文');
    button.type = 'button';
    button.disabled = state.screen;
    head.append(button);
    item.append(head);

    const meta = make('div', 'turn-meta');
    meta.textContent = `知识点：${knowledgeText(turn.knowledgeTags)} · 状态：${statusLabel(turn.status)}${turn.hasImage ? ' · 含图（未保存图片）' : ''}`;
    item.append(meta);

    const transcript = make('div', 'transcript');
    transcript.hidden = true;
    item.append(transcript);

    let loaded = false;
    button.addEventListener('click', async () => {
      if (state.screen) return;
      if (loaded) {
        transcript.hidden = !transcript.hidden;
        button.textContent = transcript.hidden ? '查看原文' : '收起原文';
        return;
      }
      button.disabled = true;
      button.textContent = '读取中…';
      try {
        const record = await api(`turns/${turn.id}?tz=${tz}`);
        clear(transcript);
        transcript.append(make('h4', null, '提问'));
        transcript.append(make('pre', null, record.prompt || '（空）'));
        transcript.append(make('h4', null, '完整回答'));
        transcript.append(make('pre', null, record.response || '（未保存回答）'));
        transcript.hidden = false;
        loaded = true;
        button.textContent = '收起原文';
      } catch (error) {
        showError(error);
        button.textContent = '查看原文';
      } finally {
        button.disabled = state.screen;
      }
    });
    host.append(item);
  }
}

async function loadTurns() {
  const params = filterParams();
  params.set('page', String(state.page));
  params.set('pageSize', String(state.pageSize));
  const data = await api(`turns?${params}`);
  state.total = Number(data.total) || 0;
  renderTurns(data.turns || [], data);
}

async function loadAll() {
  $('notice').textContent = '';
  $('status').textContent = '正在加载…';
  try {
    const params = filterParams();
    const trendParams = new URLSearchParams(params);
    trendParams.set('granularity', $('granularity').value);
    const [summary, knowledge, trends, pseudonyms] = await Promise.all([
      api(`summary?${params}`),
      api(`knowledge?${params}`),
      api(`trends?${trendParams}`),
      api(`pseudonyms?${params}`),
    ]);
    renderSummary(summary);
    renderKnowledge(knowledge.knowledge || []);
    renderTrends(trends, summary.types || []);
    renderPseudonyms(pseudonyms);
    if (state.selected) {
      const person = (pseudonyms.pseudonyms || []).find(item => item.pseudonym === state.selected);
      if (person) await loadTimeline(person);
      else hideTimeline();
    }
    await loadTurns();
    $('status').textContent = summary.enabled === false ? '使用记录当前已关闭（CLASSROOM_USAGE_LOG=0）。' : '';
  } catch (error) {
    $('status').textContent = '';
    showError(error);
  }
}

function applyScreenMode(enabled, persist) {
  state.screen = enabled;
  document.body.classList.toggle('screen-mode', enabled);
  $('screen-mode').checked = enabled;
  for (const button of document.querySelectorAll('.view-original')) button.disabled = enabled;
  if (persist) saveScreenMode(enabled);
}

async function purgeExpired() {
  if (!confirm('立即删除超过保留期的提问记录？删除后无法恢复。')) return;
  const button = $('purge');
  button.disabled = true;
  $('purge-result').textContent = '正在清理…';
  try {
    const result = await api(`purge?tz=${tz}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    $('purge-result').textContent = `已删除 ${result.turns || 0} 条提问记录、${result.lessons || 0} 个过期场次。`;
    state.page = 1;
    await loadLessons();
    await loadAll();
  } catch (error) {
    $('purge-result').textContent = error?.message || '清理失败，请稍后再试。';
  } finally {
    button.disabled = false;
  }
}

async function init() {
  applyScreenMode(readScreenMode(), false);
  $('screen-mode').addEventListener('change', event => applyScreenMode(event.target.checked, true));
  $('filters').addEventListener('submit', event => {
    event.preventDefault();
    state.page = 1;
    state.selected = null;
    hideTimeline();
    loadAll();
  });
  $('reset').addEventListener('click', () => {
    $('from').value = '';
    $('to').value = '';
    $('lesson').value = '';
    $('granularity').value = 'day';
    state.page = 1;
    state.selected = null;
    hideTimeline();
    loadAll();
  });
  $('granularity').addEventListener('change', () => { loadAll(); });
  $('prev').addEventListener('click', () => {
    if (state.page <= 1) return;
    state.page--;
    loadTurns().catch(showError);
  });
  $('next').addEventListener('click', () => {
    if (state.page >= Math.max(1, Math.ceil(state.total / state.pageSize))) return;
    state.page++;
    loadTurns().catch(showError);
  });
  $('purge').addEventListener('click', purgeExpired);
  try {
    const status = await api(`status?tz=${tz}`);
    $('login-required').hidden = true;
    $('app').hidden = false;
    if (status.enabled === false) $('status').textContent = '使用记录当前已关闭（CLASSROOM_USAGE_LOG=0）。';
    await loadLessons();
    await loadAll();
  } catch (error) {
    showError(error);
  }
}

init();
