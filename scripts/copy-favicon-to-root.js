const fs = require('fs');
const path = require('path');

// Define source and destination paths
const sourceDir = path.join(__dirname, '../public/icons');
const destDir = path.join(__dirname, '../dist'); // Vite builds to 'dist' by default

// Files to copy to root
const filesToCopy = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'safari-pinned-tab.svg',
  'logo192.png',
  'logo512.png',
  'maskable_icon.png'
];

/**
 * Copy favicon files from public/icons to build root
 */
function copyFaviconsToRoot() {
  console.log('📂 Copying favicon files to build root directory...');

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    console.log(`Creating build directory: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Keep track of successful copies
  let successCount = 0;
  let errorCount = 0;

  // Copy each file
  filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);

    try {
      // Only copy if source file exists
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
        successCount++;
      } else {
        console.warn(`⚠️ Source file not found: ${sourcePath}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error copying ${file}:`, error.message);
      errorCount++;
    }
  });

  console.log(`\n📝 Summary: ${successCount} files copied, ${errorCount} errors\n`);

  // Exit with error code if any files failed to copy
  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run the copy function
copyFaviconsToRoot();
