import { Pill } from "../primitives/Pill";
import styles from "./Hero.module.css";

interface HeroProps {
  uptime: string;
}

export function Hero({ uptime }: HeroProps) {
  return (
    <section className={styles.hero}>
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
        Full-stack engineer who lives on the user-facing edge — obsessed with the
        last 10% everyone else skips. I move fast across the whole stack, lean
        hard on AI to learn faster, and rebuild tactile, knob-turning tech for
        the screen you're holding.
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
        ↓ SCROLL &nbsp;·&nbsp; psst — stop touching the mouse for a sec and watch.
      </div>
    </section>
  );
}
