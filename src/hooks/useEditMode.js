import { useEffect, useState } from "react";

export function useEditMode() {
  const [showTweaks, setShowTweaks] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setShowTweaks(true);
      if (e.data?.type === "__deactivate_edit_mode") setShowTweaks(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const dismissTweaks = () => {
    setShowTweaks(false);
    window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  };

  return { showTweaks, setShowTweaks, dismissTweaks };
}
