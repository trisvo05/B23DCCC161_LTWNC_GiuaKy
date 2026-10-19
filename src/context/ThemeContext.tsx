"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeStorageKey = "mini-library-theme";
const themeChangeEvent = "mini-library-theme-change";

function getStoredTheme(): Theme {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  return savedTheme === "dark" ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

function subscribeToTheme(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(themeChangeEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(themeChangeEvent, listener);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, getServerTheme);
  const toggleTheme = useCallback(() => {
    const nextTheme = getStoredTheme() === "light" ? "dark" : "light";
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}><div data-theme={theme}>{children}</div></ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme cần được dùng trong ThemeProvider");
  return context;
}
