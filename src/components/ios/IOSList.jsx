import { iosGroupedBackground, iosSecondaryLabel } from "./iosTheme.js";

export function IOSList({ header, children, dark = false }) {
  const hc = iosSecondaryLabel(dark);
  const bg = iosGroupedBackground(dark);

  return (
    <div>
      {header && (
        <div
          style={{
            fontFamily: "-apple-system, system-ui",
            fontSize: 13,
            color: hc,
            textTransform: "uppercase",
            padding: "8px 36px 6px",
            letterSpacing: -0.08,
          }}
        >
          {header}
        </div>
      )}
      <div
        style={{
          background: bg,
          borderRadius: 26,
          margin: "0 16px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
