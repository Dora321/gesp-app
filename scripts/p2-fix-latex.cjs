const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp');

function fixFile(relPath, linePredicate, newString) {
    const fullPath = path.join(DATA_DIR, relPath);
    if(!fs.existsSync(fullPath)) return;
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\\n');
    let modified = false;
    for(let i=0; i<lines.length; i++){
        if(linePredicate(lines[i])) {
            lines[i] = newString;
            modified = true;
            console.log(`✅ Fixed ${relPath} at line ${i+1}`);
        }
    }
    if(modified){
        fs.writeFileSync(fullPath, lines.join('\\n'), 'utf8');
    } else {
        console.log(`❌ Failed to fix ${relPath}`);
    }
}

// 1. L1 累计相加
fixFile('level1/2023-06-l1.js', 
    line => line.includes('约定 $1') && !line.includes('100'),
    '输入一个正整数 $n$。约定 $1 \\\\le n \\\\le 100$。'
);

// 2. L2 小杨做题
fixFile('level2/2023-12-l2.js', 
    line => line.includes('保证 $0 \\\\le a,b \\\\le 10$；$a,b') && !line.includes('364'),
    '保证 $0 \\\\le a,b \\\\le 10$；$a,b < m \\\\le 1000$；$3 \\\\le N \\\\le 364$。'
);

// 3. L4 密码合规
fixFile('level4/2023-06-l4.js', 
    line => line.includes('!@#$') && !line.includes('\\\\$'),
    '3. 大写字母，小写字母和数字必须至少有其中两种，以及至少有四个特殊字符中的一个（诸如 \\`!@#\\\\$\\` ）。'
);
// Wait, the precise line for L4 L383 is:
// "1. 只能由 $\\\\texttt a \\\\sim \\\\texttt z$ 之间 $26$ 个小写字母、$\\\\texttt A \\\\sim \\\\texttt Z$ 之间 $26$ 个大写字母、$0 \\\\sim 9$ 之间 $10$ 个数字以及 \\`!@#$\\` 四个特殊字符构成。"
// I'll rewrite the fixer for L4
fixFile('level4/2023-06-l4.js', 
    line => line.includes('!@#') && line.includes('四个特殊字符构成'),
    '1. 只能由 $\\\\texttt a \\\\sim \\\\texttt z$ 之间 $26$ 个小写字母、$\\\\texttt A \\\\sim \\\\texttt Z$ 之间 $26$ 个大写字母、$0 \\\\sim 9$ 之间 $10$ 个数字以及 \\`!@#\\\\$\\` 四个特殊字符构成。'
);


// 4. L5 原根判断
fixFile('level5/2025-03-l5.js', 
    line => line.includes('+ $1') && !line.includes('p'),
    '+ $1 \\\\le g < p$'
);

// 5. L6 环线
fixFile('level6/2025-03-l6.js', 
    line => line.includes('车站 $i') && !line.includes('n)$'),
    '小 A 喜欢坐地铁。地铁环线有 $n$ 个车站，依次以 $1,2,\\\\cdots,n$ 标号。车站 $i\\\\ (1\\\\leq i \\\\le n)$' // need to replace the whole line carefully
);

// wait the above line for L6 is:
// "小 A 喜欢坐地铁。地铁环线有 $n$ 个车站，依次以 $1,2,\\cdots,n$ 标号。车站 $i\ (1\leq i"
fixFile('level6/2025-03-l6.js', 
    line => line.includes('小 A 喜欢坐地铁') && line.includes('车站 $i'),
    '小 A 喜欢坐地铁。地铁环线有 $n$ 个车站，依次以 $1,2,\\\\cdots,n$ 标号。车站 $i\\\\ (1\\\\leq i \\\\le n)$'
);

// 6. L6 路径覆盖
fixFile('level6/2025-12-l6.js', 
    line => line.includes('表示结点 $i$ 的父结点的编号') && line.includes('保证 $f_i'),
    '第二行，$n-1$ 个正整数 $f_2,f_3,\\\\ldots,f_n$，其中 $f_i$ 表示结点 $i$ 的父结点的编号，保证 $f_i < i$。'
);

// 7. L7 商品交易
// The line was "第一行四个整数 $N , M , a , b$，分别表示商品的数量、商人的数量、你持有的商品以及你希望获得的商品。保证 $0 \le a,b < N$ ，保证 $a"
fixFile('level7/2023-12-l7.js', 
    line => line.includes('第一行四个整数') && line.includes('你希望获得的商品'),
    '第一行四个整数 $N , M , a , b$，分别表示商品的数量、商人的数量、你持有的商品以及你希望获得的商品。保证 $0 \\\\le a,b < N$ ，保证 $a \\\\ne b$。'
);
