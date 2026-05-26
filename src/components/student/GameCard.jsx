import { CARDINAL, CARDINAL_DARK } from "../../styles/tokens.js";
import { AttendeeDrawer } from "./AttendeeDrawer.jsx";

export function GameCard({ game, isGoing, onGoing, attendees, userName }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: isGoing
          ? `0 2px 16px ${game.color}33`
          : "0 1px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",
        border: isGoing
          ? `1.5px solid ${game.color}55`
          : "1.5px solid transparent",
        transition: "box-shadow 0.3s, border 0.3s",
      }}
    >
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${game.color}, ${game.color}88)`,
        }}
      />
      <div style={{ padding: "14px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>{game.icon}</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>
                {game.sport}
              </p>
              <p style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>
                {game.opponent}
              </p>
            </div>
          </div>
          <div
            style={{
              background: isGoing ? game.color : "#F5F5F5",
              borderRadius: 10,
              padding: "4px 10px",
              transition: "background 0.3s",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: isGoing ? "#fff" : "#999",
              }}
            >
              +{game.points} pts
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="3" stroke="#BBB" strokeWidth="2" />
              <path d="M3 9h18" stroke="#BBB" strokeWidth="2" />
              <path
                d="M8 2v4M16 2v4"
                stroke="#BBB"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ fontSize: 12, color: "#888" }}>{game.date}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#BBB" strokeWidth="2" />
              <path
                d="M12 7v5l3 3"
                stroke="#BBB"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ fontSize: 12, color: "#888" }}>{game.time}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 12,
          }}
        >
          <svg width="12" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              stroke="#BBB"
              strokeWidth="2"
            />
            <circle cx="12" cy="9" r="2.5" stroke="#BBB" strokeWidth="2" />
          </svg>
          <span style={{ fontSize: 12, color: "#888" }}>{game.venue}</span>
        </div>

        <AttendeeDrawer
          attendees={attendees}
          userName={userName}
          isGoing={isGoing}
        />

        <button
          type="button"
          onClick={onGoing}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: 12,
            background: isGoing
              ? "linear-gradient(135deg, #22C55E, #16A34A)"
              : `linear-gradient(135deg, ${CARDINAL}, ${CARDINAL_DARK})`,
            color: "#fff",
            borderRadius: 12,
            border: "none",
            fontSize: 15,
            fontWeight: 700,
            cursor: isGoing ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.3s",
            boxShadow: isGoing
              ? "0 4px 12px rgba(34,197,94,0.35)"
              : `0 4px 12px ${CARDINAL}44`,
          }}
        >
          {isGoing ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12l5 5L19 7"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              You&apos;re Going!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              I&apos;m Going
            </>
          )}
        </button>
      </div>
    </div>
  );
}
