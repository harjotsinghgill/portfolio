import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import { Pill } from "../primitives/Pill";
import { projects } from "../../config";
import styles from "./Experience.module.css";

export function Projects() {
  return (
    <Section id="projects">
      <SectionLabel style={{ marginBottom: 32 }}>03 / PROJECTS</SectionLabel>
      {projects.map((project) => (
        <div key={project.name}>
          <div className={styles.row}>
            <div className={styles.period}>{project.year}</div>
            <div>
              <div className={styles.role}>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </div>
              <div className={styles.blurb}>{project.blurb}</div>
            </div>
            {project.url && <div className={styles.arrow}>↗</div>}
          </div>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
