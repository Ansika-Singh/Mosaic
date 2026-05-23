const fs = require('fs');

const movies = [
  { title: "Interstellar", year: 2014, wikiSlug: "Interstellar_(film)" },
  { title: "Oppenheimer", year: 2023, wikiSlug: "Oppenheimer_(film)" },
  { title: "Parasite", year: 2019, wikiSlug: "Parasite_(2019_film)" },
  { title: "Dune: Part Two", year: 2024, wikiSlug: "Dune:_Part_Two" },
  { title: "The Dark Knight", year: 2008, wikiSlug: "The_Dark_Knight" },
  { title: "Avengers: Endgame", year: 2019, wikiSlug: "Avengers:_Endgame" },
  { title: "Everything Everywhere All at Once", year: 2022, wikiSlug: "Everything_Everywhere_All_at_Once" },
  { title: "Inside Out 2", year: 2024, wikiSlug: "Inside_Out_2" },
  { title: "Deadpool & Wolverine", year: 2024, wikiSlug: "Deadpool_%26_Wolverine" },
  { title: "Gladiator II", year: 2024, wikiSlug: "Gladiator_II" },
  { title: "Avatar: The Way of Water", year: 2022, wikiSlug: "Avatar:_The_Way_of_Water" },
  { title: "Top Gun: Maverick", year: 2022, wikiSlug: "Top_Gun:_Maverick" },
  { title: "The Batman", year: 2022, wikiSlug: "The_Batman_(film)" },
  { title: "Spider-Man: Across the Spider-Verse", year: 2023, wikiSlug: "Spider-Man:_Across_the_Spider-Verse" },
  { title: "Barbie", year: 2023, wikiSlug: "Barbie_(film)" },
  { title: "John Wick: Chapter 4", year: 2023, wikiSlug: "John_Wick:_Chapter_4" },
  { title: "Mad Max: Fury Road", year: 2015, wikiSlug: "Mad_Max:_Fury_Road" },
  { title: "Inception", year: 2010, wikiSlug: "Inception" },
  { title: "Joker", year: 2019, wikiSlug: "Joker_(2019_film)" },
  { title: "Dune", year: 2021, wikiSlug: "Dune_(2021_film)" },
  { title: "Mission: Impossible 8", year: 2025, status: "upcoming", wikiSlug: "Mission:_Impossible_8" },
  { title: "Mickey 17", year: 2025, status: "upcoming", wikiSlug: "Mickey_17" }
];

const anime = [
  { title: "Attack on Titan", year: 2013, malId: 16498 },
  { title: "Fullmetal Alchemist: B", year: 2009, malId: 5114 },
  { title: "Demon Slayer", year: 2019, malId: 38000 },
  { title: "Jujutsu Kaisen", year: 2020, malId: 40748 },
  { title: "One Piece", year: 1999, malId: 21 },
  { title: "Spy x Family", year: 2022, malId: 50265 },
  { title: "Chainsaw Man", year: 2022, malId: 44511 },
  { title: "Vinland Saga", year: 2019, malId: 37521 },
  { title: "Blue Lock", year: 2022, malId: 49596 },
  { title: "Solo Leveling", year: 2024, malId: 52299 },
  { title: "Frieren", year: 2023, malId: 52991 },
  { title: "Death Note", year: 2006, malId: 1535 },
  { title: "Hunter x Hunter", year: 2011, malId: 11061 },
  { title: "Naruto: Shippuden", year: 2007, malId: 1735 },
  { title: "My Hero Academia", year: 2016, malId: 31964 },
  { title: "Steins;Gate", year: 2011, malId: 9253 },
  { title: "Mob Psycho 100", year: 2016, malId: 32182 },
  { title: "One Punch Man", year: 2015, malId: 30276 },
  { title: "Cyberpunk: Edgerunners", year: 2022, malId: 42310 },
  { title: "Cowboy Bebop", year: 1998, malId: 1 },
  { title: "Sakamoto Days", year: 2025, status: "upcoming", malId: 58907 },
  { title: "Dandadan", year: 2024, malId: 57334 }
];

const kdrama = [
  { title: "Crash Landing on You", year: 2019, wikiSlug: "Crash_Landing_on_You" },
  { title: "Squid Game", year: 2021, wikiSlug: "Squid_Game" },
  { title: "Squid Game Season 2", year: 2024, wikiSlug: "Squid_Game_(season_2)" },
  { title: "My Mister", year: 2018, wikiSlug: "My_Mister" },
  { title: "It's Okay to Not Be Okay", year: 2020, wikiSlug: "It's_Okay_to_Not_Be_Okay" },
  { title: "Vincenzo", year: 2021, wikiSlug: "Vincenzo_(TV_series)" },
  { title: "Extraordinary Attorney Woo", year: 2022, wikiSlug: "Extraordinary_Attorney_Woo" },
  { title: "Goblin", year: 2016, wikiSlug: "Guardian:_The_Lonely_and_Great_God" },
  { title: "Queen of Tears", year: 2024, wikiSlug: "Queen_of_Tears" },
  { title: "Lovely Runner", year: 2024, wikiSlug: "Lovely_Runner" },
  { title: "Reply 1988", year: 2015, wikiSlug: "Reply_1988" },
  { title: "The Glory", year: 2022, wikiSlug: "The_Glory_(TV_series)" },
  { title: "Business Proposal", year: 2022, wikiSlug: "Business_Proposal" },
  { title: "Twenty-Five Twenty-One", year: 2022, wikiSlug: "Twenty-Five_Twenty-One" },
  { title: "Mr. Sunshine", year: 2018, wikiSlug: "Mr._Sunshine_(2018_TV_series)" },
  { title: "Hospital Playlist", year: 2020, wikiSlug: "Hospital_Playlist" },
  { title: "Signal", year: 2016, wikiSlug: "Signal_(South_Korean_TV_series)" },
  { title: "Descendants of the Sun", year: 2016, wikiSlug: "Descendants_of_the_Sun" },
  { title: "Itaewon Class", year: 2020, wikiSlug: "Itaewon_Class" },
  { title: "Moving", year: 2023, wikiSlug: "Moving_(South_Korean_TV_series)" },
  { title: "When the Stars Gossip", year: 2025, status: "upcoming", wikiSlug: "When_the_Stars_Gossip" },
  { title: "Jeju Odyssey", year: 2025, status: "upcoming", wikiSlug: "When_Life_Gives_You_Tangerines" }
];

const series = [
  { title: "Breaking Bad", year: 2008, wikiSlug: "Breaking_Bad" },
  { title: "Stranger Things", year: 2016, wikiSlug: "Stranger_Things" },
  { title: "Game of Thrones", year: 2011, wikiSlug: "Game_of_Thrones" },
  { title: "The Last of Us", year: 2023, wikiSlug: "The_Last_of_Us_(TV_series)" },
  { title: "House of the Dragon", year: 2022, wikiSlug: "House_of_the_Dragon" },
  { title: "Wednesday", year: 2022, wikiSlug: "Wednesday_(TV_series)" },
  { title: "The Bear", year: 2022, wikiSlug: "The_Bear_(TV_series)" },
  { title: "Shōgun", year: 2024, wikiSlug: "Shōgun_(2024_TV_series)" },
  { title: "Severance", year: 2022, wikiSlug: "Severance_(TV_series)" },
  { title: "The White Lotus", year: 2021, wikiSlug: "The_White_Lotus" },
  { title: "Dark", year: 2017, wikiSlug: "Dark_(TV_series)" },
  { title: "Peaky Blinders", year: 2013, wikiSlug: "Peaky_Blinders_(TV_series)" },
  { title: "Ozark", year: 2017, wikiSlug: "Ozark_(TV_series)" },
  { title: "Better Call Saul", year: 2015, wikiSlug: "Better_Call_Saul" },
  { title: "Black Mirror", year: 2011, wikiSlug: "Black_Mirror" },
  { title: "Succession", year: 2018, wikiSlug: "Succession_(TV_series)" },
  { title: "The Boys", year: 2019, wikiSlug: "The_Boys_(TV_series)" },
  { title: "Chernobyl", year: 2019, wikiSlug: "Chernobyl_(miniseries)" },
  { title: "True Detective", year: 2014, wikiSlug: "True_Detective" },
  { title: "Fargo", year: 2014, wikiSlug: "Fargo_(TV_series)" },
  { title: "Daredevil: Born Again", year: 2025, status: "upcoming", wikiSlug: "Daredevil:_Born_Again" },
  { title: "The Mandalorian S4", year: 2025, status: "upcoming", wikiSlug: "The_Mandalorian" }
];

const books = [
  { title: "Atomic Habits", year: 2018, poster: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { title: "The Alchemist", year: 1988, poster: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg" },
  { title: "Project Hail Mary", year: 2021, poster: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
  { title: "Fourth Wing", year: 2023, poster: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
  { title: "Ikigai", year: 2016, poster: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg" },
  { title: "Educated", year: 2018, poster: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
  { title: "The Midnight Library", year: 2020, poster: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg" },
  { title: "A Court of Thorns & Roses", year: 2015, poster: "https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg" },
  { title: "It Ends with Us", year: 2016, poster: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
  { title: "Intermezzo", year: 2024, poster: "https://covers.openlibrary.org/b/isbn/9780374611927-L.jpg" },
  { title: "Wind and Truth", year: 2024, poster: "https://covers.openlibrary.org/b/isbn/9780765326379-L.jpg" },
  { title: "Dune", year: 1965, poster: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg" },
  { title: "1984", year: 1949, poster: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg" },
  { title: "The Martian", year: 2011, poster: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg" },
  { title: "Sapiens", year: 2011, poster: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg" },
  { title: "Thinking, Fast and Slow", year: 2011, poster: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg" },
  { title: "The Great Gatsby", year: 1925, poster: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg" },
  { title: "To Kill a Mockingbird", year: 1960, poster: "https://covers.openlibrary.org/b/isbn/9780060935467-L.jpg" },
  { title: "Pride and Prejudice", year: 1813, poster: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg" },
  { title: "The Hobbit", year: 1937, poster: "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg" },
  { title: "Onyx Storm", year: 2025, status: "upcoming", poster: "https://covers.openlibrary.org/b/isbn/9781649374073-L.jpg" },
  { title: "The Winds of Winter", year: 2025, status: "upcoming", poster: "https://covers.openlibrary.org/b/isbn/9780553801539-L.jpg" }
];

const music = [
  { title: "The Tortured Poets Dept.", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/d/d9/Taylor_Swift_-_The_Tortured_Poets_Department.png" },
  { title: "Cowboy Carter", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/4/4d/Beyonc%C3%A9_-_Cowboy_Carter.png" },
  { title: "GNX", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/0/06/Kendrick_Lamar_-_GNX.png" },
  { title: "Short n' Sweet", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/f/f8/Sabrina_Carpenter_-_Short_n%27_Sweet.png" },
  { title: "GUTS", year: 2023, poster: "https://upload.wikimedia.org/wikipedia/en/a/a6/Olivia_Rodrigo_-_Guts.png" },
  { title: "SOS", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png" },
  { title: "Midnights", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png" },
  { title: "Renaissance", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/a/a4/Beyonc%C3%A9_-_Renaissance.png" },
  { title: "Harry's House", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/4/47/Harry%27s_House_-_Harry_Styles.png" },
  { title: "Hit Me Hard and Soft", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/1/12/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png" },
  { title: "Brat", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/2/27/Charli_XCX_-_Brat.png" },
  { title: "1989 (Taylor's Version)", year: 2023, poster: "https://upload.wikimedia.org/wikipedia/en/d/d5/Taylor_Swift_-_1989_%28Taylor%27s_Version%29.png" },
  { title: "Chromatica", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/7/77/Lady_Gaga_-_Chromatica.png" },
  { title: "Future Nostalgia", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png" },
  { title: "After Hours", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png" },
  { title: "Folklore", year: 2020, poster: "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png" },
  { title: "Astroworld", year: 2018, poster: "https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg" },
  { title: "Igor", year: 2019, poster: "https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg" },
  { title: "Blonde", year: 2016, poster: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg" },
  { title: "To Pimp a Butterfly", year: 2015, poster: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png" },
  { title: "Reputation (Taylor's Version)", year: 2025, status: "upcoming", poster: "https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png" },
  { title: "Lasso", year: 2025, status: "upcoming", poster: "https://upload.wikimedia.org/wikipedia/en/7/77/Lana_Del_Rey_-_Lasso_%28Placeholder%29.png" }
];

const processList = (prefix, list) => {
  return list.map((item, i) => {
    let genre = "Drama";
    if (prefix === "m") genre = "Action · Drama";
    if (prefix === "a") genre = "Anime · Action";
    if (prefix === "k") genre = "Romance · Drama";
    if (prefix === "s") genre = "Drama · Thriller";
    if (prefix === "b") genre = "Fiction · Non-fiction";
    if (prefix === "mu") genre = "Pop · Music";
    
    return {
      id: prefix + (i + 1),
      title: item.title,
      year: item.year,
      status: item.status || "released",
      rating: item.status === "upcoming" ? 0 : Number((4.0 + Math.random()).toFixed(1)),
      votes: item.status === "upcoming" ? 0 : Math.floor(Math.random() * 400000) + 50000,
      genre: genre,
      poster: item.poster || null,
      malId: item.malId || null,
      wikiSlug: item.wikiSlug || null,
      trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      desc: "An incredible experience full of twists and turns. Not to be missed."
    };
  });
};

const DATA = {
  movies: processList("m", movies),
  anime: processList("a", anime),
  kdrama: processList("k", kdrama),
  series: processList("s", series),
  books: processList("b", books),
  music: processList("mu", music)
};

const output = \`// Auto-generated content with 20+ items per category

export const DATA = \${JSON.stringify(DATA, null, 2)};
\`;

fs.writeFileSync('./src/data/content.js', output);
console.log('content.js generated with ' + (movies.length * 6) + ' total items.');
