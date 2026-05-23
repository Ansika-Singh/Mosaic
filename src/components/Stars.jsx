import { useState } from "react";

/**
 * Star rating display / interactive picker.
 *
 * Props:
 *   val      {number}   Current rating value (1–5).
 *   onChange {function} If provided the stars become interactive.
 *   size     {number}   Font-size in px for each star (default 20).
 */
export default function Stars({ val, onChange, size = 20 }) {
  const [hov, setHov] = useState(0);

  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => onChange && setHov(s)}
          onMouseLeave={() => onChange && setHov(0)}
          style={{
            fontSize: size,
            cursor: onChange ? "pointer" : "default",
            lineHeight: 1,
            display: "inline-block",
            color: s <= (hov || val) ? "#FFD700" : "#2a2a2a",
            transition: "all 0.1s",
            transform: hov === s ? "scale(1.3)" : "scale(1)",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
