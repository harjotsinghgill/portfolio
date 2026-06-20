interface SecretToastProps {
  show: boolean;
}

/** Konami-code reward toast. */
export function SecretToast({ show }: SecretToastProps) {
  if (!show) return null;
  return (
    <div
      className="mono"
      style={{
        position: "fixed",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 60,
        background: "var(--accent)",
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        padding: "11px 20px",
        borderRadius: 30,
        animation: "riser 0.4s",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      }}
    >
      ↑↑↓↓←→←→ B A — you found it. nostalgia mode unlocked. ✳
    </div>
  );
}
