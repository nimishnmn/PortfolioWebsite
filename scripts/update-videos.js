import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosDir = path.join(__dirname, '../public/videos');
const outputDir = path.join(__dirname, '../src/assets');
const outputFile = path.join(outputDir, 'videos.json');

console.log('Scanning directory:', videosDir);

// Ensure directories exist
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  // Read all files in public/videos
  const files = fs.readdirSync(videosDir);
  
  // Filter for video files
  const videoExtensions = ['.mp4', '.webm', '.mov', '.m4v'];
  const videoFiles = files.filter(file => 
    videoExtensions.includes(path.extname(file).toLowerCase())
  );

  // Map to details structure
  const videosList = videoFiles.map((file, index) => {
    // Generate a human-readable title from file name
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const title = baseName
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: `local-${index + 1}`,
      title: title || `Video Showcase #${index + 1}`,
      url: `/videos/${file}`,
      fileName: file
    };
  });

  // Write to src/assets/videos.json
  fs.writeFileSync(outputFile, JSON.stringify(videosList, null, 2), 'utf-8');
  
  console.log(`Success: Found ${videosList.length} video(s). List updated at: ${outputFile}`);
  console.log(JSON.stringify(videosList, null, 2));

} catch (err) {
  console.error('Error generating video file list:', err);
  process.exit(1);
}
