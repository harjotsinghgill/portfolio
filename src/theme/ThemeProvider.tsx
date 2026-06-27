import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  /** Human label for the *next* theme — matches the source design's toggle. */
  themeLabel: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "hsg-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface ThemeProviderProps {
  /** Accent color injected as the `--accent` CSS var (config / prop driven). */
  accent: string;
  children: ReactNode;
}

export function ThemeProvider({ accent, children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const t = getInitialTheme();
    document.documentElement.setAttribute("data-theme", t);
    return t;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    const svg = [
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>`,
      `<rect width='32' height='32' rx='6' fill='${accent}'/>`,
      `<rect x='9' y='8' width='3.6' height='16' rx='1' fill='#ECEAE3'/>`,
      `<rect x='19.4' y='8' width='3.6' height='16' rx='1' fill='#ECEAE3'/>`,
      `<rect x='9' y='14.2' width='14' height='3.6' rx='1' fill='#ECEAE3'/>`,
      `</svg>`,
    ].join("");
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [accent]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      themeLabel: theme === "light" ? "DARK" : "LIGHT",
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
