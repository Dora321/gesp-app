import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data/gesp/level3');

function validate() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js'));
  console.log(`Validating ${files.length} Level 3 files...\n`);

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    try {
      // Basic check for unmatched backticks or characters that break parsing
      const content = fs.readFileSync(filePath, 'utf8');
      
      // We can't easily evaluate ESM files in this script without complex setup, 
      // but we can check for common issues.
      // Check for even number of backticks in referenceCode
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
