import type { CSSProperties } from "react";
import { useScreensaver } from "../../hooks/useScreensaver";
import { GearLogo } from "../primitives/GearLogo";

interface IdleScreensaverProps {
  active: boolean;
}

/** Idle "DVD bounce" screensaver — a wandering 3D gear that recolors on hit. */
export function IdleScreensaver({ active }: IdleScreensaverProps) {
  const sprite = useScreensaver(active);
  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: "rgba(8,7,6,0.92)",
        animation: "idleIn 0.6s",
        overflow: "hidden",
      }}
    >
      <div
        className="mono"
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 12,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        // you wandered off. the pixels got lonely. move to wake them.
      </div>
      <div
        style={
          {
            position: "absolute",
            left: sprite.x,
            top: sprite.y,
          } as CSSProperties
        }
      >
        <GearLogo size={200} tint={sprite.color} autoSpin />
      </div>
    </div>
  );
}
