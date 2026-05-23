import fs from 'fs';
import { DATA } from './src/data/content.js';
import ytSearch from 'yt-search';

const newMovies = [
  { title: "Madame Web", year: 2024, genre: "Action · Sci-Fi", rating: 2.1, votes: 98450, poster: "https://m.media-amazon.com/images/M/MV5BMjhkYjA0MGQtZTU3Mi00ZTIwLThmZmUtM2Y0YmU2YTI3YTY5XkEyXkFqcGc@._V1_SX300.jpg", desc: "Forced to confront revelations about her past, she must protect three young women from a deadly adversary." },
  { title: "Morbius", year: 2022, genre: "Action · Horror", rating: 2.5, votes: 154000, poster: "https://m.media-amazon.com/images/M/MV5BN2ZhOTI5YzUtZTZjNC00YzM4LWJiNGEtNzMwMGZhMjZkZTdmXkEyXkFqcGc@._V1_SX300.jpg", desc: "Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism." },
  { title: "Cats", year: 2019, genre: "Musical · Fantasy", rating: 1.8, votes: 55000, poster: "https://m.media-amazon.com/images/M/MV5BMTg0NjE5NDgtYTEzOS00YjNiLThlNGEtNmEyMjJhOTZlZTQwXkEyXkFqcGc@._V1_SX300.jpg", desc: "A tribe of cats called the Jellicles must decide yearly which one will ascend to the Heaviside Layer." },
  { title: "The Room", year: 2003, genre: "Drama · Romance", rating: 1.5, votes: 95000, poster: "https://m.media-amazon.com/images/M/MV5BMTg4MTU1MzgwOV5BMl5BanBnXkFtZTcwNjM1MTAwMQ@@._V1_SX300.jpg", desc: "Johnny is a successful bank executive who lives quietly in a San Francisco townhouse with his fiancée, Lisa." },
  { title: "Green Lantern", year: 2011, genre: "Action · Sci-Fi", rating: 3.1, votes: 289000, poster: "https://m.media-amazon.com/images/M/MV5BMTMyMTg3OTM5Ml5BMl5BanBnXkFtZTcwNzczMjEyNQ@@._V1_SX300.jpg", desc: "Reckless test pilot Hal Jordan is granted an alien ring that bestows him with otherworldly powers." },
  { title: "The Flash", year: 2023, genre: "Action · Adventure", rating: 3.4, votes: 210000, poster: "https://m.media-amazon.com/images/M/MV5BZmUyZmJmNWItMTJhMi00NjQ4LWJkYTMtNWY5NGVjMTMxNzFlXkEyXkFqcGc@._V1_SX300.jpg", desc: "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes." }
];

const newAnime = [
  { title: "Ex-Arm", year: 2021, genre: "Sci-Fi · Action", rating: 1.4, votes: 25000, poster: "https://cdn.myanimelist.net/images/anime/1162/111025l.jpg", desc: "A high schooler's brain is used as part of a highly advanced weapon." },
  { title: "Pupa", year: 2014, genre: "Horror · Fantasy", rating: 1.6, votes: 45000, poster: "https://cdn.myanimelist.net/images/anime/3/54823l.jpg", desc: "A boy and his younger sister who becomes a flesh-eating monster." },
  { title: "School Days", year: 2007, genre: "Romance · Drama", rating: 2.8, votes: 120000, poster: "https://cdn.myanimelist.net/images/anime/11/75553l.jpg", desc: "A love triangle spirals out of control with disastrous consequences." },
  { title: "Sword Art Online", year: 2012, genre: "Action · Adventure", rating: 3.5, votes: 900000, poster: "https://cdn.myanimelist.net/images/anime/11/39717l.jpg", desc: "Players of a virtual reality MMORPG find themselves trapped in the game." }
];

const newSeries = [
  { title: "The Idol", year: 2023, genre: "Drama · Music", rating: 2.1, votes: 75000, poster: "https://m.media-amazon.com/images/M/MV5BMjY5M2ZlMTctZGY3OS00ZmIyLWE5NWEtZWQzNDhmNDliYmMzXkEyXkFqcGc@._V1_SX300.jpg", desc: "Jocelyn, a pop idol, tries to reclaim her title as the sexiest pop star in America." },
  { title: "Velma", year: 2023, genre: "Animation · Comedy", rating: 1.1, votes: 105000, poster: "https://m.media-amazon.com/images/M/MV5BMjZlYTcwZWYtMWQ1Yy00MDkxLWJmODgtYmVkMWJkODRlODJiXkEyXkFqcGc@._V1_SX300.jpg", desc: "The origin story of Velma Dinkley, the unsung and under-appreciated brains of the Scooby-Doo Mystery Inc. gang." },
  { title: "Inhumans", year: 2017, genre: "Action · Sci-Fi", rating: 2.3, votes: 65000, poster: "https://m.media-amazon.com/images/M/MV5BOGJmNGY1MGQtMzg5Mi00MjhkLThhOTctZTAyN2YxNjRlNmFiXkEyXkFqcGc@._V1_SX300.jpg", desc: "An isolated community of superhumans fight to protect themselves." },
  { title: "Emily in Paris", year: 2020, genre: "Comedy · Romance", rating: 3.4, votes: 150000, poster: "https://m.media-amazon.com/images/M/MV5BMTY3YWVjNGMtZjBhOS00NjdmLThhMmYtOWE5MGJiYmUyYmVjXkEyXkFqcGc@._V1_SX300.jpg", desc: "A young American woman from the Midwest is hired by a marketing firm in Paris." }
];

const newKdrama = [
  { title: "Blood", year: 2015, genre: "Romance · Medical", rating: 2.8, votes: 15000, poster: "https://static.tvmaze.com/uploads/images/original_untouched/10/25695.jpg", desc: "A vampire works as a doctor in a hospital." },
  { title: "Melting Me Softly", year: 2019, genre: "Romance · Sci-Fi", rating: 3.1, votes: 20000, poster: "https://static.tvmaze.com/uploads/images/original_untouched/213/532986.jpg", desc: "Two people take part in a 24-hour freezing project but wake up 20 years later." },
  { title: "The Bride of Habaek", year: 2017, genre: "Romance · Fantasy", rating: 2.9, votes: 25000, poster: "https://static.tvmaze.com/uploads/images/original_untouched/120/301540.jpg", desc: "A water god visits earth to find a magical stone." }
];

async function addData() {
  const allNew = [
    { type: 'movies', items: newMovies },
    { type: 'anime', items: newAnime },
    { type: 'series', items: newSeries },
    { type: 'kdrama', items: newKdrama }
  ];

  for (const group of allNew) {
    if (!DATA[group.type]) DATA[group.type] = [];
    
    for (const item of group.items) {
      item.id = group.type.charAt(0) + Math.random().toString(36).substr(2, 9);
      item.status = 'released';
      
      console.log(`Fetching trailer for ${item.title}...`);
      try {
        const r = await ytSearch(item.title + ' official trailer');
        if (r && r.videos && r.videos.length > 0) {
          item.trailer = r.videos[0].url;
        } else {
          item.trailer = 'https://youtube.com/watch?v=dQw4w9WgXcQ';
        }
      } catch(e) {
        item.trailer = 'https://youtube.com/watch?v=dQw4w9WgXcQ';
      }
      
      DATA[group.type].push(item);
    }
  }

  const content = `export const DATA = ${JSON.stringify(DATA, null, 2)};`;
  fs.writeFileSync('./src/data/content.js', content);
  console.log('Done!');
}

addData();
