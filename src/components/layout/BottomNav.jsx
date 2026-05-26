import { CARDINAL } from "../../styles/tokens.js";

export function BottomNav({ active, setActive, notifCount = 0 }) {
  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V12h6v9"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "leaderboard",
      label: "Standings",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="14" width="5" height="8" rx="1" fill={on ? CARDINAL : "#B0B0B0"} />
          <rect x="9.5" y="9" width="5" height="13" rx="1" fill={on ? CARDINAL : "#B0B0B0"} />
          <rect x="17" y="4" width="5" height="18" rx="1" fill={on ? CARDINAL : "#B0B0B0"} />
        </svg>
      ),
    },
    {
      id: "games",
      label: "Games",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="3"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
          />
          <path d="M3 9h18" stroke={on ? CARDINAL : "#B0B0B0"} strokeWidth="2" />
          <circle cx="8" cy="14" r="1.5" fill={on ? CARDINAL : "#B0B0B0"} />
          <circle cx="12" cy="14" r="1.5" fill={on ? CARDINAL : "#B0B0B0"} />
          <circle cx="16" cy="14" r="1.5" fill={on ? CARDINAL : "#B0B0B0"} />
          <path
            d="M8 4V2M16 4V2"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "social",
      label: "Friends",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3.5" stroke={on ? CARDINAL : "#B0B0B0"} strokeWidth="2" />
          <path
            d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 12v6M14 15h6"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      badge: notifCount,
    },
    {
      id: "profile",
      label: "Profile",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="4" stroke={on ? CARDINAL : "#B0B0B0"} strokeWidth="2" />
          <path
            d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            stroke={on ? CARDINAL : "#B0B0B0"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 82,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        paddingTop: 10,
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActive(tab.id)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            position: "relative",
          }}
        >
          {tab.icon(active === tab.id)}
          {tab.badge > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 4,
                width: 16,
                height: 16,
                borderRadius: 8,
                background: CARDINAL,
                border: "2px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {tab.badge}
            </div>
          )}
          <span
            style={{
              fontSize: 10,
              fontWeight: active === tab.id ? 600 : 400,
              color: active === tab.id ? CARDINAL : "#999",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
