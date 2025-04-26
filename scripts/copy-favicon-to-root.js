import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination paths
const sourcePath = path.resolve(__dirname, '../public/icons/favicon.ico');
const destPath = path.resolve(__dirname, '../public/favicon.ico');

// Copy the favicon to the root directory
try {
  fs.copyFileSync(sourcePath, destPath);
  console.log('Favicon copied to root directory successfully!');
} catch (error) {
  console.error('Error copying favicon to root:', error);
}
