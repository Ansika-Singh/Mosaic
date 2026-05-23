import { useRef } from "react";
import { CATEGORIES } from "../data/categories";

/**
 * Horizontal scrollable category tab bar — shown on mobile instead of the sidebar.
 *
 * Props:
 *   activeCat   {string}   Currently active category ID.
 *   onSelectCat {function} Called with the new category ID.
 */
export default function CategoryBar({ activeCat, onSelectCat }) {
  const scrollRef = useRef(null);

  return (
    <div
      style={{
        position: "sticky",
        top: 54,
        zIndex: 700,
        background: "rgba(5,5,5,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #111",
        padding: "0 12px",
      }}
    >
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "10px 0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {CATEGORIES.map((c) => {
          const active = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCat(c.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                padding: "8px 16px",
                borderRadius: 50,
                border: `1px solid ${active ? c.color : "#222"}`,
                background: active ? `${c.color}18` : "#0e0e0e",
                color: active ? c.color : "#666",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "monospace",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
