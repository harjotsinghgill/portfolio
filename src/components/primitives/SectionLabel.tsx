import type { CSSProperties } from "react";

interface SectionLabelProps {
  children: string;
  style?: CSSProperties;
}

/** The mono accent eyebrow used to number/title each section ("01 / ABOUT"). */
export function SectionLabel({ children, style }: SectionLabelProps) {
  return (
    <div
      className="mono"
      style={{
        fontSize: 12,
        color: "var(--accent)",
        marginBottom: 30,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
