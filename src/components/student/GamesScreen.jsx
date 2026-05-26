import { useState } from "react";
import { ATTENDEES_SEED, UPCOMING_GAMES } from "../../data/index.js";
import { CARDINAL } from "../../styles/tokens.js";
import { cloneAttendeesSeed } from "../../utils/attendees.js";
import { GameCard } from "./GameCard.jsx";

export function GamesScreen({ tweaks }) {
  const { totalPoints, userName } = tweaks;
  const [going, setGoing] = useState({});
  const [pts, setPts] = useState(totalPoints);
  const [bouncing, setBouncing] = useState(null);
  const [attendees] = useState(() => cloneAttendeesSeed(ATTENDEES_SEED));

  const handleGoing = (game) => {
    if (going[game.id]) return;
    setGoing((prev) => ({ ...prev, [game.id]: true }));
    setPts((prev) => prev + game.points);
    setBouncing(game.id);
    setTimeout(() => setBouncing(null), 700);
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
          paddingTop: 58,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              Upcoming Games
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
                marginTop: 2,
              }}
            >
              Tap &quot;I&apos;m Going&quot; to claim points
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: "8px 12px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.25)",
              transition: "transform 0.15s",
              transform: bouncing ? "scale(1.12)" : "scale(1)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#FFD700" }}>
              {pts.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.65)",
                fontWeight: 500,
              }}
            >
              MY POINTS
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "12px 12px 0",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {UPCOMING_GAMES.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isGoing={!!going[game.id]}
            onGoing={() => handleGoing(game)}
            attendees={attendees[game.id] || []}
            userName={userName}
          />
        ))}
      </div>

      <div style={{ padding: "14px 12px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            border: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <p style={{ fontSize: 12, color: "#888", lineHeight: "17px" }}>
            Points are awarded after attendance is verified at the gate. Bring
            your Stanford ID to every event.
          </p>
        </div>
      </div>
    </div>
  );
}
