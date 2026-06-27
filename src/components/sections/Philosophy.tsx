import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import styles from "./Philosophy.module.css";

export function Philosophy() {
  return (
    <Section id="philosophy" padding="90px 0">
      <SectionLabel>05 / PHILOSOPHY</SectionLabel>
      <blockquote className={styles.quote}>
        Make it work. Make it fast.
        <br />
        Then make it feel like <em>nothing else.</em>
      </blockquote>
      <div className={styles.note}>
        Good software is invisible. Great software is invisible{" "}
        <strong>and</strong> makes you wonder how it works. I've spent three
        years at the edge where blockchain infrastructure meets the browser —
        and the job is always the same: make something that feels inevitable.
        The gnarly parts are just the cover charge.
      </div>
    </Section>
  );
}
