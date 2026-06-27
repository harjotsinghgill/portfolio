/* ---------------------------------------------------------------------------
   Site configuration + content.
   Everything copy/data driven lives here so sections stay presentational and
   the whole portfolio can be re-skinned or re-authored without touching JSX.
   These mirror the editable props from the original Claude Design component.
--------------------------------------------------------------------------- */

export const site = {
  accentColor: "#FF5C00",
  ownerName: "HSG",
  ownerFullName: "Harjot Singh Gill",
  /** Idle timeout (seconds) before the screensaver kicks in. */
  idleSeconds: 18,
  /** Enable the Web Audio glitch ambience. */
  enableSound: true,
  /** Drives the live clock's "uptime" counter. */
  birthDate: "2001-01-01T00:00:00",
} as const;

export interface NavItem {
  num: string;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { num: "01", label: "ABOUT", href: "#about" },
  { num: "02", label: "EXPERIENCE", href: "#work" },
  { num: "03", label: "SKILLS", href: "#skills" },
  { num: "04", label: "PHILOSOPHY", href: "#philosophy" },
  { num: "05", label: "CONNECT", href: "#connect" },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "2001", label: "BORN — RUNNING SINCE" },
  { value: "3 yrs", label: "SHIPPING IN PRODUCTION" },
  { value: "FS", label: "FULL-STACK · AI-ENABLED" },
  { value: "0", label: "UGLY GRADIENTS SHIPPED" },
];

export interface Experience {
  period: string;
  role: string;
  company: string;
  blurb: string;
  tags: string[];
  url?: string;
  logo?: string;
}

export const experience: Experience[] = [
  {
    period: "2023 — NOW",
    role: "Full-Stack Engineer",
    company: "Redbelly Network",
    blurb:
      "Building end to end on a high-performance, compliance-ready blockchain network — user-facing features, the services behind them, and the glue between. Front of the stack to the database, shipping in production.",
    tags: ["3 YRS IN PRODUCTION", "FRONTEND → BACKEND → DB", "GO · SOLIDITY · TYPESCRIPT"],
    url: "https://redbelly.network",
    logo: "/Redbelly_Isotype-Red.svg",
  },
];

export interface Skill {
  label: string;
  /** Highlighted skills render in the accent color. */
  accent?: boolean;
}

export const skills: Skill[] = [
  { label: "TypeScript" },
  { label: "React" },
  { label: "Next.js" },
  { label: "CSS / Motion" },
  { label: "WebGL / Canvas" },
  { label: "Node" },
  { label: "Go" },
  { label: "Solidity" },
  { label: "Figma" },
  { label: "Design Systems" },
  { label: "Web Audio" },
  { label: "+ Taste ✳", accent: true },
];

export const marqueeWords = [
  "DESIGN",
  "ENGINEER",
  "PROTOTYPE",
  "SHIP",
  "DELIGHT",
];

export interface SocialLink {
  label: string;
  href: string;
}

/** Primary CTA buttons in the Connect section. */
export const connectLinks: SocialLink[] = [
  { label: "EMAIL ME ↗", href: "mailto:hello@example.com" },
  { label: "GITHUB", href: "#" },
  { label: "LINKEDIN", href: "#" },
  { label: "READ.CV", href: "#" },
];

/** Footer social column. */
export const footerSocials: SocialLink[] = [
  { label: "→ GitHub", href: "#" },
  { label: "→ LinkedIn", href: "#" },
  { label: "→ Twitter / X", href: "#" },
  { label: "→ Read.cv", href: "#" },
];
