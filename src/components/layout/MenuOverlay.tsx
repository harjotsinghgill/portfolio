import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type { NavItem } from "../../config";
import styles from "./MenuOverlay.module.css";

interface MenuOverlayProps {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
}

const spring: [number, number, number, number] = [0.16, 1, 0.3, 1];
const sharp: [number, number, number, number] = [0.7, 0, 0.3, 1];

const overlay: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    backdropFilter: "blur(0px) saturate(1)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    backdropFilter: "blur(32px) saturate(1.7)",
    transition: {
      duration: 0.52,
      ease: spring,
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    backdropFilter: "blur(0px) saturate(1)",
    transition: {
      duration: 0.38,
      ease: sharp,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: spring },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: sharp },
  },
};

export function MenuOverlay({ open, items, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className={styles.overlay}
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.list}>
            {items.map((item) => (
              <motion.a
                key={item.num}
                className={styles.link}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  // ponytail: 400ms matches exit animation (0.38s)
                  setTimeout(() => {
                    const el = document.querySelector(item.href);
                    if (!el) return;
                    const headerH =
                      document.querySelector("header")?.offsetHeight ?? 0;
                    window.scrollTo({
                      top:
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        headerH,
                      behavior: "smooth",
                    });
                  }, 400);
                }}
                variants={linkItem}
              >
                <span className={styles.num}>{item.num}</span>
                {item.label}
              </motion.a>
            ))}
          </div>
          <motion.div className={styles.footer} variants={linkItem}>
            <span>// NAVIGATE WITH INTENT</span>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
