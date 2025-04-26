import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const iconSource = path.resolve(__dirname, '../public/favicon.ico');
const outputDir = path.resolve(__dirname, '../public/icons');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
async function generateIcons() {
  try {
    console.log('Generating app icons from favicon.ico...');
    console.log('Source file:', iconSource);
    console.log('Output directory:', outputDir);
    
    // Generate standard favicons
    await sharp(iconSource)
      .resize(16, 16)
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    
    await sharp(iconSource)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    
    // Generate Apple touch icon
    await sharp(iconSource)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
      
    // Generate PWA icons
    for (const size of sizes) {
      if (size === 16 || size === 32) continue; // Already generated
      
      await sharp(iconSource)
        .resize(size, size)
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
        
      console.log(`Generated ${size}x${size} icon`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    console.error('Error details:', error.message);
  }
}

// Execute the function
generateIcons();
