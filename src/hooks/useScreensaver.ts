import { useEffect, useRef, useState } from "react";

interface Sprite {
  x: number;
  y: number;
  color: string;
}

const PALETTE = [
  "#FF5C00",
  "#2EC27E",
  "#3B82F6",
  "#E0245E",
  "#A855F7",
  "#F5C518",
  "#14B8A6",
  "#EC4899",
];

const BOX = 122;
const TOP = 60;
const STEP_MS = 26;

/** DVD-logo bounce physics; only ticks while `active`. */
export function useScreensaver(active: boolean): Sprite {
  const [sprite, setSprite] = useState<Sprite>({
    x: 140,
    y: 170,
    color: PALETTE[0],
  });
  const vel = useRef({ vx: 2.4, vy: 1.9 });
  const colorIndex = useRef(0);

  useEffect(() => {
    if (!active) return;

    const tick = () => {
      setSprite((prev) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        let { x, y, color } = prev;
        const v = vel.current;
        x += v.vx;
        y += v.vy;
        let hit = false;

        if (x <= 0) {
          x = 0;
          v.vx = Math.abs(v.vx);
          hit = true;
        }
        if (x >= w - BOX) {
          x = w - BOX;
          v.vx = -Math.abs(v.vx);
          hit = true;
        }
        if (y <= TOP) {
          y = TOP;
          v.vy = Math.abs(v.vy);
          hit = true;
        }
        if (y >= h - BOX) {
          y = h - BOX;
          v.vy = -Math.abs(v.vy);
          hit = true;
        }

        if (hit) {
          colorIndex.current = (colorIndex.current + 1) % PALETTE.length;
          color = PALETTE[colorIndex.current];
        }
        return { x, y, color };
      });
    };

    const id = window.setInterval(tick, STEP_MS);
    return () => window.clearInterval(id);
  }, [active]);

  return sprite;
}
