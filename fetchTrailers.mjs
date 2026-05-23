import fs from 'fs';
import yts from 'yt-search';
import { DATA } from './src/data/content.js';

async function run() {
  console.log("Fetching authentic trailers for all items...");
  
  for (const category in DATA) {
    for (let i = 0; i < DATA[category].length; i++) {
      const item = DATA[category][i];
      // Only fetch if it's not already a valid youtube link (or if it's the rickroll/empty)
      if (!item.trailer || item.trailer.includes("dQw4w9WgXcQ")) {
        try {
          const searchQuery = `${item.title} ${category === 'books' ? 'book trailer' : category === 'music' ? 'music video' : 'official trailer'}`;
          console.log(`Searching: ${searchQuery}`);
          const r = await yts(searchQuery);
          const videos = r.videos.slice(0, 3);
          if (videos.length > 0) {
            item.trailer = videos[0].url;
            console.log(` -> Found: ${item.trailer}`);
          }
        } catch (e) {
          console.log(` -> Error fetching for ${item.title}`);
        }
        // Small delay to prevent rate limits
        await new Promise(res => setTimeout(res, 500));
      }
    }
  }

  const newContent = `export const DATA = ${JSON.stringify(DATA, null, 2)};\n`;
  fs.writeFileSync('./src/data/content.js', newContent, 'utf-8');
  console.log("Finished updating trailers!");
}

run();
