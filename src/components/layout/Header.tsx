import { GearLogo } from "../primitives/GearLogo";
import { Pill } from "../primitives/Pill";
import { GlassButton } from "../primitives/GlassButton";
import { site } from "../../config";
import styles from "./Header.module.css";

interface HeaderProps {
  clock: string;
  soundLabel: string;
  themeLabel: string;
  menuOpen: boolean;
  showSound: boolean;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
}

export function Header({
  clock,
  soundLabel,
  themeLabel,
  menuOpen,
  showSound,
  onToggleSound,
  onToggleTheme,
  onToggleMenu,
}: HeaderProps) {
  return (
    <header className={`${styles.header} ${menuOpen ? styles.headerAbove : ""}`}>
      <GearLogo tint={site.accentColor} />
      <div className={styles.controls}>
        <Pill dotColor="#2ec27e" blinkDot muted>
          {clock}
        </Pill>
        {showSound && (
          <GlassButton onClick={onToggleSound} aria-label="Toggle ambient sound">
            ♪ {soundLabel}
          </GlassButton>
        )}
        <GlassButton onClick={onToggleTheme} aria-label="Toggle color theme">
          ◐ {themeLabel}
        </GlassButton>
        <GlassButton
          variant="solid"
          onClick={onToggleMenu}
          className={styles.menuBtn}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuBtnContent}>
            <span className={menuOpen ? styles.labelOut : styles.labelIn}>
              MENU ≡
            </span>
            <span className={menuOpen ? styles.labelIn : styles.labelOut}>
              CLOSE ✕
            </span>
          </span>
        </GlassButton>
      </div>
    </header>
  );
}
