import { useState } from "react";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";

const POINT_VALUES = [25, 50, 75, 100, 150];
const EMPTY_FORM = { sport: "", date: "", time: "", pts: 75, word: "" };
const SUCCESS_RESET_MS = 2000;

const inputStyle = {
  width: "100%",
  padding: "11px 13px",
  borderRadius: 11,
  border: "1.5px solid #E8E8E8",
  fontSize: 15,
  color: "#1A1A1A",
  fontFamily: "Inter, sans-serif",
  outline: "none",
  background: "#fff",
  WebkitAppearance: "none",
};

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#888",
  marginBottom: 5,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

function isFormValid(form) {
  return Boolean(form.sport && form.date && form.time && form.word);
}

export function AdminRegisterScreen({ onPublish }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [published, setPublished] = useState(false);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handlePublish = () => {
    if (!isFormValid(form)) return;
    setPublished(true);
    onPublish({ ...form, id: Date.now(), checkins: 0, published: true });
    setTimeout(() => {
      setPublished(false);
      setForm(EMPTY_FORM);
    }, SUCCESS_RESET_MS);
  };

  const valid = isFormValid(form);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <div
        style={{
          background: CARDINAL_LIGHT,
          borderRadius: 14,
          padding: "12px 14px",
          marginBottom: 18,
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
          📋 Fill out the form below to register a new event. Students will see
          it in Upcoming Games immediately after publishing.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Sport Name</label>
          <input
            value={form.sport}
            onChange={(e) => set("sport", e.target.value)}
            placeholder="e.g. Women's Volleyball"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Time</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Point Value</label>
          <div style={{ display: "flex", gap: 8 }}>
            {POINT_VALUES.map((p) => {
              const active = form.pts === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("pts", p)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: 10,
                    background: active ? CARDINAL : "#F5F5F5",
                    color: active ? "#fff" : "#888",
                    border: active ? "none" : "1.5px solid #E8E8E8",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 11, color: "#BBB", marginTop: 5 }}>
            Points awarded to each student who attends
          </p>
        </div>

        <div>
          <label style={labelStyle}>Secret Check-in Word</label>
          <input
            value={form.word}
            onChange={(e) =>
              set("word", e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
            }
            placeholder="e.g. TREEFROG"
            maxLength={12}
            style={{
              ...inputStyle,
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
              color: CARDINAL,
            }}
          />
          <p style={{ fontSize: 11, color: "#BBB", marginTop: 5 }}>
            Announced 15 min before game time. Students enter this to check in.
          </p>
        </div>

        {form.sport && (
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "14px",
              border: "1.5px solid #F0F0F0",
              boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
            }}
          >
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
              Preview
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>
                  {form.sport || "—"}
                </p>
                <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                  {form.date || "—"} · {form.time || "—"}
                </p>
              </div>
              <div
                style={{
                  background: CARDINAL_LIGHT,
                  borderRadius: 10,
                  padding: "6px 12px",
                }}
              >
                <span
                  style={{ fontSize: 14, fontWeight: 800, color: CARDINAL }}
                >
                  +{form.pts} pts
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handlePublish}
          disabled={!valid || published}
          style={{
            width: "100%",
            padding: "15px",
            background: published ? "#22C55E" : valid ? CARDINAL : "#DDD",
            color: "#fff",
            borderRadius: 13,
            border: "none",
            fontSize: 16,
            fontWeight: 800,
            cursor: !valid || published ? "default" : "pointer",
            transition: "background 0.3s",
            boxShadow: published
              ? "0 4px 14px rgba(34,197,94,0.4)"
              : "0 4px 14px rgba(140,21,21,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {published ? "✓ Event Published!" : "🚀 Publish Event"}
        </button>
      </div>
    </div>
  );
}
