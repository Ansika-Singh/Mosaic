import fs from 'fs';
import { DATA } from './src/data/content.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log("Fixing movie posters via OMDB...");
  for (let m of DATA.movies) {
    try {
      const res = await fetch("http://www.omdbapi.com/?apikey=thewdb&t=" + encodeURIComponent(m.title));
      const data = await res.json();
      if (data && data.Poster && data.Poster !== "N/A") {
        m.poster = data.Poster;
        console.log("Updated:", m.title);
      }
    } catch (e) {
      console.log("Failed:", m.title);
    }
    await sleep(200);
  }

  const output = "export const DATA = " + JSON.stringify(DATA, null, 2) + ";";
  fs.writeFileSync('./src/data/content.js', output);
  console.log("Movie posters updated with OMDB.");
}

run();
