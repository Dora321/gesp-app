// Offline contract tests for the launcher's environment setup. The queue
// entry point is replaced by a stub, so no audit, worker or network code runs.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const launcherSource = path.join(repoRoot, 'scripts/launch-five-dimension-queue.mjs');
const DUMMY_OPENCODE_KEY = 'dummy-opencode-key-for-fixture';
const DUMMY_AUTH_KEY = 'dummy-auth-file-key-for-fixture';
const DUMMY_GH_TOKEN = 'dummy-gh-token-for-fixture';
const EXTRA_PATH = '/home/box/bin:/home/box/cxxenv/bin:/home/box/.opencode/bin:/workspace/bin';

function createFixture(t, { authJson = '{invalid json' } = {}) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gesp-launcher-test-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));

    const home = path.join(root, 'home');
    const cache = path.join(root, 'cache');
    const scripts = path.join(root, 'scripts');
    const capture = path.join(root, 'capture.json');
    fs.mkdirSync(scripts, { recursive: true });

    // Run the real launcher from a fixture directory next to a stub queue entry
    // point. If the launcher touches the real queue module, the test fails.
    fs.copyFileSync(launcherSource, path.join(scripts, 'launch-five-dimension-queue.mjs'));
    fs.writeFileSync(path.join(scripts, 'run-five-dimension-queue.mjs'), `
import fs from 'node:fs';
fs.writeFileSync(${JSON.stringify(capture)}, JSON.stringify({
    opencodeApiKey: process.env.OPENCODE_API_KEY ?? null,
    ghToken: process.env.GH_TOKEN ?? null,
    path: process.env.PATH ?? null,
    concurrency: process.env.GESP_QUEUE_CONCURRENCY ?? null,
    existingWorkers: process.env.GESP_EXISTING_WORKERS ?? null,
    auditCache: process.env.GESP_AUDIT_CACHE ?? null,
}));
`);

    if (authJson !== null) {
        const authDir = path.join(home, '.local/share/opencode');
        fs.mkdirSync(authDir, { recursive: true });
        fs.writeFileSync(path.join(authDir, 'auth.json'), authJson);
    }

    // A token file must never be consulted by the launcher.
    const ghDir = path.join(home, '.config/gh');
    fs.mkdirSync(ghDir, { recursive: true });
    fs.writeFileSync(path.join(ghDir, 'token.env'), `export GH_TOKEN='${DUMMY_GH_TOKEN}'\n`);

    return { root, home, cache, capture, launcher: path.join(scripts, 'launch-five-dimension-queue.mjs') };
}

function runLauncher(fixture, env = {}) {
    const result = spawnSync(process.execPath, [fixture.launcher], {
        cwd: fixture.root,
        env: {
            HOME: fixture.home,
            PATH: '/usr/bin:/bin',
            GESP_AUDIT_CACHE: fixture.cache,
            ...env,
        },
        encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.doesNotMatch(result.stdout + result.stderr, new RegExp(DUMMY_OPENCODE_KEY));
    assert.doesNotMatch(result.stdout + result.stderr, new RegExp(DUMMY_AUTH_KEY));
    return JSON.parse(fs.readFileSync(fixture.capture, 'utf8'));
}

test('preset OPENCODE_API_KEY skips auth.json, creates the cache dir, extends PATH, defaults to 3 workers', t => {
    const fixture = createFixture(t);
    const captured = runLauncher(fixture, { OPENCODE_API_KEY: DUMMY_OPENCODE_KEY });

    // The fixture auth.json is deliberately invalid: reading it would throw.
    assert.equal(captured.opencodeApiKey, DUMMY_OPENCODE_KEY);
    assert.equal(captured.ghToken, null);
    assert.equal(captured.path, `${EXTRA_PATH}:/usr/bin:/bin`);
    assert.equal(captured.concurrency, '3');
    assert.equal(captured.existingWorkers, '[]');
    assert.equal(captured.auditCache, fixture.cache);
    assert.equal(fs.existsSync(fixture.cache), true);
    assert.equal(fs.existsSync(path.join(fixture.cache, 'queue.pid')), false);
});

test('an explicit GESP_QUEUE_CONCURRENCY is preserved', t => {
    const fixture = createFixture(t);
    const captured = runLauncher(fixture, {
        OPENCODE_API_KEY: DUMMY_OPENCODE_KEY,
        GESP_QUEUE_CONCURRENCY: '5',
    });

    assert.equal(captured.concurrency, '5');
});

test('auth.json is only read when OPENCODE_API_KEY is absent', t => {
    const fixture = createFixture(t, {
        authJson: JSON.stringify({ 'opencode-go': { key: DUMMY_AUTH_KEY } }),
    });
    const captured = runLauncher(fixture);

    assert.equal(captured.opencodeApiKey, DUMMY_AUTH_KEY);
    assert.equal(captured.ghToken, null);
});

test('the launcher does not extract GitHub tokens from files', () => {
    const source = fs.readFileSync(launcherSource, 'utf8');
    assert.doesNotMatch(source, /GH_TOKEN|token\.env|\.config\/gh/);
});
