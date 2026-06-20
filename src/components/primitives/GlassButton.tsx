import type { ButtonHTMLAttributes } from "react";
import styles from "./GlassButton.module.css";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "solid";
}

/** Mono control button — glass by default, `solid` for primary actions. */
export function GlassButton({
  variant = "glass",
  className = "",
  ...rest
}: GlassButtonProps) {
  const surface = variant === "solid" ? styles.solid : "glass";
  return <button className={`${styles.btn} ${surface} ${className}`} {...rest} />;
}
