import { useCallback, useState } from "react";
import { TWEAK_DEFAULTS } from "../data/index.js";

export function useTweaks(initial = TWEAK_DEFAULTS) {
  const [tweaks, setTweaks] = useState(initial);

  const setTweak = useCallback((key, value) => {
    const updates = typeof key === "object" ? key : { [key]: value };
    setTweaks((prev) => ({ ...prev, ...updates }));
    window.parent.postMessage(
      { type: "__edit_mode_set_keys", edits: updates },
      "*",
    );
  }, []);

  return { tweaks, setTweaks, setTweak };
}
