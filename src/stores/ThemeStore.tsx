import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "system", // Estado inicial padrão

  setTheme: (theme: Theme) => {
    set({ theme });

    // Salvar no localStorage manualmente
    localStorage.setItem("fieg-theme", theme);

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  },

  initializeTheme: () => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("fieg-theme") as Theme | null;
      const theme = storedTheme || "system";
      set({ theme });

      const root = document.documentElement;
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    }
  },
}));
