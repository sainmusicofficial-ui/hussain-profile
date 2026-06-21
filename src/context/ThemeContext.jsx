"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ════════════════════════════════════════════════════════════════════════════
//  THEME DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════
export const themes = {
  volt: {
    id: "volt",
    name: "Volt",
    bg: "#050505",
    bgSecondary: "#0a0a0a",
    text: "#ffffff",
    textMuted: "#8A8A8A",
    textFaint: "#555555",
    accent: "#D7FF00",
    accentSecondary: "#00F0FF",
    border: "rgba(255,255,255,0.08)",
    cardBg: "rgba(255,255,255,0.02)",
  },
  arctic: {
    id: "arctic",
    name: "Arctic",
    bg: "#FAFAFA",
    bgSecondary: "#F0F0F0",
    text: "#0A0A0A",
    textMuted: "#5A5A5A",
    textFaint: "#9A9A9A",
    accent: "#0066FF",
    accentSecondary: "#00B8D9",
    border: "rgba(0,0,0,0.08)",
    cardBg: "rgba(0,0,0,0.02)",
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    bg: "#0B0B16",
    bgSecondary: "#11111F",
    text: "#ffffff",
    textMuted: "#9A93B5",
    textFaint: "#5C5775",
    accent: "#8B5CF6",
    accentSecondary: "#22D3EE",
    border: "rgba(139,92,246,0.12)",
    cardBg: "rgba(139,92,246,0.03)",
  },
  forest: {
    id: "forest",
    name: "Forest",
    bg: "#0A120D",
    bgSecondary: "#0F1A13",
    text: "#F2F0E8",
    textMuted: "#8FA396",
    textFaint: "#4F5E54",
    accent: "#C9A227",
    accentSecondary: "#3D8361",
    border: "rgba(201,162,39,0.12)",
    cardBg: "rgba(61,131,97,0.04)",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState("volt");
  const [mounted, setMounted] = useState(false);

  // Load saved theme on first mount
  useEffect(() => {
    const saved = localStorage.getItem("hk-theme");
    if (saved && themes[saved]) {
      setThemeId(saved);
    }
    setMounted(true);
  }, []);

  // Persist theme choice + apply CSS variables to :root
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("hk-theme", themeId);

    const theme = themes[themeId];
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", theme.bg);
    root.style.setProperty("--theme-bg-secondary", theme.bgSecondary);
    root.style.setProperty("--theme-text", theme.text);
    root.style.setProperty("--theme-text-muted", theme.textMuted);
    root.style.setProperty("--theme-text-faint", theme.textFaint);
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--theme-accent-secondary", theme.accentSecondary);
    root.style.setProperty("--theme-border", theme.border);
    root.style.setProperty("--theme-card-bg", theme.cardBg);
  }, [themeId, mounted]);

  const value = {
    themeId,
    theme: themes[themeId],
    setThemeId,
    themesList: Object.values(themes),
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}