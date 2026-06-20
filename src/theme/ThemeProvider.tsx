import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
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
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

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
      <div
        data-theme={theme}
        style={{ "--accent": accent } as CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
