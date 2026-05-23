import { DATA } from "../data/content";
import Card from "./Card";
import { useIsMobile } from "../hooks/useIsMobile";

export default function TrackerDashboard({ watchlist, setWatchlist, onSelectItem }) {
  const isMobile = useIsMobile();

  // Helper to find full item details from ID across all categories
  const findItemById = (id) => {
    for (const category in DATA) {
      const item = DATA[category].find((i) => i.id === id);
      if (item) return { item, category };
    }
    return null;
  };

  // Group items by status
  const grouped = {
    completed: [],
    watching: [],
    planned: [],
    dropped: []
  };

  Object.entries(watchlist).forEach(([id, entry]) => {
    const found = findItemById(id);
    if (found && entry.status && grouped[entry.status]) {
      grouped[entry.status].push({ ...found, addedAt: entry.timestamp });
    }
  });

  // Sort each group by recently added
  Object.keys(grouped).forEach((status) => {
    grouped[status].sort((a, b) => b.addedAt - a.addedAt);
  });

  const statuses = [
    { id: "watching", label: "Currently Watching", color: "#3B82F6", emoji: "👀" },
    { id: "planned", label: "Plan to Watch", color: "#FCD34D", emoji: "📌" },
    { id: "completed", label: "Completed", color: "#10B981", emoji: "✅" },
    { id: "dropped", label: "Dropped", color: "#EF4444", emoji: "🛑" }
  ];

  const totalTracked = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  if (totalTracked === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>📝</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#2a2a2a" }}>
          Your checklist is empty
        </div>
        <div style={{ fontSize: 11, marginTop: 6, fontFamily: "monospace", color: "#555" }}>
          Select a title and change its status to add it to your list.
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Overview Stats */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 32,
          overflowX: "auto",
          paddingBottom: 8,
          scrollbarWidth: "none",
        }}
      >
        {statuses.map((s) => (
          <div
            key={s.id}
            style={{
              background: "#111",
              border: `1px solid ${s.color}30`,
              borderRadius: 12,
              padding: "16px 20px",
              minWidth: 140,
              flex: "1 0 auto"
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>
              {grouped[s.id].length}
            </div>
            <div style={{ color: s.color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {statuses.map((s) => {
        const items = grouped[s.id];
        if (items.length === 0) return null;

        return (
          <div key={s.id} style={{ marginBottom: 40 }}>
            <h2 style={{ 
              color: s.color, 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              {s.emoji} {s.label} <span style={{ opacity: 0.5, fontSize: 14 }}>({items.length})</span>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(auto-fill, minmax(148px, 1fr))",
                gap: isMobile ? 10 : 14,
              }}
            >
              {items.map((wrapper) => (
                <Card
                  key={wrapper.item.id}
                  item={wrapper.item}
                  cat={{ id: wrapper.category, color: s.color }} // Fallback cat object
                  onClick={(i) => onSelectItem(i, wrapper.category)}
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
