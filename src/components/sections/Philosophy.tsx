import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import styles from "./Philosophy.module.css";

export function Philosophy() {
  return (
    <Section id="philosophy" padding="90px 0">
      <SectionLabel>04 / PHILOSOPHY</SectionLabel>
      <blockquote className={styles.quote}>
        Make it work. Make it fast.
        <br />
        Then make it feel like <em>nothing else.</em>
      </blockquote>
      <div className={styles.note}>
        Good software is invisible. Great software is invisible{" "}
        <strong>and</strong> unforgettable — it leaves a fingerprint you can't
        quite name. That tension is the whole job.
      </div>
    </Section>
  );
}
