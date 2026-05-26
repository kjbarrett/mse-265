import { RA_GAME_BREAKDOWN, RA_RESIDENTS } from "../../data/index.js";
import { CARDINAL } from "../../styles/tokens.js";
import { avgPoints } from "../../utils/progress.js";

function attendanceBarColor(pct) {
  if (pct >= 0.75) return "#22C55E";
  if (pct >= 0.5) return "#F59E0B";
  return CARDINAL;
}

export function RADormDashboard({ tweaks }) {
  const { dormName, dormRank } = tweaks;
  const totalPts = RA_RESIDENTS.reduce((s, r) => s + r.pts, 0);
  const avgPts = avgPoints(RA_RESIDENTS);
  const totalCheckins = RA_GAME_BREAKDOWN.reduce(
    (s, g) => s + g.checkins,
    0,
  );

  const summaryStats = [
    { label: "Residents", value: RA_RESIDENTS.length },
    { label: "Avg Points", value: avgPts.toLocaleString() },
    { label: "Total Check-ins", value: totalCheckins },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${CARDINAL} 0%, #6B1010 100%)`,
          borderRadius: 18,
          padding: "18px 18px",
          marginBottom: 14,
          boxShadow: `0 6px 24px ${CARDINAL}44`,
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          {dormName} · Spring 2026
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <div>
            <p
              style={{
                color: "#FFD700",
                fontSize: 42,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              #{dormRank}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              Dorm rank
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#fff", fontSize: 26, fontWeight: 800 }}>
              {totalPts.toLocaleString()}
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
              total points
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {summaryStats.map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 13,
              padding: "11px 8px",
              textAlign: "center",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1A1A" }}>
              {s.value}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#AAA",
                marginTop: 2,
                lineHeight: "13px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: 12,
          color: "#AAA",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        Game-by-Game Attendance
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {RA_GAME_BREAKDOWN.map((g, i) => {
          const pct = g.checkins / g.total;
          const barColor = attendanceBarColor(pct);
          return (
            <div
              key={`${g.sport}-${g.date}-${i}`}
              style={{
                background: "#fff",
                borderRadius: 13,
                padding: "11px 14px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 7,
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{g.icon}</span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1A1A1A",
                    }}
                  >
                    {g.sport}{" "}
                    <span style={{ color: "#888", fontWeight: 400 }}>
                      {g.opponent}
                    </span>
                  </p>
                  <p style={{ fontSize: 11, color: "#BBB" }}>{g.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: barColor,
                    }}
                  >
                    {g.checkins}
                  </span>
                  <span style={{ fontSize: 12, color: "#BBB" }}>
                    /{g.total}
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: 6,
                  background: "#F0F0F0",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    width: `${pct * 100}%`,
                    background: barColor,
                    transition: "width 0.5s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
