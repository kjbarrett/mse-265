import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import { publishedEventCount } from "../../utils/progress.js";

function eventIcon(sport) {
  if (sport.includes("Football")) return "🏈";
  if (sport.includes("Basketball")) return "🏀";
  if (sport.includes("Baseball")) return "⚾";
  if (sport.includes("Soccer")) return "⚽";
  return "🏅";
}

export function AdminDashboardScreen({ events }) {
  const total = events.reduce((sum, e) => sum + e.checkins, 0);
  const published = publishedEventCount(events);

  const summary = [
    { label: "Events", value: events.length, highlight: false },
    { label: "Published", value: published, highlight: false },
    {
      label: "Total Check-ins",
      value: total.toLocaleString(),
      highlight: true,
    },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {summary.map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 13,
              padding: "12px 10px",
              textAlign: "center",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: s.highlight ? CARDINAL : "#1A1A1A",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#AAA",
                marginTop: 2,
                lineHeight: "13px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: 12,
          color: "#AAA",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        All Events · Spring 2026
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {events.map((ev) => (
          <div
            key={ev.id}
            style={{
              background: "#fff",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              border: ev.published
                ? "1.5px solid transparent"
                : "1.5px dashed #DDD",
              opacity: ev.published ? 1 : 0.7,
            }}
          >
            {ev.published && (
              <div
                style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${CARDINAL}, #E85555)`,
                }}
              />
            )}
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: ev.published ? CARDINAL_LIGHT : "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {eventIcon(ev.sport)}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1A1A1A",
                    }}
                  >
                    {ev.sport}
                  </p>
                  {!ev.published && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#888",
                        background: "#F0F0F0",
                        borderRadius: 5,
                        padding: "1px 5px",
                        fontWeight: 600,
                      }}
                    >
                      DRAFT
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#888", marginTop: 1 }}>
                  {ev.date} · {ev.time}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{ fontSize: 15, fontWeight: 800, color: CARDINAL }}
                >
                  {ev.checkins.toLocaleString()}
                </div>
                <div style={{ fontSize: 10, color: "#AAA" }}>check-ins</div>
              </div>
              <div style={{ textAlign: "right", marginLeft: 6 }}>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}
                >
                  +{ev.pts}
                </div>
                <div style={{ fontSize: 10, color: "#AAA" }}>pts</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
