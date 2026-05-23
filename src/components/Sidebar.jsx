import { CATEGORIES } from "../data/categories";

/**
 * Left-hand sidebar with category navigation and platform stats.
 *
 * Props:
 *   activeCat    {string}   Currently selected category ID.
 *   cat          {object}   Active category object (for accent colour).
 *   onSelectCat  {function} Called with the new category ID.
 */
export default function Sidebar({ activeCat, cat, onSelectCat }) {
  const stats = [
    ["180K+", "Reviews"],
    ["6",     "Categories"],
    ["50K+",  "Titles"],
  ];

  return (
    <aside
      style={{
        width: 200,
        flexShrink: 0,
        borderRight: "1px solid #111",
        padding: "20px 0",
        position: "sticky",
        top: 54,
        height: "calc(100vh - 54px)",
        overflowY: "auto",
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Section label */}
      <div
        style={{
          padding: "0 12px 12px",
          color: "#333",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        Categories
      </div>

      {/* Category buttons */}
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectCat(c.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 16px",
            background: activeCat === c.id ? `${c.color}12` : "transparent",
            border: "none",
            borderLeft: `3px solid ${activeCat === c.id ? c.color : "transparent"}`,
            color: activeCat === c.id ? "#fff" : "#555",
            cursor: "pointer",
            textAlign: "left",
            fontSize: 13,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            transition: "all 0.2s",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 18 }}>{c.icon}</span>
          <span>{c.label}</span>
          {activeCat === c.id && (
            <span
              style={{
                marginLeft: "auto",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: c.color,
              }}
            />
          )}
        </button>
      ))}

      {/* Platform stats */}
      <div
        style={{
          marginTop: "auto",
          padding: "12px 16px",
          borderTop: "1px solid #111",
        }}
      >
        <div
          style={{
            color: "#333",
            fontSize: 9,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Platform Stats
        </div>
        {stats.map(([num, label]) => (
          <div
            key={label}
            style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}
          >
            <span
              style={{
                color: cat.color,
                fontSize: 12,
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              {num}
            </span>
            <span style={{ color: "#444", fontSize: 10, fontFamily: "monospace" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
