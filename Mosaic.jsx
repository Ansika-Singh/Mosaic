import { useState, useEffect, useRef } from "react";

// ── TMDB-style data with real poster URLs from TMDB open image CDN ──────────
const CATEGORIES = [
  { id:"movies",  label:"Movies",   icon:"🎬", color:"#E50914" },
  { id:"anime",   label:"Anime",    icon:"✨", color:"#FF6B35" },
  { id:"kdrama",  label:"K-Drama",  icon:"🌸", color:"#EC4899" },
  { id:"series",  label:"Series",   icon:"📺", color:"#3B82F6" },
  { id:"books",   label:"Books",    icon:"📚", color:"#10B981" },
  { id:"music",   label:"Music",    icon:"🎵", color:"#A855F7" },
];

const SORT_OPTIONS = [
  { id:"trending", label:"🔥 Trending" },
  { id:"popular",  label:"⭐ Popular"  },
  { id:"newest",   label:"🆕 Newest"   },
  { id:"upcoming", label:"🗓 Upcoming" },
  { id:"top",      label:"🏆 Top Rated"},
];

const MOODS = ["🔥 Epic","😭 Emotional","😂 Hilarious","😱 Thrilling","🥰 Heartwarming","🤔 Thought-provoking","💔 Sad","😴 Boring"];

// Posters from TMDB image CDN (open, no key needed for images)
const BASE = "https://image.tmdb.org/t/p/w500";

const DATA = {
  movies: [
    { id:"m1",  title:"Interstellar",             year:2014, status:"released", rating:4.9, votes:182341, genre:"Sci-Fi · Drama",        poster: BASE+"/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",   trailer:"https://www.youtube.com/watch?v=zSWdZVtXT7E", desc:"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Directed by Christopher Nolan." },
    { id:"m2",  title:"Oppenheimer",              year:2023, status:"released", rating:4.8, votes:241000, genre:"Biography · Drama",       poster: BASE+"/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",   trailer:"https://www.youtube.com/watch?v=uYPbbksJxIg", desc:"The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II." },
    { id:"m3",  title:"Parasite",                 year:2019, status:"released", rating:4.8, votes:163000, genre:"Thriller · Drama",        poster: BASE+"/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",   trailer:"https://www.youtube.com/watch?v=5xH0HfJHsaY", desc:"Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
    { id:"m4",  title:"Dune: Part Two",           year:2024, status:"released", rating:4.7, votes:198000, genre:"Sci-Fi · Adventure",      poster: BASE+"/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",   trailer:"https://www.youtube.com/watch?v=Way9Dexny3w",  desc:"Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family." },
    { id:"m5",  title:"The Dark Knight",          year:2008, status:"released", rating:5.0, votes:281000, genre:"Action · Crime",          poster: BASE+"/qJ2tW6WMUDux911r6m7haRef0WH.jpg",   trailer:"https://www.youtube.com/watch?v=EXeTwQWrcwY",  desc:"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests." },
    { id:"m6",  title:"Avengers: Endgame",        year:2019, status:"released", rating:4.7, votes:329000, genre:"Action · Sci-Fi",         poster: BASE+"/or06FN3Dka5tukK1e9sl16pB3iy.jpg",   trailer:"https://www.youtube.com/watch?v=TcMBFSGVi1c",  desc:"After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos' actions." },
    { id:"m7",  title:"Everything Everywhere",    year:2022, status:"released", rating:4.6, votes:145000, genre:"Comedy · Sci-Fi",         poster: BASE+"/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",   trailer:"https://www.youtube.com/watch?v=wxN1T1uxQ2g",  desc:"A middle-aged Chinese immigrant is swept up in an insane adventure in which she alone can save the multiverse." },
    { id:"m8",  title:"Inside Out 2",             year:2024, status:"released", rating:4.5, votes:211000, genre:"Animation · Family",      poster: BASE+"/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",   trailer:"https://www.youtube.com/watch?v=LEjhY15eCx0",  desc:"Riley enters adolescence and her emotions—Joy, Sadness, Anger, Fear, and Disgust—are joined by new emotions: Anxiety, Ennui, Envy, Embarrassment, and Nostalgia." },
    { id:"m9",  title:"Deadpool & Wolverine",     year:2024, status:"released", rating:4.5, votes:178000, genre:"Action · Comedy",         poster: BASE+"/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",   trailer:"https://www.youtube.com/watch?v=73_1biulkYk",  desc:"Deadpool is offered a chance to join the Time Variance Authority. He tries to recruit a reluctant Wolverine." },
    { id:"m10", title:"Gladiator II",             year:2024, status:"released", rating:4.2, votes:89000,  genre:"Action · Epic",           poster: BASE+"/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",   trailer:"https://www.youtube.com/watch?v=3wPvBUHQiPA",  desc:"Years after witnessing the death of Maximus, Lucius is forced to enter the Colosseum after his home is conquered by two tyrants." },
    { id:"m11", title:"Avatar: The Way of Water", year:2022, status:"released", rating:4.3, votes:198000, genre:"Sci-Fi · Adventure",      poster: BASE+"/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",   trailer:"https://www.youtube.com/watch?v=d9MyW72ELq0",  desc:"Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with the Na'vi." },
    { id:"m12", title:"Mission: Impossible 8",    year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Action · Thriller",       poster: BASE+"/z53D372UZNniBPg1qTau5gFhzSC.jpg",   trailer:"https://www.youtube.com/watch?v=avz06PDqDbM",  desc:"Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands." },
  ],
  anime: [
    { id:"a1",  title:"Attack on Titan",          year:2013, status:"released", rating:5.0, votes:382000, genre:"Action · Dark Fantasy",   poster: BASE+"/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",   trailer:"https://www.youtube.com/watch?v=LHtdKWJdif4",  desc:"In a world where humanity lives inside cities surrounded by enormous walls protecting them from Titans, a boy vows to exterminate the Titans after his mother's death." },
    { id:"a2",  title:"Fullmetal Alchemist: B",   year:2009, status:"released", rating:5.0, votes:341000, genre:"Adventure · Fantasy",     poster: BASE+"/lXS60geme1LlEob5Zkzt5RNxkBR.jpg",   trailer:"https://www.youtube.com/watch?v=--IcmZkvL0Q",  desc:"Two alchemist brothers search for a Philosopher's Stone after a failed attempt to revive their deceased mother using alchemy." },
    { id:"a3",  title:"Demon Slayer",             year:2019, status:"released", rating:4.8, votes:289000, genre:"Action · Supernatural",   poster: BASE+"/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",   trailer:"https://www.youtube.com/watch?v=VQGCKyvzIM4",  desc:"A boy raised by boars who wears a boar's head, Inosuke Hashibira, is one of the members of the Demon Slayer Corps." },
    { id:"a4",  title:"Jujutsu Kaisen",           year:2020, status:"released", rating:4.8, votes:261000, genre:"Action · Supernatural",   poster: BASE+"/9BptGQECRjGQrTaVkqeVbCGXGGC.jpg",   trailer:"https://www.youtube.com/watch?v=4A_X-Dvl0ws",  desc:"A boy swallows a cursed talisman — the finger of a demon — and becomes cursed himself. He enters a school of Jujutsu Sorcerers to fix the problem." },
    { id:"a5",  title:"One Piece",                year:1999, status:"released", rating:4.9, votes:412000, genre:"Adventure · Comedy",      poster: BASE+"/fcFtnL5t3VBxv13yZJpE88gOZuA.jpg",   trailer:"https://www.youtube.com/watch?v=MCCHPXBGsEg",  desc:"Monkey D. Luffy sets off on an adventure to become the greatest pirate and find the legendary treasure known as the One Piece." },
    { id:"a6",  title:"Spy x Family",             year:2022, status:"released", rating:4.7, votes:178000, genre:"Comedy · Action",         poster: BASE+"/pHto3RLdhxLYKDw5VOqGDiV4cRT.jpg",   trailer:"https://www.youtube.com/watch?v=_ziJQJDQHSs",  desc:"A spy on an undercover mission must build a fake family. He adopts an orphan girl without knowing she can read minds, and marries an assassin who hides her identity." },
    { id:"a7",  title:"Chainsaw Man",             year:2022, status:"released", rating:4.7, votes:198000, genre:"Action · Horror",         poster: BASE+"/npdB6eFzizki0WaZ1OvKcJrWe97.jpg",   trailer:"https://www.youtube.com/watch?v=q5hSCBUjang",  desc:"Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes. Merging with his pet devil-dog Pochita, he becomes Chainsaw Man." },
    { id:"a8",  title:"Vinland Saga",             year:2019, status:"released", rating:4.9, votes:167000, genre:"Historical · Action",     poster: BASE+"/dv3zyHLDt6ioHHCXGoxmtDSGPiN.jpg",   trailer:"https://www.youtube.com/watch?v=TRTXZ7hJfcs",  desc:"Thorfinn pursues a journey with his father's murderer in order to take revenge and end his life in an honorable battle." },
    { id:"a9",  title:"Blue Lock Season 2",       year:2024, status:"released", rating:4.6, votes:134000, genre:"Sports · Drama",          poster: BASE+"/o8HHFJVtpF3w9MsNdTOGHLfcNHR.jpg",   trailer:"https://www.youtube.com/watch?v=8Xp7Hov8oho",  desc:"300 high school soccer strikers are put in a prison-like training facility known as Blue Lock to compete for the one striker position on Japan's national team." },
    { id:"a10", title:"Solo Leveling",            year:2024, status:"released", rating:4.7, votes:212000, genre:"Action · Fantasy",        poster: BASE+"/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",   trailer:"https://www.youtube.com/watch?v=Pk4NaQKYhNE",  desc:"In a world where hunters — humans who have awakened to magical powers — battle against monsters, Sung Jinwoo is the weakest hunter of all, until he alone faces a double dungeon." },
    { id:"a11", title:"Frieren: Beyond Journey",  year:2023, status:"released", rating:4.9, votes:189000, genre:"Fantasy · Slice of Life", poster: BASE+"/bkpPTZUdq31UGDovmszsg2CchiI.jpg",   trailer:"https://www.youtube.com/watch?v=6VKMsbxCFkg",  desc:"Frieren the Elf was part of the hero's party that defeated the Demon King. Now she wanders, confronting her relationship with time and mortality." },
    { id:"a12", title:"Sakamoto Days",            year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Action · Comedy",         poster: BASE+"/bsl5lieO8odGhqOhMsMxL7V2qgH.jpg",   trailer:"https://www.youtube.com/watch?v=bTaFcHMZhwQ",  desc:"Taro Sakamoto was the greatest hitman, feared by criminals and colleagues alike. Now he runs a convenience store after falling in love and starting a family." },
  ],
  kdrama: [
    { id:"k1",  title:"Crash Landing on You",     year:2019, status:"released", rating:4.9, votes:289000, genre:"Romance · Drama",         poster: BASE+"/j5MnFCT2TVQZ5p0DHdmkG8C1mgA.jpg",   trailer:"https://www.youtube.com/watch?v=RHKFQM7ORN4",  desc:"A South Korean heiress accidentally paraglides into North Korea and falls in love with an elite North Korean officer who decides to help her return home." },
    { id:"k2",  title:"Squid Game",               year:2021, status:"released", rating:4.8, votes:412000, genre:"Thriller · Drama",        poster: BASE+"/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",   trailer:"https://www.youtube.com/watch?v=oqxAJKy0ii4",  desc:"Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes." },
    { id:"k3",  title:"Squid Game Season 2",      year:2024, status:"released", rating:4.4, votes:289000, genre:"Thriller · Drama",        poster: BASE+"/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",   trailer:"https://www.youtube.com/watch?v=TBTBL7V_p1g",  desc:"Gi-hun returns to South Korea. Vowing to fight the people behind the game, he raises a team and infiltrates the organization to stop the deadly games forever." },
    { id:"k4",  title:"My Mister",                year:2018, status:"released", rating:5.0, votes:198000, genre:"Drama · Slice of Life",   poster: BASE+"/vbVxhKMzfGJpJW0dEzEt3eeoFfh.jpg",   trailer:"https://www.youtube.com/watch?v=35OJA5gVYf0",  desc:"Three brothers struggle against the weight of their lives. A cold young woman watches over the brothers and helps them." },
    { id:"k5",  title:"It's Okay to Not Be Okay", year:2020, status:"released", rating:4.9, votes:245000, genre:"Romance · Psychological", poster: BASE+"/3gRMQA09KVHqe8B2TQVBq7PcuSq.jpg",   trailer:"https://www.youtube.com/watch?v=3hGrpHgBXeE",  desc:"A community health worker and a self-centered children's book author with antisocial personality disorder help each other overcome their emotional wounds." },
    { id:"k6",  title:"Vincenzo",                 year:2021, status:"released", rating:4.8, votes:231000, genre:"Action · Comedy",         poster: BASE+"/oBPGNOk3PXNV0eoQGTjhnViqHT1.jpg",   trailer:"https://www.youtube.com/watch?v=cB_YSqFVyHI",  desc:"A Korean-Italian mafia consigliere comes to Korea for a gold buried under a building. He ends up fighting against a powerful law firm." },
    { id:"k7",  title:"Extraordinary Attorney Woo",year:2022,status:"released", rating:4.7, votes:187000, genre:"Legal · Romance",         poster: BASE+"/tuGCrFdDdThRiqM7QfA6RTFZ3nE.jpg",   trailer:"https://www.youtube.com/watch?v=BT_OGHuWhSg",  desc:"Young attorney Woo Young-woo has autism spectrum disorder. Her brilliant legal mind and unique perspective help her navigate cases and relationships." },
    { id:"k8",  title:"Goblin",                   year:2016, status:"released", rating:4.9, votes:278000, genre:"Fantasy · Romance",       poster: BASE+"/oBkvUfhHT9tELZzooNYxLcxhJeB.jpg",   trailer:"https://www.youtube.com/watch?v=CX2DkBz2GZ0",  desc:"A goblin who has lived for 900 years is cursed to suffer immortality. He needs a human bride to end his immortal life, but the bride has a special fate too." },
    { id:"k9",  title:"Queen of Tears",           year:2024, status:"released", rating:4.8, votes:312000, genre:"Romance · Drama",         poster: BASE+"/rjKoFfBHPahKjJmCk2VByGXuXpX.jpg",   trailer:"https://www.youtube.com/watch?v=OQzRNaZwtPY",  desc:"A chaebol heiress and her husband, from a small town, find themselves falling in love again after facing a series of unexpected trials." },
    { id:"k10", title:"Lovely Runner",            year:2024, status:"released", rating:4.8, votes:256000, genre:"Romance · Time Travel",   poster: BASE+"/ncDQgGlXBDsMp59eZHT9XeCAkwP.jpg",   trailer:"https://www.youtube.com/watch?v=1U_TqKxKWwk",  desc:"A top star travels back to 2008 to save her favorite idol from his death, but in doing so, becomes entangled in a dangerous time loop." },
    { id:"k11", title:"When the Stars Gossip",    year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Romance · Sci-Fi",        poster: BASE+"/j2jn5UdKHmXeHRRHZMlmGjFODNq.jpg",   trailer:"https://www.youtube.com/watch?v=LHtdKWJdif4",  desc:"Set in outer space, a romance unfolds between a space station commander and an OB/GYN doctor." },
    { id:"k12", title:"Jeju Odyssey",             year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Romance · Adventure",     poster: BASE+"/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",   trailer:"https://www.youtube.com/watch?v=LHtdKWJdif4",  desc:"An upcoming romance drama set on the beautiful island of Jeju." },
  ],
  series: [
    { id:"s1",  title:"Breaking Bad",             year:2008, status:"released", rating:5.0, votes:478000, genre:"Crime · Drama",           poster: BASE+"/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",    trailer:"https://www.youtube.com/watch?v=HhesaQXLuRY",  desc:"A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine." },
    { id:"s2",  title:"Stranger Things",          year:2016, status:"released", rating:4.7, votes:389000, genre:"Sci-Fi · Horror",         poster: BASE+"/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",   trailer:"https://www.youtube.com/watch?v=b9EkMc79ZSU",  desc:"When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back." },
    { id:"s3",  title:"Game of Thrones",          year:2011, status:"released", rating:4.5, votes:512000, genre:"Fantasy · Drama",         poster: BASE+"/u3bZgnGQ9T01sKRC7Jkc4wEIrT.jpg",   trailer:"https://www.youtube.com/watch?v=KPLWWIOCOOQ", desc:"Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia." },
    { id:"s4",  title:"The Last of Us",           year:2023, status:"released", rating:4.9, votes:312000, genre:"Drama · Post-Apocalyptic",poster: BASE+"/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",   trailer:"https://www.youtube.com/watch?v=uLtkt8BonwM",  desc:"After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope." },
    { id:"s5",  title:"House of the Dragon",      year:2022, status:"released", rating:4.5, votes:267000, genre:"Fantasy · Drama",         poster: BASE+"/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg",   trailer:"https://www.youtube.com/watch?v=DotnJ7tTA34",  desc:"An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen." },
    { id:"s6",  title:"Wednesday",                year:2022, status:"released", rating:4.5, votes:298000, genre:"Mystery · Comedy",        poster: BASE+"/9PFonBhy4cQy7hjTLE0NOoOB3F0.jpg",   trailer:"https://www.youtube.com/watch?v=Di310WS8zLk",  desc:"Follows Wednesday Addams' years as a student at Nevermore Academy, where she attempts to master her emerging psychic ability." },
    { id:"s7",  title:"The Bear",                 year:2022, status:"released", rating:4.8, votes:198000, genre:"Drama · Comedy",          poster: BASE+"/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",   trailer:"https://www.youtube.com/watch?v=gLCaLvJLbRQ",  desc:"A young chef from the fine dining world comes to Chicago to run his family's sandwich shop after a tragedy." },
    { id:"s8",  title:"Shogun",                   year:2024, status:"released", rating:4.9, votes:212000, genre:"Historical · Drama",      poster: BASE+"/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",   trailer:"https://www.youtube.com/watch?v=SnCLCCEjFaA",  desc:"In feudal Japan, a mysterious English navigator arrives in a land on the brink of a civil war and forms an unlikely bond with a powerful lord." },
    { id:"s9",  title:"Severance S2",             year:2025, status:"released", rating:4.9, votes:178000, genre:"Sci-Fi · Thriller",       poster: BASE+"/lM9nEP0KXe1eo7GedQMhmSLOGS0.jpg",   trailer:"https://www.youtube.com/watch?v=xEQP4VVuyrY",  desc:"Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives." },
    { id:"s10", title:"The White Lotus S3",       year:2025, status:"released", rating:4.7, votes:189000, genre:"Drama · Dark Comedy",     poster: BASE+"/bkpPTZUdq31UGDovmszsg2CchiI.jpg",   trailer:"https://www.youtube.com/watch?v=C4SBZU3bSV4",  desc:"Set at an exclusive Thai resort, the third season follows a new set of hotel guests and staff over the course of a week." },
    { id:"s11", title:"Daredevil: Born Again",    year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Action · Crime",          poster: BASE+"/a8IuE77eFqE4NsF0ABv0lMQ7kWG.jpg",   trailer:"https://www.youtube.com/watch?v=2vPT4tgFEpQ",  desc:"Matt Murdock struggles to balance his life as a lawyer with his vigilante activities as Daredevil in New York City." },
    { id:"s12", title:"The Mandalorian S4",       year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Sci-Fi · Western",        poster: BASE+"/sgl66NuliqkBLWk1MjkgFJDEDpq.jpg",   trailer:"https://www.youtube.com/watch?v=aOC8E8z_ifw",  desc:"The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic." },
  ],
  books: [
    { id:"b1",  title:"Atomic Habits",            year:2018, status:"released", rating:4.9, votes:312000, genre:"Self-Help · Psychology",  poster:"https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", trailer:"https://www.youtube.com/watch?v=PZ7lDrwYdZc",  desc:"Tiny changes, remarkable results. An easy and proven way to build good habits and break bad ones. James Clear reveals practical strategies." },
    { id:"b2",  title:"The Alchemist",            year:1988, status:"released", rating:4.8, votes:421000, genre:"Fiction · Philosophy",    poster:"https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg", trailer:"https://www.youtube.com/watch?v=17Q4sJMHJlQ",  desc:"Paulo Coelho's masterpiece tells the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of worldly treasure." },
    { id:"b3",  title:"Project Hail Mary",        year:2021, status:"released", rating:4.9, votes:198000, genre:"Sci-Fi · Adventure",      poster:"https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg", trailer:"https://www.youtube.com/watch?v=5dKSW3WfC7M",  desc:"Ryland Grace wakes up alone on a spacecraft with no memory of how he got there. He soon discovers he's on a mission to save the Earth." },
    { id:"b4",  title:"Fourth Wing",              year:2023, status:"released", rating:4.7, votes:287000, genre:"Fantasy · Romance",       poster:"https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg", trailer:"https://www.youtube.com/watch?v=IvV8J0QLBoo",  desc:"Violet Sorrengail was supposed to enter the Scribes Quadrant. Instead she's forced to enter Basgiath War College—where riders bond with dragons or die." },
    { id:"b5",  title:"Ikigai",                   year:2016, status:"released", rating:4.6, votes:189000, genre:"Self-Help · Philosophy",  poster:"https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg", trailer:"https://www.youtube.com/watch?v=D0hTm8vf1pg",  desc:"The Japanese secret to a long and happy life. The residents of Okinawa, one of the world's longest-living populations, share their philosophy." },
    { id:"b6",  title:"Educated",                 year:2018, status:"released", rating:4.8, votes:231000, genre:"Memoir · Biography",      poster:"https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg", trailer:"https://www.youtube.com/watch?v=2JN3-iKPdaw",  desc:"Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in rural Idaho, she kept no birth certificate." },
    { id:"b7",  title:"The Midnight Library",     year:2020, status:"released", rating:4.5, votes:176000, genre:"Fiction · Fantasy",       poster:"https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg", trailer:"https://www.youtube.com/watch?v=_LFTTjNpUUs",  desc:"Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life." },
    { id:"b8",  title:"A Court of Thorns & Roses",year:2015, status:"released", rating:4.6, votes:198000, genre:"Fantasy · Romance",       poster:"https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg", trailer:"https://www.youtube.com/watch?v=mBU1dHKV6K0",  desc:"Feyre is a huntress. After she kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a magical land, she discovers more than she bargained for." },
    { id:"b9",  title:"It Ends with Us",          year:2016, status:"released", rating:4.5, votes:312000, genre:"Romance · Drama",         poster:"https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg", trailer:"https://www.youtube.com/watch?v=AKKs7xE5q9s",  desc:"Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants. She was just never expecting to fall for Ryle Kincaid." },
    { id:"b10", title:"Intermezzo",               year:2024, status:"released", rating:4.4, votes:89000,  genre:"Literary Fiction",        poster:"https://covers.openlibrary.org/b/isbn/9780374611927-L.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",  desc:"Two grieving brothers navigate love and loss in this intimate portrait of family bonds. Sally Rooney's most ambitious novel." },
    { id:"b11", title:"Wind and Truth",           year:2024, status:"released", rating:4.8, votes:134000, genre:"Fantasy · Epic",          poster:"https://covers.openlibrary.org/b/isbn/9780765326379-L.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",  desc:"The concluding volume of The Stormlight Archive's first arc. Dalinar Kholin has united Roshar. Now he must face the final challenge." },
    { id:"b12", title:"Onyx Storm",               year:2025, status:"upcoming", rating:0,   votes:0,      genre:"Fantasy · Romance",       poster:"https://covers.openlibrary.org/b/isbn/9781649374073-L.jpg", trailer:"https://www.youtube.com/watch?v=IvV8J0QLBoo",  desc:"The highly anticipated third book in the Empyrean series by Rebecca Yarros, continuing Violet's story in the dragon rider world." },
  ],
  music: [
    { id:"mu1", title:"The Tortured Poets Dept.", year:2024, status:"released", rating:4.8, votes:342000, genre:"Pop · Indie Folk",        poster:"https://upload.wikimedia.org/wikipedia/en/d/d9/Taylor_Swift_-_The_Tortured_Poets_Department.png", trailer:"https://www.youtube.com/watch?v=slJMGHVK_0I", desc:"Taylor Swift's 11th studio album is a sweeping, melancholy exploration of heartbreak, fame, and obsession across 31 tracks." },
    { id:"mu2", title:"Cowboy Carter",            year:2024, status:"released", rating:4.9, votes:289000, genre:"Country · R&B",           poster:"https://upload.wikimedia.org/wikipedia/en/4/4d/Beyonc%C3%A9_-_Cowboy_Carter.png", trailer:"https://www.youtube.com/watch?v=SXSfGqFeCPw", desc:"Beyoncé's eighth studio album, a genre-blending country record that challenges notions of genre and celebrates Black contributions to American music." },
    { id:"mu3", title:"GNX",                      year:2024, status:"released", rating:4.9, votes:312000, genre:"Hip-Hop · Rap",           poster:"https://upload.wikimedia.org/wikipedia/en/0/06/Kendrick_Lamar_-_GNX.png", trailer:"https://www.youtube.com/watch?v=LB4EMHsxjOc", desc:"Kendrick Lamar's surprise sixth studio album, released amid his cultural moment following 'Not Like Us'. A definitive statement of artistry." },
    { id:"mu4", title:"Short n' Sweet",           year:2024, status:"released", rating:4.7, votes:198000, genre:"Pop · R&B",              poster:"https://upload.wikimedia.org/wikipedia/en/f/f8/Sabrina_Carpenter_-_Short_n%27_Sweet.png", trailer:"https://www.youtube.com/watch?v=mZ9QY9pUjPw", desc:"Sabrina Carpenter's sixth studio album, a breezy, polished pop record filled with witty wordplay and irresistible hooks." },
    { id:"mu5", title:"GUTS",                     year:2023, status:"released", rating:4.7, votes:231000, genre:"Pop · Alt-Rock",          poster:"https://upload.wikimedia.org/wikipedia/en/a/a6/Olivia_Rodrigo_-_Guts.png", trailer:"https://www.youtube.com/watch?v=YDJoE97xhSs", desc:"Olivia Rodrigo's second studio album, a sharp, guitar-forward pop record about the anxieties and contradictions of being young and famous." },
    { id:"mu6", title:"Hit Me Hard and Soft",     year:2024, status:"released", rating:4.8, votes:198000, genre:"Alt-Pop · Indie",         poster:"https://upload.wikimedia.org/wikipedia/en/9/9f/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png", trailer:"https://www.youtube.com/watch?v=J2idFRMRpRo", desc:"Billie Eilish's third studio album, an intimate and emotionally direct record exploring vulnerability, love, and identity." },
    { id:"mu7", title:"Manning Fireworks",        year:2024, status:"released", rating:4.6, votes:134000, genre:"Indie Pop",               poster:"https://upload.wikimedia.org/wikipedia/en/b/b8/MJ_Lenderman_Manning_Fireworks.jpg", trailer:"https://www.youtube.com/watch?v=e7A_TtEFzY0", desc:"MJ Lenderman's breakthrough major label debut, a sprawling, wry indie rock record full of vivid imagery and effortless guitar work." },
    { id:"mu8", title:"Radical Optimism",         year:2024, status:"released", rating:4.4, votes:189000, genre:"Dance Pop · Electronic",  poster:"https://upload.wikimedia.org/wikipedia/en/1/17/Dua_Lipa_-_Radical_Optimism.png", trailer:"https://www.youtube.com/watch?v=tdnTaEGPl7E", desc:"Dua Lipa's third studio album blends psychedelic pop with dance music influences, exploring themes of self-acceptance and resilience." },
    { id:"mu9", title:"Chromakopia",              year:2024, status:"released", rating:4.7, votes:245000, genre:"Hip-Hop · Alternative",   poster:"https://upload.wikimedia.org/wikipedia/en/4/40/Tyler%2C_the_Creator_-_Chromakopia.png", trailer:"https://www.youtube.com/watch?v=GkFVMp1ymOc", desc:"Tyler, the Creator's eighth studio album, a maximalist, introspective record about his complicated relationship with fame, family, and identity." },
    { id:"mu10",title:"Bright Future",            year:2024, status:"released", rating:4.7, votes:156000, genre:"Folk · Indie",            poster:"https://upload.wikimedia.org/wikipedia/en/5/5a/Adrianne_Lenker_Bright_Future.jpg", trailer:"https://www.youtube.com/watch?v=KuJ5EibEBbQ", desc:"Adrianne Lenker's stunning seventh album, recorded live with just voice and guitar, capturing grief and joy in its rawest, most intimate form." },
    { id:"mu11",title:"20/20 Experience Reissue", year:2025, status:"upcoming", rating:0,   votes:0,      genre:"R&B · Pop",              poster:"https://upload.wikimedia.org/wikipedia/en/a/a8/Justin_Timberlake_-_The_20-20_Experience.jpg", trailer:"https://www.youtube.com/watch?v=vo4sETnDMoo", desc:"Anticipated reissue and deluxe edition of Justin Timberlake's acclaimed 2013 album." },
    { id:"mu12",title:"New Album – Rihanna",      year:2025, status:"upcoming", rating:0,   votes:0,      genre:"R&B · Pop",              poster:"https://upload.wikimedia.org/wikipedia/commons/c/c2/Rihanna_-_Loud_%28Official_Album_Cover%29.png", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", desc:"The long-awaited ninth studio album from Rihanna — reportedly the most anticipated album release in years." },
  ],
};

function sortItems(items, sortId) {
  const now = 2025;
  switch(sortId) {
    case "trending":  return [...items].sort((a,b) => b.votes - a.votes).slice(0,8);
    case "popular":   return [...items].sort((a,b) => b.votes*b.rating - a.votes*a.rating);
    case "newest":    return [...items].filter(i=>i.status==="released").sort((a,b)=>b.year-a.year);
    case "upcoming":  return [...items].filter(i=>i.status==="upcoming");
    case "top":       return [...items].filter(i=>i.rating>0).sort((a,b)=>b.rating-a.rating);
    default:          return items;
  }
}

function Stars({ val, onChange, size=20 }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{display:"flex",gap:2}}>
      {[1,2,3,4,5].map(s=>(
        <span key={s} onClick={()=>onChange&&onChange(s)}
          onMouseEnter={()=>onChange&&setHov(s)} onMouseLeave={()=>onChange&&setHov(0)}
          style={{fontSize:size,cursor:onChange?"pointer":"default",lineHeight:1,display:"inline-block",
            color:s<=(hov||val)?"#FFD700":"#2a2a2a",transition:"all 0.1s",
            transform:hov===s?"scale(1.3)":"scale(1)"}}>★</span>
      ))}
    </div>
  );
}

function TrailerModal({ url, onClose }) {
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:2000,
        display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:860,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:-44,right:0,background:"transparent",
          border:"1px solid #333",borderRadius:8,padding:"6px 14px",color:"#aaa",cursor:"pointer",
          fontSize:13,fontFamily:"monospace"}}>✕ CLOSE</button>
        <div style={{aspectRatio:"16/9",borderRadius:12,overflow:"hidden"}}>
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay; encrypted-media" allowFullScreen style={{border:"none",display:"block"}}/>
        </div>
      </div>
    </div>
  );
}

function WriteReview({ item, cat, onClose, onPost }) {
  const [rating,setRating]=useState(0);
  const [mood,setMood]=useState("");
  const [text,setText]=useState("");
  const [done,setDone]=useState(false);
  const go=()=>{
    if(!rating||text.trim().length<5) return;
    setDone(true);
    setTimeout(()=>{onPost({rating,mood,text});onClose();},1200);
  };
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(16px)",
        zIndex:1800,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#0f0f0f",border:`1px solid ${cat.color}30`,borderRadius:20,
        width:"100%",maxWidth:480,padding:28,animation:"slideUp 0.3s ease"}}>
        {done?(
          <div style={{textAlign:"center",padding:"36px 0"}}>
            <div style={{fontSize:48,marginBottom:10}}>🎉</div>
            <div style={{color:"#fff",fontSize:18,fontFamily:"Georgia,serif",fontWeight:700}}>Review Posted!</div>
          </div>
        ):(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{color:cat.color,fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"monospace"}}>{cat.icon} Rate & Review</div>
                <div style={{color:"#fff",fontSize:17,fontFamily:"Georgia,serif",fontWeight:700,marginTop:4,maxWidth:320}}>{item.title}</div>
              </div>
              <button onClick={onClose} style={{background:"#1a1a1a",border:"1px solid #2a2a2a",color:"#666",borderRadius:8,padding:"5px 11px",cursor:"pointer",fontSize:15}}>✕</button>
            </div>
            <div style={{marginBottom:16}}>
              <div style={{color:"#555",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>Your Rating</div>
              <Stars val={rating} onChange={setRating} size={32}/>
              {rating>0&&<div style={{color:"#FFD700",fontSize:11,marginTop:6,fontFamily:"monospace"}}>
                {["","😩 Poor","😕 Fair","😐 OK","😊 Good","🤩 Amazing"][rating]}
              </div>}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{color:"#555",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>Your Mood</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {MOODS.map(m=>(
                  <button key={m} onClick={()=>setMood(m===mood?"":m)}
                    style={{background:mood===m?`${cat.color}20`:"#141414",border:`1px solid ${mood===m?cat.color:"#242424"}`,
                      borderRadius:20,padding:"5px 12px",color:mood===m?cat.color:"#666",fontSize:11,cursor:"pointer",transition:"all 0.15s"}}>{m}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{color:"#555",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:8}}>Your Review</div>
              <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="What did you think? Be honest..."
                rows={4} style={{width:"100%",background:"#080808",border:"1px solid #222",borderRadius:10,padding:14,
                  color:"#fff",fontSize:13,fontFamily:"Georgia,serif",resize:"none",outline:"none",lineHeight:1.7,boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderColor=cat.color} onBlur={e=>e.target.style.borderColor="#222"}/>
              <div style={{color:"#333",fontSize:10,textAlign:"right",marginTop:4,fontFamily:"monospace"}}>{text.length}/1000</div>
            </div>
            <button onClick={go} disabled={!rating||text.trim().length<5}
              style={{width:"100%",padding:"13px",fontFamily:"monospace",fontSize:12,fontWeight:700,letterSpacing:"0.1em",
                border:"none",borderRadius:12,cursor:rating&&text.trim().length>=5?"pointer":"not-allowed",transition:"all 0.2s",
                background:rating&&text.trim().length>=5?`linear-gradient(135deg,${cat.color},${cat.color}80)`:"#141414",
                color:rating&&text.trim().length>=5?"#fff":"#333"}}>POST REVIEW →</button>
          </>
        )}
      </div>
    </div>
  );
}

function DetailModal({ item, cat, onClose }) {
  const [trailer,setTrailer]=useState(false);
  const [writeReview,setWriteReview]=useState(false);
  const [saved,setSaved]=useState(false);
  const [reviews,setReviews]=useState([
    {id:"dr1",user:"MovieFan92",avatar:"M",rating:5,mood:"🔥 Epic",text:"One of the best things I've ever experienced. The world-building is incredible and the performances are outstanding.",date:"3 days ago",likes:412},
    {id:"dr2",user:"CriticPro",avatar:"C",rating:4,mood:"🤔 Thought-provoking",text:"Brilliant but slightly overlong. The themes are rich and the execution is mostly superb. A few pacing issues in the middle.",date:"1 week ago",likes:287},
    {id:"dr3",user:"AniLover",avatar:"A",rating:5,mood:"😭 Emotional",text:"I cried three times. The character development is unmatched and the emotional payoff in the finale is beyond words.",date:"2 weeks ago",likes:634},
  ]);

  return (
    <>
      <div onClick={e=>e.target===e.currentTarget&&onClose()}
        style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(20px)",
          zIndex:1500,overflowY:"auto",padding:"24px 16px"}}>
        <div style={{maxWidth:800,margin:"0 auto",animation:"slideUp 0.35s ease"}}>

          {/* Hero */}
          <div style={{display:"flex",gap:24,marginBottom:32,flexWrap:"wrap",position:"relative"}}>
            {/* Glow */}
            <div style={{position:"absolute",top:0,left:0,width:200,height:300,borderRadius:"50%",
              background:`radial-gradient(circle,${cat.color}20 0%,transparent 70%)`,pointerEvents:"none",filter:"blur(40px)"}}/>

            <img src={item.poster} alt={item.title}
              onError={e=>{e.target.src=`https://picsum.photos/seed/${item.id}/300/450`;}}
              style={{width:180,height:270,objectFit:"cover",borderRadius:14,flexShrink:0,
                boxShadow:`0 24px 80px ${cat.color}30`,position:"relative"}}/>

            <div style={{flex:1,minWidth:220,position:"relative"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{background:`${cat.color}20`,border:`1px solid ${cat.color}50`,borderRadius:20,
                  padding:"3px 12px",fontSize:10,color:cat.color,fontFamily:"monospace",fontWeight:700,
                  textTransform:"uppercase",letterSpacing:"0.1em"}}>{cat.icon} {cat.label}</span>
                {item.status==="upcoming"&&(
                  <span style={{background:"#FFD70020",border:"1px solid #FFD70050",borderRadius:20,
                    padding:"3px 12px",fontSize:10,color:"#FFD700",fontFamily:"monospace",fontWeight:700}}>🗓 UPCOMING</span>
                )}
              </div>

              <h1 style={{color:"#fff",fontSize:"clamp(20px,4vw,30px)",fontFamily:"Georgia,serif",
                fontWeight:900,margin:"0 0 4px",lineHeight:1.2}}>{item.title}</h1>
              <div style={{color:"#555",fontSize:12,fontFamily:"monospace",marginBottom:12}}>
                {item.year} · {item.genre}
              </div>

              {item.rating>0?(
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                  <div>
                    <Stars val={Math.round(item.rating)} size={18}/>
                    <div style={{display:"flex",alignItems:"baseline",gap:4,marginTop:4}}>
                      <span style={{color:"#FFD700",fontSize:24,fontWeight:900,fontFamily:"monospace"}}>{item.rating}</span>
                      <span style={{color:"#444",fontSize:12,fontFamily:"monospace"}}>/5 · {item.votes.toLocaleString()} ratings</span>
                    </div>
                  </div>
                </div>
              ):(
                <div style={{color:"#555",fontSize:13,fontFamily:"monospace",marginBottom:16}}>⏳ Not yet released · Be the first to rate!</div>
              )}

              <p style={{color:"#888",fontSize:13,lineHeight:1.75,marginBottom:20,fontFamily:"Georgia,serif",fontStyle:"italic"}}>{item.desc}</p>

              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button onClick={()=>setTrailer(true)}
                  style={{display:"flex",alignItems:"center",gap:8,background:`linear-gradient(135deg,${cat.color},${cat.color}80)`,
                    border:"none",borderRadius:10,padding:"11px 20px",color:"#fff",fontWeight:700,fontSize:12,
                    cursor:"pointer",fontFamily:"monospace",letterSpacing:"0.06em",
                    boxShadow:`0 4px 20px ${cat.color}40`}}>▶ WATCH TRAILER</button>
                <button onClick={()=>setWriteReview(true)}
                  style={{background:"#141414",border:"1px solid #2a2a2a",borderRadius:10,
                    padding:"11px 20px",color:"#ddd",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"monospace"}}>✍️ RATE & REVIEW</button>
                <button onClick={()=>setSaved(!saved)}
                  style={{background:saved?"#FFD70015":"#141414",border:`1px solid ${saved?"#FFD700":"#2a2a2a"}`,
                    borderRadius:10,padding:"11px 16px",color:saved?"#FFD700":"#666",fontSize:16,cursor:"pointer"}}>
                  {saved?"⭐":"☆"}</button>
                <button onClick={onClose}
                  style={{background:"#141414",border:"1px solid #2a2a2a",borderRadius:10,padding:"11px 16px",
                    color:"#666",fontSize:12,cursor:"pointer",fontFamily:"monospace",marginLeft:"auto"}}>✕</button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div style={{borderTop:`1px solid ${cat.color}20`,paddingTop:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{color:"#fff",fontSize:16,fontFamily:"Georgia,serif",fontWeight:700}}>
                Community Reviews <span style={{color:"#333",fontSize:12,fontWeight:400,fontFamily:"monospace"}}>({reviews.length})</span>
              </h3>
              <button onClick={()=>setWriteReview(true)}
                style={{background:`${cat.color}15`,border:`1px solid ${cat.color}40`,borderRadius:20,
                  padding:"6px 16px",color:cat.color,fontSize:11,cursor:"pointer",fontFamily:"monospace",fontWeight:700}}>+ ADD YOURS</button>
            </div>
            {reviews.map(r=>(
              <div key={r.id} style={{background:"#090909",border:"1px solid #161616",borderRadius:14,padding:18,marginBottom:12}}>
                <div style={{display:"flex",gap:12,marginBottom:12}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${cat.color},#A855F7)`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",
                    flexShrink:0,fontFamily:"monospace"}}>{r.avatar}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{color:"#fff",fontWeight:700,fontSize:13,fontFamily:"Georgia,serif"}}>{r.user}</span>
                      <span style={{color:"#333",fontSize:10,fontFamily:"monospace"}}>{r.date}</span>
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginTop:4}}>
                      <Stars val={r.rating} size={13}/>
                      {r.mood&&<span style={{background:"#141414",border:"1px solid #222",borderRadius:20,
                        padding:"1px 9px",fontSize:10,color:"#777"}}>{r.mood}</span>}
                    </div>
                  </div>
                </div>
                <p style={{color:"#999",fontSize:13,lineHeight:1.7,margin:"0 0 10px",fontFamily:"Georgia,serif"}}>{r.text}</p>
                <span style={{color:"#444",fontSize:10,fontFamily:"monospace"}}>🤍 {r.likes} found this helpful</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {trailer&&<TrailerModal url={item.trailer} onClose={()=>setTrailer(false)}/>}
      {writeReview&&<WriteReview item={item} cat={cat} onClose={()=>setWriteReview(false)}
        onPost={({rating,mood,text})=>setReviews([{id:`dr${Date.now()}`,user:"You",avatar:"Y",rating,mood,text,date:"Just now",likes:0},...reviews])}/>}
    </>
  );
}

function Card({ item, cat, onClick }) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={()=>onClick(item)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderRadius:14,overflow:"hidden",cursor:"pointer",position:"relative",
        transform:hov?"translateY(-8px) scale(1.03)":"translateY(0) scale(1)",
        transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        border:`1px solid ${hov?cat.color+"60":"#181818"}`,
        boxShadow:hov?`0 24px 60px ${cat.color}20`:"none"}}>
      <div style={{aspectRatio:"2/3",position:"relative",overflow:"hidden",background:"#111"}}>
        <img src={item.poster} alt={item.title}
          onError={e=>{e.target.src=`https://picsum.photos/seed/${item.id}/300/450`;}}
          style={{width:"100%",height:"100%",objectFit:"cover",
            transform:hov?"scale(1.08)":"scale(1)",transition:"transform 0.5s ease",display:"block"}}/>
        <div style={{position:"absolute",inset:0,
          background:hov?`linear-gradient(to top,${cat.color}CC 0%,rgba(0,0,0,0.5) 50%,transparent 100%)`
                        :"linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.3) 50%,transparent 100%)",
          transition:"background 0.3s"}}/>
        {/* Badges */}
        <div style={{position:"absolute",top:8,left:8,display:"flex",flexDirection:"column",gap:4}}>
          {item.status==="upcoming"&&(
            <span style={{background:"#FFD700",borderRadius:20,padding:"2px 8px",fontSize:9,color:"#000",fontWeight:700,fontFamily:"monospace"}}>UPCOMING</span>
          )}
          {item.rating>=4.8&&item.status==="released"&&(
            <span style={{background:cat.color,borderRadius:20,padding:"2px 8px",fontSize:9,color:"#fff",fontWeight:700,fontFamily:"monospace"}}>TOP RATED</span>
          )}
        </div>
        {item.rating>0&&(
          <div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(8px)",
            borderRadius:20,padding:"3px 9px",fontSize:11,color:"#FFD700",fontWeight:700,fontFamily:"monospace"}}>
            ★ {item.rating}
          </div>
        )}
        {/* Hover play button */}
        {hov&&(
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,0.15)",
              backdropFilter:"blur(8px)",border:"2px solid rgba(255,255,255,0.3)",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>▶</div>
          </div>
        )}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 10px 10px"}}>
          <div style={{fontSize:10,color:hov?"rgba(255,255,255,0.9)":cat.color,fontWeight:700,
            fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3,transition:"color 0.3s"}}>{item.genre.split("·")[0].trim()}</div>
          <div style={{fontSize:13,color:"#fff",fontWeight:700,fontFamily:"Georgia,serif",lineHeight:1.3,
            textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>{item.title}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:2,fontFamily:"monospace"}}>{item.year}
            {item.votes>0?` · ${(item.votes/1000).toFixed(0)}K ratings`:""}</div>
        </div>
      </div>
    </div>
  );
}

export default function Mosaic() {
  const [activeCat,setActiveCat]=useState("movies");
  const [sort,setSort]=useState("trending");
  const [selected,setSelected]=useState(null);
  const [page,setPage]=useState("browse");
  const [search,setSearch]=useState("");
  const [searchVal,setSearchVal]=useState("");

  const cat = CATEGORIES.find(c=>c.id===activeCat);
  const raw = DATA[activeCat]||[];
  const sorted = sortItems(raw, sort);
  const displayed = search ? raw.filter(i=>i.title.toLowerCase().includes(search.toLowerCase())) : sorted;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#050505;}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#222;border-radius:2px;}
        input,textarea,button{font-family:inherit;}
      `}</style>

      <div style={{minHeight:"100vh",background:"#050505",color:"#fff",fontFamily:"'Space Mono',monospace"}}>

        {/* NAV */}
        <nav style={{position:"sticky",top:0,zIndex:800,background:"rgba(5,5,5,0.95)",
          backdropFilter:"blur(24px)",borderBottom:"1px solid #111",
          display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",height:54}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setPage("browse")}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,width:26,height:26,borderRadius:6,overflow:"hidden"}}>
              {["#E50914","#FF6B35","#EC4899","#3B82F6","#10B981","#A855F7","#E50914","#FF6B35","#EC4899"].map((c,i)=>(
                <div key={i} style={{background:c,borderRadius:2,opacity:activeCat===["movies","anime","kdrama","series","books","music","movies","anime","kdrama"][i]?1:0.5}}/>
              ))}
            </div>
            <span style={{fontSize:18,fontWeight:900,fontFamily:"'Playfair Display',serif",
              background:`linear-gradient(135deg,#fff 30%,${cat.color})`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Mosaic</span>
          </div>
          {/* Search */}
          <div style={{flex:1,maxWidth:380,margin:"0 16px",position:"relative"}}>
            <input value={searchVal} onChange={e=>setSearchVal(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&setSearch(searchVal)}
              placeholder={`Search ${cat.label}...`}
              style={{width:"100%",padding:"8px 16px 8px 38px",background:"#0f0f0f",
                border:"1px solid #1c1c1c",borderRadius:50,color:"#fff",fontSize:12,outline:"none",
                fontFamily:"monospace",transition:"border-color 0.2s"}}
              onFocus={e=>e.target.style.borderColor=cat.color}
              onBlur={e=>e.target.style.borderColor="#1c1c1c"}/>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:0.4}}>🔍</span>
            {(search||searchVal)&&<button onClick={()=>{setSearch("");setSearchVal("");}}
              style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
                background:"transparent",border:"none",color:cat.color,cursor:"pointer",fontSize:14}}>✕</button>}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <button style={{background:"transparent",border:"none",color:"#555",fontSize:11,
              cursor:"pointer",fontFamily:"monospace",fontWeight:700,padding:"4px 10px"}}>Sign In</button>
            <button style={{background:`linear-gradient(135deg,${cat.color},${cat.color}80)`,border:"none",
              borderRadius:20,padding:"7px 16px",color:"#fff",fontSize:11,cursor:"pointer",
              fontFamily:"monospace",fontWeight:700,letterSpacing:"0.06em"}}>JOIN FREE</button>
          </div>
        </nav>

        <div style={{display:"flex",minHeight:"calc(100vh - 54px)"}}>

          {/* SIDEBAR */}
          <aside style={{width:200,flexShrink:0,borderRight:"1px solid #111",padding:"20px 0",
            position:"sticky",top:54,height:"calc(100vh - 54px)",overflowY:"auto",
            background:"#050505",display:"flex",flexDirection:"column",gap:2}}>
            <div style={{padding:"0 12px 12px",color:"#333",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",fontFamily:"monospace"}}>Categories</div>
            {CATEGORIES.map(c=>(
              <button key={c.id} onClick={()=>{setActiveCat(c.id);setSort("trending");setSearch("");setSearchVal("");}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"11px 16px",
                  background:activeCat===c.id?`${c.color}12`:"transparent",
                  border:"none",borderLeft:`3px solid ${activeCat===c.id?c.color:"transparent"}`,
                  color:activeCat===c.id?"#fff":"#555",cursor:"pointer",textAlign:"left",
                  fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:700,transition:"all 0.2s",width:"100%"}}>
                <span style={{fontSize:18}}>{c.icon}</span>
                <span>{c.label}</span>
                {activeCat===c.id&&<span style={{marginLeft:"auto",width:6,height:6,borderRadius:"50%",background:c.color}}/>}
              </button>
            ))}
            <div style={{marginTop:"auto",padding:"12px 16px",borderTop:"1px solid #111"}}>
              <div style={{color:"#333",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>Platform Stats</div>
              {[["180K+","Reviews"],["6","Categories"],["50K+","Titles"]].map(([n,l])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:cat.color,fontSize:12,fontFamily:"monospace",fontWeight:700}}>{n}</span>
                  <span style={{color:"#444",fontSize:10,fontFamily:"monospace"}}>{l}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* MAIN */}
          <main style={{flex:1,padding:"24px 20px",minWidth:0,animation:"fadeIn 0.4s ease"}}>

            {/* Header */}
            <div style={{marginBottom:20}}>
              <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}>
                <h1 style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:900,color:"#fff"}}>{cat.icon} {cat.label}</h1>
                {search&&<span style={{color:"#555",fontSize:12,fontFamily:"monospace"}}>— results for "{search}"</span>}
              </div>
              <div style={{color:"#444",fontSize:11,fontFamily:"monospace"}}>{displayed.length} titles {search?"found":"available"}</div>
            </div>

            {/* Sort Tabs */}
            {!search&&(
              <div style={{display:"flex",gap:8,marginBottom:24,overflowX:"auto",paddingBottom:4}}>
                {SORT_OPTIONS.map(s=>(
                  <button key={s.id} onClick={()=>setSort(s.id)}
                    style={{background:sort===s.id?`${cat.color}20`:"#0e0e0e",
                      border:`1px solid ${sort===s.id?cat.color:"#1c1c1c"}`,
                      borderRadius:50,padding:"7px 16px",color:sort===s.id?cat.color:"#555",
                      fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"monospace",
                      whiteSpace:"nowrap",transition:"all 0.2s"}}>{s.label}</button>
                ))}
              </div>
            )}

            {/* Upcoming banner */}
            {sort==="upcoming"&&displayed.length===0&&(
              <div style={{background:"#FFD70010",border:"1px solid #FFD70030",borderRadius:14,padding:24,textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:32,marginBottom:8}}>🗓</div>
                <div style={{color:"#FFD700",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700}}>No upcoming titles yet in this category</div>
                <div style={{color:"#555",fontSize:12,marginTop:6,fontFamily:"monospace"}}>Check back soon — new releases are added regularly</div>
              </div>
            )}

            {/* Grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:14}}>
              {displayed.map(item=>(
                <Card key={item.id} item={item} cat={cat} onClick={i=>setSelected({item:i,cat})}/>
              ))}
            </div>

            {search&&displayed.length===0&&(
              <div style={{textAlign:"center",padding:"72px 0",color:"#333"}}>
                <div style={{fontSize:44,marginBottom:12}}>🔍</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#2a2a2a"}}>Nothing found for "{search}"</div>
                <div style={{fontSize:11,marginTop:6,fontFamily:"monospace"}}>Try searching in a different category</div>
              </div>
            )}
          </main>
        </div>

        {/* Detail Modal */}
        {selected&&<DetailModal item={selected.item} cat={selected.cat} onClose={()=>setSelected(null)}/>}
      </div>
    </>
  );
}
