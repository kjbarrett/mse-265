import { useState } from "react";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { Avatar } from "../ui/Avatar.jsx";
import { AvatarStack } from "../ui/AvatarStack.jsx";

const PREVIEW_COUNT = 3;

export function AttendeeDrawer({ attendees, userName, isGoing }) {
  const [expanded, setExpanded] = useState(false);

  const allAttendees = isGoing
    ? [
        {
          name: "You",
          dorm: "",
          color: CARDINAL,
          initials: (userName || "Me").trim().slice(0, 2).toUpperCase(),
        },
        ...attendees,
      ]
    : attendees;

  if (allAttendees.length === 0) return null;

  return (
    <div
      style={{
        borderTop: "1px solid #F0F0F0",
        paddingTop: 12,
        marginTop: 4,
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: expanded ? 10 : 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AvatarStack attendees={allAttendees} max={5} size={26} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>
            {allAttendees.length}{" "}
            {allAttendees.length === 1 ? "person" : "people"} going
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#AAA" }}>
            {expanded ? "less" : "see all"}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            style={{
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="#BBB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {expanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: 4,
          }}
        >
          {allAttendees.map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "5px 8px",
                borderRadius: 10,
                background: p.name === "You" ? CARDINAL_LIGHT : "#FAFAFA",
                border:
                  p.name === "You"
                    ? `1px solid ${CARDINAL}22`
                    : "1px solid transparent",
              }}
            >
              <Avatar person={p} size={30} />
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: p.name === "You" ? 700 : 500,
                    color: p.name === "You" ? CARDINAL : "#1A1A1A",
                  }}
                >
                  {p.name}
                </span>
                {p.dorm && (
                  <span style={{ fontSize: 11, color: "#AAA", marginLeft: 5 }}>
                    {p.dorm}
                  </span>
                )}
              </div>
              {p.name === "You" && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: CARDINAL,
                    background: CARDINAL_LIGHT,
                    border: `1px solid ${CARDINAL}33`,
                    borderRadius: 6,
                    padding: "1px 6px",
                  }}
                >
                  YOU
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {!expanded && (
        <p style={{ fontSize: 12, color: "#888", lineHeight: "16px" }}>
          {isGoing && (
            <span style={{ color: CARDINAL, fontWeight: 600 }}>You</span>
          )}
          {isGoing && allAttendees.length > 1 && ", "}
          {allAttendees
            .filter((p) => p.name !== "You")
            .slice(0, isGoing ? 2 : 3)
            .map((p) => p.name)
            .join(", ")}
          {allAttendees.length > PREVIEW_COUNT &&
            ` +${allAttendees.length - PREVIEW_COUNT} more`}
          {" are going"}
        </p>
      )}
    </div>
  );
}
