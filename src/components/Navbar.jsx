import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

/**
 * Sticky top navigation bar — responsive for mobile and desktop.
 *
 * Props:
 *   cat         {object}   Active category object (for accent colour).
 *   activeCat   {string}   ID of the active category.
 *   searchVal   {string}   Controlled value of the search input.
 *   search      {string}   Committed search term.
 *   onSearch    {function} Called with the new committed search string.
 *   onSearchVal {function} Called on every keystroke to update searchVal.
 *   onLogoClick {function} Resets the page to browse.
 */
export default function Navbar({
  cat,
  activeCat,
  searchVal,
  search,
  onSearch,
  onSearchVal,
  onLogoClick,
  points,
  currentUser,
  onLogout,
  onOpenRewards,
  onOpenAuth,
}) {
  const isMobile = useIsMobile();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const catColors = [
    "#E50914", "#FF6B35", "#EC4899",
    "#3B82F6", "#10B981", "#A855F7",
    "#E50914", "#FF6B35", "#EC4899",
  ];
  const catIds = [
    "movies", "anime", "kdrama",
    "series", "books", "music",
    "movies", "anime", "kdrama",
  ];

  const handleClearSearch = () => {
    onSearch("");
    onSearchVal("");
    setMobileSearchOpen(false);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 800,
        background: "rgba(5,5,5,0.97)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid #111",
        padding: isMobile ? "0 14px" : "0 20px",
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      {/* ── Logo ── */}
      {(!isMobile || !mobileSearchOpen) && (
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}
          onClick={onLogoClick}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              width: 22,
              height: 22,
              borderRadius: 5,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {catColors.map((c, i) => (
              <div
                key={i}
                style={{
                  background: c,
                  borderRadius: 1,
                  opacity: activeCat === catIds[i] ? 1 : 0.5,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: isMobile ? 16 : 18,
              fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
              color: "#ffffff",
            }}
          >
            Mosaic
          </span>
        </div>
      )}

      {/* ── Search bar (desktop always visible / mobile toggled) ── */}
      {(!isMobile || mobileSearchOpen) && (
        <div
          style={{
            flex: 1,
            maxWidth: isMobile ? "100%" : 380,
            margin: isMobile ? "0" : "0 16px",
            position: "relative",
          }}
        >
          <input
            autoFocus={isMobile && mobileSearchOpen}
            value={searchVal}
            onChange={(e) => onSearchVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(searchVal);
              if (e.key === "Escape") handleClearSearch();
            }}
            placeholder={`Search ${cat.label}...`}
            style={{
              width: "100%",
              padding: "8px 16px 8px 36px",
              background: "#0f0f0f",
              border: "1px solid #1c1c1c",
              borderRadius: 50,
              color: "#fff",
              fontSize: 12,
              outline: "none",
              fontFamily: "monospace",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = cat.color)}
            onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
          />
          <span
            onClick={() => onSearch(searchVal)}
            style={{
              position: "absolute",
              left: 13,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 13,
              opacity: 0.4,
              cursor: "pointer",
            }}
          >
            🔍
          </span>
          {(search || searchVal) && (
            <button
              onClick={handleClearSearch}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: cat.color,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* ── Right side controls ── */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
        {/* Mobile: search toggle icon */}
        {isMobile && !mobileSearchOpen && (
          <button
            onClick={() => setMobileSearchOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#888",
              fontSize: 18,
              cursor: "pointer",
              padding: "4px 6px",
              lineHeight: 1,
            }}
          >
            🔍
          </button>
        )}

        {/* Mobile: close search */}
        {isMobile && mobileSearchOpen && (
          <button
            onClick={handleClearSearch}
            style={{
              background: "transparent",
              border: "none",
              color: "#888",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "monospace",
              padding: "4px 8px",
              flexShrink: 0,
            }}
          >
            Cancel
          </button>
        )}

        {/* Desktop only: auth buttons and rewards */}
        {!isMobile && (
          <>
            <button
              onClick={onOpenRewards}
              style={{
                background: "linear-gradient(135deg, #FFD70020, #FFD70010)",
                border: "1px solid #FFD70040",
                borderRadius: 20,
                padding: "6px 12px",
                color: "#FFD700",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "monospace",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginRight: 6,
                transition: "all 0.2s"
              }}
            >
              <span style={{ fontSize: 13 }}>🏆</span> {points} pts
            </button>
            {currentUser ? (
              <>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    marginRight: 8,
                    background: "#1a1a1a",
                    padding: "6px 12px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <span style={{color: cat.color}}>👤</span>
                  {currentUser.split('@')[0]}
                </div>
                <button
                  onClick={onLogout}
                  style={{
                    background: "transparent",
                    border: "1px solid #333",
                    borderRadius: 20,
                    padding: "5px 12px",
                    color: "#777",
                    fontSize: 10,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => onOpenAuth("login")}
                style={{
                  background: `linear-gradient(135deg, ${cat.color}, ${cat.color}80)`,
                  border: "none",
                  borderRadius: 20,
                  padding: "7px 16px",
                  color: "#fff",
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                SIGN IN
              </button>
            )}
          </>
        )}

        {/* Mobile: compact join button and rewards */}
        {isMobile && !mobileSearchOpen && (
          <>
            <button
              onClick={onOpenRewards}
              style={{
                background: "linear-gradient(135deg, #FFD70020, #FFD70010)",
                border: "1px solid #FFD70040",
                borderRadius: 20,
                padding: "5px 8px",
                color: "#FFD700",
                fontSize: 10,
                cursor: "pointer",
                fontFamily: "monospace",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginRight: 2,
              }}
            >
              🏆 {points}
            </button>
            {currentUser ? (
              <button
                onClick={onLogout}
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: 20,
                  padding: "4px 8px",
                  color: "#777",
                  fontSize: 10,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                LOG OUT
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth("login")}
                style={{
                  background: `linear-gradient(135deg, ${cat.color}, ${cat.color}80)`,
                  border: "none",
                  borderRadius: 20,
                  padding: "6px 12px",
                  color: "#fff",
                  fontSize: 10,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                SIGN IN
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
