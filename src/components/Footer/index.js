import React from 'react';
import Copyright from '../../assets/copyright.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="inner-container">
        <div>
          <h2>Ecom Ltd</h2>
          <div className={styles.copyrightContainer}>
            <p>Copyright</p>
            <img src={Copyright} alt="copyright icon" className="copyright" />
            <p>2023. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
