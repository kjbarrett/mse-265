import { useState } from "react";
import {
  CHECKIN_SECRET_WORD,
  UPCOMING_GAMES,
} from "../../data/index.js";
import { CARDINAL, CARDINAL_DARK, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { useCountdown } from "../../hooks/useCountdown.js";
import { formatCountdown } from "../../utils/time.js";
import { validateSecretWord } from "../../utils/validation.js";

const INITIAL_COUNTDOWN_SECONDS = 8 * 60 + 42;

export function CheckInScreen({ onSuccess }) {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const { seconds, expired: unlocked, skip } = useCountdown(
    INITIAL_COUNTDOWN_SECONDS,
  );
  const game = UPCOMING_GAMES[0];
  const countdownLabel = formatCountdown(seconds);

  const handleVerify = () => {
    if (!validateSecretWord(word, CHECKIN_SECRET_WORD)) {
      setError("Incorrect word — try again");
      return;
    }
    setError("");
    setVerified(true);
    setTimeout(() => onSuccess(), 1600);
  };

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
        <p
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: -0.5,
          }}
        >
          Check In
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            marginTop: 2,
          }}
        >
          {game.sport} {game.opponent} · {game.date}
        </p>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 16,
            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            border: `1.5px solid ${CARDINAL}22`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28 }}>{game.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>
              {game.sport} {game.opponent}
            </p>
            <p style={{ fontSize: 12, color: "#888" }}>
              {game.venue} · {game.time}
            </p>
          </div>
          <div
            style={{
              background: CARDINAL_LIGHT,
              borderRadius: 10,
              padding: "5px 10px",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: CARDINAL }}>
              +{game.points} pts
            </span>
          </div>
        </div>

        {!unlocked && !verified && (
          <div
            style={{
              background: "#1A1A1A",
              borderRadius: 20,
              padding: "32px 24px",
              textAlign: "center",
              marginBottom: 16,
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
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
              Check-in opens in
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "10px 20px",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: 3,
                }}
              >
                {countdownLabel}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 13,
                lineHeight: "18px",
              }}
            >
              The secret check-in word unlocks 15 minutes before game time
            </p>
            <button
              type="button"
              onClick={skip}
              style={{
                marginTop: 20,
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Skip timer (demo)
            </button>
          </div>
        )}

        {unlocked && !verified && (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: `0 4px 24px ${CARDINAL}22`,
              border: `1.5px solid ${CARDINAL}33`,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
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
                🔓
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A" }}>
                  Check-in is open!
                </p>
                <p style={{ fontSize: 12, color: "#888" }}>
                  Enter today&apos;s secret word
                </p>
              </div>
            </div>

            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: "#888",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Secret Word
            </label>
            <input
              value={word}
              onChange={(e) => {
                setWord(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="Enter secret word…"
              maxLength={12}
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: 12,
                border: error ? "1.5px solid #EF4444" : "1.5px solid #E8E8E8",
                fontSize: 20,
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: 4,
                color: CARDINAL,
                outline: "none",
                textAlign: "center",
                boxSizing: "border-box",
                marginBottom: error ? 6 : 14,
              }}
            />
            {error && (
              <p
                style={{
                  fontSize: 12,
                  color: "#EF4444",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleVerify}
              style={{
                width: "100%",
                padding: "14px",
                background: `linear-gradient(135deg, ${CARDINAL}, ${CARDINAL_DARK})`,
                color: "#fff",
                borderRadius: 12,
                border: "none",
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: `0 4px 14px ${CARDINAL}44`,
              }}
            >
              Verify Attendance →
            </button>
            <p
              style={{
                fontSize: 11,
                color: "#BBB",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Hint: it&apos;s {CHECKIN_SECRET_WORD}
            </p>
          </div>
        )}

        {verified && (
          <div
            style={{
              background: "#22C55E",
              borderRadius: 20,
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(34,197,94,0.35)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <p
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 900,
                marginBottom: 6,
              }}
            >
              Attendance Verified!
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
              +{game.points} pts added to your total
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
