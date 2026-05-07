import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("siteTheme") || "light"
  );

  const isDarkTheme = theme === "dark";

  useEffect(() => {
    localStorage.setItem("siteTheme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}