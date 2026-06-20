import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  radius?: number;
  padding?: string | number;
  /** Filled accent variant (used for the highlighted skill chip). */
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Glass surface block. The repeated card primitive behind stats + skills. */
export function Card({
  children,
  radius = 14,
  padding = 18,
  accent = false,
  className = "",
  style,
}: CardProps) {
  const accentStyle: CSSProperties = {
    background: "var(--accent)",
    color: "#fff",
    border: "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
    boxShadow: "0 6px 18px color-mix(in srgb, var(--accent) 40%, transparent)",
    fontWeight: 700,
  };
  return (
    <div
      className={accent ? className : `glass ${className}`}
      style={{
        borderRadius: radius,
        padding,
        ...(accent ? accentStyle : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
