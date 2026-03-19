import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data/gesp/level4');

function validate() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js'));
  console.log(`Validating ${files.length} Level 4 files...\n`);

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      const backtickCount = (content.match(/`/g) || []).length;
      if (backtickCount % 2 !== 0) {
        console.error(`[FAIL] ${file}: Unmatched backticks found!`);
      } else {
        console.log(`[OK] ${file}`);
      }
    } catch (err) {
      console.error(`[FAIL] ${file}: ${err.message}`);
    }
  });
}

validate();
