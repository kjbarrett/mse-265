import { IOSKeyboard } from "./IOSKeyboard.jsx";
import { IOSNavBar } from "./IOSNavBar.jsx";
import { IOSStatusBar } from "./IOSStatusBar.jsx";
import { iosDeviceBackground } from "./iosTheme.js";

/**
 * Height reserved at the top of the device frame for the status bar
 * (time, signal, wifi, battery). Content rendered inside IOSDevice begins
 * below this band so it cannot bleed under the indicators when scrolled.
 */
export const IOS_SAFE_AREA_TOP = 62;

export function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false,
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 48,
        overflow: "hidden",
        position: "relative",
        background: iosDeviceBackground(dark),
        boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)",
        fontFamily: "-apple-system, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 11,
          left: "50%",
          transform: "translateX(-50%)",
          width: 126,
          height: 37,
          borderRadius: 24,
          background: "#000",
          zIndex: 50,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <IOSStatusBar dark={dark} />
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          paddingTop: IOS_SAFE_AREA_TOP,
          boxSizing: "border-box",
        }}
      >
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>{children}</div>
        {keyboard && <IOSKeyboard dark={dark} />}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          height: 34,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: 8,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 139,
            height: 5,
            borderRadius: 100,
            background: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.25)",
          }}
        />
      </div>
    </div>
  );
}
