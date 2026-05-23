import fs from 'fs';
import { DATA } from './src/data/content.js';

const NEW_DATA = {
  movies: [
    { title: "Avatar: Fire and Ash", status: "upcoming", year: 2026, genre: "Sci-Fi · Action" },
    { title: "The Batman - Part II", status: "upcoming", year: 2026, genre: "Action · Crime" },
    { title: "Avengers: Secret Wars", status: "upcoming", year: 2027, genre: "Action · Sci-Fi" },
    { title: "The Lord of the Rings: The Return of the King", status: "released", year: 2003, genre: "Fantasy · Adventure", rating: 4.9 },
    { title: "Pulp Fiction", status: "released", year: 1994, genre: "Crime · Drama", rating: 4.8 },
    { title: "Forrest Gump", status: "released", year: 1994, genre: "Drama · Romance", rating: 4.8 }
  ],
  series: [
    { title: "Stranger Things Season 5", status: "upcoming", year: 2026, genre: "Sci-Fi · Horror" },
    { title: "The Last of Us Season 2", status: "upcoming", year: 2026, genre: "Drama · Post-Apocalyptic" },
    { title: "Euphoria Season 3", status: "upcoming", year: 2026, genre: "Drama" },
    { title: "The Wire", status: "released", year: 2002, genre: "Crime · Drama", rating: 4.9 },
    { title: "The Sopranos", status: "released", year: 1999, genre: "Crime · Drama", rating: 4.9 },
    { title: "Band of Brothers", status: "released", year: 2001, genre: "War · Drama", rating: 5.0 }
  ],
  anime: [
    { title: "One Punch Man Season 3", status: "upcoming", year: 2026, genre: "Action · Comedy" },
    { title: "Jujutsu Kaisen Season 3", status: "upcoming", year: 2026, genre: "Action · Supernatural" },
    { title: "Demon Slayer: Infinity Castle", status: "upcoming", year: 2026, genre: "Action · Fantasy" },
    { title: "Code Geass", status: "released", year: 2006, genre: "Mecha · Thriller", rating: 4.8 },
    { title: "Neon Genesis Evangelion", status: "released", year: 1995, genre: "Mecha · Psychological", rating: 4.8 },
    { title: "Your Name", status: "released", year: 2016, genre: "Romance · Supernatural", rating: 4.9 }
  ],
  kdrama: [
    { title: "All of Us Are Dead Season 2", status: "upcoming", year: 2026, genre: "Horror · Thriller" },
    { title: "Squid Game Season 3", status: "upcoming", year: 2026, genre: "Thriller · Survival" },
    { title: "Gyeongseong Creature Season 2", status: "upcoming", year: 2026, genre: "Historical · Thriller" },
    { title: "My Name", status: "released", year: 2021, genre: "Action · Crime", rating: 4.7 },
    { title: "Crash Course in Romance", status: "released", year: 2023, genre: "Romance · Comedy", rating: 4.7 },
    { title: "Bloodhounds", status: "released", year: 2023, genre: "Action · Thriller", rating: 4.8 }
  ],
  books: [
    { title: "The Doors of Stone", status: "upcoming", year: "TBD", genre: "Fantasy" },
    { title: "Alecto the Ninth", status: "upcoming", year: 2026, genre: "Sci-Fi · Fantasy" },
    { title: "Stormlight Archive 6", status: "upcoming", year: "TBD", genre: "Fantasy" },
    { title: "1984", status: "released", year: 1949, genre: "Dystopian · Sci-Fi", rating: 4.9 },
    { title: "To Kill a Mockingbird", status: "released", year: 1960, genre: "Classic · Drama", rating: 4.8 },
    { title: "The Great Gatsby", status: "released", year: 1925, genre: "Classic · Fiction", rating: 4.7 }
  ],
  music: [
    { title: "LG7 (Lady Gaga)", status: "upcoming", year: 2026, genre: "Pop" },
    { title: "Act III (Beyoncé)", status: "upcoming", year: 2026, genre: "Country/Pop" },
    { title: "New Blackpink Album", status: "upcoming", year: 2026, genre: "K-Pop" },
    { title: "Thriller", status: "released", year: 1982, genre: "Pop · R&B", rating: 5.0 },
    { title: "The Dark Side of the Moon", status: "released", year: 1973, genre: "Progressive Rock", rating: 4.9 },
    { title: "Abbey Road", status: "released", year: 1969, genre: "Rock", rating: 4.9 }
  ]
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log("Expanding Database...");
  
  for (const cat in NEW_DATA) {
    for (let item of NEW_DATA[cat]) {
      // Setup basic fields
      item.id = cat.charAt(0) + Date.now().toString().slice(-6) + Math.floor(Math.random()*1000);
      item.desc = "An incredible experience full of twists and turns. Not to be missed.";
      item.votes = item.status === "upcoming" ? Math.floor(Math.random() * 500000) + 100000 : Math.floor(Math.random() * 8000) + 1000;
      if (item.status === "upcoming") {
        item.rating = 0;
      }
      
      // Fetch poster
      if (cat !== 'books' && cat !== 'music') {
        try {
          const res = await fetch("http://www.omdbapi.com/?apikey=thewdb&t=" + encodeURIComponent(item.title.replace(/Season \d+|Part \d+/, '').trim()));
          const d = await res.json();
          if (d && d.Poster && d.Poster !== "N/A") {
            item.poster = d.Poster;
          } else {
            item.poster = `https://picsum.photos/seed/${item.id}/300/450`;
          }
        } catch(e) {
          item.poster = `https://picsum.photos/seed/${item.id}/300/450`;
        }
      } else {
        item.poster = `https://picsum.photos/seed/${item.title.replace(/\s+/g,'')}/300/450`;
      }
      
      // Check for duplicates
      if (DATA[cat].some(i => i.title === item.title)) {
        console.log(`Skipped duplicate ${item.title}`);
        continue;
      }

      DATA[cat].push(item);
      console.log(`Added ${item.title}`);
      await sleep(150);
    }
  }

  const output = "export const DATA = " + JSON.stringify(DATA, null, 2) + ";";
  fs.writeFileSync('./src/data/content.js', output);
  console.log("Database expanded successfully!");
}

run();
