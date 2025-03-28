import { useEffect, useState } from "react";
import * as colorToggle from "../styles/ColorToggle.module.css";

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

function ColorToggle() {
  const [isChecked, setChecked] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        setChecked(true);
      }
    }
    setLoaded(true);
  }, []);

  const changeTheme = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      <div className={colorToggle.wrapper}>
        <label htmlFor="checkbox" className={colorToggle.toggleSwitch}>
          <input
            type="checkbox"
            id="checkbox"
            onInput={changeTheme}
            defaultChecked={isChecked}
          />
          <div className={`${colorToggle.slider} ${colorToggle.round}`}></div>
        </label>
      </div>
    </div>
  );
}

export default ColorToggle;
