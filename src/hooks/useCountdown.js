import { useEffect, useState } from "react";

/**
 * Counts down from initialSeconds; sets expired when reaching zero.
 * @returns {{ seconds: number, expired: boolean, skip: () => void }}
 */
export function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expired) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setExpired(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [expired]);

  const skip = () => setExpired(true);

  return { seconds, expired, skip };
}
