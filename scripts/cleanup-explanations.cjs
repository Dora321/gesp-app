const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.resolve(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(file));
      } else if (file.endsWith('.js')) {
        results.push(file);
      }
    });
  } catch (err) {
    console.error('Error walking directory:', err);
  }
  return results;
}

const dataDir = path.join(__dirname, '../src/data/gesp');
const files = walk(dataDir);
let modifiedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // 识别该文件是否包含批量生成的低质解析特征（如省略号截断、套话重复等）
  const hasBadGeneration = 
    content.includes('此说法不正确') || 
    content.includes('…') || // AI 常用的单字号省略截断
    content.includes('**纠错：** 原命题说法有误') || 
    content.includes('**易混概念：**'); // AI反复车轱辘话
                           
  if (hasBadGeneration) {
      // 1. 删除选择题下面累赘出错的逐项解析 (以 "- **A", "- **B**" 起始的整行)
      content = content.replace(/^[ \t]*-[ \t]*\*\*[a-zA-Z].*?$/gm, '');
      
      // 2. 删除多余的幻觉字段
      content = content.replace(/^[ \t]*\*\*纠错：\*\*.*?$/gm, '');
      content = content.replace(/^[ \t]*\*\*易混概念：\*\*.*?$/gm, '');
      
      // 3. 清理因为删除行而产生的过多空行 (3个或以上换行合并为2个)
      content = content.replace(/(\n[ \t]*){3,}/g, '\n      \n');
  }

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`[已清理] ${path.basename(f)}`);
    modifiedCount++;
  }
});

console.log(`\n🎉 清理完成！共处理删除了 ${modifiedCount} 个文件中的低劣解析冗余文本。`);
