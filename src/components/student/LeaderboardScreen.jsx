import { LEADERBOARD } from "../../data/index.js";
import { CARDINAL } from "../../styles/tokens.js";
import { applyUserDormRank } from "../../utils/leaderboard.js";
import { LeaderboardRow } from "./LeaderboardRow.jsx";

const SEASON_STATS = [
  { label: "Dorms", value: "8" },
  { label: "Total Games", value: "41" },
  { label: "Season", value: "Spring" },
];

export function LeaderboardScreen({ tweaks }) {
  const { dormName, dormRank } = tweaks;
  const boards = applyUserDormRank(LEADERBOARD, dormName, dormRank);

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
          paddingTop: 16,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            The Cardinal
          </span>
          <span style={{ fontSize: 18 }}>🌲</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
          Spring 2026 Season
        </p>
        <div
          style={{
            marginTop: 14,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Your Dorm
            </p>
            <p style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
              {dormName}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Current Rank
            </p>
            <p style={{ color: "#FFD700", fontSize: 22, fontWeight: 800 }}>
              #{dormRank}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          background: "#fff",
          borderBottom: "1px solid #F0F0F0",
          padding: "12px 0",
        }}
      >
        {SEASON_STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: i < SEASON_STATS.length - 1 ? "1px solid #F0F0F0" : "none",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1A1A" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 1 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "14px 20px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Dorm Rankings
        </span>
        <span style={{ fontSize: 12, color: "#BBB" }}>By points</span>
      </div>

      <div
        style={{
          background: "#fff",
          margin: "0 12px",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
        }}
      >
        {boards.map((dorm, i) => (
          <LeaderboardRow
            key={dorm.dorm}
            dorm={dorm}
            isLast={i === boards.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
