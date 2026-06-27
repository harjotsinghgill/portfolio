import { GearLogo } from "../primitives/GearLogo";
import { footerSocials, site } from "../../config";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <GearLogo size={48} tint={site.accentColor} />
          </div>
          <div className={styles.meta}>
            Earth · GMT+5:30
            <br />
            Building from a small desk
            <br />
            with very good headphones.
          </div>
        </div>

        <div className={styles.col}>
          <span className={styles.colHead}>SOCIAL</span>
          {footerSocials.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>

        <div className={styles.col}>
          <span className={styles.colHead}>COLOPHON</span>
          <span>Helvetica + Space Mono</span>
          <span>No templates harmed</span>
        </div>
      </div>

      <div className={styles.legal}>
        <span style={{ fontWeight: 700, color: "var(--ink)" }}>
          Made with love by a '01 kid
        </span>
      </div>
    </footer>
  );
}
