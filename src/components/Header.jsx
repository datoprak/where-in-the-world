import { useEffect, useState } from "react";
import Icon from "./Icon";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <div className="flex items-center gap-3">
          <Icon name="earth" className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-lg font-extrabold sm:text-4xl">
            Where in the World?
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <label className="swap swap-rotate">
          <input
            name="theme-switch"
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleTheme}
          />
          <Icon
            name="sun"
            className="swap-on h-6 w-6 fill-current sm:h-10 sm:w-10"
          />
          <Icon
            name="moon"
            className="swap-off h-6 w-6 fill-current sm:h-10 sm:w-10"
          />
        </label>
        <span
          onClick={handleTheme}
          className="cursor-pointer select-none text-base font-semibold sm:text-xl"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>
    </nav>
  );
};
export default Header;
