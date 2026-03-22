const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp/level1');
const codes = require('./answers.json');

let todos = JSON.parse(fs.readFileSync(path.join(__dirname, '../l1_todos.json'), 'utf8'));

let successCount = 0;
todos.forEach(item => {
    let filePath = path.join(DATA_DIR, item.file);
    let code = fs.readFileSync(filePath, 'utf8');
    
    let targetQ = String.fromCharCode(10) + '# [GESP' + item.file.substring(0, 4) + item.file.substring(5, 7) + ' 一级] ' + item.title;
    let qIndex = code.indexOf(targetQ);
    
    if (qIndex !== -1) {
        let beforeCode = code.substring(0, qIndex);
        let afterCode = code.substring(qIndex);
        
        let lastRefIndex = beforeCode.lastIndexOf('referenceCode:');
        if (lastRefIndex !== -1) {
            let veryBeginning = beforeCode.substring(0, lastRefIndex);
            
            let answerCode = codes[item.title];
            if (answerCode) {
                let replacement = 'referenceCode: `' + answerCode.replace(/`/g, '\\\\`') + '`,' + String.fromCharCode(10) + '      question: `';
                
                code = veryBeginning + replacement + afterCode;
                fs.writeFileSync(filePath, code, 'utf8');
                console.log("✅ Applied reference code for " + item.title + " to " + item.file);
                successCount++;
            } else {
                console.log("⚠️ Missing code for", item.title);
            }
        }
    } else {
        console.log("❌ Could not find target title for " + item.title + " in " + item.file);
    }
});
console.log("Completed " + successCount + " files.");
