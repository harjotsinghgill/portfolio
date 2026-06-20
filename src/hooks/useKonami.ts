import { useEffect, useState } from "react";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

/** Toggles a "secret" flag when the Konami code is entered. */
export function useKonami(): boolean {
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    let i = 0;
    const onKey = (ev: KeyboardEvent) => {
      const k = (ev.key || "").toLowerCase();
      if (k === SEQUENCE[i]) {
        i++;
        if (i === SEQUENCE.length) {
          i = 0;
          setSecret((s) => !s);
        }
      } else {
        i = k === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return secret;
}
