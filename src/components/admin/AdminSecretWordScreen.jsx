import { useState } from "react";
import { useCountdown } from "../../hooks/useCountdown.js";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { formatCountdown } from "../../utils/time.js";

const INITIAL_SECONDS = 14 * 60 + 33;

function pickTodaysEvent(events) {
  return events.find((e) => e.published && e.checkins > 0) || events[0];
}

export function AdminSecretWordScreen({ events }) {
  const todayEvent = pickTodaysEvent(events);
  const [announced, setAnnounced] = useState(false);
  const { seconds, expired, skip } = useCountdown(INITIAL_SECONDS);

  const unlocked = expired || announced;

  const handleAnnounce = () => {
    setAnnounced(true);
    skip();
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 16,
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          border: `1.5px solid ${CARDINAL}22`,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#AAA",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          Today's Game
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A" }}>
              {todayEvent?.sport}
            </p>
            <p style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
              {todayEvent?.date} · {todayEvent?.time}
            </p>
          </div>
          <div
            style={{
              background: CARDINAL_LIGHT,
              borderRadius: 10,
              padding: "6px 12px",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: CARDINAL }}>
              +{todayEvent?.pts} pts
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: unlocked ? CARDINAL : "#1A1A1A",
          borderRadius: 20,
          padding: "28px 20px",
          textAlign: "center",
          marginBottom: 16,
          boxShadow: unlocked
            ? `0 8px 30px ${CARDINAL}55`
            : "0 8px 30px rgba(0,0,0,0.3)",
          transition: "background 0.6s, box-shadow 0.6s",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          {unlocked
            ? "Secret Check-in Word"
            : "🔒 Locked Until 15 Min Before Game"}
        </p>

        {unlocked ? (
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 36,
              fontWeight: 900,
              color: "#FFD700",
              letterSpacing: 6,
              marginBottom: 8,
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {todayEvent?.word}
          </div>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 36,
                fontWeight: 900,
                color: "rgba(255,255,255,0.15)",
                letterSpacing: 6,
              }}
            >
              {"•".repeat(todayEvent?.word?.length || 7)}
            </div>
          </div>
        )}

        {!unlocked && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "8px 18px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />
                <path
                  d="M12 7v5l3 3"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: 2,
                }}
              >
                {formatCountdown(seconds)}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                marginTop: 8,
              }}
            >
              until word unlocks automatically
            </p>
          </div>
        )}

        {unlocked && (
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {todayEvent?.checkins.toLocaleString()} students checked in so far
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleAnnounce}
        disabled={announced}
        style={{
          width: "100%",
          padding: "15px",
          background: announced ? "#22C55E" : CARDINAL,
          color: "#fff",
          borderRadius: 13,
          border: "none",
          fontSize: 16,
          fontWeight: 800,
          cursor: announced ? "default" : "pointer",
          boxShadow: announced
            ? "0 4px 14px rgba(34,197,94,0.4)"
            : `0 4px 14px ${CARDINAL}55`,
          transition: "background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {announced ? "✓ Word Announced!" : "📣 Announce Now"}
      </button>

      {!announced && (
        <p
          style={{
            fontSize: 12,
            color: "#AAA",
            textAlign: "center",
            lineHeight: "17px",
          }}
        >
          Override the timer and reveal the word immediately. This will notify
          all students who registered for this game.
        </p>
      )}

      {announced && (
        <div
          style={{
            background: "#F0FDF4",
            borderRadius: 12,
            padding: "12px 14px",
            border: "1px solid #BBF7D0",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>✅</span>
          <p
            style={{
              fontSize: 13,
              color: "#166534",
              lineHeight: "17px",
              fontWeight: 500,
            }}
          >
            Word announced! Students who registered will receive a notification
            now.
          </p>
        </div>
      )}
    </div>
  );
}
