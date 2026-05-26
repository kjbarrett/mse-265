import { useState } from "react";
import { AdminShell } from "./components/admin/AdminShell.jsx";
import { IOSDevice } from "./components/ios/index.js";
import { PhoneViewport } from "./components/layout/PhoneViewport.jsx";
import { RoleSwitcher } from "./components/layout/RoleSwitcher.jsx";
import { RAShell } from "./components/ra/RAShell.jsx";
import { StudentShell } from "./components/student/StudentShell.jsx";
import { useEditMode } from "./hooks/useEditMode.js";
import { useTweaks } from "./hooks/useTweaks.js";

const TWEAK_FIELDS = [
  { label: "Dorm Name", key: "dormName", type: "text" },
  { label: "Dorm Rank", key: "dormRank", type: "number", min: 1, max: 8 },
  { label: "Your Name", key: "userName", type: "text" },
  { label: "Games Attended", key: "gamesAttended", type: "number", min: 0, max: 50 },
  { label: "Streak (games)", key: "currentStreak", type: "number", min: 0, max: 20 },
  { label: "Total Points", key: "totalPoints", type: "number", min: 0, max: 9999 },
];

export function App() {
  const { tweaks, setTweak } = useTweaks();
  const { showTweaks, dismissTweaks } = useEditMode();
  const [role, setRole] = useState("student");
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const handleRoleChange = (next) => {
    if (next !== "student") setHasOnboarded(true);
    setRole(next);
  };

  const exitToStudent = () => {
    setHasOnboarded(true);
    setRole("student");
  };

  const showRoleSwitcher = role !== "student" || hasOnboarded;

  let shell;
  if (role === "admin") {
    shell = <AdminShell onExit={exitToStudent} />;
  } else if (role === "ra") {
    shell = <RAShell onExit={exitToStudent} tweaks={tweaks} />;
  } else {
    shell = (
      <StudentShell
        tweaks={tweaks}
        skipOnboarding={hasOnboarded}
        onOnboardingComplete={() => setHasOnboarded(true)}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px 20px 80px",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      <IOSDevice width={390} height={844}>
        <PhoneViewport>{shell}</PhoneViewport>
      </IOSDevice>

      {showRoleSwitcher && (
        <RoleSwitcher role={role} onChange={handleRoleChange} />
      )}

      {showTweaks && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            padding: "20px",
            width: 280,
            border: "1px solid rgba(0,0,0,0.08)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1A1A1A" }}>
              Tweaks
            </span>
            <button
              type="button"
              onClick={dismissTweaks}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#999",
              }}
            >
              ✕
            </button>
          </div>

          {TWEAK_FIELDS.map((field) => (
            <div key={field.key} style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#888",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                min={field.min}
                max={field.max}
                value={tweaks[field.key]}
                onChange={(e) =>
                  setTweak(
                    field.key,
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value,
                  )
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #EEE",
                  fontSize: 14,
                  color: "#1A1A1A",
                  fontFamily: "Inter, sans-serif",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
