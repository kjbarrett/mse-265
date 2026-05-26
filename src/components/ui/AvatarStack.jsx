import { Avatar } from "./Avatar.jsx";

export function AvatarStack({ attendees, max = 5, size = 28 }) {
  const visible = attendees.slice(0, max);
  const overflow = attendees.length - max;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {visible.map((p, i) => (
        <div
          key={p.name + (p.initials ?? i)}
          style={{ marginLeft: i === 0 ? 0 : -(size * 0.35) }}
        >
          <Avatar person={p} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: "#E8E8E8",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.32,
            fontWeight: 700,
            color: "#888",
            marginLeft: -(size * 0.35),
            flexShrink: 0,
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
