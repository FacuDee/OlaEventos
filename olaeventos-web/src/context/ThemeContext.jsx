import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme === "dark" : true;
    }
    return true; // Default to dark mode on server-side
  });

  useEffect(() => {
    // Apply theme to document body
    const body = document.body;
    const html = document.documentElement;
    
    if (isDarkMode) {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      html.setAttribute("data-bs-theme", "dark");
    } else {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      html.setAttribute("data-bs-theme", "light");
    }
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}