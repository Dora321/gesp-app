import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const authFile = path.join(os.homedir(), '.local/share/opencode/auth.json');
const auth = JSON.parse(fs.readFileSync(authFile, 'utf8'))['opencode-go'];
if (!auth?.key) throw new Error('未找到已连接的 OpenCode Go 凭据');
process.env.OPENCODE_API_KEY ||= auth.key;
process.env.GESP_AUDIT_CACHE ||= '/tmp/gesp-five-dim-20261107';
process.env.GESP_EXISTING_WORKERS = '[]';
await import('./run-five-dimension-queue.mjs');
