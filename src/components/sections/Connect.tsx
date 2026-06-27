import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import { connectLinks } from "../../config";
import styles from "./Connect.module.css";

export function Connect() {
  return (
    <Section id="connect" padding="90px 0">
      <SectionLabel style={{ marginBottom: 26 }}>06 / CONNECT</SectionLabel>
      <h2 className={styles.heading}>
        Let's make
        <br />
        something tactile.
      </h2>
      <div className={styles.links}>
        {connectLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={
              i === 0
                ? `${styles.link} ${styles.primary}`
                : `glass ${styles.link}`
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
