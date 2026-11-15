const $ = id => document.getElementById(id);
let current;
async function api(path, data) {
  const res = await fetch(`/api/admin/${path}`, { credentials: 'same-origin', ...(data === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }) });
  const result = await res.json();
  if (!res.ok) { if (res.status === 401) { $('login').hidden = false; $('settings').hidden = true; } throw new Error(result.message); }
  return result;
}
function showProvider() {
  const selected = current.providers.find(provider => provider.id === $('provider').value);
  $('provider-info').textContent = `模型 ${selected.modelName} · ${selected.id === current.provider ? '当前使用' : '保存后启用'}`;
  $('key-label').textContent = `${selected.name} API Key`;
  $('key').required = !selected.hasKey;
  $('key').placeholder = selected.hasKey ? '已保存，留空继续使用原密钥' : '粘贴 API Key，保存后不再显示';
}
function show(s, resetProvider = false) {
  const select = $('provider');
  if (!select.options.length) {
    for (const provider of s.providers) select.add(new Option(provider.name, provider.id));
  }
  if (!current || resetProvider) select.value = s.provider;
  current = s;
  $('login').hidden = true; $('settings').hidden = false;
  showProvider();
  $('live').hidden = !s.active; $('code').textContent = s.active ? s.code : '';
  $('start-form').hidden = s.active; $('stop').hidden = !s.active;
  $('status').textContent = s.active ? `课堂进行中 · 剩余 ${s.remaining} / ${s.maxQuestions} 次 · ${new Date(s.expiresAt).toLocaleTimeString('zh-CN')} 截止` : '课堂未开放，学生暂时无法使用。';
}
async function run(fn) {
  $('notice').textContent = '';
  document.querySelectorAll('button').forEach(b => { b.disabled = true; });
  try { await fn(); } catch (e) { $('notice').textContent = e.message || '无法连接课堂服务。'; }
  finally { document.querySelectorAll('button').forEach(b => { b.disabled = false; }); }
}
$('login-form').onsubmit = e => { e.preventDefault(); run(async () => { show(await api('login', { password: $('password').value })); $('password').value = ''; }); };
$('provider').onchange = () => {
  $('key').value = '';
  showProvider();
};
$('key-form').onsubmit = e => {
  e.preventDefault();
  run(async () => {
    const saved = await api('settings', { provider: $('provider').value, apiKey: $('key').value });
    $('key').value = '';
    show(saved, true);
    $('notice').textContent = `设置已保存，课堂使用 ${saved.providerName}。`;
  });
};
$('start-form').onsubmit = e => { e.preventDefault(); run(async () => show(await api('start', { minutes: Number($('minutes').value), maxQuestions: Number($('max').value) }))); };
$('stop').onclick = () => { if (confirm('结束课堂后，所有学生将立即停用 AI 助手。确定结束？')) run(async () => show(await api('stop', {}))); };
$('rotate').onclick = () => { if (confirm('旧口令和已有授权将失效，所有学生需输入新口令。剩余次数不变，确定更换？')) run(async () => show(await api('rotate', {}))); };
$('copy').onclick = () => run(async () => { await navigator.clipboard.writeText(current.code); $('notice').textContent = '口令已复制。'; });
$('logout').onclick = () => run(async () => { await api('logout', {}); current = null; $('settings').hidden = true; $('login').hidden = false; });
api('state').then(show).catch(() => {});
setInterval(() => { if (current && !$('settings').hidden) api('state').then(show).catch(() => {}); }, 10000);
