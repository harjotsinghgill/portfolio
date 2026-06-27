import type { NavItem } from "../../config";
import styles from "./MenuOverlay.module.css";

interface MenuOverlayProps {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
}

/** Full-screen navigation overlay. Renders nothing when closed. */
export function MenuOverlay({ open, items, onClose }: MenuOverlayProps) {
  if (!open) return null;
  return (
    <nav className={styles.overlay}>
      <div className={styles.list}>
        {items.map((item) => (
          <a
            key={item.num}
            className={styles.link}
            href={item.href}
            onClick={onClose}
          >
            <span className={styles.num}>{item.num}</span>
            {item.label}
          </a>
        ))}
      </div>
      <div className={styles.footer}>
        <span>// NAVIGATE WITH INTENT</span>
      </div>
    </nav>
  );
}
