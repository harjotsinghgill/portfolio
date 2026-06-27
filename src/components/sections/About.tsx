import { Section } from "../primitives/Section";
import { SectionLabel } from "../primitives/SectionLabel";
import { GlassButton } from "../primitives/GlassButton";
import { experience, skills, site } from "../../config";
import styles from "./About.module.css";

const EMAIL = "harjotsinghgill007@gmail.com";

/** Circular badge with text running around the rim (SVG textPath, no deps). */
function CurvedBadge() {
  const text = "FULL-STACK ENGINEER · AI-ENABLED · CRAFT-FIRST · ";
  return (
    <svg className={styles.badge} viewBox="0 0 140 140" aria-hidden>
      <defs>
        <path
          id="aboutBadgeArc"
          d="M70,70 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"
        />
      </defs>
      <text className={styles.badgeText}>
        {/* textLength = 2π×62 ≈ 389.6; lengthAdjust scales glyphs to fill exactly one loop */}
        <textPath href="#aboutBadgeArc" startOffset="0%" textLength="389.6" lengthAdjust="spacingAndGlyphs">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionLabel>01 / ABOUT</SectionLabel>
      <div className={styles.layout}>
        {/* Left — identity card */}
        <div className={`${styles.card} ${styles.profile}`}>
          <div className={styles.portraitWrap}>
            <div className={styles.portrait}>
              <img src={`${import.meta.env.BASE_URL}profile.png`} alt={site.ownerFullName} />
            </div>
            <CurvedBadge />
          </div>
          <h2 className={styles.name}>{site.ownerFullName}</h2>
          <a href={`mailto:${EMAIL}`} className={styles.email}>
            {EMAIL}
          </a>
          <GlassButton
            variant="solid"
            className={styles.cta}
            onClick={() => (window.location.href = `mailto:${EMAIL}`)}
          >
            EMAIL ME ↗
          </GlassButton>
        </div>

        {/* Right — about + roles */}
        <div className={styles.col}>
          <div className={`glass ${styles.card}`}>
            <p className={styles.bio}>
              Full-stack engineer who got into Web3 and forgot to leave. Started
              by pulling apart calculators as a kid, upgraded to smart contracts,
              and somewhere in between audited 72 LayerZero DVN pathways
              post-incident at 2am. The curiosity never stopped —{" "}
              <span className={styles.hl}>it just costs more in gas fees now.</span>
            </p>
            <p className={`${styles.bio} ${styles.muted}`}>
              My best work lives where DeFi infrastructure meets the interface on
              top of it — DEX backends, cross-chain bridges, OTC flows — and then
              turning around and making the frontend feel like someone actually
              cared. Because someone did.
            </p>
          </div>

          <div className={`glass ${styles.card}`}>
            <h4 className={styles.subTitle}>Latest Roles</h4>
            <div className={styles.roles}>
              {experience.slice(0, 2).map((e) => {
                const inner = (
                  <>
                    {e.logo ? (
                      <img src={e.logo} alt={e.company} className={styles.roleLogoImg} />
                    ) : (
                      <div className={styles.roleIcon}>
                        {e.company.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className={styles.roleName}>{e.role}</div>
                      <div className={styles.roleSub}>
                        {e.company} · {e.period}
                      </div>
                    </div>
                  </>
                );
                return e.url ? (
                  <a
                    key={e.company}
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.role}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={e.company} className={styles.role}>
                    {inner}
                  </div>
                );
              })}
            </div>

            <h4 className={styles.subTitle}>Stack</h4>
            <div className={styles.stack}>
              {skills.map((s) => (
                <span
                  key={s.label}
                  className={`${styles.chip} ${s.accent ? styles.chipAccent : ""}`}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
