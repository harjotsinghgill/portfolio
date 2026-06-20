import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import { Card } from "../primitives/Card";
import { skills } from "../../config";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <Section id="skills">
      <SectionLabel style={{ marginBottom: 32 }}>
        03 / SKILLS — THE TOOLBOX
      </SectionLabel>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <Card
            key={skill.label}
            radius={12}
            padding="18px 16px"
            accent={skill.accent}
            className={styles.chip}
          >
            {skill.label}
          </Card>
        ))}
      </div>
    </Section>
  );
}
