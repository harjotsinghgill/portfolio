import type { CSSProperties } from "react";
import { useScreensaver } from "../../hooks/useScreensaver";

interface IdleScreensaverProps {
  active: boolean;
}

const blade: CSSProperties = {
  position: "absolute",
  inset: 10,
  borderRadius: 13,
  background: "var(--sprite)",
};
const round: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
};

/** Idle "DVD bounce" screensaver — a wandering aperture that recolors on hit. */
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
            width: 100,
            height: 100,
            animation: "spin 6s linear infinite",
            "--sprite": sprite.color,
          } as CSSProperties
        }
      >
        <div style={blade} />
        <div style={{ ...blade, transform: "rotate(45deg)" }} />
        <div style={{ ...round, background: "var(--sprite)", transform: "scale(0.62)" }} />
        <div style={{ ...round, background: "#0a0908", transform: "scale(0.28)" }} />
      </div>
    </div>
  );
}
