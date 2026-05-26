import { CARDINAL } from "../../styles/tokens.js";

export function BadgeCard({ badge }) {
  return (
    <div
      style={{
        background: badge.earned ? "#fff" : "#F8F8F8",
        borderRadius: 14,
        padding: "12px 8px",
        textAlign: "center",
        boxShadow: badge.earned ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
        border: badge.earned
          ? `1.5px solid ${CARDINAL}22`
          : "1.5px solid #EFEFEF",
        opacity: badge.earned ? 1 : 0.55,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {badge.earned && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${CARDINAL}, #E85555)`,
          }}
        />
      )}
      <div
        style={{
          fontSize: 26,
          marginBottom: 4,
          filter: badge.earned ? "none" : "grayscale(1)",
        }}
      >
        {badge.emoji}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: badge.earned ? "#1A1A1A" : "#999",
          lineHeight: "14px",
        }}
      >
        {badge.name}
      </div>
      {!badge.earned && (
        <div style={{ fontSize: 10, color: "#BBB", marginTop: 2 }}>
          🔒 Locked
        </div>
      )}
    </div>
  );
}
