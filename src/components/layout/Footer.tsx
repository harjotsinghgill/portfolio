import { GearLogo } from "../primitives/GearLogo";
import { footerSocials } from "../../config";
import styles from "./Footer.module.css";

interface FooterProps {
  ownerName: string;
}

export function Footer({ ownerName }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <GearLogo size={32} />
            <div className={styles.brandName}>
              {ownerName}
            </div>
          </div>
          <div className={styles.meta}>
            Earth · GMT+offset
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
          <span style={{ color: "var(--accent)" }}>
            There's a hidden surprise — go idle to find it
          </span>
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
