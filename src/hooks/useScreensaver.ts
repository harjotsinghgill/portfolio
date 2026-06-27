import { useEffect, useRef, useState } from "react";

interface Sprite {
  x: number;
  y: number;
}

const BOX = 200;
const PAD = 20;
const VISUAL = BOX - 2 * PAD;
const TOP = 0;
const STEP_MS = 36;

export const GEAR_PAD = PAD;

export function useScreensaver(active: boolean): Sprite {
  const [sprite, setSprite] = useState<Sprite>({ x: 120, y: 150 });
  const vel = useRef({ vx: 3.5, vy: 2.8 });

  useEffect(() => {
    if (!active) return;

    const tick = () => {
      setSprite((prev) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        let { x, y } = prev;
        const v = vel.current;
        x += v.vx;
        y += v.vy;

        if (x <= 0) { x = 0; v.vx = Math.abs(v.vx); }
        if (x >= w - VISUAL) { x = w - VISUAL; v.vx = -Math.abs(v.vx); }
        if (y <= TOP) { y = TOP; v.vy = Math.abs(v.vy); }
        if (y >= h - VISUAL) { y = h - VISUAL; v.vy = -Math.abs(v.vy); }

        return { x, y };
      });
    };

    const id = window.setInterval(tick, STEP_MS);
    return () => window.clearInterval(id);
  }, [active]);

  return sprite;
}
