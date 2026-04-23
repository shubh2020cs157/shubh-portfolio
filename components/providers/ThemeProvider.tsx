"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  mounted: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start "dark" — matches the server render. The inline <Script> has
  // already set the correct data-theme on <html> before React hydrates, so
  // there is no visual flash. We read the real value in the effect below.
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the value the anti-flash script already applied to the DOM.
    const attr = document.documentElement.getAttribute(
      "data-theme"
    ) as Theme | null;
    const actual: Theme =
      attr === "light" || attr === "dark" ? attr : "dark";
    // Reading from the DOM after mount is a valid exception to this rule —
    // the anti-flash Script has already set data-theme before React loads.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (actual !== "dark") setTheme(actual);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Private browsing / storage disabled — ignore.
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
