import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthEurope,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="flex items-center justify-between p-8">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faEarthEurope} size="2xl" />
        <h1 className="text-4xl font-extrabold">Where in the World?</h1>
      </div>
      <button onClick={handleTheme}>
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faSun} size="2xl" />
        ) : (
          <FontAwesomeIcon icon={faMoon} size="2xl" />
        )}
      </button>
    </nav>
  );
};
export default Header;
