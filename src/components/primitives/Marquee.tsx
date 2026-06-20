import styles from "./Marquee.module.css";

interface MarqueeProps {
  words: string[];
  separator?: string;
}

/** Infinite horizontal ticker. The run is duplicated for a seamless loop. */
export function Marquee({ words, separator = "✳" }: MarqueeProps) {
  const run = words.join(` ${separator} `);
  const content = `${run} ${separator} ${run} ${separator} `;
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        <span className={styles.run}>{content}</span>
        <span className={styles.run} aria-hidden="true">
          {content}
        </span>
      </div>
    </div>
  );
}
