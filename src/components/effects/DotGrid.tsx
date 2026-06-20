/** Fixed dotted backdrop layer (pointer-events:none, sits behind content). */
export function DotGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        opacity: 0.5,
      }}
    />
  );
}
