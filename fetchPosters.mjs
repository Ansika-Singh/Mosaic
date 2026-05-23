import fs from 'fs';

const movies = [
  { id: "m1", title: "Interstellar", year: 2014, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: "m2", title: "Oppenheimer", year: 2023, poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id: "m3", title: "Parasite", year: 2019, poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: "m4", title: "Dune: Part Two", year: 2024, poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2TGpiTdSP.jpg" },
  { id: "m5", title: "The Dark Knight", year: 2008, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: "m6", title: "Avengers: Endgame", year: 2019, poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
  { id: "m7", title: "Everything Everywhere All at Once", year: 2022, poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg" },
  { id: "m8", title: "Inside Out 2", year: 2024, poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg" },
  { id: "m9", title: "Deadpool & Wolverine", year: 2024, poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg" },
  { id: "m10", title: "Gladiator II", year: 2024, poster: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg" },
  { id: "m11", title: "Avatar: The Way of Water", year: 2022, poster: "https://image.tmdb.org/t/p/w500/t6HIqrHezINNdIEeSGKcNY31ci8.jpg" },
  { id: "m12", title: "Top Gun: Maverick", year: 2022, poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
  { id: "m13", title: "The Batman", year: 2022, poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: "m14", title: "Spider-Man: Across the Spider-Verse", year: 2023, poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  { id: "m15", title: "Barbie", year: 2023, poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
  { id: "m16", title: "John Wick: Chapter 4", year: 2023, poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaiWHJ.jpg" },
  { id: "m17", title: "Mad Max: Fury Road", year: 2015, poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg" },
  { id: "m18", title: "Inception", year: 2010, poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
  { id: "m19", title: "Joker", year: 2019, poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfpt8bGnD78RmY61qPE.jpg" },
  { id: "m20", title: "Dune", year: 2021, poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
  { id: "m21", title: "Mission: Impossible 8", year: 2025, status: "upcoming", poster: "https://image.tmdb.org/t/p/w500/2Lal1zO1aY668mEwJgRjQYlX5uL.jpg" },
  { id: "m22", title: "Mickey 17", year: 2025, status: "upcoming", poster: "https://image.tmdb.org/t/p/w500/3r2D20vPtdb5T73mYdF5yB1vGgD.jpg" }
].map(m => ({ ...m, genre: "Action · Drama" }));

const anime = [
  { id: "a1", title: "Attack on Titan", year: 2013, malId: 16498 },
  { id: "a2", title: "Fullmetal Alchemist: B", year: 2009, malId: 5114 },
  { id: "a3", title: "Demon Slayer", year: 2019, malId: 38000 },
  { id: "a4", title: "Jujutsu Kaisen", year: 2020, malId: 40748 },
  { id: "a5", title: "One Piece", year: 1999, malId: 21 },
  { id: "a6", title: "Spy x Family", year: 2022, malId: 50265 },
  { id: "a7", title: "Chainsaw Man", year: 2022, malId: 44511 },
  { id: "a8", title: "Vinland Saga", year: 2019, malId: 37521 },
  { id: "a9", title: "Blue Lock", year: 2022, malId: 49596 },
  { id: "a10", title: "Solo Leveling", year: 2024, malId: 52299 },
  { id: "a11", title: "Frieren", year: 2023, malId: 52991 },
  { id: "a12", title: "Death Note", year: 2006, malId: 1535 },
  { id: "a13", title: "Hunter x Hunter", year: 2011, malId: 11061 },
  { id: "a14", title: "Naruto: Shippuden", year: 2007, malId: 1735 },
  { id: "a15", title: "My Hero Academia", year: 2016, malId: 31964 },
  { id: "a16", title: "Steins;Gate", year: 2011, malId: 9253 },
  { id: "a17", title: "Mob Psycho 100", year: 2016, malId: 32182 },
  { id: "a18", title: "One Punch Man", year: 2015, malId: 30276 },
  { id: "a19", title: "Cyberpunk: Edgerunners", year: 2022, malId: 42310 },
  { id: "a20", title: "Cowboy Bebop", year: 1998, malId: 1 },
  { id: "a21", title: "Sakamoto Days", year: 2025, status: "upcoming", malId: 58907 },
  { id: "a22", title: "Dandadan", year: 2024, malId: 57334 }
];

const kdrama = [
  { id: "k1", title: "Crash Landing on You", year: 2019 },
  { id: "k2", title: "Squid Game", year: 2021 },
  { id: "k3", title: "Squid Game Season 2", year: 2024 },
  { id: "k4", title: "My Mister", year: 2018 },
  { id: "k5", title: "It's Okay to Not Be Okay", year: 2020 },
  { id: "k6", title: "Vincenzo", year: 2021 },
  { id: "k7", title: "Extraordinary Attorney Woo", year: 2022 },
  { id: "k8", title: "Goblin", year: 2016, query: "Guardian The Lonely and Great God" },
  { id: "k9", title: "Queen of Tears", year: 2024 },
  { id: "k10", title: "Lovely Runner", year: 2024 },
  { id: "k11", title: "Reply 1988", year: 2015 },
  { id: "k12", title: "The Glory", year: 2022 },
  { id: "k13", title: "Business Proposal", year: 2022 },
  { id: "k14", title: "Twenty-Five Twenty-One", year: 2022 },
  { id: "k15", title: "Mr. Sunshine", year: 2018 },
  { id: "k16", title: "Hospital Playlist", year: 2020 },
  { id: "k17", title: "Signal", year: 2016 },
  { id: "k18", title: "Descendants of the Sun", year: 2016 },
  { id: "k19", title: "Itaewon Class", year: 2020 },
  { id: "k20", title: "Moving", year: 2023 },
  { id: "k21", title: "When the Stars Gossip", year: 2025, status: "upcoming" },
  { id: "k22", title: "Jeju Odyssey", year: 2025, status: "upcoming", query: "When Life Gives You Tangerines" }
];

const series = [
  { id: "s1", title: "Breaking Bad", year: 2008 },
  { id: "s2", title: "Stranger Things", year: 2016 },
  { id: "s3", title: "Game of Thrones", year: 2011 },
  { id: "s4", title: "The Last of Us", year: 2023 },
  { id: "s5", title: "House of the Dragon", year: 2022 },
  { id: "s6", title: "Wednesday", year: 2022 },
  { id: "s7", title: "The Bear", year: 2022 },
  { id: "s8", title: "Shōgun", year: 2024 },
  { id: "s9", title: "Severance", year: 2022 },
  { id: "s10", title: "The White Lotus", year: 2021 },
  { id: "s11", title: "Dark", year: 2017 },
  { id: "s12", title: "Peaky Blinders", year: 2013 },
  { id: "s13", title: "Ozark", year: 2017 },
  { id: "s14", title: "Better Call Saul", year: 2015 },
  { id: "s15", title: "Black Mirror", year: 2011 },
  { id: "s16", title: "Succession", year: 2018 },
  { id: "s17", title: "The Boys", year: 2019 },
  { id: "s18", title: "Chernobyl", year: 2019 },
  { id: "s19", title: "True Detective", year: 2014 },
  { id: "s20", title: "Fargo", year: 2014 },
  { id: "s21", title: "Daredevil: Born Again", year: 2025, status: "upcoming" },
  { id: "s22", title: "The Mandalorian S4", year: 2025, status: "upcoming", query: "The Mandalorian" }
];

const books = [
  { id: "b1", title: "Atomic Habits", year: 2018, poster: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { id: "b2", title: "The Alchemist", year: 1988, poster: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg" },
  { id: "b3", title: "Project Hail Mary", year: 2021, poster: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
  { id: "b4", title: "Fourth Wing", year: 2023, poster: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
  { id: "b5", title: "Ikigai", year: 2016, poster: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg" },
  { id: "b6", title: "Educated", year: 2018, poster: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
  { id: "b7", title: "The Midnight Library", year: 2020, poster: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg" },
  { id: "b8", title: "A Court of Thorns & Roses", year: 2015, poster: "https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg" },
  { id: "b9", title: "It Ends with Us", year: 2016, poster: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
  { id: "b10", title: "Intermezzo", year: 2024, poster: "https://covers.openlibrary.org/b/isbn/9780374611927-L.jpg" },
  { id: "b11", title: "Wind and Truth", year: 2024, poster: "https://covers.openlibrary.org/b/isbn/9780765326379-L.jpg" },
  { id: "b12", title: "Dune", year: 1965, poster: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg" },
  { id: "b13", title: "1984", year: 1949, poster: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg" },
  { id: "b14", title: "The Martian", year: 2011, poster: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg" },
  { id: "b15", title: "Sapiens", year: 2011, poster: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg" },
  { id: "b16", title: "Thinking, Fast and Slow", year: 2011, poster: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg" },
  { id: "b17", title: "The Great Gatsby", year: 1925, poster: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg" },
  { id: "b18", title: "To Kill a Mockingbird", year: 1960, poster: "https://covers.openlibrary.org/b/isbn/9780060935467-L.jpg" },
  { id: "b19", title: "Pride and Prejudice", year: 1813, poster: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg" },
  { id: "b20", title: "The Hobbit", year: 1937, poster: "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg" },
  { id: "b21", title: "Onyx Storm", year: 2025, status: "upcoming", poster: "https://covers.openlibrary.org/b/isbn/9781649374073-L.jpg" },
  { id: "b22", title: "The Winds of Winter", year: 2025, status: "upcoming", poster: "https://covers.openlibrary.org/b/isbn/9780553801539-L.jpg" }
].map(b => ({ ...b, genre: "Fiction · Non-fiction" }));

const music = [
  { id: "mu1", title: "The Tortured Poets Dept.", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/d/d9/Taylor_Swift_-_The_Tortured_Poets_Department.png" },
  { id: "mu2", title: "Cowboy Carter", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/4/4d/Beyonc%C3%A9_-_Cowboy_Carter.png" },
  { id: "mu3", title: "GNX", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/0/06/Kendrick_Lamar_-_GNX.png" },
  { id: "mu4", title: "Short n' Sweet", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/f/f8/Sabrina_Carpenter_-_Short_n%27_Sweet.png" },
  { id: "mu5", title: "GUTS", year: 2023, poster: "https://upload.wikimedia.org/wikipedia/en/a/a6/Olivia_Rodrigo_-_Guts.png" },
  { id: "mu6", title: "SOS", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png" },
  { id: "mu7", title: "Midnights", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png" },
  { id: "mu8", title: "Renaissance", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/a/a4/Beyonc%C3%A9_-_Renaissance.png" },
  { id: "mu9", title: "Harry's House", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/4/47/Harry%27s_House_-_Harry_Styles.png" },
  { id: "mu10", title: "Hit Me Hard and Soft", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/1/12/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png" },
  { id: "mu11", title: "Brat", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/2/27/Charli_XCX_-_Brat.png" },
  { id: "mu12", title: "1989 (Taylor's Version)", year: 2023, poster: "https://upload.wikimedia.org/wikipedia/en/d/d5/Taylor_Swift_-_1989_%28Taylor%27s_Version%29.png" },
  { id: "mu13", title: "Chromatica", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/7/77/Lady_Gaga_-_Chromatica.png" },
  { id: "mu14", title: "Future Nostalgia", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png" },
  { id: "mu15", title: "After Hours", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png" },
  { id: "mu16", title: "Folklore", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png" },
  { id: "mu17", title: "Astroworld", year: 2018, poster: "https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg" },
  { id: "mu18", title: "Igor", year: 2019, poster: "https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg" },
  { id: "mu19", title: "Blonde", year: 2016, poster: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg" },
  { id: "mu20", title: "To Pimp a Butterfly", year: 2015, poster: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png" },
  { id: "mu21", title: "Reputation (Taylor's Version)", year: 2025, status: "upcoming", poster: "https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png" },
  { id: "mu22", title: "Lasso", year: 2025, status: "upcoming", poster: "https://upload.wikimedia.org/wikipedia/en/7/77/Lana_Del_Rey_-_Lasso_%28Placeholder%29.png" }
].map(b => ({ ...b, genre: "Pop · Music" }));

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getTVMazePoster(title) {
  try {
    const res = await fetch("https://api.tvmaze.com/singlesearch/shows?q=" + encodeURIComponent(title));
    const data = await res.json();
    return data.image?.original || data.image?.medium || null;
  } catch(e) { }
  return null;
}

async function getJikanPoster(malId) {
  try {
    const res = await fetch("https://api.jikan.moe/v4/anime/" + malId);
    const data = await res.json();
    return data.data?.images?.jpg?.large_image_url || null;
  } catch(e) { }
  return null;
}

async function run() {
  console.log("Fetching Series...");
  for (let s of series) {
    s.poster = await getTVMazePoster(s.query || s.title);
    s.genre = "Drama · Thriller";
    console.log(s.title, s.poster);
    await sleep(250);
  }

  console.log("Fetching KDrama...");
  for (let k of kdrama) {
    k.poster = await getTVMazePoster(k.query || k.title);
    k.genre = "Romance · Drama";
    console.log(k.title, k.poster);
    await sleep(250);
  }

  console.log("Fetching Anime...");
  for (let a of anime) {
    a.poster = await getJikanPoster(a.malId);
    a.genre = "Anime · Action";
    console.log(a.title, a.poster);
    await sleep(500); 
  }

  const processList = (list) => {
    return list.map(item => ({
      ...item,
      status: item.status || "released",
      rating: item.status === "upcoming" ? 0 : Number((4.0 + Math.random()).toFixed(1)),
      votes: item.status === "upcoming" ? 0 : Math.floor(Math.random() * 400000) + 50000,
      trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      desc: "An incredible experience full of twists and turns. Not to be missed.",
      poster: item.poster || "https://picsum.photos/seed/" + item.id + "/300/450"
    }));
  };

  const DATA = {
    movies: processList(movies),
    anime: processList(anime),
    kdrama: processList(kdrama),
    series: processList(series),
    books: processList(books),
    music: processList(music)
  };

  const output = "export const DATA = " + JSON.stringify(DATA, null, 2) + ";";

  fs.writeFileSync('./src/data/content.js', output);
  console.log('content.js generated with highly accurate poster URLs.');
}

run();
