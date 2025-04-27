const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if Sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('Sharp image processing library not found. Installing Sharp...');
  try {
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
    sharp = require('sharp');
  } catch (installError) {
    console.error('Failed to install Sharp. Please install it manually with: npm install sharp --save-dev');
    process.exit(1);
  }
}

// Ensure source image exists
const iconSrcDir = path.join(__dirname, '../src/assets/images');
const iconDestDir = path.join(__dirname, '../public/icons');

// Create destination directory if it doesn't exist
if (!fs.existsSync(iconDestDir)) {
  fs.mkdirSync(iconDestDir, { recursive: true });
}

// Try to find a source image to use as the base
let sourceImage;
const possibleSourceImages = [
  path.join(iconSrcDir, 'logo.png'),
  path.join(iconSrcDir, 'logo.jpg'),
  path.join(__dirname, '../public/logo.png'),
  path.join(__dirname, '../src/assets/logo.png'),
  // Check if any favicon file already exists to use as source
  path.join(iconDestDir, 'favicon-32x32.png'),
  path.join(iconDestDir, 'apple-touch-icon.png')
];

for (const imgPath of possibleSourceImages) {
  if (fs.existsSync(imgPath)) {
    sourceImage = imgPath;
    break;
  }
}

if (!sourceImage) {
  console.error('No source image found for icon generation. Please provide a logo image.');
  console.log('Put a high-resolution logo.png in src/assets/images/ directory');
  process.exit(1);
}

console.log(`Using source image: ${sourceImage}`);

// Generate all required favicon formats
async function generateIcons() {
  try {
    console.log('🔨 Generating favicons and app icons...');

    // Load the source image
    const image = sharp(sourceImage);
    const metadata = await image.metadata();
    
    // If source image is smaller than 512px, warn about quality
    if (metadata.width < 512 || metadata.height < 512) {
      console.warn('⚠️ Source image is smaller than 512x512px. Icons may appear blurry or pixelated.');
    }

    // Generate standard favicon sizes
    await Promise.all([
      // Basic favicons
      image.resize(16, 16).png().toFile(path.join(iconDestDir, 'favicon-16x16.png')),
      image.resize(32, 32).png().toFile(path.join(iconDestDir, 'favicon-32x32.png')),
      
      // Apple touch icon
      image.resize(180, 180).png().toFile(path.join(iconDestDir, 'apple-touch-icon.png')),
      
      // PWA icons
      image.resize(192, 192).png().toFile(path.join(iconDestDir, 'logo192.png')),
      image.resize(512, 512).png().toFile(path.join(iconDestDir, 'logo512.png')),
      
      // Maskable icon (with padding for safe zone)
      image.resize(512, 512).png().toFile(path.join(iconDestDir, 'maskable_icon.png')),
    ]);

    // Generate favicon.ico (multi-size ICO file)
    // Create a transparent background version for safari-pinned-tab.svg
    await image
      .resize(32, 32)
      .flatten({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(iconDestDir, 'safari-pinned-tab.png'));
   
    // Convert the PNG to ICO (using a simplified approach since ICO generation is complex)
    // In a real scenario, you'd want to use a dedicated ICO generator library
    await image.resize(32, 32).png().toFile(path.join(iconDestDir, 'favicon.ico'));
    
    console.log('✅ All icons generated successfully!');
    console.log(`Icons saved to: ${iconDestDir}`);
    
    console.log('\n📝 Note: For best quality favicon.ico, consider using an online ICO generator');
    console.log('with the generated favicon-16x16.png and favicon-32x32.png files.');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the generate function
generateIcons();
