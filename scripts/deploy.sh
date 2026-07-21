#!/bin/bash
echo "========================================="
echo "   Auto-Sync & Deployment Script"
echo "========================================="

echo -e "\n[1/4] Scanning for new videos to optimize..."
mkdir -p public/videos/optimized
# Loop through all mp4 files
for f in public/videos/*.mp4; do
    # Ensure it's a file
    if [ -f "$f" ]; then
        filename=$(basename "$f")
        
        # Check if the video has already been optimized by looking for our metadata tag
        if ! ffprobe -v quiet -show_entries format_tags=comment -of default=noprint_wrappers=1:nokey=1 "$f" | grep -q "nimish_optimized"; then
            echo "   -> Optimizing NEW video: $filename"
            # Compress, add faststart, and inject the nimish_optimized tag so it isn't processed again
            ffmpeg -y -v error -stats -i "$f" -vcodec libx264 -crf 28 -preset fast -vf "scale='min(1280,iw)':-2" -an -movflags +faststart -metadata comment="nimish_optimized" "public/videos/optimized/$filename"
            mv "public/videos/optimized/$filename" "$f"
        fi
    fi
done
rmdir public/videos/optimized 2>/dev/null

echo -e "\n[2/4] Updating website code with new videos..."
npm run update-videos

echo -e "\n[3/4] Syncing your code securely to GitHub..."
git add .
git commit -m "chore: auto-sync and deploy videos via deploy script"
git push

echo -e "\n[4/4] Bypassing cache to push live to Vercel instantly..."
npx --cache /tmp/npm-cache vercel --prod --yes

echo -e "\n========================================="
echo "   SUCCESS! Your website is live."
echo "========================================="
