import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../../assets/hamburger.svg";
import styles from "./Nav.module.css";

function Nav() {
  const location = useLocation();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(false);
  }, [location]);

  const handleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <nav>
      <button
        type="button"
        className={styles.hamburger}
        onClick={handleDisplay}
      >
        <img
          src={hamburger}
          className={display && styles.activeHamburger}
          alt="hamburger icon"
        />
      </button>

      <div className={`${styles.navContainer} ${display && styles.show}`}>
        <div className={styles.linkContainer}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
