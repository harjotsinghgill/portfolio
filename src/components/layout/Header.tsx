import { GearLogo } from "../primitives/GearLogo";
import { Pill } from "../primitives/Pill";
import { GlassButton } from "../primitives/GlassButton";
import styles from "./Header.module.css";

interface HeaderProps {
  clock: string;
  soundLabel: string;
  themeLabel: string;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
}

export function Header({
  clock,
  soundLabel,
  themeLabel,
  onToggleSound,
  onToggleTheme,
  onOpenMenu,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <GearLogo />
      <div className={styles.controls}>
        <Pill dotColor="#2ec27e" blinkDot muted>
          {clock}
        </Pill>
        <GlassButton onClick={onToggleSound} aria-label="Toggle ambient sound">
          ♪ {soundLabel}
        </GlassButton>
        <GlassButton onClick={onToggleTheme} aria-label="Toggle color theme">
          ◐ {themeLabel}
        </GlassButton>
        <GlassButton variant="solid" onClick={onOpenMenu}>
          MENU ≡
        </GlassButton>
      </div>
    </header>
  );
}
