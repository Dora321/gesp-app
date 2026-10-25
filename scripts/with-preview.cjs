const { spawn } = require('node:child_process');
const path = require('node:path');
const port = Number(process.env.CHECK_PREVIEW_PORT || 4187);
const base = 'http://127.0.0.1:' + port + '/gesp-app';
const server = spawn(process.execPath, [path.resolve('node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort', '--base', '/gesp-app/'], { stdio: 'inherit', windowsHide: true });
(async () => {
  try {
    let ready = false;
    let lastFailure = 'No response';
    for (let attempt = 0; attempt < 60; attempt++) {
      if (server.exitCode !== null) throw new Error('Preview server exited before startup');
      try {
        const response = await fetch(base + '/', { signal: AbortSignal.timeout(2000) });
        if (response.ok) { ready = true; break; }
        lastFailure = 'HTTP ' + response.status;
      } catch (error) { lastFailure = error.cause?.message || error.message; }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (!ready) throw new Error('Preview did not become ready at ' + base + '/: ' + lastFailure);
    const child = spawn(process.execPath, process.argv.slice(2), { stdio: 'inherit', windowsHide: true, env: { ...process.env, CPP_PRACTICE_BASE_URL: base, EXPERIENCE_BASE_URL: base } });
    process.exitCode = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', code => resolve(code ?? 1)); });
  } catch (error) { console.error(error); process.exitCode = 1; }
  finally { server.kill(); }
})();
