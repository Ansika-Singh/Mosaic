/**
 * Full-screen YouTube embed modal.
 *
 * Props:
 *   url     {string}   Full YouTube URL.
 *   onClose {function} Callback to close the modal.
 */
export default function TrailerModal({ url, onClose }) {
  const safeUrl = url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const videoId =
    safeUrl.split("v=")[1]?.split("&")[0] || safeUrl.split("/").pop();

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 860, position: "relative" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: -44,
            right: 0,
            background: "transparent",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "6px 14px",
            color: "#aaa",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "monospace",
          }}
        >
          ✕ CLOSE
        </button>

        <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: "none", display: "block" }}
            title="Trailer"
          />
        </div>
      </div>
    </div>
  );
}
