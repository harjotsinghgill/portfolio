import { Pill } from "../primitives/Pill";
import { GearDither } from "../primitives/GearDither";
import styles from "./Hero.module.css";

interface HeroProps {
  uptime: string;
}

export function Hero({ uptime }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.meta}>
          <span style={{ color: "var(--accent)" }}>● PORTFOLIO</span>
          <span>EST. 2001</span>
          <span>REV 1.0</span>
          <span className={styles.tag}>HUMAN-MADE</span>
        </div>

        <h1 className={styles.title}>
          I build interfaces
          <br />
          people actually
          <br />
          want to <em>touch.</em>
        </h1>

        <p className={styles.lead}>
          Full-stack engineer living at the intersection of DeFi infrastructure
          and deliberate UI. I wire cross-chain bridges before lunch and obsess
          over pixel gaps after — somehow it's the same job. I move fast, lean
          on AI, and refuse to ship anything that feels like everyone else's work.
        </p>

        <div className={styles.badges}>
          <Pill dotColor="#2ec27e">AVAILABLE — &amp; caffeinated</Pill>
          <Pill muted>
            UPTIME&nbsp;
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{uptime}</span>
            &nbsp;yrs
          </Pill>
        </div>

        <div className={styles.scroll}>
          ↓ SCROLL<span className={styles.scrollHint}>&nbsp;·&nbsp; psst — stop touching the mouse for a sec and watch.</span>
        </div>
      </div>

      <div className={styles.gearBg} aria-hidden="true">
        <GearDither />
      </div>
    </section>
  );
}
