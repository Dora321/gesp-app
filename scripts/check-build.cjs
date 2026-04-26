const { execSync } = require('child_process');
try {
  execSync('node node_modules/vite/bin/vite.js build', { timeout: 120000, encoding: 'utf8' });
  console.log('BUILD OK');
} catch (e) {
  console.log('BUILD FAILED');
  const err = e.stderr || e.stdout || '';
  console.log(err.slice(-800));
}
