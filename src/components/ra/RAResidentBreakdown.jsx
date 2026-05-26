import { PRIZE_THRESHOLD, RA_NUDGE_ZONE } from "../../data/constants.js";
import { RA_RESIDENTS } from "../../data/index.js";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { sortResidentsByPoints } from "../../utils/reminders.js";

export function RAResidentBreakdown() {
  const sorted = sortResidentsByPoints(RA_RESIDENTS);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <div
        style={{
          background: CARDINAL_LIGHT,
          borderRadius: 13,
          padding: "11px 14px",
          border: `1px solid ${CARDINAL}22`,
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: CARDINAL,
            flexShrink: 0,
          }}
        />
        <p
          style={{
            fontSize: 12,
            color: CARDINAL,
            fontWeight: 600,
            lineHeight: "16px",
          }}
        >
          Flagged residents are within {RA_NUDGE_ZONE} pts of the{" "}
          {PRIZE_THRESHOLD.toLocaleString()}-pt individual prize — a nudge could
          push them over.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "#EEE" }} />
        <span
          style={{
            fontSize: 11,
            color: "#BBB",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          🏅 {PRIZE_THRESHOLD.toLocaleString()} pt prize threshold
        </span>
        <div style={{ flex: 1, height: 1, background: "#EEE" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {sorted.map((r) => {
          const overThreshold = r.pts >= PRIZE_THRESHOLD;
          const nearThreshold =
            !overThreshold && PRIZE_THRESHOLD - r.pts <= RA_NUDGE_ZONE;
          const ptsAway = PRIZE_THRESHOLD - r.pts;

          return (
            <div
              key={r.name}
              style={{
                background: "#fff",
                borderRadius: 13,
                padding: "11px 14px",
                display: "flex",
                alignItems: "center",
                gap: 11,
                boxShadow: nearThreshold
                  ? `0 2px 12px ${CARDINAL}22`
                  : "0 1px 6px rgba(0,0,0,0.05)",
                border: nearThreshold
                  ? `1.5px solid ${CARDINAL}44`
                  : overThreshold
                    ? "1.5px solid #22C55E44"
                    : "1.5px solid transparent",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: r.color,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  border: "2px solid #fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}
              >
                {r.initials}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1A1A1A",
                    }}
                  >
                    {r.name}
                  </p>
                  {nearThreshold && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        background: CARDINAL,
                        flexShrink: 0,
                        boxShadow: `0 0 0 3px ${CARDINAL}22`,
                      }}
                    />
                  )}
                  {overThreshold && <span style={{ fontSize: 12 }}>✅</span>}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 2,
                  }}
                >
                  <span style={{ fontSize: 11, color: "#AAA" }}>
                    {r.games} games
                  </span>
                  {nearThreshold && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: CARDINAL,
                      }}
                    >
                      {ptsAway} pts to prize 🎯
                    </span>
                  )}
                  {overThreshold && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#22C55E",
                      }}
                    >
                      Prize unlocked!
                    </span>
                  )}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: overThreshold
                      ? "#22C55E"
                      : nearThreshold
                        ? CARDINAL
                        : "#1A1A1A",
                  }}
                >
                  {r.pts.toLocaleString()}
                </p>
                <p style={{ fontSize: 10, color: "#BBB" }}>pts</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
