import { useEffect, useState } from "react";

const ACTIVITY_EVENTS = [
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
  "wheel",
] as const;

/** Returns true once the user has been inactive for `seconds`; any input resets. */
export function useIdle(seconds: number): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: number;

    const reset = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), seconds * 1000);
    };

    ACTIVITY_EVENTS.forEach((e) =>
      window.addEventListener(e, reset, { passive: true }),
    );
    reset();

    return () => {
      window.clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [seconds]);

  return idle;
}
