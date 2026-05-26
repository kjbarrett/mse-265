import { useState } from "react";
import { PERKS } from "../../data/index.js";
import { PERKS_PROGRESS_MAX } from "../../data/constants.js";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { percentClamped } from "../../utils/progress.js";

export function PerksSection({ totalPoints }) {
  const [claimed, setClaimed] = useState([]);

  const nextPerk = PERKS.find((p) => p.pts > totalPoints);
  const ptsToNext = nextPerk ? nextPerk.pts - totalPoints : 0;
  const progressWidth = percentClamped(totalPoints, PERKS_PROGRESS_MAX);

  return (
    <div style={{ padding: "0 12px 8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>
          Perks & Rewards
        </span>
        <span style={{ fontSize: 12, color: "#999" }}>
          {totalPoints.toLocaleString()} pts
        </span>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "12px 14px",
          marginBottom: 10,
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "#888" }}>Progress to next perk</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: CARDINAL }}>
            {totalPoints} / {PERKS_PROGRESS_MAX.toLocaleString()} pts
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: "#F0F0F0",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              width: `${progressWidth}%`,
              background: `linear-gradient(90deg, ${CARDINAL}, #E85555)`,
              transition: "width 0.6s",
            }}
          />
        </div>
        <p style={{ fontSize: 11, color: "#BBB", marginTop: 5 }}>
          {nextPerk
            ? `${ptsToNext.toLocaleString()} pts away from ${nextPerk.title} ${nextPerk.icon}`
            : "All perks unlocked!"}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PERKS.map((perk) => {
          const isUnlocked = totalPoints >= perk.pts;
          const isClaimed = claimed.includes(perk.id);

          return (
            <div
              key={perk.id}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: isUnlocked ? "0 1px 8px rgba(0,0,0,0.07)" : "none",
                border: isClaimed
                  ? "1.5px solid #22C55E"
                  : isUnlocked
                    ? `1.5px solid ${CARDINAL}33`
                    : "1.5px solid #F0F0F0",
                opacity: isUnlocked ? 1 : 0.55,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: isUnlocked ? CARDINAL_LIGHT : "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                  filter: isUnlocked ? "none" : "grayscale(1)",
                }}
              >
                {perk.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isUnlocked ? "#1A1A1A" : "#888",
                    }}
                  >
                    {perk.title}
                  </p>
                  {isClaimed && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#22C55E",
                        background: "#F0FDF4",
                        borderRadius: 5,
                        padding: "1px 5px",
                      }}
                    >
                      CLAIMED
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "#AAA",
                    lineHeight: "15px",
                    marginTop: 1,
                  }}
                >
                  {perk.desc}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isUnlocked ? CARDINAL : "#BBB",
                    marginTop: 3,
                  }}
                >
                  {perk.pts.toLocaleString()} pts
                </p>
              </div>
              {isUnlocked && !isClaimed && (
                <button
                  type="button"
                  onClick={() => setClaimed((prev) => [...prev, perk.id])}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 10,
                    background: CARDINAL,
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  Claim
                </button>
              )}
              {!isUnlocked && <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>}
              {isClaimed && <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
