import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function AuthModal({ onClose, onLogin, defaultMode = "login" }) {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState(defaultMode); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (onLogin) onLogin(email);
    onClose();
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid #222",
          borderRadius: 24,
          padding: isMobile ? 24 : 40,
          width: "100%",
          maxWidth: 400,
          position: "relative",
          animation: "slideUp 0.3s ease",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "none",
            color: "#666",
            fontSize: 20,
            cursor: "pointer",
            lineHeight: 1,
            padding: 4,
          }}
        >
          ✕
        </button>

        <h2
          style={{
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            margin: "0 0 8px",
            fontWeight: 800,
          }}
        >
          {mode === "login" ? "Welcome Back" : "Join Mosaic"}
        </h2>
        <p style={{ color: "#777", fontSize: 13, marginBottom: 32, fontFamily: "monospace" }}>
          {mode === "login" 
            ? "Sign in to access your tracking list and rewards." 
            : "Create an account to track shows and earn points."}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: 12,
              padding: "14px 16px",
              color: "#fff",
              fontSize: 14,
              fontFamily: "monospace",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: 12,
              padding: "14px 16px",
              color: "#fff",
              fontSize: 14,
              fontFamily: "monospace",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#fff",
              color: "#000",
              border: "none",
              borderRadius: 12,
              padding: "14px",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "monospace",
              marginTop: 8,
              letterSpacing: "0.05em",
            }}
          >
            {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <span style={{ color: "#666", fontSize: 12, fontFamily: "monospace" }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "monospace",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
            }}
          >
            {mode === "login" ? "Join now" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
