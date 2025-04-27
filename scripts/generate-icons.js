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
  path.join(iconDestDir, 'favicon-32x32.png')
];

for (const imgPath of possibleSourceImages) {
  if (fs.existsSync(imgPath)) {
    sourceImage = imgPath;
    break;
  }
}

// If no source image is found, create a placeholder
if (!sourceImage) {
  console.log('No source image found. Creating a placeholder image...');
  
  const placeholderPath = path.join(iconDestDir, 'temp-source.png');
  
  try {
    // Create a simple placeholder image (a blue square)
    const placeholderSize = 512;
    sharp({
      create: {
        width: placeholderSize,
        height: placeholderSize,
        channels: 4,
        background: { r: 99, g: 102, b: 241, alpha: 1 } // Indigo color
      }
    })
    .png()
    .toFile(placeholderPath)
    .then(() => {
      sourceImage = placeholderPath;
      console.log('Created placeholder image as source');
      generateIcons();
    });
    return; // Exit early - generateIcons will be called after placeholder is created
  } catch (err) {
    console.error('Failed to create placeholder image:', err);
    process.exit(1);
  }
} else {
  console.log(`Using source image: ${sourceImage}`);
  generateIcons();
}

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

    // Create temporary file paths with unique names to avoid conflicts
    const tempDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'icons-'));
    
    // Generate icons with unique output filenames
    await Promise.all([
      // Basic favicons
      image.clone().resize(16, 16).png().toFile(path.join(tempDir, 'favicon-16x16.png')),
      image.clone().resize(32, 32).png().toFile(path.join(tempDir, 'favicon-32x32.png')),
      
      // Apple touch icon
      image.clone().resize(180, 180).png().toFile(path.join(tempDir, 'apple-touch-icon.png')),
      
      // PWA icons
      image.clone().resize(192, 192).png().toFile(path.join(tempDir, 'logo192.png')),
      image.clone().resize(512, 512).png().toFile(path.join(tempDir, 'logo512.png')),
      
      // Maskable icon with padding for safe zone
      image.clone().resize(512, 512).png().toFile(path.join(tempDir, 'maskable_icon.png')),
      

      // Create safari-pinned-tab as PNG first (will be converted later if needed)
      // Use grayscale instead of extractChannel which was causing issues
      image.clone()
        .resize(32, 32)
        .grayscale()  // Convert to grayscale instead of extractChannel
        .threshold(128) // Apply threshold to make it more suitable for monochrome
        .png()
        .toFile(path.join(tempDir, 'safari-pinned-tab.png')),

      // Favicon.ico (simple version - just copy the 32x32 PNG)
      image.clone().resize(32, 32).png().toFile(path.join(tempDir, 'favicon.ico')),
    ]);
    
    // Copy the temporary files to the destination directory
    const files = fs.readdirSync(tempDir);
    
    for (const file of files) {
      const tempFilePath = path.join(tempDir, file);
      const destFilePath = path.join(iconDestDir, file);
      
      // Remove destination file if it exists to avoid overwrite errors
      if (fs.existsSync(destFilePath)) {
        fs.unlinkSync(destFilePath);
      }
      
      // Copy from temp to destination
      fs.copyFileSync(tempFilePath, destFilePath);
      console.log(`✅ Generated: ${file}`);
    }
    
    // Create the SVG version of safari-pinned-tab if needed
    // Since Sharp doesn't directly support SVG output, we'll create a simple SVG file
    try {
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#000000" />
      </svg>`;
      fs.writeFileSync(path.join(iconDestDir, 'safari-pinned-tab.svg'), svgContent);
      console.log(`✅ Generated: safari-pinned-tab.svg (basic version)`);
    } catch (svgError) {
      console.error(`⚠️ Error creating SVG: ${svgError.message}`);
      console.log(`ℹ️ You may need to create safari-pinned-tab.svg manually.`);
    }
    
    // Clean up temp directory
    for (const file of files) {
      fs.unlinkSync(path.join(tempDir, file));
    }
    fs.rmdirSync(tempDir);
    
    console.log('✅ All icons generated successfully!');
    console.log(`Icons saved to: ${iconDestDir}`);
    
    console.log('\n📝 Note: For best quality favicon.ico, consider using an online ICO generator');
    console.log('with the generated favicon-16x16.png and favicon-32x32.png files.');
    
    // Clean up the temp source image if we created one
    if (sourceImage.includes('temp-source.png') && fs.existsSync(sourceImage)) {
      fs.unlinkSync(sourceImage);
    }
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}
