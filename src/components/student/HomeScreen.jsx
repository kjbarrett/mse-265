import { LEADERBOARD, UPCOMING_GAMES } from "../../data/index.js";
import { CARDINAL, CARDINAL_DARK, CARDINAL_LIGHT } from "../../styles/tokens.js";

export function HomeScreen({ tweaks, onCheckIn }) {
  const {
    dormName,
    dormRank,
    totalPoints,
    currentStreak,
    gamesAttended,
  } = tweaks;
  const nextGame = UPCOMING_GAMES[0];

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        paddingBottom: 90,
        background: "#FAFAFA",
      }}
    >
      <div
        style={{
          background: CARDINAL,
          paddingTop: 58,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: -0.5,
                }}
              >
                The Cardinal
              </span>
              <span style={{ fontSize: 16 }}>🌲</span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 12,
                marginTop: 1,
              }}
            >
              Spring 2026
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.25)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {dormName}
            </p>
            <p style={{ color: "#FFD700", fontSize: 20, fontWeight: 900 }}>
              Rank #{dormRank}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {[
            {
              label: "My Points",
              value: totalPoints.toLocaleString(),
              color: "#FFD700",
            },
            { label: "Streak", value: `${currentStreak}🔥` },
            { label: "Games", value: gamesAttended },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.13)",
                borderRadius: 11,
                padding: "9px 8px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <p
                style={{
                  color: s.color || "#fff",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  fontWeight: 600,
                  marginTop: 1,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 12px 0" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#AAA",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          Next Game
        </p>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: `0 2px 16px ${CARDINAL}22`,
            border: `1.5px solid ${CARDINAL}33`,
          }}
        >
          <div
            style={{
              height: 4,
              background: `linear-gradient(90deg, ${CARDINAL}, #E85555)`,
            }}
          />
          <div style={{ padding: "14px 16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>{nextGame.icon}</span>
                <div>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1A1A1A",
                    }}
                  >
                    {nextGame.sport}
                  </p>
                  <p style={{ fontSize: 13, color: "#666" }}>{nextGame.opponent}</p>
                </div>
              </div>
              <div
                style={{
                  background: CARDINAL_LIGHT,
                  borderRadius: 10,
                  padding: "6px 12px",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: CARDINAL,
                  }}
                >
                  +{nextGame.points} pts
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="4" width="18" height="18" rx="3" stroke="#BBB" strokeWidth="2" />
                  <path d="M3 9h18" stroke="#BBB" strokeWidth="2" />
                  <path
                    d="M8 2v4M16 2v4"
                    stroke="#BBB"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ fontSize: 12, color: "#888" }}>{nextGame.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="#BBB" strokeWidth="2" />
                  <path
                    d="M12 7v5l3 3"
                    stroke="#BBB"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ fontSize: 12, color: "#888" }}>{nextGame.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="12" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="#BBB"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="9" r="2.5" stroke="#BBB" strokeWidth="2" />
                </svg>
                <span style={{ fontSize: 12, color: "#888" }}>{nextGame.venue}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onCheckIn}
              style={{
                width: "100%",
                padding: "13px",
                background: `linear-gradient(135deg, ${CARDINAL}, ${CARDINAL_DARK})`,
                color: "#fff",
                borderRadius: 12,
                border: "none",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 4px 12px ${CARDINAL}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 11l3 3L22 4"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              Check In to This Game
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 12px 0" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#AAA",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          Dorm Standing
        </p>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          }}
        >
          {LEADERBOARD.slice(0, 4).map((dorm, i) => {
            const isYours = dorm.dorm === dormName;
            const rankColor =
              i === 0
                ? "#FFD700"
                : i === 1
                  ? "#C0C0C0"
                  : i === 2
                    ? "#CD7F32"
                    : "#CCC";
            return (
              <div
                key={dorm.dorm}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderBottom: i < 3 ? "1px solid #F5F5F5" : "none",
                  background: isYours ? CARDINAL_LIGHT : "#fff",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: rankColor,
                    width: 20,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: isYours ? 700 : 400,
                    color: isYours ? CARDINAL : "#1A1A1A",
                    marginLeft: 10,
                  }}
                >
                  {dorm.dorm}
                </span>
                {dorm.change === "up" && (
                  <span style={{ fontSize: 11, color: "#22C55E", marginRight: 8 }}>
                    ▲
                  </span>
                )}
                {dorm.change === "down" && (
                  <span style={{ fontSize: 11, color: "#EF4444", marginRight: 8 }}>
                    ▼
                  </span>
                )}
                {dorm.change === "same" && (
                  <span style={{ fontSize: 11, color: "#BBB", marginRight: 8 }}>
                    —
                  </span>
                )}
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>
                  {dorm.points.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
