/**
 * Dark "role" header used by the RA + Admin shells.
 * Renders a status dot + label, a title, an Exit button, and a tab strip.
 */
export function RoleHeader({
  background,
  statusColor,
  accentColor,
  label,
  title,
  exitLabel = "Exit",
  onExit,
  tabs,
  activeTab,
  setActiveTab,
  inactiveTabColor = "rgba(255,255,255,0.4)",
  bottomSpacer = false,
}) {
  return (
    <div
      style={{
        background,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: statusColor,
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {label}
            </p>
          </div>
          <p
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 800,
              marginTop: 2,
            }}
          >
            {title}
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            padding: "7px 12px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {exitLabel}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1,
                padding: "10px 4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: active ? 700 : 400,
                color: active ? "#fff" : inactiveTabColor,
                borderBottom: active
                  ? `2px solid ${accentColor}`
                  : "2px solid transparent",
                transition: "all 0.15s",
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {bottomSpacer && <div style={{ height: 14 }} />}
    </div>
  );
}
