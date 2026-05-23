import { useState } from "react";
import Stars from "./Stars";
import { MOODS } from "../data/moods";

/**
 * Review submission form rendered as a modal overlay.
 *
 * Props:
 *   item    {object}   The content item being reviewed.
 *   cat     {object}   The active category (used for accent colour).
 *   onClose {function} Close the modal.
 *   onPost  {function} Called with { rating, mood, text } on successful submit.
 */
export default function WriteReview({ item, cat, onClose, onPost }) {
  const [rating, setRating] = useState(0);
  const [mood, setMood] = useState("");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const isValid = rating > 0 && text.trim().length >= 5;

  const handleSubmit = () => {
    if (!isValid) return;
    setDone(true);
    setTimeout(() => {
      onPost({ rating, mood, text });
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(16px)",
        zIndex: 1800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "#0f0f0f",
          border: `1px solid ${cat.color}30`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 480,
          padding: 28,
          animation: "slideUp 0.3s ease",
        }}
      >
        {done ? (
          /* ── Success state ── */
          <div style={{ textAlign: "center", padding: "36px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
            <div
              style={{
                color: "#fff",
                fontSize: 18,
                fontFamily: "Georgia, serif",
                fontWeight: 700,
              }}
            >
              Review Posted!
            </div>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{
                    color: cat.color,
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                  }}
                >
                  {cat.icon} Rate &amp; Review
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    marginTop: 4,
                    maxWidth: 320,
                  }}
                >
                  {item.title}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  color: "#666",
                  borderRadius: 8,
                  padding: "5px 11px",
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                ✕
              </button>
            </div>

            {/* Star rating */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  color: "#555",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: 8,
                }}
              >
                Your Rating
              </div>
              <Stars val={rating} onChange={setRating} size={32} />
              {rating > 0 && (
                <div
                  style={{
                    color: "#FFD700",
                    fontSize: 11,
                    marginTop: 6,
                    fontFamily: "monospace",
                  }}
                >
                  {["", "😩 Poor", "😕 Fair", "😐 OK", "😊 Good", "🤩 Amazing"][rating]}
                </div>
              )}
            </div>

            {/* Mood tags */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  color: "#555",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: 8,
                }}
              >
                Your Mood
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m === mood ? "" : m)}
                    style={{
                      background: mood === m ? `${cat.color}20` : "#141414",
                      border: `1px solid ${mood === m ? cat.color : "#242424"}`,
                      borderRadius: 20,
                      padding: "5px 12px",
                      color: mood === m ? cat.color : "#666",
                      fontSize: 11,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Text area */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  color: "#555",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: 8,
                }}
              >
                Your Review
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you think? Be honest..."
                rows={4}
                maxLength={1000}
                style={{
                  width: "100%",
                  background: "#080808",
                  border: "1px solid #222",
                  borderRadius: 10,
                  padding: 14,
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "Georgia, serif",
                  resize: "none",
                  outline: "none",
                  lineHeight: 1.7,
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = cat.color)}
                onBlur={(e) => (e.target.style.borderColor = "#222")}
              />
              <div
                style={{
                  color: "#333",
                  fontSize: 10,
                  textAlign: "right",
                  marginTop: 4,
                  fontFamily: "monospace",
                }}
              >
                {text.length}/1000
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              style={{
                width: "100%",
                padding: "13px",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                border: "none",
                borderRadius: 12,
                cursor: isValid ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                background: isValid
                  ? `linear-gradient(135deg, ${cat.color}, ${cat.color}80)`
                  : "#141414",
                color: isValid ? "#fff" : "#333",
              }}
            >
              POST REVIEW →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
