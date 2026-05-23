import { useState } from "react";
import Stars from "./Stars";
import TrailerModal from "./TrailerModal";
import WriteReview from "./WriteReview";
import { useIsMobile } from "../hooks/useIsMobile";

/** Seed reviews shown before any user reviews are added. */
const SEED_REVIEWS = [
  {
    id: "dr1",
    user: "MovieFan92",
    avatar: "M",
    rating: 5,
    mood: "🔥 Epic",
    text: "One of the best things I've ever experienced. The world-building is incredible and the performances are outstanding.",
    date: "3 days ago",
    likes: 412,
  },
  {
    id: "dr2",
    user: "CriticPro",
    avatar: "C",
    rating: 4,
    mood: "🤔 Thought-provoking",
    text: "Brilliant but slightly overlong. The themes are rich and the execution is mostly superb. A few pacing issues in the middle.",
    date: "1 week ago",
    likes: 287,
  },
  {
    id: "dr3",
    user: "AniLover",
    avatar: "A",
    rating: 5,
    mood: "😭 Emotional",
    text: "I cried three times. The character development is unmatched and the emotional payoff in the finale is beyond words.",
    date: "2 weeks ago",
    likes: 634,
  },
  {
    id: "dr4",
    user: "CasualViewer",
    avatar: "C",
    rating: 3,
    mood: "🤷‍♂️ Mixed",
    text: "It was okay. Not really my cup of tea, but I can see why people enjoy it. The cinematography was nice at least.",
    date: "3 weeks ago",
    likes: 45,
  },
  {
    id: "dr5",
    user: "StoryHunter",
    avatar: "S",
    rating: 5,
    mood: "🤯 Mind-blowing",
    text: "The plot twists kept me on the edge of my seat! I honestly didn't see that ending coming. A true masterpiece.",
    date: "1 month ago",
    likes: 892,
  },
  {
    id: "dr6",
    user: "PacingPolice",
    avatar: "P",
    rating: 2,
    mood: "😴 Slow",
    text: "Took way too long to get to the point. The first half dragged endlessly, and by the time it picked up, I had lost interest.",
    date: "2 months ago",
    likes: 120,
  },
  {
    id: "dr7",
    user: "VisualsRUs",
    avatar: "V",
    rating: 4,
    mood: "✨ Beautiful",
    text: "The art direction and aesthetics are gorgeous. Every frame feels like a painting. It almost makes up for the lack of depth in the side characters.",
    date: "2 months ago",
    likes: 310,
  },
  {
    id: "dr8",
    user: "BookWorm88",
    avatar: "B",
    rating: 5,
    mood: "📚 Classic",
    text: "I keep coming back to this. There's a timeless quality here that transcends normal entertainment. Highly recommended to everyone.",
    date: "3 months ago",
    likes: 521,
  },
  {
    id: "dr9",
    user: "ActionJunkie",
    avatar: "A",
    rating: 4,
    mood: "⚔️ Thrilling",
    text: "The action sequences are top-tier. Choreography is fast, impactful, and easy to follow. Just wish the dialogue was a bit sharper.",
    date: "3 months ago",
    likes: 405,
  },
  {
    id: "dr10",
    user: "SoundSnob",
    avatar: "S",
    rating: 5,
    mood: "🎵 Atmospheric",
    text: "The soundtrack is doing incredibly heavy lifting here. It sets the tone perfectly from the very first second to the final credits.",
    date: "4 months ago",
    likes: 678,
  },
  {
    id: "dr11",
    user: "AverageJoe",
    avatar: "A",
    rating: 3,
    mood: "😐 Okay",
    text: "It's fine for a lazy Sunday afternoon, but nothing you'll remember a week from now. Entertaining enough while it lasts.",
    date: "4 months ago",
    likes: 88,
  },
  {
    id: "dr12",
    user: "LoreGeek",
    avatar: "L",
    rating: 5,
    mood: "🤓 Detailed",
    text: "The amount of lore packed into this is staggering. You can spend hours just analyzing the background details and subtle references.",
    date: "5 months ago",
    likes: 932,
  },
  {
    id: "dr13",
    user: "GrumpyCat",
    avatar: "G",
    rating: 1,
    mood: "😠 Disappointed",
    text: "A complete waste of time. I don't understand the hype at all. The writing felt incredibly forced and unnatural.",
    date: "5 months ago",
    likes: 41,
  },
  {
    id: "dr14",
    user: "TearJerker",
    avatar: "T",
    rating: 5,
    mood: "💔 Heartbreaking",
    text: "This broke me. The ending is so tragically beautiful. Make sure you have a box of tissues ready before starting this.",
    date: "6 months ago",
    likes: 1045,
  },
  {
    id: "dr15",
    user: "BingeWatcher",
    avatar: "B",
    rating: 4,
    mood: "🍿 Addictive",
    text: "I literally could not stop consuming this. Lost sleep because I kept telling myself 'just one more chapter/episode'. Absolutely gripping.",
    date: "6 months ago",
    likes: 756,
  },
  {
    id: "dr16",
    user: "DetailsMatter",
    avatar: "D",
    rating: 3,
    mood: "🧐 Puzzling",
    text: "Some plot holes really bothered me. Why didn't they just do the obvious thing in the third act? Still, it was a fun ride overall.",
    date: "7 months ago",
    likes: 156,
  },
  {
    id: "dr17",
    user: "LaughOutLoud",
    avatar: "L",
    rating: 5,
    mood: "😂 Hilarious",
    text: "The comedic timing is perfect. I had to pause multiple times because I was laughing too hard to pay attention. Pure gold.",
    date: "7 months ago",
    likes: 820,
  },
  {
    id: "dr18",
    user: "NostalgiaTrip",
    avatar: "N",
    rating: 4,
    mood: "🥺 Nostalgic",
    text: "This made me feel like a kid again. It perfectly captures that specific feeling of wonder and adventure. Really magical.",
    date: "8 months ago",
    likes: 610,
  },
  {
    id: "dr19",
    user: "CinematicGenius",
    avatar: "C",
    rating: 5,
    mood: "🎬 Masterclass",
    text: "A masterclass in storytelling. The way motifs are introduced early and paid off at the very end is nothing short of brilliant.",
    date: "8 months ago",
    likes: 1205,
  },
  {
    id: "dr20",
    user: "LateToTheParty",
    avatar: "L",
    rating: 4,
    mood: "🙌 Finally",
    text: "I finally got around to experiencing this, and yeah, everyone was right. It really is that good. Better late than never!",
    date: "9 months ago",
    likes: 430,
  }
];

/** Seed reviews shown for items that are upcoming/unreleased. */
const UPCOMING_REVIEWS = [
  {
    id: "ur1",
    user: "HypeTrain",
    avatar: "H",
    rating: null,
    mood: "🔥 Can't wait",
    text: "I've been waiting for this for years! The trailers and announcements look absolutely insane.",
    date: "1 day ago",
    likes: 89,
  },
  {
    id: "ur2",
    user: "DayOneFan",
    avatar: "D",
    rating: null,
    mood: "👀 Anticipating",
    text: "Ready for this as soon as it drops. The hype is incredibly real.",
    date: "3 days ago",
    likes: 45,
  },
  {
    id: "ur3",
    user: "LoreMaster",
    avatar: "L",
    rating: null,
    mood: "🤔 Curious",
    text: "Hope they stay true to the source material this time around. Fingers crossed!",
    date: "1 week ago",
    likes: 112,
  },
  {
    id: "ur4",
    user: "SkepticalViewer",
    avatar: "S",
    rating: null,
    mood: "🧐 Skeptical",
    text: "The previous entry was a letdown, so I'm keeping my expectations low for this one. Prove me wrong!",
    date: "2 weeks ago",
    likes: 34,
  },
  {
    id: "ur5",
    user: "TrailerAnalyzer",
    avatar: "T",
    rating: null,
    mood: "🤯 Mind-blowing",
    text: "Did you catch that hidden detail at 1:24 in the trailer? This is going to connect the entire universe together!",
    date: "1 month ago",
    likes: 320,
  }
];

/**
 * Full detail overlay for a selected content item.
 *
 * Props:
 *   item    {object}   The content item to display.
 *   cat     {object}   The active category (accent colour, icon, label).
 *   onClose {function} Callback to dismiss the modal.
 */
export default function DetailModal({ item, cat, onClose, onReviewAdded, watchlist = {}, setWatchlist }) {
  const isMobile = useIsMobile();
  const [showTrailer, setShowTrailer] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Load user reviews from localStorage
  const loadReviews = () => {
    const saved = localStorage.getItem("userReviews");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[item.id]) {
        return parsed[item.id];
      }
    }
    return [];
  };

  const initialSeed = item.status === 'upcoming' ? UPCOMING_REVIEWS : SEED_REVIEWS;
  const [reviews, setReviews] = useState([...loadReviews(), ...initialSeed]);

  // Load user likes/dislikes
  const [interactions, setInteractions] = useState(() => {
    const saved = localStorage.getItem("reviewInteractions");
    return saved ? JSON.parse(saved) : {};
  });

  const currentStatus = watchlist[item.id]?.status || "";

  const handleStatusChange = (e) => {
    const status = e.target.value;
    if (setWatchlist) {
      if (!status) {
        const newWatchlist = { ...watchlist };
        delete newWatchlist[item.id];
        setWatchlist(newWatchlist);
      } else {
        setWatchlist({
          ...watchlist,
          [item.id]: { status, timestamp: Date.now() }
        });
      }
    }
  };

  const handlePost = ({ rating, mood, text }) => {
    const newReview = {
      id: `dr${Date.now()}`,
      user: "You",
      avatar: "Y",
      rating,
      mood,
      text,
      date: "Just now",
      likes: 0,
      dislikes: 0,
      isUserContent: true,
    };

    const saved = localStorage.getItem("userReviews");
    const parsed = saved ? JSON.parse(saved) : {};
    const itemReviews = parsed[item.id] || [];
    parsed[item.id] = [newReview, ...itemReviews];
    localStorage.setItem("userReviews", JSON.stringify(parsed));

    setReviews([newReview, ...reviews]);
    if (onReviewAdded) onReviewAdded();
  };

  const handleInteract = (reviewId, type) => {
    const current = interactions[reviewId];
    const newInteractions = { ...interactions };
    if (current === type) {
      delete newInteractions[reviewId];
    } else {
      newInteractions[reviewId] = type;
    }
    setInteractions(newInteractions);
    localStorage.setItem("reviewInteractions", JSON.stringify(newInteractions));
  };

  return (
    <>
      {/* Backdrop + scrollable container */}
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.94)",
          backdropFilter: "blur(20px)",
          zIndex: 1500,
          overflowY: "auto",
          padding: isMobile ? "12px 12px 40px" : "24px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            animation: "slideUp 0.35s ease",
          }}
        >
          {/* ── Mobile close button ── */}
          {isMobile && (
            <button
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#141414",
                border: "1px solid #2a2a2a",
                borderRadius: 10,
                padding: "8px 14px",
                color: "#666",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "monospace",
                marginBottom: 14,
              }}
            >
              ← Back
            </button>
          )}

          {/* ── Hero section ── */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 16 : 24,
              marginBottom: isMobile ? 20 : 32,
              position: "relative",
            }}
          >
            {/* Colour glow behind poster */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 200,
                height: 300,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`,
                pointerEvents: "none",
                filter: "blur(40px)",
              }}
            />

            {/* Poster */}
            <img
              src={item.poster}
              alt={item.title}
              onError={(e) => {
                e.target.src = `https://picsum.photos/seed/${item.id}/300/450`;
              }}
              style={{
                width: isMobile ? "100%" : 180,
                height: isMobile ? "auto" : 270,
                maxHeight: isMobile ? 300 : "none",
                objectFit: "cover",
                borderRadius: 14,
                flexShrink: 0,
                boxShadow: `0 16px 60px ${cat.color}30`,
                position: "relative",
                alignSelf: isMobile ? "center" : "auto",
                maxWidth: isMobile ? 200 : "none",
              }}
            />

            {/* Metadata */}
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
              {/* Category + status badges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    background: `${cat.color}20`,
                    border: `1px solid ${cat.color}50`,
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: 10,
                    color: cat.color,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {cat.icon} {cat.label}
                </span>
                {item.status === "upcoming" && (
                  <span
                    style={{
                      background: "#FFD70020",
                      border: "1px solid #FFD70050",
                      borderRadius: 20,
                      padding: "3px 12px",
                      fontSize: 10,
                      color: "#FFD700",
                      fontFamily: "monospace",
                      fontWeight: 700,
                    }}
                  >
                    🗓 UPCOMING
                  </span>
                )}
              </div>

              <h1
                style={{
                  color: "#fff",
                  fontSize: "clamp(20px, 4vw, 30px)",
                  fontFamily: "Georgia, serif",
                  fontWeight: 900,
                  margin: "0 0 4px",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h1>
              <div
                style={{
                  color: "#555",
                  fontSize: 12,
                  fontFamily: "monospace",
                  marginBottom: 12,
                }}
              >
                {item.year} · {item.genre}
              </div>

              {/* Rating / Wait Count */}
              {item.status === "upcoming" ? (
                <div
                  style={{
                    display: "inline-block",
                    background: "#1a1a1a",
                    color: "#aaa",
                    fontSize: 13,
                    fontFamily: "monospace",
                    padding: "6px 12px",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                >
                  ⏳ {(item.votes / 1000).toFixed(0)}k Waiting
                </div>
              ) : item.rating > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <Stars val={Math.round(item.rating)} size={18} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 4,
                        marginTop: 4,
                      }}
                    >
                      <span
                        style={{
                          color: "#FFD700",
                          fontSize: 24,
                          fontWeight: 900,
                          fontFamily: "monospace",
                        }}
                      >
                        {item.rating}
                      </span>
                      <span
                        style={{
                          color: "#444",
                          fontSize: 12,
                          fontFamily: "monospace",
                        }}
                      >
                        /5 · {item.votes.toLocaleString()} ratings
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    color: "#555",
                    fontSize: 13,
                    fontFamily: "monospace",
                    marginBottom: 16,
                  }}
                >
                  Not rated yet
                </div>
              )}

              <p
                style={{
                  color: "#888",
                  fontSize: 13,
                  lineHeight: 1.75,
                  marginBottom: 20,
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {item.desc}
              </p>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => setShowTrailer(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: `linear-gradient(135deg, ${cat.color}, ${cat.color}80)`,
                    border: "none",
                    borderRadius: 10,
                    padding: isMobile ? "10px 14px" : "11px 20px",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: isMobile ? 11 : 12,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                    boxShadow: `0 4px 20px ${cat.color}40`,
                    flex: isMobile ? 1 : "none",
                  }}
                >
                  ▶ TRAILER
                </button>
                <button
                  onClick={() => setShowWriteReview(true)}
                  style={{
                    background: "#141414",
                    border: "1px solid #2a2a2a",
                    borderRadius: 10,
                    padding: isMobile ? "10px 14px" : "11px 20px",
                    color: "#ddd",
                    fontWeight: 700,
                    fontSize: isMobile ? 11 : 12,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    flex: isMobile ? 1 : "none",
                  }}
                >
                  ✍️ REVIEW
                </button>
                <select
                  value={currentStatus}
                  onChange={handleStatusChange}
                  style={{
                    background: currentStatus ? `${cat.color}15` : "#141414",
                    border: `1px solid ${currentStatus ? cat.color : "#2a2a2a"}`,
                    borderRadius: 10,
                    padding: "11px 16px",
                    color: currentStatus ? cat.color : "#666",
                    fontSize: 12,
                    fontFamily: "monospace",
                    cursor: "pointer",
                    outline: "none",
                    flex: isMobile ? "1 0 100%" : "none",
                  }}
                >
                  <option value="">+ Add to List</option>
                  <option value="watching">👀 Watching</option>
                  <option value="planned">📌 Plan to Watch</option>
                  <option value="completed">✅ Completed</option>
                  <option value="dropped">🛑 Dropped</option>
                </select>
                {!isMobile && (
                  <button
                    onClick={onClose}
                    style={{
                      background: "#141414",
                      border: "1px solid #2a2a2a",
                      borderRadius: 10,
                      padding: "11px 16px",
                      color: "#666",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "monospace",
                      marginLeft: "auto",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Community Reviews ── */}
          <div style={{ borderTop: `1px solid ${cat.color}20`, paddingTop: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                }}
              >
                {item.status === 'upcoming' ? 'Hype & Anticipation' : 'Community Reviews'}{" "}
                <span
                  style={{
                    color: "#333",
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: "monospace",
                  }}
                >
                  ({reviews.length})
                </span>
              </h3>
              <button
                onClick={() => setShowWriteReview(true)}
                style={{
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}40`,
                  borderRadius: 20,
                  padding: "6px 16px",
                  color: cat.color,
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                + ADD YOURS
              </button>
            </div>

            {reviews.slice(0, showAllReviews ? reviews.length : 6).map((r) => (
              <div
                key={r.id}
                style={{
                  background: "#090909",
                  border: "1px solid #161616",
                  borderRadius: 14,
                  padding: 18,
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${cat.color}, #A855F7)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {r.avatar}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 13,
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        {r.user}
                      </span>
                      <span
                        style={{
                          color: "#333",
                          fontSize: 10,
                          fontFamily: "monospace",
                        }}
                      >
                        {r.date}
                      </span>
                    </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          marginTop: 4,
                        }}
                      >
                        {r.rating !== null && <Stars val={r.rating} size={13} />}
                        {r.mood && (
                        <span
                          style={{
                            background: "#141414",
                            border: "1px solid #222",
                            borderRadius: 20,
                            padding: "1px 9px",
                            fontSize: 10,
                            color: "#777",
                          }}
                        >
                          {r.mood}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: "#999",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: "0 0 10px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {r.text}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <button
                    onClick={() => handleInteract(r.id, "like")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: interactions[r.id] === "like" ? cat.color : "#555",
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: 0,
                      fontFamily: "monospace",
                      fontWeight: 700,
                    }}
                  >
                    👍 {r.likes + (interactions[r.id] === "like" ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => handleInteract(r.id, "dislike")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: interactions[r.id] === "dislike" ? "#EF4444" : "#555",
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: 0,
                      fontFamily: "monospace",
                      fontWeight: 700,
                    }}
                  >
                    👎 {(r.dislikes || 0) + (interactions[r.id] === "dislike" ? 1 : 0)}
                  </button>
                </div>
              </div>
            ))}

            {reviews.length > 6 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: `1px solid ${cat.color}40`,
                  borderRadius: 14,
                  padding: "12px",
                  color: cat.color,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  cursor: "pointer",
                  marginTop: 8,
                  transition: "all 0.2s"
                }}
              >
                {showAllReviews ? "Show Less" : `See More Reviews (${reviews.length - 6})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Child modals */}
      {showTrailer && (
        <TrailerModal
          url={item.trailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
      {showWriteReview && (
        <WriteReview
          item={item}
          cat={cat}
          onClose={() => setShowWriteReview(false)}
          onPost={handlePost}
        />
      )}
    </>
  );
}
