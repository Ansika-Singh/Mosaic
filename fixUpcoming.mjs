import fs from 'fs';
import { DATA } from './src/data/content.js';

for (const category in DATA) {
  DATA[category].forEach(item => {
    if (item.status === 'upcoming') {
      if (item.year === 2025 || item.year < 2026) {
        if (item.title === "The Winds of Winter") {
          item.year = "TBD";
          // Fix poster for Winds of Winter (it was blank on OpenLibrary)
          item.poster = "https://m.media-amazon.com/images/I/81xUGBtVl6L._AC_UF1000,1000_QL80_.jpg";
        } else {
          item.year = 2026;
        }
      }
    }
  });
}

const output = "export const DATA = " + JSON.stringify(DATA, null, 2) + ";";
fs.writeFileSync('./src/data/content.js', output);
console.log("Fixed upcoming years and posters.");
