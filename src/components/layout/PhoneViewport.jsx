/** Scroll-safe container inside the iOS device frame */
export function PhoneViewport({ children }) {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
