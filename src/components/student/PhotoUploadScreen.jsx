import { useState } from "react";
import { FEED_PHOTOS } from "../../data/index.js";
import { CARDINAL, CARDINAL_DARK, CARDINAL_LIGHT } from "../../styles/tokens.js";

export function PhotoUploadScreen({ tweaks, onDone }) {
  const [shared, setShared] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { dormName } = tweaks;

  const handleShare = () => {
    setShared(true);
    setTimeout(onDone, 1400);
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
        <p
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: -0.5,
          }}
        >
          Game Photo
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            marginTop: 2,
          }}
        >
          Share your experience with the dorm
        </p>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "28px 20px",
            textAlign: "center",
            marginBottom: 14,
            border: uploaded ? "2px solid #22C55E" : "2px dashed #E0E0E0",
            boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
            transition: "border 0.3s",
          }}
        >
          {!uploaded ? (
            <>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background: CARDINAL_LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: 32,
                }}
              >
                📷
              </div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  marginBottom: 6,
                }}
              >
                Upload Game Photo
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#AAA",
                  marginBottom: 18,
                  lineHeight: "18px",
                }}
              >
                Show {dormName} what you&apos;re seeing from the stands
              </p>
              <button
                type="button"
                onClick={() => setUploaded(true)}
                style={{
                  padding: "12px 28px",
                  background: CARDINAL,
                  color: "#fff",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `0 4px 14px ${CARDINAL}44`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="13" r="4" stroke="#fff" strokeWidth="2" />
                </svg>
                Open Camera
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  height: 160,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${CARDINAL}44, #1A1A1A)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  fontSize: 40,
                }}
              >
                🏈
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#22C55E" }}>
                ✓ Photo ready to share
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleShare}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: 14,
            background: shared
              ? "#22C55E"
              : `linear-gradient(135deg, ${CARDINAL}, ${CARDINAL_DARK})`,
            color: "#fff",
            borderRadius: 13,
            border: "none",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: shared
              ? "0 4px 14px rgba(34,197,94,0.4)"
              : `0 4px 14px ${CARDINAL}44`,
            transition: "background 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {shared ? "✓ Shared to Dorm Feed!" : "🌲 Share to Dorm Feed"}
        </button>

        <button
          type="button"
          onClick={onDone}
          style={{
            width: "100%",
            padding: "12px",
            background: "#F5F5F5",
            color: "#888",
            borderRadius: 13,
            border: "none",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 18,
          }}
        >
          Skip for now
        </button>

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
          Dorm Feed · Live
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FEED_PHOTOS.map((p) => (
            <div
              key={p.initials + p.time}
              style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${p.color}44, ${p.color}22)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                🏟️
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    background: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {p.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#1A1A1A",
                      lineHeight: "17px",
                    }}
                  >
                    {p.caption}
                  </p>
                </div>
                <span style={{ fontSize: 11, color: "#CCC", flexShrink: 0 }}>
                  {p.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
