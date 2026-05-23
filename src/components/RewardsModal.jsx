import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const VOUCHERS = [
  { id: "v1", title: "1 Month Netflix Free", pts: 500, icon: "📺", color: "#E50914" },
  { id: "v2", title: "50% Off Movie Tickets", pts: 300, icon: "🍿", color: "#F59E0B" },
  { id: "v3", title: "$10 Amazon Gift Card", pts: 800, icon: "🎁", color: "#3B82F6" },
  { id: "v4", title: "Free Coffee Voucher", pts: 150, icon: "☕", color: "#10B981" }
];

export default function RewardsModal({ points, setPoints, onClose }) {
  const isMobile = useIsMobile();
  const [msg, setMsg] = useState(null);

  const handleRedeem = (v) => {
    if (points >= v.pts) {
      setPoints(p => p - v.pts);
      setMsg({ type: "success", text: `Redeemed ${v.title}! Check your email for details.` });
    } else {
      setMsg({ type: "error", text: `Not enough points. Keep reviewing to earn more!` });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(16px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "#0f0f0f",
          border: `1px solid #333`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 500,
          padding: isMobile ? 20 : 28,
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 22 }}>
            Rewards Center
          </h2>
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

        <div style={{ 
          background: "linear-gradient(135deg, #FFD70020, #FFD70010)", 
          border: "1px solid #FFD70040",
          borderRadius: 14, 
          padding: 20, 
          textAlign: "center",
          marginBottom: 24 
        }}>
          <div style={{ fontSize: 12, color: "#FFD700", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 4 }}>
            YOUR BALANCE
          </div>
          <div style={{ fontSize: 36, color: "#fff", fontWeight: 900, fontFamily: "monospace" }}>
            🏆 {points} <span style={{ fontSize: 16, color: "#aaa" }}>pts</span>
          </div>
          <div style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
            Earn +50 pts for every review you post!
          </div>
        </div>

        {msg && (
          <div style={{
            background: msg.type === "success" ? "#10B98120" : "#E5091420",
            border: `1px solid ${msg.type === "success" ? "#10B98150" : "#E5091450"}`,
            color: msg.type === "success" ? "#10B981" : "#E50914",
            padding: "10px 14px",
            borderRadius: 10,
            marginBottom: 16,
            fontSize: 13,
            textAlign: "center",
            fontFamily: "monospace"
          }}>
            {msg.text}
          </div>
        )}

        <div style={{ display: "grid", gap: 12 }}>
          {VOUCHERS.map(v => (
            <div key={v.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 12,
              padding: 14,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: `${v.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                }}>
                  {v.icon}
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "Georgia, serif" }}>
                    {v.title}
                  </div>
                  <div style={{ color: v.color, fontSize: 12, fontFamily: "monospace", marginTop: 2 }}>
                    {v.pts} pts
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleRedeem(v)}
                style={{
                  background: points >= v.pts ? `${v.color}20` : "#1a1a1a",
                  border: `1px solid ${points >= v.pts ? v.color : "#333"}`,
                  color: points >= v.pts ? v.color : "#555",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                REDEEM
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
