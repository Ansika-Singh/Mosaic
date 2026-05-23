import { useState, useEffect } from "react";
import { CATEGORIES, SORT_OPTIONS } from "./data/categories";
import { DATA } from "./data/content";
import { sortItems } from "./utils/sortItems";
import { useIsMobile } from "./hooks/useIsMobile";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CategoryBar from "./components/CategoryBar";
import Card from "./components/Card";
import DetailModal from "./components/DetailModal";
import RewardsModal from "./components/RewardsModal";
import TrackerDashboard from "./components/TrackerDashboard";
import AuthModal from "./components/AuthModal";

/**
 * Root application component.
 * Owns all top-level state and wires together the layout.
 * Switches between sidebar (desktop) and category bar (mobile).
 */
export default function App() {
  const [activeCat, setActiveCat] = useState("movies");
  const [sort, setSort] = useState("trending");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  
  // Persistence state
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem("points");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : {};
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || null;
  });

  const [showRewards, setShowRewards] = useState(false);
  const [authMode, setAuthMode] = useState(null); // "login" or "register"

  useEffect(() => {
    localStorage.setItem("points", points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const isMobile = useIsMobile();

  const cat = CATEGORIES.find((c) => c.id === activeCat);
  const raw = DATA[activeCat] || [];
  const sorted = sortItems(raw, sort);
  let displayed = [];
  if (search) {
    const s = search.toLowerCase();
    displayed = Object.keys(DATA).flatMap(catId => 
      DATA[catId]
        .filter(i => 
          i.title.toLowerCase().includes(s) || 
          (i.desc && i.desc.toLowerCase().includes(s)) ||
          (i.poster && i.poster.toLowerCase().includes(s))
        )
        .map(i => ({ ...i, originalCatId: catId }))
    );
  } else {
    displayed = sorted;
  }

  const handleSelectCat = (id) => {
    setActiveCat(id);
    setSort("trending");
    setSearch("");
    setSearchVal("");
  };

  return (
    <>
      {/* ── Top navigation bar ── */}
      <Navbar
        cat={cat}
        activeCat={activeCat}
        searchVal={searchVal}
        search={search}
        onSearch={setSearch}
        onSearchVal={setSearchVal}
        onLogoClick={() => handleSelectCat("movies")}
        points={points}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        onOpenRewards={() => setShowRewards(true)}
        onOpenAuth={(mode) => setAuthMode(mode)}
      />

      {/* ── Mobile: horizontal category scroll bar ── */}
      {isMobile && (
        <CategoryBar activeCat={activeCat} onSelectCat={handleSelectCat} />
      )}

      {/* ── Body: sidebar (desktop) + main content ── */}
      <div style={{ display: "flex", minHeight: isMobile ? "auto" : "calc(100vh - 54px)" }}>

        {/* Desktop sidebar */}
        {!isMobile && (
          <Sidebar activeCat={activeCat} cat={cat} onSelectCat={handleSelectCat} />
        )}

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: isMobile ? "16px 12px" : "24px 20px",
            minWidth: 0,
            animation: "fadeIn 0.4s ease",
          }}
        >
          {activeCat === "tracker" ? (
            <TrackerDashboard 
              watchlist={watchlist} 
              setWatchlist={setWatchlist}
              onSelectItem={(i, c) => {
                const categoryObj = CATEGORIES.find(cat => cat.id === c);
                setSelected({ item: i, cat: categoryObj || CATEGORIES[0] });
              }} 
            />
          ) : (
            <>
              {/* Section header */}
              <div style={{ marginBottom: isMobile ? 14 : 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <h1
                style={{
                  fontSize: isMobile ? 18 : 22,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                {cat.icon} {cat.label}
              </h1>
              {search && (
                <span style={{ color: "#555", fontSize: 12, fontFamily: "monospace" }}>
                  — results for &ldquo;{search}&rdquo;
                </span>
              )}
            </div>
            <div style={{ color: "#444", fontSize: 11, fontFamily: "monospace" }}>
              {displayed.length} titles {search ? "found" : "available"}
            </div>
          </div>

          {/* Sort tabs */}
          {!search && (
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: isMobile ? 16 : 24,
                overflowX: "auto",
                paddingBottom: 4,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  style={{
                    background: sort === s.id ? `${cat.color}20` : "#0e0e0e",
                    border: `1px solid ${sort === s.id ? cat.color : "#1c1c1c"}`,
                    borderRadius: 50,
                    padding: isMobile ? "6px 12px" : "7px 16px",
                    color: sort === s.id ? cat.color : "#555",
                    fontSize: isMobile ? 10 : 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Upcoming empty state */}
          {sort === "upcoming" && displayed.length === 0 && (
            <div
              style={{
                background: "#FFD70010",
                border: "1px solid #FFD70030",
                borderRadius: 14,
                padding: 24,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗓</div>
              <div
                style={{
                  color: "#FFD700",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                No upcoming titles yet in this category
              </div>
              <div
                style={{ color: "#555", fontSize: 12, marginTop: 6, fontFamily: "monospace" }}
              >
                Check back soon — new releases are added regularly
              </div>
            </div>
          )}

          {/* Card grid — 2 columns on mobile, auto-fill on desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(auto-fill, minmax(148px, 1fr))",
              gap: isMobile ? 10 : 14,
            }}
          >
            {displayed.map((item) => {
              const itemCat = search ? CATEGORIES.find(c => c.id === item.originalCatId) : cat;
              return (
                <Card
                  key={item.id}
                  item={item}
                  cat={itemCat}
                  onClick={(i) => setSelected({ item: i, cat: itemCat })}
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                />
              );
            })}
          </div>

              {/* No search results */}
              {search && displayed.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      color: "#2a2a2a",
                    }}
                  >
                    Nothing found for &ldquo;{search}&rdquo;
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6, fontFamily: "monospace" }}>
                    Try searching in a different category
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── Detail modal ── */}
      {selected && (
        <DetailModal
          item={selected.item}
          cat={selected.cat}
          onClose={() => setSelected(null)}
          onReviewAdded={() => setPoints(p => p + 2)}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        />
      )}

      {/* ── Rewards modal ── */}
      {showRewards && (
        <RewardsModal
          points={points}
          setPoints={setPoints}
          onClose={() => setShowRewards(false)}
        />
      )}

      {/* ── Auth modal ── */}
      {authMode && (
        <AuthModal
          defaultMode={authMode}
          onLogin={(email) => setCurrentUser(email)}
          onClose={() => setAuthMode(null)}
        />
      )}
    </>
  );
}
