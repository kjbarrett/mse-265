import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";

export function LeaderboardRow({ dorm, isLast }) {
  const rankColor =
    dorm.rank === 1
      ? "#FFD700"
      : dorm.rank === 2
        ? "#C0C0C0"
        : dorm.rank === 3
          ? "#CD7F32"
          : "#CCC";
  const rankBg = dorm.rank <= 3 ? rankColor + "22" : "#F5F5F5";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: isLast ? "none" : "1px solid #F5F5F5",
        background: dorm.isYours ? CARDINAL_LIGHT : "#fff",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: rankBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: dorm.rank <= 3 ? rankColor : "#BBB",
          }}
        >
          {dorm.rank}
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: dorm.isYours ? 700 : 500,
              color: dorm.isYours ? CARDINAL : "#1A1A1A",
            }}
          >
            {dorm.dorm}
          </span>
          {dorm.isYours && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: CARDINAL,
                background: CARDINAL_LIGHT,
                border: `1px solid ${CARDINAL}33`,
                borderRadius: 6,
                padding: "1px 5px",
                textTransform: "uppercase",
                letterSpacing: 0.3,
              }}
            >
              You
            </span>
          )}
        </div>
        <span style={{ fontSize: 12, color: "#AAA", fontWeight: 400 }}>
          {dorm.games} games attended
        </span>
      </div>

      <div style={{ marginRight: 10 }}>
        {dorm.change === "up" && (
          <span style={{ fontSize: 12, color: "#22C55E" }}>▲</span>
        )}
        {dorm.change === "down" && (
          <span style={{ fontSize: 12, color: "#EF4444" }}>▼</span>
        )}
        {dorm.change === "same" && (
          <span style={{ fontSize: 12, color: "#BBB" }}>—</span>
        )}
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>
          {dorm.points.toLocaleString()}
        </div>
        <div style={{ fontSize: 11, color: "#BBB", fontWeight: 400 }}>pts</div>
      </div>
    </div>
  );
}
