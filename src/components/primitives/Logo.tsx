import type { CSSProperties } from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  size?: number;
  /** Center cut-out color — should match the surface the logo sits on. */
  cutout?: string;
}

/** The spinning aperture mark. Spins on hover (respects reduced-motion). */
export function Logo({ size = 30, cutout = "var(--bg)" }: LogoProps) {
  return (
    <div
      className={styles.logo}
      style={{ width: size, height: size, "--cutout": cutout } as CSSProperties}
      aria-hidden="true"
    >
      <div className={styles.blade} />
      <div className={`${styles.blade} ${styles.rotated}`} />
      <div className={styles.ring} />
      <div className={styles.hole} />
    </div>
  );
}
