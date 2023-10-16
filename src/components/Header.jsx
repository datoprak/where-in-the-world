import { useEffect, useState } from "react";
import Icon from "./Icon";

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
    <nav className="mb-1 flex items-center justify-between bg-l-ele p-8 shadow dark:bg-d-ele">
      <div className="flex items-center gap-3">
        <Icon name="earth" className="h-10 w-10" />
        <h1 className="text-4xl font-extrabold">Where in the World?</h1>
      </div>
      <button onClick={handleTheme} className="flex items-center gap-2">
        {theme === "dark" ? (
          <>
            <Icon name="sun" className="h-8 w-8" />
            <span className="text-xl font-semibold">Light Mode</span>
          </>
        ) : (
          <>
            <Icon name="moon" className="h-8 w-8" />
            <span className="text-xl font-semibold">Dark Mode</span>
          </>
        )}
      </button>
    </nav>
  );
};
export default Header;
