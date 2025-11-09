import { useEffect, useState } from "react";
import "./styles.css";
// without flicker
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  }
  return false;
};

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
   // below has flicker UI
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   if (storedTheme === "dark") setIsDarkMode(true);
  // }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h1>Dark Mode Toggle</h1>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <span className="mode-text">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </div>
  );
}

export default DarkModeToggle;
