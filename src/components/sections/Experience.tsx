import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import { Pill } from "../primitives/Pill";
import { experience } from "../../config";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <Section id="work">
      <SectionLabel style={{ marginBottom: 32 }}>02 / EXPERIENCE</SectionLabel>
      {experience.map((job) => (
        <div key={job.company}>
          <div className={styles.row}>
            <div className={styles.period}>{job.period}</div>
            <div>
              <div className={styles.role}>
                {job.role} · <span className={styles.company}>{job.company}</span>
              </div>
              <div className={styles.blurb}>{job.blurb}</div>
            </div>
            <div className={styles.arrow}>↗</div>
          </div>
          <div className={styles.tags}>
            {job.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
