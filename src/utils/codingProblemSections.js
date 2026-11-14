// 解析模式的上机编程题有两种写法：卷文件里手写的 markdown 题面（题目描述 /
// 输入格式 … 可能是标题或单独一行的粗体），以及早期「合成洛谷题」——question
// 只是题号，真正的题面放在 explanation 里。这里把两者归一成界面可以分卡片渲染
// 的结构，避免页面自己猜标题、样例和题解。
//
// 纯函数，无 React 依赖，方便在 node:test 里直接断言。

const SECTION_LABELS = {
  background: '题目背景',
  description: '题目描述',
  input: '输入格式',
  output: '输出格式',
  samples: '样例',
  constraints: '数据范围',
  hint: '提示',
  link: '原题链接',
  other: '补充说明',
};

const SECTION_ORDER = ['background', 'description', 'input', 'output', 'constraints', 'hint', 'link', 'other'];

const FENCE_LINE = /^\s{0,3}(`{3,}|~{3,})/;
const MARKDOWN_HEADING = /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/;
const BOLD_HEADING = /^\s{0,3}(?:\*\*|__)([^*_]+?)(?:\*\*|__)\s*[:：]?\s*$/;

const normalizeWhitespace = (value) => String(value ?? '')
  .replace(/\r\n?/g, '\n')
  .replace(/[ \t]+$/gm, '');

const cleanHeading = (raw) => String(raw || '')
  .replace(/^[*_#\s]+/, '')
  .replace(/[*_#\s]+$/, '')
  .replace(/[：:]\s*$/, '')
  .replace(/^\s*(?:[一二三四五六七八九十]+|\d+)\s*[、.．)\]]\s*/, '')
  .trim();

const normalizeTitle = (raw) => cleanHeading(raw)
  // [GESP202403 三级] 字母求和 → 字母求和
  .replace(/^\s*\[[^\]]*\]\s*/, '')
  // P1234 / B3848 只是洛谷题号，标题卡里单独显示题号更清楚
  .replace(/^[A-Z]\d{3,6}\s+/, '')
  .trim();

const headingKey = (label) => {
  const text = String(label || '').replace(/\s+/g, '');
  if (!text) return 'other';
  if (/^(题目)?背景$/.test(text)) return 'background';
  if (/^(题目描述|问题描述|描述|题目要求|题意|题目)$/.test(text)) return 'description';
  if (/^(输入格式|输入描述|输入数据|输入)$/.test(text)) return 'input';
  if (/^(输出格式|输出描述|输出数据|输出)$/.test(text)) return 'output';
  if (/^(样例|样例\d+|输入样例|输出样例|样例输入|样例输出|样例数据|样例\d*说明)$/.test(text)) return 'samples';
  if (/^(数据范围|数据规模|数据限制|数据约定|数据范围与约定|范围|限制|约定)$/.test(text)) return 'constraints';
  if (/^(提示|说明|注意|注意事项|备注|样例解释|解释)$/.test(text)) return 'hint';
  if (/^(原题链接|题目链接|链接|来源)$/.test(text)) return 'link';
  return 'other';
};

const matchHeading = (line) => {
  const markdown = line.match(MARKDOWN_HEADING);
  if (markdown) return { raw: markdown[2] };
  const bold = line.match(BOLD_HEADING);
  if (bold) return { raw: bold[1] };
  return null;
};

const statementSource = (q) => {
  if (!q) return '';
  // 合成洛谷题的题面在 explanation 里，判定沿用页面原来的规则。
  if (q.type === 'coding' && !q.description && q.explanation) return q.explanation;
  return q.question || '';
};

const asText = (value) => {
  if (value === undefined || value === null) return '';
  return String(value);
};

const parseSampleSection = (markdown) => {
  const text = normalizeWhitespace(markdown);
  const samples = [];
  const blocks = [];
  const fence = /```([^\n`]*)\n([\s\S]*?)```/g;
  let match;

  while ((match = fence.exec(text)) !== null) {
    const before = text.slice(0, match.index);
    const labelLine = before.split('\n').map((line) => line.trim()).filter(Boolean).pop() || '';
    let kind = '';
    if (/输入/.test(labelLine)) kind = 'input';
    else if (/输出/.test(labelLine)) kind = 'output';
    blocks.push({ kind, code: match[2].replace(/\n$/, '') });
  }

  // 没写「输入：/输出：」标签时，按出现顺序一输入一输出配对。
  blocks.forEach((block, index) => {
    if (!block.kind) block.kind = index % 2 === 0 ? 'input' : 'output';
  });

  let pending = null;
  for (const block of blocks) {
    if (block.kind === 'input') {
      if (pending && !pending.output) {
        pending.input = block.code;
      } else {
        pending = { input: block.code, output: '', note: '' };
        samples.push(pending);
      }
    } else {
      if (pending && !pending.output) {
        pending.output = block.code;
      } else {
        pending = { input: '', output: block.code, note: '' };
        samples.push(pending);
      }
    }
  }

  let residual = text.replace(fence, '\n');
  residual = residual
    .replace(/^\s*(?:输入|输出)(?:样例)?\s*[:：]?\s*$/gm, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
    .trim();

  if (samples.length > 0 && residual) samples[0].note = residual;
  return { samples, note: samples.length > 0 ? '' : residual };
};

const mergeSections = (rawSections) => {
  const order = [];
  const byKey = new Map();

  for (const section of rawSections) {
    const markdown = normalizeWhitespace(section.lines.join('\n')).trim();
    if (!markdown) continue;
    if (!byKey.has(section.key)) {
      byKey.set(section.key, {
        key: section.key,
        label: SECTION_LABELS[section.key] || SECTION_LABELS.other,
        markdown,
      });
      order.push(section.key);
      continue;
    }
    const existing = byKey.get(section.key);
    existing.markdown = `${existing.markdown}\n\n${markdown}`.trim();
  }

  order.sort((a, b) => {
    const ai = SECTION_ORDER.indexOf(a);
    const bi = SECTION_ORDER.indexOf(b);
    return (ai === -1 ? SECTION_ORDER.length : ai) - (bi === -1 ? SECTION_ORDER.length : bi);
  });
  return order.map((key) => byKey.get(key));
};

/**
 * 把一道上机编程题拆成题头、分区卡片和样例。
 * 返回 { title, sections, samples, extraNotes }，不修改入参。
 */
export function parseCodingProblem(q) {
  if (!q) return { title: '', sections: [], samples: [], extraNotes: [] };

  const source = normalizeWhitespace(statementSource(q));
  const rawSections = [];
  let title = '';
  let current = null;
  let preamble = [];
  let inFence = false;

  const flush = () => {
    if (current && current.lines.length > 0) rawSections.push(current);
    current = null;
  };

  for (const line of source.split('\n')) {
    if (FENCE_LINE.test(line)) {
      inFence = !inFence;
      if (current) current.lines.push(line);
      else preamble.push(line);
      continue;
    }

    const heading = inFence ? null : matchHeading(line);
    const label = heading ? cleanHeading(heading.raw) : '';
    const key = heading ? headingKey(label) : 'other';

    if (heading && key === 'other') {
      if (!title && rawSections.length === 0) {
        title = normalizeTitle(label);
        continue;
      }
      // 分区内部的普通小标题原样留在 markdown 里，不另起卡片。
      if (current) current.lines.push(line);
      else preamble.push(line);
      continue;
    }

    if (heading) {
      flush();
      current = { key, lines: [] };
      continue;
    }

    if (current) current.lines.push(line);
    else preamble.push(line);
  }
  flush();

  const sampleSections = rawSections.filter((section) => section.key === 'samples');
  const parsedSamples = [];
  const extraNotes = [];

  for (const section of sampleSections) {
    const parsed = parseSampleSection(section.lines.join('\n'));
    parsedSamples.push(...parsed.samples);
    if (parsed.note) extraNotes.push(parsed.note);
  }

  const contentSections = mergeSections(rawSections.filter((section) => section.key !== 'samples'));

  const preambleText = normalizeWhitespace(preamble.join('\n')).trim();
  if (preambleText) {
    const description = contentSections.find((section) => section.key === 'description');
    if (description) description.markdown = `${description.markdown}\n\n${preambleText}`.trim();
    else contentSections.unshift({ key: 'description', label: SECTION_LABELS.description, markdown: preambleText });
  }

  // 结构化字段（title/description/inputDescription/outputDescription）补齐
  // markdown 里没有的分区；题面里已有同样的文字时不再重复追加。
  const structured = [
    ['description', q.description],
    ['input', q.inputDescription],
    ['output', q.outputDescription],
  ];
  for (const [key, value] of structured) {
    const markdown = normalizeWhitespace(value).trim();
    if (!markdown) continue;
    const existing = contentSections.find((section) => section.key === key);
    if (existing) {
      if (!existing.markdown) existing.markdown = markdown;
      else if (!existing.markdown.includes(markdown)) existing.markdown = `${existing.markdown}\n\n${markdown}`.trim();
      continue;
    }
    contentSections.push({ key, label: SECTION_LABELS[key], markdown });
  }

  if (!title) title = normalizeTitle(q.title || '') || '上机编程题';

  // 没有识别出任何分区时，整段题面放进「题目描述」，一个字都不丢。
  if (contentSections.length === 0 && parsedSamples.length === 0) {
    const fallback = normalizeWhitespace(source).trim()
      || normalizeWhitespace(preambleText).trim()
      || normalizeWhitespace(q.question).trim();
    if (fallback) {
      contentSections.push({ key: 'description', label: SECTION_LABELS.description, markdown: fallback });
    }
  }

  const enriched = contentSections.map((section) => ({
    key: section.key,
    label: section.label,
    markdown: section.markdown,
  }));
  enriched.sort((a, b) => SECTION_ORDER.indexOf(a.key) - SECTION_ORDER.indexOf(b.key));

  let samples;
  if (Array.isArray(q.samples) && q.samples.length > 0) {
    samples = q.samples.map((sample, index) => ({
      input: asText(sample?.input),
      output: asText(sample?.output),
      note: parsedSamples[index]?.note || '',
    }));
    for (let i = samples.length; i < parsedSamples.length; i += 1) {
      if (parsedSamples[i]?.note) extraNotes.push(parsedSamples[i].note);
    }
    if (samples.length > 0 && !samples.some((sample) => sample.note) && extraNotes.length > 0) {
      samples[0] = { ...samples[0], note: extraNotes.shift() };
    }
  } else {
    samples = parsedSamples.map((sample) => ({
      input: sample.input,
      output: sample.output,
      note: sample.note || '',
    }));
  }

  return { title, sections: enriched, samples, extraNotes };
}
