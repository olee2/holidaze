import React from 'react';
import styles from './Hero.module.css';

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.innerHero}>
        <div>
          <h1>Welcome to Holidaze</h1>
          <p> - Find a place to hang out</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
