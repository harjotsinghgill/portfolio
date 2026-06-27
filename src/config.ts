/* ---------------------------------------------------------------------------
   Site configuration + content.
   Everything copy/data driven lives here so sections stay presentational and
   the whole portfolio can be re-skinned or re-authored without touching JSX.
   These mirror the editable props from the original Claude Design component.
--------------------------------------------------------------------------- */

export const site = {
  accentColor: "#ff6600",
  ownerName: "HSG",
  ownerFullName: "Harjot Singh Gill",
  /** Idle timeout (seconds) before the screensaver kicks in. */
  idleSeconds: 30,
  /** Enable the Web Audio glitch ambience + show the sound toggle button. */
  enableSound: false,
  /** Drives the live clock's "uptime" counter. */
  birthDate: "2001-01-01T00:00:00",
  /** Toggle individual sections on/off. */
  sections: {
    about: true,
    experience: true,
    projects: true,
    skills: true,
    philosophy: true,
    connect: true,
  },
} as const;

export interface NavItem {
  num: string;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { num: "01", label: "ABOUT", href: "#about" },
  { num: "02", label: "EXPERIENCE", href: "#work" },
  { num: "03", label: "PROJECTS", href: "#projects" },
  { num: "04", label: "SKILLS", href: "#skills" },
  { num: "05", label: "PHILOSOPHY", href: "#philosophy" },
  { num: "06", label: "CONNECT", href: "#connect" },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "2001", label: "BORN — RUNNING SINCE" },
  { value: "3 yrs", label: "SHIPPING IN PRODUCTION" },
  { value: "9", label: "CHAINS BRIDGED (AND COUNTING)" },
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
    role: "Associate Software Engineer",
    company: "Redbelly Network",
    blurb:
      "Wired LayerZero V2 across 7 EVM chains and Solana mainnet. Built a Uniswap-compatible DEX backend from scratch. Shipped Airswap OTC RFQ flows, audited 72 DVN pathways post-incident, and authored the AI coding ruleset the whole team now lives by. Somehow still employed.",
    tags: [
      "LAYERZERO V2 · CROSS-CHAIN",
      "DEX · OTC · DEFI INFRA",
      "TS · SOLIDITY · GO · PYTHON",
    ],
    url: "https://redbelly.network",
    logo: `${import.meta.env.BASE_URL}Redbelly_Isotype-Red.svg`,
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
  { label: "Node.js" },
  { label: "Express" },
  { label: "Python" },
  { label: "FastAPI" },
  { label: "Go" },
  { label: "Solidity" },
  { label: "LayerZero V2" },
  { label: "EVM + Solana" },
  { label: "ethers.js" },
  { label: "wagmi" },
  { label: "PostgreSQL" },
  { label: "MongoDB" },
  { label: "Docker" },
  { label: "GH Actions" },
  { label: "CSS / Motion" },
  { label: "WebGL / Canvas" },
  { label: "Web Audio" },
  { label: "+ Taste ✳", accent: true },
];

export const marqueeWords = ["DESIGN", "ENGINEER", "BRIDGE", "SHIP", "DELIGHT"];

export interface Project {
  year: string;
  name: string;
  blurb: string;
  tags: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    year: "2024",
    name: "Automated Job Aggregation + Alerting",
    blurb:
      "Backend that scrapes 5+ job platforms, filters by keyword, persists listings, and fires alerts on a schedule. Built to scratch an itch — jobs should come to you, not the other way around.",
    tags: ["Python", "FastAPI", "Supabase", "GitHub Actions"],
  },
  {
    year: "2024",
    name: "AI Resume Optimizer",
    blurb:
      "Full-stack app that matches your resume against a job description using LLM embeddings. Added guardrails so it can't hallucinate skills you don't have. Yes, that's a feature, not a bug.",
    tags: ["FastAPI", "React", "LLM Embeddings", "Python"],
  },
];

export interface SocialLink {
  label: string;
  href: string;
}

/** Primary CTA buttons in the Connect section. */
export const connectLinks: SocialLink[] = [
  { label: "EMAIL ME ↗", href: "mailto:harjotsinghgill007@gmail.com" },
  { label: "GITHUB ↗", href: "https://github.com/harjotsinghgill" },
  { label: "LINKEDIN ↗", href: "https://linkedin.com/in/harjotsinghgill007" },
  { label: "RÉSUMÉ ↗", href: `${import.meta.env.BASE_URL}resume.pdf` },
];

/** Footer social column. */
export const footerSocials: SocialLink[] = [
  { label: "→ GitHub", href: "https://github.com/harjotsinghgill" },
  { label: "→ LinkedIn", href: "https://linkedin.com/in/harjotsinghgill007" },
  { label: "→ Twitter / X", href: "#" },
  { label: "→ Résumé", href: `${import.meta.env.BASE_URL}resume.pdf` },
];
