import React from "react";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.innerHero}>
        <div>
          <h1>Welcome to Holidaze</h1>
          <p> - Worldwide Accommodations</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
