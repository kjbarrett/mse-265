import { useState } from "react";
import { BADGES_DATA } from "../../data/index.js";
import { PRIZE_THRESHOLD } from "../../data/constants.js";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { prizeEligibility } from "../../utils/progress.js";
import { BadgeCard } from "../ui/BadgeCard.jsx";
import { PerksSection } from "./PerksSection.jsx";

export function ProfileScreen({ tweaks }) {
  const {
    userName,
    gamesAttended,
    currentStreak,
    totalPoints,
    dormName,
    dormRank,
  } = tweaks;

  const [referralSent, setReferralSent] = useState(false);
  const { progress: prizeProgress, isEligible } = prizeEligibility(
    totalPoints,
    PRIZE_THRESHOLD,
  );
  const dormWinning = dormRank === 1;

  const stats = [
    { label: "Games Attended", value: gamesAttended },
    { label: "Current Streak", value: `${currentStreak}🔥` },
    { label: "Dorm Rank", value: `#${dormRank}` },
  ];

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
          paddingBottom: 28,
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            background: "rgba(255,255,255,0.2)",
            border: "3px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            fontSize: 28,
          }}
        >
          🌲
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
            {userName}
          </p>
          {(isEligible || dormWinning) && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: CARDINAL,
                background: "#FFD700",
                borderRadius: 6,
                padding: "2px 7px",
                letterSpacing: 0.3,
              }}
            >
              PRIZE ELIGIBLE
            </span>
          )}
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            marginTop: 2,
          }}
        >
          {dormName}
        </p>
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 999,
            padding: "6px 14px",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <span style={{ fontSize: 14 }}>⭐</span>
          <span style={{ color: "#FFD700", fontWeight: 800, fontSize: 16 }}>
            {totalPoints.toLocaleString()}
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            total points
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          background: "#fff",
          margin: "12px 12px 0",
          borderRadius: 16,
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: "14px 8px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid #F0F0F0" : "none",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1A1A" }}>
              {s.value}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#999",
                marginTop: 2,
                lineHeight: "14px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 12px 0" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "16px",
            boxShadow: isEligible
              ? "0 2px 14px #22C55E33"
              : "0 1px 8px rgba(0,0,0,0.06)",
            border: isEligible
              ? "1.5px solid #22C55E55"
              : `1.5px solid ${CARDINAL}22`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>
                {isEligible
                  ? "🏅 Individual Prize Unlocked!"
                  : "🎯 Prize Progress"}
              </p>
              <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                {isEligible
                  ? "You qualify for the $50 Stanford Store gift card"
                  : `${(PRIZE_THRESHOLD - totalPoints).toLocaleString()} pts to the 1,000-pt prize`}
              </p>
            </div>
            {isEligible && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#fff",
                  background: "#22C55E",
                  borderRadius: 7,
                  padding: "3px 8px",
                }}
              >
                EARNED
              </span>
            )}
          </div>
          <div
            style={{
              height: 10,
              background: "#F0F0F0",
              borderRadius: 5,
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 5,
                width: `${prizeProgress}%`,
                background: isEligible
                  ? "#22C55E"
                  : `linear-gradient(90deg, ${CARDINAL}, #E85555)`,
                transition: "width 0.8s",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: isEligible ? "#22C55E" : CARDINAL,
              }}
            >
              {totalPoints.toLocaleString()} pts
            </span>
            <span style={{ fontSize: 11, color: "#BBB" }}>
              Goal: {PRIZE_THRESHOLD.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 12px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>
            Badges
          </span>
          <span style={{ fontSize: 12, color: "#999" }}>
            {BADGES_DATA.filter((b) => b.earned).length}/{BADGES_DATA.length}{" "}
            earned
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {BADGES_DATA.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      <PerksSection totalPoints={totalPoints} />

      <div style={{ padding: "0px 12px 16px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "16px",
            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            border: `1.5px solid ${CARDINAL_LIGHT}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: CARDINAL_LIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              👥
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>
                Bring a Friend
              </p>
              <p style={{ fontSize: 12, color: "#999", marginTop: 1 }}>
                Earn 50 pts per referral
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setReferralSent(true)}
            style={{
              width: "100%",
              padding: "12px",
              background: referralSent ? "#22C55E" : CARDINAL,
              color: "#fff",
              borderRadius: 12,
              border: "none",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {referralSent ? "✓ Invite Sent!" : "Share Invite Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
