import { useState } from "react";

/**
 * Poster card for a single content item in the browse grid.
 *
 * Props:
 *   item    {object}   Content item data.
 *   cat     {object}   Active category (accent colour).
 *   onClick {function} Called with the item when the card is clicked.
 */
export default function Card({ item, cat, onClick, watchlist, setWatchlist }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transform: hov ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        border: `1px solid ${hov ? cat.color + "60" : "#181818"}`,
        boxShadow: hov ? `0 24px 60px ${cat.color}20` : "none",
      }}
    >
      <div
        style={{
          aspectRatio: "2/3",
          position: "relative",
          overflow: "hidden",
          background: "#111",
        }}
      >
        {/* Poster image */}
        <img
          src={item.poster}
          alt={item.title}
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${item.id}/300/450`;
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
            display: "block",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hov
              ? `linear-gradient(to top, ${cat.color}CC 0%, rgba(0,0,0,0.5) 50%, transparent 100%)`
              : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            transition: "background 0.3s",
          }}
        />

        {/* Top badges */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {item.status === "upcoming" && (
            <span
              style={{
                background: "#FFD700",
                borderRadius: 20,
                padding: "2px 8px",
                fontSize: 9,
                color: "#000",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              UPCOMING
            </span>
          )}
          {item.rating >= 4.8 && item.status === "released" && (
            <span
              style={{
                background: cat.color,
                borderRadius: 20,
                padding: "2px 8px",
                fontSize: 9,
                color: "#fff",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              TOP RATED
            </span>
          )}
          
          {/* Quick List Status Dropdown */}
          {watchlist && setWatchlist && (hov || (watchlist[item.id] && watchlist[item.id].status)) && (
            <select
              onClick={(e) => e.stopPropagation()}
              value={watchlist[item.id]?.status || ""}
              onChange={(e) => {
                e.stopPropagation();
                const status = e.target.value;
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
              }}
              style={{
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${watchlist[item.id]?.status ? cat.color : "rgba(255,255,255,0.2)"}`,
                borderRadius: 10,
                padding: "3px 6px",
                fontSize: 10,
                color: watchlist[item.id]?.status ? cat.color : "#fff",
                fontWeight: 700,
                fontFamily: "monospace",
                cursor: "pointer",
                outline: "none",
                zIndex: 10,
                maxWidth: 100,
              }}
            >
              <option value="">+ List</option>
              <option value="watching">👀 Watching</option>
              <option value="planned">📌 Planned</option>
              <option value="completed">✅ Done</option>
              <option value="dropped">🛑 Dropped</option>
            </select>
          )}
        </div>

        {/* Rating or Waiting badge (top-right) */}
        {item.status === 'upcoming' ? (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
              padding: "3px 9px",
              fontSize: 10,
              color: "#FFF",
              fontWeight: 700,
              fontFamily: "monospace",
              zIndex: 10,
            }}
          >
            ⏳ {(item.votes / 1000).toFixed(0)}k Wait
          </div>
        ) : item.rating > 0 ? (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
              padding: "3px 9px",
              fontSize: 11,
              color: "#FFD700",
              fontWeight: 700,
              fontFamily: "monospace",
              zIndex: 10,
            }}
          >
            ★ {item.rating}
          </div>
        ) : null}

        {/* Hover play button */}
        {hov && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              ▶
            </div>
          </div>
        )}

        {/* Bottom text overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px 10px 10px",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: hov ? "rgba(255,255,255,0.9)" : cat.color,
              fontWeight: 700,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 3,
              transition: "color 0.3s",
            }}
          >
            {item.genre.split("·")[0].trim()}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "Georgia, serif",
              lineHeight: 1.3,
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
              marginTop: 2,
              fontFamily: "monospace",
            }}
          >
            {item.year}
            {item.votes > 0 ? ` · ${(item.votes / 1000).toFixed(0)}K ratings` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
