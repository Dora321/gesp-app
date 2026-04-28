const fs = require('fs');
const path = require('path');

const TEMPLATE_PATTERNS = [
  /与题目要求不符，请对照正确解析重新理解/,
  /该数值与正确计算结果不符，请重新验算/,
  /该代码逻辑与题目要求不符，请逐步推演/,
  /取模运算的结果需要仔细计算，注意运算符优先级/,
  /进制转换结果有误，请重新按权展开计算/,
  /位运算结果计算有误，请逐步推演每一位的运算/,
  /数组下标从 0 开始，请仔细验证下标范围/,
  /字符的 ASCII 码值需要查表确认/,
  /不同排序算法的稳定性不同/,
  /递归必须有终止条件，请检查递归出口是否正确/,
  /混淆了原码、反码、补码的转换规则/,
  /需要验证循环条件是否最终会变为假/,
  /C\+\+ 对某些写法可能不会报错/,
  /逻辑运算符的使用方式与正确答案不同/,
  /此选项说法有误/,
  /计算有误$/,
  /计算结果不正确$/,
  /代码逻辑与正确答案不符$/,
  /与正确答案.*不符$/,
  /此说法有误[，,]/,
  /代码逻辑有误[，,]/,
  /正确结果为\s*-?\d+\.?\d*，此选项\s*-?\d+\.?\d*\s*计算有误/,
  /正确结果为\s*-?\d+\.?\d*，此选项\s*-?\d+\.?\d*\s*不正确/,
];

function checkFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('shared'));
  let count = 0;
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*-\s*\*\*([A-F])\s+([^*]*(?:\*[^*])*)\*\*[^：:]*[：:]\s*(.+)$/);
      if (match) {
        const reason = match[3].trim();
        for (const p of TEMPLATE_PATTERNS) {
          if (p.test(reason)) {
            console.log(`[${p}] matched: ${reason}`);
            count++;
            break; // Stop at first match
          }
        }
      }
    }
  }
  console.log(`Total matches in ${dir}: ${count}`);
}

checkFiles('src/data/gesp/level3');
checkFiles('src/data/gesp/level2');
checkFiles('src/data/gesp/level1');
