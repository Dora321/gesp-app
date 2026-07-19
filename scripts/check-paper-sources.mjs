#!/usr/bin/env node
// Paper source gate.
//
// Every official paper must have a recorded source it can be checked against.
// Offline (default, CI-safe) this asserts the registry is complete and internally
// consistent. With --online it additionally confirms each URL still resolves and
// that mirrored PDFs still hash to the recorded git blob id, which is how we
// notice a source silently changing or disappearing.
//
// Usage:
//   node scripts/check-paper-sources.mjs             # structural checks
//   node scripts/check-paper-sources.mjs --online    # + reachability & hashes
//   node scripts/check-paper-sources.mjs --refresh   # rewrite hashes from the mirror
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const online = process.argv.includes('--online') || process.argv.includes('--refresh');
const refresh = process.argv.includes('--refresh');

const { paperIds, paperMeta } = await import(pathToFileURL(path.join(root, 'src/data/gesp/_generated.js')).href);
const { paperSources } = await import(pathToFileURL(path.join(root, 'src/data/gesp/paperSources.js')).href);

const errors = [];
const warnings = [];

// Structural: every paper is present exactly once, and official papers carry at
// least one usable source.
for (const id of paperIds) {
  const entry = paperSources[id];
  if (!entry) {
    errors.push(`${id}: missing from paperSources registry`);
    continue;
  }
  if (paperMeta[id].unofficial) {
    if (entry.officialUrl || entry.mirrorUrl) {
      errors.push(`${id}: unofficial placeholder must not claim an official/mirror source`);
    }
    continue;
  }
  if (!entry.officialUrl && !entry.mirrorUrl) {
    errors.push(`${id}: no source recorded (needs officialUrl or mirrorUrl)`);
  }
  if (entry.officialUrl && !/^https:\/\/gesp\.ccf\.org\.cn\//.test(entry.officialUrl)) {
    errors.push(`${id}: officialUrl must point at gesp.ccf.org.cn, got ${entry.officialUrl}`);
  }
  if (entry.mirrorUrl) {
    if (!entry.mirrorSha) errors.push(`${id}: mirrorUrl recorded without mirrorSha`);
    if (!/^[0-9a-f]{40}$/.test(entry.mirrorSha || '')) errors.push(`${id}: mirrorSha is not a git blob sha1`);
  }
  if (!entry.officialUrl) {
    warnings.push(`${id}: no official CCF link yet (mirror only)`);
  }
}

for (const id of Object.keys(paperSources)) {
  if (!paperIds.includes(id)) errors.push(`${id}: registry entry has no matching paper`);
}

// Online: confirm the sources still exist and still contain what we recorded.
const gitBlobSha = (buffer) => crypto
  .createHash('sha1')
  .update(Buffer.concat([Buffer.from(`blob ${buffer.length}\0`), buffer]))
  .digest('hex');

if (online) {
  const targets = paperIds.filter((id) => !paperMeta[id].unofficial);
  let checked = 0;
  const updates = new Map();

  const limit = 8;
  for (let i = 0; i < targets.length; i += limit) {
    await Promise.all(targets.slice(i, i + limit).map(async (id) => {
      const entry = paperSources[id];
      if (entry.officialUrl) {
        try {
          const res = await fetch(entry.officialUrl, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(30000) });
          if (!res.ok) errors.push(`${id}: officialUrl unreachable (HTTP ${res.status})`);
        } catch (e) {
          errors.push(`${id}: officialUrl request failed — ${e.message}`);
        }
      }
      if (entry.mirrorUrl) {
        try {
          const res = await fetch(entry.mirrorUrl, { redirect: 'follow', signal: AbortSignal.timeout(60000) });
          if (!res.ok) {
            errors.push(`${id}: mirrorUrl unreachable (HTTP ${res.status})`);
            return;
          }
          const buffer = Buffer.from(await res.arrayBuffer());
          const sha = gitBlobSha(buffer);
          if (refresh) {
            updates.set(id, { sha, bytes: buffer.length });
          } else if (sha !== entry.mirrorSha) {
            errors.push(`${id}: mirrored PDF changed — recorded ${entry.mirrorSha}, now ${sha}`);
          } else if (entry.mirrorBytes && entry.mirrorBytes !== buffer.length) {
            errors.push(`${id}: mirrored PDF size changed — recorded ${entry.mirrorBytes}, now ${buffer.length}`);
          }
          checked++;
        } catch (e) {
          errors.push(`${id}: mirrorUrl request failed — ${e.message}`);
        }
      }
    }));
  }
  console.log(`Online check: ${checked} mirrored PDF(s) downloaded and hashed.`);

  if (refresh && updates.size > 0) {
    const file = path.join(root, 'src/data/gesp/paperSources.js');
    let text = fs.readFileSync(file, 'utf8');
    for (const [id, { sha, bytes }] of updates) {
      const block = new RegExp(`('${id}': \\{[\\s\\S]*?\\})`);
      text = text.replace(block, (m) => m
        .replace(/mirrorSha: '[0-9a-f]{40}'/, `mirrorSha: '${sha}'`)
        .replace(/mirrorBytes: \d+/, `mirrorBytes: ${bytes}`));
    }
    fs.writeFileSync(file, text, 'utf8');
    console.log(`Refreshed hashes for ${updates.size} paper(s).`);
  }
}

const officialCount = paperIds.filter((id) => paperSources[id]?.officialUrl).length;
const mirrorCount = paperIds.filter((id) => paperSources[id]?.mirrorUrl).length;
const officialPapers = paperIds.filter((id) => !paperMeta[id].unofficial).length;

console.log('--- Paper Source Registry ---');
console.log(`Official papers:            ${officialPapers}`);
console.log(`With CCF official link:     ${officialCount}`);
console.log(`With mirror fallback:       ${mirrorCount}`);
console.log(`Awaiting official link:     ${officialPapers - officialCount}`);

if (warnings.length > 0 && process.argv.includes('--verbose')) {
  warnings.forEach((w) => console.log(`  ⚠️  ${w}`));
}
if (errors.length > 0) {
  console.log(`\n❌ ${errors.length} problem(s):`);
  errors.forEach((e) => console.log(`  ${e}`));
  process.exit(1);
}
console.log('\n✅ Paper source registry consistent.');
