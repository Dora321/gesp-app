const RULES = [
  // 证件号最长，先处理，避免被手机号规则截成半段。
  ['idcard', /(?<!\d)[1-9]\d{16}[\dXx](?![\dXx])/g],
  ['email', /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g],
  ['qq', /(?<![A-Za-z0-9])qq\s*(?:号|号码)?\s*(?:是|为)?\s*[:：=]?\s*\d{5,12}/gi],
  ['wechat', /(?:微信|wechat|vx|wx)\s*(?:号|号码|id)?\s*(?:是|为)?\s*[:：=]?\s*[A-Za-z][-_A-Za-z0-9]{4,30}/gi],
  // 手机号允许空格、横线分隔和 +86 前缀；两侧不能紧邻数字，避免误伤 1000000007、100005。
  ['phone', /(?<!\d)(?:\+?86[\s-]*)?1[3-9]\d(?:[\s-]?\d){8}(?!\d)/g],
];

export function redact(text) {
  let value = typeof text === 'string' ? text : text == null ? '' : String(text);
  const flags = [];
  for (const [name, regex] of RULES) {
    const next = value.replace(regex, '【已脱敏】');
    if (next !== value) {
      flags.push(name);
      value = next;
    }
  }
  return { text: value, flags };
}
