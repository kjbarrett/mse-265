export function Avatar({ person, size = 28, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: person.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.36,
        fontWeight: 700,
        color: "#fff",
        border: "2px solid #fff",
        flexShrink: 0,
        ...style,
      }}
    >
      {person.initials}
    </div>
  );
}
