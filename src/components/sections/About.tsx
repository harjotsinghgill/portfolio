import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import { Card } from "../primitives/Card";
import { stats } from "../../config";
import styles from "./About.module.css";

export function About() {
  return (
    <Section id="about">
      <div className={styles.grid}>
        <div className={styles.sticky}>
          <SectionLabel style={{ marginBottom: 20 }}>01 / ABOUT</SectionLabel>
          <h2 className={styles.heading}>
            A maker who treats software like hardware.
          </h2>
          <div className={styles.portrait}>
            <img src="/profile.png" alt="Harjot Singh Gill" className={styles.portraitImg} />
          </div>
        </div>

        <div className={styles.body}>
          <p>
            I grew up taking apart the things that beeped — cassette decks,
            calculators, the family Walkman. That curiosity never left; it just
            moved into the browser. Today I build{" "}
            <span className={styles.accent}>user-facing experiences</span> that
            feel as deliberate as a well-machined dial.
          </p>
          <p className={styles.muted}>
            My favorite work lives where engineering meets craft:
            micro-interactions you can feel, type that earns its size, and
            interfaces that respond like instruments. If it doesn't spark a
            little joy on first touch, it's not done.
          </p>

          <div className={styles.stats}>
            {stats.map((s) => (
              <Card key={s.label}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
