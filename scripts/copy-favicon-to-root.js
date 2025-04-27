/**
 * Script to copy favicon to the root public directory for browsers that look for it there
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Possible source paths for favicon in priority order
const possibleSourcePaths = [
  path.join(projectRoot, 'public', 'icons', 'favicon.ico'),
  path.join(projectRoot, 'public', 'favicon.ico'),
  path.join(projectRoot, 'src', 'assets', 'favicon.ico'),
  path.join(projectRoot, 'src', 'assets', 'icons', 'favicon.ico'),
];

// Target path where favicon should be copied
const targetPath = path.join(projectRoot, 'public', 'favicon.ico');

// Create directories if they don't exist
const ensureDirectoryExists = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
    console.log(`Created directory: ${dirname}`);
  }
};

// Main copy function
const copyFaviconToRoot = () => {
  console.log('Attempting to copy favicon to root public directory...');
  
  // Ensure public directory exists
  ensureDirectoryExists(targetPath);
  
  // If target already exists, we don't need to copy
  if (fs.existsSync(targetPath)) {
    console.log('✅ favicon.ico already exists in public directory.');
    return;
  }
  
  // Try each possible source path
  for (const sourcePath of possibleSourcePaths) {
    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Successfully copied favicon from ${sourcePath} to ${targetPath}`);
        return;
      } catch (error) {
        console.error(`❌ Error copying from ${sourcePath}:`, error);
      }
    }
  }
  
  // If we get here, none of the source files existed
  console.warn('⚠️ No favicon.ico found in any of the expected locations.');
  console.log('Creating a placeholder favicon...');
  
  try {
    // Create a minimal 16x16 transparent favicon as fallback
    const minimalFavicon = Buffer.from(
      'AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAJ6TrAFy+8QCC0vgA7+/vAC6n7ACE0/gAS7fvAKzc+ADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREQzMzMzMzMzRDd3d3d3d3REN3d3d3d3dEQ3d3d3d3d0RDd3d3d3dHRERERERERERDMzMzMzMzNERERERERERERVVVVVVVVUREREREREREREVVVVVVVVVERERERERERERDMzMzMzMzNEREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==', 
      'base64'
    );
    
    fs.writeFileSync(targetPath, minimalFavicon);
    console.log('✅ Created a placeholder favicon.ico in public directory');
  } catch (error) {
    console.error('❌ Failed to create placeholder favicon:', error);
  }
};

// Execute the function
copyFaviconToRoot();
