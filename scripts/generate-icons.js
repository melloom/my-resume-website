const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const { createCanvas } = require('canvas');

// Source image - use your profile photo or logo
const SOURCE_IMAGE = path.join(__dirname, '../public/photo 1.jpg');
// Output directory for icons
const ICONS_DIR = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
fs.ensureDirSync(ICONS_DIR);

// Icon sizes needed for different platforms
const ICON_SIZES = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

// Helper function to create text-based icon for development purposes
const createTextIcon = async (size, text = 'MP') => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#6366f1'; // Primary color
  ctx.fillRect(0, 0, size, size);
  
  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.5}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2);
  
  return canvas.toBuffer('image/png');
};

// Generate regular icons
const generateIcons = async () => {
  try {
    // Check if source image exists, if not create text-based icon
    const sourcePath = SOURCE_IMAGE;
    console.log(`Generating icons from ${sourcePath}...`);
    
    // Load the source image or create text-based placeholder
    let imageBuffer;
    try {
      if (fs.existsSync(sourcePath)) {
        imageBuffer = await fs.readFile(sourcePath);
      } else {
        console.log('Source image not found, creating placeholder icons...');
        imageBuffer = await createTextIcon(512);
      }
    } catch (err) {
      console.log('Error reading source image, creating placeholder icons...');
      imageBuffer = await createTextIcon(512);
    }
    
    // Process for all required sizes
    for (const size of ICON_SIZES) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}.png`);
      
      await sharp(imageBuffer)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);
      
      console.log(`Created ${outputPath}`);
    }
    
    // Generate specific named icons
    const specificIcons = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 192, name: 'logo192.png' },
      { size: 512, name: 'logo512.png' },
      { size: 180, name: 'apple-touch-icon.png' }
    ];
    
    for (const icon of specificIcons) {
      const outputPath = path.join(ICONS_DIR, icon.name);
      
      await sharp(imageBuffer)
        .resize(icon.size, icon.size, {
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);
      
      console.log(`Created ${outputPath}`);
    }
    
    // Create maskable icon (with padding to ensure no content is cut off)
    const maskableSize = 512;
    const padding = maskableSize * 0.1; // 10% safe area
    
    await sharp(imageBuffer)
      .resize(maskableSize - padding * 2, maskableSize - padding * 2, {
        fit: 'cover',
        position: 'center'
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 99, g: 102, b: 241, alpha: 1 } // #6366f1
      })
      .toFile(path.join(ICONS_DIR, 'maskable_icon.png'));
    
    console.log('Created maskable_icon.png');
    
    // Create favicon.ico (contains 16x16, 32x32, and 48x48)
    const favicon16 = await sharp(imageBuffer).resize(16, 16).toBuffer();
    const favicon32 = await sharp(imageBuffer).resize(32, 32).toBuffer();
    const favicon48 = await sharp(imageBuffer).resize(48, 48).toBuffer();
    
    // Use sharp to convert to ICO format
    await sharp(favicon16)
      .toFormat('ico')
      .toFile(path.join(ICONS_DIR, 'favicon.ico'));
    
    console.log('Created favicon.ico');
    
    // Copy favicon.ico to root directory for backwards compatibility
    fs.copySync(
      path.join(ICONS_DIR, 'favicon.ico'),
      path.join(__dirname, '../public/favicon.ico')
    );
    
    console.log('Copied favicon.ico to root directory');
    
    // Create placeholder offline image
    const offlineCanvas = createCanvas(512, 512);
    const ctx = offlineCanvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);
    
    // Draw offline symbol
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 220px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('📶', 256, 220);
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText('Offline', 256, 360);
    
    // Save the offline image
    fs.writeFileSync(
      path.join(ICONS_DIR, 'offline-image.png'),
      offlineCanvas.toBuffer('image/png')
    );
    
    console.log('Created offline-image.png');
    
    // Create notification badge
    const badgeCanvas = createCanvas(96, 96);
    const badgeCtx = badgeCanvas.getContext('2d');
    
    // Draw badge background
    badgeCtx.fillStyle = '#6366f1';
    badgeCtx.beginPath();
    badgeCtx.arc(48, 48, 48, 0, 2 * Math.PI);
    badgeCtx.fill();
    
    // Draw notification symbol
    badgeCtx.fillStyle = '#ffffff';
    badgeCtx.font = 'bold 60px sans-serif';
    badgeCtx.textAlign = 'center';
    badgeCtx.textBaseline = 'middle';
    badgeCtx.fillText('!', 48, 48);
    
    // Save the notification badge
    fs.writeFileSync(
      path.join(ICONS_DIR, 'notification-badge.png'),
      badgeCanvas.toBuffer('image/png')
    );
    
    console.log('Created notification-badge.png');
    
    console.log('All icons generated successfully!');
    
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
};

generateIcons();
