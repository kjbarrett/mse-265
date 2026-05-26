import { useState } from "react";
import { RA_RESIDENTS, UPCOMING_GAMES } from "../../data/index.js";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";

function rallyMessage(dormName, dormRank, game) {
  return `Hey ${dormName}! 🌲 We're ranked #${dormRank} — let's move up. ${game.sport} ${game.opponent} starts at ${game.time} on ${game.date}. Check in on The Cardinal to earn ${game.points} pts for the dorm. Let's go Cardinal! 🏈`;
}

export function RARallyScreen({ tweaks }) {
  const { dormName, dormRank } = tweaks;
  const [selectedGame, setSelectedGame] = useState(0);
  const defaultMsg = rallyMessage(dormName, dormRank, UPCOMING_GAMES[0]);
  const [msg, setMsg] = useState(defaultMsg);
  const [sent, setSent] = useState(false);

  const updateMsg = (gameIdx) => {
    setSelectedGame(gameIdx);
    setMsg(rallyMessage(dormName, dormRank, UPCOMING_GAMES[gameIdx]));
    setSent(false);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <div
        style={{
          background: CARDINAL_LIGHT,
          borderRadius: 13,
          padding: "11px 14px",
          marginBottom: 16,
          border: `1px solid ${CARDINAL}22`,
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: CARDINAL,
            fontWeight: 600,
            lineHeight: "18px",
          }}
        >
          📣 Customize and send a rally message to all residents before game
          time.
        </p>
      </div>

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
        Select Game
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          marginBottom: 16,
        }}
      >
        {UPCOMING_GAMES.map((g, i) => {
          const active = selectedGame === i;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => updateMsg(i)}
              style={{
                background: active ? CARDINAL_LIGHT : "#fff",
                border: active
                  ? `1.5px solid ${CARDINAL}55`
                  : "1.5px solid #F0F0F0",
                borderRadius: 12,
                padding: "10px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 18 }}>{g.icon}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: active ? CARDINAL : "#1A1A1A",
                  }}
                >
                  {g.sport} {g.opponent}
                </p>
                <p style={{ fontSize: 11, color: "#AAA" }}>
                  {g.date} · {g.time}
                </p>
              </div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  border: `2px solid ${active ? CARDINAL : "#DDD"}`,
                  background: active ? CARDINAL : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {active && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: "#fff",
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

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
        Message
      </p>
      <textarea
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
          setSent(false);
        }}
        rows={6}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: 13,
          border: "1.5px solid #E8E8E8",
          fontSize: 14,
          color: "#1A1A1A",
          fontFamily: "Inter, sans-serif",
          lineHeight: "20px",
          outline: "none",
          resize: "none",
          background: "#fff",
          boxSizing: "border-box",
          marginBottom: 8,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 11, color: "#BBB" }}>
          {msg.length} characters
        </span>
        <button
          type="button"
          onClick={() => setMsg(defaultMsg)}
          style={{
            background: "none",
            border: "none",
            fontSize: 12,
            color: "#AAA",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          ↺ Reset to default
        </button>
      </div>

      <div
        style={{
          background: "#F0F0F0",
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          padding: "12px 14px",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#888",
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          Preview — how it appears to residents
        </p>
        <p style={{ fontSize: 13, color: "#1A1A1A", lineHeight: "19px" }}>
          {msg}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          borderRadius: 12,
          padding: "11px 14px",
          border: "1px solid #F0F0F0",
          marginBottom: 12,
          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex" }}>
            {RA_RESIDENTS.slice(0, 4).map((r, i) => (
              <div
                key={r.name}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  background: r.color,
                  border: "2px solid #fff",
                  marginLeft: i === 0 ? 0 : -8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {r.initials}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>
            Sending to <strong>{RA_RESIDENTS.length} residents</strong>
          </span>
        </div>
        <span style={{ fontSize: 12, color: "#BBB" }}>via push + SMS</span>
      </div>

      <button
        type="button"
        onClick={() => setSent(true)}
        style={{
          width: "100%",
          padding: "15px",
          background: sent ? "#22C55E" : CARDINAL,
          color: "#fff",
          borderRadius: 13,
          border: "none",
          fontSize: 16,
          fontWeight: 800,
          cursor: "pointer",
          transition: "background 0.3s",
          boxShadow: sent
            ? "0 4px 14px rgba(34,197,94,0.4)"
            : `0 4px 14px ${CARDINAL}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {sent ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12l5 5L19 7"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            Sent to {RA_RESIDENTS.length} Residents!
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            Send to Floor
          </>
        )}
      </button>
    </div>
  );
}
