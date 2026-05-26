/** Semantic colors for the iOS 26 liquid-glass kit */
export function iosForeground(dark) {
  return dark ? "#fff" : "#000";
}

export function iosMuted(dark) {
  return dark ? "rgba(255,255,255,0.6)" : "#404040";
}

export function iosSecondaryLabel(dark) {
  return dark ? "rgba(235,235,245,0.6)" : "rgba(60,60,67,0.6)";
}

export function iosTertiaryLabel(dark) {
  return dark ? "rgba(235,235,245,0.3)" : "rgba(60,60,67,0.3)";
}

export function iosSeparator(dark) {
  return dark ? "rgba(84,84,88,0.65)" : "rgba(60,60,67,0.12)";
}

export function iosGroupedBackground(dark) {
  return dark ? "#1C1C1E" : "#fff";
}

export function iosDeviceBackground(dark) {
  return dark ? "#000" : "#F2F2F7";
}
