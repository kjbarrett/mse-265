import { useState } from "react";
import { CARDINAL, CARDINAL_DARK } from "../../styles/tokens.js";
import { validateStanfordEmail } from "../../utils/validation.js";

export function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleJoin = () => {
    if (!validateStanfordEmail(email)) {
      setEmailError("Please use your @stanford.edu email");
      return;
    }
    setEmailError("");
    setStep("confirm");
    setTimeout(() => setStep("welcome"), 1800);
    setTimeout(() => onComplete(), 3600);
  };

  if (step === "email") {
    return (
      <div
        style={{
          height: "100%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: `linear-gradient(160deg, ${CARDINAL} 0%, #6B1010 100%)`,
            paddingTop: 38,
            paddingBottom: 40,
            paddingLeft: 28,
            paddingRight: 28,
            flex: "0 0 auto",
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 52 }}>🌲</span>
          </div>
          <h1
            style={{
              color: "#fff",
              fontSize: 34,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: -0.5,
              marginBottom: 10,
            }}
          >
            The Cardinal
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 16,
              lineHeight: "22px",
            }}
          >
            Show up. Earn points. Win prizes for your dorm.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            { icon: "🏆", text: "Compete dorm vs. dorm all season" },
            { icon: "⭐", text: "Earn points for every game you attend" },
            { icon: "🎁", text: "Win prizes at 500, 1000 & 2000 pts" },
          ].map((v) => (
            <div
              key={v.text}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 20 }}>{v.icon}</span>
              <span style={{ fontSize: 14, color: "#444", fontWeight: 500 }}>
                {v.text}
              </span>
            </div>
          ))}

          <div style={{ marginTop: 8 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: "#888",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Stanford Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="sunetid@stanford.edu"
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: 13,
                border: emailError ? "1.5px solid #EF4444" : "1.5px solid #E8E8E8",
                fontSize: 15,
                fontFamily: "Inter, sans-serif",
                outline: "none",
                boxSizing: "border-box",
                color: "#1A1A1A",
              }}
            />
            {emailError && (
              <p style={{ fontSize: 12, color: "#EF4444", marginTop: 5 }}>
                {emailError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleJoin}
            style={{
              width: "100%",
              padding: "15px",
              background: `linear-gradient(135deg, ${CARDINAL}, ${CARDINAL_DARK})`,
              color: "#fff",
              borderRadius: 13,
              border: "none",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: `0 4px 16px ${CARDINAL}55`,
            }}
          >
            Join with Stanford Email →
          </button>

          <p
            style={{
              fontSize: 11,
              color: "#CCC",
              textAlign: "center",
              lineHeight: "16px",
            }}
          >
            Stanford Athletics · DAPER · Spring 2026
          </p>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div
        style={{
          height: "100%",
          background: CARDINAL,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 28px",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            background: "rgba(255,255,255,0.15)",
            border: "3px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            marginBottom: 24,
          }}
        >
          🌲
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Welcome to
        </p>
        <h2
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Team Toyon Hall
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 15,
            textAlign: "center",
            lineHeight: "21px",
          }}
        >
          You&apos;ve been assigned to Toyon Hall.
          <br />
          Let&apos;s climb the leaderboard!
        </p>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "rgba(255,255,255,0.4)",
            }}
          />
          <div
            style={{
              width: 20,
              height: 8,
              borderRadius: 4,
              background: "#fff",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "rgba(255,255,255,0.4)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 28px",
      }}
    >
      <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 900,
          color: "#1A1A1A",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        You&apos;re all set!
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#888",
          textAlign: "center",
          lineHeight: "22px",
        }}
      >
        Taking you to your home screen…
      </p>
      <div
        style={{
          marginTop: 20,
          width: 40,
          height: 4,
          borderRadius: 2,
          background: "#F0F0F0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: CARDINAL,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}
