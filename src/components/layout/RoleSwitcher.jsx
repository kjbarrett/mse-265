import { CARDINAL } from "../../styles/tokens.js";

const ROLES = [
  { id: "student", label: "🎓 Student", activeBg: CARDINAL },
  { id: "ra", label: "🏠 RA View", activeBg: "#0F2A1A" },
  { id: "admin", label: "⚙️ Admin", activeBg: "#1A1A1A" },
];

export function RoleSwitcher({ role, onChange }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(20,20,20,0.92)",
        backdropFilter: "blur(16px)",
        borderRadius: 999,
        padding: "5px",
        display: "flex",
        gap: 2,
        zIndex: 10000,
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        fontFamily: "Inter, sans-serif",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {ROLES.map((r) => {
        const active = role === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            style={{
              padding: "9px 16px",
              borderRadius: 999,
              background: active ? r.activeBg : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: active ? 700 : 500,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
