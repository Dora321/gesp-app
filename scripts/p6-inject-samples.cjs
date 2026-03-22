const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp');
const samplesDict = JSON.parse(fs.readFileSync('/tmp/luogu-scraper/luogu-samples.json', 'utf8'));
const mapFile = fs.readFileSync(path.join(DATA_DIR, 'paperCodingMap.js'), 'utf8');

const jsonStr = mapFile.replace('export const paperCodingMap = ', '').replace(/;\s*$/, '');
const paperMap = eval('(' + jsonStr + ')');

let totalInjected = 0;
let missingFromLuogu = 0;

for (const paperId of Object.keys(paperMap)) {
    // Determine level from paperId e.g. 2023-03-l1
    const levelFolder = 'level' + paperId.split('-l')[1];
    const filePath = path.join(DATA_DIR, levelFolder, paperId + '.js');
    
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        continue;
    }
    
    let code = fs.readFileSync(filePath, 'utf8');
    const mapping = paperMap[paperId]; // { q26: 'B3834', q27: 'B3835' }
    
    // Process each mapped question from the back so indexes don't shift forward if we replace
    // Actually, finding via index and substring is safer if done sequentially and tracked
    
    for (const qKey of Object.keys(mapping)) {
        const luoguPid = mapping[qKey];
        const samples = samplesDict[luoguPid];
        
        if (!samples || samples.length === 0) {
            console.log(`[WARN] No samples fetched for ${paperId} ${qKey} (${luoguPid})`);
            missingFromLuogu++;
            continue;
        }
        
        const qNum = qKey.replace('q', ''); // 26, 27, 16, 17
        
        // Find identifier
        const idRegex = new RegExp(`id:\\s*['"\`]?${qNum}['"\`]?\\b`);
        const match = code.match(idRegex);
        if(!match) {
            console.log(`[WARN] Could not find id: ${qNum} in ${paperId}`);
            continue;
        }
        
        const qIndex = match.index;
        
        // Find next 'samples: [' or 'samples: [{'
        const placeholderTarget = "samples: [{ input: '待补充', output: '待补充' }]";
        const sampleIndex = code.indexOf(placeholderTarget, qIndex);
        
        if (sampleIndex !== -1 && sampleIndex < qIndex + 3000) { // Limit distance to ensure it's still within the same question
            
            // Build replacement
            let formattedSamples = 'samples: [\n';
            samples.forEach((s, idx) => {
                // escape backticks and $ just in case, though template literals inside node are needed
                let escInput = s.input.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\$/g, '\\$');
                let escOutput = s.output.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\$/g, '\\$');
                
                formattedSamples += `        { input: \`${escInput}\`, output: \`${escOutput}\` }`;
                if(idx < samples.length - 1) formattedSamples += ',\n';
                else formattedSamples += '\n';
            });
            formattedSamples += '      ]';
            
            code = code.substring(0, sampleIndex) + formattedSamples + code.substring(sampleIndex + placeholderTarget.length);
            totalInjected++;
            console.log(`[OK] Injected ${samples.length} samples into ${paperId} ${qKey}`);
        } else {
            console.log(`[SKIP] Did not find placeholder samples for ${paperId} ${qKey} or it's already injected.`);
        }
    }
    
    fs.writeFileSync(filePath, code, 'utf8');
}

console.log(`\nInjection Complete! Successfully injected: ${totalInjected}. Missing from Luogu: ${missingFromLuogu}`);
