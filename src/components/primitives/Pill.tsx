import type { ReactNode } from "react";
import styles from "./Pill.module.css";

interface PillProps {
  children: ReactNode;
  /** Renders a leading status dot. */
  dotColor?: string;
  blinkDot?: boolean;
  muted?: boolean;
  className?: string;
}

/** Glass status/label chip used across the header, hero, and experience rows. */
export function Pill({
  children,
  dotColor,
  blinkDot,
  muted,
  className = "",
}: PillProps) {
  return (
    <span
      className={`glass mono ${styles.pill} ${muted ? styles.muted : ""} ${className}`}
    >
      {dotColor && (
        <span
          className={`${styles.dot} ${blinkDot ? styles.blink : ""}`}
          style={{ background: dotColor }}
        />
      )}
      {children}
    </span>
  );
}
