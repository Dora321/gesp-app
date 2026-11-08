import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const authFile = path.join(os.homedir(), '.local/share/opencode/auth.json');
const auth = JSON.parse(fs.readFileSync(authFile, 'utf8'))['opencode-go'];
if (!auth?.key) throw new Error('未找到已连接的 OpenCode Go 凭据');
process.env.OPENCODE_API_KEY ||= auth.key;
process.env.GESP_AUDIT_CACHE ||= '/tmp/gesp-five-dim-20261107';
process.env.GESP_EXISTING_WORKERS ||= '[]';
const lock = path.join(process.env.GESP_AUDIT_CACHE, 'queue.pid');
if (fs.existsSync(lock)) {
    const pid = Number(fs.readFileSync(lock, 'utf8'));
    try { process.kill(pid, 0); throw new Error(`题库队列已经在运行：PID ${pid}`); }
    catch (error) { if (error.code !== 'ESRCH') throw error; }
}
fs.writeFileSync(lock, String(process.pid));
try { await import('./run-five-dimension-queue.mjs'); }
finally { if (fs.existsSync(lock) && fs.readFileSync(lock, 'utf8') === String(process.pid)) fs.unlinkSync(lock); }
