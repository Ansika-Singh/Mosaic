import fs from 'fs';
import { DATA } from './src/data/content.js';

for (const category in DATA) {
  DATA[category].forEach(item => {
    if (item.status === 'upcoming') {
      if (item.votes === 0 || !item.votes) {
        item.votes = Math.floor(Math.random() * 500000) + 100000;
      }
    }
  });
}

const output = "export const DATA = " + JSON.stringify(DATA, null, 2) + ";";
fs.writeFileSync('./src/data/content.js', output);
console.log("Added wait count (votes) for upcoming items.");
