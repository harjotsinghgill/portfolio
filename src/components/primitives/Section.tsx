import type { CSSProperties, ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  /** Top divider line — on for every section except the hero. */
  divider?: boolean;
  /** Vertical padding shorthand; defaults to the design's 80px rhythm. */
  padding?: string;
  style?: CSSProperties;
}

/** Generic content section: optional top divider + consistent vertical rhythm. */
export function Section({
  id,
  children,
  divider = true,
  padding = "80px 0",
  style,
}: SectionProps) {
  return (
    <section
      id={id}
      style={{
        borderTop: divider ? "1px solid var(--line)" : undefined,
        padding,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
