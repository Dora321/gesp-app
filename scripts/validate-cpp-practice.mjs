import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { cppProgrammingExercises } from '../src/data/cppProgrammingPractice.js';

// 一次编译所有参考实现，隔离命名空间后逐样例运行，避免反复编译头文件。
const work = mkdtempSync(join(tmpdir(), 'gesp-cpp-practice-'));
try {
  const includes = new Set();
  const bodies = cppProgrammingExercises.map((exercise, i) => {
    const code = exercise.referenceCode.replace(/^#include[^\n]+/gm, line => { includes.add(line); return ''; });
    return `namespace task${i} {\n${code.replace('int main()', 'int solve()')}\n}`;
  });
  const source = [...includes, ...bodies, `int main(int argc, char **argv) {\nif(argc != 2) return 2;\nswitch(std::stoi(argv[1])) {\n${cppProgrammingExercises.map((_, i) => `case ${i}: return task${i}::solve();`).join('\n')}\n}\nreturn 2;\n}`].join('\n');
  const file = join(work, 'practice.cpp');
  const binary = join(work, 'practice');
  writeFileSync(file, source);
  const compile = spawnSync(process.env.CXX || 'c++', ['-std=c++17', '-O2', '-Wall', '-Wextra', file, '-o', binary], { encoding: 'utf8', timeout: 60000 });
  assert.equal(compile.status, 0, compile.error?.message || compile.stderr);
  let checked = 0;
  for (const [index, exercise] of cppProgrammingExercises.entries()) {
    for (const sample of exercise.samples) {
      const run = spawnSync(binary, [String(index)], { input: sample.input, encoding: 'utf8', timeout: 2000 });
      assert.equal(run.status, 0, `${exercise.id}: ${run.error?.message || run.stderr}`);
      assert.equal(run.stdout.trimEnd(), sample.output.trimEnd(), `${exercise.id}: 输入 ${JSON.stringify(sample.input)}`);
      checked++;
    }
  }
  console.log(`${cppProgrammingExercises.length} 道参考程序编译成功，${checked} 组样例全部通过。`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
