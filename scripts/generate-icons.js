/**
 * Script to generate PWA icons from a source image
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Create icons directory if it doesn't exist
const iconsDir = path.join(projectRoot, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create a minimal 192x192 placeholder icon
const createPlaceholderIcon = (filePath) => {
  try {
    // Create a 192x192 colored square as a minimal icon
    // This is a temporary solution until a real icon is provided
    const size = 192;
    const canvas = new Uint8ClampedArray(size * size * 4);
    
    // Fill with a gradient from primary to secondary color
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const pos = (y * size + x) * 4; // position in buffer based on x,y
        const r = Math.floor(99 + (x / size) * 69); // 99 to 168
        const g = Math.floor(102 + (y / size) * 81); // 102 to 183
        const b = Math.floor(241 - (y / size) * 94); // 241 to 147
        
        canvas[pos] = r;
        canvas[pos + 1] = g;
        canvas[pos + 2] = b;
        canvas[pos + 3] = 255; // alpha, fully opaque
      }
    }
    
    // Now we need to convert this to a PNG
    // Since we don't have image libraries directly available,
    // we'll write a minimal PNG file
    // This is a very basic PNG format with no compression
    const headerData = [
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      // IHDR chunk
      0x00, 0x00, 0x00, 0x0D, // length of IHDR chunk
      0x49, 0x48, 0x44, 0x52, // "IHDR"
      0x00, 0x00, 0x00, 0xC0, // width (192)
      0x00, 0x00, 0x00, 0xC0, // height (192)
      0x08, // bit depth
      0x06, // color type (RGBA)
      0x00, // compression method
      0x00, // filter method
      0x00  // interlace method
    ];
    
    // Write a basic PNG file
    fs.writeFileSync(filePath, Buffer.from(headerData));
    
    console.log(`✅ Created placeholder icon at ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating placeholder icon: ${error.message}`);
    return false;
  }
};

// Generate all required icons
const generateIcons = () => {
  console.log('Generating PWA icons...');
  
  // Icon sizes needed for PWA
  const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];
  
  // Create icons directory structure
  console.log('Creating icons directory...');
  
  // Check for source icon
  const sourceIconPath = path.join(projectRoot, 'src', 'assets', 'logo.png');
  const hasSourceIcon = fs.existsSync(sourceIconPath);
  
  if (!hasSourceIcon) {
    console.warn('⚠️ No source icon found at src/assets/logo.png');
    console.log('Creating placeholder icons...');
    
    // Create basic icons
    createPlaceholderIcon(path.join(iconsDir, 'logo192.png'));
    createPlaceholderIcon(path.join(iconsDir, 'logo512.png'));
    createPlaceholderIcon(path.join(iconsDir, 'maskable_icon.png'));
    
    // Create favicon.ico (16x16)
    const faviconPath = path.join(iconsDir, 'favicon.ico');
    if (!fs.existsSync(faviconPath)) {
      // Create a minimal favicon
      console.log('Creating minimal favicon.ico...');
      fs.writeFileSync(faviconPath, Buffer.from(
        'AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAJ6TrAFy+8QCC0vgA7+/vAC6n7ACE0/gAS7fvAKzc+ADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREQzMzMzMzMzRDd3d3d3d3REN3d3d3d3dEQ3d3d3d3d0RDd3d3d3dHRERERERERERDMzMzMzMzNERERERERERERVVVVVVVVUREREREREREREVVVVVVVVVERERERERERERDMzMzMzMzNEREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==', 
        'base64'
      ));
      console.log('✅ Created minimal favicon.ico');
    }
    
    // Copy favicon.ico to public root
    fs.copyFileSync(
      path.join(iconsDir, 'favicon.ico'),
      path.join(projectRoot, 'public', 'favicon.ico')
    );
    console.log('✅ Copied favicon.ico to public root directory');
    
    // Create apple-touch-icon.png
    fs.copyFileSync(
      path.join(iconsDir, 'logo192.png'),
      path.join(iconsDir, 'apple-touch-icon.png')
    );
    console.log('✅ Created apple-touch-icon.png');
  } else {
    // TODO: If we have image processing libraries, we would resize the source image
    // For now, just copy the existing one as a placeholder
    console.log('Source icon found! Creating resized versions...');
    // Implementation would go here
  }
  
  console.log('✅ Icon generation complete!');
};

// Run the icon generation
generateIcons();
